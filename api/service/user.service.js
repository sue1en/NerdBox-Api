const md5 = require('md5');
const jwt = require('jsonwebtoken');
const hashSecret = process.env.CRYPTO_KEY;

const { users, userCaixas, caixas } = require('../models');

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

//locoliza usuário por email e senha ao fazer login
const userFinder = async (userEmail, password) => {
  const userFromDB = await users.findOne({
    where: {
      email: userEmail,
      password: createHash(password),
    },
  });
  return userFromDB ? true : false;
};

//Cria credencial
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
      },
    };
    return credential;
  } catch (error) {
    console.log(error);
  };
};

const isEmailRegistered = async (email, id = 0) => {
  const result = await searchByEmail(email);
  if(id === 0) {
    return result ? true : false;
  };
  if (result) {
    if (result.id === id)
      return false;
    return true;
  } else {
    return false;
  };
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
    },
  );
};

const usersList = async (type) => {
  let where = {};
  if (type) {
    where = {
      type
    }
  };
  const resultFromDB = await users.findAll({
    where,
    include: [{
      model: userCaixas,
      as: 'assinantes',
      include: [{
        model: caixas,
        as: 'caixa',
      }],
    }],
  });
  return resultFromDB;
};

const findUserById = async (idUser) => {
  const resultFromDB = await users.findOne({
    where: { id: idUser },
    include: [{
      model: userCaixas,
      as: 'assinantes',
      include: [{
        model: caixas,
        as: 'caixa',
      }],
    }],
  });

  const { id, name, email, birth_date, assinantes: assinaturas } = resultFromDB

  return {
    id,
    name,
    email, 
    birth_date, 
    assinaturas: assinaturas.reduce((acc, item) => {
      const { id, caixa } = item;
      const newItem = { id, caixa: caixa.name };
      return [...acc, newItem ]
    }, []),
  }  
}

const findAllUsers = async () => {
  const resultFromDB = await usersList('2');

  return resultFromDB.map(item => {
    const { id, name, email, birth_date, type, assinantes: assinaturas } = item;
    return {
      id,
      name,
      email,
      type,
      birth_date,
      assinaturas: assinaturas.reduce((acc, item) => {
        const { id, caixa } = item;
        const newItem = { id, caixa: caixa.name };
        return [...acc, newItem ]
      }, []),
    }
  });
};

module.exports = { 
  userFinder,
  createCredential,
  isEmailRegistered,
  createUser,
  searchByEmail,
  editUser,
  findAllUsers,
  findUserById
};