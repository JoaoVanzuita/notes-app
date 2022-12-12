import { Request, Response } from 'express'

const create = async (req: Request, res: Response) => {

  res.send('create - OK')
}

const getAllByUser = async (req: Request, res: Response) => {

  res.send('getAllByUser - OK')
}

const getByTitle = async (req: Request, res: Response) => {

  res.send('getByTitle - OK')
}

const getByDate = async (req: Request, res: Response) => {

  res.send('getByDate - OK')
}

const updateById = async (req: Request, res: Response) => {

  res.send('updateById - OK')
}

const deleteById = async (req: Request, res: Response) => {

  res.send('deleteById - OK')
}

export const NoteController = {
  create,
  getAllByUser,
  getByTitle,
  getByDate,
  updateById,
  deleteById
}