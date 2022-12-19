import { Environment } from '../../environment'
import { ServerError } from '../../errors/ServerError'
import { UserRepository } from '../../repositories'

export const deleteById = async (id:number) => {

  const userExists = await UserRepository.findOneBy({
    id
  })

  if(!userExists){
    throw new ServerError(Environment.USER_404, 404)
  }

  await UserRepository.delete({
    id
  })
}