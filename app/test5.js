function TodayPermissions(){

 const excelToJson = require('convert-excel-to-json');
 const fs = require('fs');
 const path = require('path');

 const fileName = fs.readFileSync("./tmp/link/link.txt", "utf8");

 const filePath = path.join(__dirname, '../tmp/xlsx/'+fileName);
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

 result.Sheet1.forEach(item =>{
  if ((item.today !== 0)&&(item.permisssion === 'Дозвіл вантажний')){
   //console.log(i, item);
   data.push({
    item
   });
  }
  //console.log(item);
 });
 //console.log(data[1].item.pvd);

 // let obj = JSON.parse(data[1].item);
 // console.log('obj:', obj);
 //
 // console.log('data:', data[1]);
 console.dir(data);
 return data;
}

function ConvertXLSXtoJSON(){

 //require('./index.js');
 const excelToJson = require('convert-excel-to-json');
 const fs = require('fs');
 const path = require('path');

 const fileName = fs.readFileSync("./tmp/link/link.txt", "utf8");
 const filePath = path.join(__dirname, '../tmp/xlsx/'+ fileName);

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
 return result.Sheet1;
}


async function getCategorys(){
 const fs = require('fs');
 const path = require('path');
 //
 let Name = fs.readFileSync("./tmp/link/link.txt", "utf8");
 const fileName = Name.slice(0, -5)+'.json';
 const jobj = require('../tmp/json/'+fileName);
 const strJson = await JSON.stringify(jobj);
 const parseJson = await JSON.parse(strJson, function(key, variable) {
  if (key === ''){
   return variable;
  }
  return variable;
 });
 //console.log(parseJson.length);
 const data = [];

 // parseJson.forEach(item=>{
 //  console.log('1:', data)
 //  if(data.includes(item.pvd, 1)){
 //   console.log('includ:');
 //  }else {
 //   data.push([
 //       item.pvd
 //   ]);
 //  }
 // });

 for(let i=0; i<parseJson.length; i++){
 if(data.includes(parseJson[i].pvd, 1)){
  console.log('yes');
 }else{
  console.log('no');
  data.push([parseJson[i].pvd]);
  fs.appendFileSync('../tmp/categoryes.txt', JSON.stringify(parseJson[i].pvd));
 }
}

console.log(data);

}
getCategorys();

//ConvertXLSXtoJSON();

//TodayPermissions();
