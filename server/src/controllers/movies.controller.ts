import { Request, Response } from "express";
import prisma from "../db/clientPrisma";

export const createMovie = async (req: Request, res: Response) => {

    const { name, url, score } = req.body;

    const { userId } = req.params;

    try {

        const newMovie = await prisma.movie.create({

            data: {
                name,
                url,
                score,
                User: {
                    connect: {
                        id: userId
                    }
                }
            }
        })
        res.status(201).send(newMovie)

    } catch (error) {

        res.status(500).send(error)
    }

}


export const getAllMovies = async (req: Request, res: Response) => {

    try {
        await prisma.movie.findMany()

        res.status(201).send('')
    } catch (error) {
        res.status(500).send(error)
    }
}