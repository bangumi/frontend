export interface ApiResponse<Status extends number, Data = unknown> {
  status: Status;
  ok: Status extends 200 | 204 ? true : false;
  headers: Headers;
  data: Data;
}
