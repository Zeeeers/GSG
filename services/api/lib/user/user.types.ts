// Dependencies
import { ApiResponse } from 'apisauce';
import { User } from '../../types/User';

// Create Investor Types
export interface InvestorForm {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface InvestorResponse {
    status: boolean;
    message: string;
    user: User;
}
interface InvestorRequest {
    token: string;
    data: InvestorForm;
}

export type CreateInvestorCall = (payload: InvestorRequest) => Promise<ApiResponse<InvestorResponse>>;

// Send Match
export interface SendMatchForm {
    email: string;
}

export interface SendMatchResponse {
    status: boolean;
    message: string;
    user: User;
}
interface SendMatchRequest {
    token: string;
    data: SendMatchForm;
}

export type SendMatchCall = (payload: SendMatchRequest) => Promise<ApiResponse<SendMatchResponse>>;

// Send Interest
export interface SendInterestResponse {
    status: boolean;
    message: string;
    user: User;
}
interface SendInterestRequest {
    token: string;
    id: number;
}

export type SendInterestCall = (payload: SendInterestRequest) => Promise<ApiResponse<SendInterestResponse>>;

// Get User Types
export interface UserResponse {
    status: boolean;
    message: string;
    user: User;
}

export type GetUserCall = (token: string) => Promise<ApiResponse<UserResponse>>;

// Update User Types
export interface UserForm {
    name?: string;
    email?: string;
    old_password?: string;
    password?: string;
    password_confirmation?: string;
    lang?: string;
    country_id?: number;
    image?: string;
    newsletter: boolean;
}

export interface UpdateUserRequest {
    token: string;
    data: UserForm;
}

export type UpdateUserCall = (payload: UpdateUserRequest) => Promise<ApiResponse<UserResponse>>;
