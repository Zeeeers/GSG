//Dependencies
import { ZodShape } from 'services/validation';
import { z } from 'zod';

// Types
export interface IOrgProfileForm {
    description: string;
    website: string;
    facebook: string;
    instagram: string;
}

// Schema
const orgProfileShape: ZodShape<IOrgProfileForm> = {
    description: z
        .string()
        .nonempty('Campo obligatorio')
        .min(250, 'La descripción debe tener al menos 250 caracteres de largo.'),
    website: z.string(),
    facebook: z.string(),
    instagram: z.string(),
};

export const orgProfileSchema = z.object(orgProfileShape);
