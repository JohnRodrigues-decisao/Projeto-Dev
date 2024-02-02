import { HttpErrorResponse } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserInterface } from 'src/app/shared/model/interfaces/userInterface';
import { ErrorService } from 'src/app/shared/services/profile/error.service';
import { UserService } from 'src/app/shared/services/profile/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userEmail: string = '';
  userPassword: string = '';
  savePassword: boolean = false;
  loading: boolean = false;

  typeInput: string = 'password';

  constructor(
    private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService
  ) {}

  ngOnInit(): void {
    if (this.savePassword) {
      localStorage.setItem('savedUsername', this.userEmail);
      localStorage.setItem('savedPassword', this.userPassword);
    }
  }

  login() {
    if (this.userEmail == '' || this.userPassword == '') {
      this.toastr.error('Todos os campos são obrigatótios!');
      return;
    }

    const user: UserInterface = {
      email: this.userEmail,
      senha: this.userPassword,
    };

    this.loading = true;

    this._userService.login(user).subscribe({
      next: (token) => {
        localStorage.setItem('token', JSON.stringify(token));
        this.router.navigate(['/dashboard']);
      },
      error: (e: HttpErrorResponse) => {
        this.showError();
        this.loading = false;
      },
    });
  }

  toggleInputType() {
    this.typeInput = this.typeInput === 'text' ? 'password' : 'text';
  }

  showError() {
    const options = {
      closeButton: true,
      progressBar: true,
      enableHtml: true,
      icon: '<svg class="IConChecked"></svg>',
    };

    this.toastr.error('Usuário inexistente!', undefined, options);
  }

}
