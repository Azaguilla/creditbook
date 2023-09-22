import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private token!: string;

  constructor(private http: HttpClient) {}

  async login(login: string, password: string) {
    console.log('ici');
    
    this.http.post<any>('http://localhost:3000/api/auth/login', { username: login, password } ).subscribe((res) => {
      console.log(res);
      
    });

    this.token = 'MyFakeToken';
  }

  getToken(): string {
    return this.token;
  }
}
