// Dependencies
import create from 'zustand';

// Types
interface ICreateGsgProjectStore {
    images: Array<number>;
    updateImages: (data: Array<number>) => void;
}

// Store
export const useCreateGsgProjectStore = create<ICreateGsgProjectStore>((set) => ({
    images: [],
    updateImages: (data) => set((state) => ({ ...state, images: data })),
}));
