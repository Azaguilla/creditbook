import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private auth: AuthenticationService,
    private router: Router,
  ) {}

  /**
   * Méthode permettant de vérifier que l'utilisateur est connecté
   * Si l'authentification n'est pas effectuée, on redirige l'utilisateur vers la page de connexion
   */
  canActivate() {
    const token = this.auth.getToken();
    if (token) {
      return true;
    } else {
      this.router.navigateByUrl('/auth/login');
      return false;
    }
  }
}
