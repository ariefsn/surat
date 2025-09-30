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
  type?: TModel;
};

export function ApiResponseWith<TModel extends Type<any>>(
  options: ApiResponseWithOptions<TModel>,
) {
  const actualType = options.type ?? String;

  const primitiveMap = new Map<any, string>([
    [String, 'string'],
    [Number, 'number'],
    [Boolean, 'boolean'],
  ]);

  const isPrimitive = primitiveMap.has(actualType);

  return applyDecorators(
    ApiExtraModels(HttpResponse, ...(isPrimitive ? [] : [actualType])),
    ApiResponse({
      status: options.status,
      description: options.description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(HttpResponse) },
          {
            properties: {
              data: isPrimitive
                ? { type: primitiveMap.get(actualType), nullable: true }
                : { $ref: getSchemaPath(actualType), nullable: true },
            },
          },
        ],
      },
    }),
  );
}
