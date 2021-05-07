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
        name: 'default',
        type: 'postgres',
        url: 'postgres://lovtfnko:mNygsOS_dwhxVTHG7-hLhjx8_WW-mY_c@tuffi.db.elephantsql.com:5432/lovtfnko',
        logging: false,
        synchronize: true,
        entities: [ GameSchema ]
    })
}

async function getAllGames(){
    const connection = await getConnection() 
    const gamesRepo = connection.getRepository(Games)
    const games = await gamesRepo.find()
    connection.close()
    return games
}

async function insertGames(title, src, torrentLink){
    const connection = await getConnection()
    
    // Create
    const games = new Games()
    games.title = title
    games.src = src
    games.torrentLink = torrentLink

    // Save
    const gamesRepo = connection.getRepository(Games)
    const response = await gamesRepo.save(games)
    console.log('Saved', response)

    // return a list
    const allGames = await gamesRepo.find()
    connection.close()
    return allGames
}

module.exports = { getAllGames, insertGames }