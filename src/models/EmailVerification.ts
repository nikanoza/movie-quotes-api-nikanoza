import mongoose from 'mongoose'
import { TEmailVerification } from 'types'

const { Schema } = mongoose

const emailVerificationSchema = new Schema<TEmailVerification>({
    hash: {
        type: Schema.Types.String,
        required: true
    },
    userId: {
        type: Schema.Types.Number,
        required: true
    }
})

const EmailVerification = mongoose.model<TEmailVerification>('EmailVerification', emailVerificationSchema)

export default EmailVerification