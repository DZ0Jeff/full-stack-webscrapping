const express = require('express')
// const puppetter = require('puppeteer')
const cors = require('cors')

const PORT = process.env.PORT || 3333
const server = express()

server.use(express.json());
server.use(cors())
server.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin","*");
    response.header("Access-Control-Allow-Headers","Content-Type");
    next();
})

server.get('/games', async (request, response) => {
    const creators = [
        {name:"MxJeff", img: "https://"},
        {name:"Bearyder", img: "https://"},
        {name:"addtesfield", img: "https://"}
    ]

    // get DB
    return response.json(creators)
})

server.post('/games', async (request, response) => {
    console.log(request.body)
    // tudo: Scrappe games
    // tado: add to DB
    return response.json({ status: "success" })
})

server.listen(PORT, () => console.log(`Server Running in port ${PORT}`))