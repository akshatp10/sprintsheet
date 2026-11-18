// ADAPT: if ProjectRole already exists in your project types, import it instead.
export type ProjectRole = 'member' | 'admin';

export type InvitationState = 'pending' | 'accepted' | 'revoked' | 'expired';

/* ---------- Entity types ---------- */

/** What the public preview returns. Details are present only while pending. */
export interface InvitationPreview {
  state: InvitationState;
  projectName?: string;
  inviterName?: string;
  email?: string;
  role?: ProjectRole;
  accountExists?: boolean;
}

/** One row of the admin "pending invitations" list. */
export interface PendingInvitation {
  id: string;
  email: string;
  role: ProjectRole;
  // BIGINT columns can arrive as strings from the backend
  expiresAt: number | string;
  createdAt: number | string;
  isExpired: boolean;
  invitedByName: string;
}

export interface InvitePerson {
  email: string;
  role: ProjectRole;
}

export interface InviteResult {
  email: string;
  sent: boolean;
}

/* ---------- Request types ---------- */

export interface PreviewInvitationRequest {
  token: string;
}

export interface AcceptInvitationRequest {
  token: string;
}

export interface InviteToProjectRequest {
  projectId: string;
  people: InvitePerson[];
}

export interface GetProjectInvitationsRequest {
  projectId: string;
}

export interface ResendInvitationRequest {
  invitationId: string;
}

export interface RevokeInvitationRequest {
  invitationId: string;
}

/* ---------- Response types ---------- */
// These mirror the backend's flat { success, ...fields } responses.

export interface PreviewInvitationResponse {
  success: boolean;
  invitation: InvitationPreview;
}

export interface AcceptInvitationResponse {
  success: boolean;
  projectId: string;
}

export interface InviteToProjectResponse {
  success: boolean;
  invitations: InviteResult[];
  /** Emails skipped because they already belong to the project. */
  skipped: string[];
}

export interface GetProjectInvitationsResponse {
  success: boolean;
  invitations: PendingInvitation[];
}

export interface ResendInvitationResponse {
  success: boolean;
  email: string;
  sent: boolean;
}

export interface RevokeInvitationResponse {
  success: boolean;
}
