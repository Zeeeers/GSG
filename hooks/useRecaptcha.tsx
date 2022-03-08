// Dependencies
import { RefObject, useRef, useState } from 'react';
import { google } from 'services/api/lib/google';
import ReCAPTCHA from 'react-google-recaptcha';

// Types
export type ReCaptchaHook = () => ReCaptchaHookResponse;

interface ReCaptchaHookResponse {
    status: ReCaptchaStatus;
    ref: RefObject<ReCAPTCHA>;
    ReCAPTCHA: typeof ReCAPTCHA;
    validate: (token: string) => Promise<boolean>;
    executeAsync: () => Promise<string | null>;
}

interface ReCaptchaStatus {
    status: 'WAITING' | 'VALIDATING_CAPTCHA' | 'ERROR' | 'SUCCESS';
    message: string;
}

interface ReCaptchaResponse {
    response: boolean;
    message: string;
}

// Component
const useReCaptcha: ReCaptchaHook = () => {
    // States
    const [status, setStatus] = useState<ReCaptchaStatus>({ status: 'WAITING', message: '' });
    const captcha = useRef<ReCAPTCHA>(null);

    // Handlers
    const executeCaptcha = async () => {
        (captcha.current as ReCAPTCHA).reset();
        setStatus((s) => ({ ...s, status: 'VALIDATING_CAPTCHA', message: '' } as ReCaptchaStatus));

        return (captcha.current as ReCAPTCHA).executeAsync();
    };

    const validateCaptcha = async (token: string): Promise<boolean> => {
        const result = await google.verifyCaptcha(token!);

        if ((result.data as ReCaptchaResponse).response) {
            setStatus((s) => ({ ...s, status: 'SUCCESS', message: '' } as ReCaptchaStatus));

            return true;
        } else {
            setStatus(
                (s) =>
                    ({
                        ...s,
                        status: 'ERROR',
                        message:
                            'Bip. Bup. Bip. ¿Has entendido? Tu comportamiento nos ha hecho creer que eres un robot.',
                    } as ReCaptchaStatus),
            );

            return false;
        }
    };

    return {
        status: status,
        ref: captcha,
        ReCAPTCHA: ReCAPTCHA,
        validate: validateCaptcha,
        executeAsync: executeCaptcha,
    };
};

// Export
export default useReCaptcha;
