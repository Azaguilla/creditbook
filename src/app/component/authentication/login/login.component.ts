import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authSrv: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.authSrv.login('admin', 'test');
  }

}
