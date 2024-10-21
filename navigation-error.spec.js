const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

// Função para criar um atraso
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

describe("Navigation to Non-Existent Page with Delays", function () {
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        await driver.quit();
    });

    it("Test navigation to non-existent page (Simulating signup)", async function () {
        this.timeout(30000); // Aumenta o timeout para garantir que há tempo suficiente

        // Acessar uma página inexistente
        await driver.get("https://www.saucedemo.com/nonexistentpage");
        await sleep(2000); // Pausa de 2 segundos para observar

        // Pegar o conteúdo do corpo da página
        let bodyText = await driver.findElement(By.tagName("body")).getText();
        await sleep(2000); // Pausa de 2 segundos para observar

        // Exibir o conteúdo do corpo da página no console
        await sleep(2000); // Pausa de 2 segundos para observar

        // Verificar se o corpo da página está vazio (indicando que a página não existe)
        assert.strictEqual(bodyText.trim().length === 0, true);
        await sleep(2000); // Pausa final de 2 segundos
    });
});
