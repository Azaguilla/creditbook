import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private authenticationSrv: AuthenticationService) { }

  /**
   * Méthode permettant la déconnexion de l'utilisateur
   */
  onLogout() {
    this.authenticationSrv.logout();
  }

}
