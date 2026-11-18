import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getErrorMessage } from '@/lib/getErrorMessage';
import UserHydration from '@/components/common/UserHydration';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta?.suppressGlobalError) return;
      toast.error(getErrorMessage(error));
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.meta?.suppressGlobalError) return;
      toast.error(getErrorMessage(error));
    },
  }),
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserHydration />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
