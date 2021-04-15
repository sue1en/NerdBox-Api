const userService = require('../service/user.service');

const authenticationCRTL = async (req, res, next) => {

   try {
      console.log(req.body);

      const { user, password } = req.body;

      const result = await userService.userFinder(user, password);

      if (!result) {
         return res.status(401).send({
            message: `usuário ou senha inválidos.`
         });
      }

      var credential = await userService.createCredential(user);

      return res.status(200).send(credential);
      
   } catch (error) {
      console.log(error);
      res.status(500).send({
         mensagem:"ERROR!!!",
      });
   }
}

const createNewUserCTRL = async (req, res, next) => {
   try{
      //recebe o body do request
      const { body } = req;
      
      //valida se email já existe
      const emailValidation = await userService.isEmailRegistered(body.email);
      
      if (emailValidation){
         return res.status(400).send({
            mensagem: 'Email já cadastrado.',
         });
      }
      await userService.createUser(body);
      return res.status(200).send({
         message:'cadastro realizado com sucesso!'
      });

   } catch (error) {
      console.log(error);
      res.status(500).send({
         mensagem:"ERROR!!!",
      });
   }
}


module.exports = {
   authenticationCRTL,
   createNewUserCTRL,
}



// const { users, userCaixas } = require('../models')

// module.exports = {
//     getAllUsers: async (req, res) => {
//         const Usuarios = await users.findAll({})
//         res.status(200).send(Usuarios.map(item => {
//             const {id, name, email, birth_date} = item;

//             return{
//                 id,
//                 name,
//                 email,
//                 birth_date
//             }
//         })|| []);
//     },
//     postRegisterUser: async (req,res) => {
//         const { name, email, birth_date} = req.body
//         const { idCaixa } = req.params

//         const alreadyExistentUser = await users.findOne({
//             where: {
//                 email: email
//             }
//         })
//         if(!alreadyExistentUser) {
//             const newUser = await users.create({name, email, birth_date});
//             await userCaixas.create({id_user: newUser.id, id_caixa:idCaixa})
//             return res.status(200).send({Sucess: "Usuario Criado com Sucesso!"})
//         }
//         return res.status(400).send({Error: "Já exite um usuario criado com esse email!"})
//     }
// }
