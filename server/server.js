const express = require('express');
const app = express();

const connectDb = require('./DB/db')

app.use('/api/auth', authController);




app.listen(3000) ? console.log(`Server started in port - ${3000}`): console.log("Server crashed");