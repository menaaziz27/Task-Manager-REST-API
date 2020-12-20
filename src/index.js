const express = require('express');
require('./db/mongoose');
const bodyParser = require("body-parser")

const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


// =========== Users Routes ============

// create a user
app.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
    // user.save().then((data) => {
    //     res.status(201).send("success")
    // }).catch((err) => {
    //     res.status(400).send(err)
    // })
})

// Get all users
app.get('/users', async (req, res) => {

    try {
        const users = await User.find({});
        res.send(users);
    } catch (e) {
        res.send(500).send();
    }
    // User.find({}).then((users) => {
    //     res.send(users);
    // }).catch((err) => {
    //     res.status(500).send();
    // })
})

// Get single user
app.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id); // if there's no user it will return null and keep continues to the next line so we should make if condition
        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (e) {
        res.status(500).send()
    }
    // User.findById(_id).then((user) => {
    //     if (!user) {
    //         console.log(user);
    //         return res.status(404).send();
    //     }

    //     res.send(user);
    // }).catch((err) => {
    //     res.status(500).send();
    // })
})


app.patch('/users/:id', async (req, res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'age', 'password'];

    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if (!isValid) {
        return res.status(400).send({ error: 'invalid input!' });
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
})

app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            res.status(404).send()
        }

        res.send(user);
    } catch (e) {
        res.send(500).send(e);
    }
})

// =========Tasks Routes ============

// create a task
app.post('/tasks', async (req, res) => {

    try {
        const task = new Task(req.body)
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(500).send(e);
    }

    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

// Get all tasks
app.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send(e);
    }
    // Task.find({}).then((tasks) => {
    //     res.send(tasks);
    // }).catch((err) => {
    //     err.status(500).send();
    // })
})

// Get single task
app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id);
        if (!task) {
            res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
    // Task.findById(_id).then((task) => {
    //     if (!task) {
    //         return res.status(404).send();
    //     }

    //     res.send(task);
    // }).catch((err) => {
    //     res.status(500).send(err);
})

// update a task
app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValid = updates.every((update) => allowedUpdates.includes(update));

    if (!isValid) {
        return res.status(400).send({ error: 'invalid input' })
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!task) {
            res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.send(400).send(e);
    }
})

// delete a task 
app.delete('/tasks/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            res.status(404).send()
        }

        res.send(task);
    } catch (e) {
        res.send(500).send(e);
    }
})

app.listen(port, () => {
    console.log(`server is listening to port ${port}`);
})