// Dependencies
import create from 'zustand';
import { IRegisterSkalaForm } from 'forms/registerSkala';

// Types
type IRegisterSkalaStatus = 'FORM' | 'SUCCESS';

type IRegisterSkalaStore = {
    status: IRegisterSkalaStatus;
    formValues?: IRegisterSkalaForm;
    updateStatus: (data: IRegisterSkalaStatus) => void;
    updateFormValues: (data: IRegisterSkalaForm) => void;
    clearFormValues: () => void;
    step: number;
    setStep: (nr: number) => void;
    stepOneError: boolean;
    setStepOneError: (status: boolean) => void;
    registerOnClose: () => void;
    setRegisterOnClose: (onClose: any) => void;
};

// Store
export const useRegisterSkalaStore = create<IRegisterSkalaStore>((set) => ({
    status: 'FORM',
    formValues: undefined,
    updateStatus: (data) => set((state) => ({ ...state, status: data })),
    updateFormValues: (data) => set((state) => ({ ...state, formValues: { ...state.formValues, ...data } })),
    clearFormValues: () => set((state) => ({ ...state, formValues: undefined })),
    step: 1,
    setStep: (nr) => set((state) => ({ ...state, step: nr })),
    stepOneError: false,
    setStepOneError: (status) => set((state) => ({ ...state, stepOneError: status })),
    registerOnClose: () => null,
    setRegisterOnClose: (onClose) => set((state) => ({ ...state, registerOnClose: onClose })),
}));
