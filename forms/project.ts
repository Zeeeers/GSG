//Dependencies
import { ZodShape } from 'services/validation';
import { z } from 'zod';

// Types
type select = {
    value?: string;
    label?: string;
};

export interface IMember {
    main_image: string;
    name: string;
    position: string;
    linkedin?: string;
}
export interface IProjectForm {
    title: string;
    description: string;
    main_image: string;
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

    investment_types?: Array<select>;
    rentability_time: string;
    //better_project: string;
    additional_info: string;
    additional_document?: string;

    debt?: select;

    last_sales12: string;
    last_sales6: string;
    last_client12: string;
    last_client6: string;
    ebitda: string;
    patrimony: string;

    linkedinForm?: string;
    instagramForm?: string;
    facebookForm?: string;
    youtubeForm?: string;
    webForm?: string;

    members: Array<IMember>;

    accelerator_id: {
        value?: number;
        label?: string;
    };
}

// Schema

const memberShape: ZodShape<IMember> = {
    main_image: z.string().min(1, 'Campo obligatorio'),
    name: z.string().nonempty('Campo obligatorio'),
    position: z.string().nonempty('Campo obligatorio'),
    linkedin: z.string().url('Formato ingresado incorrecto').or(z.literal('')).optional(),
};

const projectShape: ZodShape<IProjectForm> = {
    title: z.string().min(1, 'Campo obligatorio'),
    description: z
        .string()
        .nonempty({ message: 'Campo obligatorio' })
        .min(700, 'Mínimo 700 caracteres')
        .max(1000, 'Máximo 1000 caracteres'),
    main_image: z.string().min(1, 'Campo obligatorio'),
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

    last_sales12: z.string().nonempty('Campo obligatorio'),
    last_sales6: z.string().nonempty('Campo obligatorio'),
    ebitda: z.string().nonempty('Campo obligatorio'),
    last_client12: z.string().nonempty('Campo obligatorio'),
    last_client6: z.string().nonempty('Campo obligatorio'),
    patrimony: z.string().nonempty('Campo obligatorio'),

    investment_types: z.array(z.object({ value: z.string(), label: z.string() })).optional(),

    rentability_time: z.string().min(1, 'Campo obligatorio'),
    //better_project: z.string().nonempty('Campo obligatorio'),
    additional_info: z.string().nonempty({ message: 'Campo obligatorio' }).max(1000, 'Máximo 1000 caracteres'),
    additional_document: z.string().optional(),

    qualities: z.object({ value: z.string(), label: z.string() }).optional(),

    debt: z.object({ value: z.string().optional(), label: z.string().optional() }).optional(),

    linkedinForm: z
        .string()
        .url('Formato ingresado incorrecto, el link debe comenzar con https://')
        .or(z.literal(''))
        .optional(),
    facebookForm: z
        .string()
        .url('Formato ingresado incorrecto, el link debe comenzar con https://')
        .or(z.literal(''))
        .optional(),
    instagramForm: z
        .string()
        .url('Formato ingresado incorrecto, el link debe comenzar con https://')
        .or(z.literal(''))
        .optional(),
    youtubeForm: z
        .string()
        .url('Formato ingresado incorrecto, el link debe comenzar con https://')
        .or(z.literal(''))
        .optional(),
    webForm: z
        .string()
        .url('Formato ingresado incorrecto, el link debe comenzar con https://')
        .or(z.literal(''))
        .optional(),

    members: z.array(z.object(memberShape)).nonempty('Debe agregar al menos un miembro'),

    accelerator_id: z.object({
        value: z.number().optional(),
        label: z.string().optional(),
    }),
};

export const projectSchema = z.object(projectShape);
export const memberSchema = z.object(memberShape);
