const userCTRL = require('../../controllers/userCTRL');
const { ValidateDTO } = require('../../utils/middlewares.utils');
const Joi = require('joi');


module.exports = (Router) => {
  Router
    .route('/auth')
    .post(
      ValidateDTO('body', {
        password:Joi.string().required().messages({
          'any-required': `"senha" é um campo obrigatório`
        }),
        user: Joi.string().required().messages({
          'any-required': `"usuário" é um campo obrigatório`
        }),
      }),
      userCTRL.authenticationCRTL
    );
}


// const { getAllUsers, postRegisterUser} = userCTRL

// module.exports= (Router) => {
//     Router
//         .route('/users')
//         .get(getAllUsers)

//     Router
//         .route('/register/:idCaixa')
//         .post(postRegisterUser)
// }
