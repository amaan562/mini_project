const User = require("../models/registerSchema");
const bcrypt = require("bcryptjs");
module.exports = async (req,res) => {
    const{ username, password } = req.body;
    await User.findOne({
        username: username
    },async function(err, prev){
        if(err){
            res.send({
                success: "false",
                message: "an error occured"
            })
        }
        else if(!prev){
            res.send({
                success: "false",
                message: "invalid username"
            })
        }
        else{
            const validPassword = await bcrypt.compare(password, prev.password);
            if(validPassword){
                res.send({
                    success: "true",
                    message: "logged in successfully"
                })
            }
            else{
                res.send({
                    success: "false",
                    message: "password mismatch"
                })
            }
        }
    }).clone().catch(function(err){ console.log(err)})
}