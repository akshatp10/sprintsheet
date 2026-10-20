import { useMemo, useState } from 'react';
import { Check } from 'lucide-react';

import Avatar from '@/components/avatar/Avatar';
import AvatarGroup from '@/components/avatar/AvatarGroups';
import Button from '@/components/button/Button';
import Select, { type SelectOption } from '@/components/select/Select';
import Text from '@/components/common/Text';
import UserPanel from '@/components/sidebar/UserPanel';

import { useGetProjectMembers } from '@/lib/services/projects/hooks';

interface AssigneeSelectProps {
  projectId: string;
  value: string[];
  onChange: (ids: string[]) => void;
  onClose?: () => void;
  isDone?: boolean;
}

export function AssigneeSelect({
  projectId,
  value,
  onChange,
  onClose = () => {},
  isDone = false,
}: AssigneeSelectProps) {
  const { data: members = [], isLoading } = useGetProjectMembers(projectId);

  const [pinnedIds, setPinnedIds] = useState<string[]>([]);

  const memberOptions = useMemo<SelectOption[]>(() => {
    const pinned = new Set(pinnedIds);

    const orderedMembers = [
      ...members.filter((member) => pinned.has(member.userId)),
      ...members.filter((member) => !pinned.has(member.userId)),
    ];

    return orderedMembers.map((member) => ({
      label: member.name,
      value: member.userId,
    }));
  }, [members, pinnedIds]);

  const selectedMembers = members.filter((member) => value.includes(member.userId));

  const handleToggleOpen = (open: boolean, toggleOpen: () => void) => {
    if (!open) {
      setPinnedIds(value);
    } else {
      onClose();
    }

    toggleOpen();
  };

  return (
    <Select
      mode="multiple"
      options={memberOptions}
      value={value}
      onChange={onChange}
      placeholder="Search members..."
      searchable
      loading={isLoading}
      loadingContent={
        <Text variant="caption" className="px-3 py-1.5 text-ink-3">
          Loading…
        </Text>
      }
      emptyContent={
        <Text variant="caption" className="px-3 py-1.5 text-ink-3">
          No members found
        </Text>
      }
      clearable
      className="w-fit"
      listClassName="w-48"
      itemClassName="px-3 py-1.5 hover:bg-accent-tint"
      selectedItemClassName="bg-accent-tint"
      renderTrigger={({ open, toggleOpen }) => (
        <Button
          variant="tertiary"
          className={`flex min-w-0 items-center gap-1 cursor-pointer border-0 p-0 ${isDone && 'opacity-50'}`}
          onClick={() => handleToggleOpen(open, toggleOpen)}
        >
          {selectedMembers.length > 0 ? (
            <AvatarGroup>
              {selectedMembers.slice(0, 3).map((member) => (
                <Avatar key={member.id} userName={member.name} />
              ))}

              {selectedMembers.length > 3 && <Avatar extraUsers={selectedMembers.length - 3} />}
            </AvatarGroup>
          ) : (
            <>
              <Avatar />
              <Text variant="caption" className="text-ink-2">
                Unassigned
              </Text>
            </>
          )}
        </Button>
      )}
      renderOption={(option, selected) => {
        return (
          <div className="flex items-center gap-2 cursor-pointer">
            <span
              className={`
                flex h-4 w-4 shrink-0 items-center justify-center
                rounded-sm border
                ${selected ? 'border-accent bg-accent-wash-selected text-accent-deep' : 'border-lines-control bg-accent-tint'}
              `}
            >
              {selected && <Check size={12} />}
            </span>
            <UserPanel userName={option.label} textVariant="body-sm" textColor="text-ink" />
          </div>
        );
      }}
    />
  );
}
