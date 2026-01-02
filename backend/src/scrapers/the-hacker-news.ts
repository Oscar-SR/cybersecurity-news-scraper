import { chromium, Page } from "playwright";
import { parse, format } from "date-fns";

async function scrapeTheHackerNews(maxNoticias: number) {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // 1. Ir a la página
    await page.goto("https://thehackernews.com/", { waitUntil: "domcontentloaded" });

    const noticias = [];
    let cont = 0;
    while (cont < maxNoticias) {
        for (let j = 1; cont < maxNoticias; j++, cont++) {
            const xpath = `//*[@id="Blog1"]/div[1]/div[${j}]/a`;
            const elementos = await page.locator(xpath).count();

            if (elementos === 0) {
                // Si no existe, salir del for
                break;
            }

            //console.log("Noticia " + i + " " + j);
            const noticia = await scrapeNew(page, xpath);
            noticias.push(noticia);
        }

        if (cont < maxNoticias) {
            const botonSiguiente = await page.locator('//*[@id="Blog1_blog-pager-older-link"]');
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
    const tituloLocator = page.locator('xpath=//*[@id="app"]/div/h1/a');
    const countTitulo = await tituloLocator.count();

    let title = "N/A";
    if (countTitulo > 0) {
        title = await tituloLocator.innerText();
    }

    // Autor
    const autorLocator = page.locator('//*[@id="Blog1"]/div/div/div/div[4]/div/span[1]/span[2]');
    const countAutor = await autorLocator.count();

    let author = "N/A";
    if (countAutor > 0) {
        author = await autorLocator.innerText();
    }

    // Fecha
    const fechaLocator = page.locator('//*[@id="Blog1"]/div/div/div/div[4]/div/span[1]/span[1]');
    const countFecha = await fechaLocator.count();

    let date = "N/A";
    if (countFecha > 0) {
        const fechaString = await fechaLocator.innerText();
        const fechaParseada = parse(fechaString, "MMM dd, yyyy", new Date());
        date = format(fechaParseada, "MMMM dd, yyyy");
    }

    // Palabras clave
    const palabrasClaveLocator = page.locator('//*[@id="Blog1"]/div/div/div/div[4]/div/span[2]');
    const countPalabrasClave = await palabrasClaveLocator.count();

    let keywords: string[] = [];
    if (countPalabrasClave > 0) {
        const palabrasClaveString = await palabrasClaveLocator.innerText();
        keywords = palabrasClaveString.split(" / ");
    }

    // URL
    const url = page.url();

    // Fuente
    const source = "The Hacker News";

    // volver a la página anterior
    await page.goBack({ waitUntil: "domcontentloaded" });

    return { title, author, date, keywords, url, source };
}

export default scrapeTheHackerNews;
