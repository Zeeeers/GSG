// Dependencies
import { api, pymeHeaders, adminHeaders } from '../../config';
import {
    GetAllGsgResponse,
    GetGsgProjectResponse,
    GetMyGsgProjectResponse,
    UpdateGsgProjectCall,
    UpdateGsgProjectResponse,
} from './gsg.types';
import useSWR, { SWRResponse } from 'swr';
import ENDPOINT from './gsg.endpoints';

// READ
const gsgAllFetcher = async (endpoint: string, isAdmin?: boolean) => {
    const { data } = await api.get<GetAllGsgResponse>(endpoint, '', isAdmin ? adminHeaders() : undefined);
    return data;
};

export const useGsg = (isAdmin?: boolean): SWRResponse<GetAllGsgResponse | undefined, unknown> => {
    return useSWR([ENDPOINT.BASE, isAdmin], gsgAllFetcher);
};

export const getGsgProject = async (_: string, id: number) => {
    const { data } = await api.get<GetGsgProjectResponse>(ENDPOINT.DETAIL(id));
    return data;
};

export const useGsgProject = (id?: number) => {
    return useSWR([id ? ENDPOINT.DETAIL(id) : null, id], getGsgProject);
};

export const getMyGsgProject = async (_: string, token?: string) => {
    const response = await api.get<GetMyGsgProjectResponse>(ENDPOINT.OWN, {}, pymeHeaders(token));
    return response;
};

export const useMyGsgProject = (token?: string) => {
    return useSWR([token ? ENDPOINT.OWN : null, token], getMyGsgProject);
};

// Update
export const updateStatusGsgProject: UpdateGsgProjectCall = async ({ idProject, gsgProject }) => {
    const AuthManager = await import('@clyc/next-route-manager/libs/AuthManager').then((a) => a.default);
    const { token } = new AuthManager({
        cookieName: process.env.NEXT_PUBLIC_ADMIN_COOKIE_NAME!,
    });

    const response = await api.patch<UpdateGsgProjectResponse>(
        ENDPOINT.STATUS(idProject),
        {
            gsg_project: gsgProject,
        },
        adminHeaders(token),
    );

    return response;
};

// Global
const gsgCalls = {
    gsgAllFetcher,
    updateStatusGsgProject,
};

// Export
export default gsgCalls;
