require("dotenv").config()
const {save } = require("../repository/insert.repository")
const { encriptpassword } = require("../utils/encript")
const socketIOClient = require("socket.io-client")

async function saveUser(body) {
    try {
        let pass = await encriptpassword(body.pass)
        body.pass = pass
        // Conectarse al WebSocket y emitir el evento con la información del usuario
        const socket = socketIOClient(`http://localhost:${process.env.SOCKET_PORT}`);
        const eventData = {
            message: 'Nuevo usuario registrado',
            level: 'Winston'
        };
        socket.emit("agentsLogs", eventData, { msg: "Se agrego un nuevo Usuario" })
        return await save(body)
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    saveUser
}