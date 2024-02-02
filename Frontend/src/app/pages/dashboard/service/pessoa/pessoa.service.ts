import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/shared/environments/environment';
import { Observable, catchError, map } from 'rxjs';
import { PessoaInterface } from 'src/app/shared/model/interfaces/pessoaInterface';
import { PessoaClienteInterface } from 'src/app/shared/model/interfaces/PessoaClienteInterface';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;  
    this.myApiUrl = 'pessoa/';
  }
 
  // Adicionar pessoa
  createPessoa(pessoa: PessoaInterface): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}`, pessoa)
    
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

  // Listar todas pessoas
  getAllPessoas(): Observable<PessoaInterface[]> {
    return this.http.get<PessoaInterface[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  // Listar uma pessoa
  getOnePessoa(id_pessoa: string): Observable<PessoaInterface> {
    return this.http.get<PessoaInterface>(`${this.myAppUrl}${this.myApiUrl}${id_pessoa}`);
  }

  // Deletar pessoas
  deletePessoa(id_pessoa: string): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id_pessoa}`);
  }

  // Atualziar pessoas
  updatePessoa(id_pessoa: string, pessoa: PessoaInterface): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id_pessoa}`, pessoa)
  }

  // Listar pessoas e clientes combinaddos
  getAllPessoasClientes(): Observable<PessoaClienteInterface[]> {
    return this.http.get<PessoaClienteInterface[]>(`${this.myAppUrl}${this.myApiUrl}pessoa-cliente`);
  }
}
 