/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AxiosError } from 'axios'
import { ResponseError } from '.'

export const errorInterceptor = (error: AxiosError<{message:string, status:number}>) => {

  if(error.response!.data.message && error.response!.data.status){
    throw new ResponseError(error.response!.data.message, error.response!.data.status)
  }
}