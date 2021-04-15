const md5 = require('md5');
const jwt = require('jsonwebtoken');
const hashSecret = process.env.CRYPTO_KEY;

const { user } = require('../models');

const createHash = (password) => {
  return md5(password + hashSecret);
};

//locoliza usuário por email e senha
const userFinder = (userEmail, password) => {
  const userFromDB = user.findOne({
    where: {
      email: userEmail,
      password: md5(password + hashSecret),
    },
  });
  return userFromDB ? true : false;

};

const createCredential = async (userEmail) => {
 
  const user = await user.findOne({
    where: {
      email: userEmail
    },
  });

  const { name, email, type } = user;

  try{
    const credential = {
      token: jwt.sign({ email: user.email}, process.envJWT_KEY, {
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

//verifica se email já está cadastrado
const searchByEmail = async (email) => {
  return userFromDB = user.findOne({
    where: {
      email: email,
    },
  });
};

const isEmailRegistered = async (email) => {
  const result = await searchByEmail(email);
  return result ? true : false;
};

//Cria novo usuário
const createUser = (model) => {
  const registerModel = {
    name:body.name,
    email: body.email,
    birth_date: body.birth_date,
    type:'2',
    password: createHash(body.password),
  };

  return user.create(registerModel);
};

module.exports = { 
  userFinder,
  createCredential,
  isEmailRegistered,
  createUser,
};