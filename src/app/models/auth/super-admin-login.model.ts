import { ApiSingleResponse } from '../common/api-response.model';

export interface SuperAdminLoginRequest {
  email: string;
  password: string;
}

export interface SuperAdminUser {
  id: number;
  userTypeId: number;
  email: string;
  fullName: string;
  mobileNo: string;
}

export interface SuperAdminLoginData {
  token: string;
  users: SuperAdminUser;
}

export type SuperAdminLoginResponse = ApiSingleResponse<SuperAdminLoginData>;
