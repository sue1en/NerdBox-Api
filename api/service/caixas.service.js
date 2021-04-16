const { caixas } = require('../models');

const searchBoxByName = async (boxName) => {
  var boxFromDB = await caixas.findOne({
    where: {
      name: boxName,
    },
  });
  return boxFromDB ? true : false;
};

// const isBoxNameRegistered = async (boxName) => {
//   const result = await searchBoxByName(boxName);
//   return result ? true : false;
// };

const crateNewBox = async (body) => {
  return caixas.create({
      name: body.name,
      description: body.description,
      price: body.price,
    });
};



module.exports = {
  searchBoxByName,
  crateNewBox
}