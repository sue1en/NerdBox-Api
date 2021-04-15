const userCTRL = require('../../controllers/userCTRL');
const { ValidateDTO } = require('../../utils/middlewares.utils');
const Joi = require('joi').extend(require('@joi/date'));


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
  
    Router
    .route('/users')
    .post(
      ValidateDTO('body', {
        name: Joi.string().min(5).max(30).required()
          .messages({
            'eny.required': `"nome" é um campo obrigatório.`,
            'string.empty': `"nome" não deve ser vazio.`,
            'string.min': `"nome" não deve ter menos que {#limit} caracteres`,
            'string.max': `"nome" não deve ter mais que {#limit} caracteres`,
          }),

        email: Joi.string().email().required()
          .messages({
            'eny.required': `"email" é um campo obrigatório.`,
            'string.empty': `"email" não deve ser vazio.`,
            'string.email': `"email" deve ser um email válido.`,       
          }),

        birth_date: Joi.date().format('DD/MM/YYYY').required()
        .messages({
          'eny.required': `"data de nascimento" é um campo obrigatório.`,
          'date.format': `"data de nascimento" deve ser uma data válida. "{#format}"`,       
        }),

        password: Joi.string().required().min(6).max(20).messages({
          'eny.required': `"senha" é um campo obrigatório.`,
          'string.empty': `"senha" não deve ser vazio.`,
          'string.min': `"senha" não deve ter menos que {#limit} caracteres`,
          'string.max': `"senha" não deve ter mais que {#limit} caracteres`,
        }),
      }),

      userCTRL.createNewUserCTRL
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
