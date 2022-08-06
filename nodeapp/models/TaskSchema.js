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
    },
    completed: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        default: "Low"
    }
}); 

module.exports = mongoose.model('Tasks',taskSchema);