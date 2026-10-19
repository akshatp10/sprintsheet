export interface UserSummary {
  id: string;
  name: string;
}

export interface User extends UserSummary {
  email: string;
}

// Response Types
export type GetUserResponse = User;
export type GetCurrentUserResponse = User;
export type GetUsersResponse = UserSummary[];
export type GetProjectUsersResponse = UserSummary[];
