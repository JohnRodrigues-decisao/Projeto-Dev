import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, catchError, map } from 'rxjs';
import { TelefoneInterface } from '../../model/interfaces/telefoneInterface';

@Injectable({ 
  providedIn: 'root'
})
export class TelefoneService implements OnInit{
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint; 
    this.myApiUrl = 'telefone/';
  }

  ngOnInit(): void {}

  // Listar
  getAllTelefonesId(id_pessoa: string): Observable<TelefoneInterface[]> {
    return this.http.get<TelefoneInterface[]>(`${this.myAppUrl}${this.myApiUrl}${id_pessoa}`);
  }

  // Listar 
  getOneTelefonesId(id_telefone: string): Observable<TelefoneInterface> {
    return this.http.get<TelefoneInterface>(`${this.myAppUrl}${this.myApiUrl}${id_telefone}`);
  }

  // Listar dados do telefone
  getListDadosTelefone(id_telefone: string): Observable<TelefoneInterface> {
    return this.http.get<TelefoneInterface>(`${this.myAppUrl}${this.myApiUrl}list/${id_telefone}`);
  }


  // Criar
  createTelefone(telefone: TelefoneInterface): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, telefone)
  }

  // Atualizar
  updateTelefone(id_telefone: string, telefone: TelefoneInterface): Observable<void> {
    console.log(`URL da solicitação: ${this.myAppUrl}${this.myApiUrl}${id_telefone}`);
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id_telefone}`, telefone)
  }

  // Deletar pessoas
  deleteTelefone(id_telefone: string): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id_telefone}`);
  }

  // Desabilitar todos os is_principal pelo id_pessoa
  desabilitaIsprincipal(id_telefone: string, telefone: TelefoneInterface): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}isprincipal/${id_telefone}`, telefone)
  }
}
