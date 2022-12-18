import { Environment } from '../../../environment'
import { Note } from '../../../types/Note'
import { Api } from '../axios-config'
import { ResponseError } from '../errors'

export const getByTitle = async (title: string): Promise<Note[] | ResponseError> => {
  try {

    const { data } = await Api.get(`/notes/title?title=${title}`)

    return data.notes

  } catch (error) {

    if (error instanceof ResponseError) {
      return error
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}