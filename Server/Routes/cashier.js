import express from 'express';
import pkg from 'pg'; 
const { Client } = pkg; 


const router = express.Router();
const dbConnect = new Client({
    user: "postgres",
    password: "1790380037",
    host: "127.0.0.1",
    port: "5432",
    database: "CurrencyExchange"
}); 

router.get('/', async(req, res)=>{
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

router.post('/', async (req,res)=>{
    try{
        const { fullname } = req.body;
       
        await dbConnect.query(
            "INSERT INTO \"Cashiers\"(full_name) VALUES ($1)",
            [fullname]
        );
        res.json({ status: "success" });
    }
    catch(e){
        console.log("There was an error ", e);
    }
});


router.delete('/', async (req,res)=>{
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



router.put('/',async(req, res)=>{
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

export default router;