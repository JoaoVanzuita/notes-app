import { NoteRepository } from '../../repositories'

interface IUser {
  id?: number
}

export const create = async (title: string, description: string, user: IUser, updatedOn: Date) => {

  const note = NoteRepository.create({
    title,
    description,
    updatedOn,
    user
  })

  await NoteRepository.save(note)
}