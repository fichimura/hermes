import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

interface UserTokens {
  access_token: string;
  refresh_token: string;
}

interface UserSignUp {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  private userTokens?: UserTokens;

  private apiUrl = 'https://api.escuelajs.co/api/v1';

  authChange = new BehaviorSubject<boolean>(false);
  userChange = new BehaviorSubject<any>(null);

  constructor(private httpClient: HttpClient, private router: Router) {}

  signUp(user: UserSignUp): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/users`, user).pipe(
      tap((userData) => {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.userChange.next(userData);
        this.router.navigate(['/']);
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  signIn(userCredentials: {
    email: string;
    password: string;
  }): Observable<any> {
    return this.httpClient
      .post(`${this.apiUrl}/auth/login`, userCredentials)
      .pipe(
        tap((tokens: any) => {
          this.isAuthenticated = true;
          this.authChange.next(true);
          this.userTokens = tokens;
          this.getUserDataWithTokens().subscribe();
          this.router.navigate(['/']);
        }),
        catchError((error) => {
          this.isAuthenticated = false;
          this.authChange.next(false);
          return throwError(error);
        })
      );
  }

  signOut(): void {
    this.userTokens = undefined;
    this.isAuthenticated = false;
    this.authChange.next(false);
    this.userChange.next(null);
    this.router.navigate(['/sign-in']);
  }

  isAuth(): boolean {
    return this.isAuthenticated;
  }

  private getUserDataWithTokens(): Observable<any> {
    if (this.userTokens) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.userTokens.access_token}`,
      });
      return this.httpClient
        .get(`${this.apiUrl}/auth/profile`, { headers })
        .pipe(
          tap((userData) => this.userChange.next(userData)),
          catchError((error) => {
            return throwError(error);
          })
        );
    } else {
      return throwError('User tokens not available');
    }
  }
}
