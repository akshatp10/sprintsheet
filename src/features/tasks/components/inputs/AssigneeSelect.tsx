import { useMemo, useRef, useState } from 'react';
import { Plus } from 'lucide-react';

import Avatar from '@/components/avatar/Avatar';
import AvatarGroup from '@/components/avatar/AvatarGroups';
import Button from '@/components/button/Button';
import Checkbox from '@/components/inputs/Checkbox';
import Text from '@/components/common/Text';
import UserPanel from '@/components/sidebar/UserPanel';
import { cn } from '@/lib/cn';
import { useGetProjectMembers } from '@/lib/services/projects/hooks';

interface AssigneeSelectProps {
  projectId: string;
  value: string[];
  onChange: (ids: string[]) => void;
  onClose?: () => void;
}

const DROPDOWN_HEIGHT = 208;
const DROPDOWN_OFFSET = 6;

export function AssigneeSelect({
  projectId,
  value,
  onChange,
  onClose = () => {},
}: AssigneeSelectProps) {
  const { data: members = [], isLoading } = useGetProjectMembers(projectId);

  const [open, setOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);

  const triggerRef = useRef<HTMLDivElement>(null);

  const [pinnedIds, setPinnedIds] = useState<string[]>([]);

  const handleToggleOpen = () => {
    if (!open) {
      setPinnedIds(value);

      const rect = triggerRef.current?.getBoundingClientRect();

      if (rect) {
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;

        setOpenUpward(spaceBelow < DROPDOWN_HEIGHT + DROPDOWN_OFFSET && spaceAbove > spaceBelow);
      }
    } else {
      onClose();
    }

    setOpen((prev) => !prev);
  };

  const toggleAssignee = (userId: string) => {
    const nextValue = value.includes(userId)
      ? value.filter((id) => id !== userId)
      : [...value, userId];

    onChange(nextValue);
  };

  const selectedMembers = members.filter((member) => value.includes(member.userId));

  const { pinnedMembers, otherMembers } = useMemo(() => {
    const pinned = new Set(pinnedIds);

    return {
      pinnedMembers: members.filter((m) => pinned.has(m.userId)),
      otherMembers: members.filter((m) => !pinned.has(m.userId)),
    };
  }, [members, pinnedIds]);

  const renderRow = (member: (typeof members)[number]) => (
    <label
      key={member.userId}
      className="flex w-full cursor-pointer items-center gap-2 px-3 py-1.5 hover:bg-surface-page"
    >
      <Checkbox
        checked={value.includes(member.userId)}
        onChange={() => toggleAssignee(member.userId)}
      />

      <UserPanel userName={member.name} textVariant="body-sm" textColor="text-ink" />
    </label>
  );

  return (
    <div className="relative" ref={triggerRef}>
      <div className="flex min-w-0 items-center gap-1">
        {selectedMembers.length ? (
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
          onClick={handleToggleOpen}
          className="
      h-8 w-8 shrink-0
      rounded-md
      border border-lines-hairline
      p-0
      text-ink-3
      flex items-center justify-center
    "
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={1.75} />
        </Button>
      </div>

      {open && (
        <div
          className={cn(
            'absolute z-10 max-h-48 w-48 overflow-auto rounded-md border border-lines-hairline bg-surface py-1 shadow-md',
            openUpward ? 'bottom-full mb-1.5' : 'top-full mt-1.5',
          )}
        >
          {isLoading ? (
            <Text variant="caption" className="px-3 py-1.5 text-ink-3">
              Loading…
            </Text>
          ) : members.length === 0 ? (
            <Text variant="caption" className="px-3 py-1.5 text-ink-3">
              No members found
            </Text>
          ) : (
            <>
              {pinnedMembers.map(renderRow)}
              {otherMembers.map(renderRow)}
            </>
          )}
        </div>
      )}
    </div>
  );
}
