import express from 'express'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { Email, EmailVerification, User } from 'models'
import { createUserSchema, loginEmailSchema, loginNameSchema } from 'schemas'
import { sendEmailConfirmation } from 'mail'
import { TLoginName } from 'types'

export const registration = async (req: express.Request, res: express.Response) => {
    const { body } = req
    const validator = await createUserSchema(body)

    const { value: data, error } = validator.validate(body)

    if(error){
        return res.status(422).json(error.details)
    }

    const { name, password, email, redirectLink } = data
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

    await sendEmailConfirmation(email, verificationHash, name, redirectLink)

    return res.status(201).json({message: "new user create successfully" })
}

export const emailVerification = async (req: express.Request, res:express.Response) => {
    const { hash } = req.body

    const emailVerification = await EmailVerification.findOne({ hash })

    if(!emailVerification){
        return res.status(422).json({message: 'მონაცემები ვერ მოიძებნა'})
    }

    const email = await Email.findOne({ email: emailVerification.email})

    if(!email){
        return res.status(422).json({message: 'მონაცემები ვერ მოიძებნა'})
    }

    await email.updateOne({ verify: true})
    await User.findOneAndUpdate({id: email.userId}, {confirmed: true})

    await emailVerification.delete()

    return res.json({message: "email verified" })
}

export const loginWithName = async (req: express.Request, res: express.Response) => {
    const { body } = req

    const validator = await loginNameSchema(body)

    const { value:data, error } = validator.validate(body)

    if(error){
        return res.status(422).json(error.details)
    }

    const { name, password } = data

    const user = await User.findOne({ name }).select('+password')
    const compare = await bcrypt.compare(password, user?.password || '')

    if(compare){
        const signData: TLoginName = {
            name: user?.name || '',
            password: user?.password || ''
        }

        const token = jwt.sign(signData, process.env.JWT_SECRET || '')
        return res.json({ token })
    }

    return res
    .status(401)
    .json({ message: 'მონაცემები არასწორია' })
}

export const loginWithEmail = async (req: express.Request, res: express.Response) => {
    const { body } = req

    const validator = await loginEmailSchema(body)

    const { value:data, error } = validator.validate(body)

    if(error){
        return res.status(422).json(error.details)
    }

    const { email, password } = data
    const emailDocument = await Email.findOne({ email })
    const user = await User.findOne({ id:emailDocument?.userId }).select('+password')
    const compare = await bcrypt.compare(password, user?.password || '')

    if(compare){
        const signData: TLoginName = {
            name: user?.name || '',
            password: user?.password || ''
        }

        const token = jwt.sign(signData, process.env.JWT_SECRET || '')
        return res.json({ token })
    }

    return res
    .status(401)
    .json({ message: 'მონაცემები არასწორია' })
}

