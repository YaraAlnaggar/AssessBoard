var dotenv = require('dotenv');

dotenv.load();


module.exports = {
  client: 'mysql',
  connection:  "mysql://$OPENSHIFT_MYSQL_DB_HOST:$OPENSHIFT_MYSQL_DB_PORT/" // process.env.DATABASE_URL ||
   {
    host: process.env.DB_HOST || "127.0.0.1" ,
    user: process.env.DB_USER || "XWLv6dkW_feZ" ,
    password: process.env.DB_PASSWORD ||  "admin64sJGBP" , //"bakl", 
    database: "myapp"  // "mega_boil" // process.env.DB_NAME
  }
};
