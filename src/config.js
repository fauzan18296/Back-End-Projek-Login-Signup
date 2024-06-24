import  mysql from'mysql';
const database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'login',
})
database.connect((err) => {
  if (err) {
    console.log("Database Connection Failed");
  } else {
    console.log('Database Connected');
  }
})
export default database;