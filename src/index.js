const express = require('express');
const bcrypt = require('bcrypt');

require('./db/mongoose');
const bodyParser = require("body-parser")

const User = require('./models/user');
const Task = require('./models/task');
const auth = require('./middleware/auth');

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('Get requests is disabled')
//     } else {
//         next()
//     }
// })


// app.use((req, res, next) => {
//     res.status(503).send('Server is under maintenance')
// })

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
    // user.save().then((data) => {
    //     res.status(201).send("success")
    // }).catch((err) => {
    //     res.status(400).send(err)
    // })
})

// login user
app.post('/users/login', async (req, res) => {
    try {
        // in schema.statics we are calling findByCredentials by the the model itself
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token: token });
    } catch (e) {
        res.status(400).send(e);
    }
})

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
    // console.log(req.user)
    res.send(req.user);
    // try {
    //     const users = await User.find({});
    //     res.send(users);
    // } catch (e) {
    //     res.send(500).send();
    // }
    // User.find({}).then((users) => {
    //     res.send(users);
    // }).catch((err) => {
    //     res.status(500).send();
    // })
})

// Get single user
// app.get('/users/:id', async (req, res) => {
//     const _id = req.params.id;

//     try {
//         const user = await User.findById(_id); // if there's no user it will return null and keep continues to the next line so we should make if condition
//         if (!user) {
//             return res.status(404).send();
//         }

//         res.send(user);
//     } catch (e) {
//         res.status(500).send()
//     }
// User.findById(_id).then((user) => {
//     if (!user) {
//         console.log(user);
//         return res.status(404).send();
//     }

//     res.send(user);
// }).catch((err) => {
//     res.status(500).send();
// })
// })

// update user
app.patch('/users/me', auth, async (req, res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'age', 'password'];

    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if (!isValid) {
        return res.status(400).send({ error: 'invalid input!' });
    }

    try {
        // const user = await User.findById(req.params.id);

        // !this line not updating the user!
        // updates.forEach((update) => user.update. = req.body.update);
        // !but this line works!
        updates.forEach((update) => req.user[update] = req.body[update]);

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        // if (!user) {
        //     return res.status(404).send();
        // }

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
    // const id = req.params.id;

    // try {
    //     const user = await User.findByIdAndDelete(id);
    //     if (!user) {
    //         res.status(404).send()
    //     }

    //     res.send(user);
    // } catch (e) {
    //     res.send(500).send(e);
    // }
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
        const task = await Task.findById(req.params.id);

        updates.forEach((update) => task[update] = req.body[update]);

        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!task) {
            res.status(404).send();
        }

        await task.save();
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

// const jwt = require('jsonwebtoken');


// JSON.stringify() calls toJSON behind the scenese
// let pet = {
//     name: 'hal',
// }

// pet.toJSON = function () {
//     console.log(this);
//     return this;
// }
// console.log(JSON.stringify(pet))

// const Task = require('./models/task');

const main = async () => {
    // const task = await Task.findById('5feb5cca7a6bc32e00d2bd90');
    // await task.populate('owner').execPopulate();
    // console.log(task.owner)

    const user = await User.findById('5feb43d60c1d7b4844c4bee8');
    await user.populate('usertasks').execPopulate();
    console.log(user.usertasks);
}

main();

app.listen(port, () => {
    console.log(`server is listening to port ${port}`);
})