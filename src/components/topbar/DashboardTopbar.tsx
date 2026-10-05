import { useGetAllCyclesByProject } from '@/lib/services/cycles/hooks';
import { useParams, useSearchParams } from 'react-router-dom';
import Text from '../common/Text';
import { useEffect } from 'react';
import { useCycleStatus } from '@/hooks/useCycleStatus';

const DashboardTopbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCycleId = searchParams.get('cycle') ?? '';

  const { projectid } = useParams<{ projectid: string }>();
  const { data: cycles = [] } = useGetAllCyclesByProject(projectid ?? '');

  const { active: activeCycles, closed: closedCycles } = useCycleStatus(cycles);

  useEffect(() => {
    if (currentCycleId) return;

    if (cycles.length === 0) return;

    const currentCycle = activeCycles[0] ?? closedCycles[closedCycles.length - 1];

    if (!currentCycle) return;

    setSearchParams(
      (prev) => {
        prev.set('cycle', currentCycle.id);
        return prev;
      },
      { replace: true },
    );
  }, [currentCycleId, cycles, activeCycles, closedCycles, setSearchParams]);

  const handleCycleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cycleId = event.target.value;

    setSearchParams((prev) => {
      prev.set('cycle', cycleId);
      return prev;
    });
  };

  return (
    <div className="flex w-full items-center justify-between gap-3">
      <Text variant="h1">Dashboard</Text>

      <div className="flex min-w-0 shrink-0 items-center gap-3">
        {cycles.length === 0 ? (
          <Text variant="body-sm" className="text-ink-3">
            No cycle present
          </Text>
        ) : (
          <select
            value={currentCycleId}
            onChange={handleCycleChange}
            className="rounded-md border border-lines-hairline bg-surface px-3 py-1.5 text-sm text-ink outline-none"
          >
            {[...cycles].reverse().map((cycle) => (
              <option key={cycle.id} value={cycle.id}>
                {cycle.name}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default DashboardTopbar;
