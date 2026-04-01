import api from "./axiosInstance";
import type { Trail, TrailPhoto, TrailReview } from "../types/trail";

export interface TrailSearchParams {
  lat?: number;
  lng?: number;
  radius?: number;
  city?: string;
  region?: string;
  name?: string;
  type?: string;
  difficulty?: string;
  surfaceType?: string;
  minDistance?: number;
  maxDistance?: number;
  page?: number;
  pageSize?: number;
}

export interface TrailSearchResponse {
  items: Trail[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface CreateReviewRequest {
  rating: number;
  comment?: string;
  isReport?: boolean;
}

export const trailApi = {
  search: (params: TrailSearchParams) =>
    api.get<TrailSearchResponse>("/trails", { params }),

  getById: (id: string) =>
    api.get<Trail>(`/trails/${id}`),

  downloadGpx: (id: string) =>
    api.get<Blob>(`/trails/${id}/gpx`, { responseType: "blob" }),

  getPhotos: (id: string) =>
    api.get<TrailPhoto[]>(`/trails/${id}/photos`),

  getReviews: (id: string) =>
    api.get<TrailReview[]>(`/trails/${id}/reviews`),

  getOverlapping: (id: string) =>
    api.get<Trail[]>(`/trails/${id}/overlapping`),

  create: (data: FormData) =>
    api.post<Trail>("/trails", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  uploadPhoto: (id: string, data: FormData) =>
    api.post(`/trails/${id}/photos`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  addReview: (id: string, data: CreateReviewRequest) =>
    api.post(`/trails/${id}/reviews`, data),
};
