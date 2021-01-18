const fs = require('fs');
const path = require('path');
const puppeteer = require ('puppeteer');
const userAgent = require('user-agents');
const func = require('./func.js');

let link = 'https://opendata.e-transport.gov.ua/PermitsRests/';


/*-------------customChrome----------------------------------*/
let customChrome = func.chrome();
/*-------------customChrome----------------------------------*/
let dlttmpimgs = func.dlttmpimgs();


//puppeteer.connect
const getXLSX = async() => {
    try{
        let browser = await puppeteer.launch({
            userDataDir: customChrome,
            headless:true,
            slowMo: 100,
            ignoreHTTPSErrors:true,
            //devtools: true,
            args:['--disable-features=site-per-process','--no-sandbox']
        });

        let page = await browser.newPage();
        await page.setUserAgent(userAgent.toString());

        //waitFor-download-link
        console.log('wait-For-download-link');
        await page.goto(link, {waitUntil: 'domcontentloaded' });
        await page.waitForSelector('div.export-data');
        const selector = await page.$('div.export-data');
        await selector.click();
        await page.waitForSelector('button#doExport');
        const button = await page.$('button#doExport');
        await button.click();
        await page.waitForSelector('div#download-link>a');
        console.log('wait-For-download-link end');
        //waitFor-download-link

        //**************get page cookies*****************
        // let cookiesobj = await page.cookies();
        // console.log(cookiesobj);
        //**************get page cookies*****************

        //***********setCookie***************************
        //await page.setCookie(cookiesobj);
        //***********setCookie***************************

        let i = 0;

        // click on download-link
        await page.waitForSelector('div#download-link>a');
        const filedwnldlink = await page.$('div#download-link>a');

        /**/
        const result = await page.evaluate(() => {
            let data = [];
            let link = document.querySelector('div#download-link>a').href;
            data.push({link});
            return data;
        });
        /**/

        //***********************************************TEST
        let dwnlink = result[0].link;
        console.log(dwnlink);

        let page2 = await browser.newPage();
        await page2.setUserAgent(userAgent.toString());
        await page2.goto(dwnlink, {waitUntil: 'networkidle0' });
        await page2.setDefaultTimeout(5000);
        //************screenshot**************************
        await page2.screenshot({
            path: '../tmp/img/test_'+(i++)+'.png',
            fullPage: true
        });
        //************screenshot**************************
        //***********************************************TEST

		setTimeout(function(){
				browser.close();
  		}, 10000);
    }catch (e) {
        console.log(e);
    }
};

getXLSX();