const puppeteer = require('puppeteer');


async function launchPuppeter(url) {
    const options = { 
        // headless: false,
        args: ['--no-sandbox', "--disable-notifications"]
    }

    console.log('Abrindo chrome...')
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url)
    console.log('Chrome aberto!')

    return { browser, page }
}


async function scrapperPageGames(url){
    async function getTagData(tag, prop){
        const raw_data = await tag.getProperty(prop)
        const tagData = await raw_data.jsonValue()
        return tagData
    }
    
    try {
        const { browser, page } = await launchPuppeter(url)

        const titleEl = await page.$('h3')
        const raw_title = await getTagData(titleEl, 'textContent')
        const title = raw_title.trim()

        const imgElement = await page.$('#post-body-8073520245951902812 > div:nth-child(1) > a > img')
        const src = await getTagData(imgElement, 'src')

        const torrentElement = await page.$("#post-body-8073520245951902812 > div:nth-child(3) > a")
        const torrentLink = await getTagData(torrentElement ,'href')

        await browser.close()

        console.log(title.trim())
        console.log(src)
        console.log(torrentLink)

        return {
            title,
            src,
            torrentLink
        }
    } catch(e) {
        console.error(`[ERRO]: ${e}`)
    }
    
}


async function scrapperGames(url){
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
    await browser.close();
    return links
} 

async function main() {
    const links = await scrapperGames('http://imperiotorrentgames.blogspot.com/p/jogos-de-xbo.html')
    
    console.log(`${links.length} Pagínas a serem extraídas...`)
    
    let count
    for(let link of links){
        console.log(`Extraindo ${link} página`)
        await scrapperPageGames(link)
        count++

        if(count > 10) break
    }
}

main()
// scrapperPageGames('https://imperiotorrentgames.blogspot.com/2019/04/baixar-007-quantum-of-solace-xbox-360.html')
