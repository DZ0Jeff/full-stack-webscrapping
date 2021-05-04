const typeorm = require('typeorm')
const EntitySchema = require('typeorm').EntitySchema

class Games {
    constructor(id, title, src, torrentLink){
        this.id = id
        this.title = title
        this.src = src
        this.torrentLink = torrentLink
    }
}

const GameSchema = new EntitySchema({
    name: "Games",
    target: Games,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        title: {
            type: "varchar"
        }, 
        src: {
            type: "varchar"
        }, 
        torrentLink: {
            type: "varchar"
        }
    }
})

async function getConnection(){
    return await typeorm.createConnection({
        type: 'sqlite',
        database: './src/data/games.sqlite',
        logging: false,
        entities: [ GameSchema ]
    })
}

async function getAllGames(){
    const connection = await getConnection() 
    const gamesRepo = connection.getRepository(Games)
    const games = gamesRepo.find()
    connection.close()
    return games
}

async function insertGames(title, src, torrentLink){
    const connection = await getConnection()
    
    // Create
    const games = new Games()
    games.title = title
    games.src = src
    games.torrentLink

    // Save
    const gamesRepo = connection.createRepository(Games)
    const response = gamesRepo.save(games)
    console.log('Saved', response)

    // return a list
    const allGames = await gamesRepo.find()
    connection.close()
    return allGames
}

module.exports = { getAllGames, insertGames }