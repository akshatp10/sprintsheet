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

export const usePreviewInvitation = (token: string) => {
  return useQuery({
    queryKey: invitationKeys.preview(token),
    queryFn: () => previewInvitation({ token }),
    select: (response) => response.invitation,
    enabled: Boolean(token),
    retry: false,
    refetchOnWindowFocus: false,
    meta: { suppressGlobalError: true },
  });
};

export const useAcceptInvitation = () => {
  return useMutation({
    mutationFn: (token: string) => acceptInvitation({ token }),
    meta: { suppressGlobalError: true },
  });
};

export const useProjectInvitations = (projectId: string, isAdmin?: boolean) => {
  return useQuery({
    queryKey: invitationKeys.project(projectId),
    queryFn: () => getProjectInvitations({ projectId }),
    select: (response) => response.invitations,
    enabled: Boolean(projectId) && (isAdmin ?? false),
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
