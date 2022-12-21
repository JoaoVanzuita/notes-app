import { Environment } from '../../environment'
import { ServerError } from '../../errors/ServerError'
import { NoteRepository } from '../../repositories'
import { checkOwner } from './checkOwner'

interface IUser {
  id?: string
}

export const deleteById = async (id: string, user: IUser) => {

  const noteExists = await NoteRepository.findOneBy({
    id
  })

  if (!noteExists) {
    throw new ServerError(Environment.NOTE_404, 404)
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await checkOwner(user.id!, id)

  await NoteRepository.delete(id)
}