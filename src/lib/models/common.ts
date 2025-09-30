export interface IMap {
  [key: string]: any;
}

export interface IHttpResponse<T> {
  status: boolean;
  data: T;
  message?: string;
}
