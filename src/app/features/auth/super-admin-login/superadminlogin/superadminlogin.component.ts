import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private router: Router) {}

  login(): void {
    const staticEmail = 'superadmin@worksphere.com';
    const staticPassword = '123456';

    if (this.email === staticEmail && this.password === staticPassword) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', 'SuperAdmin');
      localStorage.setItem('userEmail', this.email);

      this.router.navigate(['/super-admin/dashboard']);
    } else {
      this.errorMessage = 'Invalid email or password.';
    }
  }
}
