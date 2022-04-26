// Dependencies
import create from 'zustand';
import { IRegisterForm } from 'forms/register';

// Types
type IRegisterStatus = 'FORM' | 'SUCCESS';

type IRegisterStore = {
    status: IRegisterStatus;
    formValues?: IRegisterForm;
    updateStatus: (data: IRegisterStatus) => void;
    updateFormValues: (data: IRegisterForm) => void;
    clearFormValues: () => void;
};

// Store
export const useRegisterStore = create<IRegisterStore>((set) => ({
    status: 'FORM',
    formValues: undefined,
    updateStatus: (data) => set((state) => ({ ...state, status: data })),
    updateFormValues: (data) => set((state) => ({ ...state, formValues: { ...state.formValues, ...data } })),
    clearFormValues: () => set((state) => ({ ...state, formValues: undefined })),
}));
