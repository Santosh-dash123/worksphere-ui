import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SuperAdminAuthService } from '../../../../core/services/Auth/superadminauth.service';
@Component({
  selector: 'app-superadminlogin',
  imports: [FormsModule],
  templateUrl: './superadminlogin.component.html',
  styleUrl: './superadminlogin.component.css',
})
export class SuperadminloginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private superAdminAuthService: SuperAdminAuthService,
  ) {}

  login(): void {
    this.errorMessage = '';
    if (!this.email || !this.password) {
      this.errorMessage = 'Email and Password cannot be blank!';
      return;
    }

    this.isLoading = true;

    const request = {
      email: this.email,
      password: this.password,
    };

    this.superAdminAuthService.login(request).subscribe({
      next: (response) => {
        this.isLoading = false;

        if (response.success) {
          this.router.navigate(['/super-admin/dashboard']);
        } else {
          this.errorMessage = response.message || 'Invalid email or password!';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error.message || 'Unable to find user';
      },
    });
  }
}
