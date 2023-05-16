require("dotenv").config()
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const express = require("express")
const Event = require("./models/envent.models");
const { initialSocket } = require("./socket")
const app = express()

app.use(bodyParser.json({ limit: '1gb' }));
app.use(bodyParser.urlencoded({ limit: '1gb', extended: true }));

//Inicializacion
const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is running ${process.env.PORT}`)
})

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

initialSocket(server).then(io => {
// Configurar evento de conexión
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Configurar evento "newUser" para recibir información de usuario
  socket.on('NewEvento', (eventData) => {
    console.log('Evento recibido:', eventData);

    // Guardar el evento en la base de datos
    const newEvent = new Event({
      message: eventData.message,
      level: eventData.level
    });

    newEvent.save()
      .then(() => {
        console.log('Evento guardado en la base de datos');
      })
      .catch((error) => {
        console.error('Error al guardar el evento en la base de datos:', error);
      });
  });
});
})