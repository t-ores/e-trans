const lvpvd = '«Львів» ПВД';
const lvonln = 'Львів-онлайн';

var Parse = function(param) {
    for (let i = 0; i<param.length; i++){

        let result = '| ';
        result += param[i]['Тип дозволу'] + ' | ';
        result += param[i]['ПВД'] + ' | ';
        result += param[i]['Країна дозволу'] + ' | ';
        result += param[i]['Вид дозволу'] + ' | ';
        result += param[i]['Рік дозволу'] + ' | ';
        result += param[i]['Поточний залишок'] + ' | ';
        result += param[i]['Видано сьогодні'] + ' | ';
        result += param[i]['Видано з початку місяця'] + ' | ';
        result += param[i]['Видано з початку року'] + ' | ';
        //console.log(i+1 + result);
    }
    //return result;
};

var ParseLviv = function(param, result) {
    for (let i = 0; i<param.length; i++){
        if (param[i]['ПВД'] === lvpvd){
            result = '| ';
            result += param[i]['Тип дозволу'] + ' | ';
            result += param[i]['ПВД'] + ' | ';
            result += param[i]['Країна дозволу'] + ' | ';
            result += param[i]['Вид дозволу'] + ' | ';
            result += param[i]['Рік дозволу'] + ' | ';
            result += param[i]['Поточний залишок'] + ' | ';
            result += param[i]['Видано сьогодні'] + ' | ';
            result += param[i]['Видано з початку місяця'] + ' | ';
            result += param[i]['Видано з початку року'] + ' | \n';
            //console.log(i+1 + result);
        }
    }
    //console.log(result);
    return result;
};

var ParseTest = function(param, result) {
    for (let i = 0; i<param.length; i++){
        if (param[i]['ПВД'] === lvpvd){
            result += '| ';
            result += param[i]['Тип дозволу'] + ' | ';
            result += param[i]['ПВД'] + ' | ';
            result += param[i]['Країна дозволу'] + ' | ';
            result += param[i]['Вид дозволу'] + ' | ';
            result += param[i]['Рік дозволу'] + ' | ';
            result += param[i]['Поточний залишок'] + ' | ';
            result += param[i]['Видано сьогодні'] + ' | ';
            result += param[i]['Видано з початку місяця'] + ' | ';
            result += param[i]['Видано з початку року'] + ' | \n';
            //console.log(result);

        }
    }
    //console.log(result);
    return result;
};

module.exports.parsetest = ParseTest;
module.exports.parselviv = ParseLviv;
module.exports.parse = Parse;