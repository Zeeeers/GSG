// Dependencies
import { Gsg } from 'services/api/types/Gsg';
import create from 'zustand';

// Types
interface IDraftStore {
    project: Partial<Gsg>;
    setProject: (data: Partial<Gsg>) => void;
    clearProjectStore: () => void;
}

// Store
export const useDraftStore = create<IDraftStore>((set) => ({
    project: {},
    setProject: (data) => set({ project: data }),
    clearProjectStore: () => set({ project: {} }),
}));
