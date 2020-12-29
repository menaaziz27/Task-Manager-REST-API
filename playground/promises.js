const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b);
        }, 1000)
    })
}

// Promise hell

// add(3, 5).then((result) => {
//     console.log(result)
//     add(result, 1).then((result2) => {
//         console.log(result2)
//         add(result2, 2).then((result3) => {
//             console.log(result3)
//             add(result3, 2).then((result4) => {
//                 console.log(result4)
//             }).catch((err) => {
//                 console.log(err)
//             })
//         }).catch((err) => {
//             console.log(err)
//         })
//     }).catch(err => console.log(err))
// }).catch((err) => {
//     console.log(err);
// })


// promise chaining 
add(1, 1).then(res => {
    console.log(res);
    return add(res, 1)
}).then(res2 => {
    console.log(res2)
    return add(res2, 1)
}).then(res3 => {
    console.log(res3)
}).catch(err => {
    console.log(err);
})























// const doWorkCallback = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve([2, 3, 4])
//   }, 2000);
// });

// doWorkCallback.then((data) => {
//   console.log('result:', data);
// });

// const doWorkCallback = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject('Things went wrong!')
//   }, 2000);
// });

// doWorkCallback.then((data) => {
//   console.log('Success!', data);
// })
//   .catch((err) => {
//     console.log(err)
//   });