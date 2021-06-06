import 'chromedriver';
import { Builder, By, until } from 'selenium-webdriver';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import {
  BTN_LOGIN,
  INPUT_USERNAME,
  INPUT_PASSWORD,
  BTN_LOGIN_SUBMIT,
  ELEM_LOGGEDIN_IDENTIFIER,
  ELEM_ERROR_LOGIN_IDENTIFIER,
} from './constants.js';

chai.use(chaiAsPromised);
const driver = new Builder().forBrowser('chrome').build();
const expect = chai.expect;

describe('# Login', () => {
  beforeEach(async () => {
    await driver.get('https://www.bukalapak.com/');
  });

  it('should be failed to login when using the invalid username and password', async () => {
    const username = 'debbytest212@gmail.com';
    const password = 'asdasd';

    await driver
      .findElement(By.xpath(BTN_LOGIN))
      .click();

    await driver
      .findElement(By.xpath(INPUT_USERNAME))
      .sendKeys(username);

    await driver
      .findElement(By.xpath(INPUT_PASSWORD))
      .sendKeys(password);

    await driver
      .findElement(By.xpath(BTN_LOGIN_SUBMIT))
      .click();

    await driver
      .wait(until.elementLocated(By.xpath(ELEM_ERROR_LOGIN_IDENTIFIER)));
    
    return expect(driver.findElement(By.xpath(ELEM_ERROR_LOGIN_IDENTIFIER))).to.eventually.exist;
  });

  it('should be successful to login when using the valid username and password', async () => {
    const username = 'debbytest212@gmail.com';
    const password = 'abc123';

    await driver
      .findElement(By.xpath(BTN_LOGIN))
      .click();

    await driver
      .findElement(By.xpath(INPUT_USERNAME))
      .sendKeys(username);

    await driver
      .findElement(By.xpath(INPUT_PASSWORD))
      .sendKeys(password);

    await driver
      .findElement(By.xpath(BTN_LOGIN_SUBMIT))
      .click();

    await driver
      .wait(until.elementLocated(By.xpath(ELEM_LOGGEDIN_IDENTIFIER)));
    
    return expect(driver.findElement(By.xpath(ELEM_LOGGEDIN_IDENTIFIER))).to.eventually.exist;
  });
});