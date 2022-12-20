import { Environment } from '../../environment'
import { ServerError } from '../../errors/ServerError'
import { NoteRepository } from '../../repositories'
import { checkOwner } from './checkOwner'

interface IUser {
  id?: number
}

export const updateById = async (id: number, title: string, description: string, user: IUser , updatedOn: Date) => {

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

  const note = NoteRepository.create({
    id,
    title,
    description,
    user,
    updatedOn
  })

  await NoteRepository.update(note.id, note)
}