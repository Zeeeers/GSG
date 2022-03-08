//Dependencies
import { z } from 'zod';
import { ZodShape } from 'services/validation';

// Types
export interface IChangePassData {
    password: string;
    newPassword: string;
    confirmPassword: string;
}

// Schemas
const changePassShape: ZodShape<IChangePassData> = {
    password: z
        .string()
        .nonempty('Campo obligatorio')
        .min(8, 'La contraseña debe tener un largo mínimo de 8 caracteres.'),
    newPassword: z
        .string()
        .nonempty('Campo obligatorio')
        .min(8, 'La contraseña debe tener un largo mínimo de 8 caracteres.'),
    confirmPassword: z.string().nonempty('Campo obligatorio'),
};

export const changePassSchema = z.object(changePassShape).refine((form) => form.newPassword === form.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['passwordConfirm'],
});
