const User = require('../models/user');

exports.createUser = async (req, res) => {
	const user = new User(req.body);

	try {
		const token = await user.generateAuthToken();
		await user.save();
		res.status(201).send({ user, token });
	} catch (e) {
		res.status(400).send(e);
	}
};

exports.getMe = async (req, res) => {
	res.send(req.user);
};

exports.updateUser = async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['name', 'email', 'age', 'password'];

	const isValid = updates.every(update => allowedUpdates.includes(update));

	if (!isValid) {
		return res.status(400).send({ error: 'invalid input!' });
	}

	try {
		updates.forEach(update => (req.user[update] = req.body[update]));

		await req.user.save();
		res.send(req.user);
	} catch (e) {
		res.status(400).send(e);
	}
};

exports.deleteUser = async (req, res) => {
	try {
		await req.user.remove();
		res.send(req.user);
	} catch (e) {
		res.status(500).send();
	}
};

exports.uploadAvatar = async (req, res) => {
	try {
		req.user.avatar = req.file.buffer;
		await req.user.save();
		res.send({ message: 'avatar uploaded' });
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
};

exports.deleteAvatar = async (req, res) => {
	try {
		req.user.avatar = undefined;
		await req.user.save();
		res.status(200).send({ message: 'avatar deleted' });
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
};

exports.getAvatar = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user) {
			throw new Error('user not found');
		}

		res.set('Content-Type', 'image/jpg');
		res.status(200).send(user.avatar);
	} catch (error) {
		res.status(404).send();
	}
};
