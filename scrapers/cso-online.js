const { chromium } = require("playwright");
const { parse, format } = require('date-fns');

async function scrapeCSO() {
    const MAX_PAGINAS = 1;
    
    const browser = await chromium.launch({headless: false});
    const page = await browser.newPage();

    // 1. Ir a la página
    await page.goto("https://www.csoonline.com/news/", { waitUntil: "domcontentloaded" });

    const noticias = [];
    
    // Noticias destacadas
    await resolverCookies(page);
    noticias.push(await scrapeNew(page, '//*[@id="latest"]/div/div/div[1]/div[1]'));
    await resolverCookies(page);
    noticias.push(await scrapeNew(page, '//*[@id="latest"]/div/div/div[1]/div[2]/div[1]'));
    await resolverCookies(page);
    noticias.push(await scrapeNew(page, '//*[@id="latest"]/div/div/div[1]/div[2]/div[2]'));
    await resolverCookies(page);
    noticias.push(await scrapeNew(page, '//*[@id="latest"]/div/div/div[2]/div[1]'));
    await resolverCookies(page);
    noticias.push(await scrapeNew(page, '//*[@id="latest"]/div/div/div[2]/div[2]'));
    await resolverCookies(page);
    noticias.push(await scrapeNew(page, '//*[@id="latest"]/div/div/div[2]/div[3]'));
    await resolverCookies(page);
    noticias.push(await scrapeNew(page, '//*[@id="latest"]/div/div/div[2]/div[4]'));
    await resolverCookies(page);
    noticias.push(await scrapeNew(page, '//*[@id="latest"]/div/div/div[2]/div[5]'));
    await resolverCookies(page);
    noticias.push(await scrapeNew(page, '//*[@id="latest"]/div/div/div[2]/div[6]'));

    for (let i = 1; i <= MAX_PAGINAS; i++) {
        for (let j = 1; j <= 50; j++) {
            await resolverCookies(page);

            const xpath = `//*[@id="remove_no_follow"]/section[3]/div/div/div[${j}]/a`;
            const elementos = await page.locator(xpath).count();

            if (elementos === 0) {
                // Si no existe, salir del for
                break;
            }

            //console.log("Noticia " + i + " " + j);
            const noticia = await scrapeNew(page, xpath);
            noticias.push(noticia);
        }

        if(i != MAX_PAGINAS) {
            const botonSiguiente = await page.locator('//*[@id="Blog1_blog-pager-older-link"]');
            const botonExiste = await botonSiguiente.count();

            if (botonExiste === 0) {
                // No hay más páginas, salir del bucle externo
                break;
            }

            await botonSiguiente.click();
            await page.waitForLoadState('domcontentloaded');
        }
    }

    await browser.close();
    return noticias;
}

async function resolverCookies(page) {
    await page.waitForTimeout(500); // pequeño delay por si el iframe aparece tarde

    // ---- SourcePoint (CSOOnline, IDG, etc.) ----
    try {
        const iframe = page.frameLocator('iframe[id^="sp_message_iframe"]');

        const rejectBtn = iframe.locator('button[title="Reject All"]');
        const acceptBtn = iframe.locator('button[title="I Agree"]');

        if (await rejectBtn.count() > 0) {
            await rejectBtn.click();
            console.log("Cookies rechazadas");
            return;
        }

        if (await acceptBtn.count() > 0) {
            await acceptBtn.click();
            console.log("Cookies aceptadas");
            return;
        }
    } catch {}

    console.log("No había cookies que gestionar");
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

    // Título
    const tituloLocator = page.locator('xpath=//*[@id="primary"]/div[1]/div/div[2]/div/h1');
    const countTitulo = await tituloLocator.count();

    let titulo = "N/A";
    if(countTitulo > 0)
    {
        titulo = await tituloLocator.innerText();
    }

    // Autor
    const autorLocator = page.locator('//*[@id="primary"]/div[1]/div/div[1]/div[1]/div/div/div/a');
    const countAutor = await autorLocator.count();

    let autor = "N/A";
    if(countAutor > 0)
    {
        autor = await autorLocator.innerText();
    }

    // Fecha
    const fechaLocator = page.locator('//*[@id="primary"]/div[1]/div/div[2]/div/div[1]/div[2]/span[1]');
    const countFecha = await fechaLocator.count();

    let fecha = "N/A";
    if(countFecha > 0)
    {
        const fechaString = await fechaLocator.innerText();
        const fechaParseada = parse(fechaString, 'MMM dd, yyyy', new Date());
        fecha = format(fechaParseada, 'MMMM dd, yyyy');
    }

    // Palabras clave
    let palabrasClave = [];
    const palabraClaveLocator = page.locator('xpath=/html/body/div[2]/main/article/section/div/div[1]/div/div/div[3]/div/div');
    const countPalabrasClave = await palabraClaveLocator.count();

    if(countPalabrasClave > 0)
    {
        const palabrasClaveString = await palabraClaveLocator.innerText();
        palabrasClave = palabrasClaveString.split('\n');
    }

    // volver a la página anterior
    await page.goBack({ waitUntil: 'domcontentloaded' });

    return { titulo, autor, fecha, palabrasClave };
}

module.exports = scrapeCSO;
