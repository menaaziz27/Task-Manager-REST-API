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
  }
})

module.exports = Task