// Falta fazer:

// [ ] Adicioanr o ngclass para alternar as cores do dropdowm 
// [ ] Ativar dropdown para alterar o banco
// [ ] Adicionar  um validador de campos para deixar o botão de submit ativo quando um campo for editado ou preenchido pela primeira vez, caso contrario, bloqueio e o usuário terá que clicar no nome representante lá em ciam.
 

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router'; 

import { PessoaService } from 'src/app/service/pessoa/pessoa.service';
import { ClienteService } from 'src/app/service/cliente/cliente.service'

import { PessoaInterface } from 'src/app/interfaces/pessoaInterface';
import { Clientinterface } from 'src/app/interfaces/clientinterface';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html', 
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit{
  listClientes: Clientinterface[] = []; 
  isSubmitDisabled: boolean = false; 

  form: FormGroup; 
  cpfActive: boolean = false;
  cnpjActive: boolean = false;
 
  formClient: FormGroup; 

  // Dropdown
  selectedStatus: { status: string } | undefined;
  statusSituacao: string = ''
  statuss = [
    { status: "Ativo"},
    { status: "Inativo" },
    { status: "Negativado" }
  ]; 

  // Listar pessoa pelo id_pessoa
  id_pessoa: string = '';
  listarPessoa: PessoaInterface[] = [];

  constructor( 
    private formBuilder: FormBuilder,  
    private toastr: ToastrService,
    private _PessoaService: PessoaService, 
    private _clienteService: ClienteService,
    private router: Router,
    private aRouter: ActivatedRoute
    )  
    {
    this.form = this.formBuilder.group({
      identificacao: ['', Validators.required],
      nome: ['', Validators.required],
      nome_fantasia: [''],
      nome_mae: [''],
      inscricao_municipal: [''],
      inscricao_estadual: [''],
    }); 

    this.formClient = this.formBuilder.group({
      data_cadastro: [''],
      situacao: ['']
    });

    this.id_pessoa = aRouter.snapshot.paramMap.get('id_pessoa') || '';

    // Tem um erro aqui, validar depois
    this.form.get('identificacao')?.valueChanges.subscribe((obsValue) => {
      this.validaIndentificacao(obsValue);
    });
  } 

  ngOnInit(): void {
    this.getPessoa(this.id_pessoa);
    this.getClient(this.id_pessoa);
  }

  getClient(id_pessoa: string) {
    this._clienteService.listClient(id_pessoa).subscribe((resp: Clientinterface) => {
      
      this.formClient.patchValue({
        data_cadastro: resp.data_cadastro,
        situacao: resp.situacao
      })

      this.statusSituacao = resp.situacao;
    })
  }

  // Buscar dados da pessoa com o id_pessoa
  getPessoa(id_pessoa: string){
    this._PessoaService.getOnePessoa(id_pessoa).subscribe((resp: PessoaInterface) => {
      this.form.patchValue({
        nome: resp.nome,
        identificacao: resp.identificacao,
        nome_fantasia: resp.nome_fantasia,
        nome_mae: resp.  nome_mae,
        inscricao_municipal: resp.inscricao_municipal,
        inscricao_estadual: resp.inscricao_estadual,
      })
    })
  }

  validaIndentificacao(value: string): boolean {
    this.cpfActive = value.length === 11;
    this.cnpjActive = value.length === 14;

    if (this.cpfActive) {
        this.form.get('nome')?.valueChanges.subscribe((nomeValue) => {
          if (nomeValue !== '') {
            this.form.get('nome_mae')?.valueChanges.subscribe((nomeValue) => {
              if (nomeValue !== '') {
                this.isSubmitDisabled = false;
              } else {
                this.isSubmitDisabled = true;
              }
            });
          }
        });
    } else if (this.cnpjActive) {
      this.form.get('nome')?.valueChanges.subscribe((nomeValue) => {
        if (nomeValue !== '') {
          this.form.get('nome_fantasia')?.valueChanges.subscribe((nomeValue) => {
            if (nomeValue !== '') {
              this.form.get('inscricao_municipal')?.valueChanges.subscribe((nomeValue) => {
                if (nomeValue !== '') {
                  this.form.get('inscricao_estadual')?.valueChanges.subscribe((nomeValue) => {
                    if (nomeValue !== '') {
                      if (nomeValue !== '') {
                        this.isSubmitDisabled = false;
                      } else {
                        this.isSubmitDisabled = true;
                      }
                    } else {
                      this.isSubmitDisabled = true;
                    }
                  });
                } else{
                  this.isSubmitDisabled = true;
                }
              });
            } else{
              this.isSubmitDisabled = true;
            }
          });
        } else {
          this.isSubmitDisabled = true;
        }
      });
    } else {
      console.log('Identificação inválida:', value);
    }
    return this.cpfActive || this.cnpjActive;
  }

  editPessoa(){
  const pessoa: PessoaInterface = {
      identificacao: this.form.value.identificacao,
      nome: this.form.value.nome,
      nome_fantasia: this.form.value.nome_fantasia,
      nome_mae: this.form.value.nome_mae,
      inscricao_municipal: this.form.value.inscricao_municipal,
      inscricao_estadual: this.form.value.inscricao_estadual,
    };

    this._PessoaService.updatePessoa(this.id_pessoa, pessoa).subscribe(() => {
      this.showSuccess();
      this.isSubmitDisabled = false;
    })

    this.router.navigate([`dashboard/client/location/${this.id_pessoa}`]);
  }

  /* Alerta */
  showSuccess() {
    const options = {
      closeButton: true,
      progressBar: true,
      enableHtml: true,
      timeOut: 2000,
      icon: '<svg class="IConChecked"></svg>',
    };

    this.toastr.success('Cliente editado com sucesso!', undefined, options);
  }
}
