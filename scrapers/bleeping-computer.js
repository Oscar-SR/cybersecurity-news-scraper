const { chromium } = require("playwright");

async function scrapeBleepingComputer(maxNoticias) {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
    });
    const page = await context.newPage();

    // 1. Ir a la página
    await page.goto("https://www.bleepingcomputer.com/news/security/", { waitUntil: "domcontentloaded" });

    // Quitar las cookies
    const botonCookies = page.locator('//*[@id="qc-cmp2-ui"]/div[2]/div/button[2]');
    await botonCookies.waitFor({ timeout: 5000 }); // espera hasta 5 segundos a que aparezca
    await botonCookies.click();

    const noticias = [];
    let cont = 0;
    while(cont < maxNoticias) {
        for (let j = 1; cont < maxNoticias; j++, cont++) {
            const xpath = `//*[@id="bc-home-news-main-wrap"]/li[${j}]/div[2]/h4/a`;
            const elementos = await page.locator(xpath).count();

            if (elementos === 0) {
                // Si no existe, salir del for
                break;
            }

            // Saber si el elemento es un anuncio o no
            const href = await page.locator(xpath).getAttribute('href');
            if (!href?.startsWith('https://www.bleepingcomputer.com/')) {
                maxNoticias++; // Puesto que va a contar el anuncio como notica scrapeada
                continue;
            }

            const noticia = await scrapeNew(page, xpath);
            noticias.push(noticia);

            await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1 segundos
        }

        if(cont < maxNoticias) {
            const botonSiguiente = page.locator('a[aria-label="Next Page"]');

            if (await botonSiguiente.count() > 0) {
                await botonSiguiente.first().click();
            }
            
            await page.waitForLoadState('domcontentloaded');
        }
    }

    await browser.close();
    return noticias;
}

async function scrapeNew(page, xpath) {
    // 2. Localizar el enlace de la noticia directamente por XPath
    const enlaceNoticia = page.locator(xpath);

    // 3. Esperar a que esté visible
    await enlaceNoticia.waitFor();

    // 4. Hacer click
    await enlaceNoticia.click();

    // 5. Esperar a que cargue la noticia
    await page.waitForLoadState('domcontentloaded');

    //await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1 segundos

    // Título
    let titulo = "N/A";
    let tituloLocator = page.locator('xpath=/html/body/div[1]/section[3]/div/div/div[1]/div/article/div/h1');
    let countTitulo = await tituloLocator.count();

    if(countTitulo > 0)
    {
        titulo = await tituloLocator.innerText();
    }
    else
    {
        tituloLocator = page.locator('xpath=/html/body/div[1]/section[2]/div/div/div[1]/div/article/div/h1');
        countTitulo = await tituloLocator.count();

        // Comprobar si es noticia sponsor
        if(countTitulo > 0)
        {
            titulo = await tituloLocator.innerText();
        }
    }

    // Autor
    let autor = "N/A";
    let autorLocator = page.locator('xpath=/html/body/div[1]/section[3]/div/div/div[1]/div/article/div/div[1]/div[1]/h6/a/span/span');
    let countAutor = await autorLocator.count();

    if(countAutor > 0)
    {
        autor = await autorLocator.innerText();
    }
    else
    {
        autorLocator = page.locator('xpath=/html/body/div[1]/section[2]/div/div/div[1]/div/article/div/div[1]/div[1]/h6/a/span/span');
        countAutor = await autorLocator.count();

        // Comprobar si es noticia sponsor
        if(countAutor > 0)
        {
            autor = await autorLocator.innerText();
        }
    }

    // Fecha
    let fecha = "N/A";
    let fechaLocator = page.locator('xpath=/html/body/div[1]/section[3]/div/div/div[1]/div/article/div/div[1]/div[2]/ul/li[1]');
    let countFecha = await fechaLocator.count();

    if(countFecha > 0)
    {
        fecha = await fechaLocator.innerText();
    }
    else
    {
        fechaLocator = page.locator('xpath=/html/body/div[1]/section[2]/div/div/div[1]/div/article/div/div[1]/div[2]/ul/li[1]');
        countFecha = await fechaLocator.count();

        // Comprobar si es noticia sponsor
        if(countFecha > 0)
        {
            fecha = await fechaLocator.innerText();
        }
    }

    // Palabras clave
    let palabrasClave = [];
    let links = page.locator('xpath=/html/body/div[1]/section[3]/div/div/div[1]/div/div[1]/ul/li/a');
    let countLinks = await links.count();

    if(countLinks > 0)
    {
        for (let i = 0; i < countLinks; i++) {
            const palabraClave = await links.nth(i).innerText();
            palabrasClave.push(palabraClave);
        }
    }
    else
    {
        links = page.locator('xpath=/html/body/div[1]/section[2]/div/div/div[1]/div/div[1]/ul/li/a');
        countLinks = await links.count();

        for (let i = 0; i < countLinks; i++) {
            const palabraClave = await links.nth(i).innerText();
            palabrasClave.push(palabraClave);
        }
    }

    // URL
    const url = page.url();

    //await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1 segundos

    // volver a la página anterior
    await page.goBack({ waitUntil: 'domcontentloaded' });

    return { titulo, autor, fecha, palabrasClave, url };
}

module.exports = scrapeBleepingComputer;
