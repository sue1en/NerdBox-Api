const caixaCTRL = require('../../controllers/caixaCTRL');

const { getAllBox, getBoxesById, postRegisterSubscription, deleteSubscription } = caixaCTRL

module.exports = (Router) => {
    Router
        .route('/caixas')
        .get(getAllBox)
    
    Router
        .route('/caixas/:id')
        .get(getBoxesById)
    
    Router
        .route('/caixas/:idCaixa/assinar')
        .post(postRegisterSubscription)
    
    Router
        .route('/caixas/delete/:id')
        .delete(deleteSubscription)
}