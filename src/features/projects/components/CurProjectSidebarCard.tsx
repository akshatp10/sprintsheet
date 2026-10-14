import Button from '@/components/button/Button';
import Text from '@/components/common/Text';
import { cn } from '@/lib/cn';
import { useGetAllProjects } from '@/lib/services/projects/hooks';
import type { Project } from '@/lib/services/projects/types';
import { getExtractedLetterFromString } from '@/lib/utils';
import { ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CurProjectSidebarCardProps {
  project: Project;
  cycleName: string;
}

const CurProjectSidebarCard = ({ project, cycleName }: CurProjectSidebarCardProps) => {
  const { data: projects = [], isLoading } = useGetAllProjects(false);

  const [openProjectSelection, setOpenProjectSelection] = useState(false);

  const navigate = useNavigate();

  const initials = getExtractedLetterFromString(project.name, 2).toUpperCase();

  const handleToggleOpen = () => {
    setOpenProjectSelection((prev) => !prev);
  };

  const handleProjectSelect = (projectId: string) => {
    setOpenProjectSelection(false);
    navigate(`/project/${projectId}/board`);
  };

  return (
    <div className="relative w-full">
      <div className="flex h-15 w-full items-center justify-between rounded-lg border border-lines-hairline bg-surface px-4 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="shrink-0 rounded-md bg-accent-tint px-2 text-accent">{initials}</span>

          <div className="flex min-w-0 flex-col">
            <Text variant="h2" maxLines={1}>
              {project.name}
            </Text>

            <Text className="text-ink-3" maxLines={1}>
              {cycleName}
            </Text>
          </div>
        </div>

        <Button
          variant="tertiary"
          type="button"
          onClick={handleToggleOpen}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border-none p-0 text-ink-3"
        >
          <ChevronsUpDown strokeWidth={1.5} className="h-4 w-4" />
        </Button>
      </div>

      {openProjectSelection && (
        <div className="absolute top-full z-10 mt-1.5 max-h-48 w-full overflow-auto border border-lines-hairline bg-surface py-1 shadow-md">
          {isLoading ? (
            <Text variant="caption" className="px-3 py-2 text-ink-3">
              Loading projects…
            </Text>
          ) : projects.length === 0 ? (
            <Text variant="caption" className="px-3 py-2 text-ink-3">
              No projects found
            </Text>
          ) : (
            projects.map((item) => {
              const isSelected = item.id === project.id;

              const itemInitials = getExtractedLetterFromString(item.name, 2).toUpperCase();

              return (
                <Button
                  variant="tertiary"
                  key={item.id}
                  type="button"
                  onClick={() => handleProjectSelect(item.id)}
                  className={cn(
                    'flex w-full cursor-pointer items-center gap-2 border-none px-3 py-2 text-left transition-colors',
                    isSelected
                      ? 'bg-accent-wash-active text-accent'
                      : 'text-ink hover:bg-accent-tint/30',
                  )}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent-tint text-xs text-accent">
                    {itemInitials}
                  </span>

                  <Text variant="body-sm" maxLines={1} className="min-w-0 flex-1">
                    {item.name}
                  </Text>

                  {isSelected && <span className="shrink-0 text-xs text-accent">Current</span>}
                </Button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default CurProjectSidebarCard;
