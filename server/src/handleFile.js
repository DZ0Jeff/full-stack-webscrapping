const fs = require('fs')

function handleFile(data){
    let jsonData = JSON.stringify(data, null, 2)
    fs.writeFile('./src/data/game-links.json', jsonData, err => {
        if (err) throw err
        console.log('Dados salvos em arquivo!')
    })
}

module.exports = {
    handleFile
}