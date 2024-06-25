import express from 'express';
import db from './config.js'
import bodyParser from 'body-parser';
const app = express();

// use body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
// static file
app.use(express.static('public'));
// template engine set ejs template
app.set('view engine', 'ejs');
// get route login and render file login.ejs
app.get('/', (req, res) => {
res.render('login');
})
// get route signup and render file signup.ejs
app.get('/signup', (req, res) => {
res.render('signup');
})

app.post('/signup',async (req,res) => {
  const data = {
    name:await req.body.username,
    password:await req.body.password
  }
// Membuat query SELECT * FROM users WHERE username AND password agar tidak ada duplicate username dan password
db.query(`SELECT * FROM users WHERE username = '${data.name}' AND password = '${data.password}' `,(err,results) => {
  if(err)throw Error;
  if(results.length > 0) res.status(409).json({Message: "Nama pengguna sudah ada!"})

    // Membuat query INSERT untuk menambahkan username dan password jika tidak ada isi yang sama atau duplicate
db.query(`INSERT INTO users(username, password) VALUES('${data.name}', '${data.password}')`,(error) => {
  if(error)throw Error;
  res.redirect("/")
  })//end query INSERT
})//end query SELECT * FROM users WHERE username AND password 
  })//end line http method post

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on ${port}`)
})