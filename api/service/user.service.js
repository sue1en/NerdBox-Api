const md5 = require('md5');
const hashSecret = process.env.CRYPTO_KEY;

// const data = [
//   {
//     name: 'Fulano Detal',
//     email: 'fulano@nerdbox.com.br',
//     type: '2',
//     password: md5('123456' + hashSecret),
//     birthdate:'2000-12-31'
//   },
//   {
//     name: 'Maria Fulanis',
//     email: 'maria@nerdbox.com.br',
//     type: '2',
//     password: md5('123456' + hashSecret),
//     birthdate:'2000-12-31'
//   },
//   {
//     name: 'Alguma Pessoa',
//     email: 'alguma@nerdbox.com.br',
//     type: '2',
//     password: md5('123456' + hashSecret),
//     birthdate:'2000-12-31'
//   },
  
// ];

const { user } = require('../models');

const registeredUser = (useremail, password) => {
  
  // const userDB = data.find(item => {
  //   return ((item.email === user)
  //     && (item.password === md5(password + hashSecret)))
  // });

  const userDB = await user.findOne({
    where: {
      email: useremail,
      password: md5(password + hashSecret),
    },
  });
  
  return userDB ? true : false;

};


module.exports = { 
  registeredUser,

};