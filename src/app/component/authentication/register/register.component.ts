import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  /**
   * Le formulaire d'inscription
   */
  registerForm!: FormGroup;

  constructor(private authSrv: AuthenticationService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  /**
   * Méthode lancée lors de la soumission du formulaire
   */
  onSubmit() {
    if (this.registerForm.valid){
      const password = this.registerForm.value.password;
      const login = this.registerForm.value.username;
      
      this.authSrv.register(login, password);
    } else {
      this.snackBar.open('Veuillez renseigner un identifiant et un mot de passe.', 'Fermer');
    }
  }
}
