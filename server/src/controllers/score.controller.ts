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
                    }
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


export const deleteScore = async (req: Request, res: Response) => {

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