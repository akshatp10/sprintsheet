import { useMemo } from 'react';
import { useGetAllProjects } from '@/lib/services/projects/hooks';
import useUserStore from '@/store/userStore';

export const useCurrentProject = (projectId: string) => {
  const { data: projects = [], isLoading } = useGetAllProjects(false);
  const userId = useUserStore((state) => state.userId);

  const project = useMemo(
    () => projects.find((item) => item.id === projectId),
    [projects, projectId],
  );

  const isAdmin = useMemo(
    () =>
      Boolean(userId) &&
      Boolean(
        project?.members?.some((member) => member.userId === userId && member.role === 'admin'),
      ),
    [project, userId],
  );

  return { projects, project, isAdmin, isLoading };
};
