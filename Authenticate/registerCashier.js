import 'dotenv/config';
import express from 'express';
import bodyParser from  'body-parser';
import pkg from 'pg'; // Import the entire pg package
import cors from 'cors'; // Import cors


import jwt from 'jsonwebtoken';
import cookieParser  from 'cookie-parser';

const { Client } = pkg; // Destructure Client from the imported package

let refreshTokens =[];
const dbConnect = new Client({
    user: "postgres",
    password: "1790380037",
    host: "127.0.0.1",
    port: "5432",
    database: "CurrencyExchange"
}); 
async function Connect(){
  try{
      await dbConnect.connect();
      console.log("Connected")
  }
  catch(e){
      console.log("failed to connect error ", e)
  }
}
Connect()

const PORT =2222;
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());  
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello, World!');
});



app.post('/register', async(req, res) => {
  try{
    //get all data from body
      const {full_name, password} = req.body;
      if(!( full_name && password)){
          res.status(400).send('all fields are compulsory');
      }

      //check if user already
      
      const result = await dbConnect.query("SELECT * FROM \"Cashiers\" WHERE \"password\" = $1",
        [ password]
      )

      if(result.rows.length > 0){
        res.status(400).send('User already exists');
      }

      // encrypt password('passport_number')
      const encrypt =  await bcrypt.hash( password, 10)
      

      //insert user into db
      try{
            const cashier = await dbConnect.query("INSERT INTO \"Cashiers\" (full_name, password) VALUES ($1, $2) RETURNING*",
            [full_name, password]
        )
            try{
                const userRow = cashier.rows[0];
                const user = { full_name: userRow.full_name, password: userRow.password}

              //generate a token for client and save it
                const accessToken = generateAccessToken(user);
                const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
                refreshTokens.push(refreshToken)
              

                //how to keep the token
                  user.accessToken = accessToken;
                  res.status(201).send({user: user, accessToken: accessToken, refreshToken: refreshToken});
            }
            catch(e){
                  console.log('Error', e);
                  res.status(400).send('Problem generating access token');
            }
        res.status(201).json(cashier.rows[0]);
      }
      catch(e){
          console.log('Error', e);
          res.status(400).send('Database problem inserting');
      }
      
  }
  catch(err){
    console.log('ERROR', err);
  }
});

app.get('/data', async (req, res) => {
    try{
        const result = await dbConnect.query("SELECT * FROM \"Cashiers\"");
        res.json(result.rows);
    }
    catch(e){
        console.log("There was an error ", e);
    }
})


app.post('/login', async (req, res) => {
    const {password} = req.body;
    if(!password){
      res.status(400).send('password is required for login');
      return;
    }
    try{
        const result = await dbConnect.query("SELECT * FROM \"Cashiers\" WHERE \"password\" = $1",
        [password]
        )

        if(result.rows.length===0){
          return res.status(404).send('User not found');
        }

        if(result.rows[0].password){
          const user = { full_name: result.rows[0].full_name, password: result.rows[0].password}
          const accessToken = generateAccessToken(user);
          const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
          refreshTokens.push(refreshToken)

          res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken})
        }
  }
  catch(err){
      console.log('ERROR', err);
      res.status(400).send('Database problem with login');
  }

})


function generateAccessToken(user) {
  return jwt.sign(
    user, //payload
    process.env.ACCESS_TOKEN_SECRET, {expiresIn:'20s'}//secret
  );
}





app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

