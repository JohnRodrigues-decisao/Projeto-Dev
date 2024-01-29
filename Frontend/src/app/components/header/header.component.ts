import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserInterface } from 'src/app/interfaces/userInterface';
import { UserService } from 'src/app/service/profile/user.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
}) 


export class HeaderComponent implements OnInit {
  private cache: { [key: string]: any } = {};

  listUserProfile: UserInterface[]= [];
  
  tokenObj: any;
  idConta: string ='';
  nome_conta: string = '';

  constructor(
    private router: Router,
    private _userInterface: UserService
    ){}

    ngOnInit(): void {
      this.loadingToken();
    
      if (this.idConta !== null) {
        this.getUser(this.idConta);
      } else {
        console.warn('ID da conta é nulo.');
      }

      this.sortLetters(this.nome_conta);
    }

  get<T>(key: string, fetchFn: () => Observable<T>): Observable<T> {
    if (this.cache[key]) {
      return of(this.cache[key]);
    }

    return fetchFn().pipe(
      tap((data) => {
        this.cache[key] = data;
      }),
      catchError((error) => {
        delete this.cache[key]; 
        throw error;
      })
    );
  }

  getUser(id_conta: string){
    this._userInterface.getUserService(id_conta).subscribe((data: UserInterface) => {
      this.listUserProfile = [data];
    })
  }

  loadingToken(): void {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        this.tokenObj = JSON.parse(token);

        if (this.tokenObj && this.tokenObj.id_conta) {
          this.idConta = this.tokenObj.id_conta;
          this.nome_conta = this.tokenObj.nome;
        } else {
          console.warn('ID da conta não encontrado no token');
        }
      } catch (error) {
        console.error('Erro ao analisar o token JSON:', error);
      }
    } else {
      console.warn('Token não encontrado no localStorage');
    }
  }

  sortLetters(nome: string): string {
    const partials = nome.split(' ');

    if(partials.length >= 2) {
    
      return partials[0].charAt(0) + partials[partials.length - 1].charAt(0);
    } else if(partials.length === 1) {
    
      return partials[0].substring(0, 2);
    
    } else{
      return '';
    }
  }

  logout(){
    const confirmation = confirm('Você tem certeza que deseja sair do sistema ?');
    if(confirmation) {
      localStorage.removeItem('token');
      this.router.navigate(['login']);
    }
  }

}
