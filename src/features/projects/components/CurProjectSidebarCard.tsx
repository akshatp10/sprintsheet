import Button from '@/components/button/Button';
import Text from '@/components/common/Text';
import Select, { type SelectOption } from '@/components/select/Select';
import { useGetAllProjects } from '@/lib/services/projects/hooks';
import type { Project } from '@/lib/services/projects/types';
import { getExtractedLetterFromString } from '@/lib/utils';
import { ChevronsUpDown } from 'lucide-react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

interface CurProjectSidebarCardProps {
  project: Project;
  cycleName: string;
}

const CurProjectSidebarCard = ({ project, cycleName }: CurProjectSidebarCardProps) => {
  const { data: projects = [], isLoading } = useGetAllProjects(false);
  const navigate = useNavigate();

  const initials = getExtractedLetterFromString(project.name, 2).toUpperCase();

  const projectOptions: SelectOption[] = useMemo(
    () =>
      projects.map((item) => ({
        label: item.name,
        value: item.id,
      })),
    [projects],
  );

  const handleProjectSelect = (projectId: string | null) => {
    if (!projectId || projectId === project.id) return;

    navigate(`/project/${projectId}/board`);
  };

  return (
    <Select
      options={projectOptions}
      value={project.id}
      onChange={handleProjectSelect}
      placeholder="Select a project"
      searchable
      loading={isLoading}
      emptyMessage="No projects found"
      listClassName="overflow-hidden rounded-lg border border-lines-hairline bg-surface py-1 shadow-md"
      itemClassName="flex w-full items-center gap-2 text-left hover:bg-accent-tint/30 p-0"
      selectedItemClassName="bg-accent-wash-active text-accent"
      renderTrigger={({ toggleOpen }) => (
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
            onClick={toggleOpen}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border-none p-0 text-ink-3"
          >
            <ChevronsUpDown strokeWidth={1.5} className="h-4 w-4" />
          </Button>
        </div>
      )}
      renderOption={(option, selected) => {
        const optionInitials = getExtractedLetterFromString(option.label, 2).toUpperCase();

        return (
          <div className="flex w-full cursor-pointer items-center gap-2 border-none px-3 py-2 text-left transition-colors">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent-tint text-xs text-accent">
              {optionInitials}
            </span>

            <Text variant="body-sm" maxLines={1} className="min-w-0 flex-1">
              {option.label}
            </Text>

            {selected && <span className="shrink-0 text-xs text-accent">Current</span>}
          </div>
        );
      }}
    />
  );
};

export default CurProjectSidebarCard;
