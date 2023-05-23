const express = require("express")
const routes = express.Router()
const { saveUser } = require("../services/insert.services")

routes.post("/", async (req, res) => {
    try {
        let { body } = req
        let user = await saveUser(body)
        res.status(201).send({ msg: "Se agrego correctamente", body})
        console.log(body)
    } catch (error) {
        res.status(500).send({ msg: "Ha habido un problema" })
    }
})

module.exports = routes