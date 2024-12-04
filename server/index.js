const express = require("express")
const app = express()
require('colors')
require("dotenv").config()
const cors =require('cors')
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())


// Router 
app.use('/api/v1/user', require('./routers/user.route'))
const PORT = process.env.PORT || 3000
app.listen(PORT, (err)=>{
    if(err) throw Error("Serverda Xatolik")
        console.log(`Listen PORT ${PORT}`.bgBlue)
})