import * as create from './create'
import * as login from './login'
import * as updateById from './updateById'
import * as deleteById from './deleteById'

export const UsersService = {
  ...create,
  ...login,
  ...updateById,
  ...deleteById,
}