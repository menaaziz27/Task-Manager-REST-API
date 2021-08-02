const express = require('express');

require('./db/mongoose');
const bodyParser = require('body-parser');

const User = require('./models/user');
const Task = require('./models/task');

const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');
const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const multer = require('multer');
const upload = multer({
	dest: 'images',
	limits: {
		fileSize: 1000000,
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(doc|docx)$/)) {
			return cb(new Error('Please upload a word file'));
		}

		cb(null, true);
	},
});

app.post(
	'/upload',
	upload.single('image'),
	(req, res) => {
		res.send();
	},
	(error, req, res, next) => {
		res.status(400).send({ error: error.message });
	}
);
app.use(userRoutes);
app.use(taskRoutes);
app.use(authRoutes);

app.listen(port, () => {
	console.log(`server is listening to port ${port}`);
});
