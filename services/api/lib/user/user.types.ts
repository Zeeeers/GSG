// Dependencies
import { ApiResponse } from 'apisauce';
import { User } from '../../types/User';

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
}

export interface UpdateUserRequest {
    token: string;
    data: UserForm;
}

export type UpdateUserCall = (payload: UpdateUserRequest) => Promise<ApiResponse<UserResponse>>;
