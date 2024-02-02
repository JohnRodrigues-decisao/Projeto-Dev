import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clientinterface } from '../../model/interfaces/clientinterface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private myAppUrl: string;
  private myApiUrl: string;


  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'cliente/';
  }

  // Listar cliente
  getAllClients(): Observable<Clientinterface[]> {
    return this.http.get<Clientinterface[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  // Cria cliente
  createCliente(cliente: Clientinterface): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}`, cliente)
  }

  // Listar um cliente
  listClient(id_pessoa: string): Observable<Clientinterface> {
    return this.http.get<Clientinterface>(`${this.myAppUrl}${this.myApiUrl}${id_pessoa}`);
  }

  updateClient(id_cliente: string, cliente: Clientinterface): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id_cliente}`, cliente);
  }

  // Deletar cliente
  deleteCliente(id_pessoa: string): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id_pessoa}`);
  }
}
  