const { By, until } = require("selenium-webdriver");
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
        await this.driver.findElement(By.xpath('//span[@class="title"][contains(text(), "Products")]'));
        await this.driver.sleep(3000);
        let productsList = await this.driver.findElements(By.xpath('//button[@class="btn btn_primary btn_small btn_inventory"]'));
        let products = productsList.length;
        globalThis.randomNum1 = Math.floor(Math.random() * (products));
        globalThis.randomNum2 = Math.floor(Math.random() * (products));
        productsList[randomNum1].click();
        productsList[randomNum2].click();
    }

    async GetProductsText(selector) {
        return await this.driver.wait(until.elementLocated(By.xpath(selector)), 10000).getText();
    }

    async InputUserInfo(firstName, lastName, postalCode) {
        await this.driver.findElement(By.xpath('//input[@id="first-name"]')).sendKeys(firstName);
        await this.driver.findElement(By.xpath('//input[@id="last-name"]')).sendKeys(lastName);
        await this.driver.findElement(By.xpath('//input[@id="postal-code"]')).sendKeys(postalCode);
        await this.driver.findElement(By.xpath('//input[@id="continue"]')).click();
    }

    async Logout() {
        await this.driver.findElement(By.xpath('//button[@id="react-burger-menu-btn"]')).click();
        await this.driver.sleep(1000);
        await this.driver.findElement(By.xpath('//a[@id="logout_sidebar_link"]')).click();
        await this.driver.findElement(By.xpath('//input[@id="login-button"]'));
    }
}

module.exports = Objects;

