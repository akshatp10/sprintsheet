import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  acceptInvitation,
  getProjectInvitations,
  inviteToProject,
  previewInvitation,
  resendInvitation,
  revokeInvitation,
} from './api';
import type { InvitePerson } from './types';

export const invitationKeys = {
  preview: (token: string) => ['invitations', 'preview', token] as const,
  project: (projectId: string) => ['invitations', 'project', projectId] as const,
};

// Public invite page: what to show for this token
export const usePreviewInvitation = (token: string) => {
  return useQuery({
    queryKey: invitationKeys.preview(token),
    queryFn: () => previewInvitation({ token }),
    select: (response) => response.invitation,
    enabled: Boolean(token),
    retry: false, // an invalid token will not fix itself
    refetchOnWindowFocus: false,
  });
};

// Accept: the caller navigates (full reload) afterwards, so the new project
// is loaded fresh. No cache invalidation needed here.
export const useAcceptInvitation = () => {
  return useMutation({
    mutationFn: (token: string) => acceptInvitation({ token }),
  });
};

// Admin only on the backend (403 for everyone else)
export const useProjectInvitations = (projectId: string) => {
  return useQuery({
    queryKey: invitationKeys.project(projectId),
    queryFn: () => getProjectInvitations({ projectId }),
    select: (response) => response.invitations,
    enabled: Boolean(projectId),
  });
};

export const useInviteToProject = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (people: InvitePerson[]) => inviteToProject({ projectId, people }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invitationKeys.project(projectId) });
    },
  });
};

export const useResendInvitation = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invitationId: string) => resendInvitation({ invitationId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invitationKeys.project(projectId) });
    },
  });
};

export const useRevokeInvitation = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invitationId: string) => revokeInvitation({ invitationId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invitationKeys.project(projectId) });
    },
  });
};
