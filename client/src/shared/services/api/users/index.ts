import * as register from './register'
import * as login from './login'
import * as logout from './logout'
import * as getLoggedIn from './getLoggedIn'

export const UsersService = {
  ...register,
  ...login,
  ...logout,
  ...getLoggedIn
}