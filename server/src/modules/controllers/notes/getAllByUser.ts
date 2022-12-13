import { Request, Response } from 'express'
import { NotesService } from '../../services'

export const getAllByUser = async (req: Request, res: Response) => {

  const user = req.user

  const notes = await NotesService.getAllByUser(user)

  res.json(notes)
}