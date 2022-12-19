import { NextFunction, Request, Response } from 'express'
import { ServerError } from '../errors/ServerError'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {

  if (err instanceof ServerError) {
    return res.status(err.statusCode).json({
      'status': err.statusCode,
      'message': err.message
    })
  }

  return res.status(500).json({
    'status': 500,
    'message': `Internal server error - ${err.message}`
  })
}