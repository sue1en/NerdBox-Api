const md5 = require('md5');
const jwt = require('jsonwebtoken');
const hashSecret = process.env.CRYPTO_KEY;

const { users } = require('../models');
console.log(users);

const createHash = (password) => {
  return md5(password + hashSecret);
};

//verifica se email já existe
const searchByEmail = async (email) => {
  return userFromDB = users.findOne({
    where: {
      email: email,
    },
  });
};


//locoliza usuário por email e senha
const userFinder = (userEmail, password) => {
  const userFromDB = users.findOne({
    where: {
      email: userEmail,
      password: createHash(password),
    },
  });
  return userFromDB ? true : false;
  
};

const createCredential = async (userEmail) => {
  
  const userCredential = await users.findOne({
    where: {
      email: userEmail
    },
  });
  
  const { name, email, type } = userCredential;
  
  try{
    const credential = {
      token: jwt.sign({ email: users.email}, process.env.JWT_KEY, {
        expiresIn: `${process.env.JWT_VALID_TIME}ms`,
      }),
      user: {
        name,
        email,
        type,
      }
    }
    return credential;
    
  } catch (error) {
    console.log(error);
  };
};


const isEmailRegistered = async (email) => {
  const result = await searchByEmail(email);
  return result ? true : false;
};

//Cria novo usuário
const createUser = (body) => {
  const registerModel = {
    name: body.name,
    email: body.email,
    birth_date: body.birth_date,
    type:'2',
    password: createHash(body.password),
  };

  return users.create(registerModel);
};

module.exports = { 
  userFinder,
  createCredential,
  isEmailRegistered,
  createUser,
};