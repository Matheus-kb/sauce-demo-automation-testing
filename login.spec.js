const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

// Função para criar um atraso
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

describe("Login Flow with Delays", function () {
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        await driver.quit();
    });

    it("Login with valid credentials", async function () {
        this.timeout(30000); // Aumenta o timeout para garantir que há tempo suficiente

        // Acessar a página de login
        await driver.get("https://www.saucedemo.com/");
        await sleep(2000); // Pausa de 2 segundos para observar

        // Inserir nome de usuário
        await driver.findElement(By.id("user-name")).sendKeys("standard_user");
        await sleep(2000); // Pausa de 2 segundos para observar

        // Inserir senha e pressionar Enter
        await driver.findElement(By.id("password")).sendKeys("secret_sauce", Key.RETURN);
        await sleep(2000); // Pausa de 2 segundos para observar

        // Aguardar que o URL mude para a página de inventário
        await driver.wait(until.urlContains("inventory"), 10000);
        let currentUrl = await driver.getCurrentUrl();
        await sleep(2000); // Pausa de 2 segundos após o login
        
        // Verificar se o login foi bem-sucedido
        assert.strictEqual(currentUrl.includes("inventory"), true);
        await sleep(2000); // Pausa final de 2 segundos
    });
});