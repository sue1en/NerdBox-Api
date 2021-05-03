const { caixas, userCaixas } = require('../models');

//Confere se caixa existe
const isBoxAvailable = async (idCaixa) => {
  const resultFromDB = await caixas.findOne({
    where: { id: idCaixa }
  });
  return resultFromDB ? true : false;
};

//confere se usuário já está inscrito no produto
const isUserSubscrited = async (idCaixa, idUser) => {
  const resultFromDB = await userCaixas.findOne({
    where: {
      id_caixa: idCaixa, 
      id_user: idUser
    },
  });
  return resultFromDB ? true : false;
};

const subscriptionIdValidation = async (idSubscription) => {
  const resultFromDB = await userCaixas.findOne({
    where: { id: idSubscription }
  });
  return resultFromDB ? true : false;
};

const addUserSubscription = async (idCaixa, idUser) => {
  return await userCaixas.create({
      id_caixa: idCaixa, 
      id_user: idUser,
  });
};

//confere se usuário já está inscrito no produto
const userIdSubscriptionValidation = async (idSubscription, idUser) => {
  const resultFromDB = await userCaixas.findOne({
    where: {id: idSubscription}
  });
  return resultFromDB.id_user === idUser ? true : false;
};

const removeSubscription = async (idSubscription) => {
  return await userCaixas.destroy({
    where: { id: idSubscription }
  });
}; 

module.exports = {
  isUserSubscrited,
  isBoxAvailable,
  addUserSubscription,
  removeSubscription,
  subscriptionIdValidation,
  userIdSubscriptionValidation,
};