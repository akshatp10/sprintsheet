import type { ProjectWithMembers } from '../lib/services/projects/types';
import { useGetAllTasksByProject } from '../lib/services/tasks/hooks';
import { getExtractedLetterFromString, getPercentage } from '../lib/utils';

export const formatDate = (timestamp: number | string): string => {
  return new Date(Number(timestamp))
    .toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
    .toUpperCase();
};

export const useMapProjectToCard = (project: ProjectWithMembers) => {
  const { data: tasks = [] } = useGetAllTasksByProject(project.id);

  const totalTasks = tasks.length;

  const doneTasks = tasks.filter((task) => task.stage.isTerminal).length;

  const progress = getPercentage(doneTasks, totalTasks);

  return {
    id: project.id,
    initials: getExtractedLetterFromString(project.name, 2),
    title: project.name,
    description: project.description,
    date: formatDate(project.createdAt),
    openCount: totalTasks - doneTasks,
    progress,
    progressText: `${progress}% complete`,
    members: project.members,
  };
};
