// Dependencies
//@ts-nocheck
import { Interest } from 'services/api/types/Interest';
import useSWR, { SWRResponse } from 'swr';
import { api, headers } from '../../config';
import ENDPOINT from './interest.endpoints';
import { GetInterestListResponse } from './interest.types';

//CREATE
const create = async (endpoint: string, interest: Interest) => {
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

// Export
const interestCalls = {
    useInterestList,
};

export default interestCalls;
