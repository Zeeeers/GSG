// Dependencies
import { ZodShape } from 'services/validation';
import { z } from 'zod';

// Types
export interface IRegisterOneForm {
    userName: string;
    userEmail: string;
    password: string;
    passwordConfirm: string;
    termsCheck: boolean;
    legalRepPhone?: string;
}

export interface IRegisterTwoForm {
    logo: string;
    organizationName: string;
    idNumber: string;
}

//  Validation Schema
const registerOneShape: ZodShape<IRegisterOneForm> = {
    userName: z.string().nonempty('Campo obligatorio'),
    userEmail: z.string().email('Correo electrónico inválido').nonempty('Campo obligatorio'),
    password: z.string().nonempty('Campo obligatorio').min(8, 'Longitud mínima 8 caracteres'),
    passwordConfirm: z.string().nonempty('Campo obligatorio'),
    legalRepPhone: z.string().optional(),
    termsCheck: z.boolean(),
};

const registerTwoShape: ZodShape<IRegisterTwoForm> = {
    logo: z.string(),
    organizationName: z.string().nonempty('Campo obligatorio'),
    idNumber: z
        .string()
        .min(9, 'Largo mínimo 9 caracteres')
        .max(10, 'Largo máximo 10 caracteres')
        .regex(new RegExp('^[0-9]+-[0-9kK]{1}$'), { message: 'Ingrese un rut valido' }),
};

export const registerOneShema = z
    .object(registerOneShape)
    .refine((f) => f.password === f.passwordConfirm, {
        message: 'Las contraseñas no coinciden',
        path: ['passwordConfirm'],
    })
    .refine((f) => f.termsCheck, {
        message: 'Campo obligatorio',
        path: ['termsCheck'],
    });

export const registerTwoSchema = z.object(registerTwoShape);
