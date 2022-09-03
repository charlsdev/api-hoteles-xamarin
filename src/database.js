const mysql = require('mysql');
const {
   promisify
} = require('util');

const client = mysql.createPool({
   host: process.env.DB_HOST,
   port: process.env.DB_PORT,
   database: process.env.DB_NAME,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
});

const ERRORS_DB = {
   'PROTOCOL_CONNECTION_LOST': 'Conexión a la Base de datos cerrada',
   'ER_CON_COUNT_ERROR': 'Muchas conexiones a la Base de datos',
   'ECONNREFUSED': 'Conexión a la Base de datos rechazada',
   'ER_BAD_DB_ERROR': 'Base de datos incorrecta o desconocida',
   'ER_ACCESS_DENIED_ERROR': 'Acceso denegado al usuario de la Base de datos',
   'ENOTFOUND': 'Host de la Base de datos incorrecto o desconocido'
};

client.getConnection((err, connection) => {
   if (err) {
      const errorDB = ERRORS_DB[err.code];

      if (errorDB) {
         console.error(`Error DB ==> ${errorDB}`);
      }
   }

   if (connection) { 
      connection.release();
      console.log(`Conectado a la DB ==> ${process.env.DB_NAME}`);
   }
   
   return;
});

client.query = promisify(client.query);

module.exports = {
   client
};
