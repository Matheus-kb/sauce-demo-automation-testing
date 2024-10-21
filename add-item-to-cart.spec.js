const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

// Função para criar um atraso
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

describe("Add Item to Cart with Delays", function () {
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        await driver.quit();
    });

    it("Add item to cart", async function () {
        this.timeout(30000); // Aumenta o timeout para garantir que há tempo suficiente

        // Acessar a página inicial
        await driver.get("https://www.saucedemo.com/");
        await sleep(2000); // Pausa de 2 segundos para observar

        // Inserir credenciais de login
        await driver.findElement(By.id("user-name")).sendKeys("standard_user");
        await driver.findElement(By.id("password")).sendKeys("secret_sauce", Key.RETURN);
        await sleep(2000); // Pausa de 2 segundos para observar

        // Verificar se o login foi bem-sucedido e navegar para a página de inventário
        await driver.wait(until.urlContains("inventory"), 5000);
        await sleep(2000); // Pausa de 2 segundos para observar

        // Adicionar um item ao carrinho
        await driver.findElement(By.css(".inventory_item button")).click();
        await sleep(2000); // Pausa de 2 segundos para observar

        // Verificar se o item foi adicionado ao carrinho
        let cartBadge = await driver.findElement(By.css(".shopping_cart_badge")).getText();
        await sleep(2000); // Pausa de 2 segundos para observar

        // Exibir o número de itens no carrinho
        assert.strictEqual(cartBadge, "1", "O item não foi adicionado corretamente.");
        await sleep(2000); // Pausa final de 2 segundos
    });
});
