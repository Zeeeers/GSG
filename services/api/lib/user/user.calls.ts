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
    return useSWR([ENDPOINT.BASE], userFetcher, { revalidateOnFocus: false });
};

// UPDATE
export const update: UpdateUserCall = async ({ token, data }) => {
    const response = await api.patch<UserResponse>(ENDPOINT.BASE, { user: data }, headers(token));
    return response;
};

// Global
const userCalls = {
    useUser,
    createInvestor,
    update,
    sendMatch,
};

// Export
export default userCalls;
