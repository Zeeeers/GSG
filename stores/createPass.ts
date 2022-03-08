// Dependencies
import create from 'zustand';

// Types
type ICreatePassStatus = 'FORM' | 'SUCCESS';

type IRecoveryStore = {
    status: ICreatePassStatus;
    updateStatus: (data: ICreatePassStatus) => void;
};

// Store
export const useCreatePassStore = create<IRecoveryStore>((set) => ({
    status: 'FORM',
    updateStatus: (data) => set((state) => ({ ...state, status: data })),
}));
