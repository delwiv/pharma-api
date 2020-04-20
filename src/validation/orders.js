import validation from 'celebrate'

const { celebrate, Segments, Joi } = validation

export const createOrderValidation = celebrate({
  [Segments.BODY]: Joi.object({
    status: Joi.string(),
    userId: Joi.string().required(),
    items: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        price: Joi.number()
          .integer()
          .required(),
        code: Joi.string().required(),
        quantity: Joi.number()
          .integer()
          .required()
      })
    ),
    type: Joi.string().required()
  })
})
