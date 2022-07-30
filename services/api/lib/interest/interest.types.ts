// Dependencies
import { Interest } from 'services/api/types/Interest';

// Get All Qualities Types
export interface GetInterestListResponse {
    status: boolean;
    message: string;
    data: Interest;
}
