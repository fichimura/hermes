import { Component, OnDestroy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SubmitCancelComponent } from '../../ui/submit-cancel/submit-cancel.component';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, SubmitCancelComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnDestroy {
  signUpSubscription?: Subscription;

  constructor(private authService: AuthService) {}

  onSignUp(form: NgForm): void {
    this.signUpSubscription = this.authService
      .signUp({
        name: form.value.name,
        email: form.value.email,
        password: form.value.password,
        avatar: form.value.avatar,
      })
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.signUpSubscription) {
      this.signUpSubscription.unsubscribe();
    }
  }
}
