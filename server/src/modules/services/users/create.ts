import { ServerError } from '../../errors/ServerError'
import { UserRepository } from '../../repositories'

export const create = async (name: string, password: string) => {

  const userAlreadyExists = await UserRepository.findOneBy({
    name
  })

  if (userAlreadyExists) {
    throw new ServerError('User already exists')
  }

  const newUser = UserRepository.create({
    name,
    password
  })

  const user = await UserRepository.save(newUser)

  return user
}