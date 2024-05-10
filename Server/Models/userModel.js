const mongoose = require('mongoose')

const RegisterSchema = new mongoose.Schema({
    name: String,
    password:String
   
})
const usersModel = mongoose.model("User", RegisterSchema);




module.exports = usersModel