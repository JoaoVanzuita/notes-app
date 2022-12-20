import { Environment } from '../../../environment'
import { Note } from '../../../types'
import { Api } from '../axios-config'
import { ResponseError } from '../errors'

export const updateById = async (note: Note): Promise<void | ResponseError> => {

  try {

    await Api.put(`/notes/${note.id}`, note)

  } catch (error) {

    if (error instanceof ResponseError) {
      return error
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}