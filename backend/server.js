const express = require( 'express');
const pg = require ('pg')
const path = require ('path');
const app = express()
const bcrypt = require("bcrypt");
const port = 3000
const cors = require("cors");
//const corsOptions = {origin: ["http://localhost:5173"],    
//};
app.use(cors());


const {Client } = require('pg');
const client = new Client({
user: 'postgres',
password: 'password',
host: 'localhost',
port: 5432,
database: 'retrodisc', 
})
client.connect();



app.use(express.json())
const target = path.resolve(__dirname, '../','frontend','retro_disc','dist');
console.log(target);
//app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(target));

app.get('/', async (req, res) =>{
res.sendFile(path.join(distFolder, "index.html"));
})
app.get('/home', async (req, res) =>{
  res.sendFile(path.join(distFolder, "index.html"));
})
app.get('/about', async (req, res) =>{
  res.sendFile(path.join(distFolder, "index.html"));
})
app.get('/appointments', async (req, res) =>{
  res.sendFile(path.join(distFolder, "index.html"));
})
app.get('/socialMedia', async (req, res) =>{
  res.sendFile(path.join(distFolder, "index.html"));
})

app.get('/', async (req, res) =>{
res.sendFile('/public/index.html');
})

app.get('/api', (req, res)=>{
    console.log(req);
    res.json({fruits: ["apple", "orange", "banana"]})
})

app.post('/api/hash', async (req, res) =>{

  const { email, password } = await req.body;

  console.log('THIS IS THE PASSWORD', password);

  bcrypt.hash(password, 10, async(error, hash)=>{

    if(error){
      res.json('Hashing Error');
    }
    else{
      console.log('THIS IS THE HASHED PASSWORD: ', hash)
      res.json(hash);

      const result = await client.query('INSERT INTO users(email, password) VALUES($1, $2)',[email, hash])
      console.log(result); 
    }
  })




})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})