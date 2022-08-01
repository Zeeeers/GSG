// Dependencies
import { api } from '../../config';
import ENDPOINT from './google.endpoints';
import { ReCaptchaCall, ReCaptchaResponse } from './google.types';

// VERIFY
export const verifyCaptcha: ReCaptchaCall = async (token) => {
    const response = await api.post<ReCaptchaResponse>(ENDPOINT.RECAPTCHA, {
        token,
    });

    return response;
};

// Global
const googleCalls = {
    verifyCaptcha,
};

// Export
export default googleCalls;
