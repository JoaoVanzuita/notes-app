import { Request, Response } from 'express'

const create = async (req: Request, res: Response) => {
  const { name, password } = req.body

  return res.send('create - OK')
}

const updateById = async (req: Request, res: Response) => {
  const { id, name, password } = req.body

  res.send('updateByd - OK')
}

const deleteById = async (req: Request, res: Response) => {

  return res.send('deleteById - OK')
}

const getLoggedIn = async (req: Request, res: Response) => {

  return res.send('getByToken - OK')
}

const login = async (req: Request, res: Response) => {

  return res.send('login - OK')
}

export const UserController = {
  create,
  updateById,
  deleteById,
  getLoggedIn,
  login,
}
