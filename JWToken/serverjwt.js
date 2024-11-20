// require('dotenv').config();
import 'dotenv/config'; 
import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';


const PORT = 1111;
const app = express();
const posts = [
    {name: 'Kyle', title: 'Post 1', content: 'This is post 1'},
    {name: 'Jim', title: 'Post 2', content: 'This is post 2'},
    {name: 'Clyde', title: 'Post 3', content: 'This is post 3'}
]
app.use(express.json());
app.use(cors()); 
app.get('/posts', authenticationToken, (req, res) =>{
    res.send(posts.filter(post => post.name === req.user.username))
});



function authenticationToken(req, res, next) {
    //BEARER Token
    const authHeader = req.headers['authorization'];    
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if(token===null){
            return res.sendStatus(401);
        }
        else{
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) return res.sendStatus(403);//you have a token but its not accessible
                req.user = user;
                next();
            });
        }
       
    } else {
        return res.sendStatus(401);
    }
}
app.listen(PORT);