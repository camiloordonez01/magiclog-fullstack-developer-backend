import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BusinessError } from '../common';
import { ErrorResponse } from './interfaces/error.interface';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorHandler = this.errorHandlerFactory(
      exception,
      request,
      response,
    );

    const errorResponse = errorHandler.buildResponse();

    response.status(errorResponse.status).json(errorResponse);
  }

  private errorHandlerFactory(
    exception: unknown,
    request: Request,
    response: Response,
  ) {
    if (exception instanceof BusinessError)
      return new BusinessErrorHandler(exception, request, response);
    if (exception instanceof HttpException)
      return new HttpErrorHandler(exception, request, response);
    if (exception instanceof Error)
      return new UnknownErrorHandler(exception, request, response);

    return new UnknownErrorHandler(new Error('Unknown error'), request, response);
  }
}

abstract class ErrorHandler<T extends Error> {
  constructor(
    protected readonly exception: T,
    protected readonly request: Request,
    protected readonly response: Response,
  ) {}

  public buildResponse(): ErrorResponse {
    return {
      status: this.httpStatus,
      message: 'Error',
      data: this.errorMessage,
      type: this.errorType,
      timestamp: new Date().toISOString(),
    };
  }

  abstract httpStatus: number;
  abstract errorType: string;
  abstract errorMessage: string | Record<string, any>;
}

class BusinessErrorHandler extends ErrorHandler<BusinessError> {
  override httpStatus: number = HttpStatus.BAD_REQUEST;
  override errorType: string = this.exception.type;
  override errorMessage: string = this.exception.message;
}

class HttpErrorHandler extends ErrorHandler<HttpException> {
  override httpStatus: number = this.exception.getStatus();
  override errorType: string = HttpStatus[this.httpStatus];
  override errorMessage: string | object = this.getErrorMessage();

  private getErrorMessage(): string | object {
    const response = this.exception.getResponse();
    if (response instanceof Object) {
      return response['message'] ? response['message'] : response;
    }

    return this.exception.message;
  }
}

class UnknownErrorHandler extends ErrorHandler<Error> {
  override httpStatus: number = HttpStatus.INTERNAL_SERVER_ERROR;
  override errorType = this.exception?.name ?? HttpStatus[this.httpStatus];
  override errorMessage = this.exception?.message ?? 'Internal server error';
}
