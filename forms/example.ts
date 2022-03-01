// Dependencies
import { z } from 'zod';
import { ZodShape } from 'services/validation';

// Types
export interface IExampleFormData {
    example: string;
    example2: string;
}

// Schemas
const exampleShape: ZodShape<IExampleFormData> = {
    example: z.string().nonempty('required').email('invalid email'),
    example2: z.string().nonempty('required'),
};

export const exampleSchema = z.object(exampleShape);
