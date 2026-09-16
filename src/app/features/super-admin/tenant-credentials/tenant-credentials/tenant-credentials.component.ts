import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tenant-credentials',
  imports: [CommonModule, FormsModule],
  templateUrl: './tenant-credentials.component.html',
  styleUrl: './tenant-credentials.component.css',
})
export class TenantCredentialsComponent {
  tenantId: number | null = null;
  userTypeId: number | null = null;
  departmentId: number | null = null;
  parentUserId: number | null = null;

  fullName: string = '';
  emailAddress: string = '';
  password: string = '';
  mobileNo: string = '';
  address: string = '';

  tenants: any[] = [
    {
      id: 1,
      tenantCode: 'WS-001',
      companyName: 'ABC Technologies',
    },
    {
      id: 2,
      tenantCode: 'WS-002',
      companyName: 'XYZ Solutions',
    },
  ];

  userTypes: any[] = [
    {
      id: 1,
      name: 'Tenant Admin',
    },
    {
      id: 2,
      name: 'Manager',
    },
    {
      id: 3,
      name: 'Employee',
    },
  ];

  departments: any[] = [
    {
      id: 1,
      name: 'IT',
    },
    {
      id: 2,
      name: 'HR',
    },
    {
      id: 3,
      name: 'Finance',
    },
  ];

  parentUsers: any[] = [
    {
      id: 1,
      fullName: 'John Admin',
      emailAddress: 'john@example.com',
    },
    {
      id: 2,
      fullName: 'David Manager',
      emailAddress: 'david@example.com',
    },
  ];

  saveCredentials(): void {
    const credentialData = {
      TenantId: this.tenantId,
      UserTypeId: this.userTypeId,
      DepartmentId: this.departmentId,
      ParentUserId: this.parentUserId,
      FullName: this.fullName,
      EmailAddress: this.emailAddress,
      Password: this.password,
      MobileNo: this.mobileNo,
      Address: this.address,
    };

    console.log('Tenant Credential Data:', credentialData);

    alert('Tenant credentials created successfully.');
  }

  resetForm(): void {
    this.tenantId = null;
    this.userTypeId = null;
    this.departmentId = null;
    this.parentUserId = null;

    this.fullName = '';
    this.emailAddress = '';
    this.password = '';
    this.mobileNo = '';
    this.address = '';
  }
}
