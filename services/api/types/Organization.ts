// Dependencies
import { Country } from './Country';
import { ImageUrl } from './ImageUrl';

// Types
export interface Organization {
    id: number;
    kind?: string;
    name: string;
    created_at: string;
    updated_at: string;
    image: string;
    image_url: ImageUrl;
    legal_name: string;
    social_number: string;
    address: string;
    description: string;
    legal_representative_name: string;
    legal_representative_email: string;
    legal_representative_phone: string;
    legal_representative_address: string;
    bank_name: string;
    bank_account_number: number;
    bank_routing_number: number;
    bank_type_account: string;
    bank_contact_name: string;
    bank_contact_email: string;
    paypal_button_id?: string;
    webpay_commerce_code?: string;
    checked_on_irs?: boolean;
    country_id?: number;
    country?: Country;
    pyme?: boolean;
    provider: boolean;
    rrss_web?: string;
    rrss_instagram?: string;
    rrss_facebook?: string;
}

export interface OrganizationFormat {
    id: number;
    name: string;
    image: string;
    legal_representative_phone: string;
}
