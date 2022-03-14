// Dependencies
import { GenericAPIErrorResponse, GenericAPIResponse } from '@clyc/api-wrapper/dist/types';
import { ApiResponse } from 'apisauce';
import { PaginationMeta } from 'services/api/types/Pagination';
import { Gsg } from '../../types/Gsg';

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
