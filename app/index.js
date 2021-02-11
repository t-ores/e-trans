const fs = require('fs');
const path = require('path');
const puppeteer = require ('puppeteer');
const userAgent = require('user-agents');
const func = require('./func.js');
const killProcess = require('kill-process-by-name');

let link = 'https://opendata.e-transport.gov.ua/PermitsRests/';

/*-------------customChrome----------------------------------*/
//let customChrome = func.chrome;
//console.log(customChrome);
/*-------------customChrome----------------------------------*/
let downloads = path.resolve(__dirname, '../tmp/xlsx');



async function getXLSX(){
    try{
        let browser = await puppeteer.launch({
            userDataDir: '../customChrome',
            headless:false,
            ignoreHTTPSErrors:true,
            //devtools: true,
            //slowMo: 100,
            args:['--disable-features=site-per-process','--no-sandbox']
        });

        const pages = await browser.pages();
        const page = pages[0];
        await page.setUserAgent(userAgent.toString());
        await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: downloads});

        console.log('waitFor-download-link');
        await page.goto(link, {waitUntil: 'domcontentloaded' });
        await page.waitForSelector('div.export-data');
        const selector = await page.$('div.export-data');
        await selector.click();
        await page.waitForSelector('button#doExport');
        const button = await page.$('button#doExport');
        await button.click();
        await page.waitForSelector('div#download-link>a');
        console.log('waitFor-download-link end');

        // click on download-link
        await page.waitForSelector('div#download-link>a');
        const filedwnldlink = await page.$('div#download-link>a');
        await filedwnldlink.click();
        // click on download-link end
        console.log('click on download-link end');

        //get XLSXfileName
        const result = await page.evaluate(() => {
             let data = [];
             let link = document.querySelector('div#download-link>a').href;
             let sitetime = document.querySelector('#QV21>div>article>div.qv-inner-object>header>h1>div').innerText;
             sitetime = sitetime.slice(37,-1);
             let name = link.slice(90, -50);
             data.push({
                 sitetime,
                 name,
                 link
             });
             return data;
         });
        //get XLSXfileName


        let xlsxName = await String(result[0]['name']);
        let conv = await func.Convert(xlsxName);
        //await func.Convert(xlsxName);
        //return conv;
        //func.prmToday(xlsxName);
        //console.log('conv: ', conv);

        //************close browser whis timeout**********
        await setTimeout(function(){
         console.log('timeout...');
        }, 5000);

        await Promise.all(pages.map(page =>page.close()));
        await browser.close();
        //************close browser whis timeout**********

        await func.isRunning('сhrome.exe', (status) => {
            do {
                killProcess('Chromium');
                console.log('process Chromium kill');
            } while (status === true);
        });

    }catch (e) {
        console.log(e);
    }finally {
        console.log('finito...');
    }
}
getXLSX();

module.exports = {
 getXLSX: getXLSX
};