import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmailInterface } from 'src/app/shared/model/interfaces/emailInterface';
import { EnderecoInterface } from 'src/app/shared/model/interfaces/enderecoInterface';
import { TelefoneInterface } from 'src/app/shared/model/interfaces/telefoneInterface';

import { AddressService } from 'src/app/shared/services/address/address.service';
import { TelefoneService } from 'src/app/shared/services/telefone/telefone.service';

import { EmailService } from 'src/app/shared/services/email/email.service';

@Component({
  selector: 'app-client-location',
  templateUrl: './client-location.component.html',
  styleUrls: ['./client-location.component.scss'],
})

export class ClientLocationComponent implements OnInit {

  // Endereço
  formEndereco: FormGroup;
  id_pessoa: string = '';
  listEndereco: EnderecoInterface[] = [];
  modalAddEndereco: boolean = false;
  modalEditEndereco: boolean = false;
  modalDeleteEndereco: boolean = false;
  isPrincipalChecked: boolean = false;
  formEnderecoEdit: FormGroup;
  idEndereco: string = '';
  listEnderecoEdit: EnderecoInterface[] = [];
  
  // Telefone
  formTell: FormGroup;
  listTelefone: TelefoneInterface[] = []
  isPrincipalCheckedTell: boolean = false;
  modalAddTellBox: boolean = false;
  modalEditTellBox: boolean = false;
  idTelefone: string = '';
  id_telefone: string = '';
  modalDeleteTell: boolean = false;
  formTellEdit: FormGroup;
  listTellEdit: TelefoneInterface[] = [];  
  
  // Email
  modalAddEmailBox: boolean = false;
  formEmail: FormGroup;
  listEmail: EmailInterface[] = [];
  idEmail: string = '';
  modalDeleteemail: boolean = false;
  formEmailEdit: FormGroup;
  modalEditEmailBox: boolean = false;
  listEmailEdit: EmailInterface[] = [];

  constructor(
    private aRouter: ActivatedRoute,
    private _addressService: AddressService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _telefoneService: TelefoneService,
    private cdr: ChangeDetectorRef,
    private _emailService: EmailService
    
  ) {
    this.id_pessoa = aRouter.snapshot.paramMap.get('id_pessoa') || '';

    // Adicionar e editar endereço 
    this.formEndereco = this.formBuilder.group({
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      is_principal: ['']
    });

    // Editar um endereço
    this.formEnderecoEdit = this.formBuilder.group({
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      is_principal: ['']
    });

    // Adicionar telefone
    this.formTell = this.formBuilder.group({ 
      numero: ['', Validators.required],
      is_principal: [''],
    });

    // Editar telefone
    this.formTellEdit = this.formBuilder.group({ 
      numero: ['', Validators.required],
      is_principal: [''],
    })

    // Adicionar um email 
    this.formEmail = this.formBuilder.group({
      email: ['', Validators.required],
      is_principal: false,
      id_pessoa: ['']
    })

    // Editar um email 
    this.formEmailEdit = this.formBuilder.group({
      email: ['', Validators.required],
      is_principal: false,
      id_pessoa: ['']
    })
  }
  
  ngOnInit(): void { 
    this.getAllEnderecos(this.id_pessoa);
    this.validaCheckboxAddEndereco();

    this.getAllTell(this.id_pessoa);

    this.getAllEmail(this.id_pessoa);
  }

  /* listar dados de um endereço pelo id_pessoa */
  getAllEnderecos(id_pessoa: string) {
    this._addressService.getAdress(id_pessoa).subscribe(
      (data) => {
        this.listEndereco = data;
      },
      (error) => {
        console.error("Erro ao obter endereços:", error);
      }
    );
  }
  
  characterLimits() {
    const address = {
      cep: '1234dfsfsdfsdfsd567890'
    };
    const truncatedCep = address.cep.length > 10 ? address.cep.slice(0, 10) + '...' : address.cep;
  }
  
  /* Adicionar um novo endereço */
  validaCheckboxAddEndereco() {
    this.formEndereco.get('is_principal')?.valueChanges.subscribe((value) => {
      this.isPrincipalChecked = value;
    });
  }
  
