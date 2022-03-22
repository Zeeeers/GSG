// Dependencies
import { api, pymeHeaders } from '../../config';
import ENDPOINT from './projectImages.endpoints';
import { UploadImageCall, UploadImageResponse } from './projectImages.types';

// AUTH
export const uploadImage: UploadImageCall = async ({ image, token }) => {
    const response = await api.post<UploadImageResponse>(ENDPOINT.UPLOAD, { image }, pymeHeaders(token));

    return response;
};

// Global
const ProjectImagesCalls = {
    uploadImage,
};

// Export
export default ProjectImagesCalls;
