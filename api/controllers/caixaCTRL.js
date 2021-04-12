const { caixas, users, userCaixas} = require('../models');
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