import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { TenantService } from '../../../../core/services/tenant-admin.service';
import {
  TenantFormModel,
  TenantRequest,
} from '../../../../models/tenant-admin/tenant.model';

@Component({
  selector: 'app-onboard-tenant',
  imports: [FormsModule],
  templateUrl: './onboard-tenant.component.html',
  styleUrl: './onboard-tenant.component.css',
})
export class OnboardTenantComponent {
  tenantForm: TenantFormModel = this.getEmptyForm();

  isSubmitting = false;

  constructor(private tenantService: TenantService) {}

  private getEmptyForm(): TenantFormModel {
    return {
      companyName: '',
      companyEmail: '',
      phoneNumber: '',
      address: '',
      contactPersonName: '',
      contactEmail: '',
      contactPhone: '',
      registrationCertificate: null,
    };
  }

  onRegistrationCertificateSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.tenantForm.registrationCertificate = null;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    if (file.type !== 'application/pdf') {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid File',
        text: 'Only PDF files are allowed.',
        confirmButtonText: 'OK',
      });

      input.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      Swal.fire({
        icon: 'warning',
        title: 'File Too Large',
        text: 'File size must not exceed 5 MB.',
        confirmButtonText: 'OK',
      });

      input.value = '';
      return;
    }

    this.tenantForm.registrationCertificate = file;
  }

  validateForm(): boolean {
    if (!this.tenantForm.companyName.trim()) {
      this.showValidationMessage('Company name is required.');
      return false;
    }

    if (!this.tenantForm.companyEmail.trim()) {
      this.showValidationMessage('Company email is required.');
      return false;
    }

    if (!this.isValidEmail(this.tenantForm.companyEmail)) {
      this.showValidationMessage('Please enter a valid company email.');
      return false;
    }

    if (!this.tenantForm.phoneNumber.trim()) {
      this.showValidationMessage('Company phone number is required.');
      return false;
    }

    if (!this.isValidMobile(this.tenantForm.phoneNumber)) {
      this.showValidationMessage(
        'Please enter a valid 10 digit company phone number.',
      );
      return false;
    }

    if (!this.tenantForm.address.trim()) {
      this.showValidationMessage('Company address is required.');
      return false;
    }

    if (!this.tenantForm.registrationCertificate) {
      this.showValidationMessage('Registration certificate is required.');
      return false;
    }

    if (!this.tenantForm.contactPersonName.trim()) {
      this.showValidationMessage('Contact person name is required.');
      return false;
    }

    if (!this.tenantForm.contactEmail.trim()) {
      this.showValidationMessage('Contact person email is required.');
      return false;
    }

    if (!this.isValidEmail(this.tenantForm.contactEmail)) {
      this.showValidationMessage('Please enter a valid contact email.');
      return false;
    }

    if (!this.tenantForm.contactPhone.trim()) {
      this.showValidationMessage('Contact phone number is required.');
      return false;
    }

    if (!this.isValidMobile(this.tenantForm.contactPhone)) {
      this.showValidationMessage(
        'Please enter a valid 10 digit contact phone number.',
      );
      return false;
    }

    return true;
  }

  private isValidEmail(email: string): boolean {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return pattern.test(email.trim());
  }

  private isValidMobile(mobile: string): boolean {
    const pattern = /^[6-9]\d{9}$/;

    return pattern.test(mobile.trim());
  }

  private showValidationMessage(message: string): void {
    Swal.fire({
      icon: 'warning',
      title: 'Validation Required',
      text: message,
      confirmButtonText: 'OK',
    });
  }

  saveTenant(): void {
    if (!this.validateForm()) {
      return;
    }

    const tenantData: TenantRequest = {
      action: 'INSERT',
      id: null,
      companyName: this.tenantForm.companyName.trim(),
      companyEmail: this.tenantForm.companyEmail.trim(),
      companyPhone: this.tenantForm.phoneNumber.trim(),
      companyAddress: this.tenantForm.address.trim(),
      registrationCertificate: this.tenantForm.registrationCertificate,
      contactPersonName: this.tenantForm.contactPersonName.trim(),
      contactPersonEmail: this.tenantForm.contactEmail.trim(),
      contactPersonMobile: this.tenantForm.contactPhone.trim(),
    };

    this.isSubmitting = true;

    this.tenantService.saveTenant(tenantData).subscribe({
      next: (response) => {
        this.isSubmitting = false;

        if (response.success) {
          Swal.fire({
            icon: 'success',
            title: 'Tenant Created',
            text: response.message ?? 'Tenant created successfully.',
            confirmButtonText: 'OK',
          }).then(() => {
            this.resetForm();
          });

          return;
        }

        Swal.fire({
          icon: 'error',
          title: 'Unable to Create Tenant',
          text: response.message ?? 'Unable to create tenant.',
          confirmButtonText: 'OK',
        });
      },

      error: (error) => {
        this.isSubmitting = false;

        Swal.fire({
          icon: 'error',
          title: 'Something Went Wrong',
          text:
            error?.error?.message ??
            'Unable to create tenant. Please try again.',
          confirmButtonText: 'OK',
        });
      },
    });
  }

  resetForm(): void {
    this.tenantForm = this.getEmptyForm();

    const fileInput = document.getElementById(
      'registrationCertificate',
    ) as HTMLInputElement | null;

    if (fileInput) {
      fileInput.value = '';
    }
  }
}
