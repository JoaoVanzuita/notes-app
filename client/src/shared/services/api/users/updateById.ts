import { Environment } from '../../../environment'
import { Api } from '../axios-config'
import { ResponseError } from '../errors'

type TUpdateData = {
  name: string
  password: string
}

export const updateById = async (userData: TUpdateData): Promise<void | ResponseError> => {
  try {

    await Api.put('/users', userData)

  } catch (error) {

    if (error instanceof ResponseError) {
      return error
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}