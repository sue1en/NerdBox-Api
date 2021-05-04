const { caixas, userCaixas, users } = require('../models');

const searchBoxByName = async (name) => {
  var resultFromDB = await caixas.findOne({
    where: { name: name },
  });
  return resultFromDB ? true : false;
};



const findAllBoxes = async (id) => {
  const resultFromDB = await caixas.findAll({
    include:[{
      model: userCaixas,
      as: 'assinantes'
    }],
  });

  return resultFromDB.map(item => {
    const { id, name, description, price, assinantes } = item
    
        return{
          id,
          name,
          description,
          price,
          qtd_subs:assinantes.length,
        };
  })

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
          email:itemSubscription.user.email,
          birth_date: itemSubscription.user.birth_date,
        },
      };
    });
    
    return {
      id: resultFromDB.id,
      name: resultFromDB.name,
      description: resultFromDB.description,
      price: resultFromDB.price,
      qtd_subs: subscriptionFilter.length,
      assinantes: subscriptionDetail,
    };

  } else {
    const memberDetail = subscriptionFilter.filter((itemFilter) => 
      (Number(itemFilter.id_user) === Number(userId)));

    const subsId = memberDetail[0].dataValues.id;

    return {
      id: resultFromDB.id,
      name: resultFromDB.name,
      description: resultFromDB.description,
      price: resultFromDB.price,
      member: memberDetail.length ? true : false,
      subs_id:subsId,
    };
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

const deleteBox = async (id) => {
  return await caixas.destroy({
    where: { id:id }
  });
};

module.exports = {
  searchBoxByName,
  createNewBox,
  editBox,
  findBoxByUserProfile,
  findBoxByIdNoAuth,
  deleteBox,
  findAllBoxes
};