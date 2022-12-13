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
    throw new ServerError('Note not found', 404)
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const isOwner = await checkOwner(user.id!, id)

  if(!isOwner){
    throw new ServerError('Unauthorized user', 401)
  }

  const note = NoteRepository.create({
    id,
    title,
    description,
    user,
    updatedOn
  })

  const newNote = await NoteRepository.save(note)

  return newNote
}