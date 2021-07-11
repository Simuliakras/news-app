const express = require('express')
const app = express()
const mongoose = require('mongoose')

//Securing data base connection with dotenv
const dotenv = require('dotenv')
dotenv.config()

//Including routes
const routesUrls = require('./routes/routes')
const cors = require('cors')

//Database connection
mongoose.connect(process.env.DATABASE_ACCESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json())
app.use(cors())
app.use('/articles', routesUrls)
app.listen(8000, () => console.log("server is running!"))