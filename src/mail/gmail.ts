import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

const gmailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
    }
})

export default gmailTransport


