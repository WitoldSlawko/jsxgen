#!/usr/bin/env node

var schema = require('./remote_data/schema.js')
var cmp_class = require('./remote_data/component_class.js')
var cmp_func = require('./remote_data/component_function.js');
var rout = require('./remote_data/router.js')
var act = require('./remote_data/actions.js')
var disp = require('./remote_data/dispatch.js')
var red = require('./remote_data/reducer.js')
var sto = require('./remote_data/store.js')

var prompt = require('prompt');
var fs = require('fs');

console.log("Choose JSX type:")
console.log("* for component class - enter 'cmp-class'")
console.log("* for component function - enter 'cmp-func'")
console.log("* for router component - enter 'rout'")
console.log("* for action - enter 'act'")
console.log("* for dispatch - enter 'disp'")
console.log("* for reducer - enter 'red'")
console.log("* for store - enter 'sto'")

function deploy(){
  prompt.start();
  
   prompt.get(schema, function (err, result) {
    
    var toSave = ''
    for (var i=0; i<result.fileName.length; i++){
      i == 0 ? toSave += result.fileName[i].toUpperCase() : toSave += result.fileName[i]
    }

    switch (result.jsxType){
      case 'cmp-class':
      for (var i=0; i < cmp_class.length; i++){
        i == 2 ? fs.appendFileSync(`${toSave}.jsx`, `export default class ${toSave} extends React.Component {`) : fs.appendFileSync(`${toSave}.jsx`, cmp_class[i]);
        fs.appendFileSync(`${toSave}.jsx`, "\n");
       }
       break;
     case 'cmp-func':
       for (var i=0; i < cmp_func.length; i++){
        i == 2 ? fs.appendFileSync(`${toSave}.jsx`, `export default function ${toSave}() {`) : fs.appendFileSync(`${toSave}.jsx`, cmp_func[i]);
        fs.appendFileSync(`${toSave}.jsx`, "\n");
       }
       break;
     case 'rout':
      for (var i=0; i < rout.length; i++){
        i == 3 ? fs.appendFileSync(`${toSave}.jsx`, `export default function ${toSave}() {`) : fs.appendFileSync(`${toSave}.jsx`, rout[i]);
        fs.appendFileSync(`${toSave}.jsx`, "\n");
      }
       break;
     case 'act':
      for (var i=0; i < act.length; i++){
        if (i == 0) {
          fs.appendFileSync(`${result.fileName}.jsx`, `export function ${result.fileName}() {`)
        }
        else if (i == 2) {
          fs.appendFileSync(`${result.fileName}.jsx`, `       type: '${result.fileName.toUpperCase()}'`)
        }
        else {
          fs.appendFileSync(`${result.fileName}.jsx`, act[i]);
        }
        fs.appendFileSync(`${result.fileName}.jsx`, "\n");
      }       
      break;
     case 'disp':
      for (var i = 0; i < disp.length; i++){
        fs.appendFileSync(`${result.fileName}.jsx`, act[i]);
        fs.appendFileSync(`${result.fileName}.jsx`, "\n");
      }
      break;
     case 'red':
     for (var i=0; i < red.length; i++){
      if (i == 0) {
        fs.appendFileSync(`${result.fileName}.jsx`, `const ${resul.fileName}= (state, action) => {`)
      }
      else if (i == red.length - 2) {
        fs.appendFileSync(`${result.fileName}.jsx`, `export default ${result.fileName}`)
      }
      else {
        fs.appendFileSync(`${result.fileName}.jsx`, red[i]);
      }
      fs.appendFileSync(`${result.fileName}.jsx`, "\n");
      }
      break;
     case 'sto':
      for (var i=0; i < sto.length; i++){
        if (i == 3) {
          fs.appendFileSync(`${result.fileName}.jsx`, `const ${result.fileName}= createStore(, { :  });`)
        }
        else if (i == red.length - 2) {
          fs.appendFileSync(`${result.fileName}.jsx`, `export default ${result.fileName}`)
        }
        else {
          fs.appendFileSync(`${result.fileName}.jsx`, sto[i]);
        }
        fs.appendFileSync(`${result.fileName}.jsx`, "\n");
      }
       break;
     default:
       console.log('Incorrect jsx type choose. Try again.')
       deploy();
    }
   });
}

deploy();
