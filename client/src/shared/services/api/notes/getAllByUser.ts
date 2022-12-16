import { Environment } from '../../../environment'
import { ResponseError } from '../../../types'
import { Note } from '../../../types/Note'
import { Api } from '../axios-config'

export const getAllByUser = async (): Promise<Note[] | ResponseError> => {
  try {

    const { data } = await Api.get('/notes')

    return data

  } catch (error) {

    if (error instanceof ResponseError) {
      return error
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}