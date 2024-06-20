import { Component, OnDestroy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

import { SubmitCancelComponent } from '../../ui/submit-cancel/submit-cancel.component';
import { ErrorComponent } from '../../ui/error/error.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, SubmitCancelComponent, ErrorComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnDestroy {
  error = false;
  signInSubscription?: Subscription;

  constructor(private authService: AuthService) {}

  onSignIn(form: NgForm): void {
    this.signInSubscription = this.authService
      .signIn({
        email: form.value.email,
        password: form.value.password,
      })
      .subscribe({
        error: (error) => {
          this.error = true;
        },
      });
  }

  ngOnDestroy(): void {
    if (this.signInSubscription) {
      this.signInSubscription.unsubscribe();
    }
  }
}
