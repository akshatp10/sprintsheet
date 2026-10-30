import { getCurrent } from '@/lib/services/users/api';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserStates {
  userId: string | null;
  userName: string | null;
  userEmail: string | null;
  profilePicURL: string | null;
}

interface UserActions {
  setUser: (userDetails: UserStates) => void;
  removeUser: () => void;
  hydrateUser: () => Promise<void>;
}

type UserStore = UserStates & UserActions;

const initialState: UserStates = {
  userId: null,
  userName: null,
  userEmail: null,
  profilePicURL: null,
};

const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setUser: (userDetails) =>
        set({
          ...userDetails,
        }),

      removeUser: () =>
        set({
          ...initialState,
        }),

      hydrateUser: async () => {
        if (get().userId) return;

        if (!localStorage.getItem('accessToken')) return;

        const response = await getCurrent();

        if (!response.success || !response.data) {
          throw new Error(response.message);
        }

        set({
          userId: response.data.userId,
          userName: response.data.name,
          userEmail: response.data.email,
          profilePicURL: null,
        });
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useUserStore;
