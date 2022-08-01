// Dependencies
import { ApiResponse } from 'apisauce';

// Captcha Types
export interface ReCaptchaResponse {
    message: string;
    response: boolean;
}

export type ReCaptchaCall = (token: string) => Promise<ApiResponse<ReCaptchaResponse>>;
