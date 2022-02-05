# NerdBox - API

#### About the project:
   The NerdBox project was developed as an academic exercise to the Full Stack Developer course at [Infnet Institute](https://www.infnet.edu.br/infnet/).

#### Project Description:
   The project is a web application for a store. The business model works as a subscription service. The project has two types of users, clients and the store admin. 
   
    Admin Actions:
        - Create, edit and remove products (boxes)
    Client Actions:
        - login/logout
        - Register to the store
        - Subscribe to a product (boxes)
        - Unsubscribe of a product (boxes)
        - Edit his account info
   
   
#### About this repository:
   This is the API RESTful of the NerdBox Project, was developed to interact with the project's frontend, that can be found on this link => [NerdBox Frontend repo](https://github.com/sue1en/NerdBox-Front-End).
    The project was build using NodeJs and MySQL to the database.
    
## Tecnologies
   - NodeJs
   - Express
   - Cors
   - Sequelize
   - Mysql

## Requeriment:
- NodeJS
- MongoDB

## Developers:
- Felipe Siqueira [GitHub](https://github.com/fsiq-dev)
- Suelen Batista [GitHub](https://github.com/sue1en)

## How to Run:
```console
$ yarn install      # install dependencies
$ yarn create-db    # create the database
$ yarn migrate-db   # create database's tables
$ yarn start        # start server
```

## Routes
```
- GET
1. '/v1/', Main route return the projeto name and version.
2. '/v1/users', Return all registered users.
3. '/v1/caixas', Return all existing boxes.
4. '/v1/caixas/:idCaixa', Return the selected box by it's ID.

- POST
1. '/auth', Users login.
2. '/users', Register new user.
3. '/caixas/:idCaixa/assinar', Client subscribe to a Box.
4. '/novacaixa', Create new Box.


- PUT
1. '/caixas/:idCaixa', Edit selected box.
2. '/v1/user/:id', Edit user by ID.

- DELETE
1. '/caixas/:idCaixa/assinar/:idSubscription', Remove the client box subscription.
2. '/caixas/:idCaixa', Delete selected box.
```
