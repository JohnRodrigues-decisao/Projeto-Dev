import { Component, OnInit } from '@angular/core';
import { representanteInterface } from 'src/app/shared/model/interfaces/representanteInterface';
import { RepresentanteService } from 'src/app/shared/services/representante/representante.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-representatives',
  templateUrl: './client-representatives.component.html',
  styleUrls: ['./client-representatives.component.scss']
})
export class ClientRepresentativesComponent implements OnInit{

  ContainerMain: boolean = true;
  NoClientsRepress: boolean = false; 
  ListClientsRepress: boolean = true;
  AddRepress: boolean = false;
  EditRepress: boolean = false; 

  isSubmitDisabled: boolean = true;
  cpfActive: boolean = false; 
  cnpjActive: boolean = false;

  listRepress: representanteInterface[] = []; 

  listDadosRepress: representanteInterface[] = [];
  popupDeleteRepress: boolean = false;
 
  formRepress: FormGroup;
  formRepressEdit: FormGroup;
  id_pessoa: string = '';
  id_representante: string = '';

  

  constructor(
    private formBuilder: FormBuilder,
    private _representanteService: RepresentanteService,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute

  ) {
    this.formRepress = this.formBuilder.group({
      identificacao:  ['', Validators.required],
      nome: ['', Validators.required],
      id_pessoa:  ['']
    });
    
    this.formRepress.get('identificacao')?.valueChanges.subscribe((obsValue) => {
      this.validaIndentificacao(obsValue);
    });
 
    this.id_pessoa = aRouter.snapshot.paramMap.get('id_pessoa') || '';

    this.formRepressEdit = this.formBuilder.group({
      identificacao:  ['', Validators.required],
      nome: ['', Validators.required],
      id_pessoa:  ['', Validators.required]
    });

  
  }  

  ngOnInit(): void {
    this.getAllRepresIdPessoa(this.id_pessoa);
  }

  // Listar todos os representantes
  getAllRepresIdPessoa(id_pessoa: string) {
    this._representanteService.getAllRepresIdPessoa(id_pessoa).subscribe(
      (data) => {
        this.listRepress = data;
      },
      (error) => {
        console.error("Erro na requisição:", error);
      }
    );
  }

  // Adicionar um representantes
  addRepress() {
    const representante: representanteInterface = {
      nome: this.formRepress.value.nome,
      identificacao: this.formRepress.value.identificacao,
      id_pessoa: this.id_pessoa
    };
  
    if (this.camposObrigatoriosPreenchidos()) {
      this._representanteService.createRepress(representante).subscribe(
        (respResponse) => {
          this.getAllRepresIdPessoa(this.id_pessoa);
          this.showSuccessAdd();
          this.showAddRepress();
          this.formRepress.reset();
          return respResponse; 
        },
        (respError) => {
          console.error('Erro ao adicionar cliente:', respError);
        }
      );
    } else {
      console.log('Preencha todos os campos obrigatórios');
    }
  }

  camposObrigatoriosPreenchidos(): boolean {
    const nome = this.formRepress.value.nome;
    const identificacao = this.formRepress.value.identificacao;
  
    return nome !== null && nome !== '' && identificacao !== null && identificacao !== '';
  }

  validaIndentificacao(value: string): boolean {
    this.cpfActive = value.length === 11;
    this.cnpjActive = value.length === 14;

    if (this.cpfActive) {
        this.formRepress.get('nome')?.valueChanges.subscribe((nomeValue) => {
          if (nomeValue !== '') {
            this.isSubmitDisabled = false;
          } else {
            this.isSubmitDisabled = true;
          }
        });
    } else if (this.cnpjActive) {
      this.formRepress.get('nome')?.valueChanges.subscribe((nomeValue) => {
        if (nomeValue !== '') {       
          this.isSubmitDisabled = false;
        } else {
          this.isSubmitDisabled = true;
        }
      })} else {
      console.log('Identificação inválida:', value);
    }
    return this.cpfActive || this.cnpjActive;
  }

  // Deletar um representantes
  deleteRepress(id_representante: string) {
    this._representanteService.deleteRepress(id_representante).subscribe(() => {
      this.showDeleteRepress();
      this.getAllRepresIdPessoa(this.id_pessoa);
      this.showSuccessDelete();
    })     
  } 

  // Editar um representante
  editRepress(){
    const representante: representanteInterface = {
      identificacao: this.formRepressEdit.value.identificacao,
      nome: this.formRepressEdit.value.nome,
      id_pessoa: this.id_pessoa
    }

    this._representanteService.updateRepress(this.id_representante, representante).subscribe(() => {
      console.log('Representante atualizado com sucesso!');
    });

    this.showSuccessEdit();
    this.EditRepress = !this.EditRepress;
    this.ContainerMain = !this.ContainerMain;
    this.getAllRepresIdPessoa(this.id_pessoa);
  }
 
  // Buscar dados de um representante pelo id_representante
  getRepressIdEdit(id_representante: string) {
    this.EditRepress = !this.EditRepress;
    this.ContainerMain = !this.ContainerMain;
    this.id_representante = id_representante;
    
    this._representanteService.getRepressId(id_representante).subscribe((resp) => {
      this.listDadosRepress = [resp];
      this.formRepressEdit.patchValue({
        identificacao: resp.identificacao,
        nome: resp.nome
      })
    });
    
    
    this.getAllRepresIdPessoa(this.id_pessoa);
  } 


















  
  /* Show */
  capterIdRepress(id_representante: string){
    this.id_representante = id_representante;
    this.EditRepress = !this.EditRepress;
    this.ContainerMain = !this.ContainerMain;
    console.log(this.id_representante)
  }

  showEditRepress(){
    this.EditRepress = !this.EditRepress;
    this.ContainerMain = !this.ContainerMain;
  }

  showDeleteRepress(){
    this.popupDeleteRepress = !this.popupDeleteRepress;
  }

  showAddRepress() {
    this.AddRepress = !this.AddRepress;
    this.ContainerMain = !this.ContainerMain;
    console.log(this.formRepress)
  }

  /* Alerts */
  showSuccessAdd() {
    const options = {
      closeButton: true,
      progressBar: true,
      enableHtml: true,
      timeOut: 2000,
      icon: '<svg class="IConChecked"></svg>',
    };

    this.toastr.success('Representante adicionado com sucesso!', undefined, options);
  }

  showSuccessEdit() {
    const options = {
      closeButton: true,
      progressBar: true,
      enableHtml: true,
      timeOut: 2000,
      icon: '<svg class="IConChecked"></svg>',
    };

    this.toastr.success('Representante editado com sucesso!', undefined, options);
  }

  showSuccessDelete() {
    const options = {
      closeButton: true,
      progressBar: true,
      enableHtml: true,
      timeOut: 2000,
      icon: '<svg class="IConChecked"></svg>',
    };

    this.toastr.success('Representante excluído com sucesso!', undefined, options);
  }

  // showSuccessDelete() {
  //   const options = {
  //     closeButton: true,
  //     progressBar: true,
  //     enableHtml: true,
  //     icon: '<svg class="IConChecked"></svg>',
  //   };

  //   this.toastr.error('Representante excluído com sucesso!', undefined, options);
  // }
}
   