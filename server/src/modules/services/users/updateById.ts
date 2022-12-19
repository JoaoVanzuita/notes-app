import { Environment } from '../../environment'
import { ServerError } from '../../errors/ServerError'
import { UserRepository } from '../../repositories'

export const updateById = async (id: number, name: string, password: string) => {

  const userExists = await UserRepository.findOneBy({
    id
  })

  if(!userExists){
    throw new ServerError(Environment.USER_404, 404)
  }

  const user = UserRepository.create({
    id,
    name,
    password
  })

  await UserRepository.save(user)
}