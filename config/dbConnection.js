var mysql = require('mysql');

var connMySql = function() {
    console.log('Conexão com bd estabelecida');

    return mysql.createConnection({

        host: 'localhost',
        user: 'root',
        password: 'Enzo1503!',
        database: 'portal_noticias',

    });

};


module.exports = function() {

    console.log('O autoload carregou o modulo de conexão com banco de dados');
    return connMySql;

}