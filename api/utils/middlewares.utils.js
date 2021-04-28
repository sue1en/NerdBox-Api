const Joi = require('joi');
const jwt = require('jsonwebtoken');
const userService = require('../service/user.service');


const profiles = {
  '1': [
    'CREATE_BOX',
    'EDIT_BOX',
    'GET_ALL_USERS',
    'EDIT_USER',
  ],
  '2': [
    'EDIT_USER',
  ]
}


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
    try {
      const schema = Joi.object().keys(params);
    
      const { value, error } = schema.validate(req[type], {
        allowUnknown: false,
      });
    
      req[type] = value;

      return error ? res.status(422).send({
        details: [...criateDetail(error)],
      }) : next();

    } catch (error) {
      console.log(error);
    };
  };
};

exports.autorizar = (bacon = '*') => {
  return async (req, res, next) => {
    
    const { token } = req.headers;
    console.log(token);
    
    try{
      if (!token) {
        return res.status(403).send({
          message: "usuário não autorizado."
        });
      };

      const userJWT = jwt.verify(token, process.env.JWT_KEY);

      const user = await userService.searchByEmail(userJWT.email);
      req.user = user;

      if (bacon !== '*'){
        if(!profiles[user.type].includes(bacon))
        {
          return res.status(403).send({
          message: "Usuário não autorizado."
          });
        };
      };

      next();

    } catch (error) {

      console.log(`Token Error: ${error}`);

      res.status(401).send({
        message: "usuário não autenticado!"
      });

    };
  };
};