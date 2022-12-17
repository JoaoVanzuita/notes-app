import { AxiosError } from 'axios'
import { ResponseError } from '.'

export const errorInterceptor = (error: AxiosError) => {

  const errorData = {
    'status': <number>error.response?.status,
    'message': <string>error.response?.data
  }

  const responseError = new ResponseError(errorData.message, errorData.status)

  throw responseError
}