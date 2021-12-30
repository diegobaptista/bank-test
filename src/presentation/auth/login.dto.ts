import Joi, { ObjectSchema } from "joi";

export class LoginDto {
  username: string;
  password: string;
}

export const loginValidationSchema: ObjectSchema<LoginDto> = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
