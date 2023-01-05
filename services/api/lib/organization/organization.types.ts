// Dependencies
import { ApiResponse } from 'apisauce';
import { SkalaPlatform } from 'services/api/types/SkalaPlatform';
import { UserForm } from '../../lib/user/user.types';
import { Organization } from '../../types/Organization';
import { User } from '../../types/User';

// Create organization types
export interface OrganizationForm {
    kind?: SkalaPlatform;
    bank_name?: string;
    bank_account_number?: number;
    bank_contact_name?: string;
    bank_contact_email?: string;
    bank_routing_number?: number;
    bank_type_account?: string;
    name?: string;
    legal_name?: string;
    social_number?: string;
    address?: string;
    legal_representative_name?: string;
    legal_representative_lastname?: string;
    legal_representative_address?: string;
    legal_representative_phone?: string;
    legal_representative_email?: string;
    legal_representative_social_number?: string;
    image?: string;
    country_id?: number;
    paypal_button_id?: string;
    transbank_url?: string;
    description?: string;
    rrss_web?: string;
    rrss_instagram?: string;
    rrss_facebook?: string;
}

export interface CreateOrganizationRequest {
    user: UserForm;
    organization: OrganizationForm;
    isPyme?: boolean;
}

export interface CreateOrganizationResponse {
    message: string;
    organization: Organization;
    user: User;
}

export type CreateOrganizationCall = (
    payload: CreateOrganizationRequest,
) => Promise<ApiResponse<CreateOrganizationResponse>>;

// Get Organization Types
export interface GetOrganizationResponse {
    status: boolean;
    message: string;
    organization: Organization;
}

export type GetOrganizationCall = (token: string) => Promise<ApiResponse<GetOrganizationResponse>>;

// Get Project Organization Types
export interface GetOrganizationProjectResponse {
    status: boolean;
    message: string;
    organization: string;
}

export type GetOrganizationProjectCall = (token: string) => Promise<ApiResponse<GetOrganizationProjectResponse>>;

// Update Organization Types
export interface UpdateOrganizationRequest {
    data: OrganizationForm;
    isPyme?: boolean;
    token: string;
}

export interface UpdateOrganizationResponse {
    status: boolean;
    message: string;
    organization: Organization;
}

export type UpdateOrganizationCall = (
    payload: UpdateOrganizationRequest,
) => Promise<ApiResponse<UpdateOrganizationResponse>>;
