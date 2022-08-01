// Dependencies
import { z } from 'zod';
import { ZodShape } from 'services/validation';

// Types
export interface ILoginData {
    email: string;
    password: string;
}

// Schema
const loginShape: ZodShape<ILoginData> = {
    email: z.string().nonempty('Campo obligatorio').email('Correo inválido'),
    password: z.string().nonempty('Campo obligatorio'),
};

export const loginSchema = z.object(loginShape);
