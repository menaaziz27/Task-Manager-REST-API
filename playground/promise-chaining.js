require('../src/db/mongoose');
const { update } = require('../src/models/user');
const User = require('../src/models/user');

// User.findByIdAndUpdate('5fdb6c110da22125bc1bd32f', { age: 12 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 0 })
// }).then((result) => {
//     console.log(result)
// }).catch(err => console.log(err))


const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { name: 'rola', age, email: 'rola@example.com' });
    const count = User.countDocuments({ age });
    return count;
}


updateAgeAndCount('5fdbe4bf73b1833174910dbb', 9).then((count) => {
    console.log(count);
}).catch((err) => {
    console.log(err);
});



// find all where age = 0 and update their password to testing123456 
// User.updateMany({ age: 0 }, { password: 'testing123456' }).then((res) => {
//     console.log(res)
// }).catch(err => console.log(err))


// find all and update their password
// User.updateMany({}, { password: 'testing123456' }).then((res) => {
//     console.log(res)
// }).catch(err => console.log(err))



