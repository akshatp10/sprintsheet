import { isFeatureEnabled } from '@/config/features';
import SettingsButton from '../button/SettingsButton';
import UserPanel from './UserPanel';
import Button from '../button/Button';
import { LogOut } from 'lucide-react';
import useUserStore from '@/store/userStore';

const SidebarBottom = () => {
  const removeUser = useUserStore((state) => state.removeUser);
  const currentUserEmail = useUserStore((state) => state.userEmail) ?? '';

  const handleLogOut = () => {
    removeUser();
    localStorage.removeItem('accessToken');
    window.location.assign('/auth/login');
  };

  return (
    <div className="flex flex-col justify-center gap-3">
      {isFeatureEnabled('VIEW_SETTING') && <SettingsButton isAdmin />}
      <hr className="text-lines-hairline" />
      <div className="flex w-full min-w-0 items-center justify-between gap-2">
        <div className="min-w-0">
          <UserPanel
            userName={currentUserEmail}
            isSidebar
            textVariant="h2"
            textColor="text-ink-2"
          />
        </div>
        <Button onClick={handleLogOut} variant="tertiary" className="border-0">
          <LogOut size={17} strokeWidth={1.5} className="text-stage-blocked-text" />
        </Button>
      </div>
    </div>
  );
};

export default SidebarBottom;
