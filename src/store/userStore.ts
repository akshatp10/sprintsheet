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
    (set) => ({
      ...initialState,

      setUser: (userDetails) =>
        set(() => ({
          userId: userDetails.userId,
          userName: userDetails.userName,
          userEmail: userDetails.userEmail,
          profilePicURL: userDetails.profilePicURL,
        })),

      removeUser: () =>
        set(() => ({
          ...initialState,
        })),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useUserStore;
