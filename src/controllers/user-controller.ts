import express from 'express'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

import { Email, EmailVerification, User } from 'models'
import { editUserSchema } from 'schemas'
import { sendEmailConfirmation } from 'mail'

export const updateUser = async (req: express.Request, res: express.Response) =>{
    const paramId = +req.params.id
    const { body } = req

    const validator = await editUserSchema({...body, id: paramId})
    const { value: data, error } = validator.validate({...body, id: paramId})

    if(error){
        return res.status(422).json(error.details)
    }
    const { name, password, id } = data
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    await User.findOneAndUpdate({ id }, { name, password: hashedPassword })

    return res.json({message: "user updated successfully" })
}

export const addEmail = async (req: express.Request, res: express.Response) => {
    const paramId = +req.params.id
    const { body } = req

    const validator = await editUserSchema({...body, id: paramId})
    const { value: data, error } = validator.validate({...body, id: paramId})

    if(error){
        return res.status(422).json(error.details)
    }

    const { email, redirectLink, id } = data

    await Email.create({
        email,
        primary: false,
        verify: false,
        userId: id,
    })

    const user = await User.findOne({ id })

    const verificationHash = crypto.randomBytes(48).toString('hex')

    await EmailVerification.create({
        hash: verificationHash,
        email
    })

    await sendEmailConfirmation(email, verificationHash, user?.name || '', redirectLink)

    return res.status(201).json({message: "new email added" })
}