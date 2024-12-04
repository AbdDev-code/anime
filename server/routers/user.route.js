const {Router} =require('express')
const router = Router()
const {getAllUser,createUser} = require("../controllers/user.controller")
router.get("/", getAllUser)
router.post('/create',createUser)

module.exports =router