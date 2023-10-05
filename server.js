require('dotenv').config()
const express = require(`express`)
const mongoose = require(`mongoose`)
const productRoute = require(`./routes/productRoute`)
const errorMiddleware = require(`./middleware/errorMiddleware`)
const cors = require('cors')

const app = express()

// Variables From ENV file
const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL

const corsOptions = {
    origin: 'http://example.com', // Front end url (It should be on your)- Make it array if multiple domain like this ['http://example1.com','http://example2.com']
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// What type of value we are sending fromm backend
app.use(express.json())
// Middleware
app.use(errorMiddleware)
// Cors - Middleware
app.use(cors(corsOptions))

// Routes
app.get(`/`, (req, res) => {
    res.send(`Hello Node Api`)
})
app.get(`/blog`, (req, res) => {
    res.send(`Hello Blog`)
})

// Routes - With Middleware
app.use(`/api/products`, productRoute)

mongoose.connect(MONGO_URL).then(() => {    
    console.log(`Connected to MongoDB`)
    app.listen(PORT, () => {
        console.log(`Node API app is running on port ${PORT}`)
    })
}).catch((error) => {
    console.log(error)
})