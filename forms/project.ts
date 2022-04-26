//Dependencies
import { ZodShape } from 'services/validation';
import { z } from 'zod';

// Types
export interface IProjectForm {
    title: string;
    description: string;
    main_image: string;
    status: string;
    finance_goal: number;
    end_date: string;
    business_name: string;
    business_web: string;
    qualities: Array<String>;
}

export interface IMember {
    name: string;
    position: string;
    description: string;
}

// Schema
const projectShape: ZodShape<IProjectForm> = {
    title: z.string().nonempty('Campo obligatorio'),
    description: z
        .string()
        .nonempty('Campo obligatorio')
        .min(300, 'La descripción debe tener al menos 300 caracteres de largo.'),
    main_image: z.string().nonempty('Campo obligatorio'),
    status: z.string().nonempty('Campo obligatorio'),
    finance_goal: z.number().min(1, 'El monto debe ser mínimo $1'),
    business_name: z.string().nonempty('Campo obligatorio'),
    end_date: z.string().nonempty('Campo obligatorio'),
    business_web: z.string().nonempty('Campo obligatorio').url('Ingrese una URL válida'),
    qualities: z.string().array().nonempty(),
};

const memberShape: ZodShape<IMember> = {
    name: z.string().nonempty('Campo obligatorio'),
    position: z.string().nonempty('Campo obligatorio'),
    description: z.string().max(250).nonempty('Campo obligatorio'),
};

export const projectSchema = z.object(projectShape);
export const memberSchema = z.object(memberShape);
