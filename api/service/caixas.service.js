const { caixas, userCaixas, users } = require('../models');

const searchBoxByName = async (name) => {
  var resultFromDB = await caixas.findOne({
    where: { name: name },
  });
  return resultFromDB ? true : false;
};

const findBoxByIdNoAuth = async (id) =>{
  return await caixas.findOne({
    where: { id: id }
  });
};

const findBoxByUserProfile = async (id, userId, userType) => {
  const resultFromDB = await caixas.findOne({
    where: { id: id },
    include:[{
      model: userCaixas,
      as: 'assinantes',
      include: [{
        model: users,
        as: 'user',
      }],
    }],
  });

  let subscriptionFilter = resultFromDB.assinantes;
  
  if (Number(userType) === 1) {
    const subscriptionDetail = subscriptionFilter.map((itemSubscription) => {
      return {
        id: itemSubscription.id,
        member: {
          id: itemSubscription.user.id,
          name: itemSubscription.user.name,
        },
      };
    });
    result = {
      qtd_subs: subscriptionFilter.length,
      assinantes: subscriptionDetail,
    };
  } else {
    const memberDatail = subscriptionFilter.filter((itemFilter) => (Number(itemFilter.id_user) === Number(userId)));
    result = {
      membro: memberDatail.length ? true : false,
    };
  };

  return {
    id: resultFromDB.id,
    name: resultFromDB.name,
    description: resultFromDB.description,
    price: resultFromDB.price,
    result
  };
};

const createNewBox = async (body) => {
  return await caixas.create({
    name: body.name,
    description: body.description,
    price: body.price,
  });
};
  
const editBox = async (id, body) => {
  const editBoxModel = {
    name: body.name,
    description: body.description,
    price: body.price,
  };
  
  return caixas.update(
    {...editBoxModel},
    {where: { id:id }}
  );
};

module.exports = {
  searchBoxByName,
  createNewBox,
  editBox,
  findBoxByUserProfile,
  findBoxByIdNoAuth,
};