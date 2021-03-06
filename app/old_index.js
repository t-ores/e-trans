const fs = require('fs');
const path = require('path');
const puppeteer = require ('puppeteer');
const userAgent = require('user-agents');
const func = require('./func.js');
const killProcess = require('kill-process-by-name');

let link = 'https://opendata.e-transport.gov.ua/PermitsRests/';

/*-------------customChrome----------------------------------*/
let customChrome = func.chrome;
/*-------------customChrome----------------------------------*/
let downloads = path.resolve(__dirname, '../tmp/xlsx');


//puppeteer.connect
//function ParseTest(param, result = '') {
async  function getXLSX(){
    try{
        let browser = await puppeteer.launch({
            userDataDir: customChrome,
            headless:false,
            //slowMo: 100,
            ignoreHTTPSErrors:true,
            devtools: true,
            args:['--no-sandbox']
        });

        //let page = await browser.newPage();
        const pages = await browser.pages();
        const page = pages[0];

        await page.setUserAgent(userAgent.toString());
        await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: downloads});

        //let dwnloadfilepage = await page;
        //waitFor-download-link
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
        //waitFor-download-link

        //**************get page cookies*****************
        //let cookiesobj = await page.cookies();
        //console.log(cookiesobj);
        //**************get page cookies*****************

        //***********setCookie***************************
        //await page.setCookie(cookiesobj);
        //***********setCookie***************************

        // click on download-link
        await page.waitForSelector('div#download-link>a');
        const filedwnldlink = await page.$('div#download-link>a');
        await filedwnldlink.click();

        /*LINK*/
        // const result_link = await page.evaluate(() => {
        //     let data = [];
        //     let link = document.querySelector('div#download-link>a').href;
        //     data.push({link});
        //     return data;
        // });
        /*LINK*/
        //let dwnlink = result_link[0].link;
        //console.log(dwnlink);

        //console.log(`Current directory: ${process.cwd()}`);

        //*******https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#event-popup********
        /*
        const [popup] = await Promise.all([
            new Promise(resolve => page.once('popup', resolve)),
            page.evaluate(() => window.open(dwnlink)),
        ]);
        */
        //*******https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#event-popup********

        //************screenshot**************************
        /*
        await page.screenshot({
            path: '../tmp/img/img_'+(i++)+'.png',
            fullPage: true
        });
        */
        //************screenshot**************************

        // click on file download href end
        console.log('click on download-link end');

        // current timestamp
        //let time = await func.timestamp();
        // current timestamp

    //get XLSXfileName
    const result = await page.evaluate(() => {
         let data = [];
         let link = document.querySelector('div#download-link>a').href;
         let sitetime = document.querySelector('#QV21>div>article>div.qv-inner-object>header>h1>div').innerText;
         sitetime = sitetime.slice(37,-1);
         let name = link.slice(90, -50);
         data.push({sitetime, name, link});
         //console.log('data x: ', data);
         return data;
     });
    //get XLSXfileName
     //console.log(result[0]['name']);

     //writeLinkInFile
     let filenametxt = './tmp/link/link.txt';
     await fs.writeFile(filenametxt, String(result[0]['name']), function (err) {
      if(err) throw err;
     });
     //writeLinkInFile

      //************close browser whis timeout**********
        setTimeout(function(){
         browser.close();
         }, 5000);
        //************close browser whis timeout**********

     //console.log(result);
     // killProcess('Chromium');
     //killProcess('chrome');
     let xlsxName = String(result[0]['name']);
     //let conv = func.Convert(xlsxName);
     func.Convert(xlsxName);
     //console.log('conv: ', conv[0]);
     //return result;

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