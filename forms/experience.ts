// Dependencies
import { z } from 'zod';
import { ZodShape } from 'services/validation';
import { isValidPhoneNumber } from 'libphonenumber-js';

// Types
export interface INameData {
    name: string;
}

export interface IPhoneData {
    legal_representative_phone: { code: string; value: string };
}

// Schema
const nameShape: ZodShape<INameData> = {
    name: z.string().min(1, 'Campo obligatorio'),
};

const phoneShape: ZodShape<IPhoneData> = {
    legal_representative_phone: z
        .object({
            code: z.string(),
            value: z.string(),
        })
        .refine((data) => {
            try {
                // @ts-ignore
                return isValidPhoneNumber(data.value, data.code);
            } catch (error) {
                return false;
            }
        }, 'Número de teléfono inválido'),
};

export const nameSchema = z.object(nameShape);
export const phoneSchema = z.object(phoneShape);
