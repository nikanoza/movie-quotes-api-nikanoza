import mongoose from 'mongoose'
import { TUser } from 'types'

const { Schema } = mongoose

const userSchema = new Schema<TUser>({
    name: {
        type: Schema.Types.String,
        required: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    confirmed: {
        type: Schema.Types.Boolean,
        required: true
    },
    id: {
        type: Schema.Types.Number,
        required: true
    } 
})

const User = mongoose.model<TUser>('User', userSchema)

export default User