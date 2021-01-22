const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
const path = require('path');
const xlsxfunc = require('./index.js');

 let xlsx = xlsxfunc();
 console.log(xlsx);

const ConvertXLSXtoJSON = function() {
  const fileName = fs.readFileSync("./tmp/link/link.txt", "utf8");
  console.log('fileName: ', fileName);

  const filePath = path.join(__dirname, '../tmp/xlsx/'+fileName);
  const newjson = path.join(__dirname, '../tmp/json/'+fileName.slice(0, -5)+'.json');

  const result = excelToJson({
   sourceFile: filePath,
   sheets:[{
        name: 'Sheet1',
        header:{
            rows: 1
        },
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
    }]
  });


 fs.appendFileSync(newjson, JSON.stringify(result));
 return result;
};

ConvertXLSXtoJSON();