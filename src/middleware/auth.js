const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        // !this line should be replaced later 
        const token = req.header('Authorization').replace('Bearer ', '');
        // !this line also
        const decoded = jwt.verify(token, 'thisismysecret');
        // console.log(decoded);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error
        }
        // console.log(user, '14')
        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send('Error: Please authenticate.');
    }
}

module.exports = auth;