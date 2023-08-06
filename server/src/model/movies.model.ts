import { Document, Schema, model } from "mongoose"

interface IMoviesDocument extends Document {
    id: String,
    name: String,
    poster_image: String,
    score: number,
    genre: String
}

const MoviesSchema = new Schema<IMoviesDocument> ({
    id: {
        type: String,
        required: [true, 'id is required'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    poster_image: {
        type: String,
        required: [true, 'Poster is required']
    },
    score: {
        type: Number,
        required: [true, 'Score is required']
    },
    genre: {
        type: String,
        required: [true, 'Genre is required']
    },
})

const MoviesModel = model<IMoviesDocument>("Movies", MoviesSchema)

export default MoviesModel