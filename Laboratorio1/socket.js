let io = null

async function initialSocket(server) {
    io = require("socket.io")(server)
    return io
}

module.exports = {
    initialSocket,
}