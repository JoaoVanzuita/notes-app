import * as register from './register'
import * as login from './login'
import * as logout from './logout'
import * as getLoggedIn from './getLoggedIn'
import * as updateById from './updateById'
import * as deleteById from './deleteById'

export const UsersService = {
  ...register,
  ...login,
  ...logout,
  ...getLoggedIn,
  ...updateById,
  ...deleteById
}