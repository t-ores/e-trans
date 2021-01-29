const fs = require('fs');
const path = require('path');

/*-------------Current Timestamp----------------------------------*/
var geTimeStamp = function() {
		const ts = Date.now();
		const date_ob = new Date(ts);
		const hours = date_ob.getHours();
		const minutes = date_ob.getMinutes();
		const date = date_ob.getDate();
		const month = date_ob.getMonth() + 1;
		const year = date_ob.getFullYear();
		const timestamp = date+"."+month+"."+year+" "+hours+":"+minutes;
		return timestamp;
};
module.exports.timestamp = geTimeStamp;
/*-------------Current Timestamp end----------------------------------*/

/*-------------customChrome----------------------------------*/
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
var DeleteTMPdownloads = function() {
	const directory = path.resolve(__dirname, '../tmp/downloads');
	fs.readdir(directory, (err, files) => {
		if (err) throw err;
		for (const file of files) {
			fs.unlink(path.join(directory, file), err => {
				if (err) throw err;
			});
		}
	});
};
module.exports.dlttmpdownloads = DeleteTMPdownloads;
/*-------------DeleteTMPdownloads----------------------------------*/


/*-----------------GetJSON------------------------------------*/
var GetJSON = function() {
	const xobj = require('./json/x.json');
	const jj = JSON.stringify(xobj);
	const xxx = JSON.parse(jj, function(k, v) {
		if (k === ''){
			return v;
		}
		return v;
	});
	const xx = xxx;
	//console.log(xx[0][0]);

	return xx;

};
module.exports.getjson = GetJSON;
/*-----------------GetJSON------------------------------------*/



/*--------------Convert XLSX to JSON--------------------------*/
function old_ConvertXLSXtoJSON() {

		//await require('./index.js');
		const excelToJson = require('convert-excel-to-json');
		const fs = require('fs');
		const path = require('path');

		const fileName = fs.readFileSync("./tmp/link/link.txt", "utf8");
		//console.log(fileName);

		const filePath = path.join(__dirname, '../tmp/xlsx/'+ fileName);
		const newjson = path.join(__dirname, '../tmp/json/newjson.json');
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
		return result;
}

function ConvertXLSXtoJSON(fileName){

	console.log('file name:', fileName);

	const excelToJson = require('convert-excel-to-json');
	const fs = require('fs');
	const path = require('path');

	//const fileName = fs.readFileSync("./tmp/link/link.txt", "utf8");
	const filePath = path.join(__dirname, '../tmp/xlsx/'+ fileName);
	const newjson = path.join(__dirname, '../tmp/json/'+fileName.slice(0, -5)+'.json');

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

	// for (var i = 0; i < result.Sheet1.length; i++) {
	//  if((result.Sheet1[i].permission === 'Дозвіл вантажний')&&(result.Sheet1[i].today !== 0)&&(result.Sheet1[i].year === 2021)&&(result.Sheet1[i].country !== 'Білорусь')&&(result.Sheet1[i].country !== 'Туреччина')&&(result.Sheet1[i].country !== 'Македонія')&&(result.Sheet1[i].type === 'універсальний E5')){
	//   console.dir(result.Sheet1[i]);
	//  }
	// }
	//console.log(result.Sheet1);
	fs.appendFileSync(newjson, JSON.stringify(result.Sheet1));

	return result.Sheet1;
}

module.exports.Convert = ConvertXLSXtoJSON;
/*--------------Convert XLSX to JSON--------------------------*/

function TodayPermissions(){

	const excelToJson = require('convert-excel-to-json');
	const fs = require('fs');
	const path = require('path');

	const fileName = fs.readFileSync("./tmp/link/link.txt", "utf8");

	const filePath = path.join(__dirname, '../tmp/xlsx/'+fileName);
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
	//console.log(data);
	return data;
}
module.exports.PrmToday = TodayPermissions;


/*-----------------MONGOOS MODEL------------------------------*/
var Schema = function() {
	const Data = require('./models/Data');
	const fetch = require('node-fetch');
};
/*-----------------MONGOOS MODEL------------------------------*/
