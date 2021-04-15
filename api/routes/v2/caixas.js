const caixaCTRL = require('../../controllers/caixaCTRL');
const { autorizar } = require('../../utils/middlewares.utils');


const { getAllBox, getBoxesById, postRegisterSubscription, deleteSubscription } = caixaCTRL

module.exports = (Router) => {
  Router
    .route('/caixas')
    .get(
      autorizar(),
      getAllBox,
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