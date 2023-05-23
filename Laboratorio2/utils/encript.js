const bcrypt = require("bcrypt")

function encriptpassword(password, salt = 10) {
    const promise = new Promise((resolve, reject) => {
        bcrypt.hash(password,salt,(error,hash)=>{
            if (error) {
                reject("Es imposible encriptar el password")
            }else{
                resolve(hash)
            }
        })
    })
    return promise
}
module.exports={
    encriptpassword
}