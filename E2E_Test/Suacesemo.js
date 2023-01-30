const Objects = require('./Pages/pageObjects');
const { By, Builder, until } = require("selenium-webdriver");
const { assert } = require('chai');
chrome = require('selenium-webdriver/chrome');


describe("Checkout 2 product", function () {
    this.timeout(20000);
    let objects;
    let driver;
    let pattern = /\d+.+\d/;
    screen = {
        width: 1920,
        height: 1080
      };

    after('Tear down', async function () {
        await driver.quit();
      });

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
        let priceVal1 = parseFloat(pattern.exec(price1));
        let priceVal2 = parseFloat(pattern.exec(price2));
        globalThis.sum = priceVal1 + priceVal2
    })

    it('go to checkout overview', async function() {
        await driver.findElement(By.xpath('//button[@id="checkout"]')).click(); // click on the checkout btn
        await driver.findElement(By.xpath('//span[@class="title"][contains(text(), "Checkout: Your Information")]'));
        await objects.InputUserInfo('testUser', 'lastName', '60306'); // input user info

    })

    it('check total item price', async function() {
        let totalPrice = await objects.GetProductsText('//div[@class="summary_subtotal_label"]'); // get total item
        let totalPriceVal = parseFloat(pattern.exec(totalPrice));
        assert.equal(totalPriceVal, sum, 'The total price is not equal to the total price of the products');
        await driver.findElement(By.xpath('//button[@id="finish"]')).click(); //click on the finish btn
        await driver.findElement(By.xpath('//h2[@class="complete-header"][contains(text(), "THANK YOU FOR YOUR ORDER")]'));

    })

    it('logout and login with locked out user', async function() {
      await objects.Logout();
      await objects.Login("locked_out_user", "secret_sauce");
      await driver.findElement(By.xpath('//h3[@data-test="error"][contains(text(), "Epic sadface: Sorry, this user has been locked out.")]'));
    })

    

});