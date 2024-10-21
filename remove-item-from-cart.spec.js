const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

// Função para criar um atraso
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

describe("Remove Item from Cart with Delays", function () {
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        await driver.quit();
    });

    it("Remove item from cart", async function () {
        this.timeout(60000); // Aumenta o timeout para garantir tempo suficiente

        try {
            // Acessar a página de login
            await driver.get("https://www.saucedemo.com/");
            await sleep(2000); // Pausa de 2 segundos

            // Inserir credenciais e fazer login
            await driver.findElement(By.id("user-name")).sendKeys("standard_user");
            await driver.findElement(By.id("password")).sendKeys("secret_sauce", Key.RETURN);
            await sleep(2000); // Pausa de 2 segundos

            // Verificar navegação para a página de inventário
            await driver.wait(until.urlContains("inventory"), 5000);
            await sleep(2000); // Pausa de 2 segundos

            // Adicionar item ao carrinho
            await driver.findElement(By.css(".inventory_item button")).click();
            await sleep(2000); // Pausa de 2 segundos

            // Esperar pelo badge do carrinho
            let cartBadge = await driver.wait(until.elementLocated(By.css(".shopping_cart_badge")), 10000); // Aumentado para 10 segundos
            await sleep(2000); // Pausa de 2 segundos

            // Verificar se o item foi adicionado ao carrinho
            let cartCount = await cartBadge.getText();
            assert.strictEqual(cartCount, "1");
            await sleep(2000); // Pausa de 2 segundos

            // Ir para o carrinho
            await driver.findElement(By.css(".shopping_cart_link")).click();
            await sleep(2000); // Pausa de 2 segundos

            // Aguardar o botão de remover ser carregado e visível
            const removeButton = await driver.wait(until.elementLocated(By.css(".cart_button")), 15000); // Aumentado para 15 segundos
            await driver.wait(until.elementIsVisible(removeButton), 5000);
            await sleep(2000); // Pausa de 2 segundos

            // Clicar no botão de remover
            await removeButton.click();
            await sleep(2000); // Pausa de 2 segundos para observar a atualização da interface

            // Verificar se o badge do carrinho não está mais presente
            const cartBadges = await driver.findElements(By.css(".shopping_cart_badge"));
            assert.strictEqual(cartBadges.length, 0); // Verificar se não há mais badge indicando itens no carrinho
            await sleep(2000); // Pausa final de 2 segundos
        } catch (error) {
            throw error; // Re-lançar o erro para que o Mocha registre a falha
        }
    });
});
