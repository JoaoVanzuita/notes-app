import { Environment } from '../../../environment'
import { Api } from '../axios-config'
import { ResponseError } from '../errors'

type TLoginData = {
  name: string
  password: string
}

export const login = async (loginData: TLoginData): Promise<void | ResponseError> => {
  try {

    await Api.post('/login', loginData)

  } catch (error) {

    if (error instanceof ResponseError) {
      return error
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}