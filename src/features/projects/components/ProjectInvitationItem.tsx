import Button from '@/components/button/Button';
import Text from '@/components/common/Text';

import type { ProjectRole } from '@/lib/services/invitations/types';

interface ProjectInvitationItemProps {
  invitation: {
    id: string;
    email: string;
    role: ProjectRole;
    isExpired: boolean;
    expiresAt: number | string;
    invitedByName: string;
  };
  isResending: boolean;
  isRevoking: boolean;
  onResend: (invitationId: string) => void;
  onRevoke: (invitationId: string) => void;
}

const formatDate = (value: number | string) => new Date(Number(value)).toLocaleDateString();

const ProjectInvitationItem = ({
  invitation,
  isResending,
  isRevoking,
  onResend,
  onRevoke,
}: ProjectInvitationItemProps) => {
  return (
    <li className="flex flex-wrap items-center justify-between gap-3 py-3">
      <div className="flex min-w-0 flex-col">
        <Text maxLines={1}>{invitation.email}</Text>

        <Text variant="body-sm" className="text-ink-3">
          {invitation.isExpired
            ? 'Invitation expired'
            : `Invited · expires ${formatDate(invitation.expiresAt)}`}{' '}
          · by {invitation.invitedByName}
        </Text>
      </div>

      <div className="flex items-center gap-3">
        <span className="rounded-full bg-accent-tint px-2 py-0.5 text-xs font-medium text-accent">
          {invitation.role === 'admin' ? 'Admin' : 'Member'}
        </span>

        <Button
          variant="tertiary"
          type="button"
          disabled={isResending}
          onClick={() => onResend(invitation.id)}
          className="border-none text-sm text-accent-mid disabled:opacity-60"
        >
          Resend
        </Button>

        <Button
          variant="tertiary"
          type="button"
          disabled={isRevoking}
          onClick={() => onRevoke(invitation.id)}
          className="border-none text-sm text-red-600 disabled:opacity-60"
        >
          Revoke
        </Button>
      </div>
    </li>
  );
};

export default ProjectInvitationItem;
