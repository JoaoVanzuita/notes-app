import { Like } from 'typeorm'
import { NoteRepository } from '../../repositories'

interface IUser {
  id?: string
}

export const getByTitle = async (title: string, user: IUser) => {

  const notes = await NoteRepository.find({
    where:{
      title: Like(`%${title}%`),
      user: {
        id: user.id
      }
    },
    order: { updatedOn: 'DESC' }
  })

  return notes
}