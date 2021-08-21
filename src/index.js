const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(process.env.PORT, () => {
	console.log(`server is listening to port ${port}`);
});
