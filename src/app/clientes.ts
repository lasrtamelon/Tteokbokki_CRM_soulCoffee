import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

// MODELO
export interface Cliente {
  id: number;
  nombre: string;
  apellido1: string;
  apellido2: string;
  email: string;
  telefono: string;
  direccion: string;
  poblacion: string;
  codigo_postal: number;
  pais: string;
}
//SERVICIO INYECTABLE
@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  getClientes() {
    throw new Error('Method not implemented.');
  }
  //ruta de la api
  public apiUrl = 'http://localhost:8080/api/clientes';
  cliente;

  // CONSTRUCTOR
  constructor(public http: HttpClient) {

  // SIGNAL PRINCIPAL
    this.cliente = toSignal(
    this.http.get<Cliente[]>(this.apiUrl).pipe(map(data => data)),
    { initialValue: [] }
  );
  }

  // SIGNAL DE CLIENTE POR ID
  clienteById(id: number) {
    return toSignal(
      this.http.get<Cliente>(`${this.apiUrl}/${id}`),
      { initialValue: undefined }
    );
  }

crearCliente(cliente: Cliente) {
  return this.http.post(this.apiUrl, cliente).pipe(
    tap(() => this.recargarLista())   // 👈 actualizamos el signal
  );
}


  actualizarCliente(id: number, cliente: Cliente) {
    return this.http.put(`${this.apiUrl}/${id}`, cliente);
  }

borrarCliente(id: number) {
  return this.http.delete(`${this.apiUrl}/${id}`).pipe(
    tap(() => this.recargarLista())
  );
}

recargarLista() {
  this.cliente = toSignal(
    this.http.get<Cliente[]>(this.apiUrl),
    { initialValue: [] }
  );
}

}
