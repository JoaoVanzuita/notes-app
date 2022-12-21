import { NoteRepository } from '../../repositories'
import { checkOwner } from './checkOwner'

type TUser = {
  id?: string
}

export const save = async (id: string, title: string, description: string, user: TUser, updatedOn: Date) => {

  const note = NoteRepository.create({
    id,
    title,
    description,
    user,
    updatedOn
  })

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await checkOwner(user.id!, id)

  await NoteRepository.save(note)
}