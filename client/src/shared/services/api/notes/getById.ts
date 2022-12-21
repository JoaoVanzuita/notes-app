import { Environment } from '../../../environment'
import { Note } from '../../../types/Note'
import { Api } from '../axios-config'
import { ResponseError } from '../errors'

export const getById = async (id: string): Promise<Note | ResponseError> => {
  try {

    const { data } = await Api.get(`/notes/${id}`)

    return data.note

  } catch (error) {

    if (error instanceof ResponseError) {
      return error
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}