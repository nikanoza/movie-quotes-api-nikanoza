import mongoose from 'mongoose'
import { TEmail } from 'types'

const { Schema } = mongoose

const emailSchema = new Schema<TEmail>({
    email: {
        type: Schema.Types.String,
        required: true
    },
    primary: {
        type: Schema.Types.Boolean,
        required: true
    },
    verify: {
        type: Schema.Types.Boolean,
        required: true
    },
    userId: {
        type: Schema.Types.Number,
        required: true
    }
})

const Email = mongoose.model<TEmail>('Email', emailSchema)

export default Email