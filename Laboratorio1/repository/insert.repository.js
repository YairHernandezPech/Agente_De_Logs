const users = require("../models/envent.models")

async function save(body){
    return await users.create(body)
}


module.exports={
    save
}