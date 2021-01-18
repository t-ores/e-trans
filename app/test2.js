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
        const options = {
            userDataDir: customChrome,
            headless: false,
            devtools: false,
            ignoreHTTPSErrors: true,
            args: [
                `--no-sandbox`,
                `--disable-setuid-sandbox`,
                `--ignore-certificate-errors`
            ]
        };

        const options2 = {
            userDataDir: customChrome,
            headless:true,
            slowMo: 100,
            ignoreHTTPSErrors:true,
            //devtools: true,
            args: [
                `--no-sandbox`,
                `--disable-setuid-sandbox`,
                `--ignore-certificate-errors`,
                '--disable-features=site-per-process'
            ]
        };

        let browser = await puppeteer.launch(options2);

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
        //await page.waitForSelector('div#download-link>a');
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
        //*****************browserWSEndpoint************************
        const browserWSEndpoint = await browser.wsEndpoint();
        //console.log(browserWSEndpoint);
        //*****************browserWSEndpoint**********************

        let dwnlink = result[0].link;
        console.log(dwnlink);

        let connectopt = {
            browserWSEndpoint: browserWSEndpoint,
            ignoreHTTPSErrors: true
        };

        let context1 = await browser.browserContexts();
        console.log('context1 => ', context1);
        browser.disconnect();

        let browser2 = await puppeteer.connect(connectopt);

        //const page2 = (await browser2.pages()[1]);
        // const pagesCount = (await browser2.pages());
        //console.log('pagesCount -> ', pagesCount);

        //page2.goto(dwnlink);
        //let page2 = await browser2.newPage();
        let page2 = await browser2.newPage();

        try {
            await page2.goto(dwnlink);
            page2.setDefaultTimeout(5000);
            let context = await browser2.browserContexts();
            console.log('context=> ', context);
        } catch (error) {
            console.log(error);
        }
        //
        //await page2.setDefaultTimeout(5000);
        //***********************************************TEST

        setTimeout(function(){
            browser.close();
        }, 10000);
    }catch (e) {
        console.log(e);
    }
};

getXLSX();