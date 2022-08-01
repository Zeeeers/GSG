// Dependencies
import { ApiResponse } from 'apisauce';

// Login Types
export interface LoginRequest {
    email: string;
    password: string;
    isPyme?: boolean;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    token?: string;
    exp?: number;
}

export type LoginCall = (payload: LoginRequest) => Promise<ApiResponse<LoginResponse>>;

// Admin Login Types
export interface AdminLoginRequest {
    email: string;
    password: string;
}

export interface AdminLoginResponse {
    success: boolean;
    message: string;
    token?: string;
    exp?: number;
}

export type AdminLoginCall = (payload: AdminLoginRequest) => Promise<ApiResponse<AdminLoginResponse>>;

// Check Email
export interface CheckEmailRequest {
    user_email: string;
}

export interface CheckEmailResponse {
    status: boolean;
    message: string;
}

export type CheckEmailCall = (payload: CheckEmailRequest) => Promise<ApiResponse<CheckEmailResponse>>;

// Activate Account
export interface ActivateAccountRequest {
    token: string;
}

export interface ActivateAccountResponse {
    status: boolean;
    message: string;
}

export type ActivateAccountCall = (payload: ActivateAccountRequest) => Promise<ApiResponse<ActivateAccountResponse>>;

// Recover Password
export interface RecoverPasswordRequest {
    email: string;
}

export interface RecoverPasswordResponse {
    message: string;
    status: number;
}

export type RecoverPasswordCall = (payload: RecoverPasswordRequest) => Promise<ApiResponse<RecoverPasswordResponse>>;

// Create New Password
export interface CreateNewPassRequest {
    token: string;
    password: string;
}

export interface CreateNewPassResponse {
    message: string;
    status: number;
}

export type CreateNewPassCall = (payload: CreateNewPassRequest) => Promise<ApiResponse<CreateNewPassResponse>>;
