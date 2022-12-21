import { Between } from 'typeorm'
import { NoteRepository } from '../../repositories'

interface IUser {
  id?: string
}

export const getByDate = async (start: Date, end:Date, user: IUser) => {

  const notes = await NoteRepository.find({
    where:{
      updatedOn: Between(
        start, end
      ),
      user: {
        id: user.id
      }
    }
  })

  return notes
}