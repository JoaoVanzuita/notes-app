import { Request, Response } from 'express'
import { UsersService } from '../../services'

export const deleteById = async (req: Request, res: Response) => {
  const id = req.user.id

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await UsersService.deleteById(id!)

  return res.status(204).send()
}