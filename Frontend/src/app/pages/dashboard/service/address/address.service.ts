import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnderecoInterface } from 'src/app/shared/model/interfaces/enderecoInterface';
import { environment } from 'src/app/shared/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private myAppUrl: string;
  private myApiUrl: string; 
 
  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'endereco/';
  }

  // Listar todos os endereços
  getAdress(id_pessoa: string): Observable<EnderecoInterface[]> {
    return this.http.get<EnderecoInterface[]>(`${this.myAppUrl}${this.myApiUrl}${id_pessoa}`);
  }
   
  // Cria um endereço
  createAddress(endereco: EnderecoInterface): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}`, endereco)
  }

  getEnderecoId(id_endereco: string): Observable<EnderecoInterface> {
    return this.http.get<EnderecoInterface>(`${this.myAppUrl}${this.myApiUrl}find/${id_endereco}`);
  }
  
  // Deletar um endereço
  deleteAddress(id_endereco: string): Observable<EnderecoInterface>{
    return this.http.delete<EnderecoInterface>(`${this.myAppUrl}${this.myApiUrl}${id_endereco}`);
  }

  // Atualizar um endereço
  updateAdress(id_endereco: string, address: EnderecoInterface): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id_endereco}`, address)
  }

  // Desabilitar todos os is_principal pelo id_pessoa
  desabilitaIsprincipal(id_endereco: string, address: EnderecoInterface): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}isprincipal/${id_endereco}`, address)
  }

}
