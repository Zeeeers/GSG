import { Members } from './Member';
import { OrganizationFormat } from './Organization';

// Types
export interface Gsg {
    id: number;
    title: string;
    main_image: string;
    description: string;
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
    organization: OrganizationFormat;
}

export interface GsgFormated {
    id: number;
    title: string;
    main_image: { url: string };
    description: string;
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
    members: Array<Members>;
    status: string;
}
