import { useEffect } from 'react';
import { useGetCurrentUser } from '@/lib/services/users/hooks';
import { getPostAuthRedirect } from '@/lib/redirect';

interface UseAuthRedirectOptions {
  redirectTo?: string;
}

const useAuthRedirect = ({ redirectTo }: UseAuthRedirectOptions = {}) => {
  // "/" normally, or "/invite/<token>" when we came from an invitation
  const target = redirectTo ?? getPostAuthRedirect();
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
      window.location.assign(target);
    }
  }, [user, target]);

  return {
    user,
    isLoading,
    isError,
    hasToken: !!token,
    isAuthenticated: !!user,
  };
};

export default useAuthRedirect;
