// Dependencies
import { ApiResponse } from 'apisauce';
import { Members } from '../../types/Member';

export interface MemberForm {
    main_image: string;
    name: string;
    position: string;
    linkedin: string;
}

export interface MemberResponse {
    status: boolean;
    message: string;
    member: Members;
}
interface MemberRequest {
    token: string;
    member: MemberForm;
}

export type CreateInvestorCall = (payload: MemberRequest) => Promise<ApiResponse<MemberResponse>>;
