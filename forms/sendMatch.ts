// Dependencies
import { z } from 'zod';
import { ZodShape } from 'services/validation';

// Types
export interface IMatchData {
    email: string;
    destinary?: string;
}

// Schema
const SendMatchShape: ZodShape<IMatchData> = {
    email: z.string().min(1, 'Campo obligatorio').email('Correo inválido'),
    // @ts-ignore
    destinary: z.string().email('Correo inválido').optional().or(z.literal('')),
};

export const sendMatchShape = z.object(SendMatchShape);
