// Dependencies
import { api, pymeHeaders } from '../../config';
import ENDPOINT from './member.endpoints';
import { Members } from 'services/api/types/Member';
import { GetAllMemberResponse, MemberResponse } from './member.types';
import useSWR, { SWRResponse } from 'swr';

// CREATE
export const create = async (member: Members) => {
    const AuthManager = await import('@clyc/next-route-manager/libs/AuthManager').then((a) => a.default);
    const { token } = new AuthManager({ cookieName: process.env.NEXT_PUBLIC_PYMES_COOKIE_NAME! });

    const response = await api.post<MemberResponse>(ENDPOINT.BASE, { member }, pymeHeaders(token));
    return response;
};

// GET
const membersAllFetcher = async (endpoint: string) => {
    const AuthManager = await import('@clyc/next-route-manager/libs/AuthManager').then((a) => a.default);
    const { token } = new AuthManager({ cookieName: process.env.NEXT_PUBLIC_PYMES_COOKIE_NAME! });

    const { data } = await api.get<GetAllMemberResponse>(endpoint, '', pymeHeaders(token));
    return data?.data?.members;
};

export const useMembers = (): SWRResponse<Members[] | undefined, unknown> => {
    return useSWR([ENDPOINT.BASE], membersAllFetcher);
};

// DELETE
export const deleteMember = async (idMember: number) => {
    const AuthManager = await import('@clyc/next-route-manager/libs/AuthManager').then((a) => a.default);
    const { token } = new AuthManager({ cookieName: process.env.NEXT_PUBLIC_PYMES_COOKIE_NAME! });

    const response = await api.delete<MemberResponse>(ENDPOINT.DETAIL(idMember), '', pymeHeaders(token));
    return response;
};

// UPADTE
export const updateMember = async (idMember: number, data: Members) => {
    const AuthManager = await import('@clyc/next-route-manager/libs/AuthManager').then((a) => a.default);
    const { token } = new AuthManager({ cookieName: process.env.NEXT_PUBLIC_PYMES_COOKIE_NAME! });

    const response = await api.patch<MemberResponse>(ENDPOINT.DETAIL(idMember), { member: data }, pymeHeaders(token));
    return response;
};

// Global
const memberCalls = {
    create,
    useMembers,
    deleteMember,
    updateMember,
};

// Export
export default memberCalls;
