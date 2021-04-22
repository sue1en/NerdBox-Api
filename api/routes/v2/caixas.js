const caixaCTRL = require('../../controllers/caixaCTRL');
const { autorizar, ValidateDTO } = require('../../utils/middlewares.utils');
const Joi = require('joi');

const { getAllBoxCTRL, createBoxCTRL, getBoxesByIdCTRL, postRegisterSubscriptionCTRL, deleteSubscriptionCTRL } = caixaCTRL

module.exports = (Router) => {

  //Retorna caixas existentes
  Router
    .route('/caixas')
    .get(
      getAllBoxCTRL,
    );
  
  //Cria nova caixa
  Router
    .route('/novacaixa')
    .post(
      autorizar("CREATE_BOX"),
      ValidateDTO('body', {
        name: Joi.string().min(6).required(),
        description:Joi.string().min(10).required(),
        price: Joi.number().required(),
      }),
      createBoxCTRL,
    );
  
  Router
    .route('/caixas/:id')
    .get(
      getBoxesByIdCTRL
    );
  
  Router
    .route('/caixas/:idCaixa/assinar')
    .post(
      autorizar(),
      postRegisterSubscriptionCTRL,
    );
  
  Router
    .route('/caixas/delete/:id')
    .delete(
      autorizar(),
      deleteSubscriptionCTRL,
    );
};