import mongoose from 'mongoose'
import { TPasswordRecovery } from 'types'

const { Schema } = mongoose

const passwordRecoverySchema = new Schema<TPasswordRecovery>({
    hash: {
        type: Schema.Types.String,
        required: true,
    },
    userId: {
        type: Schema.Types.Number,
        required: true,
    }
})

const PasswordRecovery = mongoose.model('PasswordRecovery', passwordRecoverySchema)

export default PasswordRecovery