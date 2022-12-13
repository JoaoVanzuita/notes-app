import { NoteRepository } from '../../repositories'

interface IUser {
  id?: number
}

export const create = async (title: string, description: string, user: IUser, updatedOn: string) => {

  const note = NoteRepository.create({
    title,
    description,
    updatedOn,
    user
  })

  const newNote = await NoteRepository.save(note)

  return newNote
}