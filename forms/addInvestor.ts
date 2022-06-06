// Dependencies
import { z } from 'zod';
import { ZodShape } from 'services/validation';

// Types
export interface IInvestorData {
    name: string;
    email: string;
}

// Schema
const AddInvestorShape: ZodShape<IInvestorData> = {
    name: z.string().nonempty('Campo obligatorio'),
    email: z.string().nonempty('Campo obligatorio').email('Correo inválido'),
};

export const addInvestorShape = z.object(AddInvestorShape);
