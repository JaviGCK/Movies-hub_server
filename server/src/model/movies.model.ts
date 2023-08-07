import { Document, Schema, model } from "mongoose"

interface IMoviesDocument extends Document {
    name: String,
    poster_image?: String,
    score: number,
    genre?: String[],
    createdAt: Date,
    updateAt: Date
}

const MoviesSchema = new Schema<IMoviesDocument> ({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    poster_image: {
        type: String,
    },
    score: {
        type: Number,
        required: [true, 'Score is required']
    },
    genre: {
        type: String,
    },
}, {timestamps: true, versionKey: false})

const MoviesModel = model<IMoviesDocument>("Movies", MoviesSchema)

export default MoviesModel