const caixasSevice = require('../service/caixas.service');
const userSevice = require('../service/user.service');
const subscriptionService = require ('../service/subscription.service');
const { caixas } = require('../models');

/*
---->>> V1 <<<----
module.exports = {
   getAllBox: async (req, res) => {
       const existentsBox = await caixas.findAll({})
       res.status(200).send(existentsBox.map(item => {
           const {id, name, description, price} = item;

           return{
               id,
               name,
               description,
               price
           }
       }) || []);
   },
   getBoxesById: async (req, res) => {
       const findBoxById =  await caixas.findOne({
           where: {
               id: req.params.id
           },
           include: {
               model: userCaixas,
               as: 'assinantes',
               include: {
                   model: users
               }
           }
       });
       if(!findBoxById) {
           return res.status(400).send({Error: "Não existe uma Box com esse ID"})
       }
       res.status(200).send(findBoxById)
   },
   postRegisterSubscription: async (req, res) => {
       const { idCaixa } = req.params
       const { email } = req.body

       const findExistentUser = await users.findOne({
           where: {
               email: email
           }
       })
       if(!findExistentUser) {
           return res.status(400).send({Error: "Usuario não encontrado!"})
       }
       const subsNewUser = await userCaixas.create({id_user: findExistentUser.id, id_caixa: idCaixa })
       return res.status(200).send({Sucesso: "Assinado com sucesso!"})
   },
   deleteSubscription: async (req, res) => {
       try {
           await userCaixas.destroy({
               where: {
                   id: req.params.id
               }
           });
           res.status(200).send({Sucesso: "Você cancelou sua assinatura."});
       } catch (error) {
           console.log(error);
           res.status(500).send({Error: "Erro interno do servidor."});
       }
   }
}
*/

//---->>> V2 <<<----
module.exports = {
   getAllBoxCTRL: async (req, res) => {
      try {
         // const { user } = req
         const result = await caixasSevice.findAllBoxes();
         res.status(200).send(result);
      } catch (error) {
         console.log(error);
         res.status(500).send({ message:"ERROR!!!"});
      };
   },

   getBoxesByIdNoAuthCTRL: async (req, res) => {
      try{ 
         const { params } = req;
         const result = await caixasSevice.findBoxByIdNoAuth(params.idCaixa);
         return res.status(200).send(result);
      } catch (error) {
         console.log(error);
         res.status(500).send({message:"ERROR!!!" });
      };
   },

   getBoxesByIdCTRL: async (req, res) => { 
      try{
         const { params, user } = req
         const result = await caixasSevice.findBoxByUserProfile(params.idCaixa, user.id, user.type);
         return res.status(200).send(result);
      } catch (error) {
         console.log(error);
         res.status(500).send({message:"ERROR!!!" });
      };
   },

   postRegisterSubscriptionCTRL: async (req, res) => {
      try { 
         const { idCaixa } = req.params;
         const idUser = req.user.id;

         //valida se caixa existe
         const boxValidationResult = await subscriptionService.isBoxAvailable(idCaixa);
         if (!boxValidationResult){
            return res.status(422).send({mensage: 'Produto informado não existe!'});
         }

         // Valida se usuário já está inscrito nessa caixa
         const userValidationResult = await subscriptionService.isUserSubscrited( idCaixa, idUser);
         if (userValidationResult) {
           return res.status(400).send({ message: 'Esse usuário já está inscrito nessa caixa!'});
         };

         //realiza a inscrição
         const resultSubs = await subscriptionService.addUserSubscription( idCaixa, idUser);
         return res.status(200).send({idSubscription:resultSubs.dataValues.id});
      } catch (error) {
         console.log(error);
         res.status(500).send({ message:"ERROR!!!"});
      };
     },
   
   deleteSubscriptionCTRL: async (req, res) => {
      try { 
         const { idCaixa, idSubscription } = req.params;
         const idUser = req.user.id;
   
         //valida se caixa existe
         const boxValidationResult = await subscriptionService.isBoxAvailable(idCaixa);
         if (!boxValidationResult)
         return res.status(422).send({mensage: 'Produto informado não existe!'});
         
         //valida se inscrição existe
         const subscriptionValidationResult = await subscriptionService.subscriptionIdValidation(idSubscription, idUser);
         if (!subscriptionValidationResult)
         return res.status(422).send({mensage: 'inscrição informada não existe!'});
   
         //Valida se inscrição pertence ao usuário.
         const userValidationResult = await subscriptionService.userIdSubscriptionValidation( idSubscription, idUser);
         if (!userValidationResult) {
           return res.status(400).send({ message: 'Operação não pode ser realizada!'});
         };

         //remove a inscrição
         await subscriptionService.removeSubscription(idSubscription);
         return res.status(200).send({mensage: 'Inscrição cancelada com sucesso!'});

      } catch (error) {
         console.log(error);
         res.status(500).send({ message:"ERROR!!!"});
      };
   },

   createBoxCTRL: async (req, res, next) => {
      try{
         if ( req.user.type !== "1" ) {
            return res.status(401).send({ message: 'Usuário não autorizado.'})
         };
         const { name } = req.body;

         //verifica se produto já é cadastrado com esse nome
         const boxNameValidation = await caixasSevice.searchBoxByName(name);
         if (boxNameValidation){
            return res.status(400).send({ message: 'Já existe uma caixa com esse nome.'});
         };
         await caixasSevice.createNewBox(req.body);
         return res.status(200).send({ message:'Cadastro realizado com sucesso.'});
      } catch (error) {
         console.log(error);
         res.status(500).send({ message:"ERROR!!!"});
      };
   },

   editBoxCTRL: async (req, res, next) => {
      try{
         if ( req.user.type !== "1" ) {
            return res.status(401).send({ message: 'Usuário não autorizado.'})
         };
         const { idCaixa } = req.params;
         
         //verifica se produto já é cadastrado com esse nome
         const boxNameValidation = await caixasSevice.searchBoxByName(idCaixa, req.body);

         if (boxNameValidation){
            return res.status(400).send({ message: 'Já existe uma caixa com esse nome.'})
         }
   
         await caixasSevice.editBox(idCaixa, req.body);
         return res.status(200).send({message:'Atualização realizada com sucesso.'});

      } catch (error) {
         console.log(error);
         res.status(500).send({message:"ERROR!!!"});
      };
   },

   deleteBoxCTRL: async (req, res, next) => {
      try{
         if ( req.user.type !== "1" ) {
            return res.status(401).send({ message: 'Usuário não autorizado.'})
         };
         const { idCaixa } = req.params;
   
         await caixasSevice.deleteBox(idCaixa);
         return res.status(200).send({message:'Caixa excluída com sucesso!'});

      } catch (error) {
         console.log(error);
         res.status(500).send({message:"ERROR!!!"});
      };
   },
};