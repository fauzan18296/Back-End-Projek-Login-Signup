import express from 'express';
import db from './config.js'
import bodyParser from 'body-parser';
const app = express();
const encoder = bodyParser.urlencoded({extended:true})
// use body-parser
app.use(encoder)
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

app.post('/signup',(req,res) => {
  const data = {
    name:req.body.username,
    password:req.body.password
  }
 db.query(`INSERT INTO users(username, password) VALUES('${data.name}', '${data.password}')`,(error) => {
    if(error)throw error
    res.redirect('/')
    res.end()
  })
 })

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on ${port}`)
})