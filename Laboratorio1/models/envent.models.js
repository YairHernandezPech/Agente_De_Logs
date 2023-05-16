const mongoose = require("mongoose")

const schema = mongoose.Schema
const event = new schema({
    message: {type: String, require: true},
    level: {type: String, require: true}
})
module.exports = mongoose.model("Event", event)

