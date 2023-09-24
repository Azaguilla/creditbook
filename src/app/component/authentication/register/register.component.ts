import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authSrv: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onRegister() {
    this.authSrv.login('admin', 'test');
  }
}
