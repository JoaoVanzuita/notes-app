import { Environment } from '../../../environment'
import { Api } from '../axios-config'
import { ResponseError } from '../errors'

export const deleteById = async (): Promise<number | ResponseError> => {
  try {

    const { data } = await Api.delete('/users')

    return data.id

  } catch (error) {

    if (error instanceof ResponseError) {
      return error
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}