const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    scheduled_date: {
        type: Date,
        default: undefined
    },
    creation_date: {
        type: Date,
        default: undefined
    }
}); 

module.exports = mongoose.model('Tasks',taskSchema);