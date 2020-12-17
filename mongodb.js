// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;
const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';

const databaseName = 'task-manager';

// to make a connection between my node app and my local server on mongodb
MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {

  if (err) return console.log('Unable to connect!')

  // to make a connection to my database
  const db = client.db(databaseName);

  db.collection('users').deleteMany({
    age: 15
  }).then((data) => {
    console.log(data.deletedCount)
  }).catch((err) => {
    console.log(err)
  })


  // db.collection('tasks').updateMany({
  //   completed: false
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }).then((data) => {
  //   console.log(data.modifiedCount)
  // }).catch((err) => {
  //   console.log(err)
  // });
  // db.collection('users').findOne({ name: 'Mina' }, (err, result) => {
  //   if (err) {
  //     return console.log('Error')
  //   }
  //   console.log(result);
  // });

  // db.collection('users').find({ name: 'Mina' }).toArray((err, result) => {
  //   console.log(result);
  // })

  // db.collection('users').find({ name: 'Mina' }).count((err, count) => {
  //   console.log(count);
  // })

  // db.collection('tasks').findOne({ _id: new ObjectID("5fd0cae70ea31d39505decdb") }, (err, result) => {
  //   if (err) {
  //     return console.log("Error")
  //   }

  //   console.log(result);
  // });

  // db.collection('tasks').find({ completed: false }).toArray((err, result) => {
  //   if (err) {
  //     return console.log("Error")
  //   }

  //   console.log(result);
  // })
  // db.collection('users').insertMany([
  //   {
  //     name: 'Jen',
  //     age: 15
  //   }, {
  //     name: 'Foo',
  //     age: 34
  //   }
  // ], (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert');
  //   }

  //   console.log('Inserted Successfully');
  //   console.log(result.ops);
  // })

  // db.collection('tasks').insertMany([
  //   {
  //     description: 'assignment',
  //     completed: false
  //   }, {
  //     description: 'online lecture',
  //     completed: true
  //   }, {
  //     description: 'play tennis',
  //     completed: true
  //   }
  // ], (err, result) => {
  //   if (err) {
  //     return console.log('Something went wrong');
  //   }

  //   console.log(result.ops);
  // })
});