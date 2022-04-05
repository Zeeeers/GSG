// Dependencies
import { ApiResponse } from 'apisauce';
import { ProjectImage } from '../../types/ProjectImage';

// Upload Image
export interface UploadImageRequest {
    token: string;
    image: string;
}

export interface UploadImageResponse {
    status: boolean;
    message: string;
    data: {
        image: ProjectImage;
    };
}

export type UploadImageCall = (payload: UploadImageRequest) => Promise<ApiResponse<UploadImageResponse>>;

// Delete Image
export interface DeleteImageRequest {
    token: string;
    imageId: number;
}

export interface DeleteImageResponse {
    status: boolean;
    message: string;
}

export type DeleteImageCall = (payload: DeleteImageRequest) => Promise<ApiResponse<DeleteImageResponse>>;
