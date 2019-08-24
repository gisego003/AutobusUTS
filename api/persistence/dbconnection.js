const mongoose = require("mongoose");

const connectionString = "mongodb://127.0.0.1:27017/AutobusUTS";
                        //  "mongodb://127.0.0.1:27017/CarritoCompras";

mongoose.connect(connectionString,{
    useNewUrlParser: true,
    autoIndex:true,
    useCreateIndex:true
});

mongoose.connection.on("connected", ()=> console.log("Mongo connected"));
mongoose.connection.on("open", ()=> console.log("Connection success"));
mongoose.connection.on("disconnected", ()=> console.log("Mongo disconnected"));
mongoose.connection.on("error", ()=> console.log("Mongo error"));