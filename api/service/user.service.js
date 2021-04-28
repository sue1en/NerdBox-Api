const md5 = require('md5');
const jwt = require('jsonwebtoken');
const hashSecret = process.env.CRYPTO_KEY;

const { users } = require('../models');

const createHash = (password) => {
  return md5(password + hashSecret);
};

//verifica se email já existe
const searchByEmail = async (email) => {
  const userFromDB = await users.findOne({
    where: {
      email: email,
    },
  });
  return userFromDB;
};

//locoliza usuário por email e senha
const userFinder = async (userEmail, password) => {
  const userFromDB = await users.findOne({
    where: {
      email: userEmail,
      password: createHash(password),
    },
  });
  console.log(userFromDB);
  return userFromDB ? true : false;
};


const createCredential = async (userEmail) => {
  
  try{
    const userCredential = await users.findOne({
      where: {
        email: userEmail,
      },
    });
  
    const { id, name, email, birth_date, type } = userCredential;
  
    const credential = {
      token: jwt.sign({ email: email}, process.env.JWT_KEY, {
        expiresIn: `${process.env.JWT_VALID_TIME}ms`,
      }),
      user: {
        id,
        name,
        email,
        birth_date,
        type,
      }
    }
    return credential;
    
  } catch (error) {
    console.log(error);
  };
};


const isEmailRegistered = async (email, id = 0) => {
  const result = await searchByEmail(email);

  if(id === 0) {
    return result ? true : false;
  }

  if (result) {
    if (result.id === id)
      return false;
    return true;

  } else {
    return false;

  }
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

const editUser = async (id, body) => {
  return await users.update(
    {
      name: body.name,
      email: body.email,
      birth_date: body.birth_date,
    },
    {
      where: { id:id }
    }
  )
}


module.exports = { 
  userFinder,
  createCredential,
  isEmailRegistered,
  createUser,
  searchByEmail,
  editUser
};