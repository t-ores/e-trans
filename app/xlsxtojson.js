//'use strict';
const TodayPermissions = function() {

const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../tmp/xlsx/3e3190f0-e1b4-4d03-93ca-985c15ad6f6d.xlsx');
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
  if (item.today != 0){
   //console.log(i, item);
   data.push({
     item
    });
  }
 });
 return data;
};

let tp = TodayPermissions();

console.log(tp);
console.log('Дозволів видано сьогодні: ', tp.length);