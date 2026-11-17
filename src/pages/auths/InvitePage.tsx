import type { ReactNode } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AuthLayout, { AuthCard } from '@/features/auth/components/AuthLayout';
import Button from '@/components/button/Button';
import Text from '@/components/common/Text';
import useUserStore from '@/store/userStore';
import { useLogOutUser } from '@/lib/services/auth/hooks';
import type { InvitationState } from '@/lib/services/invitations/types';
import { useAcceptInvitation, usePreviewInvitation } from '@/lib/services/invitations/hooks';

const UNUSABLE_COPY: Record<
  Exclude<InvitationState, 'pending'>,
  { title: string; text: string }
> = {
  accepted: {
    title: 'Invitation already used',
    text: 'This invitation has already been accepted.',
  },
  revoked: {
    title: 'Invitation cancelled',
    text: 'An admin cancelled this invitation. Ask them to send a new one.',
  },
  expired: {
    title: 'Invitation expired',
    text: 'This invitation has expired. Ask a project admin to resend it.',
  },
};

const acceptErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    switch (error.response?.status) {
      case 401:
        return 'Your session has expired. Please sign in again.';
      case 403:
        return 'This invitation was sent to a different email address. Log out and sign in with the invited one.';
      case 404:
        return 'This invitation could not be found.';
      case 409:
        return "This project is archived, so it can't be joined right now.";
      case 410:
        return 'This invitation was already used, cancelled, or has expired.';
    }
  }
  return 'Something went wrong. Please try again.';
};

const InviteShell = (props: { title: string; subtitle?: string; children?: ReactNode }) => (
  <AuthCard title={props.title} subtitle={props.subtitle ?? ''} footer={null}>
    {props.children}
  </AuthCard>
);

const InvitePage = () => {
  const { token = '' } = useParams<{ token: string }>();
  const navigate = useNavigate();

  // ADAPT: this assumes the store exposes a flat `userEmail` (set by setUser).
  // If it is nested (e.g. state.user?.userEmail), change this one line.
  const userEmail = useUserStore((state) => state.userEmail);
  const isLoggedIn = Boolean(userEmail) && Boolean(localStorage.getItem('accessToken'));

  const preview = usePreviewInvitation(token);
  const accept = useAcceptInvitation();
  const { mutate: logout, isPending: isLoggingOut } = useLogOutUser();

  if (preview.isPending) {
    return <InviteShell title="Loading invitation…" />;
  }

  if (preview.isError) {
    return (
      <InviteShell
        title="Invitation not found"
        subtitle="This link is not valid. Ask the project admin to send you a new invitation."
      />
    );
  }

  const invitation = preview.data;

  if (invitation.state !== 'pending') {
    const copy = UNUSABLE_COPY[invitation.state];
    return <InviteShell title={copy.title} subtitle={copy.text} />;
  }

  const invitedEmail = invitation.email ?? '';
  const authQuery = new URLSearchParams({
    email: invitedEmail,
    redirect: `/invite/${token}`, // come back here after login / signup
  }).toString();

  const summary = `${invitation.inviterName} invited you to join "${invitation.projectName}" as ${
    invitation.role === 'admin' ? 'an admin' : 'a member'
  }.`;

  // 1. Logged out: continue to login (account exists) or register (new person)
  if (!isLoggedIn) {
    return (
      <InviteShell title="You've been invited" subtitle={summary}>
        <div className="flex flex-col gap-3">
          <Text className="text-ink-3">
            {invitation.accountExists
              ? `Log in as ${invitedEmail} to accept.`
              : `Create an account with ${invitedEmail} to accept.`}
          </Text>
          <Button
            variant="primary"
            type="button"
            onClick={() =>
              navigate(
                `${invitation.accountExists ? '/auth/login' : '/auth/register'}?${authQuery}`,
              )
            }
          >
            {invitation.accountExists ? 'Log in' : 'Create account'}{' '}
            <span aria-hidden="true">→</span>
          </Button>
        </div>
      </InviteShell>
    );
  }

  // 2. Logged in as somebody else: say so up front (the server would reject it too)
  if (userEmail?.trim().toLowerCase() !== invitedEmail) {
    return (
      <InviteShell
        title="Wrong account"
        subtitle={`This invitation was sent to ${invitedEmail}, but you're signed in as ${userEmail}.`}
      >
        <Button
          variant="primary"
          type="button"
          disabled={isLoggingOut}
          onClick={() => logout({ loginPath: `/auth/login?${authQuery}` })}
        >
          Log out and continue
        </Button>
      </InviteShell>
    );
  }

  // 3. Right account: joining takes an explicit click
  return (
    <InviteShell title="You've been invited" subtitle={summary}>
      <div className="flex flex-col gap-3">
        <Button
          variant="primary"
          type="button"
          disabled={accept.isPending}
          className="disabled:cursor-not-allowed disabled:opacity-60"
          onClick={() =>
            accept.mutate(token, {
              // Full reload (like after login) so the new project loads fresh;
              // replace() also removes the invite link from the history.
              onSuccess: ({ projectId }) => window.location.replace(`/project/${projectId}`),
            })
          }
        >
          {accept.isPending ? 'Joining…' : 'Accept invitation'}
        </Button>

        {accept.isError && (
          <Text className="text-sm text-red-600">{acceptErrorMessage(accept.error)}</Text>
        )}
      </div>
    </InviteShell>
  );
};

export default InvitePage;
