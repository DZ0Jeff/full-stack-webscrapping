const express = require('express')
const cors = require('cors')

const scrapper = require('./scrapper')
const files = require('./handleFile')
const db = require('./models/database')

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
    // get DB
    const games = await db.getAllGames()
    // get JSON
    // const games = await files.loadFile()

    return response.json(games)
})

server.post('/games', async (request, response) => {
    console.log(request.body)
    // todo: Scrappe games
    const gameData = await scrapper.scrapperGames()
    // tado: add to DB
    const games = await db.insertGames(gameData.title, gameData.src, gameData.torrentLink)
    // todo:add to json
    // files.saveFile(gameData)

    return response.json(games)
})

server.listen(PORT, () => console.log(`Server Running in port ${PORT}`))
