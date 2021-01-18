const fs = require('fs');
const path = require('path');
const puppeteer = require ('puppeteer');
const userAgent = require('user-agents');
const func = require('./func.js');

let link = 'https://opendata.e-transport.gov.ua/PermitsRests/';

/*-------------customChrome----------------------------------*/
let customChrome = func.chrome();
/*-------------customChrome----------------------------------*/

//puppeteer.connect
const getXLSX = async() => {
    try{
        const options1 = {
            userDataDir: customChrome,
            headless:false,
            slowMo: 100,
            ignoreHTTPSErrors:true,
            devtools: true,
            args: [
                `--no-sandbox`,
                `--disable-setuid-sandbox`,
                `--ignore-certificate-errors`,
                '--disable-features=site-per-process'
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
        let browser = await puppeteer.launch(options1);
        let page = await browser.newPage();
        await page.setUserAgent(userAgent.toString());

        //*****************wait for #download-link is loaded****************************************
        console.log('wait for #download-link is loaded start...');
        await page.goto(link, {waitUntil: 'domcontentloaded' });
        await page.waitForSelector('div.export-data');
        const selector = await page.$('div.export-data');
        await selector.click();
        await page.waitForSelector('button#doExport');
        const button = await page.$('button#doExport');
        await button.click();
        await page.waitForSelector('div#download-link>a');
        console.log('#download-link is loaded!');
        //*****************wait for #download-link is loaded end****************************************
        //*****************get the download link********************************************************
        const result = await page.evaluate(() => {
            let data = [];
            let link = document.querySelector('div#download-link>a').href;
            data.push({link});
            return data;
        });
        let downloadlink = result[0].link;
        //*****************get the download link********************************************************

        //**********************************************************************************************
        (async () => {
            try {
                const browserWSEndpoint = await browser.wsEndpoint();
                const con_opt = {
                    browserWSEndpoint: browserWSEndpoint,
                    ignoreHTTPSErrors: true,
                    slowMo: 100
                };
                //const browser2 = await puppeteer.launch();
                const browser2 = await puppeteer.connect(con_opt);
                const page2 = await browser2.newPage();

                //await page2.goto(downloadlink);
                //***************************Request Interception****************************************
                /*
                await page2.setRequestInterception(true);
                page2.on('request', (request) => {
                    if (request.resourceType() === 'document') {
                        request.continue();
                    } else {
                        request.abort();
                    }
                });
                */
                //***************************Request Interception****************************************

                //*******https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#event-popup********
                const [popup] = await Promise.all([
                    new Promise(resolve => page.once('popup', resolve)),
                    page.evaluate(() => window.open(downloadlink)),
                ]);
                //*******https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#event-popup********

                //await page2.goto(downloadlink);
                console.log('go to download...');
                await page2.setDefaultTimeout(5000);
                await browser2.close();
                console.log('ok!');
            }catch (e) {
                console.log(e);
            }

        })();
        //*********************************************************************************************

        setTimeout(function(){
            browser.close();
        }, 30000);
    }catch (e) {
        console.log(e);
    }
};
getXLSX();