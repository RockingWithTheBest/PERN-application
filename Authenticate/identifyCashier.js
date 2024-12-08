import 'dotenv/config'; 
import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import pkg from 'pg';

const {Client} = pkg;

const dbConnect = new Client({
    user:"postgres",
    password:"1790380037",
    host:"127.0.0.1",
    port:"5432",
    database:"CurrencyExchange"
});
async function Connect(){
    try{
        await dbConnect.connect();
        console.log("Db is Connected")
    }
    catch(e){
        console.log("failed to connect error ", e)
    }
  }
Connect();
let refreshTokens =[];
const dataFromDb =[];

async function getData (){
    const results = await dbConnect.query('SELECT * FROM \"Cashiers\"');
    dataFromDb.push(...results.rows);
    console.log("Data successfully gotten from database");
}
getData();

const PORT = 2223;
const app = express();

app.use(express.json());
app.use(cors());

app.get('/identity', authenticationToken, async(req, res) => {
    const results = await dbConnect.query('SELECT * FROM \"Cashiers\"');
    res.send(results.rows.filter(row=>row.password === req.client.password));
});

function authenticationToken (req, res, next) {
    const authHeader = req.headers['authorization']
    try {
        if(authHeader) {
            const token = authHeader.split(' ')[1];     
            if (!token) {
                return res.status(401).send('Access denied. No token provided.');
            }
            else{
                jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, client)=>{
                    if(err) return res.status(403).send('You have a token but its not accessible');
                    req.client = client;
                    next();//move on from middleware
                });
            }
        }
      
        
        
    } catch (err) {
        res.status(403).send('Access denied. Invalid token.');
    }
}


app.post('/tokengenerate', (req, res) => {
    const refreshToken = req.body.refreshToken;
    if(refreshToken==null) {
        return res.status(401).send('Access denied. No refresh token provided.');
    }

    // if(!refreshTokens.includes(refreshToken)){
    //     return res.status(403).send('Access denied. No refresh tokens provided.');
    // }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err,user)=>{
        if(err) return res.sendStatus(403);
        const accessToken = generateAccessToken({password: user.password});
        res.json({accessToken: accessToken});
    })
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'60s'});
}


app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`)
})