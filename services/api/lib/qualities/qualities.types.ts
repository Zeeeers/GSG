// Dependencies
import { ApiResponse } from 'apisauce';
import { Quality } from '../../types/Quality';

// Get All Qualities Types
export interface GetQualityListResponse {
    qualities: Array<Quality>;
}

//export type GetAllQualityResponse = GenericAPIResponse<GetQualityListResponse, null>;
//export type GetAllQualityCall = () => Promise<ApiResponse<GetAllQualityResponse, GenericAPIErrorResponse>>;
export type GetAllQualityCall = () => Promise<ApiResponse<GetQualityListResponse>>;
// Get Quality Types
export interface GetQualityResponse {
    status: boolean;
    message: string;
    quality: Quality;
}
