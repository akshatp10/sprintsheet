import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import Text from '@/components/common/Text';

import {
  useInviteToProject,
  useProjectInvitations,
  useResendInvitation,
  useRevokeInvitation,
} from '@/lib/services/invitations/hooks';
import type { ProjectRole } from '@/lib/services/invitations/types';

import InvitePeopleForm from './forms/InvitePeopleForm';
import ProjectMembersList from './ProjectMemberList';
import ProjectInvitationItem from './ProjectInvitationItem';

interface PeopleMember {
  id: string;
  userId: string;
  name: string;
  role: ProjectRole;
}

interface ProjectPeopleProps {
  projectId: string;
  members: PeopleMember[];
  isAdmin: boolean;
  currentUserId: string | null;
}

const ProjectPeople = ({ projectId, members, isAdmin, currentUserId }: ProjectPeopleProps) => {
  const invitations = useProjectInvitations(projectId, isAdmin);

  const { mutate: invite, isPending: isInviting } = useInviteToProject(projectId);

  const { mutate: resend, isPending: isResending } = useResendInvitation(projectId);

  const { mutate: revoke, isPending: isRevoking } = useRevokeInvitation(projectId);

  const [email, setEmail] = useState('');
  const [role, setRole] = useState<ProjectRole>('member');

  const handleInvite = () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) return;

    invite([{ email: trimmedEmail, role }], {
      onSuccess: (response) => {
        setEmail('');

        if (response.skipped.length > 0) {
          toast.info(`${response.skipped.join(', ')} is already in this project.`);
        } else if (response.invitations.some((item) => !item.sent)) {
          toast.warning('Invitation saved, but the email could not be sent. Use Resend.');
        } else {
          toast.success('Invitation sent.');
        }
      },
    });
  };

  const handleResend = (invitationId: string) => {
    resend(invitationId, {
      onSuccess: (response) => {
        if (response.sent) {
          toast.success(`Invitation resent to ${response.email}.`);
        } else {
          toast.error(`Could not email ${response.email}. Try again in a moment.`);
        }
      },
      onError: () => {
        toast.error('Could not resend the invitation.');
      },
    });
  };

  const handleRevoke = (invitationId: string) => {
    revoke(invitationId, {
      onSuccess: () => {
        toast.success('Invitation revoked.');
      },
      onError: () => {
        toast.error('Could not revoke the invitation.');
      },
    });
  };

  const invited = invitations.data ?? [];

  return (
    <>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-6">
        {isAdmin && (
          <InvitePeopleForm
            email={email}
            onEmailChange={setEmail}
            role={role}
            onRoleChange={setRole}
            isInviting={isInviting}
            onSubmit={handleInvite}
          />
        )}

        <ProjectMembersList members={members} currentUserId={currentUserId} />

        {isAdmin && (
          <section className="flex flex-col gap-2">
            <Text variant="h2">Invited ({invited.length})</Text>

            {invitations.isPending && <Text className="text-sm text-ink-3">Loading…</Text>}

            {invitations.isError && (
              <Text className="text-sm text-red-600">Could not load invitations.</Text>
            )}

            {invitations.isSuccess && invited.length === 0 && (
              <Text className="text-sm text-ink-3">No pending invitations.</Text>
            )}

            {invited.length > 0 && (
              <ul className="flex flex-col divide-y divide-lines-hairline rounded-lg border border-lines-hairline bg-surface px-4">
                {invited.map((invitation) => (
                  <ProjectInvitationItem
                    key={invitation.id}
                    invitation={invitation}
                    isResending={isResending}
                    isRevoking={isRevoking}
                    onResend={handleResend}
                    onRevoke={handleRevoke}
                  />
                ))}
              </ul>
            )}
          </section>
        )}
      </div>
    </>
  );
};

export default ProjectPeople;
