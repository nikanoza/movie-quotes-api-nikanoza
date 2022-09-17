import { User } from "models"
import { SUser, TUser } from "types"
import Joi from 'joi'

const determineIfUserExists = (user: TUser | null) => (value: string, helpers: any) => {
    if(user){
        return helpers.message('მომხმარებელი ამ პაროლით უკვვე არსებობს')
    }

    return value
}

const createUserSchema = async (data: SUser) => {
    const user = User.findOne({ name: data.name})

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
                "string.required": "სახელის ველი არ უნდა იყოს ცარიელი"
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
                "string.required": "პაროლის ველი არ უნდა იყოს ცარიელი"
            }),
        repeatPassword: Joi.string()
            .valid(Joi.ref('password'))
            .required()
            .messages({
                "string.base": "პაროლი უნდა იყოს ტექსტური",
                "string.valid": "უნდა ემთხვეოდეს პაროლს",
                "string.required": "პაროლის ველი არ უნდა იყოს ცარიელი"
            })
    })
}

export default createUserSchema