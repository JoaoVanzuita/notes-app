import { Environment } from '../../../environment'
import { User } from '../../../types/User'
import { Api } from '../axios-config'
import { ResponseError } from '../errors'

export const getLoggedIn = async (): Promise<User | ResponseError> => {
  try {

    const { data } = await Api.get('/users')

    return data

  } catch (error) {

    if (error instanceof ResponseError) {
      return error
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}