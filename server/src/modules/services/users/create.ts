import { User } from '../../entities'
import { UserRepository } from '../../repositories'

export const create = async (data: Partial<User>) => {

  const newUser = await UserRepository.create({
    ...data
  })

  const user = await UserRepository.save(newUser)

  console.log('New USer: ' + newUser)
  return user
}