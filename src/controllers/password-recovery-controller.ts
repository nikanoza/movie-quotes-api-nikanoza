import express from 'express'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { Email, PasswordRecovery, User } from 'models'
import { sendRecoverySchema } from 'schemas'
import { sendPasswordRecovery } from 'mail'
import passwordRecoverySchema from 'schemas/userSchemas/password-recovery-schema'

export const passwordRecoverySend = async (req: express.Request, res: express.Response) => {
    const { body } = req
    const validator = await sendRecoverySchema(body)

    const { value: data, error} = validator.validate(body)

    if(error){
        return res.status(422).json(error.details)
    }

    const { email, redirectLink } = data

    const emailDocument = await Email.findOne({ email })

    const hash = crypto.randomBytes(48).toString('hex')

    await PasswordRecovery.create({
        hash,
        userId: emailDocument?.userId
    })

    const user = await User.findOne({id: emailDocument?.userId})

    await sendPasswordRecovery(email, hash, user?.name || '', redirectLink)

    return res.status(201).json({message: "password recovery link send" })
}

export const passwordReset = async (req: express.Request, res: express.Response) => {
    const { body } = req

    const validator = await passwordRecoverySchema(body)

    const { value:data, error} = validator.validate(body)

    if(error){
        return res.status(422).json(error.details)
    }

    const { password, hash } = data

    const passwordRecovery = await PasswordRecovery.findOne({ hash })

    if(!passwordRecovery){
        return res.status(422).json({message: 'მონაცემები ვერ მოიძებნა'})
    }

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    await User.findOneAndUpdate({ id: passwordRecovery.userId}, {password: hashedPassword})
    await passwordRecovery.delete()

    return res.json({message: "new password saved successfully" })
}