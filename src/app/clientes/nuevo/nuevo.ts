import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesService, Cliente } from '../../clientes';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.html',
  styleUrls: ['./nuevo.css'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class NuevoComponent {

  // FORMULARIO REACTIVO
  form = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido1: new FormControl('', Validators.required),
    apellido2: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    poblacion: new FormControl('', Validators.required),
    codigo_postal: new FormControl(0, Validators.required),
    pais: new FormControl('', Validators.required)
  });

  constructor(
    private clientesService: ClientesService,
    private router: Router
  ) {}

  crear() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const cliente: Cliente = this.form.value as Cliente;

    this.clientesService.crearCliente(cliente).subscribe({
      next: () => this.router.navigate(['/clientes/listado']),
      error: err => console.error('ERROR AL CREAR', err)
    });
  }
  
}
