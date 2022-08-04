// Dependencies
import { adminHeaders, api, headers, pymeHeaders } from '../../config';
import ENDPOINT from './auth.endpoints';
import {
    ActivateAccountCall,
    ActivateAccountResponse,
    AdminLoginCall,
    AdminLoginResponse,
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

export const adminLogin: AdminLoginCall = async ({ email, password }) => {
    const response = await api.post<AdminLoginResponse>(ENDPOINT.ADMIN_LOGIN, { email, password }, adminHeaders());
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
export const recoverPassword: RecoverPasswordCall = async ({ email }) => {
    const response = await api.post<RecoverPasswordResponse>(ENDPOINT.RECOVER_PASSWORD, {
        email,
    });

    return response;
};

//@ts-ignore
export const createNewPassword: CreateNewPassCall = async ({ password, token, jwt }) => {
    const response = await api.post<CreateNewPassResponse>(
        ENDPOINT.NEW_PASSWORD,
        {
            token,
            password,
        },
        headers(jwt),
    );

    return response;
};

// Global
const authCalls = {
    login,
    adminLogin,
    activateAccount,
    checkEmail,
    recoverPassword,
    createNewPassword,
};

// Export
export default authCalls;
