import { Request, Response } from "express";
import { prismaClient } from "../db/clientPrisma";
import { converToType } from '../helpers/utils'

export const createGenres = async (req: Request, res: Response) => {
    const { name } = req.body;
    const { moviesId } = req.params;
    try {

        const newGenre = await prismaClient.genre.create({

            data: {
                name,
                Movie: {
                    connect: {
                        id: converToType(moviesId)
                    }
                }
            }
        })

        res.status(200).send(newGenre);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getAllGenres = async (req: Request, res: Response) => {

    try {

        const allGenres = await prismaClient.genre.findMany()

        res.status(200).send(allGenres)

    } catch (error) {

        res.status(500).send(error)
    }
}


export const deleteGenre = async (req: Request, res: Response) => {

    const { genresId } = req.params

    try {

        await prismaClient.genre.delete({
            where: {
                id: converToType(genresId)
            }
        })
        res.status(200).send('Gender has been deleted')

    } catch (error) {
        res.status(500).send(error)
    }
}