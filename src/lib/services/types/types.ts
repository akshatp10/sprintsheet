export interface Type {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
}

// Responses
export type GetProjectTypesResponse = Type[];
export type GetTypeResponse = Type;
