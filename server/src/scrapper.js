const puppeteer = require('puppeteer');


async function launchPuppeter(url) {
    const options = { 
        // headless: false,
        args: ['--no-sandbox', "--disable-notifications"]
    }

    console.log(`Lançando browser...`)
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url)
    console.log(`Browser aberto!`)

    return { browser, page }
}


async function scrapperPageGames(url){
    
    async function getTagData(tag, prop){
        const raw_data = await tag.getProperty(prop)
        const tagData = await raw_data.jsonValue()
        return tagData
    }
    
    
    const { browser, page } = await launchPuppeter(url)

    let title
    try {
        const titleEl = await page.$('h3')
        const raw_title = await getTagData(titleEl, 'textContent')
        title = raw_title.trim()    
    } catch(e) {
        // console.error(`[ERRO] ${e}`)
        title = "Título localizado..."
    }
    
    let src
    try {
        const imgElement = await page.$('.post-body.entry-content > div:nth-child(1) > a > img')
        src = await getTagData(imgElement, 'src')
    } catch(e){
        // console.error(`[ERRO] ${e}`)
        src = "Imagem não localizada!"
    }

    let torrentLink
    try {
        const torrentElement = await page.$(".post-body.entry-content > div:nth-child(3) > a")
        torrentLink = await getTagData(torrentElement ,'href')
    } catch(e) {
        // console.error(`[ERRO] ${e}`)
        torrentLink = 'Link do torrent não localizado!'
    }
    

    let pages = await browser.pages();
    await Promise.all(pages.map(page =>page.close()));
    await browser.close()

    // console.log(title.trim())
    // console.log(src)
    // console.log(torrentLink)

    return {
        title,
        src,
        torrentLink
    }
}


async function scrapperGamesList(url){
    const { browser, page } = await launchPuppeter(url)

    console.log('Página carregada!');

    const container = await page.$$("#post-body-2794561203943297067 > div:nth-child(4) a")
    
    let page_links = []
    for (let link of container) {
        const raw_href = await link.getProperty('href')
        const href = await raw_href.jsonValue() 
        page_links.push(href)
    }

    const links = await page_links
    
    let pages = await browser.pages();
    await Promise.all(pages.map(page =>page.close()))
    await browser.close();
    
    return links
} 


async function scrapperGames() {
    console.log('Iniciando scrapper...')
    const raw_links = await scrapperGamesList('http://imperiotorrentgames.blogspot.com/p/jogos-de-xbo.html')

    const links = raw_links.slice(0, 10)

    console.log(`${links.length} Pagínas a serem extraídas...`)
    
    let count = 0
    let results = []
    for(let link of links){
        console.log(`Extraindo ${count + 1} página`)
        const details = await scrapperPageGames(link)
        results.push(details)
        count++
    }

    return results
}

module.exports = {
    scrapperGames
}