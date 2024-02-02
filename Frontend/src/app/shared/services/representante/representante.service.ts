import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { representanteInterface } from '../../model/interfaces/representanteInterface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RepresentanteService {
  getIdRepres(id_representante: string) {
    throw new Error('Method not implemented.');
  }
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint; 
    this.myApiUrl = 'representante/';
  }

  // Buscar lista de representatntes por id_pessoa
  getAllRepresIdPessoa(id_pessoa: string): Observable<representanteInterface[]> {
    return this.http.get<representanteInterface[]>(`${this.myAppUrl}${this.myApiUrl}${id_pessoa}`);
  }

  // Adicionar pessoa
  createRepress(representante: representanteInterface): Observable<any> {
    console.log(this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}`, representante));
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}`, representante)
      .pipe(
        map((response: any) => {
          return response
        }), 
        catchError((error: any) => {
          console.error('Erro na requisição:', error);
          throw error;
        })
      )
  }

  // Deletar pessoas
  deleteRepress(id_representante: string): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id_representante}`);
  }
 
  // Atualizar um representante
  updateRepress(id_representante: string, representante: representanteInterface): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id_representante}`, representante);
  }

   // Buscar dados de um representante pelo id_representante
  getRepressId(id_representante: string): Observable<representanteInterface> {
    return this.http.get<representanteInterface>(`${this.myAppUrl}${this.myApiUrl}edit/${id_representante}`);
  }

  // Buscar dados de um representante pelo id_representante
  getPessoaRepressId(id_pessoa: string): Observable<representanteInterface> {
    console.log(`${this.myAppUrl}${this.myApiUrl}${id_pessoa}`)
    return this.http.get<representanteInterface>(`${this.myAppUrl}${this.myApiUrl}${id_pessoa}`);
  }
  
}  
   