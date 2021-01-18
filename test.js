const fs = require('fs');
const path = require('path');
//const parse = require('./parsejson.js');
const getjson = require('./getjson.js');

const xx = getjson.json;
//console.log(xx[0][0]);

const lvpvd = '«Львів» ПВД';
const lvonln = 'Львів-онлайн';
const country = 'Польща';

const result = [];

// var Parse = function(param, result='') {
//     for (let i = 0; i<param.length; i++){
//         result += '| ';
//         result += param[i]['Тип дозволу'] + ' | ';
//         result += param[i]['ПВД'] + ' | ';
//         result += param[i]['Країна дозволу'] + ' | ';
//         result += param[i]['Вид дозволу'] + ' | ';
//         result += param[i]['Рік дозволу'] + ' | ';
//         result += param[i]['Поточний залишок'] + ' | ';
//         result += param[i]['Видано сьогодні'] + ' | ';
//         result += param[i]['Видано з початку місяця'] + ' | ';
//         result += param[i]['Видано з початку року'] + ' | ';
//     }
//     return result;
// };

function old_ParseTest(param, result = '') {
    for (let i = 0; i<param.length; i++){
        if ((param[i]['ПВД'] === lvpvd)&&(param[i]['Країна дозволу'] === country)){
            
            result += '- Тип дозволу : ';
            result += param[i]['Тип дозволу'] + '\n';

            result += '- ПВД : ';
            result += param[i]['ПВД'] + '\n';


            result += '- Країна дозволу : ';
            result += param[i]['Країна дозволу'] + '\n';

            result += '- Вид дозволу : ';
            result += param[i]['Вид дозволу'] + '\n';

            result += '- Рік дозволу : ';
            result += param[i]['Рік дозволу'] + '\n';

            result += '- Поточний залишок : ';
            result += param[i]['Поточний залишок'] + '\n';

            result += '- Видано сьогодні : ';
            result += param[i]['Видано сьогодні'] + '\n';

            result += '- Видано з початку місяця : ';
            result += param[i]['Видано з початку місяця'] + '\n';

            result += '- Видано з початку року : ';
            result += param[i]['Видано з початку року'] + '\n';
            result += '\n';
        }
    }
    return result;
}

function ParseTest(param, result = '') {
    for (let i = 0; i<param.length; i++){
        if ((param[i]['ПВД'] === lvpvd)&&(param[i]['Країна дозволу'] === country)){
        //if (param[i]['ПВД'] === lvpvd){
            
            result += '- Тип дозволу : ';
            result += param[i]['Тип дозволу'] + '\n';

            result += '- ПВД : ';
            result += param[i]['ПВД'] + '\n';


            result += '- Країна дозволу : ';
            result += param[i]['Країна дозволу'] + '\n';

            result += '- Вид дозволу : ';
            result += param[i]['Вид дозволу'] + '\n';

            result += '- Рік дозволу : ';
            result += param[i]['Рік дозволу'] + '\n';

            result += '- Поточний залишок : ';
            result += param[i]['Поточний залишок'] + '\n';

            result += '- Видано сьогодні : ';
            result += param[i]['Видано сьогодні'] + '\n';

            result += '- Видано з початку місяця : ';
            result += param[i]['Видано з початку місяця'] + '\n';

            result += '- Видано з початку року : ';
            result += param[i]['Видано з початку року'] + '\n';
            result += '\n';
        }
    }
    return result;
}

//let parse = await ParseTest(xx[0], result);
//console.log(ParseTest(xx[0], result));
const d = ParseTest(xx[0], result);

module.exports.d = d;
module.exports.parse = ParseTest;

//------WORKIN---------//

// const d = ParseTest(xx[0], result);
// module.exports.d = d;
// console.log(d);

//------WORKIN----------//


