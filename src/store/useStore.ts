import { create } from 'zustand';
import { Profile } from '../types';

interface Store {
  user: Profile | null;
  setUser: (user: Profile | null) => void;
  updateBalance: (amount: number) => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateBalance: (amount) =>
    set((state) => ({
      user: state.user
        ? { ...state.user, balance: state.user.balance + amount }
        : null,
    })),
}));