import { EnvService } from '@/infra/env/env.service';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, ErrorRequestHandler } from 'express';
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private env: EnvService) {}
  catch(exception: ErrorRequestHandler, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';
    let validationError = {};
    let jsonResponse = new Object({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: `Ops! Algo deu errado: ${message.includes('Internal server error') ? 'Contate o Suporte!!' : message}`,
    });

    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      if (
        response &&
        Object.prototype.hasOwnProperty.call(response, 'errors')
      ) {
        const errors = response['errors'];
        validationError = errors.details;
        jsonResponse = Object.assign(jsonResponse, { validationError });
      }
    }

    response.status(status).json(jsonResponse);
  }
}
