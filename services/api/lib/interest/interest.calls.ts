// Dependencies
// @ts-nocheck
import useSWR, { SWRResponse } from 'swr';
import { api, headers } from '../../config';
import ENDPOINT from './interest.endpoints';
import { GetInterestListResponse } from './interest.types';

//CREATE
const create = async (endpoint: string) => {
    const AuthManager = await import('@clyc/next-route-manager/libs/AuthManager').then((a) => a.default);
    const { token } = new AuthManager({
        cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME!,
    });

    const { data } = await api.post<GetInterestListResponse>(endpoint, {}, headers(token));
    return data;
};

// READ
const interestAllFetcher = async (endpoint: string) => {
    const AuthManager = await import('@clyc/next-route-manager/libs/AuthManager').then((a) => a.default);
    const { token } = new AuthManager({
        cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME!,
    });

    const { data } = await api.post<GetInterestListResponse>(endpoint, {}, headers(token));
    return data;
};

export const useInterestList = (): SWRResponse<GetInterestListResponse | undefined, unknown> => {
    return useSWR([ENDPOINT.BASE], interestAllFetcher);
};

export const interestFetcher = async (endpoint: string) => {
    const AuthManager = await import('@clyc/next-route-manager/libs/AuthManager').then((a) => a.default);
    const { token } = new AuthManager({
        cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME!,
    });

    const { data } = await api.get<GetInterestListResponse>(endpoint, '', headers(token));
    return data;
};

export const useInterest = (): SWRResponse<GetInterestListResponse | undefined, unknown> => {
    return useSWR([ENDPOINT.SHOW], interestFetcher);
};

// UPDATE
export const update: UpdateInterestCall = async ({ id, data }) => {
    const AuthManager = await import('@clyc/next-route-manager/libs/AuthManager').then((a) => a.default);
    const { token } = new AuthManager({
        cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME!,
    });

    const response = await api.patch<InterestResponse>(ENDPOINT.DETAIL(id), data, headers(token));
    return response;
};

// Export
const interestCalls = {
    useInterestList,
    useInterest,
    update,
};

export default interestCalls;
