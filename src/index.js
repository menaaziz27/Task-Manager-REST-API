const express = require('express');
require('./db/mongoose');
const bodyParser = require("body-parser")


const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/users', (req, res) => {
  const user = new User(req.body);

  user.save().then((data) => {
    res.send("success")
  }).catch((err) => {
    res.status(400).send(err)
  })
})

app.post('/tasks', (req, res) => {
  const task = new Task(req.body)

  task.save().then(() => {
    res.status(201).send(task)
  }).catch((e) => {
    res.status(400).send(e)
  })
})


app.listen(port, () => {
  console.log(`server is listening to port ${port}`);
})