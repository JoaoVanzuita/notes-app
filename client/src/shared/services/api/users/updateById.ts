import { Environment } from '../../../environment'
import { Api } from '../axios-config'
import { ResponseError } from '../errors'

type TUpdateData = {
  name: string
  password: string
}

export const updateById = async (userData: TUpdateData): Promise<number | ResponseError> => {
  try {

    const { data } = await Api.put('/users', userData)

    return data.id

  } catch (error) {

    if (error instanceof ResponseError) {
      return error
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}