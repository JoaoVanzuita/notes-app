import * as create  from './create'
import * as updateById  from './updateById'
import * as deleteById  from './deleteById'
import * as login  from './login'
import * as getLoggedIn  from './getLoggedIn'

export const UsersController = {
  ...create,
  ...updateById,
  ...deleteById,
  ...login,
  ...getLoggedIn
}