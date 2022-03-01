// Dependencies
import create from 'zustand';

// Types
type IExampleStore = {
    example?: any;
    setExample: (example: any) => void;
};

// Store
export const useExampleStore = create<IExampleStore>((set) => ({
    example: undefined,
    setExample: (data) => set({ example: data }),
}));
