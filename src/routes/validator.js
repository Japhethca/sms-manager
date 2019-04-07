import joi from 'joi';

export default function validatorMiddleWare(schema) {
  return (req, res, next) => {
    let hasError = false;
    Object.keys(schema).forEach((field) => {
      const result = joi.validate({ ...req[field] }, schema[field], {
        presence: 'required',
        abortEarly: true,
        language: {
          key: `[{{key}}] in request ${field} `,
        },
        convert: true,
      });

      if (result.error) {
        hasError = true;
        const errors = result.error.details.map(error => error.message);
        res.status(422).json({
          status: 'error',
          errors,
        });
      }
    });

    if (hasError) {
      return hasError;
    }
    return next();
  };
}
