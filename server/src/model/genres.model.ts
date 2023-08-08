import { Document, Schema, model } from "mongoose"

interface IGenreDocument extends Document {
    name: String
}

const GenreSchema = new Schema<IGenreDocument> ({
    name: {
        type: String,
        required: [true, 'Name is required']
    }
})

const GenreModel = model<IGenreDocument> ("Genres", GenreSchema)

export default GenreModel