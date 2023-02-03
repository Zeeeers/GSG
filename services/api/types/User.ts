// Types
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
    organization: {
        id: number;
        image: string;
    };
}
