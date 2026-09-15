import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-onboard-tenant',
  imports: [FormsModule],
  templateUrl: './onboard-tenant.component.html',
  styleUrl: './onboard-tenant.component.css',
})
export class OnboardTenantComponent {
  companyName: string = '';
  companyCode: string = '';
  companyEmail: string = '';
  phoneNumber: string = '';

  address: string = '';
  country: string = '';
  state: string = '';
  city: string = '';
  postalCode: string = '';

  contactPersonName: string = '';
  contactEmail: string = '';
  contactPhone: string = '';

  // Registration Certificate
  registrationCertificate: File | null = null;

  isActive: boolean = true;

  onRegistrationCertificateSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.registrationCertificate = input.files[0];

      console.log('Registration Certificate:', this.registrationCertificate);
    }
  }

  saveTenant(): void {
    const tenantData = {
      companyName: this.companyName,
      companyCode: this.companyCode,
      companyEmail: this.companyEmail,
      phoneNumber: this.phoneNumber,

      address: this.address,
      country: this.country,
      state: this.state,
      city: this.city,
      postalCode: this.postalCode,

      contactPersonName: this.contactPersonName,
      contactEmail: this.contactEmail,
      contactPhone: this.contactPhone,

      registrationCertificate: this.registrationCertificate,

      isActive: this.isActive,
    };

    console.log('Tenant Data:', tenantData);

    alert('Tenant onboarded successfully.');
  }

  resetForm(): void {
    this.companyName = '';
    this.companyCode = '';
    this.companyEmail = '';
    this.phoneNumber = '';

    this.address = '';
    this.country = '';
    this.state = '';
    this.city = '';
    this.postalCode = '';

    this.contactPersonName = '';
    this.contactEmail = '';
    this.contactPhone = '';

    this.registrationCertificate = null;

    this.isActive = true;
  }
}
