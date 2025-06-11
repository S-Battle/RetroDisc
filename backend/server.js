const express = require( 'express');
const pg = require ('pg')
const path = require ('path');
const app = express()
const bcrypt = require("bcrypt");
const port = 3000 || process.env.CONNECT_PORT
const cors = require("cors");
const jwt_SECRET = process.env.SECRET_JWT
const jwt = require('jsonwebtoken');
//const corsOptions = {origin: ["http://localhost:5173"],    
//};
app.use(cors());


const { Client } = require('pg');
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
// app.use(express.static(target));

// app.get('/', async (req, res) =>{  
// res.sendFile(path.join(distFolder, "index.html"));
// })
// app.get('/home', async (req, res) =>{
//   res.sendFile(path.join(distFolder, "index.html"));
// })
// app.get('/cart', async (req, res) =>{
//   res.sendFile(path.join(distFolder, "index.html"));
// })
// app.get('/account', async (req, res) =>{
//   res.sendFile(path.join(distFolder, "index.html"));
// })
// app.get('/checkout', async (req, res) =>{
//   res.sendFile(path.join(distFolder, "index.html"));
// })


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
              email = await decoded.username;  ////RIGHT HERE     
              console.log(user)         ;
              res.status(200).json({message:'success', token: token, email: email});           
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

app.post('/api/add/album', async(req, res)=>{

  const {artistInput, albumInput, priceInput, genreInput, yearInput} = await req.body;
  const data = await client.query("SELECT * FROM artist where artist_name = $1", [artistInput]);
  console.log(data);
  const data2 = await client.query("SELECT * FROM genre WHERE genre_name = $1", [genreInput]);
  console.log(data2);
  const artist_id = await data.rows[0].artist_id;
  const genre_id = await data2.rows[0].genre_id;
  if(genre_id != null && artist_id != null){

    const data3 = await client.query("INSERT INTO album(album_name, artist_id, album_year, album_genre, album_price) VALUES($1,$2,$3,$4,$5)",
      [albumInput,artist_id,yearInput,genre_id,priceInput]);
    if(data3.rowCount > 0){
      res.json("success")
    }
  }
})

app.get('/api/get/all/albums', async(req, res)=>{
  const data = await client.query("SELECT album_id, album_name, art.artist_name, gen.genre_name, album_price, album_year  FROM album alb " + 
                                  "INNER JOIN artist art ON art.artist_id = alb.artist_id INNER JOIN genre gen ON gen.genre_id = alb.album_genre",
                                );
console.log(data.rows);

  if(data.rowCount > 0){
    res.json({message:"success", albums: data.rows});
  }
  else{
    res.json("Sorry, there were no albums")
  }
});

app.post('/api/get/search/albums', async(req, res)=>{
  const { search } = await req.body
  const url = "SELECT alb.album_name, art.artist_name, alb.album_price, alb.album_year, alb.album_id " +
              "FROM album alb " +
              "INNER JOIN artist art " +
              "ON art.artist_id = alb.artist_id " +
              "INNER JOIN genre gen " +
              "ON gen.genre_id = alb.album_genre " +
              "WHERE LOWER(album_name) LIKE LOWER($1) " +
              "OR LOWER(art.artist_name) LIKE LOWER($1) " +
              "OR LOWER(gen.genre_name) LIKE LOWER($1) ";

  const data = await client.query(url, ['%'+search+'%']);
  console.log(data.rows)
  // const findImage = async ()=>{    
  //   console.log("find image");
  //   return "/location/of/image/"
  // }
  // let cdImage = findImage();
  if(data.rowCount > 0){
    res.json({message:'success', result: data.rows })
  }
  else{
    res.json({message:'unsuccessful', result: "NO ALBUMS WERE FOUND"})
  }
});

app.get('/api/get/new/releases', async (req, res)=>{
  let number = 9;
  const url = "SELECT alb.album_name, art.artist_name, alb.album_price, alb.album_year, alb.album_id " +
              "FROM album alb " +
              "INNER JOIN artist art " +
              "ON art.artist_id = alb.artist_id " +
              "INNER JOIN genre gen " +
              "ON gen.genre_id = alb.album_genre " +
              "ORDER BY alb.album_year DESC " +
              "LIMIT $1";
  const data = await client.query(url, [number]);
  console.log(data.rows)
  if(data.rowCount > 0){
    res.json({message:'success', result: data.rows})
  }
  else{
    res.json({message:'unsuccessful', result: "NO ALBUMS WERE FOUND"})
  }


})


app.get('/api/get/all/users', async(req, res)=>{
  const data = await client.query("SELECT user_id, email FROM users",);
                                
console.log(data.rows);

  if(data.rowCount > 0){
    res.json({message:"success", users: data.rows});
  }
  else{
    res.json("Sorry, there were no users")
  }
});

app.get('/api/album/random', async (req, res) => {
  try {
      const result = await client.query(`
            SELECT alb.album_name, art.artist_name, alb.album_price, alb.album_year, alb.album_id  
              FROM album alb 
              INNER JOIN artist art 
              ON art.artist_id = alb.artist_id 
              INNER JOIN genre gen
              ON gen.genre_id = alb.album_genre
              ORDER BY RANDOM()
              LIMIT 15;
      `);
      console.log(result.rows);
      res.json({ album: result.rows });
      
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
  }
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
