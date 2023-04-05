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
    qualities?: select;
    social_impact?: string;
    sector: select;
    third_parties: select;
    more_info: select;

    better_project: string;
    additional_info: string;
    additional_document?: string;

    linkedinForm?: string;
    instagramForm?: string;
    facebookForm?: string;
    youtubeForm?: string;
    webForm?: string;

    members: Array<IMember>;
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

    better_project: z.string().nonempty('Campo obligatorio'),
    additional_info: z.string().nonempty({ message: 'Campo obligatorio' }).max(1000, 'Máximo 1000 caracteres'),
    additional_document: z.string().optional(),

    qualities: z.object({ value: z.string(), label: z.string() }).optional(),

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
};

export const projectSchema = z.object(projectShape);
export const memberSchema = z.object(memberShape);
