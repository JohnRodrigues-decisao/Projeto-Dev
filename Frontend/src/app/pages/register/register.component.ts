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
    if (
      this.userName == '' ||
      this.userEmail == '' ||
      this.userPassword == '' ||
      this.confirmPassword == ''
    ) {
      this.toastr.error('Todos os campos são obrigatórios!');
      return;
    }

    if (!this.validarEmail()) {
      this.toastr.error('E-mail inválido!');
      return;
    }

    if (this.userPassword != this.confirmPassword) {
      this.toastr.error('As senhas devem ser iguais');
      return;
    }

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
