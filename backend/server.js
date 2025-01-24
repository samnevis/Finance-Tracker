require("dotenv").config()
const mongoose = require("mongoose")
const express = require('express')
const financeRoutes = require('./routes/finances')

// express app
const app = express()

app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/finances', financeRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen((process.env.PORT), () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error)=>{console.log(error)})

//listen for requests
