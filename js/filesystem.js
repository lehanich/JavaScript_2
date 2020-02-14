const fs = require("fs");
fs.readFile('./data.json','utf-8',(err,data) => {
    console.log("read")
    if(!err){
        const obj = JSON.parse(data);
         console.log(JSON.parse(data));
        obj.hi = "test"
        fs.writeFile('./data.json',JSON.stringify(obj),(err,data) => {
            console.log(err)
        })
    }


});
