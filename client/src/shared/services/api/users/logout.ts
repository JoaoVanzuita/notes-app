import { Environment } from '../../../environment'
import { Api } from '../axios-config'
import { ResponseError } from '../errors'

export const logout = async (): Promise<undefined | ResponseError> => {
  try {

    await Api.post('/logout')

  } catch (error) {

    if (error instanceof ResponseError) {
      return error
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}