// const doWorkCallback = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve([2, 3, 4])
//   }, 2000);
// });

// doWorkCallback.then((data) => {
//   console.log('result:', data);
// });

const doWorkCallback = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Things went wrong!')
  }, 2000);
});

doWorkCallback.then((data) => {
  console.log('Success!', data);
})
  .catch((err) => {
    console.log(err)
  });