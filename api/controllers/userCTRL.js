const userService = require('../service/user.service');
const { users } = require('../models')

module.exports = {
   authenticationCRTL: async (req, res) => {
      try {
         const { user, password } = req.body;

         const result = await userService.userFinder(user, password);
         if (!result) {
            return res.status(401).send({message: `usuário ou senha inválidos.`});
         }; 
         var credential = await userService.createCredential(user);
         return res.status(200).send(credential);
         
      } catch (error) {
         console.log(error);
         res.status(500).send({message:"ERROR!!!"});
      };
   },
   
   createNewUserCTRL: async (req, res) => {
      try{
         //recebe o body do request
         const { body } = req;
         
         //valida se email já existe
         const emailValidation = await userService.isEmailRegistered(body.email);
         if (emailValidation){
            return res.status(400).send({message: 'Email já cadastrado.'});
         };
         await userService.createUser(body);
         var credential = await userService.createCredential(body.email);
         return res.status(200).send(credential);
   
      } catch (error) {
         console.log(error);
         res.status(500).send({message:"ERROR!!!"});
      };
   },
   
   editUserCTRL: async (req, res) => {
      try {
         const { body, params } = req;
         if (Number(params.id) !== Number(req.user.id)) {
            return res.status(400).send({ message: `Operação não permitida.`});
         };
      
         //verifica se email já existe
         const emailValidation = await userService.isEmailRegistered(body.email, params.id);
         if (emailValidation) {
            return res.send(400).send({ message: `email já cadastrado.`})
         };
      
         await userService.editUser(params.id, body);
         return res.status(200).send({ message:'Alteração realizada com sucesso.'});

      } catch (error) {
         console.log(error);
         res.status(500).send({ message:"ERROR!!!" });
      };
   },

   getAllUsers: async (req, res) => {
      try {
         if ( req.user.type !== "1" ) {
            return res.status(401).send({message: 'Usuário não autorizado.'});
         };
         const Usuarios = await users.findAll({})
         res.status(200).send(Usuarios.map(item => {
            const {id, name, email, birth_date} = item;
            return{
               id,
               name,
               email,
               birth_date
            }
         })|| []);

      } catch (error) {
         console.log(error);
         res.status(500).send({message:"ERROR!!!"});
      };
   },

}

// const { users, userCaixas } = require('../models')

// module.exports = {
//     
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
