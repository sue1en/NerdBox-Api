const md5 = require('md5');

const hash = process.env.CRYPTO_KEY;

console.log(md5( "123456" + hash));


/*
$ node gera-senha.js
645c9d6e956246fd1d9f217ef7c55f95
*/


// "name":"caixa teste",
//     "description":"testede descrição",
//     "price":"20,20"