// Types

export type Frequency = 'biweekly' | 'monthly' | null;
export interface User {
    id: number;
    active?: boolean;
    email?: string;
    created_at: string;
    guest?: boolean;
    kind: string;
    lang: string;
    name: string;
    newsletter: boolean;
    onboarding: boolean;
    organization_id: number;
    user_pass_created: boolean;
    frequency_newsletter: Frequency;
    organization: {
        id: number;
        image: string;
        legal_representative_phone: string;
    };
}
