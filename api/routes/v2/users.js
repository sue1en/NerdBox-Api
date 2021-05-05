const userCTRL = require('../../controllers/userCTRL');
const { ValidateDTO, autorizar } = require('../../utils/middlewares.utils');
const Joi = require('joi').extend(require('@joi/date'));

const { authenticationCRTL, getAllUsers, createNewUserCTRL, editUserCTRL, getUserById } = userCTRL

module.exports = (Router) => {

  //login de usuário
  Router
  .route('/auth')
  .post(
    ValidateDTO('body', {
      user: Joi.string().required().messages({
        'any-required': `"usuário" é um campo obrigatório`,
        'string.empty': `"usuario" não deve ser vazio`,
      }),
      password:Joi.string().required().messages({
        'any-required': `"senha" é um campo obrigatório`,
        'string.empty': `"senha" não deve ser vazio`,
      }),
    }),
    authenticationCRTL
  );

  //O GET mostra todos os usuários apenas para usuário tipo 1
  //O POST cria usuário tipo 2 (já cria e faz login ao criar)
  Router
    .route('/users')
    .get(
      autorizar(),
      autorizar("GET_ALL_USERS"),
      getAllUsers
    )
    .post(
      ValidateDTO('body', {
        name: Joi.string().min(5).max(30).required()
        .messages({
          'any.required': `"nome" é um campo obrigatório.`,
          'string.empty': `"nome" não deve ser vazio.`,
          'string.min': `"nome" não deve ter menos que {#limit} caracteres`,
          'string.max': `"nome" não deve ter mais que {#limit} caracteres`,
        }),
        
        email: Joi.string().email().required()
        .messages({
          'any.required': `"email" é um campo obrigatório.`,
          'string.empty': `"email" não deve ser vazio.`,
          'string.email': `"email" deve ser um email válido.`,       
        }),
        
        birth_date: Joi.date().format('DD/MM/YYYY').required()
        .messages({
          'any.required': `"data de nascimento" é um campo obrigatório.`,
          'date.format': `"data de nascimento" deve ser uma data válida. "{#format}"`,       
        }),
      
        password: Joi.string().required().min(6).max(20).messages({
          'any.required': `"senha" é um campo obrigatório.`,
          'string.empty': `"senha" não deve ser vazio.`,
          'string.min': `"senha" não deve ter menos que {#limit} caracteres`,
          'string.max': `"senha" não deve ter mais que {#limit} caracteres`,
        }),
      }),
      createNewUserCTRL
    );

  Router
    .route('/user')
    .get(
      autorizar(),
      getUserById
    )

  //Edita usuário
  Router
    .route('/user/:id')
    .put(
      autorizar("EDIT_USER"),
      ValidateDTO('params', {
        id: Joi.number().integer().required()
        .messages({
          'eny.required': `"id" é um campo obrigatório.`,
          'number.base': `"id" deve ser um número.`,
          'string.min': `"id" deve ser um número válido.`,
        }),
      }),
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
      }),
      editUserCTRL
    );
  };