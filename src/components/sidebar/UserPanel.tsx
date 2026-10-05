import Avatar from '../avatar/Avatar';
import Text, { type TextVariant } from '../common/Text';

interface UserPanelSidebarProps {
  userName: string;
  isSidebar?: boolean;
  textVariant?: TextVariant;
  textColor?: string;
}

const UserPanel = ({ userName, isSidebar, textVariant = 'body' }: UserPanelSidebarProps) => {
  const displayUserName = userName.split(' ')[0];

  return (
    <div className="flex min-w-0 items-center">
      <div className="flex min-w-0 items-center gap-2">
        <Avatar userName={displayUserName} isSideBar={isSidebar} />

        <Text variant={textVariant} maxLines={1}>
          {displayUserName}
        </Text>
      </div>
    </div>
  );
};

export default UserPanel;
