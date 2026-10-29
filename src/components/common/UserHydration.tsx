import { useEffect } from 'react';
import useUserStore from '@/store/userStore';

const UserHydration = () => {
  const hydrateUser = useUserStore((state) => state.hydrateUser);

  useEffect(() => {
    hydrateUser().catch((error) => {
      console.error('User hydration failed:', error);
    });
  }, [hydrateUser]);

  return null;
};

export default UserHydration;
