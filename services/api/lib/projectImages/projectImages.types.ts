// Dependencies
import { ApiResponse } from 'apisauce';

// Upload Image
export interface UploadImageRequest {
    token: string;
    image: string;
}

export interface UploadImageResponse {
    status: boolean;
    message: string;
    data: {
        image: {
            created_at: string;
            id: number;
            image: string;
        };
    };
}

export type UploadImageCall = (payload: UploadImageRequest) => Promise<ApiResponse<UploadImageResponse>>;
