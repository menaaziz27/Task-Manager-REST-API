const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: [true, "A description is required"],
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = Task
