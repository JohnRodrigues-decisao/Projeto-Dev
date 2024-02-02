import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { PessoaService } from 'src/app/shared/services/pessoa/pessoa.service';
import { ClienteService } from 'src/app/shared/services/cliente/cliente.service';
import { PessoaClienteInterface } from 'src/app/shared/model/interfaces/PessoaClienteInterface';
import { RepresentanteService } from 'src/app/shared/services/representante/representante.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'], 
})

export class ClientListComponent implements OnInit {
  listPessoaClient: PessoaClienteInterface[] = [];
  mostrarBloco: boolean = false;

  showDeletePessoa: boolean = false;
 
  constructor(
    private _pessoasService: PessoaService,
    private _clienteService: ClienteService,
    private _representanteService: RepresentanteService,
    private router: Router,
    private toastr: ToastrService
  ) {} 

  ngOnInit(): void {  
    this.getAllPessoasClientes();
  }
 
  getAllPessoasClientes() {
    this._pessoasService.getAllPessoasClientes().subscribe(
      (data) => {
        this.listPessoaClient = data;
      },
      (error) => {
        console.error('Erro na chamada à API:', error);
      }
    );  
  }
  
  deletePessoa(id_pessoa: string) {
    // Armazena o valor do id_pessoa antes da exclusão
    console.log(id_pessoa)
  
    // this._representanteService.getPessoaRepressId(this.id_pessoa).subscribe( 
    //   (resp: any) => {
    //     if(resp.length === 0) {
    //       console.log('igual a 0');
    //       this.getAllPessoasClientes();
  
          this._clienteService.deleteCliente(id_pessoa).subscribe(() => {
            this._pessoasService.deletePessoa(id_pessoa).subscribe(() => {
            })              
            this.alterDeletePessoa();
            this.getAllPessoasClientes();      
            this.showSuccess()        
          });

          /* 
            deleteRepress(id_representante: string) {
              this._representanteService.deleteRepress(id_representante).subscribe(() => {
                this.showDeleteRepress();
                this.getAllRepresIdPessoa(this.id_pessoa);
                this.showSuccessDelete();
              })     
            } 
          */


    //     } else {
    //       console.log('maior que 0');
    //       alert('Não é possível deletar porque tem representante cadastrado.');
    //       this.getAllPessoasClientes();
    //       this.toggleBlock();
    //     }
    //   }
    // );
  }
  
  

  formatarCpfCnpj(identificacao: string): string {
    if (!identificacao) return identificacao;

    const cleanedValue = identificacao.replace(/\D/g, '');

    if (cleanedValue.length === 11) {
      return this.formatarCpf(cleanedValue);
    } else if (cleanedValue.length === 14) {
      return this.formatarCnpj(cleanedValue);
    } else {
      return identificacao;
    }
  }

  private formatarCpf(value: string): string {
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  private formatarCnpj(value: string): string {
    return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }


  alterDeletePessoa() { 
    this.showDeletePessoa = !this.showDeletePessoa
  }
  
  showSuccess() {
    const options = {
      closeButton: true,
      progressBar: true, 
      enableHtml: true,
      timeOut: 2000,
      icon: '<svg class="IConChecked"></svg>',
    };

    this.toastr.success('Cliente excluído com sucesso!', undefined, options);
  }

  showErrorDelete() {
    const options = {
      closeButton: true,
      progressBar: true,
      enableHtml: true,
      icon: '<svg class="IConChecked"></svg>',
    };

    this.toastr.error('Erro ao excluir, existem representantes cadastrados.', undefined, options);
  }
}
  