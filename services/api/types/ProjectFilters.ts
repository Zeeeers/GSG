import { Quality } from './Quality';

export type ProjectOrderAttr =
    | 'id'
    | 'projects.id'
    | 'created_at'
    | 'projects.created_at'
    | 'title'
    | 'projects.title'
    | 'status'
    | 'projects.status';

type ProjectSort = 'asc' | 'desc';

export interface ProjectFilters {
    search?: string;
    qualities?: Array<Quality>;
    order_by?: [order: ProjectOrderAttr | string, sort: ProjectSort];
}
