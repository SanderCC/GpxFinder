import api from "./axiosInstance";

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  hometown?: string;
  unitPreference: "Kilometers" | "Miles";
}

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  hometown?: string;
  unitPreference: "Kilometers" | "Miles";
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export const profileApi = {
  get: () =>
    api.get<UserProfile>("/profile"),

  update: (data: UpdateProfileRequest) =>
    api.put("/profile", data),

  changePassword: (data: ChangePasswordRequest) =>
    api.put("/profile/password", data),
};
