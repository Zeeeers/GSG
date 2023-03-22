// Dependencies
import { z } from 'zod';
import { ZodShape } from 'services/validation';

// Types
export interface INameData {
    name: string;
}

export interface IPhoneData {
    legal_representative_phone: string;
}

// Schema
const nameShape: ZodShape<INameData> = {
    name: z.string().min(1, 'Campo obligatorio'),
};

const phoneShape: ZodShape<IPhoneData> = {
    legal_representative_phone: z.string().min(1, 'Campo obligatorio').max(9, 'Ingrese un número válido'),
};

export const nameSchema = z.object(nameShape);
export const phoneSchema = z.object(phoneShape);