  addEndereco() {
    const endereco: EnderecoInterface = {
      cep: this.formEndereco.value.cep,
      numero: this.formEndereco.value.numero,
      bairro: this.formEndereco.value.bairro,
      logradouro: this.formEndereco.value.logradouro,
      complemento: this.formEndereco.value.complemento,
      cidade: this.formEndereco.value.cidade,
      estado: this.formEndereco.value.estado,
      is_principal: this.isPrincipalChecked,
      id_pessoa: this.id_pessoa
    }
  
    this._addressService.desabilitaIsprincipal(this.id_pessoa, endereco).subscribe(
      () => {
        console.log('Todos os is_principais desativados!!!');
          this._addressService.createAddress(endereco).subscribe(
          (data) => {
            this.getAllEnderecos(this.id_pessoa);
            this.alertSuccessEnderecoAdd();
            this.showAddEndereco();
            console.log('Endereço adicionado!', data);
          },
          (error) => {
            console.error('Erro ao adicionar endereço:', error);
              this.alertErrorEnderecoAdd();
          }
        );

      },
      (error) => {
        console.error('Erro ao desabilitar is_principal:', error);
        this.alertErrorEnderecoAdd()
      }
    );
    this.getAllEnderecos(this.id_pessoa);
  }

  editEndereco() {
    const endereco: EnderecoInterface = {
      cep: this.formEnderecoEdit.value.cep,
      numero: this.formEnderecoEdit.value.numero,
      bairro: this.formEnderecoEdit.value.bairro,
      logradouro: this.formEnderecoEdit.value.logradouro,
      complemento: this.formEnderecoEdit.value.complemento,
      cidade: this.formEnderecoEdit.value.cidade,
      estado: this.formEnderecoEdit.value.estado,
      is_principal: this.formEnderecoEdit.value.is_principal,
      id_pessoa: this.id_pessoa
    }
  
    this._addressService.updateAdress(this.idEndereco, endereco).subscribe(
      () => {
      this.alertSuccessEnderecoEdit();
      this.getAllEnderecos(this.id_pessoa);
      this.showEditEnderecoSid();
      },
      (error) => {
        console.error('Erro ao desabilitar is_principal:', error);
        this.alertErrorEnderecoAdd()
      }
    );

    console.log(this.formEndereco.value);

  }

  deleteEndereco() {
    this._addressService.deleteAddress(this.idEndereco).subscribe(() => {
      this.showDeleteEnderecoId();
      this.getAllEnderecos(this.id_pessoa);
      this.alertSuccessEnderecoDelete();
    })
  }

// Telefone
  getAllTell(id_pessoa: string){
    this._telefoneService.getAllTelefonesId(id_pessoa).subscribe(
      (data) => {
        this.listTelefone = data;
      },
      (error) => {
        console.error("Erro ao obter endereços:", error);
      }
    );
  }

  formatarTelefone(numero: string): string {
    const numeroLimpo = numero.replace(/\D/g, ''); 

    if (numeroLimpo.length <= 10) {
      return `(${numeroLimpo.slice(0, 2)}) ${numeroLimpo.slice(2, 6)}-${numeroLimpo.slice(6, 10)}`;
    } else {
      return `(${numeroLimpo.slice(0, 2)}) 9${numeroLimpo.slice(2, 7)}-${numeroLimpo.slice(7, 11)}`;
    }
  }

  addTell() {
    const telefone: TelefoneInterface ={ 
      numero: this.formTell.value.numero, 
      is_principal: this.isPrincipalCheckedTell,
      id_pessoa: this.id_pessoa
    }

    this._telefoneService.desabilitaIsprincipal(this.id_pessoa, telefone).subscribe(
      () => {
        console.log('Todos os is_principais desativados!!!');
        this._telefoneService.createTelefone(telefone).subscribe(
          (data) => {
            console.log('Telefone adicionado!', data);
            this.getAllTell(this.id_pessoa);
            this.alertSuccessTellAdd();
            this.formTell.reset();
          },
          (error) => {
            console.error('Erro ao adicionar o telefone:', error);
            this.alertErrorTellAdd();
          }
        );
      },
      (error) => {
        console.error('Erro ao desabilitar is_principal:', error);
      }
    );

    this.getAllTell(this.id_pessoa)
  }

  editTell() {
    if (this.id_telefone) {
      const telefone: TelefoneInterface ={ 
        numero: this.formTellEdit.value.numero, 
        is_principal: this.formTellEdit.value.is_principal,
        id_pessoa: this.id_pessoa
      }
  
      console.log(this.id_pessoa)
      console.log(this.id_telefone)
  
      this._telefoneService.updateTelefone(this.id_telefone, telefone).subscribe(
        () => {
          this.alertSuccessTellEditado();
          this.getAllTell(this.id_pessoa);
          this.showTellEdit();
        },
        (error) => {
          console.error('Erro ao desabilitar is_principal:', error);
        }
      );
    } else {
      console.error('ID do telefone não definido.');
    }
  }
  
