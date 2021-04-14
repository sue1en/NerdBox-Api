const userService = require('../service/user.service');

const authenticationCRTL = async (req, res, next) => {

   try {
      console.log(req.body);

      const {user, password} = req.body;

      if (!userService.registeredUser(user, password)) {
         res.status(401).send({
            message: `usuário ou senha inválidos`
         });
      }

      res.status(200).send({
         mensagem:"autenticado com sucesso",
         token: 'huahuahuahua',
      });
      
   } catch (error) {
      res.status(500).send({
         mensagem:"ERROR!!!",
      });
   }
}

module.exports = {
   authenticationCRTL
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
