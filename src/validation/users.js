import validation from 'celebrate'

const { celebrate, Segments, Joi } = validation

export const loginValidation = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  })
})

export const fetchMeValidation = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown(true)
})

export const createUserValidation = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role: Joi.string().valid('pharmacist', 'patient', 'healthPro', 'admin')
  })
})
