const email = '';
const password = '';
const crashImgSrc = '/static/media/crashBg.8165743b5aa9ab44e5f0.png';

const waitTime = 10000;

const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

driver.manage().window().maximize();

driver.get('https://betfiery.com').then(function(){
    try {
        var modalCloseButton = driver.findElement(By.xpath("//button[@class='ant-modal-close']"));

        driver.wait(until.elementIsEnabled(modalCloseButton)).then(() => modalCloseButton.click());

        var loginButtonLocator = By.xpath("//div[@class='loginBtn']");

        waitAndClick(driver, loginButtonLocator);

        var emailInputLocator = By.id('basic_email');
        var passwordInputLocator = By.id('basic_password');

        waitAndSendKeys(driver, emailInputLocator, email);
        waitAndSendKeys(driver, passwordInputLocator, password);

        var loginActionButtonLocator = By.xpath("//div[@class='logInActionBtn']");

        waitAndClick(driver, loginActionButtonLocator);

        var crashButtonLocator = By.xpath(`//img[@src='${crashImgSrc}']//div[@class='ListBlock_gamePreviewBtnPlay__JiNoE']`);

        waitAndClick(driver, crashButtonLocator);

        var betAmountInputLocator = By.id('betAmountInput');

        waitAndSendKeys(betAmountInputLocator);

        /*
        driver.findElement(By.id('betAmountInput')).sendKeys('1').then(function(){
            var button = driver.findElement(By.xpath("//button[@class='bet3DButton_btn__B66Sj bet3DButton_btn_lg__Srkwa bet3DButton_btn3d__Cncpu bet3DButton_second__sRRCJ']"));
            //var buttonP = button.findElement(By.xpath("//p[@class='betButton_betBtnText__EgiE6']"));
            
            driver.wait(until.elementIsVisible(button.findElement(By.xpath("//p[text()='BET']")))).then(() => {
                button.findElement(By.xpath("//p[text()='BET']")).click();
            })
        });
        */
    } catch (error) {
        console.log(error);
    }
}).finally(() => {
    setTimeout(() => {  
        driver.quit();
        console.log("End!\n\n");
    }, waitTime);
});

const waitAndClick = (driver, locator) => {
    driver.wait(until.elementLocated(locator), waitTime).then(() => {
        driver.findElement(locator).click();
    });
}

const waitAndSendKeys = (driver, locator, text) => {
    driver.wait(until.elementLocated(locator), waitTime).then(() => {
        driver.findElement(locator).sendKeys(text);
    });
}