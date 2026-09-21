import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { SuperAdminAuthService } from '../../../../core/services/Auth/superadminauth.service';
@Component({
  selector: 'app-super-admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './super-admin-layout.component.html',
  styleUrl: './super-admin-layout.component.css',
})
export class SuperAdminLayoutComponent {
  constructor(
    private router: Router,
    private superadminauthservice: SuperAdminAuthService,
  ) {}

  logout(): void {
    this.superadminauthservice.logout();
    this.router.navigateByUrl('/superadminlogin');
  }
}
