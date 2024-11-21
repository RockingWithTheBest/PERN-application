import express from 'express';
import bodyParser from  'body-parser';
import pkg from 'pg'; // Import the entire pg package
import cors from 'cors'; // Import cors

const { Client } = pkg; // Destructure Client from the imported package


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
      const currentData = await dbConnect.query("SELECT * FROM \"Clients\"");
      console.log(currentData.rows)
      res.json(currentData.rows);
      //check if user already
  }
  catch(err){
    console.log('ERROR', err);
  }
});







app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

