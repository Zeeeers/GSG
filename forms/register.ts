// Dependencies
import { ZodShape } from 'services/validation';
import { z } from 'zod';

// Types
export interface IRegisterForm {
    logo: string;
    organizationName: string;
    userName: string;
    userEmail: string;
    password: string;
    passwordConfirm: string;
    termsCheck: boolean;
}

//  Validation Schema
const registerShape: ZodShape<IRegisterForm> = {
    logo: z.string().nonempty('Campo obligatorio'),
    organizationName: z.string().nonempty('Campo obligatorio'),
    userName: z.string().nonempty('Campo obligatorio'),
    userEmail: z.string().email('Correo electrónico inválido').nonempty('Campo obligatorio'),
    password: z.string().nonempty('Campo obligatorio').min(8, 'Longitud mínima 8 caracteres'),
    passwordConfirm: z.string().nonempty('Campo obligatorio'),
    termsCheck: z.boolean(),
};

export const registerSchema = z
    .object(registerShape)
    .refine((f) => f.password === f.passwordConfirm, {
        message: 'Las contraseñas no coinciden',
        path: ['passwordConfirm'],
    })
    .refine((f) => f.termsCheck, {
        message: 'Campo obligatorio',
        path: ['termsCheck'],
    });
