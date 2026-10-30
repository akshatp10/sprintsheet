import { useEffect } from 'react';
import { useGetCurrentUser } from '@/lib/services/users/hooks';

interface UseAuthRedirectOptions {
  redirectTo?: string;
}

const useAuthRedirect = ({ redirectTo = '/' }: UseAuthRedirectOptions = {}) => {
  const token = localStorage.getItem('accessToken');

  const {
    data: user,
    isLoading,
    isError,
  } = useGetCurrentUser({
    enabled: !!token,
  });

  useEffect(() => {
    if (user) {
      window.location.assign(redirectTo);
    }
  }, [user, redirectTo]);

  return {
    user,
    isLoading,
    isError,
    hasToken: !!token,
    isAuthenticated: !!user,
  };
};

export default useAuthRedirect;
