const { caixas } = require('../models');

const searchBoxByName = async (name) => {
  var boxFromDB = await caixas.findOne({
    where: {
      name: name,
    },
  });
  return boxFromDB ? true : false;
};

// const isBoxNameRegistered = async (boxName) => {
//   const result = await searchBoxByName(boxName);
//   return result ? true : false;
// };

const createNewBox = async (id, body) => {
    return caixas.create({
      name: body.name,
      description: body.description,
      price: body.price,

    },
    {where: { id:id }}
  
    );
    
};
  
// console.log("###########");
// console.log(createNewBox);
// console.log("###########");

// const editBox = async (id, body) => {
//   const editBoxModel = {
//     name: body.name,
//     description: body.description,
//     price: body.price,
//   };
//   console.log("###########");
//   console.log(editBoxModel);
//   console.log("###########");
  
//   return caixas.update(
//     {...editBoxModel},
//     // {where: { id:id }}
//   );

// };


module.exports = {
  searchBoxByName,
  createNewBox,
  // editBox,
}