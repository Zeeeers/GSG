// Dependencies
import { ProjectFilters } from 'services/api/types/ProjectFilters';
import create from 'zustand';

// Types
interface IFilterStore {
    filters?: Partial<ProjectFilters>;
    setFilters: (filters?: Partial<ProjectFilters>) => void;
}

// Store
export const useFilterStore = create<IFilterStore>((set) => ({
    setFilters: (f) => set((m) => ({ ...m, filters: f })),
}));
