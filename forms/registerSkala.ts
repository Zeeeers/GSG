// Dependencies
import { ZodShape } from 'services/validation';
import { z } from 'zod';

// Types
export interface IRegisterSkalaForm {
    logo: string;
    organizationName: string;
    userName: string;
    userEmail: string;
    password: string;
    passwordConfirm: string;
    termsCheck: boolean;
    legalName?: string;
    organizationAddress?: string;
    idNumber: string;
    legalRepName?: string;

    legalRepEmail: string;
    legalRepAddress?: string;
}

//  Validation Schema
const registerSkalaShape: ZodShape<IRegisterSkalaForm> = {
    logo: z.string(),
    organizationName: z.string().nonempty('Campo obligatorio'),
    userName: z.string().nonempty('Campo obligatorio'),
    userEmail: z.string().email('Correo electrónico inválido').nonempty('Campo obligatorio'),
    password: z.string().nonempty('Campo obligatorio').min(8, 'Longitud mínima 8 caracteres'),
    passwordConfirm: z.string().nonempty('Campo obligatorio'),
    termsCheck: z.boolean(),
    legalName: z.string().optional(),
    organizationAddress: z.string().optional(),
    idNumber: z
        .string()
        .min(9, 'Largo mínimo 9 caracteres')
        .max(10, 'Largo máximo 10 caracteres')
        .regex(new RegExp('^[0-9]+-[0-9kK]{1}$'), { message: 'Ingrese un rut valido' }),
    legalRepName: z.string().optional(),

    legalRepEmail: z.string().email('Correo electrónico inválido').or(z.string().max(0)),
    legalRepAddress: z.string().optional(),
};

export const registerSkalaSchema = z
    .object(registerSkalaShape)
    .refine((f) => f.password === f.passwordConfirm, {
        message: 'Las contraseñas no coinciden',
        path: ['passwordConfirm'],
    })
    .refine((f) => f.termsCheck, {
        message: 'Campo obligatorio',
        path: ['termsCheck'],
    });
