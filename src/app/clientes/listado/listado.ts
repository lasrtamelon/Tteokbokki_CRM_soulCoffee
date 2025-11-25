import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService, Cliente } from '../../clientes'; 
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.html',
  styleUrls: ['./listado.css']
})
export class ListadoComponent implements OnInit {

  clientes: any;  
  constructor(
    private clientesService: ClientesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.clientes = this.clientesService.cliente;
  }

  nuevo() {
    this.router.navigate(['/clientes/nuevo']);
  }

  editar(id: number) {
    this.router.navigate(['/clientes/editar', id]);
  }

  eliminar(id: number) {
    if (!confirm('¿Seguro?')) return;

    this.clientesService.borrarCliente(id).subscribe(() => {
      this.clientesService.cliente = toSignal(
        this.clientesService.http.get<Cliente[]>(this.clientesService.apiUrl),
        { initialValue: [] }
      );
    });
  }
}
