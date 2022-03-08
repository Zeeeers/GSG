// Dependencies
import create from 'zustand';

// Types
type IRecoveryStatus = 'FORM' | 'SUCCESS';

type IRecoveryStore = {
    status: IRecoveryStatus;
    email: string;
    updateStatus: (data: IRecoveryStatus) => void;
    updateEmail: (email: string) => void;
    clearValues: () => void;
};

// Store
export const useRecoveryStore = create<IRecoveryStore>((set) => ({
    status: 'FORM',
    email: '',
    updateStatus: (data) => set((state) => ({ ...state, status: data })),
    updateEmail: (email) => set((state) => ({ ...state, email: email })),
    clearValues: () => set({ status: 'FORM', email: '' }),
}));
