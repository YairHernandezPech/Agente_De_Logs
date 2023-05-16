const mongoose = require("mongoose")

const schema = mongoose.Schema
const users = new schema({
    user: {type: String, require: true},
    pass: {type: String, require: true},
    name: {type: String, require: true},
    createdAt: {type: Date, default: Date.now},
})
module.exports = mongoose.model("Users", users)

