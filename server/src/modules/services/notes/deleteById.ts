import { Environment } from '../../environment'
import { ServerError } from '../../errors/ServerError'
import { NoteRepository } from '../../repositories'
import { checkOwner } from './checkOwner'

interface IUser {
  id?: number
}

export const deleteById = async (id: number, user: IUser) => {

  const noteExists = await NoteRepository.findOneBy({
    id
  })

  if(!noteExists){
    throw new ServerError(Environment.NOTE_404, 404)
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const isOwner = await checkOwner(user.id!, id)

  if(!isOwner){
    throw new ServerError(Environment.USER_401, 401)
  }

  await NoteRepository.delete(id)
}