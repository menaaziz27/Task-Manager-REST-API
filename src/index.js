const express = require('express');
const bcrypt = require('bcrypt');

require('./db/mongoose');
const bodyParser = require("body-parser")

const User = require('./models/user');
const Task = require('./models/task');
const auth = require('./middleware/auth');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


// =========== Users Routes ============

// create a user
app.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        const token = await user.generateAuthToken();
        await user.save();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
})

// login user
app.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token: token });
    } catch (e) {
        res.status(400).send(e);
    }
})

// logout current user
app.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        console.log(req.user);
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
})
// delete all user's tokens
app.post('/users/logoutAll', auth, async (req, res) => {
    try {
        // clearing my array of tokens []
        req.user.tokens = [];
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send();
    }
})

// Get me
app.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
})

// update user
app.patch('/users/me', auth, async (req, res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'age', 'password'];

    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if (!isValid) {
        return res.status(400).send({ error: 'invalid input!' });
    }

    try {

        updates.forEach((update) => req.user[update] = req.body[update]);

        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
})

// delete a user
app.delete('/users/me', auth, async (req, res) => {

    try {
        await req.user.remove();
        res.send(req.user)
    } catch (e) {
        res.status(500).send();
    }
})

// =========Tasks Routes ============

// create a task
app.post('/tasks', auth, async (req, res) => {

    try {
        const task = new Task({
            ...req.body,
            owner: req.user._id
        })
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(500).send(e);
    }
})

// Get all tasks
app.get('/tasks', auth, async (req, res) => {

    try {
        await req.user.populate('usertasks').execPopulate();
        res.send(req.user.usertasks);
    } catch (e) {
        res.status(500).send(e);
    }
})

// Get single task
app.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findOne({
            _id,
            owner: req.user._id
        })

        if (!task) {
            res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
})

// update a task
app.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValid = updates.every((update) => allowedUpdates.includes(update));

    if (!isValid) {
        return res.status(400).send({ error: 'invalid input' })
    }

    try {

        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });

        if (!task) {
            res.status(404).send();
        }

        updates.forEach((update) => task[update] = req.body[update]);

        await task.save();
        res.send(task);
    } catch (e) {
        res.send(400).send(e);
    }
})

// delete a task 
app.delete('/tasks/:id', auth, async (req, res) => {
    try {
        let id = req.params.id;
        const task = await Task.findOneAndDelete({ _id: id, owner: req.user._id });
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