import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent {

  formLogin: any;
  mensaje = '';

  constructor(private fb: FormBuilder, private router: Router) {
    // 👉 Aquí SÍ existe fb, ya se puede usar
    this.formLogin = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const user = this.formLogin.value.usuario;
    const pass = this.formLogin.value.password;

    //metido a chalon
    if (user === 'admin' && pass === 'admin') {
      this.router.navigate(['/clientes/listado']);
    } else {
      this.mensaje = 'Credenciales incorrectas';
    }
  }
}

