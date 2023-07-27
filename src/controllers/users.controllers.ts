import { Request, Response } from 'express'

export const getAllUsers = (req: Request, res: Response) => {
    res.status(200).send('Get all user')
}

export const createUsers = (req: Request, res: Response) => {
    res.status(200).send('User created')
}

export const updateUsers = (req: Request, res: Response) => {
    res.status(200).send('User update')
}

export const deleteUsers = (req: Request, res: Response) => {
    res.status(200).send('User delate')
}