import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface UserDetails {
  _id: string;
  username: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private token!: string;

  constructor(private http: HttpClient, private router: Router) {}

  async login(login: string, password: string) {    
    this.http.post<any>('http://localhost:3000/api/auth/login', { username: login, password } ).subscribe((res) => {
      console.log(res);
      if (res.token) {
        this.saveToken(res.token);
      }
    });
  }

  private saveToken(token: string): void {
    localStorage.setItem('creditbook-token', token);
    this.token = token;
  }

  getUserDetails(): UserDetails | null {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      // atob est utilisé pour décoder le token
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else return null
  }

  getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('creditbook-token') ?? '';
    }
    return this.token;
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    const dateNow = new Date();
    if (user) {
      return user.exp > dateNow.getTime();
    } else {
      return false;
    }
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('glossaire-token');
    this.router.navigateByUrl('/auth/login');
  }
}
