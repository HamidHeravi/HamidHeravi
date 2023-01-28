const Objects = require('./pageObjects');
const { By, Builder, until } = require("selenium-webdriver");
const { assert } = require('chai');




describe("Checkout 2 product", function () {
    this.timeout(20000);
    let objects;
    let driver;

    // after('Tear down', async function () {
    //     await driver.quit();
    //   });

    it('open website', async function(){
        driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().windowSize(screen)).build();
        objects = new Objects(driver);
        await driver.get('https://www.saucedemo.com/');
        await driver.wait(until.elementLocated(By.xpath('//div[@class="bot_column"]')), 20000);
    });

    it('Login with standard user and add to card products', async function() {
        await objects.Login("standard_user", "secret_sauce");
        await objects.AddToCard();
    });

    it('Get products info and got to checkout page', async function() {
        globalThis.firstPrdName = await objects.GetProductsText(`(//div[@class="inventory_item_name"])[${randomNum1+1}]`); // get product name
        globalThis.secondPrdName = await objects.GetProductsText(`(//div[@class="inventory_item_name"])[${randomNum2+1}]`);
        globalThis.firstPrdPrice = await objects.GetProductsText(`(//div[@class="inventory_item_price"])[${randomNum1+1}]`); // get product price
        globalThis.secondPrdPrice = await objects.GetProductsText(`(//div[@class="inventory_item_price"])[${randomNum2+1}]`);
        await driver.findElement(By.xpath('//span[@class="shopping_cart_badge"][contains(text(), "2")]')).click();
        await driver.findElement(By.xpath('//span[@class="title"][contains(text(), "Your Cart")]'))
    })

    it('Validate products in the your cards page', async function() {
        let name1 = await objects.GetProductsText('(//div[@class="inventory_item_name"])[1]'); // get product name
        let name2 = await objects.GetProductsText('(//div[@class="inventory_item_name"])[2]');
        let price1 = await objects.GetProductsText('(//div[@class="inventory_item_price"])[1]'); // get product price
        let price2 = await objects.GetProductsText('(//div[@class="inventory_item_price"])[2]');
        assert.equal(firstPrdName, name1, 'first product name is invalid');
        assert.equal(secondPrdName, name2, 'second product name is invalid');
        assert.equal(firstPrdPrice, price1, 'first product price is invalid');
        assert.equal(secondPrdPrice, price2, 'second product price is invalid');
    })

    

});