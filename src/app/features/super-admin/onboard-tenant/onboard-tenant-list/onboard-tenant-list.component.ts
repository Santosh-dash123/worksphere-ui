import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { TenantService } from '../../../../core/services/tenant-admin.service';
import {
  TenantFormModel,
  TenantGetModel,
  TenantRequest,
} from '../../../../models/tenant-admin/tenant.model';

@Component({
  selector: 'app-onboard-tenant-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './onboard-tenant-list.component.html',
  styleUrl: './onboard-tenant-list.component.css',
})
export class OnboardTenantListComponent implements OnInit {
  tenants: TenantGetModel[] = [];

  isLoading = false;
  isSubmitting = false;

  showDetailsModal = false;
  showEditModal = false;

  selectedTenant: TenantGetModel | null = null;

  tenantForm: TenantFormModel = this.getEmptyForm();

  editingTenantId: number | null = null;

  constructor(private tenantService: TenantService) {}

  ngOnInit(): void {
    this.loadTenants();
  }

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

  loadTenants(): void {
    this.isLoading = true;

    this.tenantService.getTenants().subscribe({
      next: (response) => {
        this.isLoading = false;

        if (response.success) {
          this.tenants = response.data ?? [];
          return;
        }

        this.tenants = [];

        Swal.fire({
          icon: 'error',
          title: 'Unable to Load Tenants',
          text: response.message ?? 'Unable to load tenant data.',
          confirmButtonText: 'OK',
        });
      },
      error: (error) => {
        this.isLoading = false;
        this.tenants = [];

        Swal.fire({
          icon: 'error',
          title: 'Something Went Wrong',
          text:
            error?.error?.message ??
            'Unable to load tenant data. Please try again.',
          confirmButtonText: 'OK',
        });
      },
    });
  }

  viewDetails(id: number): void {
    this.tenantService.getTenantById(id).subscribe({
      next: (response) => {
        if (response.success && response.data?.length) {
          this.selectedTenant = response.data[0];
          this.showDetailsModal = true;
          return;
        }

        Swal.fire({
          icon: 'error',
          title: 'Tenant Not Found',
          text: response.message ?? 'Tenant details could not be found.',
          confirmButtonText: 'OK',
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Something Went Wrong',
          text: error?.error?.message ?? 'Unable to load tenant details.',
          confirmButtonText: 'OK',
        });
      },
    });
  }

  editTenant(id: number): void {
    this.tenantService.getTenantById(id).subscribe({
      next: (response) => {
        if (response.success && response.data?.length) {
          const tenant = response.data[0];

          this.editingTenantId = tenant.id;

          this.tenantForm = {
            companyName: tenant.companyName ?? '',
            companyEmail: tenant.companyEmail ?? '',
            phoneNumber: tenant.companyPhone ?? '',
            address: tenant.companyAddress ?? '',
            contactPersonName: tenant.contactPersonName ?? '',
            contactEmail: tenant.contactPersonEmail ?? '',
            contactPhone: tenant.contactPersonMobile ?? '',
            registrationCertificate: null,
          };

          this.selectedTenant = tenant;
          this.showEditModal = true;
          return;
        }

        Swal.fire({
          icon: 'error',
          title: 'Tenant Not Found',
          text: response.message ?? 'Tenant could not be found.',
          confirmButtonText: 'OK',
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Something Went Wrong',
          text: error?.error?.message ?? 'Unable to load tenant details.',
          confirmButtonText: 'OK',
        });
      },
    });
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

  updateTenant(): void {
    if (!this.editingTenantId) {
      return;
    }

    if (!this.validateForm()) {
      return;
    }

    const tenantData: TenantRequest = {
      action: 'UPDATE',
      id: this.editingTenantId,
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
            title: 'Tenant Updated',
            text: response.message ?? 'Tenant updated successfully.',
            confirmButtonText: 'OK',
          }).then(() => {
            this.closeEditModal();
            this.loadTenants();
          });

          return;
        }

        Swal.fire({
          icon: 'error',
          title: 'Unable to Update Tenant',
          text: response.message ?? 'Unable to update tenant.',
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
            'Unable to update tenant. Please try again.',
          confirmButtonText: 'OK',
        });
      },
    });
  }

  deleteTenant(tenant: TenantGetModel): void {
    Swal.fire({
      icon: 'warning',
      title: 'Delete Tenant?',
      text: `Are you sure you want to delete ${tenant.companyName}?`,
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (!result.isConfirmed) {
        return;
      }

      const tenantData: TenantRequest = {
        action: 'DELETE',
        id: tenant.id,
        companyName: '',
        companyEmail: '',
        companyPhone: '',
        companyAddress: '',
        registrationCertificate: null,
        contactPersonName: '',
        contactPersonEmail: '',
        contactPersonMobile: '',
      };

      this.tenantService.saveTenant(tenantData).subscribe({
        next: (response) => {
          if (response.success) {
            Swal.fire({
              icon: 'success',
              title: 'Deleted',
              text: response.message ?? 'Tenant deleted successfully.',
              confirmButtonText: 'OK',
            }).then(() => {
              this.tenants = this.tenants.filter((x) => x.id !== tenant.id);
            });

            return;
          }

          Swal.fire({
            icon: 'error',
            title: 'Unable to Delete',
            text: response.message ?? 'Unable to delete tenant.',
            confirmButtonText: 'OK',
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Something Went Wrong',
            text:
              error?.error?.message ??
              'Unable to delete tenant. Please try again.',
            confirmButtonText: 'OK',
          });
        },
      });
    });
  }

  closeDetailsModal(): void {
    this.showDetailsModal = false;
    this.selectedTenant = null;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.editingTenantId = null;
    this.selectedTenant = null;
    this.tenantForm = this.getEmptyForm();
  }

  openCertificate(path: string | null): void {
    if (!path) {
      return;
    }

    window.open(path, '_blank');
  }
}
