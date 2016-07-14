var dotenv = require('dotenv');

dotenv.load();


module.exports = {
  client: 'mysql',
  connection:"mysql://b2681ba3a288c8:759dd8c1@us-cdbr-iron-east-04.cleardb.net/heroku_2bbd03a2982c3c6?reconnect=true"// process.env.DATABASE_URL ||
  //  {
  //   host: process.env.DB_HOST || ,
  //   user: process.env.DB_USER || "XWLv6dkW_feZ" ,
  //   password: process.env.DB_PASSWORD ||  "admin64sJGBP" , //"bakl", 
  //   database: "myapp"  // "mega_boil" // process.env.DB_NAME
  // }
};
