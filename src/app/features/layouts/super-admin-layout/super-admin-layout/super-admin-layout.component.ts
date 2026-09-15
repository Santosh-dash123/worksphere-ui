import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
@Component({
  selector: 'app-super-admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './super-admin-layout.component.html',
  styleUrl: './super-admin-layout.component.css',
})
export class SuperAdminLayoutComponent {
  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');

    this.router.navigate(['/']);
  }
}
