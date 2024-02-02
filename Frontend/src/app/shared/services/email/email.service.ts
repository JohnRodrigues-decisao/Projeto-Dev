import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailInterface } from '../../model/interfaces/emailInterface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private myAppUrl: string;
  private myApiUrl: string; 
 
  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'email/';
  }

  // Listar todos os endereços
  getEmail(id_pessoa: string): Observable<EmailInterface[]> {
    return this.http.get<EmailInterface[]>(`${this.myAppUrl}${this.myApiUrl}${id_pessoa}`);
  }
   
  // Cria um endereço
  createEmail(email: EmailInterface): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}`, email)
  }

  // listar dados do endereço pelo id_endereco
  getEmailId(id_email: string): Observable<EmailInterface> {
    return this.http.get<EmailInterface>(`${this.myAppUrl}${this.myApiUrl}list/${id_email}`);
  }

  // Deletar um endereço
  deleteEmail(id_email: string): Observable<EmailInterface>{
    return this.http.delete<EmailInterface>(`${this.myAppUrl}${this.myApiUrl}${id_email}`);
  }

  // Atualizar um endereço
  updateEmail(id_email: string, email: EmailInterface): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id_email}`, email)
  }
}
