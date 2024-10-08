const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const connectDb = require('./DB/db')
const authController = require('./controllers/authController')

connectDb();
app.use(cors({ origin: process.env.CLIENT_URL })); 

app.use(express.json());

app.use('/api/auth', authController);


app.listen(3000) ? console.log(`Server started in port - ${3000}`): console.log("Server crashed");