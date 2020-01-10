const bcrypt = require("bcryptjs");

function getSaltedPassword(password){
    // Encrypt the password and then return salt and password
    let pass
    bcrypt.genSalt(10, (err,salt)=>{
        if (!err){
            bcrypt.hash(password, salt, (err, hash)=>{
                if (!err){
                    pass = hash
                    console.log("Hash is ",hash)
                }
            })
        }
    })
    return pass
}

function authenticate(username, password){
    //first get the hash and salt from db and store in salt, hash
    let ret = false
    let hash = "$2a$10$HeyvU7rJzcVEsJ/F3FtRIOW3AZI507yiZ7TDBDLDUy2JdyxdfZ1m6"
    bcrypt.compare(password, hash).then((res) =>{
        ret = true
    })
    return ret
}

module.exports.getSaltedPassword = getSaltedPassword;
module.exports.authenticate = authenticate;