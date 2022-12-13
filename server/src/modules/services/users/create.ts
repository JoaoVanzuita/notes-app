import { ServerError } from '../../errors/ServerError'
import { UserRepository } from '../../repositories'

export const create = async (name: string, password: string) => {

  const userAlreadyExists = await UserRepository.findOneBy({
    name
  })

  if (userAlreadyExists) {
    throw new ServerError('User already exists')
  }

  const user = UserRepository.create({
    name,
    password
  })

  const newUser = await UserRepository.save(user)

  return newUser
}