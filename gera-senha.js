const md5 = require('md5');

const hash = process.env.CRYPTO_KEY;

console.log(md5( "123456" + hash));