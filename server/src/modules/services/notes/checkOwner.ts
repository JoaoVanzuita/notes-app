import { NoteRepository } from '../../repositories'

export const checkOwner = async (userId: number, noteId: number) => {

  const result = await NoteRepository
    .createQueryBuilder('note')
    .select('user_id')
    .where('note.id = :id', { id: noteId })
    .getRawOne()

  return userId === result.user_id
}