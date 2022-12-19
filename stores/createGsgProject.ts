// Dependencies
import { Gsg } from 'services/api/types/Gsg';
import { Members } from 'services/api/types/Member';
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
    members: Array<Members>;
    member: Partial<Members> | undefined;
    setMembers: (data: Members) => void;
    setMember: (data: Members) => void;
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
    member: undefined,
    setMember: (member) => set(() => ({ member: member })),
    setMembers: (member) => set((m) => ({ members: [...m.members, member] })),
    deleteMember: (memberID) => set((m) => ({ members: m.members.filter((m) => m.name !== memberID) })),
    clearMember: () => set({ member: undefined }),
    setStep: (step) => set({ step }),
    setProject: (data) => set((s) => ({ project: { ...s.project, ...data } })),
    clearProjectStore: () => set({ step: 'info', project: {} }),
}));
