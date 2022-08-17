// Dependencies
import { z } from 'zod';
import { ZodShape } from 'services/validation';

// Types
export interface IMatchData {
    email: string;
}

// Schema
const SendMatchShape: ZodShape<IMatchData> = {
    email: z.string().nonempty('Campo obligatorio').email('Correo inválido'),
};

export const sendMatchShape = z.object(SendMatchShape);
