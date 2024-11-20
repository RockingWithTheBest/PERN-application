// require('dotenv').config();
import 'dotenv/config'; 
import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';


const PORT = 1112;
const app = express();

app.use(express.json());
app.use(cors()); 
let refreshTokens =[];
app.post('/token', (req, res) => {
    console.log(req.body);
    const refreshToken = req.body.token;
    if (refreshToken === null) 
        return res.status(401).send('Access denied. No refresh token provided.');

    if(!refreshTokens.includes(refreshToken)) 
        return res.status(403).send('Access denied. No refresh token provided.');

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({username: user.username});
        res.json({accessToken: accessToken});
    })
});
app.post('/login', (req, res) =>{
    const username = req.body.name;
    const user = {username: username}

    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken);
    res.json({accessToken: accessToken, refreshToken: refreshToken});
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'40s'});
}
app.listen(PORT);