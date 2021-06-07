import 'chromedriver';
import { Builder, By, until } from 'selenium-webdriver';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import {
  IPT_SEARCH,
  BTN_SEARCH,
  TXT_PRODUCT_NAME,
} from './constants.js';

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('# Search Product', () => {
  let driver;

  beforeEach(async () => {
    driver = new Builder().forBrowser('chrome').build();
    await driver.get('https://www.bukalapak.com/');
  });

  afterEach(() => {
    driver.close();
  });


  it('should display the search result as expected', async () => {
    var productName = ""
    var curProdName = ""

    productName= 'Iphone 12';

    await driver
      .findElement(By.xpath(IPT_SEARCH))
      .sendKeys(productName);
    
    await driver
      .findElement(By.xpath(BTN_SEARCH))
      .click();

    curProdName = await driver
      .findElement(By.xpath(TXT_PRODUCT_NAME))
      .getText();

      productName = productName.toLowerCase();
      curProdName = curProdName.toLowerCase();

      expect(curProdName).to.contain(productName);
    });
});