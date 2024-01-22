import { Component, OnInit } from '@angular/core';
import { PessoaInterface } from 'src/app/interfaces/pessoaInterface';
import { PessoaService } from 'src/app/service/pessoa/pessoa.service';
import { ClienteService } from 'src/app/service/cliente/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { Clientinterface } from 'src/app/interfaces/clientinterface';


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'], 
})

export class ClientListComponent implements OnInit {
  listPessoas: PessoaInterface[] = [];
  listClients: Clientinterface[] = [];
  
  
  mostrarBloco: boolean = false;
 
  constructor(
    private _pessoasService: PessoaService,
    private _clienteService: ClienteService,
    private toastr: ToastrService
  ) {} 

  ngOnInit(): void { 
    this.getAllPessoas(); 
  }
 
  
  getAllPessoas() {
    this._pessoasService.getAllPessoas().subscribe((data) => {
      this.listPessoas = data;
      console.log(data)
    });
  }
  
  getAllClientes() {
    this._clienteService.getAllClients().subscribe((data) => {
      this.listClients = data;
      console.log(data)
    })
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  deletePessoa(id_pessoa: string) {
    console.log(id_pessoa)
    this._clienteService.deleteCliente(id_pessoa).subscribe(() => {
      console.log
      this._pessoasService.deletePessoa(id_pessoa).subscribe(() => {
        this.getAllPessoas();
        this.showSuccess();
        this.toggleBlock(); 
      })
      
    })
  } 

  toggleBlock() {
    this.mostrarBloco = !this.mostrarBloco;
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
}
  