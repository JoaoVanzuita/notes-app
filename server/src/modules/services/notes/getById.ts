import { NoteRepository } from '../../repositories'

interface IUser {
  id?: string
}

export const getById = async (id: string, user: IUser) => {

  const note = await NoteRepository.findOne({
    where:{
      id,
      user: {
        id: user.id
      }
    },
    order: { updatedOn: 'DESC' }
  })

  return note
}