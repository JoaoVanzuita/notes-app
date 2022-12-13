import { AppDataSource } from '../../data-source'
import { Note } from '../entities'

export const NoteRepository = AppDataSource.getRepository(Note)