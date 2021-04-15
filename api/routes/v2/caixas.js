const caixaCTRL = require('../../controllers/caixaCTRL');
const { autorizar, ValidateDTO } = require('../../utils/middlewares.utils');
const Joi = require('joi');

const { getAllBox, createBox, getBoxesById, postRegisterSubscription, deleteSubscription } = caixaCTRL

module.exports = (Router) => {
  Router
    .route('/caixas')
    .get(
      autorizar(),
      getAllBox,
    )
    .post(
      autorizar(),
      ValidateDTO('body', {
        name: Joi.string().min(6).required(),
        description:Joi.string().min(10).required(),
        price: Joi.number().required(),
      }),
      createBox,
    );
  
  Router
    .route('/caixas/:id')
    .get(
      autorizar(),
      getBoxesById
    );
  
  Router
    .route('/caixas/:idCaixa/assinar')
    .post(
      autorizar(),
      postRegisterSubscription,
    );
  
  Router
    .route('/caixas/delete/:id')
    .delete(
      autorizar(),
      deleteSubscription,
    );
}