import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Subject, Subscription } from 'rxjs';

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

  authChange = new Subject<boolean>();
  userChange = new Subject<any>();

  constructor(private httpClient: HttpClient, private router: Router) {}

  signUp(user: UserSignUp): Subscription {
    return this.httpClient.post(`${this.apiUrl}/users`, user).subscribe({
      next: (userData) => {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.userChange.next(userData);
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.userChange.next(undefined);
        console.error(error);
      },
    });
  }

  signIn(userCredentials: { email: string; password: string }): Subscription {
    return this.httpClient
      .post(`${this.apiUrl}/auth/login`, userCredentials)
      .subscribe({
        next: (tokens: any) => {
          this.isAuthenticated = true;
          this.authChange.next(true);
          this.userTokens = tokens;
          this.getUserData();
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.isAuthenticated = false;
          this.authChange.next(false);
        },
      });
  }

  signOut(): void {
    this.userTokens = undefined;
    this.isAuthenticated = false;
    this.authChange.next(false);
  }

  isAuth(): boolean {
    return this.isAuthenticated;
  }

  getUserData(): Subscription | undefined {
    if (this.userTokens) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.userTokens.access_token}`,
      });
      return this.httpClient
        .get(`${this.apiUrl}/auth/profile`, { headers })
        .subscribe({
          next: (userData) => this.userChange.next(userData),
          error: (error) =>
            console.error(
              'There was an error when getting the user data',
              error
            ),
        });
    } else {
      return;
    }
  }
}
