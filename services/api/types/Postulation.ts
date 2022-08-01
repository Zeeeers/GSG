// Dependencies
import { Organization } from './Organization';
import { Response } from './Response';

// Types
export type PostulationStatus = 'not_reviewed' | 'in_review' | 'reviewed' | 'selected';
export interface PostulationMinified {
    id: number;
    status: PostulationStatus;
    review_average: number;
    organization: Organization;
}

export interface Postulation {
    id?: number;
    status: PostulationStatus;
    review_variable_0: number;
    review_variable_1: number;
    review_variable_2: number;
    review_variable_3: number;
    review_variable_4: number;
    review_average?: number;
    created_at?: string;
    response?: Array<Response>;
}
