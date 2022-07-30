// Dependencies
import apisauce, { ApisauceConfig } from 'apisauce';

// Config
const config: ApisauceConfig = {
    baseURL: process.env.API_URL ?? '/api/proxy',
    headers: {
        'x-skala-platform': process.env.NEXT_PUBLIC_SKALA_HEADER,
    },
};

export const headers = (token: string) => ({
    headers: {
        Authorization: token,
        'x-skala-platform': process.env.NEXT_PUBLIC_SKALA_HEADER,
    },
});

export const pymeHeaders = (token?: string) => ({
    headers: {
        Authorization: token,
        'x-skala-platform': 'pyme',
    },
});

export const adminHeaders = (token?: string) => ({
    headers: {
        Authorization: token,
        'x-skala-platform': 'admin',
    },
});

export const api = apisauce.create(config);
