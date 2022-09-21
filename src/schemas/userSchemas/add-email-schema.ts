import Joi from "joi"
import { User } from "models"
import { TAddEmail, TUser } from "types"

const determineIfUserExists = (user: TUser | null) => (value: number, helpers: any) => {
    if(!user){
        return helpers.message('მომხმარებელი ვერ მოიძებნა')
    }
    return value
}

const addEmailSchema = async (data:TAddEmail) => {
    const user = await User.findOne({id: data.id})

    return Joi.object({
        email: Joi.string()
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

export default addEmailSchema