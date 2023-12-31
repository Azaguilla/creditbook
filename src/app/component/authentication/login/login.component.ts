import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomSnackbarService } from 'src/app/services/custom-snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  /**
   * Le formulaire de connexion
   */
  loginForm!: FormGroup;

  constructor(
    private authSrv: AuthenticationService,
    private formBuilder: FormBuilder,
    private readonly snackBarSrv: CustomSnackbarService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  /**
   * Méthode lancée lors de la soumission du formulaire
   */
  onSubmit() {
    if (this.loginForm.valid) {
      const password = this.loginForm.value.password;
      const login = this.loginForm.value.username;

      this.authSrv.login(login, password);
    } else {
      this.snackBarSrv.error('Veuillez renseigner un identifiant et un mot de passe.');
    }
  }
}
