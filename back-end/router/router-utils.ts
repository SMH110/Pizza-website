import { Request, Response } from 'express';
import 'express-session';

export function errorHandler(handler: (req: Request, res: Response) => Promise<any>) {

  return async function (req: Request, res: Response) {
    try {
      await handler(req, res);
    } catch (error) {
      console.error(`Error handling request to ${req.protocol + '://' + req.get('host') + req.originalUrl}`, error);
      res.sendStatus(500);
    }
  }

}

export interface IRequest<T> extends Request {
  body: T;
}

export interface IResponse<T> extends Response {
  status(status: 400): IValidationErrorResponse;
  json: {
    (status: number, body: T): IResponse<T>;
    (body: T): Response;
  };
}

export interface IValidationErrorResponse extends Response {
  json: {
    (status: number, body: string[]): IValidationErrorResponse;
    (body: string[]): IValidationErrorResponse;
  };
}
