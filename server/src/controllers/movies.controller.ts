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
        const movies = await prisma.movie.findMany()

        res.status(201).send(movies)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getMovieById = async (req: Request, res: Response) => {

    const { movieId } = req.params;

    try {

        const movie = await prisma.movie.findUnique({

            where: {
                id: movieId
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
        const existingMovie = await prisma.movie.findUnique({
            where: {
                id: movieId
            }
        });

        if (!existingMovie) {
            return res.status(404).send({ error: "Movie not found." });
        }

        const updatedMovie = await prisma.movie.update({
            where: {
                id: movieId
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
    const { name } = req.body

    try {

        await prisma.movie.deleteMany()

        res.status(204).send('All Movies has been deleted')

    } catch (error) {

        res.status(500).send(error)
    }

}

export const removeMovieById = async (req: Request, res: Response) => {

    const { movieId } = req.params;

    try {

        await prisma.movie.delete({

            where: {

                id: movieId
            }
        })

        res.status(204).send('Movie `${name}` has been deleted')

    } catch (error) {

        res.status(500).send(error)
    }

}
