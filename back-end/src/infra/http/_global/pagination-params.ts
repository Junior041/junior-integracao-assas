import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipes';

export const apiQueryOrderParam = {
  name: 'order',
  enum: ['asc', 'desc'],
  required: false,
  schema: { default: 'asc' },
  example: 'asc',
};
export const apiQueryPageParam = {
  name: 'page',
  type: 'number',
  required: false,
};
export const apiQueryPerPageParam = {
  name: 'perPage',
  type: 'number',
  required: false,
};
export const orderSchema = z.enum(['asc', 'desc']).optional().default('desc');
export const orderValidationPipe = new ZodValidationPipe(orderSchema);
export const pageSchema = z.coerce.number().positive().optional().default(1);
export const pageValidationPipe = new ZodValidationPipe(pageSchema);
export const perPageSchema = z.coerce.number().nonnegative().optional();
export const perPageValidationPipe = new ZodValidationPipe(perPageSchema);
