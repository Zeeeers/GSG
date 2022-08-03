// Dependencies
import { GenericAPIErrorResponse, GenericAPIResponse, Quality } from '@clyc/api-wrapper/types';
import { ApiResponse } from 'apisauce';
import { PaginationMeta } from 'services/api/types/Pagination';
import { Gsg } from '../../types/Gsg';
import { ProjectImage } from '../../types/ProjectImage';

export interface ProjectForm {
    title: string;
    description: string;
    main_image: string;
    social_impact: string;

    more_info: string;
    third_parties: string;
    stage: string;
    investment_objective: string;
    capital_stage: string;
    guarantee: string;
    expected_rentability: string;
    finance_goal: string;
    time_lapse: string;
    qualities: string;

    investment_types: string;
    business_model: string;
    better_project: string;
    additional_info: string;
    business_web: string;
    additional_document: string;
}

export interface CreateProjectRequest {
    project: ProjectForm;
}

export interface CreateProjectResponse {
    message: string;
}

export type CreateProjectCall = (payload: CreateProjectRequest) => Promise<ApiResponse<CreateProjectResponse>>;

// Get GSG Projects Types
export interface GetAllGsgDataResponse {
    projects: Array<Gsg>;
}

// Get GSG Projects Meta
export interface GetAllGsgMeta {
    pagination: PaginationMeta;
    available_tags: Array<string>;
}

export type GetAllGsgResponse = GenericAPIResponse<GetAllGsgDataResponse, GetAllGsgMeta>;

export type GetAllGsgCall = () => Promise<ApiResponse<GetAllGsgResponse, GenericAPIErrorResponse>>;

// Get Gsg Project by id
export interface GetGsgProjectResponse {
    success: boolean;
    message: string;
    data: {
        gsg_project: Gsg;
        project_images: Array<ProjectImage>;
        qualities: Array<Quality>;
    };
}

export type GetGsgProjectCall = GenericAPIResponse<GetGsgProjectResponse, null>;

// Get my Gsg Project
export interface GetMyGsgProjectResponse {
    success: boolean;
    message: string;
    data: {
        gsg_project: Gsg;
        project_images: Array<ProjectImage>;
        qualities: Array<Quality>;
    };
}

export interface GetMyGsgProjectRequest {
    token: string;
}

export type GetMyGsgProjectCall = (payload: GetMyGsgProjectRequest) => Promise<ApiResponse<GetMyGsgProjectResponse>>;

// Update project
export interface UpdateGsgProjectRequest {
    gsgProject: { status: string };
    idProject: number;
}

export interface UpdateGsgProjectResponse {
    success: boolean;
    message: string;
    data: {
        gsg_project: Gsg;
        project_images: Array<ProjectImage>;
        qualities: Array<Quality>;
    };
}

export type UpdateGsgProjectCall = (payload: UpdateGsgProjectRequest) => Promise<ApiResponse<UpdateGsgProjectResponse>>;

// Update project
export interface DeleteGsgProjectResponse {
    success: boolean;
    message: string;
    data: {
        gsg_project: Gsg;
    };
}

export type DeleteGsgProjectCall = (idProject: number) => Promise<ApiResponse<DeleteGsgProjectResponse>>;
