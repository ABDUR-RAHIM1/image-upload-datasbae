const express = require("express");
const multer = require("multer")
const mongoose = require("mongoose")
const app = express()
app.use(express.urlencoded({extended : true}))
app.use(express.json())

/// schema 

const imageSchema = mongoose.Schema({
    name : {
        type :String,
        required : true
    },
    image : {
        type :String,
        required : true
    },
})

const Images = mongoose.model("Image", imageSchema)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'image')
    },
    filename: function (req, file, cb) {
      const name = Date.now() + '-' + file.originalname;
      cb(null, name)
    }
  })
  
  const upload = multer({ storage: storage })

app.get("/", (req, res)=>{
     res.sendFile(__dirname + "/view/index.html")
})

app.post("/upload",  upload.single('file'),async (req, res)=>{
    try {
        const newImage = await Images({
            name : req.body.name,
            image : req.file.filename
        })
      await  newImage.save()
        res.send("file is uploaded") 
    } catch (error) {
        res.send(error)
    }
})

/// get image from database
app.get("/all", async(req, res)=>{
    try {
        const image = await Images.find();
        res.json(image)
        
    } catch (error) {
        res.send(error)
    }
})

// error handler 
app.use((req, res, next)=>{
    res.send("Routes Not Found")
})














module.exports = app ; 