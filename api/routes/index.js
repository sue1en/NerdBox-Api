const Router = require('express').Router()

const { name, version } = require('../../package.json');

const usersRouteV1 = require('./v1/users');
const caixasRouteV1 = require('./v1/caixas')

Router
    .route('/')
    .get((req,res) => {
        res.send(`${name} - Version:${version}`)
    })

usersRouteV1(Router);
caixasRouteV1(Router);

module.exports = Router;