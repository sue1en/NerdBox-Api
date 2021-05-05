const caixaCTRL = require('../../controllers/caixaCTRL');
const { autorizar, ValidateDTO } = require('../../utils/middlewares.utils');
const Joi = require('joi');

const { getAllBoxCTRL, createBoxCTRL, getBoxesByIdNoAuthCTRL, getBoxesByIdCTRL, postRegisterSubscriptionCTRL, deleteSubscriptionCTRL, editBoxCTRL, deleteBoxCTRL } = caixaCTRL

module.exports = (Router) => {

  //Retorna caixas existentes
  Router
    .route('/caixas')
    .get(
      // autorizar(),
      getAllBoxCTRL,
    );

  //Retorna caixa por id não autenticado
  Router
    .route('/caixas-noauth/:idCaixa')
    .get(
      getBoxesByIdNoAuthCTRL,
    );
    
  //Retorna caixa por id (apenas para quem está logado)
  Router
    .route('/caixas/:idCaixa')
    .get(
      autorizar(),
      ValidateDTO('params', {
        idCaixa: Joi.number().integer().required().messages({
          'any.required': `"id" é um campo obrigatório`,
          'number.base': `"id" deve ser um número`,
          'number.integer': `"id" deve ser um número válido`,
        })   
      }),
      getBoxesByIdCTRL
    );

  //Edita caixa existente (apenas usuário tipo 1)
  Router
    .route('/caixas/:idCaixa')
    .put(
      autorizar("EDIT_BOX"),
      ValidateDTO('params', {
        idCaixa: Joi.number().integer().required()
        .messages({
          'eny.required': `"id" é um campo obrigatório.`,
          'number.base': `"id" deve ser um número`,
          'number.integer': `"id" deve ser um número válido`,
        }),
      }),
      ValidateDTO('body', {
        name: Joi.string().required()
        .messages({
          'eny.required': `"nome" é um campo obrigatório.`,
          'string.empty': `"nome" não deve ser vazio.`,
        }),
        
        description:Joi.string().min(10).required()
        .messages({
          'eny.required': `"description" é um campo obrigatório.`,
          'string.empty': `"description" não deve ser vazio.`,       
        }),
        
        price: Joi.number().required()
        .messages({
          'eny.required': `"price" é um campo obrigatório.`,
          'string.empty': `"price" não deve ser vazio.`,
          'number.base': `"price" deve ser um número`,
        }),
      }),
      editBoxCTRL,
    )
    .delete(
      autorizar("DELETE_BOX"),
      deleteBoxCTRL,
    );

  //Cria nova caixa (apenas usuário tipo 1)
  Router
    .route('/novacaixa')
    .post(
      autorizar("CREATE_BOX"),
      ValidateDTO('body', {
        name: Joi.string().required()
          .messages({
            'eny.required': `"nome" é um campo obrigatório.`,
            'string.empty': `"nome" não deve ser vazio.`,
          }),
        description:Joi.string().required()
          .messages({
            'eny.required': `"description" é um campo obrigatório.`,
            'string.empty': `"description" não deve ser vazio.`
          }),
        price: Joi.number().required()
          .messages({
            'eny.required': `"price" é um campo obrigatório.`,
            'string.empty': `"price" não deve ser vazio.`,
            'number.base': `"price" deve ser um número`,
          }),
      }),
      createBoxCTRL,
    );
  
  Router
    .route('/caixas/:idCaixa/assinar')
    .post(
      autorizar(),
      postRegisterSubscriptionCTRL,
    );
  
  Router
    .route('/caixas/:idCaixa/assinar/:idSubscription')
    .delete(
      autorizar("DELETE_SUBSCRIPTION"),
      ValidateDTO('params', {
        idCaixa: Joi.number().integer().required()
          .messages({
            'any.required': `"id" é um campo obrigatório`,
            'number.base': `"id" deve ser um número`,
            'number.integer': `"id" deve ser um número válido`,
          }),
        idSubscription: Joi.number().integer().required()
          .messages({
            'any.required': `"id" é um campo obrigatório`,
            'number.base': `"id" deve ser um número`,
            'number.integer': `"id" deve ser um número válido`,
          })
      }),
      deleteSubscriptionCTRL,
    );
};