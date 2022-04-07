// Dependencies
import { api, pymeHeaders } from '../../config';
import {
    GetAllGsgResponse,
    GetGsgProjectResponse,
    GetMyGsgProjectResponse,
    UpdateGsgProjectCall,
    UpdateGsgProjectResponse,
} from './gsg.types';
import useSWR, { responseInterface } from 'swr';
import ENDPOINT from './gsg.endpoints';

// READ
const gsgAllFetcher = async (endpoint: string) => {
    const { data } = await api.get<GetAllGsgResponse>(endpoint);
    return data;
};

export const useGsg = (): responseInterface<GetAllGsgResponse | undefined, unknown> => {
    return useSWR([ENDPOINT.BASE], gsgAllFetcher);
};

export const getGsgProject = async (_: string, id: number, token: string) => {
    const { data } = await api.get<GetGsgProjectResponse>(ENDPOINT.DETAIL(id), {}, pymeHeaders(token));

    return data;
};

export const useGsgProject = (id?: number, token?: string) => {
    return useSWR([id ? ENDPOINT.DETAIL(id) : null, id, token], getGsgProject);
};

export const getMyGsgProject = async (_: string, token?: string) => {
    const response = await api.get<GetMyGsgProjectResponse>(ENDPOINT.OWN, {}, pymeHeaders(token));

    return response;
};

export const useMyGsgProject = (token?: string) => {
    return useSWR([token ? ENDPOINT.OWN : null, token], getMyGsgProject);
};

// Update
export const updateGsgProject: UpdateGsgProjectCall = async ({ token, gsgProject }) => {
    const response = await api.patch<UpdateGsgProjectResponse>(
        ENDPOINT.DETAIL(gsgProject.id!),
        {
            gsg_project: gsgProject,
        },
        pymeHeaders(token),
    );

    return response;
};

// Global
const gsgCalls = {
    gsgAllFetcher,
};

// Export
export default gsgCalls;
