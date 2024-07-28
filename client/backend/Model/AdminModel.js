const mongoose= require("mongoose")

const AdminSchema = new mongoose.Schema({

        username:String ,
        password:String,
        
       
 
})

const AdminRegister = mongoose.model("AdminRegister",AdminSchema)

module.exports = AdminRegister