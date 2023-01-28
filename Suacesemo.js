const { By, Builder, until } = require("selenium-webdriver");
const { assert, expect } = require('chai');
require('chai').should();
chrome = require('selenium-webdriver/chrome');
let screen = {
    width: 1920,
    height: 1080
  };


describe("Checkout 2 product", function () {
    this.timeout(10000);

    // after('Tear down', async function () {
    //     await driver.quit();
    //   });

    it('open website', async function(){
        driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().windowSize(screen)).build();
        await driver.get('https://www.saucedemo.com/');
        await driver.wait(until.elementLocated(By.xpath('//div[@class="bot_column"]')), 20000);
    });

    it('Login', async function() {
        await driver.findElement(By.xpath('//input[@id="user-name"]')).sendKeys('standard_user');
        await driver.findElement(By.xpath('//input[@id="password"]')).sendKeys('secret_sauce');
        await driver.findElement(By.xpath('//input[@value="standard_user"]'));
        await driver.findElement(By.xpath('//input[@value="secret_sauce"]'));
        await driver.findElement(By.xpath('//input[@id="login-button"]')).click();
    });

    it('Add to card', async function() {
      await driver.findElement(By.xpath('//span[@class="title"][contains(text(), "Products")]'))
      let productsList = await driver.findElements(By.xpath('//button[@class="btn btn_primary btn_small btn_inventory"]'));
      let products = productsList.length;
      randomNum1 = Math.floor(Math.random() * (products - 1));
      randomNum2 = Math.floor(Math.random() * (products - 1));
      productsList[randomNum1].click();
      productsList[randomNum2].click();
      await driver.sleep(3000);
    });

    it('Checkout products', async function() {
      globalThis.firstProductsNames = await driver.wait(until.elementLocated(By.xpath(`(//div[@class="inventory_item_name"])[${randomNum1}]`)), 20000).getText()
      globalThis.secondProductsNames = await driver.wait(until.elementLocated(By.xpath(`(//div[@class="inventory_item_name"])[${randomNum2}]`)), 20000).getText()
    })

});