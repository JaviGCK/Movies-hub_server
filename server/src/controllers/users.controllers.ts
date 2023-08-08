import { Request, Response } from 'express'
import UserModel from '../model/users.model'
import prisma from '../db/clientPrisma'

export const createUsers = async (req: Request, res: Response) => {
    const { name, email, password } = req.body

    try {

        if (!name || !email || !password) {
            res.status(400).send('Missing required fileds')
            return
        }

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })

        res.status(201).send(newUser)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
    try {

        const allUser = await prisma.user.findMany()

        res.status(201).send(allUser)

    } catch (error) {
        res.status(500).send(error)
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params
    try {

        const user = await UserModel.findById({ _id: userId }).populate('movies')

        res.status(201).send(user)

    } catch (error) {
        res.status(500).send(error)
    }
}

export const updateUsers = async (req: Request, res: Response) => {
    const { userId } = req.params
    const { name } = req.body
    try {

        const user = await UserModel.findByIdAndUpdate({ _id: userId },
            {
                $set: { name: name }
            }, { new: true })

        res.status(200).send(user)

    } catch (error) {
        res.status(500).send(error)
    }
}

export const deleteUsers = async (req: Request, res: Response) => {
    const { userId } = req.params
    try {

        await UserModel.findByIdAndDelete({ _id: userId })

        res.status(204).send('User has been deleted')

    } catch (error) {
        res.status(500).send(error)
    }
}
