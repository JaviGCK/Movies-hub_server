import { Request, Response } from "express";
import GenreModel from "../model/genres.model";
import prisma from "../db/clientPrisma";

export const createGenres = async (req: Request, res: Response) => {
    const { name } = req.body;
    const { moviesId } = req.params;
    try {
        const newGenre = await prisma.genre.create({

            data: {
                name,
                Movie: {
                    connect: {
                        id: moviesId
                    }
                }
            }
        })

        res.status(200).send(newGenre);
    } catch (error) {
        res.status(500).send(error);
    }
};


export const deleteGenre = async (req: Request, res: Response) => {
    const { name } = req.body
    const { genresId } = req.params

    try {

        await prisma.genre.delete({
            where: {
                id: genresId
            }
        })
        res.status(200).send('Gender has been deleted')

    } catch (error) {
        res.status(500).send(error)
    }
}