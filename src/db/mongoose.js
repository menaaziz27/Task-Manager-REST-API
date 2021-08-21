const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

// to check the connection to the db 
var db = mongoose.connection;

db.once('open', function () {
  console.log("Successfully connected to MongoDB!");
});

// if connection error
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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

