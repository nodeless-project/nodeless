const fs = require('fs');
const main = require('./dist/main');

main.default()
/*
var requireFromString = require('require-from-string');

var content = fs.readFileSync('./dist/main.js', 'utf8');

console.log(content);
const func = requireFromString(content);
console.log(func);*/