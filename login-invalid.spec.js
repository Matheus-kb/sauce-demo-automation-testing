const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

// Função para criar um atraso
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

describe("Login Flow with Invalid Credentials and Delays", function () {
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        await driver.quit();
    });

    it("Login with invalid credentials", async function () {
        this.timeout(30000); // Aumenta o timeout para garantir que há tempo suficiente

        // Acessar a página de login
        await driver.get("https://www.saucedemo.com/");
        await sleep(2000); // Pausa de 2 segundos para observar

        // Inserir nome de usuário inválido
        await driver.findElement(By.id("user-name")).sendKeys("invalid_user");
        await sleep(2000); // Pausa de 2 segundos para observar

        // Inserir senha inválida e pressionar Enter
        await driver.findElement(By.id("password")).sendKeys("wrong_password", Key.RETURN);
        await sleep(2000); // Pausa de 2 segundos para observar

        // Aguardar que a mensagem de erro seja visível
        const errorMessageElement = await driver.wait(
            until.elementLocated(By.css(".error-message-container")),
            10000
        );
        await sleep(2000); // Pausa de 2 segundos para observar

        // Obter a mensagem de erro e verificar
        let errorMessage = await errorMessageElement.getText();
        assert.strictEqual(errorMessage.includes("Epic sadface"), true);
        await sleep(2000); // Pausa final de 2 segundos
    });
});
