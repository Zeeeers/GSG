// Dependencies
import { api, headers } from '../../config';
import useSWR, { responseInterface } from 'swr';
import ENDPOINT from './user.endpoints';
import { UserResponse, UpdateUserCall } from './user.types';
import { User } from 'services/api/types/User';

// READ
const userFetcher = async (endpoint: string) => {
    const AuthManager = await import('@clyc/next-route-manager/libs/AuthManager').then((a) => a.default);
    const { token } = new AuthManager({ cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME! });

    const { data } = await api.get<UserResponse>(endpoint, '', headers(token));

    return data?.user;
};

export const useUser = (): responseInterface<User | undefined, unknown> => {
    return useSWR(ENDPOINT.BASE, userFetcher);
};

// UPDATE
export const update: UpdateUserCall = async ({ token, data }) => {
    const response = await api.patch<UserResponse>(ENDPOINT.BASE, { user: data }, headers(token));

    return response;
};

// Global
const userCalls = {
    useUser,
    update,
};

// Export
export default userCalls;
