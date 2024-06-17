import { Component, OnDestroy } from '@angular/core';
import { SubmitCancelComponent } from '../../ui/submit-cancel/submit-cancel.component';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, SubmitCancelComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnDestroy {
  signInSubscription?: Subscription;

  constructor(private authService: AuthService) {}

  onSignIn(form: NgForm): void {
    this.signInSubscription = this.authService
      .signIn({
        email: form.value.email,
        password: form.value.password,
      })
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.signInSubscription) {
      this.signInSubscription.unsubscribe();
    }
  }
}
