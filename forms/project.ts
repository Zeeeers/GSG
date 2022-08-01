//Dependencies
import { ZodShape } from 'services/validation';
import { z } from 'zod';

// Types
export interface IProjectForm {
    title: string;
    description: string;
    main_image: string;
    more_info: string;
    third_parties: string;
    stage: string;
    investment_objective: string;
    capital_stage: string;
    business_model: string;
    guarantee: string;
    expected_rentability: string;
    finance_goal: string;
    time_lapse: string;
    investment_types: string;
    better_project: string;
    additional_info: string;
    business_web: string;

    qualities: string;
}

export interface IMember {
    name: string;
    position: string;
    linkedin?: string;
}

// Schema
const projectShape: ZodShape<IProjectForm> = {
    title: z.string().nonempty('Campo obligatorio'),
    description: z
        .string()
        .nonempty('Campo obligatorio')
        .min(300, 'La descripción debe tener al menos 300 caracteres de largo.'),
    main_image: z.string().nonempty('Campo obligatorio'),
    more_info: z.string().nonempty('Campo obligatorio'),
    third_parties: z.string().nonempty('Campo obligatorio'),
    stage: z.string().nonempty('Campo obligatorio'),
    investment_objective: z.string().nonempty('Campo obligatorio'),
    capital_stage: z.string().nonempty('Campo obligatorio'),
    business_model: z.string().nonempty('Campo obligatorio'),
    guarantee: z.string().nonempty('Campo obligatorio'),
    expected_rentability: z.string().nonempty('Campo obligatorio'),
    finance_goal: z.string().nonempty('Campo obligatorio'),
    time_lapse: z.string().nonempty('Campo obligatorio'),
    investment_types: z.string().nonempty('Campo obligatorio'),
    better_project: z.string().nonempty('Campo obligatorio'),
    additional_info: z.string().nonempty('Campo obligatorio'),
    business_web: z.string().nonempty('Campo obligatorio').url('URL inválido'),

    qualities: z.string().nonempty('Campo obligatorio'),
};

const memberShape: ZodShape<IMember> = {
    name: z.string().nonempty('Campo obligatorio'),
    position: z.string().nonempty('Campo obligatorio'),
    linkedin: z.string().optional(),
};

export const projectSchema = z.object(projectShape);
export const memberSchema = z.object(memberShape);
