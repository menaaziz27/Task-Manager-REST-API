const User = require('../models/user');

exports.postLogin = async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password);
		const token = await user.generateAuthToken();
		res.send({ user, token: token });
	} catch (e) {
		res.status(400).send(e);
	}
};

exports.postLogout = async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
		console.log(req.user);
		await req.user.save();
		res.send();
	} catch (e) {
		res.status(500).send();
	}
};

exports.postLogoutAll = async (req, res) => {
	try {
		// clearing my array of tokens []
		req.user.tokens = [];
		await req.user.save();

		res.send();
	} catch (e) {
		res.status(500).send();
	}
};
