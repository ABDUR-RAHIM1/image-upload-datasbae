const app = require("./app");
const connectDb = require("./Database/Database");
const PORT = 8000;

app.listen(PORT , ()=>{
    console.log("Server is running")
    connectDb()
})