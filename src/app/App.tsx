import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserHydration from '@/components/common/UserHydration';
import { notifyError } from '@/lib/notifyError';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta?.suppressGlobalError) return;
      notifyError(error);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.meta?.suppressGlobalError) return;
      notifyError(error);
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
