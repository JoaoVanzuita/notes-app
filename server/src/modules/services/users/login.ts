import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { ServerError } from '../../errors/ServerError'
import { UserRepository } from '../../repositories'

export const login = async (name: string, password:string) => {

  const user = await UserRepository.findOneBy({
    name
  })

  if(!user) {
    throw new ServerError('User not found', 404)
  }

  const result = await UserRepository
    .createQueryBuilder('user')
    .select('password')
    .where('user.id = :id', { id: user.id })
    .getRawOne()

  const verifyPassword = await bcrypt.compare(password, result.password)

  if (!verifyPassword) {
    throw new ServerError('invalid password')
  }

  const token = jwt.sign({
    id: user.id
  },
  'a07e4ae1-b1ef-4823-8bcb-3f9c6f009b91', {
    expiresIn: '12h'
  })

  return token
}