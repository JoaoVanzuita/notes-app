import { Environment } from '../../environment'
import { ServerError } from '../../errors/ServerError'
import { NoteRepository } from '../../repositories'

export const checkOwner = async (userId: string, noteId: string) => {

  const result = await NoteRepository
    .createQueryBuilder('note')
    .select('user_id')
    .where('note.id = :id', { id: noteId })
    .getRawOne()

  if (!result) {
    return
  }

  if(userId !== result.user_id){
    throw new ServerError(Environment.USER_401, 401)
  }
}