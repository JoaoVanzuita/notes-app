import { Environment } from '../../../environment'
import { Api } from '../axios-config'
import { ResponseError } from '../errors'

export const deleteById = async (): Promise<void | ResponseError> => {
  try {

    await Api.delete('/users')

  } catch (error) {

    if (error instanceof ResponseError) {
      return error
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}