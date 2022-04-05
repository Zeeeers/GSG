// Dependencies
import { api, pymeHeaders } from '../../config';
import ENDPOINT from './projectImages.endpoints';
import { DeleteImageCall, UploadImageCall, UploadImageResponse, DeleteImageResponse } from './projectImages.types';

// Project images
export const uploadImage: UploadImageCall = async ({ image, token }) => {
    const response = await api.post<UploadImageResponse>(ENDPOINT.UPLOAD, { image }, pymeHeaders(token));

    return response;
};

export const deleteImage: DeleteImageCall = async ({ imageId, token }) => {
    const response = await api.delete<DeleteImageResponse>(ENDPOINT.DELETE, { id: imageId }, pymeHeaders(token));

    return response;
};

// Global
const ProjectImagesCalls = {
    uploadImage,
    deleteImage,
};

// Export
export default ProjectImagesCalls;
