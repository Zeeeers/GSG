// Dependencies
import { api, headers } from '../../config';
import ENDPOINT from './member.endpoints';
import { Members } from 'services/api/types/Member';
import { MemberResponse } from './member.types';

// CREATE
export const create = async (member: Members) => {
    const AuthManager = await import('@clyc/next-route-manager/libs/AuthManager').then((a) => a.default);
    const { token } = new AuthManager({ cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME! });

    const { data } = await api.get<MemberResponse>(ENDPOINT.BASE, { member }, headers(token));
    return data;
};

// Global
const memberCalls = {
    create,
};

// Export
export default memberCalls;
