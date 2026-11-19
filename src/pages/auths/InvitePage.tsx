import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthCard } from '@/features/auth/components/AuthLayout';
import Button from '@/components/button/Button';
import Text from '@/components/common/Text';
import useUserStore from '@/store/userStore';
import { useLogOutUser } from '@/lib/services/auth/hooks';
import { useAcceptInvitation, usePreviewInvitation } from '@/lib/services/invitations/hooks';

const UNUSABLE = {
  accepted: ['Invitation already used', 'This invitation has already been accepted.'],
  revoked: [
    'Invitation cancelled',
    'An admin cancelled this invitation. Ask them to send a new one.',
  ],
  expired: ['Invitation expired', 'This invitation has expired. Ask a project admin to resend it.'],
} as const;

const ACCEPT_ERRORS: Record<number, string> = {
  401: 'Your session has expired. Please sign in again.',
  403: 'This invitation was sent to a different email address. Log out and sign in with the invited one.',
  404: 'This invitation could not be found.',
  409: "This project is archived, so it can't be joined right now.",
  410: 'This invitation was already used, cancelled, or has expired.',
};

const GoHomeButton = () => (
  <Button variant="primary" type="button" onClick={() => window.location.replace('/')}>
    Go to Home
  </Button>
);

const InvitePage = () => {
  const { token = '' } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const userEmail = useUserStore((state) => state.userEmail);
  const isLoggedIn = Boolean(userEmail) && Boolean(localStorage.getItem('accessToken'));

  const preview = usePreviewInvitation(token);
  const accept = useAcceptInvitation();
  const { mutate: logout, isPending: isLoggingOut } = useLogOutUser();

  if (preview.isPending) {
    return <AuthCard title="Loading invitation…" subtitle="" footer={null} children={undefined} />;
  }

  if (preview.isError) {
    return (
      <AuthCard
        title="Invitation not found"
        subtitle="This link is not valid. Ask the project admin to send you a new invitation."
        footer={null}
      >
        <GoHomeButton />
      </AuthCard>
    );
  }

  const invitation = preview.data;

  if (invitation === undefined) return null;

  if (invitation.state !== 'pending') {
    const [title, text] = UNUSABLE[invitation.state];
    return (
      <AuthCard title={title} subtitle={text} footer={null}>
        <GoHomeButton />
      </AuthCard>
    );
  }

  const invitedEmail = invitation.email ?? '';
  const authQuery = new URLSearchParams({
    email: invitedEmail,
    redirect: `/invite/${token}`,
  }).toString();

  const summary = `${invitation.inviterName} invited you to join "${invitation.projectName}" as ${
    invitation.role === 'admin' ? 'an admin' : 'a member'
  }.`;

  // 1. Logged out
  if (!isLoggedIn) {
    const path = invitation.accountExists ? '/auth/login' : '/auth/register';
    return (
      <AuthCard title="You've been invited" subtitle={summary} footer={null}>
        <div className="flex flex-col gap-3">
          <Text className="text-ink-3">
            {invitation.accountExists
              ? `Log in as ${invitedEmail} to accept.`
              : `Create an account with ${invitedEmail} to accept.`}
          </Text>
          <Button variant="primary" type="button" onClick={() => navigate(`${path}?${authQuery}`)}>
            {invitation.accountExists ? 'Log in' : 'Create account'}{' '}
            <span aria-hidden="true">→</span>
          </Button>
        </div>
      </AuthCard>
    );
  }

  // 2. Logged in as someone else
  if (userEmail?.trim().toLowerCase() !== invitedEmail) {
    return (
      <AuthCard
        title="Wrong account"
        subtitle={`This invitation was sent to ${invitedEmail}, but you're signed in as ${userEmail}.`}
        footer={null}
      >
        <Button
          variant="primary"
          type="button"
          disabled={isLoggingOut}
          onClick={() => logout({ loginPath: `/auth/login?${authQuery}` })}
        >
          Log out and continue
        </Button>
      </AuthCard>
    );
  }

  // 3. Right account: explicit accept
  const status = axios.isAxiosError(accept.error) ? accept.error.response?.status : undefined;

  return (
    <AuthCard title="You've been invited" subtitle={summary} footer={null}>
      <div className="flex flex-col gap-3">
        <Button
          variant="primary"
          type="button"
          disabled={accept.isPending}
          className="disabled:cursor-not-allowed disabled:opacity-60"
          onClick={() =>
            accept.mutate(token, {
              onSuccess: ({ projectId }) => window.location.replace(`/project/${projectId}`),
            })
          }
        >
          {accept.isPending ? 'Joining…' : 'Accept invitation'}
        </Button>

        {accept.isError && (
          <Text className="text-sm text-red-600">
            {(status && ACCEPT_ERRORS[status]) || 'Something went wrong. Please try again.'}
          </Text>
        )}
      </div>
    </AuthCard>
  );
};

export default InvitePage;
