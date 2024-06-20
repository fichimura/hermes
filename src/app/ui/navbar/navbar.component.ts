import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { Subscription } from 'rxjs';

import { AuthService } from '../../auth/auth.service';

interface UserAuthenticated {
  avatar: string;
  creationAt: string;
  email: string;
  id: string;
  name: string;
  password: string;
  role: string;
  updatedAt: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  user?: UserAuthenticated;

  isAuth = false;
  authSubscription?: Subscription;
  userSubscription?: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(
      (authStatus) => {
        this.isAuth = authStatus;
      }
    );

    this.userSubscription = this.authService.userChange.subscribe(
      (userData) => {
        this.user = userData;
      }
    );
  }

  onSignOut(): void {
    this.authService.signOut();
    this.router.navigate(['/sign-in']);
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
