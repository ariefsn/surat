import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiProperty,
  ApiPropertyOptional,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';

export class HttpResponse<T> {
  constructor(status: boolean, data: T, message?: string) {
    this.status = status;
    this.data = data;
    this.message = message;
  }

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  data: T;

  @ApiProperty()
  @ApiPropertyOptional()
  message?: string;
}

type ApiResponseWithOptions<TModel extends Type<any>> = {
  status: number;
  description?: string;
  type: TModel;
};

export function ApiResponseWith<TModel extends Type<any>>(
  options: ApiResponseWithOptions<TModel>,
) {
  const isPrimitive = [String, Number, Boolean].includes(options.type as any);

  return applyDecorators(
    ApiExtraModels(HttpResponse, options.type),
    ApiResponse({
      status: options.status,
      description: options.description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(HttpResponse) },
          {
            properties: {
              data: isPrimitive
                ? { type: (options.type as any).name.toLowerCase() } // string | number | boolean
                : { $ref: getSchemaPath(options.type as Type<any>) },
            },
          },
        ],
      },
    }),
  );
}
