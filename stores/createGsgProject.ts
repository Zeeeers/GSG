// Dependencies
import { IMember } from 'forms/project';
import { Gsg } from 'services/api/types/Gsg';
import create from 'zustand';

// Types
interface ICreateGsgProjectStore {
    images: Array<number>;
    updateImages: (data: Array<number>) => void;

    step: 'info' | 'first' | 'second' | 'third' | 'success';
    setStep: (data: 'info' | 'first' | 'second' | 'third' | 'success') => void;
    project: Partial<Gsg>;
    setProject: (data: Partial<Gsg>) => void;
    clearProjectStore: () => void;
    members: Array<IMember>;
    member: Partial<IMember>;
    setMembers: (data: IMember) => void;
    setMember: (data: IMember) => void;
    deleteMember: (data: string) => void;
    clearMember: () => void;
}

// Store
export const useCreateGsgProjectStore = create<ICreateGsgProjectStore>((set) => ({
    images: [],
    updateImages: (data) => set((state) => ({ ...state, images: data })),

    step: 'info',
    project: {},
    members: [],
    member: {},
    setMember: (member) => set(() => ({ member: member })),
    setMembers: (member) => set((m) => ({ members: [...m.members, member] })),
    deleteMember: (memberID) => set((m) => ({ members: m.members.filter((m) => m.name !== memberID) })),
    clearMember: () => set({ member: {} }),
    setStep: (step) => set({ step }),
    setProject: (data) => set((s) => ({ project: { ...s.project, ...data } })),
    clearProjectStore: () => set({ step: 'info', project: {} }),
}));
