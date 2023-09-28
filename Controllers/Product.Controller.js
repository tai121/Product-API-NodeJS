const Product = require('../Models/Product.model')
const mongoose = require('mongoose')
const createError = require('http-errors')


module.exports = {
    getAllProducts : async (req, res, next) =>{
        try{
            const results = await Product.find().sort({price:-1})
            console.log(results)
            res.send(results)
        }
        catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    createAProduct : async (req, res, next)=> {
        try {
            const product = new Product(req.body)
            const results = await product.save()
            res.send(req.body)
        }
        catch (error) {
            console.log(error.message)
            if(error.name === 'ValidationError'){
                next(createError(422,error.message))
                return
            }
            next(error)
        }
    },
    getAProductById : async(req, res, next)=>{
        const productId = req.params.id
        try {
            const product = await Product.findById(productId)
            if(!product) 
                throw createError(404, 'Product not found')
            else
                res.send(product)
        } catch (error) {
            console.log(error.message)
            if(error instanceof mongoose.CastError)
                next(createError(400,'Bad request'))
            next(error)
        }
    
    },
    updateAProductById : async(req, res, next)=>{
        try {
            const productId = req.params.id
            const update = req.body
            const product = await Product.findByIdAndUpdate(productId,update)
            if(!product) 
                throw createError(404, 'Product not found')
            else
                res.send(product)
        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    deleteAProductById : async (req, res, next)=> {
        const productId = req.params.id
        try {
            const product = await Product.findByIdAndDelete(productId)
            if(!product) 
                throw createError(404, 'Product not found')
            else
                res.send(product)
        } catch (error) {
            console.log(error.message)
            next(error)
        }
    }
}