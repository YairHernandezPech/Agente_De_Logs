require("dotenv").config()
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const express = require("express")
const socketIOClient = require("socket.io-client")
const User = require("./models/users.models")
const app = express()


app.use(bodyParser.json({ limit: '1gb' }));
app.use(bodyParser.urlencoded({ limit: '1gb', extended: true }));

//Inicializacion
app.listen(process.env.PORT, ()=>{
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


// Configurar endpoint "/users" para recibir y guardar información de usuario
app.post('/users', (req, res) => {
  const payload = req.body;

  console.log(payload);

  // Guardar la información del usuario en la base de datos
  const newUser = new User({
    user: payload.user,
    pass: payload.pass,
    name: payload.name
  });

  newUser.save()
    .then(() => {
      console.log('Usuario guardado en la base de datos');

      // Conectarse al WebSocket y emitir el evento con la información del usuario
      const socket = socketIOClient('http://localhost:3000');

      const eventData = {
        message: 'Nuevo usuario registrado',
        level: 'info'
      };

      socket.emit("NewEvento", eventData, {msg:"Se agrego un nuevo Usuario"})

      res.status(200).json({ message: 'Usuario guardado' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Error al guardar el usuario' });
    });
});
