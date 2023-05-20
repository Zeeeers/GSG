import { Accelerator } from 'services/api/types/Accelerator';

export interface GetAcceleratorsResponse {
    status: boolean;
    message: string;
    data: {
        accelerator: Accelerator;
    };
}
