const Task = require("../models/task");

exports.createTask = async (req, res) => {
	try {
		const task = new Task({
			...req.body,
			owner: req.user._id,
		});
		await task.save();
		res.status(201).send(task);
	} catch (e) {
		res.status(500).send(e);
	}
};

exports.getTasks = async (req, res) => {
	// console.log(typeof req.query.completed) // string

	let match = {};

	if (req.query.completed) {
		match.completed = req.query.completed === "true" ? "true" : "false";
		console.log(match);
	}
	try {
		// await req.user.populate('usertasks').execPopulate();
		await req.user
			.populate({
				path: "usertasks",
				match,
				options: {
					limit: parseInt(req.query.limit),
					skip: parseInt(req.query.skip),
				},
			})
			.execPopulate();
		res.send(req.user.usertasks);
	} catch (e) {
		res.status(500).send(e);
	}
};

exports.getTask = async (req, res) => {
	const _id = req.params.id;

	try {
		const task = await Task.findOne({
			_id,
			owner: req.user._id,
		});

		if (!task) {
			res.status(404).send();
		}

		res.send(task);
	} catch (e) {
		res.status(500).send(e);
	}
};

exports.updateTask = async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ["description", "completed"];
	const isValid = updates.every((update) => allowedUpdates.includes(update));

	if (!isValid) {
		return res.status(400).send({ error: "invalid input" });
	}

	try {
		const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });

		if (!task) {
			res.status(404).send();
		}

		updates.forEach((update) => (task[update] = req.body[update]));

		await task.save();
		res.send(task);
	} catch (e) {
		res.send(400).send(e);
	}
};

exports.deleteTask = async (req, res) => {
	try {
		let id = req.params.id;
		const task = await Task.findOneAndDelete({ _id: id, owner: req.user._id });
		if (!task) {
			res.status(404).send();
		}

		res.send(task);
	} catch (e) {
		res.send(500).send(e);
	}
};
