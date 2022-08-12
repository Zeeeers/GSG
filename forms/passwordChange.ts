//Dependencies
import { z } from 'zod';
import { ZodShape } from 'services/validation';

// Types
export interface IChangePassData {
    password?: string;
    newPassword: string;
    confirmPassword: string;
}

// Schemas
const changePassShape: ZodShape<IChangePassData> = {
    password: z.string().optional(),

    newPassword: z
        .string()
        .nonempty('Campo obligatorio')
        .regex(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
            'Debe contener 8 carácteres, minúsculas, mayúsculas y al menos 1 número',
        ),
    confirmPassword: z.string().nonempty('Campo obligatorio'),
};

export const changePassSchema = z.object(changePassShape).refine((form) => form.newPassword === form.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
});
