import { Request, Response } from "express";
import { prismaClient } from "../db/clientPrisma";
import { converToType } from '../helpers/utils'


export const createScore = async (req: Request, res: Response) => {

    const { score } = req.body;
    const { moviesId } = req.params;


    try {

        const newScore = await prismaClient.score.create({

            data: {
                score,
                Movie: {
                    connect: {
                        id: converToType(moviesId)
                    },
                }


            }
        })

        res.status(200).send(newScore);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getAllScore = async (req: Request, res: Response) => {

    try {

        const allScore = await prismaClient.score.findMany()

        res.status(200).send(allScore)

    } catch (error) {

        res.status(500).send(error)
    }
}

export const updateScore = async (req: Request, res: Response) => {
    const { scoreId } = req.params
    const { score } = req.body

    try {
        const existingScore = await prismaClient.score.findUnique({
            where: {
                id: converToType(scoreId)

            }, include: {
                user: {
                    select: {
                        name: true
                    }
                }
            }

        });
        if (!existingScore) {
            return res.status(404).send({ error: "Movie not found." });
        }
        const updatedScore = await prismaClient.score.update({
            where: {

                id: converToType(scoreId)
            },
            data: {
                score
            }
        });

        res.status(200).send(updatedScore);
    } catch (error) {

        res.status(500).send(error)
    }
}


export const deleteScoreById = async (req: Request, res: Response) => {

    const { scoreId } = req.params

    try {

        await prismaClient.score.delete({
            where: {
                id: converToType(scoreId)
            }
        })
        res.status(200).send('Score has been deleted')

    } catch (error) {
        res.status(500).send(error)
    }
}

export const deleteScore = async (req: Request, res: Response) => {

    try {

        await prismaClient.score.deleteMany()

        res.status(200).send('Scores has been deleted')

    } catch (error) {
        res.status(500).send(error)
    }
}