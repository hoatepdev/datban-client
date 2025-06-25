export const HTTP_METHODS = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
  PATCH: "patch",
} as const;

export type HttpMethod = (typeof HTTP_METHODS)[keyof typeof HTTP_METHODS];

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export type HttpStatus = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];

export const CONTENT_TYPE = {
  JSON: "application/json",
  FORM_DATA: "multipart/form-data",
  URL_ENCODED: "application/x-www-form-urlencoded",
} as const;

export type ContentType = (typeof CONTENT_TYPE)[keyof typeof CONTENT_TYPE];
