import { Request, Response, NextFunction } from 'express'
import { ServerError } from '../errors/ServerError'
import { UserRepository } from '../repositories/UserRepository'
import { JwtPayload } from '../types'
import jwt from 'jsonwebtoken'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

  const accessToken = req.cookies.accessToken

  if (!accessToken) {
    throw new ServerError('Unauthorized user', 401)
  }

  const { id } = jwt.verify(accessToken, 'a07e4ae1-b1ef-4823-8bcb-3f9c6f009b91') as JwtPayload

  const user = await UserRepository.findOneBy({
    id
  })

  if (!user) {
    throw new ServerError('Unauthorized user', 401)
  }

  const { password: _, ...loggedUser } = user

  req.user = loggedUser

  next()
}