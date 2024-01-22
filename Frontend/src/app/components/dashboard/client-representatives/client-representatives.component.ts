import { Component, OnInit } from '@angular/core';
import { representanteInterface } from 'src/app/interfaces/representanteInterface';
import { RepresentanteService } from 'src/app/service/representante/representante.service';
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
      id_pessoa:  ['', Validators.required]
    });
 
    this.id_pessoa = aRouter.snapshot.paramMap.get('id_pessoa') || '';

    this.formRepressEdit = this.formBuilder.group({
      identificacao:  ['', Validators.required],
      nome: ['', Validators.required],
      id_pessoa:  ['', Validators.required]
    });
  } 

  ngOnInit(): void {
    this.getAllRepress(); 
  }

  // Listar todos os representantes
  getAllRepress(){
    this._representanteService.getAllRepres().subscribe((data) => {
      this.listRepress = data;
    })
  }

  // Deletar um representantes
  deleteRepress(id_representante: string) {
    this._representanteService.deleteRepress(id_representante).subscribe(() => {
      this.showDeleteRepress();
      this.getAllRepress();
      this.showSuccessDelete();
    })     
  }
 
  // Adicionar um representantes
  addRepress(){
    const representante: representanteInterface = {
      nome: this.formRepress.value.nome,
      identificacao: this.formRepress.value.identificacao,
      id_pessoa: this.id_pessoa
    }

    this._representanteService.createRepress(representante).subscribe((respResponse) => {
      console.log(respResponse)
      this.getAllRepress();
      this.showSuccessAdd();
      this.showAddRepress();
      return respResponse;
    },
    (respError) => {
      console.error('Erro ao adicionar cliente:', respError)
    }
    )
  }

  // Buscar dados de um representante pelo id_representante
  getRepressIdEdit(id_representante: string) {
    
    this.EditRepress = !this.EditRepress;
    this.ContainerMain = !this.ContainerMain;

    this.id_representante = id_representante;

    this._representanteService.getRepressId(id_representante).subscribe((resp) => {
      // Atribui os dados diretamente a this.listDadosRepress
      this.listDadosRepress = [resp];
      
      this.formRepressEdit.patchValue({
        identificacao: resp.identificacao,
        nome: resp.nome
      })
  
      // Exibe no console para verificar
      console.log(`Aqui é a resposta: ${this.listDadosRepress}`);
    });

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
    this.getAllRepress();
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
      icon: '<svg class="IConChecked"></svg>',
    };

    this.toastr.error('Representante excluído com sucesso!', undefined, options);
  }
  
}
  