import axiosInstance from '@/lib/axiosInstance';
import type {
  AcceptInvitationRequest,
  AcceptInvitationResponse,
  GetProjectInvitationsRequest,
  GetProjectInvitationsResponse,
  InviteToProjectRequest,
  InviteToProjectResponse,
  PreviewInvitationRequest,
  PreviewInvitationResponse,
  ResendInvitationRequest,
  ResendInvitationResponse,
  RevokeInvitationRequest,
  RevokeInvitationResponse,
} from './types';

// Non-2xx responses are left as thrown axios errors, so the UI can read the
// HTTP status (403 wrong account, 410 used/expired, ...) from `error.response`.

export const previewInvitation = async (
  requestPayload: PreviewInvitationRequest,
): Promise<PreviewInvitationResponse> => {
  const response = await axiosInstance.post('/invitations/preview', {
    token: requestPayload.token,
  });

  return response.data;
};

export const acceptInvitation = async (
  requestPayload: AcceptInvitationRequest,
): Promise<AcceptInvitationResponse> => {
  const response = await axiosInstance.post('/invitations/accept', {
    token: requestPayload.token,
  });

  return response.data;
};

export const inviteToProject = async (
  requestPayload: InviteToProjectRequest,
): Promise<InviteToProjectResponse> => {
  const response = await axiosInstance.post('/invitations/invite', {
    projectId: requestPayload.projectId,
    people: requestPayload.people,
  });

  return response.data;
};

export const getProjectInvitations = async (
  requestPayload: GetProjectInvitationsRequest,
): Promise<GetProjectInvitationsResponse> => {
  const response = await axiosInstance.get('/invitations/projectInvitations', {
    params: { projectId: requestPayload.projectId },
  });

  return response.data;
};

export const resendInvitation = async (
  requestPayload: ResendInvitationRequest,
): Promise<ResendInvitationResponse> => {
  const response = await axiosInstance.post('/invitations/resend', {
    invitationId: requestPayload.invitationId,
  });

  return response.data;
};

export const revokeInvitation = async (
  requestPayload: RevokeInvitationRequest,
): Promise<RevokeInvitationResponse> => {
  const response = await axiosInstance.post('/invitations/revoke', {
    invitationId: requestPayload.invitationId,
  });

  return response.data;
};
