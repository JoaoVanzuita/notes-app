import { User } from '../modules/entities'

declare global {
  namespace Express {
    export interface Request {
      user: Partial<User>
    }
  }
}