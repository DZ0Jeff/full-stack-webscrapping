const puppeteer = require('puppeteer');

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

scrapperGames('http://imperiotorrentgames.blogspot.com/p/jogos-de-xbo.html')

// (async () => {
//     console.log('Iniciando...')    
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('https://example.com');
//     await page.screenshot({ path: 'example.png' });

//     await browser.close();
// })();