import type { Project, ProjectMember } from './services/projects/types';
import { getExtractedLetterFromString } from './utils';

interface ProjectUser {
  userName: string;
  variant: 'blue' | 'amber' | 'purple' | 'rose';
}

const avatarVariants: ProjectUser['variant'][] = ['blue', 'amber', 'purple', 'rose'];

const formatDate = (timestamp: number) =>
  new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

export const mapProjectToCard = (project: Project, members: ProjectMember[] = []) => {
  const users: ProjectUser[] = members.map((m, i) => ({
    userName: m.name || m.email,
    variant: avatarVariants[i % avatarVariants.length],
  }));

  return {
    id: project.id,
    initials: getExtractedLetterFromString(project.name, 2),
    title: project.name,
    description: project.description,
    date: formatDate(project.createdAt),
    openCount: 0,
    progress: 0,
    progressText: '0% this cycle',
    users,
  };
};
