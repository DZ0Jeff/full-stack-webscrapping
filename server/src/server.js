const express = require('express')
const cors = require('cors')

const scrapper = require('./scrapper')
const files = require('./handleFile')

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
    // todo: Scrappe games
    const gameData = await scrapper.scrapperGames()
    console.log(gameData)
    // tado: add to DB
    // todo:add to json
    files.handleFile(gameData)


    return response.json({ status: "success" })
})

server.listen(PORT, () => console.log(`Server Running in port ${PORT}`))