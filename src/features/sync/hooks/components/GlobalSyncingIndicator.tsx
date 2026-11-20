import { useIsSyncing } from '../useIsSyncing';

export const GlobalSyncIndicator = () => {
  const syncing = useIsSyncing();

  return (
    <div
      className={`
        fixed top-2 left-1/2 z-9999
        flex items-center gap-2
        rounded-full bg-accent-tint px-4 py-2
        text-sm text-accent-deep shadow-lg
        transition-all duration-300 ease-in-out
        ${
          syncing
            ? 'translate-y-0 -translate-x-1/2 opacity-100'
            : '-translate-y-4 -translate-x-1/2 opacity-0 pointer-events-none'
        }
      `}
    >
      <span className="h-3 w-3 animate-spin rounded-full border-2 border-accent-deep/30 border-t-accent-deep" />
      Syncing…
    </div>
  );
};
