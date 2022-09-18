import Joi from "joi"
import { Email } from "models"
import { SSendRecovery, TEmail } from "types"

const determineIfEmailExists = (email: TEmail | null) => (value: string, helpers: any) => {
    if(!email){
        return helpers.message('ელ-ფოსტა ვერ მოიძებნა')
    }
    return value
}

const sendRecoverySchema = async (data: SSendRecovery) => {
    const email = await Email.findOne({email: data.email})

    return Joi.object<SSendRecovery>({
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

export default sendRecoverySchema