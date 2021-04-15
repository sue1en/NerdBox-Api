const Joi = require('joi');
const jwt = require('jsonwebtoken');


const criateDetail = (error) => {

  return error.details.reduce((acc, item) => {

    console.log(acc);
    console.log(item);

    return [
      ...acc, item.message
    ];

  },[]);

}

exports.ValidateDTO = (type, params) => {
//DTO - data transfer model
  return (req, res, next) => {

    const schema = Joi.object().keys(params);
  
    const { value, error } = schema.validate(req[type], {
      allowUnknown: false,
    });
  
    req[type] = value;
  
    return error ? res.status(422).send({
      details: [...criateDetail(error)],
    }) : next();
  }
}

exports.autorizar = () => {
  return (req, res, next) => {
    console.log(req.header);

    const { token } = req.headers;

    try{
      if (token) {
        return res.status(401).send({
          message: "token inválido."
        });
      }

      const userJWT = jwt.verify(token, process.env.JWT_KEY);

    } catch (error) {

      console.log(`Token Error: ${error}`);

      res.status(401).send({
        message: "usuário não autenticado!"
      });

    }
  }
}