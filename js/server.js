// const nodeStatic = require("node-static")
// const http = require("http")

// const files = new nodeStatic.Server(".")

// http.createServer((req, res) => {
//     files.serve(req, res)
// }).listen(3000)

// const express = require("express")
// const app = express()

// app.use(express.static('.')) // плагин для express

// app.get('/data', (req,res) => {
//     console.log("data")
//     res.status(200).send("data")
// })


const express = require("express")
const fs = require("fs")
const bodyParser = require('body-parser')
const app = express()

app.use(express.static('.'))
app.use(bodyParser.json())

app.get('/api/goods', (req,res) => {
    console.log("read catalog")
    fs.readFile("./data/catalog.json","utf-8", (req,data) => {
        res.send(data)
    })
})

app.post('/api/cart', (req,res) => {
    console.log("read cart")
    if (req ===null)
        fs.readFile("./data/cart.json","utf-8", (req,data) => {
            console.dir(req)
            if(req === null){
                res.send(data)
            }else{
                console.dir(req.body)
                console.dir(data)
                const cart = JSON.parse(data)
                console.dir(req)
                const goodItem = req.body;
                console.dir(goodsItem)
                cart.push(goodItem)
                fs.writeFile('./data/cart.json',JSON.stringify(cart), (err) =>{
                    if(err){
                        res.status(500).send()
                        return
                    }else{
                        res.send(cart)
                    }
                })
            }
        })
    }else{
        
    }
})

app.listen(3030,() => {
    console.log("run server")
})