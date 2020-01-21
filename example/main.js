function f() {
    // console.log(a);
    let a = 5;
    const b = [1, 2];
    // b = {};
    // b = [1, 2];
    console.log(b);
}

function f1() {
    var b = 2;
}

// const arr = [1, 2, 3, 4];
// const [a, b] = arr;
const goodsArr = ['Book', 'Notebook'];
const goodsArr1 = ['Ball'];
const usrData = {
    id: 1,
    age: 25,
};
const obj = {
    user: {
        ...usrData,
        name: 'Ivan',
        lastName: 'Ivanov',
    },
    goods: ['Phone', 'TV', ...goodsArr, ...goodsArr1],
    hello: () => {
        console.log(this)
    }
};
const { user } = obj;
// const { user: { name, lastName, age, id }, goods } = obj;
// console.log(name, lastName, age, id);
//
// function f2(...args) {
//     console.log(args);
// }
//
// f2(1, obj, 2);

// const f3 = function (number) {
//     return number + 1;
// };

// const f3 = number => number + 1;
//
// const f4 = number => f3(number) * 2;
//
// console.log(f4(5));

// obj.hello();

// const str = 'Hello, ' + user.name + '!';
const str = `Hello ${user.name} ${user.lastName}!`;
console.log(str);
