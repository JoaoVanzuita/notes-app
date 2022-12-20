import axios from 'axios'
import { Environment } from '../../../environment'
import { errorInterceptor } from '../errors/errorInterceptor'

const Api = axios.create({
  baseURL: Environment.BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

Api.interceptors.response.use(
  response => response,
  error => errorInterceptor(error)
)

export { Api }