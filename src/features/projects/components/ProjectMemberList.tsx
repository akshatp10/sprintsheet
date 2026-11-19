import Text from '@/components/common/Text';
import { getExtractedLetterFromString } from '@/lib/utils';
import type { ProjectRole } from '@/lib/services/invitations/types';
import Avatar from '@/components/avatar/Avatar';

interface PeopleMember {
  id: string;
  userId: string;
  name: string;
  role: ProjectRole;
}

interface ProjectMembersListProps {
  members: PeopleMember[];
  currentUserId: string | null;
}

const ProjectMembersList = ({ members, currentUserId }: ProjectMembersListProps) => {
  return (
    <section className="flex flex-col gap-2">
      <Text variant="h2">Members ({members.length})</Text>

      <ul className="flex flex-col divide-y divide-lines-hairline rounded-lg border border-lines-hairline bg-surface px-4">
        {members.map((member) => (
          <li key={member.id} className="flex items-center justify-between gap-3 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <Avatar userName={member.name} isSideBar />

              <Text maxLines={1}>
                {member.name}
                {member.userId === currentUserId ? ' (You)' : ''}
              </Text>
            </div>

            <span className="rounded-full bg-accent-tint px-2 py-0.5 text-xs font-medium text-accent">
              {member.role === 'admin' ? 'Admin' : 'Member'}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectMembersList;
