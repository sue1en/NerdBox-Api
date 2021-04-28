const caixasSevice = require('../service/caixas.service');
const userSevice = require('../service/user.service');
const { caixas, users, userCaixas } = require('../models');

module.exports = {

   getAllBoxCTRL: async (req, res) => {
      try { 
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

      } catch (error) {
         console.log(error);
         res.status(500).send({ message:"ERROR!!!"});
      }
   },

   getBoxesByIdNoAuthCTRL: async (req, res) => {
      try{ 
         const { params } = req
         const result = await caixasSevice.findBoxByIdNoAuth(params.idCaixa)
         return res.status(200).send(result);

      } catch (error) {
         console.log(error);
         res.status(500).send({message:"ERROR!!!" });
      }
   },

   getBoxesByIdCTRL: async (req, res) => { 
      try{
         const { params, user } = req
         const result = await caixasSevice.findBoxByUserProfile(params.idCaixa, user.id, user.type);

         return res.status(200).send(result);

      } catch (error) {
         console.log(error);
         res.status(500).send({message:"ERROR!!!" });
      }
   },

   postRegisterSubscriptionCTRL: async (req, res) => {
      try {
         const { idCaixa } = req.params;
         const idUser = req.user.id;

         const model = {
            id_caixa: idCaixa, 
            id_user: idUser
          };

         await userCaixas.create(model)
         return res.status(200).send({Sucesso: "Assinado com sucesso!"})

      } catch (error) {
         console.log(error);
         res.status(500).send({ message:"ERROR!!!"});
      }
   },
   
   deleteSubscriptionCTRL: async (req, res) => {
      try {
         const { id } = req.params;

         await userCaixas.destroy({
            where: {
               id: id,
            }
         });
         res.status(200).send({Sucesso: "Você cancelou sua assinatura."});
      } catch (error) {
         console.log(error);
         res.status(500).send({Error: "Erro interno do servidor."});
      }
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
      }
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
      }
   },

}