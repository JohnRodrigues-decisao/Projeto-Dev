import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/interfaces/userInterface';
import { ErrorService } from 'src/app/service/profile/error.service';
import { UserService } from 'src/app/service/profile/user.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userName: string = '';
  userEmail: string = '';
  userPassword: string = '';
  confirmPassword: string = '';

  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private __userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  /* Adicionar um novo usuário */
  addUser() {
    // Validar se os valores estão corretos
    if (
      this.userName == '' ||
      this.userEmail == '' ||
      this.userPassword == '' ||
      this.confirmPassword == ''
    ) {
      this.toastr.error('Todos os campos são obrigatórios!');
      return;
    }

    // Validar se o e-mail é válido
    if (!this.validarEmail()) {
      this.toastr.error('E-mail inválido!');
      return;
    }

    // Validar se as senhas são iguais
    if (this.userPassword != this.confirmPassword) {
      this.toastr.error('As senhas devem ser iguais');
      return;
    }

    // Criar o objeto
    const user: UserInterface = {
      nome: this.userName,
      email: this.userEmail,
      senha: this.userPassword,
    };

    this.loading = true;
    this.__userService.register(user).subscribe({
      next: (v) => {
        this.loading = false;
        this.showSuccess();
        this.router.navigate(['/login']);
      },
      error: () => {
        this.loading = false;
        this.showError();
      },
    });
  }

  // Função para validar o e-mail
  validarEmail(): boolean {
    // Padrão de expressão regular para validar e-mails
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Testa se o e-mail corresponde ao padrão
    return emailRegex.test(this.userEmail);
  }

  /* Alert sucesso */
  showSuccess() {
    const options = {
      closeButton: true,
      progressBar: true,
      enableHtml: true,
      icon: '<svg class="IConChecked"></svg>',
    };

    this.toastr.success('Usuário cadastrado com sucesso!', undefined, options);
  }

  showError() {
    const options = {
      closeButton: true,
      progressBar: true,
      enableHtml: true,
      icon: '<svg class="IConChecked"></svg>',
    };

    this.toastr.error('O usuário já existe!', undefined, options);
  }
}
