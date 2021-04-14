const Joi = require('joi');

exports.ValidateDTO = (type, params) => {
//DTO - data transfer model
  return (req, res, next) => {

    const schema = Joi.object().keys(params);
  
    const { value, error } = schema.validate(req[type], {
      allowUnknown: false,
    });
  
    req[type] = value;
  
    return error ? res.status(422).send({
      detalhes: [],
    }) : next();
  }
}