// Dependencies
import { adminHeaders, api, headers } from '../../config';
import useSWR, { SWRResponse } from 'swr';
import ENDPOINT from './user.endpoints';
import {
    UserResponse,
    UpdateUserCall,
    CreateInvestorCall,
    InvestorResponse,
    SendMatchCall,
    SendMatchResponse,
    SendInterestCall,
    UsersAllResponse,
    DeleteInvestorCall,
    DeleteInvestorResponse,
    UpdateUserStatusCall,
    UpdateUserStatusResponse,
} from './user.types';
import { User } from 'services/api/types/User';

// POST
export const createInvestor: CreateInvestorCall = async ({ token, data }) => {
    const response = await api.post<InvestorResponse>(ENDPOINT.INVESTOR, { user: data }, adminHeaders(token));
    return response;
};

export const sendMatch: SendMatchCall = async ({ token, data }) => {
    const response = await api.post<SendMatchResponse>(ENDPOINT.FORCE, data, adminHeaders(token));
    return response;
};

export const sendInterest: SendInterestCall = async ({ token, id }) => {
    const response = await api.post<SendMatchResponse>(ENDPOINT.SEND_INTEREST(id), {}, headers(token));
    return response;
};

// READ
const userFetcher = async (endpoint: string) => {
    const AuthManager = await import('@clyc/next-route-manager/libs/AuthManager').then((a) => a.default);
    const { token } = new AuthManager({ cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME! });

    const { data } = await api.get<UserResponse>(endpoint, '', headers(token));

    return data?.user;
};

export const useUser = (): SWRResponse<User | undefined, unknown> => {
    return useSWR([ENDPOINT.BASE], userFetcher, { revalidateOnFocus: true });
};

// FETCH
const investorAllFetcher = async (endpoint: string) => {
    const AuthManager = await import('@clyc/next-route-manager/libs/AuthManager').then((a) => a.default);
    const { token } = new AuthManager({ cookieName: process.env.NEXT_PUBLIC_ADMIN_COOKIE_NAME! });

    const { data } = await api.get<UsersAllResponse>(endpoint, '', adminHeaders(token));

    return data?.data.users;
};

export const useInvestorAll = (): SWRResponse<Array<User> | undefined, unknown> => {
    return useSWR([ENDPOINT.INDEX], investorAllFetcher);
};

// UPDATE
export const update: UpdateUserCall = async ({ token, data }) => {
    const response = await api.patch<UserResponse>(ENDPOINT.BASE, { user: data }, headers(token));
    return response;
};

export const updateStatus: UpdateUserStatusCall = async (idInvestor: number) => {
    const AuthManager = await import('@clyc/next-route-manager/libs/AuthManager').then((a) => a.default);
    const { token } = new AuthManager({
        cookieName: process.env.NEXT_PUBLIC_ADMIN_COOKIE_NAME!,
    });

    const response = await api.patch<UpdateUserStatusResponse>(
        ENDPOINT.UPDATE_STATUS(idInvestor),
        '',
        adminHeaders(token),
    );
    return response;
};

// DELETE
export const deleteInvestor: DeleteInvestorCall = async (idInvestor: number) => {
    const AuthManager = await import('@clyc/next-route-manager/libs/AuthManager').then((a) => a.default);
    const { token } = new AuthManager({
        cookieName: process.env.NEXT_PUBLIC_ADMIN_COOKIE_NAME!,
    });

    const response = await api.delete<DeleteInvestorResponse>(ENDPOINT.DELETE(idInvestor), '', adminHeaders(token));

    return response;
};

// Global
const userCalls = {
    useUser,
    createInvestor,
    update,
    sendMatch,
    investorAllFetcher,
    deleteInvestor,
    updateStatus,
};

// Export
export default userCalls;
