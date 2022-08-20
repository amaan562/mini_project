const registerModel = require("../models/registerSchema");

module.exports = async (req, res) => {
    const username = req.params.username;
    const {name} = await registerModel.findOne({username : username});
    console.log("****"+name);
    res.send(name);
}