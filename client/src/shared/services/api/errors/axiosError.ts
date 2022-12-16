import { AxiosError } from 'axios'
import { ResponseError } from '.'

export const errorInterceptor = (error: AxiosError) => {

  const errorData = {
    'status': <number>error.response?.status,
    'data': <{ message: string }>error.response?.data
  }

  const responseError = new ResponseError(errorData.data.message, errorData.status)

  throw responseError
}