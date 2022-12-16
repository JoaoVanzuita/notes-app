import { Environment } from '../../../environment'
import { ResponseError } from '../../../types'
import { User } from '../../../types/User'
import { Api } from '../axios-config'

export const login = async (loginData: User) => {
  try {

    const { data } = await Api.post('/login', loginData)

    return data

  } catch (error) {

    if (error instanceof ResponseError) {
      return error
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}