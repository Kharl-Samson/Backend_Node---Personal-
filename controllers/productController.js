const asyncHandler = require('express-async-handler')
const Product= require(`../models/productModel`)

// Create Product Controller
const createProduct = asyncHandler( async(req, res) => {
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } 
    catch(error){
        res.status(500)
        throw new Error(error.message)
    }
})

// Get All Products Controller
const getProducts = asyncHandler( async(req, res) => {
    try{
        const products = await Product.find({})
        res.status(200).json(products)
    } 
    catch(error){
        res.status(500)
        throw new Error(error.message)
    }
})

// Get Specific Product Controller
const getProductById = asyncHandler( async(req, res) => {
    try{
        const {id} = req.params
        const product = await Product.findById(id)
        if(!product){
            res.status(404)
            throw new Error(`Cannot find any product with id ${id}`)
        }
        res.status(200).json(product)
    } 
    catch(error){
        res.status(500)
        throw new Error(error.message)
    }
}) 

// Update Product Controller
const updateProductById = asyncHandler( async(req, res) => {
    try{
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        if(!product){
            res.status(404)
            throw new Error(`Cannot find any product with id ${id}`)
        }
        const updateProduct = await Product.findById(id)
        res.status(200).json({
            message : `Product updated successfully`,
            product : updateProduct
        })
    } 
    catch(error){
        res.status(500)
        throw new Error(error.message)
    }
})

// Delete Product Controller
const deleteProductById = asyncHandler( async(req, res) => {
    try{
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            res.status(404)
            throw new Error(`Cannot find any product with id ${id}`)
        }
        res.status(200).json({
            message : `Product deleted successfully`,
            product : product
        })
    } 
    catch(error){
        res.status(500)
        throw new Error(error.message)
    }
})

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById
}