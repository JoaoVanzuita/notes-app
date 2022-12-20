import { AxiosError } from 'axios'
import { ResponseError } from '.'

export const errorInterceptor = (error: AxiosError<{message:string, status:number}>) => {

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  throw new ResponseError(error.response!.data.message, error.response!.data.status)
}