import { Like } from 'typeorm'
import { NoteRepository } from '../../repositories'

interface IUser {
  id?: number
}

export const getByTitle = async (title: string, user: IUser) => {

  const notes = await NoteRepository.find({
    where:{
      title: Like(`%${title}%`),
      user: {
        id: user.id
      }
    }
  })

  return notes
}


// const users = await UserRepository.findBy({
//   name: Like(`%${name}%`)
// })