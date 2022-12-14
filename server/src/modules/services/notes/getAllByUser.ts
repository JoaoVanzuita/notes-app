import { NoteRepository } from '../../repositories'

interface IUser {
  id?: number
}

export const getAllByUser = async (user: IUser) => {

  const notes = await NoteRepository.find({
    where: {
      user: {
        id: user.id
      }
    }
  })

  return notes
}