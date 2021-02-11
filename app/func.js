const fs = require('fs');
const path = require('path');

/*-------------Current Timestamp----------------------------------*/
function geTimeStamp() {
		const ts = Date.now();
		const date_ob = new Date(ts);
		const hours = date_ob.getHours();
		const minutes = date_ob.getMinutes();
		const date = date_ob.getDate();
		const month = date_ob.getMonth() + 1;
		const year = date_ob.getFullYear();
		const timestamp = date+"."+month+"."+year+" "+hours+":"+minutes;
		return timestamp;
}
module.exports.timestamp = geTimeStamp;
/*-------------Current Timestamp end----------------------------------*/

/*----------------------customChrome----------------------------------*/
var customChrome = function() {
	let customChrome = path.resolve(__dirname, '../customChrome');
	let prefs = fs.readFileSync(customChrome+'/Default/Preferences');
	let obj = JSON.parse(prefs);
	obj.savefile.default_directory = path.resolve(__dirname, '../tmp/xlsx');
	obj.download.default_directory = path.resolve(__dirname, '../tmp/xlsx');
	fs.writeFileSync(customChrome+'/Default/Preferences', JSON.stringify(obj));
	return customChrome;
};
module.exports.chrome = customChrome;
/*-------------customChrome----------------------------------*/

/*-------------DeleteTMPimgs----------------------------------*/
/*
var DeleteTMPimgs = function() {
	const directory = path.resolve(__dirname, '../tmp/img');
	fs.readdir(directory, (err, files) => {
		if (err) throw err;
		for (const file of files) {
			fs.unlink(path.join(directory, file), err => {
				if (err) throw err;
			});
		}
	});
};
module.exports.dlttmpimgs = DeleteTMPimgs;
 */
/*-------------DeleteTMPimgs----------------------------------*/

/*-------------DeleteTMPjson----------------------------------*/
var DeleteTMPjson = function() {
	const directory = path.resolve(__dirname, '../tmp/json');
	fs.readdir(directory, (err, files) => {
		if (err) throw err;
		for (const file of files) {
			fs.unlink(path.join(directory, file), err => {
				if (err) throw err;
			});
		}
	});
};
module.exports.dlttmpjson = DeleteTMPjson;
/*-------------DeleteTMPjson----------------------------------*/

/*-------------DeleteTMPdownloads----------------------------------*/
function DeleteTMPxlsx() {
	const directory = path.resolve(__dirname, '../tmp/xlsx');
	fs.readdir(directory, (err, files) => {
		if (err) throw err;
		for (const file of files) {
			fs.unlink(path.join(directory, file), err => {
				if (err) throw err;
			});
			console.log('File', file, 'deleted!');
		}
	});
}
module.exports.dlttmpxlsx = DeleteTMPxlsx;
/*-------------DeleteTMPdownloads----------------------------------*/

//-----------------------TEST--------------------------------------//
function FStest() {
	console.log('FStest');
}
module.exports = { FStest };
//-----------------------TEST--------------------------------------//

//-----------------------isRunning(processName)------------------//
const exec = require('child_process').exec;

const isRunning = (query, cb) => {
	let platform = process.platform;
	let cmd = '';
	switch (platform) {
		case 'win32' : cmd = `tasklist`; break;
		case 'darwin' : cmd = `ps -ax | grep ${query}`; break;
		case 'linux' : cmd = `ps -A`; break;
		default: break;
	}
	exec(cmd, (err, stdout, stderr) => {
		cb(stdout.toLowerCase().indexOf(query.toLowerCase()) > -1);
	});
};

// isRunning('chrome.exe', (status) => {
// 	console.log(status); // true|false
// })
module.exports = {isRunning};
//-----------------------isRunning(processName)------------------//

/*-----------------GetJSON------------------------------------*/
async function GetJSON(fileName) {
	const obj = require('./json/'+fileName+'.json');
	const strJson = await JSON.stringify(obj);
	const parseJson = await JSON.parse(strJson, function(key, variable) {
		if (key === ''){
			return variable;
		}
		return variable;
	});
	//const xx = parseJson;
	//console.log(xx[0][0]);
	return parseJson;
}
module.exports.getjson = GetJSON;
/*-----------------GetJSON------------------------------------*/



/*--------------Convert XLSX to JSON--------------------------*/

async function ConvertXLSXtoJSON(fileName){
	console.log('file name:', fileName);
	const excelToJson = require('convert-excel-to-json');
	const fs = require('fs');
	const path = require('path');

	const filePath = path.join(__dirname, '../tmp/xlsx/'+ fileName);
	const newjson = path.join(__dirname, '../tmp/json/'+fileName.slice(0, -5)+'.json');
	const linktxt = path.join(__dirname, '../tmp/link/link.txt');

	const result = excelToJson({
		sourceFile: filePath,
		columnToKey: {
			A: 'permission',
			B: 'pvd',
			C: 'country',
			D: 'type',
			E: 'year',
			F: 'remainder',
			G: 'today',
			H: 'v_month',
			I: 'v_year'
		}
	});
	await fs.appendFileSync(newjson, JSON.stringify(result.Sheet1));
	//fs.appendFileSync(newjson, JSON.stringify(result));
	await fs.writeFileSync(linktxt, fileName);

	return result.Sheet1;
	//return result;
}
module.exports.Convert = ConvertXLSXtoJSON;
/*--------------Convert XLSX to JSON--------------------------*/

