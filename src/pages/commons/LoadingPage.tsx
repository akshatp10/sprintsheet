import { Loader2 } from 'lucide-react';

const LoadingPage = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Loader2 size={24} strokeWidth={1.5} className="animate-spin text-ink-3" />
    </div>
  );
};

export default LoadingPage;
