const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})




// const me = new User({
//   name: 'Natali',
//   email: "natali@gmail.com",
//   password: "    pas    ",
//   age: 27
// });

// const task = new Task({
//   description: ' Eat lunch'
// })

// task.save().then(() => {
//   console.log(task);
// }).catch((err) => {
//   console.log(err)
// })