  deleteTell(){
    this._telefoneService.deleteTelefone(this.idTelefone).subscribe(() => {
      this.getAllTell(this.id_telefone)
      this.showDeleteTelefone(this.id_telefone);
      this.modalDeleteEndereco = false;
      this.alertSuccessTellDelete();
    })
  }

// Email
  getAllEmail(id_pessoa: string) {
    this._emailService.getEmail(id_pessoa).subscribe(
      (data) => {
        this.listEmail = data;
        console.log(data)
      },
      (error) => {
        console.error("Erro ao obter endereços:", error);
      }
    );
  }

  addEmail(){
    const email: EmailInterface = {
      email: this.formEmail.value.email,
      is_principal: this.formEmail.value.is_principal,
      id_pessoa: this.id_pessoa
    }

    this._emailService.createEmail(email).subscribe(
      () => {
        this.alertSuccessEmailAdd();
        this.formEmail.reset();
        this.getAllEmail(this.id_pessoa);
      },
      (error) => {
        console.error('Erro ao adicionar o email:', error);
      }
    )

    this.getAllEmail(this.id_pessoa);
  }

  deleteEmail(){
    console.log(this.idEmail)
    this._emailService.deleteEmail(this.idEmail).subscribe(
      (data) => {
        this.getAllEmail(this.id_pessoa);
        console.log(data)
        this.modalDeleteemail = !this.modalDeleteemail;
      },
      (error) => {
        console.error('Erro ao deletar o email:', error);
      }
    )
  }

  editEmail() {
    if (this.idEmail) {
      const email: EmailInterface = {
        email: this.formEmailEdit.value.email,
        is_principal: this.formEmailEdit.value.is_principal,
        id_pessoa: this.id_pessoa  
      };
        
      this._emailService.updateEmail(this.idEmail, email).subscribe(
        () => {
          this.getAllTell(this.id_pessoa);
          this.alertSuccessEnderecoEdit();
          this.getAllEmail(this.id_pessoa);
          this.formEmailEdit.reset()
        },
        (error) => {
          console.error('Erro ao desabilitar is_principal:', error);
        }
      );
      this.getAllTell(this.id_pessoa);
    } else {
      console.error('ID do Email não definido.');
    }
  }

  showEmailEdit(id_email: string) {
    this.idEmail = id_email;
    console.log(id_email);
    this.modalEditEmailBox = !this.modalEditEmailBox;
  
    this._emailService.getEmailId(id_email).subscribe((resp) => {
      if (resp) { 
        this.listEmail = [resp];
  
        this.formTellEdit.patchValue({
          email: resp.email || '', 
          is_principal: resp.is_principal || false, 
          id_pessoa: this.id_pessoa
        });
        
      }
    });
  }
  
  showDeleteEmail(id_email: string) {
    this.idEmail = id_email;
    this.modalDeleteemail = !this.modalDeleteemail;
  }
  
  showDeleteEmailId() {
    this.modalDeleteemail = !this.modalDeleteemail;
  }

  showEditEmail(id_email: string){
    this._emailService.getEmailId(id_email).subscribe((resp) => {
      this.listEmailEdit = [resp];
    })
  }

  /* Submit */

  /* Show endereço */
  showAddEndereco(){
    this.modalAddEndereco = !this.modalAddEndereco;
    console.log(this.isPrincipalChecked)

    
    if(this.listEndereco.length === 0) {
      console.log('batmanLouco');
      this.formEndereco.get('is_principal')?.disable();
      this.isPrincipalChecked = true;

    } else{
      console.log('jiraiaaaaaaaaaaaaaaaaaaaaa')
      this.formEndereco.get('is_principal')?.enable(); 
      this.isPrincipalChecked = false;
    }

  }

  showEditEndereco(id_endereco: string){
    this.idEndereco = id_endereco;
    this.modalEditEndereco = !this.modalEditEndereco;

    this._addressService.getEnderecoId(id_endereco).subscribe((resp) => {
      this.listEnderecoEdit = [resp];
      this.formEnderecoEdit.patchValue({
        cep: resp.cep,
        numero: resp.numero,
        bairro: resp.bairro,
        logradouro: resp.logradouro,
        complemento: resp.complemento,
        cidade: resp.cidade,
        estado: resp.estado,
        is_principal: resp.is_principal,
        id_pessoa: this.id_pessoa
      });
    })
  }
  
  showEditEnderecoSid(){
    this.modalEditEndereco = !this.modalEditEndereco;
  }

  showDeleteEnderecoId(){
    this.modalDeleteEndereco = !this.modalDeleteEndereco;
  }

  showDeleteEndereco(id_endereco: string){
    this.idEndereco = id_endereco;
    this.modalDeleteEndereco = !this.modalDeleteEndereco;
  }

  /* Show telefone */
  showAddTelefone(){
    this.modalAddTellBox = !this.modalAddTellBox;
    this.formTell.reset();
  }

