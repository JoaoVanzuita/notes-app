import { Environment } from '../../../environment'
import { Api } from '../axios-config'
import { ResponseError } from '../errors'

type TRegisterData = {
  name: string
  password: string
}

export const register = async (userData: TRegisterData): Promise<void | ResponseError> => {
  try {

    await Api.post('/users', userData)


  } catch (error) {

    if (error instanceof ResponseError) {
      return error
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}