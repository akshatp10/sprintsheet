import { useParams } from 'react-router-dom';
import Text from '@/components/common/Text';
import useUserStore from '@/store/userStore';
import ProjectPeople from '@/features/projects/components/ProjectPeople';
import { useCurrentProject } from '@/hooks/useCurrentProject';
import LoadingPage from './commons/LoadingPage';
import Mascot from '@/components/common/Mascot';

const ProjectPeoplePage = () => {
  const { projectid = '' } = useParams<{ projectid: string }>();
  const currentUserId = useUserStore((state) => state.userId);

  const { project, isAdmin, isLoading } = useCurrentProject(projectid);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!project) {
    return (
      <div className="flex h-full w-full items-center justify-center flex-col">
        <Mascot expression="error" size={200} renderAnimation />
        <Text variant="h1">No Project Found</Text>
      </div>
    );
  }

  return (
    <ProjectPeople
      projectId={project.id}
      members={project.members}
      isAdmin={isAdmin}
      currentUserId={currentUserId}
    />
  );
};

export default ProjectPeoplePage;
