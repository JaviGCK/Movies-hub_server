import { Request, Response } from 'express'
import { prismaClient } from '../db/clientPrisma'
import { converToType } from '../helpers/utils'

export const createUsers = async (req: Request, res: Response) => {
    const { name, email } = req.body

    try {


        const newUser = await prismaClient.user.create({
            data: {
                name,
                email,
            }
        })

        res.status(201).send(newUser)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getAllUsers = async (req: Request, res: Response) => {

    try {

        const allUsers = await prismaClient.user.findMany()

        res.status(200).send(allUsers)

    } catch (error) {

        res.status(500).send(error)
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params

    try {

        const user = await prismaClient.user.findUnique({
            where: {
                id: converToType(userId)
            },
            include: {
                movies: {
                    select: {
                        id: true,
                        name: true,
                        url: true,
                        score: true,
                        genres: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
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


        const updatedUser = await prismaClient.user.update({

            where: {

                id: converToType(userId)
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

        await prismaClient.user.delete({

            where: {

                id: converToType(userId)
            }
        })

        res.status(204).send('User has been deleted')

    } catch (error) {

        res.status(500).send(error)
    }

}
