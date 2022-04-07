// Dependencies
import { GenericAPIErrorResponse, GenericAPIResponse, Quality } from '@clyc/api-wrapper/dist/types';
import { ApiResponse } from 'apisauce';
import { PaginationMeta } from 'services/api/types/Pagination';
import { Gsg, GsgFormated } from '../../types/Gsg';
import { ProjectImage } from '../../types/ProjectImage';

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
    token: string;
    gsgProject: Partial<GsgFormated>;
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
