var dotenv = require('dotenv');

dotenv.load();
  	console.log(" process.env.DATABASE_URL")


module.exports = {
  client: 'mysql',
    connection: 'mysql://b2681ba3a288c8:759dd8c1@us-cdbr-iron-east-04.cleardb.net/heroku_2bbd03a2982c3c6?reconnect=true';

  // connection: process.env.DATABASE_URL || {
  //   host: process.env.DB_HOST,
  //   user: process.env.DB_USER,
  //   password: process.env.DB_PASSWORD || "bakl", 
  //   database: process.env.DB_NAME  //"mega_boil" // process.env.DB_NAME
  // }
};
