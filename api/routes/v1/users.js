const userCTRL = require('../../controllers/userCTRL');

const { getAllUsers, postRegisterUser} = userCTRL

module.exports= (Router) => {
    Router
        .route('/users')
        .get(getAllUsers)

    Router
        .route('/register/:idCaixa')
        .post(postRegisterUser)
}
