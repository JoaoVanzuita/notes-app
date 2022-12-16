import * as register from './register'
import * as login from './login'

export const UsersService = {
  ...register,
  ...login
}