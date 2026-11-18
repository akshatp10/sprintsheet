import { useState, type FormEvent } from 'react';
import axios from 'axios';
import Button from '@/components/button/Button';
import Text from '@/components/common/Text';
import { getExtractedLetterFromString } from '@/lib/utils';
import {
  useInviteToProject,
  useProjectInvitations,
  useResendInvitation,
  useRevokeInvitation,
} from '@/lib/services/invitations/hooks';
import type { ProjectRole } from '@/lib/services/invitations/types';

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

const inviteErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    switch (error.response?.status) {
      case 400:
        return 'Please enter a valid email address.';
      case 403:
        return 'Only project admins can invite people.';
    }
  }
  return 'Could not send the invitation. Please try again.';
};

const formatDate = (value: number | string) => new Date(Number(value)).toLocaleDateString();

const RoleBadge = ({ role }: { role: ProjectRole }) => (
  <span className="rounded-full bg-accent-tint px-2 py-0.5 text-xs font-medium text-accent">
    {role === 'admin' ? 'Admin' : 'Member'}
  </span>
);

const ProjectPeople = ({ projectId, members, isAdmin, currentUserId }: ProjectPeopleProps) => {
  // Everyone in the project can see who is invited; only admins get the buttons below.
  const invitations = useProjectInvitations(projectId, isAdmin);
  const invite = useInviteToProject(projectId);
  const resend = useResendInvitation(projectId);
  const revoke = useRevokeInvitation(projectId);

  const [email, setEmail] = useState('');
  const [role, setRole] = useState<ProjectRole>('member');
  const [notice, setNotice] = useState<string | null>(null);

  const handleInvite = (event: FormEvent) => {
    event.preventDefault();
    setNotice(null);

    invite.mutate([{ email, role }], {
      onSuccess: (response) => {
        setEmail('');

        if (response.skipped.length > 0) {
          setNotice(`${response.skipped.join(', ')} is already in this project.`);
        } else if (response.invitations.some((item) => !item.sent)) {
          setNotice('Invitation saved, but the email could not be sent. Use Resend.');
        } else {
          setNotice('Invitation sent.');
        }
      },
      onError: (error) => setNotice(inviteErrorMessage(error)),
    });
  };

  const handleResend = (invitationId: string) => {
    setNotice(null);

    resend.mutate(invitationId, {
      onSuccess: (response) =>
        setNotice(
          response.sent
            ? `Invitation resent to ${response.email}.`
            : `Could not email ${response.email}. Try again in a moment.`,
        ),
      onError: () => setNotice('Could not resend the invitation.'),
    });
  };

  const invited = invitations.data ?? [];

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 p-6">
      {/* Admin only: invite form */}
      {isAdmin && (
        <section className="flex flex-col gap-3">
          <Text variant="h2">Invite people</Text>

          <form onSubmit={handleInvite} className="flex flex-wrap items-center gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@company.com"
              className="min-w-64 flex-1 rounded-md border border-lines-hairline bg-surface px-3 py-2 text-sm"
            />
            <select
              value={role}
              onChange={(event) => setRole(event.target.value as ProjectRole)}
              className="rounded-md border border-lines-hairline bg-surface px-3 py-2 text-sm"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
            <Button variant="primary" type="submit" disabled={invite.isPending}>
              {invite.isPending ? 'Sending…' : 'Invite'}
            </Button>
          </form>

          {notice && <Text className="text-sm text-ink-3">{notice}</Text>}
        </section>
      )}

      {/* Everyone: current members */}
      <section className="flex flex-col gap-2">
        <Text variant="h2">Members ({members.length})</Text>

        <ul className="flex flex-col divide-y divide-lines-hairline rounded-lg border border-lines-hairline bg-surface px-4">
          {members.map((member) => (
            <li key={member.id} className="flex items-center justify-between gap-3 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent-tint text-xs text-accent">
                  {getExtractedLetterFromString(member.name, 2).toUpperCase()}
                </span>

                <Text maxLines={1}>
                  {member.name}
                  {member.userId === currentUserId ? ' (You)' : ''}
                </Text>
              </div>

              <RoleBadge role={member.role} />
            </li>
          ))}
        </ul>
      </section>

      {/* Everyone: invited people. Admins also get Resend / Revoke. */}
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
                <li
                  key={invitation.id}
                  className="flex flex-wrap items-center justify-between gap-3 py-3"
                >
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
                    <RoleBadge role={invitation.role} />

                    {isAdmin && (
                      <>
                        <Button
                          variant="tertiary"
                          type="button"
                          disabled={resend.isPending}
                          onClick={() => handleResend(invitation.id)}
                          className="text-sm text-accent-mid disabled:opacity-60 border-none"
                        >
                          Resend
                        </Button>
                        <Button
                          variant="tertiary"
                          type="button"
                          disabled={revoke.isPending}
                          onClick={() => revoke.mutate(invitation.id)}
                          className="text-sm text-red-600 disabled:opacity-60 border-`none"
                        >
                          Revoke
                        </Button>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
};

export default ProjectPeople;
