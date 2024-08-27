import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginSuccess: boolean | null = null;
  private loginSubscription: Subscription | null = null;

  constructor(private loginService : LoginService, private router: Router) {
    console.log('LoginComponent constructor');
  }

  ngOnInit(): void {
    console.log('LoginComponent initialized');
  }

  onLogin(): void {
    if (this.username.trim() === '' || this.password.trim() === '') {
      this.loginSuccess = false;
      return;
    }

    this.loginSubscription = this.loginService.login(this.username, this.password).subscribe(
      (success) => {
        this.loginSuccess = success;
        console.log('Login successful:', success);
        if (success) {
          this.router.navigate(['/product']);
        }
      },
      (error) => {
        console.error('Login error:', error);
        this.loginSuccess = false;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
    console.log('LoginComponent destroyed');
  }
}
