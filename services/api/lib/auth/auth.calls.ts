// Dependencies
import { api, pymeHeaders } from '../../config';
import ENDPOINT from './auth.endpoints';
import {
    ActivateAccountCall,
    ActivateAccountResponse,
    CheckEmailCall,
    CheckEmailResponse,
    CreateNewPassCall,
    CreateNewPassResponse,
    LoginCall,
    LoginResponse,
    RecoverPasswordCall,
    RecoverPasswordResponse,
} from './auth.types';

// AUTH
export const login: LoginCall = async ({ email, password, isPyme }) => {
    const response = await api.post<LoginResponse>(
        ENDPOINT.LOGIN,
        { email, password },
        isPyme ? pymeHeaders() : undefined,
    );

    return response;
};

export const activateAccount: ActivateAccountCall = async ({ token }) => {
    const response = await api.post<ActivateAccountResponse>(ENDPOINT.ACTIVATE_ACCOUNT, {
        activation: {
            ticket: token,
        },
    });

    return response;
};

// CHECK
export const checkEmail: CheckEmailCall = async ({ user_email }) => {
    const response = await api.post<CheckEmailResponse>(ENDPOINT.CHECK_EMAIL, { user_email });

    return response;
};

// RECOVERY
export const recoverPassword: RecoverPasswordCall = async ({ email, kind }) => {
    const response = await api.post<RecoverPasswordResponse>(ENDPOINT.RECOVER_PASSWORD, {
        email,
        kind,
    });

    return response;
};

export const createNewPassword: CreateNewPassCall = async ({ password, token }) => {
    const response = await api.post<CreateNewPassResponse>(ENDPOINT.NEW_PASSWORD, {
        token,
        password,
    });

    return response;
};

// Global
const authCalls = {
    login,
    activateAccount,
    checkEmail,
    recoverPassword,
    createNewPassword,
};

// Export
export default authCalls;
