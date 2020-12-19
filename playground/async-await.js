const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                reject('Numbers must be non-negative')
            }
            resolve(a + b);
        }, 1000)
    })
}

const doWord = async () => {
    // throw new Error('something went wrong');
    const result = await add(1, 99);
    console.log(result)
    const result2 = await add(result, 50);
    console.log(result2)
    const result3 = await add(result2, -3);
    console.log(result3)
    return result3;
}

doWord().then(res => {
    console.log(res);
}).catch(e => {
    console.log('e', e);
})