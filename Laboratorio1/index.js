require("dotenv").config()
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const express = require("express")
const { initialSocket } = require("./socket")
const {save } = require("./repository/insert.repository")
const app = express()

app.use(bodyParser.json({ limit: '1gb' }));
app.use(bodyParser.urlencoded({ limit: '1gb', extended: true }));


//Conexion a mongo db
mongoose.connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", ()=>{
    console.log("Conexion a mongo db exitosa")
})

const server = app.listen(process.env.PORT, ()=>{
  console.log(`Server is running ${process.env.PORT}`)
})

initialSocket(server).then(io => {
// Configurar evento de conexión
io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

  // Configurar evento "newUser" para recibir información de usuario
  socket.on('agentsLogs', async (body) => {
    console.log('Evento recibido:', body);
    return await save(body)
  });
});
})