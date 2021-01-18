const fs = require('fs');
const path = require('path');

// current timestamp
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
// current timestamp end

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
/*-------------DeleteTMPjson----------------------------------*/

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
/*-----------------GetJSON------------------------------------*/

/*-----------------MONGOOS MODEL------------------------------*/
var Schema = function() {
	const Data = require('./models/Data');
	const fetch = require('node-fetch');

};
/*-----------------MONGOOS MODEL------------------------------*/



module.exports.getjson = GetJSON;
module.exports.dlttmpjson = DeleteTMPjson;
module.exports.dlttmpimgs = DeleteTMPimgs;
module.exports.timestamp = geTimeStamp;
module.exports.chrome = customChrome;
