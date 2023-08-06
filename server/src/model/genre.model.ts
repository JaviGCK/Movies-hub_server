import { Document, Schema, model } from "mongoose"

interface IGenreDocument extends Document {
    id: String,
    name: String
}

const GenreSchema = new Schema<IGenreDocument> ({
    id: {
        type: String,
        required: [true, 'id is required'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    }
})

const GenreModel = model<IGenreDocument> ("Genre", GenreSchema)

export default GenreModel