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


const app = express();
const port = 9000;

app.use(bodyParser.json()); 


app.use(cors()); // This will allow all origins// Use CORS middleware



app.post('/get', async (req,res)=>{
    try{
        const { fullname, passportNumber } = req.body;
       
        await dbConnect.query(
            "INSERT INTO \"Clients\"(full_name, passport_number) VALUES ($1, $2)",
            [fullname, passportNumber]
        );
        res.json({ status: "success" });
    }
    catch(e){
        res.json({ e });
        console.log("There was an error ", e);
    }
})

app.get('/get/:id', async (req,res)=>{
    try{
        const { id } = req.params;
        const results = await dbConnect.query("SELECT * FROM \"Clients\" WHERE id=$1", [id]);
        res.json(results.rows[0]);
    }
    catch(e){
        console.log("There was an error ", e);
    }
});


app.delete('/get/:id', async (req,res)=>{
    try{
        const { id } = req.params;
        await dbConnect.query(
            "DELETE FROM \"Clients\" WHERE id=$1",
            [id]
        );
        res.json({ status: "success" });
    }
    catch(e){
        console.log("There was an error ", e);
    }
});


app.put('/get/:id', async (req,res)=>{
    try{
        const { id } = req.params;
        const { fullname, passportNumber } = req.body;
        await dbConnect.query(
            "UPDATE \"Clients\" SET full_name=$1, passport_number=$2 WHERE id=$3",
            [fullname, passportNumber, id]
        );
        res.json({ status: "success" });
    }
    catch(e){
        console.log("There was an error ", e);
    }
});

//Pag
app.get("/pagnation", async (req, res)=>{
    const page = parseInt(req.query.page) || 1;//Page number
    const limit = parseInt(req.query.limit)||10;//Quantity of records
    const offset = (page-1)*limit;

    try{
        const results = await dbConnect.query(
            "SELECT * FROM \"Clients\" LIMIT $1 OFFSET $2",
            [limit, offset]
        );
        res.json(results.rows);
    }
    catch (e) {
        console.log("There was an error", e);
    }
});


//Sort
app.get("/sort", async (req, res)=>{
    const sortBy = req.query.sortBy||'id';
    const sortOrder = req.query.sortBy ==='desc'?'DESC':'ASC';

    try{
        const results = await dbConnect.query(
            "SELECT * FROM \"Clients\" ORDER BY $1 $2",
            [sortBy, sortOrder]
        );
        res.json(results.rows);
    }
    catch (e) {
        console.log("There was an error", e);
    }
});

