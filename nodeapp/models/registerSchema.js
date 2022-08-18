const Mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const registerSchema = new Mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    username: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        default: ""
    }
});

registerSchema.methods.generateHash = async (password)=>{
    password=password.toString();
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
};
registerSchema.methods.validPassword = (password)=>{
    return bcrypt.compareSync(password,this.password);
};

module.exports = Mongoose.model('Users',registerSchema);