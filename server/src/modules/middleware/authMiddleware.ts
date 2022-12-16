import { Request, Response, NextFunction } from 'express'
import { ServerError } from '../errors/ServerError'
import { UserRepository } from '../repositories/UserRepository'
import { JwtPayload } from '../types'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET ?? ''

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

  const accessToken = req.cookies.accessToken

  if (!accessToken) {
    throw new ServerError('Unauthorized user', 401)
  }

  const { id } = jwt.verify(accessToken, JWT_SECRET) as JwtPayload

  const user = await UserRepository.findOneBy({
    id
  })

  if (!user) {
    throw new ServerError('Unauthorized user', 401)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...loggedUser } = user

  req.user = loggedUser

  next()
}