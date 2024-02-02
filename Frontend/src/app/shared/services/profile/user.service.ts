import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserInterface } from '../../model/interfaces/userInterface';
import { ContaInterface } from '../../model/interfaces/contaInterface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string; 
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'conta';
  }

  register(user: UserInterface): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);
  }

  login(user: UserInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>(`${this.myAppUrl}${this.myApiUrl}/login`, user)
    .pipe(
      map(response => {
        return response;
      })
    );
  }

  userStorage(token: string): any{
    const userItem = localStorage.getItem(token);
    return JSON.parse(userItem || '');
  }

  // listar dados do usuário
  getUserService(id_conta: string): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${this.myAppUrl}${this.myApiUrl}/edit-login/${id_conta}`); 
  }

  // Atualizar o usuário
  updateUser(id_conta: string, conta: ContaInterface): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/edit-login/${id_conta}`, conta)
  }

}
 