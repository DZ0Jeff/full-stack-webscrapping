const fs = require('fs').promises

const BASE_DIR = "./src/data/"
const FILENAME = "game-links.json"

function saveFile(data){
    let jsonData = JSON.stringify(data, null, 2)
    fs.writeFile(`${BASE_DIR}${FILENAME}`, jsonData, err => {
        if (err) throw err
        console.log('Dados salvos em arquivo!')
    })
}

async function loadFile(){
    const data = await fs.readFile(`${BASE_DIR}${FILENAME}`, 'utf8')
    return JSON.parse(data)
}

module.exports = {
    saveFile,
    loadFile
}