import { Environment } from '../../../environment'
import { ResponseError } from '../../../types'
import { User } from '../../../types/User'
import { Api } from '../axios-config'

export const register = async (userData: User): Promise<User | ResponseError> => {
  try {

    const { data } = await Api.post('/users', userData)

    return data

  } catch (error) {

    if (error instanceof ResponseError) {
      return error
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}