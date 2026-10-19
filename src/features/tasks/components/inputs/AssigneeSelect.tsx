import { useMemo, useState } from 'react';
import { Check, Plus } from 'lucide-react';

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
}

export function AssigneeSelect({
  projectId,
  value,
  onChange,
  onClose = () => {},
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
        <div className="flex min-w-0 items-center gap-1">
          {selectedMembers.length > 0 ? (
            <AvatarGroup>
              {selectedMembers.slice(0, 3).map((member) => (
                <Avatar key={member.id} userName={member.name} />
              ))}

              {selectedMembers.length > 3 && <Avatar extraUsers={selectedMembers.length - 3} />}
            </AvatarGroup>
          ) : (
            <Avatar />
          )}

          <Button
            variant="tertiary"
            type="button"
            onClick={() => handleToggleOpen(open, toggleOpen)}
            className="
              flex h-8 w-8 shrink-0 items-center justify-center
              rounded-md border border-lines-hairline
              p-0 text-ink-3
            "
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={1.75} />
          </Button>
        </div>
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