//Filter
app.get('/get', async (req, res) => { 
    const { fullname, passportNumber, sortBy,sortOrder } = req.query;

    let query = `SELECT * FROM "Clients" WHERE true`; // `true` allows for conditional appending
    const params = [];
    
    if (fullname) {
        params.push(`%${fullname}%`);
        query += ` AND full_name ILIKE $${params.length}`; // Case-insensitive
    }
    if (passportNumber) {
        params.push(`%${passportNumber}%`);
        query += ` AND passport_number ILIKE $${params.length}`;
    }


    if(sortBy){
        const dataSort = ['full_name', 'passport_number'];
        if(dataSort.includes(sortBy)){
            let order;
            if(sortOrder === 'desc'){
                order = 'DESC';
            }
            else{
                order = 'ASC';
            }
            query += ` ORDER BY ${sortBy} ${order}`;
        }
        else {
            return res.status(400).json({ error: "Invalid sort field" });
        }
    }

    try {
        const results = await dbConnect.query(query,params);
        res.json(results.rows);
    } catch (e) {
        console.log("There was an error", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});






//CASHIER
app.get('/cashier', async(req, res)=>{
    const { fullname, sortBy,sortOrder } = req.query;

    let query = `SELECT * FROM "Cashiers" WHERE true`; // `true` allows for conditional appending
    const params = [];
    
    if (fullname) {
        params.push(`%${fullname}%`);
        query += ` AND full_name ILIKE $${params.length}`; // Case-insensitive
    }
   

    if(sortBy){
        const dataSort = ['full_name'];
        if(dataSort.includes(sortBy)){
            let order;
            if(sortOrder === 'desc'){
                order = 'DESC';
            }
            else{
                order = 'ASC';
            }
            query += ` ORDER BY ${sortBy} ${order}`;
        }
        else {
            return res.status(400).json({ error: "Invalid sort field" });
        }
    }

    try {
        const results = await dbConnect.query(query,params);
        res.json(results.rows);
    } catch (e) {
        console.log("There was an error", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/cashier', async (req,res)=>{
    try{
        const { fullname } = req.body;
       
        await dbConnect.query(
            "INSERT INTO \"Cashiers\"(full_name) VALUES ($1)",
            [fullname]
        );
        res.json({ status: "success" });
    }
    catch(e){
        res.json({ status: "There was an error" });
        console.log("There was an error ", e);
    }
});
app.delete('/cashier/:id', async (req,res)=>{
    try{
        const { id } = req.params;
        await dbConnect.query(
            "DELETE FROM \"Cashiers\" WHERE id=$1",
            [id]
        );
        res.json({ status: "success" });
    }
    catch(e){
        console.log("There was an error ", e);
    }
});
app.put('/cashier/:id',async(req, res)=>{
    try{
        const { id } = req.params;
        const { fullname } = req.body;
        await dbConnect.query(
            "UPDATE \"Cashiers\" SET full_name=$1 WHERE id=$2",
            [fullname, id]
        );
        res.json({ status: "success" });
    }
    catch(e){
        console.log("There was an error ", e);
    }
})


//Currency
app.get('/currency', async (req, res) => {
    const { currency_name, selling_rate , buying_rate, sortBy , sortOrder } = req.query;

    let query = `SELECT * FROM "Currencies" WHERE true`; // `true` allows for conditional appending
    const params = [];
    
    if (currency_name) {
        params.push(`%${currency_name}%`);
        query += ` AND currency_name ILIKE $${params.length}`; // Case-insensitive
    }
    if (selling_rate) {
        params.push(selling_rate);
        query += ` AND selling_rate ILIKE $${params.length}`;
    }
    if (buying_rate) {
        params.push(buying_rate);
        query += ` AND buying_rate ILIKE $${params.length}`;
    }


    if(sortBy){
        const dataSort = ['currency_name', 'selling_rate', 'buying_rate'];
        if(dataSort.includes(sortBy)){
            let order;
            if(sortOrder === 'desc'){
                order = 'DESC';
            }
            else{
                order = 'ASC';
            }
            query += ` ORDER BY ${sortBy} ${order}`;
        }
        else {
            return res.status(400).json({ error: "Invalid sort field" });
        }
    }

    try {
        const results = await dbConnect.query(query,params);
        res.json(results.rows);
    } catch (e) {
        console.log("There was an error", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/currency', async (req,res)=>{
    try{
        const { currency_name, selling_rate, buying_rate } = req.body;
       
        await dbConnect.query(
            "INSERT INTO \"Currencies\"(currency_name, selling_rate, buying_rate) VALUES ($1, $2,$3)",
            [currency_name, selling_rate, buying_rate]
        );
        res.json({ status: "success" });
    }
    catch(e){
        console.log("There was an error ", e);
    }
})

app.get('/currency/:id', async (req,res)=>{
    try{
        const { id } = req.params;
        const results = await dbConnect.query("SELECT * FROM \"Currencies\" WHERE id=$1", [id]);
        res.json(results.rows[0]);
    }
    catch(e){
        console.log("There was an error ", e);
    }
});

app.delete('/currency/:id', async (req,res)=>{
    try{
        const { id } = req.params;
        await dbConnect.query(
            "DELETE FROM \"Currencies\" WHERE id=$1",
            [id]
        );
        res.json({ status: "success" });
    }
    catch(e){
        console.log("There was an error ", e);
    }
});

app.put('/currency/:id', async (req,res)=>{
    try{
        const { id } = req.params;
        const { currency_name, selling_rate, buying_rate } = req.body;
        await dbConnect.query(
            "UPDATE \"Currencies\" SET currency_name=$1, selling_rate=$2, buying_rate = $3 WHERE id=$4",
            [currency_name, selling_rate,buying_rate, id]
        );
        res.json({ status: "success" });
    }
    catch(e){
        console.log("There was an error ", e);
    }
});


///Transactions
app.get('/transaction', async (req, res) => {
    const { sold_currency_code, bought_currency_code , cashier_id,client_id ,transaction_date,transaction_time,sold_amount,bought_amount,sortBy , sortOrder } = req.query;

    let query = `SELECT * FROM "Transactions" WHERE true`; // `true` allows for conditional appending
    const params = [];
    
    if (sold_currency_code) {
        params.push(`%${sold_currency_code}%`);
        query += ` AND sold_currency_code ILIKE $${params.length}`; // Case-insensitive
    }
    if (bought_currency_code) {
        params.push(`%${bought_currency_code}%`);
        query += ` AND bought_currency_code ILIKE $${params.length}`;
    }
    if (cashier_id) {
        params.push(cashier_id);
        query += ` AND cashier_id ILIKE $${params.length}`;
    }
    if (client_id) {
        params.push(cashier_id);
        query += ` AND client_id ILIKE $${params.length}`;
    }
    if (transaction_date) {
        params.push(cashier_id);
        query += ` AND transaction_date ILIKE $${params.length}`;
    }
    if (transaction_time) {
        params.push(cashier_id);
        query += ` AND transaction_time ILIKE $${params.length}`;
    }
    if (sold_amount) {
        params.push(cashier_id);
        query += ` AND sold_amount ILIKE $${params.length}`;
    }
    if (bought_amount) {
        params.push(cashier_id);
        query += ` AND bought_amount ILIKE $${params.length}`;
    }


    if(sortBy){

        const dataSort = ['sold_currency_code', 'bought_currency_code', 'client_id', 'transaction_date','transaction_time', 'sold_amount', 'bought_amount'];
        if(dataSort.includes(sortBy)){
            let order;
            if(sortOrder === 'desc'){
                order = 'DESC';
            }
            else{
                order = 'ASC';
            }
            query += ` ORDER BY ${sortBy} ${order}`;
        }
        else {
            return res.status(400).json({ error: "Invalid sort field" });
        }
    }

    try {
        const results = await dbConnect.query(query,params);
        res.json(results.rows);
    } catch (e) {
        console.log("There was an error", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.post('/transaction', async (req,res)=>{
    try{
        const { sold_currency_code, bought_currency_code , cashier_id , client_id , transaction_date , transaction_time, sold_amount , bought_amount } = req.body;
       
        await dbConnect.query(
            "INSERT INTO \"Transactions\"(sold_currency_code, bought_currency_code, cashier_id, client_id, transaction_date, transaction_time, sold_amount, bought_amount) VALUES ($1, $2,$3, $4 , $5, $6, $7, $8)",
            [sold_currency_code, bought_currency_code, cashier_id, client_id, transaction_date, transaction_time, sold_amount, bought_amount]
        );
        res.json({ status: "success" });
    }
    catch(e){
        console.log("There was an error ", e);
    }
})
app.listen(port,()=>{
    console.log(`Server is Running on http://localhost:${port}`);
})