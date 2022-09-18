import { Email, User } from "models"
import { SUser, TEmail, TUser } from "types"
import Joi from 'joi'

const determineIfUserExists = (user: TUser | null) => (value: string, helpers: any) => {
    if(user){
        return helpers.message('მომხმარებელი ამ პაროლით უკვვე არსებობს')
    }
    return value
}

const determineIfEmailExists = (email: TEmail | null) => (value: string, helpers: any) => {
    if(email){
        return helpers.message('ელ-ფოსტა უკვე გამოყენებულია')
    }
    return value
}

const createUserSchema = async (data: SUser) => {
    const user = await User.findOne({ name: data.name})
    const email = await Email.findOne({ email: data.email})

    return Joi.object<SUser>({
        name: Joi.string()
            .custom(determineIfUserExists(user))
            .min(3)
            .max(15)
            .pattern(/^[a-z0-9]*$/)
            .required()
            .messages({
                "string.base": "სახელი უნდა იყოს ტექსტური",
                "string.min": "სახელი უნდა შედგებოდეს მინიმუმ 3 სიმბოლოსგან",
                "string.max": "სახელი უნდა შედგებოდეს მაქსიმუმ 15 სიმბოლოსგან",
                "string.pattern": "სახელი უნდა შეიცავდეს მხოლოდ დაბალი რეგისტრის ლათინურ ასოებს და ციფრებს",
                "any.required": "სახელის ველი არ უნდა იყოს ცარიელი"
            }),
        password: Joi.string()
            .min(8)
            .max(15)
            .pattern(/^[a-z0-9]*$/)
            .required()
            .messages({
                "string.base": "პაროლი უნდა იყოს ტექსტური",
                "string.min": "პაროლი უნდა შედგებოდეს მინიმუმ 8 სიმბოლოსგან",
                "string.max": "პაროლი უნდა შედგებოდეს მაქსიმუმ 15 სიმბოლოსგან",
                "string.pattern": "პაროლი უნდა შეიცავდეს მხოლოდ დაბალი რეგისტრის ლათინურ ასოებს და ციფრებს",
                "any.required": "პაროლის ველი არ უნდა იყოს ცარიელი"
            }),
        repeatPassword: Joi.string()
            .valid(Joi.ref('password'))
            .required()
            .messages({
                "string.base": "პაროლი უნდა იყოს ტექსტური",
                "string.valid": "უნდა ემთხვეოდეს პაროლს",
                "any.required": "პაროლის ველი არ უნდა იყოს ცარიელი"
            }),
        email: Joi.string()
            .custom(determineIfEmailExists(email))
            .email()
            .required()
            .messages({
                "string.base": "ელ-ფოსტა უნდა იყოს ტექსტური",
                "string.email": "არ შეესაბამება ელ-ფოსტის ფორმატს",
                "any.required": "ელ-ფოსტის ველი არ უნდა იყოს ცარიელი"
            }),
        redirectLink: Joi.string().required().messages({
            'string.base': 'ლინკი უნდა იყოს ტექსტური',
            'any.required': 'ლინკჯის ველი არ უნდა იყოს ცარიელი',
        })
    })
}

export default createUserSchema