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

const dataFromDb =[];

async function getData (){
    const results = await dbConnect.query('SELECT * FROM \"Clients\"');
    dataFromDb.push(...results.rows);
    console.log("Data successfully gotten from database");
}
getData();

const PORT = 1113;
const app = express();

app.use(express.json());
app.use(cors());

app.get('/identity', authenticationToken, async(req, res) => {
    const results = await dbConnect.query('SELECT * FROM \"Clients\"');
    res.send(results.rows.filter(row=>row.passport_number === req.client.passport_number));
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
app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`)
})