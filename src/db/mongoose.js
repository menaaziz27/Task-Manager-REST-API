const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true
})

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Not a valid email!")
      }
    }
  },
  password: {
    type: String,
    require: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password string must be not exist in your password")
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number')
      }
    },
  },
});

const Task = mongoose.model('Task', {
  description: {
    type: String,
    required: true,
    trim: true,

  },
  completed: {
    type: Boolean,
    default: false
  }
})

// const me = new User({
//   name: 'Natali',
//   email: "natali@gmail.com",
//   password: "    pas    ",
//   age: 27
// });

const task = new Task({
  description: ' Eat lunch'
})

task.save().then(() => {
  console.log(task);
}).catch((err) => {
  console.log(err)
})

