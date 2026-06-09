import { chromium, Page } from "playwright";
import { parse, format, isValid } from "date-fns";

async function scrapeCSO(maxNoticias: number) {
    const browser = await chromium.launch({ headless: true }); // headless seguro
    const context = await browser.newContext({ storageState: "src/cookies/CSO.cookies.json" });
    const page = await context.newPage();

    // 1. Ir a la página
    await page.goto("https://www.csoonline.com/news/", { waitUntil: "domcontentloaded" });

    const noticias = [];
    let cont = 0;

    // Noticias destacadas
    //await resolverCookies(page);
    noticias.push(await scrapeNew(page, '//*[@id="latest"]/div/div/div[1]/div[1]'));
    if (++cont >= maxNoticias) {
        await browser.close();
        return noticias;
    }
    //await resolverCookies(page);
    noticias.push(await scrapeNew(page, '//*[@id="latest"]/div/div/div[1]/div[2]/div[1]'));
    if (++cont >= maxNoticias) {
        await browser.close();
        return noticias;
    }
    //await resolverCookies(page);
    noticias.push(await scrapeNew(page, '//*[@id="latest"]/div/div/div[1]/div[2]/div[2]'));
    if (++cont >= maxNoticias) {
        await browser.close();
        return noticias;
    }
    //await resolverCookies(page);
    noticias.push(await scrapeNew(page, '//*[@id="latest"]/div/div/div[2]/div[1]'));
    if (++cont >= maxNoticias) {
        await browser.close();
        return noticias;
    }
    //await resolverCookies(page);
    noticias.push(await scrapeNew(page, '//*[@id="latest"]/div/div/div[2]/div[2]'));
    if (++cont >= maxNoticias) {
        await browser.close();
        return noticias;
    }
    //await resolverCookies(page);
    noticias.push(await scrapeNew(page, '//*[@id="latest"]/div/div/div[2]/div[3]'));
    if (++cont >= maxNoticias) {
        await browser.close();
        return noticias;
    }
    //await resolverCookies(page);
    noticias.push(await scrapeNew(page, '//*[@id="latest"]/div/div/div[2]/div[4]'));
    if (++cont >= maxNoticias) {
        await browser.close();
        return noticias;
    }
    //await resolverCookies(page);
    noticias.push(await scrapeNew(page, '//*[@id="latest"]/div/div/div[2]/div[5]'));
    if (++cont >= maxNoticias) {
        await browser.close();
        return noticias;
    }
    //await resolverCookies(page);
    noticias.push(await scrapeNew(page, '//*[@id="latest"]/div/div/div[2]/div[6]'));
    if (++cont >= maxNoticias) {
        await browser.close();
        return noticias;
    }

    while (cont < maxNoticias) {
        for (let j = 1; cont < maxNoticias; j++, cont++) {
            //console.log(cont);
            //await resolverCookies(page);

            // 1. Seleccionar el DIV[j]
            const xpathDiv = `//*[@id="remove_no_follow"]/section[3]/div/div/div[${j}]`;
            const divLocator = page.locator(xpathDiv);

            // si el div no existe → fin de lista
            if ((await divLocator.count()) === 0) break;

            /*
            // 2. comprobar si es publicidad (advert__container)
            const clase = await divLocator.getAttribute("class");
            if (clase && clase.includes("advert__container")) {
                // Cada vez que hay un div de publicidad, el siguiente div de noticia incrementa en 2 su contador
                // De esta forma, saltamos los divs que no sean de noticias
                j++;
                cont--;
                continue;
            }
            */

            // 3. comprobar si dentro del div hay un <a>
            const xpathA = `${xpathDiv}/a`;
            const aCount = await page.locator(xpathA).count();

            if (aCount === 0) {
                // No hay <a> ⇒ no es noticia, puede ser un banner, un contenedor vacío, etc.
                cont--;
                continue;
            }

            // 4. Si llegamos aquí → sí hay un <a>, ahora llamar a tu scraper exactamente como lo necesitas
            const noticia = await scrapeNew(page, xpathA);
            noticias.push(noticia);
        }

        if (cont < maxNoticias) {
            const botonSiguiente = await page.locator("a.next.pagination__link");
            const botonExiste = await botonSiguiente.count();

            if (botonExiste === 0) {
                // No hay más páginas, salir del bucle externo
                break;
            }

            await botonSiguiente.click();
            await page.waitForLoadState("domcontentloaded");
        }
    }

    await browser.close();
    return noticias;
}

/*
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
*/

async function scrapeNew(page: Page, xpath: string) {
    // 2. Localizar el enlace de la noticia directamente por XPath
    const enlaceNoticia = page.locator(xpath);

    // 3. Esperar a que esté visible
    await enlaceNoticia.waitFor();

    // 4. Hacer click
    await enlaceNoticia.click();

    // 5. Esperar a que cargue la noticia
    await page.waitForLoadState("domcontentloaded");

    // Título
    const tituloLocator = page.locator('xpath=//*[@id="primary"]/div[1]/div/div[2]/div/h1');
    const countTitulo = await tituloLocator.count();

    let title = "N/A";
    if (countTitulo > 0) {
        title = await tituloLocator.innerText();
    }

    // Autor
    const autorLocator = page.locator('//*[@id="primary"]/div[1]/div/div[1]/div[1]/div/div/div/a');
    const countAutor = await autorLocator.count();

    let author = "N/A";
    if (countAutor > 0) {
        author = await autorLocator.first().innerText();
        /*
        Se añade ".first()" puesto que hay veces que falla si hay más de un autor
        Noticia en concreto -> https://www.csoonline.com/article/4101486/coupang-leaks-personal-information-of-33-7-million-accounts-suspected-of-poor-authentication-key-management.html
        */
    }

    // Fecha
    const fechaLocator = page.locator('//*[@id="primary"]/div[1]/div/div[2]/div/div[1]/div[2]/span[1]');
    const countFecha = await fechaLocator.count();

    let date = "N/A";
    if (countFecha > 0) {
        const fechaString = await fechaLocator.innerText();
        const fechaParseada = parse(fechaString, "MMM dd, yyyy", new Date());
        if (isValid(fechaParseada)) {
            date = format(fechaParseada, "MMMM dd, yyyy");
        }
    }

    // Palabras clave
    const keywords = [];

    const url = page.url();
    const match = url.match(/article\/(\d+)\//);
    const id = match ? match[1] : null;

    if (id) {
        let i = 1;

        while (true) {
            const xpath = `//*[@id="post-${id}"]/section/div/div[1]/div/div/div[3]/div/div/span[${i}]/a`;
            const locator = page.locator(xpath);

            // Si no hay más spans → salir del bucle
            if (await locator.count() === 0) break;

            // Obtener texto del <a> y guardarlo
            const palabra = await locator.innerText();
            keywords.push(palabra);

            i++; // siguiente
        }
    }

    // URL
    //const url = page.url();

    // Fuente
    const source = "CSO Online";

    // volver a la página anterior
    await page.goBack({ waitUntil: "domcontentloaded" });

    return { title, author, date, keywords, url, source };
}

export default scrapeCSO;
