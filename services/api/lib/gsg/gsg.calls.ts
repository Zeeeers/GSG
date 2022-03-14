// Dependencies
import { api } from '../../config';
import { GetAllGsgResponse } from './gsg.types';
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

// Global
const gsgCalls = {
    gsgAllFetcher,
};

// Export
export default gsgCalls;
