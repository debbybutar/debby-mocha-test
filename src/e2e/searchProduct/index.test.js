import 'chromedriver';
import { Builder, By, until } from 'selenium-webdriver';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const driver = new Builder().forBrowser('chrome').build();
const expect = chai.expect;

describe('# Search Product', () => {
  before(async () => {
    await driver.get('https://www.bukalapak.com/');
  });

  it('should display the search result as expected', () => {});
});