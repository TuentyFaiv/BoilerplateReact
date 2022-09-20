export enum HTTPMetod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

export enum HTTPContentType {
  JSON = "application/json",
  PDF = "application/pdf",
  FILES = "multipart/form-data",
  TEXT = "text/plain",
  CSV = "text/csv"
}

export enum Actions {
  SIGNIN = "SIGNIN",
  SIGNOUT = "SIGNOUT",
  CHANGE_ONBOARDING = "CHANGE_ONBOARDING",
  UPDATE_USER = "UPDATE_USER",
  UPDATE_PROFILE_IMAGE = "UPDATE_PROFILE_IMAGE"
}

export enum Onboarding {
  SIGNUP = 1,
  SIGNIN = 2
}
