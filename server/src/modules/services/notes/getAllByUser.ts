import { NoteRepository } from '../../repositories'

interface IUser {
  id?: number
}

export const getAllByUser = async (user: IUser) => {

  const notes = NoteRepository.find({
    where: {
      user: {
        id: user.id
      }
    }
  })
  
  return notes
}