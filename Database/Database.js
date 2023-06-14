const mongoose = require("mongoose");

const mongoUrl = "mongodb+srv://abdur:abdur1@cluster0.kd2rbrb.mongodb.net/TestDb?retryWrites=true&w=majority"


const connectDb = async()=>{
   await mongoose.connect(mongoUrl)
   try {
       console.log("Database Connected")
   } catch (error) {
    console.log("Database not Connected")
   }
}


module.exports = connectDb