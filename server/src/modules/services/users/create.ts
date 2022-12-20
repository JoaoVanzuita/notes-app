import { Environment } from '../../environment'
import { ServerError } from '../../errors/ServerError'
import { UserRepository } from '../../repositories'

export const create = async (name: string, password: string) => {

  const userAlreadyExists = await UserRepository.findOneBy({
    name
  })

  if (userAlreadyExists) {
    throw new ServerError(Environment.NAME_ALREADY_USED)
  }

  const user = UserRepository.create({
    name,
    password
  })

  await UserRepository.insert(user)
}