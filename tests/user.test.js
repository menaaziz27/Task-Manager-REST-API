const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../src/models/user');

const app = require('../src/app');

const userId = new mongoose.Types.ObjectId();
const user = {
	_id: userId,
	name: 'mikedane',
	email: "mikedane@gmail.com",
	password: "asdasd123!!",
	tokens:[{
		token: jwt.sign({_id: userId}, process.env.JWT_SECRET)
	}]
};


beforeEach(async () => {
	await User.deleteMany({});
	await new User(user).save();
})

test('create a new user', async () => {
	await request(app).post('/users').send({
		name: 'MenaAziz',
		email: 'menaaziz@gmail.com',
		password: "MyPass777!"
	}).expect(201)
});

test('should login existing user', async () => {
	await request(app).post('/users/login').send({
		email: user.email,
		password: user.password
	}).expect(200);
})

test('should not login nonexisting user', async () => {
	await request(app).post('/users/login').send({
		email: user.email,
		password: 'notmypassword'
	}).expect(400);
});

test('should get user profile', async () => {
	await request(app)
	.get('/users/me')
	.set('Authorization', `Bearer ${user.tokens[0].token}`)
	.send()
	.expect(200)
});

test('should not get user profile', async () => {
	await request(app)
	.get('/users/me')
	.send()
	.expect(401)
});

test('should delete a user account', async () => {
	await request(app)
	.delete('/users/me')
	.set('Authorization', `Bearer ${user.tokens[0].token}`)
	.send()
	.expect(200)
});


test('should not delete a user account', async () => {
	await request(app)
	.delete('/users/me')
	.send()
	.expect(401)
});