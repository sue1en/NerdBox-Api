const md5 = require('md5');
const hashSecret = process.env.CRYPTO_KEY;


const { user } = require('../models');

const registeredUser = (useremail, password) => {
  

  const userFromDB = user.findOne({
    where: {
      email: useremail,
      password: md5(password + hashSecret),
    },
  });
  return userFromDB ? true : false;

  

};


module.exports = { 
  registeredUser,
};