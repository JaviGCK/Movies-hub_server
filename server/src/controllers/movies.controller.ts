import { Request, Response } from "express";
import { prismaClient } from "../db/clientPrisma";
import { converToType } from '../helpers/utils'

export const createMovie = async (req: Request, res: Response) => {

    const { name, url, score } = req.body;

    const { userId } = req.params;

    try {

        const newMovie = await prismaClient.movie.create({

            data: {
                name,
                url,
                score,
                User: {
                    connect: {
                        id: converToType(userId)
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

        const movies = await prismaClient.movie.findMany()

        res.status(201).send(movies)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getMovieById = async (req: Request, res: Response) => {
    const { name } = req.body
    const { movieId } = req.params;

    try {

        const movie = await prismaClient.movie.findUnique({

            where: {
                id: converToType(movieId)
            }, include: {
                genres: {
                    select: name
                }
            }
        })

        res.status(200).send(movie);

    } catch (error) {

        res.status(500).send(error)
    }
}


export const updateMovie = async (req: Request, res: Response) => {
    const { movieId } = req.params;
    const { name, url, score } = req.body;

    try {

        const existingMovie = await prismaClient.movie.findUnique({
            where: {
                id: converToType(movieId)
            }
        });

        if (!existingMovie) {
            return res.status(404).send({ error: "Movie not found." });
        }

        const updatedMovie = await prismaClient.movie.update({
            where: {

                id: converToType(movieId)
            },
            data: {
                name,
                url,
                score
            }
        });

        res.status(200).send(updatedMovie);
    } catch (error) {
        res.status(500).send(error);
    }
};


export const removeMovies = async (req: Request, res: Response) => {

    try {

        await prismaClient.movie.deleteMany()

        res.status(204).send('All Movies has been deleted')

    } catch (error) {

        res.status(500).send(error)
    }

}

export const removeMovieById = async (req: Request, res: Response) => {
    const { name } = req.body
    const { movieId } = req.params;

    try {

        await prismaClient.movie.delete({

            where: {
                id: converToType(movieId)
            },
            include: {
                genres: {
                    select: name
                }
            }
        })

        res.status(204).send('Movie has been deleted')

    } catch (error) {

        res.status(500).send(error)
    }

}
