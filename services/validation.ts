// Dependencies
import z from 'zod';

// Utils
export type ZodShape<T> = {
    [key in keyof T]-?: undefined extends T[key] ? z.ZodOptionalType<z.ZodType<T[key]>> : z.ZodType<T[key]>;
};
