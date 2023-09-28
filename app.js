const express = require('express')
const mongoose = require('mongoose')
const app = express()
const createError = require('http-errors')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

require('./initDB')()

const ProductRoute = require('./Routes/Product.route')
app.use('/products',ProductRoute)

app.use((req, res, next)=>{
    next(createError(404, 'Not Found'));
})

app.use((err, req, res, next)=>{
    // res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})
const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log('Hi there')
})