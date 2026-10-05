import { currentUserEmail, isFeatureEnabled } from '@/config/features';
import ExtraOptionButton from '../button/ExtraOptionButton';
import SettingsButton from '../button/SettingsButton';
import UserPanel from './UserPanel';

const SidebarBottom = () => {
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

        <ExtraOptionButton handleClick={() => {}} />
      </div>
    </div>
  );
};

export default SidebarBottom;
