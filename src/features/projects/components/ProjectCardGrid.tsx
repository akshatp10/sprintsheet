import Text from '@/components/common/Text';
import Button from '@/components/button/Button';
import { useNavigate } from 'react-router-dom';
import { Ellipsis } from 'lucide-react';
import AvatarGroup from '@/components/avatar/AvatarGroups';
import Avatar from '@/components/avatar/Avatar';
import Chip from '@/components/chips/Chip';
import ProgressBar from '@/components/progressBar/ProgressBar';
import type { Project, ProjectMember } from '@/lib/services/projects/types';
import { useMapProjectToCard } from '@/hooks/useMapProjectToCard';

interface ProjectCardGridProps {
  project: Project;
  members?: ProjectMember[];
}

const ProjectCardGrid = ({ project, members = [] }: ProjectCardGridProps) => {
  const navigate = useNavigate();

  const card = useMapProjectToCard(project, members);

  const visibleUsers = card.users.slice(0, 3);
  const extraUsers = Math.max(card.users.length - 3, 0);

  const clickingProjectCard = () => {
    navigate(`/project/${card.id}/board`);
  };

  return (
    <Button
      onClick={clickingProjectCard}
      variant="tertiary"
      className="flex h-50 w-full flex-col items-stretch justify-between rounded-xl border border-lines-hairline bg-surface px-6 py-4 text-left"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent-tint text-accent text-type-h2">
            {card.initials}
          </span>

          <Text variant="h1" className="text-xl font-medium text-ink" maxLines={1}>
            {card.title}
          </Text>
        </div>

        <Ellipsis size={17} strokeWidth={1.5} className="text-ink-fades-ghost-rows" />
      </div>

      <Text className="w-full text-left text-ink-2">{card.description}</Text>

      <div className="flex gap-2">
        <Chip text={card.date} variant="primary" bgColor="bg-accent-tint" textColor="text-accent" />

        <Chip
          text={`${card.openCount} open`}
          variant="secondary"
          borderColor="border-lines-control"
          textColor="text-ink-2"
        />
      </div>

      <ProgressBar progress={card.progress} color="bg-accent" />

      <div className="flex items-center gap-2">
        <AvatarGroup>
          {visibleUsers.map((user) => (
            <Avatar key={user.userName} userName={user.userName} />
          ))}

          {extraUsers > 0 && <Avatar extraUsers={extraUsers} />}
        </AvatarGroup>

        <Text variant="body-sm" className="text-ink-2">
          {card.progressText}
        </Text>
      </div>
    </Button>
  );
};

export default ProjectCardGrid;