  showEditTelefone(id_telefone: string) {
    this.id_telefone = id_telefone; 
    this.modalEditTellBox = !this.modalEditTellBox;
  
    this._telefoneService.getListDadosTelefone(id_telefone).subscribe((resp) => {
      this.listTellEdit = [resp];
  
      this.formTellEdit.patchValue({
        numero: resp.numero, 
        is_principal: resp.is_principal,
        id_pessoa: this.id_pessoa
      })
      this.getAllEmail(this.id_pessoa);
    });
    this.getAllEmail(this.id_pessoa);
  }

  showDeleteTelefoneId(){
    this.modalDeleteTell = !this.modalDeleteTell;
  }

  showDeleteTelefone(id_telefone: string){
    this.idTelefone = id_telefone;
    console.log(id_telefone);
    this.showDeleteTelefoneId();
  }

  showTellEdit(){
    this.modalEditTellBox = !this.modalEditTellBox;
    this.getAllEmail(this.id_pessoa);
  }

  showAddEmail() {
    if (!this.modalEditEmailBox) {
      this.modalAddEmailBox = !this.modalAddEmailBox;
      this.modalEditEmailBox = false;
    }
  }
  
  showEmailEditId() {
    if (!this.modalAddEmailBox) {
      this.modalEditEmailBox = !this.modalEditEmailBox;
      this.modalAddEmailBox = false;
    }
  }
  
  // Alerts
  
  /* Endereço */
  alertErrorEnderecoAdd() {
    const options = {
      closeButton: true,
      progressBar: true,
      enableHtml: true,
      icon: '<svg class="IConChecked"></svg>',
    };

    this.toastr.error('Erro: Endereço duplicados!', undefined, options);
  }

  alertSuccessEnderecoAdd() {
    const options = {
      closeButton: true,
      progressBar: true,
      enableHtml: true,
      timeOut: 2000,
      icon: '<svg class="IConChecked"></svg>',
    };

    this.toastr.success('Endereço adicionado com sucesso!', undefined, options);
  }

  alertSuccessEnderecoDelete() {
    const options = {
      closeButton: true,
      progressBar: true,
      enableHtml: true,
      timeOut: 2000,
      icon: '<svg class="IConChecked"></svg>',
    };

    this.toastr.success('Endereço excluído com sucesso!', undefined, options);
  }

  // alertSuccessEnderecoDelete() {
  //   const options = {
  //     closeButton: true,
  //     progressBar: true,
  //     enableHtml: true,
  //     icon: '<svg class="IConChecked"></svg>',
  //   };

  //   this.toastr.error('Endereço excluído com sucesso!', undefined, options);
  // }

  alertSuccessEnderecoEdit() {
    const options = {
      closeButton: true,
      progressBar: true,
      enableHtml: true,
      timeOut: 2000,
      icon: '<svg class="IConChecked"></svg>',
    };

    this.toastr.success('Endereço editado com sucesso!', undefined, options);
  }

  /* Telefone */
  alertSuccessTellAdd() {
    const options = {
      closeButton: true,
      progressBar: true,
      enableHtml: true,
      timeOut: 2000,
      icon: '<svg class="IConChecked"></svg>',
    };

    this.toastr.success('Telefone adicionado com sucesso!', undefined, options);
  }

  alertSuccessTellEditado() {
    const options = {
      closeButton: true,
      progressBar: true,
      enableHtml: true,
      timeOut: 2000,
      icon: '<svg class="IConChecked"></svg>',
    };

    this.toastr.success('Telefone editado com sucesso!', undefined, options);
  }

  alertSuccessTellDelete() {
    const options = {
      closeButton: true,
      progressBar: true,
      enableHtml: true,
      timeOut: 2000,
      icon: '<svg class="IConChecked"></svg>',
    };

    this.toastr.success('Telefone deletado com sucesso!', undefined, options);
  }

  alertErrorTellAdd() {
    const options = {
      closeButton: true,
      progressBar: true,
      enableHtml: true,
      icon: '<svg class="IConChecked"></svg>',
    };

    this.toastr.error('Erro: Cliente duplicados!', undefined, options);
  }

  /* Email */

  alertSuccessEmailAdd() {
    const options = {
      closeButton: true,
      progressBar: true,
      enableHtml: true,
      timeOut: 2000,
      icon: '<svg class="IConChecked"></svg>',
    };

    this.toastr.success('Email adicionado com sucesso!', undefined, options);
  }

  alertSuccessEmailEditado() {
    const options = {
      closeButton: true,
      progressBar: true,
      enableHtml: true,
      timeOut: 2000,
      icon: '<svg class="IConChecked"></svg>',
    };

    this.toastr.success('Email editado com sucesso!', undefined, options);
  }

}