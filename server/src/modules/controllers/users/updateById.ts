import { Request, Response } from 'express'

export const updateById = async (req: Request, res: Response) => {
  const { id, name, password } = req.body

  res.send('updateByd - OK')
}