function TodayPermissions(fileName){

	const excelToJson = require('convert-excel-to-json');
	const fs = require('fs');
	const path = require('path');

	//const fileName = fs.readFileSync("./tmp/link/link.txt", "utf8");

	const filePath = path.join(__dirname, '../tmp/xlsx/'+fileName);
	const newjson = path.join(__dirname, '../tmp/json/'+fileName.slice(0, -5)+'.json');
	const linktxt = path.join(__dirname, '../tmp/link/link.txt');
	const data = [];

	const result = excelToJson({
		sourceFile: filePath,
		columnToKey: {
			A:'permission',
			B:'pvd',
			C:'country',
			D:'type',
			E:'year',
			F:'remainder',
			G:'today',
			H:'v_month',
			I:'v_year'
		}
	});

	result.Sheet1.forEach(item =>{
		if (item.today !== 0){
			//console.log(i, item);
			data.push({
				item
			});
		}
	});
    // for (var i = 0; i < result.Sheet1.length; i++) {
    //  if((result.Sheet1[i].permission === 'Дозвіл вантажний')&&(result.Sheet1[i].today !== 0)&&(result.Sheet1[i].year === 2021)&&(result.Sheet1[i].country !== 'Білорусь')&&(result.Sheet1[i].country !== 'Туреччина')&&(result.Sheet1[i].country !== 'Македонія')&&(result.Sheet1[i].type === 'універсальний E5')){
    //   console.dir(result.Sheet1[i]);
    //  }
    // }
    //console.log(result.Sheet1);

	fs.appendFileSync(newjson, JSON.stringify(result.Sheet1));
	fs.writeFileSync(linktxt, fileName);

	//console.log(data);
	return data;
}
module.exports.prmToday = TodayPermissions;


/*-----------------MONGOOS MODEL------------------------------*/
var Schema = function() {
	const Data = require('./models/Data');
	const fetch = require('node-fetch');
};
/*-----------------MONGOOS MODEL------------------------------*/
/*-------------------getName----------------------------------*/
// function getName(){
// 	const fs = require('fs');
// 	let Name = fs.readFileSync("./tmp/link/link.txt", "utf8");
// 	let fileName = Name.slice(0, -5)+'.json';
// 	return fileName;
// }
// module.exports = {getName};
/*--------------------getName---------------------------------*/
/*-------------------getCategoryes----------------------------*/
async function getCategorys(){
	const fs = require('fs');
	const path = require('path');
	//
	let Name = fs.readFileSync("./tmp/link/link.txt", "utf8");
	const fileName = Name.slice(0, -5)+'.json';
	// console.log(Name);
	// let obj = fs.readFile('./tmp/json/'+Name, function (){
	// 	const strJson = JSON.stringify(obj);
	// 	console.log(strJson);
	// });
	const jobj = require('./tmp/json/'+fileName);
	const strJson = await JSON.stringify(jobj);
	const parseJson = await JSON.parse(strJson, function(key, variable) {
		if (key === ''){
			return variable;
		}
		return variable;
	});
	console.log(parseJson);
	return parseJson;
}
module.exports = {getCategorys};
/*-------------------getCategoryes----------------------------*/

/*-------------------_getXLSX_----------------------------*/
//const fs = require('fs');
//const path = require('path');
const puppeteer = require ('puppeteer');
const userAgent = require('user-agents');
//const func = require('./func.js');
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
			//userDataDir: '../customChrome',
			headless:false,
			ignoreHTTPSErrors:true,
			//devtools: true,
			slowMo: 50,
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
		//let conv = Convert(xlsxName);
		let conv = await ConvertXLSXtoJSON(xlsxName);
		//return conv;
		//func.prmToday(xlsxName);
		//console.log('conv: ', conv);

		//************close browser whis timeout**********
		await setTimeout(function(){
			console.log('timeout...');
		}, 5000);

		//await Promise.all(pages.map(page =>page.close()));
		await browser.close();
		//************close browser whis timeout**********

		await isRunning('сhrome.exe', (status) => {
			do {
				killProcess('Chromium');
				console.log('process Chromium kill');
			} while (status === true);
		});
		return conv;

	}catch (e) {
		console.log(e);
	}finally {
		console.log('finito...');
	}
}

// module.exports = {
// 	getXLSX: getXLSX
// };
module.exports.getXLSX = getXLSX;
/*-------------------_getXLSX_----------------------------*/
