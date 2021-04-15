const { Router } = require('express');

const { name, version } = require('../../package.json');

// const caixasRouteV1 = require('./v1/caixas');
// const usersRouteV1 = require('./v1/users');

const caixasRouteV2 = require('./v2/caixas');
const usersRouteV2 = require('./v2/users');

module.exports = (appRouter) => {
   //HealthCheck
   appRouter.get('/', (req, res, next) => {
      res.send(`${name} - Version:${version}`)
   });
   
   // const routerV1 = Router()
   // usersRouteV1(routerV1);
   // caixasRouteV1(routerV1);
   // appRouter.use('/v1', routerV1);
   
   const routerV2 = Router();
   usersRouteV2(routerV2);
   caixasRouteV2(routerV2);
   appRouter.use('/v2', routerV2);
};