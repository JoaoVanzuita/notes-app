import { Environment } from '../../../environment'
import { Note } from '../../../types'
import { Api } from '../axios-config'
import { ResponseError } from '../errors'

export const create = async (note: Note): Promise<number | ResponseError> => {
  try {
    const { data } = await Api.post('/notes', note)

    return data.id

  } catch (error) {

    if (error instanceof ResponseError) {
      return error
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}