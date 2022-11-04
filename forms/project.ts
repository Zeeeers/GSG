//Dependencies
import { ZodShape } from 'services/validation';
import { z } from 'zod';

// Types
type select = {
    value?: string;
    label?: string;
};
export interface IProjectForm {
    title: string;
    description: string;
    main_image?: string;
    social_impact?: string;

    more_info: select;
    third_parties: select;
    sector: select;
    stage?: select;
    investment_objective?: select;
    capital_stage?: select;
    guarantee?: select;
    expected_rentability?: select;
    finance_goal: select;
    time_lapse: select;
    qualities?: select;

    investment_types?: select;
    business_model: string;
    better_project: string;
    additional_info: string;
    business_web?: string;
    additional_document?: string;

    debt?: select;

    last_sales?: string;
    ebitda?: string;
    patrimony?: string;
    tax?: string;
}

export interface IMember {
    main_image: string;
    name: string;
    position: string;
    linkedin?: string;
}

// Schema
const projectShape: ZodShape<IProjectForm> = {
    title: z.string().min(1, 'Campo obligatorio'),
    description: z
        .string()
        .nonempty({ message: 'Campo obligatorio' })
        .min(700, 'Mínimo 700 caracteres')
        .max(1000, 'Máximo 1000 caracteres'),
    main_image: z.string().optional(),
    social_impact: z.string().optional(),

    sector: z.object({ value: z.string().nonempty('Campo obligatorio'), label: z.string() }),
    more_info: z.object({ value: z.string().nonempty('Campo obligatorio'), label: z.string() }),
    third_parties: z.object({ value: z.string().nonempty('Campo obligatorio'), label: z.string() }),
    stage: z.object({ value: z.string().nonempty('Campo obligatorio'), label: z.string() }).optional(),
    investment_objective: z.object({ value: z.string().nonempty('Campo obligatorio'), label: z.string() }).optional(),
    capital_stage: z.object({ value: z.string().optional(), label: z.string().optional() }).optional(),

    guarantee: z.object({ value: z.string().nonempty('Campo obligatorio'), label: z.string() }).optional(),
    expected_rentability: z.object({ value: z.string().optional(), label: z.string().optional() }).optional(),
    finance_goal: z.object({ value: z.string().nonempty('Campo obligatorio'), label: z.string() }),
    time_lapse: z.object({ value: z.string().nonempty('Campo obligatorio'), label: z.string() }),

    last_sales: z.string().optional(),
    ebitda: z.string().optional(),
    patrimony: z.string().optional(),
    tax: z.string().optional(),

    investment_types: z.object({ value: z.string().optional(), label: z.string().optional() }).optional(),
    business_model: z.string().nonempty('Campo obligatorio'),
    better_project: z.string().nonempty('Campo obligatorio'),
    additional_info: z.string().nonempty({ message: 'Campo obligatorio' }).max(1000, 'Máximo 1000 caracteres'),
    business_web: z.string().optional(),
    additional_document: z.string().optional(),

    qualities: z.object({ value: z.string(), label: z.string() }).optional(),

    debt: z.object({ value: z.string().optional(), label: z.string().optional() }).optional(),
};

const memberShape: ZodShape<IMember> = {
    main_image: z.string().min(1, 'Campo obligatorio'),
    name: z.string().nonempty('Campo obligatorio'),
    position: z.string().nonempty('Campo obligatorio'),
    linkedin: z.string().url('Formato ingresado incorrecto').or(z.literal('')).optional(),
};

export const projectSchema = z.object(projectShape);
export const memberSchema = z.object(memberShape);
