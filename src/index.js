const express = require("express");

require("./db/mongoose");
const bodyParser = require("body-parser");

const User = require("./models/user");
const Task = require("./models/task");

const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/task");
const authRoutes = require("./routes/auth");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(userRoutes);
app.use(taskRoutes);
app.use(authRoutes);

app.listen(port, () => {
	console.log(`server is listening to port ${port}`);
});
