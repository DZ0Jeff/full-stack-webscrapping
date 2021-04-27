const puppeteer = require('puppeteer');


async function scrapperPageGames(url){
    const options = { 
        // headless: false,
        args: ['--no-sandbox', "--disable-notifications"]
    }
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url)

    const imgElement = await page.$x('//*[@id="post-body-8073520245951902812"]/div[1]/a/img')
    const img = await imgElement.getProperty('src')
    const src = await img.jsonValue()

    const torrentElement = await page.$x('//*[@id="post-body-8073520245951902812"]/div[3]/a')
    const torrent = await torrentElement.getProperty('href')
    const torrentLink = await torrent.jsonValue()

    console.log(src)
    console.log(torrentLink)

    await browser.close()
}


async function scrapperGames(url){
    const options = { 
        // headless: false,
        args: ['--no-sandbox', "--disable-notifications"]
    }

    console.log('Iniciando extração...')
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    console.log(`Abrindo página ${url}`)
    await page.goto(url);

    console.log('Página carregada!');

    const container = await page.$$("#post-body-2794561203943297067 > div:nth-child(4) a")
    
    let page_links = []
    for (let link of container) {
        const raw_href = await link.getProperty('href')
        const href = await raw_href.jsonValue() 
        page_links.push(href)
    }

    const links = await page_links
    console.log(links)

    await browser.close();
} 

// scrapperGames('http://imperiotorrentgames.blogspot.com/p/jogos-de-xbo.html')
scrapperPageGames('https://imperiotorrentgames.blogspot.com/2019/04/baixar-007-quantum-of-solace-xbox-360.html')

// (async () => {
//     console.log('Iniciando...')    
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('https://example.com');
//     await page.screenshot({ path: 'example.png' });

//     await browser.close();
// })();