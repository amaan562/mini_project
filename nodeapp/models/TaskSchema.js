const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    username: {
        type: String,
        default: null
    },
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