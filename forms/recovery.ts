//Dependencies
import { ZodShape } from 'services/validation';
import { z } from 'zod';

// Types
export interface IRecoveryData {
    email: string;
}

// Schemas
const recoveryShape: ZodShape<IRecoveryData> = {
    email: z.string().email('Correo electrónico inválido').nonempty('Campo obligatorio'),
};

export const recoverySchema = z.object(recoveryShape);
