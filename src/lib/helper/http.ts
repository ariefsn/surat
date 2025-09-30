import { HttpException } from '@nestjs/common';
import { HttpResponse } from '../models';

const JsonOk = <T>(data: any): HttpResponse<T> => {
  return new HttpResponse<T>(true, data);
};

const JsonError = (message: string, statusCode = 400) => {
  throw new HttpException(new HttpResponse(false, null, message), statusCode);
};

export { JsonError, JsonOk };
