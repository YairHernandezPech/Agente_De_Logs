const users = require("../models/users.models")

async function save(body){
    return await users.create(body)
}


module.exports={
    save
}