export interface Cycle {
  id: string;
  projectId: string;
  name: string;
  startDate: string;
  endDate: string;
  createdAt: number;
  updatedAt: number;
}

export interface CreateCycleInput {
  projectId: string;
  name: string;
  startDate: string;
  endDate: string;
}

export type UpdateCycleFields = Partial<Pick<Cycle, 'name' | 'startDate' | 'endDate'>>;

export interface UpdateCycleRequest {
  id: string;
  projectId: string;
  updates: UpdateCycleFields;
}

export interface DeleteCycleRequest {
  id: string;
  projectId: string;
}

// Responses
export type GetCycleResponse = Cycle;
export type GetCyclesResponse = Cycle[];
export type CreateCycleResponse = Cycle;
export type UpdateCycleResponse = Cycle;
