export interface userModel {
  username?: string;
  password?: string;
  expiresInMins?: number; // optional, defaults to 60
}

export interface loginResponse {
  id?: number;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  image?: string;
  accessToken?: string | null | undefined;
  refreshToken?: string | null | undefined;
}
