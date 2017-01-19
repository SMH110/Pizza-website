import { Request, Response } from 'express';

export function asyncHandler(handler: (req: Request, res: Response) => Promise<any>) {

  return async function (req: Request, res: Response) {
    try {
      await handler(req, res);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

}

export interface IRequest<T> extends Request {
  body: T;
}

export interface IResponse<T> extends Response {
  json: {
    (status: number, body?: T): Response;
    (body?: T): Response;
  };
}