var dotenv = require('dotenv');

dotenv.load();


module.exports = {
  client: 'pg', // 'mysql' for later use
  connection:  { // process.env.DATABASE_URL
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || "bakl", 
    database: process.env.DB_NAME // "mega_boil"
  }
};
