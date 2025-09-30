import { HttpResponse } from '../models';

const JsonOk = <T>(data: any): HttpResponse<T> => {
  return new HttpResponse<T>(true, data);
};

const JsonError = (message: string): HttpResponse<any> => {
  return new HttpResponse(false, null, message);
};

export { JsonError, JsonOk };
