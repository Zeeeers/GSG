//Dependencies
import { ZodShape } from 'services/validation';
import { z } from 'zod';

// Types

type select = {
    value: string;
    label: string;
};
export interface IProjectForm {
    title?: string;
    description?: string;
    main_image?: string;
    social_impact?: string;

    more_info?: select;
    third_parties?: select;
    stage?: select;
    investment_objective?: select;
    capital_stage?: select;
    guarantee?: select;
    expected_rentability?: select;
    finance_goal?: select;
    time_lapse?: select;
    qualities?: select;

    investment_types?: select;
    business_model?: string;
    better_project?: string;
    additional_info?: string;
    business_web?: string;
    additional_document?: string;
}

export interface IMember {
    main_image: string;
    name: string;
    position: string;
    linkedin?: string;
}

// Schema
const projectShape: ZodShape<IProjectForm> = {
    title: z.string().optional(),
    description: z.string().optional(),
    main_image: z.string().optional(),
    social_impact: z.string().optional(),

    more_info: z.object({ value: z.string(), label: z.string() }).optional(),
    third_parties: z.object({ value: z.string(), label: z.string() }).optional(),
    stage: z.object({ value: z.string(), label: z.string() }).optional(),
    investment_objective: z.object({ value: z.string(), label: z.string() }).optional(),
    capital_stage: z.object({ value: z.string(), label: z.string() }).optional(),

    guarantee: z.object({ value: z.string(), label: z.string() }).optional(),
    expected_rentability: z.object({ value: z.string(), label: z.string() }).optional(),
    finance_goal: z.object({ value: z.string(), label: z.string() }).optional(),
    time_lapse: z.object({ value: z.string(), label: z.string() }).optional(),

    investment_types: z.object({ value: z.string(), label: z.string() }).optional(),
    business_model: z.string().optional(),
    better_project: z.string().optional(),
    additional_info: z.string().optional(),
    business_web: z.string().optional(),
    additional_document: z.string().optional(),

    qualities: z.object({ value: z.string(), label: z.string() }).optional(),
};

const memberShape: ZodShape<IMember> = {
    main_image: z.string(),
    name: z.string().nonempty('Campo obligatorio'),
    position: z.string().nonempty('Campo obligatorio'),
    linkedin: z.string().optional(),
};

export const projectSchema = z.object(projectShape);
export const memberSchema = z.object(memberShape);
