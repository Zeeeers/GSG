// Dependencies
import { Organization } from 'services/api/types/Organization';
import useSWR, { SWRResponse } from 'swr';
import { api, headers, pymeHeaders } from '../../config';
import ENDPOINT from './organization.endpoints';
import {
    CreateOrganizationCall,
    CreateOrganizationResponse,
    GetOrganizationProjectCall,
    GetOrganizationResponse,
    UpdateOrganizationCall,
    UpdateOrganizationResponse,
} from './organization.types';

// CREATE
export const create: CreateOrganizationCall = async ({ organization, user, isPyme }) => {
    const response = await api.post<CreateOrganizationResponse>(
        ENDPOINT.REGISTER,
        {
            organization,
            user,
        },
        isPyme ? pymeHeaders() : undefined,
    );

    return response;
};

// READ
const organizationFetcher = async (endpoint: string, isPyme?: boolean) => {
    const AuthManager = await import('@clyc/next-route-manager/libs/AuthManager').then((a) => a.default);
    const { token } = new AuthManager({
        cookieName: isPyme ? process.env.NEXT_PUBLIC_PYMES_COOKIE_NAME! : process.env.NEXT_PUBLIC_COOKIE_NAME!,
    });

    const { data } = await api.get<GetOrganizationResponse>(endpoint, '', isPyme ? pymeHeaders(token) : headers(token));

    return data?.organization;
};

export const useOrganization = (isPyme?: boolean): SWRResponse<Organization | undefined, unknown> => {
    return useSWR(isPyme ? [ENDPOINT.BASE, isPyme] : null, organizationFetcher, { revalidateOnFocus: false });
};

// READ
const organizationProjectFetcher = async (endpoint: string) => {
    const AuthManager = await import('@clyc/next-route-manager/libs/AuthManager').then((a) => a.default);
    const { token } = new AuthManager({
        cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME!,
    });

    const { data } = await api.get<GetOrganizationProjectCall>(endpoint, '', headers(token));
    // @ts-ignore
    return data?.data;
};

export const useOrganizationProject = (idProject: number): SWRResponse<Organization | undefined, unknown> => {
    return useSWR([ENDPOINT.PROJECT(idProject)], organizationProjectFetcher);
};

// UPDATE
export const update: UpdateOrganizationCall = async ({ token, data }) => {
    const response = await api.patch<UpdateOrganizationResponse>(ENDPOINT.BASE, data, headers(token));

    return response;
};

// Global
const organizationCalls = {
    create,
    update,
    useOrganization,
};

// Export
export default organizationCalls;
