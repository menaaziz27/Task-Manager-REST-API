require('../src/db/mongoose');
const Task = require('../src/models/task');

// solution 1
// Task.findById({ _id: '5fdddad2d5b514156c983111' }, (err, res) => {
//     console.log(res)
//     res.remove();
// })

// Task.findById({ _id: '5fde1834bd629d6418ac69c3' }).remove().exec();
// Task.findById('5fde1834bd629d6418ac69c3').remove().exec();

// sol 2
// Task.findOneAndDelete({ _id: '5fdbe79ab995ec5380ee9e25' }).then(res => {
//     console.log('Deleted');
// }).catch(err => console.log(err));

// sol 3
// Task.findByIdAndDelete('5fde1a28385d942730e4a983').then((res) => {
//     console.log(res);
//     return Task.countDocuments({ completed: false })
// }).then((res) => {
//     console.log(res);
// }).catch((err) => console.log(err));


const deleteTaskAndCount = async (id) => {
    const deletedTask = await Task.findByIdAndDelete(id);
    const numOfIncompleteTasks = await Task.countDocuments({ completed: false });
    return numOfIncompleteTasks;
}

deleteTaskAndCount('5fde1a0a0090561880363ce9').then((numOfIncompleteTasks) => {
    console.log(numOfIncompleteTasks);
}).catch((err) => {
    console.log(err);
})



// Task.deleteOne

// const task = new Task({
//     "completed": false,
//     "description": "Eat ba2dones ya gd3aaaaaaan"
// })

// task.save().then(() => {
//     console.log('success')
// }).catch((e) => {
//     console.log('failed')
// })