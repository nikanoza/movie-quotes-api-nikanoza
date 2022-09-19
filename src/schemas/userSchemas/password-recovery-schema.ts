import Joi from "joi"
import { PasswordRecovery } from "models"
import { SPasswordRecovery } from "types"

const passwordRecoverySchema = async (data: SPasswordRecovery) => {
    const passwordRecovery = await PasswordRecovery.findOne({ hash: data.hash })

    return Joi.object<SPasswordRecovery>({
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
        
    })
}