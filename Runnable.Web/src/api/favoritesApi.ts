import api from "./axiosInstance";
import type { Trail } from "../types/trail";

export const favoritesApi = {
  getAll: () =>
    api.get<Trail[]>("/favorites"),

  add: (trailId: string) =>
    api.post(`/favorites/${trailId}`),

  remove: (trailId: string) =>
    api.delete(`/favorites/${trailId}`),
};
