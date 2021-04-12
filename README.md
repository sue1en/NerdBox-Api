# NerdBox - Back-End

- Backend para uma aplicação web, Conceito do sistema é um serviço de assinatura.
- Segundo Projeto do Bootcamp Full Stack Developer do Infnet.
    - Tecnologias utilizadas
        * [X] NodeJs
        * [X] Express
        * [X] Cors
        * [X] Sequelize
        * [X] Mysql

Desenvolvedores:
- Felipe Siqueira [GitLab](https://gitlab.com/fsiq)
- Suelen Batista - Front-End [GitLab](https://gitlab.com/suelen.batista)

```console
$ yarn install      # instala as dependências
$ yarn create-db    # cria o banco de dados
$ yarn migrate-db   # cria as tabelas no banco
$ yarn start        # inicia o servidor
```
## Padrão de rotas

- GET
1. '/v1/', Rota raiz onde mosta o nome do Projeto e a sua Versão atual.
2. '/v1/users', Rota que mostra todos os usuários já cadastrados. 
3. '/v1/caixas', Rota que mostra todas as caixas existentes.
4. '/v1/caixas/:id', Rota que mostra uma unica caixa referenciada ao seu id.

- POST
1. '/register', Rota que registra um novo usuário.
2. '/caixas/:idCaixa/assinar', Rota para o usuário assinar uma caixa.

- DELETE
1. '/caixas/delete/:id', Rota que deleta uma assinatura em uma caixa.
