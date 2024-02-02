import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PessoaService } from '../../service/pessoa/pessoa.service';
import { PessoaInterface } from 'src/app/shared/model/interfaces/pessoaInterface';
import { Clientinterface } from 'src/app/shared/model/interfaces/clientinterface';
import { ClienteService } from '../../service/cliente/cliente.service';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.scss'],
})

export class ClientAddComponent implements OnInit {
  listClientes: Clientinterface[] = [];
  isSubmitDisabled: boolean = true;

  form: FormGroup; 
  cpfActive: boolean = false; 
  cnpjActive: boolean = false;

  constructor( 
    private formBuilder: FormBuilder,  
    private toastr: ToastrService,
    private _PessoaService: PessoaService, 
    private _clienteService: ClienteService,
    private router: Router
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
    this.form.get('identificacao')?.valueChanges.subscribe((obsValue) => {
      this.validaIndentificacao(obsValue);
    });
  } 

  ngOnInit(): void {}

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

  addPessoa() {
    const pessoa: PessoaInterface = {
      identificacao: this.form.value.identificacao,
      nome: this.form.value.nome,
      nome_fantasia: this.form.value.nome_fantasia,
      nome_mae: this.form.value.nome_mae,
      inscricao_municipal: this.form.value.inscricao_municipal,
      inscricao_estadual: this.form.value.inscricao_estadual,
    };

    if (this.validaIndentificacao(this.form.value.identificacao)) {

      this._PessoaService.createPessoa(pessoa).subscribe(
        (response) => {
          const cliente: Clientinterface = {
            situacao: 'Ativo',
            id_pessoa: response
          }

          this._clienteService.createCliente(cliente).subscribe(
            (clienteResponse) => {
              this.form.reset();
              this.showSuccess();
              return clienteResponse;
            },
            (clienteError) => {
              console.error('Erro ao adicionar cliente:', clienteError)
            }
          )

          this.router.navigate([`/dashboard/client/edit/${response}`]);
        },   (error) => {
          console.error('Erro ao desabilitar is_principal:', error);
    

          this.showError()
        }
      );

    } else {
      console.log('Não foi possivel realizar o cadastro');
    }
  }
 
  showSuccess() {
    const options = {
      closeButton: true,
      progressBar: true,
      enableHtml: true,
      timeOut: 2000,
      icon: '<svg class="IConChecked"></svg>',
    };

    this.toastr.success('Cliente cadastrado com sucesso!', undefined, options);
  }

  showError() {
    const options = {
      closeButton: true,
      progressBar: true,
      enableHtml: true,
      icon: '<svg class="IConChecked"></svg>',
    };

    this.toastr.error('Erro: Cliente duplicados!', undefined, options);
  }
  
}
