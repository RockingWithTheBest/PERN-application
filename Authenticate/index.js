import 'dotenv/config';
import express from 'express';
import bodyParser from  'body-parser';
import pkg from 'pg'; // Import the entire pg package
import cors from 'cors'; // Import cors
import bcrypt from 'bcrypt';
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

const PORT =2111;
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
      const {full_name, passport_number} = req.body;
      if(!( full_name && passport_number )){
          res.status(400).send('all fields are compulsory');
      }

      //check if user already
      
      const result = await dbConnect.query("SELECT * FROM \"Clients\" WHERE \"passport_number\" = $1",
        [passport_number]
      )

      if(result.rows.length > 0){
        res.status(400).send('User already exists');
      }

      // encrypt password('passport_number')
      const encrypt =  await bcrypt.hash(passport_number, 10)
      

      //insert user into db
 
      //res.status(200).send('User registered successfully');
      try{
            const client = await dbConnect.query("INSERT INTO \"Clients\" (full_name, passport_number) VALUES ($1, $2) RETURNING*",
            [full_name, passport_number]
        )
            try{
                const userRow = client.rows[0];
                const user = { full_name: userRow.full_name, passport_number: userRow.passport_number}

              //generate a token for client and save it
                const accessToken = generateAccessToken(user);
                const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
                refreshTokens.push(refreshToken)

                //how to keep the token
                  user.token = accessToken;
                  res.status(201).send({user: user, accessToken: accessToken});
            }
            catch(e){
                  console.log('Error', e);
                  res.status(400).send('Problem generating access token');
            }
        res.status(201).json(client.rows[0]);
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

app.post('/login', async (req, res) => {
  const {passport_number} = req.body;

  if(!passport_number){
    res.status(400).send('passport_number is required for login');
    return;
  }
  try{
      const result = await dbConnect.query("SELECT * FROM \"Clients\" WHERE \"passport_number\" = $1",
      [passport_number]
      )

      if(result.rows.length===0){
        return res.status(404).send('User not found');
      }

      if(result.rows[0].passport_number){
        const user = { full_name: result.rows[0].full_name, passport_number: result.rows[0].passport_number}
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

  
  //match passport
  //const encryPass = await bcrypt.compare(passport_number,result.rows[0].passport_number);
  // if(encryPass&& result.rows[0].passport_number){
  //   const user = { full_name: result.rows[0].full_name, passport_number: result.rows[0].passport_number}
  //   const accessToken = generateAccessToken(user);
  //   const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
  //   refreshTokens.push(refreshToken)
  // }

 

      //send token in user cookie
     //cookie section


    //  const options = {
    //   expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    //   httpOnly: true
    // }

    // res.status(200).cookie('Token', accessToken, options).json({
    //   success:true,
    //   message: 'User logged in successfully',
    //   user: user
    // })
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

