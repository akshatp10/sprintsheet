import type { Project, ProjectMember } from '../lib/services/projects/types';
import { useGetAllTasksByProject } from '../lib/services/tasks/hooks';
import { getExtractedLetterFromString, getPercentage } from '../lib/utils';

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

export const useMapProjectToCard = (project: Project, members: ProjectMember[] = []) => {
  const { data: tasks = [] } = useGetAllTasksByProject(project.id);

  const totalTasks = tasks.length;

  const doneTasks = tasks.filter((task) => task.stage.isTerminal).length;

  const progress = getPercentage(doneTasks, totalTasks);

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
    openCount: totalTasks - doneTasks,
    progress,
    progressText: `${progress}% complete`,
    users,
  };
};
