import { Request, Response } from 'express'

export interface UsersContext {
  req: Request,
  res: Response,
  payload?: { userId: string },
}