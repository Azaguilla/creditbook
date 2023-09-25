import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { HttpAuthResponse } from '../models/response.model';

/**
 * Représente les informations d'un utilisateur connecté
 */
export interface UserDetails {
  _id: string;
  username: string;
  exp: number;
  iat: number;
}

/**
 * Représente les crédentials de l'utilisateur
 */
export interface TokenPayload {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  /**
   * Le token de l'utilisateur connecté
   */
  private token!: string;

  /**
   * L'uri vers le backend
   */
  private uri = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  /**
   * Méthode permettant de se connecter à l'appli
   * @param login
   * @param password
   */
  login(login: string, password: string): void {
    this.http
      .post<HttpAuthResponse>(`${this.uri}/api/auth/login`, {
        username: login,
        password,
      })
      .pipe(
        catchError((err, caught) => {
          this.snackBar.open(err.error.message, 'Fermer');
          return EMPTY;
        }),
      )
      .subscribe((res) => {
        if (res.token) {
          this.saveToken(res.token);
          this.router.navigateByUrl('/');
        }
      });
  }

  /**
   * Méthode permettant de s'inscrire à l'appli
   * @param login
   * @param password
   */
  register(login: string, password: string): void {
    this.http
      .post<HttpAuthResponse>(`${this.uri}/api/auth/signup`, {
        username: login,
        password,
      })
      .pipe(
        catchError((err, caught) => {
          this.snackBar.open(err.error.message, 'Fermer');
          return EMPTY;
        }),
      )
      .subscribe((res) => {
        if (res.token) {
          this.saveToken(res.token);
          this.router.navigateByUrl('/');
        }
      });
  }

  /**
   * Méthode permettant d'enregostrer le token dans le localStorage du navigateur
   * @param token
   */
  private saveToken(token: string): void {
    localStorage.setItem('creditbook-token', token);
    this.token = token;
  }

  /**
   * Méthoide permettant de récupérer les données de l'utilisateur connecté
   * @returns
   */
  getUserDetails(): UserDetails | null {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      // atob est utilisé pour décoder le token
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else return null;
  }

  /**
   * Méthode permettant de récupérer le token de l'utilisateur connecté au sein du localStorage de l'utilisateur
   * @returns
   */
  getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('creditbook-token') ?? '';
    }
    return this.token;
  }

  /**
   * Méthode permettant de savoir si l'utilisateur est connecté
   * @returns
   */
  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    const dateNow = new Date();
    if (user) {
      return user.exp > dateNow.getTime();
    } else {
      return false;
    }
  }

  /**
   * Méthode permettant de déconnecter un utilisateur
   */
  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('creditbook-token');
    this.router.navigateByUrl('/auth/login');
  }
}
