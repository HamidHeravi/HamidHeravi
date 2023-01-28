const { By, until } = require("selenium-webdriver");
const { assert } = require('chai');
require('chai').should();
chrome = require('selenium-webdriver/chrome');
globalThis.screen = {
    width: 1920,
    height: 1080
  };


class Objects{
    constructor(driver) {
        this.driver = driver;
    }

    async Login(username, password) {
        await this.driver.findElement(By.xpath('//input[@id="user-name"]')).sendKeys(username);
        await this.driver.findElement(By.xpath('//input[@id="password"]')).sendKeys(password);
        await this.driver.findElement(By.xpath(`//input[@value="${username}"]`));
        await this.driver.findElement(By.xpath(`//input[@value="${password}"]`));
        await this.driver.findElement(By.xpath('//input[@id="login-button"]')).click();
    }

    async AddToCard() {
        await this.driver.findElement(By.xpath('//span[@class="title"][contains(text(), "Products")]'))
        let productsList = await this.driver.findElements(By.xpath('//button[@class="btn btn_primary btn_small btn_inventory"]'));
        let products = productsList.length;
        globalThis.randomNum1 = Math.floor(Math.random() * (products)) + 1;
        globalThis.randomNum2 = Math.floor(Math.random() * (products)) + 1;
        await this.driver.sleep(3000);
        productsList[randomNum1].click();
        productsList[randomNum2].click();
    }

    async GetProductsText(selector) {
        return await this.driver.wait(until.elementLocated(By.xpath(selector)), 10000).getText();
        // globalThis.secondProductsText = await this.driver.wait(until.elementLocated(By.xpath(selector2)), 20000).getText();
    }
}

module.exports = Objects;

