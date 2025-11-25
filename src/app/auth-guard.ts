import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const logged = localStorage.getItem('usuario');

    if (logged) {
      return true; // Usuario autenticado
    }

    // No autenticado → redirigir al login
    this.router.navigate(['/login']);
    return false;
  }
}
