import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Environment } from '../../environment'

import { ServerError } from '../../errors/ServerError'
import { UserRepository } from '../../repositories'

const JWT_SECRET = process.env.JWT_SECRET ?? ''

export const login = async (name: string, password:string) => {

  const user = await UserRepository.findOneBy({
    name
  })

  if(!user) {
    throw new ServerError(Environment.INVALID_LOGIN)
  }

  const result = await UserRepository
    .createQueryBuilder('user')
    .select('password')
    .where('user.id = :id', { id: user.id })
    .getRawOne()

  const verifyPassword = await bcrypt.compare(password, result.password)

  if (!verifyPassword) {
    throw new ServerError(Environment.INVALID_LOGIN)
  }

  const token = jwt.sign({
    id: user.id
  },
  JWT_SECRET, {
    expiresIn: '12h'
  })

  return token
}