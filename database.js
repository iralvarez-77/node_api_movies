import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  // host: process.env.NODE_ENV === 'production' 
  //   ? process.env.HOST_DB_PROD : process.env.HOST_DB,
  host: process.env.HOST_DB_DOCKER,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.NAME_DB,
  waitForConnections: true,
  connectionLimit: 10, 
  queueLimit: 0
});

console.log("✅ MySQL pool is ready");

export default pool;