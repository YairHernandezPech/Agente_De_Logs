let io = null

async function initialSocket(server) {
    io = require("socket.io")(server)
    return io
}

// async function SendEvent() {
//     return io
// }

module.exports = {
    initialSocket,
    //getSocket
}