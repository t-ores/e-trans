const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
const path = require('path');
const xlsx = require('./index.js');

const ConvertXLSXtoJSON = function() {
 console.log('xlsx: ', xlsx);

  const fileName = fs.readFileSync("./tmp/link/link.txt", "utf8");
  console.log('ConvertXLSXtoJSON -> fileName : ', fileName);

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

 result.Sheet1.forEach(item =>{
  if ((item.v_year != 0) & (item.v_month != 0)){
   //console.log(i, item);
   data.push({
    item
   });
   fs.writeFileSync(newjson, JSON.stringify(item));
  }
 });
  //console.log(result);
  //writeLinkInFile
  // fs.writeFile(newjson, data, function (err) {
  //  if(err) throw err;
  // });
  //writeLinkInFile
  return result;
};
ConvertXLSXtoJSON();