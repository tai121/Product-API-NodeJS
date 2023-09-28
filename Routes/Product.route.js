const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const Product = require('../Models/Product.model')
const mongoose = require('mongoose')
const ProductController = require('../Controllers/Product.Controller')

router.get('/', ProductController.getAllProducts)

router.post('/', ProductController.createAProduct)

router.get('/:id', ProductController.getAProductById)

router.patch('/:id', ProductController.updateAProductById)

router.delete('/:id', ProductController.deleteAProductById)

module.exports = router