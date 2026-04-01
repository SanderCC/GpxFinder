import api from "./axiosInstance";
import type { Trail } from "../types/trail";

export interface TrailList {
  id: string;
  name: string;
  createdAt: string;
  trails: Trail[];
}

export interface CreateListRequest {
  name: string;
}

export const listsApi = {
  getAll: () =>
    api.get<TrailList[]>("/lists"),

  create: (data: CreateListRequest) =>
    api.post<TrailList>("/lists", data),

  update: (id: string, data: CreateListRequest) =>
    api.put(`/lists/${id}`, data),

  remove: (id: string) =>
    api.delete(`/lists/${id}`),

  addTrail: (listId: string, trailId: string) =>
    api.post(`/lists/${listId}/trails/${trailId}`),

  removeTrail: (listId: string, trailId: string) =>
    api.delete(`/lists/${listId}/trails/${trailId}`),
};
