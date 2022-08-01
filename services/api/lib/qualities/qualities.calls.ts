// Dependencies

import useSWR, { SWRResponse } from 'swr';
import { api } from '../../config';
import ENDPOINT from './qualities.endpoints';
import { GetQualityListResponse } from './qualities.types';

// READ
const qualityAllFetcher = async (endpoint: string) => {
    const { data } = await api.get<GetQualityListResponse>(endpoint);
    return data;
};

export const useQualityList = (): SWRResponse<GetQualityListResponse | undefined, unknown> => {
    return useSWR([ENDPOINT.BASE], qualityAllFetcher);
};

/*export const useQualityList = (
    config?: SWRConfiguration<GetQualityListResponse>,
): SWRResponse<GetQualityListResponse, HTTPError> => {
    return useSWR('/quality', getQualityList, config);
};

// Get Quality
export const getQuality = async (qualityId: number) => {
    const response = api.get<GetQualityResponse>(ENDPOINT.DETAIL(qualityId));
    return response;
};

export const useQuality = (
    quality?: number,
    config?: SWRConfiguration<GetQualityResponse>,
): SWRResponse<GetQualityResponse, HTTPError> => {
    return useSWR(quality ? `/quality/${quality}` : null, getQuality, config);
};*/

// Export
const qualityCalls = {
    useQualityList,
    //getQuality,
    //useQuality,
};

export default qualityCalls;
