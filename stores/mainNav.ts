// Dependencies
import create from 'zustand';

// Types
type IMobileMenuStore = {
    isOpen: boolean;
    onToggle: () => void;
};

// Store
export const useMobileMenuStore = create<IMobileMenuStore>((set) => ({
    isOpen: false,
    onToggle: () => set((state) => ({ ...state, isOpen: !state.isOpen })),
}));
