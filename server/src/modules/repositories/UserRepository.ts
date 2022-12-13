import { AppDataSource } from '../../data-source'
import { User } from '../entities'

export const UserRepository = AppDataSource.getRepository(User)