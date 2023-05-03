import useSWR, { SWRResponse } from 'swr';
import { api, headers } from '../../config';
import { GetAcceleratorsResponse } from './accelerator.types';
import ENDPOINT from './accelerator.endpoints';

const acceleratorFetchAll = async (endpoint: string) => {
    const AuthManager = await import('@clyc/next-route-manager/libs/AuthManager').then((a) => a.default);
    const { token } = new AuthManager({
        cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME!,
    });

    const { data } = await api.post<GetAcceleratorsResponse>(endpoint, {}, headers(token));
    return data;
};

export const useAccelerators = (): SWRResponse<GetAcceleratorsResponse | undefined, unknown> => {
    return useSWR([ENDPOINT.BASE], acceleratorFetchAll);
};

// Export
const acceleratorCalls = {
    useAccelerators,
};

export default acceleratorCalls;
