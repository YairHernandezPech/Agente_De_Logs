require("dotenv").config()
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const express = require("express")
const app = express()
app.use(bodyParser.json({ limit: '1gb' }));
app.use(bodyParser.urlencoded({ limit: '1gb', extended: true }));
const insertUser = require("./controller/insert.route")


mongoose.connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", ()=>{
    console.log("connection success")
})

app.use("/v1/insert", insertUser)

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running ${process.env.PORT}`)
})