export interface Trail {
  id: number;
  name: string;
  description: string;
  type: TrailType;
  difficulty: Difficulty;
  distance: number;
  elevation: number;
  duration: string;
  surface: string;
  dogFriendly: boolean;
  source: string;
  sourceUrl: string;
  lat: number;
  lng: number;
  country: string;
  region: string;
  photos: TrailPhoto[];
  reviews: TrailReview[];
}

export interface TrailPhoto {
  id: number;
  url: string;
  lat?: number;
  lng?: number;
}

export interface TrailReview {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
  isReport?: boolean;
}

export type TrailType = "Cycling" | "Hiking" | "Running" | "Mountain Biking";
export type Difficulty = "Beginner" | "Experienced" | "Advanced";
