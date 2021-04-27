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

    const [container] = await page.$("#post-body-2794561203943297067 > div:nth-child(4) a")
    console.log(container)
    // await page.evaluate(() => {
    //     console.log('Buscando conteúdo...');
    //     const nodeLinks = document.querySelectorAll("#post-body-2794561203943297067 > div:nth-child(4) a")

    //     const raw_links = [...nodeLinks]

    //     const links = raw_links.map(link => ({ name: link.text, url: link.href }))

    //     console.log(links)

    //     return links
    // })

    await browser.close();

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