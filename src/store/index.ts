import type { AuthDTO, UserDTO } from '@/api/model/postDTO';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create<AuthDTO>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user: UserDTO) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth',
    }
  )
);
