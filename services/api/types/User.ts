// Dependencies
import { ImageUrl } from './ImageUrl';
import { Country } from './Country';

// Types
export interface User {
    id: number;
    name: string;
    kind: string;
    email: string;
    lang: string;
    image: string;
    image_url: ImageUrl;
    country_id?: number;
    country?: Country;
    created_at?: string;
    updated_at?: string;
    password_digest?: string;
    active?: boolean;
    guest?: boolean;
    current?: boolean;
}
