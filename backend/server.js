const express = require( 'express');
const pg = require ('pg')
const path = require ('path');
const app = express()
const bcrypt = require("bcrypt");
const port = 3000
const cors = require("cors");
const jwt_SECRET = "secret"
const jwt = require('jsonwebtoken');
//const corsOptions = {origin: ["http://localhost:5173"],    
//};
app.use(cors());


const {Client } = require('pg');
const client = new Client({  
  connectionString: process.env.PG_URL,
ssl:{
  rejectUnauthorized: false
}
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
app.get('/cart', async (req, res) =>{
  res.sendFile(path.join(distFolder, "index.html"));
})
app.get('/account', async (req, res) =>{
  res.sendFile(path.join(distFolder, "index.html"));
})
app.get('/checkout', async (req, res) =>{
  res.sendFile(path.join(distFolder, "index.html"));
})


app.get('/api', (req, res)=>{    
    res.json({fruits: ["apple", "orange", "banana"]})
})


app.post("/api/login", async (req, res)=>{
  const {email, password} = req.body;  
  const attempt = await client.query("SELECT * FROM users WHERE email = $1",
    [email.toLowerCase()]
  )
  if(attempt.rowCount > 0){
    const userInfo = await attempt.rows[0];
    const targetPass = await attempt.rows[0].password;
    bcrypt.compare(password, targetPass, (error, result)=>{
      if(error){
        
        res.json("error made in hashing")
        return
      }
      else{
             
        if(result){
          
          const token = jwt.sign({username : email}, jwt_SECRET,{expiresIn: '1h'})                  
          res.status(200).json({message:'success', token: token, email: email});
        }
        else{          
          res.json('Incorrect Password')
        }
      }
    });   
  }
  else{
    res.json("Email not registered in system")
  }
});


app.post("/api/register", async (req, res)=>{
  const {email, password} = await req.body; 
  const attempt = await client.query("SELECT * FROM users WHERE email = $1",
    [email.toLowerCase()]
  )
  try{
    if(attempt.rowCount > 0){      
      res.json('This email address has already been registered.');      
    }
    else{
      const hash = await bcrypt.hash(password, Number (process.env.SALT_ROUNDS_NUMBER));
        
      const result = await client.query("INSERT INTO users(email, password) VALUES ($1, $2)",
      [email.toLowerCase(), hash]);  
      const token = jwt.sign({username : email}, jwt_SECRET, {expiresIn: '1h'})
                  
      res.status(200).json({message: "success", token: token});           
        
            
    }     
  }catch(e){
    
  }
});
app.post("/api/token/verify", async (req, res)=>{
  const {authorization} = req.headers 
  const token = authorization.slice(7) 
  console.log(token) 
  let user = "";
      try{
        jwt.verify(`${token}`, jwt_SECRET, async (err, decoded)=>{
            if(err){
              console.log("error made")
              res.json(err) 
            }
            else{
              user = await decoded.username;  ////RIGHT HERE     
              console.log(user)         ;
              res.status(200).json({message:'success', token: token, user: user});           
            }
          });
      }catch(e){  
      }     
});
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
app.get('/api/getalbum/:artist', async(req, res)=>{
  const { artist } = req.params;
  const data = await client.query("SELECT * FROM album join artist on artist.artist_id = album.artist_id WHERE artist.artist_name = $1", [artist]);
  if(data.rowCount > 0){
    res.json({message:"success", albums: data.rows});
  }
  else{
    res.json("Sorry, there were no albums, try another name")
  }
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})