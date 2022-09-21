import Joi from "joi";
import { User } from "models";
import { SUserEdit, TUser } from "types";

const determineIfUserExists = (user: TUser | null) => (value: number, helpers: any) => {
    if(!user){
        return helpers.message('მომხმარებელი ვერ მოიძებნა')
    }
    return value
}

const editUserSchema = async (data: SUserEdit) => {
    const user = await User.findOne({ id: data.id})

    return Joi.object({
        name: Joi.string()
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
        id: Joi.number()
            .custom(determineIfUserExists(user))
            .required()
            .messages({
              'number.base': 'აიდი უნდა იყოს ციფრი',
              'any.required': 'აიდის ველი სავალდებულოა',
            }),
    })
}

export default editUserSchema