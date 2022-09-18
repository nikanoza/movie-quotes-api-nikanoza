import mongoose from 'mongoose'
import { TAvatar } from 'types'

const { Schema } = mongoose

const avatarSchema = new Schema<TAvatar>({
    url: {
        type: Schema.Types.String,
        required: true
    },
    userId: {
        type: Schema.Types.Number,
        required: true
    }
})

const Avatar = mongoose.model<TAvatar>('Avatar', avatarSchema)

export default Avatar