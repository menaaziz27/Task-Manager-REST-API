const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Not a valid email!")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error("Password string must be not exist in your password")
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        },
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.virtual('usertasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

// instance methods
userSchema.methods.generateAuthToken = async function () {
    const user = this;

    const token = jwt.sign({ _id: user._id.toString() }, 'thisismysecret')

    console.log(token)
    user.tokens = user.tokens.concat({ token });

    await user.save()
    return token;
}

// removing password and array of tokens from the user
// This method accepts the same options as Document#toObject.
// To apply the options to every document of your schema by default,
// set your schemas toJSON option to the same argument.
// userSchema.methods.getPublicProfile = function () {
userSchema.methods.toJSON = function () {
    const user = this;

    const userObject = user.toObject();
    delete userObject.password
    delete userObject.tokens;

    return userObject;
}

// Statics are pretty much the same as methods but allow for defining
// functions that exist directly on your Model.

// Model methods
userSchema.statics.findByCredentials = async (email, password) => {
    console.log('in credentials')
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Incorrect password');
    }

    return user;
}

// hash the plain password before saving
userSchema.pre('save', async function (next) {
    const user = this;
    // console.log(user); // without hashed pw 

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    // console.log(user); // with hashed pw
    next()
})

const User = mongoose.model('User', userSchema); // ! in this way of schema and model we can make us of middlewares 

module.exports = User;