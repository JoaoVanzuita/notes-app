import { Request, Response } from 'express'

// interface 

export const getByTitle = async (req: Request, res: Response) => {



  res.send('getByTitle - OK')
}