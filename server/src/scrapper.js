const puppeteer = require('puppeteer');

async function scrapperGames(url){
    console.log('Iniciando extração...')
    const browser = await puppeteer.launch({ 
        args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    console.log(`Abrindo página ${url}`)
    await page.goto(url);

    console.log('Página carregada!');
    console.log('Buscando conteúdo...');
    const gameLinks = await page.$x('//*[@id="post-body-2794561203943297067"]/div[2]');
    gameLinks.forEach( async link => {
        const text = await link.getProperty('textContent');
        const name = await text.jsonValue(); 
        console.log(`${name} Extraído!`);
    })
    // const text = await gameLinks.getProperty('textContent');
    // const name = await text.jsonValue();

    // console.log(`${name} Extraído!`);

    browser.close();

    // console.log(gameLinks)
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