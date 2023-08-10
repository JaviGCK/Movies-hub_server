import { Request, Response } from 'express'
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

        const allUsers = await prisma.user.findMany()

        res.status(200).send(allUsers)

    } catch (error) {

        res.status(500).send(error)
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const { name } = req.body
    const { userId } = req.params

    try {

        const user = await prisma.user.findUnique({

            where: {
                id: userId
            },
            include: {
                movies: {
                    select: name
                }

            }
        })

        res.status(200).send(user);

    } catch (error) {

        res.status(500).send(error)
    }
}

export const updateUser = async (req: Request, res: Response) => {

    const { userId } = req.params;

    const { name, email, password } = req.body;

    try {


        const updatedUser = await prisma.user.update({

            where: {

                id: userId
            },
            data: {

                name,
                email,
                password
            }
        })
        res.status(200).send(updatedUser)

    } catch (error) {

        res.status(500).send(error)
    }
}

export const removeUser = async (req: Request, res: Response) => {

    const { userId } = req.params;



    try {

        await prisma.user.delete({

            where: {

                id: userId
            }
        })

        res.status(204).send('User has been deleted')

    } catch (error) {

        res.status(500).send(error)
    }

}
