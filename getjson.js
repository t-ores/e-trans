const fs = require('fs');
const path = require('path');
//const xobj = require('./tmp/json/x.json');

const jj = JSON.stringify(xobj);

const xxx = JSON.parse(jj, function(k, v) {
    if (k === ''){
        return v;
    }
    return v;
});

const xx = xxx;
//console.log(xx[0][0]);

module.exports.json = xx;