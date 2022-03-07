// Generic API Types
export interface GenericAPIResponse<T, U> {
    success: boolean;
    message: string;
    meta: U;
    data: T;
}

export interface APIError {
    status: number;
    title: string;
    detail: string;
    source: {
        pointer: string;
    };
}

export interface GenericAPIErrorResponse {
    errors: Array<APIError>;
}
