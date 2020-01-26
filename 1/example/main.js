/*
let xhr;

if (window.XMLHttpRequest) {
    xhr = new window.XMLHttpRequest();
} else {
    xhr = new window.ActiveXObject("Mirosoft.XMLHTTP")
}

xhr.ontimeout = function () {
    console.log("timeout")
};

xhr.onerror = function (e) {
    console.log(e);
};

xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log('request done')
    }
};

JSON.stringify() // Object => JSON
JSON.parse() // JSON => Object

xhr.open("GET", "http://example.com");

xhr.timeout = 3000;

xhr.send();

 */

// const async = (a, cb) => {
//     setTimeout(() => {
//         const b = a + 1;
//         cb(b)
//     }, 200)
// };
//
// async(10, (res) => {
//     async(res, (sRes) => {
//         async(sRes, (fRes) => {
//             console.log(fRes);
//         });
//     });
// });

// pending
// fulfilled
// rejected

const async = (a) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a) {
                const b = a + 1;
                resolve(b)
            } else {
                reject("Error")
            }
        }, 200)
    })
};

async(10).then((res) => {
    return async(res);
}).then((res) => {
    return async(res);
}).then((res) => {
    console.log(res)
}).catch(e => console.error(e));
