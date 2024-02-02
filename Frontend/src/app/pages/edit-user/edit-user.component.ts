import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/services/profile/user.service';

import { ContaInterface } from 'src/app/shared/model/interfaces/contaInterface';
import { UserInterface } from 'src/app/shared/model/interfaces/userInterface';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit { 
  listUser: UserInterface[] = [];
  formProfile: FormGroup;
  id_conta: string = '';

  isSubmitDisabled: boolean = true;

  isInputDisabled: boolean = true;
  activeSpan: boolean = false;
  activeInput: boolean = false;
  
  constructor(
    private formbuilder: FormBuilder,
    private aRouter: ActivatedRoute,
    private toastr: ToastrService,
    private _userService: UserService
  ) {
    this.formProfile = this.formbuilder.group({
      id_conta: [''],
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      currentPassword: ['', [Validators.required]],
      newPassword: [''],
      repeatPassword: [''],
      checkBoxControl: [true],
    })

    this.id_conta = aRouter.snapshot.paramMap.get('id_conta') || '';
    this.formProfile.get('currentPassword')?.disable();
    this.formProfile.get('newPassword')?.disable();
    this.formProfile.get('repeatPassword')?.disable();
    
    this.formProfile.get('newPassword')?.valueChanges.subscribe(() => {
      this.validatePassword();
    });

    this.formProfile.get('repeatPassword')?.valueChanges.subscribe(() => {
      this.validatePassword();
    });
  }
 
  ngOnInit(): void {
    this.getUserProfile(this.id_conta);
  } 

  inputNomeChange(){
    console.log('nome');
    this.isSubmitDisabled = false;
  }

  inputEmailChange(){
    this.isSubmitDisabled = false;    
    console.log('email');
  }

  validatePassword() {
    const newPassword = this.formProfile.get('newPassword')?.value;
    const repeatPassword = this.formProfile.get('repeatPassword')?.value;
    
  
    if (repeatPassword) {
      if (newPassword !== repeatPassword) {
        this.formProfile.get('repeatPassword')?.setErrors({ customError: true });
        this.activeSpan = true;
        this.activeInput = true;
        this.isSubmitDisabled = true;
      }else {
        this.activeSpan = false;
        this.activeInput = false;
        this.isSubmitDisabled = false;
      }

    }
    if(newPassword === ''  && repeatPassword === '' ) {
      this.activeSpan = false;
      this.activeInput = false;
    } 
  }

  toggleInput(){
    this.isInputDisabled = !this.isInputDisabled;
    this.isSubmitDisabled = true;
    
    if (this.isInputDisabled === false) {  
      this.formProfile.get('currentPassword')?.enable();
      this.formProfile.get('newPassword')?.enable();
      this.formProfile.get('repeatPassword')?.enable();


    } else {
      this.formProfile.get('currentPassword')?.disable();
      this.formProfile.get('newPassword')?.disable();
      this.formProfile.get('repeatPassword')?.disable();
    }
  }

  getUserProfile(id_conta: string) {
    this._userService.getUserService(id_conta).subscribe((resp: UserInterface) => {
      this.listUser = [resp];
      this.formProfile.patchValue({
        nome: resp.nome,
        email: resp.email
      })
    })
  }

  updateUserProfile(){
    const conta: ContaInterface = {
      nome: this.formProfile.value.nome,
      email: this.formProfile.value.email,
      senha: this.formProfile.value.senha,
      currentPassword: this.formProfile.value.currentPassword,
      newPassword: this.formProfile.value.newPassword
    }
    
    this._userService.updateUser(this.id_conta, conta).subscribe(
    () => {
      this.showSuccess();
    }, () => {
      this.alertErrorTellAdd();
    })
  }

  showSuccess() {
    const options = {
      closeButton: true,
      progressBar: true,
      enableHtml: true,
      timeOut: 2000,
      icon: '<svg class="IConChecked"></svg>',
    };

    this.toastr.success('Usuário editado com sucesso!', undefined, options);
  }

  alertErrorTellAdd() {
    const options = {
      closeButton: true,
      progressBar: true,
      enableHtml: true,
      icon: '<svg class="IConChecked"></svg>',
    };

    this.toastr.error('Erro: Senha atual inválida.', undefined, options);
  }
}
   