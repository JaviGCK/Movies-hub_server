import { Request, Response } from 'express'
import UserModel from '../model/user.model'

export const getAllUsers = (req: Request, res: Response) => {
    res.status(200).send('Get all user')
}

export const createUsers = async(req: Request, res: Response) => {
    const { name, email, password, movies } = req.body
    try {
        await UserModel.create({
            name,
            email,
            password,
            movies
        })

        res.status(201).send('newUser')
    } catch(error){
        res.status(500).send(error)
    }
}

export const updateUsers = (req: Request, res: Response) => {
    res.status(200).send('User update')
}

export const deleteUsers = (req: Request, res: Response) => {
    res.status(200).send('User delate')
}