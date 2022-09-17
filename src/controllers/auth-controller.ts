import express from 'express'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { Email, EmailVerification, User } from 'models'
import { createUserSchema } from 'schemas'

export const registration = async (req: express.Request, res: express.Response) => {
    const { body } = req
    const validator = await createUserSchema(body)

    const { value: data, error } = validator.validate(body)

    if(error){
        return res.status(422).json(error.details)
    }

    const { name, password, email } = data
    const lastUser  = await User.find().sort({ _id: -1 }).limit(1)
    const id = lastUser.length ? lastUser[0].id + 1 : 1
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    await User.create({
        name,
        password: hashedPassword,
        confirmed: false,
        id,
    })

    await Email.create({
        email,
        primary: true,
        verify: false,
        userId: id,
    })

    const verificationHash = crypto.randomBytes(48).toString('hex')

    await EmailVerification.create({
        hash: verificationHash,
        email
    })

    return res.status(201).json({message: "new user create successfully" })
}