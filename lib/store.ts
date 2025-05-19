'use client';

import { create } from 'zustand';

type UIStore = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

export const useUIStore = create<UIStore>((set) => ({
  isMenuOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
}));
