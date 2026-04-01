import api from "./axiosInstance";

export interface CrawlSearchRequest {
  lat?: number;
  lng?: number;
  radius?: number;
  region?: string;
}

export interface CrawlStatus {
  jobId: string;
  status: "Pending" | "Running" | "Completed" | "Failed";
  trailsFound?: number;
}

export const crawlApi = {
  search: (data: CrawlSearchRequest) =>
    api.post<CrawlStatus>("/crawl/search", data),

  getStatus: (jobId: string) =>
    api.get<CrawlStatus>(`/crawl/status/${jobId}`),
};
