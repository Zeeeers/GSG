import { Organization } from './Organization';

export interface Announcement {
    id?: number;
    title: string;
    sub_title: string;
    main_image: string;
    description_corporate_purpose: string;
    introduction_image: string;
    prize_description: string;
    prize_image: string;
    start_postulation: string;
    end_postulation: string;
    start_review: string;
    end_review: string;
    notification_winners: string;
    requirements: Array<string>;
    legal_bases: string;
    bases_image: string;
    tags: Array<string>;
    form?: string;
    status?: 'draft' | 'active' | 'in-review' | 'closed' | 'deleted';
    partners: Array<string>;
    organization_id: number;
    video_url: string;
    organization: Pick<Organization, 'name' | 'image'>;
    created_at: string;
    updated_at: string;
    postulations_count: {
        not_reviewed: number;
        in_review: number;
        reviewed: number;
        selected: number;
    };
    evaluation_variables: Array<EvaluationElement>;
}

export interface EvaluationElement {
    review_variable: ReviewVariable;
    alias: string;
    percent: number;
}

export type ReviewVariable =
    | 'review_variable_0'
    | 'review_variable_1'
    | 'review_variable_2'
    | 'review_variable_3'
    | 'review_variable_4';
