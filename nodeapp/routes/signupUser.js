const User = require("../models/registerSchema");
const bcrypt = require("bcryptjs");
module.exports = async (req,res) => {
    const{ name, username, password } = req.body;
    await User.findOne({
        username: username
    },async (err, prev)=>{
        if(err){
            res.send({
                success: "false",
                message: "an error occured"
            })
        }
        else if(prev){
            res.send({
                success: "false",
                message: "username is already taken"
            })
        }
        else{
            const newUser = new User();
            newUser.name = name;
            newUser.username = username;
            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(password, salt);
            await newUser.save();
            res.send({
                success: "true",
                message: "registered successfully"
            })
        }
    }).clone().catch(function(err){ console.log(err)})
}