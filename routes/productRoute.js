const express = require(`express`)
const { createProduct, getProducts, getProductById, updateProductById, deleteProductById} = require(`../controllers/productController`)
const router = express.Router()

// Create
router.post(`/`, createProduct)

// Read - All
router.get(`/`, getProducts)

// Read - Specific ID
router.get(`/:id`, getProductById)

// Update
router.put(`/:id`, updateProductById)

// Delete
router.delete(`/:id`, deleteProductById)

module.exports = router