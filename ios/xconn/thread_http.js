(function(global) {












global.__DEV__=true;

global.__BUNDLE_START_TIME__=Date.now();
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {











'use strict';


































global.require=_require;
global.__d=define;

var modules=Object.create(null);
if(__DEV__){
var verboseNamesToModuleIds=Object.create(null);
}

function define(
factory,
moduleId,
dependencyMap)
{
if(moduleId in modules){


return;
}
modules[moduleId]={
dependencyMap:dependencyMap,
exports:undefined,
factory:factory,
hasError:false,
isInitialized:false};

if(__DEV__){

modules[moduleId].hot=createHotReloadingObject();




var _verboseName=arguments[3];
if(_verboseName){
modules[moduleId].verboseName=_verboseName;
verboseNamesToModuleIds[_verboseName]=moduleId;
}
}
}

function _require(moduleId){
if(__DEV__&&typeof moduleId==='string'){
var _verboseName2=moduleId;
moduleId=verboseNamesToModuleIds[moduleId];
if(moduleId==null){
throw new Error('Unknown named module: \''+_verboseName2+'\'');
}else{
console.warn(
'Requiring module \''+_verboseName2+'\' by name is only supported for '+
'debugging purposes and will BREAK IN PRODUCTION!');

}
}


var moduleIdReallyIsNumber=moduleId;
var module=modules[moduleIdReallyIsNumber];
return module&&module.isInitialized?
module.exports:
guardedLoadModule(moduleIdReallyIsNumber,module);
}

var inGuard=false;
function guardedLoadModule(moduleId,module){
if(!inGuard&&global.ErrorUtils){
inGuard=true;
var returnValue=void 0;
try{
returnValue=loadModuleImplementation(moduleId,module);
}catch(e){
global.ErrorUtils.reportFatalError(e);
}
inGuard=false;
return returnValue;
}else{
return loadModuleImplementation(moduleId,module);
}
}

function loadModuleImplementation(moduleId,module){
var nativeRequire=global.nativeRequire;
if(!module&&nativeRequire){
nativeRequire(moduleId);
module=modules[moduleId];
}

if(!module){
throw unknownModuleError(moduleId);
}

if(module.hasError){
throw moduleThrewError(moduleId);
}






if(__DEV__){var
Systrace=_require.Systrace;
}




module.isInitialized=true;
var exports=module.exports={};var _module=
module,factory=_module.factory,dependencyMap=_module.dependencyMap;
try{
if(__DEV__){

Systrace.beginEvent('JS_require_'+(module.verboseName||moduleId));
}

var _moduleObject={exports:exports};
if(__DEV__&&module.hot){
_moduleObject.hot=module.hot;
}




factory(global,_require,_moduleObject,exports,dependencyMap);


if(!__DEV__){

module.factory=undefined;
}

if(__DEV__){

Systrace.endEvent();
}
return module.exports=_moduleObject.exports;
}catch(e){
module.hasError=true;
module.isInitialized=false;
module.exports=undefined;
throw e;
}
}

function unknownModuleError(id){
var message='Requiring unknown module "'+id+'".';
if(__DEV__){
message+=
'If you are sure the module is there, try restarting the packager or running "npm install".';
}
return Error(message);
}

function moduleThrewError(id){
return Error('Requiring module "'+id+'", which threw an exception.');
}

if(__DEV__){var



createHotReloadingObject;(function(){_require.Systrace={beginEvent:function beginEvent(){},endEvent:function endEvent(){}};createHotReloadingObject=function createHotReloadingObject(){
var hot={
acceptCallback:null,
accept:function accept(callback){hot.acceptCallback=callback;}};

return hot;
};

var acceptAll=function acceptAll(
dependentModules,
inverseDependencies)
{
if(!dependentModules||dependentModules.length===0){
return true;
}

var notAccepted=dependentModules.filter(
function(module){return!accept(module,undefined,inverseDependencies);});

var parents=[];
for(var i=0;i<notAccepted.length;i++){

if(inverseDependencies[notAccepted[i]].length===0){
return false;
}

parents.push.apply(parents,babelHelpers.toConsumableArray(inverseDependencies[notAccepted[i]]));
}

return acceptAll(parents,inverseDependencies);
};

var accept=function accept(
id,
factory,
inverseDependencies)
{
var mod=modules[id];

if(!mod&&factory){
define(factory,id);
return true;
}var

hot=mod.hot;
if(!hot){
console.warn(
'Cannot accept module because Hot Module Replacement '+
'API was not installed.');

return false;
}


if(factory){
mod.factory=factory;
}
mod.hasError=false;
mod.isInitialized=false;
_require(id);

if(hot.acceptCallback){
hot.acceptCallback();
return true;
}else{

if(!inverseDependencies){
throw new Error('Undefined `inverseDependencies`');
}


return acceptAll(inverseDependencies[id],inverseDependencies);
}
};

global.__accept=accept;})();
}
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {

















Object.assign=function(target,sources){
if(__DEV__){
if(target==null){
throw new TypeError('Object.assign target cannot be null or undefined');
}
if(typeof target!=='object'&&typeof target!=='function'){
throw new TypeError(
'In this environment the target of assign MUST be an object.'+
'This error is a performance optimization and not spec compliant.');

}
}

for(var nextIndex=1;nextIndex<arguments.length;nextIndex++){
var nextSource=arguments[nextIndex];
if(nextSource==null){
continue;
}

if(__DEV__){
if(typeof nextSource!=='object'&&
typeof nextSource!=='function'){
throw new TypeError(
'In this environment the sources for assign MUST be an object.'+
'This error is a performance optimization and not spec compliant.');

}
}





for(var key in nextSource){
if(__DEV__){
var hasOwnProperty=Object.prototype.hasOwnProperty;
if(!hasOwnProperty.call(nextSource,key)){
throw new TypeError(
'One of the sources for assign has an enumerable key on the '+
'prototype chain. Are you trying to assign a prototype property? '+
'We don\'t allow it, as this is an edge case that we do not support. '+
'This error is a performance optimization and not spec compliant.');

}
}
target[key]=nextSource[key];
}
}

return target;
};
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {


















var inspect=function(){























function inspect(obj,opts){
var ctx={
seen:[],
stylize:stylizeNoColor};

return formatValue(ctx,obj,opts.depth);
}

function stylizeNoColor(str,styleType){
return str;
}

function arrayToHash(array){
var hash={};

array.forEach(function(val,idx){
hash[val]=true;
});

return hash;
}


function formatValue(ctx,value,recurseTimes){

var primitive=formatPrimitive(ctx,value);
if(primitive){
return primitive;
}


var keys=Object.keys(value);
var visibleKeys=arrayToHash(keys);



if(isError(value)&&(
keys.indexOf('message')>=0||keys.indexOf('description')>=0)){
return formatError(value);
}


if(keys.length===0){
if(isFunction(value)){
var name=value.name?': '+value.name:'';
return ctx.stylize('[Function'+name+']','special');
}
if(isRegExp(value)){
return ctx.stylize(RegExp.prototype.toString.call(value),'regexp');
}
if(isDate(value)){
return ctx.stylize(Date.prototype.toString.call(value),'date');
}
if(isError(value)){
return formatError(value);
}
}

var base='',array=false,braces=['{','}'];


if(isArray(value)){
array=true;
braces=['[',']'];
}


if(isFunction(value)){
var n=value.name?': '+value.name:'';
base=' [Function'+n+']';
}


if(isRegExp(value)){
base=' '+RegExp.prototype.toString.call(value);
}


if(isDate(value)){
base=' '+Date.prototype.toUTCString.call(value);
}


if(isError(value)){
base=' '+formatError(value);
}

if(keys.length===0&&(!array||value.length==0)){
return braces[0]+base+braces[1];
}

if(recurseTimes<0){
if(isRegExp(value)){
return ctx.stylize(RegExp.prototype.toString.call(value),'regexp');
}else{
return ctx.stylize('[Object]','special');
}
}

ctx.seen.push(value);

var output;
if(array){
output=formatArray(ctx,value,recurseTimes,visibleKeys,keys);
}else{
output=keys.map(function(key){
return formatProperty(ctx,value,recurseTimes,visibleKeys,key,array);
});
}

ctx.seen.pop();

return reduceToSingleString(output,base,braces);
}


function formatPrimitive(ctx,value){
if(isUndefined(value))
return ctx.stylize('undefined','undefined');
if(isString(value)){
var simple='\''+JSON.stringify(value).replace(/^"|"$/g,'').
replace(/'/g,"\\'").
replace(/\\"/g,'"')+'\'';
return ctx.stylize(simple,'string');
}
if(isNumber(value))
return ctx.stylize(''+value,'number');
if(isBoolean(value))
return ctx.stylize(''+value,'boolean');

if(isNull(value))
return ctx.stylize('null','null');
}


function formatError(value){
return'['+Error.prototype.toString.call(value)+']';
}


function formatArray(ctx,value,recurseTimes,visibleKeys,keys){
var output=[];
for(var i=0,l=value.length;i<l;++i){
if(hasOwnProperty(value,String(i))){
output.push(formatProperty(ctx,value,recurseTimes,visibleKeys,
String(i),true));
}else{
output.push('');
}
}
keys.forEach(function(key){
if(!key.match(/^\d+$/)){
output.push(formatProperty(ctx,value,recurseTimes,visibleKeys,
key,true));
}
});
return output;
}


function formatProperty(ctx,value,recurseTimes,visibleKeys,key,array){
var name,str,desc;
desc=Object.getOwnPropertyDescriptor(value,key)||{value:value[key]};
if(desc.get){
if(desc.set){
str=ctx.stylize('[Getter/Setter]','special');
}else{
str=ctx.stylize('[Getter]','special');
}
}else{
if(desc.set){
str=ctx.stylize('[Setter]','special');
}
}
if(!hasOwnProperty(visibleKeys,key)){
name='['+key+']';
}
if(!str){
if(ctx.seen.indexOf(desc.value)<0){
if(isNull(recurseTimes)){
str=formatValue(ctx,desc.value,null);
}else{
str=formatValue(ctx,desc.value,recurseTimes-1);
}
if(str.indexOf('\n')>-1){
if(array){
str=str.split('\n').map(function(line){
return'  '+line;
}).join('\n').substr(2);
}else{
str='\n'+str.split('\n').map(function(line){
return'   '+line;
}).join('\n');
}
}
}else{
str=ctx.stylize('[Circular]','special');
}
}
if(isUndefined(name)){
if(array&&key.match(/^\d+$/)){
return str;
}
name=JSON.stringify(''+key);
if(name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)){
name=name.substr(1,name.length-2);
name=ctx.stylize(name,'name');
}else{
name=name.replace(/'/g,"\\'").
replace(/\\"/g,'"').
replace(/(^"|"$)/g,"'");
name=ctx.stylize(name,'string');
}
}

return name+': '+str;
}


function reduceToSingleString(output,base,braces){
var numLinesEst=0;
var length=output.reduce(function(prev,cur){
numLinesEst++;
if(cur.indexOf('\n')>=0)numLinesEst++;
return prev+cur.replace(/\u001b\[\d\d?m/g,'').length+1;
},0);

if(length>60){
return braces[0]+(
base===''?'':base+'\n ')+
' '+
output.join(',\n  ')+
' '+
braces[1];
}

return braces[0]+base+' '+output.join(', ')+' '+braces[1];
}




function isArray(ar){
return Array.isArray(ar);
}

function isBoolean(arg){
return typeof arg==='boolean';
}

function isNull(arg){
return arg===null;
}

function isNullOrUndefined(arg){
return arg==null;
}

function isNumber(arg){
return typeof arg==='number';
}

function isString(arg){
return typeof arg==='string';
}

function isSymbol(arg){
return typeof arg==='symbol';
}

function isUndefined(arg){
return arg===void 0;
}

function isRegExp(re){
return isObject(re)&&objectToString(re)==='[object RegExp]';
}

function isObject(arg){
return typeof arg==='object'&&arg!==null;
}

function isDate(d){
return isObject(d)&&objectToString(d)==='[object Date]';
}

function isError(e){
return isObject(e)&&(
objectToString(e)==='[object Error]'||e instanceof Error);
}

function isFunction(arg){
return typeof arg==='function';
}

function isPrimitive(arg){
return arg===null||
typeof arg==='boolean'||
typeof arg==='number'||
typeof arg==='string'||
typeof arg==='symbol'||
typeof arg==='undefined';
}

function objectToString(o){
return Object.prototype.toString.call(o);
}

function hasOwnProperty(obj,prop){
return Object.prototype.hasOwnProperty.call(obj,prop);
}

return inspect;
}();


var OBJECT_COLUMN_NAME='(index)';
var LOG_LEVELS={
trace:0,
info:1,
warn:2,
error:3};

var INSPECTOR_LEVELS=[];
INSPECTOR_LEVELS[LOG_LEVELS.trace]='debug';
INSPECTOR_LEVELS[LOG_LEVELS.info]='log';
INSPECTOR_LEVELS[LOG_LEVELS.warn]='warning';
INSPECTOR_LEVELS[LOG_LEVELS.error]='error';



var INSPECTOR_FRAMES_TO_SKIP=__DEV__?2:1;

function setupConsole(global){
if(!global.nativeLoggingHook){
return;
}

function getNativeLogFunction(level){
return function(){
var str=void 0;
if(arguments.length===1&&typeof arguments[0]==='string'){
str=arguments[0];
}else{
str=Array.prototype.map.call(arguments,function(arg){
return inspect(arg,{depth:10});
}).join(', ');
}

var logLevel=level;
if(str.slice(0,9)==='Warning: '&&logLevel>=LOG_LEVELS.error){



logLevel=LOG_LEVELS.warn;
}
if(global.__inspectorLog){
global.__inspectorLog(
INSPECTOR_LEVELS[logLevel],
str,
[].slice.call(arguments),
INSPECTOR_FRAMES_TO_SKIP);
}
global.nativeLoggingHook(str,logLevel);
};
}

function repeat(element,n){
return Array.apply(null,Array(n)).map(function(){return element;});
};

function consoleTablePolyfill(rows){

if(!Array.isArray(rows)){
var data=rows;
rows=[];
for(var key in data){
if(data.hasOwnProperty(key)){
var row=data[key];
row[OBJECT_COLUMN_NAME]=key;
rows.push(row);
}
}
}
if(rows.length===0){
global.nativeLoggingHook('',LOG_LEVELS.info);
return;
}

var columns=Object.keys(rows[0]).sort();
var stringRows=[];
var columnWidths=[];



columns.forEach(function(k,i){
columnWidths[i]=k.length;
for(var j=0;j<rows.length;j++){
var cellStr=(rows[j][k]||'?').toString();
stringRows[j]=stringRows[j]||[];
stringRows[j][i]=cellStr;
columnWidths[i]=Math.max(columnWidths[i],cellStr.length);
}
});



function joinRow(row,space){
var cells=row.map(function(cell,i){
var extraSpaces=repeat(' ',columnWidths[i]-cell.length).join('');
return cell+extraSpaces;
});
space=space||' ';
return cells.join(space+'|'+space);
};

var separators=columnWidths.map(function(columnWidth){
return repeat('-',columnWidth).join('');
});
var separatorRow=joinRow(separators,'-');
var header=joinRow(columns);
var table=[header,separatorRow];

for(var i=0;i<rows.length;i++){
table.push(joinRow(stringRows[i]));
}





global.nativeLoggingHook('\n'+table.join('\n'),LOG_LEVELS.info);
}


var originalConsole=global.console;
var descriptor=Object.getOwnPropertyDescriptor(global,'console');
if(descriptor){
Object.defineProperty(global,'originalConsole',descriptor);
}

global.console={
error:getNativeLogFunction(LOG_LEVELS.error),
info:getNativeLogFunction(LOG_LEVELS.info),
log:getNativeLogFunction(LOG_LEVELS.info),
warn:getNativeLogFunction(LOG_LEVELS.warn),
trace:getNativeLogFunction(LOG_LEVELS.trace),
debug:getNativeLogFunction(LOG_LEVELS.trace),
table:consoleTablePolyfill};





if(__DEV__&&originalConsole){
Object.keys(console).forEach(function(methodName){
var reactNativeMethod=console[methodName];
if(originalConsole[methodName]){
console[methodName]=function(){
originalConsole[methodName].apply(originalConsole,arguments);
reactNativeMethod.apply(console,arguments);
};
}
});
}
}

if(typeof module!=='undefined'){
module.exports=setupConsole;
}else{
setupConsole(global);
}
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {












var _inGuard=0;






var _globalHandler=function onError(e){
throw e;
};









var ErrorUtils={
setGlobalHandler:function setGlobalHandler(fun){
_globalHandler=fun;
},
getGlobalHandler:function getGlobalHandler(){
return _globalHandler;
},
reportError:function reportError(error){
_globalHandler&&_globalHandler(error);
},
reportFatalError:function reportFatalError(error){
_globalHandler&&_globalHandler(error,true);
},
applyWithGuard:function applyWithGuard(fun,context,args){
try{
_inGuard++;
return fun.apply(context,args);
}catch(e){
ErrorUtils.reportError(e);
}finally{
_inGuard--;
}
},
applyWithGuardIfNeeded:function applyWithGuardIfNeeded(fun,context,args){
if(ErrorUtils.inGuard()){
return fun.apply(context,args);
}else{
ErrorUtils.applyWithGuard(fun,context,args);
}
},
inGuard:function inGuard(){
return _inGuard;
},
guard:function guard(fun,name,context){
if(typeof fun!=='function'){
console.warn('A function must be passed to ErrorUtils.guard, got ',fun);
return null;
}
name=name||fun.name||'<generated guard>';
function guarded(){
return(
ErrorUtils.applyWithGuard(
fun,
context||this,
arguments,
null,
name));


}

return guarded;
}};


global.ErrorUtils=ErrorUtils;
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {













if(Number.EPSILON===undefined){
Object.defineProperty(Number,'EPSILON',{
value:Math.pow(2,-52)});

}
if(Number.MAX_SAFE_INTEGER===undefined){
Object.defineProperty(Number,'MAX_SAFE_INTEGER',{
value:Math.pow(2,53)-1});

}
if(Number.MIN_SAFE_INTEGER===undefined){
Object.defineProperty(Number,'MIN_SAFE_INTEGER',{
value:-(Math.pow(2,53)-1)});

}
if(!Number.isNaN){(function(){

var globalIsNaN=global.isNaN;
Object.defineProperty(Number,'isNaN',{
configurable:true,
enumerable:false,
value:function isNaN(value){
return typeof value==='number'&&globalIsNaN(value);
},
writable:true});})();

}
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {

















if(!String.prototype.startsWith){
String.prototype.startsWith=function(search){
'use strict';
if(this==null){
throw TypeError();
}
var string=String(this);
var pos=arguments.length>1?
Number(arguments[1])||0:0;
var start=Math.min(Math.max(pos,0),string.length);
return string.indexOf(String(search),pos)===start;
};
}

if(!String.prototype.endsWith){
String.prototype.endsWith=function(search){
'use strict';
if(this==null){
throw TypeError();
}
var string=String(this);
var stringLength=string.length;
var searchString=String(search);
var pos=arguments.length>1?
Number(arguments[1])||0:stringLength;
var end=Math.min(Math.max(pos,0),stringLength);
var start=end-searchString.length;
if(start<0){
return false;
}
return string.lastIndexOf(searchString,start)===start;
};
}

if(!String.prototype.repeat){
String.prototype.repeat=function(count){
'use strict';
if(this==null){
throw TypeError();
}
var string=String(this);
count=Number(count)||0;
if(count<0||count===Infinity){
throw RangeError();
}
if(count===1){
return string;
}
var result='';
while(count){
if(count&1){
result+=string;
}
if(count>>=1){
string+=string;
}
}
return result;
};
}

if(!String.prototype.includes){
String.prototype.includes=function(search,start){
'use strict';
if(typeof start!=='number'){
start=0;
}

if(start+search.length>this.length){
return false;
}else{
return this.indexOf(search,start)!==-1;
}
};
}
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {














function findIndex(predicate,context){
if(this==null){
throw new TypeError(
'Array.prototype.findIndex called on null or undefined');

}
if(typeof predicate!=='function'){
throw new TypeError('predicate must be a function');
}
var list=Object(this);
var length=list.length>>>0;
for(var i=0;i<length;i++){
if(predicate.call(context,list[i],i,list)){
return i;
}
}
return-1;
}

if(!Array.prototype.findIndex){
Object.defineProperty(Array.prototype,'findIndex',{
enumerable:false,
writable:true,
configurable:true,
value:findIndex});

}


if(!Array.prototype.find){
Object.defineProperty(Array.prototype,'find',{
enumerable:false,
writable:true,
configurable:true,
value:function value(predicate,context){
if(this==null){
throw new TypeError(
'Array.prototype.find called on null or undefined');

}
var index=findIndex.call(this,predicate,context);
return index===-1?undefined:this[index];
}});

}


if(!Array.prototype.includes){
Object.defineProperty(Array.prototype,'includes',{
enumerable:false,
writable:true,
configurable:true,
value:function value(searchElement){
var O=Object(this);
var len=parseInt(O.length)||0;
if(len===0){
return false;
}
var n=parseInt(arguments[1])||0;
var k;
if(n>=0){
k=n;
}else{
k=len+n;
if(k<0){
k=0;
}
}
var currentElement;
while(k<len){
currentElement=O[k];
if(searchElement===currentElement||
searchElement!==searchElement&&currentElement!==currentElement){
return true;
}
k++;
}
return false;
}});

}
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {


















if(!Array.from){
Array.from=function(arrayLike){
if(arrayLike==null){
throw new TypeError('Object is null or undefined');
}


var mapFn=arguments[1];
var thisArg=arguments[2];

var C=this;
var items=Object(arrayLike);
var symbolIterator=typeof Symbol==='function'?typeof Symbol==='function'?
Symbol.iterator:'@@iterator':
'@@iterator';
var mapping=typeof mapFn==='function';
var usingIterator=typeof items[symbolIterator]==='function';
var key=0;
var ret;
var value;

if(usingIterator){
ret=typeof C==='function'?
new C():
[];
var it=items[symbolIterator]();
var next;

while(!(next=it.next()).done){
value=next.value;

if(mapping){
value=mapFn.call(thisArg,value,key);
}

ret[key]=value;
key+=1;
}

ret.length=key;
return ret;
}

var len=items.length;
if(isNaN(len)||len<0){
len=0;
}

ret=typeof C==='function'?
new C(len):
new Array(len);

while(key<len){
value=items[key];

if(mapping){
value=mapFn.call(thisArg,value,key);
}

ret[key]=value;

key+=1;
}

ret.length=key;
return ret;
};
}
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {











(function(){
'use strict';

var hasOwnProperty=Object.prototype.hasOwnProperty;





if(typeof Object.entries!=='function'){
Object.entries=function(object){

if(object==null){
throw new TypeError('Object.entries called on non-object');
}

var entries=[];
for(var key in object){
if(hasOwnProperty.call(object,key)){
entries.push([key,object[key]]);
}
}
return entries;
};
}





if(typeof Object.values!=='function'){
Object.values=function(object){

if(object==null){
throw new TypeError('Object.values called on non-object');
}

var values=[];
for(var key in object){
if(hasOwnProperty.call(object,key)){
values.push(object[key]);
}
}
return values;
};
}

})();
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {


















var babelHelpers=global.babelHelpers={};

babelHelpers.createRawReactElement=function(){
var REACT_ELEMENT_TYPE=typeof Symbol==="function"&&(typeof Symbol==="function"?Symbol.for:"@@for")&&(typeof Symbol==="function"?Symbol.for:"@@for")("react.element")||0xeac7;
return function createRawReactElement(type,key,props){
return{
$$typeof:REACT_ELEMENT_TYPE,
type:type,
key:key,
ref:null,
props:props,
_owner:null};

};
}();

babelHelpers.classCallCheck=function(instance,Constructor){
if(!(instance instanceof Constructor)){
throw new TypeError("Cannot call a class as a function");
}
};

babelHelpers.createClass=function(){
function defineProperties(target,props){
for(var i=0;i<props.length;i++){
var descriptor=props[i];
descriptor.enumerable=descriptor.enumerable||false;
descriptor.configurable=true;
if("value"in descriptor)descriptor.writable=true;
Object.defineProperty(target,descriptor.key,descriptor);
}
}

return function(Constructor,protoProps,staticProps){
if(protoProps)defineProperties(Constructor.prototype,protoProps);
if(staticProps)defineProperties(Constructor,staticProps);
return Constructor;
};
}();

babelHelpers.defineProperty=function(obj,key,value){
if(key in obj){
Object.defineProperty(obj,key,{
value:value,
enumerable:true,
configurable:true,
writable:true});

}else{
obj[key]=value;
}

return obj;
};

babelHelpers._extends=babelHelpers.extends=Object.assign||function(target){
for(var i=1;i<arguments.length;i++){
var source=arguments[i];

for(var key in source){
if(Object.prototype.hasOwnProperty.call(source,key)){
target[key]=source[key];
}
}
}

return target;
};

babelHelpers.get=function get(object,property,receiver){
if(object===null)object=Function.prototype;
var desc=Object.getOwnPropertyDescriptor(object,property);

if(desc===undefined){
var parent=Object.getPrototypeOf(object);

if(parent===null){
return undefined;
}else{
return get(parent,property,receiver);
}
}else if("value"in desc){
return desc.value;
}else{
var getter=desc.get;

if(getter===undefined){
return undefined;
}

return getter.call(receiver);
}
};

babelHelpers.inherits=function(subClass,superClass){
if(typeof superClass!=="function"&&superClass!==null){
throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);
}

subClass.prototype=Object.create(superClass&&superClass.prototype,{
constructor:{
value:subClass,
enumerable:false,
writable:true,
configurable:true}});


if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;
};

babelHelpers.interopRequireDefault=function(obj){
return obj&&obj.__esModule?obj:{
default:obj};

};

babelHelpers.interopRequireWildcard=function(obj){
if(obj&&obj.__esModule){
return obj;
}else{
var newObj={};

if(obj!=null){
for(var key in obj){
if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];
}
}

newObj.default=obj;
return newObj;
}
};

babelHelpers.objectWithoutProperties=function(obj,keys){
var target={};

for(var i in obj){
if(keys.indexOf(i)>=0)continue;
if(!Object.prototype.hasOwnProperty.call(obj,i))continue;
target[i]=obj[i];
}

return target;
};

babelHelpers.possibleConstructorReturn=function(self,call){
if(!self){
throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
}

return call&&(typeof call==="object"||typeof call==="function")?call:self;
};

babelHelpers.slicedToArray=function(){
function sliceIterator(arr,i){
var _arr=[];
var _n=true;
var _d=false;
var _e=undefined;

try{
for(var _i=arr[typeof Symbol==="function"?Symbol.iterator:"@@iterator"](),_s;!(_n=(_s=_i.next()).done);_n=true){
_arr.push(_s.value);

if(i&&_arr.length===i)break;
}
}catch(err){
_d=true;
_e=err;
}finally{
try{
if(!_n&&_i["return"])_i["return"]();
}finally{
if(_d)throw _e;
}
}

return _arr;
}

return function(arr,i){
if(Array.isArray(arr)){
return arr;
}else if((typeof Symbol==="function"?Symbol.iterator:"@@iterator")in Object(arr)){
return sliceIterator(arr,i);
}else{
throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
};
}();

babelHelpers.taggedTemplateLiteral=function(strings,raw){
return Object.freeze(Object.defineProperties(strings,{
raw:{
value:Object.freeze(raw)}}));


};

babelHelpers.toArray=function(arr){
return Array.isArray(arr)?arr:Array.from(arr);
};

babelHelpers.toConsumableArray=function(arr){
if(Array.isArray(arr)){
for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}

return arr2;
}else{
return Array.from(arr);
}
};
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
__d(/* xconn/thread_http.js */function(global, require, module, exports) {var _reactNativeWorkers=require(12 /* react-native-workers */);
var _reactNativeMongoose=require(404 /* react-native-mongoose */);var _reactNativeMongoose2=babelHelpers.interopRequireDefault(_reactNativeMongoose);

_reactNativeWorkers.self.PORT=9999;

_reactNativeWorkers.self.onmessage=function(msg){
if(msg==='start'){
_reactNativeMongoose2.default.start({
port:_reactNativeWorkers.self.PORT+'',
root:'DOCS'});

_reactNativeWorkers.self.postMessage("http start:"+_reactNativeWorkers.self.PORT);
}else if(msg==='stop'){
_reactNativeMongoose2.default.stop();
_reactNativeWorkers.self.postMessage("http stop");
}
};

function loop(){
setTimeout(loop,99000);
}

setTimeout(loop,99000);
}, 0, null, "xconn/thread_http.js");
__d(/* react-native-workers/index.js */function(global, require, module, exports) {
module.exports={
get self(){
return require(13 /* ./js/self */).default;
},
get Worker(){
return require(403 /* ./js/worker */).default;
}};
}, 12, null, "react-native-workers/index.js");
__d(/* react-native-workers/js/self.js */function(global, require, module, exports) {Object.defineProperty(exports,"__esModule",{value:true});var _reactNative=require(14 /* react-native */);var




WorkerSelfManager=_reactNative.NativeModules.WorkerSelfManager;

var self={
onmessage:null,

postMessage:function postMessage(message){
if(!message){return;}
WorkerSelfManager.postMessage(message);
}};


_reactNative.DeviceEventEmitter.addListener("WorkerMessage",function(message){
!!message&&self.onmessage&&self.onmessage(message);
});exports.default=

self;
}, 13, null, "react-native-workers/js/self.js");
__d(/* react-native/Libraries/react-native/react-native.js */function(global, require, module, exports) {









'use strict';

var warning=require(15 /* fbjs/lib/warning */);

if(__DEV__){
var warningDedupe={};
var addonWarn=function addonWarn(prevName,newPackageName){
warning(
warningDedupe[prevName],
'React.addons.'+prevName+' is deprecated. Please import the "'+
newPackageName+'" package instead.');

warningDedupe[prevName]=true;
};
}


var ReactNative={

get ActivityIndicator(){return require(17 /* ActivityIndicator */);},
get ART(){return require(176 /* ReactNativeART */);},
get Button(){return require(182 /* Button */);},
get DatePickerIOS(){return require(268 /* DatePickerIOS */);},
get DrawerLayoutAndroid(){return require(269 /* DrawerLayoutAndroid */);},
get Image(){return require(209 /* Image */);},
get ImageEditor(){return require(270 /* ImageEditor */);},
get ImageStore(){return require(271 /* ImageStore */);},
get KeyboardAvoidingView(){return require(272 /* KeyboardAvoidingView */);},
get ListView(){return require(274 /* ListView */);},
get MapView(){return require(280 /* MapView */);},
get Modal(){return require(281 /* Modal */);},
get Navigator(){return require(305 /* Navigator */);},
get NavigatorIOS(){return require(323 /* NavigatorIOS */);},
get Picker(){return require(325 /* Picker */);},
get PickerIOS(){return require(326 /* PickerIOS */);},
get ProgressBarAndroid(){return require(328 /* ProgressBarAndroid */);},
get ProgressViewIOS(){return require(329 /* ProgressViewIOS */);},
get ScrollView(){return require(211 /* ScrollView */);},
get SegmentedControlIOS(){return require(330 /* SegmentedControlIOS */);},
get Slider(){return require(331 /* Slider */);},
get SnapshotViewIOS(){return require(332 /* SnapshotViewIOS */);},
get Switch(){return require(333 /* Switch */);},
get RecyclerViewBackedScrollView(){return require(300 /* RecyclerViewBackedScrollView */);},
get RefreshControl(){return require(334 /* RefreshControl */);},
get StatusBar(){return require(335 /* StatusBar */);},
get SwipeableListView(){return require(336 /* SwipeableListView */);},
get TabBarIOS(){return require(339 /* TabBarIOS */);},
get Text(){return require(183 /* Text */);},
get TextInput(){return require(341 /* TextInput */);},
get ToastAndroid(){return require(348 /* ToastAndroid */);},
get ToolbarAndroid(){return require(349 /* ToolbarAndroid */);},
get Touchable(){return require(184 /* Touchable */);},
get TouchableHighlight(){return require(293 /* TouchableHighlight */);},
get TouchableNativeFeedback(){return require(189 /* TouchableNativeFeedback */);},
get TouchableOpacity(){return require(190 /* TouchableOpacity */);},
get TouchableWithoutFeedback(){return require(266 /* TouchableWithoutFeedback */);},
get View(){return require(120 /* View */);},
get ViewPagerAndroid(){return require(350 /* ViewPagerAndroid */);},
get WebView(){return require(351 /* WebView */);},


get ActionSheetIOS(){return require(352 /* ActionSheetIOS */);},
get AdSupportIOS(){return require(353 /* AdSupportIOS */);},
get Alert(){return require(222 /* Alert */);},
get AlertIOS(){return require(223 /* AlertIOS */);},
get Animated(){return require(191 /* Animated */);},
get AppRegistry(){return require(354 /* AppRegistry */);},
get AppState(){return require(64 /* AppState */);},
get AsyncStorage(){return require(362 /* AsyncStorage */);},
get BackAndroid(){return require(359 /* BackAndroid */);},
get CameraRoll(){return require(363 /* CameraRoll */);},
get Clipboard(){return require(364 /* Clipboard */);},
get DatePickerAndroid(){return require(365 /* DatePickerAndroid */);},
get Dimensions(){return require(103 /* Dimensions */);},
get Easing(){return require(207 /* Easing */);},
get I18nManager(){return require(304 /* I18nManager */);},
get ImagePickerIOS(){return require(366 /* ImagePickerIOS */);},
get InteractionManager(){return require(193 /* InteractionManager */);},
get Keyboard(){return require(62 /* Keyboard */);},
get LayoutAnimation(){return require(273 /* LayoutAnimation */);},
get Linking(){return require(367 /* Linking */);},
get NativeEventEmitter(){return require(55 /* NativeEventEmitter */);},
get NavigationExperimental(){return require(368 /* NavigationExperimental */);},
get NetInfo(){return require(389 /* NetInfo */);},
get PanResponder(){return require(319 /* PanResponder */);},
get PermissionsAndroid(){return require(390 /* PermissionsAndroid */);},
get PixelRatio(){return require(102 /* PixelRatio */);},
get PushNotificationIOS(){return require(391 /* PushNotificationIOS */);},
get Settings(){return require(392 /* Settings */);},
get Share(){return require(393 /* Share */);},
get StatusBarIOS(){return require(61 /* StatusBarIOS */);},
get StyleSheet(){return require(101 /* StyleSheet */);},
get Systrace(){return require(34 /* Systrace */);},
get TimePickerAndroid(){return require(394 /* TimePickerAndroid */);},
get UIManager(){return require(75 /* UIManager */);},
get Vibration(){return require(395 /* Vibration */);},
get VibrationIOS(){return require(396 /* VibrationIOS */);},


get DeviceEventEmitter(){return require(60 /* RCTDeviceEventEmitter */);},
get NativeAppEventEmitter(){return require(243 /* RCTNativeAppEventEmitter */);},
get NativeModules(){return require(29 /* NativeModules */);},
get Platform(){return require(28 /* Platform */);},
get processColor(){return require(73 /* processColor */);},
get requireNativeComponent(){return require(128 /* requireNativeComponent */);},


get ColorPropType(){return require(18 /* ColorPropType */);},
get EdgeInsetsPropType(){return require(121 /* EdgeInsetsPropType */);},
get PointPropType(){return require(212 /* PointPropType */);},


addons:{
get LinkedStateMixin(){
if(__DEV__){
addonWarn('LinkedStateMixin','react-addons-linked-state-mixin');
}
return require(397 /* react/lib/LinkedStateMixin */);
},
get PureRenderMixin(){
if(__DEV__){
addonWarn('PureRenderMixin','react-addons-pure-render-mixin');
}
return require(386 /* react/lib/ReactComponentWithPureRenderMixin */);
},
get TestModule(){
if(__DEV__){
warning(
warningDedupe.TestModule,
'React.addons.TestModule is deprecated. '+
'Use ReactNative.NativeModules.TestModule instead.');

warningDedupe.TestModule=true;
}
return require(29 /* NativeModules */).TestModule;
},
get batchedUpdates(){
if(__DEV__){
warning(
warningDedupe.batchedUpdates,
'React.addons.batchedUpdates is deprecated. '+
'Use ReactNative.unstable_batchedUpdates instead.');

warningDedupe.batchedUpdates=true;
}
return require(142 /* ReactUpdates */).batchedUpdates;
},
get createFragment(){
if(__DEV__){
addonWarn('createFragment','react-addons-create-fragment');
}
return require(400 /* react/lib/ReactFragment */).create;
},
get update(){
if(__DEV__){
addonWarn('update','react-addons-update');
}
return require(401 /* react/lib/update */);
}}};




if(__DEV__){(function(){
var throwOnWrongReactAPI=require(402 /* throwOnWrongReactAPI */);
var reactAPIs=['createClass','Component'];var _loop=function _loop(

key){
Object.defineProperty(ReactNative,key,{
get:function get(){throwOnWrongReactAPI(key);},
enumerable:false,
configurable:false});};for(var _iterator=reactAPIs,_isArray=Array.isArray(_iterator),_i=0,_iterator=_isArray?_iterator:_iterator[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var _ref;if(_isArray){if(_i>=_iterator.length)break;_ref=_iterator[_i++];}else{_i=_iterator.next();if(_i.done)break;_ref=_i.value;}var key=_ref;_loop(key);

}})();
}



var ReactNativeInternal=require(213 /* ReactNative */);
function applyForwarding(key){
if(__DEV__){
Object.defineProperty(
ReactNative,
key,
Object.getOwnPropertyDescriptor(ReactNativeInternal,key));

return;
}
ReactNative[key]=ReactNativeInternal[key];
}
for(var key in ReactNativeInternal){
applyForwarding(key);
}
module.exports=ReactNative;
}, 14, null, "react-native/Libraries/react-native/react-native.js");
__d(/* fbjs/lib/warning.js */function(global, require, module, exports) {









'use strict';

var emptyFunction=require(16 /* ./emptyFunction */);








var warning=emptyFunction;

if(process.env.NODE_ENV!=='production'){
(function(){
var printWarning=function printWarning(format){
for(var _len=arguments.length,args=Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){
args[_key-1]=arguments[_key];
}

var argIndex=0;
var message='Warning: '+format.replace(/%s/g,function(){
return args[argIndex++];
});
if(typeof console!=='undefined'){
console.error(message);
}
try{



throw new Error(message);
}catch(x){}
};

warning=function warning(condition,format){
if(format===undefined){
throw new Error('`warning(condition, format, ...args)` requires a warning '+'message argument');
}

if(format.indexOf('Failed Composite propType: ')===0){
return;
}

if(!condition){
for(var _len2=arguments.length,args=Array(_len2>2?_len2-2:0),_key2=2;_key2<_len2;_key2++){
args[_key2-2]=arguments[_key2];
}

printWarning.apply(undefined,[format].concat(args));
}
};
})();
}

module.exports=warning;
}, 15, null, "fbjs/lib/warning.js");
__d(/* fbjs/lib/emptyFunction.js */function(global, require, module, exports) {"use strict";












function makeEmptyFunction(arg){
return function(){
return arg;
};
}






var emptyFunction=function emptyFunction(){};

emptyFunction.thatReturns=makeEmptyFunction;
emptyFunction.thatReturnsFalse=makeEmptyFunction(false);
emptyFunction.thatReturnsTrue=makeEmptyFunction(true);
emptyFunction.thatReturnsNull=makeEmptyFunction(null);
emptyFunction.thatReturnsThis=function(){
return this;
};
emptyFunction.thatReturnsArgument=function(arg){
return arg;
};

module.exports=emptyFunction;
}, 16, null, "fbjs/lib/emptyFunction.js");
__d(/* ActivityIndicator */function(global, require, module, exports) {










'use strict';

var ColorPropType=require(18 /* ColorPropType */);
var NativeMethodsMixin=require(21 /* NativeMethodsMixin */);
var Platform=require(28 /* Platform */);
var React=require(78 /* React */);
var StyleSheet=require(101 /* StyleSheet */);
var View=require(120 /* View */);

var requireNativeComponent=require(128 /* requireNativeComponent */);

var PropTypes=React.PropTypes;

var GRAY='#999999';













var ActivityIndicator=React.createClass({displayName:'ActivityIndicator',
mixins:[NativeMethodsMixin],

propTypes:babelHelpers.extends({},
View.propTypes,{



animating:PropTypes.bool,



color:ColorPropType,




size:PropTypes.oneOfType([
PropTypes.oneOf(['small','large']),
PropTypes.number]),






hidesWhenStopped:PropTypes.bool}),


getDefaultProps:function getDefaultProps(){
return{
animating:true,
color:Platform.OS==='ios'?GRAY:undefined,
hidesWhenStopped:true,
size:'small'};

},

render:function render(){var _props=
this.props,onLayout=_props.onLayout,style=_props.style,props=babelHelpers.objectWithoutProperties(_props,['onLayout','style']);
var sizeStyle=void 0;

switch(props.size){
case'small':
sizeStyle=styles.sizeSmall;
break;
case'large':
sizeStyle=styles.sizeLarge;
break;
default:
sizeStyle={height:props.size,width:props.size};
break;}


return(
React.createElement(View,{
onLayout:onLayout,
style:[styles.container,style]},
React.createElement(RCTActivityIndicator,babelHelpers.extends({},
props,{
style:sizeStyle,
styleAttr:'Normal',
indeterminate:true}))));



}});


var styles=StyleSheet.create({
container:{
alignItems:'center',
justifyContent:'center'},

sizeSmall:{
width:20,
height:20},

sizeLarge:{
width:36,
height:36}});



if(Platform.OS==='ios'){
var RCTActivityIndicator=requireNativeComponent(
'RCTActivityIndicatorView',
ActivityIndicator,
{nativeOnly:{activityIndicatorViewStyle:true}});

}else if(Platform.OS==='android'){
var RCTActivityIndicator=requireNativeComponent(
'AndroidProgressBar',
ActivityIndicator,

{nativeOnly:{
indeterminate:true,
progress:true,
styleAttr:true}});


}

module.exports=ActivityIndicator;
}, 17, null, "ActivityIndicator");
__d(/* ColorPropType */function(global, require, module, exports) {









'use strict';

var ReactPropTypeLocationNames=require(19 /* react/lib/ReactPropTypeLocationNames */);

var normalizeColor=require(20 /* normalizeColor */);

var colorPropType=function colorPropType(isRequired,props,propName,componentName,location,propFullName){
var color=props[propName];
if(color===undefined||color===null){
if(isRequired){
var locationName=ReactPropTypeLocationNames[location];
return new Error(
'Required '+locationName+' `'+(propFullName||propName)+
'` was not specified in `'+componentName+'`.');

}
return;
}

if(typeof color==='number'){



return;
}

if(normalizeColor(color)===null){
var locationName=ReactPropTypeLocationNames[location];
return new Error(
'Invalid '+locationName+' `'+(propFullName||propName)+
'` supplied to `'+componentName+'`: '+color+'\n'+'Valid color formats are\n  - \'#f0f\' (#rgb)\n  - \'#f0fc\' (#rgba)\n  - \'#ff00ff\' (#rrggbb)\n  - \'#ff00ff00\' (#rrggbbaa)\n  - \'rgb(255, 255, 255)\'\n  - \'rgba(255, 255, 255, 1.0)\'\n  - \'hsl(360, 100%, 100%)\'\n  - \'hsla(360, 100%, 100%, 1.0)\'\n  - \'transparent\'\n  - \'red\'\n  - 0xff00ff00 (0xrrggbbaa)\n');













}
};

var ColorPropType=colorPropType.bind(null,false);
ColorPropType.isRequired=colorPropType.bind(null,true);

module.exports=ColorPropType;
}, 18, null, "ColorPropType");
__d(/* react/lib/ReactPropTypeLocationNames.js */function(global, require, module, exports) {










'use strict';

var ReactPropTypeLocationNames={};

if(process.env.NODE_ENV!=='production'){
ReactPropTypeLocationNames={
prop:'prop',
context:'context',
childContext:'child context'};

}

module.exports=ReactPropTypeLocationNames;
}, 19, null, "react/lib/ReactPropTypeLocationNames.js");
__d(/* normalizeColor */function(global, require, module, exports) {











'use strict';

function normalizeColor(color){
var match;

if(typeof color==='number'){
if(color>>>0===color&&color>=0&&color<=0xffffffff){
return color;
}
return null;
}


if(match=matchers.hex6.exec(color)){
return parseInt(match[1]+'ff',16)>>>0;
}

if(names.hasOwnProperty(color)){
return names[color];
}

if(match=matchers.rgb.exec(color)){
return(
parse255(match[1])<<24|
parse255(match[2])<<16|
parse255(match[3])<<8|
0x000000ff)>>>
0;
}

if(match=matchers.rgba.exec(color)){
return(
parse255(match[1])<<24|
parse255(match[2])<<16|
parse255(match[3])<<8|
parse1(match[4]))>>>
0;
}

if(match=matchers.hex3.exec(color)){
return parseInt(
match[1]+match[1]+
match[2]+match[2]+
match[3]+match[3]+
'ff',
16)>>>
0;
}


if(match=matchers.hex8.exec(color)){
return parseInt(match[1],16)>>>0;
}

if(match=matchers.hex4.exec(color)){
return parseInt(
match[1]+match[1]+
match[2]+match[2]+
match[3]+match[3]+
match[4]+match[4],
16)>>>
0;
}

if(match=matchers.hsl.exec(color)){
return(
hslToRgb(
parse360(match[1]),
parsePercentage(match[2]),
parsePercentage(match[3]))|

0x000000ff)>>>
0;
}

if(match=matchers.hsla.exec(color)){
return(
hslToRgb(
parse360(match[1]),
parsePercentage(match[2]),
parsePercentage(match[3]))|

parse1(match[4]))>>>
0;
}

return null;
}

function hue2rgb(p,q,t){
if(t<0){
t+=1;
}
if(t>1){
t-=1;
}
if(t<1/6){
return p+(q-p)*6*t;
}
if(t<1/2){
return q;
}
if(t<2/3){
return p+(q-p)*(2/3-t)*6;
}
return p;
}

function hslToRgb(h,s,l){
var q=l<0.5?l*(1+s):l+s-l*s;
var p=2*l-q;
var r=hue2rgb(p,q,h+1/3);
var g=hue2rgb(p,q,h);
var b=hue2rgb(p,q,h-1/3);

return(
Math.round(r*255)<<24|
Math.round(g*255)<<16|
Math.round(b*255)<<8);

}


var NUMBER='[-+]?\\d*\\.?\\d+';
var PERCENTAGE=NUMBER+'%';

function call(){for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}
return'\\(\\s*('+args.join(')\\s*,\\s*(')+')\\s*\\)';
}

var matchers={
rgb:new RegExp('rgb'+call(NUMBER,NUMBER,NUMBER)),
rgba:new RegExp('rgba'+call(NUMBER,NUMBER,NUMBER,NUMBER)),
hsl:new RegExp('hsl'+call(NUMBER,PERCENTAGE,PERCENTAGE)),
hsla:new RegExp('hsla'+call(NUMBER,PERCENTAGE,PERCENTAGE,NUMBER)),
hex3:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
hex4:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
hex6:/^#([0-9a-fA-F]{6})$/,
hex8:/^#([0-9a-fA-F]{8})$/};


function parse255(str){
var int=parseInt(str,10);
if(int<0){
return 0;
}
if(int>255){
return 255;
}
return int;
}

function parse360(str){
var int=parseFloat(str);
return(int%360+360)%360/360;
}

function parse1(str){
var num=parseFloat(str);
if(num<0){
return 0;
}
if(num>1){
return 255;
}
return Math.round(num*255);
}

function parsePercentage(str){

var int=parseFloat(str,10);
if(int<0){
return 0;
}
if(int>100){
return 1;
}
return int/100;
}

var names={
transparent:0x00000000,


aliceblue:0xf0f8ffff,
antiquewhite:0xfaebd7ff,
aqua:0x00ffffff,
aquamarine:0x7fffd4ff,
azure:0xf0ffffff,
beige:0xf5f5dcff,
bisque:0xffe4c4ff,
black:0x000000ff,
blanchedalmond:0xffebcdff,
blue:0x0000ffff,
blueviolet:0x8a2be2ff,
brown:0xa52a2aff,
burlywood:0xdeb887ff,
burntsienna:0xea7e5dff,
cadetblue:0x5f9ea0ff,
chartreuse:0x7fff00ff,
chocolate:0xd2691eff,
coral:0xff7f50ff,
cornflowerblue:0x6495edff,
cornsilk:0xfff8dcff,
crimson:0xdc143cff,
cyan:0x00ffffff,
darkblue:0x00008bff,
darkcyan:0x008b8bff,
darkgoldenrod:0xb8860bff,
darkgray:0xa9a9a9ff,
darkgreen:0x006400ff,
darkgrey:0xa9a9a9ff,
darkkhaki:0xbdb76bff,
darkmagenta:0x8b008bff,
darkolivegreen:0x556b2fff,
darkorange:0xff8c00ff,
darkorchid:0x9932ccff,
darkred:0x8b0000ff,
darksalmon:0xe9967aff,
darkseagreen:0x8fbc8fff,
darkslateblue:0x483d8bff,
darkslategray:0x2f4f4fff,
darkslategrey:0x2f4f4fff,
darkturquoise:0x00ced1ff,
darkviolet:0x9400d3ff,
deeppink:0xff1493ff,
deepskyblue:0x00bfffff,
dimgray:0x696969ff,
dimgrey:0x696969ff,
dodgerblue:0x1e90ffff,
firebrick:0xb22222ff,
floralwhite:0xfffaf0ff,
forestgreen:0x228b22ff,
fuchsia:0xff00ffff,
gainsboro:0xdcdcdcff,
ghostwhite:0xf8f8ffff,
gold:0xffd700ff,
goldenrod:0xdaa520ff,
gray:0x808080ff,
green:0x008000ff,
greenyellow:0xadff2fff,
grey:0x808080ff,
honeydew:0xf0fff0ff,
hotpink:0xff69b4ff,
indianred:0xcd5c5cff,
indigo:0x4b0082ff,
ivory:0xfffff0ff,
khaki:0xf0e68cff,
lavender:0xe6e6faff,
lavenderblush:0xfff0f5ff,
lawngreen:0x7cfc00ff,
lemonchiffon:0xfffacdff,
lightblue:0xadd8e6ff,
lightcoral:0xf08080ff,
lightcyan:0xe0ffffff,
lightgoldenrodyellow:0xfafad2ff,
lightgray:0xd3d3d3ff,
lightgreen:0x90ee90ff,
lightgrey:0xd3d3d3ff,
lightpink:0xffb6c1ff,
lightsalmon:0xffa07aff,
lightseagreen:0x20b2aaff,
lightskyblue:0x87cefaff,
lightslategray:0x778899ff,
lightslategrey:0x778899ff,
lightsteelblue:0xb0c4deff,
lightyellow:0xffffe0ff,
lime:0x00ff00ff,
limegreen:0x32cd32ff,
linen:0xfaf0e6ff,
magenta:0xff00ffff,
maroon:0x800000ff,
mediumaquamarine:0x66cdaaff,
mediumblue:0x0000cdff,
mediumorchid:0xba55d3ff,
mediumpurple:0x9370dbff,
mediumseagreen:0x3cb371ff,
mediumslateblue:0x7b68eeff,
mediumspringgreen:0x00fa9aff,
mediumturquoise:0x48d1ccff,
mediumvioletred:0xc71585ff,
midnightblue:0x191970ff,
mintcream:0xf5fffaff,
mistyrose:0xffe4e1ff,
moccasin:0xffe4b5ff,
navajowhite:0xffdeadff,
navy:0x000080ff,
oldlace:0xfdf5e6ff,
olive:0x808000ff,
olivedrab:0x6b8e23ff,
orange:0xffa500ff,
orangered:0xff4500ff,
orchid:0xda70d6ff,
palegoldenrod:0xeee8aaff,
palegreen:0x98fb98ff,
paleturquoise:0xafeeeeff,
palevioletred:0xdb7093ff,
papayawhip:0xffefd5ff,
peachpuff:0xffdab9ff,
peru:0xcd853fff,
pink:0xffc0cbff,
plum:0xdda0ddff,
powderblue:0xb0e0e6ff,
purple:0x800080ff,
rebeccapurple:0x663399ff,
red:0xff0000ff,
rosybrown:0xbc8f8fff,
royalblue:0x4169e1ff,
saddlebrown:0x8b4513ff,
salmon:0xfa8072ff,
sandybrown:0xf4a460ff,
seagreen:0x2e8b57ff,
seashell:0xfff5eeff,
sienna:0xa0522dff,
silver:0xc0c0c0ff,
skyblue:0x87ceebff,
slateblue:0x6a5acdff,
slategray:0x708090ff,
slategrey:0x708090ff,
snow:0xfffafaff,
springgreen:0x00ff7fff,
steelblue:0x4682b4ff,
tan:0xd2b48cff,
teal:0x008080ff,
thistle:0xd8bfd8ff,
tomato:0xff6347ff,
turquoise:0x40e0d0ff,
violet:0xee82eeff,
wheat:0xf5deb3ff,
white:0xffffffff,
whitesmoke:0xf5f5f5ff,
yellow:0xffff00ff,
yellowgreen:0x9acd32ff};


module.exports=normalizeColor;
}, 20, null, "normalizeColor");
__d(/* NativeMethodsMixin */function(global, require, module, exports) {









'use strict';

var ReactNativeAttributePayload=require(22 /* ReactNativeAttributePayload */);
var TextInputState=require(27 /* TextInputState */);
var UIManager=require(75 /* UIManager */);

var findNodeHandle=require(76 /* findNodeHandle */);
var invariant=require(26 /* fbjs/lib/invariant */);
























function warnForStyleProps(props,validAttributes){
for(var key in validAttributes.style){
if(!(validAttributes[key]||props[key]===undefined)){
console.error(
'You are setting the style `{ '+key+': ... }` as a prop. You '+
'should nest it in a style object. '+
'E.g. `{ style: { '+key+': ... } }`');

}
}
}













var NativeMethodsMixin={

















measure:function measure(callback){
UIManager.measure(
findNodeHandle(this),
mountSafeCallback(this,callback));

},
















measureInWindow:function measureInWindow(callback){
UIManager.measureInWindow(
findNodeHandle(this),
mountSafeCallback(this,callback));

},









measureLayout:function measureLayout(
relativeToNativeNode,
onSuccess,
onFail)
{
UIManager.measureLayout(
findNodeHandle(this),
relativeToNativeNode,
mountSafeCallback(this,onFail),
mountSafeCallback(this,onSuccess));

},







setNativeProps:function setNativeProps(nativeProps){
if(!this.viewConfig){
var ctor=this.constructor;
var componentName=ctor.displayName||ctor.name||'<Unknown Component>';
invariant(false,componentName+' "viewConfig" is not defined.');
}

if(__DEV__){
warnForStyleProps(nativeProps,this.viewConfig.validAttributes);
}

var updatePayload=ReactNativeAttributePayload.create(
nativeProps,
this.viewConfig.validAttributes);


UIManager.updateView(
findNodeHandle(this),
this.viewConfig.uiViewClassName,
updatePayload);

},





focus:function focus(){
TextInputState.focusTextInput(findNodeHandle(this));
},




blur:function blur(){
TextInputState.blurTextInput(findNodeHandle(this));
}};


function throwOnStylesProp(component,props){
if(props.styles!==undefined){
var owner=component._owner||null;
var name=component.constructor.displayName;
var msg='`styles` is not a supported property of `'+name+'`, did '+
'you mean `style` (singular)?';
if(owner&&owner.constructor&&owner.constructor.displayName){
msg+='\n\nCheck the `'+owner.constructor.displayName+'` parent '+
' component.';
}
throw new Error(msg);
}
}
if(__DEV__){



var NativeMethodsMixin_DEV=NativeMethodsMixin;
invariant(
!NativeMethodsMixin_DEV.componentWillMount&&
!NativeMethodsMixin_DEV.componentWillReceiveProps,
'Do not override existing functions.');

NativeMethodsMixin_DEV.componentWillMount=function(){
throwOnStylesProp(this,this.props);
};
NativeMethodsMixin_DEV.componentWillReceiveProps=function(newProps){
throwOnStylesProp(this,newProps);
};
}





function mountSafeCallback(
context,
callback)
{
return function(){
if(!callback||context.isMounted&&!context.isMounted()){
return undefined;
}
return callback.apply(context,arguments);
};
}

module.exports=NativeMethodsMixin;
}, 21, null, "NativeMethodsMixin");
__d(/* ReactNativeAttributePayload */function(global, require, module, exports) {










'use strict';

var ReactNativePropRegistry=require(23 /* ReactNativePropRegistry */);

var deepDiffer=require(24 /* deepDiffer */);
var flattenStyle=require(25 /* flattenStyle */);

var emptyObject={};





























var removedKeys=null;
var removedKeyCount=0;

function defaultDiffer(prevProp,nextProp){
if(typeof nextProp!=='object'||nextProp===null){

return true;
}else{

return deepDiffer(prevProp,nextProp);
}
}

function resolveObject(idOrObject){
if(typeof idOrObject==='number'){
return ReactNativePropRegistry.getByID(idOrObject);
}
return idOrObject;
}

function restoreDeletedValuesInNestedArray(
updatePayload,
node,
validAttributes)
{
if(Array.isArray(node)){
var i=node.length;
while(i--&&removedKeyCount>0){
restoreDeletedValuesInNestedArray(
updatePayload,
node[i],
validAttributes);

}
}else if(node&&removedKeyCount>0){
var obj=resolveObject(node);
for(var propKey in removedKeys){
if(!removedKeys[propKey]){
continue;
}
var nextProp=obj[propKey];
if(nextProp===undefined){
continue;
}

var attributeConfig=validAttributes[propKey];
if(!attributeConfig){
continue;
}

if(typeof nextProp==='function'){
nextProp=true;
}
if(typeof nextProp==='undefined'){
nextProp=null;
}

if(typeof attributeConfig!=='object'){

updatePayload[propKey]=nextProp;
}else if(typeof attributeConfig.diff==='function'||
typeof attributeConfig.process==='function'){

var nextValue=typeof attributeConfig.process==='function'?
attributeConfig.process(nextProp):
nextProp;
updatePayload[propKey]=nextValue;
}
removedKeys[propKey]=false;
removedKeyCount--;
}
}
}

function diffNestedArrayProperty(
updatePayload,
prevArray,
nextArray,
validAttributes)
{
var minLength=prevArray.length<nextArray.length?
prevArray.length:
nextArray.length;
var i;
for(i=0;i<minLength;i++){


updatePayload=diffNestedProperty(
updatePayload,
prevArray[i],
nextArray[i],
validAttributes);

}
for(;i<prevArray.length;i++){

updatePayload=clearNestedProperty(
updatePayload,
prevArray[i],
validAttributes);

}
for(;i<nextArray.length;i++){

updatePayload=addNestedProperty(
updatePayload,
nextArray[i],
validAttributes);

}
return updatePayload;
}

function diffNestedProperty(
updatePayload,
prevProp,
nextProp,
validAttributes)
{

if(!updatePayload&&prevProp===nextProp){


return updatePayload;
}

if(!prevProp||!nextProp){
if(nextProp){
return addNestedProperty(
updatePayload,
nextProp,
validAttributes);

}
if(prevProp){
return clearNestedProperty(
updatePayload,
prevProp,
validAttributes);

}
return updatePayload;
}

if(!Array.isArray(prevProp)&&!Array.isArray(nextProp)){

return diffProperties(
updatePayload,
resolveObject(prevProp),
resolveObject(nextProp),
validAttributes);

}

if(Array.isArray(prevProp)&&Array.isArray(nextProp)){

return diffNestedArrayProperty(
updatePayload,
prevProp,
nextProp,
validAttributes);

}

if(Array.isArray(prevProp)){
return diffProperties(
updatePayload,

flattenStyle(prevProp),

resolveObject(nextProp),
validAttributes);

}

return diffProperties(
updatePayload,
resolveObject(prevProp),

flattenStyle(nextProp),
validAttributes);

}






function addNestedProperty(
updatePayload,
nextProp,
validAttributes)
{
if(!nextProp){
return updatePayload;
}

if(!Array.isArray(nextProp)){

return addProperties(
updatePayload,
resolveObject(nextProp),
validAttributes);

}

for(var i=0;i<nextProp.length;i++){

updatePayload=addNestedProperty(
updatePayload,
nextProp[i],
validAttributes);

}

return updatePayload;
}





function clearNestedProperty(
updatePayload,
prevProp,
validAttributes)
{
if(!prevProp){
return updatePayload;
}

if(!Array.isArray(prevProp)){

return clearProperties(
updatePayload,
resolveObject(prevProp),
validAttributes);

}

for(var i=0;i<prevProp.length;i++){

updatePayload=clearNestedProperty(
updatePayload,
prevProp[i],
validAttributes);

}
return updatePayload;
}







function diffProperties(
updatePayload,
prevProps,
nextProps,
validAttributes)
{
var attributeConfig;
var nextProp;
var prevProp;

for(var propKey in nextProps){
attributeConfig=validAttributes[propKey];
if(!attributeConfig){
continue;
}

prevProp=prevProps[propKey];
nextProp=nextProps[propKey];



if(typeof nextProp==='function'){
nextProp=true;


if(typeof prevProp==='function'){
prevProp=true;
}
}



if(typeof nextProp==='undefined'){
nextProp=null;
if(typeof prevProp==='undefined'){
prevProp=null;
}
}

if(removedKeys){
removedKeys[propKey]=false;
}

if(updatePayload&&updatePayload[propKey]!==undefined){






if(typeof attributeConfig!=='object'){

updatePayload[propKey]=nextProp;
}else if(typeof attributeConfig.diff==='function'||
typeof attributeConfig.process==='function'){

var nextValue=typeof attributeConfig.process==='function'?
attributeConfig.process(nextProp):
nextProp;
updatePayload[propKey]=nextValue;
}
continue;
}

if(prevProp===nextProp){
continue;
}


if(typeof attributeConfig!=='object'){

if(defaultDiffer(prevProp,nextProp)){

(updatePayload||(updatePayload={}))[propKey]=nextProp;
}
}else if(typeof attributeConfig.diff==='function'||
typeof attributeConfig.process==='function'){

var shouldUpdate=prevProp===undefined||(
typeof attributeConfig.diff==='function'?
attributeConfig.diff(prevProp,nextProp):
defaultDiffer(prevProp,nextProp));

if(shouldUpdate){
nextValue=typeof attributeConfig.process==='function'?
attributeConfig.process(nextProp):
nextProp;
(updatePayload||(updatePayload={}))[propKey]=nextValue;
}
}else{

removedKeys=null;
removedKeyCount=0;



updatePayload=diffNestedProperty(
updatePayload,
prevProp,
nextProp,
attributeConfig);

if(removedKeyCount>0&&updatePayload){
restoreDeletedValuesInNestedArray(
updatePayload,
nextProp,
attributeConfig);

removedKeys=null;
}
}
}




for(propKey in prevProps){
if(nextProps[propKey]!==undefined){
continue;
}
attributeConfig=validAttributes[propKey];
if(!attributeConfig){
continue;
}

if(updatePayload&&updatePayload[propKey]!==undefined){

continue;
}

prevProp=prevProps[propKey];
if(prevProp===undefined){
continue;
}

if(typeof attributeConfig!=='object'||
typeof attributeConfig.diff==='function'||
typeof attributeConfig.process==='function'){



(updatePayload||(updatePayload={}))[propKey]=null;
if(!removedKeys){
removedKeys={};
}
if(!removedKeys[propKey]){
removedKeys[propKey]=true;
removedKeyCount++;
}
}else{



updatePayload=clearNestedProperty(
updatePayload,
prevProp,
attributeConfig);

}
}
return updatePayload;
}




function addProperties(
updatePayload,
props,
validAttributes)
{

return diffProperties(updatePayload,emptyObject,props,validAttributes);
}





function clearProperties(
updatePayload,
prevProps,
validAttributes)
{

return diffProperties(updatePayload,prevProps,emptyObject,validAttributes);
}

var ReactNativeAttributePayload={

create:function create(
props,
validAttributes)
{
return addProperties(
null,
props,
validAttributes);

},

diff:function diff(
prevProps,
nextProps,
validAttributes)
{
return diffProperties(
null,
prevProps,
nextProps,
validAttributes);

}};



module.exports=ReactNativeAttributePayload;
}, 22, null, "ReactNativeAttributePayload");
__d(/* ReactNativePropRegistry */function(global, require, module, exports) {










'use strict';

var objects={};
var uniqueID=1;
var emptyObject={};var

ReactNativePropRegistry=function(){function ReactNativePropRegistry(){babelHelpers.classCallCheck(this,ReactNativePropRegistry);}babelHelpers.createClass(ReactNativePropRegistry,null,[{key:'register',value:function register(
object){
var id=++uniqueID;
if(__DEV__){
Object.freeze(object);
}
objects[id]=object;
return id;
}},{key:'getByID',value:function getByID(

id){
if(!id){


return emptyObject;
}

var object=objects[id];
if(!object){
console.warn('Invalid style with id `'+id+'`. Skipping ...');
return emptyObject;
}
return object;
}}]);return ReactNativePropRegistry;}();


module.exports=ReactNativePropRegistry;
}, 23, null, "ReactNativePropRegistry");
__d(/* deepDiffer */function(global, require, module, exports) {










'use strict';




var deepDiffer=function deepDiffer(one,two){
if(one===two){

return false;
}
if(typeof one==='function'&&typeof two==='function'){

return false;
}
if(typeof one!=='object'||one===null){

return one!==two;
}
if(typeof two!=='object'||two===null){


return true;
}
if(one.constructor!==two.constructor){
return true;
}
if(Array.isArray(one)){

var len=one.length;
if(two.length!==len){
return true;
}
for(var ii=0;ii<len;ii++){
if(deepDiffer(one[ii],two[ii])){
return true;
}
}
}else{
for(var key in one){
if(deepDiffer(one[key],two[key])){
return true;
}
}
for(var twoKey in two){


if(one[twoKey]===undefined&&two[twoKey]!==undefined){
return true;
}
}
}
return false;
};

module.exports=deepDiffer;
}, 24, null, "deepDiffer");
__d(/* flattenStyle */function(global, require, module, exports) {










'use strict';

var ReactNativePropRegistry=require(23 /* ReactNativePropRegistry */);
var invariant=require(26 /* fbjs/lib/invariant */);



function getStyle(style){
if(typeof style==='number'){
return ReactNativePropRegistry.getByID(style);
}
return style;
}

function flattenStyle(style){
if(!style){
return undefined;
}
invariant(style!==true,'style may be false but not true');

if(!Array.isArray(style)){
return getStyle(style);
}

var result={};
for(var i=0,styleLength=style.length;i<styleLength;++i){
var computedStyle=flattenStyle(style[i]);
if(computedStyle){
for(var key in computedStyle){
result[key]=computedStyle[key];
}
}
}
return result;
}

module.exports=flattenStyle;
}, 25, null, "flattenStyle");
__d(/* fbjs/lib/invariant.js */function(global, require, module, exports) {









'use strict';












var validateFormat=function validateFormat(format){};

if(process.env.NODE_ENV!=='production'){
validateFormat=function validateFormat(format){
if(format===undefined){
throw new Error('invariant requires an error message argument');
}
};
}

function invariant(condition,format,a,b,c,d,e,f){
validateFormat(format);

if(!condition){
var error;
if(format===undefined){
error=new Error('Minified exception occurred; use the non-minified dev environment '+'for the full error message and additional helpful warnings.');
}else{
var args=[a,b,c,d,e,f];
var argIndex=0;
error=new Error(format.replace(/%s/g,function(){
return args[argIndex++];
}));
error.name='Invariant Violation';
}

error.framesToPop=1;
throw error;
}
}

module.exports=invariant;
}, 26, null, "fbjs/lib/invariant.js");
__d(/* TextInputState */function(global, require, module, exports) {














'use strict';

var Platform=require(28 /* Platform */);
var UIManager=require(75 /* UIManager */);

var TextInputState={



_currentlyFocusedID:null,





currentlyFocusedField:function currentlyFocusedField(){
return this._currentlyFocusedID;
},






focusTextInput:function focusTextInput(textFieldID){
if(this._currentlyFocusedID!==textFieldID&&textFieldID!==null){
this._currentlyFocusedID=textFieldID;
if(Platform.OS==='ios'){
UIManager.focus(textFieldID);
}else if(Platform.OS==='android'){
UIManager.dispatchViewManagerCommand(
textFieldID,
UIManager.AndroidTextInput.Commands.focusTextInput,
null);

}
}
},






blurTextInput:function blurTextInput(textFieldID){
if(this._currentlyFocusedID===textFieldID&&textFieldID!==null){
this._currentlyFocusedID=null;
if(Platform.OS==='ios'){
UIManager.blur(textFieldID);
}else if(Platform.OS==='android'){
UIManager.dispatchViewManagerCommand(
textFieldID,
UIManager.AndroidTextInput.Commands.blurTextInput,
null);

}
}
}};


module.exports=TextInputState;
}, 27, null, "TextInputState");
__d(/* Platform */function(global, require, module, exports) {











'use strict';

var Platform={
OS:'ios',
get Version(){
return require(29 /* NativeModules */).IOSConstants.osVersion;
},
select:function select(obj){return obj.ios;}};


module.exports=Platform;
}, 28, null, "Platform");
__d(/* NativeModules */function(global, require, module, exports) {










'use strict';

var BatchedBridge=require(30 /* BatchedBridge */);

var defineLazyObjectProperty=require(74 /* defineLazyObjectProperty */);
var invariant=require(26 /* fbjs/lib/invariant */);











function genModule(config,moduleID){
if(!config){
return null;
}var _config=babelHelpers.slicedToArray(

config,5),moduleName=_config[0],constants=_config[1],methods=_config[2],promiseMethods=_config[3],syncMethods=_config[4];
invariant(!moduleName.startsWith('RCT')&&!moduleName.startsWith('RK'),
'Module name prefixes should\'ve been stripped by the native side '+
'but wasn\'t for '+moduleName);

if(!constants&&!methods){

return{name:moduleName};
}

var module={};
methods&&methods.forEach(function(methodName,methodID){
var isPromise=promiseMethods&&arrayContains(promiseMethods,methodID);
var isSync=syncMethods&&arrayContains(syncMethods,methodID);
invariant(!isPromise||!isSync,'Cannot have a method that is both async and a sync hook');
var methodType=isPromise?'promise':isSync?'sync':'async';
module[methodName]=genMethod(moduleID,methodID,methodType);
});
babelHelpers.extends(module,constants);

if(__DEV__){
BatchedBridge.createDebugLookup(moduleID,moduleName,methods);
}

return{name:moduleName,module:module};
}


global.__fbGenNativeModule=genModule;

function loadModule(name,moduleID){
invariant(global.nativeRequireModuleConfig,
'Can\'t lazily create module without nativeRequireModuleConfig');
var config=global.nativeRequireModuleConfig(name);
var info=genModule(config,moduleID);
return info&&info.module;
}

function genMethod(moduleID,methodID,type){
var fn=null;
if(type==='promise'){
fn=function fn(){for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}
return new Promise(function(resolve,reject){
BatchedBridge.enqueueNativeCall(moduleID,methodID,args,
function(data){return resolve(data);},
function(errorData){return reject(createErrorFromErrorData(errorData));});
});
};
}else if(type==='sync'){
fn=function fn(){for(var _len2=arguments.length,args=Array(_len2),_key2=0;_key2<_len2;_key2++){args[_key2]=arguments[_key2];}
return global.nativeCallSyncHook(moduleID,methodID,args);
};
}else{
fn=function fn(){for(var _len3=arguments.length,args=Array(_len3),_key3=0;_key3<_len3;_key3++){args[_key3]=arguments[_key3];}
var lastArg=args.length>0?args[args.length-1]:null;
var secondLastArg=args.length>1?args[args.length-2]:null;
var hasSuccessCallback=typeof lastArg==='function';
var hasErrorCallback=typeof secondLastArg==='function';
hasErrorCallback&&invariant(
hasSuccessCallback,
'Cannot have a non-function arg after a function arg.');

var onSuccess=hasSuccessCallback?lastArg:null;
var onFail=hasErrorCallback?secondLastArg:null;
var callbackCount=hasSuccessCallback+hasErrorCallback;
args=args.slice(0,args.length-callbackCount);
BatchedBridge.enqueueNativeCall(moduleID,methodID,args,onFail,onSuccess);
};
}
fn.type=type;
return fn;
}

function arrayContains(array,value){
return array.indexOf(value)!==-1;
}

function createErrorFromErrorData(errorData){var

message=

errorData.message,extraErrorInfo=babelHelpers.objectWithoutProperties(errorData,['message']);
var error=new Error(message);
error.framesToPop=1;
return babelHelpers.extends(error,extraErrorInfo);
}

var NativeModules={};
if(global.nativeModuleProxy){
NativeModules=global.nativeModuleProxy;
}else{
var bridgeConfig=global.__fbBatchedBridgeConfig;
invariant(bridgeConfig,'__fbBatchedBridgeConfig is not set, cannot invoke native modules');

(bridgeConfig.remoteModuleConfig||[]).forEach(function(config,moduleID){


var info=genModule(config,moduleID);
if(!info){
return;
}

if(info.module){
NativeModules[info.name]=info.module;
}else

{
defineLazyObjectProperty(NativeModules,info.name,{
get:function get(){return loadModule(info.name,moduleID);}});

}
});
}

module.exports=NativeModules;
}, 29, null, "NativeModules");
__d(/* BatchedBridge */function(global, require, module, exports) {










'use strict';

var MessageQueue=require(31 /* MessageQueue */);
var BatchedBridge=new MessageQueue();


BatchedBridge.registerCallableModule('Systrace',require(34 /* Systrace */));
BatchedBridge.registerCallableModule('JSTimersExecution',require(33 /* JSTimersExecution */));
BatchedBridge.registerCallableModule('HeapCapture',require(51 /* HeapCapture */));
BatchedBridge.registerCallableModule('SamplingProfiler',require(52 /* SamplingProfiler */));

if(__DEV__){
BatchedBridge.registerCallableModule('HMRClient',require(53 /* HMRClient */));
}







Object.defineProperty(global,'__fbBatchedBridge',{
configurable:true,
value:BatchedBridge});


module.exports=BatchedBridge;
}, 30, null, "BatchedBridge");
__d(/* MessageQueue */function(global, require, module, exports) {













'use strict';

var ErrorUtils=require(32 /* ErrorUtils */);
var JSTimersExecution=require(33 /* JSTimersExecution */);
var Systrace=require(34 /* Systrace */);

var deepFreezeAndThrowOnMutationInDev=require(49 /* deepFreezeAndThrowOnMutationInDev */);
var invariant=require(26 /* fbjs/lib/invariant */);
var stringifySafe=require(50 /* stringifySafe */);








var TO_JS=0;
var TO_NATIVE=1;

var MODULE_IDS=0;
var METHOD_IDS=1;
var PARAMS=2;
var MIN_TIME_BETWEEN_FLUSHES_MS=5;

var TRACE_TAG_REACT_APPS=1<<17;

var DEBUG_INFO_LIMIT=32;

var guard=function guard(fn){
try{
fn();
}catch(error){
ErrorUtils.reportFatalError(error);
}
};var

MessageQueue=function(){














function MessageQueue(){babelHelpers.classCallCheck(this,MessageQueue);
this._callableModules={};
this._queue=[[],[],[],0];
this._callbacks=[];
this._callbackID=0;
this._callID=0;
this._lastFlush=0;
this._eventLoopStartTime=new Date().getTime();

if(__DEV__){
this._debugInfo={};
this._remoteModuleTable={};
this._remoteMethodTable={};
}

this.callFunctionReturnFlushedQueue=this.callFunctionReturnFlushedQueue.bind(this);
this.callFunctionReturnResultAndFlushedQueue=this.callFunctionReturnResultAndFlushedQueue.bind(this);
this.flushedQueue=this.flushedQueue.bind(this);
this.invokeCallbackAndReturnFlushedQueue=this.invokeCallbackAndReturnFlushedQueue.bind(this);
}babelHelpers.createClass(MessageQueue,[{key:'callFunctionReturnFlushedQueue',value:function callFunctionReturnFlushedQueue(



















module,method,args){var _this=this;
guard(function(){
_this.__callFunction(module,method,args);
_this.__callImmediates();
});

return this.flushedQueue();
}},{key:'callFunctionReturnResultAndFlushedQueue',value:function callFunctionReturnResultAndFlushedQueue(

module,method,args){var _this2=this;
var result=void 0;
guard(function(){
result=_this2.__callFunction(module,method,args);
_this2.__callImmediates();
});

return[result,this.flushedQueue()];
}},{key:'invokeCallbackAndReturnFlushedQueue',value:function invokeCallbackAndReturnFlushedQueue(

cbID,args){var _this3=this;
guard(function(){
_this3.__invokeCallback(cbID,args);
_this3.__callImmediates();
});

return this.flushedQueue();
}},{key:'flushedQueue',value:function flushedQueue()

{
this.__callImmediates();

var queue=this._queue;
this._queue=[[],[],[],this._callID];
return queue[0].length?queue:null;
}},{key:'getEventLoopRunningTime',value:function getEventLoopRunningTime()

{
return new Date().getTime()-this._eventLoopStartTime;
}},{key:'registerCallableModule',value:function registerCallableModule(

name,module){
this._callableModules[name]=module;
}},{key:'enqueueNativeCall',value:function enqueueNativeCall(

moduleID,methodID,params,onFail,onSucc){
if(onFail||onSucc){
if(__DEV__){
var callId=this._callbackID>>1;
this._debugInfo[callId]=[moduleID,methodID];
if(callId>DEBUG_INFO_LIMIT){
delete this._debugInfo[callId-DEBUG_INFO_LIMIT];
}
}
onFail&&params.push(this._callbackID);
this._callbacks[this._callbackID++]=onFail;
onSucc&&params.push(this._callbackID);
this._callbacks[this._callbackID++]=onSucc;
}

if(__DEV__){
global.nativeTraceBeginAsyncFlow&&
global.nativeTraceBeginAsyncFlow(TRACE_TAG_REACT_APPS,'native',this._callID);
}
this._callID++;

this._queue[MODULE_IDS].push(moduleID);
this._queue[METHOD_IDS].push(methodID);

if(__DEV__){

JSON.stringify(params);


deepFreezeAndThrowOnMutationInDev(params);
}
this._queue[PARAMS].push(params);

var now=new Date().getTime();
if(global.nativeFlushQueueImmediate&&
now-this._lastFlush>=MIN_TIME_BETWEEN_FLUSHES_MS){
global.nativeFlushQueueImmediate(this._queue);
this._queue=[[],[],[],this._callID];
this._lastFlush=now;
}
Systrace.counterEvent('pending_js_to_native_queue',this._queue[0].length);
if(__DEV__&&this.__spy&&isFinite(moduleID)){
this.__spy(
{type:TO_NATIVE,
module:this._remoteModuleTable[moduleID],
method:this._remoteMethodTable[moduleID][methodID],
args:params});

}
}},{key:'createDebugLookup',value:function createDebugLookup(

moduleID,name,methods){
if(__DEV__){
this._remoteModuleTable[moduleID]=name;
this._remoteMethodTable[moduleID]=methods;
}
}},{key:'__callImmediates',value:function __callImmediates()





{
Systrace.beginEvent('JSTimersExecution.callImmediates()');
guard(function(){return JSTimersExecution.callImmediates();});
Systrace.endEvent();
}},{key:'__callFunction',value:function __callFunction(

module,method,args){
this._lastFlush=new Date().getTime();
this._eventLoopStartTime=this._lastFlush;
Systrace.beginEvent(module+'.'+method+'()');
if(__DEV__&&this.__spy){
this.__spy({type:TO_JS,module:module,method:method,args:args});
}
var moduleMethods=this._callableModules[module];
invariant(
!!moduleMethods,
'Module %s is not a registered callable module (calling %s)',
module,method);

invariant(
!!moduleMethods[method],
'Method %s does not exist on module %s',
method,module);

var result=moduleMethods[method].apply(moduleMethods,args);
Systrace.endEvent();
return result;
}},{key:'__invokeCallback',value:function __invokeCallback(

cbID,args){
this._lastFlush=new Date().getTime();
this._eventLoopStartTime=this._lastFlush;
var callback=this._callbacks[cbID];

if(__DEV__){
var debug=this._debugInfo[cbID>>1];
var _module=debug&&this._remoteModuleTable[debug[0]];
var _method=debug&&this._remoteMethodTable[debug[0]][debug[1]];
if(callback==null){
var errorMessage='Callback with id '+cbID+': '+_module+'.'+_method+'() not found';
if(_method){
errorMessage='The callback '+_method+'() exists in module '+_module+', '+
'but only one callback may be registered to a function in a native module.';
}
invariant(
callback,
errorMessage);

}
var profileName=debug?'<callback for '+_module+'.'+_method+'>':cbID;
if(callback&&this.__spy&&__DEV__){
this.__spy({type:TO_JS,module:null,method:profileName,args:args});
}
Systrace.beginEvent('MessageQueue.invokeCallback('+
profileName+', '+stringifySafe(args)+')');
}else{
if(!callback){
return;
}
}

this._callbacks[cbID&~1]=null;
this._callbacks[cbID|1]=null;

callback.apply(null,args);

if(__DEV__){
Systrace.endEvent();
}
}}],[{key:'spy',value:function spy(spyOrToggle){if(spyOrToggle===true){MessageQueue.prototype.__spy=function(info){console.log((info.type===TO_JS?'N->JS':'JS->N')+' : '+(''+(info.module?info.module+'.':'')+info.method)+('('+JSON.stringify(info.args)+')'));};}else if(spyOrToggle===false){MessageQueue.prototype.__spy=null;}else{MessageQueue.prototype.__spy=spyOrToggle;}}}]);return MessageQueue;}();


module.exports=MessageQueue;
}, 31, null, "MessageQueue");
__d(/* ErrorUtils */function(global, require, module, exports) {

























module.exports=global.ErrorUtils;
}, 32, null, "ErrorUtils");
__d(/* JSTimersExecution */function(global, require, module, exports) {










'use strict';

var Systrace=require(34 /* Systrace */);

var invariant=require(26 /* fbjs/lib/invariant */);
var performanceNow=require(43 /* fbjs/lib/performanceNow */);
var warning=require(15 /* fbjs/lib/warning */);



var FRAME_DURATION=1000/60;
var IDLE_CALLBACK_FRAME_DEADLINE=1;

var hasEmittedTimeDriftWarning=false;













var JSTimersExecution={
GUID:1,


callbacks:[],
types:[],
timerIDs:[],
immediates:[],
requestIdleCallbacks:[],
identifiers:[],

errors:null,






callTimer:function callTimer(timerID,frameTime){
warning(
timerID<=JSTimersExecution.GUID,
'Tried to call timer with ID %s but no such timer exists.',
timerID);







var timerIndex=JSTimersExecution.timerIDs.indexOf(timerID);
if(timerIndex===-1){
return;
}

var type=JSTimersExecution.types[timerIndex];
var callback=JSTimersExecution.callbacks[timerIndex];
if(!callback||!type){
console.error('No callback found for timerID '+timerID);
return;
}

if(__DEV__){
var identifier=JSTimersExecution.identifiers[timerIndex]||{};
Systrace.beginEvent('Systrace.callTimer: '+identifier.methodName);
}


if(type==='setTimeout'||type==='setImmediate'||
type==='requestAnimationFrame'||type==='requestIdleCallback'){
JSTimersExecution._clearIndex(timerIndex);
}

try{
if(type==='setTimeout'||type==='setInterval'||
type==='setImmediate'){
callback();
}else if(type==='requestAnimationFrame'){
callback(performanceNow());
}else if(type==='requestIdleCallback'){
callback({
timeRemaining:function timeRemaining(){



return Math.max(0,FRAME_DURATION-(performanceNow()-frameTime));
}});

}else{
console.error('Tried to call a callback with invalid type: '+type);
}
}catch(e){

if(!JSTimersExecution.errors){
JSTimersExecution.errors=[e];
}else{
JSTimersExecution.errors.push(e);
}
}

if(__DEV__){
Systrace.endEvent();
}
},





callTimers:function callTimers(timerIDs){
invariant(
timerIDs.length!==0,
'Cannot call `callTimers` with an empty list of IDs.');


JSTimersExecution.errors=null;
for(var i=0;i<timerIDs.length;i++){
JSTimersExecution.callTimer(timerIDs[i],0);
}

var errors=JSTimersExecution.errors;
if(errors){
var errorCount=errors.length;
if(errorCount>1){


for(var ii=1;ii<errorCount;ii++){
require(45 /* JSTimers */).setTimeout(
function(error){throw error;}.bind(null,errors[ii]),
0);

}
}
throw errors[0];
}
},

callIdleCallbacks:function callIdleCallbacks(frameTime){
if(FRAME_DURATION-(performanceNow()-frameTime)<IDLE_CALLBACK_FRAME_DEADLINE){
return;
}

JSTimersExecution.errors=null;
if(JSTimersExecution.requestIdleCallbacks.length>0){
var passIdleCallbacks=JSTimersExecution.requestIdleCallbacks.slice();
JSTimersExecution.requestIdleCallbacks=[];

for(var i=0;i<passIdleCallbacks.length;++i){
JSTimersExecution.callTimer(passIdleCallbacks[i],frameTime);
}
}

if(JSTimersExecution.requestIdleCallbacks.length===0){var _require=
require(29 /* NativeModules */),Timing=_require.Timing;
Timing.setSendIdleEvents(false);
}

if(JSTimersExecution.errors){
JSTimersExecution.errors.forEach(function(error){return(
require(45 /* JSTimers */).setTimeout(function(){throw error;},0));});

}
},





callImmediatesPass:function callImmediatesPass(){
Systrace.beginEvent('JSTimersExecution.callImmediatesPass()');



if(JSTimersExecution.immediates.length>0){
var passImmediates=JSTimersExecution.immediates.slice();
JSTimersExecution.immediates=[];



for(var i=0;i<passImmediates.length;++i){
JSTimersExecution.callTimer(passImmediates[i],0);
}
}

Systrace.endEvent();

return JSTimersExecution.immediates.length>0;
},





callImmediates:function callImmediates(){
JSTimersExecution.errors=null;
while(JSTimersExecution.callImmediatesPass()){}
if(JSTimersExecution.errors){
JSTimersExecution.errors.forEach(function(error){return(
require(45 /* JSTimers */).setTimeout(function(){throw error;},0));});

}
},




emitTimeDriftWarning:function emitTimeDriftWarning(warningMessage){
if(hasEmittedTimeDriftWarning){
return;
}
hasEmittedTimeDriftWarning=true;
console.warn(warningMessage);
},

_clearIndex:function _clearIndex(i){
JSTimersExecution.timerIDs[i]=null;
JSTimersExecution.callbacks[i]=null;
JSTimersExecution.types[i]=null;
JSTimersExecution.identifiers[i]=null;
}};


module.exports=JSTimersExecution;
}, 33, null, "JSTimersExecution");
__d(/* Systrace */function(global, require, module, exports) {










'use strict';














var TRACE_TAG_REACT_APPS=1<<17;
var TRACE_TAG_JSC_CALLS=1<<27;

var _enabled=false;
var _asyncCookie=0;

var ReactSystraceDevtool=__DEV__?{
onBeforeMountComponent:function onBeforeMountComponent(debugID){
var displayName=require(35 /* react/lib/ReactComponentTreeDevtool */).getDisplayName(debugID);
Systrace.beginEvent('ReactReconciler.mountComponent('+displayName+')');
},
onMountComponent:function onMountComponent(debugID){
Systrace.endEvent();
},
onBeforeUpdateComponent:function onBeforeUpdateComponent(debugID){
var displayName=require(35 /* react/lib/ReactComponentTreeDevtool */).getDisplayName(debugID);
Systrace.beginEvent('ReactReconciler.updateComponent('+displayName+')');
},
onUpdateComponent:function onUpdateComponent(debugID){
Systrace.endEvent();
},
onBeforeUnmountComponent:function onBeforeUnmountComponent(debugID){
var displayName=require(35 /* react/lib/ReactComponentTreeDevtool */).getDisplayName(debugID);
Systrace.beginEvent('ReactReconciler.unmountComponent('+displayName+')');
},
onUnmountComponent:function onUnmountComponent(debugID){
Systrace.endEvent();
},
onBeginLifeCycleTimer:function onBeginLifeCycleTimer(debugID,timerType){
var displayName=require(35 /* react/lib/ReactComponentTreeDevtool */).getDisplayName(debugID);
Systrace.beginEvent(displayName+'.'+timerType+'()');
},
onEndLifeCycleTimer:function onEndLifeCycleTimer(debugID,timerType){
Systrace.endEvent();
}}:
null;

var Systrace={
setEnabled:function setEnabled(enabled){
if(_enabled!==enabled){
if(__DEV__){
if(enabled){
global.nativeTraceBeginLegacy&&global.nativeTraceBeginLegacy(TRACE_TAG_JSC_CALLS);
require(39 /* ReactDebugTool */).addDevtool(ReactSystraceDevtool);
}else{
global.nativeTraceEndLegacy&&global.nativeTraceEndLegacy(TRACE_TAG_JSC_CALLS);
require(39 /* ReactDebugTool */).removeDevtool(ReactSystraceDevtool);
}
}
_enabled=enabled;
}
},




beginEvent:function beginEvent(profileName,args){
if(_enabled){
profileName=typeof profileName==='function'?
profileName():profileName;
global.nativeTraceBeginSection(TRACE_TAG_REACT_APPS,profileName,args);
}
},

endEvent:function endEvent(){
if(_enabled){
global.nativeTraceEndSection(TRACE_TAG_REACT_APPS);
}
},






beginAsyncEvent:function beginAsyncEvent(profileName){
var cookie=_asyncCookie;
if(_enabled){
_asyncCookie++;
profileName=typeof profileName==='function'?
profileName():profileName;
global.nativeTraceBeginAsyncSection(TRACE_TAG_REACT_APPS,profileName,cookie,0);
}
return cookie;
},

endAsyncEvent:function endAsyncEvent(profileName,cookie){
if(_enabled){
profileName=typeof profileName==='function'?
profileName():profileName;
global.nativeTraceEndAsyncSection(TRACE_TAG_REACT_APPS,profileName,cookie,0);
}
},




counterEvent:function counterEvent(profileName,value){
if(_enabled){
profileName=typeof profileName==='function'?
profileName():profileName;
global.nativeTraceCounter&&
global.nativeTraceCounter(TRACE_TAG_REACT_APPS,profileName,value);
}
},





attachToRelayProfiler:function attachToRelayProfiler(relayProfiler){
relayProfiler.attachProfileHandler('*',function(name){
var cookie=Systrace.beginAsyncEvent(name);
return function(){
Systrace.endAsyncEvent(name,cookie);
};
});

relayProfiler.attachAggregateHandler('*',function(name,callback){
Systrace.beginEvent(name);
callback();
Systrace.endEvent();
});
},



swizzleJSON:function swizzleJSON(){
Systrace.measureMethods(JSON,'JSON',[
'parse',
'stringify']);

},









measureMethods:function measureMethods(object,objectName,methodNames){
if(!__DEV__){
return;
}

methodNames.forEach(function(methodName){
object[methodName]=Systrace.measure(
objectName,
methodName,
object[methodName]);

});
},










measure:function measure(objName,fnName,func){
if(!__DEV__){
return func;
}

var profileName=objName+'.'+fnName;
return function(){
if(!_enabled){
return func.apply(this,arguments);
}

Systrace.beginEvent(profileName);
var ret=func.apply(this,arguments);
Systrace.endEvent();
return ret;
};
}};


if(__DEV__){




require.Systrace=Systrace;
}

module.exports=Systrace;
}, 34, null, "Systrace");
__d(/* react/lib/ReactComponentTreeDevtool.js */function(global, require, module, exports) {








'use strict';



module.exports=require(36 /* ./ReactComponentTreeHook */);
}, 35, null, "react/lib/ReactComponentTreeDevtool.js");
__d(/* react/lib/ReactComponentTreeHook.js */function(global, require, module, exports) {










'use strict';

var _prodInvariant=require(37 /* ./reactProdInvariant */);

var ReactCurrentOwner=require(38 /* ./ReactCurrentOwner */);

var invariant=require(26 /* fbjs/lib/invariant */);
var warning=require(15 /* fbjs/lib/warning */);

function isNative(fn){

var funcToString=Function.prototype.toString;
var hasOwnProperty=Object.prototype.hasOwnProperty;
var reIsNative=RegExp('^'+funcToString.

call(hasOwnProperty).

replace(/[\\^$.*+?()[\]{}|]/g,'\\$&').

replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,'$1.*?')+'$');
try{
var source=funcToString.call(fn);
return reIsNative.test(source);
}catch(err){
return false;
}
}

var canUseCollections=

typeof Array.from==='function'&&

typeof Map==='function'&&isNative(Map)&&

Map.prototype!=null&&typeof Map.prototype.keys==='function'&&isNative(Map.prototype.keys)&&

typeof Set==='function'&&isNative(Set)&&

Set.prototype!=null&&typeof Set.prototype.keys==='function'&&isNative(Set.prototype.keys);

var setItem;
var getItem;
var removeItem;
var getItemIDs;
var addRoot;
var removeRoot;
var getRootIDs;

if(canUseCollections){
var itemMap=new Map();
var rootIDSet=new Set();

setItem=function setItem(id,item){
itemMap.set(id,item);
};
getItem=function getItem(id){
return itemMap.get(id);
};
removeItem=function removeItem(id){
itemMap['delete'](id);
};
getItemIDs=function getItemIDs(){
return Array.from(itemMap.keys());
};

addRoot=function addRoot(id){
rootIDSet.add(id);
};
removeRoot=function removeRoot(id){
rootIDSet['delete'](id);
};
getRootIDs=function getRootIDs(){
return Array.from(rootIDSet.keys());
};
}else{
var itemByKey={};
var rootByKey={};



var getKeyFromID=function getKeyFromID(id){
return'.'+id;
};
var getIDFromKey=function getIDFromKey(key){
return parseInt(key.substr(1),10);
};

setItem=function setItem(id,item){
var key=getKeyFromID(id);
itemByKey[key]=item;
};
getItem=function getItem(id){
var key=getKeyFromID(id);
return itemByKey[key];
};
removeItem=function removeItem(id){
var key=getKeyFromID(id);
delete itemByKey[key];
};
getItemIDs=function getItemIDs(){
return Object.keys(itemByKey).map(getIDFromKey);
};

addRoot=function addRoot(id){
var key=getKeyFromID(id);
rootByKey[key]=true;
};
removeRoot=function removeRoot(id){
var key=getKeyFromID(id);
delete rootByKey[key];
};
getRootIDs=function getRootIDs(){
return Object.keys(rootByKey).map(getIDFromKey);
};
}

var unmountedIDs=[];

function purgeDeep(id){
var item=getItem(id);
if(item){
var childIDs=item.childIDs;

removeItem(id);
childIDs.forEach(purgeDeep);
}
}

function describeComponentFrame(name,source,ownerName){
return'\n    in '+(name||'Unknown')+(source?' (at '+source.fileName.replace(/^.*[\\\/]/,'')+':'+source.lineNumber+')':ownerName?' (created by '+ownerName+')':'');
}

function _getDisplayName(element){
if(element==null){
return'#empty';
}else if(typeof element==='string'||typeof element==='number'){
return'#text';
}else if(typeof element.type==='string'){
return element.type;
}else{
return element.type.displayName||element.type.name||'Unknown';
}
}

function describeID(id){
var name=ReactComponentTreeHook.getDisplayName(id);
var element=ReactComponentTreeHook.getElement(id);
var ownerID=ReactComponentTreeHook.getOwnerID(id);
var ownerName;
if(ownerID){
ownerName=ReactComponentTreeHook.getDisplayName(ownerID);
}
process.env.NODE_ENV!=='production'?warning(element,'ReactComponentTreeHook: Missing React element for debugID %s when '+'building stack',id):void 0;
return describeComponentFrame(name,element&&element._source,ownerName);
}

var ReactComponentTreeHook={
onSetChildren:function onSetChildren(id,nextChildIDs){
var item=getItem(id);
!item?process.env.NODE_ENV!=='production'?invariant(false,'Item must have been set'):_prodInvariant('144'):void 0;
item.childIDs=nextChildIDs;

for(var i=0;i<nextChildIDs.length;i++){
var nextChildID=nextChildIDs[i];
var nextChild=getItem(nextChildID);
!nextChild?process.env.NODE_ENV!=='production'?invariant(false,'Expected hook events to fire for the child before its parent includes it in onSetChildren().'):_prodInvariant('140'):void 0;
!(nextChild.childIDs!=null||typeof nextChild.element!=='object'||nextChild.element==null)?process.env.NODE_ENV!=='production'?invariant(false,'Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren().'):_prodInvariant('141'):void 0;
!nextChild.isMounted?process.env.NODE_ENV!=='production'?invariant(false,'Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren().'):_prodInvariant('71'):void 0;
if(nextChild.parentID==null){
nextChild.parentID=id;



}
!(nextChild.parentID===id)?process.env.NODE_ENV!=='production'?invariant(false,'Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).',nextChildID,nextChild.parentID,id):_prodInvariant('142',nextChildID,nextChild.parentID,id):void 0;
}
},
onBeforeMountComponent:function onBeforeMountComponent(id,element,parentID){
var item={
element:element,
parentID:parentID,
text:null,
childIDs:[],
isMounted:false,
updateCount:0};

setItem(id,item);
},
onBeforeUpdateComponent:function onBeforeUpdateComponent(id,element){
var item=getItem(id);
if(!item||!item.isMounted){


return;
}
item.element=element;
},
onMountComponent:function onMountComponent(id){
var item=getItem(id);
!item?process.env.NODE_ENV!=='production'?invariant(false,'Item must have been set'):_prodInvariant('144'):void 0;
item.isMounted=true;
var isRoot=item.parentID===0;
if(isRoot){
addRoot(id);
}
},
onUpdateComponent:function onUpdateComponent(id){
var item=getItem(id);
if(!item||!item.isMounted){


return;
}
item.updateCount++;
},
onUnmountComponent:function onUnmountComponent(id){
var item=getItem(id);
if(item){





item.isMounted=false;
var isRoot=item.parentID===0;
if(isRoot){
removeRoot(id);
}
}
unmountedIDs.push(id);
},
purgeUnmountedComponents:function purgeUnmountedComponents(){
if(ReactComponentTreeHook._preventPurging){

return;
}

for(var i=0;i<unmountedIDs.length;i++){
var id=unmountedIDs[i];
purgeDeep(id);
}
unmountedIDs.length=0;
},
isMounted:function isMounted(id){
var item=getItem(id);
return item?item.isMounted:false;
},
getCurrentStackAddendum:function getCurrentStackAddendum(topElement){
var info='';
if(topElement){
var name=_getDisplayName(topElement);
var owner=topElement._owner;
info+=describeComponentFrame(name,topElement._source,owner&&owner.getName());
}

var currentOwner=ReactCurrentOwner.current;
var id=currentOwner&&currentOwner._debugID;

info+=ReactComponentTreeHook.getStackAddendumByID(id);
return info;
},
getStackAddendumByID:function getStackAddendumByID(id){
var info='';
while(id){
info+=describeID(id);
id=ReactComponentTreeHook.getParentID(id);
}
return info;
},
getChildIDs:function getChildIDs(id){
var item=getItem(id);
return item?item.childIDs:[];
},
getDisplayName:function getDisplayName(id){
var element=ReactComponentTreeHook.getElement(id);
if(!element){
return null;
}
return _getDisplayName(element);
},
getElement:function getElement(id){
var item=getItem(id);
return item?item.element:null;
},
getOwnerID:function getOwnerID(id){
var element=ReactComponentTreeHook.getElement(id);
if(!element||!element._owner){
return null;
}
return element._owner._debugID;
},
getParentID:function getParentID(id){
var item=getItem(id);
return item?item.parentID:null;
},
getSource:function getSource(id){
var item=getItem(id);
var element=item?item.element:null;
var source=element!=null?element._source:null;
return source;
},
getText:function getText(id){
var element=ReactComponentTreeHook.getElement(id);
if(typeof element==='string'){
return element;
}else if(typeof element==='number'){
return''+element;
}else{
return null;
}
},
getUpdateCount:function getUpdateCount(id){
var item=getItem(id);
return item?item.updateCount:0;
},


getRootIDs:getRootIDs,
getRegisteredIDs:getItemIDs};


module.exports=ReactComponentTreeHook;
}, 36, null, "react/lib/ReactComponentTreeHook.js");
__d(/* react/lib/reactProdInvariant.js */function(global, require, module, exports) {









'use strict';








function reactProdInvariant(code){
var argCount=arguments.length-1;

var message='Minified React error #'+code+'; visit '+'http://facebook.github.io/react/docs/error-decoder.html?invariant='+code;

for(var argIdx=0;argIdx<argCount;argIdx++){
message+='&args[]='+encodeURIComponent(arguments[argIdx+1]);
}

message+=' for the full message or use the non-minified dev environment'+' for full errors and additional helpful warnings.';

var error=new Error(message);
error.name='Invariant Violation';
error.framesToPop=1;

throw error;
}

module.exports=reactProdInvariant;
}, 37, null, "react/lib/reactProdInvariant.js");
__d(/* react/lib/ReactCurrentOwner.js */function(global, require, module, exports) {










'use strict';







var ReactCurrentOwner={





current:null};



module.exports=ReactCurrentOwner;
}, 38, null, "react/lib/ReactCurrentOwner.js");
__d(/* ReactDebugTool */function(global, require, module, exports) {










'use strict';

var ReactInvalidSetStateWarningHook=require(40 /* ReactInvalidSetStateWarningHook */);
var ReactHostOperationHistoryHook=require(41 /* ReactHostOperationHistoryHook */);
var ReactComponentTreeHook=require(36 /* react/lib/ReactComponentTreeHook */);
var ExecutionEnvironment=require(42 /* fbjs/lib/ExecutionEnvironment */);

var performanceNow=require(43 /* fbjs/lib/performanceNow */);
var warning=require(15 /* fbjs/lib/warning */);












































var hooks=[];
var didHookThrowForEvent={};

function callHook(event,fn,context,arg1,arg2,arg3,arg4,arg5){
try{
fn.call(context,arg1,arg2,arg3,arg4,arg5);
}catch(e){
warning(
didHookThrowForEvent[event],
'Exception thrown by hook while handling %s: %s',
event,
e+'\n'+e.stack);

didHookThrowForEvent[event]=true;
}
}

function emitEvent(event,arg1,arg2,arg3,arg4,arg5){
for(var i=0;i<hooks.length;i++){
var hook=hooks[i];
var fn=hook[event];
if(fn){
callHook(event,fn,hook,arg1,arg2,arg3,arg4,arg5);
}
}
}

var _isProfiling=false;
var flushHistory=[];
var lifeCycleTimerStack=[];
var currentFlushNesting=0;
var currentFlushMeasurements=[];
var currentFlushStartTime=0;
var currentTimerDebugID=null;
var currentTimerStartTime=0;
var currentTimerNestedFlushDuration=0;
var currentTimerType=null;

var lifeCycleTimerHasWarned=false;

function clearHistory(){
ReactComponentTreeHook.purgeUnmountedComponents();
ReactHostOperationHistoryHook.clearHistory();
}

function getTreeSnapshot(registeredIDs){
return registeredIDs.reduce(function(tree,id){
var ownerID=ReactComponentTreeHook.getOwnerID(id);
var parentID=ReactComponentTreeHook.getParentID(id);
tree[id]={
displayName:ReactComponentTreeHook.getDisplayName(id),
text:ReactComponentTreeHook.getText(id),
updateCount:ReactComponentTreeHook.getUpdateCount(id),
childIDs:ReactComponentTreeHook.getChildIDs(id),

ownerID:ownerID||
parentID&&ReactComponentTreeHook.getOwnerID(parentID)||
0,
parentID:parentID};

return tree;
},{});
}

function resetMeasurements(){
var previousStartTime=currentFlushStartTime;
var previousMeasurements=currentFlushMeasurements;
var previousOperations=ReactHostOperationHistoryHook.getHistory();

if(currentFlushNesting===0){
currentFlushStartTime=0;
currentFlushMeasurements=[];
clearHistory();
return;
}

if(previousMeasurements.length||previousOperations.length){
var registeredIDs=ReactComponentTreeHook.getRegisteredIDs();
flushHistory.push({
duration:performanceNow()-previousStartTime,
measurements:previousMeasurements||[],
operations:previousOperations||[],
treeSnapshot:getTreeSnapshot(registeredIDs)});

}

clearHistory();
currentFlushStartTime=performanceNow();
currentFlushMeasurements=[];
}

function checkDebugID(debugID){var allowRoot=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;
if(allowRoot&&debugID===0){
return;
}
if(!debugID){
warning(false,'ReactDebugTool: debugID may not be empty.');
}
}

function beginLifeCycleTimer(debugID,timerType){
if(currentFlushNesting===0){
return;
}
if(currentTimerType&&!lifeCycleTimerHasWarned){
warning(
false,
'There is an internal error in the React performance measurement code. '+
'Did not expect %s timer to start while %s timer is still in '+
'progress for %s instance.',
timerType,
currentTimerType||'no',
debugID===currentTimerDebugID?'the same':'another');

lifeCycleTimerHasWarned=true;
}
currentTimerStartTime=performanceNow();
currentTimerNestedFlushDuration=0;
currentTimerDebugID=debugID;
currentTimerType=timerType;
}

function endLifeCycleTimer(debugID,timerType){
if(currentFlushNesting===0){
return;
}
if(currentTimerType!==timerType&&!lifeCycleTimerHasWarned){
warning(
false,
'There is an internal error in the React performance measurement code. '+
'We did not expect %s timer to stop while %s timer is still in '+
'progress for %s instance. Please report this as a bug in React.',
timerType,
currentTimerType||'no',
debugID===currentTimerDebugID?'the same':'another');

lifeCycleTimerHasWarned=true;
}
if(_isProfiling){
currentFlushMeasurements.push({
timerType:timerType,
instanceID:debugID,
duration:performanceNow()-currentTimerStartTime-currentTimerNestedFlushDuration});

}
currentTimerStartTime=0;
currentTimerNestedFlushDuration=0;
currentTimerDebugID=null;
currentTimerType=null;
}

function pauseCurrentLifeCycleTimer(){
var currentTimer={
startTime:currentTimerStartTime,
nestedFlushStartTime:performanceNow(),
debugID:currentTimerDebugID,
timerType:currentTimerType};

lifeCycleTimerStack.push(currentTimer);
currentTimerStartTime=0;
currentTimerNestedFlushDuration=0;
currentTimerDebugID=null;
currentTimerType=null;
}

function resumeCurrentLifeCycleTimer(){var _lifeCycleTimerStack$=
lifeCycleTimerStack.pop(),startTime=_lifeCycleTimerStack$.startTime,nestedFlushStartTime=_lifeCycleTimerStack$.nestedFlushStartTime,debugID=_lifeCycleTimerStack$.debugID,timerType=_lifeCycleTimerStack$.timerType;
var nestedFlushDuration=performanceNow()-nestedFlushStartTime;
currentTimerStartTime=startTime;
currentTimerNestedFlushDuration+=nestedFlushDuration;
currentTimerDebugID=debugID;
currentTimerType=timerType;
}

var lastMarkTimeStamp=0;
var canUsePerformanceMeasure=

typeof performance!=='undefined'&&
typeof performance.mark==='function'&&
typeof performance.clearMarks==='function'&&
typeof performance.measure==='function'&&
typeof performance.clearMeasures==='function';

function shouldMark(debugID){
if(!_isProfiling||!canUsePerformanceMeasure){
return false;
}
var element=ReactComponentTreeHook.getElement(debugID);
if(element==null||typeof element!=='object'){
return false;
}
var isHostElement=typeof element.type==='string';
if(isHostElement){
return false;
}
return true;
}

function markBegin(debugID,markType){
if(!shouldMark(debugID)){
return;
}

var markName=debugID+'::'+markType;
lastMarkTimeStamp=performanceNow();
performance.mark(markName);
}

function markEnd(debugID,markType){
if(!shouldMark(debugID)){
return;
}

var markName=debugID+'::'+markType;
var displayName=ReactComponentTreeHook.getDisplayName(debugID)||'Unknown';







var timeStamp=performanceNow();
if(timeStamp-lastMarkTimeStamp>0.1){
var measurementName=displayName+' ['+markType+']';
performance.measure(measurementName,markName);
}

performance.clearMarks(markName);
performance.clearMeasures(measurementName);
}

var ReactDebugTool={
addHook:function addHook(hook){
hooks.push(hook);
},
removeHook:function removeHook(hook){
for(var i=0;i<hooks.length;i++){
if(hooks[i]===hook){
hooks.splice(i,1);
i--;
}
}
},
isProfiling:function isProfiling(){
return _isProfiling;
},
beginProfiling:function beginProfiling(){
if(_isProfiling){
return;
}

_isProfiling=true;
flushHistory.length=0;
resetMeasurements();
ReactDebugTool.addHook(ReactHostOperationHistoryHook);
},
endProfiling:function endProfiling(){
if(!_isProfiling){
return;
}

_isProfiling=false;
resetMeasurements();
ReactDebugTool.removeHook(ReactHostOperationHistoryHook);
},
getFlushHistory:function getFlushHistory(){
return flushHistory;
},
onBeginFlush:function onBeginFlush(){
currentFlushNesting++;
resetMeasurements();
pauseCurrentLifeCycleTimer();
emitEvent('onBeginFlush');
},
onEndFlush:function onEndFlush(){
resetMeasurements();
currentFlushNesting--;
resumeCurrentLifeCycleTimer();
emitEvent('onEndFlush');
},
onBeginLifeCycleTimer:function onBeginLifeCycleTimer(debugID,timerType){
checkDebugID(debugID);
emitEvent('onBeginLifeCycleTimer',debugID,timerType);
markBegin(debugID,timerType);
beginLifeCycleTimer(debugID,timerType);
},
onEndLifeCycleTimer:function onEndLifeCycleTimer(debugID,timerType){
checkDebugID(debugID);
endLifeCycleTimer(debugID,timerType);
markEnd(debugID,timerType);
emitEvent('onEndLifeCycleTimer',debugID,timerType);
},
onBeginProcessingChildContext:function onBeginProcessingChildContext(){
emitEvent('onBeginProcessingChildContext');
},
onEndProcessingChildContext:function onEndProcessingChildContext(){
emitEvent('onEndProcessingChildContext');
},
onHostOperation:function onHostOperation(operation){
checkDebugID(operation.instanceID);
emitEvent('onHostOperation',operation);
},
onSetState:function onSetState(){
emitEvent('onSetState');
},
onSetChildren:function onSetChildren(debugID,childDebugIDs){
checkDebugID(debugID);
childDebugIDs.forEach(checkDebugID);
emitEvent('onSetChildren',debugID,childDebugIDs);
},
onBeforeMountComponent:function onBeforeMountComponent(debugID,element,parentDebugID){
checkDebugID(debugID);
checkDebugID(parentDebugID,true);
emitEvent('onBeforeMountComponent',debugID,element,parentDebugID);
markBegin(debugID,'mount');
},
onMountComponent:function onMountComponent(debugID){
checkDebugID(debugID);
markEnd(debugID,'mount');
emitEvent('onMountComponent',debugID);
},
onBeforeUpdateComponent:function onBeforeUpdateComponent(debugID,element){
checkDebugID(debugID);
emitEvent('onBeforeUpdateComponent',debugID,element);
markBegin(debugID,'update');
},
onUpdateComponent:function onUpdateComponent(debugID){
checkDebugID(debugID);
markEnd(debugID,'update');
emitEvent('onUpdateComponent',debugID);
},
onBeforeUnmountComponent:function onBeforeUnmountComponent(debugID){
checkDebugID(debugID);
emitEvent('onBeforeUnmountComponent',debugID);
markBegin(debugID,'unmount');
},
onUnmountComponent:function onUnmountComponent(debugID){
checkDebugID(debugID);
markEnd(debugID,'unmount');
emitEvent('onUnmountComponent',debugID);
},
onTestEvent:function onTestEvent(){
emitEvent('onTestEvent');
}};



ReactDebugTool.addDevtool=ReactDebugTool.addHook;
ReactDebugTool.removeDevtool=ReactDebugTool.removeHook;

ReactDebugTool.addHook(ReactInvalidSetStateWarningHook);
ReactDebugTool.addHook(ReactComponentTreeHook);
var url=ExecutionEnvironment.canUseDOM&&window.location.href||'';
if(/[?&]react_perf\b/.test(url)){
ReactDebugTool.beginProfiling();
}

module.exports=ReactDebugTool;
}, 39, null, "ReactDebugTool");
__d(/* ReactInvalidSetStateWarningHook */function(global, require, module, exports) {











'use strict';

var warning=require(15 /* fbjs/lib/warning */);

if(__DEV__){
var processingChildContext=false;

var warnInvalidSetState=function warnInvalidSetState(){
warning(
!processingChildContext,
'setState(...): Cannot call setState() inside getChildContext()');

};
}

var ReactInvalidSetStateWarningHook={
onBeginProcessingChildContext:function onBeginProcessingChildContext(){
processingChildContext=true;
},
onEndProcessingChildContext:function onEndProcessingChildContext(){
processingChildContext=false;
},
onSetState:function onSetState(){
warnInvalidSetState();
}};


module.exports=ReactInvalidSetStateWarningHook;
}, 40, null, "ReactInvalidSetStateWarningHook");
__d(/* ReactHostOperationHistoryHook */function(global, require, module, exports) {











'use strict';















var history=[];

var ReactHostOperationHistoryHook={
onHostOperation:function onHostOperation(operation){
history.push(operation);
},

clearHistory:function clearHistory(){
if(ReactHostOperationHistoryHook._preventClearing){

return;
}

history=[];
},

getHistory:function getHistory(){
return history;
}};


module.exports=ReactHostOperationHistoryHook;
}, 41, null, "ReactHostOperationHistoryHook");
__d(/* fbjs/lib/ExecutionEnvironment.js */function(global, require, module, exports) {









'use strict';

var canUseDOM=!!(typeof window!=='undefined'&&window.document&&window.document.createElement);







var ExecutionEnvironment={

canUseDOM:canUseDOM,

canUseWorkers:typeof Worker!=='undefined',

canUseEventListeners:canUseDOM&&!!(window.addEventListener||window.attachEvent),

canUseViewport:canUseDOM&&!!window.screen,

isInWorker:!canUseDOM};



module.exports=ExecutionEnvironment;
}, 42, null, "fbjs/lib/ExecutionEnvironment.js");
__d(/* fbjs/lib/performanceNow.js */function(global, require, module, exports) {'use strict';












var performance=require(44 /* ./performance */);

var performanceNow;






if(performance.now){
performanceNow=function performanceNow(){
return performance.now();
};
}else{
performanceNow=function performanceNow(){
return Date.now();
};
}

module.exports=performanceNow;
}, 43, null, "fbjs/lib/performanceNow.js");
__d(/* fbjs/lib/performance.js */function(global, require, module, exports) {










'use strict';

var ExecutionEnvironment=require(42 /* ./ExecutionEnvironment */);

var performance;

if(ExecutionEnvironment.canUseDOM){
performance=window.performance||window.msPerformance||window.webkitPerformance;
}

module.exports=performance||{};
}, 44, null, "fbjs/lib/performance.js");
__d(/* JSTimers */function(global, require, module, exports) {










'use strict';



var RCTTiming=require(29 /* NativeModules */).Timing;
var JSTimersExecution=require(33 /* JSTimersExecution */);

var parseErrorStack=require(46 /* parseErrorStack */);




function _getFreeIndex(){
var freeIndex=JSTimersExecution.timerIDs.indexOf(null);
if(freeIndex===-1){
freeIndex=JSTimersExecution.timerIDs.length;
}
return freeIndex;
}

function _allocateCallback(func,type){
var id=JSTimersExecution.GUID++;
var freeIndex=_getFreeIndex();
JSTimersExecution.timerIDs[freeIndex]=id;
JSTimersExecution.callbacks[freeIndex]=func;
JSTimersExecution.types[freeIndex]=type;
if(__DEV__){
var e=new Error();
e.framesToPop=1;
var stack=parseErrorStack(e);
if(stack){


JSTimersExecution.identifiers[freeIndex]=stack.shift();
}
}
return id;
}

function _freeCallback(timerID){


if(timerID==null){
return;
}

var index=JSTimersExecution.timerIDs.indexOf(timerID);

if(index!==-1){
JSTimersExecution._clearIndex(index);
var type=JSTimersExecution.types[index];
if(type!=='setImmediate'&&type!=='requestIdleCallback'){
RCTTiming.deleteTimer(timerID);
}
}
}






var JSTimers={




setTimeout:function setTimeout(func,duration){for(var _len=arguments.length,args=Array(_len>2?_len-2:0),_key=2;_key<_len;_key++){args[_key-2]=arguments[_key];}
var id=_allocateCallback(function(){return func.apply(undefined,args);},'setTimeout');
RCTTiming.createTimer(id,duration||0,Date.now(),false);
return id;
},





setInterval:function setInterval(func,duration){for(var _len2=arguments.length,args=Array(_len2>2?_len2-2:0),_key2=2;_key2<_len2;_key2++){args[_key2-2]=arguments[_key2];}
var id=_allocateCallback(function(){return func.apply(undefined,args);},'setInterval');
RCTTiming.createTimer(id,duration||0,Date.now(),true);
return id;
},





setImmediate:function setImmediate(func){for(var _len3=arguments.length,args=Array(_len3>1?_len3-1:0),_key3=1;_key3<_len3;_key3++){args[_key3-1]=arguments[_key3];}
var id=_allocateCallback(function(){return func.apply(undefined,args);},'setImmediate');
JSTimersExecution.immediates.push(id);
return id;
},




requestAnimationFrame:function requestAnimationFrame(func){
var id=_allocateCallback(func,'requestAnimationFrame');
RCTTiming.createTimer(id,1,Date.now(),false);
return id;
},





requestIdleCallback:function requestIdleCallback(func){
if(JSTimersExecution.requestIdleCallbacks.length===0){
RCTTiming.setSendIdleEvents(true);
}

var id=_allocateCallback(func,'requestIdleCallback');
JSTimersExecution.requestIdleCallbacks.push(id);
return id;
},

cancelIdleCallback:function cancelIdleCallback(timerID){
_freeCallback(timerID);
var index=JSTimersExecution.requestIdleCallbacks.indexOf(timerID);
if(index!==-1){
JSTimersExecution.requestIdleCallbacks.splice(index,1);
}

if(JSTimersExecution.requestIdleCallbacks.length===0){
RCTTiming.setSendIdleEvents(false);
}
},

clearTimeout:function clearTimeout(timerID){
_freeCallback(timerID);
},

clearInterval:function clearInterval(timerID){
_freeCallback(timerID);
},

clearImmediate:function clearImmediate(timerID){
_freeCallback(timerID);
var index=JSTimersExecution.immediates.indexOf(timerID);
if(index!==-1){
JSTimersExecution.immediates.splice(index,1);
}
},

cancelAnimationFrame:function cancelAnimationFrame(timerID){
_freeCallback(timerID);
}};


module.exports=JSTimers;
}, 45, null, "JSTimers");
__d(/* parseErrorStack */function(global, require, module, exports) {










'use strict';







var stacktraceParser=require(47 /* stacktrace-parser */);

function parseErrorStack(e){
if(!e||!e.stack){
return[];
}

var stack=Array.isArray(e.stack)?e.stack:stacktraceParser.parse(e.stack);

var framesToPop=typeof e.framesToPop==='number'?e.framesToPop:0;
while(framesToPop--){
stack.shift();
}

return stack;
}

module.exports=parseErrorStack;
}, 46, null, "parseErrorStack");
__d(/* stacktrace-parser/index.js */function(global, require, module, exports) {module.exports=require(48 /* ./lib/stacktrace-parser.js */);
}, 47, null, "stacktrace-parser/index.js");
__d(/* stacktrace-parser/lib/stacktrace-parser.js */function(global, require, module, exports) {

var UNKNOWN_FUNCTION='<unknown>';

var StackTraceParser={




parse:function parse(stackString){
var chrome=/^\s*at (?:(?:(?:Anonymous function)?|((?:\[object object\])?\S+(?: \[as \S+\])?)) )?\(?((?:file|http|https):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
gecko=/^(?:\s*([^@]*)(?:\((.*?)\))?@)?(\S.*?):(\d+)(?::(\d+))?\s*$/i,
node=/^\s*at (?:((?:\[object object\])?\S+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i,
lines=stackString.split('\n'),
stack=[],
parts,
element;

for(var i=0,j=lines.length;i<j;++i){
if(parts=gecko.exec(lines[i])){
element={
'file':parts[3],
'methodName':parts[1]||UNKNOWN_FUNCTION,
'lineNumber':+parts[4],
'column':parts[5]?+parts[5]:null};

}else if(parts=chrome.exec(lines[i])){
element={
'file':parts[2],
'methodName':parts[1]||UNKNOWN_FUNCTION,
'lineNumber':+parts[3],
'column':parts[4]?+parts[4]:null};

}else if(parts=node.exec(lines[i])){
element={
'file':parts[2],
'methodName':parts[1]||UNKNOWN_FUNCTION,
'lineNumber':+parts[3],
'column':parts[4]?+parts[4]:null};

}else{
continue;
}

stack.push(element);
}

return stack;
}};



module.exports=StackTraceParser;
}, 48, null, "stacktrace-parser/lib/stacktrace-parser.js");
__d(/* deepFreezeAndThrowOnMutationInDev */function(global, require, module, exports) {











'use strict';


















function deepFreezeAndThrowOnMutationInDev(object){
if(__DEV__){
if(typeof object!=='object'||
object===null||
Object.isFrozen(object)||
Object.isSealed(object)){
return;
}

for(var key in object){
if(object.hasOwnProperty(key)){
object.__defineGetter__(key,identity.bind(null,object[key]));
object.__defineSetter__(key,throwOnImmutableMutation.bind(null,key));
}
}

Object.freeze(object);
Object.seal(object);

for(var key in object){
if(object.hasOwnProperty(key)){
deepFreezeAndThrowOnMutationInDev(object[key]);
}
}
}
}

function throwOnImmutableMutation(key,value){
throw Error(
'You attempted to set the key `'+key+'` with the value `'+
JSON.stringify(value)+'` on an object that is meant to be immutable '+
'and has been frozen.');

}

function identity(value){
return value;
}

module.exports=deepFreezeAndThrowOnMutationInDev;
}, 49, null, "deepFreezeAndThrowOnMutationInDev");
__d(/* stringifySafe */function(global, require, module, exports) {










'use strict';





function stringifySafe(arg){
var ret;
var type=typeof arg;
if(arg===undefined){
ret='undefined';
}else if(arg===null){
ret='null';
}else if(type==='string'){
ret='"'+arg+'"';
}else if(type==='function'){
try{
ret=arg.toString();
}catch(e){
ret='[function unknown]';
}
}else{


try{
ret=JSON.stringify(arg);
}catch(e){
if(typeof arg.toString==='function'){
try{
ret=arg.toString();
}catch(E){}
}
}
}
return ret||'["'+type+'" failed to stringify]';
}

module.exports=stringifySafe;
}, 50, null, "stringifySafe");
__d(/* HeapCapture */function(global, require, module, exports) {










'use strict';

var HeapCapture={
captureHeap:function captureHeap(path){
var error=null;
try{
global.nativeCaptureHeap(path);
console.log('HeapCapture.captureHeap succeeded: '+path);
}catch(e){
console.log('HeapCapture.captureHeap error: '+e.toString());
error=e.toString();
}
require(29 /* NativeModules */).JSCHeapCapture.captureComplete(path,error);
}};


module.exports=HeapCapture;
}, 51, null, "HeapCapture");
__d(/* SamplingProfiler */function(global, require, module, exports) {










'use strict';

var SamplingProfiler={
poke:function poke(token){
var error=null;
var result=null;
try{
result=global.pokeSamplingProfiler();
if(result===null){
console.log('The JSC Sampling Profiler has started');
}else{
console.log('The JSC Sampling Profiler has stopped');
}
}catch(e){
console.log(
'Error occured when restarting Sampling Profiler: '+e.toString());
error=e.toString();
}
require(29 /* NativeModules */).JSCSamplingProfiler.operationComplete(
token,result,error);
}};


module.exports=SamplingProfiler;
}, 52, null, "SamplingProfiler");
__d(/* HMRClient */function(global, require, module, exports) {










'use strict';

var Platform=require(28 /* Platform */);
var invariant=require(26 /* fbjs/lib/invariant */);





var HMRClient={
enable:function enable(platform,bundleEntry,host,port){
invariant(platform,'Missing required parameter `platform`');
invariant(bundleEntry,'Missing required paramenter `bundleEntry`');
invariant(host,'Missing required paramenter `host`');




var WebSocket=require(54 /* WebSocket */);

var wsHostPort=port!==null&&port!==''?
host+':'+port:
host;


var wsUrl='ws://'+wsHostPort+'/hot?'+('platform='+
platform+'&')+('bundleEntry='+
bundleEntry.replace('.bundle','.js'));

var activeWS=new WebSocket(wsUrl);
activeWS.onerror=function(e){
var error='Hot loading isn\'t working because it cannot connect to the development server.\n\nTry the following to fix the issue:\n- Ensure that the packager server is running and available on the same network';






if(Platform.OS==='ios'){
error+='\n- Ensure that the Packager server URL is correctly set in AppDelegate';



}else{
error+='\n- Ensure that your device/emulator is connected to your machine and has USB debugging enabled - run \'adb devices\' to see a list of connected devices\n- If you\'re on a physical device connected to the same machine, run \'adb reverse tcp:8081 tcp:8081\' to forward requests from your device\n- If your device is on the same Wi-Fi network, set \'Debug server host & port for device\' in \'Dev settings\' to your machine\'s IP address and the port of the local dev server - e.g. 10.0.1.1:8081';





}

error+='\n\nURL: '+


host+':'+port+'\n\nError: '+

e.message;


throw new Error(error);
};
activeWS.onmessage=function(_ref){var data=_ref.data;

var HMRLoadingView=require(72 /* HMRLoadingView */);

data=JSON.parse(data);

switch(data.type){
case'update-start':{
HMRLoadingView.showMessage('Hot Loading...');
break;
}
case'update':{var _ret=function(){var _data$body=





data.body,modules=_data$body.modules,sourceMappingURLs=_data$body.sourceMappingURLs,sourceURLs=_data$body.sourceURLs,inverseDependencies=_data$body.inverseDependencies;

if(Platform.OS==='ios'){
var RCTRedBox=require(29 /* NativeModules */).RedBox;
RCTRedBox&&RCTRedBox.dismiss&&RCTRedBox.dismiss();
}else{
var RCTExceptionsManager=require(29 /* NativeModules */).ExceptionsManager;
RCTExceptionsManager&&RCTExceptionsManager.dismissRedbox&&RCTExceptionsManager.dismissRedbox();
}

modules.forEach(function(_ref2,i){var id=_ref2.id,code=_ref2.code;
code=code+'\n\n'+sourceMappingURLs[i];




var injectFunction=typeof global.nativeInjectHMRUpdate==='function'?
global.nativeInjectHMRUpdate:
eval;

code=[
'__accept(',
id+',',
'function(global,require,module,exports){',''+
code,
'\n},',''+
JSON.stringify(inverseDependencies),
');'].
join('');

injectFunction(code,sourceURLs[i]);
});

HMRLoadingView.hide();
return'break';}();if(_ret==='break')break;
}
case'update-done':{
HMRLoadingView.hide();
break;
}
case'error':{
HMRLoadingView.hide();
throw new Error(data.body.type+' '+data.body.description);
}
default:{
throw new Error('Unexpected message: '+data);
}}

};
}};


module.exports=HMRClient;
}, 53, null, "HMRClient");
__d(/* WebSocket */function(global, require, module, exports) {










'use strict';

var NativeEventEmitter=require(55 /* NativeEventEmitter */);
var Platform=require(28 /* Platform */);
var RCTWebSocketModule=require(29 /* NativeModules */).WebSocketModule;
var WebSocketEvent=require(66 /* WebSocketEvent */);

var EventTarget=require(67 /* event-target-shim */);
var base64=require(71 /* base64-js */);















var CONNECTING=0;
var OPEN=1;
var CLOSING=2;
var CLOSED=3;

var CLOSE_NORMAL=1000;

var WEBSOCKET_EVENTS=[
'close',
'error',
'message',
'open'];


var nextWebSocketId=0;var







WebSocket=function(_EventTarget){babelHelpers.inherits(WebSocket,_EventTarget);


























function WebSocket(url,protocols,options){babelHelpers.classCallCheck(this,WebSocket);var _this=babelHelpers.possibleConstructorReturn(this,(WebSocket.__proto__||Object.getPrototypeOf(WebSocket)).call(this));_this.CONNECTING=CONNECTING;_this.OPEN=OPEN;_this.CLOSING=CLOSING;_this.CLOSED=CLOSED;_this.readyState=CONNECTING;

if(typeof protocols==='string'){
protocols=[protocols];
}

if(!Array.isArray(protocols)){
protocols=null;
}

_this._eventEmitter=new NativeEventEmitter(RCTWebSocketModule);
_this._socketId=nextWebSocketId++;
RCTWebSocketModule.connect(url,protocols,options,_this._socketId);
_this._registerEvents();return _this;
}babelHelpers.createClass(WebSocket,[{key:'close',value:function close(

code,reason){
if(this.readyState===this.CLOSING||
this.readyState===this.CLOSED){
return;
}

this.readyState=this.CLOSING;
this._close(code,reason);
}},{key:'send',value:function send(

data){
if(this.readyState===this.CONNECTING){
throw new Error('INVALID_STATE_ERR');
}

if(typeof data==='string'){
RCTWebSocketModule.send(data,this._socketId);
return;
}


if(ArrayBuffer.isView(data)){

data=data.buffer;
}
if(data instanceof ArrayBuffer){
data=base64.fromByteArray(new Uint8Array(data));
RCTWebSocketModule.sendBinary(data,this._socketId);
return;
}

throw new Error('Unsupported data type');
}},{key:'ping',value:function ping()

{
if(this.readyState===this.CONNECTING){
throw new Error('INVALID_STATE_ERR');
}

RCTWebSocketModule.ping(this._socketId);
}},{key:'_close',value:function _close(

code,reason){
if(Platform.OS==='android'){

var statusCode=typeof code==='number'?code:CLOSE_NORMAL;
var closeReason=typeof reason==='string'?reason:'';
RCTWebSocketModule.close(statusCode,closeReason,this._socketId);
}else{
RCTWebSocketModule.close(this._socketId);
}
}},{key:'_unregisterEvents',value:function _unregisterEvents()

{
this._subscriptions.forEach(function(e){return e.remove();});
this._subscriptions=[];
}},{key:'_registerEvents',value:function _registerEvents()

{var _this2=this;
this._subscriptions=[
this._eventEmitter.addListener('websocketMessage',function(ev){
if(ev.id!==_this2._socketId){
return;
}
_this2.dispatchEvent(new WebSocketEvent('message',{
data:ev.type==='binary'?base64.toByteArray(ev.data).buffer:ev.data}));

}),
this._eventEmitter.addListener('websocketOpen',function(ev){
if(ev.id!==_this2._socketId){
return;
}
_this2.readyState=_this2.OPEN;
_this2.dispatchEvent(new WebSocketEvent('open'));
}),
this._eventEmitter.addListener('websocketClosed',function(ev){
if(ev.id!==_this2._socketId){
return;
}
_this2.readyState=_this2.CLOSED;
_this2.dispatchEvent(new WebSocketEvent('close',{
code:ev.code,
reason:ev.reason}));

_this2._unregisterEvents();
_this2.close();
}),
this._eventEmitter.addListener('websocketFailed',function(ev){
if(ev.id!==_this2._socketId){
return;
}
_this2.readyState=_this2.CLOSED;
_this2.dispatchEvent(new WebSocketEvent('error',{
message:ev.message}));

_this2.dispatchEvent(new WebSocketEvent('close',{
message:ev.message}));

_this2._unregisterEvents();
_this2.close();
})];

}}]);return WebSocket;}(EventTarget.apply(undefined,WEBSOCKET_EVENTS));WebSocket.CONNECTING=CONNECTING;WebSocket.OPEN=OPEN;WebSocket.CLOSING=CLOSING;WebSocket.CLOSED=CLOSED;


module.exports=WebSocket;
}, 54, null, "WebSocket");
__d(/* NativeEventEmitter */function(global, require, module, exports) {










'use strict';

var EventEmitter=require(56 /* EventEmitter */);
var Platform=require(28 /* Platform */);
var RCTDeviceEventEmitter=require(60 /* RCTDeviceEventEmitter */);
var invariant=require(26 /* fbjs/lib/invariant */);var







NativeEventEmitter=function(_EventEmitter){babelHelpers.inherits(NativeEventEmitter,_EventEmitter);



function NativeEventEmitter(nativeModule){babelHelpers.classCallCheck(this,NativeEventEmitter);var _this=babelHelpers.possibleConstructorReturn(this,(NativeEventEmitter.__proto__||Object.getPrototypeOf(NativeEventEmitter)).call(this,
RCTDeviceEventEmitter.sharedSubscriber));
if(Platform.OS==='ios'){
invariant(nativeModule,'Native module cannot be null.');
_this._nativeModule=nativeModule;
}return _this;
}babelHelpers.createClass(NativeEventEmitter,[{key:'addListener',value:function addListener(

eventType,listener,context){
if(Platform.OS==='ios'){
this._nativeModule.addListener(eventType);
}
return babelHelpers.get(NativeEventEmitter.prototype.__proto__||Object.getPrototypeOf(NativeEventEmitter.prototype),'addListener',this).call(this,eventType,listener,context);
}},{key:'removeAllListeners',value:function removeAllListeners(

eventType){
invariant(eventType,'eventType argument is required.');
if(Platform.OS==='ios'){
var count=this.listeners(eventType).length;
this._nativeModule.removeListeners(count);
}
babelHelpers.get(NativeEventEmitter.prototype.__proto__||Object.getPrototypeOf(NativeEventEmitter.prototype),'removeAllListeners',this).call(this,eventType);
}},{key:'removeSubscription',value:function removeSubscription(

subscription){
if(Platform.OS==='ios'){
this._nativeModule.removeListeners(1);
}
babelHelpers.get(NativeEventEmitter.prototype.__proto__||Object.getPrototypeOf(NativeEventEmitter.prototype),'removeSubscription',this).call(this,subscription);
}}]);return NativeEventEmitter;}(EventEmitter);


module.exports=NativeEventEmitter;
}, 55, null, "NativeEventEmitter");
__d(/* EventEmitter */function(global, require, module, exports) {











'use strict';

var EmitterSubscription=require(57 /* EmitterSubscription */);
var EventSubscriptionVendor=require(59 /* EventSubscriptionVendor */);

var emptyFunction=require(16 /* fbjs/lib/emptyFunction */);
var invariant=require(26 /* fbjs/lib/invariant */);var














EventEmitter=function(){










function EventEmitter(subscriber){babelHelpers.classCallCheck(this,EventEmitter);
this._subscriber=subscriber||new EventSubscriptionVendor();
}babelHelpers.createClass(EventEmitter,[{key:'addListener',value:function addListener(
















eventType,listener,context){

return this._subscriber.addSubscription(
eventType,
new EmitterSubscription(this,this._subscriber,listener,context));

}},{key:'once',value:function once(











eventType,listener,context){var _this=this;
return this.addListener(eventType,function(){for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}
_this.removeCurrentListener();
listener.apply(context,args);
});
}},{key:'removeAllListeners',value:function removeAllListeners(








eventType){
this._subscriber.removeAllSubscriptions(eventType);
}},{key:'removeCurrentListener',value:function removeCurrentListener()






















{
invariant(
!!this._currentSubscription,
'Not in an emitting cycle; there is no current subscription');

this.removeSubscription(this._currentSubscription);
}},{key:'removeSubscription',value:function removeSubscription(





subscription){
invariant(
subscription.emitter===this,
'Subscription does not belong to this emitter.');

this._subscriber.removeSubscription(subscription);
}},{key:'listeners',value:function listeners(








eventType){
var subscriptions=this._subscriber.getSubscriptionsForType(eventType);
return subscriptions?
subscriptions.filter(emptyFunction.thatReturnsTrue).map(
function(subscription){
return subscription.listener;
}):
[];
}},{key:'emit',value:function emit(















eventType){
var subscriptions=this._subscriber.getSubscriptionsForType(eventType);
if(subscriptions){
for(var i=0,l=subscriptions.length;i<l;i++){
var subscription=subscriptions[i];


if(subscription){
this._currentSubscription=subscription;
subscription.listener.apply(
subscription.context,
Array.prototype.slice.call(arguments,1));

}
}
this._currentSubscription=null;
}
}},{key:'removeListener',value:function removeListener(














eventType,listener){
var subscriptions=this._subscriber.getSubscriptionsForType(eventType);
if(subscriptions){
for(var i=0,l=subscriptions.length;i<l;i++){
var subscription=subscriptions[i];



if(subscription&&subscription.listener===listener){
subscription.remove();
}
}
}
}}]);return EventEmitter;}();


module.exports=EventEmitter;
}, 56, null, "EventEmitter");
__d(/* EmitterSubscription */function(global, require, module, exports) {










'use strict';

var EventSubscription=require(58 /* EventSubscription */);var







EmitterSubscription=function(_EventSubscription){babelHelpers.inherits(EmitterSubscription,_EventSubscription);















function EmitterSubscription(
emitter,
subscriber,
listener,
context)
{babelHelpers.classCallCheck(this,EmitterSubscription);var _this=babelHelpers.possibleConstructorReturn(this,(EmitterSubscription.__proto__||Object.getPrototypeOf(EmitterSubscription)).call(this,
subscriber));
_this.emitter=emitter;
_this.listener=listener;
_this.context=context;return _this;
}babelHelpers.createClass(EmitterSubscription,[{key:'remove',value:function remove()







{
this.emitter.removeSubscription(this);
}}]);return EmitterSubscription;}(EventSubscription);


module.exports=EmitterSubscription;
}, 57, null, "EmitterSubscription");
__d(/* EventSubscription */function(global, require, module, exports) {










'use strict';var







EventSubscription=function(){









function EventSubscription(subscriber){babelHelpers.classCallCheck(this,EventSubscription);
this.subscriber=subscriber;
}babelHelpers.createClass(EventSubscription,[{key:'remove',value:function remove()




{
this.subscriber.removeSubscription(this);
}}]);return EventSubscription;}();


module.exports=EventSubscription;
}, 58, null, "EventSubscription");
__d(/* EventSubscriptionVendor */function(global, require, module, exports) {










'use strict';

var invariant=require(26 /* fbjs/lib/invariant */);var







EventSubscriptionVendor=function(){




function EventSubscriptionVendor(){babelHelpers.classCallCheck(this,EventSubscriptionVendor);
this._subscriptionsForType={};
this._currentSubscription=null;
}babelHelpers.createClass(EventSubscriptionVendor,[{key:'addSubscription',value:function addSubscription(








eventType,subscription){
invariant(
subscription.subscriber===this,
'The subscriber of the subscription is incorrectly set.');
if(!this._subscriptionsForType[eventType]){
this._subscriptionsForType[eventType]=[];
}
var key=this._subscriptionsForType[eventType].length;
this._subscriptionsForType[eventType].push(subscription);
subscription.eventType=eventType;
subscription.key=key;
return subscription;
}},{key:'removeAllSubscriptions',value:function removeAllSubscriptions(







eventType){
if(eventType===undefined){
this._subscriptionsForType={};
}else{
delete this._subscriptionsForType[eventType];
}
}},{key:'removeSubscription',value:function removeSubscription(







subscription){
var eventType=subscription.eventType;
var key=subscription.key;

var subscriptionsForType=this._subscriptionsForType[eventType];
if(subscriptionsForType){
delete subscriptionsForType[key];
}
}},{key:'getSubscriptionsForType',value:function getSubscriptionsForType(













eventType){
return this._subscriptionsForType[eventType];
}}]);return EventSubscriptionVendor;}();


module.exports=EventSubscriptionVendor;
}, 59, null, "EventSubscriptionVendor");
__d(/* RCTDeviceEventEmitter */function(global, require, module, exports) {










'use strict';

var EventEmitter=require(56 /* EventEmitter */);
var EventSubscriptionVendor=require(59 /* EventSubscriptionVendor */);
var BatchedBridge=require(30 /* BatchedBridge */);var







RCTDeviceEventEmitter=function(_EventEmitter){babelHelpers.inherits(RCTDeviceEventEmitter,_EventEmitter);



function RCTDeviceEventEmitter(){babelHelpers.classCallCheck(this,RCTDeviceEventEmitter);
var sharedSubscriber=new EventSubscriptionVendor();var _this=babelHelpers.possibleConstructorReturn(this,(RCTDeviceEventEmitter.__proto__||Object.getPrototypeOf(RCTDeviceEventEmitter)).call(this,
sharedSubscriber));
_this.sharedSubscriber=sharedSubscriber;return _this;
}babelHelpers.createClass(RCTDeviceEventEmitter,[{key:'_nativeEventModule',value:function _nativeEventModule(

eventType){
if(eventType){
if(eventType.lastIndexOf('statusBar',0)===0){
console.warn('`%s` event should be registered via the StatusBarIOS module',eventType);
return require(61 /* StatusBarIOS */);
}
if(eventType.lastIndexOf('keyboard',0)===0){
console.warn('`%s` event should be registered via the Keyboard module',eventType);
return require(62 /* Keyboard */);
}
if(eventType==='appStateDidChange'||eventType==='memoryWarning'){
console.warn('`%s` event should be registered via the AppState module',eventType);
return require(64 /* AppState */);
}
}
return null;
}},{key:'addListener',value:function addListener(

eventType,listener,context){
var eventModule=this._nativeEventModule(eventType);
return eventModule?eventModule.addListener(eventType,listener,context):babelHelpers.get(RCTDeviceEventEmitter.prototype.__proto__||Object.getPrototypeOf(RCTDeviceEventEmitter.prototype),'addListener',this).call(this,
eventType,listener,context);
}},{key:'removeAllListeners',value:function removeAllListeners(

eventType){
var eventModule=this._nativeEventModule(eventType);
eventModule&&eventType?eventModule.removeAllListeners(eventType):babelHelpers.get(RCTDeviceEventEmitter.prototype.__proto__||Object.getPrototypeOf(RCTDeviceEventEmitter.prototype),'removeAllListeners',this).call(this,
eventType);
}},{key:'removeSubscription',value:function removeSubscription(

subscription){
if(subscription.emitter!==this){
subscription.emitter.removeSubscription(subscription);
}else{
babelHelpers.get(RCTDeviceEventEmitter.prototype.__proto__||Object.getPrototypeOf(RCTDeviceEventEmitter.prototype),'removeSubscription',this).call(this,subscription);
}
}}]);return RCTDeviceEventEmitter;}(EventEmitter);


RCTDeviceEventEmitter=new RCTDeviceEventEmitter();

BatchedBridge.registerCallableModule(
'RCTDeviceEventEmitter',
RCTDeviceEventEmitter);


module.exports=RCTDeviceEventEmitter;
}, 60, null, "RCTDeviceEventEmitter");
__d(/* StatusBarIOS */function(global, require, module, exports) {










'use strict';

var NativeEventEmitter=require(55 /* NativeEventEmitter */);var _require=
require(29 /* NativeModules */),StatusBarManager=_require.StatusBarManager;var




StatusBarIOS=function(_NativeEventEmitter){babelHelpers.inherits(StatusBarIOS,_NativeEventEmitter);function StatusBarIOS(){babelHelpers.classCallCheck(this,StatusBarIOS);return babelHelpers.possibleConstructorReturn(this,(StatusBarIOS.__proto__||Object.getPrototypeOf(StatusBarIOS)).apply(this,arguments));}return StatusBarIOS;}(NativeEventEmitter);

module.exports=new StatusBarIOS(StatusBarManager);
}, 61, null, "StatusBarIOS");
__d(/* Keyboard */function(global, require, module, exports) {










'use strict';

var invariant=require(26 /* fbjs/lib/invariant */);
var NativeEventEmitter=require(55 /* NativeEventEmitter */);
var KeyboardObserver=require(29 /* NativeModules */).KeyboardObserver;
var dismissKeyboard=require(63 /* dismissKeyboard */);
var KeyboardEventEmitter=new NativeEventEmitter(KeyboardObserver);


































































var Keyboard={


















addListener:function addListener(eventName,callback){
invariant(false,'Dummy method used for documentation');
},







removeListener:function removeListener(eventName,callback){
invariant(false,'Dummy method used for documentation');
},






removeAllListeners:function removeAllListeners(eventName){
invariant(false,'Dummy method used for documentation');
},




dismiss:function dismiss(){
invariant(false,'Dummy method used for documentation');
}};



Keyboard=KeyboardEventEmitter;
Keyboard.dismiss=dismissKeyboard;

module.exports=Keyboard;
}, 62, null, "Keyboard");
__d(/* dismissKeyboard */function(global, require, module, exports) {






'use strict';

var TextInputState=require(27 /* TextInputState */);

function dismissKeyboard(){
TextInputState.blurTextInput(TextInputState.currentlyFocusedField());
}

module.exports=dismissKeyboard;
}, 63, null, "dismissKeyboard");
__d(/* AppState */function(global, require, module, exports) {










'use strict';

var NativeEventEmitter=require(55 /* NativeEventEmitter */);
var NativeModules=require(29 /* NativeModules */);
var RCTAppState=NativeModules.AppState;

var logError=require(65 /* logError */);
var invariant=require(26 /* fbjs/lib/invariant */);var





















































AppState=function(_NativeEventEmitter){babelHelpers.inherits(AppState,_NativeEventEmitter);




function AppState(){babelHelpers.classCallCheck(this,AppState);var _this=babelHelpers.possibleConstructorReturn(this,(AppState.__proto__||Object.getPrototypeOf(AppState)).call(this,
RCTAppState));

_this._eventHandlers={
change:new Map(),
memoryWarning:new Map()};




_this.currentState=RCTAppState.initialAppState||'active';





_this.addListener(
'appStateDidChange',
function(appStateData){
_this.currentState=appStateData.app_state;
});





RCTAppState.getCurrentAppState(
function(appStateData){
_this.currentState=appStateData.app_state;
},
logError);return _this;

}babelHelpers.createClass(AppState,[{key:'addEventListener',value:function addEventListener(












type,
handler)
{
invariant(
['change','memoryWarning'].indexOf(type)!==-1,
'Trying to subscribe to unknown event: "%s"',type);

if(type==='change'){
this._eventHandlers[type].set(handler,this.addListener(
'appStateDidChange',
function(appStateData){
handler(appStateData.app_state);
}));

}else if(type==='memoryWarning'){
this._eventHandlers[type].set(handler,this.addListener(
'memoryWarning',
handler));

}
}},{key:'removeEventListener',value:function removeEventListener(





type,
handler)
{
invariant(
['change','memoryWarning'].indexOf(type)!==-1,
'Trying to remove listener for unknown event: "%s"',type);

if(!this._eventHandlers[type].has(handler)){
return;
}
this._eventHandlers[type].get(handler).remove();
this._eventHandlers[type].delete(handler);
}}]);return AppState;}(NativeEventEmitter);


AppState=new AppState();

module.exports=AppState;
}, 64, null, "AppState");
__d(/* logError */function(global, require, module, exports) {










'use strict';






var logError=function logError(){
if(arguments.length===1&&arguments[0]instanceof Error){
var err=arguments[0];
console.error('Error: "'+err.message+'".  Stack:\n'+err.stack);
}else{
console.error.apply(console,arguments);
}
};

module.exports=logError;
}, 65, null, "logError");
__d(/* WebSocketEvent */function(global, require, module, exports) {










'use strict';var









WebSocketEvent=
function WebSocketEvent(type,eventInitDict){babelHelpers.classCallCheck(this,WebSocketEvent);
this.type=type.toString();
babelHelpers.extends(this,eventInitDict);
};


module.exports=WebSocketEvent;
}, 66, null, "WebSocketEvent");
__d(/* event-target-shim/lib/event-target.js */function(global, require, module, exports) {





"use strict";





var Commons=require(68 /* ./commons */);
var CustomEventTarget=require(69 /* ./custom-event-target */);
var EventWrapper=require(70 /* ./event-wrapper */);
var LISTENERS=Commons.LISTENERS;
var CAPTURE=Commons.CAPTURE;
var BUBBLE=Commons.BUBBLE;
var ATTRIBUTE=Commons.ATTRIBUTE;
var newNode=Commons.newNode;
var defineCustomEventTarget=CustomEventTarget.defineCustomEventTarget;
var createEventWrapper=EventWrapper.createEventWrapper;
var STOP_IMMEDIATE_PROPAGATION_FLAG=
EventWrapper.STOP_IMMEDIATE_PROPAGATION_FLAG;











var HAS_EVENTTARGET_INTERFACE=
typeof window!=="undefined"&&
typeof window.EventTarget!=="undefined";












var EventTarget=module.exports=function EventTarget(){
if(this instanceof EventTarget){









Object.defineProperty(this,LISTENERS,{value:Object.create(null)});
}else
if(arguments.length===1&&Array.isArray(arguments[0])){
return defineCustomEventTarget(EventTarget,arguments[0]);
}else
if(arguments.length>0){
var types=Array(arguments.length);
for(var i=0;i<arguments.length;++i){
types[i]=arguments[i];
}






return defineCustomEventTarget(EventTarget,types);
}else
{
throw new TypeError("Cannot call a class as a function");
}
};

EventTarget.prototype=Object.create(
(HAS_EVENTTARGET_INTERFACE?window.EventTarget:Object).prototype,
{
constructor:{
value:EventTarget,
writable:true,
configurable:true},


addEventListener:{
value:function addEventListener(type,listener,capture){
if(listener==null){
return false;
}
if(typeof listener!=="function"&&typeof listener!=="object"){
throw new TypeError("\"listener\" is not an object.");
}

var kind=capture?CAPTURE:BUBBLE;
var node=this[LISTENERS][type];
if(node==null){
this[LISTENERS][type]=newNode(listener,kind);
return true;
}

var prev=null;
while(node!=null){
if(node.listener===listener&&node.kind===kind){

return false;
}
prev=node;
node=node.next;
}

prev.next=newNode(listener,kind);
return true;
},
configurable:true,
writable:true},


removeEventListener:{
value:function removeEventListener(type,listener,capture){
if(listener==null){
return false;
}

var kind=capture?CAPTURE:BUBBLE;
var prev=null;
var node=this[LISTENERS][type];
while(node!=null){
if(node.listener===listener&&node.kind===kind){
if(prev==null){
this[LISTENERS][type]=node.next;
}else
{
prev.next=node.next;
}
return true;
}

prev=node;
node=node.next;
}

return false;
},
configurable:true,
writable:true},


dispatchEvent:{
value:function dispatchEvent(event){

var node=this[LISTENERS][event.type];
if(node==null){
return true;
}


var wrapped=createEventWrapper(event,this);



while(node!=null){
if(typeof node.listener==="function"){
node.listener.call(this,wrapped);
}else
if(node.kind!==ATTRIBUTE&&typeof node.listener.handleEvent==="function"){
node.listener.handleEvent(wrapped);
}

if(wrapped[STOP_IMMEDIATE_PROPAGATION_FLAG]){
break;
}
node=node.next;
}

return!wrapped.defaultPrevented;
},
configurable:true,
writable:true}});
}, 67, null, "event-target-shim/lib/event-target.js");
__d(/* event-target-shim/lib/commons.js */function(global, require, module, exports) {





"use strict";








var createUniqueKey=exports.createUniqueKey=typeof Symbol!=="undefined"?
Symbol:
function createUniqueKey(name){
return"[["+name+"_"+Math.random().toFixed(8).slice(2)+"]]";
};







exports.LISTENERS=createUniqueKey("listeners");







exports.CAPTURE=1;







exports.BUBBLE=2;







exports.ATTRIBUTE=3;
















exports.newNode=function newNode(listener,kind){
return{listener:listener,kind:kind,next:null};
};
}, 68, null, "event-target-shim/lib/commons.js");
__d(/* event-target-shim/lib/custom-event-target.js */function(global, require, module, exports) {





"use strict";





var Commons=require(68 /* ./commons */);
var LISTENERS=Commons.LISTENERS;
var ATTRIBUTE=Commons.ATTRIBUTE;
var newNode=Commons.newNode;












function getAttributeListener(eventTarget,type){
var node=eventTarget[LISTENERS][type];
while(node!=null){
if(node.kind===ATTRIBUTE){
return node.listener;
}
node=node.next;
}
return null;
}









function setAttributeListener(eventTarget,type,listener){
if(typeof listener!=="function"&&typeof listener!=="object"){
listener=null;
}

var prev=null;
var node=eventTarget[LISTENERS][type];
while(node!=null){
if(node.kind===ATTRIBUTE){

if(prev==null){
eventTarget[LISTENERS][type]=node.next;
}else
{
prev.next=node.next;
}
}else
{
prev=node;
}

node=node.next;
}


if(listener!=null){
if(prev==null){
eventTarget[LISTENERS][type]=newNode(listener,ATTRIBUTE);
}else
{
prev.next=newNode(listener,ATTRIBUTE);
}
}
}












exports.defineCustomEventTarget=function(EventTargetBase,types){
function EventTarget(){
EventTargetBase.call(this);
}

var descripter={
constructor:{
value:EventTarget,
configurable:true,
writable:true}};



types.forEach(function(type){
descripter["on"+type]={
get:function get(){return getAttributeListener(this,type);},
set:function set(listener){setAttributeListener(this,type,listener);},
configurable:true,
enumerable:true};

});

EventTarget.prototype=Object.create(EventTargetBase.prototype,descripter);

return EventTarget;
};
}, 69, null, "event-target-shim/lib/custom-event-target.js");
__d(/* event-target-shim/lib/event-wrapper.js */function(global, require, module, exports) {





"use strict";





var createUniqueKey=require(68 /* ./commons */).createUniqueKey;











var STOP_IMMEDIATE_PROPAGATION_FLAG=
createUniqueKey("stop_immediate_propagation_flag");







var CANCELED_FLAG=createUniqueKey("canceled_flag");







var ORIGINAL_EVENT=createUniqueKey("original_event");







var wrapperPrototypeDefinition=Object.freeze({
stopPropagation:Object.freeze({
value:function stopPropagation(){
var e=this[ORIGINAL_EVENT];
if(typeof e.stopPropagation==="function"){
e.stopPropagation();
}
},
writable:true,
configurable:true}),


stopImmediatePropagation:Object.freeze({
value:function stopImmediatePropagation(){
this[STOP_IMMEDIATE_PROPAGATION_FLAG]=true;

var e=this[ORIGINAL_EVENT];
if(typeof e.stopImmediatePropagation==="function"){
e.stopImmediatePropagation();
}
},
writable:true,
configurable:true}),


preventDefault:Object.freeze({
value:function preventDefault(){
if(this.cancelable===true){
this[CANCELED_FLAG]=true;
}

var e=this[ORIGINAL_EVENT];
if(typeof e.preventDefault==="function"){
e.preventDefault();
}
},
writable:true,
configurable:true}),


defaultPrevented:Object.freeze({
get:function defaultPrevented(){return this[CANCELED_FLAG];},
enumerable:true,
configurable:true})});







exports.STOP_IMMEDIATE_PROPAGATION_FLAG=STOP_IMMEDIATE_PROPAGATION_FLAG;












exports.createEventWrapper=function createEventWrapper(event,eventTarget){
var timeStamp=
typeof event.timeStamp==="number"?event.timeStamp:Date.now();

var propertyDefinition={
type:{value:event.type,enumerable:true},
target:{value:eventTarget,enumerable:true},
currentTarget:{value:eventTarget,enumerable:true},
eventPhase:{value:2,enumerable:true},
bubbles:{value:Boolean(event.bubbles),enumerable:true},
cancelable:{value:Boolean(event.cancelable),enumerable:true},
timeStamp:{value:timeStamp,enumerable:true},
isTrusted:{value:false,enumerable:true}};

propertyDefinition[STOP_IMMEDIATE_PROPAGATION_FLAG]={value:false,writable:true};
propertyDefinition[CANCELED_FLAG]={value:false,writable:true};
propertyDefinition[ORIGINAL_EVENT]={value:event};


if(typeof event.detail!=="undefined"){
propertyDefinition.detail={value:event.detail,enumerable:true};
}

return Object.create(
Object.create(event,wrapperPrototypeDefinition),
propertyDefinition);

};
}, 70, null, "event-target-shim/lib/event-wrapper.js");
__d(/* base64-js/index.js */function(global, require, module, exports) {'use strict';

exports.byteLength=byteLength;
exports.toByteArray=toByteArray;
exports.fromByteArray=fromByteArray;

var lookup=[];
var revLookup=[];
var Arr=typeof Uint8Array!=='undefined'?Uint8Array:Array;

var code='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
for(var i=0,len=code.length;i<len;++i){
lookup[i]=code[i];
revLookup[code.charCodeAt(i)]=i;
}

revLookup['-'.charCodeAt(0)]=62;
revLookup['_'.charCodeAt(0)]=63;

function placeHoldersCount(b64){
var len=b64.length;
if(len%4>0){
throw new Error('Invalid string. Length must be a multiple of 4');
}






return b64[len-2]==='='?2:b64[len-1]==='='?1:0;
}

function byteLength(b64){

return b64.length*3/4-placeHoldersCount(b64);
}

function toByteArray(b64){
var i,j,l,tmp,placeHolders,arr;
var len=b64.length;
placeHolders=placeHoldersCount(b64);

arr=new Arr(len*3/4-placeHolders);


l=placeHolders>0?len-4:len;

var L=0;

for(i=0,j=0;i<l;i+=4,j+=3){
tmp=revLookup[b64.charCodeAt(i)]<<18|revLookup[b64.charCodeAt(i+1)]<<12|revLookup[b64.charCodeAt(i+2)]<<6|revLookup[b64.charCodeAt(i+3)];
arr[L++]=tmp>>16&0xFF;
arr[L++]=tmp>>8&0xFF;
arr[L++]=tmp&0xFF;
}

if(placeHolders===2){
tmp=revLookup[b64.charCodeAt(i)]<<2|revLookup[b64.charCodeAt(i+1)]>>4;
arr[L++]=tmp&0xFF;
}else if(placeHolders===1){
tmp=revLookup[b64.charCodeAt(i)]<<10|revLookup[b64.charCodeAt(i+1)]<<4|revLookup[b64.charCodeAt(i+2)]>>2;
arr[L++]=tmp>>8&0xFF;
arr[L++]=tmp&0xFF;
}

return arr;
}

function tripletToBase64(num){
return lookup[num>>18&0x3F]+lookup[num>>12&0x3F]+lookup[num>>6&0x3F]+lookup[num&0x3F];
}

function encodeChunk(uint8,start,end){
var tmp;
var output=[];
for(var i=start;i<end;i+=3){
tmp=(uint8[i]<<16)+(uint8[i+1]<<8)+uint8[i+2];
output.push(tripletToBase64(tmp));
}
return output.join('');
}

function fromByteArray(uint8){
var tmp;
var len=uint8.length;
var extraBytes=len%3;
var output='';
var parts=[];
var maxChunkLength=16383;


for(var i=0,len2=len-extraBytes;i<len2;i+=maxChunkLength){
parts.push(encodeChunk(uint8,i,i+maxChunkLength>len2?len2:i+maxChunkLength));
}


if(extraBytes===1){
tmp=uint8[len-1];
output+=lookup[tmp>>2];
output+=lookup[tmp<<4&0x3F];
output+='==';
}else if(extraBytes===2){
tmp=(uint8[len-2]<<8)+uint8[len-1];
output+=lookup[tmp>>10];
output+=lookup[tmp>>4&0x3F];
output+=lookup[tmp<<2&0x3F];
output+='=';
}

parts.push(output);

return parts.join('');
}
}, 71, null, "base64-js/index.js");
__d(/* HMRLoadingView */function(global, require, module, exports) {











'use strict';

var processColor=require(73 /* processColor */);var _require=
require(29 /* NativeModules */),DevLoadingView=_require.DevLoadingView;var

HMRLoadingView=function(){function HMRLoadingView(){babelHelpers.classCallCheck(this,HMRLoadingView);}babelHelpers.createClass(HMRLoadingView,null,[{key:'showMessage',value:function showMessage(
message){
DevLoadingView.showMessage(
message,
processColor('#000000'),
processColor('#aaaaaa'));

}},{key:'hide',value:function hide()

{
DevLoadingView.hide();
}}]);return HMRLoadingView;}();


module.exports=HMRLoadingView;
}, 72, null, "HMRLoadingView");
__d(/* processColor */function(global, require, module, exports) {









'use strict';

var Platform=require(28 /* Platform */);

var normalizeColor=require(20 /* normalizeColor */);


function processColor(color){
if(color===undefined||color===null){
return color;
}

var int32Color=normalizeColor(color);
if(int32Color===null){
return undefined;
}


int32Color=(int32Color<<24|int32Color>>>8)>>>0;

if(Platform.OS==='android'){




int32Color=int32Color|0x0;
}
return int32Color;
}

module.exports=processColor;
}, 73, null, "processColor");
__d(/* defineLazyObjectProperty */function(global, require, module, exports) {











'use strict';




function defineLazyObjectProperty(
object,
name,
descriptor)




{var
get=descriptor.get;
var enumerable=descriptor.enumerable!==false;
var writable=descriptor.writable!==false;

var value=void 0;
var valueSet=false;
function getValue(){



if(!valueSet){
setValue(get());
}
return value;
}
function setValue(newValue){
value=newValue;
valueSet=true;
Object.defineProperty(object,name,{
value:newValue,
configurable:true,
enumerable:enumerable,
writable:writable});

}

Object.defineProperty(object,name,{
get:getValue,
set:setValue,
configurable:true,
enumerable:enumerable});

}

module.exports=defineLazyObjectProperty;
}, 74, null, "defineLazyObjectProperty");
__d(/* UIManager */function(global, require, module, exports) {










'use strict';

var NativeModules=require(29 /* NativeModules */);
var Platform=require(28 /* Platform */);

var defineLazyObjectProperty=require(74 /* defineLazyObjectProperty */);
var findNodeHandle=require(76 /* findNodeHandle */);
var invariant=require(26 /* fbjs/lib/invariant */);var



UIManager=NativeModules.UIManager;

invariant(UIManager,'UIManager is undefined. The native module config is probably incorrect.');

var _takeSnapshot=UIManager.takeSnapshot;


















UIManager.takeSnapshot=function _callee(
view,
options){return regeneratorRuntime.async(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:if(






_takeSnapshot){_context.next=3;break;}
console.warn('UIManager.takeSnapshot is not available on this platform');return _context.abrupt('return');case 3:


if(typeof view!=='number'&&view!=='window'){
view=findNodeHandle(view)||'window';
}return _context.abrupt('return',
_takeSnapshot(view,options));case 5:case'end':return _context.stop();}}},null,this);};







if(Platform.OS==='ios'){
Object.keys(UIManager).forEach(function(viewName){
var viewConfig=UIManager[viewName];
if(viewConfig.Manager){
defineLazyObjectProperty(viewConfig,'Constants',{
get:function get(){
var viewManager=NativeModules[viewConfig.Manager];
var constants={};
viewManager&&Object.keys(viewManager).forEach(function(key){
var value=viewManager[key];
if(typeof value!=='function'){
constants[key]=value;
}
});
return constants;
}});

defineLazyObjectProperty(viewConfig,'Commands',{
get:function get(){
var viewManager=NativeModules[viewConfig.Manager];
var commands={};
var index=0;
viewManager&&Object.keys(viewManager).forEach(function(key){
var value=viewManager[key];
if(typeof value==='function'){
commands[key]=index++;
}
});
return commands;
}});

}
});
}else if(Platform.OS==='android'&&UIManager.AndroidLazyViewManagersEnabled){

}

module.exports=UIManager;
}, 75, null, "UIManager");
__d(/* findNodeHandle */function(global, require, module, exports) {










'use strict';

var ReactCurrentOwner=require(38 /* react/lib/ReactCurrentOwner */);
var ReactInstanceMap=require(77 /* ReactInstanceMap */);

var invariant=require(26 /* fbjs/lib/invariant */);
var warning=require(15 /* fbjs/lib/warning */);































function findNodeHandle(componentOrHandle){
if(__DEV__){
var owner=ReactCurrentOwner.current;
if(owner!==null){
warning(
owner._warnedAboutRefsInRender,
'%s is accessing findNodeHandle inside its render(). '+
'render() should be a pure function of props and state. It should '+
'never access something that requires stale data from the previous '+
'render, such as refs. Move this logic to componentDidMount and '+
'componentDidUpdate instead.',
owner.getName()||'A component');

owner._warnedAboutRefsInRender=true;
}
}
if(componentOrHandle==null){
return null;
}
if(typeof componentOrHandle==='number'){

return componentOrHandle;
}

var component=componentOrHandle;



var internalInstance=ReactInstanceMap.get(component);
if(internalInstance){
return internalInstance.getHostNode();
}else{
var rootNodeID=component._rootNodeID;
if(rootNodeID){
return rootNodeID;
}else{
invariant(


typeof component==='object'&&
'_rootNodeID'in component||


component.render!=null&&
typeof component.render==='function',

'findNodeHandle(...): Argument is not a component '+
'(type: %s, keys: %s)',
typeof component,
Object.keys(component));

invariant(
false,
'findNodeHandle(...): Unable to find node handle for unmounted '+
'component.');

}
}
}

module.exports=findNodeHandle;
}, 76, null, "findNodeHandle");
__d(/* ReactInstanceMap */function(global, require, module, exports) {










'use strict';









var ReactInstanceMap={






remove:function remove(key){
key._reactInternalInstance=undefined;
},

get:function get(key){
return key._reactInternalInstance;
},

has:function has(key){
return key._reactInternalInstance!==undefined;
},

set:function set(key,value){
key._reactInternalInstance=value;
}};



module.exports=ReactInstanceMap;
}, 77, null, "ReactInstanceMap");
__d(/* React */function(global, require, module, exports) {










'use strict';

module.exports=require(79 /* react/lib/React */);
}, 78, null, "React");
__d(/* react/lib/React.js */function(global, require, module, exports) {









'use strict';

var _assign=require(80 /* object-assign */);

var ReactChildren=require(81 /* ./ReactChildren */);
var ReactComponent=require(89 /* ./ReactComponent */);
var ReactPureComponent=require(92 /* ./ReactPureComponent */);
var ReactClass=require(93 /* ./ReactClass */);
var ReactDOMFactories=require(94 /* ./ReactDOMFactories */);
var ReactElement=require(83 /* ./ReactElement */);
var ReactPropTypes=require(98 /* ./ReactPropTypes */);
var ReactVersion=require(99 /* ./ReactVersion */);

var onlyChild=require(100 /* ./onlyChild */);
var warning=require(15 /* fbjs/lib/warning */);

var createElement=ReactElement.createElement;
var createFactory=ReactElement.createFactory;
var cloneElement=ReactElement.cloneElement;

if(process.env.NODE_ENV!=='production'){
var ReactElementValidator=require(95 /* ./ReactElementValidator */);
createElement=ReactElementValidator.createElement;
createFactory=ReactElementValidator.createFactory;
cloneElement=ReactElementValidator.cloneElement;
}

var __spread=_assign;

if(process.env.NODE_ENV!=='production'){
var warned=false;
__spread=function __spread(){
process.env.NODE_ENV!=='production'?warning(warned,'React.__spread is deprecated and should not be used. Use '+'Object.assign directly or another helper function with similar '+'semantics. You may be seeing this warning due to your compiler. '+'See https://fb.me/react-spread-deprecation for more details.'):void 0;
warned=true;
return _assign.apply(null,arguments);
};
}

var React={



Children:{
map:ReactChildren.map,
forEach:ReactChildren.forEach,
count:ReactChildren.count,
toArray:ReactChildren.toArray,
only:onlyChild},


Component:ReactComponent,
PureComponent:ReactPureComponent,

createElement:createElement,
cloneElement:cloneElement,
isValidElement:ReactElement.isValidElement,



PropTypes:ReactPropTypes,
createClass:ReactClass.createClass,
createFactory:createFactory,
createMixin:function createMixin(mixin){

return mixin;
},



DOM:ReactDOMFactories,

version:ReactVersion,


__spread:__spread};


module.exports=React;
}, 79, null, "react/lib/React.js");
__d(/* object-assign/index.js */function(global, require, module, exports) {/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';

var getOwnPropertySymbols=Object.getOwnPropertySymbols;
var hasOwnProperty=Object.prototype.hasOwnProperty;
var propIsEnumerable=Object.prototype.propertyIsEnumerable;

function toObject(val){
if(val===null||val===undefined){
throw new TypeError('Object.assign cannot be called with null or undefined');
}

return Object(val);
}

function shouldUseNative(){
try{
if(!Object.assign){
return false;
}




var test1=new String('abc');
test1[5]='de';
if(Object.getOwnPropertyNames(test1)[0]==='5'){
return false;
}


var test2={};
for(var i=0;i<10;i++){
test2['_'+String.fromCharCode(i)]=i;
}
var order2=Object.getOwnPropertyNames(test2).map(function(n){
return test2[n];
});
if(order2.join('')!=='0123456789'){
return false;
}


var test3={};
'abcdefghijklmnopqrst'.split('').forEach(function(letter){
test3[letter]=letter;
});
if(Object.keys(babelHelpers.extends({},test3)).join('')!==
'abcdefghijklmnopqrst'){
return false;
}

return true;
}catch(err){

return false;
}
}

module.exports=shouldUseNative()?Object.assign:function(target,source){
var from;
var to=toObject(target);
var symbols;

for(var s=1;s<arguments.length;s++){
from=Object(arguments[s]);

for(var key in from){
if(hasOwnProperty.call(from,key)){
to[key]=from[key];
}
}

if(getOwnPropertySymbols){
symbols=getOwnPropertySymbols(from);
for(var i=0;i<symbols.length;i++){
if(propIsEnumerable.call(from,symbols[i])){
to[symbols[i]]=from[symbols[i]];
}
}
}
}

return to;
};
}, 80, null, "object-assign/index.js");
__d(/* react/lib/ReactChildren.js */function(global, require, module, exports) {









'use strict';

var PooledClass=require(82 /* ./PooledClass */);
var ReactElement=require(83 /* ./ReactElement */);

var emptyFunction=require(16 /* fbjs/lib/emptyFunction */);
var traverseAllChildren=require(86 /* ./traverseAllChildren */);

var twoArgumentPooler=PooledClass.twoArgumentPooler;
var fourArgumentPooler=PooledClass.fourArgumentPooler;

var userProvidedKeyEscapeRegex=/\/+/g;
function escapeUserProvidedKey(text){
return(''+text).replace(userProvidedKeyEscapeRegex,'$&/');
}









function ForEachBookKeeping(forEachFunction,forEachContext){
this.func=forEachFunction;
this.context=forEachContext;
this.count=0;
}
ForEachBookKeeping.prototype.destructor=function(){
this.func=null;
this.context=null;
this.count=0;
};
PooledClass.addPoolingTo(ForEachBookKeeping,twoArgumentPooler);

function forEachSingleChild(bookKeeping,child,name){
var func=bookKeeping.func,
context=bookKeeping.context;

func.call(context,child,bookKeeping.count++);
}













function forEachChildren(children,forEachFunc,forEachContext){
if(children==null){
return children;
}
var traverseContext=ForEachBookKeeping.getPooled(forEachFunc,forEachContext);
traverseAllChildren(children,forEachSingleChild,traverseContext);
ForEachBookKeeping.release(traverseContext);
}










function MapBookKeeping(mapResult,keyPrefix,mapFunction,mapContext){
this.result=mapResult;
this.keyPrefix=keyPrefix;
this.func=mapFunction;
this.context=mapContext;
this.count=0;
}
MapBookKeeping.prototype.destructor=function(){
this.result=null;
this.keyPrefix=null;
this.func=null;
this.context=null;
this.count=0;
};
PooledClass.addPoolingTo(MapBookKeeping,fourArgumentPooler);

function mapSingleChildIntoContext(bookKeeping,child,childKey){
var result=bookKeeping.result,
keyPrefix=bookKeeping.keyPrefix,
func=bookKeeping.func,
context=bookKeeping.context;


var mappedChild=func.call(context,child,bookKeeping.count++);
if(Array.isArray(mappedChild)){
mapIntoWithKeyPrefixInternal(mappedChild,result,childKey,emptyFunction.thatReturnsArgument);
}else if(mappedChild!=null){
if(ReactElement.isValidElement(mappedChild)){
mappedChild=ReactElement.cloneAndReplaceKey(mappedChild,


keyPrefix+(mappedChild.key&&(!child||child.key!==mappedChild.key)?escapeUserProvidedKey(mappedChild.key)+'/':'')+childKey);
}
result.push(mappedChild);
}
}

function mapIntoWithKeyPrefixInternal(children,array,prefix,func,context){
var escapedPrefix='';
if(prefix!=null){
escapedPrefix=escapeUserProvidedKey(prefix)+'/';
}
var traverseContext=MapBookKeeping.getPooled(array,escapedPrefix,func,context);
traverseAllChildren(children,mapSingleChildIntoContext,traverseContext);
MapBookKeeping.release(traverseContext);
}














function mapChildren(children,func,context){
if(children==null){
return children;
}
var result=[];
mapIntoWithKeyPrefixInternal(children,result,null,func,context);
return result;
}

function forEachSingleChildDummy(traverseContext,child,name){
return null;
}










function countChildren(children,context){
return traverseAllChildren(children,forEachSingleChildDummy,null);
}







function toArray(children){
var result=[];
mapIntoWithKeyPrefixInternal(children,result,null,emptyFunction.thatReturnsArgument);
return result;
}

var ReactChildren={
forEach:forEachChildren,
map:mapChildren,
mapIntoWithKeyPrefixInternal:mapIntoWithKeyPrefixInternal,
count:countChildren,
toArray:toArray};


module.exports=ReactChildren;
}, 81, null, "react/lib/ReactChildren.js");
__d(/* react/lib/PooledClass.js */function(global, require, module, exports) {










'use strict';

var _prodInvariant=require(37 /* ./reactProdInvariant */);

var invariant=require(26 /* fbjs/lib/invariant */);








var oneArgumentPooler=function oneArgumentPooler(copyFieldsFrom){
var Klass=this;
if(Klass.instancePool.length){
var instance=Klass.instancePool.pop();
Klass.call(instance,copyFieldsFrom);
return instance;
}else{
return new Klass(copyFieldsFrom);
}
};

var twoArgumentPooler=function twoArgumentPooler(a1,a2){
var Klass=this;
if(Klass.instancePool.length){
var instance=Klass.instancePool.pop();
Klass.call(instance,a1,a2);
return instance;
}else{
return new Klass(a1,a2);
}
};

var threeArgumentPooler=function threeArgumentPooler(a1,a2,a3){
var Klass=this;
if(Klass.instancePool.length){
var instance=Klass.instancePool.pop();
Klass.call(instance,a1,a2,a3);
return instance;
}else{
return new Klass(a1,a2,a3);
}
};

var fourArgumentPooler=function fourArgumentPooler(a1,a2,a3,a4){
var Klass=this;
if(Klass.instancePool.length){
var instance=Klass.instancePool.pop();
Klass.call(instance,a1,a2,a3,a4);
return instance;
}else{
return new Klass(a1,a2,a3,a4);
}
};

var standardReleaser=function standardReleaser(instance){
var Klass=this;
!(instance instanceof Klass)?process.env.NODE_ENV!=='production'?invariant(false,'Trying to release an instance into a pool of a different type.'):_prodInvariant('25'):void 0;
instance.destructor();
if(Klass.instancePool.length<Klass.poolSize){
Klass.instancePool.push(instance);
}
};

var DEFAULT_POOL_SIZE=10;
var DEFAULT_POOLER=oneArgumentPooler;










var addPoolingTo=function addPoolingTo(CopyConstructor,pooler){


var NewKlass=CopyConstructor;
NewKlass.instancePool=[];
NewKlass.getPooled=pooler||DEFAULT_POOLER;
if(!NewKlass.poolSize){
NewKlass.poolSize=DEFAULT_POOL_SIZE;
}
NewKlass.release=standardReleaser;
return NewKlass;
};

var PooledClass={
addPoolingTo:addPoolingTo,
oneArgumentPooler:oneArgumentPooler,
twoArgumentPooler:twoArgumentPooler,
threeArgumentPooler:threeArgumentPooler,
fourArgumentPooler:fourArgumentPooler};


module.exports=PooledClass;
}, 82, null, "react/lib/PooledClass.js");
__d(/* react/lib/ReactElement.js */function(global, require, module, exports) {









'use strict';

var _assign=require(80 /* object-assign */);

var ReactCurrentOwner=require(38 /* ./ReactCurrentOwner */);

var warning=require(15 /* fbjs/lib/warning */);
var canDefineProperty=require(84 /* ./canDefineProperty */);
var hasOwnProperty=Object.prototype.hasOwnProperty;

var REACT_ELEMENT_TYPE=require(85 /* ./ReactElementSymbol */);

var RESERVED_PROPS={
key:true,
ref:true,
__self:true,
__source:true};


var specialPropKeyWarningShown,specialPropRefWarningShown;

function hasValidRef(config){
if(process.env.NODE_ENV!=='production'){
if(hasOwnProperty.call(config,'ref')){
var getter=Object.getOwnPropertyDescriptor(config,'ref').get;
if(getter&&getter.isReactWarning){
return false;
}
}
}
return config.ref!==undefined;
}

function hasValidKey(config){
if(process.env.NODE_ENV!=='production'){
if(hasOwnProperty.call(config,'key')){
var getter=Object.getOwnPropertyDescriptor(config,'key').get;
if(getter&&getter.isReactWarning){
return false;
}
}
}
return config.key!==undefined;
}

function defineKeyPropWarningGetter(props,displayName){
var warnAboutAccessingKey=function warnAboutAccessingKey(){
if(!specialPropKeyWarningShown){
specialPropKeyWarningShown=true;
process.env.NODE_ENV!=='production'?warning(false,'%s: `key` is not a prop. Trying to access it will result '+'in `undefined` being returned. If you need to access the same '+'value within the child component, you should pass it as a different '+'prop. (https://fb.me/react-special-props)',displayName):void 0;
}
};
warnAboutAccessingKey.isReactWarning=true;
Object.defineProperty(props,'key',{
get:warnAboutAccessingKey,
configurable:true});

}

function defineRefPropWarningGetter(props,displayName){
var warnAboutAccessingRef=function warnAboutAccessingRef(){
if(!specialPropRefWarningShown){
specialPropRefWarningShown=true;
process.env.NODE_ENV!=='production'?warning(false,'%s: `ref` is not a prop. Trying to access it will result '+'in `undefined` being returned. If you need to access the same '+'value within the child component, you should pass it as a different '+'prop. (https://fb.me/react-special-props)',displayName):void 0;
}
};
warnAboutAccessingRef.isReactWarning=true;
Object.defineProperty(props,'ref',{
get:warnAboutAccessingRef,
configurable:true});

}





















var ReactElement=function ReactElement(type,key,ref,self,source,owner,props){
var element={

$$typeof:REACT_ELEMENT_TYPE,


type:type,
key:key,
ref:ref,
props:props,


_owner:owner};


if(process.env.NODE_ENV!=='production'){




element._store={};





if(canDefineProperty){
Object.defineProperty(element._store,'validated',{
configurable:false,
enumerable:false,
writable:true,
value:false});


Object.defineProperty(element,'_self',{
configurable:false,
enumerable:false,
writable:false,
value:self});



Object.defineProperty(element,'_source',{
configurable:false,
enumerable:false,
writable:false,
value:source});

}else{
element._store.validated=false;
element._self=self;
element._source=source;
}
if(Object.freeze){
Object.freeze(element.props);
Object.freeze(element);
}
}

return element;
};





ReactElement.createElement=function(type,config,children){
var propName;


var props={};

var key=null;
var ref=null;
var self=null;
var source=null;

if(config!=null){
if(hasValidRef(config)){
ref=config.ref;
}
if(hasValidKey(config)){
key=''+config.key;
}

self=config.__self===undefined?null:config.__self;
source=config.__source===undefined?null:config.__source;

for(propName in config){
if(hasOwnProperty.call(config,propName)&&!RESERVED_PROPS.hasOwnProperty(propName)){
props[propName]=config[propName];
}
}
}



var childrenLength=arguments.length-2;
if(childrenLength===1){
props.children=children;
}else if(childrenLength>1){
var childArray=Array(childrenLength);
for(var i=0;i<childrenLength;i++){
childArray[i]=arguments[i+2];
}
if(process.env.NODE_ENV!=='production'){
if(Object.freeze){
Object.freeze(childArray);
}
}
props.children=childArray;
}


if(type&&type.defaultProps){
var defaultProps=type.defaultProps;
for(propName in defaultProps){
if(props[propName]===undefined){
props[propName]=defaultProps[propName];
}
}
}
if(process.env.NODE_ENV!=='production'){
if(key||ref){
if(typeof props.$$typeof==='undefined'||props.$$typeof!==REACT_ELEMENT_TYPE){
var displayName=typeof type==='function'?type.displayName||type.name||'Unknown':type;
if(key){
defineKeyPropWarningGetter(props,displayName);
}
if(ref){
defineRefPropWarningGetter(props,displayName);
}
}
}
}
return ReactElement(type,key,ref,self,source,ReactCurrentOwner.current,props);
};





ReactElement.createFactory=function(type){
var factory=ReactElement.createElement.bind(null,type);





factory.type=type;
return factory;
};

ReactElement.cloneAndReplaceKey=function(oldElement,newKey){
var newElement=ReactElement(oldElement.type,newKey,oldElement.ref,oldElement._self,oldElement._source,oldElement._owner,oldElement.props);

return newElement;
};





ReactElement.cloneElement=function(element,config,children){
var propName;


var props=_assign({},element.props);


var key=element.key;
var ref=element.ref;

var self=element._self;



var source=element._source;


var owner=element._owner;

if(config!=null){
if(hasValidRef(config)){

ref=config.ref;
owner=ReactCurrentOwner.current;
}
if(hasValidKey(config)){
key=''+config.key;
}


var defaultProps;
if(element.type&&element.type.defaultProps){
defaultProps=element.type.defaultProps;
}
for(propName in config){
if(hasOwnProperty.call(config,propName)&&!RESERVED_PROPS.hasOwnProperty(propName)){
if(config[propName]===undefined&&defaultProps!==undefined){

props[propName]=defaultProps[propName];
}else{
props[propName]=config[propName];
}
}
}
}



var childrenLength=arguments.length-2;
if(childrenLength===1){
props.children=children;
}else if(childrenLength>1){
var childArray=Array(childrenLength);
for(var i=0;i<childrenLength;i++){
childArray[i]=arguments[i+2];
}
props.children=childArray;
}

return ReactElement(element.type,key,ref,self,source,owner,props);
};








ReactElement.isValidElement=function(object){
return typeof object==='object'&&object!==null&&object.$$typeof===REACT_ELEMENT_TYPE;
};

module.exports=ReactElement;
}, 83, null, "react/lib/ReactElement.js");
__d(/* react/lib/canDefineProperty.js */function(global, require, module, exports) {










'use strict';

var canDefineProperty=false;
if(process.env.NODE_ENV!=='production'){
try{

Object.defineProperty({},'x',{get:function get(){}});
canDefineProperty=true;
}catch(x){

}
}

module.exports=canDefineProperty;
}, 84, null, "react/lib/canDefineProperty.js");
__d(/* react/lib/ReactElementSymbol.js */function(global, require, module, exports) {










'use strict';




var REACT_ELEMENT_TYPE=typeof Symbol==='function'&&Symbol['for']&&Symbol['for']('react.element')||0xeac7;

module.exports=REACT_ELEMENT_TYPE;
}, 85, null, "react/lib/ReactElementSymbol.js");
__d(/* react/lib/traverseAllChildren.js */function(global, require, module, exports) {









'use strict';

var _prodInvariant=require(37 /* ./reactProdInvariant */);

var ReactCurrentOwner=require(38 /* ./ReactCurrentOwner */);
var REACT_ELEMENT_TYPE=require(85 /* ./ReactElementSymbol */);

var getIteratorFn=require(87 /* ./getIteratorFn */);
var invariant=require(26 /* fbjs/lib/invariant */);
var KeyEscapeUtils=require(88 /* ./KeyEscapeUtils */);
var warning=require(15 /* fbjs/lib/warning */);

var SEPARATOR='.';
var SUBSEPARATOR=':';












var didWarnAboutMaps=false;








function getComponentKey(component,index){


if(component&&typeof component==='object'&&component.key!=null){

return KeyEscapeUtils.escape(component.key);
}

return index.toString(36);
}









function traverseAllChildrenImpl(children,nameSoFar,callback,traverseContext){
var type=typeof children;

if(type==='undefined'||type==='boolean'){

children=null;
}

if(children===null||type==='string'||type==='number'||


type==='object'&&children.$$typeof===REACT_ELEMENT_TYPE){
callback(traverseContext,children,


nameSoFar===''?SEPARATOR+getComponentKey(children,0):nameSoFar);
return 1;
}

var child;
var nextName;
var subtreeCount=0;
var nextNamePrefix=nameSoFar===''?SEPARATOR:nameSoFar+SUBSEPARATOR;

if(Array.isArray(children)){
for(var i=0;i<children.length;i++){
child=children[i];
nextName=nextNamePrefix+getComponentKey(child,i);
subtreeCount+=traverseAllChildrenImpl(child,nextName,callback,traverseContext);
}
}else{
var iteratorFn=getIteratorFn(children);
if(iteratorFn){
var iterator=iteratorFn.call(children);
var step;
if(iteratorFn!==children.entries){
var ii=0;
while(!(step=iterator.next()).done){
child=step.value;
nextName=nextNamePrefix+getComponentKey(child,ii++);
subtreeCount+=traverseAllChildrenImpl(child,nextName,callback,traverseContext);
}
}else{
if(process.env.NODE_ENV!=='production'){
var mapsAsChildrenAddendum='';
if(ReactCurrentOwner.current){
var mapsAsChildrenOwnerName=ReactCurrentOwner.current.getName();
if(mapsAsChildrenOwnerName){
mapsAsChildrenAddendum=' Check the render method of `'+mapsAsChildrenOwnerName+'`.';
}
}
process.env.NODE_ENV!=='production'?warning(didWarnAboutMaps,'Using Maps as children is not yet fully supported. It is an '+'experimental feature that might be removed. Convert it to a '+'sequence / iterable of keyed ReactElements instead.%s',mapsAsChildrenAddendum):void 0;
didWarnAboutMaps=true;
}

while(!(step=iterator.next()).done){
var entry=step.value;
if(entry){
child=entry[1];
nextName=nextNamePrefix+KeyEscapeUtils.escape(entry[0])+SUBSEPARATOR+getComponentKey(child,0);
subtreeCount+=traverseAllChildrenImpl(child,nextName,callback,traverseContext);
}
}
}
}else if(type==='object'){
var addendum='';
if(process.env.NODE_ENV!=='production'){
addendum=' If you meant to render a collection of children, use an array '+'instead or wrap the object using createFragment(object) from the '+'React add-ons.';
if(children._isReactElement){
addendum=' It looks like you\'re using an element created by a different '+'version of React. Make sure to use only one copy of React.';
}
if(ReactCurrentOwner.current){
var name=ReactCurrentOwner.current.getName();
if(name){
addendum+=' Check the render method of `'+name+'`.';
}
}
}
var childrenString=String(children);
!false?process.env.NODE_ENV!=='production'?invariant(false,'Objects are not valid as a React child (found: %s).%s',childrenString==='[object Object]'?'object with keys {'+Object.keys(children).join(', ')+'}':childrenString,addendum):_prodInvariant('31',childrenString==='[object Object]'?'object with keys {'+Object.keys(children).join(', ')+'}':childrenString,addendum):void 0;
}
}

return subtreeCount;
}

















function traverseAllChildren(children,callback,traverseContext){
if(children==null){
return 0;
}

return traverseAllChildrenImpl(children,'',callback,traverseContext);
}

module.exports=traverseAllChildren;
}, 86, null, "react/lib/traverseAllChildren.js");
__d(/* react/lib/getIteratorFn.js */function(global, require, module, exports) {










'use strict';



var ITERATOR_SYMBOL=typeof Symbol==='function'&&(typeof Symbol==='function'?Symbol.iterator:'@@iterator');
var FAUX_ITERATOR_SYMBOL='@@iterator';















function getIteratorFn(maybeIterable){
var iteratorFn=maybeIterable&&(ITERATOR_SYMBOL&&maybeIterable[ITERATOR_SYMBOL]||maybeIterable[FAUX_ITERATOR_SYMBOL]);
if(typeof iteratorFn==='function'){
return iteratorFn;
}
}

module.exports=getIteratorFn;
}, 87, null, "react/lib/getIteratorFn.js");
__d(/* react/lib/KeyEscapeUtils.js */function(global, require, module, exports) {










'use strict';








function escape(key){
var escapeRegex=/[=:]/g;
var escaperLookup={
'=':'=0',
':':'=2'};

var escapedString=(''+key).replace(escapeRegex,function(match){
return escaperLookup[match];
});

return'$'+escapedString;
}







function unescape(key){
var unescapeRegex=/(=0|=2)/g;
var unescaperLookup={
'=0':'=',
'=2':':'};

var keySubstring=key[0]==='.'&&key[1]==='$'?key.substring(2):key.substring(1);

return(''+keySubstring).replace(unescapeRegex,function(match){
return unescaperLookup[match];
});
}

var KeyEscapeUtils={
escape:escape,
unescape:unescape};


module.exports=KeyEscapeUtils;
}, 88, null, "react/lib/KeyEscapeUtils.js");
__d(/* react/lib/ReactComponent.js */function(global, require, module, exports) {









'use strict';

var _prodInvariant=require(37 /* ./reactProdInvariant */);

var ReactNoopUpdateQueue=require(90 /* ./ReactNoopUpdateQueue */);

var canDefineProperty=require(84 /* ./canDefineProperty */);
var emptyObject=require(91 /* fbjs/lib/emptyObject */);
var invariant=require(26 /* fbjs/lib/invariant */);
var warning=require(15 /* fbjs/lib/warning */);




function ReactComponent(props,context,updater){
this.props=props;
this.context=context;
this.refs=emptyObject;


this.updater=updater||ReactNoopUpdateQueue;
}

ReactComponent.prototype.isReactComponent={};


























ReactComponent.prototype.setState=function(partialState,callback){
!(typeof partialState==='object'||typeof partialState==='function'||partialState==null)?process.env.NODE_ENV!=='production'?invariant(false,'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'):_prodInvariant('85'):void 0;
this.updater.enqueueSetState(this,partialState);
if(callback){
this.updater.enqueueCallback(this,callback,'setState');
}
};















ReactComponent.prototype.forceUpdate=function(callback){
this.updater.enqueueForceUpdate(this);
if(callback){
this.updater.enqueueCallback(this,callback,'forceUpdate');
}
};






if(process.env.NODE_ENV!=='production'){
var deprecatedAPIs={
isMounted:['isMounted','Instead, make sure to clean up subscriptions and pending requests in '+'componentWillUnmount to prevent memory leaks.'],
replaceState:['replaceState','Refactor your code to use setState instead (see '+'https://github.com/facebook/react/issues/3236).']};

var defineDeprecationWarning=function defineDeprecationWarning(methodName,info){
if(canDefineProperty){
Object.defineProperty(ReactComponent.prototype,methodName,{
get:function get(){
process.env.NODE_ENV!=='production'?warning(false,'%s(...) is deprecated in plain JavaScript React classes. %s',info[0],info[1]):void 0;
return undefined;
}});

}
};
for(var fnName in deprecatedAPIs){
if(deprecatedAPIs.hasOwnProperty(fnName)){
defineDeprecationWarning(fnName,deprecatedAPIs[fnName]);
}
}
}

module.exports=ReactComponent;
}, 89, null, "react/lib/ReactComponent.js");
__d(/* react/lib/ReactNoopUpdateQueue.js */function(global, require, module, exports) {









'use strict';

var warning=require(15 /* fbjs/lib/warning */);

function warnNoop(publicInstance,callerName){
if(process.env.NODE_ENV!=='production'){
var constructor=publicInstance.constructor;
process.env.NODE_ENV!=='production'?warning(false,'%s(...): Can only update a mounted or mounting component. '+'This usually means you called %s() on an unmounted component. '+'This is a no-op. Please check the code for the %s component.',callerName,callerName,constructor&&(constructor.displayName||constructor.name)||'ReactClass'):void 0;
}
}




var ReactNoopUpdateQueue={








isMounted:function isMounted(publicInstance){
return false;
},









enqueueCallback:function enqueueCallback(publicInstance,callback){},














enqueueForceUpdate:function enqueueForceUpdate(publicInstance){
warnNoop(publicInstance,'forceUpdate');
},












enqueueReplaceState:function enqueueReplaceState(publicInstance,completeState){
warnNoop(publicInstance,'replaceState');
},











enqueueSetState:function enqueueSetState(publicInstance,partialState){
warnNoop(publicInstance,'setState');
}};


module.exports=ReactNoopUpdateQueue;
}, 90, null, "react/lib/ReactNoopUpdateQueue.js");
__d(/* fbjs/lib/emptyObject.js */function(global, require, module, exports) {









'use strict';

var emptyObject={};

if(process.env.NODE_ENV!=='production'){
Object.freeze(emptyObject);
}

module.exports=emptyObject;
}, 91, null, "fbjs/lib/emptyObject.js");
__d(/* react/lib/ReactPureComponent.js */function(global, require, module, exports) {









'use strict';

var _assign=require(80 /* object-assign */);

var ReactComponent=require(89 /* ./ReactComponent */);
var ReactNoopUpdateQueue=require(90 /* ./ReactNoopUpdateQueue */);

var emptyObject=require(91 /* fbjs/lib/emptyObject */);




function ReactPureComponent(props,context,updater){

this.props=props;
this.context=context;
this.refs=emptyObject;


this.updater=updater||ReactNoopUpdateQueue;
}

function ComponentDummy(){}
ComponentDummy.prototype=ReactComponent.prototype;
ReactPureComponent.prototype=new ComponentDummy();
ReactPureComponent.prototype.constructor=ReactPureComponent;

_assign(ReactPureComponent.prototype,ReactComponent.prototype);
ReactPureComponent.prototype.isPureReactComponent=true;

module.exports=ReactPureComponent;
}, 92, null, "react/lib/ReactPureComponent.js");
__d(/* react/lib/ReactClass.js */function(global, require, module, exports) {









'use strict';

var _prodInvariant=require(37 /* ./reactProdInvariant */),
_assign=require(80 /* object-assign */);

var ReactComponent=require(89 /* ./ReactComponent */);
var ReactElement=require(83 /* ./ReactElement */);
var ReactPropTypeLocationNames=require(19 /* ./ReactPropTypeLocationNames */);
var ReactNoopUpdateQueue=require(90 /* ./ReactNoopUpdateQueue */);

var emptyObject=require(91 /* fbjs/lib/emptyObject */);
var invariant=require(26 /* fbjs/lib/invariant */);
var warning=require(15 /* fbjs/lib/warning */);

var MIXINS_KEY='mixins';



function identity(fn){
return fn;
}






var injectedMixins=[];























var ReactClassInterface={







mixins:'DEFINE_MANY',








statics:'DEFINE_MANY',







propTypes:'DEFINE_MANY',







contextTypes:'DEFINE_MANY',







childContextTypes:'DEFINE_MANY',













getDefaultProps:'DEFINE_MANY_MERGED',















getInitialState:'DEFINE_MANY_MERGED',





getChildContext:'DEFINE_MANY_MERGED',

















render:'DEFINE_ONCE',










componentWillMount:'DEFINE_MANY',











componentDidMount:'DEFINE_MANY',




















componentWillReceiveProps:'DEFINE_MANY',





















shouldComponentUpdate:'DEFINE_ONCE',
















componentWillUpdate:'DEFINE_MANY',













componentDidUpdate:'DEFINE_MANY',












componentWillUnmount:'DEFINE_MANY',













updateComponent:'OVERRIDE_BASE'};












var RESERVED_SPEC_KEYS={
displayName:function displayName(Constructor,_displayName){
Constructor.displayName=_displayName;
},
mixins:function mixins(Constructor,_mixins){
if(_mixins){
for(var i=0;i<_mixins.length;i++){
mixSpecIntoComponent(Constructor,_mixins[i]);
}
}
},
childContextTypes:function childContextTypes(Constructor,_childContextTypes){
if(process.env.NODE_ENV!=='production'){
validateTypeDef(Constructor,_childContextTypes,'childContext');
}
Constructor.childContextTypes=_assign({},Constructor.childContextTypes,_childContextTypes);
},
contextTypes:function contextTypes(Constructor,_contextTypes){
if(process.env.NODE_ENV!=='production'){
validateTypeDef(Constructor,_contextTypes,'context');
}
Constructor.contextTypes=_assign({},Constructor.contextTypes,_contextTypes);
},




getDefaultProps:function getDefaultProps(Constructor,_getDefaultProps){
if(Constructor.getDefaultProps){
Constructor.getDefaultProps=createMergedResultFunction(Constructor.getDefaultProps,_getDefaultProps);
}else{
Constructor.getDefaultProps=_getDefaultProps;
}
},
propTypes:function propTypes(Constructor,_propTypes){
if(process.env.NODE_ENV!=='production'){
validateTypeDef(Constructor,_propTypes,'prop');
}
Constructor.propTypes=_assign({},Constructor.propTypes,_propTypes);
},
statics:function statics(Constructor,_statics){
mixStaticSpecIntoComponent(Constructor,_statics);
},
autobind:function autobind(){}};

function validateTypeDef(Constructor,typeDef,location){
for(var propName in typeDef){
if(typeDef.hasOwnProperty(propName)){


process.env.NODE_ENV!=='production'?warning(typeof typeDef[propName]==='function','%s: %s type `%s` is invalid; it must be a function, usually from '+'React.PropTypes.',Constructor.displayName||'ReactClass',ReactPropTypeLocationNames[location],propName):void 0;
}
}
}

function validateMethodOverride(isAlreadyDefined,name){
var specPolicy=ReactClassInterface.hasOwnProperty(name)?ReactClassInterface[name]:null;


if(ReactClassMixin.hasOwnProperty(name)){
!(specPolicy==='OVERRIDE_BASE')?process.env.NODE_ENV!=='production'?invariant(false,'ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.',name):_prodInvariant('73',name):void 0;
}


if(isAlreadyDefined){
!(specPolicy==='DEFINE_MANY'||specPolicy==='DEFINE_MANY_MERGED')?process.env.NODE_ENV!=='production'?invariant(false,'ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.',name):_prodInvariant('74',name):void 0;
}
}





function mixSpecIntoComponent(Constructor,spec){
if(!spec){
if(process.env.NODE_ENV!=='production'){
var typeofSpec=typeof spec;
var isMixinValid=typeofSpec==='object'&&spec!==null;

process.env.NODE_ENV!=='production'?warning(isMixinValid,'%s: You\'re attempting to include a mixin that is either null '+'or not an object. Check the mixins included by the component, '+'as well as any mixins they include themselves. '+'Expected object but got %s.',Constructor.displayName||'ReactClass',spec===null?null:typeofSpec):void 0;
}

return;
}

!(typeof spec!=='function')?process.env.NODE_ENV!=='production'?invariant(false,'ReactClass: You\'re attempting to use a component class or function as a mixin. Instead, just use a regular object.'):_prodInvariant('75'):void 0;
!!ReactElement.isValidElement(spec)?process.env.NODE_ENV!=='production'?invariant(false,'ReactClass: You\'re attempting to use a component as a mixin. Instead, just use a regular object.'):_prodInvariant('76'):void 0;

var proto=Constructor.prototype;
var autoBindPairs=proto.__reactAutoBindPairs;




if(spec.hasOwnProperty(MIXINS_KEY)){
RESERVED_SPEC_KEYS.mixins(Constructor,spec.mixins);
}

for(var name in spec){
if(!spec.hasOwnProperty(name)){
continue;
}

if(name===MIXINS_KEY){

continue;
}

var property=spec[name];
var isAlreadyDefined=proto.hasOwnProperty(name);
validateMethodOverride(isAlreadyDefined,name);

if(RESERVED_SPEC_KEYS.hasOwnProperty(name)){
RESERVED_SPEC_KEYS[name](Constructor,property);
}else{




var isReactClassMethod=ReactClassInterface.hasOwnProperty(name);
var isFunction=typeof property==='function';
var shouldAutoBind=isFunction&&!isReactClassMethod&&!isAlreadyDefined&&spec.autobind!==false;

if(shouldAutoBind){
autoBindPairs.push(name,property);
proto[name]=property;
}else{
if(isAlreadyDefined){
var specPolicy=ReactClassInterface[name];


!(isReactClassMethod&&(specPolicy==='DEFINE_MANY_MERGED'||specPolicy==='DEFINE_MANY'))?process.env.NODE_ENV!=='production'?invariant(false,'ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.',specPolicy,name):_prodInvariant('77',specPolicy,name):void 0;



if(specPolicy==='DEFINE_MANY_MERGED'){
proto[name]=createMergedResultFunction(proto[name],property);
}else if(specPolicy==='DEFINE_MANY'){
proto[name]=createChainedFunction(proto[name],property);
}
}else{
proto[name]=property;
if(process.env.NODE_ENV!=='production'){


if(typeof property==='function'&&spec.displayName){
proto[name].displayName=spec.displayName+'_'+name;
}
}
}
}
}
}
}

function mixStaticSpecIntoComponent(Constructor,statics){
if(!statics){
return;
}
for(var name in statics){
var property=statics[name];
if(!statics.hasOwnProperty(name)){
continue;
}

var isReserved=name in RESERVED_SPEC_KEYS;
!!isReserved?process.env.NODE_ENV!=='production'?invariant(false,'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.',name):_prodInvariant('78',name):void 0;

var isInherited=name in Constructor;
!!isInherited?process.env.NODE_ENV!=='production'?invariant(false,'ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.',name):_prodInvariant('79',name):void 0;
Constructor[name]=property;
}
}








function mergeIntoWithNoDuplicateKeys(one,two){
!(one&&two&&typeof one==='object'&&typeof two==='object')?process.env.NODE_ENV!=='production'?invariant(false,'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.'):_prodInvariant('80'):void 0;

for(var key in two){
if(two.hasOwnProperty(key)){
!(one[key]===undefined)?process.env.NODE_ENV!=='production'?invariant(false,'mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.',key):_prodInvariant('81',key):void 0;
one[key]=two[key];
}
}
return one;
}









function createMergedResultFunction(one,two){
return function mergedResult(){
var a=one.apply(this,arguments);
var b=two.apply(this,arguments);
if(a==null){
return b;
}else if(b==null){
return a;
}
var c={};
mergeIntoWithNoDuplicateKeys(c,a);
mergeIntoWithNoDuplicateKeys(c,b);
return c;
};
}









function createChainedFunction(one,two){
return function chainedFunction(){
one.apply(this,arguments);
two.apply(this,arguments);
};
}








function bindAutoBindMethod(component,method){
var boundMethod=method.bind(component);
if(process.env.NODE_ENV!=='production'){
boundMethod.__reactBoundContext=component;
boundMethod.__reactBoundMethod=method;
boundMethod.__reactBoundArguments=null;
var componentName=component.constructor.displayName;
var _bind=boundMethod.bind;
boundMethod.bind=function(newThis){
for(var _len=arguments.length,args=Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){
args[_key-1]=arguments[_key];
}




if(newThis!==component&&newThis!==null){
process.env.NODE_ENV!=='production'?warning(false,'bind(): React component methods may only be bound to the '+'component instance. See %s',componentName):void 0;
}else if(!args.length){
process.env.NODE_ENV!=='production'?warning(false,'bind(): You are binding a component method to the component. '+'React does this for you automatically in a high-performance '+'way, so you can safely remove this call. See %s',componentName):void 0;
return boundMethod;
}
var reboundMethod=_bind.apply(boundMethod,arguments);
reboundMethod.__reactBoundContext=component;
reboundMethod.__reactBoundMethod=method;
reboundMethod.__reactBoundArguments=args;
return reboundMethod;
};
}
return boundMethod;
}






function bindAutoBindMethods(component){
var pairs=component.__reactAutoBindPairs;
for(var i=0;i<pairs.length;i+=2){
var autoBindKey=pairs[i];
var method=pairs[i+1];
component[autoBindKey]=bindAutoBindMethod(component,method);
}
}





var ReactClassMixin={





replaceState:function replaceState(newState,callback){
this.updater.enqueueReplaceState(this,newState);
if(callback){
this.updater.enqueueCallback(this,callback,'replaceState');
}
},







isMounted:function isMounted(){
return this.updater.isMounted(this);
}};


var ReactClassComponent=function ReactClassComponent(){};
_assign(ReactClassComponent.prototype,ReactComponent.prototype,ReactClassMixin);






var ReactClass={









createClass:function createClass(spec){



var Constructor=identity(function(props,context,updater){



if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(this instanceof Constructor,'Something is calling a React component directly. Use a factory or '+'JSX instead. See: https://fb.me/react-legacyfactory'):void 0;
}


if(this.__reactAutoBindPairs.length){
bindAutoBindMethods(this);
}

this.props=props;
this.context=context;
this.refs=emptyObject;
this.updater=updater||ReactNoopUpdateQueue;

this.state=null;




var initialState=this.getInitialState?this.getInitialState():null;
if(process.env.NODE_ENV!=='production'){

if(initialState===undefined&&this.getInitialState._isMockFunction){


initialState=null;
}
}
!(typeof initialState==='object'&&!Array.isArray(initialState))?process.env.NODE_ENV!=='production'?invariant(false,'%s.getInitialState(): must return an object or null',Constructor.displayName||'ReactCompositeComponent'):_prodInvariant('82',Constructor.displayName||'ReactCompositeComponent'):void 0;

this.state=initialState;
});
Constructor.prototype=new ReactClassComponent();
Constructor.prototype.constructor=Constructor;
Constructor.prototype.__reactAutoBindPairs=[];

injectedMixins.forEach(mixSpecIntoComponent.bind(null,Constructor));

mixSpecIntoComponent(Constructor,spec);


if(Constructor.getDefaultProps){
Constructor.defaultProps=Constructor.getDefaultProps();
}

if(process.env.NODE_ENV!=='production'){




if(Constructor.getDefaultProps){
Constructor.getDefaultProps.isReactClassApproved={};
}
if(Constructor.prototype.getInitialState){
Constructor.prototype.getInitialState.isReactClassApproved={};
}
}

!Constructor.prototype.render?process.env.NODE_ENV!=='production'?invariant(false,'createClass(...): Class specification must implement a `render` method.'):_prodInvariant('83'):void 0;

if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(!Constructor.prototype.componentShouldUpdate,'%s has a method called '+'componentShouldUpdate(). Did you mean shouldComponentUpdate()? '+'The name is phrased as a question because the function is '+'expected to return a value.',spec.displayName||'A component'):void 0;
process.env.NODE_ENV!=='production'?warning(!Constructor.prototype.componentWillRecieveProps,'%s has a method called '+'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',spec.displayName||'A component'):void 0;
}


for(var methodName in ReactClassInterface){
if(!Constructor.prototype[methodName]){
Constructor.prototype[methodName]=null;
}
}

return Constructor;
},

injection:{
injectMixin:function injectMixin(mixin){
injectedMixins.push(mixin);
}}};




module.exports=ReactClass;
}, 93, null, "react/lib/ReactClass.js");
__d(/* react/lib/ReactDOMFactories.js */function(global, require, module, exports) {









'use strict';

var ReactElement=require(83 /* ./ReactElement */);






var createDOMFactory=ReactElement.createFactory;
if(process.env.NODE_ENV!=='production'){
var ReactElementValidator=require(95 /* ./ReactElementValidator */);
createDOMFactory=ReactElementValidator.createFactory;
}







var ReactDOMFactories={
a:createDOMFactory('a'),
abbr:createDOMFactory('abbr'),
address:createDOMFactory('address'),
area:createDOMFactory('area'),
article:createDOMFactory('article'),
aside:createDOMFactory('aside'),
audio:createDOMFactory('audio'),
b:createDOMFactory('b'),
base:createDOMFactory('base'),
bdi:createDOMFactory('bdi'),
bdo:createDOMFactory('bdo'),
big:createDOMFactory('big'),
blockquote:createDOMFactory('blockquote'),
body:createDOMFactory('body'),
br:createDOMFactory('br'),
button:createDOMFactory('button'),
canvas:createDOMFactory('canvas'),
caption:createDOMFactory('caption'),
cite:createDOMFactory('cite'),
code:createDOMFactory('code'),
col:createDOMFactory('col'),
colgroup:createDOMFactory('colgroup'),
data:createDOMFactory('data'),
datalist:createDOMFactory('datalist'),
dd:createDOMFactory('dd'),
del:createDOMFactory('del'),
details:createDOMFactory('details'),
dfn:createDOMFactory('dfn'),
dialog:createDOMFactory('dialog'),
div:createDOMFactory('div'),
dl:createDOMFactory('dl'),
dt:createDOMFactory('dt'),
em:createDOMFactory('em'),
embed:createDOMFactory('embed'),
fieldset:createDOMFactory('fieldset'),
figcaption:createDOMFactory('figcaption'),
figure:createDOMFactory('figure'),
footer:createDOMFactory('footer'),
form:createDOMFactory('form'),
h1:createDOMFactory('h1'),
h2:createDOMFactory('h2'),
h3:createDOMFactory('h3'),
h4:createDOMFactory('h4'),
h5:createDOMFactory('h5'),
h6:createDOMFactory('h6'),
head:createDOMFactory('head'),
header:createDOMFactory('header'),
hgroup:createDOMFactory('hgroup'),
hr:createDOMFactory('hr'),
html:createDOMFactory('html'),
i:createDOMFactory('i'),
iframe:createDOMFactory('iframe'),
img:createDOMFactory('img'),
input:createDOMFactory('input'),
ins:createDOMFactory('ins'),
kbd:createDOMFactory('kbd'),
keygen:createDOMFactory('keygen'),
label:createDOMFactory('label'),
legend:createDOMFactory('legend'),
li:createDOMFactory('li'),
link:createDOMFactory('link'),
main:createDOMFactory('main'),
map:createDOMFactory('map'),
mark:createDOMFactory('mark'),
menu:createDOMFactory('menu'),
menuitem:createDOMFactory('menuitem'),
meta:createDOMFactory('meta'),
meter:createDOMFactory('meter'),
nav:createDOMFactory('nav'),
noscript:createDOMFactory('noscript'),
object:createDOMFactory('object'),
ol:createDOMFactory('ol'),
optgroup:createDOMFactory('optgroup'),
option:createDOMFactory('option'),
output:createDOMFactory('output'),
p:createDOMFactory('p'),
param:createDOMFactory('param'),
picture:createDOMFactory('picture'),
pre:createDOMFactory('pre'),
progress:createDOMFactory('progress'),
q:createDOMFactory('q'),
rp:createDOMFactory('rp'),
rt:createDOMFactory('rt'),
ruby:createDOMFactory('ruby'),
s:createDOMFactory('s'),
samp:createDOMFactory('samp'),
script:createDOMFactory('script'),
section:createDOMFactory('section'),
select:createDOMFactory('select'),
small:createDOMFactory('small'),
source:createDOMFactory('source'),
span:createDOMFactory('span'),
strong:createDOMFactory('strong'),
style:createDOMFactory('style'),
sub:createDOMFactory('sub'),
summary:createDOMFactory('summary'),
sup:createDOMFactory('sup'),
table:createDOMFactory('table'),
tbody:createDOMFactory('tbody'),
td:createDOMFactory('td'),
textarea:createDOMFactory('textarea'),
tfoot:createDOMFactory('tfoot'),
th:createDOMFactory('th'),
thead:createDOMFactory('thead'),
time:createDOMFactory('time'),
title:createDOMFactory('title'),
tr:createDOMFactory('tr'),
track:createDOMFactory('track'),
u:createDOMFactory('u'),
ul:createDOMFactory('ul'),
'var':createDOMFactory('var'),
video:createDOMFactory('video'),
wbr:createDOMFactory('wbr'),


circle:createDOMFactory('circle'),
clipPath:createDOMFactory('clipPath'),
defs:createDOMFactory('defs'),
ellipse:createDOMFactory('ellipse'),
g:createDOMFactory('g'),
image:createDOMFactory('image'),
line:createDOMFactory('line'),
linearGradient:createDOMFactory('linearGradient'),
mask:createDOMFactory('mask'),
path:createDOMFactory('path'),
pattern:createDOMFactory('pattern'),
polygon:createDOMFactory('polygon'),
polyline:createDOMFactory('polyline'),
radialGradient:createDOMFactory('radialGradient'),
rect:createDOMFactory('rect'),
stop:createDOMFactory('stop'),
svg:createDOMFactory('svg'),
text:createDOMFactory('text'),
tspan:createDOMFactory('tspan')};


module.exports=ReactDOMFactories;
}, 94, null, "react/lib/ReactDOMFactories.js");
__d(/* react/lib/ReactElementValidator.js */function(global, require, module, exports) {
















'use strict';

var ReactCurrentOwner=require(38 /* ./ReactCurrentOwner */);
var ReactComponentTreeHook=require(36 /* ./ReactComponentTreeHook */);
var ReactElement=require(83 /* ./ReactElement */);

var checkReactTypeSpec=require(96 /* ./checkReactTypeSpec */);

var canDefineProperty=require(84 /* ./canDefineProperty */);
var getIteratorFn=require(87 /* ./getIteratorFn */);
var warning=require(15 /* fbjs/lib/warning */);

function getDeclarationErrorAddendum(){
if(ReactCurrentOwner.current){
var name=ReactCurrentOwner.current.getName();
if(name){
return' Check the render method of `'+name+'`.';
}
}
return'';
}






var ownerHasKeyUseWarning={};

function getCurrentComponentErrorInfo(parentType){
var info=getDeclarationErrorAddendum();

if(!info){
var parentName=typeof parentType==='string'?parentType:parentType.displayName||parentType.name;
if(parentName){
info=' Check the top-level render call using <'+parentName+'>.';
}
}
return info;
}












function validateExplicitKey(element,parentType){
if(!element._store||element._store.validated||element.key!=null){
return;
}
element._store.validated=true;

var memoizer=ownerHasKeyUseWarning.uniqueKey||(ownerHasKeyUseWarning.uniqueKey={});

var currentComponentErrorInfo=getCurrentComponentErrorInfo(parentType);
if(memoizer[currentComponentErrorInfo]){
return;
}
memoizer[currentComponentErrorInfo]=true;




var childOwner='';
if(element&&element._owner&&element._owner!==ReactCurrentOwner.current){

childOwner=' It was passed a child from '+element._owner.getName()+'.';
}

process.env.NODE_ENV!=='production'?warning(false,'Each child in an array or iterator should have a unique "key" prop.'+'%s%s See https://fb.me/react-warning-keys for more information.%s',currentComponentErrorInfo,childOwner,ReactComponentTreeHook.getCurrentStackAddendum(element)):void 0;
}










function validateChildKeys(node,parentType){
if(typeof node!=='object'){
return;
}
if(Array.isArray(node)){
for(var i=0;i<node.length;i++){
var child=node[i];
if(ReactElement.isValidElement(child)){
validateExplicitKey(child,parentType);
}
}
}else if(ReactElement.isValidElement(node)){

if(node._store){
node._store.validated=true;
}
}else if(node){
var iteratorFn=getIteratorFn(node);

if(iteratorFn){
if(iteratorFn!==node.entries){
var iterator=iteratorFn.call(node);
var step;
while(!(step=iterator.next()).done){
if(ReactElement.isValidElement(step.value)){
validateExplicitKey(step.value,parentType);
}
}
}
}
}
}







function validatePropTypes(element){
var componentClass=element.type;
if(typeof componentClass!=='function'){
return;
}
var name=componentClass.displayName||componentClass.name;
if(componentClass.propTypes){
checkReactTypeSpec(componentClass.propTypes,element.props,'prop',name,element,null);
}
if(typeof componentClass.getDefaultProps==='function'){
process.env.NODE_ENV!=='production'?warning(componentClass.getDefaultProps.isReactClassApproved,'getDefaultProps is only used on classic React.createClass '+'definitions. Use a static property named `defaultProps` instead.'):void 0;
}
}

var ReactElementValidator={

createElement:function createElement(type,props,children){
var validType=typeof type==='string'||typeof type==='function';


if(!validType){
if(typeof type!=='function'&&typeof type!=='string'){
var info='';
if(type===undefined||typeof type==='object'&&type!==null&&Object.keys(type).length===0){
info+=' You likely forgot to export your component from the file '+'it\'s defined in.';
}
info+=getDeclarationErrorAddendum();
process.env.NODE_ENV!=='production'?warning(false,'React.createElement: type is invalid -- expected a string (for '+'built-in components) or a class/function (for composite '+'components) but got: %s.%s',type==null?type:typeof type,info):void 0;
}
}

var element=ReactElement.createElement.apply(this,arguments);



if(element==null){
return element;
}






if(validType){
for(var i=2;i<arguments.length;i++){
validateChildKeys(arguments[i],type);
}
}

validatePropTypes(element);

return element;
},

createFactory:function createFactory(type){
var validatedFactory=ReactElementValidator.createElement.bind(null,type);

validatedFactory.type=type;

if(process.env.NODE_ENV!=='production'){
if(canDefineProperty){
Object.defineProperty(validatedFactory,'type',{
enumerable:false,
get:function get(){
process.env.NODE_ENV!=='production'?warning(false,'Factory.type is deprecated. Access the class directly '+'before passing it to createFactory.'):void 0;
Object.defineProperty(this,'type',{
value:type});

return type;
}});

}
}

return validatedFactory;
},

cloneElement:function cloneElement(element,props,children){
var newElement=ReactElement.cloneElement.apply(this,arguments);
for(var i=2;i<arguments.length;i++){
validateChildKeys(arguments[i],newElement.type);
}
validatePropTypes(newElement);
return newElement;
}};



module.exports=ReactElementValidator;
}, 95, null, "react/lib/ReactElementValidator.js");
__d(/* react/lib/checkReactTypeSpec.js */function(global, require, module, exports) {









'use strict';

var _prodInvariant=require(37 /* ./reactProdInvariant */);

var ReactPropTypeLocationNames=require(19 /* ./ReactPropTypeLocationNames */);
var ReactPropTypesSecret=require(97 /* ./ReactPropTypesSecret */);

var invariant=require(26 /* fbjs/lib/invariant */);
var warning=require(15 /* fbjs/lib/warning */);

var ReactComponentTreeHook;

if(typeof process!=='undefined'&&process.env&&process.env.NODE_ENV==='test'){





ReactComponentTreeHook=require(36 /* ./ReactComponentTreeHook */);
}

var loggedTypeFailures={};













function checkReactTypeSpec(typeSpecs,values,location,componentName,element,debugID){
for(var typeSpecName in typeSpecs){
if(typeSpecs.hasOwnProperty(typeSpecName)){
var error;



try{


!(typeof typeSpecs[typeSpecName]==='function')?process.env.NODE_ENV!=='production'?invariant(false,'%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.',componentName||'React class',ReactPropTypeLocationNames[location],typeSpecName):_prodInvariant('84',componentName||'React class',ReactPropTypeLocationNames[location],typeSpecName):void 0;
error=typeSpecs[typeSpecName](values,typeSpecName,componentName,location,null,ReactPropTypesSecret);
}catch(ex){
error=ex;
}
process.env.NODE_ENV!=='production'?warning(!error||error instanceof Error,'%s: type specification of %s `%s` is invalid; the type checker '+'function must return `null` or an `Error` but returned a %s. '+'You may have forgotten to pass an argument to the type checker '+'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and '+'shape all require an argument).',componentName||'React class',ReactPropTypeLocationNames[location],typeSpecName,typeof error):void 0;
if(error instanceof Error&&!(error.message in loggedTypeFailures)){


loggedTypeFailures[error.message]=true;

var componentStackInfo='';

if(process.env.NODE_ENV!=='production'){
if(!ReactComponentTreeHook){
ReactComponentTreeHook=require(36 /* ./ReactComponentTreeHook */);
}
if(debugID!==null){
componentStackInfo=ReactComponentTreeHook.getStackAddendumByID(debugID);
}else if(element!==null){
componentStackInfo=ReactComponentTreeHook.getCurrentStackAddendum(element);
}
}

process.env.NODE_ENV!=='production'?warning(false,'Failed %s type: %s%s',location,error.message,componentStackInfo):void 0;
}
}
}
}

module.exports=checkReactTypeSpec;
}, 96, null, "react/lib/checkReactTypeSpec.js");
__d(/* react/lib/ReactPropTypesSecret.js */function(global, require, module, exports) {










'use strict';

var ReactPropTypesSecret='SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports=ReactPropTypesSecret;
}, 97, null, "react/lib/ReactPropTypesSecret.js");
__d(/* react/lib/ReactPropTypes.js */function(global, require, module, exports) {









'use strict';

var ReactElement=require(83 /* ./ReactElement */);
var ReactPropTypeLocationNames=require(19 /* ./ReactPropTypeLocationNames */);
var ReactPropTypesSecret=require(97 /* ./ReactPropTypesSecret */);

var emptyFunction=require(16 /* fbjs/lib/emptyFunction */);
var getIteratorFn=require(87 /* ./getIteratorFn */);
var warning=require(15 /* fbjs/lib/warning */);
















































var ANONYMOUS='<<anonymous>>';

var ReactPropTypes={
array:createPrimitiveTypeChecker('array'),
bool:createPrimitiveTypeChecker('boolean'),
func:createPrimitiveTypeChecker('function'),
number:createPrimitiveTypeChecker('number'),
object:createPrimitiveTypeChecker('object'),
string:createPrimitiveTypeChecker('string'),
symbol:createPrimitiveTypeChecker('symbol'),

any:createAnyTypeChecker(),
arrayOf:createArrayOfTypeChecker,
element:createElementTypeChecker(),
instanceOf:createInstanceTypeChecker,
node:createNodeChecker(),
objectOf:createObjectOfTypeChecker,
oneOf:createEnumTypeChecker,
oneOfType:createUnionTypeChecker,
shape:createShapeTypeChecker};







function is(x,y){

if(x===y){


return x!==0||1/x===1/y;
}else{

return x!==x&&y!==y;
}
}









function PropTypeError(message){
this.message=message;
this.stack='';
}

PropTypeError.prototype=Error.prototype;

function createChainableTypeChecker(validate){
if(process.env.NODE_ENV!=='production'){
var manualPropTypeCallCache={};
}
function checkType(isRequired,props,propName,componentName,location,propFullName,secret){
componentName=componentName||ANONYMOUS;
propFullName=propFullName||propName;
if(process.env.NODE_ENV!=='production'){
if(secret!==ReactPropTypesSecret&&typeof console!=='undefined'){
var cacheKey=componentName+':'+propName;
if(!manualPropTypeCallCache[cacheKey]){
process.env.NODE_ENV!=='production'?warning(false,'You are manually calling a React.PropTypes validation '+'function for the `%s` prop on `%s`. This is deprecated '+'and will not work in production with the next major version. '+'You may be seeing this warning due to a third-party PropTypes '+'library. See https://fb.me/react-warning-dont-call-proptypes '+'for details.',propFullName,componentName):void 0;
manualPropTypeCallCache[cacheKey]=true;
}
}
}
if(props[propName]==null){
var locationName=ReactPropTypeLocationNames[location];
if(isRequired){
if(props[propName]===null){
return new PropTypeError('The '+locationName+' `'+propFullName+'` is marked as required '+('in `'+componentName+'`, but its value is `null`.'));
}
return new PropTypeError('The '+locationName+' `'+propFullName+'` is marked as required in '+('`'+componentName+'`, but its value is `undefined`.'));
}
return null;
}else{
return validate(props,propName,componentName,location,propFullName);
}
}

var chainedCheckType=checkType.bind(null,false);
chainedCheckType.isRequired=checkType.bind(null,true);

return chainedCheckType;
}

function createPrimitiveTypeChecker(expectedType){
function validate(props,propName,componentName,location,propFullName,secret){
var propValue=props[propName];
var propType=getPropType(propValue);
if(propType!==expectedType){
var locationName=ReactPropTypeLocationNames[location];



var preciseType=getPreciseType(propValue);

return new PropTypeError('Invalid '+locationName+' `'+propFullName+'` of type '+('`'+preciseType+'` supplied to `'+componentName+'`, expected ')+('`'+expectedType+'`.'));
}
return null;
}
return createChainableTypeChecker(validate);
}

function createAnyTypeChecker(){
return createChainableTypeChecker(emptyFunction.thatReturns(null));
}

function createArrayOfTypeChecker(typeChecker){
function validate(props,propName,componentName,location,propFullName){
if(typeof typeChecker!=='function'){
return new PropTypeError('Property `'+propFullName+'` of component `'+componentName+'` has invalid PropType notation inside arrayOf.');
}
var propValue=props[propName];
if(!Array.isArray(propValue)){
var locationName=ReactPropTypeLocationNames[location];
var propType=getPropType(propValue);
return new PropTypeError('Invalid '+locationName+' `'+propFullName+'` of type '+('`'+propType+'` supplied to `'+componentName+'`, expected an array.'));
}
for(var i=0;i<propValue.length;i++){
var error=typeChecker(propValue,i,componentName,location,propFullName+'['+i+']',ReactPropTypesSecret);
if(error instanceof Error){
return error;
}
}
return null;
}
return createChainableTypeChecker(validate);
}

function createElementTypeChecker(){
function validate(props,propName,componentName,location,propFullName){
var propValue=props[propName];
if(!ReactElement.isValidElement(propValue)){
var locationName=ReactPropTypeLocationNames[location];
var propType=getPropType(propValue);
return new PropTypeError('Invalid '+locationName+' `'+propFullName+'` of type '+('`'+propType+'` supplied to `'+componentName+'`, expected a single ReactElement.'));
}
return null;
}
return createChainableTypeChecker(validate);
}

function createInstanceTypeChecker(expectedClass){
function validate(props,propName,componentName,location,propFullName){
if(!(props[propName]instanceof expectedClass)){
var locationName=ReactPropTypeLocationNames[location];
var expectedClassName=expectedClass.name||ANONYMOUS;
var actualClassName=getClassName(props[propName]);
return new PropTypeError('Invalid '+locationName+' `'+propFullName+'` of type '+('`'+actualClassName+'` supplied to `'+componentName+'`, expected ')+('instance of `'+expectedClassName+'`.'));
}
return null;
}
return createChainableTypeChecker(validate);
}

function createEnumTypeChecker(expectedValues){
if(!Array.isArray(expectedValues)){
process.env.NODE_ENV!=='production'?warning(false,'Invalid argument supplied to oneOf, expected an instance of array.'):void 0;
return emptyFunction.thatReturnsNull;
}

function validate(props,propName,componentName,location,propFullName){
var propValue=props[propName];
for(var i=0;i<expectedValues.length;i++){
if(is(propValue,expectedValues[i])){
return null;
}
}

var locationName=ReactPropTypeLocationNames[location];
var valuesString=JSON.stringify(expectedValues);
return new PropTypeError('Invalid '+locationName+' `'+propFullName+'` of value `'+propValue+'` '+('supplied to `'+componentName+'`, expected one of '+valuesString+'.'));
}
return createChainableTypeChecker(validate);
}

function createObjectOfTypeChecker(typeChecker){
function validate(props,propName,componentName,location,propFullName){
if(typeof typeChecker!=='function'){
return new PropTypeError('Property `'+propFullName+'` of component `'+componentName+'` has invalid PropType notation inside objectOf.');
}
var propValue=props[propName];
var propType=getPropType(propValue);
if(propType!=='object'){
var locationName=ReactPropTypeLocationNames[location];
return new PropTypeError('Invalid '+locationName+' `'+propFullName+'` of type '+('`'+propType+'` supplied to `'+componentName+'`, expected an object.'));
}
for(var key in propValue){
if(propValue.hasOwnProperty(key)){
var error=typeChecker(propValue,key,componentName,location,propFullName+'.'+key,ReactPropTypesSecret);
if(error instanceof Error){
return error;
}
}
}
return null;
}
return createChainableTypeChecker(validate);
}

function createUnionTypeChecker(arrayOfTypeCheckers){
if(!Array.isArray(arrayOfTypeCheckers)){
process.env.NODE_ENV!=='production'?warning(false,'Invalid argument supplied to oneOfType, expected an instance of array.'):void 0;
return emptyFunction.thatReturnsNull;
}

function validate(props,propName,componentName,location,propFullName){
for(var i=0;i<arrayOfTypeCheckers.length;i++){
var checker=arrayOfTypeCheckers[i];
if(checker(props,propName,componentName,location,propFullName,ReactPropTypesSecret)==null){
return null;
}
}

var locationName=ReactPropTypeLocationNames[location];
return new PropTypeError('Invalid '+locationName+' `'+propFullName+'` supplied to '+('`'+componentName+'`.'));
}
return createChainableTypeChecker(validate);
}

function createNodeChecker(){
function validate(props,propName,componentName,location,propFullName){
if(!isNode(props[propName])){
var locationName=ReactPropTypeLocationNames[location];
return new PropTypeError('Invalid '+locationName+' `'+propFullName+'` supplied to '+('`'+componentName+'`, expected a ReactNode.'));
}
return null;
}
return createChainableTypeChecker(validate);
}

function createShapeTypeChecker(shapeTypes){
function validate(props,propName,componentName,location,propFullName){
var propValue=props[propName];
var propType=getPropType(propValue);
if(propType!=='object'){
var locationName=ReactPropTypeLocationNames[location];
return new PropTypeError('Invalid '+locationName+' `'+propFullName+'` of type `'+propType+'` '+('supplied to `'+componentName+'`, expected `object`.'));
}
for(var key in shapeTypes){
var checker=shapeTypes[key];
if(!checker){
continue;
}
var error=checker(propValue,key,componentName,location,propFullName+'.'+key,ReactPropTypesSecret);
if(error){
return error;
}
}
return null;
}
return createChainableTypeChecker(validate);
}

function isNode(propValue){
switch(typeof propValue){
case'number':
case'string':
case'undefined':
return true;
case'boolean':
return!propValue;
case'object':
if(Array.isArray(propValue)){
return propValue.every(isNode);
}
if(propValue===null||ReactElement.isValidElement(propValue)){
return true;
}

var iteratorFn=getIteratorFn(propValue);
if(iteratorFn){
var iterator=iteratorFn.call(propValue);
var step;
if(iteratorFn!==propValue.entries){
while(!(step=iterator.next()).done){
if(!isNode(step.value)){
return false;
}
}
}else{

while(!(step=iterator.next()).done){
var entry=step.value;
if(entry){
if(!isNode(entry[1])){
return false;
}
}
}
}
}else{
return false;
}

return true;
default:
return false;}

}

function isSymbol(propType,propValue){

if(propType==='symbol'){
return true;
}


if(propValue['@@toStringTag']==='Symbol'){
return true;
}


if(typeof Symbol==='function'&&propValue instanceof Symbol){
return true;
}

return false;
}


function getPropType(propValue){
var propType=typeof propValue;
if(Array.isArray(propValue)){
return'array';
}
if(propValue instanceof RegExp){



return'object';
}
if(isSymbol(propType,propValue)){
return'symbol';
}
return propType;
}



function getPreciseType(propValue){
var propType=getPropType(propValue);
if(propType==='object'){
if(propValue instanceof Date){
return'date';
}else if(propValue instanceof RegExp){
return'regexp';
}
}
return propType;
}


function getClassName(propValue){
if(!propValue.constructor||!propValue.constructor.name){
return ANONYMOUS;
}
return propValue.constructor.name;
}

module.exports=ReactPropTypes;
}, 98, null, "react/lib/ReactPropTypes.js");
__d(/* react/lib/ReactVersion.js */function(global, require, module, exports) {









'use strict';

module.exports='15.4.2';
}, 99, null, "react/lib/ReactVersion.js");
__d(/* react/lib/onlyChild.js */function(global, require, module, exports) {








'use strict';

var _prodInvariant=require(37 /* ./reactProdInvariant */);

var ReactElement=require(83 /* ./ReactElement */);

var invariant=require(26 /* fbjs/lib/invariant */);















function onlyChild(children){
!ReactElement.isValidElement(children)?process.env.NODE_ENV!=='production'?invariant(false,'React.Children.only expected to receive a single React element child.'):_prodInvariant('143'):void 0;
return children;
}

module.exports=onlyChild;
}, 100, null, "react/lib/onlyChild.js");
__d(/* StyleSheet */function(global, require, module, exports) {










'use strict';

var PixelRatio=require(102 /* PixelRatio */);
var ReactNativePropRegistry=require(23 /* ReactNativePropRegistry */);
var ReactNativeStyleAttributes=require(104 /* ReactNativeStyleAttributes */);
var StyleSheetValidation=require(119 /* StyleSheetValidation */);

var flatten=require(25 /* flattenStyle */);




var hairlineWidth=PixelRatio.roundToNearestPixel(0.4);
if(hairlineWidth===0){
hairlineWidth=1/PixelRatio.get();
}

var absoluteFillObject={
position:'absolute',
left:0,
right:0,
top:0,
bottom:0};

var absoluteFill=ReactNativePropRegistry.register(absoluteFillObject);













































module.exports={



















hairlineWidth:hairlineWidth,






absoluteFill:absoluteFill,













absoluteFillObject:absoluteFillObject,








































flatten:flatten,










setStyleAttributePreprocessor:function setStyleAttributePreprocessor(property,process){
var value=void 0;

if(typeof ReactNativeStyleAttributes[property]==='string'){
value={};
}else if(typeof ReactNativeStyleAttributes[property]==='object'){
value=ReactNativeStyleAttributes[property];
}else{
console.error(property+' is not a valid style attribute');
return;
}

if(__DEV__&&typeof value.process==='function'){
console.warn('Overwriting '+property+' style attribute preprocessor');
}

ReactNativeStyleAttributes[property]=babelHelpers.extends({},value,{process:process});
},




create:function create(obj){
var result={};
for(var key in obj){
StyleSheetValidation.validateStyle(key,obj);
result[key]=ReactNativePropRegistry.register(obj[key]);
}
return result;
}};
}, 101, null, "StyleSheet");
__d(/* PixelRatio */function(global, require, module, exports) {










'use strict';

var Dimensions=require(103 /* Dimensions */);var


















PixelRatio=function(){function PixelRatio(){babelHelpers.classCallCheck(this,PixelRatio);}babelHelpers.createClass(PixelRatio,null,[{key:'get',value:function get()


















{
return Dimensions.get('window').scale;
}},{key:'getFontScale',value:function getFontScale()












{
return Dimensions.get('window').fontScale||PixelRatio.get();
}},{key:'getPixelSizeForLayoutSize',value:function getPixelSizeForLayoutSize(






layoutSize){
return Math.round(layoutSize*PixelRatio.get());
}},{key:'roundToNearestPixel',value:function roundToNearestPixel(







layoutSize){
var ratio=PixelRatio.get();
return Math.round(layoutSize*ratio)/ratio;
}},{key:'startDetecting',value:function startDetecting()


{}}]);return PixelRatio;}();


module.exports=PixelRatio;
}, 102, null, "PixelRatio");
__d(/* Dimensions */function(global, require, module, exports) {










'use strict';

var Platform=require(28 /* Platform */);
var UIManager=require(75 /* UIManager */);
var RCTDeviceEventEmitter=require(60 /* RCTDeviceEventEmitter */);

var invariant=require(26 /* fbjs/lib/invariant */);

var dimensions={};var
Dimensions=function(){function Dimensions(){babelHelpers.classCallCheck(this,Dimensions);}babelHelpers.createClass(Dimensions,null,[{key:'set',value:function set(






dims){



if(dims&&dims.windowPhysicalPixels){

dims=JSON.parse(JSON.stringify(dims));

var windowPhysicalPixels=dims.windowPhysicalPixels;
dims.window={
width:windowPhysicalPixels.width/windowPhysicalPixels.scale,
height:windowPhysicalPixels.height/windowPhysicalPixels.scale,
scale:windowPhysicalPixels.scale,
fontScale:windowPhysicalPixels.fontScale};

if(Platform.OS==='android'){

var screenPhysicalPixels=dims.screenPhysicalPixels;
dims.screen={
width:screenPhysicalPixels.width/screenPhysicalPixels.scale,
height:screenPhysicalPixels.height/screenPhysicalPixels.scale,
scale:screenPhysicalPixels.scale,
fontScale:screenPhysicalPixels.fontScale};



delete dims.screenPhysicalPixels;
}else{
dims.screen=dims.window;
}

delete dims.windowPhysicalPixels;
}

babelHelpers.extends(dimensions,dims);
}},{key:'get',value:function get(
















dim){
invariant(dimensions[dim],'No dimension set for key '+dim);
return dimensions[dim];
}}]);return Dimensions;}();


Dimensions.set(UIManager.Dimensions);
RCTDeviceEventEmitter.addListener('didUpdateDimensions',function(update){
Dimensions.set(update);
});

module.exports=Dimensions;
}, 103, null, "Dimensions");
__d(/* ReactNativeStyleAttributes */function(global, require, module, exports) {











'use strict';

var ImageStylePropTypes=require(105 /* ImageStylePropTypes */);
var TextStylePropTypes=require(113 /* TextStylePropTypes */);
var ViewStylePropTypes=require(114 /* ViewStylePropTypes */);

var keyMirror=require(107 /* fbjs/lib/keyMirror */);
var matricesDiffer=require(115 /* matricesDiffer */);
var processColor=require(73 /* processColor */);
var processTransform=require(116 /* processTransform */);
var sizesDiffer=require(118 /* sizesDiffer */);

var ReactNativeStyleAttributes=babelHelpers.extends({},
keyMirror(ViewStylePropTypes),
keyMirror(TextStylePropTypes),
keyMirror(ImageStylePropTypes));


ReactNativeStyleAttributes.transform={process:processTransform};
ReactNativeStyleAttributes.transformMatrix={diff:matricesDiffer};
ReactNativeStyleAttributes.shadowOffset={diff:sizesDiffer};


ReactNativeStyleAttributes.decomposedMatrix='decomposedMatrix';

var colorAttributes={process:processColor};
ReactNativeStyleAttributes.backgroundColor=colorAttributes;
ReactNativeStyleAttributes.borderBottomColor=colorAttributes;
ReactNativeStyleAttributes.borderColor=colorAttributes;
ReactNativeStyleAttributes.borderLeftColor=colorAttributes;
ReactNativeStyleAttributes.borderRightColor=colorAttributes;
ReactNativeStyleAttributes.borderTopColor=colorAttributes;
ReactNativeStyleAttributes.color=colorAttributes;
ReactNativeStyleAttributes.shadowColor=colorAttributes;
ReactNativeStyleAttributes.textDecorationColor=colorAttributes;
ReactNativeStyleAttributes.tintColor=colorAttributes;
ReactNativeStyleAttributes.textShadowColor=colorAttributes;
ReactNativeStyleAttributes.overlayColor=colorAttributes;

module.exports=ReactNativeStyleAttributes;
}, 104, null, "ReactNativeStyleAttributes");
__d(/* ImageStylePropTypes */function(global, require, module, exports) {










'use strict';

var ImageResizeMode=require(106 /* ImageResizeMode */);
var LayoutPropTypes=require(108 /* LayoutPropTypes */);
var ColorPropType=require(18 /* ColorPropType */);
var ShadowPropTypesIOS=require(109 /* ShadowPropTypesIOS */);
var TransformPropTypes=require(110 /* TransformPropTypes */);

var ReactPropTypes=require(78 /* React */).PropTypes;

var ImageStylePropTypes=babelHelpers.extends({},
LayoutPropTypes,
ShadowPropTypesIOS,
TransformPropTypes,{
resizeMode:ReactPropTypes.oneOf(Object.keys(ImageResizeMode)),
backfaceVisibility:ReactPropTypes.oneOf(['visible','hidden']),
backgroundColor:ColorPropType,
borderColor:ColorPropType,
borderWidth:ReactPropTypes.number,
borderRadius:ReactPropTypes.number,
overflow:ReactPropTypes.oneOf(['visible','hidden']),




tintColor:ColorPropType,
opacity:ReactPropTypes.number,

















overlayColor:ReactPropTypes.string,


borderTopLeftRadius:ReactPropTypes.number,
borderTopRightRadius:ReactPropTypes.number,
borderBottomLeftRadius:ReactPropTypes.number,
borderBottomRightRadius:ReactPropTypes.number});


module.exports=ImageStylePropTypes;
}, 105, null, "ImageStylePropTypes");
__d(/* ImageResizeMode */function(global, require, module, exports) {










'use strict';

var keyMirror=require(107 /* fbjs/lib/keyMirror */);





var ImageResizeMode=keyMirror({




contain:null,




cover:null,





stretch:null,





center:null,





repeat:null});


module.exports=ImageResizeMode;
}, 106, null, "ImageResizeMode");
__d(/* fbjs/lib/keyMirror.js */function(global, require, module, exports) {










'use strict';

var invariant=require(26 /* ./invariant */);



















var keyMirror=function keyMirror(obj){
var ret={};
var key;
!(obj instanceof Object&&!Array.isArray(obj))?process.env.NODE_ENV!=='production'?invariant(false,'keyMirror(...): Argument must be an object.'):invariant(false):void 0;
for(key in obj){
if(!obj.hasOwnProperty(key)){
continue;
}
ret[key]=key;
}
return ret;
};

module.exports=keyMirror;
}, 107, null, "fbjs/lib/keyMirror.js");
__d(/* LayoutPropTypes */function(global, require, module, exports) {










'use strict';

var ReactPropTypes=require(78 /* React */).PropTypes;














var LayoutPropTypes={






width:ReactPropTypes.number,







height:ReactPropTypes.number,










top:ReactPropTypes.number,










left:ReactPropTypes.number,










right:ReactPropTypes.number,










bottom:ReactPropTypes.number,









minWidth:ReactPropTypes.number,









maxWidth:ReactPropTypes.number,









minHeight:ReactPropTypes.number,









maxHeight:ReactPropTypes.number,






margin:ReactPropTypes.number,




marginVertical:ReactPropTypes.number,




marginHorizontal:ReactPropTypes.number,





marginTop:ReactPropTypes.number,





marginBottom:ReactPropTypes.number,





marginLeft:ReactPropTypes.number,





marginRight:ReactPropTypes.number,






padding:ReactPropTypes.number,




paddingVertical:ReactPropTypes.number,




paddingHorizontal:ReactPropTypes.number,





paddingTop:ReactPropTypes.number,





paddingBottom:ReactPropTypes.number,





paddingLeft:ReactPropTypes.number,





paddingRight:ReactPropTypes.number,





borderWidth:ReactPropTypes.number,





borderTopWidth:ReactPropTypes.number,





borderRightWidth:ReactPropTypes.number,





borderBottomWidth:ReactPropTypes.number,





borderLeftWidth:ReactPropTypes.number,

















position:ReactPropTypes.oneOf([
'absolute',
'relative']),









flexDirection:ReactPropTypes.oneOf([
'row',
'row-reverse',
'column',
'column-reverse']),








flexWrap:ReactPropTypes.oneOf([
'wrap',
'nowrap']),









justifyContent:ReactPropTypes.oneOf([
'flex-start',
'flex-end',
'center',
'space-between',
'space-around']),









alignItems:ReactPropTypes.oneOf([
'flex-start',
'flex-end',
'center',
'stretch']),








alignSelf:ReactPropTypes.oneOf([
'auto',
'flex-start',
'flex-end',
'center',
'stretch']),









overflow:ReactPropTypes.oneOf([
'visible',
'hidden',
'scroll']),





















flex:ReactPropTypes.number,
flexGrow:ReactPropTypes.number,
flexShrink:ReactPropTypes.number,
flexBasis:ReactPropTypes.number,














aspectRatio:ReactPropTypes.number,













zIndex:ReactPropTypes.number};


module.exports=LayoutPropTypes;
}, 108, null, "LayoutPropTypes");
__d(/* ShadowPropTypesIOS */function(global, require, module, exports) {










'use strict';

var ColorPropType=require(18 /* ColorPropType */);
var ReactPropTypes=require(78 /* React */).PropTypes;

var ShadowPropTypesIOS={




shadowColor:ColorPropType,




shadowOffset:ReactPropTypes.shape(
{width:ReactPropTypes.number,height:ReactPropTypes.number}),





shadowOpacity:ReactPropTypes.number,




shadowRadius:ReactPropTypes.number};


module.exports=ShadowPropTypesIOS;
}, 109, null, "ShadowPropTypesIOS");
__d(/* TransformPropTypes */function(global, require, module, exports) {










'use strict';

var deprecatedPropType=require(111 /* deprecatedPropType */);

var ReactPropTypes=require(78 /* React */).PropTypes;

var TransformMatrixPropType=function TransformMatrixPropType(
props,
propName,
componentName)
{
if(props[propName]){
return new Error(
'The transformMatrix style property is deprecated. '+
'Use `transform: [{ matrix: ... }]` instead.');

}
};

var DecomposedMatrixPropType=function DecomposedMatrixPropType(
props,
propName,
componentName)
{
if(props[propName]){
return new Error(
'The decomposedMatrix style property is deprecated. '+
'Use `transform: [...]` instead.');

}
};

var TransformPropTypes={
transform:ReactPropTypes.arrayOf(
ReactPropTypes.oneOfType([
ReactPropTypes.shape({perspective:ReactPropTypes.number}),
ReactPropTypes.shape({rotate:ReactPropTypes.string}),
ReactPropTypes.shape({rotateX:ReactPropTypes.string}),
ReactPropTypes.shape({rotateY:ReactPropTypes.string}),
ReactPropTypes.shape({rotateZ:ReactPropTypes.string}),
ReactPropTypes.shape({scale:ReactPropTypes.number}),
ReactPropTypes.shape({scaleX:ReactPropTypes.number}),
ReactPropTypes.shape({scaleY:ReactPropTypes.number}),
ReactPropTypes.shape({translateX:ReactPropTypes.number}),
ReactPropTypes.shape({translateY:ReactPropTypes.number}),
ReactPropTypes.shape({skewX:ReactPropTypes.string}),
ReactPropTypes.shape({skewY:ReactPropTypes.string})])),




transformMatrix:TransformMatrixPropType,
decomposedMatrix:DecomposedMatrixPropType,


scaleX:deprecatedPropType(ReactPropTypes.number,'Use the transform prop instead.'),
scaleY:deprecatedPropType(ReactPropTypes.number,'Use the transform prop instead.'),
rotation:deprecatedPropType(ReactPropTypes.number,'Use the transform prop instead.'),
translateX:deprecatedPropType(ReactPropTypes.number,'Use the transform prop instead.'),
translateY:deprecatedPropType(ReactPropTypes.number,'Use the transform prop instead.')};


module.exports=TransformPropTypes;
}, 110, null, "TransformPropTypes");
__d(/* deprecatedPropType */function(global, require, module, exports) {










'use strict';

var UIManager=require(75 /* UIManager */);
var ReactPropTypesSecret=require(97 /* react/lib/ReactPropTypesSecret */);
var ReactPropTypeLocations=require(112 /* react/lib/ReactPropTypeLocations */);




function deprecatedPropType(
propType,
explanation)
{
return function validate(props,propName,componentName){

if(!UIManager[componentName]&&props[propName]!==undefined){
console.warn('`'+propName+'` supplied to `'+componentName+'` has been deprecated. '+explanation);
}

return propType(
props,
propName,
componentName,
ReactPropTypeLocations.prop,
null,
ReactPropTypesSecret);

};
}

module.exports=deprecatedPropType;
}, 111, null, "deprecatedPropType");
__d(/* react/lib/ReactPropTypeLocations.js */function(global, require, module, exports) {










'use strict';
}, 112, null, "react/lib/ReactPropTypeLocations.js");
__d(/* TextStylePropTypes */function(global, require, module, exports) {










'use strict';

var ReactPropTypes=require(78 /* React */).PropTypes;
var ColorPropType=require(18 /* ColorPropType */);
var ViewStylePropTypes=require(114 /* ViewStylePropTypes */);

var TextStylePropTypes=babelHelpers.extends({},
ViewStylePropTypes,{

color:ColorPropType,
fontFamily:ReactPropTypes.string,
fontSize:ReactPropTypes.number,
fontStyle:ReactPropTypes.oneOf(['normal','italic']),





fontWeight:ReactPropTypes.oneOf(
['normal','bold',
'100','200','300','400','500','600','700','800','900']),




fontVariant:ReactPropTypes.arrayOf(
ReactPropTypes.oneOf([
'small-caps',
'oldstyle-nums',
'lining-nums',
'tabular-nums',
'proportional-nums'])),


textShadowOffset:ReactPropTypes.shape(
{width:ReactPropTypes.number,height:ReactPropTypes.number}),

textShadowRadius:ReactPropTypes.number,
textShadowColor:ColorPropType,



letterSpacing:ReactPropTypes.number,
lineHeight:ReactPropTypes.number,




textAlign:ReactPropTypes.oneOf(
['auto','left','right','center','justify']),




textAlignVertical:ReactPropTypes.oneOf(
['auto','top','bottom','center']),







includeFontPadding:ReactPropTypes.bool,
textDecorationLine:ReactPropTypes.oneOf(
['none','underline','line-through','underline line-through']),




textDecorationStyle:ReactPropTypes.oneOf(
['solid','double','dotted','dashed']),




textDecorationColor:ColorPropType,



writingDirection:ReactPropTypes.oneOf(
['auto','ltr','rtl'])});



module.exports=TextStylePropTypes;
}, 113, null, "TextStylePropTypes");
__d(/* ViewStylePropTypes */function(global, require, module, exports) {










'use strict';

var LayoutPropTypes=require(108 /* LayoutPropTypes */);
var ReactPropTypes=require(78 /* React */).PropTypes;
var ColorPropType=require(18 /* ColorPropType */);
var ShadowPropTypesIOS=require(109 /* ShadowPropTypesIOS */);
var TransformPropTypes=require(110 /* TransformPropTypes */);




var ViewStylePropTypes=babelHelpers.extends({},
LayoutPropTypes,
ShadowPropTypesIOS,
TransformPropTypes,{
backfaceVisibility:ReactPropTypes.oneOf(['visible','hidden']),
backgroundColor:ColorPropType,
borderColor:ColorPropType,
borderTopColor:ColorPropType,
borderRightColor:ColorPropType,
borderBottomColor:ColorPropType,
borderLeftColor:ColorPropType,
borderRadius:ReactPropTypes.number,
borderTopLeftRadius:ReactPropTypes.number,
borderTopRightRadius:ReactPropTypes.number,
borderBottomLeftRadius:ReactPropTypes.number,
borderBottomRightRadius:ReactPropTypes.number,
borderStyle:ReactPropTypes.oneOf(['solid','dotted','dashed']),
borderWidth:ReactPropTypes.number,
borderTopWidth:ReactPropTypes.number,
borderRightWidth:ReactPropTypes.number,
borderBottomWidth:ReactPropTypes.number,
borderLeftWidth:ReactPropTypes.number,
opacity:ReactPropTypes.number,







elevation:ReactPropTypes.number});


module.exports=ViewStylePropTypes;
}, 114, null, "ViewStylePropTypes");
__d(/* matricesDiffer */function(global, require, module, exports) {









'use strict';










var matricesDiffer=function matricesDiffer(one,two){
if(one===two){
return false;
}
return!one||!two||
one[12]!==two[12]||
one[13]!==two[13]||
one[14]!==two[14]||
one[5]!==two[5]||
one[10]!==two[10]||
one[1]!==two[1]||
one[2]!==two[2]||
one[3]!==two[3]||
one[4]!==two[4]||
one[6]!==two[6]||
one[7]!==two[7]||
one[8]!==two[8]||
one[9]!==two[9]||
one[11]!==two[11]||
one[15]!==two[15];
};

module.exports=matricesDiffer;
}, 115, null, "matricesDiffer");
__d(/* processTransform */function(global, require, module, exports) {










'use strict';

var MatrixMath=require(117 /* MatrixMath */);
var Platform=require(28 /* Platform */);

var invariant=require(26 /* fbjs/lib/invariant */);
var stringifySafe=require(50 /* stringifySafe */);









function processTransform(transform){
if(__DEV__){
_validateTransforms(transform);
}




if(Platform.OS==='android'){
return transform;
}

var result=MatrixMath.createIdentityMatrix();

transform.forEach(function(transformation){
var key=Object.keys(transformation)[0];
var value=transformation[key];

switch(key){
case'matrix':
MatrixMath.multiplyInto(result,result,value);
break;
case'perspective':
_multiplyTransform(result,MatrixMath.reusePerspectiveCommand,[value]);
break;
case'rotateX':
_multiplyTransform(result,MatrixMath.reuseRotateXCommand,[_convertToRadians(value)]);
break;
case'rotateY':
_multiplyTransform(result,MatrixMath.reuseRotateYCommand,[_convertToRadians(value)]);
break;
case'rotate':
case'rotateZ':
_multiplyTransform(result,MatrixMath.reuseRotateZCommand,[_convertToRadians(value)]);
break;
case'scale':
_multiplyTransform(result,MatrixMath.reuseScaleCommand,[value]);
break;
case'scaleX':
_multiplyTransform(result,MatrixMath.reuseScaleXCommand,[value]);
break;
case'scaleY':
_multiplyTransform(result,MatrixMath.reuseScaleYCommand,[value]);
break;
case'translate':
_multiplyTransform(result,MatrixMath.reuseTranslate3dCommand,[value[0],value[1],value[2]||0]);
break;
case'translateX':
_multiplyTransform(result,MatrixMath.reuseTranslate2dCommand,[value,0]);
break;
case'translateY':
_multiplyTransform(result,MatrixMath.reuseTranslate2dCommand,[0,value]);
break;
case'skewX':
_multiplyTransform(result,MatrixMath.reuseSkewXCommand,[_convertToRadians(value)]);
break;
case'skewY':
_multiplyTransform(result,MatrixMath.reuseSkewYCommand,[_convertToRadians(value)]);
break;
default:
throw new Error('Invalid transform name: '+key);}

});

return result;
}




function _multiplyTransform(
result,
matrixMathFunction,
args)
{
var matrixToApply=MatrixMath.createIdentityMatrix();
var argsWithIdentity=[matrixToApply].concat(args);
matrixMathFunction.apply(this,argsWithIdentity);
MatrixMath.multiplyInto(result,result,matrixToApply);
}





function _convertToRadians(value){
var floatValue=parseFloat(value,10);
return value.indexOf('rad')>-1?floatValue:floatValue*Math.PI/180;
}

function _validateTransforms(transform){
transform.forEach(function(transformation){
var key=Object.keys(transformation)[0];
var value=transformation[key];
_validateTransform(key,value,transformation);
});
}

function _validateTransform(key,value,transformation){
invariant(
!value.getValue,
'You passed an Animated.Value to a normal component. '+
'You need to wrap that component in an Animated. For example, '+
'replace <View /> by <Animated.View />.');


var multivalueTransforms=[
'matrix',
'translate'];

if(multivalueTransforms.indexOf(key)!==-1){
invariant(
Array.isArray(value),
'Transform with key of %s must have an array as the value: %s',
key,
stringifySafe(transformation));

}
switch(key){
case'matrix':
invariant(
value.length===9||value.length===16,
'Matrix transform must have a length of 9 (2d) or 16 (3d). '+
'Provided matrix has a length of %s: %s',
value.length,
stringifySafe(transformation));

break;
case'translate':
break;
case'rotateX':
case'rotateY':
case'rotateZ':
case'rotate':
case'skewX':
case'skewY':
invariant(
typeof value==='string',
'Transform with key of "%s" must be a string: %s',
key,
stringifySafe(transformation));

invariant(
value.indexOf('deg')>-1||value.indexOf('rad')>-1,
'Rotate transform must be expressed in degrees (deg) or radians '+
'(rad): %s',
stringifySafe(transformation));

break;
case'perspective':
invariant(
typeof value==='number',
'Transform with key of "%s" must be a number: %s',
key,
stringifySafe(transformation));

invariant(
value!==0,
'Transform with key of "%s" cannot be zero: %s',
key,
stringifySafe(transformation));

break;
default:
invariant(
typeof value==='number',
'Transform with key of "%s" must be a number: %s',
key,
stringifySafe(transformation));}


}

module.exports=processTransform;
}, 116, null, "processTransform");
__d(/* MatrixMath */function(global, require, module, exports) {






'use strict';

var invariant=require(26 /* fbjs/lib/invariant */);





var MatrixMath={
createIdentityMatrix:function createIdentityMatrix(){
return[
1,0,0,0,
0,1,0,0,
0,0,1,0,
0,0,0,1];

},

createCopy:function createCopy(m){
return[
m[0],m[1],m[2],m[3],
m[4],m[5],m[6],m[7],
m[8],m[9],m[10],m[11],
m[12],m[13],m[14],m[15]];

},

createOrthographic:function createOrthographic(left,right,bottom,top,near,far){
var a=2/(right-left);
var b=2/(top-bottom);
var c=-2/(far-near);

var tx=-(right+left)/(right-left);
var ty=-(top+bottom)/(top-bottom);
var tz=-(far+near)/(far-near);

return[
a,0,0,0,
0,b,0,0,
0,0,c,0,
tx,ty,tz,1];

},

createFrustum:function createFrustum(left,right,bottom,top,near,far){
var r_width=1/(right-left);
var r_height=1/(top-bottom);
var r_depth=1/(near-far);
var x=2*(near*r_width);
var y=2*(near*r_height);
var A=(right+left)*r_width;
var B=(top+bottom)*r_height;
var C=(far+near)*r_depth;
var D=2*(far*near*r_depth);
return[
x,0,0,0,
0,y,0,0,
A,B,C,-1,
0,0,D,0];

},







createPerspective:function createPerspective(fovInRadians,aspect,near,far){
var h=1/Math.tan(fovInRadians/2);
var r_depth=1/(near-far);
var C=(far+near)*r_depth;
var D=2*(far*near*r_depth);
return[
h/aspect,0,0,0,
0,h,0,0,
0,0,C,-1,
0,0,D,0];

},

createTranslate2d:function createTranslate2d(x,y){
var mat=MatrixMath.createIdentityMatrix();
MatrixMath.reuseTranslate2dCommand(mat,x,y);
return mat;
},

reuseTranslate2dCommand:function reuseTranslate2dCommand(matrixCommand,x,y){
matrixCommand[12]=x;
matrixCommand[13]=y;
},

reuseTranslate3dCommand:function reuseTranslate3dCommand(matrixCommand,x,y,z){
matrixCommand[12]=x;
matrixCommand[13]=y;
matrixCommand[14]=z;
},

createScale:function createScale(factor){
var mat=MatrixMath.createIdentityMatrix();
MatrixMath.reuseScaleCommand(mat,factor);
return mat;
},

reuseScaleCommand:function reuseScaleCommand(matrixCommand,factor){
matrixCommand[0]=factor;
matrixCommand[5]=factor;
},

reuseScale3dCommand:function reuseScale3dCommand(matrixCommand,x,y,z){
matrixCommand[0]=x;
matrixCommand[5]=y;
matrixCommand[10]=z;
},

reusePerspectiveCommand:function reusePerspectiveCommand(matrixCommand,p){
matrixCommand[11]=-1/p;
},

reuseScaleXCommand:function reuseScaleXCommand(matrixCommand,factor){
matrixCommand[0]=factor;
},

reuseScaleYCommand:function reuseScaleYCommand(matrixCommand,factor){
matrixCommand[5]=factor;
},

reuseScaleZCommand:function reuseScaleZCommand(matrixCommand,factor){
matrixCommand[10]=factor;
},

reuseRotateXCommand:function reuseRotateXCommand(matrixCommand,radians){
matrixCommand[5]=Math.cos(radians);
matrixCommand[6]=Math.sin(radians);
matrixCommand[9]=-Math.sin(radians);
matrixCommand[10]=Math.cos(radians);
},

reuseRotateYCommand:function reuseRotateYCommand(matrixCommand,amount){
matrixCommand[0]=Math.cos(amount);
matrixCommand[2]=-Math.sin(amount);
matrixCommand[8]=Math.sin(amount);
matrixCommand[10]=Math.cos(amount);
},


reuseRotateZCommand:function reuseRotateZCommand(matrixCommand,radians){
matrixCommand[0]=Math.cos(radians);
matrixCommand[1]=Math.sin(radians);
matrixCommand[4]=-Math.sin(radians);
matrixCommand[5]=Math.cos(radians);
},

createRotateZ:function createRotateZ(radians){
var mat=MatrixMath.createIdentityMatrix();
MatrixMath.reuseRotateZCommand(mat,radians);
return mat;
},

reuseSkewXCommand:function reuseSkewXCommand(matrixCommand,radians){
matrixCommand[4]=Math.sin(radians);
matrixCommand[5]=Math.cos(radians);
},

reuseSkewYCommand:function reuseSkewYCommand(matrixCommand,radians){
matrixCommand[0]=Math.cos(radians);
matrixCommand[1]=Math.sin(radians);
},

multiplyInto:function multiplyInto(out,a,b){
var a00=a[0],a01=a[1],a02=a[2],a03=a[3],
a10=a[4],a11=a[5],a12=a[6],a13=a[7],
a20=a[8],a21=a[9],a22=a[10],a23=a[11],
a30=a[12],a31=a[13],a32=a[14],a33=a[15];

var b0=b[0],b1=b[1],b2=b[2],b3=b[3];
out[0]=b0*a00+b1*a10+b2*a20+b3*a30;
out[1]=b0*a01+b1*a11+b2*a21+b3*a31;
out[2]=b0*a02+b1*a12+b2*a22+b3*a32;
out[3]=b0*a03+b1*a13+b2*a23+b3*a33;

b0=b[4];b1=b[5];b2=b[6];b3=b[7];
out[4]=b0*a00+b1*a10+b2*a20+b3*a30;
out[5]=b0*a01+b1*a11+b2*a21+b3*a31;
out[6]=b0*a02+b1*a12+b2*a22+b3*a32;
out[7]=b0*a03+b1*a13+b2*a23+b3*a33;

b0=b[8];b1=b[9];b2=b[10];b3=b[11];
out[8]=b0*a00+b1*a10+b2*a20+b3*a30;
out[9]=b0*a01+b1*a11+b2*a21+b3*a31;
out[10]=b0*a02+b1*a12+b2*a22+b3*a32;
out[11]=b0*a03+b1*a13+b2*a23+b3*a33;

b0=b[12];b1=b[13];b2=b[14];b3=b[15];
out[12]=b0*a00+b1*a10+b2*a20+b3*a30;
out[13]=b0*a01+b1*a11+b2*a21+b3*a31;
out[14]=b0*a02+b1*a12+b2*a22+b3*a32;
out[15]=b0*a03+b1*a13+b2*a23+b3*a33;
},

determinant:function determinant(matrix){var _matrix=babelHelpers.slicedToArray(





matrix,16),m00=_matrix[0],m01=_matrix[1],m02=_matrix[2],m03=_matrix[3],m10=_matrix[4],m11=_matrix[5],m12=_matrix[6],m13=_matrix[7],m20=_matrix[8],m21=_matrix[9],m22=_matrix[10],m23=_matrix[11],m30=_matrix[12],m31=_matrix[13],m32=_matrix[14],m33=_matrix[15];
return(
m03*m12*m21*m30-m02*m13*m21*m30-
m03*m11*m22*m30+m01*m13*m22*m30+
m02*m11*m23*m30-m01*m12*m23*m30-
m03*m12*m20*m31+m02*m13*m20*m31+
m03*m10*m22*m31-m00*m13*m22*m31-
m02*m10*m23*m31+m00*m12*m23*m31+
m03*m11*m20*m32-m01*m13*m20*m32-
m03*m10*m21*m32+m00*m13*m21*m32+
m01*m10*m23*m32-m00*m11*m23*m32-
m02*m11*m20*m33+m01*m12*m20*m33+
m02*m10*m21*m33-m00*m12*m21*m33-
m01*m10*m22*m33+m00*m11*m22*m33);

},








inverse:function inverse(matrix){
var det=MatrixMath.determinant(matrix);
if(!det){
return matrix;
}var _matrix2=babelHelpers.slicedToArray(





matrix,16),m00=_matrix2[0],m01=_matrix2[1],m02=_matrix2[2],m03=_matrix2[3],m10=_matrix2[4],m11=_matrix2[5],m12=_matrix2[6],m13=_matrix2[7],m20=_matrix2[8],m21=_matrix2[9],m22=_matrix2[10],m23=_matrix2[11],m30=_matrix2[12],m31=_matrix2[13],m32=_matrix2[14],m33=_matrix2[15];
return[
(m12*m23*m31-m13*m22*m31+m13*m21*m32-m11*m23*m32-m12*m21*m33+m11*m22*m33)/det,
(m03*m22*m31-m02*m23*m31-m03*m21*m32+m01*m23*m32+m02*m21*m33-m01*m22*m33)/det,
(m02*m13*m31-m03*m12*m31+m03*m11*m32-m01*m13*m32-m02*m11*m33+m01*m12*m33)/det,
(m03*m12*m21-m02*m13*m21-m03*m11*m22+m01*m13*m22+m02*m11*m23-m01*m12*m23)/det,
(m13*m22*m30-m12*m23*m30-m13*m20*m32+m10*m23*m32+m12*m20*m33-m10*m22*m33)/det,
(m02*m23*m30-m03*m22*m30+m03*m20*m32-m00*m23*m32-m02*m20*m33+m00*m22*m33)/det,
(m03*m12*m30-m02*m13*m30-m03*m10*m32+m00*m13*m32+m02*m10*m33-m00*m12*m33)/det,
(m02*m13*m20-m03*m12*m20+m03*m10*m22-m00*m13*m22-m02*m10*m23+m00*m12*m23)/det,
(m11*m23*m30-m13*m21*m30+m13*m20*m31-m10*m23*m31-m11*m20*m33+m10*m21*m33)/det,
(m03*m21*m30-m01*m23*m30-m03*m20*m31+m00*m23*m31+m01*m20*m33-m00*m21*m33)/det,
(m01*m13*m30-m03*m11*m30+m03*m10*m31-m00*m13*m31-m01*m10*m33+m00*m11*m33)/det,
(m03*m11*m20-m01*m13*m20-m03*m10*m21+m00*m13*m21+m01*m10*m23-m00*m11*m23)/det,
(m12*m21*m30-m11*m22*m30-m12*m20*m31+m10*m22*m31+m11*m20*m32-m10*m21*m32)/det,
(m01*m22*m30-m02*m21*m30+m02*m20*m31-m00*m22*m31-m01*m20*m32+m00*m21*m32)/det,
(m02*m11*m30-m01*m12*m30-m02*m10*m31+m00*m12*m31+m01*m10*m32-m00*m11*m32)/det,
(m01*m12*m20-m02*m11*m20+m02*m10*m21-m00*m12*m21-m01*m10*m22+m00*m11*m22)/det];

},




transpose:function transpose(m){
return[
m[0],m[4],m[8],m[12],
m[1],m[5],m[9],m[13],
m[2],m[6],m[10],m[14],
m[3],m[7],m[11],m[15]];

},




multiplyVectorByMatrix:function multiplyVectorByMatrix(
v,
m)
{var _v=babelHelpers.slicedToArray(
v,4),vx=_v[0],vy=_v[1],vz=_v[2],vw=_v[3];
return[
vx*m[0]+vy*m[4]+vz*m[8]+vw*m[12],
vx*m[1]+vy*m[5]+vz*m[9]+vw*m[13],
vx*m[2]+vy*m[6]+vz*m[10]+vw*m[14],
vx*m[3]+vy*m[7]+vz*m[11]+vw*m[15]];

},




v3Length:function v3Length(a){
return Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]);
},




v3Normalize:function v3Normalize(
vector,
v3Length)
{
var im=1/(v3Length||MatrixMath.v3Length(vector));
return[
vector[0]*im,
vector[1]*im,
vector[2]*im];

},





v3Dot:function v3Dot(a,b){
return a[0]*b[0]+
a[1]*b[1]+
a[2]*b[2];
},





v3Combine:function v3Combine(
a,
b,
aScale,
bScale)
{
return[
aScale*a[0]+bScale*b[0],
aScale*a[1]+bScale*b[1],
aScale*a[2]+bScale*b[2]];

},





v3Cross:function v3Cross(a,b){
return[
a[1]*b[2]-a[2]*b[1],
a[2]*b[0]-a[0]*b[2],
a[0]*b[1]-a[1]*b[0]];

},

















quaternionToDegreesXYZ:function quaternionToDegreesXYZ(q,matrix,row){var _q=babelHelpers.slicedToArray(
q,4),qx=_q[0],qy=_q[1],qz=_q[2],qw=_q[3];
var qw2=qw*qw;
var qx2=qx*qx;
var qy2=qy*qy;
var qz2=qz*qz;
var test=qx*qy+qz*qw;
var unit=qw2+qx2+qy2+qz2;
var conv=180/Math.PI;

if(test>0.49999*unit){
return[0,2*Math.atan2(qx,qw)*conv,90];
}
if(test<-0.49999*unit){
return[0,-2*Math.atan2(qx,qw)*conv,-90];
}

return[
MatrixMath.roundTo3Places(
Math.atan2(2*qx*qw-2*qy*qz,1-2*qx2-2*qz2)*conv),

MatrixMath.roundTo3Places(
Math.atan2(2*qy*qw-2*qx*qz,1-2*qy2-2*qz2)*conv),

MatrixMath.roundTo3Places(
Math.asin(2*qx*qy+2*qz*qw)*conv)];


},





roundTo3Places:function roundTo3Places(n){
var arr=n.toString().split('e');
return Math.round(arr[0]+'e'+(arr[1]?+arr[1]-3:3))*0.001;
},












decomposeMatrix:function decomposeMatrix(transformMatrix){

invariant(
transformMatrix.length===16,
'Matrix decomposition needs a list of 3d matrix values, received %s',
transformMatrix);



var perspective=[];
var quaternion=[];
var scale=[];
var skew=[];
var translation=[];



if(!transformMatrix[15]){
return;
}
var matrix=[];
var perspectiveMatrix=[];
for(var i=0;i<4;i++){
matrix.push([]);
for(var j=0;j<4;j++){
var value=transformMatrix[i*4+j]/transformMatrix[15];
matrix[i].push(value);
perspectiveMatrix.push(j===3?0:value);
}
}
perspectiveMatrix[15]=1;


if(!MatrixMath.determinant(perspectiveMatrix)){
return;
}


if(matrix[0][3]!==0||matrix[1][3]!==0||matrix[2][3]!==0){


var rightHandSide=[
matrix[0][3],
matrix[1][3],
matrix[2][3],
matrix[3][3]];




var inversePerspectiveMatrix=MatrixMath.inverse(
perspectiveMatrix);

var transposedInversePerspectiveMatrix=MatrixMath.transpose(
inversePerspectiveMatrix);

var perspective=MatrixMath.multiplyVectorByMatrix(
rightHandSide,
transposedInversePerspectiveMatrix);

}else{

perspective[0]=perspective[1]=perspective[2]=0;
perspective[3]=1;
}


for(var i=0;i<3;i++){
translation[i]=matrix[3][i];
}



var row=[];
for(i=0;i<3;i++){
row[i]=[
matrix[i][0],
matrix[i][1],
matrix[i][2]];

}


scale[0]=MatrixMath.v3Length(row[0]);
row[0]=MatrixMath.v3Normalize(row[0],scale[0]);


skew[0]=MatrixMath.v3Dot(row[0],row[1]);
row[1]=MatrixMath.v3Combine(row[1],row[0],1.0,-skew[0]);


skew[0]=MatrixMath.v3Dot(row[0],row[1]);
row[1]=MatrixMath.v3Combine(row[1],row[0],1.0,-skew[0]);


scale[1]=MatrixMath.v3Length(row[1]);
row[1]=MatrixMath.v3Normalize(row[1],scale[1]);
skew[0]/=scale[1];


skew[1]=MatrixMath.v3Dot(row[0],row[2]);
row[2]=MatrixMath.v3Combine(row[2],row[0],1.0,-skew[1]);
skew[2]=MatrixMath.v3Dot(row[1],row[2]);
row[2]=MatrixMath.v3Combine(row[2],row[1],1.0,-skew[2]);


scale[2]=MatrixMath.v3Length(row[2]);
row[2]=MatrixMath.v3Normalize(row[2],scale[2]);
skew[1]/=scale[2];
skew[2]/=scale[2];




var pdum3=MatrixMath.v3Cross(row[1],row[2]);
if(MatrixMath.v3Dot(row[0],pdum3)<0){
for(i=0;i<3;i++){
scale[i]*=-1;
row[i][0]*=-1;
row[i][1]*=-1;
row[i][2]*=-1;
}
}


quaternion[0]=
0.5*Math.sqrt(Math.max(1+row[0][0]-row[1][1]-row[2][2],0));
quaternion[1]=
0.5*Math.sqrt(Math.max(1-row[0][0]+row[1][1]-row[2][2],0));
quaternion[2]=
0.5*Math.sqrt(Math.max(1-row[0][0]-row[1][1]+row[2][2],0));
quaternion[3]=
0.5*Math.sqrt(Math.max(1+row[0][0]+row[1][1]+row[2][2],0));

if(row[2][1]>row[1][2]){
quaternion[0]=-quaternion[0];
}
if(row[0][2]>row[2][0]){
quaternion[1]=-quaternion[1];
}
if(row[1][0]>row[0][1]){
quaternion[2]=-quaternion[2];
}


var rotationDegrees;
if(
quaternion[0]<0.001&&quaternion[0]>=0&&
quaternion[1]<0.001&&quaternion[1]>=0)
{

rotationDegrees=[0,0,MatrixMath.roundTo3Places(
Math.atan2(row[0][1],row[0][0])*180/Math.PI)];

}else{
rotationDegrees=MatrixMath.quaternionToDegreesXYZ(quaternion,matrix,row);
}


return{
rotationDegrees:rotationDegrees,
perspective:perspective,
quaternion:quaternion,
scale:scale,
skew:skew,
translation:translation,

rotate:rotationDegrees[2],
rotateX:rotationDegrees[0],
rotateY:rotationDegrees[1],
scaleX:scale[0],
scaleY:scale[1],
translateX:translation[0],
translateY:translation[1]};

}};



module.exports=MatrixMath;
}, 117, null, "MatrixMath");
__d(/* sizesDiffer */function(global, require, module, exports) {




'use strict';

var dummySize={width:undefined,height:undefined};

var sizesDiffer=function sizesDiffer(one,two){
one=one||dummySize;
two=two||dummySize;
return one!==two&&(
one.width!==two.width||
one.height!==two.height);

};

module.exports=sizesDiffer;
}, 118, null, "sizesDiffer");
__d(/* StyleSheetValidation */function(global, require, module, exports) {










'use strict';

var ImageStylePropTypes=require(105 /* ImageStylePropTypes */);
var ReactPropTypeLocations=require(112 /* react/lib/ReactPropTypeLocations */);
var ReactPropTypesSecret=require(97 /* react/lib/ReactPropTypesSecret */);
var TextStylePropTypes=require(113 /* TextStylePropTypes */);
var ViewStylePropTypes=require(114 /* ViewStylePropTypes */);

var invariant=require(26 /* fbjs/lib/invariant */);var

StyleSheetValidation=function(){function StyleSheetValidation(){babelHelpers.classCallCheck(this,StyleSheetValidation);}babelHelpers.createClass(StyleSheetValidation,null,[{key:'validateStyleProp',value:function validateStyleProp(
prop,style,caller){
if(!__DEV__){
return;
}
if(allStylePropTypes[prop]===undefined){
var message1='"'+prop+'" is not a valid style property.';
var message2='\nValid style props: '+
JSON.stringify(Object.keys(allStylePropTypes).sort(),null,'  ');
styleError(message1,style,caller,message2);
}
var error=allStylePropTypes[prop](
style,
prop,
caller,
ReactPropTypeLocations.prop,
null,
ReactPropTypesSecret);

if(error){
styleError(error.message,style,caller);
}
}},{key:'validateStyle',value:function validateStyle(

name,styles){
if(!__DEV__){
return;
}
for(var prop in styles[name]){
StyleSheetValidation.validateStyleProp(prop,styles[name],'StyleSheet '+name);
}
}},{key:'addValidStylePropTypes',value:function addValidStylePropTypes(

stylePropTypes){
for(var key in stylePropTypes){
allStylePropTypes[key]=stylePropTypes[key];
}
}}]);return StyleSheetValidation;}();


var styleError=function styleError(message1,style,caller,message2){
invariant(
false,
message1+'\n'+(caller||'<<unknown>>')+': '+
JSON.stringify(style,null,'  ')+(message2||''));

};

var allStylePropTypes={};

StyleSheetValidation.addValidStylePropTypes(ImageStylePropTypes);
StyleSheetValidation.addValidStylePropTypes(TextStylePropTypes);
StyleSheetValidation.addValidStylePropTypes(ViewStylePropTypes);

module.exports=StyleSheetValidation;
}, 119, null, "StyleSheetValidation");
__d(/* View */function(global, require, module, exports) {










'use strict';

var EdgeInsetsPropType=require(121 /* EdgeInsetsPropType */);
var NativeMethodsMixin=require(21 /* NativeMethodsMixin */);
var NativeModules=require(29 /* NativeModules */);
var React=require(78 /* React */);
var ReactNativeStyleAttributes=require(104 /* ReactNativeStyleAttributes */);
var ReactNativeViewAttributes=require(126 /* ReactNativeViewAttributes */);
var StyleSheetPropType=require(127 /* StyleSheetPropType */);
var ViewStylePropTypes=require(114 /* ViewStylePropTypes */);

var requireNativeComponent=require(128 /* requireNativeComponent */);

var PropTypes=React.PropTypes;

var stylePropType=StyleSheetPropType(ViewStylePropTypes);

var AccessibilityTraits=[
'none',
'button',
'link',
'header',
'search',
'image',
'selected',
'plays',
'key',
'text',
'summary',
'disabled',
'frequentUpdates',
'startsMedia',
'adjustable',
'allowsDirectInteraction',
'pageTurn'];


var AccessibilityComponentType=[
'none',
'button',
'radiobutton_checked',
'radiobutton_unchecked'];


var forceTouchAvailable=NativeModules.IOSConstants&&
NativeModules.IOSConstants.forceTouchAvailable||false;

var statics={
AccessibilityTraits:AccessibilityTraits,
AccessibilityComponentType:AccessibilityComponentType,




forceTouchAvailable:forceTouchAvailable};
















































var View=React.createClass({displayName:'View',




mixins:[NativeMethodsMixin],





viewConfig:{
uiViewClassName:'RCTView',
validAttributes:ReactNativeViewAttributes.RCTView},


statics:babelHelpers.extends({},
statics),


propTypes:{




accessible:PropTypes.bool,






accessibilityLabel:PropTypes.node,














accessibilityComponentType:PropTypes.oneOf(AccessibilityComponentType),















accessibilityLiveRegion:PropTypes.oneOf([
'none',
'polite',
'assertive']),





















importantForAccessibility:PropTypes.oneOf([
'auto',
'yes',
'no',
'no-hide-descendants']),

































accessibilityTraits:PropTypes.oneOfType([
PropTypes.oneOf(AccessibilityTraits),
PropTypes.arrayOf(PropTypes.oneOf(AccessibilityTraits))]),






onAccessibilityTap:PropTypes.func,





onMagicTap:PropTypes.func,






testID:PropTypes.string,














onResponderGrant:PropTypes.func,







onResponderMove:PropTypes.func,








onResponderReject:PropTypes.func,







onResponderRelease:PropTypes.func,









onResponderTerminate:PropTypes.func,








onResponderTerminationRequest:PropTypes.func,







onStartShouldSetResponder:PropTypes.func,








onStartShouldSetResponderCapture:PropTypes.func,








onMoveShouldSetResponder:PropTypes.func,








onMoveShouldSetResponderCapture:PropTypes.func,













hitSlop:EdgeInsetsPropType,










onLayout:PropTypes.func,


































pointerEvents:PropTypes.oneOf([
'box-none',
'none',
'box-only',
'auto']),

style:stylePropType,









removeClippedSubviews:PropTypes.bool,















renderToHardwareTextureAndroid:PropTypes.bool,















shouldRasterizeIOS:PropTypes.bool,









collapsable:PropTypes.bool,






















needsOffscreenAlphaCompositing:PropTypes.bool},


render:function render(){




return React.createElement(RCTView,this.props);
}});


var RCTView=requireNativeComponent('RCTView',View,{
nativeOnly:{
nativeBackgroundAndroid:true,
nativeForegroundAndroid:true}});



if(__DEV__){
var UIManager=require(75 /* UIManager */);
var viewConfig=UIManager.viewConfigs&&UIManager.viewConfigs.RCTView||{};
for(var prop in viewConfig.nativeProps){
var viewAny=View;
if(!viewAny.propTypes[prop]&&!ReactNativeStyleAttributes[prop]){
throw new Error(
'View is missing propType for native prop `'+prop+'`');

}
}
}

var ViewToExport=RCTView;
if(__DEV__){
ViewToExport=View;
}else{
babelHelpers.extends(RCTView,statics);
}

module.exports=ViewToExport;
}, 120, null, "View");
__d(/* EdgeInsetsPropType */function(global, require, module, exports) {










'use strict';var _require=

require(78 /* React */),PropTypes=_require.PropTypes;

var createStrictShapeTypeChecker=require(122 /* createStrictShapeTypeChecker */);

var EdgeInsetsPropType=createStrictShapeTypeChecker({
top:PropTypes.number,
left:PropTypes.number,
bottom:PropTypes.number,
right:PropTypes.number});


module.exports=EdgeInsetsPropType;
}, 121, null, "EdgeInsetsPropType");
__d(/* createStrictShapeTypeChecker */function(global, require, module, exports) {










'use strict';

var ReactPropTypeLocationNames=require(19 /* react/lib/ReactPropTypeLocationNames */);
var ReactPropTypesSecret=require(97 /* react/lib/ReactPropTypesSecret */);

var invariant=require(26 /* fbjs/lib/invariant */);
var merge=require(123 /* merge */);

function createStrictShapeTypeChecker(
shapeTypes)
{
function checkType(isRequired,props,propName,componentName,location){
if(!props[propName]){
if(isRequired){
invariant(
false,
'Required object `'+propName+'` was not specified in '+('`'+
componentName+'`.'));

}
return;
}
var propValue=props[propName];
var propType=typeof propValue;
var locationName=
location&&ReactPropTypeLocationNames[location]||'(unknown)';
if(propType!=='object'){
invariant(
false,
'Invalid '+locationName+' `'+propName+'` of type `'+propType+'` '+('supplied to `'+
componentName+'`, expected `object`.'));

}


var allKeys=merge(props[propName],shapeTypes);
for(var key in allKeys){
var checker=shapeTypes[key];
if(!checker){
invariant(
false,
'Invalid props.'+propName+' key `'+key+'` supplied to `'+componentName+'`.'+'\nBad object: '+
JSON.stringify(props[propName],null,'  ')+'\nValid keys: '+
JSON.stringify(Object.keys(shapeTypes),null,'  '));

}
var error=checker(propValue,key,componentName,location,null,ReactPropTypesSecret);
if(error){
invariant(
false,
error.message+'\nBad object: '+
JSON.stringify(props[propName],null,'  '));

}
}
}
function chainedCheckType(
props,
propName,
componentName,
location)
{
return checkType(false,props,propName,componentName,location);
}
chainedCheckType.isRequired=checkType.bind(null,true);
return chainedCheckType;
}

module.exports=createStrictShapeTypeChecker;
}, 122, null, "createStrictShapeTypeChecker");
__d(/* merge */function(global, require, module, exports) {






























"use strict";

var mergeInto=require(124 /* mergeInto */);








var merge=function merge(one,two){
var result={};
mergeInto(result,one);
mergeInto(result,two);
return result;
};

module.exports=merge;
}, 123, null, "merge");
__d(/* mergeInto */function(global, require, module, exports) {































"use strict";

var mergeHelpers=require(125 /* mergeHelpers */);

var checkMergeObjectArg=mergeHelpers.checkMergeObjectArg;
var checkMergeIntoObjectArg=mergeHelpers.checkMergeIntoObjectArg;







function mergeInto(one,two){
checkMergeIntoObjectArg(one);
if(two!=null){
checkMergeObjectArg(two);
for(var key in two){
if(!two.hasOwnProperty(key)){
continue;
}
one[key]=two[key];
}
}
}

module.exports=mergeInto;
}, 124, null, "mergeInto");
__d(/* mergeHelpers */function(global, require, module, exports) {
































"use strict";

var invariant=require(26 /* fbjs/lib/invariant */);
var keyMirror=require(107 /* fbjs/lib/keyMirror */);





var MAX_MERGE_DEPTH=36;







var isTerminal=function isTerminal(o){
return typeof o!=='object'||o===null;
};

var mergeHelpers={

MAX_MERGE_DEPTH:MAX_MERGE_DEPTH,

isTerminal:isTerminal,







normalizeMergeArg:function normalizeMergeArg(arg){
return arg===undefined||arg===null?{}:arg;
},









checkMergeArrayArgs:function checkMergeArrayArgs(one,two){
invariant(
Array.isArray(one)&&Array.isArray(two),
'Tried to merge arrays, instead got %s and %s.',
one,
two);

},





checkMergeObjectArgs:function checkMergeObjectArgs(one,two){
mergeHelpers.checkMergeObjectArg(one);
mergeHelpers.checkMergeObjectArg(two);
},




checkMergeObjectArg:function checkMergeObjectArg(arg){
invariant(
!isTerminal(arg)&&!Array.isArray(arg),
'Tried to merge an object, instead got %s.',
arg);

},




checkMergeIntoObjectArg:function checkMergeIntoObjectArg(arg){
invariant(
(!isTerminal(arg)||typeof arg==='function')&&!Array.isArray(arg),
'Tried to merge into an object, instead got %s.',
arg);

},







checkMergeLevel:function checkMergeLevel(level){
invariant(
level<MAX_MERGE_DEPTH,
'Maximum deep merge depth exceeded. You may be attempting to merge '+
'circular structures in an unsupported way.');

},






checkArrayStrategy:function checkArrayStrategy(strategy){
invariant(
strategy===undefined||strategy in mergeHelpers.ArrayStrategies,
'You must provide an array strategy to deep merge functions to '+
'instruct the deep merge how to resolve merging two arrays.');

},








ArrayStrategies:keyMirror({
Clobber:true,
IndexByIndex:true})};




module.exports=mergeHelpers;
}, 125, null, "mergeHelpers");
__d(/* ReactNativeViewAttributes */function(global, require, module, exports) {










'use strict';

var ReactNativeStyleAttributes=require(104 /* ReactNativeStyleAttributes */);

var ReactNativeViewAttributes={};

ReactNativeViewAttributes.UIView={
pointerEvents:true,
accessible:true,
accessibilityLabel:true,
accessibilityComponentType:true,
accessibilityLiveRegion:true,
accessibilityTraits:true,
importantForAccessibility:true,
testID:true,
renderToHardwareTextureAndroid:true,
shouldRasterizeIOS:true,
onLayout:true,
onAccessibilityTap:true,
onMagicTap:true,
collapsable:true,
needsOffscreenAlphaCompositing:true,
style:ReactNativeStyleAttributes};


ReactNativeViewAttributes.RCTView=babelHelpers.extends({},
ReactNativeViewAttributes.UIView,{






removeClippedSubviews:true});


module.exports=ReactNativeViewAttributes;
}, 126, null, "ReactNativeViewAttributes");
__d(/* StyleSheetPropType */function(global, require, module, exports) {










'use strict';

var createStrictShapeTypeChecker=require(122 /* createStrictShapeTypeChecker */);
var flattenStyle=require(25 /* flattenStyle */);

function StyleSheetPropType(
shape)
{
var shapePropType=createStrictShapeTypeChecker(shape);
return function(props,propName,componentName,location){
var newProps=props;
if(props[propName]){

newProps={};
newProps[propName]=flattenStyle(props[propName]);
}
return shapePropType(newProps,propName,componentName,location);
};
}

module.exports=StyleSheetPropType;
}, 127, null, "StyleSheetPropType");
__d(/* requireNativeComponent */function(global, require, module, exports) {










'use strict';

var ReactNativeStyleAttributes=require(104 /* ReactNativeStyleAttributes */);
var UIManager=require(75 /* UIManager */);
var UnimplementedView=require(129 /* UnimplementedView */);

var createReactNativeComponentClass=require(130 /* createReactNativeComponentClass */);
var insetsDiffer=require(169 /* insetsDiffer */);
var matricesDiffer=require(115 /* matricesDiffer */);
var pointsDiffer=require(170 /* pointsDiffer */);
var processColor=require(73 /* processColor */);
var resolveAssetSource=require(171 /* resolveAssetSource */);
var sizesDiffer=require(118 /* sizesDiffer */);
var verifyPropTypes=require(175 /* verifyPropTypes */);
var warning=require(15 /* fbjs/lib/warning */);


















function requireNativeComponent(
viewName,
componentInterface,
extraConfig)
{
var viewConfig=UIManager[viewName];
if(!viewConfig||!viewConfig.NativeProps){
warning(false,'Native component for "%s" does not exist',viewName);
return UnimplementedView;
}

viewConfig.uiViewClassName=viewName;
viewConfig.validAttributes={};
viewConfig.propTypes=componentInterface&&componentInterface.propTypes;




var nativeProps=babelHelpers.extends({},
UIManager.RCTView.NativeProps,
viewConfig.NativeProps);

for(var key in nativeProps){
var useAttribute=false;
var attribute={};

var differ=TypeToDifferMap[nativeProps[key]];
if(differ){
attribute.diff=differ;
useAttribute=true;
}

var processor=TypeToProcessorMap[nativeProps[key]];
if(processor){
attribute.process=processor;
useAttribute=true;
}

viewConfig.validAttributes[key]=useAttribute?attribute:true;
}






viewConfig.validAttributes.style=ReactNativeStyleAttributes;

if(__DEV__){
componentInterface&&verifyPropTypes(
componentInterface,
viewConfig,
extraConfig&&extraConfig.nativeOnly);

}

return createReactNativeComponentClass(viewConfig);
}

var TypeToDifferMap={

CATransform3D:matricesDiffer,
CGPoint:pointsDiffer,
CGSize:sizesDiffer,
UIEdgeInsets:insetsDiffer};




function processColorArray(colors){
return colors&&colors.map(processColor);
}

var TypeToProcessorMap={

CGColor:processColor,
CGColorArray:processColorArray,
UIColor:processColor,
UIColorArray:processColorArray,
CGImage:resolveAssetSource,
UIImage:resolveAssetSource,
RCTImageSource:resolveAssetSource,

Color:processColor,
ColorArray:processColorArray};


module.exports=requireNativeComponent;
}, 128, null, "requireNativeComponent");
__d(/* UnimplementedView */function(global, require, module, exports) {






'use strict';

var React=require(78 /* React */);
var StyleSheet=require(101 /* StyleSheet */);var

UnimplementedView=function(_React$Component){babelHelpers.inherits(UnimplementedView,_React$Component);function UnimplementedView(){var _ref;var _temp,_this,_ret;babelHelpers.classCallCheck(this,UnimplementedView);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=babelHelpers.possibleConstructorReturn(this,(_ref=UnimplementedView.__proto__||Object.getPrototypeOf(UnimplementedView)).call.apply(_ref,[this].concat(args))),_this),_this.
setNativeProps=function(){



},_temp),babelHelpers.possibleConstructorReturn(_this,_ret);}babelHelpers.createClass(UnimplementedView,[{key:'render',value:function render()

{

var View=require(120 /* View */);
return(
React.createElement(View,{style:[styles.unimplementedView,this.props.style]},
this.props.children));


}}]);return UnimplementedView;}(React.Component);


var styles=StyleSheet.create({
unimplementedView:{
borderWidth:1,
borderColor:'red',
alignSelf:'flex-start'}});



module.exports=UnimplementedView;
}, 129, null, "UnimplementedView");
__d(/* createReactNativeComponentClass */function(global, require, module, exports) {











'use strict';

var ReactNativeBaseComponent=require(131 /* ReactNativeBaseComponent */);












var createReactNativeComponentClass=function createReactNativeComponentClass(
viewConfig)
{
var Constructor=function Constructor(element){
this._currentElement=element;
this._topLevelWrapper=null;
this._hostParent=null;
this._hostContainerInfo=null;
this._rootNodeID=0;
this._renderedChildren=null;
};
Constructor.displayName=viewConfig.uiViewClassName;
Constructor.viewConfig=viewConfig;
Constructor.propTypes=viewConfig.propTypes;
Constructor.prototype=new ReactNativeBaseComponent(viewConfig);
Constructor.prototype.constructor=Constructor;

return Constructor;
};

module.exports=createReactNativeComponentClass;
}, 130, null, "createReactNativeComponentClass");
__d(/* ReactNativeBaseComponent */function(global, require, module, exports) {










'use strict';

var NativeMethodsMixin=require(21 /* NativeMethodsMixin */);
var ReactNativeAttributePayload=require(22 /* ReactNativeAttributePayload */);
var ReactNativeComponentTree=require(132 /* ReactNativeComponentTree */);
var ReactNativeEventEmitter=require(133 /* ReactNativeEventEmitter */);
var ReactNativeTagHandles=require(141 /* ReactNativeTagHandles */);
var ReactMultiChild=require(151 /* ReactMultiChild */);
var UIManager=require(75 /* UIManager */);

var deepFreezeAndThrowOnMutationInDev=require(49 /* deepFreezeAndThrowOnMutationInDev */);

var registrationNames=ReactNativeEventEmitter.registrationNames;
var putListener=ReactNativeEventEmitter.putListener;
var deleteListener=ReactNativeEventEmitter.deleteListener;
var deleteAllListeners=ReactNativeEventEmitter.deleteAllListeners;














var ReactNativeBaseComponent=function ReactNativeBaseComponent(
viewConfig)
{
this.viewConfig=viewConfig;
};





ReactNativeBaseComponent.Mixin={
getPublicInstance:function getPublicInstance(){

return this;
},

unmountComponent:function unmountComponent(){
ReactNativeComponentTree.uncacheNode(this);
deleteAllListeners(this);
this.unmountChildren();
this._rootNodeID=0;
},









initializeChildren:function initializeChildren(children,containerTag,transaction,context){
var mountImages=this.mountChildren(children,transaction,context);



if(mountImages.length){



var createdTags=[];
for(var i=0,l=mountImages.length;i<l;i++){
var mountImage=mountImages[i];
var childTag=mountImage;
createdTags[i]=childTag;
}
UIManager.setChildren(containerTag,createdTags);
}
},









receiveComponent:function receiveComponent(nextElement,transaction,context){
var prevElement=this._currentElement;
this._currentElement=nextElement;

if(__DEV__){
for(var key in this.viewConfig.validAttributes){
if(nextElement.props.hasOwnProperty(key)){
deepFreezeAndThrowOnMutationInDev(nextElement.props[key]);
}
}
}

var updatePayload=ReactNativeAttributePayload.diff(
prevElement.props,
nextElement.props,
this.viewConfig.validAttributes);


if(updatePayload){
UIManager.updateView(
this._rootNodeID,
this.viewConfig.uiViewClassName,
updatePayload);

}

this._reconcileListenersUponUpdate(
prevElement.props,
nextElement.props);

this.updateChildren(nextElement.props.children,transaction,context);
},




_registerListenersUponCreation:function _registerListenersUponCreation(initialProps){
for(var key in initialProps){


if(registrationNames[key]&&initialProps[key]){
var listener=initialProps[key];
putListener(this,key,listener);
}
}
},






_reconcileListenersUponUpdate:function _reconcileListenersUponUpdate(prevProps,nextProps){
for(var key in nextProps){
if(registrationNames[key]&&nextProps[key]!==prevProps[key]){
if(nextProps[key]){
putListener(this,key,nextProps[key]);
}else{
deleteListener(this,key);
}
}
}
},






getHostNode:function getHostNode(){
return this._rootNodeID;
},








mountComponent:function mountComponent(transaction,hostParent,hostContainerInfo,context){
var tag=ReactNativeTagHandles.allocateTag();

this._rootNodeID=tag;
this._hostParent=hostParent;
this._hostContainerInfo=hostContainerInfo;

if(__DEV__){
for(var key in this.viewConfig.validAttributes){
if(this._currentElement.props.hasOwnProperty(key)){
deepFreezeAndThrowOnMutationInDev(this._currentElement.props[key]);
}
}
}

var updatePayload=ReactNativeAttributePayload.create(
this._currentElement.props,
this.viewConfig.validAttributes);


var nativeTopRootTag=hostContainerInfo._tag;
UIManager.createView(
tag,
this.viewConfig.uiViewClassName,
nativeTopRootTag,
updatePayload);


ReactNativeComponentTree.precacheNode(this,tag);

this._registerListenersUponCreation(this._currentElement.props);
this.initializeChildren(
this._currentElement.props.children,
tag,
transaction,
context);

return tag;
}};






babelHelpers.extends(
ReactNativeBaseComponent.prototype,
ReactMultiChild,
ReactNativeBaseComponent.Mixin,
NativeMethodsMixin);


module.exports=ReactNativeBaseComponent;
}, 131, null, "ReactNativeBaseComponent");
__d(/* ReactNativeComponentTree */function(global, require, module, exports) {










'use strict';

var invariant=require(26 /* fbjs/lib/invariant */);

var instanceCache={};








function getRenderedHostOrTextFromComponent(component){
var rendered;
while(rendered=component._renderedComponent){
component=rendered;
}
return component;
}





function precacheNode(inst,tag){
var nativeInst=getRenderedHostOrTextFromComponent(inst);
instanceCache[tag]=nativeInst;
}

function uncacheNode(inst){
var tag=inst._rootNodeID;
if(tag){
delete instanceCache[tag];
}
}

function getInstanceFromTag(tag){
return instanceCache[tag]||null;
}

function getTagFromInstance(inst){
invariant(inst._rootNodeID,'All native instances should have a tag.');
return inst._rootNodeID;
}

var ReactNativeComponentTree={
getClosestInstanceFromNode:getInstanceFromTag,
getInstanceFromNode:getInstanceFromTag,
getNodeFromInstance:getTagFromInstance,
precacheNode:precacheNode,
uncacheNode:uncacheNode};


module.exports=ReactNativeComponentTree;
}, 132, null, "ReactNativeComponentTree");
__d(/* ReactNativeEventEmitter */function(global, require, module, exports) {










'use strict';

var EventPluginHub=require(134 /* EventPluginHub */);
var EventPluginRegistry=require(135 /* EventPluginRegistry */);
var ReactEventEmitterMixin=require(140 /* ReactEventEmitterMixin */);
var ReactNativeComponentTree=require(132 /* ReactNativeComponentTree */);
var ReactNativeTagHandles=require(141 /* ReactNativeTagHandles */);
var ReactUpdates=require(142 /* ReactUpdates */);

var warning=require(15 /* fbjs/lib/warning */);







var EMPTY_NATIVE_EVENT={};








var touchSubsequence=function touchSubsequence(touches,indices){
var ret=[];
for(var i=0;i<indices.length;i++){
ret.push(touches[indices[i]]);
}
return ret;
};












var removeTouchesAtIndices=function removeTouchesAtIndices(
touches,
indices)
{
var rippedOut=[];


var temp=touches;
for(var i=0;i<indices.length;i++){
var index=indices[i];
rippedOut.push(touches[index]);
temp[index]=null;
}
var fillAt=0;
for(var j=0;j<temp.length;j++){
var cur=temp[j];
if(cur!==null){
temp[fillAt++]=cur;
}
}
temp.length=fillAt;
return rippedOut;
};










var ReactNativeEventEmitter=babelHelpers.extends({},

ReactEventEmitterMixin,{

registrationNames:EventPluginRegistry.registrationNameModules,

putListener:EventPluginHub.putListener,

getListener:EventPluginHub.getListener,

deleteListener:EventPluginHub.deleteListener,

deleteAllListeners:EventPluginHub.deleteAllListeners,











_receiveRootNodeIDEvent:function _receiveRootNodeIDEvent(
rootNodeID,
topLevelType,
nativeEventParam)
{
var nativeEvent=nativeEventParam||EMPTY_NATIVE_EVENT;
var inst=ReactNativeComponentTree.getInstanceFromNode(rootNodeID);
if(!inst){


return;
}
ReactUpdates.batchedUpdates(function(){
ReactNativeEventEmitter.handleTopLevel(
topLevelType,
inst,
nativeEvent,
nativeEvent.target);

});
},








receiveEvent:function receiveEvent(
tag,
topLevelType,
nativeEventParam)
{
var rootNodeID=tag;
ReactNativeEventEmitter._receiveRootNodeIDEvent(
rootNodeID,
topLevelType,
nativeEventParam);

},

























receiveTouches:function receiveTouches(
eventTopLevelType,
touches,
changedIndices)
{
var changedTouches=
eventTopLevelType==='topTouchEnd'||
eventTopLevelType==='topTouchCancel'?
removeTouchesAtIndices(touches,changedIndices):
touchSubsequence(touches,changedIndices);

for(var jj=0;jj<changedTouches.length;jj++){
var touch=changedTouches[jj];


touch.changedTouches=changedTouches;
touch.touches=touches;
var nativeEvent=touch;
var rootNodeID=null;
var target=nativeEvent.target;
if(target!==null&&target!==undefined){
if(target<ReactNativeTagHandles.tagsStartAt){
if(__DEV__){
warning(
false,
'A view is reporting that a touch occured on tag zero.');

}
}else{
rootNodeID=target;
}
}
ReactNativeEventEmitter._receiveRootNodeIDEvent(
rootNodeID,
eventTopLevelType,
nativeEvent);

}
}});


module.exports=ReactNativeEventEmitter;
}, 133, null, "ReactNativeEventEmitter");
__d(/* EventPluginHub */function(global, require, module, exports) {










'use strict';

var EventPluginRegistry=require(135 /* EventPluginRegistry */);
var EventPluginUtils=require(136 /* EventPluginUtils */);
var ReactErrorUtils=require(137 /* ReactErrorUtils */);

var accumulateInto=require(138 /* accumulateInto */);
var forEachAccumulated=require(139 /* forEachAccumulated */);
var invariant=require(26 /* fbjs/lib/invariant */);




var listenerBank={};





var eventQueue=null;








var executeDispatchesAndRelease=function executeDispatchesAndRelease(event,simulated){
if(event){
EventPluginUtils.executeDispatchesInOrder(event,simulated);

if(!event.isPersistent()){
event.constructor.release(event);
}
}
};
var executeDispatchesAndReleaseSimulated=function executeDispatchesAndReleaseSimulated(e){
return executeDispatchesAndRelease(e,true);
};
var executeDispatchesAndReleaseTopLevel=function executeDispatchesAndReleaseTopLevel(e){
return executeDispatchesAndRelease(e,false);
};

var getDictionaryKey=function getDictionaryKey(inst){


return'.'+inst._rootNodeID;
};























var EventPluginHub={




injection:{





injectEventPluginOrder:EventPluginRegistry.injectEventPluginOrder,




injectEventPluginsByName:EventPluginRegistry.injectEventPluginsByName},










putListener:function putListener(inst,registrationName,listener){
invariant(
typeof listener==='function',
'Expected %s listener to be a function, instead got type %s',
registrationName,typeof listener);


var key=getDictionaryKey(inst);
var bankForRegistrationName=
listenerBank[registrationName]||(listenerBank[registrationName]={});
bankForRegistrationName[key]=listener;

var PluginModule=
EventPluginRegistry.registrationNameModules[registrationName];
if(PluginModule&&PluginModule.didPutListener){
PluginModule.didPutListener(inst,registrationName,listener);
}
},






getListener:function getListener(inst,registrationName){
var bankForRegistrationName=listenerBank[registrationName];
var key=getDictionaryKey(inst);
return bankForRegistrationName&&bankForRegistrationName[key];
},







deleteListener:function deleteListener(inst,registrationName){
var PluginModule=
EventPluginRegistry.registrationNameModules[registrationName];
if(PluginModule&&PluginModule.willDeleteListener){
PluginModule.willDeleteListener(inst,registrationName);
}

var bankForRegistrationName=listenerBank[registrationName];

if(bankForRegistrationName){
var key=getDictionaryKey(inst);
delete bankForRegistrationName[key];
}
},






deleteAllListeners:function deleteAllListeners(inst){
var key=getDictionaryKey(inst);
for(var registrationName in listenerBank){
if(!listenerBank.hasOwnProperty(registrationName)){
continue;
}

if(!listenerBank[registrationName][key]){
continue;
}

var PluginModule=
EventPluginRegistry.registrationNameModules[registrationName];
if(PluginModule&&PluginModule.willDeleteListener){
PluginModule.willDeleteListener(inst,registrationName);
}

delete listenerBank[registrationName][key];
}
},








extractEvents:function extractEvents(
topLevelType,
targetInst,
nativeEvent,
nativeEventTarget){
var events;
var plugins=EventPluginRegistry.plugins;
for(var i=0;i<plugins.length;i++){

var possiblePlugin=plugins[i];
if(possiblePlugin){
var extractedEvents=possiblePlugin.extractEvents(
topLevelType,
targetInst,
nativeEvent,
nativeEventTarget);

if(extractedEvents){
events=accumulateInto(events,extractedEvents);
}
}
}
return events;
},








enqueueEvents:function enqueueEvents(events){
if(events){
eventQueue=accumulateInto(eventQueue,events);
}
},






processEventQueue:function processEventQueue(simulated){


var processingEventQueue=eventQueue;
eventQueue=null;
if(simulated){
forEachAccumulated(
processingEventQueue,
executeDispatchesAndReleaseSimulated);

}else{
forEachAccumulated(
processingEventQueue,
executeDispatchesAndReleaseTopLevel);

}
invariant(
!eventQueue,
'processEventQueue(): Additional events were enqueued while processing '+
'an event queue. Support for this has not yet been implemented.');


ReactErrorUtils.rethrowCaughtError();
},




__purge:function __purge(){
listenerBank={};
},

__getListenerBank:function __getListenerBank(){
return listenerBank;
}};



module.exports=EventPluginHub;
}, 134, null, "EventPluginHub");
__d(/* EventPluginRegistry */function(global, require, module, exports) {











'use strict';
















var invariant=require(26 /* fbjs/lib/invariant */);




var eventPluginOrder=null;




var namesToPlugins={};






function recomputePluginOrdering(){
if(!eventPluginOrder){

return;
}
for(var pluginName in namesToPlugins){
var pluginModule=namesToPlugins[pluginName];
var pluginIndex=eventPluginOrder.indexOf(pluginName);
invariant(
pluginIndex>-1,
'EventPluginRegistry: Cannot inject event plugins that do not exist in '+
'the plugin ordering, `%s`.',
pluginName);

if(EventPluginRegistry.plugins[pluginIndex]){
continue;
}
invariant(
pluginModule.extractEvents,
'EventPluginRegistry: Event plugins must implement an `extractEvents` '+
'method, but `%s` does not.',
pluginName);

EventPluginRegistry.plugins[pluginIndex]=pluginModule;
var publishedEvents=pluginModule.eventTypes;
for(var eventName in publishedEvents){
invariant(
publishEventForPlugin(
publishedEvents[eventName],
pluginModule,
eventName),

'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.',
eventName,
pluginName);

}
}
}









function publishEventForPlugin(
dispatchConfig,
pluginModule,
eventName)
{
invariant(
!EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName),
'EventPluginHub: More than one plugin attempted to publish the same '+
'event name, `%s`.',
eventName);

EventPluginRegistry.eventNameDispatchConfigs[eventName]=dispatchConfig;

var phasedRegistrationNames=dispatchConfig.phasedRegistrationNames;
if(phasedRegistrationNames){
for(var phaseName in phasedRegistrationNames){
if(phasedRegistrationNames.hasOwnProperty(phaseName)){
var phasedRegistrationName=phasedRegistrationNames[phaseName];
publishRegistrationName(
phasedRegistrationName,
pluginModule,
eventName);

}
}
return true;
}else if(dispatchConfig.registrationName){
publishRegistrationName(
dispatchConfig.registrationName,
pluginModule,
eventName);

return true;
}
return false;
}









function publishRegistrationName(
registrationName,
pluginModule,
eventName)
{
invariant(
!EventPluginRegistry.registrationNameModules[registrationName],
'EventPluginHub: More than one plugin attempted to publish the same '+
'registration name, `%s`.',
registrationName);

EventPluginRegistry.registrationNameModules[registrationName]=pluginModule;
EventPluginRegistry.registrationNameDependencies[registrationName]=
pluginModule.eventTypes[eventName].dependencies;

if(__DEV__){
var lowerCasedName=registrationName.toLowerCase();
EventPluginRegistry.possibleRegistrationNames[lowerCasedName]=
registrationName;


if(registrationName==='onDoubleClick'){
EventPluginRegistry.possibleRegistrationNames.ondblclick=registrationName;
}
}
}






var EventPluginRegistry={




plugins:[],




eventNameDispatchConfigs:{},




registrationNameModules:{},




registrationNameDependencies:{},







possibleRegistrationNames:__DEV__?{}:null,











injectEventPluginOrder:function injectEventPluginOrder(
injectedEventPluginOrder)
{
invariant(
!eventPluginOrder,
'EventPluginRegistry: Cannot inject event plugin ordering more than '+
'once. You are likely trying to load more than one copy of React.');


eventPluginOrder=Array.prototype.slice.call(injectedEventPluginOrder);
recomputePluginOrdering();
},











injectEventPluginsByName:function injectEventPluginsByName(
injectedNamesToPlugins)
{
var isOrderingDirty=false;
for(var pluginName in injectedNamesToPlugins){
if(!injectedNamesToPlugins.hasOwnProperty(pluginName)){
continue;
}
var pluginModule=injectedNamesToPlugins[pluginName];
if(!namesToPlugins.hasOwnProperty(pluginName)||
namesToPlugins[pluginName]!==pluginModule){
invariant(
!namesToPlugins[pluginName],
'EventPluginRegistry: Cannot inject two different event plugins '+
'using the same name, `%s`.',
pluginName);

namesToPlugins[pluginName]=pluginModule;
isOrderingDirty=true;
}
}
if(isOrderingDirty){
recomputePluginOrdering();
}
},








getPluginModuleForEvent:function getPluginModuleForEvent(
event)
{
var dispatchConfig=event.dispatchConfig;
if(dispatchConfig.registrationName){
return EventPluginRegistry.registrationNameModules[
dispatchConfig.registrationName]||
null;
}
if(dispatchConfig.phasedRegistrationNames!==undefined){var


phasedRegistrationNames=dispatchConfig.phasedRegistrationNames;
for(var phase in phasedRegistrationNames){
if(!phasedRegistrationNames.hasOwnProperty(phase)){
continue;
}
var pluginModule=EventPluginRegistry.registrationNameModules[
phasedRegistrationNames[phase]];

if(pluginModule){
return pluginModule;
}
}
}
return null;
},





_resetEventPlugins:function _resetEventPlugins(){
eventPluginOrder=null;
for(var pluginName in namesToPlugins){
if(namesToPlugins.hasOwnProperty(pluginName)){
delete namesToPlugins[pluginName];
}
}
EventPluginRegistry.plugins.length=0;

var eventNameDispatchConfigs=EventPluginRegistry.eventNameDispatchConfigs;
for(var eventName in eventNameDispatchConfigs){
if(eventNameDispatchConfigs.hasOwnProperty(eventName)){
delete eventNameDispatchConfigs[eventName];
}
}

var registrationNameModules=EventPluginRegistry.registrationNameModules;
for(var registrationName in registrationNameModules){
if(registrationNameModules.hasOwnProperty(registrationName)){
delete registrationNameModules[registrationName];
}
}

if(__DEV__){
var possibleRegistrationNames=
EventPluginRegistry.possibleRegistrationNames;
for(var lowerCasedName in possibleRegistrationNames){
if(possibleRegistrationNames.hasOwnProperty(lowerCasedName)){
delete possibleRegistrationNames[lowerCasedName];
}
}
}
}};



module.exports=EventPluginRegistry;
}, 135, null, "EventPluginRegistry");
__d(/* EventPluginUtils */function(global, require, module, exports) {










'use strict';

var ReactErrorUtils=require(137 /* ReactErrorUtils */);

var invariant=require(26 /* fbjs/lib/invariant */);
var warning=require(15 /* fbjs/lib/warning */);









var ComponentTree;
var TreeTraversal;
var injection={
injectComponentTree:function injectComponentTree(Injected){
ComponentTree=Injected;
if(__DEV__){
warning(
Injected&&
Injected.getNodeFromInstance&&
Injected.getInstanceFromNode,
'EventPluginUtils.injection.injectComponentTree(...): Injected '+
'module is missing getNodeFromInstance or getInstanceFromNode.');

}
},
injectTreeTraversal:function injectTreeTraversal(Injected){
TreeTraversal=Injected;
if(__DEV__){
warning(
Injected&&Injected.isAncestor&&Injected.getLowestCommonAncestor,
'EventPluginUtils.injection.injectTreeTraversal(...): Injected '+
'module is missing isAncestor or getLowestCommonAncestor.');

}
}};


function isEndish(topLevelType){
return topLevelType==='topMouseUp'||
topLevelType==='topTouchEnd'||
topLevelType==='topTouchCancel';
}

function isMoveish(topLevelType){
return topLevelType==='topMouseMove'||
topLevelType==='topTouchMove';
}
function isStartish(topLevelType){
return topLevelType==='topMouseDown'||
topLevelType==='topTouchStart';
}


var validateEventDispatches;
if(__DEV__){
validateEventDispatches=function validateEventDispatches(event){
var dispatchListeners=event._dispatchListeners;
var dispatchInstances=event._dispatchInstances;

var listenersIsArr=Array.isArray(dispatchListeners);
var listenersLen=listenersIsArr?
dispatchListeners.length:
dispatchListeners?1:0;

var instancesIsArr=Array.isArray(dispatchInstances);
var instancesLen=instancesIsArr?
dispatchInstances.length:
dispatchInstances?1:0;

warning(
instancesIsArr===listenersIsArr&&instancesLen===listenersLen,
'EventPluginUtils: Invalid `event`.');

};
}








function executeDispatch(event,simulated,listener,inst){
var type=event.type||'unknown-event';
event.currentTarget=EventPluginUtils.getNodeFromInstance(inst);
if(simulated){
ReactErrorUtils.invokeGuardedCallbackWithCatch(
type,
listener,
event);

}else{
ReactErrorUtils.invokeGuardedCallback(type,listener,event);
}
event.currentTarget=null;
}




function executeDispatchesInOrder(event,simulated){
var dispatchListeners=event._dispatchListeners;
var dispatchInstances=event._dispatchInstances;
if(__DEV__){
validateEventDispatches(event);
}
if(Array.isArray(dispatchListeners)){
for(var i=0;i<dispatchListeners.length;i++){
if(event.isPropagationStopped()){
break;
}

executeDispatch(
event,
simulated,
dispatchListeners[i],
dispatchInstances[i]);

}
}else if(dispatchListeners){
executeDispatch(event,simulated,dispatchListeners,dispatchInstances);
}
event._dispatchListeners=null;
event._dispatchInstances=null;
}








function executeDispatchesInOrderStopAtTrueImpl(event){
var dispatchListeners=event._dispatchListeners;
var dispatchInstances=event._dispatchInstances;
if(__DEV__){
validateEventDispatches(event);
}
if(Array.isArray(dispatchListeners)){
for(var i=0;i<dispatchListeners.length;i++){
if(event.isPropagationStopped()){
break;
}

if(dispatchListeners[i](event,dispatchInstances[i])){
return dispatchInstances[i];
}
}
}else if(dispatchListeners){
if(dispatchListeners(event,dispatchInstances)){
return dispatchInstances;
}
}
return null;
}




function executeDispatchesInOrderStopAtTrue(event){
var ret=executeDispatchesInOrderStopAtTrueImpl(event);
event._dispatchInstances=null;
event._dispatchListeners=null;
return ret;
}










function executeDirectDispatch(event){
if(__DEV__){
validateEventDispatches(event);
}
var dispatchListener=event._dispatchListeners;
var dispatchInstance=event._dispatchInstances;
invariant(
!Array.isArray(dispatchListener),
'executeDirectDispatch(...): Invalid `event`.');

event.currentTarget=dispatchListener?EventPluginUtils.getNodeFromInstance(dispatchInstance):null;
var res=dispatchListener?dispatchListener(event):null;
event.currentTarget=null;
event._dispatchListeners=null;
event._dispatchInstances=null;
return res;
}





function hasDispatches(event){
return!!event._dispatchListeners;
}




var EventPluginUtils={
isEndish:isEndish,
isMoveish:isMoveish,
isStartish:isStartish,

executeDirectDispatch:executeDirectDispatch,
executeDispatchesInOrder:executeDispatchesInOrder,
executeDispatchesInOrderStopAtTrue:executeDispatchesInOrderStopAtTrue,
hasDispatches:hasDispatches,

getInstanceFromNode:function getInstanceFromNode(node){
return ComponentTree.getInstanceFromNode(node);
},
getNodeFromInstance:function getNodeFromInstance(node){
return ComponentTree.getNodeFromInstance(node);
},
isAncestor:function isAncestor(a,b){
return TreeTraversal.isAncestor(a,b);
},
getLowestCommonAncestor:function getLowestCommonAncestor(a,b){
return TreeTraversal.getLowestCommonAncestor(a,b);
},
getParentInstance:function getParentInstance(inst){
return TreeTraversal.getParentInstance(inst);
},
traverseTwoPhase:function traverseTwoPhase(target,fn,arg){
return TreeTraversal.traverseTwoPhase(target,fn,arg);
},
traverseEnterLeave:function traverseEnterLeave(from,to,fn,argFrom,argTo){
return TreeTraversal.traverseEnterLeave(from,to,fn,argFrom,argTo);
},

injection:injection};


module.exports=EventPluginUtils;
}, 136, null, "EventPluginUtils");
__d(/* ReactErrorUtils */function(global, require, module, exports) {










'use strict';

var caughtError=null;









function invokeGuardedCallback(
name,
func,
a)
{
try{
func(a);
}catch(x){
if(caughtError===null){
caughtError=x;
}
}
}

var ReactErrorUtils={
invokeGuardedCallback:invokeGuardedCallback,





invokeGuardedCallbackWithCatch:invokeGuardedCallback,





rethrowCaughtError:function rethrowCaughtError(){
if(caughtError){
var error=caughtError;
caughtError=null;
throw error;
}
}};


if(__DEV__){




if(typeof window!=='undefined'&&
typeof window.dispatchEvent==='function'&&
typeof document!=='undefined'&&
typeof document.createEvent==='function'){
var fakeNode=document.createElement('react');
ReactErrorUtils.invokeGuardedCallback=function(
name,
func,
a)
{
var boundFunc=func.bind(null,a);
var evtType='react-'+name;
fakeNode.addEventListener(evtType,boundFunc,false);
var evt=document.createEvent('Event');

evt.initEvent(evtType,false,false);
fakeNode.dispatchEvent(evt);
fakeNode.removeEventListener(evtType,boundFunc,false);
};
}
}

module.exports=ReactErrorUtils;
}, 137, null, "ReactErrorUtils");
__d(/* accumulateInto */function(global, require, module, exports) {











'use strict';

var invariant=require(26 /* fbjs/lib/invariant */);














function accumulateInto(current,next){
invariant(
next!=null,
'accumulateInto(...): Accumulated items must not be null or undefined.');


if(current==null){
return next;
}



if(Array.isArray(current)){
if(Array.isArray(next)){
current.push.apply(current,next);
return current;
}
current.push(next);
return current;
}

if(Array.isArray(next)){

return[current].concat(next);
}

return[current,next];
}

module.exports=accumulateInto;
}, 138, null, "accumulateInto");
__d(/* forEachAccumulated */function(global, require, module, exports) {











'use strict';








function forEachAccumulated(
arr,
cb,
scope)
{
if(Array.isArray(arr)){
arr.forEach(cb,scope);
}else if(arr){
cb.call(scope,arr);
}
}

module.exports=forEachAccumulated;
}, 139, null, "forEachAccumulated");
__d(/* ReactEventEmitterMixin */function(global, require, module, exports) {










'use strict';

var EventPluginHub=require(134 /* EventPluginHub */);

function runEventQueueInBatch(events){
EventPluginHub.enqueueEvents(events);
EventPluginHub.processEventQueue(false);
}

var ReactEventEmitterMixin={





handleTopLevel:function handleTopLevel(
topLevelType,
targetInst,
nativeEvent,
nativeEventTarget){
var events=EventPluginHub.extractEvents(
topLevelType,
targetInst,
nativeEvent,
nativeEventTarget);

runEventQueueInBatch(events);
}};


module.exports=ReactEventEmitterMixin;
}, 140, null, "ReactEventEmitterMixin");
__d(/* ReactNativeTagHandles */function(global, require, module, exports) {










'use strict';

var invariant=require(26 /* fbjs/lib/invariant */);














var INITIAL_TAG_COUNT=1;
var ReactNativeTagHandles={
tagsStartAt:INITIAL_TAG_COUNT,
tagCount:INITIAL_TAG_COUNT,

allocateTag:function allocateTag(){

while(this.reactTagIsNativeTopRootID(ReactNativeTagHandles.tagCount)){
ReactNativeTagHandles.tagCount++;
}
var tag=ReactNativeTagHandles.tagCount;
ReactNativeTagHandles.tagCount++;
return tag;
},

assertRootTag:function assertRootTag(tag){
invariant(
this.reactTagIsNativeTopRootID(tag),
'Expect a native root tag, instead got %s',tag);

},

reactTagIsNativeTopRootID:function reactTagIsNativeTopRootID(reactTag){

return reactTag%10===1;
}};


module.exports=ReactNativeTagHandles;
}, 141, null, "ReactNativeTagHandles");
__d(/* ReactUpdates */function(global, require, module, exports) {










'use strict';

var CallbackQueue=require(143 /* CallbackQueue */);
var PooledClass=require(144 /* PooledClass */);
var ReactFeatureFlags=require(145 /* ReactFeatureFlags */);
var ReactReconciler=require(146 /* ReactReconciler */);
var Transaction=require(150 /* Transaction */);

var invariant=require(26 /* fbjs/lib/invariant */);

var dirtyComponents=[];
var updateBatchNumber=0;
var asapCallbackQueue=CallbackQueue.getPooled();
var asapEnqueued=false;

var batchingStrategy=null;

function ensureInjected(){
invariant(
ReactUpdates.ReactReconcileTransaction&&batchingStrategy,
'ReactUpdates: must inject a reconcile transaction class and batching '+
'strategy');

}

var NESTED_UPDATES={
initialize:function initialize(){
this.dirtyComponentsLength=dirtyComponents.length;
},
close:function close(){
if(this.dirtyComponentsLength!==dirtyComponents.length){





dirtyComponents.splice(0,this.dirtyComponentsLength);
flushBatchedUpdates();
}else{
dirtyComponents.length=0;
}
}};


var UPDATE_QUEUEING={
initialize:function initialize(){
this.callbackQueue.reset();
},
close:function close(){
this.callbackQueue.notifyAll();
}};


var TRANSACTION_WRAPPERS=[NESTED_UPDATES,UPDATE_QUEUEING];

function ReactUpdatesFlushTransaction(){
this.reinitializeTransaction();
this.dirtyComponentsLength=null;
this.callbackQueue=CallbackQueue.getPooled();
this.reconcileTransaction=ReactUpdates.ReactReconcileTransaction.getPooled(
true);

}

babelHelpers.extends(
ReactUpdatesFlushTransaction.prototype,
Transaction,
{
getTransactionWrappers:function getTransactionWrappers(){
return TRANSACTION_WRAPPERS;
},

destructor:function destructor(){
this.dirtyComponentsLength=null;
CallbackQueue.release(this.callbackQueue);
this.callbackQueue=null;
ReactUpdates.ReactReconcileTransaction.release(this.reconcileTransaction);
this.reconcileTransaction=null;
},

perform:function perform(method,scope,a){


return Transaction.perform.call(
this,
this.reconcileTransaction.perform,
this.reconcileTransaction,
method,
scope,
a);

}});



PooledClass.addPoolingTo(ReactUpdatesFlushTransaction);

function batchedUpdates(callback,a,b,c,d,e){
ensureInjected();
return batchingStrategy.batchedUpdates(callback,a,b,c,d,e);
}








function mountOrderComparator(c1,c2){
return c1._mountOrder-c2._mountOrder;
}

function runBatchedUpdates(transaction){
var len=transaction.dirtyComponentsLength;
invariant(
len===dirtyComponents.length,
'Expected flush transaction\'s stored dirty-components length (%s) to '+
'match dirty-components array length (%s).',
len,
dirtyComponents.length);





dirtyComponents.sort(mountOrderComparator);






updateBatchNumber++;

for(var i=0;i<len;i++){



var component=dirtyComponents[i];




var callbacks=component._pendingCallbacks;
component._pendingCallbacks=null;

var markerName;
if(ReactFeatureFlags.logTopLevelRenders){
var namedComponent=component;

if(component._currentElement.type.isReactTopLevelWrapper){
namedComponent=component._renderedComponent;
}
markerName='React update: '+namedComponent.getName();
console.time(markerName);
}

ReactReconciler.performUpdateIfNecessary(
component,
transaction.reconcileTransaction,
updateBatchNumber);


if(markerName){
console.timeEnd(markerName);
}

if(callbacks){
for(var j=0;j<callbacks.length;j++){
transaction.callbackQueue.enqueue(
callbacks[j],
component.getPublicInstance());

}
}
}
}

var flushBatchedUpdates=function flushBatchedUpdates(){




while(dirtyComponents.length||asapEnqueued){
if(dirtyComponents.length){
var transaction=ReactUpdatesFlushTransaction.getPooled();
transaction.perform(runBatchedUpdates,null,transaction);
ReactUpdatesFlushTransaction.release(transaction);
}

if(asapEnqueued){
asapEnqueued=false;
var queue=asapCallbackQueue;
asapCallbackQueue=CallbackQueue.getPooled();
queue.notifyAll();
CallbackQueue.release(queue);
}
}
};





function enqueueUpdate(component){
ensureInjected();







if(!batchingStrategy.isBatchingUpdates){
batchingStrategy.batchedUpdates(enqueueUpdate,component);
return;
}

dirtyComponents.push(component);
if(component._updateBatchNumber==null){
component._updateBatchNumber=updateBatchNumber+1;
}
}





function asap(callback,context){
invariant(
batchingStrategy.isBatchingUpdates,
'ReactUpdates.asap: Can\'t enqueue an asap callback in a context where'+
'updates are not being batched.');

asapCallbackQueue.enqueue(callback,context);
asapEnqueued=true;
}

var ReactUpdatesInjection={
injectReconcileTransaction:function injectReconcileTransaction(ReconcileTransaction){
invariant(
ReconcileTransaction,
'ReactUpdates: must provide a reconcile transaction class');

ReactUpdates.ReactReconcileTransaction=ReconcileTransaction;
},

injectBatchingStrategy:function injectBatchingStrategy(_batchingStrategy){
invariant(
_batchingStrategy,
'ReactUpdates: must provide a batching strategy');

invariant(
typeof _batchingStrategy.batchedUpdates==='function',
'ReactUpdates: must provide a batchedUpdates() function');

invariant(
typeof _batchingStrategy.isBatchingUpdates==='boolean',
'ReactUpdates: must provide an isBatchingUpdates boolean attribute');

batchingStrategy=_batchingStrategy;
},

getBatchingStrategy:function getBatchingStrategy(){
return batchingStrategy;
}};


var ReactUpdates={






ReactReconcileTransaction:null,

batchedUpdates:batchedUpdates,
enqueueUpdate:enqueueUpdate,
flushBatchedUpdates:flushBatchedUpdates,
injection:ReactUpdatesInjection,
asap:asap};


module.exports=ReactUpdates;
}, 142, null, "ReactUpdates");
__d(/* CallbackQueue */function(global, require, module, exports) {











'use strict';

var PooledClass=require(144 /* PooledClass */);

var invariant=require(26 /* fbjs/lib/invariant */);var












CallbackQueue=function(){




function CallbackQueue(arg){babelHelpers.classCallCheck(this,CallbackQueue);
this._callbacks=null;
this._contexts=null;
this._arg=arg;
}babelHelpers.createClass(CallbackQueue,[{key:'enqueue',value:function enqueue(








callback,context){
this._callbacks=this._callbacks||[];
this._callbacks.push(callback);
this._contexts=this._contexts||[];
this._contexts.push(context);
}},{key:'notifyAll',value:function notifyAll()







{
var callbacks=this._callbacks;
var contexts=this._contexts;
var arg=this._arg;
if(callbacks&&contexts){
invariant(
callbacks.length===contexts.length,
'Mismatched list of contexts in callback queue');

this._callbacks=null;
this._contexts=null;
for(var i=0;i<callbacks.length;i++){
callbacks[i].call(contexts[i],arg);
}
callbacks.length=0;
contexts.length=0;
}
}},{key:'checkpoint',value:function checkpoint()

{
return this._callbacks?this._callbacks.length:0;
}},{key:'rollback',value:function rollback(

len){
if(this._callbacks&&this._contexts){
this._callbacks.length=len;
this._contexts.length=len;
}
}},{key:'reset',value:function reset()






{
this._callbacks=null;
this._contexts=null;
}},{key:'destructor',value:function destructor()




{
this.reset();
}}]);return CallbackQueue;}();


module.exports=PooledClass.addPoolingTo(CallbackQueue);
}, 143, null, "CallbackQueue");
__d(/* PooledClass */function(global, require, module, exports) {











'use strict';

var invariant=require(26 /* fbjs/lib/invariant */);








var oneArgumentPooler=function oneArgumentPooler(copyFieldsFrom){
var Klass=this;
if(Klass.instancePool.length){
var instance=Klass.instancePool.pop();
Klass.call(instance,copyFieldsFrom);
return instance;
}else{
return new Klass(copyFieldsFrom);
}
};

var twoArgumentPooler=function twoArgumentPooler(a1,a2){
var Klass=this;
if(Klass.instancePool.length){
var instance=Klass.instancePool.pop();
Klass.call(instance,a1,a2);
return instance;
}else{
return new Klass(a1,a2);
}
};

var threeArgumentPooler=function threeArgumentPooler(a1,a2,a3){
var Klass=this;
if(Klass.instancePool.length){
var instance=Klass.instancePool.pop();
Klass.call(instance,a1,a2,a3);
return instance;
}else{
return new Klass(a1,a2,a3);
}
};

var fourArgumentPooler=function fourArgumentPooler(a1,a2,a3,a4){
var Klass=this;
if(Klass.instancePool.length){
var instance=Klass.instancePool.pop();
Klass.call(instance,a1,a2,a3,a4);
return instance;
}else{
return new Klass(a1,a2,a3,a4);
}
};

var fiveArgumentPooler=function fiveArgumentPooler(a1,a2,a3,a4,a5){
var Klass=this;
if(Klass.instancePool.length){
var instance=Klass.instancePool.pop();
Klass.call(instance,a1,a2,a3,a4,a5);
return instance;
}else{
return new Klass(a1,a2,a3,a4,a5);
}
};

var standardReleaser=function standardReleaser(instance){
var Klass=this;
invariant(
instance instanceof Klass,
'Trying to release an instance into a pool of a different type.');

instance.destructor();
if(Klass.instancePool.length<Klass.poolSize){
Klass.instancePool.push(instance);
}
};

var DEFAULT_POOL_SIZE=10;
var DEFAULT_POOLER=oneArgumentPooler;












var addPoolingTo=function addPoolingTo(
CopyConstructor,
pooler)



{


var NewKlass=CopyConstructor;
NewKlass.instancePool=[];
NewKlass.getPooled=pooler||DEFAULT_POOLER;
if(!NewKlass.poolSize){
NewKlass.poolSize=DEFAULT_POOL_SIZE;
}
NewKlass.release=standardReleaser;
return NewKlass;
};

var PooledClass={
addPoolingTo:addPoolingTo,
oneArgumentPooler:oneArgumentPooler,
twoArgumentPooler:twoArgumentPooler,
threeArgumentPooler:threeArgumentPooler,
fourArgumentPooler:fourArgumentPooler,
fiveArgumentPooler:fiveArgumentPooler};


module.exports=PooledClass;
}, 144, null, "PooledClass");
__d(/* ReactFeatureFlags */function(global, require, module, exports) {











'use strict';

var ReactFeatureFlags={



logTopLevelRenders:false};


module.exports=ReactFeatureFlags;
}, 145, null, "ReactFeatureFlags");
__d(/* ReactReconciler */function(global, require, module, exports) {










'use strict';

var ReactRef=require(147 /* ReactRef */);
var ReactInstrumentation=require(149 /* ReactInstrumentation */);

var warning=require(15 /* fbjs/lib/warning */);





function attachRefs(transaction){
ReactRef.attachRefs(
this,
this._currentElement,
transaction);

}

var ReactReconciler={












mountComponent:function mountComponent(
internalInstance,
transaction,
hostParent,
hostContainerInfo,
context,
parentDebugID)
{
if(__DEV__){
if(internalInstance._debugID!==0){
ReactInstrumentation.debugTool.onBeforeMountComponent(
internalInstance._debugID,
internalInstance._currentElement,
parentDebugID);

}
}
var markup=internalInstance.mountComponent(
transaction,
hostParent,
hostContainerInfo,
context,
parentDebugID);

if(internalInstance._currentElement&&
internalInstance._currentElement.ref!=null){
transaction.getReactMountReady().enqueue(attachRefs,internalInstance);
}
if(__DEV__){
if(internalInstance._debugID!==0){
ReactInstrumentation.debugTool.onMountComponent(
internalInstance._debugID);

}
}
return markup;
},





getHostNode:function getHostNode(internalInstance){
return internalInstance.getHostNode();
},







unmountComponent:function unmountComponent(internalInstance,safely){
if(__DEV__){
if(internalInstance._debugID!==0){
ReactInstrumentation.debugTool.onBeforeUnmountComponent(
internalInstance._debugID);

}
}
ReactRef.detachRefs(internalInstance,internalInstance._currentElement);
internalInstance.unmountComponent(safely);
if(__DEV__){
if(internalInstance._debugID!==0){
ReactInstrumentation.debugTool.onUnmountComponent(
internalInstance._debugID);

}
}
},










receiveComponent:function receiveComponent(
internalInstance,nextElement,transaction,context)
{
var prevElement=internalInstance._currentElement;

if(nextElement===prevElement&&
context===internalInstance._context)
{










return;
}

if(__DEV__){
if(internalInstance._debugID!==0){
ReactInstrumentation.debugTool.onBeforeUpdateComponent(
internalInstance._debugID,
nextElement);

}
}

var refsChanged=ReactRef.shouldUpdateRefs(
prevElement,
nextElement);


if(refsChanged){
ReactRef.detachRefs(internalInstance,prevElement);
}

internalInstance.receiveComponent(nextElement,transaction,context);

if(refsChanged&&
internalInstance._currentElement&&
internalInstance._currentElement.ref!=null){
transaction.getReactMountReady().enqueue(attachRefs,internalInstance);
}

if(__DEV__){
if(internalInstance._debugID!==0){
ReactInstrumentation.debugTool.onUpdateComponent(
internalInstance._debugID);

}
}
},








performUpdateIfNecessary:function performUpdateIfNecessary(
internalInstance,
transaction,
updateBatchNumber)
{
if(internalInstance._updateBatchNumber!==updateBatchNumber){


warning(
internalInstance._updateBatchNumber==null||
internalInstance._updateBatchNumber===updateBatchNumber+1,
'performUpdateIfNecessary: Unexpected batch number (current %s, '+
'pending %s)',
updateBatchNumber,
internalInstance._updateBatchNumber);

return;
}
if(__DEV__){
if(internalInstance._debugID!==0){
ReactInstrumentation.debugTool.onBeforeUpdateComponent(
internalInstance._debugID,
internalInstance._currentElement);

}
}
internalInstance.performUpdateIfNecessary(transaction);
if(__DEV__){
if(internalInstance._debugID!==0){
ReactInstrumentation.debugTool.onUpdateComponent(
internalInstance._debugID);

}
}
}};



module.exports=ReactReconciler;
}, 146, null, "ReactReconciler");
__d(/* ReactRef */function(global, require, module, exports) {










'use strict';

var ReactOwner=require(148 /* ReactOwner */);





var ReactRef={};

function attachRef(ref,component,owner,transaction){
if(typeof ref==='function'){
ref(component.getPublicInstance(transaction));
}else{

ReactOwner.addComponentAsRefTo(
component,
ref,
owner,
transaction);

}
}

function detachRef(ref,component,owner){
if(typeof ref==='function'){
ref(null);
}else{

ReactOwner.removeComponentAsRefFrom(component,ref,owner);
}
}

ReactRef.attachRefs=function(
instance,
element,
transaction)
{
if(element===null||typeof element!=='object'){
return;
}
var ref=element.ref;
if(ref!=null){
attachRef(ref,instance,element._owner,transaction);
}
};

ReactRef.shouldUpdateRefs=function(
prevElement,
nextElement)
{












var prevRef=null;
var prevOwner=null;
if(prevElement!==null&&typeof prevElement==='object'){
prevRef=prevElement.ref;
prevOwner=prevElement._owner;
}

var nextRef=null;
var nextOwner=null;
if(nextElement!==null&&typeof nextElement==='object'){
nextRef=nextElement.ref;
nextOwner=nextElement._owner;
}

return(
prevRef!==nextRef||

typeof nextRef==='string'&&nextOwner!==prevOwner);

};

ReactRef.detachRefs=function(
instance,
element)
{
if(element===null||typeof element!=='object'){
return;
}
var ref=element.ref;
if(ref!=null){
detachRef(ref,instance,element._owner);
}
};

module.exports=ReactRef;
}, 147, null, "ReactRef");
__d(/* ReactOwner */function(global, require, module, exports) {











'use strict';

var invariant=require(26 /* fbjs/lib/invariant */);









function isValidOwner(object){
return!!(
object&&
typeof object.attachRef==='function'&&
typeof object.detachRef==='function');

}































var ReactOwner={









addComponentAsRefTo:function addComponentAsRefTo(
component,
ref,
owner,
transaction)
{
invariant(
isValidOwner(owner),
'addComponentAsRefTo(...): Only a ReactOwner can have refs. You might '+
'be adding a ref to a component that was not created inside a component\'s '+
'`render` method, or you have multiple copies of React loaded '+
'(details: https://fb.me/react-refs-must-have-owner).');

owner.attachRef(ref,component,transaction);
},










removeComponentAsRefFrom:function removeComponentAsRefFrom(
component,
ref,
owner)
{
invariant(
isValidOwner(owner),
'removeComponentAsRefFrom(...): Only a ReactOwner can have refs. You might '+
'be removing a ref to a component that was not created inside a component\'s '+
'`render` method, or you have multiple copies of React loaded '+
'(details: https://fb.me/react-refs-must-have-owner).');

var ownerPublicInstance=owner.getPublicInstance();


if(ownerPublicInstance&&ownerPublicInstance.refs[ref]===component.getPublicInstance()){
owner.detachRef(ref);
}
}};



module.exports=ReactOwner;
}, 148, null, "ReactOwner");
__d(/* ReactInstrumentation */function(global, require, module, exports) {











'use strict';


var debugTool=null;

if(__DEV__){
var ReactDebugTool=require(39 /* ReactDebugTool */);
debugTool=ReactDebugTool;
}

module.exports={debugTool:debugTool};
}, 149, null, "ReactInstrumentation");
__d(/* Transaction */function(global, require, module, exports) {











'use strict';

var invariant=require(26 /* fbjs/lib/invariant */);

var OBSERVED_ERROR={};






























































var TransactionImpl={







reinitializeTransaction:function reinitializeTransaction(){
this.transactionWrappers=this.getTransactionWrappers();
if(this.wrapperInitData){
this.wrapperInitData.length=0;
}else{
this.wrapperInitData=[];
}
this._isInTransaction=false;
},

_isInTransaction:false,





getTransactionWrappers:null,

isInTransaction:function isInTransaction(){
return!!this._isInTransaction;
},


















perform:function perform(



method,scope,
a,b,c,d,e,f)
{
invariant(
!this.isInTransaction(),
'Transaction.perform(...): Cannot initialize a transaction when there '+
'is already an outstanding transaction.');

var errorThrown;
var ret;
try{
this._isInTransaction=true;




errorThrown=true;
this.initializeAll(0);
ret=method.call(scope,a,b,c,d,e,f);
errorThrown=false;
}finally{
try{
if(errorThrown){


try{
this.closeAll(0);
}catch(err){
}
}else{


this.closeAll(0);
}
}finally{
this._isInTransaction=false;
}
}
return ret;
},

initializeAll:function initializeAll(startIndex){
var transactionWrappers=this.transactionWrappers;
for(var i=startIndex;i<transactionWrappers.length;i++){
var wrapper=transactionWrappers[i];
try{




this.wrapperInitData[i]=OBSERVED_ERROR;
this.wrapperInitData[i]=wrapper.initialize?
wrapper.initialize.call(this):
null;
}finally{
if(this.wrapperInitData[i]===OBSERVED_ERROR){



try{
this.initializeAll(i+1);
}catch(err){
}
}
}
}
},







closeAll:function closeAll(startIndex){
invariant(
this.isInTransaction(),
'Transaction.closeAll(): Cannot close transaction when none are open.');

var transactionWrappers=this.transactionWrappers;
for(var i=startIndex;i<transactionWrappers.length;i++){
var wrapper=transactionWrappers[i];
var initData=this.wrapperInitData[i];
var errorThrown;
try{




errorThrown=true;
if(initData!==OBSERVED_ERROR&&wrapper.close){
wrapper.close.call(this,initData);
}
errorThrown=false;
}finally{
if(errorThrown){



try{
this.closeAll(i+1);
}catch(e){
}
}
}
}
this.wrapperInitData.length=0;
}};




module.exports=TransactionImpl;
}, 150, null, "Transaction");
__d(/* ReactMultiChild */function(global, require, module, exports) {










'use strict';

var ReactComponentEnvironment=require(152 /* ReactComponentEnvironment */);
var ReactInstanceMap=require(77 /* ReactInstanceMap */);
var ReactInstrumentation=require(149 /* ReactInstrumentation */);

var ReactCurrentOwner=require(38 /* react/lib/ReactCurrentOwner */);
var ReactReconciler=require(146 /* ReactReconciler */);
var ReactChildReconciler=require(153 /* ReactChildReconciler */);

var emptyFunction=require(16 /* fbjs/lib/emptyFunction */);
var flattenChildren=require(168 /* flattenChildren */);
var invariant=require(26 /* fbjs/lib/invariant */);








function makeInsertMarkup(markup,afterNode,toIndex){

return{
type:'INSERT_MARKUP',
content:markup,
fromIndex:null,
fromNode:null,
toIndex:toIndex,
afterNode:afterNode};

}








function makeMove(child,afterNode,toIndex){

return{
type:'MOVE_EXISTING',
content:null,
fromIndex:child._mountIndex,
fromNode:ReactReconciler.getHostNode(child),
toIndex:toIndex,
afterNode:afterNode};

}







function makeRemove(child,node){

return{
type:'REMOVE_NODE',
content:null,
fromIndex:child._mountIndex,
fromNode:node,
toIndex:null,
afterNode:null};

}







function makeSetMarkup(markup){

return{
type:'SET_MARKUP',
content:markup,
fromIndex:null,
fromNode:null,
toIndex:null,
afterNode:null};

}







function makeTextContent(textContent){

return{
type:'TEXT_CONTENT',
content:textContent,
fromIndex:null,
fromNode:null,
toIndex:null,
afterNode:null};

}





function enqueue(queue,update){
if(update){
queue=queue||[];
queue.push(update);
}
return queue;
}






function processQueue(inst,updateQueue){
ReactComponentEnvironment.processChildrenUpdates(
inst,
updateQueue);

}

var setChildrenForInstrumentation=emptyFunction;
if(__DEV__){
var getDebugID=function getDebugID(inst){
if(!inst._debugID){

var internal;
if(internal=ReactInstanceMap.get(inst)){
inst=internal;
}
}
return inst._debugID;
};
setChildrenForInstrumentation=function setChildrenForInstrumentation(children){
var debugID=getDebugID(this);


if(debugID!==0){
ReactInstrumentation.debugTool.onSetChildren(
debugID,
children?Object.keys(children).map(function(key){return children[key]._debugID;}):[]);

}
};
}






var ReactMultiChild={
_reconcilerInstantiateChildren:function _reconcilerInstantiateChildren(nestedChildren,transaction,context){
if(__DEV__){
var selfDebugID=getDebugID(this);
if(this._currentElement){
try{
ReactCurrentOwner.current=this._currentElement._owner;
return ReactChildReconciler.instantiateChildren(
nestedChildren,transaction,context,selfDebugID);

}finally{
ReactCurrentOwner.current=null;
}
}
}
return ReactChildReconciler.instantiateChildren(
nestedChildren,transaction,context);

},

_reconcilerUpdateChildren:function _reconcilerUpdateChildren(
prevChildren,
nextNestedChildrenElements,
mountImages,
removedNodes,
transaction,
context)
{
var nextChildren;
var selfDebugID=0;
if(__DEV__){
selfDebugID=getDebugID(this);
if(this._currentElement){
try{
ReactCurrentOwner.current=this._currentElement._owner;
nextChildren=flattenChildren(nextNestedChildrenElements,selfDebugID);
}finally{
ReactCurrentOwner.current=null;
}
ReactChildReconciler.updateChildren(
prevChildren,
nextChildren,
mountImages,
removedNodes,
transaction,
this,
this._hostContainerInfo,
context,
selfDebugID);

return nextChildren;
}
}
nextChildren=flattenChildren(nextNestedChildrenElements,selfDebugID);
ReactChildReconciler.updateChildren(
prevChildren,
nextChildren,
mountImages,
removedNodes,
transaction,
this,
this._hostContainerInfo,
context,
selfDebugID);

return nextChildren;
},









mountChildren:function mountChildren(nestedChildren,transaction,context){
var children=this._reconcilerInstantiateChildren(
nestedChildren,transaction,context);

this._renderedChildren=children;

var mountImages=[];
var index=0;
for(var name in children){
if(children.hasOwnProperty(name)){
var child=children[name];
var selfDebugID=0;
if(__DEV__){
selfDebugID=getDebugID(this);
}
var mountImage=ReactReconciler.mountComponent(
child,
transaction,
this,
this._hostContainerInfo,
context,
selfDebugID);

child._mountIndex=index++;
mountImages.push(mountImage);
}
}

if(__DEV__){
setChildrenForInstrumentation.call(this,children);
}

return mountImages;
},







updateTextContent:function updateTextContent(nextContent){
var prevChildren=this._renderedChildren;

ReactChildReconciler.unmountChildren(prevChildren,false);
for(var name in prevChildren){
if(prevChildren.hasOwnProperty(name)){
invariant(false,'updateTextContent called on non-empty component.');
}
}

var updates=[makeTextContent(nextContent)];
processQueue(this,updates);
},







updateMarkup:function updateMarkup(nextMarkup){
var prevChildren=this._renderedChildren;

ReactChildReconciler.unmountChildren(prevChildren,false);
for(var name in prevChildren){
if(prevChildren.hasOwnProperty(name)){
invariant(false,'updateTextContent called on non-empty component.');
}
}
var updates=[makeSetMarkup(nextMarkup)];
processQueue(this,updates);
},








updateChildren:function updateChildren(nextNestedChildrenElements,transaction,context){

this._updateChildren(nextNestedChildrenElements,transaction,context);
},







_updateChildren:function _updateChildren(nextNestedChildrenElements,transaction,context){
var prevChildren=this._renderedChildren;
var removedNodes={};
var mountImages=[];
var nextChildren=this._reconcilerUpdateChildren(
prevChildren,
nextNestedChildrenElements,
mountImages,
removedNodes,
transaction,
context);

if(!nextChildren&&!prevChildren){
return;
}
var updates=null;
var name;


var nextIndex=0;
var lastIndex=0;

var nextMountIndex=0;
var lastPlacedNode=null;
for(name in nextChildren){
if(!nextChildren.hasOwnProperty(name)){
continue;
}
var prevChild=prevChildren&&prevChildren[name];
var nextChild=nextChildren[name];
if(prevChild===nextChild){
updates=enqueue(
updates,
this.moveChild(prevChild,lastPlacedNode,nextIndex,lastIndex));

lastIndex=Math.max(prevChild._mountIndex,lastIndex);
prevChild._mountIndex=nextIndex;
}else{
if(prevChild){

lastIndex=Math.max(prevChild._mountIndex,lastIndex);

}

updates=enqueue(
updates,
this._mountChildAtIndex(
nextChild,
mountImages[nextMountIndex],
lastPlacedNode,
nextIndex,
transaction,
context));


nextMountIndex++;
}
nextIndex++;
lastPlacedNode=ReactReconciler.getHostNode(nextChild);
}

for(name in removedNodes){
if(removedNodes.hasOwnProperty(name)){
updates=enqueue(
updates,
this._unmountChild(prevChildren[name],removedNodes[name]));

}
}
if(updates){
processQueue(this,updates);
}
this._renderedChildren=nextChildren;

if(__DEV__){
setChildrenForInstrumentation.call(this,nextChildren);
}
},








unmountChildren:function unmountChildren(safely){
var renderedChildren=this._renderedChildren;
ReactChildReconciler.unmountChildren(renderedChildren,safely);
this._renderedChildren=null;
},









moveChild:function moveChild(child,afterNode,toIndex,lastIndex){



if(child._mountIndex<lastIndex){
return makeMove(child,afterNode,toIndex);
}
},








createChild:function createChild(child,afterNode,mountImage){
return makeInsertMarkup(mountImage,afterNode,child._mountIndex);
},







removeChild:function removeChild(child,node){
return makeRemove(child,node);
},












_mountChildAtIndex:function _mountChildAtIndex(
child,
mountImage,
afterNode,
index,
transaction,
context){
child._mountIndex=index;
return this.createChild(child,afterNode,mountImage);
},









_unmountChild:function _unmountChild(child,node){
var update=this.removeChild(child,node);
child._mountIndex=null;
return update;
}};


module.exports=ReactMultiChild;
}, 151, null, "ReactMultiChild");
__d(/* ReactComponentEnvironment */function(global, require, module, exports) {











'use strict';

var invariant=require(26 /* fbjs/lib/invariant */);









var injected=false;

var ReactComponentEnvironment={





replaceNodeWithMarkup:null,





processChildrenUpdates:null,

injection:{
injectEnvironment:function injectEnvironment(environment){
invariant(
!injected,
'ReactCompositeComponent: injectEnvironment() can only be called once.');

ReactComponentEnvironment.replaceNodeWithMarkup=
environment.replaceNodeWithMarkup;
ReactComponentEnvironment.processChildrenUpdates=
environment.processChildrenUpdates;
injected=true;
}}};




module.exports=ReactComponentEnvironment;
}, 152, null, "ReactComponentEnvironment");
__d(/* ReactChildReconciler */function(global, require, module, exports) {










'use strict';

var ReactReconciler=require(146 /* ReactReconciler */);

var instantiateReactComponent=require(154 /* instantiateReactComponent */);
var KeyEscapeUtils=require(164 /* KeyEscapeUtils */);
var shouldUpdateReactComponent=require(161 /* shouldUpdateReactComponent */);
var traverseAllChildren=require(165 /* traverseAllChildren */);
var warning=require(15 /* fbjs/lib/warning */);

var ReactComponentTreeHook;

if(
typeof process!=='undefined'&&
process.env&&
process.env.NODE_ENV==='test')
{





ReactComponentTreeHook=require(36 /* react/lib/ReactComponentTreeHook */);
}

function instantiateChild(childInstances,child,name,selfDebugID){

var keyUnique=childInstances[name]===undefined;
if(__DEV__){
if(!ReactComponentTreeHook){
ReactComponentTreeHook=require(36 /* react/lib/ReactComponentTreeHook */);
}
if(!keyUnique){
warning(
false,
'flattenChildren(...): Encountered two children with the same key, '+
'`%s`. Child keys must be unique; when two children share a key, only '+
'the first child will be used.%s',
KeyEscapeUtils.unescape(name),
ReactComponentTreeHook.getStackAddendumByID(selfDebugID));

}
}
if(child!=null&&keyUnique){
childInstances[name]=instantiateReactComponent(child,true);
}
}






var ReactChildReconciler={








instantiateChildren:function instantiateChildren(
nestedChildNodes,
transaction,
context,
selfDebugID)
{
if(nestedChildNodes==null){
return null;
}
var childInstances={};

if(__DEV__){
traverseAllChildren(
nestedChildNodes,
function(childInsts,child,name){return instantiateChild(
childInsts,
child,
name,
selfDebugID);},

childInstances);

}else{
traverseAllChildren(nestedChildNodes,instantiateChild,childInstances);
}
return childInstances;
},











updateChildren:function updateChildren(
prevChildren,
nextChildren,
mountImages,
removedNodes,
transaction,
hostParent,
hostContainerInfo,
context,
selfDebugID)
{





if(!nextChildren&&!prevChildren){
return;
}
var name;
var prevChild;
for(name in nextChildren){
if(!nextChildren.hasOwnProperty(name)){
continue;
}
prevChild=prevChildren&&prevChildren[name];
var prevElement=prevChild&&prevChild._currentElement;
var nextElement=nextChildren[name];
if(prevChild!=null&&
shouldUpdateReactComponent(prevElement,nextElement)){
ReactReconciler.receiveComponent(
prevChild,nextElement,transaction,context);

nextChildren[name]=prevChild;
}else{
if(prevChild){
removedNodes[name]=ReactReconciler.getHostNode(prevChild);
ReactReconciler.unmountComponent(prevChild,false);
}

var nextChildInstance=instantiateReactComponent(nextElement,true);
nextChildren[name]=nextChildInstance;


var nextChildMountImage=ReactReconciler.mountComponent(
nextChildInstance,
transaction,
hostParent,
hostContainerInfo,
context,
selfDebugID);

mountImages.push(nextChildMountImage);
}
}

for(name in prevChildren){
if(prevChildren.hasOwnProperty(name)&&
!(nextChildren&&nextChildren.hasOwnProperty(name))){
prevChild=prevChildren[name];
removedNodes[name]=ReactReconciler.getHostNode(prevChild);
ReactReconciler.unmountComponent(prevChild,false);
}
}
},








unmountChildren:function unmountChildren(renderedChildren,safely){
for(var name in renderedChildren){
if(renderedChildren.hasOwnProperty(name)){
var renderedChild=renderedChildren[name];
ReactReconciler.unmountComponent(renderedChild,safely);
}
}
}};



module.exports=ReactChildReconciler;
}, 153, null, "ReactChildReconciler");
__d(/* instantiateReactComponent */function(global, require, module, exports) {










'use strict';

var ReactCompositeComponent=require(155 /* ReactCompositeComponent */);
var ReactEmptyComponent=require(162 /* ReactEmptyComponent */);
var ReactHostComponent=require(163 /* ReactHostComponent */);

var invariant=require(26 /* fbjs/lib/invariant */);
var warning=require(15 /* fbjs/lib/warning */);


var ReactCompositeComponentWrapper=function ReactCompositeComponentWrapper(element){
this.construct(element);
};
babelHelpers.extends(
ReactCompositeComponentWrapper.prototype,
ReactCompositeComponent,
{
_instantiateReactComponent:instantiateReactComponent});



function getDeclarationErrorAddendum(owner){
if(owner){
var name=owner.getName();
if(name){
return' Check the render method of `'+name+'`.';
}
}
return'';
}








function isInternalComponentType(type){
return(
typeof type==='function'&&
typeof type.prototype!=='undefined'&&
typeof type.prototype.mountComponent==='function'&&
typeof type.prototype.receiveComponent==='function');

}

var nextDebugID=1;









function instantiateReactComponent(node,shouldHaveDebugID){
var instance;

if(node===null||node===false){
instance=ReactEmptyComponent.create(instantiateReactComponent);
}else if(typeof node==='object'){
var element=node;
invariant(
element&&(typeof element.type==='function'||
typeof element.type==='string'),
'Element type is invalid: expected a string (for built-in components) '+
'or a class/function (for composite components) but got: %s.%s',
element.type==null?element.type:typeof element.type,
getDeclarationErrorAddendum(element._owner));



if(typeof element.type==='string'){
instance=ReactHostComponent.createInternalComponent(element);
}else if(isInternalComponentType(element.type)){



instance=new element.type(element);


if(!instance.getHostNode){
instance.getHostNode=instance.getNativeNode;
}
}else{
instance=new ReactCompositeComponentWrapper(element);
}
}else if(typeof node==='string'||typeof node==='number'){
instance=ReactHostComponent.createInstanceForText(node);
}else{
invariant(
false,
'Encountered invalid React node of type %s',
typeof node);

}

if(__DEV__){
warning(
typeof instance.mountComponent==='function'&&
typeof instance.receiveComponent==='function'&&
typeof instance.getHostNode==='function'&&
typeof instance.unmountComponent==='function',
'Only React Components can be mounted.');

}




instance._mountIndex=0;
instance._mountImage=null;

if(__DEV__){
instance._debugID=shouldHaveDebugID?nextDebugID++:0;
}



if(__DEV__){
if(Object.preventExtensions){
Object.preventExtensions(instance);
}
}

return instance;
}

module.exports=instantiateReactComponent;
}, 154, null, "instantiateReactComponent");
__d(/* ReactCompositeComponent */function(global, require, module, exports) {










'use strict';

var React=require(78 /* React */);
var ReactComponentEnvironment=require(152 /* ReactComponentEnvironment */);
var ReactCurrentOwner=require(38 /* react/lib/ReactCurrentOwner */);
var ReactErrorUtils=require(137 /* ReactErrorUtils */);
var ReactInstanceMap=require(77 /* ReactInstanceMap */);
var ReactInstrumentation=require(149 /* ReactInstrumentation */);
var ReactNodeTypes=require(156 /* ReactNodeTypes */);
var ReactReconciler=require(146 /* ReactReconciler */);

if(__DEV__){
var checkReactTypeSpec=require(157 /* checkReactTypeSpec */);
}

var emptyObject=require(91 /* fbjs/lib/emptyObject */);
var invariant=require(26 /* fbjs/lib/invariant */);
var shallowEqual=require(160 /* fbjs/lib/shallowEqual */);
var shouldUpdateReactComponent=require(161 /* shouldUpdateReactComponent */);
var warning=require(15 /* fbjs/lib/warning */);



var CompositeTypes={
ImpureClass:0,
PureClass:1,
StatelessFunctional:2};


function StatelessComponent(Component){
}
StatelessComponent.prototype.render=function(){
var Component=ReactInstanceMap.get(this)._currentElement.type;
var element=Component(this.props,this.context,this.updater);
warnIfInvalidElement(Component,element);
return element;
};

function warnIfInvalidElement(Component,element){
if(__DEV__){
warning(
element===null||element===false||React.isValidElement(element),
'%s(...): A valid React element (or null) must be returned. You may have '+
'returned undefined, an array or some other invalid object.',
Component.displayName||Component.name||'Component');

warning(
!Component.childContextTypes,
'%s(...): childContextTypes cannot be defined on a functional component.',
Component.displayName||Component.name||'Component');

}
}

function shouldConstruct(Component){
return!!(Component.prototype&&Component.prototype.isReactComponent);
}

function isPureComponent(Component){
return!!(Component.prototype&&Component.prototype.isPureReactComponent);
}


function measureLifeCyclePerf(fn,debugID,timerType){
if(debugID===0){



return fn();
}

ReactInstrumentation.debugTool.onBeginLifeCycleTimer(debugID,timerType);
try{
return fn();
}finally{
ReactInstrumentation.debugTool.onEndLifeCycleTimer(debugID,timerType);
}
}


































var nextMountID=1;




var ReactCompositeComponent={








construct:function construct(element){
this._currentElement=element;
this._rootNodeID=0;
this._compositeType=null;
this._instance=null;
this._hostParent=null;
this._hostContainerInfo=null;


this._updateBatchNumber=null;
this._pendingElement=null;
this._pendingStateQueue=null;
this._pendingReplaceState=false;
this._pendingForceUpdate=false;

this._renderedNodeType=null;
this._renderedComponent=null;
this._context=null;
this._mountOrder=0;
this._topLevelWrapper=null;


this._pendingCallbacks=null;


this._calledComponentWillUnmount=false;

if(__DEV__){
this._warnedAboutRefsInRender=false;
}
},












mountComponent:function mountComponent(
transaction,
hostParent,
hostContainerInfo,
context)
{var _this=this;
this._context=context;
this._mountOrder=nextMountID++;
this._hostParent=hostParent;
this._hostContainerInfo=hostContainerInfo;

var publicProps=this._currentElement.props;
var publicContext=this._processContext(context);

var Component=this._currentElement.type;

var updateQueue=transaction.getUpdateQueue();


var doConstruct=shouldConstruct(Component);
var inst=this._constructComponent(
doConstruct,
publicProps,
publicContext,
updateQueue);

var renderedElement;


if(!doConstruct&&(inst==null||inst.render==null)){
renderedElement=inst;
warnIfInvalidElement(Component,renderedElement);
invariant(
inst===null||
inst===false||
React.isValidElement(inst),
'%s(...): A valid React element (or null) must be returned. You may have '+
'returned undefined, an array or some other invalid object.',
Component.displayName||Component.name||'Component');

inst=new StatelessComponent(Component);
this._compositeType=CompositeTypes.StatelessFunctional;
}else{
if(isPureComponent(Component)){
this._compositeType=CompositeTypes.PureClass;
}else{
this._compositeType=CompositeTypes.ImpureClass;
}
}

if(__DEV__){


if(inst.render==null){
warning(
false,
'%s(...): No `render` method found on the returned component '+
'instance: you may have forgotten to define `render`.',
Component.displayName||Component.name||'Component');

}

var propsMutated=inst.props!==publicProps;
var componentName=
Component.displayName||Component.name||'Component';

warning(
inst.props===undefined||!propsMutated,
'%s(...): When calling super() in `%s`, make sure to pass '+
'up the same props that your component\'s constructor was passed.',
componentName,componentName);

}



inst.props=publicProps;
inst.context=publicContext;
inst.refs=emptyObject;
inst.updater=updateQueue;

this._instance=inst;


ReactInstanceMap.set(inst,this);

if(__DEV__){



warning(
!inst.getInitialState||
inst.getInitialState.isReactClassApproved,
'getInitialState was defined on %s, a plain JavaScript class. '+
'This is only supported for classes created using React.createClass. '+
'Did you mean to define a state property instead?',
this.getName()||'a component');

warning(
!inst.getDefaultProps||
inst.getDefaultProps.isReactClassApproved,
'getDefaultProps was defined on %s, a plain JavaScript class. '+
'This is only supported for classes created using React.createClass. '+
'Use a static property to define defaultProps instead.',
this.getName()||'a component');

warning(
!inst.propTypes,
'propTypes was defined as an instance property on %s. Use a static '+
'property to define propTypes instead.',
this.getName()||'a component');

warning(
!inst.contextTypes,
'contextTypes was defined as an instance property on %s. Use a '+
'static property to define contextTypes instead.',
this.getName()||'a component');

warning(
typeof inst.componentShouldUpdate!=='function',
'%s has a method called '+
'componentShouldUpdate(). Did you mean shouldComponentUpdate()? '+
'The name is phrased as a question because the function is '+
'expected to return a value.',
this.getName()||'A component');

warning(
typeof inst.componentDidUnmount!=='function',
'%s has a method called '+
'componentDidUnmount(). But there is no such lifecycle method. '+
'Did you mean componentWillUnmount()?',
this.getName()||'A component');

warning(
typeof inst.componentWillRecieveProps!=='function',
'%s has a method called '+
'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',
this.getName()||'A component');

}

var initialState=inst.state;
if(initialState===undefined){
inst.state=initialState=null;
}
invariant(
typeof initialState==='object'&&!Array.isArray(initialState),
'%s.state: must be set to an object or null',
this.getName()||'ReactCompositeComponent');


this._pendingStateQueue=null;
this._pendingReplaceState=false;
this._pendingForceUpdate=false;

var markup;
if(inst.unstable_handleError){
markup=this.performInitialMountWithErrorHandling(
renderedElement,
hostParent,
hostContainerInfo,
transaction,
context);

}else{
markup=this.performInitialMount(renderedElement,hostParent,hostContainerInfo,transaction,context);
}

if(inst.componentDidMount){
if(__DEV__){
transaction.getReactMountReady().enqueue(function(){
measureLifeCyclePerf(
function(){return inst.componentDidMount();},
_this._debugID,
'componentDidMount');

});
}else{
transaction.getReactMountReady().enqueue(inst.componentDidMount,inst);
}
}

return markup;
},

_constructComponent:function _constructComponent(
doConstruct,
publicProps,
publicContext,
updateQueue)
{
if(__DEV__){
ReactCurrentOwner.current=this;
try{
return this._constructComponentWithoutOwner(
doConstruct,
publicProps,
publicContext,
updateQueue);

}finally{
ReactCurrentOwner.current=null;
}
}else{
return this._constructComponentWithoutOwner(
doConstruct,
publicProps,
publicContext,
updateQueue);

}
},

_constructComponentWithoutOwner:function _constructComponentWithoutOwner(
doConstruct,
publicProps,
publicContext,
updateQueue)
{
var Component=this._currentElement.type;

if(doConstruct){
if(__DEV__){
return measureLifeCyclePerf(
function(){return new Component(publicProps,publicContext,updateQueue);},
this._debugID,
'ctor');

}else{
return new Component(publicProps,publicContext,updateQueue);
}
}



if(__DEV__){
return measureLifeCyclePerf(
function(){return Component(publicProps,publicContext,updateQueue);},
this._debugID,
'render');

}else{
return Component(publicProps,publicContext,updateQueue);
}
},

performInitialMountWithErrorHandling:function performInitialMountWithErrorHandling(
renderedElement,
hostParent,
hostContainerInfo,
transaction,
context)
{
var markup;
var checkpoint=transaction.checkpoint();
try{
markup=this.performInitialMount(renderedElement,hostParent,hostContainerInfo,transaction,context);
}catch(e){

transaction.rollback(checkpoint);
this._instance.unstable_handleError(e);
if(this._pendingStateQueue){
this._instance.state=this._processPendingState(this._instance.props,this._instance.context);
}
checkpoint=transaction.checkpoint();

this._renderedComponent.unmountComponent(true);
transaction.rollback(checkpoint);



markup=this.performInitialMount(renderedElement,hostParent,hostContainerInfo,transaction,context);
}
return markup;
},

performInitialMount:function performInitialMount(renderedElement,hostParent,hostContainerInfo,transaction,context){
var inst=this._instance;

var debugID=0;
if(__DEV__){
debugID=this._debugID;
}

if(inst.componentWillMount){
if(__DEV__){
measureLifeCyclePerf(
function(){return inst.componentWillMount();},
debugID,
'componentWillMount');

}else{
inst.componentWillMount();
}


if(this._pendingStateQueue){
inst.state=this._processPendingState(inst.props,inst.context);
}
}


if(renderedElement===undefined){
renderedElement=this._renderValidatedComponent();
}

var nodeType=ReactNodeTypes.getType(renderedElement);
this._renderedNodeType=nodeType;
var child=this._instantiateReactComponent(
renderedElement,
nodeType!==ReactNodeTypes.EMPTY);

this._renderedComponent=child;

var markup=ReactReconciler.mountComponent(
child,
transaction,
hostParent,
hostContainerInfo,
this._processChildContext(context),
debugID);


if(__DEV__){
if(debugID!==0){
var childDebugIDs=child._debugID!==0?[child._debugID]:[];
ReactInstrumentation.debugTool.onSetChildren(debugID,childDebugIDs);
}
}

return markup;
},

getHostNode:function getHostNode(){
return ReactReconciler.getHostNode(this._renderedComponent);
},







unmountComponent:function unmountComponent(safely){
if(!this._renderedComponent){
return;
}

var inst=this._instance;

if(inst.componentWillUnmount&&!inst._calledComponentWillUnmount){
inst._calledComponentWillUnmount=true;

if(safely){
var name=this.getName()+'.componentWillUnmount()';
ReactErrorUtils.invokeGuardedCallback(name,inst.componentWillUnmount.bind(inst));
}else{
if(__DEV__){
measureLifeCyclePerf(
function(){return inst.componentWillUnmount();},
this._debugID,
'componentWillUnmount');

}else{
inst.componentWillUnmount();
}
}
}

if(this._renderedComponent){
ReactReconciler.unmountComponent(this._renderedComponent,safely);
this._renderedNodeType=null;
this._renderedComponent=null;
this._instance=null;
}




this._pendingStateQueue=null;
this._pendingReplaceState=false;
this._pendingForceUpdate=false;
this._pendingCallbacks=null;
this._pendingElement=null;



this._context=null;
this._rootNodeID=0;
this._topLevelWrapper=null;




ReactInstanceMap.remove(inst);






},









_maskContext:function _maskContext(context){
var Component=this._currentElement.type;
var contextTypes=Component.contextTypes;
if(!contextTypes){
return emptyObject;
}
var maskedContext={};
for(var contextName in contextTypes){
maskedContext[contextName]=context[contextName];
}
return maskedContext;
},









_processContext:function _processContext(context){
var maskedContext=this._maskContext(context);
if(__DEV__){
var Component=this._currentElement.type;
if(Component.contextTypes){
this._checkContextTypes(
Component.contextTypes,
maskedContext,
'context');

}
}
return maskedContext;
},






_processChildContext:function _processChildContext(currentContext){
var Component=this._currentElement.type;
var inst=this._instance;
var childContext;

if(inst.getChildContext){
if(__DEV__){
ReactInstrumentation.debugTool.onBeginProcessingChildContext();
try{
childContext=inst.getChildContext();
}finally{
ReactInstrumentation.debugTool.onEndProcessingChildContext();
}
}else{
childContext=inst.getChildContext();
}
}

if(childContext){
invariant(
typeof Component.childContextTypes==='object',
'%s.getChildContext(): childContextTypes must be defined in order to '+
'use getChildContext().',
this.getName()||'ReactCompositeComponent');

if(__DEV__){
this._checkContextTypes(
Component.childContextTypes,
childContext,
'childContext');

}
for(var name in childContext){
invariant(
name in Component.childContextTypes,
'%s.getChildContext(): key "%s" is not defined in childContextTypes.',
this.getName()||'ReactCompositeComponent',
name);

}
return babelHelpers.extends({},currentContext,childContext);
}
return currentContext;
},









_checkContextTypes:function _checkContextTypes(
typeSpecs,
values,
location)
{
if(__DEV__){
checkReactTypeSpec(
typeSpecs,
values,
location,
this.getName(),
null,
this._debugID);

}
},

receiveComponent:function receiveComponent(nextElement,transaction,nextContext){
var prevElement=this._currentElement;
var prevContext=this._context;

this._pendingElement=null;

this.updateComponent(
transaction,
prevElement,
nextElement,
prevContext,
nextContext);

},








performUpdateIfNecessary:function performUpdateIfNecessary(transaction){
if(this._pendingElement!=null){
ReactReconciler.receiveComponent(
this,
this._pendingElement,
transaction,
this._context);

}else if(this._pendingStateQueue!==null||this._pendingForceUpdate){
this.updateComponent(
transaction,
this._currentElement,
this._currentElement,
this._context,
this._context);

}else{
this._updateBatchNumber=null;
}
},
















updateComponent:function updateComponent(
transaction,
prevParentElement,
nextParentElement,
prevUnmaskedContext,
nextUnmaskedContext)
{
var inst=this._instance;
invariant(
inst!=null,
'Attempted to update component `%s` that has already been unmounted '+
'(or failed to mount).',
this.getName()||'ReactCompositeComponent');


var willReceive=false;
var nextContext;


if(this._context===nextUnmaskedContext){
nextContext=inst.context;
}else{
nextContext=this._processContext(nextUnmaskedContext);
willReceive=true;
}

var prevProps=prevParentElement.props;
var nextProps=nextParentElement.props;


if(prevParentElement!==nextParentElement){
willReceive=true;
}




if(willReceive&&inst.componentWillReceiveProps){
if(__DEV__){
measureLifeCyclePerf(
function(){return inst.componentWillReceiveProps(nextProps,nextContext);},
this._debugID,
'componentWillReceiveProps');

}else{
inst.componentWillReceiveProps(nextProps,nextContext);
}
}

var nextState=this._processPendingState(nextProps,nextContext);
var shouldUpdate=true;

if(!this._pendingForceUpdate){
if(inst.shouldComponentUpdate){
if(__DEV__){
shouldUpdate=measureLifeCyclePerf(
function(){return inst.shouldComponentUpdate(nextProps,nextState,nextContext);},
this._debugID,
'shouldComponentUpdate');

}else{
shouldUpdate=inst.shouldComponentUpdate(nextProps,nextState,nextContext);
}
}else{
if(this._compositeType===CompositeTypes.PureClass){
shouldUpdate=
!shallowEqual(prevProps,nextProps)||
!shallowEqual(inst.state,nextState);
}
}
}

if(__DEV__){
warning(
shouldUpdate!==undefined,
'%s.shouldComponentUpdate(): Returned undefined instead of a '+
'boolean value. Make sure to return true or false.',
this.getName()||'ReactCompositeComponent');

}

this._updateBatchNumber=null;
if(shouldUpdate){
this._pendingForceUpdate=false;

this._performComponentUpdate(
nextParentElement,
nextProps,
nextState,
nextContext,
transaction,
nextUnmaskedContext);

}else{


this._currentElement=nextParentElement;
this._context=nextUnmaskedContext;
inst.props=nextProps;
inst.state=nextState;
inst.context=nextContext;
}
},

_processPendingState:function _processPendingState(props,context){
var inst=this._instance;
var queue=this._pendingStateQueue;
var replace=this._pendingReplaceState;
this._pendingReplaceState=false;
this._pendingStateQueue=null;

if(!queue){
return inst.state;
}

if(replace&&queue.length===1){
return queue[0];
}

var nextState=babelHelpers.extends({},replace?queue[0]:inst.state);
for(var i=replace?1:0;i<queue.length;i++){
var partial=queue[i];
babelHelpers.extends(
nextState,
typeof partial==='function'?
partial.call(inst,nextState,props,context):
partial);

}

return nextState;
},













_performComponentUpdate:function _performComponentUpdate(
nextElement,
nextProps,
nextState,
nextContext,
transaction,
unmaskedContext)
{var _this2=this;
var inst=this._instance;

var hasComponentDidUpdate=Boolean(inst.componentDidUpdate);
var prevProps;
var prevState;
var prevContext;
if(hasComponentDidUpdate){
prevProps=inst.props;
prevState=inst.state;
prevContext=inst.context;
}

if(inst.componentWillUpdate){
if(__DEV__){
measureLifeCyclePerf(
function(){return inst.componentWillUpdate(nextProps,nextState,nextContext);},
this._debugID,
'componentWillUpdate');

}else{
inst.componentWillUpdate(nextProps,nextState,nextContext);
}
}

this._currentElement=nextElement;
this._context=unmaskedContext;
inst.props=nextProps;
inst.state=nextState;
inst.context=nextContext;

this._updateRenderedComponent(transaction,unmaskedContext);

if(hasComponentDidUpdate){
if(__DEV__){
transaction.getReactMountReady().enqueue(function(){
measureLifeCyclePerf(
inst.componentDidUpdate.bind(inst,prevProps,prevState,prevContext),
_this2._debugID,
'componentDidUpdate');

});
}else{
transaction.getReactMountReady().enqueue(
inst.componentDidUpdate.bind(inst,prevProps,prevState,prevContext),
inst);

}
}
},







_updateRenderedComponent:function _updateRenderedComponent(transaction,context){
var prevComponentInstance=this._renderedComponent;
var prevRenderedElement=prevComponentInstance._currentElement;
var nextRenderedElement=this._renderValidatedComponent();

var debugID=0;
if(__DEV__){
debugID=this._debugID;
}

if(shouldUpdateReactComponent(prevRenderedElement,nextRenderedElement)){
ReactReconciler.receiveComponent(
prevComponentInstance,
nextRenderedElement,
transaction,
this._processChildContext(context));

}else{
var oldHostNode=ReactReconciler.getHostNode(prevComponentInstance);
ReactReconciler.unmountComponent(prevComponentInstance,false);

var nodeType=ReactNodeTypes.getType(nextRenderedElement);
this._renderedNodeType=nodeType;
var child=this._instantiateReactComponent(
nextRenderedElement,
nodeType!==ReactNodeTypes.EMPTY);

this._renderedComponent=child;

var nextMarkup=ReactReconciler.mountComponent(
child,
transaction,
this._hostParent,
this._hostContainerInfo,
this._processChildContext(context),
debugID);


if(__DEV__){
if(debugID!==0){
var childDebugIDs=child._debugID!==0?[child._debugID]:[];
ReactInstrumentation.debugTool.onSetChildren(debugID,childDebugIDs);
}
}

this._replaceNodeWithMarkup(
oldHostNode,
nextMarkup,
prevComponentInstance);

}
},






_replaceNodeWithMarkup:function _replaceNodeWithMarkup(oldHostNode,nextMarkup,prevInstance){
ReactComponentEnvironment.replaceNodeWithMarkup(
oldHostNode,
nextMarkup,
prevInstance);

},




_renderValidatedComponentWithoutOwnerOrContext:function _renderValidatedComponentWithoutOwnerOrContext(){
var inst=this._instance;
var renderedElement;

if(__DEV__){
renderedElement=measureLifeCyclePerf(
function(){return inst.render();},
this._debugID,
'render');

}else{
renderedElement=inst.render();
}

if(__DEV__){

if(renderedElement===undefined&&
inst.render._isMockFunction){


renderedElement=null;
}
}

return renderedElement;
},




_renderValidatedComponent:function _renderValidatedComponent(){
var renderedElement;
if(__DEV__||this._compositeType!==CompositeTypes.StatelessFunctional){
ReactCurrentOwner.current=this;
try{
renderedElement=
this._renderValidatedComponentWithoutOwnerOrContext();
}finally{
ReactCurrentOwner.current=null;
}
}else{
renderedElement=
this._renderValidatedComponentWithoutOwnerOrContext();
}
invariant(

renderedElement===null||renderedElement===false||
React.isValidElement(renderedElement),
'%s.render(): A valid React element (or null) must be returned. You may have '+
'returned undefined, an array or some other invalid object.',
this.getName()||'ReactCompositeComponent');


return renderedElement;
},









attachRef:function attachRef(ref,component,transaction){
var inst=this.getPublicInstance();
invariant(inst!=null,'Stateless function components cannot have refs.');
var publicComponentInstance=component.getPublicInstance(transaction);
if(__DEV__){
var componentName=component&&component.getName?
component.getName():'a component';
warning(
publicComponentInstance!=null||
component._compositeType!==CompositeTypes.StatelessFunctional,
'Stateless function components cannot be given refs '+
'(See ref "%s" in %s created by %s). '+
'Attempts to access this ref will fail.',
ref,
componentName,
this.getName());

}
var refs=inst.refs===emptyObject?inst.refs={}:inst.refs;
refs[ref]=publicComponentInstance;
},








detachRef:function detachRef(ref){
var refs=this.getPublicInstance().refs;
delete refs[ref];
},







getName:function getName(){
var type=this._currentElement.type;
var constructor=this._instance&&this._instance.constructor;
return(
type.displayName||constructor&&constructor.displayName||
type.name||constructor&&constructor.name||
null);

},









getPublicInstance:function getPublicInstance(){
var inst=this._instance;
if(this._compositeType===CompositeTypes.StatelessFunctional){
return null;
}
return inst;
},


_instantiateReactComponent:null};



module.exports=ReactCompositeComponent;
}, 155, null, "ReactCompositeComponent");
__d(/* ReactNodeTypes */function(global, require, module, exports) {











'use strict';



var React=require(78 /* React */);

var invariant=require(26 /* fbjs/lib/invariant */);

var ReactNodeTypes={
HOST:0,
COMPOSITE:1,
EMPTY:2,

getType:function getType(node){
if(node===null||node===false){
return ReactNodeTypes.EMPTY;
}else if(React.isValidElement(node)){
if(typeof node.type==='function'){
return ReactNodeTypes.COMPOSITE;
}else{
return ReactNodeTypes.HOST;
}
}
invariant(false,'Unexpected node: %s',node);
}};


module.exports=ReactNodeTypes;
}, 156, null, "ReactNodeTypes");
__d(/* checkReactTypeSpec */function(global, require, module, exports) {










'use strict';

var ReactPropTypeLocationNames=require(158 /* ReactPropTypeLocationNames */);
var ReactPropTypesSecret=require(159 /* ReactPropTypesSecret */);

var invariant=require(26 /* fbjs/lib/invariant */);
var warning=require(15 /* fbjs/lib/warning */);



var ReactComponentTreeHook;

if(
typeof process!=='undefined'&&
process.env&&
process.env.NODE_ENV==='test')
{





ReactComponentTreeHook=require(36 /* react/lib/ReactComponentTreeHook */);
}

var loggedTypeFailures={};













function checkReactTypeSpec(
typeSpecs,
values,
location,
componentName,
element,
debugID)
{
for(var typeSpecName in typeSpecs){
if(typeSpecs.hasOwnProperty(typeSpecName)){
var error;



try{


invariant(
typeof typeSpecs[typeSpecName]==='function',
'%s: %s type `%s` is invalid; it must be a function, usually from '+
'React.PropTypes.',
componentName||'React class',
ReactPropTypeLocationNames[location],
typeSpecName);

error=typeSpecs[typeSpecName](values,typeSpecName,componentName,location,null,ReactPropTypesSecret);
}catch(ex){
error=ex;
}
warning(
!error||error instanceof Error,
'%s: type specification of %s `%s` is invalid; the type checker '+
'function must return `null` or an `Error` but returned a %s. '+
'You may have forgotten to pass an argument to the type checker '+
'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and '+
'shape all require an argument).',
componentName||'React class',
ReactPropTypeLocationNames[location],
typeSpecName,
typeof error);

if(error instanceof Error&&!(error.message in loggedTypeFailures)){


loggedTypeFailures[error.message]=true;

var componentStackInfo='';

if(__DEV__){
if(!ReactComponentTreeHook){
ReactComponentTreeHook=require(36 /* react/lib/ReactComponentTreeHook */);
}
if(debugID!==null){
componentStackInfo=ReactComponentTreeHook.getStackAddendumByID(debugID);
}else if(element!==null){
componentStackInfo=ReactComponentTreeHook.getCurrentStackAddendum(element);
}
}

warning(
false,
'Failed %s type: %s%s',
location,
error.message,
componentStackInfo);

}
}
}
}

module.exports=checkReactTypeSpec;
}, 157, null, "checkReactTypeSpec");
__d(/* ReactPropTypeLocationNames */function(global, require, module, exports) {











'use strict';





var ReactPropTypeLocationNames={};

if(__DEV__){
ReactPropTypeLocationNames={
prop:'prop',
context:'context',
childContext:'child context'};

}

module.exports=ReactPropTypeLocationNames;
}, 158, null, "ReactPropTypeLocationNames");
__d(/* ReactPropTypesSecret */function(global, require, module, exports) {











'use strict';

var ReactPropTypesSecret='SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports=ReactPropTypesSecret;
}, 159, null, "ReactPropTypesSecret");
__d(/* fbjs/lib/shallowEqual.js */function(global, require, module, exports) {













'use strict';

var hasOwnProperty=Object.prototype.hasOwnProperty;





function is(x,y){

if(x===y){



return x!==0||y!==0||1/x===1/y;
}else{

return x!==x&&y!==y;
}
}






function shallowEqual(objA,objB){
if(is(objA,objB)){
return true;
}

if(typeof objA!=='object'||objA===null||typeof objB!=='object'||objB===null){
return false;
}

var keysA=Object.keys(objA);
var keysB=Object.keys(objB);

if(keysA.length!==keysB.length){
return false;
}


for(var i=0;i<keysA.length;i++){
if(!hasOwnProperty.call(objB,keysA[i])||!is(objA[keysA[i]],objB[keysA[i]])){
return false;
}
}

return true;
}

module.exports=shallowEqual;
}, 160, null, "fbjs/lib/shallowEqual.js");
__d(/* shouldUpdateReactComponent */function(global, require, module, exports) {










'use strict';












function shouldUpdateReactComponent(prevElement,nextElement){
var prevEmpty=prevElement===null||prevElement===false;
var nextEmpty=nextElement===null||nextElement===false;
if(prevEmpty||nextEmpty){
return prevEmpty===nextEmpty;
}

var prevType=typeof prevElement;
var nextType=typeof nextElement;
if(prevType==='string'||prevType==='number'){
return nextType==='string'||nextType==='number';
}else{
return(
nextType==='object'&&
prevElement.type===nextElement.type&&
prevElement.key===nextElement.key);

}
}

module.exports=shouldUpdateReactComponent;
}, 161, null, "shouldUpdateReactComponent");
__d(/* ReactEmptyComponent */function(global, require, module, exports) {










'use strict';

var emptyComponentFactory;

var ReactEmptyComponentInjection={
injectEmptyComponentFactory:function injectEmptyComponentFactory(factory){
emptyComponentFactory=factory;
}};


var ReactEmptyComponent={
create:function create(instantiate){
return emptyComponentFactory(instantiate);
}};


ReactEmptyComponent.injection=ReactEmptyComponentInjection;

module.exports=ReactEmptyComponent;
}, 162, null, "ReactEmptyComponent");
__d(/* ReactHostComponent */function(global, require, module, exports) {










'use strict';

var invariant=require(26 /* fbjs/lib/invariant */);

var genericComponentClass=null;

var tagToComponentClass={};
var textComponentClass=null;

var ReactHostComponentInjection={


injectGenericComponentClass:function injectGenericComponentClass(componentClass){
genericComponentClass=componentClass;
},


injectTextComponentClass:function injectTextComponentClass(componentClass){
textComponentClass=componentClass;
},


injectComponentClasses:function injectComponentClasses(componentClasses){
babelHelpers.extends(tagToComponentClass,componentClasses);
}};








function createInternalComponent(element){
invariant(
genericComponentClass,
'There is no registered component for the tag %s',
element.type);

return new genericComponentClass(element);
}





function createInstanceForText(text){
return new textComponentClass(text);
}





function isTextComponent(component){
return component instanceof textComponentClass;
}

var ReactHostComponent={
createInternalComponent:createInternalComponent,
createInstanceForText:createInstanceForText,
isTextComponent:isTextComponent,
injection:ReactHostComponentInjection};


module.exports=ReactHostComponent;
}, 163, null, "ReactHostComponent");
__d(/* KeyEscapeUtils */function(global, require, module, exports) {











'use strict';







function escape(key){
var escapeRegex=/[=:]/g;
var escaperLookup={
'=':'=0',
':':'=2'};

var escapedString=(''+key).replace(
escapeRegex,
function(match){
return escaperLookup[match];
});


return'$'+escapedString;
}







function unescape(key){
var unescapeRegex=/(=0|=2)/g;
var unescaperLookup={
'=0':'=',
'=2':':'};

var keySubstring=key[0]==='.'&&key[1]==='$'?
key.substring(2):key.substring(1);

return(''+keySubstring).replace(
unescapeRegex,
function(match){
return unescaperLookup[match];
});

}

var KeyEscapeUtils={
escape:escape,
unescape:unescape};


module.exports=KeyEscapeUtils;
}, 164, null, "KeyEscapeUtils");
__d(/* traverseAllChildren */function(global, require, module, exports) {










'use strict';

var ReactCurrentOwner=require(38 /* react/lib/ReactCurrentOwner */);
var REACT_ELEMENT_TYPE=require(166 /* ReactElementSymbol */);

var getIteratorFn=require(167 /* getIteratorFn */);
var invariant=require(26 /* fbjs/lib/invariant */);
var KeyEscapeUtils=require(164 /* KeyEscapeUtils */);
var warning=require(15 /* fbjs/lib/warning */);

var SEPARATOR='.';
var SUBSEPARATOR=':';












var didWarnAboutMaps=false;








function getComponentKey(component,index){


if(component&&typeof component==='object'&&component.key!=null){

return KeyEscapeUtils.escape(component.key);
}

return index.toString(36);
}









function traverseAllChildrenImpl(
children,
nameSoFar,
callback,
traverseContext)
{
var type=typeof children;

if(type==='undefined'||type==='boolean'){

children=null;
}

if(children===null||
type==='string'||
type==='number'||


type==='object'&&children.$$typeof===REACT_ELEMENT_TYPE){
callback(
traverseContext,
children,


nameSoFar===''?SEPARATOR+getComponentKey(children,0):nameSoFar);

return 1;
}

var child;
var nextName;
var subtreeCount=0;
var nextNamePrefix=nameSoFar===''?SEPARATOR:nameSoFar+SUBSEPARATOR;

if(Array.isArray(children)){
for(var i=0;i<children.length;i++){
child=children[i];
nextName=nextNamePrefix+getComponentKey(child,i);
subtreeCount+=traverseAllChildrenImpl(
child,
nextName,
callback,
traverseContext);

}
}else{
var iteratorFn=getIteratorFn(children);
if(iteratorFn){
var iterator=iteratorFn.call(children);
var step;
if(iteratorFn!==children.entries){
var ii=0;
while(!(step=iterator.next()).done){
child=step.value;
nextName=nextNamePrefix+getComponentKey(child,ii++);
subtreeCount+=traverseAllChildrenImpl(
child,
nextName,
callback,
traverseContext);

}
}else{
if(__DEV__){
var mapsAsChildrenAddendum='';
if(ReactCurrentOwner.current){
var mapsAsChildrenOwnerName=ReactCurrentOwner.current.getName();
if(mapsAsChildrenOwnerName){
mapsAsChildrenAddendum=' Check the render method of `'+mapsAsChildrenOwnerName+'`.';
}
}
warning(
didWarnAboutMaps,
'Using Maps as children is not yet fully supported. It is an '+
'experimental feature that might be removed. Convert it to a '+
'sequence / iterable of keyed ReactElements instead.%s',
mapsAsChildrenAddendum);

didWarnAboutMaps=true;
}

while(!(step=iterator.next()).done){
var entry=step.value;
if(entry){
child=entry[1];
nextName=
nextNamePrefix+
KeyEscapeUtils.escape(entry[0])+SUBSEPARATOR+
getComponentKey(child,0);

subtreeCount+=traverseAllChildrenImpl(
child,
nextName,
callback,
traverseContext);

}
}
}
}else if(type==='object'){
var addendum='';
if(__DEV__){
addendum=
' If you meant to render a collection of children, use an array '+
'instead or wrap the object using createFragment(object) from the '+
'React add-ons.';
if(children._isReactElement){
addendum=
' It looks like you\'re using an element created by a different '+
'version of React. Make sure to use only one copy of React.';
}
if(ReactCurrentOwner.current){
var name=ReactCurrentOwner.current.getName();
if(name){
addendum+=' Check the render method of `'+name+'`.';
}
}
}
var childrenString=String(children);
invariant(
false,
'Objects are not valid as a React child (found: %s).%s',
childrenString==='[object Object]'?
'object with keys {'+Object.keys(children).join(', ')+'}':
childrenString,
addendum);

}
}

return subtreeCount;
}

















function traverseAllChildren(children,callback,traverseContext){
if(children==null){
return 0;
}

return traverseAllChildrenImpl(children,'',callback,traverseContext);
}

module.exports=traverseAllChildren;
}, 165, null, "traverseAllChildren");
__d(/* ReactElementSymbol */function(global, require, module, exports) {











'use strict';



var REACT_ELEMENT_TYPE=
typeof Symbol==='function'&&(typeof Symbol==='function'?Symbol.for:'@@for')&&(typeof Symbol==='function'?Symbol.for:'@@for')('react.element')||
0xeac7;

module.exports=REACT_ELEMENT_TYPE;
}, 166, null, "ReactElementSymbol");
__d(/* getIteratorFn */function(global, require, module, exports) {











'use strict';


var ITERATOR_SYMBOL=typeof Symbol==='function'&&(typeof Symbol==='function'?Symbol.iterator:'@@iterator');
var FAUX_ITERATOR_SYMBOL='@@iterator';















function getIteratorFn(maybeIterable){
var iteratorFn=maybeIterable&&(
ITERATOR_SYMBOL&&maybeIterable[ITERATOR_SYMBOL]||
maybeIterable[FAUX_ITERATOR_SYMBOL]);

if(typeof iteratorFn==='function'){
return iteratorFn;
}
}

module.exports=getIteratorFn;
}, 167, null, "getIteratorFn");
__d(/* flattenChildren */function(global, require, module, exports) {










'use strict';

var KeyEscapeUtils=require(164 /* KeyEscapeUtils */);
var traverseAllChildren=require(165 /* traverseAllChildren */);
var warning=require(15 /* fbjs/lib/warning */);

var ReactComponentTreeHook;

if(
typeof process!=='undefined'&&
process.env&&
process.env.NODE_ENV==='test')
{





ReactComponentTreeHook=require(36 /* react/lib/ReactComponentTreeHook */);
}







function flattenSingleChildIntoContext(
traverseContext,
child,
name,
selfDebugID)
{

if(traverseContext&&typeof traverseContext==='object'){
var result=traverseContext;
var keyUnique=result[name]===undefined;
if(__DEV__){
if(!ReactComponentTreeHook){
ReactComponentTreeHook=require(36 /* react/lib/ReactComponentTreeHook */);
}
if(!keyUnique){
warning(
false,
'flattenChildren(...): Encountered two children with the same key, '+
'`%s`. Child keys must be unique; when two children share a key, only '+
'the first child will be used.%s',
KeyEscapeUtils.unescape(name),
ReactComponentTreeHook.getStackAddendumByID(selfDebugID));

}
}
if(keyUnique&&child!=null){
result[name]=child;
}
}
}






function flattenChildren(
children,
selfDebugID)
{
if(children==null){
return children;
}
var result={};

if(__DEV__){
traverseAllChildren(
children,
function(traverseContext,child,name){return flattenSingleChildIntoContext(
traverseContext,
child,
name,
selfDebugID);},

result);

}else{
traverseAllChildren(children,flattenSingleChildIntoContext,result);
}
return result;
}

module.exports=flattenChildren;
}, 168, null, "flattenChildren");
__d(/* insetsDiffer */function(global, require, module, exports) {










'use strict';








var dummyInsets={
top:undefined,
left:undefined,
right:undefined,
bottom:undefined};


var insetsDiffer=function insetsDiffer(
one,
two)
{
one=one||dummyInsets;
two=two||dummyInsets;
return one!==two&&(
one.top!==two.top||
one.left!==two.left||
one.right!==two.right||
one.bottom!==two.bottom);

};

module.exports=insetsDiffer;
}, 169, null, "insetsDiffer");
__d(/* pointsDiffer */function(global, require, module, exports) {










'use strict';






var dummyPoint={x:undefined,y:undefined};

var pointsDiffer=function pointsDiffer(one,two){
one=one||dummyPoint;
two=two||dummyPoint;
return one!==two&&(
one.x!==two.x||
one.y!==two.y);

};

module.exports=pointsDiffer;
}, 170, null, "pointsDiffer");
__d(/* resolveAssetSource */function(global, require, module, exports) {












'use strict';



var AssetRegistry=require(172 /* AssetRegistry */);
var AssetSourceResolver=require(173 /* AssetSourceResolver */);var _require=
require(29 /* NativeModules */),SourceCode=_require.SourceCode;

var _customSourceTransformer=void 0,_serverURL=void 0,_bundleSourcePath=void 0;

function getDevServerURL(){
if(_serverURL===undefined){
var scriptURL=SourceCode.scriptURL;
var match=scriptURL&&scriptURL.match(/^https?:\/\/.*?\//);
if(match){

_serverURL=match[0];
}else{

_serverURL=null;
}
}
return _serverURL;
}

function getBundleSourcePath(){
if(_bundleSourcePath===undefined){
var scriptURL=SourceCode.scriptURL;
if(!scriptURL){

_bundleSourcePath=null;
return _bundleSourcePath;
}
if(scriptURL.startsWith('assets://')){

_bundleSourcePath=null;
return _bundleSourcePath;
}
if(scriptURL.startsWith('file://')){

_bundleSourcePath=scriptURL.substring(7,scriptURL.lastIndexOf('/')+1);
}else{
_bundleSourcePath=scriptURL.substring(0,scriptURL.lastIndexOf('/')+1);
}
}

return _bundleSourcePath;
}

function setCustomSourceTransformer(
transformer)
{
_customSourceTransformer=transformer;
}





function resolveAssetSource(source){
if(typeof source==='object'){
return source;
}

var asset=AssetRegistry.getAssetByID(source);
if(!asset){
return null;
}

var resolver=new AssetSourceResolver(getDevServerURL(),getBundleSourcePath(),asset);
if(_customSourceTransformer){
return _customSourceTransformer(resolver);
}
return resolver.defaultAsset();
}

module.exports=resolveAssetSource;
module.exports.pickScale=AssetSourceResolver.pickScale;
module.exports.setCustomSourceTransformer=setCustomSourceTransformer;
}, 171, null, "resolveAssetSource");
__d(/* AssetRegistry */function(global, require, module, exports) {





'use strict';














var assets=[];

function registerAsset(asset){


return assets.push(asset);
}

function getAssetByID(assetId){
return assets[assetId-1];
}

module.exports={registerAsset:registerAsset,getAssetByID:getAssetByID};
}, 172, null, "AssetRegistry");
__d(/* AssetSourceResolver */function(global, require, module, exports) {










'use strict';











var PixelRatio=require(102 /* PixelRatio */);
var Platform=require(28 /* Platform */);

var assetPathUtils=require(174 /* ../../local-cli/bundle/assetPathUtils */);
var invariant=require(26 /* fbjs/lib/invariant */);




function getScaledAssetPath(asset){
var scale=AssetSourceResolver.pickScale(asset.scales,PixelRatio.get());
var scaleSuffix=scale===1?'':'@'+scale+'x';
var assetDir=assetPathUtils.getBasePath(asset);
return assetDir+'/'+asset.name+scaleSuffix+'.'+asset.type;
}




function getAssetPathInDrawableFolder(asset){
var scale=AssetSourceResolver.pickScale(asset.scales,PixelRatio.get());
var drawbleFolder=assetPathUtils.getAndroidDrawableFolderName(asset,scale);
var fileName=assetPathUtils.getAndroidResourceIdentifier(asset);
return drawbleFolder+'/'+fileName+'.'+asset.type;
}var

AssetSourceResolver=function(){







function AssetSourceResolver(serverUrl,bundlePath,asset){babelHelpers.classCallCheck(this,AssetSourceResolver);
this.serverUrl=serverUrl;
this.bundlePath=bundlePath;
this.asset=asset;
}babelHelpers.createClass(AssetSourceResolver,[{key:'isLoadedFromServer',value:function isLoadedFromServer()

{
return!!this.serverUrl;
}},{key:'isLoadedFromFileSystem',value:function isLoadedFromFileSystem()

{
return!!this.bundlePath;
}},{key:'defaultAsset',value:function defaultAsset()

{
if(this.isLoadedFromServer()){
return this.assetServerURL();
}

if(Platform.OS==='android'){
return this.isLoadedFromFileSystem()?
this.drawableFolderInBundle():
this.resourceIdentifierWithoutScale();
}else{
return this.scaledAssetPathInBundle();
}
}},{key:'assetServerURL',value:function assetServerURL()





{
invariant(!!this.serverUrl,'need server to load from');
return this.fromSource(
this.serverUrl+getScaledAssetPath(this.asset)+
'?platform='+Platform.OS+'&hash='+this.asset.hash);

}},{key:'scaledAssetPath',value:function scaledAssetPath()





{
return this.fromSource(getScaledAssetPath(this.asset));
}},{key:'scaledAssetPathInBundle',value:function scaledAssetPathInBundle()





{
var path=this.bundlePath||'';
return this.fromSource(path+getScaledAssetPath(this.asset));
}},{key:'resourceIdentifierWithoutScale',value:function resourceIdentifierWithoutScale()







{
invariant(Platform.OS==='android','resource identifiers work on Android');
return this.fromSource(assetPathUtils.getAndroidResourceIdentifier(this.asset));
}},{key:'drawableFolderInBundle',value:function drawableFolderInBundle()






{
var path=this.bundlePath||'';
return this.fromSource(
'file://'+path+getAssetPathInDrawableFolder(this.asset));

}},{key:'fromSource',value:function fromSource(

source){
return{
__packager_asset:true,
width:this.asset.width,
height:this.asset.height,
uri:source,
scale:AssetSourceResolver.pickScale(this.asset.scales,PixelRatio.get())};

}}],[{key:'pickScale',value:function pickScale(

scales,deviceScale){

for(var i=0;i<scales.length;i++){
if(scales[i]>=deviceScale){
return scales[i];
}
}




return scales[scales.length-1]||1;
}}]);return AssetSourceResolver;}();



module.exports=AssetSourceResolver;
}, 173, null, "AssetSourceResolver");
__d(/* react-native/local-cli/bundle/assetPathUtils.js */function(global, require, module, exports) {







'use strict';

function getAndroidAssetSuffix(scale){
switch(scale){
case 0.75:return'ldpi';
case 1:return'mdpi';
case 1.5:return'hdpi';
case 2:return'xhdpi';
case 3:return'xxhdpi';
case 4:return'xxxhdpi';}

}

function getAndroidDrawableFolderName(asset,scale){
var suffix=getAndroidAssetSuffix(scale);
if(!suffix){
throw new Error(
'Don\'t know which android drawable suffix to use for asset: '+
JSON.stringify(asset));

}
var androidFolder='drawable-'+suffix;
return androidFolder;
}

function getAndroidResourceIdentifier(asset){
var folderPath=getBasePath(asset);
return(folderPath+'/'+asset.name).
toLowerCase().
replace(/\//g,'_').
replace(/([^a-z0-9_])/g,'').
replace(/^assets_/,'');
}

function getBasePath(asset){
var basePath=asset.httpServerLocation;
if(basePath[0]==='/'){
basePath=basePath.substr(1);
}
return basePath;
}

module.exports={
getAndroidAssetSuffix:getAndroidAssetSuffix,
getAndroidDrawableFolderName:getAndroidDrawableFolderName,
getAndroidResourceIdentifier:getAndroidResourceIdentifier,
getBasePath:getBasePath};
}, 174, null, "react-native/local-cli/bundle/assetPathUtils.js");
__d(/* verifyPropTypes */function(global, require, module, exports) {










'use strict';

var ReactNativeStyleAttributes=require(104 /* ReactNativeStyleAttributes */);







function verifyPropTypes(
componentInterface,
viewConfig,
nativePropsToIgnore)
{
if(!viewConfig){
return;
}
var componentName=
componentInterface.displayName||
componentInterface.name||
'unknown';

if(!componentInterface.propTypes){
throw new Error(
'`'+componentName+'` has no propTypes defined`');

}

var nativeProps=viewConfig.NativeProps;
for(var prop in nativeProps){
if(!componentInterface.propTypes[prop]&&
!ReactNativeStyleAttributes[prop]&&(
!nativePropsToIgnore||!nativePropsToIgnore[prop])){
var message;
if(componentInterface.propTypes.hasOwnProperty(prop)){
message='`'+componentName+'` has incorrectly defined propType for native prop `'+
viewConfig.uiViewClassName+'.'+prop+'` of native type `'+nativeProps[prop];
}else{
message='`'+componentName+'` has no propType for native prop `'+
viewConfig.uiViewClassName+'.'+prop+'` of native type `'+
nativeProps[prop]+'`';
}
message+='\nIf you haven\'t changed this prop yourself, this usually means that '+
'your versions of the native code and JavaScript code are out of sync. Updating both '+
'should make this error go away.';
throw new Error(message);
}
}
}

module.exports=verifyPropTypes;
}, 175, null, "verifyPropTypes");
__d(/* ReactNativeART */function(global, require, module, exports) {









'use strict';

var Color=require(177 /* art/core/color */);
var Path=require(178 /* ARTSerializablePath */);
var Transform=require(181 /* art/core/transform */);

var React=require(78 /* React */);
var ReactNativeViewAttributes=require(126 /* ReactNativeViewAttributes */);

var createReactNativeComponentClass=require(130 /* createReactNativeComponentClass */);
var merge=require(123 /* merge */);
var invariant=require(26 /* fbjs/lib/invariant */);



function arrayDiffer(a,b){
if(a==null||b==null){
return true;
}
if(a.length!==b.length){
return true;
}
for(var i=0;i<a.length;i++){
if(a[i]!==b[i]){
return true;
}
}
return false;
}

function fontAndLinesDiffer(a,b){
if(a===b){
return false;
}
if(a.font!==b.font){
if(a.font===null){
return true;
}
if(b.font===null){
return true;
}

if(
a.font.fontFamily!==b.font.fontFamily||
a.font.fontSize!==b.font.fontSize||
a.font.fontWeight!==b.font.fontWeight||
a.font.fontStyle!==b.font.fontStyle)
{
return true;
}
}
return arrayDiffer(a.lines,b.lines);
}



var SurfaceViewAttributes=merge(ReactNativeViewAttributes.UIView,{});





var NodeAttributes={
transform:{diff:arrayDiffer},
opacity:true};


var GroupAttributes=merge(NodeAttributes,{
clipping:{diff:arrayDiffer}});


var RenderableAttributes=merge(NodeAttributes,{
fill:{diff:arrayDiffer},
stroke:{diff:arrayDiffer},
strokeWidth:true,
strokeCap:true,
strokeJoin:true,
strokeDash:{diff:arrayDiffer}});


var ShapeAttributes=merge(RenderableAttributes,{
d:{diff:arrayDiffer}});


var TextAttributes=merge(RenderableAttributes,{
alignment:true,
frame:{diff:fontAndLinesDiffer},
path:{diff:arrayDiffer}});




var NativeSurfaceView=createReactNativeComponentClass({
validAttributes:SurfaceViewAttributes,
uiViewClassName:'ARTSurfaceView'});


var NativeGroup=createReactNativeComponentClass({
validAttributes:GroupAttributes,
uiViewClassName:'ARTGroup'});


var NativeShape=createReactNativeComponentClass({
validAttributes:ShapeAttributes,
uiViewClassName:'ARTShape'});


var NativeText=createReactNativeComponentClass({
validAttributes:TextAttributes,
uiViewClassName:'ARTText'});




function childrenAsString(children){
if(!children){
return'';
}
if(typeof children==='string'){
return children;
}
if(children.length){
return children.join('\n');
}
return'';
}var



Surface=function(_React$Component){babelHelpers.inherits(Surface,_React$Component);function Surface(){babelHelpers.classCallCheck(this,Surface);return babelHelpers.possibleConstructorReturn(this,(Surface.__proto__||Object.getPrototypeOf(Surface)).apply(this,arguments));}babelHelpers.createClass(Surface,[{key:'getChildContext',value:function getChildContext()




{
return{isInSurface:true};
}},{key:'render',value:function render()

{
var props=this.props;
var w=extractNumber(props.width,0);
var h=extractNumber(props.height,0);
return(
React.createElement(NativeSurfaceView,{style:[props.style,{width:w,height:h}]},
this.props.children));


}}]);return Surface;}(React.Component);Surface.childContextTypes={isInSurface:React.PropTypes.bool};







function extractNumber(value,defaultValue){
if(value==null){
return defaultValue;
}
return+value;
}

var pooledTransform=new Transform();

function extractTransform(props){
var scaleX=props.scaleX!=null?props.scaleX:
props.scale!=null?props.scale:1;
var scaleY=props.scaleY!=null?props.scaleY:
props.scale!=null?props.scale:1;

pooledTransform.
transformTo(1,0,0,1,0,0).
move(props.x||0,props.y||0).
rotate(props.rotation||0,props.originX,props.originY).
scale(scaleX,scaleY,props.originX,props.originY);

if(props.transform!=null){
pooledTransform.transform(props.transform);
}

return[
pooledTransform.xx,pooledTransform.yx,
pooledTransform.xy,pooledTransform.yy,
pooledTransform.x,pooledTransform.y];

}

function extractOpacity(props){

if(props.visible===false){
return 0;
}
if(props.opacity==null){
return 1;
}
return+props.opacity;
}var






Group=function(_React$Component2){babelHelpers.inherits(Group,_React$Component2);function Group(){babelHelpers.classCallCheck(this,Group);return babelHelpers.possibleConstructorReturn(this,(Group.__proto__||Object.getPrototypeOf(Group)).apply(this,arguments));}babelHelpers.createClass(Group,[{key:'render',value:function render()




{
var props=this.props;
invariant(
this.context.isInSurface,
'ART: <Group /> must be a child of a <Surface />');

return(
React.createElement(NativeGroup,{
opacity:extractOpacity(props),
transform:extractTransform(props)},
this.props.children));


}}]);return Group;}(React.Component);Group.contextTypes={isInSurface:React.PropTypes.bool.isRequired};var


ClippingRectangle=function(_React$Component3){babelHelpers.inherits(ClippingRectangle,_React$Component3);function ClippingRectangle(){babelHelpers.classCallCheck(this,ClippingRectangle);return babelHelpers.possibleConstructorReturn(this,(ClippingRectangle.__proto__||Object.getPrototypeOf(ClippingRectangle)).apply(this,arguments));}babelHelpers.createClass(ClippingRectangle,[{key:'render',value:function render()
{
var props=this.props;
var x=extractNumber(props.x,0);
var y=extractNumber(props.y,0);
var w=extractNumber(props.width,0);
var h=extractNumber(props.height,0);
var clipping=[x,y,w,h];

var propsExcludingXAndY=merge(props);
delete propsExcludingXAndY.x;
delete propsExcludingXAndY.y;
return(
React.createElement(NativeGroup,{
clipping:clipping,
opacity:extractOpacity(props),
transform:extractTransform(propsExcludingXAndY)},
this.props.children));


}}]);return ClippingRectangle;}(React.Component);




var SOLID_COLOR=0;
var LINEAR_GRADIENT=1;
var RADIAL_GRADIENT=2;
var PATTERN=3;

function insertColorIntoArray(color,targetArray,atIndex){
var c=new Color(color);
targetArray[atIndex+0]=c.red/255;
targetArray[atIndex+1]=c.green/255;
targetArray[atIndex+2]=c.blue/255;
targetArray[atIndex+3]=c.alpha;
}

function insertColorsIntoArray(stops,targetArray,atIndex){
var i=0;
if('length'in stops){
while(i<stops.length){
insertColorIntoArray(stops[i],targetArray,atIndex+i*4);
i++;
}
}else{
for(var offset in stops){
insertColorIntoArray(stops[offset],targetArray,atIndex+i*4);
i++;
}
}
return atIndex+i*4;
}

function insertOffsetsIntoArray(stops,targetArray,atIndex,multi,reverse){
var offsetNumber;
var i=0;
if('length'in stops){
while(i<stops.length){
offsetNumber=i/(stops.length-1)*multi;
targetArray[atIndex+i]=reverse?1-offsetNumber:offsetNumber;
i++;
}
}else{
for(var offsetString in stops){
offsetNumber=+offsetString*multi;
targetArray[atIndex+i]=reverse?1-offsetNumber:offsetNumber;
i++;
}
}
return atIndex+i;
}

function insertColorStopsIntoArray(stops,targetArray,atIndex){
var lastIndex=insertColorsIntoArray(stops,targetArray,atIndex);
insertOffsetsIntoArray(stops,targetArray,lastIndex,1,false);
}

function insertDoubleColorStopsIntoArray(stops,targetArray,atIndex){
var lastIndex=insertColorsIntoArray(stops,targetArray,atIndex);
lastIndex=insertColorsIntoArray(stops,targetArray,lastIndex);
lastIndex=insertOffsetsIntoArray(stops,targetArray,lastIndex,0.5,false);
insertOffsetsIntoArray(stops,targetArray,lastIndex,0.5,true);
}

function applyBoundingBoxToBrushData(brushData,props){
var type=brushData[0];
var width=+props.width;
var height=+props.height;
if(type===LINEAR_GRADIENT){
brushData[1]*=width;
brushData[2]*=height;
brushData[3]*=width;
brushData[4]*=height;
}else if(type===RADIAL_GRADIENT){
brushData[1]*=width;
brushData[2]*=height;
brushData[3]*=width;
brushData[4]*=height;
brushData[5]*=width;
brushData[6]*=height;
}else if(type===PATTERN){

}
}

function extractBrush(colorOrBrush,props){
if(colorOrBrush==null){
return null;
}
if(colorOrBrush._brush){
if(colorOrBrush._bb){





applyBoundingBoxToBrushData(colorOrBrush._brush,props);
colorOrBrush._bb=false;
}
return colorOrBrush._brush;
}
var c=new Color(colorOrBrush);
return[SOLID_COLOR,c.red/255,c.green/255,c.blue/255,c.alpha];
}

function extractColor(color){
if(color==null){
return null;
}
var c=new Color(color);
return[c.red/255,c.green/255,c.blue/255,c.alpha];
}

function extractStrokeCap(strokeCap){
switch(strokeCap){
case'butt':return 0;
case'square':return 2;
default:return 1;}

}

function extractStrokeJoin(strokeJoin){
switch(strokeJoin){
case'miter':return 0;
case'bevel':return 2;
default:return 1;}

}var






Shape=function(_React$Component4){babelHelpers.inherits(Shape,_React$Component4);function Shape(){babelHelpers.classCallCheck(this,Shape);return babelHelpers.possibleConstructorReturn(this,(Shape.__proto__||Object.getPrototypeOf(Shape)).apply(this,arguments));}babelHelpers.createClass(Shape,[{key:'render',value:function render()
{
var props=this.props;
var path=props.d||childrenAsString(props.children);
var d=new Path(path).toJSON();
return(
React.createElement(NativeShape,{
fill:extractBrush(props.fill,props),
opacity:extractOpacity(props),
stroke:extractColor(props.stroke),
strokeCap:extractStrokeCap(props.strokeCap),
strokeDash:props.strokeDash||null,
strokeJoin:extractStrokeJoin(props.strokeJoin),
strokeWidth:extractNumber(props.strokeWidth,1),
transform:extractTransform(props),

d:d}));


}}]);return Shape;}(React.Component);




var cachedFontObjectsFromString={};

var fontFamilyPrefix=/^[\s"']*/;
var fontFamilySuffix=/[\s"']*$/;

function extractSingleFontFamily(fontFamilyString){



return fontFamilyString.split(',')[0].
replace(fontFamilyPrefix,'').
replace(fontFamilySuffix,'');
}

function parseFontString(font){
if(cachedFontObjectsFromString.hasOwnProperty(font)){
return cachedFontObjectsFromString[font];
}
var regexp=/^\s*((?:(?:normal|bold|italic)\s+)*)(?:(\d+(?:\.\d+)?)[ptexm\%]*(?:\s*\/.*?)?\s+)?\s*\"?([^\"]*)/i;
var match=regexp.exec(font);
if(!match){
return null;
}
var fontFamily=extractSingleFontFamily(match[3]);
var fontSize=+match[2]||12;
var isBold=/bold/.exec(match[1]);
var isItalic=/italic/.exec(match[1]);
cachedFontObjectsFromString[font]={
fontFamily:fontFamily,
fontSize:fontSize,
fontWeight:isBold?'bold':'normal',
fontStyle:isItalic?'italic':'normal'};

return cachedFontObjectsFromString[font];
}

function extractFont(font){
if(font==null){
return null;
}
if(typeof font==='string'){
return parseFontString(font);
}
var fontFamily=extractSingleFontFamily(font.fontFamily);
var fontSize=+font.fontSize||12;
return{

fontFamily:fontFamily,
fontSize:fontSize,
fontWeight:font.fontWeight,
fontStyle:font.fontStyle};

}

var newLine=/\n/g;
function extractFontAndLines(font,text){
return{font:extractFont(font),lines:text.split(newLine)};
}

function extractAlignment(alignment){
switch(alignment){
case'right':
return 1;
case'center':
return 2;
default:
return 0;}

}var

Text=function(_React$Component5){babelHelpers.inherits(Text,_React$Component5);function Text(){babelHelpers.classCallCheck(this,Text);return babelHelpers.possibleConstructorReturn(this,(Text.__proto__||Object.getPrototypeOf(Text)).apply(this,arguments));}babelHelpers.createClass(Text,[{key:'render',value:function render()
{
var props=this.props;
var textPath=props.path?new Path(props.path).toJSON():null;
var textFrame=extractFontAndLines(
props.font,
childrenAsString(props.children));

return(
React.createElement(NativeText,{
fill:extractBrush(props.fill,props),
opacity:extractOpacity(props),
stroke:extractColor(props.stroke),
strokeCap:extractStrokeCap(props.strokeCap),
strokeDash:props.strokeDash||null,
strokeJoin:extractStrokeJoin(props.strokeJoin),
strokeWidth:extractNumber(props.strokeWidth,1),
transform:extractTransform(props),

alignment:extractAlignment(props.alignment),
frame:textFrame,
path:textPath}));


}}]);return Text;}(React.Component);




function LinearGradient(stops,x1,y1,x2,y2){
var type=LINEAR_GRADIENT;

if(arguments.length<5){
var angle=(x1==null?270:x1)*Math.PI/180;

var x=Math.cos(angle);
var y=-Math.sin(angle);
var l=(Math.abs(x)+Math.abs(y))/2;

x*=l;y*=l;

x1=0.5-x;
x2=0.5+x;
y1=0.5-y;
y2=0.5+y;
this._bb=true;
}else{
this._bb=false;
}

var brushData=[type,+x1,+y1,+x2,+y2];
insertColorStopsIntoArray(stops,brushData,5);
this._brush=brushData;
}

function RadialGradient(stops,fx,fy,rx,ry,cx,cy){
if(ry==null){
ry=rx;
}
if(cx==null){
cx=fx;
}
if(cy==null){
cy=fy;
}
if(fx==null){


fx=fy=rx=ry=cx=cy=0.5;
this._bb=true;
}else{
this._bb=false;
}




var brushData=[RADIAL_GRADIENT,+fx,+fy,+rx*2,+ry*2,+cx,+cy];
insertDoubleColorStopsIntoArray(stops,brushData,7);
this._brush=brushData;
}

function Pattern(url,width,height,left,top){
this._brush=[PATTERN,url,+left||0,+top||0,+width,+height];
}

var ReactART={
LinearGradient:LinearGradient,
RadialGradient:RadialGradient,
Pattern:Pattern,
Transform:Transform,
Path:Path,
Surface:Surface,
Group:Group,
ClippingRectangle:ClippingRectangle,
Shape:Shape,
Text:Text};


module.exports=ReactART;
}, 176, null, "ReactNativeART");
__d(/* art/core/color.js */function(global, require, module, exports) {var colors={
maroon:'#800000',red:'#ff0000',orange:'#ffA500',yellow:'#ffff00',olive:'#808000',
purple:'#800080',fuchsia:"#ff00ff",white:'#ffffff',lime:'#00ff00',green:'#008000',
navy:'#000080',blue:'#0000ff',aqua:'#00ffff',teal:'#008080',
black:'#000000',silver:'#c0c0c0',gray:'#808080'};


var map=function map(array,fn){
var results=[];
for(var i=0,l=array.length;i<l;i++){
results[i]=fn(array[i],i);}
return results;
};

var Color=function Color(color,type){

if(color.isColor){

this.red=color.red;
this.green=color.green;
this.blue=color.blue;
this.alpha=color.alpha;

}else{

var namedColor=colors[color];
if(namedColor){
color=namedColor;
type='hex';
}

switch(typeof color){
case'string':if(!type)type=(type=color.match(/^rgb|^hsb|^hsl/))?type[0]:'hex';break;
case'object':type=type||'rgb';color=color.toString();break;
case'number':type='hex';color=color.toString(16);break;}


color=Color['parse'+type.toUpperCase()](color);
this.red=color[0];
this.green=color[1];
this.blue=color[2];
this.alpha=color[3];
}

this.isColor=true;

};

var limit=function limit(number,min,max){
return Math.min(max,Math.max(min,number));
};

var listMatch=/([-.\d]+\%?)\s*,\s*([-.\d]+\%?)\s*,\s*([-.\d]+\%?)\s*,?\s*([-.\d]*\%?)/;
var hexMatch=/^#?([a-f0-9]{1,2})([a-f0-9]{1,2})([a-f0-9]{1,2})([a-f0-9]{0,2})$/i;

Color.parseRGB=function(color){
return map(color.match(listMatch).slice(1),function(bit,i){
if(bit)bit=parseFloat(bit)*(bit[bit.length-1]=='%'?2.55:1);
return i<3?Math.round((bit%=256)<0?bit+256:bit):limit(bit===''?1:Number(bit),0,1);
});
};

Color.parseHEX=function(color){
if(color.length==1)color=color+color+color;
return map(color.match(hexMatch).slice(1),function(bit,i){
if(i==3)return bit?parseInt(bit,16)/255:1;
return parseInt(bit.length==1?bit+bit:bit,16);
});
};

Color.parseHSB=function(color){
var hsb=map(color.match(listMatch).slice(1),function(bit,i){
if(bit)bit=parseFloat(bit);
if(i===0)return Math.round((bit%=360)<0?bit+360:bit);else
if(i<3)return limit(Math.round(bit),0,100);else
return limit(bit===''?1:Number(bit),0,1);
});

var a=hsb[3];
var br=Math.round(hsb[2]/100*255);
if(hsb[1]==0)return[br,br,br,a];

var hue=hsb[0];
var f=hue%60;
var p=Math.round(hsb[2]*(100-hsb[1])/10000*255);
var q=Math.round(hsb[2]*(6000-hsb[1]*f)/600000*255);
var t=Math.round(hsb[2]*(6000-hsb[1]*(60-f))/600000*255);

switch(Math.floor(hue/60)){
case 0:return[br,t,p,a];
case 1:return[q,br,p,a];
case 2:return[p,br,t,a];
case 3:return[p,q,br,a];
case 4:return[t,p,br,a];
default:return[br,p,q,a];}

};

Color.parseHSL=function(color){
var hsb=map(color.match(listMatch).slice(1),function(bit,i){
if(bit)bit=parseFloat(bit);
if(i===0)return Math.round((bit%=360)<0?bit+360:bit);else
if(i<3)return limit(Math.round(bit),0,100);else
return limit(bit===''?1:Number(bit),0,1);
});

var h=hsb[0]/60;
var s=hsb[1]/100;
var l=hsb[2]/100;
var a=hsb[3];

var c=(1-Math.abs(2*l-1))*s;
var x=c*(1-Math.abs(h%2-1));
var m=l-c/2;

var p=Math.round((c+m)*255);
var q=Math.round((x+m)*255);
var t=Math.round(m*255);

switch(Math.floor(h)){
case 0:return[p,q,t,a];
case 1:return[q,p,t,a];
case 2:return[t,p,q,a];
case 3:return[t,q,p,a];
case 4:return[q,t,p,a];
default:return[p,t,q,a];}

};

var toString=function toString(type,array){
if(array[3]!=1)type+='a';else
array.pop();
return type+'('+array.join(', ')+')';
};

Color.prototype={

toHSB:function toHSB(array){
var red=this.red,green=this.green,blue=this.blue,alpha=this.alpha;

var max=Math.max(red,green,blue),min=Math.min(red,green,blue),delta=max-min;
var hue=0,saturation=delta!=0?delta/max:0,brightness=max/255;
if(saturation){
var rr=(max-red)/delta,gr=(max-green)/delta,br=(max-blue)/delta;
hue=red==max?br-gr:green==max?2+rr-br:4+gr-rr;
if((hue/=6)<0)hue++;
}

var hsb=[Math.round(hue*360),Math.round(saturation*100),Math.round(brightness*100),alpha];

return array?hsb:toString('hsb',hsb);
},

toHSL:function toHSL(array){
var red=this.red,green=this.green,blue=this.blue,alpha=this.alpha;

var max=Math.max(red,green,blue),min=Math.min(red,green,blue),delta=max-min;
var hue=0,saturation=delta!=0?delta/(255-Math.abs(max+min-255)):0,lightness=(max+min)/512;
if(saturation){
var rr=(max-red)/delta,gr=(max-green)/delta,br=(max-blue)/delta;
hue=red==max?br-gr:green==max?2+rr-br:4+gr-rr;
if((hue/=6)<0)hue++;
}

var hsl=[Math.round(hue*360),Math.round(saturation*100),Math.round(lightness*100),alpha];

return array?hsl:toString('hsl',hsl);
},

toHEX:function toHEX(array){

var a=this.alpha;
var alpha=(a=Math.round(a*255).toString(16)).length==1?a+a:a;

var hex=map([this.red,this.green,this.blue],function(bit){
bit=bit.toString(16);
return bit.length==1?'0'+bit:bit;
});

return array?hex.concat(alpha):'#'+hex.join('')+(alpha=='ff'?'':alpha);
},

toRGB:function toRGB(array){
var rgb=[this.red,this.green,this.blue,this.alpha];
return array?rgb:toString('rgb',rgb);
}};



Color.prototype.toString=Color.prototype.toRGB;

Color.hex=function(hex){
return new Color(hex,'hex');
};

if(this.hex==null)this.hex=Color.hex;

Color.hsb=function(h,s,b,a){
return new Color([h||0,s||0,b||0,a==null?1:a],'hsb');
};

if(this.hsb==null)this.hsb=Color.hsb;

Color.hsl=function(h,s,l,a){
return new Color([h||0,s||0,l||0,a==null?1:a],'hsl');
};

if(this.hsl==null)this.hsl=Color.hsl;

Color.rgb=function(r,g,b,a){
return new Color([r||0,g||0,b||0,a==null?1:a],'rgb');
};

if(this.rgb==null)this.rgb=Color.rgb;

Color.detach=function(color){
color=new Color(color);
return[Color.rgb(color.red,color.green,color.blue).toString(),color.alpha];
};

module.exports=Color;
}, 177, null, "art/core/color.js");
__d(/* ARTSerializablePath */function(global, require, module, exports) {









'use strict';



var Class=require(179 /* art/core/class.js */);
var Path=require(180 /* art/core/path.js */);

var MOVE_TO=0;
var CLOSE=1;
var LINE_TO=2;
var CURVE_TO=3;
var ARC=4;

var SerializablePath=Class(Path,{

initialize:function initialize(path){
this.reset();
if(path instanceof SerializablePath){
this.path=path.path.slice(0);
}else if(path){
if(path.applyToPath){
path.applyToPath(this);
}else{
this.push(path);
}
}
},

onReset:function onReset(){
this.path=[];
},

onMove:function onMove(sx,sy,x,y){
this.path.push(MOVE_TO,x,y);
},

onLine:function onLine(sx,sy,x,y){
this.path.push(LINE_TO,x,y);
},

onBezierCurve:function onBezierCurve(sx,sy,p1x,p1y,p2x,p2y,x,y){
this.path.push(CURVE_TO,p1x,p1y,p2x,p2y,x,y);
},

_arcToBezier:Path.prototype.onArc,

onArc:function onArc(sx,sy,ex,ey,cx,cy,rx,ry,sa,ea,ccw,rotation){
if(rx!==ry||rotation){
return this._arcToBezier(
sx,sy,ex,ey,cx,cy,rx,ry,sa,ea,ccw,rotation);

}
this.path.push(ARC,cx,cy,rx,sa,ea,ccw?0:1);
},

onClose:function onClose(){
this.path.push(CLOSE);
},

toJSON:function toJSON(){
return this.path;
}});



module.exports=SerializablePath;
}, 178, null, "ARTSerializablePath");
__d(/* art/core/class.js */function(global, require, module, exports) {module.exports=function(mixins){
var proto={};
for(var i=0,l=arguments.length;i<l;i++){
var mixin=arguments[i];
if(typeof mixin=='function')mixin=mixin.prototype;
for(var key in mixin){proto[key]=mixin[key];}
}
if(!proto.initialize)proto.initialize=function(){};
proto.constructor=function(a,b,c,d,e,f,g,h){
return new proto.initialize(a,b,c,d,e,f,g,h);
};
proto.constructor.prototype=proto.initialize.prototype=proto;
return proto.constructor;
};
}, 179, null, "art/core/class.js");
__d(/* art/core/path.js */function(global, require, module, exports) {var Class=require(179 /* ./class */);

module.exports=Class({

initialize:function initialize(path){
this.reset().push(path);
},



push:function push(){
var p=Array.prototype.join.call(arguments,' ').
match(/[a-df-z]|[\-+]?(?:[\d\.]e[\-+]?|[^\s\-+,a-z])+/ig);
if(!p)return this;

var last,cmd=p[0],i=1;
while(cmd){
switch(cmd){
case'm':this.move(p[i++],p[i++]);break;
case'l':this.line(p[i++],p[i++]);break;
case'c':this.curve(p[i++],p[i++],p[i++],p[i++],p[i++],p[i++]);break;
case's':this.curve(p[i++],p[i++],null,null,p[i++],p[i++]);break;
case'q':this.curve(p[i++],p[i++],p[i++],p[i++]);break;
case't':this.curve(p[i++],p[i++]);break;
case'a':this.arc(p[i+5],p[i+6],p[i],p[i+1],p[i+3],!+p[i+4],p[i+2]);i+=7;break;
case'h':this.line(p[i++],0);break;
case'v':this.line(0,p[i++]);break;

case'M':this.moveTo(p[i++],p[i++]);break;
case'L':this.lineTo(p[i++],p[i++]);break;
case'C':this.curveTo(p[i++],p[i++],p[i++],p[i++],p[i++],p[i++]);break;
case'S':this.curveTo(p[i++],p[i++],null,null,p[i++],p[i++]);break;
case'Q':this.curveTo(p[i++],p[i++],p[i++],p[i++]);break;
case'T':this.curveTo(p[i++],p[i++]);break;
case'A':this.arcTo(p[i+5],p[i+6],p[i],p[i+1],p[i+3],!+p[i+4],p[i+2]);i+=7;break;
case'H':this.lineTo(p[i++],this.penY);break;
case'V':this.lineTo(this.penX,p[i++]);break;

case'Z':case'z':this.close();break;
default:cmd=last;i--;continue;}


last=cmd;
if(last=='m')last='l';else
if(last=='M')last='L';
cmd=p[i++];
}
return this;
},



reset:function reset(){
this.penX=this.penY=0;
this.penDownX=this.penDownY=null;
this._pivotX=this._pivotY=0;
this.onReset();
return this;
},

move:function move(x,y){
this.onMove(this.penX,this.penY,this._pivotX=this.penX+=+x,this._pivotY=this.penY+=+y);
return this;
},
moveTo:function moveTo(x,y){
this.onMove(this.penX,this.penY,this._pivotX=this.penX=+x,this._pivotY=this.penY=+y);
return this;
},

line:function line(x,y){
return this.lineTo(this.penX+ +x,this.penY+ +y);
},
lineTo:function lineTo(x,y){
if(this.penDownX==null){this.penDownX=this.penX;this.penDownY=this.penY;}
this.onLine(this.penX,this.penY,this._pivotX=this.penX=+x,this._pivotY=this.penY=+y);
return this;
},

curve:function curve(c1x,c1y,c2x,c2y,ex,ey){
var x=this.penX,y=this.penY;
return this.curveTo(
x+ +c1x,y+ +c1y,
c2x==null?null:x+ +c2x,
c2y==null?null:y+ +c2y,
ex==null?null:x+ +ex,
ey==null?null:y+ +ey);

},
curveTo:function curveTo(c1x,c1y,c2x,c2y,ex,ey){
var x=this.penX,y=this.penY;
if(c2x==null){
c2x=+c1x;c2y=+c1y;
c1x=x*2-(this._pivotX||0);c1y=y*2-(this._pivotY||0);
}
if(ex==null){
this._pivotX=+c1x;this._pivotY=+c1y;
ex=+c2x;ey=+c2y;
c2x=(ex+ +c1x*2)/3;c2y=(ey+ +c1y*2)/3;
c1x=(x+ +c1x*2)/3;c1y=(y+ +c1y*2)/3;
}else{
this._pivotX=+c2x;this._pivotY=+c2y;
}
if(this.penDownX==null){this.penDownX=x;this.penDownY=y;}
this.onBezierCurve(x,y,+c1x,+c1y,+c2x,+c2y,this.penX=+ex,this.penY=+ey);
return this;
},

arc:function arc(x,y,rx,ry,outer,counterClockwise,rotation){
return this.arcTo(this.penX+ +x,this.penY+ +y,rx,ry,outer,counterClockwise,rotation);
},
arcTo:function arcTo(x,y,rx,ry,outer,counterClockwise,rotation){
ry=Math.abs(+ry||+rx||+y-this.penY);
rx=Math.abs(+rx||+x-this.penX);

if(!rx||!ry||x==this.penX&&y==this.penY)return this.lineTo(x,y);

var tX=this.penX,tY=this.penY,clockwise=!+counterClockwise,large=!!+outer;

var rad=rotation?rotation*Math.PI/180:0,cos=Math.cos(rad),sin=Math.sin(rad);
x-=tX;y-=tY;


var cx=cos*x/2+sin*y/2,
cy=-sin*x/2+cos*y/2,
rxry=rx*rx*ry*ry,
rycx=ry*ry*cx*cx,
rxcy=rx*rx*cy*cy,
a=rxry-rxcy-rycx;

if(a<0){
a=Math.sqrt(1-a/rxry);
rx*=a;ry*=a;
cx=x/2;cy=y/2;
}else{
a=Math.sqrt(a/(rxcy+rycx));
if(large==clockwise)a=-a;
var cxd=-a*cy*rx/ry,
cyd=a*cx*ry/rx;
cx=cos*cxd-sin*cyd+x/2;
cy=sin*cxd+cos*cyd+y/2;
}


var xx=cos/rx,yx=sin/rx,
xy=-sin/ry,yy=cos/ry;


var sa=Math.atan2(xy*-cx+yy*-cy,xx*-cx+yx*-cy),
ea=Math.atan2(xy*(x-cx)+yy*(y-cy),xx*(x-cx)+yx*(y-cy));

cx+=tX;cy+=tY;
x+=tX;y+=tY;


if(this.penDownX==null){this.penDownX=this.penX;this.penDownY=this.penY;}
this.onArc(
tX,tY,this._pivotX=this.penX=x,this._pivotY=this.penY=y,
cx,cy,rx,ry,sa,ea,!clockwise,rotation);

return this;
},

counterArc:function counterArc(x,y,rx,ry,outer){
return this.arc(x,y,rx,ry,outer,true);
},
counterArcTo:function counterArcTo(x,y,rx,ry,outer){
return this.arcTo(x,y,rx,ry,outer,true);
},

close:function close(){
if(this.penDownX!=null){
this.onClose(this.penX,this.penY,this.penX=this.penDownX,this.penY=this.penDownY);
this.penDownX=null;
}
return this;
},



onReset:function onReset(){
},

onMove:function onMove(sx,sy,ex,ey){
},

onLine:function onLine(sx,sy,ex,ey){
this.onBezierCurve(sx,sy,sx,sy,ex,ey,ex,ey);
},

onBezierCurve:function onBezierCurve(sx,sy,c1x,c1y,c2x,c2y,ex,ey){
var gx=ex-sx,gy=ey-sy,
g=gx*gx+gy*gy,
v1,v2,cx,cy,u;

cx=c1x-sx;cy=c1y-sy;
u=cx*gx+cy*gy;

if(u>g){
cx-=gx;
cy-=gy;
}else if(u>0&&g!=0){
cx-=u/g*gx;
cy-=u/g*gy;
}

v1=cx*cx+cy*cy;

cx=c2x-sx;cy=c2y-sy;
u=cx*gx+cy*gy;

if(u>g){
cx-=gx;
cy-=gy;
}else if(u>0&&g!=0){
cx-=u/g*gx;
cy-=u/g*gy;
}

v2=cx*cx+cy*cy;

if(v1<0.01&&v2<0.01){
this.onLine(sx,sy,ex,ey);
return;
}


if(isNaN(v1)||isNaN(v2)){
throw new Error('Bad input');
}


var s1x=(c1x+c2x)*0.5,s1y=(c1y+c2y)*0.5,
l1x=(c1x+sx)*0.5,l1y=(c1y+sy)*0.5,
l2x=(l1x+s1x)*0.5,l2y=(l1y+s1y)*0.5,
r2x=(ex+c2x)*0.5,r2y=(ey+c2y)*0.5,
r1x=(r2x+s1x)*0.5,r1y=(r2y+s1y)*0.5,
l2r1x=(l2x+r1x)*0.5,l2r1y=(l2y+r1y)*0.5;


this.onBezierCurve(sx,sy,l1x,l1y,l2x,l2y,l2r1x,l2r1y);
this.onBezierCurve(l2r1x,l2r1y,r1x,r1y,r2x,r2y,ex,ey);
},

onArc:function onArc(sx,sy,ex,ey,cx,cy,rx,ry,sa,ea,ccw,rotation){

var rad=rotation?rotation*Math.PI/180:0,cos=Math.cos(rad),sin=Math.sin(rad),
xx=cos*rx,yx=-sin*ry,
xy=sin*rx,yy=cos*ry;


var arc=ea-sa;
if(arc<0&&!ccw)arc+=Math.PI*2;else
if(arc>0&&ccw)arc-=Math.PI*2;

var n=Math.ceil(Math.abs(arc/(Math.PI/2))),
step=arc/n,
k=4/3*Math.tan(step/4);

var x=Math.cos(sa),y=Math.sin(sa);

for(var i=0;i<n;i++){
var cp1x=x-k*y,cp1y=y+k*x;

sa+=step;
x=Math.cos(sa);y=Math.sin(sa);

var cp2x=x+k*y,cp2y=y-k*x;

this.onBezierCurve(
sx,sy,
cx+xx*cp1x+yx*cp1y,cy+xy*cp1x+yy*cp1y,
cx+xx*cp2x+yx*cp2y,cy+xy*cp2x+yy*cp2y,
sx=cx+xx*x+yx*y,sy=cy+xy*x+yy*y);

}
},

onClose:function onClose(sx,sy,ex,ey){
this.onLine(sx,sy,ex,ey);
}});
}, 180, null, "art/core/path.js");
__d(/* art/core/transform.js */function(global, require, module, exports) {var Class=require(179 /* ./class */);

function Transform(xx,yx,xy,yy,x,y){
if(xx&&typeof xx=='object'){
yx=xx.yx;yy=xx.yy;y=xx.y;
xy=xx.xy;x=xx.x;xx=xx.xx;
}
this.xx=xx==null?1:xx;
this.yx=yx||0;
this.xy=xy||0;
this.yy=yy==null?1:yy;
this.x=(x==null?this.x:x)||0;
this.y=(y==null?this.y:y)||0;
this._transform();
return this;
};

module.exports=Class({

initialize:Transform,

_transform:function _transform(){},

xx:1,yx:0,x:0,
xy:0,yy:1,y:0,

transform:function transform(xx,yx,xy,yy,x,y){
var m=this;
if(xx&&typeof xx=='object'){
yx=xx.yx;yy=xx.yy;y=xx.y;
xy=xx.xy;x=xx.x;xx=xx.xx;
}
if(!x)x=0;
if(!y)y=0;
return this.transformTo(
m.xx*xx+m.xy*yx,
m.yx*xx+m.yy*yx,
m.xx*xy+m.xy*yy,
m.yx*xy+m.yy*yy,
m.xx*x+m.xy*y+m.x,
m.yx*x+m.yy*y+m.y);

},

transformTo:Transform,

translate:function translate(x,y){
return this.transform(1,0,0,1,x,y);
},

move:function move(x,y){
this.x+=x||0;
this.y+=y||0;
this._transform();
return this;
},

scale:function scale(x,y){
if(y==null)y=x;
return this.transform(x,0,0,y,0,0);
},

rotate:function rotate(deg,x,y){
if(x==null||y==null){
x=(this.left||0)+(this.width||0)/2;
y=(this.top||0)+(this.height||0)/2;
}

var rad=deg*Math.PI/180,sin=Math.sin(rad),cos=Math.cos(rad);

this.transform(1,0,0,1,x,y);
var m=this;

return this.transformTo(
cos*m.xx-sin*m.yx,
sin*m.xx+cos*m.yx,
cos*m.xy-sin*m.yy,
sin*m.xy+cos*m.yy,
m.x,
m.y).
transform(1,0,0,1,-x,-y);
},

moveTo:function moveTo(x,y){
var m=this;
return this.transformTo(m.xx,m.yx,m.xy,m.yy,x,y);
},

rotateTo:function rotateTo(deg,x,y){
var m=this;
var flip=m.yx/m.xx>m.yy/m.xy?-1:1;
if(m.xx<0?m.xy>=0:m.xy<0)flip=-flip;
return this.rotate(deg-Math.atan2(flip*m.yx,flip*m.xx)*180/Math.PI,x,y);
},

scaleTo:function scaleTo(x,y){

var m=this;

var h=Math.sqrt(m.xx*m.xx+m.yx*m.yx);
m.xx/=h;m.yx/=h;

h=Math.sqrt(m.yy*m.yy+m.xy*m.xy);
m.yy/=h;m.xy/=h;

return this.scale(x,y);
},

resizeTo:function resizeTo(width,height){
var w=this.width,h=this.height;
if(!w||!h)return this;
return this.scaleTo(width/w,height/h);
},















inversePoint:function inversePoint(x,y){
var a=this.xx,b=this.yx,
c=this.xy,d=this.yy,
e=this.x,f=this.y;
var det=b*c-a*d;
if(det==0)return null;
return{
x:(d*(e-x)+c*(y-f))/det,
y:(a*(f-y)+b*(x-e))/det};

},

point:function point(x,y){
var m=this;
return{
x:m.xx*x+m.xy*y+m.x,
y:m.yx*x+m.yy*y+m.y};

}});
}, 181, null, "art/core/transform.js");
__d(/* Button */function(global, require, module, exports) {










'use strict';

var ColorPropType=require(18 /* ColorPropType */);
var Platform=require(28 /* Platform */);
var React=require(78 /* React */);
var StyleSheet=require(101 /* StyleSheet */);
var Text=require(183 /* Text */);
var TouchableNativeFeedback=require(189 /* TouchableNativeFeedback */);
var TouchableOpacity=require(190 /* TouchableOpacity */);
var View=require(120 /* View */);

var invariant=require(26 /* fbjs/lib/invariant */);var


























Button=function(_React$Component){babelHelpers.inherits(Button,_React$Component);function Button(){babelHelpers.classCallCheck(this,Button);return babelHelpers.possibleConstructorReturn(this,(Button.__proto__||Object.getPrototypeOf(Button)).apply(this,arguments));}babelHelpers.createClass(Button,[{key:'render',value:function render()
































{var _props=






this.props,accessibilityLabel=_props.accessibilityLabel,color=_props.color,onPress=_props.onPress,title=_props.title,disabled=_props.disabled;
var buttonStyles=[styles.button];
var textStyles=[styles.text];
var Touchable=Platform.OS==='android'?TouchableNativeFeedback:TouchableOpacity;
if(color&&Platform.OS==='ios'){
textStyles.push({color:color});
}else if(color){
buttonStyles.push({backgroundColor:color});
}
if(disabled){
buttonStyles.push(styles.buttonDisabled);
textStyles.push(styles.textDisabled);
}
invariant(
typeof title==='string',
'The title prop of a Button must be a string');

var formattedTitle=Platform.OS==='android'?title.toUpperCase():title;
return(
React.createElement(Touchable,{
accessibilityComponentType:'button',
accessibilityLabel:accessibilityLabel,
accessibilityTraits:['button'],
disabled:disabled,
onPress:onPress},
React.createElement(View,{style:buttonStyles},
React.createElement(Text,{style:textStyles},formattedTitle))));



}}]);return Button;}(React.Component);Button.propTypes={title:React.PropTypes.string.isRequired,accessibilityLabel:React.PropTypes.string,color:ColorPropType,disabled:React.PropTypes.bool,onPress:React.PropTypes.func.isRequired};



var defaultBlue='#2196F3';
if(Platform.OS==='ios'){

defaultBlue='#0C42FD';
}

var styles=StyleSheet.create({
button:Platform.select({
ios:{},
android:{
elevation:4,
backgroundColor:defaultBlue,
borderRadius:2}}),


text:Platform.select({
ios:{
color:defaultBlue,
textAlign:'center',
padding:8,
fontSize:18},

android:{
textAlign:'center',
color:'white',
padding:8,
fontWeight:'500'}}),


buttonDisabled:Platform.select({
ios:{},
android:{
elevation:0,
backgroundColor:'#dfdfdf'}}),


textDisabled:Platform.select({
ios:{
color:'#cdcdcd'},

android:{
color:'#a1a1a1'}})});




module.exports=Button;
}, 182, null, "Button");
__d(/* Text */function(global, require, module, exports) {










'use strict';

var NativeMethodsMixin=require(21 /* NativeMethodsMixin */);
var Platform=require(28 /* Platform */);
var React=require(78 /* React */);
var ReactNativeViewAttributes=require(126 /* ReactNativeViewAttributes */);
var StyleSheetPropType=require(127 /* StyleSheetPropType */);
var TextStylePropTypes=require(113 /* TextStylePropTypes */);
var Touchable=require(184 /* Touchable */);

var createReactNativeComponentClass=require(130 /* createReactNativeComponentClass */);
var mergeFast=require(188 /* mergeFast */);

var stylePropType=StyleSheetPropType(TextStylePropTypes);

var viewConfig={
validAttributes:mergeFast(ReactNativeViewAttributes.UIView,{
isHighlighted:true,
numberOfLines:true,
ellipsizeMode:true,
allowFontScaling:true,
selectable:true,
adjustsFontSizeToFit:true,
minimumFontScale:true}),

uiViewClassName:'RCTText'};





















































var Text=React.createClass({displayName:'Text',
propTypes:{

















ellipsizeMode:React.PropTypes.oneOf(['head','middle','tail','clip']),







numberOfLines:React.PropTypes.number,





onLayout:React.PropTypes.func,





onPress:React.PropTypes.func,





onLongPress:React.PropTypes.func,



selectable:React.PropTypes.bool,






suppressHighlighting:React.PropTypes.bool,
style:stylePropType,



testID:React.PropTypes.string,






allowFontScaling:React.PropTypes.bool,








accessible:React.PropTypes.bool,




adjustsFontSizeToFit:React.PropTypes.bool,





minimumFontScale:React.PropTypes.number},

getDefaultProps:function getDefaultProps(){
return{
accessible:true,
allowFontScaling:true,
ellipsizeMode:'tail'};

},
getInitialState:function getInitialState(){
return mergeFast(Touchable.Mixin.touchableGetInitialState(),{
isHighlighted:false});

},
mixins:[NativeMethodsMixin],
viewConfig:viewConfig,
getChildContext:function getChildContext(){
return{isInAParentText:true};
},
childContextTypes:{
isInAParentText:React.PropTypes.bool},

contextTypes:{
isInAParentText:React.PropTypes.bool},




_handlers:null,
_hasPressHandler:function _hasPressHandler(){
return!!this.props.onPress||!!this.props.onLongPress;
},




touchableHandleActivePressIn:null,
touchableHandleActivePressOut:null,
touchableHandlePress:null,
touchableHandleLongPress:null,
touchableGetPressRectOffset:null,
render:function render(){var _this=this;
var newProps=this.props;
if(this.props.onStartShouldSetResponder||this._hasPressHandler()){
if(!this._handlers){
this._handlers={
onStartShouldSetResponder:function onStartShouldSetResponder(){
var shouldSetFromProps=_this.props.onStartShouldSetResponder&&
_this.props.onStartShouldSetResponder();
var setResponder=shouldSetFromProps||_this._hasPressHandler();
if(setResponder&&!_this.touchableHandleActivePressIn){


for(var key in Touchable.Mixin){
if(typeof Touchable.Mixin[key]==='function'){
_this[key]=Touchable.Mixin[key].bind(_this);
}
}
_this.touchableHandleActivePressIn=function(){
if(_this.props.suppressHighlighting||!_this._hasPressHandler()){
return;
}
_this.setState({
isHighlighted:true});

};

_this.touchableHandleActivePressOut=function(){
if(_this.props.suppressHighlighting||!_this._hasPressHandler()){
return;
}
_this.setState({
isHighlighted:false});

};

_this.touchableHandlePress=function(e){
_this.props.onPress&&_this.props.onPress(e);
};

_this.touchableHandleLongPress=function(e){
_this.props.onLongPress&&_this.props.onLongPress(e);
};

_this.touchableGetPressRectOffset=function(){
return PRESS_RECT_OFFSET;
};
}
return setResponder;
},
onResponderGrant:function(e,dispatchID){
this.touchableHandleResponderGrant(e,dispatchID);
this.props.onResponderGrant&&
this.props.onResponderGrant.apply(this,arguments);
}.bind(this),
onResponderMove:function(e){
this.touchableHandleResponderMove(e);
this.props.onResponderMove&&
this.props.onResponderMove.apply(this,arguments);
}.bind(this),
onResponderRelease:function(e){
this.touchableHandleResponderRelease(e);
this.props.onResponderRelease&&
this.props.onResponderRelease.apply(this,arguments);
}.bind(this),
onResponderTerminate:function(e){
this.touchableHandleResponderTerminate(e);
this.props.onResponderTerminate&&
this.props.onResponderTerminate.apply(this,arguments);
}.bind(this),
onResponderTerminationRequest:function(){


var allowTermination=this.touchableHandleResponderTerminationRequest();
if(allowTermination&&this.props.onResponderTerminationRequest){
allowTermination=this.props.onResponderTerminationRequest.apply(this,arguments);
}
return allowTermination;
}.bind(this)};

}
newProps=babelHelpers.extends({},
this.props,
this._handlers,{
isHighlighted:this.state.isHighlighted});

}
if(Touchable.TOUCH_TARGET_DEBUG&&newProps.onPress){
newProps=babelHelpers.extends({},
newProps,{
style:[this.props.style,{color:'magenta'}]});

}
if(this.context.isInAParentText){
return React.createElement(RCTVirtualText,newProps);
}else{
return React.createElement(RCTText,newProps);
}
}});









var PRESS_RECT_OFFSET={top:20,left:20,right:20,bottom:30};

var RCTText=createReactNativeComponentClass(viewConfig);
var RCTVirtualText=RCTText;

if(Platform.OS==='android'){
RCTVirtualText=createReactNativeComponentClass({
validAttributes:mergeFast(ReactNativeViewAttributes.UIView,{
isHighlighted:true}),

uiViewClassName:'RCTVirtualText'});

}

module.exports=Text;
}, 183, null, "Text");
__d(/* Touchable */function(global, require, module, exports) {










'use strict';

var BoundingDimensions=require(185 /* BoundingDimensions */);
var Position=require(186 /* Position */);
var React=require(78 /* React */);
var TouchEventUtils=require(187 /* fbjs/lib/TouchEventUtils */);
var UIManager=require(75 /* UIManager */);
var View=require(120 /* View */);

var keyMirror=require(107 /* fbjs/lib/keyMirror */);
var normalizeColor=require(20 /* normalizeColor */);

























































































var States=keyMirror({
NOT_RESPONDER:null,
RESPONDER_INACTIVE_PRESS_IN:null,
RESPONDER_INACTIVE_PRESS_OUT:null,
RESPONDER_ACTIVE_PRESS_IN:null,
RESPONDER_ACTIVE_PRESS_OUT:null,
RESPONDER_ACTIVE_LONG_PRESS_IN:null,
RESPONDER_ACTIVE_LONG_PRESS_OUT:null,
ERROR:null});





var IsActive={
RESPONDER_ACTIVE_PRESS_OUT:true,
RESPONDER_ACTIVE_PRESS_IN:true};






var IsPressingIn={
RESPONDER_INACTIVE_PRESS_IN:true,
RESPONDER_ACTIVE_PRESS_IN:true,
RESPONDER_ACTIVE_LONG_PRESS_IN:true};


var IsLongPressingIn={
RESPONDER_ACTIVE_LONG_PRESS_IN:true};





var Signals=keyMirror({
DELAY:null,
RESPONDER_GRANT:null,
RESPONDER_RELEASE:null,
RESPONDER_TERMINATED:null,
ENTER_PRESS_RECT:null,
LEAVE_PRESS_RECT:null,
LONG_PRESS_DETECTED:null});





var Transitions={
NOT_RESPONDER:{
DELAY:States.ERROR,
RESPONDER_GRANT:States.RESPONDER_INACTIVE_PRESS_IN,
RESPONDER_RELEASE:States.ERROR,
RESPONDER_TERMINATED:States.ERROR,
ENTER_PRESS_RECT:States.ERROR,
LEAVE_PRESS_RECT:States.ERROR,
LONG_PRESS_DETECTED:States.ERROR},

RESPONDER_INACTIVE_PRESS_IN:{
DELAY:States.RESPONDER_ACTIVE_PRESS_IN,
RESPONDER_GRANT:States.ERROR,
RESPONDER_RELEASE:States.NOT_RESPONDER,
RESPONDER_TERMINATED:States.NOT_RESPONDER,
ENTER_PRESS_RECT:States.RESPONDER_INACTIVE_PRESS_IN,
LEAVE_PRESS_RECT:States.RESPONDER_INACTIVE_PRESS_OUT,
LONG_PRESS_DETECTED:States.ERROR},

RESPONDER_INACTIVE_PRESS_OUT:{
DELAY:States.RESPONDER_ACTIVE_PRESS_OUT,
RESPONDER_GRANT:States.ERROR,
RESPONDER_RELEASE:States.NOT_RESPONDER,
RESPONDER_TERMINATED:States.NOT_RESPONDER,
ENTER_PRESS_RECT:States.RESPONDER_INACTIVE_PRESS_IN,
LEAVE_PRESS_RECT:States.RESPONDER_INACTIVE_PRESS_OUT,
LONG_PRESS_DETECTED:States.ERROR},

RESPONDER_ACTIVE_PRESS_IN:{
DELAY:States.ERROR,
RESPONDER_GRANT:States.ERROR,
RESPONDER_RELEASE:States.NOT_RESPONDER,
RESPONDER_TERMINATED:States.NOT_RESPONDER,
ENTER_PRESS_RECT:States.RESPONDER_ACTIVE_PRESS_IN,
LEAVE_PRESS_RECT:States.RESPONDER_ACTIVE_PRESS_OUT,
LONG_PRESS_DETECTED:States.RESPONDER_ACTIVE_LONG_PRESS_IN},

RESPONDER_ACTIVE_PRESS_OUT:{
DELAY:States.ERROR,
RESPONDER_GRANT:States.ERROR,
RESPONDER_RELEASE:States.NOT_RESPONDER,
RESPONDER_TERMINATED:States.NOT_RESPONDER,
ENTER_PRESS_RECT:States.RESPONDER_ACTIVE_PRESS_IN,
LEAVE_PRESS_RECT:States.RESPONDER_ACTIVE_PRESS_OUT,
LONG_PRESS_DETECTED:States.ERROR},

RESPONDER_ACTIVE_LONG_PRESS_IN:{
DELAY:States.ERROR,
RESPONDER_GRANT:States.ERROR,
RESPONDER_RELEASE:States.NOT_RESPONDER,
RESPONDER_TERMINATED:States.NOT_RESPONDER,
ENTER_PRESS_RECT:States.RESPONDER_ACTIVE_LONG_PRESS_IN,
LEAVE_PRESS_RECT:States.RESPONDER_ACTIVE_LONG_PRESS_OUT,
LONG_PRESS_DETECTED:States.RESPONDER_ACTIVE_LONG_PRESS_IN},

RESPONDER_ACTIVE_LONG_PRESS_OUT:{
DELAY:States.ERROR,
RESPONDER_GRANT:States.ERROR,
RESPONDER_RELEASE:States.NOT_RESPONDER,
RESPONDER_TERMINATED:States.NOT_RESPONDER,
ENTER_PRESS_RECT:States.RESPONDER_ACTIVE_LONG_PRESS_IN,
LEAVE_PRESS_RECT:States.RESPONDER_ACTIVE_LONG_PRESS_OUT,
LONG_PRESS_DETECTED:States.ERROR},

error:{
DELAY:States.NOT_RESPONDER,
RESPONDER_GRANT:States.RESPONDER_INACTIVE_PRESS_IN,
RESPONDER_RELEASE:States.NOT_RESPONDER,
RESPONDER_TERMINATED:States.NOT_RESPONDER,
ENTER_PRESS_RECT:States.NOT_RESPONDER,
LEAVE_PRESS_RECT:States.NOT_RESPONDER,
LONG_PRESS_DETECTED:States.NOT_RESPONDER}};






var HIGHLIGHT_DELAY_MS=130;

var PRESS_EXPAND_PX=20;

var LONG_PRESS_THRESHOLD=500;

var LONG_PRESS_DELAY_MS=LONG_PRESS_THRESHOLD-HIGHLIGHT_DELAY_MS;

var LONG_PRESS_ALLOWED_MOVEMENT=10;



































































var TouchableMixin={



componentWillUnmount:function componentWillUnmount(){
this.touchableDelayTimeout&&clearTimeout(this.touchableDelayTimeout);
this.longPressDelayTimeout&&clearTimeout(this.longPressDelayTimeout);
this.pressOutDelayTimeout&&clearTimeout(this.pressOutDelayTimeout);
},








touchableGetInitialState:function touchableGetInitialState(){
return{
touchable:{touchState:undefined,responderID:null}};

},





touchableHandleResponderTerminationRequest:function touchableHandleResponderTerminationRequest(){
return!this.props.rejectResponderTermination;
},




touchableHandleStartShouldSetResponder:function touchableHandleStartShouldSetResponder(){
return!this.props.disabled;
},




touchableLongPressCancelsPress:function touchableLongPressCancelsPress(){
return true;
},






touchableHandleResponderGrant:function touchableHandleResponderGrant(e){
var dispatchID=e.currentTarget;



e.persist();

this.pressOutDelayTimeout&&clearTimeout(this.pressOutDelayTimeout);
this.pressOutDelayTimeout=null;

this.state.touchable.touchState=States.NOT_RESPONDER;
this.state.touchable.responderID=dispatchID;
this._receiveSignal(Signals.RESPONDER_GRANT,e);
var delayMS=
this.touchableGetHighlightDelayMS!==undefined?
Math.max(this.touchableGetHighlightDelayMS(),0):HIGHLIGHT_DELAY_MS;
delayMS=isNaN(delayMS)?HIGHLIGHT_DELAY_MS:delayMS;
if(delayMS!==0){
this.touchableDelayTimeout=setTimeout(
this._handleDelay.bind(this,e),
delayMS);

}else{
this._handleDelay(e);
}

var longDelayMS=
this.touchableGetLongPressDelayMS!==undefined?
Math.max(this.touchableGetLongPressDelayMS(),10):LONG_PRESS_DELAY_MS;
longDelayMS=isNaN(longDelayMS)?LONG_PRESS_DELAY_MS:longDelayMS;
this.longPressDelayTimeout=setTimeout(
this._handleLongDelay.bind(this,e),
longDelayMS+delayMS);

},




touchableHandleResponderRelease:function touchableHandleResponderRelease(e){
this._receiveSignal(Signals.RESPONDER_RELEASE,e);
},




touchableHandleResponderTerminate:function touchableHandleResponderTerminate(e){
this._receiveSignal(Signals.RESPONDER_TERMINATED,e);
},




touchableHandleResponderMove:function touchableHandleResponderMove(e){


if(this.state.touchable.touchState===States.RESPONDER_INACTIVE_PRESS_IN){
return;
}


if(!this.state.touchable.positionOnActivate){
return;
}

var positionOnActivate=this.state.touchable.positionOnActivate;
var dimensionsOnActivate=this.state.touchable.dimensionsOnActivate;
var pressRectOffset=this.touchableGetPressRectOffset?
this.touchableGetPressRectOffset():{
left:PRESS_EXPAND_PX,
right:PRESS_EXPAND_PX,
top:PRESS_EXPAND_PX,
bottom:PRESS_EXPAND_PX};


var pressExpandLeft=pressRectOffset.left;
var pressExpandTop=pressRectOffset.top;
var pressExpandRight=pressRectOffset.right;
var pressExpandBottom=pressRectOffset.bottom;

var hitSlop=this.touchableGetHitSlop?
this.touchableGetHitSlop():null;

if(hitSlop){
pressExpandLeft+=hitSlop.left;
pressExpandTop+=hitSlop.top;
pressExpandRight+=hitSlop.right;
pressExpandBottom+=hitSlop.bottom;
}

var touch=TouchEventUtils.extractSingleTouch(e.nativeEvent);
var pageX=touch&&touch.pageX;
var pageY=touch&&touch.pageY;

if(this.pressInLocation){
var movedDistance=this._getDistanceBetweenPoints(pageX,pageY,this.pressInLocation.pageX,this.pressInLocation.pageY);
if(movedDistance>LONG_PRESS_ALLOWED_MOVEMENT){
this._cancelLongPressDelayTimeout();
}
}

var isTouchWithinActive=
pageX>positionOnActivate.left-pressExpandLeft&&
pageY>positionOnActivate.top-pressExpandTop&&
pageX<
positionOnActivate.left+
dimensionsOnActivate.width+
pressExpandRight&&
pageY<
positionOnActivate.top+
dimensionsOnActivate.height+
pressExpandBottom;
if(isTouchWithinActive){
this._receiveSignal(Signals.ENTER_PRESS_RECT,e);
var curState=this.state.touchable.touchState;
if(curState===States.RESPONDER_INACTIVE_PRESS_IN){

this._cancelLongPressDelayTimeout();
}
}else{
this._cancelLongPressDelayTimeout();
this._receiveSignal(Signals.LEAVE_PRESS_RECT,e);
}
},















































































_remeasureMetricsOnActivation:function _remeasureMetricsOnActivation(){
var tag=this.state.touchable.responderID;
if(tag==null){
return;
}

UIManager.measure(tag,this._handleQueryLayout);
},

_handleQueryLayout:function _handleQueryLayout(l,t,w,h,globalX,globalY){
this.state.touchable.positionOnActivate&&
Position.release(this.state.touchable.positionOnActivate);
this.state.touchable.dimensionsOnActivate&&
BoundingDimensions.release(this.state.touchable.dimensionsOnActivate);
this.state.touchable.positionOnActivate=Position.getPooled(globalX,globalY);
this.state.touchable.dimensionsOnActivate=BoundingDimensions.getPooled(w,h);
},

_handleDelay:function _handleDelay(e){
this.touchableDelayTimeout=null;
this._receiveSignal(Signals.DELAY,e);
},

_handleLongDelay:function _handleLongDelay(e){
this.longPressDelayTimeout=null;
var curState=this.state.touchable.touchState;
if(curState!==States.RESPONDER_ACTIVE_PRESS_IN&&
curState!==States.RESPONDER_ACTIVE_LONG_PRESS_IN){
console.error('Attempted to transition from state `'+curState+'` to `'+
States.RESPONDER_ACTIVE_LONG_PRESS_IN+'`, which is not supported. This is '+
'most likely due to `Touchable.longPressDelayTimeout` not being cancelled.');
}else{
this._receiveSignal(Signals.LONG_PRESS_DETECTED,e);
}
},









_receiveSignal:function _receiveSignal(signal,e){
var responderID=this.state.touchable.responderID;
var curState=this.state.touchable.touchState;
var nextState=Transitions[curState]&&Transitions[curState][signal];
if(!responderID&&signal===Signals.RESPONDER_RELEASE){
return;
}
if(!nextState){
throw new Error(
'Unrecognized signal `'+signal+'` or state `'+curState+
'` for Touchable responder `'+responderID+'`');

}
if(nextState===States.ERROR){
throw new Error(
'Touchable cannot transition from `'+curState+'` to `'+signal+
'` for responder `'+responderID+'`');

}
if(curState!==nextState){
this._performSideEffectsForTransition(curState,nextState,signal,e);
this.state.touchable.touchState=nextState;
}
},

_cancelLongPressDelayTimeout:function _cancelLongPressDelayTimeout(){
this.longPressDelayTimeout&&clearTimeout(this.longPressDelayTimeout);
this.longPressDelayTimeout=null;
},

_isHighlight:function _isHighlight(state){
return state===States.RESPONDER_ACTIVE_PRESS_IN||
state===States.RESPONDER_ACTIVE_LONG_PRESS_IN;
},

_savePressInLocation:function _savePressInLocation(e){
var touch=TouchEventUtils.extractSingleTouch(e.nativeEvent);
var pageX=touch&&touch.pageX;
var pageY=touch&&touch.pageY;
var locationX=touch&&touch.locationX;
var locationY=touch&&touch.locationY;
this.pressInLocation={pageX:pageX,pageY:pageY,locationX:locationX,locationY:locationY};
},

_getDistanceBetweenPoints:function _getDistanceBetweenPoints(aX,aY,bX,bY){
var deltaX=aX-bX;
var deltaY=aY-bY;
return Math.sqrt(deltaX*deltaX+deltaY*deltaY);
},












_performSideEffectsForTransition:function _performSideEffectsForTransition(curState,nextState,signal,e){
var curIsHighlight=this._isHighlight(curState);
var newIsHighlight=this._isHighlight(nextState);

var isFinalSignal=
signal===Signals.RESPONDER_TERMINATED||
signal===Signals.RESPONDER_RELEASE;

if(isFinalSignal){
this._cancelLongPressDelayTimeout();
}

if(!IsActive[curState]&&IsActive[nextState]){
this._remeasureMetricsOnActivation();
}

if(IsPressingIn[curState]&&signal===Signals.LONG_PRESS_DETECTED){
this.touchableHandleLongPress&&this.touchableHandleLongPress(e);
}

if(newIsHighlight&&!curIsHighlight){
this._startHighlight(e);
}else if(!newIsHighlight&&curIsHighlight){
this._endHighlight(e);
}

if(IsPressingIn[curState]&&signal===Signals.RESPONDER_RELEASE){
var hasLongPressHandler=!!this.props.onLongPress;
var pressIsLongButStillCallOnPress=
IsLongPressingIn[curState]&&(
!hasLongPressHandler||
!this.touchableLongPressCancelsPress());


var shouldInvokePress=!IsLongPressingIn[curState]||pressIsLongButStillCallOnPress;
if(shouldInvokePress&&this.touchableHandlePress){
if(!newIsHighlight&&!curIsHighlight){

this._startHighlight(e);
this._endHighlight(e);
}
this.touchableHandlePress(e);
}
}

this.touchableDelayTimeout&&clearTimeout(this.touchableDelayTimeout);
this.touchableDelayTimeout=null;
},

_startHighlight:function _startHighlight(e){
this._savePressInLocation(e);
this.touchableHandleActivePressIn&&this.touchableHandleActivePressIn(e);
},

_endHighlight:function _endHighlight(e){var _this=this;
if(this.touchableHandleActivePressOut){
if(this.touchableGetPressOutDelayMS&&this.touchableGetPressOutDelayMS()){
this.pressOutDelayTimeout=setTimeout(function(){
_this.touchableHandleActivePressOut(e);
},this.touchableGetPressOutDelayMS());
}else{
this.touchableHandleActivePressOut(e);
}
}
}};



var Touchable={
Mixin:TouchableMixin,
TOUCH_TARGET_DEBUG:false,



renderDebugView:function renderDebugView(_ref){var color=_ref.color,hitSlop=_ref.hitSlop;
if(!Touchable.TOUCH_TARGET_DEBUG){
return null;
}
if(!__DEV__){
throw Error('Touchable.TOUCH_TARGET_DEBUG should not be enabled in prod!');
}
var debugHitSlopStyle={};
hitSlop=hitSlop||{top:0,bottom:0,left:0,right:0};
for(var key in hitSlop){
debugHitSlopStyle[key]=-hitSlop[key];
}
var hexColor='#'+('00000000'+normalizeColor(color).toString(16)).substr(-8);
return(
React.createElement(View,{
pointerEvents:'none',
style:babelHelpers.extends({
position:'absolute',
borderColor:hexColor.slice(0,-2)+'55',
borderWidth:1,
borderStyle:'dashed',
backgroundColor:hexColor.slice(0,-2)+'0F'},
debugHitSlopStyle)}));



}};


module.exports=Touchable;
}, 184, null, "Touchable");
__d(/* BoundingDimensions */function(global, require, module, exports) {










'use strict';

var PooledClass=require(82 /* react/lib/PooledClass */);

var twoArgumentPooler=PooledClass.twoArgumentPooler;








function BoundingDimensions(width,height){
this.width=width;
this.height=height;
}

BoundingDimensions.prototype.destructor=function(){
this.width=null;
this.height=null;
};





BoundingDimensions.getPooledFromElement=function(element){
return BoundingDimensions.getPooled(
element.offsetWidth,
element.offsetHeight);

};

PooledClass.addPoolingTo(BoundingDimensions,twoArgumentPooler);

module.exports=BoundingDimensions;
}, 185, null, "BoundingDimensions");
__d(/* Position */function(global, require, module, exports) {










'use strict';

var PooledClass=require(82 /* react/lib/PooledClass */);

var twoArgumentPooler=PooledClass.twoArgumentPooler;









function Position(left,top){
this.left=left;
this.top=top;
}

Position.prototype.destructor=function(){
this.left=null;
this.top=null;
};

PooledClass.addPoolingTo(Position,twoArgumentPooler);

module.exports=Position;
}, 186, null, "Position");
__d(/* fbjs/lib/TouchEventUtils.js */function(global, require, module, exports) {"use strict";











var TouchEventUtils={










extractSingleTouch:function extractSingleTouch(nativeEvent){
var touches=nativeEvent.touches;
var changedTouches=nativeEvent.changedTouches;
var hasTouches=touches&&touches.length>0;
var hasChangedTouches=changedTouches&&changedTouches.length>0;

return!hasTouches&&hasChangedTouches?changedTouches[0]:hasTouches?touches[0]:nativeEvent;
}};


module.exports=TouchEventUtils;
}, 187, null, "fbjs/lib/TouchEventUtils.js");
__d(/* mergeFast */function(global, require, module, exports) {










'use strict';










var mergeFast=function mergeFast(one,two){
var ret={};
for(var keyOne in one){
ret[keyOne]=one[keyOne];
}
for(var keyTwo in two){
ret[keyTwo]=two[keyTwo];
}
return ret;
};

module.exports=mergeFast;
}, 188, null, "mergeFast");
__d(/* TouchableNativeFeedback */function(global, require, module, exports) {










'use strict';

var React=require(78 /* React */);
var StyleSheet=require(101 /* StyleSheet */);
var Text=require(183 /* Text */);
var View=require(120 /* View */);var

DummyTouchableNativeFeedback=function(_React$Component){babelHelpers.inherits(DummyTouchableNativeFeedback,_React$Component);function DummyTouchableNativeFeedback(){babelHelpers.classCallCheck(this,DummyTouchableNativeFeedback);return babelHelpers.possibleConstructorReturn(this,(DummyTouchableNativeFeedback.__proto__||Object.getPrototypeOf(DummyTouchableNativeFeedback)).apply(this,arguments));}babelHelpers.createClass(DummyTouchableNativeFeedback,[{key:'render',value:function render()
{
return(
React.createElement(View,{style:[styles.container,this.props.style]},
React.createElement(Text,{style:styles.info},'TouchableNativeFeedback is not supported on this platform!')));


}}]);return DummyTouchableNativeFeedback;}(React.Component);


var styles=StyleSheet.create({
container:{
height:100,
width:300,
backgroundColor:'#ffbcbc',
borderWidth:1,
borderColor:'red',
alignItems:'center',
justifyContent:'center',
margin:10},

info:{
color:'#333333',
margin:20}});



module.exports=DummyTouchableNativeFeedback;
}, 189, null, "TouchableNativeFeedback");
__d(/* TouchableOpacity */function(global, require, module, exports) {










'use strict';



var Animated=require(191 /* Animated */);
var NativeMethodsMixin=require(21 /* NativeMethodsMixin */);
var React=require(78 /* React */);
var TimerMixin=require(265 /* react-timer-mixin */);
var Touchable=require(184 /* Touchable */);
var TouchableWithoutFeedback=require(266 /* TouchableWithoutFeedback */);

var ensurePositiveDelayProps=require(267 /* ensurePositiveDelayProps */);
var flattenStyle=require(25 /* flattenStyle */);



var PRESS_RETENTION_OFFSET={top:20,left:20,right:20,bottom:30};






















var TouchableOpacity=React.createClass({displayName:'TouchableOpacity',
mixins:[TimerMixin,Touchable.Mixin,NativeMethodsMixin],

propTypes:babelHelpers.extends({},
TouchableWithoutFeedback.propTypes,{




activeOpacity:React.PropTypes.number}),


getDefaultProps:function getDefaultProps(){
return{
activeOpacity:0.2};

},

getInitialState:function getInitialState(){
return babelHelpers.extends({},
this.touchableGetInitialState(),{
anim:new Animated.Value(1)});

},

componentDidMount:function componentDidMount(){
ensurePositiveDelayProps(this.props);
},

componentWillReceiveProps:function componentWillReceiveProps(nextProps){
ensurePositiveDelayProps(nextProps);
},




setOpacityTo:function setOpacityTo(value){var duration=arguments.length>1&&arguments[1]!==undefined?arguments[1]:150;
Animated.timing(
this.state.anim,
{toValue:value,duration:duration,useNativeDriver:true}).
start();
},





touchableHandleActivePressIn:function touchableHandleActivePressIn(e){
this.clearTimeout(this._hideTimeout);
this._hideTimeout=null;
if(e.dispatchConfig.registrationName==='onResponderGrant'){
this._opacityActive(0);
}else{
this._opacityActive(150);
}
this.props.onPressIn&&this.props.onPressIn(e);
},

touchableHandleActivePressOut:function touchableHandleActivePressOut(e){
if(!this._hideTimeout){
this._opacityInactive();
}
this.props.onPressOut&&this.props.onPressOut(e);
},

touchableHandlePress:function touchableHandlePress(e){
this.clearTimeout(this._hideTimeout);
this._opacityActive(150);
this._hideTimeout=this.setTimeout(
this._opacityInactive,
this.props.delayPressOut||100);

this.props.onPress&&this.props.onPress(e);
},

touchableHandleLongPress:function touchableHandleLongPress(e){
this.props.onLongPress&&this.props.onLongPress(e);
},

touchableGetPressRectOffset:function touchableGetPressRectOffset(){
return this.props.pressRetentionOffset||PRESS_RETENTION_OFFSET;
},

touchableGetHitSlop:function touchableGetHitSlop(){
return this.props.hitSlop;
},

touchableGetHighlightDelayMS:function touchableGetHighlightDelayMS(){
return this.props.delayPressIn||0;
},

touchableGetLongPressDelayMS:function touchableGetLongPressDelayMS(){
return this.props.delayLongPress===0?0:
this.props.delayLongPress||500;
},

touchableGetPressOutDelayMS:function touchableGetPressOutDelayMS(){
return this.props.delayPressOut;
},

_opacityActive:function _opacityActive(duration){
this.setOpacityTo(this.props.activeOpacity,duration);
},

_opacityInactive:function _opacityInactive(){
this.clearTimeout(this._hideTimeout);
this._hideTimeout=null;
var childStyle=flattenStyle(this.props.style)||{};
this.setOpacityTo(
childStyle.opacity===undefined?1:childStyle.opacity,
150);

},

render:function render(){
return(
React.createElement(Animated.View,{
accessible:this.props.accessible!==false,
accessibilityLabel:this.props.accessibilityLabel,
accessibilityComponentType:this.props.accessibilityComponentType,
accessibilityTraits:this.props.accessibilityTraits,
style:[this.props.style,{opacity:this.state.anim}],
testID:this.props.testID,
onLayout:this.props.onLayout,
hitSlop:this.props.hitSlop,
onStartShouldSetResponder:this.touchableHandleStartShouldSetResponder,
onResponderTerminationRequest:this.touchableHandleResponderTerminationRequest,
onResponderGrant:this.touchableHandleResponderGrant,
onResponderMove:this.touchableHandleResponderMove,
onResponderRelease:this.touchableHandleResponderRelease,
onResponderTerminate:this.touchableHandleResponderTerminate},
this.props.children,
Touchable.renderDebugView({color:'cyan',hitSlop:this.props.hitSlop})));


}});


module.exports=TouchableOpacity;
}, 190, null, "TouchableOpacity");
__d(/* Animated */function(global, require, module, exports) {










'use strict';


var AnimatedImplementation=require(192 /* AnimatedImplementation */);
var Image=require(209 /* Image */);
var Text=require(183 /* Text */);
var View=require(120 /* View */);
var ScrollView=require(211 /* ScrollView */);

module.exports=babelHelpers.extends({},
AnimatedImplementation,{
View:AnimatedImplementation.createAnimatedComponent(View),
Text:AnimatedImplementation.createAnimatedComponent(Text),
Image:AnimatedImplementation.createAnimatedComponent(Image),
ScrollView:AnimatedImplementation.createAnimatedComponent(ScrollView)});
}, 191, null, "Animated");
__d(/* AnimatedImplementation */function(global, require, module, exports) {











'use strict';

var InteractionManager=require(193 /* InteractionManager */);
var Interpolation=require(202 /* Interpolation */);
var NativeAnimatedHelper=require(203 /* NativeAnimatedHelper */);
var React=require(78 /* React */);
var Set=require(194 /* Set */);
var SpringConfig=require(204 /* SpringConfig */);
var ViewStylePropTypes=require(114 /* ViewStylePropTypes */);

var findNodeHandle=require(76 /* findNodeHandle */);
var flattenStyle=require(25 /* flattenStyle */);
var invariant=require(26 /* fbjs/lib/invariant */);
var requestAnimationFrame=require(205 /* fbjs/lib/requestAnimationFrame */);






var NativeAnimatedAPI=NativeAnimatedHelper.API;

var warnedMissingNativeAnimated=false;

function shouldUseNativeDriver(config){
if(config.useNativeDriver&&
!NativeAnimatedHelper.isNativeAnimatedAvailable()){
if(!warnedMissingNativeAnimated){
console.warn(
'Animated: `useNativeDriver` is not supported because the native '+
'animated module is missing. Falling back to JS-based animation. To '+
'resolve this, add `RCTAnimation` module to this app, or remove '+
'`useNativeDriver`. '+
'More info: https://github.com/facebook/react-native/issues/11094#issuecomment-263240420');

warnedMissingNativeAnimated=true;
}
return false;
}

return config.useNativeDriver||false;
}var



Animated=function(){function Animated(){babelHelpers.classCallCheck(this,Animated);}babelHelpers.createClass(Animated,[{key:'__attach',value:function __attach()
{}},{key:'__detach',value:function __detach()
{
if(this.__isNative&&this.__nativeTag!=null){
NativeAnimatedAPI.dropAnimatedNode(this.__nativeTag);
this.__nativeTag=undefined;
}
}},{key:'__getValue',value:function __getValue()
{}},{key:'__getAnimatedValue',value:function __getAnimatedValue()
{return this.__getValue();}},{key:'__addChild',value:function __addChild(
child){}},{key:'__removeChild',value:function __removeChild(
child){}},{key:'__getChildren',value:function __getChildren()
{return[];}},{key:'__makeNative',value:function __makeNative()




{
if(!this.__isNative){
throw new Error('This node cannot be made a "native" animated node');
}
}},{key:'__getNativeTag',value:function __getNativeTag()
{
NativeAnimatedHelper.assertNativeAnimatedModule();
invariant(this.__isNative,'Attempt to get native tag from node not marked as "native"');
if(this.__nativeTag==null){
var nativeTag=NativeAnimatedHelper.generateNewNodeTag();
NativeAnimatedAPI.createAnimatedNode(nativeTag,this.__getNativeConfig());
this.__nativeTag=nativeTag;
}
return this.__nativeTag;
}},{key:'__getNativeConfig',value:function __getNativeConfig()
{
throw new Error('This JS animated node type cannot be used as native animated node');
}},{key:'toJSON',value:function toJSON()
{return this.__getValue();}}]);return Animated;}();var











Animation=function(){function Animation(){babelHelpers.classCallCheck(this,Animation);}babelHelpers.createClass(Animation,[{key:'start',value:function start(





fromValue,
onUpdate,
onEnd,
previousAnimation,
animatedValue)
{}},{key:'stop',value:function stop()
{
if(this.__nativeId){
NativeAnimatedAPI.stopAnimation(this.__nativeId);
}
}},{key:'__getNativeAnimationConfig',value:function __getNativeAnimationConfig()
{


throw new Error('This animation type cannot be offloaded to native');
}},{key:'__debouncedOnEnd',value:function __debouncedOnEnd(

result){
var onEnd=this.__onEnd;
this.__onEnd=null;
onEnd&&onEnd(result);
}},{key:'__startNativeAnimation',value:function __startNativeAnimation(
animatedValue){
animatedValue.__makeNative();
this.__nativeId=NativeAnimatedHelper.generateNewAnimationId();
NativeAnimatedAPI.startAnimatingNode(
this.__nativeId,
animatedValue.__getNativeTag(),
this.__getNativeAnimationConfig(),
this.__debouncedOnEnd.bind(this));

}}]);return Animation;}();var


AnimatedWithChildren=function(_Animated){babelHelpers.inherits(AnimatedWithChildren,_Animated);


function AnimatedWithChildren(){babelHelpers.classCallCheck(this,AnimatedWithChildren);var _this=babelHelpers.possibleConstructorReturn(this,(AnimatedWithChildren.__proto__||Object.getPrototypeOf(AnimatedWithChildren)).call(this));

_this._children=[];return _this;
}babelHelpers.createClass(AnimatedWithChildren,[{key:'__makeNative',value:function __makeNative()

{
if(!this.__isNative){
this.__isNative=true;
for(var _iterator=this._children,_isArray=Array.isArray(_iterator),_i=0,_iterator=_isArray?_iterator:_iterator[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var _ref;if(_isArray){if(_i>=_iterator.length)break;_ref=_iterator[_i++];}else{_i=_iterator.next();if(_i.done)break;_ref=_i.value;}var child=_ref;
child.__makeNative();
NativeAnimatedAPI.connectAnimatedNodes(this.__getNativeTag(),child.__getNativeTag());
}
}
}},{key:'__addChild',value:function __addChild(

child){
if(this._children.length===0){
this.__attach();
}
this._children.push(child);
if(this.__isNative){

child.__makeNative();
NativeAnimatedAPI.connectAnimatedNodes(this.__getNativeTag(),child.__getNativeTag());
}
}},{key:'__removeChild',value:function __removeChild(

child){
var index=this._children.indexOf(child);
if(index===-1){
console.warn('Trying to remove a child that doesn\'t exist');
return;
}
if(this.__isNative&&child.__isNative){
NativeAnimatedAPI.disconnectAnimatedNodes(this.__getNativeTag(),child.__getNativeTag());
}
this._children.splice(index,1);
if(this._children.length===0){
this.__detach();
}
}},{key:'__getChildren',value:function __getChildren()

{
return this._children;
}}]);return AnimatedWithChildren;}(Animated);
























function _flush(rootNode){
var animatedStyles=new Set();
function findAnimatedStyles(node){
if(typeof node.update==='function'){
animatedStyles.add(node);
}else{
node.__getChildren().forEach(findAnimatedStyles);
}
}
findAnimatedStyles(rootNode);

animatedStyles.forEach(function(animatedStyle){return animatedStyle.update();});
}















var _easeInOut=void 0;
function easeInOut(){
if(!_easeInOut){
var Easing=require(207 /* Easing */);
_easeInOut=Easing.inOut(Easing.ease);
}
return _easeInOut;
}var

TimingAnimation=function(_Animation){babelHelpers.inherits(TimingAnimation,_Animation);











function TimingAnimation(
config)
{babelHelpers.classCallCheck(this,TimingAnimation);var _this2=babelHelpers.possibleConstructorReturn(this,(TimingAnimation.__proto__||Object.getPrototypeOf(TimingAnimation)).call(this));

_this2._toValue=config.toValue;
_this2._easing=config.easing!==undefined?config.easing:easeInOut();
_this2._duration=config.duration!==undefined?config.duration:500;
_this2._delay=config.delay!==undefined?config.delay:0;
_this2.__isInteraction=config.isInteraction!==undefined?config.isInteraction:true;
_this2._useNativeDriver=shouldUseNativeDriver(config);return _this2;
}babelHelpers.createClass(TimingAnimation,[{key:'__getNativeAnimationConfig',value:function __getNativeAnimationConfig()

{
var frameDuration=1000.0/60.0;
var frames=[];
for(var dt=0.0;dt<this._duration;dt+=frameDuration){
frames.push(this._easing(dt/this._duration));
}
frames.push(this._easing(1));
return{
type:'frames',
frames:frames,
toValue:this._toValue,
delay:this._delay};

}},{key:'start',value:function start(


fromValue,
onUpdate,
onEnd,
previousAnimation,
animatedValue)
{var _this3=this;
this.__active=true;
this._fromValue=fromValue;
this._onUpdate=onUpdate;
this.__onEnd=onEnd;

var start=function start(){



if(_this3._duration===0&&!_this3._useNativeDriver){
_this3._onUpdate(_this3._toValue);
_this3.__debouncedOnEnd({finished:true});
}else{
_this3._startTime=Date.now();
if(_this3._useNativeDriver){
_this3.__startNativeAnimation(animatedValue);
}else{
_this3._animationFrame=requestAnimationFrame(_this3.onUpdate.bind(_this3));
}
}
};
if(this._delay){
this._timeout=setTimeout(start,this._delay);
}else{
start();
}
}},{key:'onUpdate',value:function onUpdate()

{
var now=Date.now();
if(now>=this._startTime+this._duration){
if(this._duration===0){
this._onUpdate(this._toValue);
}else{
this._onUpdate(
this._fromValue+this._easing(1)*(this._toValue-this._fromValue));

}
this.__debouncedOnEnd({finished:true});
return;
}

this._onUpdate(
this._fromValue+
this._easing((now-this._startTime)/this._duration)*(
this._toValue-this._fromValue));

if(this.__active){
this._animationFrame=requestAnimationFrame(this.onUpdate.bind(this));
}
}},{key:'stop',value:function stop()

{
babelHelpers.get(TimingAnimation.prototype.__proto__||Object.getPrototypeOf(TimingAnimation.prototype),'stop',this).call(this);
this.__active=false;
clearTimeout(this._timeout);
global.cancelAnimationFrame(this._animationFrame);
this.__debouncedOnEnd({finished:false});
}}]);return TimingAnimation;}(Animation);var












DecayAnimation=function(_Animation2){babelHelpers.inherits(DecayAnimation,_Animation2);









function DecayAnimation(
config)
{babelHelpers.classCallCheck(this,DecayAnimation);var _this4=babelHelpers.possibleConstructorReturn(this,(DecayAnimation.__proto__||Object.getPrototypeOf(DecayAnimation)).call(this));

_this4._deceleration=config.deceleration!==undefined?config.deceleration:0.998;
_this4._velocity=config.velocity;
_this4._useNativeDriver=shouldUseNativeDriver(config);
_this4.__isInteraction=config.isInteraction!==undefined?config.isInteraction:true;return _this4;
}babelHelpers.createClass(DecayAnimation,[{key:'__getNativeAnimationConfig',value:function __getNativeAnimationConfig()

{
return{
type:'decay',
deceleration:this._deceleration,
velocity:this._velocity};

}},{key:'start',value:function start(


fromValue,
onUpdate,
onEnd,
previousAnimation,
animatedValue)
{
this.__active=true;
this._lastValue=fromValue;
this._fromValue=fromValue;
this._onUpdate=onUpdate;
this.__onEnd=onEnd;
this._startTime=Date.now();
if(this._useNativeDriver){
this.__startNativeAnimation(animatedValue);
}else{
this._animationFrame=requestAnimationFrame(this.onUpdate.bind(this));
}
}},{key:'onUpdate',value:function onUpdate()

{
var now=Date.now();

var value=this._fromValue+
this._velocity/(1-this._deceleration)*(
1-Math.exp(-(1-this._deceleration)*(now-this._startTime)));

this._onUpdate(value);

if(Math.abs(this._lastValue-value)<0.1){
this.__debouncedOnEnd({finished:true});
return;
}

this._lastValue=value;
if(this.__active){
this._animationFrame=requestAnimationFrame(this.onUpdate.bind(this));
}
}},{key:'stop',value:function stop()

{
babelHelpers.get(DecayAnimation.prototype.__proto__||Object.getPrototypeOf(DecayAnimation.prototype),'stop',this).call(this);
this.__active=false;
global.cancelAnimationFrame(this._animationFrame);
this.__debouncedOnEnd({finished:false});
}}]);return DecayAnimation;}(Animation);


























function withDefault(value,defaultValue){
if(value===undefined||value===null){
return defaultValue;
}
return value;
}var

SpringAnimation=function(_Animation3){babelHelpers.inherits(SpringAnimation,_Animation3);
















function SpringAnimation(
config)
{babelHelpers.classCallCheck(this,SpringAnimation);var _this5=babelHelpers.possibleConstructorReturn(this,(SpringAnimation.__proto__||Object.getPrototypeOf(SpringAnimation)).call(this));


_this5._overshootClamping=withDefault(config.overshootClamping,false);
_this5._restDisplacementThreshold=withDefault(config.restDisplacementThreshold,0.001);
_this5._restSpeedThreshold=withDefault(config.restSpeedThreshold,0.001);
_this5._initialVelocity=config.velocity;
_this5._lastVelocity=withDefault(config.velocity,0);
_this5._toValue=config.toValue;
_this5._useNativeDriver=shouldUseNativeDriver(config);
_this5.__isInteraction=config.isInteraction!==undefined?config.isInteraction:true;

var springConfig;
if(config.bounciness!==undefined||config.speed!==undefined){
invariant(
config.tension===undefined&&config.friction===undefined,
'You can only define bounciness/speed or tension/friction but not both');

springConfig=SpringConfig.fromBouncinessAndSpeed(
withDefault(config.bounciness,8),
withDefault(config.speed,12));

}else{
springConfig=SpringConfig.fromOrigamiTensionAndFriction(
withDefault(config.tension,40),
withDefault(config.friction,7));

}
_this5._tension=springConfig.tension;
_this5._friction=springConfig.friction;return _this5;
}babelHelpers.createClass(SpringAnimation,[{key:'__getNativeAnimationConfig',value:function __getNativeAnimationConfig()

{
return{
type:'spring',
overshootClamping:this._overshootClamping,
restDisplacementThreshold:this._restDisplacementThreshold,
restSpeedThreshold:this._restSpeedThreshold,
tension:this._tension,
friction:this._friction,
initialVelocity:withDefault(this._initialVelocity,this._lastVelocity),
toValue:this._toValue};

}},{key:'start',value:function start(


fromValue,
onUpdate,
onEnd,
previousAnimation,
animatedValue)
{
this.__active=true;
this._startPosition=fromValue;
this._lastPosition=this._startPosition;

this._onUpdate=onUpdate;
this.__onEnd=onEnd;
this._lastTime=Date.now();

if(previousAnimation instanceof SpringAnimation){
var internalState=previousAnimation.getInternalState();
this._lastPosition=internalState.lastPosition;
this._lastVelocity=internalState.lastVelocity;
this._lastTime=internalState.lastTime;
}
if(this._initialVelocity!==undefined&&
this._initialVelocity!==null){
this._lastVelocity=this._initialVelocity;
}
if(this._useNativeDriver){
this.__startNativeAnimation(animatedValue);
}else{
this.onUpdate();
}
}},{key:'getInternalState',value:function getInternalState()

{
return{
lastPosition:this._lastPosition,
lastVelocity:this._lastVelocity,
lastTime:this._lastTime};

}},{key:'onUpdate',value:function onUpdate()

{
var position=this._lastPosition;
var velocity=this._lastVelocity;

var tempPosition=this._lastPosition;
var tempVelocity=this._lastVelocity;





var MAX_STEPS=64;
var now=Date.now();
if(now>this._lastTime+MAX_STEPS){
now=this._lastTime+MAX_STEPS;
}




var TIMESTEP_MSEC=1;
var numSteps=Math.floor((now-this._lastTime)/TIMESTEP_MSEC);

for(var i=0;i<numSteps;++i){

var step=TIMESTEP_MSEC/1000;



var aVelocity=velocity;
var aAcceleration=this._tension*(
this._toValue-tempPosition)-this._friction*tempVelocity;
var tempPosition=position+aVelocity*step/2;
var tempVelocity=velocity+aAcceleration*step/2;

var bVelocity=tempVelocity;
var bAcceleration=this._tension*(
this._toValue-tempPosition)-this._friction*tempVelocity;
tempPosition=position+bVelocity*step/2;
tempVelocity=velocity+bAcceleration*step/2;

var cVelocity=tempVelocity;
var cAcceleration=this._tension*(
this._toValue-tempPosition)-this._friction*tempVelocity;
tempPosition=position+cVelocity*step/2;
tempVelocity=velocity+cAcceleration*step/2;

var dVelocity=tempVelocity;
var dAcceleration=this._tension*(
this._toValue-tempPosition)-this._friction*tempVelocity;
tempPosition=position+cVelocity*step/2;
tempVelocity=velocity+cAcceleration*step/2;

var dxdt=(aVelocity+2*(bVelocity+cVelocity)+dVelocity)/6;
var dvdt=(aAcceleration+2*(bAcceleration+cAcceleration)+dAcceleration)/6;

position+=dxdt*step;
velocity+=dvdt*step;
}

this._lastTime=now;
this._lastPosition=position;
this._lastVelocity=velocity;

this._onUpdate(position);
if(!this.__active){
return;
}


var isOvershooting=false;
if(this._overshootClamping&&this._tension!==0){
if(this._startPosition<this._toValue){
isOvershooting=position>this._toValue;
}else{
isOvershooting=position<this._toValue;
}
}
var isVelocity=Math.abs(velocity)<=this._restSpeedThreshold;
var isDisplacement=true;
if(this._tension!==0){
isDisplacement=Math.abs(this._toValue-position)<=this._restDisplacementThreshold;
}

if(isOvershooting||isVelocity&&isDisplacement){
if(this._tension!==0){

this._onUpdate(this._toValue);
}

this.__debouncedOnEnd({finished:true});
return;
}
this._animationFrame=requestAnimationFrame(this.onUpdate.bind(this));
}},{key:'stop',value:function stop()

{
babelHelpers.get(SpringAnimation.prototype.__proto__||Object.getPrototypeOf(SpringAnimation.prototype),'stop',this).call(this);
this.__active=false;
global.cancelAnimationFrame(this._animationFrame);
this.__debouncedOnEnd({finished:false});
}}]);return SpringAnimation;}(Animation);




var _uniqueId=1;var







AnimatedValue=function(_AnimatedWithChildren){babelHelpers.inherits(AnimatedValue,_AnimatedWithChildren);







function AnimatedValue(value){babelHelpers.classCallCheck(this,AnimatedValue);var _this6=babelHelpers.possibleConstructorReturn(this,(AnimatedValue.__proto__||Object.getPrototypeOf(AnimatedValue)).call(this));

_this6._value=value;
_this6._offset=0;
_this6._animation=null;
_this6._listeners={};return _this6;
}babelHelpers.createClass(AnimatedValue,[{key:'__detach',value:function __detach()

{
this.stopAnimation();
babelHelpers.get(AnimatedValue.prototype.__proto__||Object.getPrototypeOf(AnimatedValue.prototype),'__detach',this).call(this);
}},{key:'__getValue',value:function __getValue()

{
return this._value+this._offset;
}},{key:'__makeNative',value:function __makeNative()

{
babelHelpers.get(AnimatedValue.prototype.__proto__||Object.getPrototypeOf(AnimatedValue.prototype),'__makeNative',this).call(this);

if(Object.keys(this._listeners).length){
this._startListeningToNativeValueUpdates();
}
}},{key:'setValue',value:function setValue(





value){
if(this._animation){
this._animation.stop();
this._animation=null;
}
this._updateValue(
value,
!this.__isNative);
if(this.__isNative){
NativeAnimatedAPI.setAnimatedNodeValue(this.__getNativeTag(),value);
}
}},{key:'setOffset',value:function setOffset(






offset){
this._offset=offset;
if(this.__isNative){
NativeAnimatedAPI.setAnimatedNodeOffset(this.__getNativeTag(),offset);
}
}},{key:'flattenOffset',value:function flattenOffset()





{
this._value+=this._offset;
this._offset=0;
if(this.__isNative){
NativeAnimatedAPI.flattenAnimatedNodeOffset(this.__getNativeTag());
}
}},{key:'extractOffset',value:function extractOffset()





{
this._offset+=this._value;
this._value=0;
if(this.__isNative){
NativeAnimatedAPI.extractAnimatedNodeOffset(this.__getNativeTag());
}
}},{key:'addListener',value:function addListener(






callback){
var id=String(_uniqueId++);
this._listeners[id]=callback;
if(this.__isNative){
this._startListeningToNativeValueUpdates();
}
return id;
}},{key:'removeListener',value:function removeListener(

id){
delete this._listeners[id];
if(this.__isNative&&Object.keys(this._listeners).length===0){
this._stopListeningForNativeValueUpdates();
}
}},{key:'removeAllListeners',value:function removeAllListeners()

{
this._listeners={};
if(this.__isNative){
this._stopListeningForNativeValueUpdates();
}
}},{key:'_startListeningToNativeValueUpdates',value:function _startListeningToNativeValueUpdates()

{var _this7=this;
if(this.__nativeAnimatedValueListener){
return;
}

NativeAnimatedAPI.startListeningToAnimatedNodeValue(this.__getNativeTag());
this.__nativeAnimatedValueListener=NativeAnimatedHelper.nativeEventEmitter.addListener(
'onAnimatedValueUpdate',
function(data){
if(data.tag!==_this7.__getNativeTag()){
return;
}
_this7._updateValue(data.value,false);
});

}},{key:'_stopListeningForNativeValueUpdates',value:function _stopListeningForNativeValueUpdates()

{
if(!this.__nativeAnimatedValueListener){
return;
}

this.__nativeAnimatedValueListener.remove();
this.__nativeAnimatedValueListener=null;
NativeAnimatedAPI.stopListeningToAnimatedNodeValue(this.__getNativeTag());
}},{key:'stopAnimation',value:function stopAnimation(






callback){
this.stopTracking();
this._animation&&this._animation.stop();
this._animation=null;
callback&&callback(this.__getValue());
}},{key:'interpolate',value:function interpolate(





config){
return new AnimatedInterpolation(this,config);
}},{key:'animate',value:function animate(





animation,callback){var _this8=this;
var handle=null;
if(animation.__isInteraction){
handle=InteractionManager.createInteractionHandle();
}
var previousAnimation=this._animation;
this._animation&&this._animation.stop();
this._animation=animation;
animation.start(
this._value,
function(value){


_this8._updateValue(value,true);
},
function(result){
_this8._animation=null;
if(handle!==null){
InteractionManager.clearInteractionHandle(handle);
}
callback&&callback(result);
},
previousAnimation,
this);

}},{key:'stopTracking',value:function stopTracking()




{
this._tracking&&this._tracking.__detach();
this._tracking=null;
}},{key:'track',value:function track(




tracking){
this.stopTracking();
this._tracking=tracking;
}},{key:'_updateValue',value:function _updateValue(

value,flush){
this._value=value;
if(flush){
_flush(this);
}
for(var key in this._listeners){
this._listeners[key]({value:this.__getValue()});
}
}},{key:'__getNativeConfig',value:function __getNativeConfig()

{
return{
type:'value',
value:this._value,
offset:this._offset};

}}]);return AnimatedValue;}(AnimatedWithChildren);var










































AnimatedValueXY=function(_AnimatedWithChildren2){babelHelpers.inherits(AnimatedValueXY,_AnimatedWithChildren2);




function AnimatedValueXY(valueIn){babelHelpers.classCallCheck(this,AnimatedValueXY);var _this9=babelHelpers.possibleConstructorReturn(this,(AnimatedValueXY.__proto__||Object.getPrototypeOf(AnimatedValueXY)).call(this));

var value=valueIn||{x:0,y:0};
if(typeof value.x==='number'&&typeof value.y==='number'){
_this9.x=new AnimatedValue(value.x);
_this9.y=new AnimatedValue(value.y);
}else{
invariant(
value.x instanceof AnimatedValue&&
value.y instanceof AnimatedValue,
'AnimatedValueXY must be initalized with an object of numbers or '+
'AnimatedValues.');

_this9.x=value.x;
_this9.y=value.y;
}
_this9._listeners={};return _this9;
}babelHelpers.createClass(AnimatedValueXY,[{key:'setValue',value:function setValue(

value){
this.x.setValue(value.x);
this.y.setValue(value.y);
}},{key:'setOffset',value:function setOffset(

offset){
this.x.setOffset(offset.x);
this.y.setOffset(offset.y);
}},{key:'flattenOffset',value:function flattenOffset()

{
this.x.flattenOffset();
this.y.flattenOffset();
}},{key:'__getValue',value:function __getValue()

{
return{
x:this.x.__getValue(),
y:this.y.__getValue()};

}},{key:'stopAnimation',value:function stopAnimation(

callback){
this.x.stopAnimation();
this.y.stopAnimation();
callback&&callback(this.__getValue());
}},{key:'addListener',value:function addListener(

callback){var _this10=this;
var id=String(_uniqueId++);
var jointCallback=function jointCallback(_ref2){var number=_ref2.value;
callback(_this10.__getValue());
};
this._listeners[id]={
x:this.x.addListener(jointCallback),
y:this.y.addListener(jointCallback)};

return id;
}},{key:'removeListener',value:function removeListener(

id){
this.x.removeListener(this._listeners[id].x);
this.y.removeListener(this._listeners[id].y);
delete this._listeners[id];
}},{key:'getLayout',value:function getLayout()








{
return{
left:this.x,
top:this.y};

}},{key:'getTranslateTransform',value:function getTranslateTransform()










{
return[
{translateX:this.x},
{translateY:this.y}];

}}]);return AnimatedValueXY;}(AnimatedWithChildren);var


AnimatedInterpolation=function(_AnimatedWithChildren3){babelHelpers.inherits(AnimatedInterpolation,_AnimatedWithChildren3);




function AnimatedInterpolation(parent,config){babelHelpers.classCallCheck(this,AnimatedInterpolation);var _this11=babelHelpers.possibleConstructorReturn(this,(AnimatedInterpolation.__proto__||Object.getPrototypeOf(AnimatedInterpolation)).call(this));

_this11._parent=parent;
_this11._config=config;
_this11._interpolation=Interpolation.create(config);return _this11;
}babelHelpers.createClass(AnimatedInterpolation,[{key:'__getValue',value:function __getValue()

{
var parentValue=this._parent.__getValue();
invariant(
typeof parentValue==='number',
'Cannot interpolate an input which is not a number.');




return this._interpolation(parentValue);
}},{key:'interpolate',value:function interpolate(

config){
return new AnimatedInterpolation(this,config);
}},{key:'__attach',value:function __attach()

{
this._parent.__addChild(this);
}},{key:'__detach',value:function __detach()

{
this._parent.__removeChild(this);
babelHelpers.get(AnimatedInterpolation.prototype.__proto__||Object.getPrototypeOf(AnimatedInterpolation.prototype),'__detach',this).call(this);
}},{key:'__transformDataType',value:function __transformDataType(

range){


return range.map(function(value){
if(typeof value!=='string'){
return value;
}
if(/deg$/.test(value)){
var degrees=parseFloat(value,10)||0;
var radians=degrees*Math.PI/180.0;
return radians;
}else{

return parseFloat(value,10)||0;
}
});
}},{key:'__getNativeConfig',value:function __getNativeConfig()

{
if(__DEV__){
NativeAnimatedHelper.validateInterpolation(this._config);
}

return{
inputRange:this._config.inputRange,

outputRange:this.__transformDataType(this._config.outputRange),
extrapolateLeft:this._config.extrapolateLeft||this._config.extrapolate||'extend',
extrapolateRight:this._config.extrapolateRight||this._config.extrapolate||'extend',
type:'interpolation'};

}}]);return AnimatedInterpolation;}(AnimatedWithChildren);var


AnimatedAddition=function(_AnimatedWithChildren4){babelHelpers.inherits(AnimatedAddition,_AnimatedWithChildren4);



function AnimatedAddition(a,b){babelHelpers.classCallCheck(this,AnimatedAddition);var _this12=babelHelpers.possibleConstructorReturn(this,(AnimatedAddition.__proto__||Object.getPrototypeOf(AnimatedAddition)).call(this));

_this12._a=typeof a==='number'?new AnimatedValue(a):a;
_this12._b=typeof b==='number'?new AnimatedValue(b):b;return _this12;
}babelHelpers.createClass(AnimatedAddition,[{key:'__makeNative',value:function __makeNative()

{
this._a.__makeNative();
this._b.__makeNative();
babelHelpers.get(AnimatedAddition.prototype.__proto__||Object.getPrototypeOf(AnimatedAddition.prototype),'__makeNative',this).call(this);
}},{key:'__getValue',value:function __getValue()

{
return this._a.__getValue()+this._b.__getValue();
}},{key:'interpolate',value:function interpolate(

config){
return new AnimatedInterpolation(this,config);
}},{key:'__attach',value:function __attach()

{
this._a.__addChild(this);
this._b.__addChild(this);
}},{key:'__detach',value:function __detach()

{
this._a.__removeChild(this);
this._b.__removeChild(this);
babelHelpers.get(AnimatedAddition.prototype.__proto__||Object.getPrototypeOf(AnimatedAddition.prototype),'__detach',this).call(this);
}},{key:'__getNativeConfig',value:function __getNativeConfig()

{
return{
type:'addition',
input:[this._a.__getNativeTag(),this._b.__getNativeTag()]};

}}]);return AnimatedAddition;}(AnimatedWithChildren);var


AnimatedDivision=function(_AnimatedWithChildren5){babelHelpers.inherits(AnimatedDivision,_AnimatedWithChildren5);



function AnimatedDivision(a,b){babelHelpers.classCallCheck(this,AnimatedDivision);var _this13=babelHelpers.possibleConstructorReturn(this,(AnimatedDivision.__proto__||Object.getPrototypeOf(AnimatedDivision)).call(this));

_this13._a=typeof a==='number'?new AnimatedValue(a):a;
_this13._b=typeof b==='number'?new AnimatedValue(b):b;return _this13;
}babelHelpers.createClass(AnimatedDivision,[{key:'__makeNative',value:function __makeNative()

{
babelHelpers.get(AnimatedDivision.prototype.__proto__||Object.getPrototypeOf(AnimatedDivision.prototype),'__makeNative',this).call(this);
this._a.__makeNative();
this._b.__makeNative();
}},{key:'__getValue',value:function __getValue()

{
var a=this._a.__getValue();
var b=this._b.__getValue();
if(b===0){
console.error('Detected division by zero in AnimatedDivision');
}
return a/b;
}},{key:'interpolate',value:function interpolate(

config){
return new AnimatedInterpolation(this,config);
}},{key:'__attach',value:function __attach()

{
this._a.__addChild(this);
this._b.__addChild(this);
}},{key:'__detach',value:function __detach()

{
this._a.__removeChild(this);
this._b.__removeChild(this);
babelHelpers.get(AnimatedDivision.prototype.__proto__||Object.getPrototypeOf(AnimatedDivision.prototype),'__detach',this).call(this);
}},{key:'__getNativeConfig',value:function __getNativeConfig()

{
return{
type:'division',
input:[this._a.__getNativeTag(),this._b.__getNativeTag()]};

}}]);return AnimatedDivision;}(AnimatedWithChildren);var


AnimatedMultiplication=function(_AnimatedWithChildren6){babelHelpers.inherits(AnimatedMultiplication,_AnimatedWithChildren6);



function AnimatedMultiplication(a,b){babelHelpers.classCallCheck(this,AnimatedMultiplication);var _this14=babelHelpers.possibleConstructorReturn(this,(AnimatedMultiplication.__proto__||Object.getPrototypeOf(AnimatedMultiplication)).call(this));

_this14._a=typeof a==='number'?new AnimatedValue(a):a;
_this14._b=typeof b==='number'?new AnimatedValue(b):b;return _this14;
}babelHelpers.createClass(AnimatedMultiplication,[{key:'__makeNative',value:function __makeNative()

{
babelHelpers.get(AnimatedMultiplication.prototype.__proto__||Object.getPrototypeOf(AnimatedMultiplication.prototype),'__makeNative',this).call(this);
this._a.__makeNative();
this._b.__makeNative();
}},{key:'__getValue',value:function __getValue()

{
return this._a.__getValue()*this._b.__getValue();
}},{key:'interpolate',value:function interpolate(

config){
return new AnimatedInterpolation(this,config);
}},{key:'__attach',value:function __attach()

{
this._a.__addChild(this);
this._b.__addChild(this);
}},{key:'__detach',value:function __detach()

{
this._a.__removeChild(this);
this._b.__removeChild(this);
babelHelpers.get(AnimatedMultiplication.prototype.__proto__||Object.getPrototypeOf(AnimatedMultiplication.prototype),'__detach',this).call(this);
}},{key:'__getNativeConfig',value:function __getNativeConfig()

{
return{
type:'multiplication',
input:[this._a.__getNativeTag(),this._b.__getNativeTag()]};

}}]);return AnimatedMultiplication;}(AnimatedWithChildren);var


AnimatedModulo=function(_AnimatedWithChildren7){babelHelpers.inherits(AnimatedModulo,_AnimatedWithChildren7);



function AnimatedModulo(a,modulus){babelHelpers.classCallCheck(this,AnimatedModulo);var _this15=babelHelpers.possibleConstructorReturn(this,(AnimatedModulo.__proto__||Object.getPrototypeOf(AnimatedModulo)).call(this));

_this15._a=a;
_this15._modulus=modulus;return _this15;
}babelHelpers.createClass(AnimatedModulo,[{key:'__makeNative',value:function __makeNative()

{
babelHelpers.get(AnimatedModulo.prototype.__proto__||Object.getPrototypeOf(AnimatedModulo.prototype),'__makeNative',this).call(this);
this._a.__makeNative();
}},{key:'__getValue',value:function __getValue()

{
return(this._a.__getValue()%this._modulus+this._modulus)%this._modulus;
}},{key:'interpolate',value:function interpolate(

config){
return new AnimatedInterpolation(this,config);
}},{key:'__attach',value:function __attach()

{
this._a.__addChild(this);
}},{key:'__detach',value:function __detach()

{
this._a.__removeChild(this);
}},{key:'__getNativeConfig',value:function __getNativeConfig()

{
return{
type:'modulus',
input:this._a.__getNativeTag(),
modulus:this._modulus};

}}]);return AnimatedModulo;}(AnimatedWithChildren);var


AnimatedDiffClamp=function(_AnimatedWithChildren8){babelHelpers.inherits(AnimatedDiffClamp,_AnimatedWithChildren8);






function AnimatedDiffClamp(a,min,max){babelHelpers.classCallCheck(this,AnimatedDiffClamp);var _this16=babelHelpers.possibleConstructorReturn(this,(AnimatedDiffClamp.__proto__||Object.getPrototypeOf(AnimatedDiffClamp)).call(this));


_this16._a=a;
_this16._min=min;
_this16._max=max;
_this16._value=_this16._lastValue=_this16._a.__getValue();return _this16;
}babelHelpers.createClass(AnimatedDiffClamp,[{key:'__makeNative',value:function __makeNative()

{
babelHelpers.get(AnimatedDiffClamp.prototype.__proto__||Object.getPrototypeOf(AnimatedDiffClamp.prototype),'__makeNative',this).call(this);
this._a.__makeNative();
}},{key:'interpolate',value:function interpolate(

config){
return new AnimatedInterpolation(this,config);
}},{key:'__getValue',value:function __getValue()

{
var value=this._a.__getValue();
var diff=value-this._lastValue;
this._lastValue=value;
this._value=Math.min(Math.max(this._value+diff,this._min),this._max);
return this._value;
}},{key:'__attach',value:function __attach()

{
this._a.__addChild(this);
}},{key:'__detach',value:function __detach()

{
this._a.__removeChild(this);
}},{key:'__getNativeConfig',value:function __getNativeConfig()

{
return{
type:'diffclamp',
input:this._a.__getNativeTag(),
min:this._min,
max:this._max};

}}]);return AnimatedDiffClamp;}(AnimatedWithChildren);var


AnimatedTransform=function(_AnimatedWithChildren9){babelHelpers.inherits(AnimatedTransform,_AnimatedWithChildren9);


function AnimatedTransform(transforms){babelHelpers.classCallCheck(this,AnimatedTransform);var _this17=babelHelpers.possibleConstructorReturn(this,(AnimatedTransform.__proto__||Object.getPrototypeOf(AnimatedTransform)).call(this));

_this17._transforms=transforms;return _this17;
}babelHelpers.createClass(AnimatedTransform,[{key:'__makeNative',value:function __makeNative()

{
babelHelpers.get(AnimatedTransform.prototype.__proto__||Object.getPrototypeOf(AnimatedTransform.prototype),'__makeNative',this).call(this);
this._transforms.forEach(function(transform){
for(var key in transform){
var value=transform[key];
if(value instanceof Animated){
value.__makeNative();
}
}
});
}},{key:'__getValue',value:function __getValue()

{
return this._transforms.map(function(transform){
var result={};
for(var key in transform){
var value=transform[key];
if(value instanceof Animated){
result[key]=value.__getValue();
}else{
result[key]=value;
}
}
return result;
});
}},{key:'__getAnimatedValue',value:function __getAnimatedValue()

{
return this._transforms.map(function(transform){
var result={};
for(var key in transform){
var value=transform[key];
if(value instanceof Animated){
result[key]=value.__getAnimatedValue();
}else{

result[key]=value;
}
}
return result;
});
}},{key:'__attach',value:function __attach()

{var _this18=this;
this._transforms.forEach(function(transform){
for(var key in transform){
var value=transform[key];
if(value instanceof Animated){
value.__addChild(_this18);
}
}
});
}},{key:'__detach',value:function __detach()

{var _this19=this;
this._transforms.forEach(function(transform){
for(var key in transform){
var value=transform[key];
if(value instanceof Animated){
value.__removeChild(_this19);
}
}
});
}},{key:'__getNativeConfig',value:function __getNativeConfig()

{
var transConfigs=[];

this._transforms.forEach(function(transform){
for(var key in transform){
var value=transform[key];
if(value instanceof Animated){
transConfigs.push({
type:'animated',
property:key,
nodeTag:value.__getNativeTag()});

}else{
transConfigs.push({
type:'static',
property:key,
value:value});

}
}
});

NativeAnimatedHelper.validateTransform(transConfigs);
return{
type:'transform',
transforms:transConfigs};

}}]);return AnimatedTransform;}(AnimatedWithChildren);var


AnimatedStyle=function(_AnimatedWithChildren10){babelHelpers.inherits(AnimatedStyle,_AnimatedWithChildren10);


function AnimatedStyle(style){babelHelpers.classCallCheck(this,AnimatedStyle);var _this20=babelHelpers.possibleConstructorReturn(this,(AnimatedStyle.__proto__||Object.getPrototypeOf(AnimatedStyle)).call(this));

style=flattenStyle(style)||{};
if(style.transform){
style=babelHelpers.extends({},
style,{
transform:new AnimatedTransform(style.transform)});

}
_this20._style=style;return _this20;
}babelHelpers.createClass(AnimatedStyle,[{key:'__getValue',value:function __getValue()

{
var style={};
for(var key in this._style){
var value=this._style[key];
if(value instanceof Animated){
if(!value.__isNative){


style[key]=value.__getValue();
}
}else{
style[key]=value;
}
}
return style;
}},{key:'__getAnimatedValue',value:function __getAnimatedValue()

{
var style={};
for(var key in this._style){
var value=this._style[key];
if(value instanceof Animated){
style[key]=value.__getAnimatedValue();
}
}
return style;
}},{key:'__attach',value:function __attach()

{
for(var key in this._style){
var value=this._style[key];
if(value instanceof Animated){
value.__addChild(this);
}
}
}},{key:'__detach',value:function __detach()

{
for(var key in this._style){
var value=this._style[key];
if(value instanceof Animated){
value.__removeChild(this);
}
}
}},{key:'__makeNative',value:function __makeNative()

{
babelHelpers.get(AnimatedStyle.prototype.__proto__||Object.getPrototypeOf(AnimatedStyle.prototype),'__makeNative',this).call(this);
for(var key in this._style){
var value=this._style[key];
if(value instanceof Animated){
value.__makeNative();
}
}
}},{key:'__getNativeConfig',value:function __getNativeConfig()

{
var styleConfig={};
for(var styleKey in this._style){
if(this._style[styleKey]instanceof Animated){
styleConfig[styleKey]=this._style[styleKey].__getNativeTag();
}


}
NativeAnimatedHelper.validateStyles(styleConfig);
return{
type:'style',
style:styleConfig};

}}]);return AnimatedStyle;}(AnimatedWithChildren);var


AnimatedProps=function(_Animated2){babelHelpers.inherits(AnimatedProps,_Animated2);




function AnimatedProps(
props,
callback)
{babelHelpers.classCallCheck(this,AnimatedProps);var _this21=babelHelpers.possibleConstructorReturn(this,(AnimatedProps.__proto__||Object.getPrototypeOf(AnimatedProps)).call(this));

if(props.style){
props=babelHelpers.extends({},
props,{
style:new AnimatedStyle(props.style)});

}
_this21._props=props;
_this21._callback=callback;
_this21.__attach();return _this21;
}babelHelpers.createClass(AnimatedProps,[{key:'__getValue',value:function __getValue()

{
var props={};
for(var key in this._props){
var value=this._props[key];
if(value instanceof Animated){
if(!value.__isNative||value instanceof AnimatedStyle){


props[key]=value.__getValue();
}
}else if(value instanceof AnimatedEvent){
props[key]=value.__getHandler();
}else{
props[key]=value;
}
}
return props;
}},{key:'__getAnimatedValue',value:function __getAnimatedValue()

{
var props={};
for(var key in this._props){
var value=this._props[key];
if(value instanceof Animated){
props[key]=value.__getAnimatedValue();
}
}
return props;
}},{key:'__attach',value:function __attach()

{
for(var key in this._props){
var value=this._props[key];
if(value instanceof Animated){
value.__addChild(this);
}
}
}},{key:'__detach',value:function __detach()

{
if(this.__isNative&&this._animatedView){
this.__disconnectAnimatedView();
}
for(var key in this._props){
var value=this._props[key];
if(value instanceof Animated){
value.__removeChild(this);
}
}
babelHelpers.get(AnimatedProps.prototype.__proto__||Object.getPrototypeOf(AnimatedProps.prototype),'__detach',this).call(this);
}},{key:'update',value:function update()

{
this._callback();
}},{key:'__makeNative',value:function __makeNative()

{
if(!this.__isNative){
this.__isNative=true;
for(var key in this._props){
var value=this._props[key];
if(value instanceof Animated){
value.__makeNative();
}
}
if(this._animatedView){
this.__connectAnimatedView();
}
}
}},{key:'setNativeView',value:function setNativeView(

animatedView){
invariant(this._animatedView===undefined,'Animated view already set.');
this._animatedView=animatedView;
if(this.__isNative){
this.__connectAnimatedView();
}
}},{key:'__connectAnimatedView',value:function __connectAnimatedView()

{
invariant(this.__isNative,'Expected node to be marked as "native"');
var nativeViewTag=findNodeHandle(this._animatedView);
invariant(nativeViewTag!=null,'Unable to locate attached view in the native tree');
NativeAnimatedAPI.connectAnimatedNodeToView(this.__getNativeTag(),nativeViewTag);
}},{key:'__disconnectAnimatedView',value:function __disconnectAnimatedView()

{
invariant(this.__isNative,'Expected node to be marked as "native"');
var nativeViewTag=findNodeHandle(this._animatedView);
invariant(nativeViewTag!=null,'Unable to locate attached view in the native tree');
NativeAnimatedAPI.disconnectAnimatedNodeFromView(this.__getNativeTag(),nativeViewTag);
}},{key:'__getNativeConfig',value:function __getNativeConfig()

{
var propsConfig={};
for(var propKey in this._props){
var value=this._props[propKey];
if(value instanceof Animated){
propsConfig[propKey]=value.__getNativeTag();
}
}
NativeAnimatedHelper.validateProps(propsConfig);
return{
type:'props',
props:propsConfig};

}}]);return AnimatedProps;}(Animated);


function createAnimatedComponent(Component){var
AnimatedComponent=function(_React$Component){babelHelpers.inherits(AnimatedComponent,_React$Component);




function AnimatedComponent(props){babelHelpers.classCallCheck(this,AnimatedComponent);var _this22=babelHelpers.possibleConstructorReturn(this,(AnimatedComponent.__proto__||Object.getPrototypeOf(AnimatedComponent)).call(this,
props));
_this22._setComponentRef=_this22._setComponentRef.bind(_this22);return _this22;
}babelHelpers.createClass(AnimatedComponent,[{key:'componentWillUnmount',value:function componentWillUnmount()

{
this._propsAnimated&&this._propsAnimated.__detach();
this._detachNativeEvents(this.props);
}},{key:'setNativeProps',value:function setNativeProps(

props){
this._component.setNativeProps(props);
}},{key:'componentWillMount',value:function componentWillMount()

{
this._attachProps(this.props);
}},{key:'componentDidMount',value:function componentDidMount()

{
this._propsAnimated.setNativeView(this._component);

this._attachNativeEvents(this.props);
}},{key:'_attachNativeEvents',value:function _attachNativeEvents(

newProps){
if(newProps!==this.props){
this._detachNativeEvents(this.props);
}



var ref=this._component.getScrollableNode?
this._component.getScrollableNode():
this._component;

for(var _key in newProps){
var prop=newProps[_key];
if(prop instanceof AnimatedEvent&&prop.__isNative){
prop.__attach(ref,_key);
}
}
}},{key:'_detachNativeEvents',value:function _detachNativeEvents(

props){


var ref=this._component.getScrollableNode?
this._component.getScrollableNode():
this._component;

for(var _key2 in props){
var prop=props[_key2];
if(prop instanceof AnimatedEvent&&prop.__isNative){
prop.__detach(ref,_key2);
}
}
}},{key:'_attachProps',value:function _attachProps(

nextProps){var _this23=this;
var oldPropsAnimated=this._propsAnimated;







var callback=function callback(){
if(_this23._component.setNativeProps){
if(!_this23._propsAnimated.__isNative){
_this23._component.setNativeProps(
_this23._propsAnimated.__getAnimatedValue());

}else{
throw new Error('Attempting to run JS driven animation on animated '+
'node that has been moved to "native" earlier by starting an '+
'animation with `useNativeDriver: true`');
}
}else{
_this23.forceUpdate();
}
};

this._propsAnimated=new AnimatedProps(
nextProps,
callback);


if(this._component){
this._propsAnimated.setNativeView(this._component);
}









oldPropsAnimated&&oldPropsAnimated.__detach();
}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(

nextProps){
this._attachProps(nextProps);
this._attachNativeEvents(nextProps);
}},{key:'render',value:function render()

{
return(
React.createElement(Component,babelHelpers.extends({},
this._propsAnimated.__getValue(),{
ref:this._setComponentRef})));


}},{key:'_setComponentRef',value:function _setComponentRef(

c){
this._component=c;
}},{key:'getNode',value:function getNode()



{
return this._component;
}}]);return AnimatedComponent;}(React.Component);

AnimatedComponent.propTypes={
style:function style(props,propName,componentName){
if(!Component.propTypes){
return;
}

for(var key in ViewStylePropTypes){
if(!Component.propTypes[key]&&props[key]!==undefined){
console.warn(
'You are setting the style `{ '+key+': ... }` as a prop. You '+
'should nest it in a style object. '+
'E.g. `{ style: { '+key+': ... } }`');

}
}
}};


return AnimatedComponent;
}var

AnimatedTracking=function(_Animated3){babelHelpers.inherits(AnimatedTracking,_Animated3);






function AnimatedTracking(
value,
parent,
animationClass,
animationConfig,
callback)
{babelHelpers.classCallCheck(this,AnimatedTracking);var _this24=babelHelpers.possibleConstructorReturn(this,(AnimatedTracking.__proto__||Object.getPrototypeOf(AnimatedTracking)).call(this));

_this24._value=value;
_this24._parent=parent;
_this24._animationClass=animationClass;
_this24._animationConfig=animationConfig;
_this24._callback=callback;
_this24.__attach();return _this24;
}babelHelpers.createClass(AnimatedTracking,[{key:'__getValue',value:function __getValue()

{
return this._parent.__getValue();
}},{key:'__attach',value:function __attach()

{
this._parent.__addChild(this);
}},{key:'__detach',value:function __detach()

{
this._parent.__removeChild(this);
babelHelpers.get(AnimatedTracking.prototype.__proto__||Object.getPrototypeOf(AnimatedTracking.prototype),'__detach',this).call(this);
}},{key:'update',value:function update()

{
this._value.animate(new this._animationClass(babelHelpers.extends({},
this._animationConfig,{
toValue:this._animationConfig.toValue.__getValue()})),
this._callback);
}}]);return AnimatedTracking;}(Animated);







var add=function add(
a,
b)
{
return new AnimatedAddition(a,b);
};

var divide=function divide(
a,
b)
{
return new AnimatedDivision(a,b);
};

var multiply=function multiply(
a,
b)
{
return new AnimatedMultiplication(a,b);
};

var modulo=function modulo(
a,
modulus)
{
return new AnimatedModulo(a,modulus);
};

var diffClamp=function diffClamp(
a,
min,
max)
{
return new AnimatedDiffClamp(a,min,max);
};

var _combineCallbacks=function _combineCallbacks(callback,config){
if(callback&&config.onComplete){
return function(){
config.onComplete&&config.onComplete.apply(config,arguments);
callback&&callback.apply(undefined,arguments);
};
}else{
return callback||config.onComplete;
}
};

var maybeVectorAnim=function maybeVectorAnim(
value,
config,
anim)
{
if(value instanceof AnimatedValueXY){
var configX=babelHelpers.extends({},config);
var configY=babelHelpers.extends({},config);
for(var key in config){var _config$key=
config[key],x=_config$key.x,y=_config$key.y;
if(x!==undefined&&y!==undefined){
configX[key]=x;
configY[key]=y;
}
}
var aX=anim(value.x,configX);
var aY=anim(value.y,configY);


return parallel([aX,aY],{stopTogether:false});
}
return null;
};

var spring=function spring(
value,
config)
{
return maybeVectorAnim(value,config,spring)||{
start:function start(callback){
callback=_combineCallbacks(callback,config);
var singleValue=value;
var singleConfig=config;
singleValue.stopTracking();
if(config.toValue instanceof Animated){
singleValue.track(new AnimatedTracking(
singleValue,
config.toValue,
SpringAnimation,
singleConfig,
callback));

}else{
singleValue.animate(new SpringAnimation(singleConfig),callback);
}
},

stop:function stop(){
value.stopAnimation();
}};

};

var timing=function timing(
value,
config)
{
return maybeVectorAnim(value,config,timing)||{
start:function start(callback){
callback=_combineCallbacks(callback,config);
var singleValue=value;
var singleConfig=config;
singleValue.stopTracking();
if(config.toValue instanceof Animated){
singleValue.track(new AnimatedTracking(
singleValue,
config.toValue,
TimingAnimation,
singleConfig,
callback));

}else{
singleValue.animate(new TimingAnimation(singleConfig),callback);
}
},

stop:function stop(){
value.stopAnimation();
}};

};

var decay=function decay(
value,
config)
{
return maybeVectorAnim(value,config,decay)||{
start:function start(callback){
callback=_combineCallbacks(callback,config);
var singleValue=value;
var singleConfig=config;
singleValue.stopTracking();
singleValue.animate(new DecayAnimation(singleConfig),callback);
},

stop:function stop(){
value.stopAnimation();
}};

};

var sequence=function sequence(
animations)
{
var current=0;
return{
start:function start(callback){
var onComplete=function onComplete(result){
if(!result.finished){
callback&&callback(result);
return;
}

current++;

if(current===animations.length){
callback&&callback(result);
return;
}

animations[current].start(onComplete);
};

if(animations.length===0){
callback&&callback({finished:true});
}else{
animations[current].start(onComplete);
}
},

stop:function stop(){
if(current<animations.length){
animations[current].stop();
}
}};

};




var parallel=function parallel(
animations,
config)
{
var doneCount=0;

var hasEnded={};
var stopTogether=!(config&&config.stopTogether===false);

var result={
start:function start(callback){
if(doneCount===animations.length){
callback&&callback({finished:true});
return;
}

animations.forEach(function(animation,idx){
var cb=function cb(endResult){
hasEnded[idx]=true;
doneCount++;
if(doneCount===animations.length){
doneCount=0;
callback&&callback(endResult);
return;
}

if(!endResult.finished&&stopTogether){
result.stop();
}
};

if(!animation){
cb({finished:true});
}else{
animation.start(cb);
}
});
},

stop:function stop(){
animations.forEach(function(animation,idx){
!hasEnded[idx]&&animation.stop();
hasEnded[idx]=true;
});
}};


return result;
};

var delay=function delay(time){

return timing(new AnimatedValue(0),{toValue:0,delay:time,duration:0});
};

var stagger=function stagger(
time,
animations)
{
return parallel(animations.map(function(animation,i){
return sequence([
delay(time*i),
animation]);

}));
};var







AnimatedEvent=function(){




function AnimatedEvent(
argMapping)

{var config=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};babelHelpers.classCallCheck(this,AnimatedEvent);
this._argMapping=argMapping;
this._listener=config.listener;
this.__isNative=shouldUseNativeDriver(config);

if(this.__isNative){
invariant(!this._listener,'Listener is not supported for native driven events.');
}

if(__DEV__){
this._validateMapping();
}
}babelHelpers.createClass(AnimatedEvent,[{key:'__attach',value:function __attach(

viewRef,eventName){
invariant(this.__isNative,'Only native driven events need to be attached.');



var eventMappings=[];

var traverse=function traverse(value,path){
if(value instanceof AnimatedValue){
value.__makeNative();

eventMappings.push({
nativeEventPath:path,
animatedValueTag:value.__getNativeTag()});

}else if(typeof value==='object'){
for(var _key3 in value){
traverse(value[_key3],path.concat(_key3));
}
}
};

invariant(
this._argMapping[0]&&this._argMapping[0].nativeEvent,
'Native driven events only support animated values contained inside `nativeEvent`.');



traverse(this._argMapping[0].nativeEvent,[]);

var viewTag=findNodeHandle(viewRef);

eventMappings.forEach(function(mapping){
NativeAnimatedAPI.addAnimatedEventToView(viewTag,eventName,mapping);
});
}},{key:'__detach',value:function __detach(

viewTag,eventName){
invariant(this.__isNative,'Only native driven events need to be detached.');

NativeAnimatedAPI.removeAnimatedEventFromView(viewTag,eventName);
}},{key:'__getHandler',value:function __getHandler()

{var _this25=this;
return function(){for(var _len=arguments.length,args=Array(_len),_key4=0;_key4<_len;_key4++){args[_key4]=arguments[_key4];}
var traverse=function traverse(recMapping,recEvt,key){
if(typeof recEvt==='number'&&recMapping instanceof AnimatedValue){
recMapping.setValue(recEvt);
}else if(typeof recMapping==='object'){
for(var mappingKey in recMapping){
traverse(recMapping[mappingKey],recEvt[mappingKey],mappingKey);
}
}
};

if(!_this25.__isNative){
_this25._argMapping.forEach(function(mapping,idx){
traverse(mapping,args[idx],'arg'+idx);
});
}

if(_this25._listener){
_this25._listener.apply(null,args);
}
};
}},{key:'_validateMapping',value:function _validateMapping()

{
var traverse=function traverse(recMapping,recEvt,key){
if(typeof recEvt==='number'){
invariant(
recMapping instanceof AnimatedValue,
'Bad mapping of type '+typeof recMapping+' for key '+key+
', event value must map to AnimatedValue');

return;
}
invariant(
typeof recMapping==='object',
'Bad mapping of type '+typeof recMapping+' for key '+key);

invariant(
typeof recEvt==='object',
'Bad event of type '+typeof recEvt+' for key '+key);

for(var mappingKey in recMapping){
traverse(recMapping[mappingKey],recEvt[mappingKey],mappingKey);
}
};
}}]);return AnimatedEvent;}();


var event=function event(
argMapping,
config)
{
var animatedEvent=new AnimatedEvent(argMapping,config);
if(animatedEvent.__isNative){
return animatedEvent;
}else{
return animatedEvent.__getHandler();
}
};


























































































module.exports={




Value:AnimatedValue,



ValueXY:AnimatedValueXY,





decay:decay,




timing:timing,




spring:spring,





add:add,





divide:divide,





multiply:multiply,





modulo:modulo,










diffClamp:diffClamp,




delay:delay,





sequence:sequence,





parallel:parallel,




stagger:stagger,

















event:event,




createAnimatedComponent:createAnimatedComponent,

__PropsOnlyForTests:AnimatedProps};
}, 192, null, "AnimatedImplementation");
__d(/* InteractionManager */function(global, require, module, exports) {










'use strict';

var BatchedBridge=require(30 /* BatchedBridge */);
var EventEmitter=require(56 /* EventEmitter */);
var Set=require(194 /* Set */);
var TaskQueue=require(200 /* TaskQueue */);

var infoLog=require(201 /* infoLog */);
var invariant=require(26 /* fbjs/lib/invariant */);
var keyMirror=require(107 /* fbjs/lib/keyMirror */);




var _emitter=new EventEmitter();

var DEBUG_DELAY=0;
var DEBUG=false;


















































var InteractionManager={
Events:keyMirror({
interactionStart:true,
interactionComplete:true}),






runAfterInteractions:function runAfterInteractions(task){
var tasks=[];
var promise=new Promise(function(resolve){
_scheduleUpdate();
if(task){
tasks.push(task);
}
tasks.push({run:resolve,name:'resolve '+(task&&task.name||'?')});
_taskQueue.enqueueTasks(tasks);
});
return{
then:promise.then.bind(promise),
done:function done(){
if(promise.done){
return promise.done.apply(promise,arguments);
}else{
console.warn('Tried to call done when not supported by current Promise implementation.');
}
},
cancel:function cancel(){
_taskQueue.cancelTasks(tasks);
}};

},




createInteractionHandle:function createInteractionHandle(){
DEBUG&&infoLog('create interaction handle');
_scheduleUpdate();
var handle=++_inc;
_addInteractionSet.add(handle);
return handle;
},




clearInteractionHandle:function clearInteractionHandle(handle){
DEBUG&&infoLog('clear interaction handle');
invariant(
!!handle,
'Must provide a handle to clear.');

_scheduleUpdate();
_addInteractionSet.delete(handle);
_deleteInteractionSet.add(handle);
},

addListener:_emitter.addListener.bind(_emitter),






setDeadline:function setDeadline(deadline){
_deadline=deadline;
}};


var _interactionSet=new Set();
var _addInteractionSet=new Set();
var _deleteInteractionSet=new Set();
var _taskQueue=new TaskQueue({onMoreTasks:_scheduleUpdate});
var _nextUpdateHandle=0;
var _inc=0;
var _deadline=-1;






function _scheduleUpdate(){
if(!_nextUpdateHandle){
if(_deadline>0){
_nextUpdateHandle=setTimeout(_processUpdate,0+DEBUG_DELAY);
}else{
_nextUpdateHandle=setImmediate(_processUpdate);
}
}
}




function _processUpdate(){
_nextUpdateHandle=0;

var interactionCount=_interactionSet.size;
_addInteractionSet.forEach(function(handle){return(
_interactionSet.add(handle));});

_deleteInteractionSet.forEach(function(handle){return(
_interactionSet.delete(handle));});

var nextInteractionCount=_interactionSet.size;

if(interactionCount!==0&&nextInteractionCount===0){

_emitter.emit(InteractionManager.Events.interactionComplete);
}else if(interactionCount===0&&nextInteractionCount!==0){

_emitter.emit(InteractionManager.Events.interactionStart);
}


if(nextInteractionCount===0){
while(_taskQueue.hasTasksToProcess()){
_taskQueue.processNext();
if(_deadline>0&&
BatchedBridge.getEventLoopRunningTime()>=_deadline){

_scheduleUpdate();
break;
}
}
}
_addInteractionSet.clear();
_deleteInteractionSet.clear();
}

module.exports=InteractionManager;
}, 193, null, "InteractionManager");
__d(/* Set */function(global, require, module, exports) {














'use strict';

var Map=require(195 /* Map */);

var _shouldPolyfillES6Collection=require(196 /* _shouldPolyfillES6Collection */);
var toIterator=require(199 /* toIterator */);

module.exports=function(global){





if(!_shouldPolyfillES6Collection('Set')){
return global.Set;
}var










































Set=function(){










function Set(iterable){babelHelpers.classCallCheck(this,Set);
if(this==null||
typeof this!=='object'&&typeof this!=='function'){
throw new TypeError('Wrong set object type.');
}

initSet(this);

if(iterable!=null){
var it=toIterator(iterable);
var next;
while(!(next=it.next()).done){
this.add(next.value);
}
}
}babelHelpers.createClass(Set,[{key:'add',value:function add(









value){
this._map.set(value,value);
this.size=this._map.size;
return this;
}},{key:'clear',value:function clear()






{
initSet(this);
}},{key:'delete',value:function _delete(










value){
var ret=this._map.delete(value);
this.size=this._map.size;
return ret;
}},{key:'entries',value:function entries()






{
return this._map.entries();
}},{key:'forEach',value:function forEach(








callback){
var thisArg=arguments[1];
var it=this._map.keys();
var next;
while(!(next=it.next()).done){
callback.call(thisArg,next.value,next.value,this);
}
}},{key:'has',value:function has(









value){
return this._map.has(value);
}},{key:'values',value:function values()






{
return this._map.values();
}}]);return Set;}();



Set.prototype[toIterator.ITERATOR_SYMBOL]=Set.prototype.values;


Set.prototype.keys=Set.prototype.values;

function initSet(set){
set._map=new Map();
set.size=set._map.size;
}

return Set;
}(Function('return this')());
}, 194, null, "Set");
__d(/* Map */function(global, require, module, exports) {














'use strict';

var _shouldPolyfillES6Collection=require(196 /* _shouldPolyfillES6Collection */);
var guid=require(197 /* guid */);
var isNode=require(198 /* fbjs/lib/isNode */);
var toIterator=require(199 /* toIterator */);

module.exports=function(global,undefined){




if(!_shouldPolyfillES6Collection('Map')){
return global.Map;
}
























































var KIND_KEY='key';
var KIND_VALUE='value';
var KIND_KEY_VALUE='key+value';



var KEY_PREFIX='$map_';



var SECRET_SIZE_PROP;
if(__DEV__){
SECRET_SIZE_PROP='$size'+guid();
}


var OLD_IE_HASH_PREFIX='IE_HASH_';var

Map=function(){










function Map(iterable){babelHelpers.classCallCheck(this,Map);
if(!isObject(this)){
throw new TypeError('Wrong map object type.');
}

initMap(this);

if(iterable!=null){
var it=toIterator(iterable);
var next;
while(!(next=it.next()).done){
if(!isObject(next.value)){
throw new TypeError('Expected iterable items to be pair objects.');
}
this.set(next.value[0],next.value[1]);
}
}
}babelHelpers.createClass(Map,[{key:'clear',value:function clear()





{
initMap(this);
}},{key:'has',value:function has(








key){
var index=getIndex(this,key);
return!!(index!=null&&this._mapData[index]);
}},{key:'set',value:function set(









key,value){
var index=getIndex(this,key);

if(index!=null&&this._mapData[index]){
this._mapData[index][1]=value;
}else{
index=this._mapData.push([
key,
value])-
1;
setIndex(this,key,index);
if(__DEV__){
this[SECRET_SIZE_PROP]+=1;
}else{
this.size+=1;
}
}

return this;
}},{key:'get',value:function get(








key){
var index=getIndex(this,key);
if(index==null){
return undefined;
}else{
return this._mapData[index][1];
}
}},{key:'delete',value:function _delete(









key){
var index=getIndex(this,key);
if(index!=null&&this._mapData[index]){
setIndex(this,key,undefined);
this._mapData[index]=undefined;
if(__DEV__){
this[SECRET_SIZE_PROP]-=1;
}else{
this.size-=1;
}
return true;
}else{
return false;
}
}},{key:'entries',value:function entries()








{
return new MapIterator(this,KIND_KEY_VALUE);
}},{key:'keys',value:function keys()







{
return new MapIterator(this,KIND_KEY);
}},{key:'values',value:function values()







{
return new MapIterator(this,KIND_VALUE);
}},{key:'forEach',value:function forEach(










callback,thisArg){
if(typeof callback!=='function'){
throw new TypeError('Callback must be callable.');
}

var boundCallback=callback.bind(thisArg||undefined);
var mapData=this._mapData;




for(var i=0;i<mapData.length;i++){
var entry=mapData[i];
if(entry!=null){
boundCallback(entry[1],entry[0],this);
}
}
}}]);return Map;}();



Map.prototype[toIterator.ITERATOR_SYMBOL]=Map.prototype.entries;var

MapIterator=function(){









function MapIterator(map,kind){babelHelpers.classCallCheck(this,MapIterator);
if(!(isObject(map)&&map._mapData)){
throw new TypeError('Object is not a map.');
}

if([KIND_KEY,KIND_KEY_VALUE,KIND_VALUE].indexOf(kind)===-1){
throw new Error('Invalid iteration kind.');
}

this._map=map;
this._nextIndex=0;
this._kind=kind;
}babelHelpers.createClass(MapIterator,[{key:'next',value:function next()







{
if(!this instanceof Map){
throw new TypeError('Expected to be called on a MapIterator.');
}

var map=this._map;
var index=this._nextIndex;
var kind=this._kind;

if(map==null){
return createIterResultObject(undefined,true);
}

var entries=map._mapData;

while(index<entries.length){
var record=entries[index];

index+=1;
this._nextIndex=index;

if(record){
if(kind===KIND_KEY){
return createIterResultObject(record[0],false);
}else if(kind===KIND_VALUE){
return createIterResultObject(record[1],false);
}else if(kind){
return createIterResultObject(record,false);
}
}
}

this._map=undefined;

return createIterResultObject(undefined,true);
}}]);return MapIterator;}();





MapIterator.prototype[toIterator.ITERATOR_SYMBOL]=function(){
return this;
};












function getIndex(map,key){
if(isObject(key)){
var hash=getHash(key);
return map._objectIndex[hash];
}else{
var prefixedKey=KEY_PREFIX+key;
if(typeof key==='string'){
return map._stringIndex[prefixedKey];
}else{
return map._otherIndex[prefixedKey];
}
}
}







function setIndex(map,key,index){
var shouldDelete=index==null;

if(isObject(key)){
var hash=getHash(key);
if(shouldDelete){
delete map._objectIndex[hash];
}else{
map._objectIndex[hash]=index;
}
}else{
var prefixedKey=KEY_PREFIX+key;
if(typeof key==='string'){
if(shouldDelete){
delete map._stringIndex[prefixedKey];
}else{
map._stringIndex[prefixedKey]=index;
}
}else{
if(shouldDelete){
delete map._otherIndex[prefixedKey];
}else{
map._otherIndex[prefixedKey]=index;
}
}
}
}






function initMap(map){






map._mapData=[];







map._objectIndex={};


map._stringIndex={};


map._otherIndex={};







if(__DEV__){
if(isES5){



if(map.hasOwnProperty(SECRET_SIZE_PROP)){
map[SECRET_SIZE_PROP]=0;
}else{
Object.defineProperty(map,SECRET_SIZE_PROP,{
value:0,
writable:true});

Object.defineProperty(map,'size',{
set:function set(v){
console.error(
'PLEASE FIX ME: You are changing the map size property which '+
'should not be writable and will break in production.');

throw new Error('The map size property is not writable.');
},
get:function get(){return map[SECRET_SIZE_PROP];}});

}


return;
}
}



map.size=0;
}







function isObject(o){
return o!=null&&(typeof o==='object'||typeof o==='function');
}








function createIterResultObject(value,done){
return{value:value,done:done};
}


var isES5=function(){
try{
Object.defineProperty({},'x',{});
return true;
}catch(e){
return false;
}
}();







function isExtensible(o){
if(!isES5){
return true;
}else{
return Object.isExtensible(o);
}
}









function getIENodeHash(node){
var uniqueID;
switch(node.nodeType){
case 1:
uniqueID=node.uniqueID;
break;
case 9:
uniqueID=node.documentElement.uniqueID;
break;
default:
return null;}


if(uniqueID){
return OLD_IE_HASH_PREFIX+uniqueID;
}else{
return null;
}
}

var getHash=function(){
var propIsEnumerable=Object.prototype.propertyIsEnumerable;
var hashProperty=guid();
var hashCounter=0;







return function getHash(o){
if(o[hashProperty]){
return o[hashProperty];
}else if(!isES5&&
o.propertyIsEnumerable&&
o.propertyIsEnumerable[hashProperty]){
return o.propertyIsEnumerable[hashProperty];
}else if(!isES5&&
isNode(o)&&
getIENodeHash(o)){
return getIENodeHash(o);
}else if(!isES5&&o[hashProperty]){
return o[hashProperty];
}

if(isExtensible(o)){
hashCounter+=1;
if(isES5){
Object.defineProperty(o,hashProperty,{
enumerable:false,
writable:false,
configurable:false,
value:hashCounter});

}else if(o.propertyIsEnumerable){




o.propertyIsEnumerable=function(){
return propIsEnumerable.apply(this,arguments);
};
o.propertyIsEnumerable[hashProperty]=hashCounter;
}else if(isNode(o)){




o[hashProperty]=hashCounter;
}else{
throw new Error('Unable to set a non-enumerable property on object.');
}
return hashCounter;
}else{
throw new Error('Non-extensible objects are not allowed as keys.');
}
};
}();

return Map;
}(Function('return this')());
}, 195, null, "Map");
__d(/* _shouldPolyfillES6Collection */function(global, require, module, exports) {











'use strict';





function shouldPolyfillES6Collection(collectionName){
var Collection=global[collectionName];
if(Collection==null){
return true;
}





if(typeof global.Symbol!=='function'){
return true;
}

var proto=Collection.prototype;




return Collection==null||
typeof Collection!=='function'||
typeof proto.clear!=='function'||
new Collection().size!==0||
typeof proto.keys!=='function'||
typeof proto.forEach!=='function';
}

module.exports=shouldPolyfillES6Collection;
}, 196, null, "_shouldPolyfillES6Collection");
__d(/* guid */function(global, require, module, exports) {












'use strict';






function guid(){
return'f'+(Math.random()*(1<<30)).toString(16).replace('.','');
}

module.exports=guid;
}, 197, null, "guid");
__d(/* fbjs/lib/isNode.js */function(global, require, module, exports) {'use strict';
















function isNode(object){
return!!(object&&(typeof Node==='function'?object instanceof Node:typeof object==='object'&&typeof object.nodeType==='number'&&typeof object.nodeName==='string'));
}

module.exports=isNode;
}, 198, null, "fbjs/lib/isNode.js");
__d(/* toIterator */function(global, require, module, exports) {









'use strict';











var KIND_KEY='key';
var KIND_VALUE='value';
var KIND_KEY_VAL='key+value';

var ITERATOR_SYMBOL=typeof Symbol==='function'?typeof Symbol==='function'?
Symbol.iterator:'@@iterator':
'@@iterator';

var toIterator=function(){
if(!(Array.prototype[ITERATOR_SYMBOL]&&
String.prototype[ITERATOR_SYMBOL])){

return function(){var
ArrayIterator=function(){

function ArrayIterator(array,kind){babelHelpers.classCallCheck(this,ArrayIterator);
if(!Array.isArray(array)){
throw new TypeError('Object is not an Array');
}
this._iteratedObject=array;
this._kind=kind;
this._nextIndex=0;
}babelHelpers.createClass(ArrayIterator,[{key:'next',value:function next()


{
if(!this instanceof ArrayIterator){
throw new TypeError('Object is not an ArrayIterator');
}

if(this._iteratedObject==null){
return createIterResultObject(undefined,true);
}

var array=this._iteratedObject;
var len=this._iteratedObject.length;
var index=this._nextIndex;
var kind=this._kind;

if(index>=len){
this._iteratedObject=undefined;
return createIterResultObject(undefined,true);
}

this._nextIndex=index+1;

if(kind===KIND_KEY){
return createIterResultObject(index,false);
}else if(kind===KIND_VALUE){
return createIterResultObject(array[index],false);
}else if(kind===KIND_KEY_VAL){
return createIterResultObject([index,array[index]],false);
}
}},{key:


'@@iterator',value:function iterator(){
return this;
}}]);return ArrayIterator;}();var


StringIterator=function(){

function StringIterator(string){babelHelpers.classCallCheck(this,StringIterator);
if(typeof string!=='string'){
throw new TypeError('Object is not a string');
}
this._iteratedString=string;
this._nextIndex=0;
}babelHelpers.createClass(StringIterator,[{key:'next',value:function next()


{
if(!this instanceof StringIterator){
throw new TypeError('Object is not a StringIterator');
}

if(this._iteratedString==null){
return createIterResultObject(undefined,true);
}

var index=this._nextIndex;
var s=this._iteratedString;
var len=s.length;

if(index>=len){
this._iteratedString=undefined;
return createIterResultObject(undefined,true);
}

var ret;
var first=s.charCodeAt(index);

if(first<0xD800||first>0xDBFF||index+1===len){
ret=s[index];
}else{
var second=s.charCodeAt(index+1);
if(second<0xDC00||second>0xDFFF){
ret=s[index];
}else{
ret=s[index]+s[index+1];
}
}

this._nextIndex=index+ret.length;

return createIterResultObject(ret,false);
}},{key:


'@@iterator',value:function iterator(){
return this;
}}]);return StringIterator;}();



function createIterResultObject(value,done){
return{value:value,done:done};
}

return function(object,kind){
if(typeof object==='string'){
return new StringIterator(object);
}else if(Array.isArray(object)){
return new ArrayIterator(object,kind||KIND_VALUE);
}else{
return object[ITERATOR_SYMBOL]();
}
};
}();
}else{
return function(object){
return object[ITERATOR_SYMBOL]();
};
}
}();





babelHelpers.extends(toIterator,{
KIND_KEY:KIND_KEY,
KIND_VALUE:KIND_VALUE,
KIND_KEY_VAL:KIND_KEY_VAL,
ITERATOR_SYMBOL:ITERATOR_SYMBOL});


module.exports=toIterator;
}, 199, null, "toIterator");
__d(/* TaskQueue */function(global, require, module, exports) {










'use strict';

var infoLog=require(201 /* infoLog */);
var invariant=require(26 /* fbjs/lib/invariant */);











var DEBUG=false;var

















TaskQueue=function(){







function TaskQueue(_ref){var onMoreTasks=_ref.onMoreTasks;babelHelpers.classCallCheck(this,TaskQueue);
this._onMoreTasks=onMoreTasks;
this._queueStack=[{tasks:[],popable:false}];
}babelHelpers.createClass(TaskQueue,[{key:'enqueue',value:function enqueue(






task){
this._getCurrentQueue().push(task);
}},{key:'enqueueTasks',value:function enqueueTasks(

tasks){var _this=this;
tasks.forEach(function(task){return _this.enqueue(task);});
}},{key:'cancelTasks',value:function cancelTasks(

tasksToCancel){

this._queueStack=this._queueStack.
map(function(queue){return babelHelpers.extends({},
queue,{
tasks:queue.tasks.filter(function(task){return tasksToCancel.indexOf(task)===-1;})});}).

filter(function(queue,idx){return queue.tasks.length>0||idx===0;});
}},{key:'hasTasksToProcess',value:function hasTasksToProcess()











{
return this._getCurrentQueue().length>0;
}},{key:'processNext',value:function processNext()




{
var queue=this._getCurrentQueue();
if(queue.length){
var task=queue.shift();
try{
if(task.gen){
DEBUG&&infoLog('genPromise for task '+task.name);
this._genPromise(task);
}else if(task.run){
DEBUG&&infoLog('run task '+task.name);
task.run();
}else{
invariant(
typeof task==='function',
'Expected Function, SimpleTask, or PromiseTask, but got:\n'+
JSON.stringify(task,null,2));

DEBUG&&infoLog('run anonymous task');
task();
}
}catch(e){
e.message='TaskQueue: Error with task '+(task.name||'')+': '+
e.message;
throw e;
}
}
}},{key:'_getCurrentQueue',value:function _getCurrentQueue()




{
var stackIdx=this._queueStack.length-1;
var queue=this._queueStack[stackIdx];
if(queue.popable&&
queue.tasks.length===0&&
this._queueStack.length>1){
this._queueStack.pop();
DEBUG&&infoLog('popped queue: ',{stackIdx:stackIdx,queueStackSize:this._queueStack.length});
return this._getCurrentQueue();
}else{
return queue.tasks;
}
}},{key:'_genPromise',value:function _genPromise(

task){var _this2=this;




this._queueStack.push({tasks:[],popable:false});
var stackIdx=this._queueStack.length-1;
DEBUG&&infoLog('push new queue: ',{stackIdx:stackIdx});
DEBUG&&infoLog('exec gen task '+task.name);
task.gen().
then(function(){
DEBUG&&infoLog(
'onThen for gen task '+task.name,
{stackIdx:stackIdx,queueStackSize:_this2._queueStack.length});

_this2._queueStack[stackIdx].popable=true;
_this2.hasTasksToProcess()&&_this2._onMoreTasks();
}).
catch(function(ex){
ex.message='TaskQueue: Error resolving Promise in task '+task.name+': '+ex.message;
throw ex;
}).
done();
}}]);return TaskQueue;}();



module.exports=TaskQueue;
}, 200, null, "TaskQueue");
__d(/* infoLog */function(global, require, module, exports) {









'use strict';




function infoLog(){var _console;
return(_console=console).log.apply(_console,arguments);
}

module.exports=infoLog;
}, 201, null, "infoLog");
__d(/* Interpolation */function(global, require, module, exports) {











'use strict';

var invariant=require(26 /* fbjs/lib/invariant */);
var normalizeColor=require(20 /* normalizeColor */);












var linear=function linear(t){return t;};var





Interpolation=function(){function Interpolation(){babelHelpers.classCallCheck(this,Interpolation);}babelHelpers.createClass(Interpolation,null,[{key:'create',value:function create(
config){

if(config.outputRange&&typeof config.outputRange[0]==='string'){
return createInterpolationFromStringOutputRange(config);
}

var outputRange=config.outputRange;
checkInfiniteRange('outputRange',outputRange);

var inputRange=config.inputRange;
checkInfiniteRange('inputRange',inputRange);
checkValidInputRange(inputRange);

invariant(
inputRange.length===outputRange.length,
'inputRange ('+inputRange.length+') and outputRange ('+
outputRange.length+') must have the same length');


var easing=config.easing||linear;

var extrapolateLeft='extend';
if(config.extrapolateLeft!==undefined){
extrapolateLeft=config.extrapolateLeft;
}else if(config.extrapolate!==undefined){
extrapolateLeft=config.extrapolate;
}

var extrapolateRight='extend';
if(config.extrapolateRight!==undefined){
extrapolateRight=config.extrapolateRight;
}else if(config.extrapolate!==undefined){
extrapolateRight=config.extrapolate;
}

return function(input){
invariant(
typeof input==='number',
'Cannot interpolation an input which is not a number');


var range=findRange(input,inputRange);
return interpolate(
input,
inputRange[range],
inputRange[range+1],
outputRange[range],
outputRange[range+1],
easing,
extrapolateLeft,
extrapolateRight);

};
}}]);return Interpolation;}();


function interpolate(
input,
inputMin,
inputMax,
outputMin,
outputMax,
easing,
extrapolateLeft,
extrapolateRight)
{
var result=input;


if(result<inputMin){
if(extrapolateLeft==='identity'){
return result;
}else if(extrapolateLeft==='clamp'){
result=inputMin;
}else if(extrapolateLeft==='extend'){

}
}

if(result>inputMax){
if(extrapolateRight==='identity'){
return result;
}else if(extrapolateRight==='clamp'){
result=inputMax;
}else if(extrapolateRight==='extend'){

}
}

if(outputMin===outputMax){
return outputMin;
}

if(inputMin===inputMax){
if(input<=inputMin){
return outputMin;
}
return outputMax;
}


if(inputMin===-Infinity){
result=-result;
}else if(inputMax===Infinity){
result=result-inputMin;
}else{
result=(result-inputMin)/(inputMax-inputMin);
}


result=easing(result);


if(outputMin===-Infinity){
result=-result;
}else if(outputMax===Infinity){
result=result+outputMin;
}else{
result=result*(outputMax-outputMin)+outputMin;
}

return result;
}

function colorToRgba(input){
var int32Color=normalizeColor(input);
if(int32Color===null){
return input;
}

int32Color=int32Color||0;

var r=(int32Color&0xff000000)>>>24;
var g=(int32Color&0x00ff0000)>>>16;
var b=(int32Color&0x0000ff00)>>>8;
var a=(int32Color&0x000000ff)/255;

return'rgba('+r+', '+g+', '+b+', '+a+')';
}

var stringShapeRegex=/[0-9\.-]+/g;









function createInterpolationFromStringOutputRange(
config)
{
var outputRange=config.outputRange;
invariant(outputRange.length>=2,'Bad output range');
outputRange=outputRange.map(colorToRgba);
checkPattern(outputRange);












var outputRanges=outputRange[0].match(stringShapeRegex).map(function(){return[];});
outputRange.forEach(function(value){



value.match(stringShapeRegex).forEach(function(number,i){
outputRanges[i].push(+number);
});
});




var interpolations=outputRange[0].match(stringShapeRegex).map(function(value,i){
return Interpolation.create(babelHelpers.extends({},
config,{
outputRange:outputRanges[i]}));

});



var shouldRound=isRgbOrRgba(outputRange[0]);

return function(input){
var i=0;



return outputRange[0].replace(stringShapeRegex,function(){
var val=+interpolations[i++](input);
var rounded=shouldRound&&i<4?Math.round(val):Math.round(val*1000)/1000;
return String(rounded);
});
};
}

function isRgbOrRgba(range){
return typeof range==='string'&&range.startsWith('rgb');
}

function checkPattern(arr){
var pattern=arr[0].replace(stringShapeRegex,'');
for(var i=1;i<arr.length;++i){
invariant(
pattern===arr[i].replace(stringShapeRegex,''),
'invalid pattern '+arr[0]+' and '+arr[i]);

}
}

function findRange(input,inputRange){
for(var i=1;i<inputRange.length-1;++i){
if(inputRange[i]>=input){
break;
}
}
return i-1;
}

function checkValidInputRange(arr){
invariant(arr.length>=2,'inputRange must have at least 2 elements');
for(var i=1;i<arr.length;++i){
invariant(
arr[i]>=arr[i-1],






'inputRange must be monotonically increasing '+arr);

}
}

function checkInfiniteRange(name,arr){
invariant(arr.length>=2,name+' must have at least 2 elements');
invariant(
arr.length!==2||arr[0]!==-Infinity||arr[1]!==Infinity,






name+'cannot be ]-infinity;+infinity[ '+arr);

}

module.exports=Interpolation;
}, 202, null, "Interpolation");
__d(/* NativeAnimatedHelper */function(global, require, module, exports) {










'use strict';

var NativeAnimatedModule=require(29 /* NativeModules */).NativeAnimatedModule;
var NativeEventEmitter=require(55 /* NativeEventEmitter */);

var invariant=require(26 /* fbjs/lib/invariant */);

var __nativeAnimatedNodeTagCount=1;
var __nativeAnimationIdCount=1;








var nativeEventEmitter=void 0;





var API={
createAnimatedNode:function createAnimatedNode(tag,config){
assertNativeAnimatedModule();
NativeAnimatedModule.createAnimatedNode(tag,config);
},
startListeningToAnimatedNodeValue:function startListeningToAnimatedNodeValue(tag){
assertNativeAnimatedModule();
NativeAnimatedModule.startListeningToAnimatedNodeValue(tag);
},
stopListeningToAnimatedNodeValue:function stopListeningToAnimatedNodeValue(tag){
assertNativeAnimatedModule();
NativeAnimatedModule.stopListeningToAnimatedNodeValue(tag);
},
connectAnimatedNodes:function connectAnimatedNodes(parentTag,childTag){
assertNativeAnimatedModule();
NativeAnimatedModule.connectAnimatedNodes(parentTag,childTag);
},
disconnectAnimatedNodes:function disconnectAnimatedNodes(parentTag,childTag){
assertNativeAnimatedModule();
NativeAnimatedModule.disconnectAnimatedNodes(parentTag,childTag);
},
startAnimatingNode:function startAnimatingNode(animationId,nodeTag,config,endCallback){
assertNativeAnimatedModule();
NativeAnimatedModule.startAnimatingNode(animationId,nodeTag,config,endCallback);
},
stopAnimation:function stopAnimation(animationId){
assertNativeAnimatedModule();
NativeAnimatedModule.stopAnimation(animationId);
},
setAnimatedNodeValue:function setAnimatedNodeValue(nodeTag,value){
assertNativeAnimatedModule();
NativeAnimatedModule.setAnimatedNodeValue(nodeTag,value);
},
setAnimatedNodeOffset:function setAnimatedNodeOffset(nodeTag,offset){
assertNativeAnimatedModule();
NativeAnimatedModule.setAnimatedNodeOffset(nodeTag,offset);
},
flattenAnimatedNodeOffset:function flattenAnimatedNodeOffset(nodeTag){
assertNativeAnimatedModule();
NativeAnimatedModule.flattenAnimatedNodeOffset(nodeTag);
},
extractAnimatedNodeOffset:function extractAnimatedNodeOffset(nodeTag){
assertNativeAnimatedModule();
NativeAnimatedModule.extractAnimatedNodeOffset(nodeTag);
},
connectAnimatedNodeToView:function connectAnimatedNodeToView(nodeTag,viewTag){
assertNativeAnimatedModule();
NativeAnimatedModule.connectAnimatedNodeToView(nodeTag,viewTag);
},
disconnectAnimatedNodeFromView:function disconnectAnimatedNodeFromView(nodeTag,viewTag){
assertNativeAnimatedModule();
NativeAnimatedModule.disconnectAnimatedNodeFromView(nodeTag,viewTag);
},
dropAnimatedNode:function dropAnimatedNode(tag){
assertNativeAnimatedModule();
NativeAnimatedModule.dropAnimatedNode(tag);
},
addAnimatedEventToView:function addAnimatedEventToView(viewTag,eventName,eventMapping){
assertNativeAnimatedModule();
NativeAnimatedModule.addAnimatedEventToView(viewTag,eventName,eventMapping);
},
removeAnimatedEventFromView:function removeAnimatedEventFromView(viewTag,eventName){
assertNativeAnimatedModule();
NativeAnimatedModule.removeAnimatedEventFromView(viewTag,eventName);
}};









var PROPS_WHITELIST={
style:{
opacity:true,
transform:true,

scaleX:true,
scaleY:true,
translateX:true,
translateY:true}};



var TRANSFORM_WHITELIST={
translateX:true,
translateY:true,
scale:true,
scaleX:true,
scaleY:true,
rotate:true,
rotateX:true,
rotateY:true,
perspective:true};


function validateProps(params){
for(var key in params){
if(!PROPS_WHITELIST.hasOwnProperty(key)){
throw new Error('Property \''+key+'\' is not supported by native animated module');
}
}
}

function validateTransform(configs){
configs.forEach(function(config){
if(!TRANSFORM_WHITELIST.hasOwnProperty(config.property)){
throw new Error('Property \''+config.property+'\' is not supported by native animated module');
}
});
}

function validateStyles(styles){
var STYLES_WHITELIST=PROPS_WHITELIST.style||{};
for(var key in styles){
if(!STYLES_WHITELIST.hasOwnProperty(key)){
throw new Error('Style property \''+key+'\' is not supported by native animated module');
}
}
}

function validateInterpolation(config){
var SUPPORTED_INTERPOLATION_PARAMS={
inputRange:true,
outputRange:true,
extrapolate:true,
extrapolateRight:true,
extrapolateLeft:true};

for(var key in config){
if(!SUPPORTED_INTERPOLATION_PARAMS.hasOwnProperty(key)){
throw new Error('Interpolation property \''+key+'\' is not supported by native animated module');
}
}
}

function generateNewNodeTag(){
return __nativeAnimatedNodeTagCount++;
}

function generateNewAnimationId(){
return __nativeAnimationIdCount++;
}

function assertNativeAnimatedModule(){
invariant(NativeAnimatedModule,'Native animated module is not available');
}

function isNativeAnimatedAvailable(){
return!!NativeAnimatedModule;
}

module.exports={
API:API,
validateProps:validateProps,
validateStyles:validateStyles,
validateTransform:validateTransform,
validateInterpolation:validateInterpolation,
generateNewNodeTag:generateNewNodeTag,
generateNewAnimationId:generateNewAnimationId,
assertNativeAnimatedModule:assertNativeAnimatedModule,
isNativeAnimatedAvailable:isNativeAnimatedAvailable,
get nativeEventEmitter(){
if(!nativeEventEmitter){
nativeEventEmitter=new NativeEventEmitter(NativeAnimatedModule);
}
return nativeEventEmitter;
}};
}, 203, null, "NativeAnimatedHelper");
__d(/* SpringConfig */function(global, require, module, exports) {











'use strict';






function tensionFromOrigamiValue(oValue){
return(oValue-30)*3.62+194;
}

function frictionFromOrigamiValue(oValue){
return(oValue-8)*3+25;
}

function fromOrigamiTensionAndFriction(
tension,
friction)
{
return{
tension:tensionFromOrigamiValue(tension),
friction:frictionFromOrigamiValue(friction)};

}

function fromBouncinessAndSpeed(
bounciness,
speed)
{
function normalize(value,startValue,endValue){
return(value-startValue)/(endValue-startValue);
}

function projectNormal(n,start,end){
return start+n*(end-start);
}

function linearInterpolation(t,start,end){
return t*end+(1-t)*start;
}

function quadraticOutInterpolation(t,start,end){
return linearInterpolation(2*t-t*t,start,end);
}

function b3Friction1(x){
return 0.0007*Math.pow(x,3)-
0.031*Math.pow(x,2)+0.64*x+1.28;
}

function b3Friction2(x){
return 0.000044*Math.pow(x,3)-
0.006*Math.pow(x,2)+0.36*x+2;
}

function b3Friction3(x){
return 0.00000045*Math.pow(x,3)-
0.000332*Math.pow(x,2)+0.1078*x+5.84;
}

function b3Nobounce(tension){
if(tension<=18){
return b3Friction1(tension);
}else if(tension>18&&tension<=44){
return b3Friction2(tension);
}else{
return b3Friction3(tension);
}
}

var b=normalize(bounciness/1.7,0,20);
b=projectNormal(b,0,0.8);
var s=normalize(speed/1.7,0,20);
var bouncyTension=projectNormal(s,0.5,200);
var bouncyFriction=quadraticOutInterpolation(
b,
b3Nobounce(bouncyTension),
0.01);


return{
tension:tensionFromOrigamiValue(bouncyTension),
friction:frictionFromOrigamiValue(bouncyFriction)};

}

module.exports={
fromOrigamiTensionAndFriction:fromOrigamiTensionAndFriction,
fromBouncinessAndSpeed:fromBouncinessAndSpeed};
}, 204, null, "SpringConfig");
__d(/* fbjs/lib/requestAnimationFrame.js */function(global, require, module, exports) {'use strict';











var emptyFunction=require(16 /* ./emptyFunction */);
var nativeRequestAnimationFrame=require(206 /* ./nativeRequestAnimationFrame */);

var lastTime=0;

var requestAnimationFrame=nativeRequestAnimationFrame||function(callback){
var currTime=Date.now();
var timeDelay=Math.max(0,16-(currTime-lastTime));
lastTime=currTime+timeDelay;
return global.setTimeout(function(){
callback(Date.now());
},timeDelay);
};


requestAnimationFrame(emptyFunction);

module.exports=requestAnimationFrame;
}, 205, null, "fbjs/lib/requestAnimationFrame.js");
__d(/* fbjs/lib/nativeRequestAnimationFrame.js */function(global, require, module, exports) {"use strict";











var nativeRequestAnimationFrame=global.requestAnimationFrame||global.webkitRequestAnimationFrame||global.mozRequestAnimationFrame||global.oRequestAnimationFrame||global.msRequestAnimationFrame;

module.exports=nativeRequestAnimationFrame;
}, 206, null, "fbjs/lib/nativeRequestAnimationFrame.js");
__d(/* Easing */function(global, require, module, exports) {










'use strict';

var _ease=void 0;var






Easing=function(){function Easing(){babelHelpers.classCallCheck(this,Easing);}babelHelpers.createClass(Easing,null,[{key:'step0',value:function step0(
n){
return n>0?1:0;
}},{key:'step1',value:function step1(

n){
return n>=1?1:0;
}},{key:'linear',value:function linear(

t){
return t;
}},{key:'ease',value:function ease(

t){
if(!_ease){
_ease=Easing.bezier(0.42,0,1,1);
}
return _ease(t);
}},{key:'quad',value:function quad(

t){
return t*t;
}},{key:'cubic',value:function cubic(

t){
return t*t*t;
}},{key:'poly',value:function poly(

n){
return function(t){return Math.pow(t,n);};
}},{key:'sin',value:function sin(

t){
return 1-Math.cos(t*Math.PI/2);
}},{key:'circle',value:function circle(

t){
return 1-Math.sqrt(1-t*t);
}},{key:'exp',value:function exp(

t){
return Math.pow(2,10*(t-1));
}},{key:'elastic',value:function elastic()











{var bounciness=arguments.length>0&&arguments[0]!==undefined?arguments[0]:1;
var p=bounciness*Math.PI;
return function(t){return 1-Math.pow(Math.cos(t*Math.PI/2),3)*Math.cos(t*p);};
}},{key:'back',value:function back(

s){
if(s===undefined){
s=1.70158;
}
return function(t){return t*t*((s+1)*t-s);};
}},{key:'bounce',value:function bounce(

t){
if(t<1/2.75){
return 7.5625*t*t;
}

if(t<2/2.75){
t-=1.5/2.75;
return 7.5625*t*t+0.75;
}

if(t<2.5/2.75){
t-=2.25/2.75;
return 7.5625*t*t+0.9375;
}

t-=2.625/2.75;
return 7.5625*t*t+0.984375;
}},{key:'bezier',value:function bezier(


x1,
y1,
x2,
y2)
{
var _bezier=require(208 /* bezier */);
return _bezier(x1,y1,x2,y2);
}},{key:'in',value:function _in(


easing)
{
return easing;
}},{key:'out',value:function out(





easing)
{
return function(t){return 1-easing(1-t);};
}},{key:'inOut',value:function inOut(





easing)
{
return function(t){
if(t<0.5){
return easing(t*2)/2;
}
return 1-easing((1-t)*2)/2;
};
}}]);return Easing;}();


module.exports=Easing;
}, 207, null, "Easing");
__d(/* bezier */function(global, require, module, exports) {







'use strict';


var NEWTON_ITERATIONS=4;
var NEWTON_MIN_SLOPE=0.001;
var SUBDIVISION_PRECISION=0.0000001;
var SUBDIVISION_MAX_ITERATIONS=10;

var kSplineTableSize=11;
var kSampleStepSize=1.0/(kSplineTableSize-1.0);

var float32ArraySupported=typeof Float32Array==='function';

function A(aA1,aA2){return 1.0-3.0*aA2+3.0*aA1;}
function B(aA1,aA2){return 3.0*aA2-6.0*aA1;}
function C(aA1){return 3.0*aA1;}


function calcBezier(aT,aA1,aA2){return((A(aA1,aA2)*aT+B(aA1,aA2))*aT+C(aA1))*aT;}


function getSlope(aT,aA1,aA2){return 3.0*A(aA1,aA2)*aT*aT+2.0*B(aA1,aA2)*aT+C(aA1);}

function binarySubdivide(aX,aA,aB,mX1,mX2){
var currentX,currentT,i=0;
do{
currentT=aA+(aB-aA)/2.0;
currentX=calcBezier(currentT,mX1,mX2)-aX;
if(currentX>0.0){
aB=currentT;
}else{
aA=currentT;
}
}while(Math.abs(currentX)>SUBDIVISION_PRECISION&&++i<SUBDIVISION_MAX_ITERATIONS);
return currentT;
}

function newtonRaphsonIterate(aX,aGuessT,mX1,mX2){
for(var i=0;i<NEWTON_ITERATIONS;++i){
var currentSlope=getSlope(aGuessT,mX1,mX2);
if(currentSlope===0.0){
return aGuessT;
}
var currentX=calcBezier(aGuessT,mX1,mX2)-aX;
aGuessT-=currentX/currentSlope;
}
return aGuessT;
}

module.exports=function bezier(mX1,mY1,mX2,mY2){
if(!(0<=mX1&&mX1<=1&&0<=mX2&&mX2<=1)){
throw new Error('bezier x values must be in [0, 1] range');
}


var sampleValues=float32ArraySupported?new Float32Array(kSplineTableSize):new Array(kSplineTableSize);
if(mX1!==mY1||mX2!==mY2){
for(var i=0;i<kSplineTableSize;++i){
sampleValues[i]=calcBezier(i*kSampleStepSize,mX1,mX2);
}
}

function getTForX(aX){
var intervalStart=0.0;
var currentSample=1;
var lastSample=kSplineTableSize-1;

for(;currentSample!==lastSample&&sampleValues[currentSample]<=aX;++currentSample){
intervalStart+=kSampleStepSize;
}
--currentSample;


var dist=(aX-sampleValues[currentSample])/(sampleValues[currentSample+1]-sampleValues[currentSample]);
var guessForT=intervalStart+dist*kSampleStepSize;

var initialSlope=getSlope(guessForT,mX1,mX2);
if(initialSlope>=NEWTON_MIN_SLOPE){
return newtonRaphsonIterate(aX,guessForT,mX1,mX2);
}else if(initialSlope===0.0){
return guessForT;
}else{
return binarySubdivide(aX,intervalStart,intervalStart+kSampleStepSize,mX1,mX2);
}
}

return function BezierEasing(x){
if(mX1===mY1&&mX2===mY2){
return x;
}

if(x===0){
return 0;
}
if(x===1){
return 1;
}
return calcBezier(getTForX(x),mY1,mY2);
};
};
}, 208, null, "bezier");
__d(/* Image */function(global, require, module, exports) {










'use strict';

var EdgeInsetsPropType=require(121 /* EdgeInsetsPropType */);
var ImageResizeMode=require(106 /* ImageResizeMode */);
var ImageSourcePropType=require(210 /* ImageSourcePropType */);
var ImageStylePropTypes=require(105 /* ImageStylePropTypes */);
var NativeMethodsMixin=require(21 /* NativeMethodsMixin */);
var NativeModules=require(29 /* NativeModules */);
var React=require(78 /* React */);
var ReactNativeViewAttributes=require(126 /* ReactNativeViewAttributes */);
var StyleSheet=require(101 /* StyleSheet */);
var StyleSheetPropType=require(127 /* StyleSheetPropType */);

var flattenStyle=require(25 /* flattenStyle */);
var requireNativeComponent=require(128 /* requireNativeComponent */);
var resolveAssetSource=require(171 /* resolveAssetSource */);

var PropTypes=React.PropTypes;

var ImageViewManager=NativeModules.ImageViewManager;

































































































var Image=React.createClass({displayName:'Image',
propTypes:{





style:StyleSheetPropType(ImageStylePropTypes),








source:ImageSourcePropType,














defaultSource:PropTypes.oneOfType([

PropTypes.shape({
uri:PropTypes.string,
width:PropTypes.number,
height:PropTypes.number,
scale:PropTypes.number}),

PropTypes.number]),





accessible:PropTypes.bool,





accessibilityLabel:PropTypes.string,




blurRadius:PropTypes.number,









capInsets:EdgeInsetsPropType,



















resizeMethod:PropTypes.oneOf(['auto','resize','scale']),


















resizeMode:PropTypes.oneOf(['cover','contain','stretch','repeat','center']),




testID:PropTypes.string,




onLayout:PropTypes.func,





onLoadStart:PropTypes.func,




onProgress:PropTypes.func,



onError:PropTypes.func,






onPartialLoad:PropTypes.func,



onLoad:PropTypes.func,



onLoadEnd:PropTypes.func},


statics:{
resizeMode:ImageResizeMode,





















getSize:function getSize(
uri,
success,
failure)
{
ImageViewManager.getSize(uri,success,failure||function(){
console.warn('Failed to get size for image: '+uri);
});
},








prefetch:function prefetch(url){
return ImageViewManager.prefetchImage(url);
},





resolveAssetSource:resolveAssetSource},


mixins:[NativeMethodsMixin],





viewConfig:{
uiViewClassName:'UIView',
validAttributes:ReactNativeViewAttributes.UIView},


render:function render(){
var source=resolveAssetSource(this.props.source)||{uri:undefined,width:undefined,height:undefined};

var sources=void 0;
var style=void 0;
if(Array.isArray(source)){
style=flattenStyle([styles.base,this.props.style])||{};
sources=source;
}else{var
_width=source.width,_height=source.height,uri=source.uri;
style=flattenStyle([{width:_width,height:_height},styles.base,this.props.style])||{};
sources=[source];

if(uri===''){
console.warn('source.uri should not be an empty string');
}
}

var resizeMode=this.props.resizeMode||(style||{}).resizeMode||'cover';
var tintColor=(style||{}).tintColor;

if(this.props.src){
console.warn('The <Image> component requires a `source` property rather than `src`.');
}

return(
React.createElement(RCTImageView,babelHelpers.extends({},
this.props,{
style:style,
resizeMode:resizeMode,
tintColor:tintColor,
source:sources})));


}});


var styles=StyleSheet.create({
base:{
overflow:'hidden'}});



var RCTImageView=requireNativeComponent('RCTImageView',Image);

module.exports=Image;
}, 209, null, "Image");
__d(/* ImageSourcePropType */function(global, require, module, exports) {










'use strict';var _require=

require(78 /* React */),PropTypes=_require.PropTypes;

var ImageURISourcePropType=PropTypes.shape({






uri:PropTypes.string,





bundle:PropTypes.string,



method:PropTypes.string,




headers:PropTypes.objectOf(PropTypes.string),





body:PropTypes.string,




width:PropTypes.number,
height:PropTypes.number,




scale:PropTypes.number});


var ImageSourcePropType=PropTypes.oneOfType([
ImageURISourcePropType,

PropTypes.number,

PropTypes.arrayOf(ImageURISourcePropType)]);


module.exports=ImageSourcePropType;
}, 210, null, "ImageSourcePropType");
__d(/* ScrollView */function(global, require, module, exports) {










'use strict';

var ColorPropType=require(18 /* ColorPropType */);
var EdgeInsetsPropType=require(121 /* EdgeInsetsPropType */);
var Platform=require(28 /* Platform */);
var PointPropType=require(212 /* PointPropType */);
var React=require(78 /* React */);
var ReactNative=require(213 /* ReactNative */);
var ScrollResponder=require(262 /* ScrollResponder */);
var StyleSheet=require(101 /* StyleSheet */);
var StyleSheetPropType=require(127 /* StyleSheetPropType */);
var View=require(120 /* View */);
var ViewStylePropTypes=require(114 /* ViewStylePropTypes */);

var dismissKeyboard=require(63 /* dismissKeyboard */);
var flattenStyle=require(25 /* flattenStyle */);
var invariant=require(26 /* fbjs/lib/invariant */);
var processDecelerationRate=require(264 /* processDecelerationRate */);
var PropTypes=React.PropTypes;
var requireNativeComponent=require(128 /* requireNativeComponent */);































var ScrollView=React.createClass({displayName:'ScrollView',
propTypes:babelHelpers.extends({},
View.propTypes,{






automaticallyAdjustContentInsets:PropTypes.bool,





contentInset:EdgeInsetsPropType,





contentOffset:PointPropType,







bounces:PropTypes.bool,






bouncesZoom:PropTypes.bool,






alwaysBounceHorizontal:PropTypes.bool,






alwaysBounceVertical:PropTypes.bool,







centerContent:PropTypes.bool,















contentContainerStyle:StyleSheetPropType(ViewStylePropTypes),










decelerationRate:PropTypes.oneOfType([
PropTypes.oneOf(['fast','normal']),
PropTypes.number]),





horizontal:PropTypes.bool,







indicatorStyle:PropTypes.oneOf([
'default',
'black',
'white']),






directionalLockEnabled:PropTypes.bool,





canCancelContentTouches:PropTypes.bool,








keyboardDismissMode:PropTypes.oneOf([
'none',
'interactive',
'on-drag']),













keyboardShouldPersistTaps:PropTypes.oneOf(['always','never','handled',false,true]),




maximumZoomScale:PropTypes.number,




minimumZoomScale:PropTypes.number,




onScroll:PropTypes.func,




onScrollAnimationEnd:PropTypes.func,








onContentSizeChange:PropTypes.func,





pagingEnabled:PropTypes.bool,




scrollEnabled:PropTypes.bool,












scrollEventThrottle:PropTypes.number,






scrollIndicatorInsets:EdgeInsetsPropType,





scrollsToTop:PropTypes.bool,




showsHorizontalScrollIndicator:PropTypes.bool,




showsVerticalScrollIndicator:PropTypes.bool,








stickyHeaderIndices:PropTypes.arrayOf(PropTypes.number),
style:StyleSheetPropType(ViewStylePropTypes),







snapToInterval:PropTypes.number,








snapToAlignment:PropTypes.oneOf([
'start',
'center',
'end']),







removeClippedSubviews:PropTypes.bool,




zoomScale:PropTypes.number,







refreshControl:PropTypes.element,








endFillColor:ColorPropType,








scrollPerfTag:PropTypes.string}),


mixins:[ScrollResponder.Mixin],

getInitialState:function getInitialState(){
return this.scrollResponderMixinGetInitialState();
},

setNativeProps:function setNativeProps(props){
this._scrollViewRef&&this._scrollViewRef.setNativeProps(props);
},







getScrollResponder:function getScrollResponder(){
return this;
},

getScrollableNode:function getScrollableNode(){
return ReactNative.findNodeHandle(this._scrollViewRef);
},

getInnerViewNode:function getInnerViewNode(){
return ReactNative.findNodeHandle(this._innerViewRef);
},












scrollTo:function scrollTo(
y,
x,
animated)
{
if(typeof y==='number'){
console.warn('`scrollTo(y, x, animated)` is deprecated. Use `scrollTo({x: 5, y: 5, animated: true})` instead.');
}else{var _ref=
y||{};x=_ref.x;y=_ref.y;animated=_ref.animated;
}
this.getScrollResponder().scrollResponderScrollTo({x:x||0,y:y||0,animated:animated!==false});
},




scrollWithoutAnimationTo:function scrollWithoutAnimationTo(){var y=arguments.length>0&&arguments[0]!==undefined?arguments[0]:0;var x=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;
console.warn('`scrollWithoutAnimationTo` is deprecated. Use `scrollTo` instead');
this.scrollTo({x:x,y:y,animated:false});
},

_handleScroll:function _handleScroll(e){
if(__DEV__){
if(this.props.onScroll&&this.props.scrollEventThrottle==null&&Platform.OS==='ios'){
console.log(
'You specified `onScroll` on a <ScrollView> but not '+
'`scrollEventThrottle`. You will only receive one event. '+
'Using `16` you get all the events but be aware that it may '+
'cause frame drops, use a bigger number if you don\'t need as '+
'much precision.');

}
}
if(Platform.OS==='android'){
if(this.props.keyboardDismissMode==='on-drag'){
dismissKeyboard();
}
}
this.scrollResponderHandleScroll(e);
},

_handleContentOnLayout:function _handleContentOnLayout(e){var _e$nativeEvent$layout=
e.nativeEvent.layout,width=_e$nativeEvent$layout.width,height=_e$nativeEvent$layout.height;
this.props.onContentSizeChange&&this.props.onContentSizeChange(width,height);
},

_scrollViewRef:null,
_setScrollViewRef:function _setScrollViewRef(ref){
this._scrollViewRef=ref;
},

_innerViewRef:null,
_setInnerViewRef:function _setInnerViewRef(ref){
this._innerViewRef=ref;
},

render:function render(){
var contentContainerStyle=[
this.props.horizontal&&styles.contentContainerHorizontal,
this.props.contentContainerStyle];

var style=void 0,childLayoutProps=void 0;
if(__DEV__&&this.props.style){
style=flattenStyle(this.props.style);
childLayoutProps=['alignItems','justifyContent'].
filter(function(prop){return style&&style[prop]!==undefined;});
invariant(
childLayoutProps.length===0,
'ScrollView child layout ('+JSON.stringify(childLayoutProps)+
') must be applied through the contentContainerStyle prop.');

}

var contentSizeChangeProps={};
if(this.props.onContentSizeChange){
contentSizeChangeProps={
onLayout:this._handleContentOnLayout};

}

var contentContainer=
React.createElement(View,babelHelpers.extends({},
contentSizeChangeProps,{
ref:this._setInnerViewRef,
style:contentContainerStyle,
removeClippedSubviews:this.props.removeClippedSubviews,
collapsable:false}),
this.props.children);


var alwaysBounceHorizontal=
this.props.alwaysBounceHorizontal!==undefined?
this.props.alwaysBounceHorizontal:
this.props.horizontal;

var alwaysBounceVertical=
this.props.alwaysBounceVertical!==undefined?
this.props.alwaysBounceVertical:
!this.props.horizontal;

var baseStyle=this.props.horizontal?styles.baseHorizontal:styles.baseVertical;
var props=babelHelpers.extends({},
this.props,{
alwaysBounceHorizontal:alwaysBounceHorizontal,
alwaysBounceVertical:alwaysBounceVertical,
style:[baseStyle,this.props.style],


onContentSizeChange:null,
onTouchStart:this.scrollResponderHandleTouchStart,
onTouchMove:this.scrollResponderHandleTouchMove,
onTouchEnd:this.scrollResponderHandleTouchEnd,
onScrollBeginDrag:this.scrollResponderHandleScrollBeginDrag,
onScrollEndDrag:this.scrollResponderHandleScrollEndDrag,
onMomentumScrollBegin:this.scrollResponderHandleMomentumScrollBegin,
onMomentumScrollEnd:this.scrollResponderHandleMomentumScrollEnd,
onStartShouldSetResponder:this.scrollResponderHandleStartShouldSetResponder,
onStartShouldSetResponderCapture:this.scrollResponderHandleStartShouldSetResponderCapture,
onScrollShouldSetResponder:this.scrollResponderHandleScrollShouldSetResponder,
onScroll:this._handleScroll,
onResponderGrant:this.scrollResponderHandleResponderGrant,
onResponderTerminationRequest:this.scrollResponderHandleTerminationRequest,
onResponderTerminate:this.scrollResponderHandleTerminate,
onResponderRelease:this.scrollResponderHandleResponderRelease,
onResponderReject:this.scrollResponderHandleResponderReject,
sendMomentumEvents:this.props.onMomentumScrollBegin||this.props.onMomentumScrollEnd?true:false});var


decelerationRate=this.props.decelerationRate;
if(decelerationRate){
props.decelerationRate=processDecelerationRate(decelerationRate);
}

var ScrollViewClass=void 0;
if(Platform.OS==='ios'){
ScrollViewClass=RCTScrollView;
}else if(Platform.OS==='android'){
if(this.props.horizontal){
ScrollViewClass=AndroidHorizontalScrollView;
}else{
ScrollViewClass=AndroidScrollView;
}
}
invariant(
ScrollViewClass!==undefined,
'ScrollViewClass must not be undefined');


var refreshControl=this.props.refreshControl;
if(refreshControl){
if(Platform.OS==='ios'){

return(
React.createElement(ScrollViewClass,babelHelpers.extends({},props,{ref:this._setScrollViewRef}),
refreshControl,
contentContainer));


}else if(Platform.OS==='android'){






return React.cloneElement(
refreshControl,
{style:props.style},
React.createElement(ScrollViewClass,babelHelpers.extends({},props,{style:baseStyle,ref:this._setScrollViewRef}),
contentContainer));


}
}
return(
React.createElement(ScrollViewClass,babelHelpers.extends({},props,{ref:this._setScrollViewRef}),
contentContainer));


}});


var styles=StyleSheet.create({
baseVertical:{
flexGrow:1,
flexShrink:1,
flexDirection:'column',
overflow:'scroll'},

baseHorizontal:{
flexGrow:1,
flexShrink:1,
flexDirection:'row',
overflow:'scroll'},

contentContainerHorizontal:{
flexDirection:'row'}});



var nativeOnlyProps=void 0,AndroidScrollView=void 0,AndroidHorizontalScrollView=void 0,RCTScrollView=void 0;
if(Platform.OS==='android'){
nativeOnlyProps={
nativeOnly:{
sendMomentumEvents:true}};


AndroidScrollView=requireNativeComponent('RCTScrollView',ScrollView,nativeOnlyProps);
AndroidHorizontalScrollView=requireNativeComponent(
'AndroidHorizontalScrollView',
ScrollView,
nativeOnlyProps);

}else if(Platform.OS==='ios'){
nativeOnlyProps={
nativeOnly:{
onMomentumScrollBegin:true,
onMomentumScrollEnd:true,
onScrollBeginDrag:true,
onScrollEndDrag:true}};


RCTScrollView=requireNativeComponent('RCTScrollView',ScrollView,nativeOnlyProps);
}

module.exports=ScrollView;
}, 211, null, "ScrollView");
__d(/* PointPropType */function(global, require, module, exports) {










'use strict';

var PropTypes=require(78 /* React */).PropTypes;

var createStrictShapeTypeChecker=require(122 /* createStrictShapeTypeChecker */);

var PointPropType=createStrictShapeTypeChecker({
x:PropTypes.number,
y:PropTypes.number});


module.exports=PointPropType;
}, 212, null, "PointPropType");
__d(/* ReactNative */function(global, require, module, exports) {










'use strict';



var ReactNativeComponentTree=require(132 /* ReactNativeComponentTree */);
var ReactNativeDefaultInjection=require(214 /* ReactNativeDefaultInjection */);

var ReactNativeMount=require(236 /* ReactNativeMount */);
var ReactUpdates=require(142 /* ReactUpdates */);

var findNodeHandle=require(76 /* findNodeHandle */);

ReactNativeDefaultInjection.inject();

var render=function render(
element,
mountInto,
callback)
{
return ReactNativeMount.renderComponent(element,mountInto,callback);
};

var ReactNative={
hasReactNativeInitialized:false,
findNodeHandle:findNodeHandle,
render:render,
unmountComponentAtNode:ReactNativeMount.unmountComponentAtNode,


unstable_batchedUpdates:ReactUpdates.batchedUpdates,


unmountComponentAtNodeAndRemoveContainer:ReactNativeMount.unmountComponentAtNodeAndRemoveContainer};





if(
typeof __REACT_DEVTOOLS_GLOBAL_HOOK__!=='undefined'&&
typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject==='function'){
__REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
ComponentTree:{
getClosestInstanceFromNode:function getClosestInstanceFromNode(node){
return ReactNativeComponentTree.getClosestInstanceFromNode(node);
},
getNodeFromInstance:function getNodeFromInstance(inst){

while(inst._renderedComponent){
inst=inst._renderedComponent;
}
if(inst){
return ReactNativeComponentTree.getNodeFromInstance(inst);
}else{
return null;
}
}},

Mount:ReactNativeMount,
Reconciler:require(146 /* ReactReconciler */)});

}

module.exports=ReactNative;
}, 213, null, "ReactNative");
__d(/* ReactNativeDefaultInjection */function(global, require, module, exports) {










'use strict';







require(215 /* InitializeCore */);

var EventPluginHub=require(134 /* EventPluginHub */);
var EventPluginUtils=require(136 /* EventPluginUtils */);
var RCTEventEmitter=require(245 /* RCTEventEmitter */);
var React=require(78 /* React */);
var ReactComponentEnvironment=require(152 /* ReactComponentEnvironment */);
var ReactDefaultBatchingStrategy=require(246 /* ReactDefaultBatchingStrategy */);
var ReactEmptyComponent=require(162 /* ReactEmptyComponent */);
var ReactNativeBridgeEventPlugin=require(247 /* ReactNativeBridgeEventPlugin */);
var ReactHostComponent=require(163 /* ReactHostComponent */);
var ReactNativeComponentEnvironment=require(250 /* ReactNativeComponentEnvironment */);
var ReactNativeComponentTree=require(132 /* ReactNativeComponentTree */);
var ReactNativeEventEmitter=require(133 /* ReactNativeEventEmitter */);
var ReactNativeEventPluginOrder=require(253 /* ReactNativeEventPluginOrder */);
var ReactNativeGlobalResponderHandler=require(254 /* ReactNativeGlobalResponderHandler */);
var ReactNativeTextComponent=require(255 /* ReactNativeTextComponent */);
var ReactNativeTreeTraversal=require(256 /* ReactNativeTreeTraversal */);
var ReactSimpleEmptyComponent=require(257 /* ReactSimpleEmptyComponent */);
var ReactUpdates=require(142 /* ReactUpdates */);
var ResponderEventPlugin=require(258 /* ResponderEventPlugin */);

var invariant=require(26 /* fbjs/lib/invariant */);

function inject(){



RCTEventEmitter.register(ReactNativeEventEmitter);




EventPluginHub.injection.injectEventPluginOrder(ReactNativeEventPluginOrder);
EventPluginUtils.injection.injectComponentTree(ReactNativeComponentTree);
EventPluginUtils.injection.injectTreeTraversal(ReactNativeTreeTraversal);

ResponderEventPlugin.injection.injectGlobalResponderHandler(
ReactNativeGlobalResponderHandler);






EventPluginHub.injection.injectEventPluginsByName({
'ResponderEventPlugin':ResponderEventPlugin,
'ReactNativeBridgeEventPlugin':ReactNativeBridgeEventPlugin});


ReactUpdates.injection.injectReconcileTransaction(
ReactNativeComponentEnvironment.ReactReconcileTransaction);


ReactUpdates.injection.injectBatchingStrategy(
ReactDefaultBatchingStrategy);


ReactComponentEnvironment.injection.injectEnvironment(
ReactNativeComponentEnvironment);


var EmptyComponent=function EmptyComponent(instantiate){

var View=require(120 /* View */);
return new ReactSimpleEmptyComponent(
React.createElement(View,{
collapsable:true,
style:{position:'absolute'}}),

instantiate);

};

ReactEmptyComponent.injection.injectEmptyComponentFactory(EmptyComponent);

ReactHostComponent.injection.injectTextComponentClass(
ReactNativeTextComponent);

ReactHostComponent.injection.injectGenericComponentClass(function(tag){

var info='';
if(typeof tag==='string'&&/^[a-z]/.test(tag)){
info+=' Each component name should start with an uppercase letter.';
}
invariant(false,'Expected a component class, got %s.%s',tag,info);
});
}

module.exports={
inject:inject};
}, 214, null, "ReactNativeDefaultInjection");
__d(/* InitializeCore */function(global, require, module, exports) {




























'use strict';

if(global.GLOBAL===undefined){
global.GLOBAL=global;
}

if(global.window===undefined){
global.window=global;
}

var defineLazyObjectProperty=require(74 /* defineLazyObjectProperty */);














function defineProperty(
object,
name,
getValue,
eager)
{
var descriptor=Object.getOwnPropertyDescriptor(object,name);
if(descriptor){
var backupName='original'+name[0].toUpperCase()+name.substr(1);
Object.defineProperty(object,backupName,babelHelpers.extends({},
descriptor,{
value:object[name]}));

}var _ref=

descriptor||{},enumerable=_ref.enumerable,writable=_ref.writable,configurable=_ref.configurable;
if(descriptor&&!configurable){
console.error('Failed to set polyfill. '+name+' is not configurable.');
return;
}

if(eager===true){
Object.defineProperty(object,name,{
configurable:true,
enumerable:enumerable!==false,
writable:writable!==false,
value:getValue()});

}else{
defineLazyObjectProperty(object,name,{
get:getValue,
enumerable:enumerable!==false,
writable:writable!==false});

}
}


global.process=global.process||{};
global.process.env=global.process.env||{};
if(!global.process.env.NODE_ENV){
global.process.env.NODE_ENV=__DEV__?'development':'production';
}


var Systrace=require(34 /* Systrace */);
Systrace.setEnabled(global.__RCTProfileIsProfiling||false);


var ExceptionsManager=require(216 /* ExceptionsManager */);
ExceptionsManager.installConsoleErrorReporter();


require(221 /* RCTLog */);


if(!global.__fbDisableExceptionsManager){
var handleError=function handleError(e,isFatal){
try{
ExceptionsManager.handleException(e,isFatal);
}catch(ee){

console.log('Failed to print error: ',ee.message);

throw e;
}
};

var ErrorUtils=require(32 /* ErrorUtils */);
ErrorUtils.setGlobalHandler(handleError);
}


var defineLazyTimer=function defineLazyTimer(name){
defineProperty(global,name,function(){return require(45 /* JSTimers */)[name];});
};
defineLazyTimer('setTimeout');
defineLazyTimer('setInterval');
defineLazyTimer('setImmediate');
defineLazyTimer('clearTimeout');
defineLazyTimer('clearInterval');
defineLazyTimer('clearImmediate');
defineLazyTimer('requestAnimationFrame');
defineLazyTimer('cancelAnimationFrame');
defineLazyTimer('requestIdleCallback');
defineLazyTimer('cancelIdleCallback');


if(!global.alert){
global.alert=function(text){


require(222 /* Alert */).alert('Alert',''+text);
};
}




defineProperty(global,'Promise',function(){return require(224 /* Promise */);});


defineProperty(global,'regeneratorRuntime',function(){


delete global.regeneratorRuntime;
require(230 /* regenerator-runtime/runtime */);
return global.regeneratorRuntime;
});




defineProperty(global,'XMLHttpRequest',function(){return require(231 /* XMLHttpRequest */);});
defineProperty(global,'FormData',function(){return require(233 /* FormData */);});

defineProperty(global,'fetch',function(){return require(219 /* fetch */).fetch;});
defineProperty(global,'Headers',function(){return require(219 /* fetch */).Headers;});
defineProperty(global,'Request',function(){return require(219 /* fetch */).Request;});
defineProperty(global,'Response',function(){return require(219 /* fetch */).Response;});
defineProperty(global,'WebSocket',function(){return require(54 /* WebSocket */);});


var navigator=global.navigator;
if(navigator===undefined){
global.navigator=navigator={};
}


defineProperty(navigator,'product',function(){return'ReactNative';},true);
defineProperty(navigator,'geolocation',function(){return require(234 /* Geolocation */);});




defineProperty(global,'Map',function(){return require(195 /* Map */);},true);
defineProperty(global,'Set',function(){return require(194 /* Set */);},true);


if(__DEV__){


if(!window.document){
var setupDevtools=require(235 /* setupDevtools */);
setupDevtools();
}

require(239 /* RCTDebugComponentOwnership */);
}


if(__DEV__){
var JSInspector=require(240 /* JSInspector */);
JSInspector.registerAgent(require(241 /* NetworkAgent */));
}



require(60 /* RCTDeviceEventEmitter */);
require(243 /* RCTNativeAppEventEmitter */);
require(244 /* PerformanceLogger */);
}, 215, null, "InitializeCore");
__d(/* ExceptionsManager */function(global, require, module, exports) {










'use strict';




var exceptionID=0;
function reportException(e,isFatal){var _require=
require(29 /* NativeModules */),ExceptionsManager=_require.ExceptionsManager;
if(ExceptionsManager){(function(){
var parseErrorStack=require(46 /* parseErrorStack */);
var stack=parseErrorStack(e);
var currentExceptionID=++exceptionID;
if(isFatal){
ExceptionsManager.reportFatalException(e.message,stack,currentExceptionID);
}else{
ExceptionsManager.reportSoftException(e.message,stack,currentExceptionID);
}
if(__DEV__){
var symbolicateStackTrace=require(217 /* symbolicateStackTrace */);
symbolicateStackTrace(stack).then(
function(prettyStack){
if(prettyStack){
ExceptionsManager.updateExceptionMessage(e.message,prettyStack,currentExceptionID);
}else{
throw new Error('The stack is null');
}
}).
catch(
function(error){return console.warn('Unable to symbolicate stack trace: '+error.message);});

}})();
}
}









function handleException(e,isFatal){




if(!e.message){
e=new Error(e);
}
if(console._errorOriginal){
console._errorOriginal(e.message);
}else{
console.error(e.message);
}
reportException(e,isFatal);
}

function reactConsoleErrorHandler(){
console._errorOriginal.apply(console,arguments);
if(!console.reportErrorsAsExceptions){
return;
}

if(arguments[0]&&arguments[0].stack){
reportException(arguments[0],false);
}else{
var stringifySafe=require(50 /* stringifySafe */);
var str=Array.prototype.map.call(arguments,stringifySafe).join(', ');
if(str.slice(0,10)==='"Warning: '){



return;
}
var error=new Error('console.error: '+str);
error.framesToPop=1;
reportException(error,false);
}
}





function installConsoleErrorReporter(){

if(console._errorOriginal){
return;
}

console._errorOriginal=console.error.bind(console);
console.error=reactConsoleErrorHandler;
if(console.reportErrorsAsExceptions===undefined){


console.reportErrorsAsExceptions=true;
}
}

module.exports={handleException:handleException,installConsoleErrorReporter:installConsoleErrorReporter};
}, 216, null, "ExceptionsManager");
__d(/* symbolicateStackTrace */function(global, require, module, exports) {










'use strict';

var getDevServer=require(218 /* getDevServer */);var _require=

require(29 /* NativeModules */),SourceCode=_require.SourceCode;


var fetch=void 0;



function isSourcedFromDisk(sourcePath){
return!/^http/.test(sourcePath)&&/[\\/]/.test(sourcePath);
}

function symbolicateStackTrace(stack){var devServer,stackCopy,response,json;return regeneratorRuntime.async(function symbolicateStackTrace$(_context){while(1){switch(_context.prev=_context.next){case 0:











if(!fetch){
fetch=global.fetch||require(219 /* fetch */).fetch;
}

devServer=getDevServer();if(
devServer.bundleLoadedFromServer){_context.next=4;break;}throw(
new Error('Bundle was not loaded from the packager'));case 4:


stackCopy=stack;

if(SourceCode.scriptURL){(function(){
var foundInternalSource=false;
stackCopy=stack.map(function(frame){




if(!foundInternalSource&&isSourcedFromDisk(frame.file)){

return babelHelpers.extends({},frame,{file:SourceCode.scriptURL});
}

foundInternalSource=true;
return frame;
});})();
}_context.next=8;return regeneratorRuntime.awrap(

fetch(devServer.url+'symbolicate',{
method:'POST',
body:JSON.stringify({stack:stackCopy})}));case 8:response=_context.sent;_context.next=11;return regeneratorRuntime.awrap(

response.json());case 11:json=_context.sent;return _context.abrupt('return',
json.stack);case 13:case'end':return _context.stop();}}},null,this);}


module.exports=symbolicateStackTrace;
}, 217, null, "symbolicateStackTrace");
__d(/* getDevServer */function(global, require, module, exports) {










'use strict';var _require=

require(29 /* NativeModules */),SourceCode=_require.SourceCode;

var _cachedDevServerURL=void 0;
var FALLBACK='http://localhost:8081/';










function getDevServer(){
if(_cachedDevServerURL===undefined){
var match=SourceCode.scriptURL&&SourceCode.scriptURL.match(/^https?:\/\/.*?\//);
_cachedDevServerURL=match?match[0]:null;
}

return{
url:_cachedDevServerURL||FALLBACK,
bundleLoadedFromServer:_cachedDevServerURL!==null};

}

module.exports=getDevServer;
}, 218, null, "getDevServer");
__d(/* fetch */function(global, require, module, exports) {











'use strict';

require(220 /* whatwg-fetch */);

module.exports={fetch:fetch,Headers:Headers,Request:Request,Response:Response};
}, 219, null, "fetch");
__d(/* whatwg-fetch/fetch.js */function(global, require, module, exports) {(function(self){
'use strict';

if(self.fetch){
return;
}

var support={
searchParams:'URLSearchParams'in self,
iterable:'Symbol'in self&&'iterator'in Symbol,
blob:'FileReader'in self&&'Blob'in self&&function(){
try{
new Blob();
return true;
}catch(e){
return false;
}
}(),
formData:'FormData'in self,
arrayBuffer:'ArrayBuffer'in self};


if(support.arrayBuffer){
var viewClasses=[
'[object Int8Array]',
'[object Uint8Array]',
'[object Uint8ClampedArray]',
'[object Int16Array]',
'[object Uint16Array]',
'[object Int32Array]',
'[object Uint32Array]',
'[object Float32Array]',
'[object Float64Array]'];


var isDataView=function isDataView(obj){
return obj&&DataView.prototype.isPrototypeOf(obj);
};

var isArrayBufferView=ArrayBuffer.isView||function(obj){
return obj&&viewClasses.indexOf(Object.prototype.toString.call(obj))>-1;
};
}

function normalizeName(name){
if(typeof name!=='string'){
name=String(name);
}
if(/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)){
throw new TypeError('Invalid character in header field name');
}
return name.toLowerCase();
}

function normalizeValue(value){
if(typeof value!=='string'){
value=String(value);
}
return value;
}


function iteratorFor(items){
var iterator={
next:function next(){
var value=items.shift();
return{done:value===undefined,value:value};
}};


if(support.iterable){
iterator[typeof Symbol==='function'?Symbol.iterator:'@@iterator']=function(){
return iterator;
};
}

return iterator;
}

function Headers(headers){
this.map={};

if(headers instanceof Headers){
headers.forEach(function(value,name){
this.append(name,value);
},this);

}else if(headers){
Object.getOwnPropertyNames(headers).forEach(function(name){
this.append(name,headers[name]);
},this);
}
}

Headers.prototype.append=function(name,value){
name=normalizeName(name);
value=normalizeValue(value);
var list=this.map[name];
if(!list){
list=[];
this.map[name]=list;
}
list.push(value);
};

Headers.prototype['delete']=function(name){
delete this.map[normalizeName(name)];
};

Headers.prototype.get=function(name){
var values=this.map[normalizeName(name)];
return values?values[0]:null;
};

Headers.prototype.getAll=function(name){
return this.map[normalizeName(name)]||[];
};

Headers.prototype.has=function(name){
return this.map.hasOwnProperty(normalizeName(name));
};

Headers.prototype.set=function(name,value){
this.map[normalizeName(name)]=[normalizeValue(value)];
};

Headers.prototype.forEach=function(callback,thisArg){
Object.getOwnPropertyNames(this.map).forEach(function(name){
this.map[name].forEach(function(value){
callback.call(thisArg,value,name,this);
},this);
},this);
};

Headers.prototype.keys=function(){
var items=[];
this.forEach(function(value,name){items.push(name);});
return iteratorFor(items);
};

Headers.prototype.values=function(){
var items=[];
this.forEach(function(value){items.push(value);});
return iteratorFor(items);
};

Headers.prototype.entries=function(){
var items=[];
this.forEach(function(value,name){items.push([name,value]);});
return iteratorFor(items);
};

if(support.iterable){
Headers.prototype[typeof Symbol==='function'?Symbol.iterator:'@@iterator']=Headers.prototype.entries;
}

function consumed(body){
if(body.bodyUsed){
return Promise.reject(new TypeError('Already read'));
}
body.bodyUsed=true;
}

function fileReaderReady(reader){
return new Promise(function(resolve,reject){
reader.onload=function(){
resolve(reader.result);
};
reader.onerror=function(){
reject(reader.error);
};
});
}

function readBlobAsArrayBuffer(blob){
var reader=new FileReader();
var promise=fileReaderReady(reader);
reader.readAsArrayBuffer(blob);
return promise;
}

function readBlobAsText(blob){
var reader=new FileReader();
var promise=fileReaderReady(reader);
reader.readAsText(blob);
return promise;
}

function readArrayBufferAsText(buf){
var view=new Uint8Array(buf);
var chars=new Array(view.length);

for(var i=0;i<view.length;i++){
chars[i]=String.fromCharCode(view[i]);
}
return chars.join('');
}

function bufferClone(buf){
if(buf.slice){
return buf.slice(0);
}else{
var view=new Uint8Array(buf.byteLength);
view.set(new Uint8Array(buf));
return view.buffer;
}
}

function Body(){
this.bodyUsed=false;

this._initBody=function(body){
this._bodyInit=body;
if(!body){
this._bodyText='';
}else if(typeof body==='string'){
this._bodyText=body;
}else if(support.blob&&Blob.prototype.isPrototypeOf(body)){
this._bodyBlob=body;
}else if(support.formData&&FormData.prototype.isPrototypeOf(body)){
this._bodyFormData=body;
}else if(support.searchParams&&URLSearchParams.prototype.isPrototypeOf(body)){
this._bodyText=body.toString();
}else if(support.arrayBuffer&&support.blob&&isDataView(body)){
this._bodyArrayBuffer=bufferClone(body.buffer);

this._bodyInit=new Blob([this._bodyArrayBuffer]);
}else if(support.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(body)||isArrayBufferView(body))){
this._bodyArrayBuffer=bufferClone(body);
}else{
throw new Error('unsupported BodyInit type');
}

if(!this.headers.get('content-type')){
if(typeof body==='string'){
this.headers.set('content-type','text/plain;charset=UTF-8');
}else if(this._bodyBlob&&this._bodyBlob.type){
this.headers.set('content-type',this._bodyBlob.type);
}else if(support.searchParams&&URLSearchParams.prototype.isPrototypeOf(body)){
this.headers.set('content-type','application/x-www-form-urlencoded;charset=UTF-8');
}
}
};

if(support.blob){
this.blob=function(){
var rejected=consumed(this);
if(rejected){
return rejected;
}

if(this._bodyBlob){
return Promise.resolve(this._bodyBlob);
}else if(this._bodyArrayBuffer){
return Promise.resolve(new Blob([this._bodyArrayBuffer]));
}else if(this._bodyFormData){
throw new Error('could not read FormData body as blob');
}else{
return Promise.resolve(new Blob([this._bodyText]));
}
};

this.arrayBuffer=function(){
if(this._bodyArrayBuffer){
return consumed(this)||Promise.resolve(this._bodyArrayBuffer);
}else{
return this.blob().then(readBlobAsArrayBuffer);
}
};
}

this.text=function(){
var rejected=consumed(this);
if(rejected){
return rejected;
}

if(this._bodyBlob){
return readBlobAsText(this._bodyBlob);
}else if(this._bodyArrayBuffer){
return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
}else if(this._bodyFormData){
throw new Error('could not read FormData body as text');
}else{
return Promise.resolve(this._bodyText);
}
};

if(support.formData){
this.formData=function(){
return this.text().then(decode);
};
}

this.json=function(){
return this.text().then(JSON.parse);
};

return this;
}


var methods=['DELETE','GET','HEAD','OPTIONS','POST','PUT'];

function normalizeMethod(method){
var upcased=method.toUpperCase();
return methods.indexOf(upcased)>-1?upcased:method;
}

function Request(input,options){
options=options||{};
var body=options.body;

if(typeof input==='string'){
this.url=input;
}else{
if(input.bodyUsed){
throw new TypeError('Already read');
}
this.url=input.url;
this.credentials=input.credentials;
if(!options.headers){
this.headers=new Headers(input.headers);
}
this.method=input.method;
this.mode=input.mode;
if(!body&&input._bodyInit!=null){
body=input._bodyInit;
input.bodyUsed=true;
}
}

this.credentials=options.credentials||this.credentials||'omit';
if(options.headers||!this.headers){
this.headers=new Headers(options.headers);
}
this.method=normalizeMethod(options.method||this.method||'GET');
this.mode=options.mode||this.mode||null;
this.referrer=null;

if((this.method==='GET'||this.method==='HEAD')&&body){
throw new TypeError('Body not allowed for GET or HEAD requests');
}
this._initBody(body);
}

Request.prototype.clone=function(){
return new Request(this,{body:this._bodyInit});
};

function decode(body){
var form=new FormData();
body.trim().split('&').forEach(function(bytes){
if(bytes){
var split=bytes.split('=');
var name=split.shift().replace(/\+/g,' ');
var value=split.join('=').replace(/\+/g,' ');
form.append(decodeURIComponent(name),decodeURIComponent(value));
}
});
return form;
}

function parseHeaders(rawHeaders){
var headers=new Headers();
rawHeaders.split('\r\n').forEach(function(line){
var parts=line.split(':');
var key=parts.shift().trim();
if(key){
var value=parts.join(':').trim();
headers.append(key,value);
}
});
return headers;
}

Body.call(Request.prototype);

function Response(bodyInit,options){
if(!options){
options={};
}

this.type='default';
this.status='status'in options?options.status:200;
this.ok=this.status>=200&&this.status<300;
this.statusText='statusText'in options?options.statusText:'OK';
this.headers=new Headers(options.headers);
this.url=options.url||'';
this._initBody(bodyInit);
}

Body.call(Response.prototype);

Response.prototype.clone=function(){
return new Response(this._bodyInit,{
status:this.status,
statusText:this.statusText,
headers:new Headers(this.headers),
url:this.url});

};

Response.error=function(){
var response=new Response(null,{status:0,statusText:''});
response.type='error';
return response;
};

var redirectStatuses=[301,302,303,307,308];

Response.redirect=function(url,status){
if(redirectStatuses.indexOf(status)===-1){
throw new RangeError('Invalid status code');
}

return new Response(null,{status:status,headers:{location:url}});
};

self.Headers=Headers;
self.Request=Request;
self.Response=Response;

self.fetch=function(input,init){
return new Promise(function(resolve,reject){
var request=new Request(input,init);
var xhr=new XMLHttpRequest();

xhr.onload=function(){
var options={
status:xhr.status,
statusText:xhr.statusText,
headers:parseHeaders(xhr.getAllResponseHeaders()||'')};

options.url='responseURL'in xhr?xhr.responseURL:options.headers.get('X-Request-URL');
var body='response'in xhr?xhr.response:xhr.responseText;
resolve(new Response(body,options));
};

xhr.onerror=function(){
reject(new TypeError('Network request failed'));
};

xhr.ontimeout=function(){
reject(new TypeError('Network request failed'));
};

xhr.open(request.method,request.url,true);

if(request.credentials==='include'){
xhr.withCredentials=true;
}

if('responseType'in xhr&&support.blob){
xhr.responseType='blob';
}

request.headers.forEach(function(value,name){
xhr.setRequestHeader(name,value);
});

xhr.send(typeof request._bodyInit==='undefined'?null:request._bodyInit);
});
};
self.fetch.polyfill=true;
})(typeof self!=='undefined'?self:this);
}, 220, null, "whatwg-fetch/fetch.js");
__d(/* RCTLog */function(global, require, module, exports) {










'use strict';

var BatchedBridge=require(30 /* BatchedBridge */);

var invariant=require(26 /* fbjs/lib/invariant */);

var levelsMap={
log:'log',
info:'info',
warn:'warn',
error:'error',
fatal:'error'};var


RCTLog=function(){function RCTLog(){babelHelpers.classCallCheck(this,RCTLog);}babelHelpers.createClass(RCTLog,null,[{key:'logIfNoNativeHook',value:function logIfNoNativeHook()

{
var args=Array.prototype.slice.call(arguments);
var level=args.shift();
var logFn=levelsMap[level];
invariant(
logFn,
'Level "'+level+'" not one of '+Object.keys(levelsMap));

if(typeof global.nativeLoggingHook==='undefined'){

console[logFn].apply(console,args);
}
return true;
}}]);return RCTLog;}();


BatchedBridge.registerCallableModule(
'RCTLog',
RCTLog);


module.exports=RCTLog;
}, 221, null, "RCTLog");
__d(/* Alert */function(global, require, module, exports) {










'use strict';

var AlertIOS=require(223 /* AlertIOS */);
var Platform=require(28 /* Platform */);
var DialogModuleAndroid=require(29 /* NativeModules */).DialogManagerAndroid;var



















































Alert=function(){function Alert(){babelHelpers.classCallCheck(this,Alert);}babelHelpers.createClass(Alert,null,[{key:'alert',value:function alert(


title,
message,
buttons,
options,
type)
{
if(Platform.OS==='ios'){
if(typeof type!=='undefined'){
console.warn('Alert.alert() with a 5th "type" parameter is deprecated and will be removed. Use AlertIOS.prompt() instead.');
AlertIOS.alert(title,message,buttons,type);
return;
}
AlertIOS.alert(title,message,buttons);
}else if(Platform.OS==='android'){
AlertAndroid.alert(title,message,buttons,options);
}
}}]);return Alert;}();var





AlertAndroid=function(){function AlertAndroid(){babelHelpers.classCallCheck(this,AlertAndroid);}babelHelpers.createClass(AlertAndroid,null,[{key:'alert',value:function alert(


title,
message,
buttons,
options)
{
var config={
title:title||'',
message:message||''};


if(options){
config=babelHelpers.extends({},config,{cancelable:options.cancelable});
}


var validButtons=buttons?buttons.slice(0,3):[{text:'OK'}];
var buttonPositive=validButtons.pop();
var buttonNegative=validButtons.pop();
var buttonNeutral=validButtons.pop();
if(buttonNeutral){
config=babelHelpers.extends({},config,{buttonNeutral:buttonNeutral.text||''});
}
if(buttonNegative){
config=babelHelpers.extends({},config,{buttonNegative:buttonNegative.text||''});
}
if(buttonPositive){
config=babelHelpers.extends({},config,{buttonPositive:buttonPositive.text||''});
}
DialogModuleAndroid.showAlert(
config,
function(errorMessage){return console.warn(errorMessage);},
function(action,buttonKey){
if(action!==DialogModuleAndroid.buttonClicked){
return;
}
if(buttonKey===DialogModuleAndroid.buttonNeutral){
buttonNeutral.onPress&&buttonNeutral.onPress();
}else if(buttonKey===DialogModuleAndroid.buttonNegative){
buttonNegative.onPress&&buttonNegative.onPress();
}else if(buttonKey===DialogModuleAndroid.buttonPositive){
buttonPositive.onPress&&buttonPositive.onPress();
}
});

}}]);return AlertAndroid;}();


module.exports=Alert;
}, 222, null, "Alert");
__d(/* AlertIOS */function(global, require, module, exports) {











'use strict';

var RCTAlertManager=require(29 /* NativeModules */).AlertManager;var



























































































AlertIOS=function(){function AlertIOS(){babelHelpers.classCallCheck(this,AlertIOS);}babelHelpers.createClass(AlertIOS,null,[{key:'alert',value:function alert(




























title,
message,
callbackOrButtons,
type)
{
if(typeof type!=='undefined'){
console.warn('AlertIOS.alert() with a 4th "type" parameter is deprecated and will be removed. Use AlertIOS.prompt() instead.');
this.prompt(title,message,callbackOrButtons,type);
return;
}
this.prompt(title,message,callbackOrButtons,'default');
}},{key:'prompt',value:function prompt(











































title,
message,
callbackOrButtons)


{var type=arguments.length>3&&arguments[3]!==undefined?arguments[3]:'plain-text';var defaultValue=arguments[4];
if(typeof type==='function'){
console.warn(
'You passed a callback function as the "type" argument to AlertIOS.prompt(). React Native is '+
'assuming  you want to use the deprecated AlertIOS.prompt(title, defaultValue, buttons, callback) '+
'signature. The current signature is AlertIOS.prompt(title, message, callbackOrButtons, type, defaultValue) '+
'and the old syntax will be removed in a future version.');

var callback=type;
var defaultValue=message;
RCTAlertManager.alertWithArgs({
title:title||undefined,
type:'plain-text',
defaultValue:defaultValue},
function(id,value){
callback(value);
});
return;
}

var callbacks=[];
var buttons=[];
var cancelButtonKey;
var destructiveButtonKey;
if(typeof callbackOrButtons==='function'){
callbacks=[callbackOrButtons];
}else
if(callbackOrButtons instanceof Array){
callbackOrButtons.forEach(function(btn,index){
callbacks[index]=btn.onPress;
if(btn.style==='cancel'){
cancelButtonKey=String(index);
}else if(btn.style==='destructive'){
destructiveButtonKey=String(index);
}
if(btn.text||index<(callbackOrButtons||[]).length-1){
var btnDef={};
btnDef[index]=btn.text||'';
buttons.push(btnDef);
}
});
}

RCTAlertManager.alertWithArgs({
title:title||undefined,
message:message||undefined,
buttons:buttons,
type:type||undefined,
defaultValue:defaultValue,
cancelButtonKey:cancelButtonKey,
destructiveButtonKey:destructiveButtonKey},
function(id,value){
var cb=callbacks[id];
cb&&cb(value);
});
}}]);return AlertIOS;}();


module.exports=AlertIOS;
}, 223, null, "AlertIOS");
__d(/* Promise */function(global, require, module, exports) {










'use strict';

var Promise=require(225 /* fbjs/lib/Promise.native */);

if(__DEV__){
require(229 /* promise/setimmediate/rejection-tracking */).enable({
allRejections:true,
onUnhandled:function onUnhandled(id){var error=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var _error$message=
error.message,message=_error$message===undefined?null:_error$message,_error$stack=error.stack,stack=_error$stack===undefined?null:_error$stack;
var warning=
'Possible Unhandled Promise Rejection (id: '+id+'):\n'+(
message==null?'':message+'\n')+(
stack==null?'':stack);
console.warn(warning);
},
onHandled:function onHandled(id){
var warning=
'Promise Rejection Handled (id: '+id+')\n'+
'This means you can ignore any previous messages of the form '+('"Possible Unhandled Promise Rejection (id: '+
id+'):"');
console.warn(warning);
}});

}

module.exports=Promise;
}, 224, null, "Promise");
__d(/* fbjs/lib/Promise.native.js */function(global, require, module, exports) {












'use strict';

var Promise=require(226 /* promise/setimmediate/es6-extensions */);
require(228 /* promise/setimmediate/done */);




Promise.prototype['finally']=function(onSettled){
return this.then(onSettled,onSettled);
};

module.exports=Promise;
}, 225, null, "fbjs/lib/Promise.native.js");
__d(/* promise/setimmediate/es6-extensions.js */function(global, require, module, exports) {'use strict';



var Promise=require(227 /* ./core.js */);

module.exports=Promise;



var TRUE=valuePromise(true);
var FALSE=valuePromise(false);
var NULL=valuePromise(null);
var UNDEFINED=valuePromise(undefined);
var ZERO=valuePromise(0);
var EMPTYSTRING=valuePromise('');

function valuePromise(value){
var p=new Promise(Promise._61);
p._81=1;
p._65=value;
return p;
}
Promise.resolve=function(value){
if(value instanceof Promise)return value;

if(value===null)return NULL;
if(value===undefined)return UNDEFINED;
if(value===true)return TRUE;
if(value===false)return FALSE;
if(value===0)return ZERO;
if(value==='')return EMPTYSTRING;

if(typeof value==='object'||typeof value==='function'){
try{
var then=value.then;
if(typeof then==='function'){
return new Promise(then.bind(value));
}
}catch(ex){
return new Promise(function(resolve,reject){
reject(ex);
});
}
}
return valuePromise(value);
};

Promise.all=function(arr){
var args=Array.prototype.slice.call(arr);

return new Promise(function(resolve,reject){
if(args.length===0)return resolve([]);
var remaining=args.length;
function res(i,val){
if(val&&(typeof val==='object'||typeof val==='function')){
if(val instanceof Promise&&val.then===Promise.prototype.then){
while(val._81===3){
val=val._65;
}
if(val._81===1)return res(i,val._65);
if(val._81===2)reject(val._65);
val.then(function(val){
res(i,val);
},reject);
return;
}else{
var then=val.then;
if(typeof then==='function'){
var p=new Promise(then.bind(val));
p.then(function(val){
res(i,val);
},reject);
return;
}
}
}
args[i]=val;
if(--remaining===0){
resolve(args);
}
}
for(var i=0;i<args.length;i++){
res(i,args[i]);
}
});
};

Promise.reject=function(value){
return new Promise(function(resolve,reject){
reject(value);
});
};

Promise.race=function(values){
return new Promise(function(resolve,reject){
values.forEach(function(value){
Promise.resolve(value).then(resolve,reject);
});
});
};



Promise.prototype['catch']=function(onRejected){
return this.then(null,onRejected);
};
}, 226, null, "promise/setimmediate/es6-extensions.js");
__d(/* promise/setimmediate/core.js */function(global, require, module, exports) {'use strict';



function noop(){}


















var LAST_ERROR=null;
var IS_ERROR={};
function getThen(obj){
try{
return obj.then;
}catch(ex){
LAST_ERROR=ex;
return IS_ERROR;
}
}

function tryCallOne(fn,a){
try{
return fn(a);
}catch(ex){
LAST_ERROR=ex;
return IS_ERROR;
}
}
function tryCallTwo(fn,a,b){
try{
fn(a,b);
}catch(ex){
LAST_ERROR=ex;
return IS_ERROR;
}
}

module.exports=Promise;

function Promise(fn){
if(typeof this!=='object'){
throw new TypeError('Promises must be constructed via new');
}
if(typeof fn!=='function'){
throw new TypeError('not a function');
}
this._45=0;
this._81=0;
this._65=null;
this._54=null;
if(fn===noop)return;
doResolve(fn,this);
}
Promise._10=null;
Promise._97=null;
Promise._61=noop;

Promise.prototype.then=function(onFulfilled,onRejected){
if(this.constructor!==Promise){
return safeThen(this,onFulfilled,onRejected);
}
var res=new Promise(noop);
handle(this,new Handler(onFulfilled,onRejected,res));
return res;
};

function safeThen(self,onFulfilled,onRejected){
return new self.constructor(function(resolve,reject){
var res=new Promise(noop);
res.then(resolve,reject);
handle(self,new Handler(onFulfilled,onRejected,res));
});
};
function handle(self,deferred){
while(self._81===3){
self=self._65;
}
if(Promise._10){
Promise._10(self);
}
if(self._81===0){
if(self._45===0){
self._45=1;
self._54=deferred;
return;
}
if(self._45===1){
self._45=2;
self._54=[self._54,deferred];
return;
}
self._54.push(deferred);
return;
}
handleResolved(self,deferred);
}

function handleResolved(self,deferred){
setImmediate(function(){
var cb=self._81===1?deferred.onFulfilled:deferred.onRejected;
if(cb===null){
if(self._81===1){
resolve(deferred.promise,self._65);
}else{
reject(deferred.promise,self._65);
}
return;
}
var ret=tryCallOne(cb,self._65);
if(ret===IS_ERROR){
reject(deferred.promise,LAST_ERROR);
}else{
resolve(deferred.promise,ret);
}
});
}
function resolve(self,newValue){

if(newValue===self){
return reject(
self,
new TypeError('A promise cannot be resolved with itself.'));

}
if(
newValue&&(
typeof newValue==='object'||typeof newValue==='function'))
{
var then=getThen(newValue);
if(then===IS_ERROR){
return reject(self,LAST_ERROR);
}
if(
then===self.then&&
newValue instanceof Promise)
{
self._81=3;
self._65=newValue;
finale(self);
return;
}else if(typeof then==='function'){
doResolve(then.bind(newValue),self);
return;
}
}
self._81=1;
self._65=newValue;
finale(self);
}

function reject(self,newValue){
self._81=2;
self._65=newValue;
if(Promise._97){
Promise._97(self,newValue);
}
finale(self);
}
function finale(self){
if(self._45===1){
handle(self,self._54);
self._54=null;
}
if(self._45===2){
for(var i=0;i<self._54.length;i++){
handle(self,self._54[i]);
}
self._54=null;
}
}

function Handler(onFulfilled,onRejected,promise){
this.onFulfilled=typeof onFulfilled==='function'?onFulfilled:null;
this.onRejected=typeof onRejected==='function'?onRejected:null;
this.promise=promise;
}







function doResolve(fn,promise){
var done=false;
var res=tryCallTwo(fn,function(value){
if(done)return;
done=true;
resolve(promise,value);
},function(reason){
if(done)return;
done=true;
reject(promise,reason);
});
if(!done&&res===IS_ERROR){
done=true;
reject(promise,LAST_ERROR);
}
}
}, 227, null, "promise/setimmediate/core.js");
__d(/* promise/setimmediate/done.js */function(global, require, module, exports) {'use strict';

var Promise=require(227 /* ./core.js */);

module.exports=Promise;
Promise.prototype.done=function(onFulfilled,onRejected){
var self=arguments.length?this.then.apply(this,arguments):this;
self.then(null,function(err){
setTimeout(function(){
throw err;
},0);
});
};
}, 228, null, "promise/setimmediate/done.js");
__d(/* promise/setimmediate/rejection-tracking.js */function(global, require, module, exports) {'use strict';

var Promise=require(227 /* ./core */);

var DEFAULT_WHITELIST=[
ReferenceError,
TypeError,
RangeError];


var enabled=false;
exports.disable=disable;
function disable(){
enabled=false;
Promise._10=null;
Promise._97=null;
}

exports.enable=enable;
function enable(options){
options=options||{};
if(enabled)disable();
enabled=true;
var id=0;
var displayId=0;
var rejections={};
Promise._10=function(promise){
if(
promise._81===2&&
rejections[promise._72])
{
if(rejections[promise._72].logged){
onHandled(promise._72);
}else{
clearTimeout(rejections[promise._72].timeout);
}
delete rejections[promise._72];
}
};
Promise._97=function(promise,err){
if(promise._45===0){
promise._72=id++;
rejections[promise._72]={
displayId:null,
error:err,
timeout:setTimeout(
onUnhandled.bind(null,promise._72),




matchWhitelist(err,DEFAULT_WHITELIST)?
100:
2000),

logged:false};

}
};
function onUnhandled(id){
if(
options.allRejections||
matchWhitelist(
rejections[id].error,
options.whitelist||DEFAULT_WHITELIST))

{
rejections[id].displayId=displayId++;
if(options.onUnhandled){
rejections[id].logged=true;
options.onUnhandled(
rejections[id].displayId,
rejections[id].error);

}else{
rejections[id].logged=true;
logError(
rejections[id].displayId,
rejections[id].error);

}
}
}
function onHandled(id){
if(rejections[id].logged){
if(options.onHandled){
options.onHandled(rejections[id].displayId,rejections[id].error);
}else if(!rejections[id].onUnhandled){
console.warn(
'Promise Rejection Handled (id: '+rejections[id].displayId+'):');

console.warn(
'  This means you can ignore any previous messages of the form "Possible Unhandled Promise Rejection" with id '+
rejections[id].displayId+'.');

}
}
}
}

function logError(id,error){
console.warn('Possible Unhandled Promise Rejection (id: '+id+'):');
var errStr=(error&&(error.stack||error))+'';
errStr.split('\n').forEach(function(line){
console.warn('  '+line);
});
}

function matchWhitelist(error,list){
return list.some(function(cls){
return error instanceof cls;
});
}
}, 229, null, "promise/setimmediate/rejection-tracking.js");
__d(/* regenerator-runtime/runtime.js */function(global, require, module, exports) {









!function(global){
"use strict";

var hasOwn=Object.prototype.hasOwnProperty;
var undefined;
var $Symbol=typeof Symbol==="function"?Symbol:{};
var iteratorSymbol=$Symbol.iterator||"@@iterator";
var toStringTagSymbol=$Symbol.toStringTag||"@@toStringTag";

var inModule=typeof module==="object";
var runtime=global.regeneratorRuntime;
if(runtime){
if(inModule){


module.exports=runtime;
}


return;
}



runtime=global.regeneratorRuntime=inModule?module.exports:{};

function wrap(innerFn,outerFn,self,tryLocsList){

var protoGenerator=outerFn&&outerFn.prototype instanceof Generator?outerFn:Generator;
var generator=Object.create(protoGenerator.prototype);
var context=new Context(tryLocsList||[]);



generator._invoke=makeInvokeMethod(innerFn,self,context);

return generator;
}
runtime.wrap=wrap;











function tryCatch(fn,obj,arg){
try{
return{type:"normal",arg:fn.call(obj,arg)};
}catch(err){
return{type:"throw",arg:err};
}
}

var GenStateSuspendedStart="suspendedStart";
var GenStateSuspendedYield="suspendedYield";
var GenStateExecuting="executing";
var GenStateCompleted="completed";



var ContinueSentinel={};





function Generator(){}
function GeneratorFunction(){}
function GeneratorFunctionPrototype(){}

var Gp=GeneratorFunctionPrototype.prototype=Generator.prototype;
GeneratorFunction.prototype=Gp.constructor=GeneratorFunctionPrototype;
GeneratorFunctionPrototype.constructor=GeneratorFunction;
GeneratorFunctionPrototype[toStringTagSymbol]=GeneratorFunction.displayName="GeneratorFunction";



function defineIteratorMethods(prototype){
["next","throw","return"].forEach(function(method){
prototype[method]=function(arg){
return this._invoke(method,arg);
};
});
}

runtime.isGeneratorFunction=function(genFun){
var ctor=typeof genFun==="function"&&genFun.constructor;
return ctor?
ctor===GeneratorFunction||


(ctor.displayName||ctor.name)==="GeneratorFunction":
false;
};

runtime.mark=function(genFun){
if(Object.setPrototypeOf){
Object.setPrototypeOf(genFun,GeneratorFunctionPrototype);
}else{
genFun.__proto__=GeneratorFunctionPrototype;
if(!(toStringTagSymbol in genFun)){
genFun[toStringTagSymbol]="GeneratorFunction";
}
}
genFun.prototype=Object.create(Gp);
return genFun;
};






runtime.awrap=function(arg){
return new AwaitArgument(arg);
};

function AwaitArgument(arg){
this.arg=arg;
}

function AsyncIterator(generator){
function invoke(method,arg,resolve,reject){
var record=tryCatch(generator[method],generator,arg);
if(record.type==="throw"){
reject(record.arg);
}else{
var result=record.arg;
var value=result.value;
if(value instanceof AwaitArgument){
return Promise.resolve(value.arg).then(function(value){
invoke("next",value,resolve,reject);
},function(err){
invoke("throw",err,resolve,reject);
});
}

return Promise.resolve(value).then(function(unwrapped){















result.value=unwrapped;
resolve(result);
},reject);
}
}

if(typeof process==="object"&&process.domain){
invoke=process.domain.bind(invoke);
}

var previousPromise;

function enqueue(method,arg){
function callInvokeWithMethodAndArg(){
return new Promise(function(resolve,reject){
invoke(method,arg,resolve,reject);
});
}

return previousPromise=












previousPromise?previousPromise.then(
callInvokeWithMethodAndArg,


callInvokeWithMethodAndArg):
callInvokeWithMethodAndArg();
}



this._invoke=enqueue;
}

defineIteratorMethods(AsyncIterator.prototype);




runtime.async=function(innerFn,outerFn,self,tryLocsList){
var iter=new AsyncIterator(
wrap(innerFn,outerFn,self,tryLocsList));


return runtime.isGeneratorFunction(outerFn)?
iter:
iter.next().then(function(result){
return result.done?result.value:iter.next();
});
};

function makeInvokeMethod(innerFn,self,context){
var state=GenStateSuspendedStart;

return function invoke(method,arg){
if(state===GenStateExecuting){
throw new Error("Generator is already running");
}

if(state===GenStateCompleted){
if(method==="throw"){
throw arg;
}



return doneResult();
}

while(true){
var delegate=context.delegate;
if(delegate){
if(method==="return"||
method==="throw"&&delegate.iterator[method]===undefined){


context.delegate=null;



var returnMethod=delegate.iterator["return"];
if(returnMethod){
var record=tryCatch(returnMethod,delegate.iterator,arg);
if(record.type==="throw"){


method="throw";
arg=record.arg;
continue;
}
}

if(method==="return"){


continue;
}
}

var record=tryCatch(
delegate.iterator[method],
delegate.iterator,
arg);


if(record.type==="throw"){
context.delegate=null;



method="throw";
arg=record.arg;
continue;
}




method="next";
arg=undefined;

var info=record.arg;
if(info.done){
context[delegate.resultName]=info.value;
context.next=delegate.nextLoc;
}else{
state=GenStateSuspendedYield;
return info;
}

context.delegate=null;
}

if(method==="next"){


context.sent=context._sent=arg;

}else if(method==="throw"){
if(state===GenStateSuspendedStart){
state=GenStateCompleted;
throw arg;
}

if(context.dispatchException(arg)){


method="next";
arg=undefined;
}

}else if(method==="return"){
context.abrupt("return",arg);
}

state=GenStateExecuting;

var record=tryCatch(innerFn,self,context);
if(record.type==="normal"){


state=context.done?
GenStateCompleted:
GenStateSuspendedYield;

var info={
value:record.arg,
done:context.done};


if(record.arg===ContinueSentinel){
if(context.delegate&&method==="next"){


arg=undefined;
}
}else{
return info;
}

}else if(record.type==="throw"){
state=GenStateCompleted;


method="throw";
arg=record.arg;
}
}
};
}



defineIteratorMethods(Gp);

Gp[iteratorSymbol]=function(){
return this;
};

Gp[toStringTagSymbol]="Generator";

Gp.toString=function(){
return"[object Generator]";
};

function pushTryEntry(locs){
var entry={tryLoc:locs[0]};

if(1 in locs){
entry.catchLoc=locs[1];
}

if(2 in locs){
entry.finallyLoc=locs[2];
entry.afterLoc=locs[3];
}

this.tryEntries.push(entry);
}

function resetTryEntry(entry){
var record=entry.completion||{};
record.type="normal";
delete record.arg;
entry.completion=record;
}

function Context(tryLocsList){



this.tryEntries=[{tryLoc:"root"}];
tryLocsList.forEach(pushTryEntry,this);
this.reset(true);
}

runtime.keys=function(object){
var keys=[];
for(var key in object){
keys.push(key);
}
keys.reverse();



return function next(){
while(keys.length){
var key=keys.pop();
if(key in object){
next.value=key;
next.done=false;
return next;
}
}




next.done=true;
return next;
};
};

function values(iterable){
if(iterable){
var iteratorMethod=iterable[iteratorSymbol];
if(iteratorMethod){
return iteratorMethod.call(iterable);
}

if(typeof iterable.next==="function"){
return iterable;
}

if(!isNaN(iterable.length)){
var i=-1,next=function next(){
while(++i<iterable.length){
if(hasOwn.call(iterable,i)){
next.value=iterable[i];
next.done=false;
return next;
}
}

next.value=undefined;
next.done=true;

return next;
};

return next.next=next;
}
}


return{next:doneResult};
}
runtime.values=values;

function doneResult(){
return{value:undefined,done:true};
}

Context.prototype={
constructor:Context,

reset:function reset(skipTempReset){
this.prev=0;
this.next=0;


this.sent=this._sent=undefined;
this.done=false;
this.delegate=null;

this.tryEntries.forEach(resetTryEntry);

if(!skipTempReset){
for(var name in this){

if(name.charAt(0)==="t"&&
hasOwn.call(this,name)&&
!isNaN(+name.slice(1))){
this[name]=undefined;
}
}
}
},

stop:function stop(){
this.done=true;

var rootEntry=this.tryEntries[0];
var rootRecord=rootEntry.completion;
if(rootRecord.type==="throw"){
throw rootRecord.arg;
}

return this.rval;
},

dispatchException:function dispatchException(exception){
if(this.done){
throw exception;
}

var context=this;
function handle(loc,caught){
record.type="throw";
record.arg=exception;
context.next=loc;
return!!caught;
}

for(var i=this.tryEntries.length-1;i>=0;--i){
var entry=this.tryEntries[i];
var record=entry.completion;

if(entry.tryLoc==="root"){



return handle("end");
}

if(entry.tryLoc<=this.prev){
var hasCatch=hasOwn.call(entry,"catchLoc");
var hasFinally=hasOwn.call(entry,"finallyLoc");

if(hasCatch&&hasFinally){
if(this.prev<entry.catchLoc){
return handle(entry.catchLoc,true);
}else if(this.prev<entry.finallyLoc){
return handle(entry.finallyLoc);
}

}else if(hasCatch){
if(this.prev<entry.catchLoc){
return handle(entry.catchLoc,true);
}

}else if(hasFinally){
if(this.prev<entry.finallyLoc){
return handle(entry.finallyLoc);
}

}else{
throw new Error("try statement without catch or finally");
}
}
}
},

abrupt:function abrupt(type,arg){
for(var i=this.tryEntries.length-1;i>=0;--i){
var entry=this.tryEntries[i];
if(entry.tryLoc<=this.prev&&
hasOwn.call(entry,"finallyLoc")&&
this.prev<entry.finallyLoc){
var finallyEntry=entry;
break;
}
}

if(finallyEntry&&(
type==="break"||
type==="continue")&&
finallyEntry.tryLoc<=arg&&
arg<=finallyEntry.finallyLoc){


finallyEntry=null;
}

var record=finallyEntry?finallyEntry.completion:{};
record.type=type;
record.arg=arg;

if(finallyEntry){
this.next=finallyEntry.finallyLoc;
}else{
this.complete(record);
}

return ContinueSentinel;
},

complete:function complete(record,afterLoc){
if(record.type==="throw"){
throw record.arg;
}

if(record.type==="break"||
record.type==="continue"){
this.next=record.arg;
}else if(record.type==="return"){
this.rval=record.arg;
this.next="end";
}else if(record.type==="normal"&&afterLoc){
this.next=afterLoc;
}
},

finish:function finish(finallyLoc){
for(var i=this.tryEntries.length-1;i>=0;--i){
var entry=this.tryEntries[i];
if(entry.finallyLoc===finallyLoc){
this.complete(entry.completion,entry.afterLoc);
resetTryEntry(entry);
return ContinueSentinel;
}
}
},

"catch":function _catch(tryLoc){
for(var i=this.tryEntries.length-1;i>=0;--i){
var entry=this.tryEntries[i];
if(entry.tryLoc===tryLoc){
var record=entry.completion;
if(record.type==="throw"){
var thrown=record.arg;
resetTryEntry(entry);
}
return thrown;
}
}



throw new Error("illegal catch attempt");
},

delegateYield:function delegateYield(iterable,resultName,nextLoc){
this.delegate={
iterator:values(iterable),
resultName:resultName,
nextLoc:nextLoc};


return ContinueSentinel;
}};

}(



typeof global==="object"?global:
typeof window==="object"?window:
typeof self==="object"?self:this);
}, 230, null, "regenerator-runtime/runtime.js");
__d(/* XMLHttpRequest */function(global, require, module, exports) {










'use strict';

var EventTarget=require(67 /* event-target-shim */);
var RCTNetworking=require(232 /* RCTNetworking */);

var base64=require(71 /* base64-js */);
var invariant=require(26 /* fbjs/lib/invariant */);
var warning=require(15 /* fbjs/lib/warning */);































var UNSENT=0;
var OPENED=1;
var HEADERS_RECEIVED=2;
var LOADING=3;
var DONE=4;

var SUPPORTED_RESPONSE_TYPES={
arraybuffer:typeof global.ArrayBuffer==='function',
blob:typeof global.Blob==='function',
document:false,
json:true,
text:true,
'':true};


var REQUEST_EVENTS=[
'abort',
'error',
'load',
'loadstart',
'progress',
'timeout',
'loadend'];


var XHR_EVENTS=REQUEST_EVENTS.concat('readystatechange');var

XMLHttpRequestEventTarget=function(_EventTarget){babelHelpers.inherits(XMLHttpRequestEventTarget,_EventTarget);function XMLHttpRequestEventTarget(){babelHelpers.classCallCheck(this,XMLHttpRequestEventTarget);return babelHelpers.possibleConstructorReturn(this,(XMLHttpRequestEventTarget.__proto__||Object.getPrototypeOf(XMLHttpRequestEventTarget)).apply(this,arguments));}return XMLHttpRequestEventTarget;}(EventTarget.apply(undefined,REQUEST_EVENTS));var











XMLHttpRequest=function(_EventTarget2){babelHelpers.inherits(XMLHttpRequest,_EventTarget2);babelHelpers.createClass(XMLHttpRequest,null,[{key:'setInterceptor',value:function setInterceptor(


















































interceptor){
XMLHttpRequest._interceptor=interceptor;
}}]);

function XMLHttpRequest(){babelHelpers.classCallCheck(this,XMLHttpRequest);var _this2=babelHelpers.possibleConstructorReturn(this,(XMLHttpRequest.__proto__||Object.getPrototypeOf(XMLHttpRequest)).call(this));_this2.UNSENT=UNSENT;_this2.OPENED=OPENED;_this2.HEADERS_RECEIVED=HEADERS_RECEIVED;_this2.LOADING=LOADING;_this2.DONE=DONE;_this2.readyState=UNSENT;_this2.status=0;_this2.timeout=0;_this2.upload=new XMLHttpRequestEventTarget();_this2._aborted=false;_this2._hasError=false;_this2._method=null;_this2._response='';_this2._url=null;_this2._timedOut=false;_this2._trackingName='unknown';_this2._incrementalEvents=false;

_this2._reset();return _this2;
}babelHelpers.createClass(XMLHttpRequest,[{key:'_reset',value:function _reset()

{
this.readyState=this.UNSENT;
this.responseHeaders=undefined;
this.status=0;
delete this.responseURL;

this._requestId=null;

this._cachedResponse=undefined;
this._hasError=false;
this._headers={};
this._response='';
this._responseType='';
this._sent=false;
this._lowerCaseResponseHeaders={};

this._clearSubscriptions();
this._timedOut=false;
}},{key:'__didCreateRequest',value:function __didCreateRequest(

























































































requestId){
this._requestId=requestId;

XMLHttpRequest._interceptor&&XMLHttpRequest._interceptor.requestSent(
requestId,
this._url||'',
this._method||'GET',
this._headers);
}},{key:'__didUploadProgress',value:function __didUploadProgress(



requestId,
progress,
total)
{
if(requestId===this._requestId){
this.upload.dispatchEvent({
type:'progress',
lengthComputable:true,
loaded:progress,
total:total});

}
}},{key:'__didReceiveResponse',value:function __didReceiveResponse(


requestId,
status,
responseHeaders,
responseURL)
{
if(requestId===this._requestId){
this.status=status;
this.setResponseHeaders(responseHeaders);
this.setReadyState(this.HEADERS_RECEIVED);
if(responseURL||responseURL===''){
this.responseURL=responseURL;
}else{
delete this.responseURL;
}

XMLHttpRequest._interceptor&&XMLHttpRequest._interceptor.responseReceived(
requestId,
responseURL||this._url||'',
status,
responseHeaders||{});
}
}},{key:'__didReceiveData',value:function __didReceiveData(

requestId,response){
if(requestId!==this._requestId){
return;
}
this._response=response;
this._cachedResponse=undefined;
this.setReadyState(this.LOADING);

XMLHttpRequest._interceptor&&XMLHttpRequest._interceptor.dataReceived(
requestId,
response);
}},{key:'__didReceiveIncrementalData',value:function __didReceiveIncrementalData(


requestId,
responseText,
progress,
total)
{
if(requestId!==this._requestId){
return;
}
if(!this._response){
this._response=responseText;
}else{
this._response+=responseText;
}

XMLHttpRequest._interceptor&&XMLHttpRequest._interceptor.dataReceived(
requestId,
responseText);

this.setReadyState(this.LOADING);
this.__didReceiveDataProgress(requestId,progress,total);
}},{key:'__didReceiveDataProgress',value:function __didReceiveDataProgress(


requestId,
loaded,
total)
{
if(requestId!==this._requestId){
return;
}
this.dispatchEvent({
type:'progress',
lengthComputable:total>=0,
loaded:loaded,
total:total});

}},{key:'__didCompleteResponse',value:function __didCompleteResponse(



requestId,
error,
timeOutError)
{
if(requestId===this._requestId){
if(error){
if(this._responseType===''||this._responseType==='text'){
this._response=error;
}
this._hasError=true;
if(timeOutError){
this._timedOut=true;
}
}
this._clearSubscriptions();
this._requestId=null;
this.setReadyState(this.DONE);

if(error){
XMLHttpRequest._interceptor&&XMLHttpRequest._interceptor.loadingFailed(
requestId,
error);
}else{
XMLHttpRequest._interceptor&&XMLHttpRequest._interceptor.loadingFinished(
requestId,
this._response.length);
}
}
}},{key:'_clearSubscriptions',value:function _clearSubscriptions()

{
(this._subscriptions||[]).forEach(function(sub){
sub.remove();
});
this._subscriptions=[];
}},{key:'getAllResponseHeaders',value:function getAllResponseHeaders()

{
if(!this.responseHeaders){

return null;
}
var headers=this.responseHeaders||{};
return Object.keys(headers).map(function(headerName){
return headerName+': '+headers[headerName];
}).join('\r\n');
}},{key:'getResponseHeader',value:function getResponseHeader(

header){
var value=this._lowerCaseResponseHeaders[header.toLowerCase()];
return value!==undefined?value:null;
}},{key:'setRequestHeader',value:function setRequestHeader(

header,value){
if(this.readyState!==this.OPENED){
throw new Error('Request has not been opened');
}
this._headers[header.toLowerCase()]=String(value);
}},{key:'setTrackingName',value:function setTrackingName(




trackingName){
this._trackingName=trackingName;
return this;
}},{key:'open',value:function open(

method,url,async){

if(this.readyState!==this.UNSENT){
throw new Error('Cannot open, already sending');
}
if(async!==undefined&&!async){

throw new Error('Synchronous http requests are not supported');
}
if(!url){
throw new Error('Cannot load an empty url');
}
this._method=method.toUpperCase();
this._url=url;
this._aborted=false;
this.setReadyState(this.OPENED);
}},{key:'send',value:function send(

data){var _this3=this;
if(this.readyState!==this.OPENED){
throw new Error('Request has not been opened');
}
if(this._sent){
throw new Error('Request has already been sent');
}
this._sent=true;
var incrementalEvents=this._incrementalEvents||
!!this.onreadystatechange||
!!this.onprogress;

this._subscriptions.push(RCTNetworking.addListener(
'didSendNetworkData',
function(args){return _this3.__didUploadProgress.apply(_this3,babelHelpers.toConsumableArray(args));}));

this._subscriptions.push(RCTNetworking.addListener(
'didReceiveNetworkResponse',
function(args){return _this3.__didReceiveResponse.apply(_this3,babelHelpers.toConsumableArray(args));}));

this._subscriptions.push(RCTNetworking.addListener(
'didReceiveNetworkData',
function(args){return _this3.__didReceiveData.apply(_this3,babelHelpers.toConsumableArray(args));}));

this._subscriptions.push(RCTNetworking.addListener(
'didReceiveNetworkIncrementalData',
function(args){return _this3.__didReceiveIncrementalData.apply(_this3,babelHelpers.toConsumableArray(args));}));

this._subscriptions.push(RCTNetworking.addListener(
'didReceiveNetworkDataProgress',
function(args){return _this3.__didReceiveDataProgress.apply(_this3,babelHelpers.toConsumableArray(args));}));

this._subscriptions.push(RCTNetworking.addListener(
'didCompleteNetworkResponse',
function(args){return _this3.__didCompleteResponse.apply(_this3,babelHelpers.toConsumableArray(args));}));


var nativeResponseType='text';
if(this._responseType==='arraybuffer'||this._responseType==='blob'){
nativeResponseType='base64';
}

invariant(this._method,'Request method needs to be defined.');
invariant(this._url,'Request URL needs to be defined.');
RCTNetworking.sendRequest(
this._method,
this._trackingName,
this._url,
this._headers,
data,
nativeResponseType,
incrementalEvents,
this.timeout,
this.__didCreateRequest.bind(this));

}},{key:'abort',value:function abort()

{
this._aborted=true;
if(this._requestId){
RCTNetworking.abortRequest(this._requestId);
}


if(!(this.readyState===this.UNSENT||
this.readyState===this.OPENED&&!this._sent||
this.readyState===this.DONE)){
this._reset();
this.setReadyState(this.DONE);
}

this._reset();
}},{key:'setResponseHeaders',value:function setResponseHeaders(

responseHeaders){
this.responseHeaders=responseHeaders||null;
var headers=responseHeaders||{};
this._lowerCaseResponseHeaders=
Object.keys(headers).reduce(function(lcaseHeaders,headerName){
lcaseHeaders[headerName.toLowerCase()]=headers[headerName];
return lcaseHeaders;
},{});
}},{key:'setReadyState',value:function setReadyState(

newState){
this.readyState=newState;
this.dispatchEvent({type:'readystatechange'});
if(newState===this.DONE){
if(this._aborted){
this.dispatchEvent({type:'abort'});
}else if(this._hasError){
if(this._timedOut){
this.dispatchEvent({type:'timeout'});
}else{
this.dispatchEvent({type:'error'});
}
}else{
this.dispatchEvent({type:'load'});
}
this.dispatchEvent({type:'loadend'});
}
}},{key:'addEventListener',value:function addEventListener(


type,listener){




if(type==='readystatechange'||type==='progress'){
this._incrementalEvents=true;
}
babelHelpers.get(XMLHttpRequest.prototype.__proto__||Object.getPrototypeOf(XMLHttpRequest.prototype),'addEventListener',this).call(this,type,listener);
}},{key:'responseType',get:function get(){return this._responseType;},set:function set(responseType){if(this._sent){throw new Error('Failed to set the \'responseType\' property on \'XMLHttpRequest\': The '+'response type cannot be set after the request has been sent.');}if(!SUPPORTED_RESPONSE_TYPES.hasOwnProperty(responseType)){warning(false,'The provided value \''+responseType+'\' is not a valid \'responseType\'.');return;}invariant(SUPPORTED_RESPONSE_TYPES[responseType]||responseType==='document','The provided value \''+responseType+'\' is unsupported in this environment.');this._responseType=responseType;}},{key:'responseText',get:function get(){if(this._responseType!==''&&this._responseType!=='text'){throw new Error("The 'responseText' property is only available if 'responseType' "+('is set to \'\' or \'text\', but it is \''+this._responseType+'\'.'));}if(this.readyState<LOADING){return'';}return this._response;}},{key:'response',get:function get(){var responseType=this.responseType;if(responseType===''||responseType==='text'){return this.readyState<LOADING||this._hasError?'':this._response;}if(this.readyState!==DONE){return null;}if(this._cachedResponse!==undefined){return this._cachedResponse;}switch(responseType){case'document':this._cachedResponse=null;break;case'arraybuffer':this._cachedResponse=base64.toByteArray(this._response).buffer;break;case'blob':this._cachedResponse=new global.Blob([base64.toByteArray(this._response).buffer],{type:this.getResponseHeader('content-type')||''});break;case'json':try{this._cachedResponse=JSON.parse(this._response);}catch(_){this._cachedResponse=null;}break;default:this._cachedResponse=null;}return this._cachedResponse;}}]);return XMLHttpRequest;}(EventTarget.apply(undefined,babelHelpers.toConsumableArray(XHR_EVENTS)));XMLHttpRequest.UNSENT=UNSENT;XMLHttpRequest.OPENED=OPENED;XMLHttpRequest.HEADERS_RECEIVED=HEADERS_RECEIVED;XMLHttpRequest.LOADING=LOADING;XMLHttpRequest.DONE=DONE;XMLHttpRequest._interceptor=null;


module.exports=XMLHttpRequest;
}, 231, null, "XMLHttpRequest");
__d(/* RCTNetworking */function(global, require, module, exports) {










'use strict';

var FormData=require(233 /* FormData */);
var NativeEventEmitter=require(55 /* NativeEventEmitter */);
var RCTNetworkingNative=require(29 /* NativeModules */).Networking;var

RCTNetworking=function(_NativeEventEmitter){babelHelpers.inherits(RCTNetworking,_NativeEventEmitter);

function RCTNetworking(){babelHelpers.classCallCheck(this,RCTNetworking);return babelHelpers.possibleConstructorReturn(this,(RCTNetworking.__proto__||Object.getPrototypeOf(RCTNetworking)).call(this,
RCTNetworkingNative));
}babelHelpers.createClass(RCTNetworking,[{key:'sendRequest',value:function sendRequest(


method,
trackingName,
url,
headers,
data,
responseType,
incrementalUpdates,
timeout,
callback)
{
var body=
typeof data==='string'?{string:data}:
data instanceof FormData?{formData:data.getParts()}:
data;
RCTNetworkingNative.sendRequest({
method:method,
url:url,
data:babelHelpers.extends({},body,{trackingName:trackingName}),
headers:headers,
responseType:responseType,
incrementalUpdates:incrementalUpdates,
timeout:timeout},
callback);
}},{key:'abortRequest',value:function abortRequest(

requestId){
RCTNetworkingNative.abortRequest(requestId);
}},{key:'clearCookies',value:function clearCookies(

callback){
RCTNetworkingNative.clearCookies(callback);
}}]);return RCTNetworking;}(NativeEventEmitter);


module.exports=new RCTNetworking();
}, 232, null, "RCTNetworking");
__d(/* FormData */function(global, require, module, exports) {










'use strict';var



































FormData=function(){


function FormData(){babelHelpers.classCallCheck(this,FormData);
this._parts=[];
}babelHelpers.createClass(FormData,[{key:'append',value:function append(

key,value){





this._parts.push([key,value]);
}},{key:'getParts',value:function getParts()

{
return this._parts.map(function(_ref){var _ref2=babelHelpers.slicedToArray(_ref,2),name=_ref2[0],value=_ref2[1];
var contentDisposition='form-data; name="'+name+'"';

var headers={'content-disposition':contentDisposition};





if(typeof value==='object'){
if(typeof value.name==='string'){
headers['content-disposition']+='; filename="'+value.name+'"';
}
if(typeof value.type==='string'){
headers['content-type']=value.type;
}
return babelHelpers.extends({},value,{headers:headers,fieldName:name});
}

return{string:String(value),headers:headers,fieldName:name};
});
}}]);return FormData;}();


module.exports=FormData;
}, 233, null, "FormData");
__d(/* Geolocation */function(global, require, module, exports) {










'use strict';

var NativeEventEmitter=require(55 /* NativeEventEmitter */);
var RCTLocationObserver=require(29 /* NativeModules */).LocationObserver;

var invariant=require(26 /* fbjs/lib/invariant */);
var logError=require(65 /* logError */);
var warning=require(15 /* fbjs/lib/warning */);

var LocationEventEmitter=new NativeEventEmitter(RCTLocationObserver);

var subscriptions=[];
var updatesEnabled=false;


































var Geolocation={







getCurrentPosition:function getCurrentPosition(
geo_success,
geo_error,
geo_options)
{
invariant(
typeof geo_success==='function',
'Must provide a valid geo_success callback.');

RCTLocationObserver.getCurrentPosition(
geo_options||{},
geo_success,
geo_error||logError);

},





watchPosition:function watchPosition(success,error,options){
if(!updatesEnabled){
RCTLocationObserver.startObserving(options||{});
updatesEnabled=true;
}
var watchID=subscriptions.length;
subscriptions.push([
LocationEventEmitter.addListener(
'geolocationDidChange',
success),

error?LocationEventEmitter.addListener(
'geolocationError',
error):
null]);

return watchID;
},

clearWatch:function clearWatch(watchID){
var sub=subscriptions[watchID];
if(!sub){


return;
}

sub[0].remove();

var sub1=sub[1];sub1&&sub1.remove();
subscriptions[watchID]=undefined;
var noWatchers=true;
for(var ii=0;ii<subscriptions.length;ii++){
if(subscriptions[ii]){
noWatchers=false;
}
}
if(noWatchers){
Geolocation.stopObserving();
}
},

stopObserving:function stopObserving(){
if(updatesEnabled){
RCTLocationObserver.stopObserving();
updatesEnabled=false;
for(var ii=0;ii<subscriptions.length;ii++){
var sub=subscriptions[ii];
if(sub){
warning('Called stopObserving with existing subscriptions.');
sub[0].remove();

var sub1=sub[1];sub1&&sub1.remove();
}
}
subscriptions=[];
}
}};


module.exports=Geolocation;
}, 234, null, "Geolocation");
__d(/* setupDevtools */function(global, require, module, exports) {










'use strict';

var NativeModules=require(29 /* NativeModules */);
var Platform=require(28 /* Platform */);

function setupDevtools(){
var messageListeners=[];
var closeListeners=[];
var hostname='localhost';
if(Platform.OS==='android'&&NativeModules.AndroidConstants){
hostname=NativeModules.AndroidConstants.ServerHost.split(':')[0];
}
var port=window.__REACT_DEVTOOLS_PORT__||8097;
var ws=new window.WebSocket('ws://'+hostname+':'+port+'/devtools');

var FOR_BACKEND={
resolveRNStyle:require(25 /* flattenStyle */),
wall:{
listen:function listen(fn){
messageListeners.push(fn);
},
onClose:function onClose(fn){
closeListeners.push(fn);
},
send:function send(data){
ws.send(JSON.stringify(data));
}}};


ws.onclose=handleClose;
ws.onerror=handleClose;
ws.onopen=function(){
tryToConnect();
};

var hasClosed=false;
function handleClose(){
if(!hasClosed){
hasClosed=true;
setTimeout(setupDevtools,2000);
closeListeners.forEach(function(fn){return fn();});
}
}

function tryToConnect(){
ws.send('attach:agent');
var _interval=setInterval(function(){return ws.send('attach:agent');},500);
ws.onmessage=function(evt){
if(evt.data.indexOf('eval:')===0){
clearInterval(_interval);
initialize(evt.data.slice('eval:'.length));
}
};
}

function initialize(text){
try{

eval(text);
}catch(e){
console.error('Failed to eval: '+e.message);
return;
}

var ReactNativeComponentTree=require(132 /* ReactNativeComponentTree */);
window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
ComponentTree:{
getClosestInstanceFromNode:function getClosestInstanceFromNode(node){
return ReactNativeComponentTree.getClosestInstanceFromNode(node);
},
getNodeFromInstance:function getNodeFromInstance(inst){

while(inst._renderedComponent){
inst=inst._renderedComponent;
}
if(inst){
return ReactNativeComponentTree.getNodeFromInstance(inst);
}else{
return null;
}
}},

Mount:require(236 /* ReactNativeMount */),
Reconciler:require(146 /* ReactReconciler */)});

ws.onmessage=handleMessage;
}

function handleMessage(evt){


var data;
try{
data=JSON.parse(evt.data);
}catch(e){
return console.error('failed to parse json: '+evt.data);
}

if(data.$close||data.$error){
closeListeners.forEach(function(fn){return fn();});
window.__REACT_DEVTOOLS_GLOBAL_HOOK__.emit('shutdown');
tryToConnect();
return;
}
if(data.$open){
return;
}
messageListeners.forEach(function(fn){
try{
fn(data);
}catch(e){



console.log(data);
throw e;
}
});
}
}

module.exports=setupDevtools;
}, 235, null, "setupDevtools");
__d(/* ReactNativeMount */function(global, require, module, exports) {










'use strict';

var React=require(78 /* React */);
var ReactInstrumentation=require(149 /* ReactInstrumentation */);
var ReactNativeContainerInfo=require(237 /* ReactNativeContainerInfo */);
var ReactNativeTagHandles=require(141 /* ReactNativeTagHandles */);
var ReactReconciler=require(146 /* ReactReconciler */);
var ReactUpdateQueue=require(238 /* ReactUpdateQueue */);
var ReactUpdates=require(142 /* ReactUpdates */);
var UIManager=require(75 /* UIManager */);

var emptyObject=require(91 /* fbjs/lib/emptyObject */);
var instantiateReactComponent=require(154 /* instantiateReactComponent */);
var shouldUpdateReactComponent=require(161 /* shouldUpdateReactComponent */);






var TopLevelWrapper=function TopLevelWrapper(){};
TopLevelWrapper.prototype.isReactComponent={};
if(__DEV__){
TopLevelWrapper.displayName='TopLevelWrapper';
}
TopLevelWrapper.prototype.render=function(){
return this.props.child;
};
TopLevelWrapper.isReactTopLevelWrapper=true;









function mountComponentIntoNode(
componentInstance,
containerTag,
transaction){
var markup=ReactReconciler.mountComponent(
componentInstance,
transaction,
null,
ReactNativeContainerInfo(containerTag),
emptyObject,
0);

componentInstance._renderedComponent._topLevelWrapper=componentInstance;
ReactNativeMount._mountImageIntoNode(markup,containerTag);
}








function batchedMountComponentIntoNode(
componentInstance,
containerTag){
var transaction=ReactUpdates.ReactReconcileTransaction.getPooled();
transaction.perform(
mountComponentIntoNode,
null,
componentInstance,
containerTag,
transaction);

ReactUpdates.ReactReconcileTransaction.release(transaction);
}





var ReactNativeMount={
_instancesByContainerID:{},


findNodeHandle:require(76 /* findNodeHandle */),





renderComponent:function renderComponent(
nextElement,
containerTag,
callback)
{
var nextWrappedElement=React.createElement(
TopLevelWrapper,
{child:nextElement});


var topRootNodeID=containerTag;
var prevComponent=ReactNativeMount._instancesByContainerID[topRootNodeID];
if(prevComponent){
var prevWrappedElement=prevComponent._currentElement;
var prevElement=prevWrappedElement.props.child;
if(shouldUpdateReactComponent(prevElement,nextElement)){
ReactUpdateQueue.enqueueElementInternal(prevComponent,nextWrappedElement,emptyObject);
if(callback){
ReactUpdateQueue.enqueueCallbackInternal(prevComponent,callback);
}
return prevComponent;
}else{
ReactNativeMount.unmountComponentAtNode(containerTag);
}
}

if(!ReactNativeTagHandles.reactTagIsNativeTopRootID(containerTag)){
console.error('You cannot render into anything but a top root');
return null;
}

ReactNativeTagHandles.assertRootTag(containerTag);

var instance=instantiateReactComponent(nextWrappedElement,false);
ReactNativeMount._instancesByContainerID[containerTag]=instance;





ReactUpdates.batchedUpdates(
batchedMountComponentIntoNode,
instance,
containerTag);

var component=instance.getPublicInstance();
if(callback){
callback.call(component);
}
return component;
},





_mountImageIntoNode:function _mountImageIntoNode(mountImage,containerID){


var childTag=mountImage;
UIManager.setChildren(
containerID,
[childTag]);

},









unmountComponentAtNodeAndRemoveContainer:function unmountComponentAtNodeAndRemoveContainer(
containerTag)
{
ReactNativeMount.unmountComponentAtNode(containerTag);

UIManager.removeRootView(containerTag);
},






unmountComponentAtNode:function unmountComponentAtNode(containerTag){
if(!ReactNativeTagHandles.reactTagIsNativeTopRootID(containerTag)){
console.error('You cannot render into anything but a top root');
return false;
}

var instance=ReactNativeMount._instancesByContainerID[containerTag];
if(!instance){
return false;
}
if(__DEV__){
ReactInstrumentation.debugTool.onBeginFlush();
}
ReactNativeMount.unmountComponentFromNode(instance,containerTag);
delete ReactNativeMount._instancesByContainerID[containerTag];
if(__DEV__){
ReactInstrumentation.debugTool.onEndFlush();
}
return true;
},










unmountComponentFromNode:function unmountComponentFromNode(
instance,
containerID)
{

ReactReconciler.unmountComponent(instance);
UIManager.removeSubviewsFromContainerWithID(containerID);
}};



module.exports=ReactNativeMount;
}, 236, null, "ReactNativeMount");
__d(/* ReactNativeContainerInfo */function(global, require, module, exports) {










'use strict';

function ReactNativeContainerInfo(tag){
var info={
_tag:tag};

return info;
}

module.exports=ReactNativeContainerInfo;
}, 237, null, "ReactNativeContainerInfo");
__d(/* ReactUpdateQueue */function(global, require, module, exports) {










'use strict';

var ReactCurrentOwner=require(38 /* react/lib/ReactCurrentOwner */);
var ReactInstanceMap=require(77 /* ReactInstanceMap */);
var ReactInstrumentation=require(149 /* ReactInstrumentation */);
var ReactUpdates=require(142 /* ReactUpdates */);

var invariant=require(26 /* fbjs/lib/invariant */);
var warning=require(15 /* fbjs/lib/warning */);

function enqueueUpdate(internalInstance){
ReactUpdates.enqueueUpdate(internalInstance);
}

function formatUnexpectedArgument(arg){
var type=typeof arg;
if(type!=='object'){
return type;
}
var displayName=arg.constructor&&arg.constructor.name||type;
var keys=Object.keys(arg);
if(keys.length>0&&keys.length<20){
return displayName+' (keys: '+keys.join(', ')+')';
}
return displayName;
}

function getInternalInstanceReadyForUpdate(publicInstance,callerName){
var internalInstance=ReactInstanceMap.get(publicInstance);
if(!internalInstance){
if(__DEV__){
var ctor=publicInstance.constructor;



warning(
!callerName,
'%s(...): Can only update a mounted or mounting component. '+
'This usually means you called %s() on an unmounted component. '+
'This is a no-op. Please check the code for the %s component.',
callerName,
callerName,
ctor&&(ctor.displayName||ctor.name)||'ReactClass');

}
return null;
}

if(__DEV__){
warning(
ReactCurrentOwner.current==null,
'%s(...): Cannot update during an existing state transition (such as '+
'within `render` or another component\'s constructor). Render methods '+
'should be a pure function of props and state; constructor '+
'side-effects are an anti-pattern, but can be moved to '+
'`componentWillMount`.',
callerName);

}

return internalInstance;
}





var ReactUpdateQueue={








isMounted:function isMounted(publicInstance){
if(__DEV__){
var owner=ReactCurrentOwner.current;
if(owner!==null){
warning(
owner._warnedAboutRefsInRender,
'%s is accessing isMounted inside its render() function. '+
'render() should be a pure function of props and state. It should '+
'never access something that requires stale data from the previous '+
'render, such as refs. Move this logic to componentDidMount and '+
'componentDidUpdate instead.',
owner.getName()||'A component');

owner._warnedAboutRefsInRender=true;
}
}
var internalInstance=ReactInstanceMap.get(publicInstance);
if(internalInstance){



return!!internalInstance._renderedComponent;
}else{
return false;
}
},










enqueueCallback:function enqueueCallback(publicInstance,callback,callerName){
ReactUpdateQueue.validateCallback(callback,callerName);
var internalInstance=getInternalInstanceReadyForUpdate(publicInstance);






if(!internalInstance){
return null;
}

if(internalInstance._pendingCallbacks){
internalInstance._pendingCallbacks.push(callback);
}else{
internalInstance._pendingCallbacks=[callback];
}




enqueueUpdate(internalInstance);
},

enqueueCallbackInternal:function enqueueCallbackInternal(internalInstance,callback){
if(internalInstance._pendingCallbacks){
internalInstance._pendingCallbacks.push(callback);
}else{
internalInstance._pendingCallbacks=[callback];
}
enqueueUpdate(internalInstance);
},














enqueueForceUpdate:function enqueueForceUpdate(publicInstance){
var internalInstance=getInternalInstanceReadyForUpdate(
publicInstance,
'forceUpdate');


if(!internalInstance){
return;
}

internalInstance._pendingForceUpdate=true;

enqueueUpdate(internalInstance);
},












enqueueReplaceState:function enqueueReplaceState(publicInstance,completeState){
var internalInstance=getInternalInstanceReadyForUpdate(
publicInstance,
'replaceState');


if(!internalInstance){
return;
}

internalInstance._pendingStateQueue=[completeState];
internalInstance._pendingReplaceState=true;

enqueueUpdate(internalInstance);
},











enqueueSetState:function enqueueSetState(publicInstance,partialState){
if(__DEV__){
ReactInstrumentation.debugTool.onSetState();
warning(
partialState!=null,
'setState(...): You passed an undefined or null state object; '+
'instead, use forceUpdate().');

}

var internalInstance=getInternalInstanceReadyForUpdate(
publicInstance,
'setState');


if(!internalInstance){
return;
}

var queue=
internalInstance._pendingStateQueue||(
internalInstance._pendingStateQueue=[]);
queue.push(partialState);

enqueueUpdate(internalInstance);
},

enqueueElementInternal:function enqueueElementInternal(internalInstance,nextElement,nextContext){
internalInstance._pendingElement=nextElement;

internalInstance._context=nextContext;
enqueueUpdate(internalInstance);
},

validateCallback:function validateCallback(callback,callerName){
invariant(
!callback||typeof callback==='function',
'%s(...): Expected the last optional `callback` argument to be a '+
'function. Instead received: %s.',
callerName,
formatUnexpectedArgument(callback));

}};



module.exports=ReactUpdateQueue;
}, 238, null, "ReactUpdateQueue");
__d(/* RCTDebugComponentOwnership */function(global, require, module, exports) {














'use strict';

var BatchedBridge=require(30 /* BatchedBridge */);

var RCTDebugComponentOwnership={







getOwnerHierarchy:function getOwnerHierarchy(requestID,tag){

throw new Error(
'This seems to be unused. Will disable until it is needed again.');

}};


BatchedBridge.registerCallableModule(
'RCTDebugComponentOwnership',
RCTDebugComponentOwnership);


module.exports=RCTDebugComponentOwnership;
}, 239, null, "RCTDebugComponentOwnership");
__d(/* JSInspector */function(global, require, module, exports) {










'use strict';













var JSInspector={
registerAgent:function registerAgent(type){
if(global.__registerInspectorAgent){
global.__registerInspectorAgent(type);
}
},
getTimestamp:function getTimestamp(){
return global.__inspectorTimestamp();
}};


module.exports=JSInspector;
}, 240, null, "JSInspector");
__d(/* NetworkAgent */function(global, require, module, exports) {










'use strict';

var InspectorAgent=require(242 /* InspectorAgent */);
var JSInspector=require(240 /* JSInspector */);
var Map=require(195 /* Map */);
var XMLHttpRequest=require(231 /* XMLHttpRequest */);var






























































































































Interceptor=function(){



function Interceptor(agent){babelHelpers.classCallCheck(this,Interceptor);
this._agent=agent;
this._requests=new Map();
}babelHelpers.createClass(Interceptor,[{key:'getData',value:function getData(

requestId){
return this._requests.get(requestId);
}},{key:'requestSent',value:function requestSent(


id,
url,
method,
headers){
var requestId=String(id);
this._requests.set(requestId,'');

var request={
url:url,
method:method,
headers:headers,
initialPriority:'Medium'};

var event={
requestId:requestId,
documentURL:'',
frameId:'1',
loaderId:'1',
request:request,
timestamp:JSInspector.getTimestamp(),
initiator:{



type:'other'},

type:'Other'};

this._agent.sendEvent('requestWillBeSent',event);
}},{key:'responseReceived',value:function responseReceived(


id,
url,
status,
headers){
var requestId=String(id);
var response={
url:url,
status:status,
statusText:String(status),
headers:headers,

requestHeaders:{},
mimeType:this._getMimeType(headers),
connectionReused:false,
connectionId:-1,
encodedDataLength:0,
securityState:'unknown'};


var event={
requestId:requestId,
frameId:'1',
loaderId:'1',
timestamp:JSInspector.getTimestamp(),
type:'Other',
response:response};

this._agent.sendEvent('responseReceived',event);
}},{key:'dataReceived',value:function dataReceived(


id,
data){
var requestId=String(id);
var existingData=this._requests.get(requestId)||'';
this._requests.set(requestId,existingData.concat(data));
var event={
requestId:requestId,
timestamp:JSInspector.getTimestamp(),
dataLength:data.length,
encodedDataLength:data.length};

this._agent.sendEvent('dataReceived',event);
}},{key:'loadingFinished',value:function loadingFinished(


id,
encodedDataLength){
var event={
requestId:String(id),
timestamp:JSInspector.getTimestamp(),
encodedDataLength:encodedDataLength};

this._agent.sendEvent('loadingFinished',event);
}},{key:'loadingFailed',value:function loadingFailed(


id,
error){
var event={
requestId:String(id),
timestamp:JSInspector.getTimestamp(),
type:'Other',
errorText:error};

this._agent.sendEvent('loadingFailed',event);
}},{key:'_getMimeType',value:function _getMimeType(

headers){
var contentType=headers['Content-Type']||'';
return contentType.split(';')[0];
}}]);return Interceptor;}();var







NetworkAgent=function(_InspectorAgent){babelHelpers.inherits(NetworkAgent,_InspectorAgent);function NetworkAgent(){babelHelpers.classCallCheck(this,NetworkAgent);return babelHelpers.possibleConstructorReturn(this,(NetworkAgent.__proto__||Object.getPrototypeOf(NetworkAgent)).apply(this,arguments));}babelHelpers.createClass(NetworkAgent,[{key:'enable',value:function enable(_ref)





{var maxResourceBufferSize=_ref.maxResourceBufferSize,maxTotalBufferSize=_ref.maxTotalBufferSize;
this._interceptor=new Interceptor(this);
XMLHttpRequest.setInterceptor(this._interceptor);
}},{key:'disable',value:function disable()

{
XMLHttpRequest.setInterceptor(null);
this._interceptor=null;
}},{key:'getResponseBody',value:function getResponseBody(_ref2)


{var requestId=_ref2.requestId;
return{body:this.interceptor().getData(requestId),base64Encoded:false};
}},{key:'interceptor',value:function interceptor()

{
if(this._interceptor){
return this._interceptor;
}else{
throw Error('_interceptor can not be null');
}

}}]);return NetworkAgent;}(InspectorAgent);NetworkAgent.DOMAIN='Network';


module.exports=NetworkAgent;
}, 241, null, "NetworkAgent");
__d(/* InspectorAgent */function(global, require, module, exports) {










'use strict';var



InspectorAgent=function(){


function InspectorAgent(eventSender){babelHelpers.classCallCheck(this,InspectorAgent);
this._eventSender=eventSender;
}babelHelpers.createClass(InspectorAgent,[{key:'sendEvent',value:function sendEvent(

name,params){
this._eventSender(name,params);
}}]);return InspectorAgent;}();


module.exports=InspectorAgent;
}, 242, null, "InspectorAgent");
__d(/* RCTNativeAppEventEmitter */function(global, require, module, exports) {










'use strict';

var BatchedBridge=require(30 /* BatchedBridge */);
var RCTDeviceEventEmitter=require(60 /* RCTDeviceEventEmitter */);





var RCTNativeAppEventEmitter=RCTDeviceEventEmitter;

BatchedBridge.registerCallableModule(
'RCTNativeAppEventEmitter',
RCTNativeAppEventEmitter);


module.exports=RCTNativeAppEventEmitter;
}, 243, null, "RCTNativeAppEventEmitter");
__d(/* PerformanceLogger */function(global, require, module, exports) {









'use strict';

var BatchedBridge=require(30 /* BatchedBridge */);
var performanceNow=global.nativePerformanceNow||require(43 /* fbjs/lib/performanceNow */);

var timespans={};
var extras={};





var PerformanceLogger={
addTimespan:function addTimespan(key,lengthInMs,description){
if(timespans[key]){
if(__DEV__){
console.log(
'PerformanceLogger: Attempting to add a timespan that already exists ',
key);

}
return;
}

timespans[key]={
description:description,
totalTime:lengthInMs};

},

startTimespan:function startTimespan(key,description){
if(timespans[key]){
if(__DEV__){
console.log(
'PerformanceLogger: Attempting to start a timespan that already exists ',
key);

}
return;
}

timespans[key]={
description:description,
startTime:performanceNow()};

},

stopTimespan:function stopTimespan(key){
if(!timespans[key]||!timespans[key].startTime){
if(__DEV__){
console.log(
'PerformanceLogger: Attempting to end a timespan that has not started ',
key);

}
return;
}
if(timespans[key].endTime){
if(__DEV__){
console.log(
'PerformanceLogger: Attempting to end a timespan that has already ended ',
key);

}
return;
}

timespans[key].endTime=performanceNow();
timespans[key].totalTime=
timespans[key].endTime-timespans[key].startTime;
},

clear:function clear(){
timespans={};
extras={};
},

clearExceptTimespans:function clearExceptTimespans(keys){
timespans=Object.keys(timespans).reduce(function(previous,key){
if(keys.indexOf(key)!==-1){
previous[key]=timespans[key];
}
return previous;
},{});
extras={};
},

getTimespans:function getTimespans(){
return timespans;
},

hasTimespan:function hasTimespan(key){
return!!timespans[key];
},

logTimespans:function logTimespans(){
for(var key in timespans){
if(timespans[key].totalTime){
console.log(key+': '+timespans[key].totalTime+'ms');
}
}
},

addTimespans:function addTimespans(newTimespans,labels){
for(var i=0,l=newTimespans.length;i<l;i+=2){
var label=labels[i/2];
PerformanceLogger.addTimespan(
label,
newTimespans[i+1]-newTimespans[i],
label);

}
},

setExtra:function setExtra(key,value){
if(extras[key]){
if(__DEV__){
console.log(
'PerformanceLogger: Attempting to set an extra that already exists ',
key);

}
return;
}
extras[key]=value;
},

getExtras:function getExtras(){
return extras;
}};


BatchedBridge.registerCallableModule(
'PerformanceLogger',
PerformanceLogger);


module.exports=PerformanceLogger;
}, 244, null, "PerformanceLogger");
__d(/* RCTEventEmitter */function(global, require, module, exports) {










'use strict';

var BatchedBridge=require(30 /* BatchedBridge */);

var RCTEventEmitter={
register:function register(eventEmitter){
BatchedBridge.registerCallableModule(
'RCTEventEmitter',
eventEmitter);

}};


module.exports=RCTEventEmitter;
}, 245, null, "RCTEventEmitter");
__d(/* ReactDefaultBatchingStrategy */function(global, require, module, exports) {










'use strict';

var ReactUpdates=require(142 /* ReactUpdates */);
var Transaction=require(150 /* Transaction */);

var emptyFunction=require(16 /* fbjs/lib/emptyFunction */);

var RESET_BATCHED_UPDATES={
initialize:emptyFunction,
close:function close(){
ReactDefaultBatchingStrategy.isBatchingUpdates=false;
}};


var FLUSH_BATCHED_UPDATES={
initialize:emptyFunction,
close:ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)};


var TRANSACTION_WRAPPERS=[FLUSH_BATCHED_UPDATES,RESET_BATCHED_UPDATES];

function ReactDefaultBatchingStrategyTransaction(){
this.reinitializeTransaction();
}

babelHelpers.extends(
ReactDefaultBatchingStrategyTransaction.prototype,
Transaction,
{
getTransactionWrappers:function getTransactionWrappers(){
return TRANSACTION_WRAPPERS;
}});



var transaction=new ReactDefaultBatchingStrategyTransaction();

var ReactDefaultBatchingStrategy={
isBatchingUpdates:false,





batchedUpdates:function batchedUpdates(callback,a,b,c,d,e){
var alreadyBatchingUpdates=ReactDefaultBatchingStrategy.isBatchingUpdates;

ReactDefaultBatchingStrategy.isBatchingUpdates=true;


if(alreadyBatchingUpdates){
return callback(a,b,c,d,e);
}else{
return transaction.perform(callback,null,a,b,c,d,e);
}
}};


module.exports=ReactDefaultBatchingStrategy;
}, 246, null, "ReactDefaultBatchingStrategy");
__d(/* ReactNativeBridgeEventPlugin */function(global, require, module, exports) {










'use strict';

var EventPropagators=require(248 /* EventPropagators */);
var SyntheticEvent=require(249 /* SyntheticEvent */);
var UIManager=require(75 /* UIManager */);

var warning=require(15 /* fbjs/lib/warning */);

var customBubblingEventTypes=UIManager.customBubblingEventTypes;
var customDirectEventTypes=UIManager.customDirectEventTypes;

var allTypesByEventName={};

for(var bubblingTypeName in customBubblingEventTypes){
allTypesByEventName[bubblingTypeName]=customBubblingEventTypes[bubblingTypeName];
}

for(var directTypeName in customDirectEventTypes){
warning(
!customBubblingEventTypes[directTypeName],
'Event cannot be both direct and bubbling: %s',
directTypeName);

allTypesByEventName[directTypeName]=customDirectEventTypes[directTypeName];
}

var ReactNativeBridgeEventPlugin={

eventTypes:babelHelpers.extends({},customBubblingEventTypes,customDirectEventTypes),




extractEvents:function extractEvents(
topLevelType,
targetInst,
nativeEvent,
nativeEventTarget)
{
var bubbleDispatchConfig=customBubblingEventTypes[topLevelType];
var directDispatchConfig=customDirectEventTypes[topLevelType];
var event=SyntheticEvent.getPooled(
bubbleDispatchConfig||directDispatchConfig,
targetInst,
nativeEvent,
nativeEventTarget);

if(bubbleDispatchConfig){
EventPropagators.accumulateTwoPhaseDispatches(event);
}else if(directDispatchConfig){
EventPropagators.accumulateDirectDispatches(event);
}else{
return null;
}
return event;
}};


module.exports=ReactNativeBridgeEventPlugin;
}, 247, null, "ReactNativeBridgeEventPlugin");
__d(/* EventPropagators */function(global, require, module, exports) {










'use strict';

var EventPluginHub=require(134 /* EventPluginHub */);
var EventPluginUtils=require(136 /* EventPluginUtils */);

var accumulateInto=require(138 /* accumulateInto */);
var forEachAccumulated=require(139 /* forEachAccumulated */);
var warning=require(15 /* fbjs/lib/warning */);



var getListener=EventPluginHub.getListener;





function listenerAtPhase(inst,event,propagationPhase){
var registrationName=
event.dispatchConfig.phasedRegistrationNames[propagationPhase];
return getListener(inst,registrationName);
}







function accumulateDirectionalDispatches(inst,phase,event){
if(__DEV__){
warning(
inst,
'Dispatching inst must not be null');

}
var listener=listenerAtPhase(inst,event,phase);
if(listener){
event._dispatchListeners=
accumulateInto(event._dispatchListeners,listener);
event._dispatchInstances=accumulateInto(event._dispatchInstances,inst);
}
}








function accumulateTwoPhaseDispatchesSingle(event){
if(event&&event.dispatchConfig.phasedRegistrationNames){
EventPluginUtils.traverseTwoPhase(
event._targetInst,
accumulateDirectionalDispatches,
event);

}
}




function accumulateTwoPhaseDispatchesSingleSkipTarget(event){
if(event&&event.dispatchConfig.phasedRegistrationNames){
var targetInst=event._targetInst;
var parentInst=
targetInst?EventPluginUtils.getParentInstance(targetInst):null;
EventPluginUtils.traverseTwoPhase(
parentInst,
accumulateDirectionalDispatches,
event);

}
}







function accumulateDispatches(inst,ignoredDirection,event){
if(event&&event.dispatchConfig.registrationName){
var registrationName=event.dispatchConfig.registrationName;
var listener=getListener(inst,registrationName);
if(listener){
event._dispatchListeners=
accumulateInto(event._dispatchListeners,listener);
event._dispatchInstances=accumulateInto(event._dispatchInstances,inst);
}
}
}






function accumulateDirectDispatchesSingle(event){
if(event&&event.dispatchConfig.registrationName){
accumulateDispatches(event._targetInst,null,event);
}
}

function accumulateTwoPhaseDispatches(events){
forEachAccumulated(events,accumulateTwoPhaseDispatchesSingle);
}

function accumulateTwoPhaseDispatchesSkipTarget(events){
forEachAccumulated(events,accumulateTwoPhaseDispatchesSingleSkipTarget);
}

function accumulateEnterLeaveDispatches(leave,enter,from,to){
EventPluginUtils.traverseEnterLeave(
from,
to,
accumulateDispatches,
leave,
enter);

}


function accumulateDirectDispatches(events){
forEachAccumulated(events,accumulateDirectDispatchesSingle);
}














var EventPropagators={
accumulateTwoPhaseDispatches:accumulateTwoPhaseDispatches,
accumulateTwoPhaseDispatchesSkipTarget:accumulateTwoPhaseDispatchesSkipTarget,
accumulateDirectDispatches:accumulateDirectDispatches,
accumulateEnterLeaveDispatches:accumulateEnterLeaveDispatches};


module.exports=EventPropagators;
}, 248, null, "EventPropagators");
__d(/* SyntheticEvent */function(global, require, module, exports) {










'use strict';

var PooledClass=require(144 /* PooledClass */);

var emptyFunction=require(16 /* fbjs/lib/emptyFunction */);
var warning=require(15 /* fbjs/lib/warning */);

var didWarnForAddedNewProperty=false;
var isProxySupported=typeof Proxy==='function';

var shouldBeReleasedProperties=[
'dispatchConfig',
'_targetInst',
'nativeEvent',
'isDefaultPrevented',
'isPropagationStopped',
'_dispatchListeners',
'_dispatchInstances'];






var EventInterface={
type:null,
target:null,

currentTarget:emptyFunction.thatReturnsNull,
eventPhase:null,
bubbles:null,
cancelable:null,
timeStamp:function timeStamp(event){
return event.timeStamp||Date.now();
},
defaultPrevented:null,
isTrusted:null};




















function SyntheticEvent(dispatchConfig,targetInst,nativeEvent,nativeEventTarget){
if(__DEV__){

delete this.nativeEvent;
delete this.preventDefault;
delete this.stopPropagation;
}

this.dispatchConfig=dispatchConfig;
this._targetInst=targetInst;
this.nativeEvent=nativeEvent;

var Interface=this.constructor.Interface;
for(var propName in Interface){
if(!Interface.hasOwnProperty(propName)){
continue;
}
if(__DEV__){
delete this[propName];
}
var normalize=Interface[propName];
if(normalize){
this[propName]=normalize(nativeEvent);
}else{
if(propName==='target'){
this.target=nativeEventTarget;
}else{
this[propName]=nativeEvent[propName];
}
}
}

var defaultPrevented=nativeEvent.defaultPrevented!=null?
nativeEvent.defaultPrevented:
nativeEvent.returnValue===false;
if(defaultPrevented){
this.isDefaultPrevented=emptyFunction.thatReturnsTrue;
}else{
this.isDefaultPrevented=emptyFunction.thatReturnsFalse;
}
this.isPropagationStopped=emptyFunction.thatReturnsFalse;
return this;
}

babelHelpers.extends(SyntheticEvent.prototype,{

preventDefault:function preventDefault(){
this.defaultPrevented=true;
var event=this.nativeEvent;
if(!event){
return;
}

if(event.preventDefault){
event.preventDefault();
}else if(typeof event.returnValue!=='unknown'){
event.returnValue=false;
}
this.isDefaultPrevented=emptyFunction.thatReturnsTrue;
},

stopPropagation:function stopPropagation(){
var event=this.nativeEvent;
if(!event){
return;
}

if(event.stopPropagation){
event.stopPropagation();
}else if(typeof event.cancelBubble!=='unknown'){





event.cancelBubble=true;
}

this.isPropagationStopped=emptyFunction.thatReturnsTrue;
},






persist:function persist(){
this.isPersistent=emptyFunction.thatReturnsTrue;
},






isPersistent:emptyFunction.thatReturnsFalse,




destructor:function destructor(){
var Interface=this.constructor.Interface;
for(var propName in Interface){
if(__DEV__){
Object.defineProperty(this,propName,getPooledWarningPropertyDefinition(propName,Interface[propName]));
}else{
this[propName]=null;
}
}
for(var i=0;i<shouldBeReleasedProperties.length;i++){
this[shouldBeReleasedProperties[i]]=null;
}
if(__DEV__){
Object.defineProperty(
this,
'nativeEvent',
getPooledWarningPropertyDefinition('nativeEvent',null));

Object.defineProperty(
this,
'preventDefault',
getPooledWarningPropertyDefinition('preventDefault',emptyFunction));

Object.defineProperty(
this,
'stopPropagation',
getPooledWarningPropertyDefinition('stopPropagation',emptyFunction));

}
}});



SyntheticEvent.Interface=EventInterface;

if(__DEV__){
if(isProxySupported){

SyntheticEvent=new Proxy(SyntheticEvent,{
construct:function construct(target,args){
return this.apply(target,Object.create(target.prototype),args);
},
apply:function apply(constructor,that,args){
return new Proxy(constructor.apply(that,args),{
set:function set(target,prop,value){
if(prop!=='isPersistent'&&
!target.constructor.Interface.hasOwnProperty(prop)&&
shouldBeReleasedProperties.indexOf(prop)===-1){
warning(
didWarnForAddedNewProperty||target.isPersistent(),
'This synthetic event is reused for performance reasons. If you\'re '+
'seeing this, you\'re adding a new property in the synthetic event object. '+
'The property is never released. See '+
'https://fb.me/react-event-pooling for more information.');

didWarnForAddedNewProperty=true;
}
target[prop]=value;
return true;
}});

}});


}
}






SyntheticEvent.augmentClass=function(Class,Interface){
var Super=this;

var E=function E(){};
E.prototype=Super.prototype;
var prototype=new E();

babelHelpers.extends(prototype,Class.prototype);
Class.prototype=prototype;
Class.prototype.constructor=Class;

Class.Interface=babelHelpers.extends({},Super.Interface,Interface);
Class.augmentClass=Super.augmentClass;

PooledClass.addPoolingTo(Class,PooledClass.fourArgumentPooler);
};

PooledClass.addPoolingTo(SyntheticEvent,PooledClass.fourArgumentPooler);

module.exports=SyntheticEvent;








function getPooledWarningPropertyDefinition(propName,getVal){
var isFunction=typeof getVal==='function';
return{
configurable:true,
set:set,
get:get};


function set(val){
var action=isFunction?'setting the method':'setting the property';
warn(action,'This is effectively a no-op');
return val;
}

function get(){
var action=isFunction?'accessing the method':'accessing the property';
var result=isFunction?'This is a no-op function':'This is set to null';
warn(action,result);
return getVal;
}

function warn(action,result){
var warningCondition=false;
warning(
warningCondition,
'This synthetic event is reused for performance reasons. If you\'re seeing this, '+
'you\'re %s `%s` on a released/nullified synthetic event. %s. '+
'If you must keep the original synthetic event around, use event.persist(). '+
'See https://fb.me/react-event-pooling for more information.',
action,
propName,
result);

}
}
}, 249, null, "SyntheticEvent");
__d(/* ReactNativeComponentEnvironment */function(global, require, module, exports) {










'use strict';

var ReactNativeDOMIDOperations=require(251 /* ReactNativeDOMIDOperations */);
var ReactNativeReconcileTransaction=require(252 /* ReactNativeReconcileTransaction */);

var ReactNativeComponentEnvironment={

processChildrenUpdates:ReactNativeDOMIDOperations.dangerouslyProcessChildrenUpdates,

replaceNodeWithMarkup:ReactNativeDOMIDOperations.dangerouslyReplaceNodeWithMarkupByID,




clearNode:function clearNode(){

},

ReactReconcileTransaction:ReactNativeReconcileTransaction};


module.exports=ReactNativeComponentEnvironment;
}, 250, null, "ReactNativeComponentEnvironment");
__d(/* ReactNativeDOMIDOperations */function(global, require, module, exports) {









'use strict';

var ReactNativeComponentTree=require(132 /* ReactNativeComponentTree */);
var UIManager=require(75 /* UIManager */);













var dangerouslyProcessChildrenUpdates=function dangerouslyProcessChildrenUpdates(inst,childrenUpdates){
if(!childrenUpdates.length){
return;
}

var containerTag=ReactNativeComponentTree.getNodeFromInstance(inst);

var moveFromIndices;
var moveToIndices;
var addChildTags;
var addAtIndices;
var removeAtIndices;

for(var i=0;i<childrenUpdates.length;i++){
var update=childrenUpdates[i];
if(update.type==='MOVE_EXISTING'){
(moveFromIndices||(moveFromIndices=[])).push(update.fromIndex);
(moveToIndices||(moveToIndices=[])).push(update.toIndex);
}else if(update.type==='REMOVE_NODE'){
(removeAtIndices||(removeAtIndices=[])).push(update.fromIndex);
}else if(update.type==='INSERT_MARKUP'){
var mountImage=update.content;
var tag=mountImage;
(addAtIndices||(addAtIndices=[])).push(update.toIndex);
(addChildTags||(addChildTags=[])).push(tag);
}
}

UIManager.manageChildren(
containerTag,
moveFromIndices,
moveToIndices,
addChildTags,
addAtIndices,
removeAtIndices);

};





var ReactNativeDOMIDOperations={
dangerouslyProcessChildrenUpdates:dangerouslyProcessChildrenUpdates,







dangerouslyReplaceNodeWithMarkupByID:function dangerouslyReplaceNodeWithMarkupByID(id,mountImage){
var oldTag=id;
UIManager.replaceExistingNonRootView(oldTag,mountImage);
}};


module.exports=ReactNativeDOMIDOperations;
}, 251, null, "ReactNativeDOMIDOperations");
__d(/* ReactNativeReconcileTransaction */function(global, require, module, exports) {










'use strict';

var CallbackQueue=require(143 /* CallbackQueue */);
var PooledClass=require(144 /* PooledClass */);
var Transaction=require(150 /* Transaction */);
var ReactInstrumentation=require(149 /* ReactInstrumentation */);
var ReactUpdateQueue=require(238 /* ReactUpdateQueue */);





var ON_DOM_READY_QUEUEING={



initialize:function initialize(){
this.reactMountReady.reset();
},




close:function close(){
this.reactMountReady.notifyAll();
}};







var TRANSACTION_WRAPPERS=[ON_DOM_READY_QUEUEING];

if(__DEV__){
TRANSACTION_WRAPPERS.push({
initialize:ReactInstrumentation.debugTool.onBeginFlush,
close:ReactInstrumentation.debugTool.onEndFlush});

}















function ReactNativeReconcileTransaction(){
this.reinitializeTransaction();
this.reactMountReady=CallbackQueue.getPooled(null);
}

var Mixin={







getTransactionWrappers:function getTransactionWrappers(){
return TRANSACTION_WRAPPERS;
},





getReactMountReady:function getReactMountReady(){
return this.reactMountReady;
},




getUpdateQueue:function getUpdateQueue(){
return ReactUpdateQueue;
},





checkpoint:function checkpoint(){

return this.reactMountReady.checkpoint();
},

rollback:function rollback(checkpoint){
this.reactMountReady.rollback(checkpoint);
},





destructor:function destructor(){
CallbackQueue.release(this.reactMountReady);
this.reactMountReady=null;
}};


babelHelpers.extends(
ReactNativeReconcileTransaction.prototype,
Transaction,
ReactNativeReconcileTransaction,
Mixin);


PooledClass.addPoolingTo(ReactNativeReconcileTransaction);

module.exports=ReactNativeReconcileTransaction;
}, 252, null, "ReactNativeReconcileTransaction");
__d(/* ReactNativeEventPluginOrder */function(global, require, module, exports) {










'use strict';

var ReactNativeEventPluginOrder=[
'ResponderEventPlugin',
'ReactNativeBridgeEventPlugin'];


module.exports=ReactNativeEventPluginOrder;
}, 253, null, "ReactNativeEventPluginOrder");
__d(/* ReactNativeGlobalResponderHandler */function(global, require, module, exports) {









'use strict';

var UIManager=require(75 /* UIManager */);

var ReactNativeGlobalResponderHandler={
onChange:function onChange(from,to,blockNativeResponder){
if(to!==null){
UIManager.setJSResponder(
to._rootNodeID,
blockNativeResponder);

}else{
UIManager.clearJSResponder();
}
}};


module.exports=ReactNativeGlobalResponderHandler;
}, 254, null, "ReactNativeGlobalResponderHandler");
__d(/* ReactNativeTextComponent */function(global, require, module, exports) {










'use strict';

var ReactNativeComponentTree=require(132 /* ReactNativeComponentTree */);
var ReactNativeTagHandles=require(141 /* ReactNativeTagHandles */);
var UIManager=require(75 /* UIManager */);

var invariant=require(26 /* fbjs/lib/invariant */);

var ReactNativeTextComponent=function ReactNativeTextComponent(text){

this._currentElement=text;
this._stringText=''+text;
this._hostParent=null;
this._rootNodeID=0;
};

babelHelpers.extends(ReactNativeTextComponent.prototype,{

mountComponent:function mountComponent(transaction,hostParent,hostContainerInfo,context){

invariant(
context.isInAParentText,
'RawText "%s" must be wrapped in an explicit <Text> component.',
this._stringText);

this._hostParent=hostParent;
var tag=ReactNativeTagHandles.allocateTag();
this._rootNodeID=tag;
var nativeTopRootTag=hostContainerInfo._tag;
UIManager.createView(
tag,
'RCTRawText',
nativeTopRootTag,
{text:this._stringText});


ReactNativeComponentTree.precacheNode(this,tag);

return tag;
},

getHostNode:function getHostNode(){
return this._rootNodeID;
},

receiveComponent:function receiveComponent(nextText,transaction,context){
if(nextText!==this._currentElement){
this._currentElement=nextText;
var nextStringText=''+nextText;
if(nextStringText!==this._stringText){
this._stringText=nextStringText;
UIManager.updateView(
this._rootNodeID,
'RCTRawText',
{text:this._stringText});

}
}
},

unmountComponent:function unmountComponent(){
ReactNativeComponentTree.uncacheNode(this);
this._currentElement=null;
this._stringText=null;
this._rootNodeID=0;
}});



module.exports=ReactNativeTextComponent;
}, 255, null, "ReactNativeTextComponent");
__d(/* ReactNativeTreeTraversal */function(global, require, module, exports) {










'use strict';







function getLowestCommonAncestor(instA,instB){
var depthA=0;
for(var tempA=instA;tempA;tempA=tempA._hostParent){
depthA++;
}
var depthB=0;
for(var tempB=instB;tempB;tempB=tempB._hostParent){
depthB++;
}


while(depthA-depthB>0){
instA=instA._hostParent;
depthA--;
}


while(depthB-depthA>0){
instB=instB._hostParent;
depthB--;
}


var depth=depthA;
while(depth--){
if(instA===instB){
return instA;
}
instA=instA._hostParent;
instB=instB._hostParent;
}
return null;
}




function isAncestor(instA,instB){
while(instB){
if(instB===instA){
return true;
}
instB=instB._hostParent;
}
return false;
}




function getParentInstance(inst){
return inst._hostParent;
}




function traverseTwoPhase(inst,fn,arg){
var path=[];
while(inst){
path.push(inst);
inst=inst._hostParent;
}
var i;
for(i=path.length;i-->0;){
fn(path[i],'captured',arg);
}
for(i=0;i<path.length;i++){
fn(path[i],'bubbled',arg);
}
}








function traverseEnterLeave(from,to,fn,argFrom,argTo){
var common=from&&to?getLowestCommonAncestor(from,to):null;
var pathFrom=[];
while(from&&from!==common){
pathFrom.push(from);
from=from._hostParent;
}
var pathTo=[];
while(to&&to!==common){
pathTo.push(to);
to=to._hostParent;
}
var i;
for(i=0;i<pathFrom.length;i++){
fn(pathFrom[i],'bubbled',argFrom);
}
for(i=pathTo.length;i-->0;){
fn(pathTo[i],'captured',argTo);
}
}

module.exports={
isAncestor:isAncestor,
getLowestCommonAncestor:getLowestCommonAncestor,
getParentInstance:getParentInstance,
traverseTwoPhase:traverseTwoPhase,
traverseEnterLeave:traverseEnterLeave};
}, 256, null, "ReactNativeTreeTraversal");
__d(/* ReactSimpleEmptyComponent */function(global, require, module, exports) {










'use strict';

var ReactReconciler=require(146 /* ReactReconciler */);


var ReactSimpleEmptyComponent=function ReactSimpleEmptyComponent(placeholderElement,instantiate){
this._currentElement=null;
this._renderedComponent=instantiate(placeholderElement);
};
babelHelpers.extends(ReactSimpleEmptyComponent.prototype,{
mountComponent:function mountComponent(
transaction,
hostParent,
hostContainerInfo,
context,
parentDebugID)
{
return ReactReconciler.mountComponent(
this._renderedComponent,
transaction,
hostParent,
hostContainerInfo,
context,
parentDebugID);

},
receiveComponent:function receiveComponent(){
},
getHostNode:function getHostNode(){
return ReactReconciler.getHostNode(this._renderedComponent);
},
unmountComponent:function unmountComponent(){
ReactReconciler.unmountComponent(this._renderedComponent);
this._renderedComponent=null;
}});


module.exports=ReactSimpleEmptyComponent;
}, 257, null, "ReactSimpleEmptyComponent");
__d(/* ResponderEventPlugin */function(global, require, module, exports) {










'use strict';

var EventPluginUtils=require(136 /* EventPluginUtils */);
var EventPropagators=require(248 /* EventPropagators */);
var ResponderSyntheticEvent=require(259 /* ResponderSyntheticEvent */);
var ResponderTouchHistoryStore=require(260 /* ResponderTouchHistoryStore */);

var accumulate=require(261 /* accumulate */);

var isStartish=EventPluginUtils.isStartish;
var isMoveish=EventPluginUtils.isMoveish;
var isEndish=EventPluginUtils.isEndish;
var executeDirectDispatch=EventPluginUtils.executeDirectDispatch;
var hasDispatches=EventPluginUtils.hasDispatches;
var executeDispatchesInOrderStopAtTrue=
EventPluginUtils.executeDispatchesInOrderStopAtTrue;





var responderInst=null;





var trackedTouchCount=0;




var previousActiveTouches=0;

var changeResponder=function changeResponder(nextResponderInst,blockHostResponder){
var oldResponderInst=responderInst;
responderInst=nextResponderInst;
if(ResponderEventPlugin.GlobalResponderHandler!==null){
ResponderEventPlugin.GlobalResponderHandler.onChange(
oldResponderInst,
nextResponderInst,
blockHostResponder);

}
};

var eventTypes={




startShouldSetResponder:{
phasedRegistrationNames:{
bubbled:'onStartShouldSetResponder',
captured:'onStartShouldSetResponderCapture'}},












scrollShouldSetResponder:{
phasedRegistrationNames:{
bubbled:'onScrollShouldSetResponder',
captured:'onScrollShouldSetResponderCapture'}},










selectionChangeShouldSetResponder:{
phasedRegistrationNames:{
bubbled:'onSelectionChangeShouldSetResponder',
captured:'onSelectionChangeShouldSetResponderCapture'}},







moveShouldSetResponder:{
phasedRegistrationNames:{
bubbled:'onMoveShouldSetResponder',
captured:'onMoveShouldSetResponderCapture'}},






responderStart:{registrationName:'onResponderStart'},
responderMove:{registrationName:'onResponderMove'},
responderEnd:{registrationName:'onResponderEnd'},
responderRelease:{registrationName:'onResponderRelease'},
responderTerminationRequest:{
registrationName:'onResponderTerminationRequest'},

responderGrant:{registrationName:'onResponderGrant'},
responderReject:{registrationName:'onResponderReject'},
responderTerminate:{registrationName:'onResponderTerminate'}};


































































































































































































function setResponderAndExtractTransfer(
topLevelType,
targetInst,
nativeEvent,
nativeEventTarget)
{
var shouldSetEventType=
isStartish(topLevelType)?eventTypes.startShouldSetResponder:
isMoveish(topLevelType)?eventTypes.moveShouldSetResponder:
topLevelType==='topSelectionChange'?
eventTypes.selectionChangeShouldSetResponder:
eventTypes.scrollShouldSetResponder;


var bubbleShouldSetFrom=!responderInst?
targetInst:
EventPluginUtils.getLowestCommonAncestor(responderInst,targetInst);





var skipOverBubbleShouldSetFrom=bubbleShouldSetFrom===responderInst;
var shouldSetEvent=ResponderSyntheticEvent.getPooled(
shouldSetEventType,
bubbleShouldSetFrom,
nativeEvent,
nativeEventTarget);

shouldSetEvent.touchHistory=ResponderTouchHistoryStore.touchHistory;
if(skipOverBubbleShouldSetFrom){
EventPropagators.accumulateTwoPhaseDispatchesSkipTarget(shouldSetEvent);
}else{
EventPropagators.accumulateTwoPhaseDispatches(shouldSetEvent);
}
var wantsResponderInst=executeDispatchesInOrderStopAtTrue(shouldSetEvent);
if(!shouldSetEvent.isPersistent()){
shouldSetEvent.constructor.release(shouldSetEvent);
}

if(!wantsResponderInst||wantsResponderInst===responderInst){
return null;
}
var extracted;
var grantEvent=ResponderSyntheticEvent.getPooled(
eventTypes.responderGrant,
wantsResponderInst,
nativeEvent,
nativeEventTarget);

grantEvent.touchHistory=ResponderTouchHistoryStore.touchHistory;

EventPropagators.accumulateDirectDispatches(grantEvent);
var blockHostResponder=executeDirectDispatch(grantEvent)===true;
if(responderInst){

var terminationRequestEvent=ResponderSyntheticEvent.getPooled(
eventTypes.responderTerminationRequest,
responderInst,
nativeEvent,
nativeEventTarget);

terminationRequestEvent.touchHistory=ResponderTouchHistoryStore.touchHistory;
EventPropagators.accumulateDirectDispatches(terminationRequestEvent);
var shouldSwitch=!hasDispatches(terminationRequestEvent)||
executeDirectDispatch(terminationRequestEvent);
if(!terminationRequestEvent.isPersistent()){
terminationRequestEvent.constructor.release(terminationRequestEvent);
}

if(shouldSwitch){
var terminateEvent=ResponderSyntheticEvent.getPooled(
eventTypes.responderTerminate,
responderInst,
nativeEvent,
nativeEventTarget);

terminateEvent.touchHistory=ResponderTouchHistoryStore.touchHistory;
EventPropagators.accumulateDirectDispatches(terminateEvent);
extracted=accumulate(extracted,[grantEvent,terminateEvent]);
changeResponder(wantsResponderInst,blockHostResponder);
}else{
var rejectEvent=ResponderSyntheticEvent.getPooled(
eventTypes.responderReject,
wantsResponderInst,
nativeEvent,
nativeEventTarget);

rejectEvent.touchHistory=ResponderTouchHistoryStore.touchHistory;
EventPropagators.accumulateDirectDispatches(rejectEvent);
extracted=accumulate(extracted,rejectEvent);
}
}else{
extracted=accumulate(extracted,grantEvent);
changeResponder(wantsResponderInst,blockHostResponder);
}
return extracted;
}









function canTriggerTransfer(topLevelType,topLevelInst,nativeEvent){
return topLevelInst&&(



topLevelType==='topScroll'&&
!nativeEvent.responderIgnoreScroll||
trackedTouchCount>0&&
topLevelType==='topSelectionChange'||
isStartish(topLevelType)||
isMoveish(topLevelType));

}








function noResponderTouches(nativeEvent){
var touches=nativeEvent.touches;
if(!touches||touches.length===0){
return true;
}
for(var i=0;i<touches.length;i++){
var activeTouch=touches[i];
var target=activeTouch.target;
if(target!==null&&target!==undefined&&target!==0){

var targetInst=EventPluginUtils.getInstanceFromNode(target);
if(EventPluginUtils.isAncestor(responderInst,targetInst)){
return false;
}
}
}
return true;
}


var ResponderEventPlugin={


_getResponderID:function _getResponderID(){
return responderInst?responderInst._rootNodeID:null;
},

eventTypes:eventTypes,






extractEvents:function extractEvents(
topLevelType,
targetInst,
nativeEvent,
nativeEventTarget)
{
if(isStartish(topLevelType)){
trackedTouchCount+=1;
}else if(isEndish(topLevelType)){
if(trackedTouchCount>=0){
trackedTouchCount-=1;
}else{
console.error(
'Ended a touch event which was not counted in `trackedTouchCount`.');

return null;
}
}

ResponderTouchHistoryStore.recordTouchTrack(topLevelType,nativeEvent);

var extracted=canTriggerTransfer(topLevelType,targetInst,nativeEvent)?
setResponderAndExtractTransfer(
topLevelType,
targetInst,
nativeEvent,
nativeEventTarget):
null;










var isResponderTouchStart=responderInst&&isStartish(topLevelType);
var isResponderTouchMove=responderInst&&isMoveish(topLevelType);
var isResponderTouchEnd=responderInst&&isEndish(topLevelType);
var incrementalTouch=
isResponderTouchStart?eventTypes.responderStart:
isResponderTouchMove?eventTypes.responderMove:
isResponderTouchEnd?eventTypes.responderEnd:
null;

if(incrementalTouch){
var gesture=
ResponderSyntheticEvent.getPooled(
incrementalTouch,
responderInst,
nativeEvent,
nativeEventTarget);

gesture.touchHistory=ResponderTouchHistoryStore.touchHistory;
EventPropagators.accumulateDirectDispatches(gesture);
extracted=accumulate(extracted,gesture);
}

var isResponderTerminate=
responderInst&&
topLevelType==='topTouchCancel';
var isResponderRelease=
responderInst&&
!isResponderTerminate&&
isEndish(topLevelType)&&
noResponderTouches(nativeEvent);
var finalTouch=
isResponderTerminate?eventTypes.responderTerminate:
isResponderRelease?eventTypes.responderRelease:
null;
if(finalTouch){
var finalEvent=ResponderSyntheticEvent.getPooled(
finalTouch,responderInst,nativeEvent,nativeEventTarget);

finalEvent.touchHistory=ResponderTouchHistoryStore.touchHistory;
EventPropagators.accumulateDirectDispatches(finalEvent);
extracted=accumulate(extracted,finalEvent);
changeResponder(null);
}

var numberActiveTouches=
ResponderTouchHistoryStore.touchHistory.numberActiveTouches;
if(ResponderEventPlugin.GlobalInteractionHandler&&
numberActiveTouches!==previousActiveTouches){
ResponderEventPlugin.GlobalInteractionHandler.onChange(
numberActiveTouches);

}
previousActiveTouches=numberActiveTouches;

return extracted;
},

GlobalResponderHandler:null,
GlobalInteractionHandler:null,

injection:{





injectGlobalResponderHandler:function injectGlobalResponderHandler(GlobalResponderHandler){
ResponderEventPlugin.GlobalResponderHandler=GlobalResponderHandler;
},





injectGlobalInteractionHandler:function injectGlobalInteractionHandler(GlobalInteractionHandler){
ResponderEventPlugin.GlobalInteractionHandler=GlobalInteractionHandler;
}}};



module.exports=ResponderEventPlugin;
}, 258, null, "ResponderEventPlugin");
__d(/* ResponderSyntheticEvent */function(global, require, module, exports) {










'use strict';

var SyntheticEvent=require(249 /* SyntheticEvent */);






var ResponderEventInterface={
touchHistory:function touchHistory(nativeEvent){
return null;
}};








function ResponderSyntheticEvent(dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget){
return SyntheticEvent.call(this,dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget);
}

SyntheticEvent.augmentClass(ResponderSyntheticEvent,ResponderEventInterface);

module.exports=ResponderSyntheticEvent;
}, 259, null, "ResponderSyntheticEvent");
__d(/* ResponderTouchHistoryStore */function(global, require, module, exports) {











'use strict';

var EventPluginUtils=require(136 /* EventPluginUtils */);

var invariant=require(26 /* fbjs/lib/invariant */);
var warning=require(15 /* fbjs/lib/warning */);var


isEndish=


EventPluginUtils.isEndish,isMoveish=EventPluginUtils.isMoveish,isStartish=EventPluginUtils.isStartish;



















var MAX_TOUCH_BANK=20;
var touchBank=[];
var touchHistory={
touchBank:touchBank,
numberActiveTouches:0,



indexOfSingleActiveTouch:-1,
mostRecentTimeStamp:0};













function timestampForTouch(touch){



return touch.timeStamp||touch.timestamp;
}





function createTouchRecord(touch){
return{
touchActive:true,
startPageX:touch.pageX,
startPageY:touch.pageY,
startTimeStamp:timestampForTouch(touch),
currentPageX:touch.pageX,
currentPageY:touch.pageY,
currentTimeStamp:timestampForTouch(touch),
previousPageX:touch.pageX,
previousPageY:touch.pageY,
previousTimeStamp:timestampForTouch(touch)};

}

function resetTouchRecord(touchRecord,touch){
touchRecord.touchActive=true;
touchRecord.startPageX=touch.pageX;
touchRecord.startPageY=touch.pageY;
touchRecord.startTimeStamp=timestampForTouch(touch);
touchRecord.currentPageX=touch.pageX;
touchRecord.currentPageY=touch.pageY;
touchRecord.currentTimeStamp=timestampForTouch(touch);
touchRecord.previousPageX=touch.pageX;
touchRecord.previousPageY=touch.pageY;
touchRecord.previousTimeStamp=timestampForTouch(touch);
}

function getTouchIdentifier(_ref){var identifier=_ref.identifier;
invariant(identifier!=null,'Touch object is missing identifier.');
warning(
identifier<=MAX_TOUCH_BANK,
'Touch identifier %s is greater than maximum supported %s which causes '+
'performance issues backfilling array locations for all of the indices.',
identifier,
MAX_TOUCH_BANK);

return identifier;
}

function recordTouchStart(touch){
var identifier=getTouchIdentifier(touch);
var touchRecord=touchBank[identifier];
if(touchRecord){
resetTouchRecord(touchRecord,touch);
}else{
touchBank[identifier]=createTouchRecord(touch);
}
touchHistory.mostRecentTimeStamp=timestampForTouch(touch);
}

function recordTouchMove(touch){
var touchRecord=touchBank[getTouchIdentifier(touch)];
if(touchRecord){
touchRecord.touchActive=true;
touchRecord.previousPageX=touchRecord.currentPageX;
touchRecord.previousPageY=touchRecord.currentPageY;
touchRecord.previousTimeStamp=touchRecord.currentTimeStamp;
touchRecord.currentPageX=touch.pageX;
touchRecord.currentPageY=touch.pageY;
touchRecord.currentTimeStamp=timestampForTouch(touch);
touchHistory.mostRecentTimeStamp=timestampForTouch(touch);
}else{
console.error(
'Cannot record touch move without a touch start.\n'+
'Touch Move: %s\n',
'Touch Bank: %s',
printTouch(touch),
printTouchBank());

}
}

function recordTouchEnd(touch){
var touchRecord=touchBank[getTouchIdentifier(touch)];
if(touchRecord){
touchRecord.touchActive=false;
touchRecord.previousPageX=touchRecord.currentPageX;
touchRecord.previousPageY=touchRecord.currentPageY;
touchRecord.previousTimeStamp=touchRecord.currentTimeStamp;
touchRecord.currentPageX=touch.pageX;
touchRecord.currentPageY=touch.pageY;
touchRecord.currentTimeStamp=timestampForTouch(touch);
touchHistory.mostRecentTimeStamp=timestampForTouch(touch);
}else{
console.error(
'Cannot record touch end without a touch start.\n'+
'Touch End: %s\n',
'Touch Bank: %s',
printTouch(touch),
printTouchBank());

}
}

function printTouch(touch){
return JSON.stringify({
identifier:touch.identifier,
pageX:touch.pageX,
pageY:touch.pageY,
timestamp:timestampForTouch(touch)});

}

function printTouchBank(){
var printed=JSON.stringify(touchBank.slice(0,MAX_TOUCH_BANK));
if(touchBank.length>MAX_TOUCH_BANK){
printed+=' (original size: '+touchBank.length+')';
}
return printed;
}

var ResponderTouchHistoryStore={
recordTouchTrack:function recordTouchTrack(topLevelType,nativeEvent){
if(isMoveish(topLevelType)){
nativeEvent.changedTouches.forEach(recordTouchMove);
}else if(isStartish(topLevelType)){
nativeEvent.changedTouches.forEach(recordTouchStart);
touchHistory.numberActiveTouches=nativeEvent.touches.length;
if(touchHistory.numberActiveTouches===1){
touchHistory.indexOfSingleActiveTouch=
nativeEvent.touches[0].identifier;
}
}else if(isEndish(topLevelType)){
nativeEvent.changedTouches.forEach(recordTouchEnd);
touchHistory.numberActiveTouches=nativeEvent.touches.length;
if(touchHistory.numberActiveTouches===1){
for(var i=0;i<touchBank.length;i++){
var touchTrackToCheck=touchBank[i];
if(touchTrackToCheck!=null&&touchTrackToCheck.touchActive){
touchHistory.indexOfSingleActiveTouch=i;
break;
}
}
if(__DEV__){
var activeRecord=touchBank[touchHistory.indexOfSingleActiveTouch];
warning(
activeRecord!=null&&
activeRecord.touchActive,
'Cannot find single active touch.');

}
}
}
},

touchHistory:touchHistory};



module.exports=ResponderTouchHistoryStore;
}, 260, null, "ResponderTouchHistoryStore");
__d(/* accumulate */function(global, require, module, exports) {











'use strict';

var invariant=require(26 /* fbjs/lib/invariant */);








function accumulate(current,next){
invariant(
next!=null,
'accumulate(...): Accumulated items must be not be null or undefined.');


if(current==null){
return next;
}



if(Array.isArray(current)){
return current.concat(next);
}

if(Array.isArray(next)){
return[current].concat(next);
}

return[current,next];
}

module.exports=accumulate;
}, 261, null, "accumulate");
__d(/* ScrollResponder */function(global, require, module, exports) {










'use strict';

var Dimensions=require(103 /* Dimensions */);
var Platform=require(28 /* Platform */);
var Keyboard=require(62 /* Keyboard */);
var ReactNative=require(213 /* ReactNative */);
var Subscribable=require(263 /* Subscribable */);
var TextInputState=require(27 /* TextInputState */);
var UIManager=require(75 /* UIManager */);
var warning=require(15 /* fbjs/lib/warning */);var _require=

require(132 /* ReactNativeComponentTree */),getInstanceFromNode=_require.getInstanceFromNode;var _require2=
require(29 /* NativeModules */),ScrollViewManager=_require2.ScrollViewManager;

var invariant=require(26 /* fbjs/lib/invariant */);















































































var IS_ANIMATING_TOUCH_START_THRESHOLD_MS=16;










function isTagInstanceOfTextInput(tag){
var instance=getInstanceFromNode(tag);
return instance&&instance.viewConfig&&(
instance.viewConfig.uiViewClassName==='AndroidTextInput'||
instance.viewConfig.uiViewClassName==='RCTTextView'||
instance.viewConfig.uiViewClassName==='RCTTextField');

}

var ScrollResponderMixin={
mixins:[Subscribable.Mixin],
scrollResponderMixinGetInitialState:function scrollResponderMixinGetInitialState(){
return{
isTouching:false,
lastMomentumScrollBeginTime:0,
lastMomentumScrollEndTime:0,






observedScrollSinceBecomingResponder:false,
becameResponderWhileAnimating:false};

},




scrollResponderHandleScrollShouldSetResponder:function scrollResponderHandleScrollShouldSetResponder(){
return this.state.isTouching;
},


























scrollResponderHandleStartShouldSetResponder:function scrollResponderHandleStartShouldSetResponder(e){
var currentlyFocusedTextInput=TextInputState.currentlyFocusedField();

if(this.props.keyboardShouldPersistTaps==='handled'&&
currentlyFocusedTextInput!=null&&
e.target!==currentlyFocusedTextInput){
return true;
}
return false;
},












scrollResponderHandleStartShouldSetResponderCapture:function scrollResponderHandleStartShouldSetResponderCapture(e){

var currentlyFocusedTextInput=TextInputState.currentlyFocusedField();var
keyboardShouldPersistTaps=this.props.keyboardShouldPersistTaps;
var keyboardNeverPersistTaps=!keyboardShouldPersistTaps||
keyboardShouldPersistTaps==='never';
if(keyboardNeverPersistTaps&&
currentlyFocusedTextInput!=null&&
!isTagInstanceOfTextInput(e.target)){
return true;
}
return this.scrollResponderIsAnimating();
},











scrollResponderHandleResponderReject:function scrollResponderHandleResponderReject(){
},
















scrollResponderHandleTerminationRequest:function scrollResponderHandleTerminationRequest(){
return!this.state.observedScrollSinceBecomingResponder;
},






scrollResponderHandleTouchEnd:function scrollResponderHandleTouchEnd(e){
var nativeEvent=e.nativeEvent;
this.state.isTouching=nativeEvent.touches.length!==0;
this.props.onTouchEnd&&this.props.onTouchEnd(e);
},




scrollResponderHandleResponderRelease:function scrollResponderHandleResponderRelease(e){
this.props.onResponderRelease&&this.props.onResponderRelease(e);



var currentlyFocusedTextInput=TextInputState.currentlyFocusedField();
if(this.props.keyboardShouldPersistTaps!==true&&
this.props.keyboardShouldPersistTaps!=='always'&&
currentlyFocusedTextInput!=null&&
e.target!==currentlyFocusedTextInput&&
!this.state.observedScrollSinceBecomingResponder&&
!this.state.becameResponderWhileAnimating){
this.props.onScrollResponderKeyboardDismissed&&
this.props.onScrollResponderKeyboardDismissed(e);
TextInputState.blurTextInput(currentlyFocusedTextInput);
}
},

scrollResponderHandleScroll:function scrollResponderHandleScroll(e){
this.state.observedScrollSinceBecomingResponder=true;
this.props.onScroll&&this.props.onScroll(e);
},




scrollResponderHandleResponderGrant:function scrollResponderHandleResponderGrant(e){
this.state.observedScrollSinceBecomingResponder=false;
this.props.onResponderGrant&&this.props.onResponderGrant(e);
this.state.becameResponderWhileAnimating=this.scrollResponderIsAnimating();
},








scrollResponderHandleScrollBeginDrag:function scrollResponderHandleScrollBeginDrag(e){
this.props.onScrollBeginDrag&&this.props.onScrollBeginDrag(e);
},




scrollResponderHandleScrollEndDrag:function scrollResponderHandleScrollEndDrag(e){
this.props.onScrollEndDrag&&this.props.onScrollEndDrag(e);
},




scrollResponderHandleMomentumScrollBegin:function scrollResponderHandleMomentumScrollBegin(e){
this.state.lastMomentumScrollBeginTime=Date.now();
this.props.onMomentumScrollBegin&&this.props.onMomentumScrollBegin(e);
},




scrollResponderHandleMomentumScrollEnd:function scrollResponderHandleMomentumScrollEnd(e){
this.state.lastMomentumScrollEndTime=Date.now();
this.props.onMomentumScrollEnd&&this.props.onMomentumScrollEnd(e);
},












scrollResponderHandleTouchStart:function scrollResponderHandleTouchStart(e){
this.state.isTouching=true;
this.props.onTouchStart&&this.props.onTouchStart(e);
},












scrollResponderHandleTouchMove:function scrollResponderHandleTouchMove(e){
this.props.onTouchMove&&this.props.onTouchMove(e);
},






scrollResponderIsAnimating:function scrollResponderIsAnimating(){
var now=Date.now();
var timeSinceLastMomentumScrollEnd=now-this.state.lastMomentumScrollEndTime;
var isAnimating=timeSinceLastMomentumScrollEnd<IS_ANIMATING_TOUCH_START_THRESHOLD_MS||
this.state.lastMomentumScrollEndTime<this.state.lastMomentumScrollBeginTime;
return isAnimating;
},






scrollResponderGetScrollableNode:function scrollResponderGetScrollableNode(){
return this.getScrollableNode?
this.getScrollableNode():
ReactNative.findNodeHandle(this);
},












scrollResponderScrollTo:function scrollResponderScrollTo(
x,
y,
animated)
{
if(typeof x==='number'){
console.warn('`scrollResponderScrollTo(x, y, animated)` is deprecated. Use `scrollResponderScrollTo({x: 5, y: 5, animated: true})` instead.');
}else{var _ref=
x||{};x=_ref.x;y=_ref.y;animated=_ref.animated;
}
UIManager.dispatchViewManagerCommand(
this.scrollResponderGetScrollableNode(),
UIManager.RCTScrollView.Commands.scrollTo,
[x||0,y||0,animated!==false]);

},




scrollResponderScrollWithoutAnimationTo:function scrollResponderScrollWithoutAnimationTo(offsetX,offsetY){
console.warn('`scrollResponderScrollWithoutAnimationTo` is deprecated. Use `scrollResponderScrollTo` instead');
this.scrollResponderScrollTo({x:offsetX,y:offsetY,animated:false});
},







scrollResponderZoomTo:function scrollResponderZoomTo(
rect,
animated)
{
invariant(ScrollViewManager&&ScrollViewManager.zoomToRect,'zoomToRect is not implemented');
if('animated'in rect){var
animated=rect.animated,rect=babelHelpers.objectWithoutProperties(rect,['animated']);
}else if(typeof animated!=='undefined'){
console.warn('`scrollResponderZoomTo` `animated` argument is deprecated. Use `options.animated` instead');
}
ScrollViewManager.zoomToRect(this.scrollResponderGetScrollableNode(),rect,animated!==false);
},











scrollResponderScrollNativeHandleToKeyboard:function scrollResponderScrollNativeHandleToKeyboard(nodeHandle,additionalOffset,preventNegativeScrollOffset){
this.additionalScrollOffset=additionalOffset||0;
this.preventNegativeScrollOffset=!!preventNegativeScrollOffset;
UIManager.measureLayout(
nodeHandle,
ReactNative.findNodeHandle(this.getInnerViewNode()),
this.scrollResponderTextInputFocusError,
this.scrollResponderInputMeasureAndScrollToKeyboard);

},











scrollResponderInputMeasureAndScrollToKeyboard:function scrollResponderInputMeasureAndScrollToKeyboard(left,top,width,height){
var keyboardScreenY=Dimensions.get('window').height;
if(this.keyboardWillOpenTo){
keyboardScreenY=this.keyboardWillOpenTo.endCoordinates.screenY;
}
var scrollOffsetY=top-keyboardScreenY+height+this.additionalScrollOffset;





if(this.preventNegativeScrollOffset){
scrollOffsetY=Math.max(0,scrollOffsetY);
}
this.scrollResponderScrollTo({x:0,y:scrollOffsetY,animated:true});

this.additionalOffset=0;
this.preventNegativeScrollOffset=false;
},

scrollResponderTextInputFocusError:function scrollResponderTextInputFocusError(e){
console.error('Error measuring text field: ',e);
},







componentWillMount:function componentWillMount(){var
keyboardShouldPersistTaps=this.props.keyboardShouldPersistTaps;
warning(
typeof keyboardShouldPersistTaps!=='boolean',
'\'keyboardShouldPersistTaps={'+keyboardShouldPersistTaps+'}\' is deprecated. '+('Use \'keyboardShouldPersistTaps="'+(
keyboardShouldPersistTaps?"always":"never")+'"\' instead'));


this.keyboardWillOpenTo=null;
this.additionalScrollOffset=0;
this.addListenerOn(Keyboard,'keyboardWillShow',this.scrollResponderKeyboardWillShow);
this.addListenerOn(Keyboard,'keyboardWillHide',this.scrollResponderKeyboardWillHide);
this.addListenerOn(Keyboard,'keyboardDidShow',this.scrollResponderKeyboardDidShow);
this.addListenerOn(Keyboard,'keyboardDidHide',this.scrollResponderKeyboardDidHide);
},





























scrollResponderKeyboardWillShow:function scrollResponderKeyboardWillShow(e){
this.keyboardWillOpenTo=e;
this.props.onKeyboardWillShow&&this.props.onKeyboardWillShow(e);
},

scrollResponderKeyboardWillHide:function scrollResponderKeyboardWillHide(e){
this.keyboardWillOpenTo=null;
this.props.onKeyboardWillHide&&this.props.onKeyboardWillHide(e);
},

scrollResponderKeyboardDidShow:function scrollResponderKeyboardDidShow(e){


if(e){
this.keyboardWillOpenTo=e;
}
this.props.onKeyboardDidShow&&this.props.onKeyboardDidShow(e);
},

scrollResponderKeyboardDidHide:function scrollResponderKeyboardDidHide(e){
this.keyboardWillOpenTo=null;
this.props.onKeyboardDidHide&&this.props.onKeyboardDidHide(e);
}};



var ScrollResponder={
Mixin:ScrollResponderMixin};


module.exports=ScrollResponder;
}, 262, null, "ScrollResponder");
__d(/* Subscribable */function(global, require, module, exports) {










'use strict';











var Subscribable={};

Subscribable.Mixin={

componentWillMount:function componentWillMount(){
this._subscribableSubscriptions=[];
},

componentWillUnmount:function componentWillUnmount(){
this._subscribableSubscriptions.forEach(
function(subscription){return subscription.remove();});

this._subscribableSubscriptions=null;
},














addListenerOn:function addListenerOn(
eventEmitter,
eventType,
listener,
context)
{
this._subscribableSubscriptions.push(
eventEmitter.addListener(eventType,listener,context));

}};


module.exports=Subscribable;
}, 263, null, "Subscribable");
__d(/* processDecelerationRate */function(global, require, module, exports) {









'use strict';

function processDecelerationRate(decelerationRate){
if(decelerationRate==='normal'){
decelerationRate=0.998;
}else if(decelerationRate==='fast'){
decelerationRate=0.99;
}
return decelerationRate;
}

module.exports=processDecelerationRate;
}, 264, null, "processDecelerationRate");
__d(/* react-timer-mixin/TimerMixin.js */function(global, require, module, exports) {








'use strict';

var GLOBAL=typeof window==='undefined'?global:window;

var setter=function setter(_setter,_clearer,array){
return function(callback,delta){
var id=_setter(function(){
_clearer.call(this,id);
callback.apply(this,arguments);
}.bind(this),delta);

if(!this[array]){
this[array]=[id];
}else{
this[array].push(id);
}
return id;
};
};

var clearer=function clearer(_clearer,array){
return function(id){
if(this[array]){
var index=this[array].indexOf(id);
if(index!==-1){
this[array].splice(index,1);
}
}
_clearer(id);
};
};

var _timeouts='TimerMixin_timeouts';
var _clearTimeout=clearer(GLOBAL.clearTimeout,_timeouts);
var _setTimeout=setter(GLOBAL.setTimeout,_clearTimeout,_timeouts);

var _intervals='TimerMixin_intervals';
var _clearInterval=clearer(GLOBAL.clearInterval,_intervals);
var _setInterval=setter(GLOBAL.setInterval,function(){},_intervals);

var _immediates='TimerMixin_immediates';
var _clearImmediate=clearer(GLOBAL.clearImmediate,_immediates);
var _setImmediate=setter(GLOBAL.setImmediate,_clearImmediate,_immediates);

var _rafs='TimerMixin_rafs';
var _cancelAnimationFrame=clearer(GLOBAL.cancelAnimationFrame,_rafs);
var _requestAnimationFrame=setter(GLOBAL.requestAnimationFrame,_cancelAnimationFrame,_rafs);

var TimerMixin={
componentWillUnmount:function componentWillUnmount(){
this[_timeouts]&&this[_timeouts].forEach(function(id){
GLOBAL.clearTimeout(id);
});
this[_timeouts]=null;
this[_intervals]&&this[_intervals].forEach(function(id){
GLOBAL.clearInterval(id);
});
this[_intervals]=null;
this[_immediates]&&this[_immediates].forEach(function(id){
GLOBAL.clearImmediate(id);
});
this[_immediates]=null;
this[_rafs]&&this[_rafs].forEach(function(id){
GLOBAL.cancelAnimationFrame(id);
});
this[_rafs]=null;
},

setTimeout:_setTimeout,
clearTimeout:_clearTimeout,

setInterval:_setInterval,
clearInterval:_clearInterval,

setImmediate:_setImmediate,
clearImmediate:_clearImmediate,

requestAnimationFrame:_requestAnimationFrame,
cancelAnimationFrame:_cancelAnimationFrame};


module.exports=TimerMixin;
}, 265, null, "react-timer-mixin/TimerMixin.js");
__d(/* TouchableWithoutFeedback */function(global, require, module, exports) {










'use strict';

var EdgeInsetsPropType=require(121 /* EdgeInsetsPropType */);
var React=require(78 /* React */);
var TimerMixin=require(265 /* react-timer-mixin */);
var Touchable=require(184 /* Touchable */);
var View=require(120 /* View */);

var ensurePositiveDelayProps=require(267 /* ensurePositiveDelayProps */);
var warning=require(15 /* fbjs/lib/warning */);



var PRESS_RETENTION_OFFSET={top:20,left:20,right:20,bottom:30};










var TouchableWithoutFeedback=React.createClass({displayName:'TouchableWithoutFeedback',
mixins:[TimerMixin,Touchable.Mixin],

propTypes:{
accessible:React.PropTypes.bool,
accessibilityComponentType:React.PropTypes.oneOf(View.AccessibilityComponentType),
accessibilityTraits:React.PropTypes.oneOfType([
React.PropTypes.oneOf(View.AccessibilityTraits),
React.PropTypes.arrayOf(React.PropTypes.oneOf(View.AccessibilityTraits))]),




disabled:React.PropTypes.bool,




onPress:React.PropTypes.func,
onPressIn:React.PropTypes.func,
onPressOut:React.PropTypes.func,





onLayout:React.PropTypes.func,

onLongPress:React.PropTypes.func,




delayPressIn:React.PropTypes.number,



delayPressOut:React.PropTypes.number,



delayLongPress:React.PropTypes.number,







pressRetentionOffset:EdgeInsetsPropType,








hitSlop:EdgeInsetsPropType},


getInitialState:function getInitialState(){
return this.touchableGetInitialState();
},

componentDidMount:function componentDidMount(){
ensurePositiveDelayProps(this.props);
},

componentWillReceiveProps:function componentWillReceiveProps(nextProps){
ensurePositiveDelayProps(nextProps);
},





touchableHandlePress:function touchableHandlePress(e){
this.props.onPress&&this.props.onPress(e);
},

touchableHandleActivePressIn:function touchableHandleActivePressIn(e){
this.props.onPressIn&&this.props.onPressIn(e);
},

touchableHandleActivePressOut:function touchableHandleActivePressOut(e){
this.props.onPressOut&&this.props.onPressOut(e);
},

touchableHandleLongPress:function touchableHandleLongPress(e){
this.props.onLongPress&&this.props.onLongPress(e);
},

touchableGetPressRectOffset:function touchableGetPressRectOffset(){
return this.props.pressRetentionOffset||PRESS_RETENTION_OFFSET;
},

touchableGetHitSlop:function touchableGetHitSlop(){
return this.props.hitSlop;
},

touchableGetHighlightDelayMS:function touchableGetHighlightDelayMS(){
return this.props.delayPressIn||0;
},

touchableGetLongPressDelayMS:function touchableGetLongPressDelayMS(){
return this.props.delayLongPress===0?0:
this.props.delayLongPress||500;
},

touchableGetPressOutDelayMS:function touchableGetPressOutDelayMS(){
return this.props.delayPressOut||0;
},

render:function render(){

var child=React.Children.only(this.props.children);
var children=child.props.children;
warning(
!child.type||child.type.displayName!=='Text',
'TouchableWithoutFeedback does not work well with Text children. Wrap children in a View instead. See '+(
child._owner&&child._owner.getName&&child._owner.getName()||'<unknown>'));

if(Touchable.TOUCH_TARGET_DEBUG&&child.type&&child.type.displayName==='View'){
if(!Array.isArray(children)){
children=[children];
}
children.push(Touchable.renderDebugView({color:'red',hitSlop:this.props.hitSlop}));
}
var style=Touchable.TOUCH_TARGET_DEBUG&&child.type&&child.type.displayName==='Text'?
[child.props.style,{color:'red'}]:
child.props.style;
return React.cloneElement(child,{
accessible:this.props.accessible!==false,
accessibilityLabel:this.props.accessibilityLabel,
accessibilityComponentType:this.props.accessibilityComponentType,
accessibilityTraits:this.props.accessibilityTraits,
testID:this.props.testID,
onLayout:this.props.onLayout,
hitSlop:this.props.hitSlop,
onStartShouldSetResponder:this.touchableHandleStartShouldSetResponder,
onResponderTerminationRequest:this.touchableHandleResponderTerminationRequest,
onResponderGrant:this.touchableHandleResponderGrant,
onResponderMove:this.touchableHandleResponderMove,
onResponderRelease:this.touchableHandleResponderRelease,
onResponderTerminate:this.touchableHandleResponderTerminate,
style:style,
children:children});

}});


module.exports=TouchableWithoutFeedback;
}, 266, null, "TouchableWithoutFeedback");
__d(/* ensurePositiveDelayProps */function(global, require, module, exports) {










'use strict';

var invariant=require(26 /* fbjs/lib/invariant */);

var ensurePositiveDelayProps=function ensurePositiveDelayProps(props){
invariant(
!(props.delayPressIn<0||props.delayPressOut<0||
props.delayLongPress<0),
'Touchable components cannot have negative delay properties');

};

module.exports=ensurePositiveDelayProps;
}, 267, null, "ensurePositiveDelayProps");
__d(/* DatePickerIOS */function(global, require, module, exports) {












'use strict';

var NativeMethodsMixin=require(21 /* NativeMethodsMixin */);
var React=require(78 /* React */);
var StyleSheet=require(101 /* StyleSheet */);
var View=require(120 /* View */);

var requireNativeComponent=require(128 /* requireNativeComponent */);

var PropTypes=React.PropTypes;














var DatePickerIOS=React.createClass({displayName:'DatePickerIOS',

_picker:undefined,

mixins:[NativeMethodsMixin],

propTypes:babelHelpers.extends({},
View.propTypes,{



date:PropTypes.instanceOf(Date).isRequired,








onDateChange:PropTypes.func.isRequired,






maximumDate:PropTypes.instanceOf(Date),






minimumDate:PropTypes.instanceOf(Date),




mode:PropTypes.oneOf(['date','time','datetime']),




minuteInterval:PropTypes.oneOf([1,2,3,4,5,6,10,12,15,20,30]),








timeZoneOffsetInMinutes:PropTypes.number}),


getDefaultProps:function getDefaultProps(){
return{
mode:'datetime'};

},

_onChange:function _onChange(event){
var nativeTimeStamp=event.nativeEvent.timestamp;
this.props.onDateChange&&this.props.onDateChange(
new Date(nativeTimeStamp));

this.props.onChange&&this.props.onChange(event);





var propsTimeStamp=this.props.date.getTime();
if(this._picker&&nativeTimeStamp!==propsTimeStamp){
this._picker.setNativeProps({
date:propsTimeStamp});

}
},

render:function render(){var _this=this;
var props=this.props;
return(
React.createElement(View,{style:props.style},
React.createElement(RCTDatePickerIOS,{
ref:function ref(picker){_this._picker=picker;},
style:styles.datePickerIOS,
date:props.date.getTime(),
maximumDate:
props.maximumDate?props.maximumDate.getTime():undefined,

minimumDate:
props.minimumDate?props.minimumDate.getTime():undefined,

mode:props.mode,
minuteInterval:props.minuteInterval,
timeZoneOffsetInMinutes:props.timeZoneOffsetInMinutes,
onChange:this._onChange,
onStartShouldSetResponder:function onStartShouldSetResponder(){return true;},
onResponderTerminationRequest:function onResponderTerminationRequest(){return false;}})));



}});


var styles=StyleSheet.create({
datePickerIOS:{
height:216}});



var RCTDatePickerIOS=requireNativeComponent('RCTDatePicker',{
propTypes:babelHelpers.extends({},
DatePickerIOS.propTypes,{
date:PropTypes.number,
minimumDate:PropTypes.number,
maximumDate:PropTypes.number,
onDateChange:function onDateChange(){return null;},
onChange:PropTypes.func})});



module.exports=DatePickerIOS;
}, 268, null, "DatePickerIOS");
__d(/* DrawerLayoutAndroid */function(global, require, module, exports) {









'use strict';

module.exports=require(129 /* UnimplementedView */);
}, 269, null, "DrawerLayoutAndroid");
__d(/* ImageEditor */function(global, require, module, exports) {










'use strict';

var RCTImageEditingManager=require(29 /* NativeModules */).ImageEditingManager;var




































ImageEditor=function(){function ImageEditor(){babelHelpers.classCallCheck(this,ImageEditor);}babelHelpers.createClass(ImageEditor,null,[{key:'cropImage',value:function cropImage(











uri,
cropData,
success,
failure)
{
RCTImageEditingManager.cropImage(uri,cropData,success,failure);
}}]);return ImageEditor;}();


module.exports=ImageEditor;
}, 270, null, "ImageEditor");
__d(/* ImageStore */function(global, require, module, exports) {










'use strict';

var RCTImageStoreManager=require(29 /* NativeModules */).ImageStoreManager;var

ImageStore=function(){function ImageStore(){babelHelpers.classCallCheck(this,ImageStore);}babelHelpers.createClass(ImageStore,null,[{key:'hasImageForTag',value:function hasImageForTag(




uri,callback){
if(RCTImageStoreManager.hasImageForTag){
RCTImageStoreManager.hasImageForTag(uri,callback);
}else{
console.warn('hasImageForTag() not implemented');
}
}},{key:'removeImageForTag',value:function removeImageForTag(









uri){
if(RCTImageStoreManager.removeImageForTag){
RCTImageStoreManager.removeImageForTag(uri);
}else{
console.warn('removeImageForTag() not implemented');
}
}},{key:'addImageFromBase64',value:function addImageFromBase64(













base64ImageData,
success,
failure)
{
RCTImageStoreManager.addImageFromBase64(base64ImageData,success,failure);
}},{key:'getBase64ForTag',value:function getBase64ForTag(













uri,
success,
failure)
{
RCTImageStoreManager.getBase64ForTag(uri,success,failure);
}}]);return ImageStore;}();


module.exports=ImageStore;
}, 271, null, "ImageStore");
__d(/* KeyboardAvoidingView */function(global, require, module, exports) {










'use strict';

var Keyboard=require(62 /* Keyboard */);
var LayoutAnimation=require(273 /* LayoutAnimation */);
var Platform=require(28 /* Platform */);
var React=require(78 /* React */);
var TimerMixin=require(265 /* react-timer-mixin */);
var View=require(120 /* View */);

var PropTypes=React.PropTypes;



























var viewRef='VIEW';





var KeyboardAvoidingView=React.createClass({displayName:'KeyboardAvoidingView',
mixins:[TimerMixin],

propTypes:babelHelpers.extends({},
View.propTypes,{
behavior:PropTypes.oneOf(['height','position','padding']),




contentContainerStyle:View.propTypes.style,





keyboardVerticalOffset:PropTypes.number.isRequired}),


getDefaultProps:function getDefaultProps(){
return{
keyboardVerticalOffset:0};

},

getInitialState:function getInitialState(){
return{
bottom:0};

},

subscriptions:[],
frame:null,

relativeKeyboardHeight:function relativeKeyboardHeight(keyboardFrame){
var frame=this.frame;
if(!frame||!keyboardFrame){
return 0;
}

var y1=Math.max(frame.y,keyboardFrame.screenY-this.props.keyboardVerticalOffset);
var y2=Math.min(frame.y+frame.height,keyboardFrame.screenY+keyboardFrame.height-this.props.keyboardVerticalOffset);
if(frame.y>keyboardFrame.screenY){
return frame.y+frame.height-keyboardFrame.screenY-this.props.keyboardVerticalOffset;
}
return Math.max(y2-y1,0);
},

onKeyboardChange:function onKeyboardChange(event){
if(!event){
this.setState({bottom:0});
return;
}var

duration=event.duration,easing=event.easing,endCoordinates=event.endCoordinates;
var height=this.relativeKeyboardHeight(endCoordinates);

if(duration&&easing){
LayoutAnimation.configureNext({
duration:duration,
update:{
duration:duration,
type:LayoutAnimation.Types[easing]||'keyboard'}});


}
this.setState({bottom:height});
},

onLayout:function onLayout(event){
this.frame=event.nativeEvent.layout;
},

componentWillUpdate:function componentWillUpdate(nextProps,nextState,nextContext){
if(nextState.bottom===this.state.bottom&&
this.props.behavior==='height'&&
nextProps.behavior==='height'){


nextState.bottom=0;
}
},

componentWillMount:function componentWillMount(){
if(Platform.OS==='ios'){
this.subscriptions=[
Keyboard.addListener('keyboardWillChangeFrame',this.onKeyboardChange)];

}else{
this.subscriptions=[
Keyboard.addListener('keyboardDidHide',this.onKeyboardChange),
Keyboard.addListener('keyboardDidShow',this.onKeyboardChange)];

}
},

componentWillUnmount:function componentWillUnmount(){
this.subscriptions.forEach(function(sub){return sub.remove();});
},

render:function render(){var _props=
this.props,behavior=_props.behavior,children=_props.children,style=_props.style,props=babelHelpers.objectWithoutProperties(_props,['behavior','children','style']);

switch(behavior){
case'height':
var heightStyle=void 0;
if(this.frame){




heightStyle={height:this.frame.height-this.state.bottom,flex:0};
}
return(
React.createElement(View,babelHelpers.extends({ref:viewRef,style:[style,heightStyle],onLayout:this.onLayout},props),
children));



case'position':
var positionStyle={bottom:this.state.bottom};var
contentContainerStyle=this.props.contentContainerStyle;

return(
React.createElement(View,babelHelpers.extends({ref:viewRef,style:style,onLayout:this.onLayout},props),
React.createElement(View,{style:[contentContainerStyle,positionStyle]},
children)));




case'padding':
var paddingStyle={paddingBottom:this.state.bottom};
return(
React.createElement(View,babelHelpers.extends({ref:viewRef,style:[style,paddingStyle],onLayout:this.onLayout},props),
children));



default:
return(
React.createElement(View,babelHelpers.extends({ref:viewRef,onLayout:this.onLayout,style:style},props),
children));}



}});


module.exports=KeyboardAvoidingView;
}, 272, null, "KeyboardAvoidingView");
__d(/* LayoutAnimation */function(global, require, module, exports) {










'use strict';var _require=

require(78 /* React */),PropTypes=_require.PropTypes;
var UIManager=require(75 /* UIManager */);

var createStrictShapeTypeChecker=require(122 /* createStrictShapeTypeChecker */);
var keyMirror=require(107 /* fbjs/lib/keyMirror */);

var TypesEnum={
spring:true,
linear:true,
easeInEaseOut:true,
easeIn:true,
easeOut:true,
keyboard:true};

var Types=keyMirror(TypesEnum);

var PropertiesEnum={
opacity:true,
scaleXY:true};

var Properties=keyMirror(PropertiesEnum);

var animChecker=createStrictShapeTypeChecker({
duration:PropTypes.number,
delay:PropTypes.number,
springDamping:PropTypes.number,
initialVelocity:PropTypes.number,
type:PropTypes.oneOf(
Object.keys(Types)).
isRequired,
property:PropTypes.oneOf(
Object.keys(Properties))});












var configChecker=createStrictShapeTypeChecker({
duration:PropTypes.number.isRequired,
create:animChecker,
update:animChecker,
delete:animChecker});









function configureNext(config,onAnimationDidEnd){
configChecker({config:config},'config','LayoutAnimation.configureNext');
UIManager.configureNextLayoutAnimation(
config,onAnimationDidEnd||function(){},function(){});

}

function create(duration,type,creationProp){
return{
duration:duration,
create:{
type:type,
property:creationProp},

update:{
type:type},

delete:{
type:type,
property:creationProp}};


}

var Presets={
easeInEaseOut:create(
300,Types.easeInEaseOut,Properties.opacity),

linear:create(
500,Types.linear,Properties.opacity),

spring:{
duration:700,
create:{
type:Types.linear,
property:Properties.opacity},

update:{
type:Types.spring,
springDamping:0.4},

delete:{
type:Types.linear,
property:Properties.opacity}}};














var LayoutAnimation={














configureNext:configureNext,



create:create,
Types:Types,
Properties:Properties,
configChecker:configChecker,
Presets:Presets,
easeInEaseOut:configureNext.bind(
null,Presets.easeInEaseOut),

linear:configureNext.bind(
null,Presets.linear),

spring:configureNext.bind(
null,Presets.spring)};



module.exports=LayoutAnimation;
}, 273, null, "LayoutAnimation");
__d(/* ListView */function(global, require, module, exports) {































'use strict';

var ListViewDataSource=require(275 /* ListViewDataSource */);
var React=require(78 /* React */);
var ReactNative=require(213 /* ReactNative */);
var RCTScrollViewManager=require(29 /* NativeModules */).ScrollViewManager;
var ScrollView=require(211 /* ScrollView */);
var ScrollResponder=require(262 /* ScrollResponder */);
var StaticRenderer=require(277 /* StaticRenderer */);
var TimerMixin=require(265 /* react-timer-mixin */);

var cloneReferencedElement=require(278 /* react-clone-referenced-element */);
var isEmpty=require(276 /* isEmpty */);
var merge=require(123 /* merge */);

var PropTypes=React.PropTypes;

var DEFAULT_PAGE_SIZE=1;
var DEFAULT_INITIAL_ROWS=10;
var DEFAULT_SCROLL_RENDER_AHEAD=1000;
var DEFAULT_END_REACHED_THRESHOLD=1000;
var DEFAULT_SCROLL_CALLBACK_THROTTLE=50;





















































var ListView=React.createClass({displayName:'ListView',
_childFrames:[],
_sentEndForContentLength:null,
_scrollComponent:null,
_prevRenderedRowsCount:0,
_visibleRows:{},
scrollProperties:{},

mixins:[ScrollResponder.Mixin,TimerMixin],

statics:{
DataSource:ListViewDataSource},









propTypes:babelHelpers.extends({},
ScrollView.propTypes,{



dataSource:PropTypes.instanceOf(ListViewDataSource).isRequired,








renderSeparator:PropTypes.func,












renderRow:PropTypes.func.isRequired,





initialListSize:PropTypes.number.isRequired,





onEndReached:PropTypes.func,



onEndReachedThreshold:PropTypes.number.isRequired,







pageSize:PropTypes.number.isRequired,








renderFooter:PropTypes.func,
renderHeader:PropTypes.func,











renderSectionHeader:PropTypes.func,






renderScrollComponent:React.PropTypes.func.isRequired,




scrollRenderAheadDistance:React.PropTypes.number.isRequired,









onChangeVisibleRows:React.PropTypes.func,





removeClippedSubviews:React.PropTypes.bool,








stickyHeaderIndices:PropTypes.arrayOf(PropTypes.number).isRequired,





enableEmptySections:PropTypes.bool}),





getMetrics:function getMetrics(){
return{
contentLength:this.scrollProperties.contentLength,
totalRows:this.props.enableEmptySections?this.props.dataSource.getRowAndSectionCount():this.props.dataSource.getRowCount(),
renderedRows:this.state.curRenderedRowsCount,
visibleRows:Object.keys(this._visibleRows).length};

},






getScrollResponder:function getScrollResponder(){
if(this._scrollComponent&&this._scrollComponent.getScrollResponder){
return this._scrollComponent.getScrollResponder();
}
},






scrollTo:function scrollTo(){
if(this._scrollComponent&&this._scrollComponent.scrollTo){var _scrollComponent;
(_scrollComponent=this._scrollComponent).scrollTo.apply(_scrollComponent,arguments);
}
},

setNativeProps:function setNativeProps(props){
if(this._scrollComponent){
this._scrollComponent.setNativeProps(props);
}
},





getDefaultProps:function getDefaultProps(){
return{
initialListSize:DEFAULT_INITIAL_ROWS,
pageSize:DEFAULT_PAGE_SIZE,
renderScrollComponent:function renderScrollComponent(props){return React.createElement(ScrollView,props);},
scrollRenderAheadDistance:DEFAULT_SCROLL_RENDER_AHEAD,
onEndReachedThreshold:DEFAULT_END_REACHED_THRESHOLD,
stickyHeaderIndices:[]};

},

getInitialState:function getInitialState(){
return{
curRenderedRowsCount:this.props.initialListSize,
highlightedRow:{}};

},

getInnerViewNode:function getInnerViewNode(){
return this._scrollComponent.getInnerViewNode();
},

componentWillMount:function componentWillMount(){

this.scrollProperties={
visibleLength:null,
contentLength:null,
offset:0};

this._childFrames=[];
this._visibleRows={};
this._prevRenderedRowsCount=0;
this._sentEndForContentLength=null;
},

componentDidMount:function componentDidMount(){var _this=this;


this.requestAnimationFrame(function(){
_this._measureAndUpdateScrollProps();
});
},

componentWillReceiveProps:function componentWillReceiveProps(nextProps){var _this2=this;
if(this.props.dataSource!==nextProps.dataSource||
this.props.initialListSize!==nextProps.initialListSize){
this.setState(function(state,props){
_this2._prevRenderedRowsCount=0;
return{
curRenderedRowsCount:Math.min(
Math.max(
state.curRenderedRowsCount,
props.initialListSize),

props.enableEmptySections?props.dataSource.getRowAndSectionCount():props.dataSource.getRowCount())};


},function(){return _this2._renderMoreRowsIfNeeded();});
}
},

componentDidUpdate:function componentDidUpdate(){var _this3=this;
this.requestAnimationFrame(function(){
_this3._measureAndUpdateScrollProps();
});
},

_onRowHighlighted:function _onRowHighlighted(sectionID,rowID){
this.setState({highlightedRow:{sectionID:sectionID,rowID:rowID}});
},

render:function render(){
var bodyComponents=[];

var dataSource=this.props.dataSource;
var allRowIDs=dataSource.rowIdentities;
var rowCount=0;
var sectionHeaderIndices=[];

var header=this.props.renderHeader&&this.props.renderHeader();
var footer=this.props.renderFooter&&this.props.renderFooter();
var totalIndex=header?1:0;

for(var sectionIdx=0;sectionIdx<allRowIDs.length;sectionIdx++){
var sectionID=dataSource.sectionIdentities[sectionIdx];
var rowIDs=allRowIDs[sectionIdx];
if(rowIDs.length===0){
if(this.props.enableEmptySections===undefined){
var warning=require(15 /* fbjs/lib/warning */);
warning(false,'In next release empty section headers will be rendered.'+
' In this release you can use \'enableEmptySections\' flag to render empty section headers.');
continue;
}else{
var invariant=require(26 /* fbjs/lib/invariant */);
invariant(
this.props.enableEmptySections,
'In next release \'enableEmptySections\' flag will be deprecated, empty section headers will always be rendered.'+
' If empty section headers are not desirable their indices should be excluded from sectionIDs object.'+
' In this release \'enableEmptySections\' may only have value \'true\' to allow empty section headers rendering.');
}
}

if(this.props.renderSectionHeader){
var shouldUpdateHeader=rowCount>=this._prevRenderedRowsCount&&
dataSource.sectionHeaderShouldUpdate(sectionIdx);
bodyComponents.push(
React.createElement(StaticRenderer,{
key:'s_'+sectionID,
shouldUpdate:!!shouldUpdateHeader,
render:this.props.renderSectionHeader.bind(
null,
dataSource.getSectionHeaderData(sectionIdx),
sectionID)}));



sectionHeaderIndices.push(totalIndex++);
}

for(var rowIdx=0;rowIdx<rowIDs.length;rowIdx++){
var rowID=rowIDs[rowIdx];
var comboID=sectionID+'_'+rowID;
var shouldUpdateRow=rowCount>=this._prevRenderedRowsCount&&
dataSource.rowShouldUpdate(sectionIdx,rowIdx);
var row=
React.createElement(StaticRenderer,{
key:'r_'+comboID,
shouldUpdate:!!shouldUpdateRow,
render:this.props.renderRow.bind(
null,
dataSource.getRowData(sectionIdx,rowIdx),
sectionID,
rowID,
this._onRowHighlighted)});


bodyComponents.push(row);
totalIndex++;

if(this.props.renderSeparator&&(
rowIdx!==rowIDs.length-1||sectionIdx===allRowIDs.length-1)){
var adjacentRowHighlighted=
this.state.highlightedRow.sectionID===sectionID&&(
this.state.highlightedRow.rowID===rowID||
this.state.highlightedRow.rowID===rowIDs[rowIdx+1]);

var separator=this.props.renderSeparator(
sectionID,
rowID,
adjacentRowHighlighted);

if(separator){
bodyComponents.push(separator);
totalIndex++;
}
}
if(++rowCount===this.state.curRenderedRowsCount){
break;
}
}
if(rowCount>=this.state.curRenderedRowsCount){
break;
}
}var _props=




this.props,renderScrollComponent=_props.renderScrollComponent,props=babelHelpers.objectWithoutProperties(_props,['renderScrollComponent']);
if(!props.scrollEventThrottle){
props.scrollEventThrottle=DEFAULT_SCROLL_CALLBACK_THROTTLE;
}
if(props.removeClippedSubviews===undefined){
props.removeClippedSubviews=true;
}
babelHelpers.extends(props,{
onScroll:this._onScroll,
stickyHeaderIndices:this.props.stickyHeaderIndices.concat(sectionHeaderIndices),



onKeyboardWillShow:undefined,
onKeyboardWillHide:undefined,
onKeyboardDidShow:undefined,
onKeyboardDidHide:undefined});


return cloneReferencedElement(renderScrollComponent(props),{
ref:this._setScrollComponentRef,
onContentSizeChange:this._onContentSizeChange,
onLayout:this._onLayout},
header,bodyComponents,footer);
},





_measureAndUpdateScrollProps:function _measureAndUpdateScrollProps(){
var scrollComponent=this.getScrollResponder();
if(!scrollComponent||!scrollComponent.getInnerViewNode){
return;
}



RCTScrollViewManager&&RCTScrollViewManager.calculateChildFrames&&
RCTScrollViewManager.calculateChildFrames(
ReactNative.findNodeHandle(scrollComponent),
this._updateVisibleRows);

},

_setScrollComponentRef:function _setScrollComponentRef(scrollComponent){
this._scrollComponent=scrollComponent;
},

_onContentSizeChange:function _onContentSizeChange(width,height){
var contentLength=!this.props.horizontal?height:width;
if(contentLength!==this.scrollProperties.contentLength){
this.scrollProperties.contentLength=contentLength;
this._updateVisibleRows();
this._renderMoreRowsIfNeeded();
}
this.props.onContentSizeChange&&this.props.onContentSizeChange(width,height);
},

_onLayout:function _onLayout(event){var _event$nativeEvent$la=
event.nativeEvent.layout,width=_event$nativeEvent$la.width,height=_event$nativeEvent$la.height;
var visibleLength=!this.props.horizontal?height:width;
if(visibleLength!==this.scrollProperties.visibleLength){
this.scrollProperties.visibleLength=visibleLength;
this._updateVisibleRows();
this._renderMoreRowsIfNeeded();
}
this.props.onLayout&&this.props.onLayout(event);
},

_maybeCallOnEndReached:function _maybeCallOnEndReached(event){
if(this.props.onEndReached&&
this.scrollProperties.contentLength!==this._sentEndForContentLength&&
this._getDistanceFromEnd(this.scrollProperties)<this.props.onEndReachedThreshold&&
this.state.curRenderedRowsCount===(this.props.enableEmptySections?this.props.dataSource.getRowAndSectionCount():this.props.dataSource.getRowCount())){
this._sentEndForContentLength=this.scrollProperties.contentLength;
this.props.onEndReached(event);
return true;
}
return false;
},

_renderMoreRowsIfNeeded:function _renderMoreRowsIfNeeded(){
if(this.scrollProperties.contentLength===null||
this.scrollProperties.visibleLength===null||
this.state.curRenderedRowsCount===(this.props.enableEmptySections?this.props.dataSource.getRowAndSectionCount():this.props.dataSource.getRowCount())){
this._maybeCallOnEndReached();
return;
}

var distanceFromEnd=this._getDistanceFromEnd(this.scrollProperties);
if(distanceFromEnd<this.props.scrollRenderAheadDistance){
this._pageInNewRows();
}
},

_pageInNewRows:function _pageInNewRows(){var _this4=this;
this.setState(function(state,props){
var rowsToRender=Math.min(
state.curRenderedRowsCount+props.pageSize,
props.enableEmptySections?props.dataSource.getRowAndSectionCount():props.dataSource.getRowCount());

_this4._prevRenderedRowsCount=state.curRenderedRowsCount;
return{
curRenderedRowsCount:rowsToRender};

},function(){
_this4._measureAndUpdateScrollProps();
_this4._prevRenderedRowsCount=_this4.state.curRenderedRowsCount;
});
},

_getDistanceFromEnd:function _getDistanceFromEnd(scrollProperties){
return scrollProperties.contentLength-scrollProperties.visibleLength-scrollProperties.offset;
},

_updateVisibleRows:function _updateVisibleRows(updatedFrames){var _this5=this;
if(!this.props.onChangeVisibleRows){
return;
}
if(updatedFrames){
updatedFrames.forEach(function(newFrame){
_this5._childFrames[newFrame.index]=merge(newFrame);
});
}
var isVertical=!this.props.horizontal;
var dataSource=this.props.dataSource;
var visibleMin=this.scrollProperties.offset;
var visibleMax=visibleMin+this.scrollProperties.visibleLength;
var allRowIDs=dataSource.rowIdentities;

var header=this.props.renderHeader&&this.props.renderHeader();
var totalIndex=header?1:0;
var visibilityChanged=false;
var changedRows={};
for(var sectionIdx=0;sectionIdx<allRowIDs.length;sectionIdx++){
var rowIDs=allRowIDs[sectionIdx];
if(rowIDs.length===0){
continue;
}
var sectionID=dataSource.sectionIdentities[sectionIdx];
if(this.props.renderSectionHeader){
totalIndex++;
}
var visibleSection=this._visibleRows[sectionID];
if(!visibleSection){
visibleSection={};
}
for(var rowIdx=0;rowIdx<rowIDs.length;rowIdx++){
var rowID=rowIDs[rowIdx];
var frame=this._childFrames[totalIndex];
totalIndex++;
if(this.props.renderSeparator&&(
rowIdx!==rowIDs.length-1||sectionIdx===allRowIDs.length-1)){
totalIndex++;
}
if(!frame){
break;
}
var rowVisible=visibleSection[rowID];
var min=isVertical?frame.y:frame.x;
var max=min+(isVertical?frame.height:frame.width);
if(!min&&!max||min===max){
break;
}
if(min>visibleMax||max<visibleMin){
if(rowVisible){
visibilityChanged=true;
delete visibleSection[rowID];
if(!changedRows[sectionID]){
changedRows[sectionID]={};
}
changedRows[sectionID][rowID]=false;
}
}else if(!rowVisible){
visibilityChanged=true;
visibleSection[rowID]=true;
if(!changedRows[sectionID]){
changedRows[sectionID]={};
}
changedRows[sectionID][rowID]=true;
}
}
if(!isEmpty(visibleSection)){
this._visibleRows[sectionID]=visibleSection;
}else if(this._visibleRows[sectionID]){
delete this._visibleRows[sectionID];
}
}
visibilityChanged&&this.props.onChangeVisibleRows(this._visibleRows,changedRows);
},

_onScroll:function _onScroll(e){
var isVertical=!this.props.horizontal;
this.scrollProperties.visibleLength=e.nativeEvent.layoutMeasurement[
isVertical?'height':'width'];

this.scrollProperties.contentLength=e.nativeEvent.contentSize[
isVertical?'height':'width'];

this.scrollProperties.offset=e.nativeEvent.contentOffset[
isVertical?'y':'x'];

this._updateVisibleRows(e.nativeEvent.updatedChildFrames);
if(!this._maybeCallOnEndReached(e)){
this._renderMoreRowsIfNeeded();
}

if(this.props.onEndReached&&
this._getDistanceFromEnd(this.scrollProperties)>this.props.onEndReachedThreshold){

this._sentEndForContentLength=null;
}

this.props.onScroll&&this.props.onScroll(e);
}});


module.exports=ListView;
}, 274, null, "ListView");
__d(/* ListViewDataSource */function(global, require, module, exports) {


























'use strict';

var invariant=require(26 /* fbjs/lib/invariant */);
var isEmpty=require(276 /* isEmpty */);
var warning=require(15 /* fbjs/lib/warning */);

function defaultGetRowData(
dataBlob,
sectionID,
rowID)
{
return dataBlob[sectionID][rowID];
}

function defaultGetSectionHeaderData(
dataBlob,
sectionID)
{
return dataBlob[sectionID];
}var












































ListViewDataSource=function(){


























function ListViewDataSource(params){babelHelpers.classCallCheck(this,ListViewDataSource);
invariant(
params&&typeof params.rowHasChanged==='function',
'Must provide a rowHasChanged function.');

this._rowHasChanged=params.rowHasChanged;
this._getRowData=params.getRowData||defaultGetRowData;
this._sectionHeaderHasChanged=params.sectionHeaderHasChanged;
this._getSectionHeaderData=
params.getSectionHeaderData||defaultGetSectionHeaderData;

this._dataBlob=null;
this._dirtyRows=[];
this._dirtySections=[];
this._cachedRowCount=0;



this.rowIdentities=[];
this.sectionIdentities=[];
}babelHelpers.createClass(ListViewDataSource,[{key:'cloneWithRows',value:function cloneWithRows(


















dataBlob,
rowIdentities)
{
var rowIds=rowIdentities?[rowIdentities]:null;
if(!this._sectionHeaderHasChanged){
this._sectionHeaderHasChanged=function(){return false;};
}
return this.cloneWithRowsAndSections({s1:dataBlob},['s1'],rowIds);
}},{key:'cloneWithRowsAndSections',value:function cloneWithRowsAndSections(













dataBlob,
sectionIdentities,
rowIdentities)
{
invariant(
typeof this._sectionHeaderHasChanged==='function',
'Must provide a sectionHeaderHasChanged function with section data.');

invariant(
!sectionIdentities||!rowIdentities||sectionIdentities.length===rowIdentities.length,
'row and section ids lengths must be the same');


var newSource=new ListViewDataSource({
getRowData:this._getRowData,
getSectionHeaderData:this._getSectionHeaderData,
rowHasChanged:this._rowHasChanged,
sectionHeaderHasChanged:this._sectionHeaderHasChanged});

newSource._dataBlob=dataBlob;
if(sectionIdentities){
newSource.sectionIdentities=sectionIdentities;
}else{
newSource.sectionIdentities=Object.keys(dataBlob);
}
if(rowIdentities){
newSource.rowIdentities=rowIdentities;
}else{
newSource.rowIdentities=[];
newSource.sectionIdentities.forEach(function(sectionID){
newSource.rowIdentities.push(Object.keys(dataBlob[sectionID]));
});
}
newSource._cachedRowCount=countRows(newSource.rowIdentities);

newSource._calculateDirtyArrays(
this._dataBlob,
this.sectionIdentities,
this.rowIdentities);


return newSource;
}},{key:'getRowCount',value:function getRowCount()

{
return this._cachedRowCount;
}},{key:'getRowAndSectionCount',value:function getRowAndSectionCount()

{
return this._cachedRowCount+this.sectionIdentities.length;
}},{key:'rowShouldUpdate',value:function rowShouldUpdate(




sectionIndex,rowIndex){
var needsUpdate=this._dirtyRows[sectionIndex][rowIndex];
warning(needsUpdate!==undefined,
'missing dirtyBit for section, row: '+sectionIndex+', '+rowIndex);
return needsUpdate;
}},{key:'getRowData',value:function getRowData(




sectionIndex,rowIndex){
var sectionID=this.sectionIdentities[sectionIndex];
var rowID=this.rowIdentities[sectionIndex][rowIndex];
warning(
sectionID!==undefined&&rowID!==undefined,
'rendering invalid section, row: '+sectionIndex+', '+rowIndex);

return this._getRowData(this._dataBlob,sectionID,rowID);
}},{key:'getRowIDForFlatIndex',value:function getRowIDForFlatIndex(





index){
var accessIndex=index;
for(var ii=0;ii<this.sectionIdentities.length;ii++){
if(accessIndex>=this.rowIdentities[ii].length){
accessIndex-=this.rowIdentities[ii].length;
}else{
return this.rowIdentities[ii][accessIndex];
}
}
return null;
}},{key:'getSectionIDForFlatIndex',value:function getSectionIDForFlatIndex(





index){
var accessIndex=index;
for(var ii=0;ii<this.sectionIdentities.length;ii++){
if(accessIndex>=this.rowIdentities[ii].length){
accessIndex-=this.rowIdentities[ii].length;
}else{
return this.sectionIdentities[ii];
}
}
return null;
}},{key:'getSectionLengths',value:function getSectionLengths()




{
var results=[];
for(var ii=0;ii<this.sectionIdentities.length;ii++){
results.push(this.rowIdentities[ii].length);
}
return results;
}},{key:'sectionHeaderShouldUpdate',value:function sectionHeaderShouldUpdate(




sectionIndex){
var needsUpdate=this._dirtySections[sectionIndex];
warning(needsUpdate!==undefined,
'missing dirtyBit for section: '+sectionIndex);
return needsUpdate;
}},{key:'getSectionHeaderData',value:function getSectionHeaderData(




sectionIndex){
if(!this._getSectionHeaderData){
return null;
}
var sectionID=this.sectionIdentities[sectionIndex];
warning(sectionID!==undefined,
'renderSection called on invalid section: '+sectionIndex);
return this._getSectionHeaderData(this._dataBlob,sectionID);
}},{key:'_calculateDirtyArrays',value:function _calculateDirtyArrays(





















prevDataBlob,
prevSectionIDs,
prevRowIDs)
{

var prevSectionsHash=keyedDictionaryFromArray(prevSectionIDs);
var prevRowsHash={};
for(var ii=0;ii<prevRowIDs.length;ii++){
var sectionID=prevSectionIDs[ii];
warning(
!prevRowsHash[sectionID],
'SectionID appears more than once: '+sectionID);

prevRowsHash[sectionID]=keyedDictionaryFromArray(prevRowIDs[ii]);
}


this._dirtySections=[];
this._dirtyRows=[];

var dirty;
for(var sIndex=0;sIndex<this.sectionIdentities.length;sIndex++){
var sectionID=this.sectionIdentities[sIndex];

dirty=!prevSectionsHash[sectionID];
var sectionHeaderHasChanged=this._sectionHeaderHasChanged;
if(!dirty&&sectionHeaderHasChanged){
dirty=sectionHeaderHasChanged(
this._getSectionHeaderData(prevDataBlob,sectionID),
this._getSectionHeaderData(this._dataBlob,sectionID));

}
this._dirtySections.push(!!dirty);

this._dirtyRows[sIndex]=[];
for(var rIndex=0;rIndex<this.rowIdentities[sIndex].length;rIndex++){
var rowID=this.rowIdentities[sIndex][rIndex];

dirty=
!prevSectionsHash[sectionID]||
!prevRowsHash[sectionID][rowID]||
this._rowHasChanged(
this._getRowData(prevDataBlob,sectionID,rowID),
this._getRowData(this._dataBlob,sectionID,rowID));

this._dirtyRows[sIndex].push(!!dirty);
}
}
}}]);return ListViewDataSource;}();


function countRows(allRowIDs){
var totalRows=0;
for(var sectionIdx=0;sectionIdx<allRowIDs.length;sectionIdx++){
var rowIDs=allRowIDs[sectionIdx];
totalRows+=rowIDs.length;
}
return totalRows;
}

function keyedDictionaryFromArray(arr){
if(isEmpty(arr)){
return{};
}
var result={};
for(var ii=0;ii<arr.length;ii++){
var key=arr[ii];
warning(!result[key],'Value appears more than once in array: '+key);
result[key]=true;
}
return result;
}


module.exports=ListViewDataSource;
}, 275, null, "ListViewDataSource");
__d(/* isEmpty */function(global, require, module, exports) {









'use strict';




function isEmpty(obj){
if(Array.isArray(obj)){
return obj.length===0;
}else if(typeof obj==='object'){
for(var i in obj){
return false;
}
return true;
}else{
return!obj;
}
}

module.exports=isEmpty;
}, 276, null, "isEmpty");
__d(/* StaticRenderer */function(global, require, module, exports) {










'use strict';

var React=require(78 /* React */);var

StaticRenderer=function(_React$Component){babelHelpers.inherits(StaticRenderer,_React$Component);function StaticRenderer(){babelHelpers.classCallCheck(this,StaticRenderer);return babelHelpers.possibleConstructorReturn(this,(StaticRenderer.__proto__||Object.getPrototypeOf(StaticRenderer)).apply(this,arguments));}babelHelpers.createClass(StaticRenderer,[{key:'shouldComponentUpdate',value:function shouldComponentUpdate(










nextProps){
return nextProps.shouldUpdate;
}},{key:'render',value:function render()

{
return this.props.render();
}}]);return StaticRenderer;}(React.Component);StaticRenderer.propTypes={shouldUpdate:React.PropTypes.bool.isRequired,render:React.PropTypes.func.isRequired};


module.exports=StaticRenderer;
}, 277, null, "StaticRenderer");
__d(/* react-clone-referenced-element/cloneReferencedElement.js */function(global, require, module, exports) {'use strict';

var React=require(279 /* react */);

function cloneReferencedElement(element,config){
var cloneRef=config.ref;
var originalRef=element.ref;for(var _len=arguments.length,children=Array(_len>2?_len-2:0),_key=2;_key<_len;_key++){children[_key-2]=arguments[_key];}
if(originalRef==null||cloneRef==null){
return React.cloneElement.apply(React,[element,config].concat(children));
}

if(typeof originalRef!=='function'){
if(__DEV__){
console.warn(
'Cloning an element with a ref that will be overwritten because it '+
'is not a function. Use a composable callback-style ref instead. '+
'Ignoring ref: '+originalRef);

}
return React.cloneElement.apply(React,[element,config].concat(children));
}

return React.cloneElement.apply(React,[element,babelHelpers.extends({},
config,{
ref:function ref(component){
cloneRef(component);
originalRef(component);
}})].concat(
children));
}

module.exports=cloneReferencedElement;
}, 278, null, "react-clone-referenced-element/cloneReferencedElement.js");
__d(/* react/react.js */function(global, require, module, exports) {'use strict';

module.exports=require(79 /* ./lib/React */);
}, 279, null, "react/react.js");
__d(/* MapView */function(global, require, module, exports) {










'use strict';

var ColorPropType=require(18 /* ColorPropType */);
var EdgeInsetsPropType=require(121 /* EdgeInsetsPropType */);
var Image=require(209 /* Image */);
var NativeMethodsMixin=require(21 /* NativeMethodsMixin */);
var React=require(78 /* React */);
var StyleSheet=require(101 /* StyleSheet */);
var View=require(120 /* View */);

var deprecatedPropType=require(111 /* deprecatedPropType */);
var processColor=require(73 /* processColor */);
var resolveAssetSource=require(171 /* resolveAssetSource */);
var requireNativeComponent=require(128 /* requireNativeComponent */);




























































var MapView=React.createClass({displayName:'MapView',

componentWillMount:function componentWillMount(){
console.warn(
'MapView is now deprecated and will be removed from React Native in version 0.42. '+
'Please use the react-native-maps module which is more feature complete '+
'and works on Android too: https://github.com/airbnb/react-native-maps\n'+
'It is actively maintained and used extensively.\n\n'+
'Once MapView is removed from React Native in v0.42, we will release the '+
'code as deprecated-react-native-ios-mapview. You will be able to '+
'continue using that and migrate to react-native-maps your own pace later.\n\n'+
'For more info, check out https://github.com/facebook/react-native/pull/10500');

},

mixins:[NativeMethodsMixin],

propTypes:babelHelpers.extends({},
View.propTypes,{



style:View.propTypes.style,








showsUserLocation:React.PropTypes.bool,






followUserLocation:React.PropTypes.bool,





showsPointsOfInterest:React.PropTypes.bool,





showsCompass:React.PropTypes.bool,






showsAnnotationCallouts:React.PropTypes.bool,





zoomEnabled:React.PropTypes.bool,










rotateEnabled:React.PropTypes.bool,










pitchEnabled:React.PropTypes.bool,





scrollEnabled:React.PropTypes.bool,








mapType:React.PropTypes.oneOf([
'standard',
'satellite',
'hybrid']),








region:React.PropTypes.shape({



latitude:React.PropTypes.number.isRequired,
longitude:React.PropTypes.number.isRequired,





latitudeDelta:React.PropTypes.number,
longitudeDelta:React.PropTypes.number}),





annotations:React.PropTypes.arrayOf(React.PropTypes.shape({



latitude:React.PropTypes.number.isRequired,
longitude:React.PropTypes.number.isRequired,




animateDrop:React.PropTypes.bool,




draggable:React.PropTypes.bool,




onDragStateChange:React.PropTypes.func,





onFocus:React.PropTypes.func,





onBlur:React.PropTypes.func,




title:React.PropTypes.string,
subtitle:React.PropTypes.string,




leftCalloutView:React.PropTypes.element,
rightCalloutView:React.PropTypes.element,
detailCalloutView:React.PropTypes.element,










tintColor:ColorPropType,




image:Image.propTypes.source,




view:React.PropTypes.element,




id:React.PropTypes.string,




hasLeftCallout:deprecatedPropType(
React.PropTypes.bool,
'Use `leftCalloutView` instead.'),

hasRightCallout:deprecatedPropType(
React.PropTypes.bool,
'Use `rightCalloutView` instead.'),

onLeftCalloutPress:deprecatedPropType(
React.PropTypes.func,
'Use `leftCalloutView` instead.'),

onRightCalloutPress:deprecatedPropType(
React.PropTypes.func,
'Use `rightCalloutView` instead.')})),






overlays:React.PropTypes.arrayOf(React.PropTypes.shape({



coordinates:React.PropTypes.arrayOf(React.PropTypes.shape({
latitude:React.PropTypes.number.isRequired,
longitude:React.PropTypes.number.isRequired})),





lineWidth:React.PropTypes.number,
strokeColor:ColorPropType,
fillColor:ColorPropType,




id:React.PropTypes.string})),





maxDelta:React.PropTypes.number,




minDelta:React.PropTypes.number,




legalLabelInsets:EdgeInsetsPropType,




onRegionChange:React.PropTypes.func,




onRegionChangeComplete:React.PropTypes.func,




onAnnotationPress:React.PropTypes.func,




active:React.PropTypes.bool}),


statics:{







PinColors:{
RED:'#ff3b30',
GREEN:'#4cd964',
PURPLE:'#c969e0'}},



render:function render(){var _this=this;
var children=[],_props=this.props,annotations=_props.annotations,overlays=_props.overlays,followUserLocation=_props.followUserLocation;
annotations=annotations&&annotations.map(function(annotation){var

id=






annotation.id,image=annotation.image,tintColor=annotation.tintColor,view=annotation.view,leftCalloutView=annotation.leftCalloutView,rightCalloutView=annotation.rightCalloutView,detailCalloutView=annotation.detailCalloutView;

if(!view&&image&&tintColor){
view=React.createElement(Image,{
style:{
tintColor:processColor(tintColor)},

source:image});

image=undefined;
}
if(view){
if(image){
console.warn('`image` and `view` both set on annotation. Image will be ignored.');
}
var viewIndex=children.length;
children.push(React.cloneElement(view,{

style:[styles.annotationView,view.props.style||{}]}));

}
if(leftCalloutView){
var leftCalloutViewIndex=children.length;
children.push(React.cloneElement(leftCalloutView,{
style:[styles.calloutView,leftCalloutView.props.style||{}]}));

}
if(rightCalloutView){
var rightCalloutViewIndex=children.length;
children.push(React.cloneElement(rightCalloutView,{
style:[styles.calloutView,rightCalloutView.props.style||{}]}));

}
if(detailCalloutView){
var detailCalloutViewIndex=children.length;
children.push(React.cloneElement(detailCalloutView,{
style:[styles.calloutView,detailCalloutView.props.style||{}]}));

}

var result=babelHelpers.extends({},
annotation,{
tintColor:tintColor&&processColor(tintColor),
image:image,
viewIndex:viewIndex,
leftCalloutViewIndex:leftCalloutViewIndex,
rightCalloutViewIndex:rightCalloutViewIndex,
detailCalloutViewIndex:detailCalloutViewIndex,
view:undefined,
leftCalloutView:undefined,
rightCalloutView:undefined,
detailCalloutView:undefined});

result.id=id||encodeURIComponent(JSON.stringify(result));
result.image=image&&resolveAssetSource(image);
return result;
});
overlays=overlays&&overlays.map(function(overlay){var
id=overlay.id,fillColor=overlay.fillColor,strokeColor=overlay.strokeColor;
var result=babelHelpers.extends({},
overlay,{
strokeColor:strokeColor&&processColor(strokeColor),
fillColor:fillColor&&processColor(fillColor)});

result.id=id||encodeURIComponent(JSON.stringify(result));
return result;
});

var findByAnnotationId=function findByAnnotationId(annotationId){
if(!annotations){
return null;
}
for(var i=0,l=annotations.length;i<l;i++){
if(annotations[i].id===annotationId){
return annotations[i];
}
}
return null;
};


var onPress=void 0,onAnnotationDragStateChange=void 0,onAnnotationFocus=void 0,onAnnotationBlur=void 0;
if(annotations){
onPress=function onPress(event){
if(event.nativeEvent.action==='annotation-click'){

_this.props.onAnnotationPress&&
_this.props.onAnnotationPress(event.nativeEvent.annotation);
}else if(event.nativeEvent.action==='callout-click'){
var annotation=findByAnnotationId(event.nativeEvent.annotationId);
if(annotation){

if(event.nativeEvent.side==='left'&&annotation.onLeftCalloutPress){
annotation.onLeftCalloutPress(event.nativeEvent);
}else if(event.nativeEvent.side==='right'&&annotation.onRightCalloutPress){
annotation.onRightCalloutPress(event.nativeEvent);
}
}
}
};
onAnnotationDragStateChange=function onAnnotationDragStateChange(event){
var annotation=findByAnnotationId(event.nativeEvent.annotationId);
if(annotation){

annotation.onDragStateChange&&
annotation.onDragStateChange(event.nativeEvent);
}
};
onAnnotationFocus=function onAnnotationFocus(event){
var annotation=findByAnnotationId(event.nativeEvent.annotationId);
if(annotation&&annotation.onFocus){
annotation.onFocus(event.nativeEvent);
}
};
onAnnotationBlur=function onAnnotationBlur(event){
var annotation=findByAnnotationId(event.nativeEvent.annotationId);
if(annotation&&annotation.onBlur){
annotation.onBlur(event.nativeEvent);
}
};
}


if(this.props.onRegionChange||this.props.onRegionChangeComplete){
var onChange=function onChange(event){
if(event.nativeEvent.continuous){
_this.props.onRegionChange&&
_this.props.onRegionChange(event.nativeEvent.region);
}else{
_this.props.onRegionChangeComplete&&
_this.props.onRegionChangeComplete(event.nativeEvent.region);
}
};
}


if(followUserLocation===undefined){
followUserLocation=this.props.showUserLocation;
}

return(
React.createElement(RCTMap,babelHelpers.extends({},
this.props,{
annotations:annotations,
children:children,
followUserLocation:followUserLocation,
overlays:overlays,
onPress:onPress,
onChange:onChange,
onAnnotationDragStateChange:onAnnotationDragStateChange,
onAnnotationFocus:onAnnotationFocus,
onAnnotationBlur:onAnnotationBlur})));


}});


var styles=StyleSheet.create({
annotationView:{
position:'absolute',
backgroundColor:'transparent'},

calloutView:{
position:'absolute',
backgroundColor:'white'}});



var RCTMap=requireNativeComponent('RCTMap',MapView,{
nativeOnly:{
onAnnotationDragStateChange:true,
onAnnotationFocus:true,
onAnnotationBlur:true,
onChange:true,
onPress:true}});



module.exports=MapView;
}, 280, null, "MapView");
__d(/* Modal */function(global, require, module, exports) {










'use strict';var _container;

var AppContainer=require(282 /* AppContainer */);
var I18nManager=require(304 /* I18nManager */);
var Platform=require(28 /* Platform */);
var React=require(78 /* React */);
var StyleSheet=require(101 /* StyleSheet */);
var View=require(120 /* View */);

var deprecatedPropType=require(111 /* deprecatedPropType */);
var requireNativeComponent=require(128 /* requireNativeComponent */);
var RCTModalHostView=requireNativeComponent('RCTModalHostView',null);

var PropTypes=React.PropTypes;var
























































Modal=function(_React$Component){babelHelpers.inherits(Modal,_React$Component);function Modal(){babelHelpers.classCallCheck(this,Modal);return babelHelpers.possibleConstructorReturn(this,(Modal.__proto__||Object.getPrototypeOf(Modal)).apply(this,arguments));}babelHelpers.createClass(Modal,[{key:'render',value:function render()




















































{
if(this.props.visible===false){
return null;
}

var containerStyles={
backgroundColor:this.props.transparent?'transparent':'white'};


var animationType=this.props.animationType;
if(!animationType){

animationType='none';
if(this.props.animated){
animationType='slide';
}
}

var innerChildren=__DEV__?
React.createElement(AppContainer,{rootTag:this.context.rootTag},
this.props.children):

this.props.children;

return(
React.createElement(RCTModalHostView,{
animationType:animationType,
transparent:this.props.transparent,
onRequestClose:this.props.onRequestClose,
onShow:this.props.onShow,
style:styles.modal,
onStartShouldSetResponder:this._shouldSetResponder,
supportedOrientations:this.props.supportedOrientations,
onOrientationChange:this.props.onOrientationChange},

React.createElement(View,{style:[styles.container,containerStyles]},
innerChildren)));



}},{key:'_shouldSetResponder',value:function _shouldSetResponder()


{
return true;
}}]);return Modal;}(React.Component);Modal.propTypes={animationType:PropTypes.oneOf(['none','slide','fade']),transparent:PropTypes.bool,visible:PropTypes.bool,onRequestClose:Platform.OS==='android'?PropTypes.func.isRequired:PropTypes.func,onShow:PropTypes.func,animated:deprecatedPropType(PropTypes.bool,'Use the `animationType` prop instead.'),supportedOrientations:PropTypes.arrayOf(PropTypes.oneOf(['portrait','portrait-upside-down','landscape','landscape-left','landscape-right'])),onOrientationChange:PropTypes.func};Modal.defaultProps={visible:true};Modal.contextTypes={rootTag:React.PropTypes.number};


var side=I18nManager.isRTL?'right':'left';
var styles=StyleSheet.create({
modal:{
position:'absolute'},

container:(_container={
position:'absolute'},babelHelpers.defineProperty(_container,
side,0),babelHelpers.defineProperty(_container,'top',
0),_container)});



module.exports=Modal;
}, 281, null, "Modal");
__d(/* AppContainer */function(global, require, module, exports) {











'use strict';

var EmitterSubscription=require(57 /* EmitterSubscription */);
var RCTDeviceEventEmitter=require(60 /* RCTDeviceEventEmitter */);
var React=require(78 /* React */);
var ReactNative=require(213 /* ReactNative */);
var StyleSheet=require(101 /* StyleSheet */);
var View=require(120 /* View */);var













AppContainer=function(_React$Component){babelHelpers.inherits(AppContainer,_React$Component);function AppContainer(){var _ref;var _temp,_this,_ret;babelHelpers.classCallCheck(this,AppContainer);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=babelHelpers.possibleConstructorReturn(this,(_ref=AppContainer.__proto__||Object.getPrototypeOf(AppContainer)).call.apply(_ref,[this].concat(args))),_this),_this.

state={
inspector:null,
mainKey:1},_this.


_subscription=null,_temp),babelHelpers.possibleConstructorReturn(_this,_ret);}babelHelpers.createClass(AppContainer,[{key:'getChildContext',value:function getChildContext()





{
return{
rootTag:this.props.rootTag};

}},{key:'componentDidMount',value:function componentDidMount()

{var _this2=this;
if(__DEV__){
this._subscription=RCTDeviceEventEmitter.addListener(
'toggleElementInspector',
function(){
var Inspector=require(283 /* Inspector */);
var inspector=_this2.state.inspector?
null:
React.createElement(Inspector,{
inspectedViewTag:ReactNative.findNodeHandle(_this2._mainRef),
onRequestRerenderApp:function onRequestRerenderApp(updateInspectedViewTag){
_this2.setState(
function(s){return{mainKey:s.mainKey+1};},
function(){return updateInspectedViewTag(
ReactNative.findNodeHandle(_this2._mainRef));});


}});

_this2.setState({inspector:inspector});
});

}
}},{key:'componentWillUnmount',value:function componentWillUnmount()

{
if(this._subscription){
this._subscription.remove();
}
}},{key:'render',value:function render()

{var _this3=this;
var yellowBox=null;
if(__DEV__){
var YellowBox=require(303 /* YellowBox */);
yellowBox=React.createElement(YellowBox,null);
}

return(
React.createElement(View,{style:styles.appContainer},
React.createElement(View,{
collapsable:!this.state.inspector,
key:this.state.mainKey,
style:styles.appContainer,ref:function ref(_ref2){_this3._mainRef=_ref2;}},
this.props.children),

yellowBox,
this.state.inspector));


}}]);return AppContainer;}(React.Component);AppContainer.childContextTypes={rootTag:React.PropTypes.number};


var styles=StyleSheet.create({
appContainer:{
flex:1}});



module.exports=AppContainer;
}, 282, null, "AppContainer");
__d(/* Inspector */function(global, require, module, exports) {













'use strict';

var Dimensions=require(103 /* Dimensions */);
var InspectorOverlay=require(284 /* InspectorOverlay */);
var InspectorPanel=require(289 /* InspectorPanel */);
var InspectorUtils=require(285 /* InspectorUtils */);
var React=require(78 /* React */);
var StyleSheet=require(101 /* StyleSheet */);
var Touchable=require(184 /* Touchable */);
var UIManager=require(75 /* UIManager */);
var View=require(120 /* View */);

if(window.__REACT_DEVTOOLS_GLOBAL_HOOK__){

window.__REACT_DEVTOOLS_GLOBAL_HOOK__.resolveRNStyle=require(25 /* flattenStyle */);
}var

Inspector=function(_React$Component){babelHelpers.inherits(Inspector,_React$Component);



















function Inspector(props){babelHelpers.classCallCheck(this,Inspector);var _this=babelHelpers.possibleConstructorReturn(this,(Inspector.__proto__||Object.getPrototypeOf(Inspector)).call(this,
props));

_this.state={
devtoolsAgent:null,
hierarchy:null,
panelPos:'bottom',
inspecting:true,
perfing:false,
inspected:null,
selection:null,
inspectedViewTag:_this.props.inspectedViewTag,
networking:false};return _this;

}babelHelpers.createClass(Inspector,[{key:'componentDidMount',value:function componentDidMount()

{
if(window.__REACT_DEVTOOLS_GLOBAL_HOOK__){
this.attachToDevtools=this.attachToDevtools.bind(this);
window.__REACT_DEVTOOLS_GLOBAL_HOOK__.on('react-devtools',this.attachToDevtools);

if(window.__REACT_DEVTOOLS_GLOBAL_HOOK__.reactDevtoolsAgent){
this.attachToDevtools(window.__REACT_DEVTOOLS_GLOBAL_HOOK__.reactDevtoolsAgent);
}
}
}},{key:'componentWillUnmount',value:function componentWillUnmount()

{
if(this._subs){
this._subs.map(function(fn){return fn();});
}
if(window.__REACT_DEVTOOLS_GLOBAL_HOOK__){
window.__REACT_DEVTOOLS_GLOBAL_HOOK__.off('react-devtools',this.attachToDevtools);
}
}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(

newProps){
this.setState({inspectedViewTag:newProps.inspectedViewTag});
}},{key:'attachToDevtools',value:function attachToDevtools(

agent){var _this2=this;
var _hideWait=null;
var hlSub=agent.sub('highlight',function(_ref){var node=_ref.node,name=_ref.name,props=_ref.props;
clearTimeout(_hideWait);
UIManager.measure(node,function(x,y,width,height,left,top){
_this2.setState({
hierarchy:[],
inspected:{
frame:{left:left,top:top,width:width,height:height},
style:props?props.style:{}}});


});
});
var hideSub=agent.sub('hideHighlight',function(){
if(_this2.state.inspected===null){
return;
}

_hideWait=setTimeout(function(){
_this2.setState({
inspected:null});

},100);
});
this._subs=[hlSub,hideSub];

agent.on('shutdown',function(){
_this2.setState({devtoolsAgent:null});
_this2._subs=null;
});
this.setState({
devtoolsAgent:agent});

}},{key:'setSelection',value:function setSelection(

i){var _this3=this;
var instance=this.state.hierarchy[i];


var publicInstance=instance['_instance']||{};
var source=instance['_currentElement']&&instance['_currentElement']['_source'];
UIManager.measure(instance.getHostNode(),function(x,y,width,height,left,top){
_this3.setState({
inspected:{
frame:{left:left,top:top,width:width,height:height},
style:publicInstance.props?publicInstance.props.style:{},
source:source},

selection:i});

});
}},{key:'onTouchInstance',value:function onTouchInstance(

touched,frame,pointerY){



var hierarchy=InspectorUtils.getOwnerHierarchy(touched);
var instance=InspectorUtils.lastNotNativeInstance(hierarchy);

if(this.state.devtoolsAgent){
this.state.devtoolsAgent.selectFromReactInstance(instance,true);
}



var publicInstance=instance['_instance']||{};
var props=publicInstance.props||{};
var source=instance['_currentElement']&&instance['_currentElement']['_source'];
this.setState({
panelPos:pointerY>Dimensions.get('window').height/2?'top':'bottom',
selection:hierarchy.indexOf(instance),
hierarchy:hierarchy,
inspected:{
style:props.style||{},
frame:frame,
source:source}});


}},{key:'setPerfing',value:function setPerfing(

val){
this.setState({
perfing:val,
inspecting:false,
inspected:null,
networking:false});

}},{key:'setInspecting',value:function setInspecting(

val){
this.setState({
inspecting:val,
inspected:null});

}},{key:'setTouchTargetting',value:function setTouchTargetting(

val){var _this4=this;
Touchable.TOUCH_TARGET_DEBUG=val;
this.props.onRequestRerenderApp(function(inspectedViewTag){
_this4.setState({inspectedViewTag:inspectedViewTag});
});
}},{key:'setNetworking',value:function setNetworking(

val){
this.setState({
networking:val,
perfing:false,
inspecting:false,
inspected:null});

}},{key:'render',value:function render()

{
var panelContainerStyle=this.state.panelPos==='bottom'?{bottom:0}:{top:0};
return(
React.createElement(View,{style:styles.container,pointerEvents:'box-none'},
this.state.inspecting&&
React.createElement(InspectorOverlay,{
inspected:this.state.inspected,
inspectedViewTag:this.state.inspectedViewTag,
onTouchInstance:this.onTouchInstance.bind(this)}),

React.createElement(View,{style:[styles.panelContainer,panelContainerStyle]},
React.createElement(InspectorPanel,{
devtoolsIsOpen:!!this.state.devtoolsAgent,
inspecting:this.state.inspecting,
perfing:this.state.perfing,
setPerfing:this.setPerfing.bind(this),
setInspecting:this.setInspecting.bind(this),
inspected:this.state.inspected,
hierarchy:this.state.hierarchy,
selection:this.state.selection,
setSelection:this.setSelection.bind(this),
touchTargetting:Touchable.TOUCH_TARGET_DEBUG,
setTouchTargetting:this.setTouchTargetting.bind(this),
networking:this.state.networking,
setNetworking:this.setNetworking.bind(this)}))));




}}]);return Inspector;}(React.Component);


var styles=StyleSheet.create({
container:{
position:'absolute',
backgroundColor:'transparent',
top:0,
left:0,
right:0,
bottom:0},

panelContainer:{
position:'absolute',
left:0,
right:0}});



module.exports=Inspector;
}, 283, null, "Inspector");
__d(/* InspectorOverlay */function(global, require, module, exports) {










'use strict';

var Dimensions=require(103 /* Dimensions */);
var InspectorUtils=require(285 /* InspectorUtils */);
var React=require(78 /* React */);
var StyleSheet=require(101 /* StyleSheet */);
var UIManager=require(75 /* UIManager */);
var View=require(120 /* View */);
var ElementBox=require(286 /* ElementBox */);

var PropTypes=React.PropTypes;var





InspectorOverlay=function(_React$Component){babelHelpers.inherits(InspectorOverlay,_React$Component);function InspectorOverlay(){var _ref;var _temp,_this,_ret;babelHelpers.classCallCheck(this,InspectorOverlay);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=babelHelpers.possibleConstructorReturn(this,(_ref=InspectorOverlay.__proto__||Object.getPrototypeOf(InspectorOverlay)).call.apply(_ref,[this].concat(args))),_this),_this.


















findViewForTouchEvent=function(e){var _e$nativeEvent$touche=
e.nativeEvent.touches[0],locationX=_e$nativeEvent$touche.locationX,locationY=_e$nativeEvent$touche.locationY;
UIManager.findSubviewIn(
_this.props.inspectedViewTag,
[locationX,locationY],
function(nativeViewTag,left,top,width,height){
var instance=InspectorUtils.findInstanceByNativeTag(nativeViewTag);
if(!instance){
return;
}
_this.props.onTouchInstance(instance,{left:left,top:top,width:width,height:height},locationY);
});

},_this.

shouldSetResponser=function(e){
_this.findViewForTouchEvent(e);
return true;
},_temp),babelHelpers.possibleConstructorReturn(_this,_ret);}babelHelpers.createClass(InspectorOverlay,[{key:'render',value:function render()

{
var content=null;
if(this.props.inspected){
content=React.createElement(ElementBox,{frame:this.props.inspected.frame,style:this.props.inspected.style});
}

return(
React.createElement(View,{
onStartShouldSetResponder:this.shouldSetResponser,
onResponderMove:this.findViewForTouchEvent,
style:[styles.inspector,{height:Dimensions.get('window').height}]},
content));


}}]);return InspectorOverlay;}(React.Component);InspectorOverlay.propTypes={inspected:PropTypes.shape({frame:PropTypes.object,style:PropTypes.any}),inspectedViewTag:PropTypes.number,onTouchInstance:PropTypes.func.isRequired};


var styles=StyleSheet.create({
inspector:{
backgroundColor:'transparent',
position:'absolute',
left:0,
top:0,
right:0}});



module.exports=InspectorOverlay;
}, 284, null, "InspectorOverlay");
__d(/* InspectorUtils */function(global, require, module, exports) {









'use strict';

var ReactNativeComponentTree=require(132 /* ReactNativeComponentTree */);

function traverseOwnerTreeUp(hierarchy,instance){
if(instance){
hierarchy.unshift(instance);
traverseOwnerTreeUp(hierarchy,instance._currentElement._owner);
}
}

function findInstanceByNativeTag(nativeTag){
return ReactNativeComponentTree.getInstanceFromNode(nativeTag);
}

function getOwnerHierarchy(instance){
var hierarchy=[];
traverseOwnerTreeUp(hierarchy,instance);
return hierarchy;
}

function lastNotNativeInstance(hierarchy){
for(var i=hierarchy.length-1;i>1;i--){
var instance=hierarchy[i];
if(!instance.viewConfig){
return instance;
}
}
return hierarchy[0];
}

module.exports={findInstanceByNativeTag:findInstanceByNativeTag,getOwnerHierarchy:getOwnerHierarchy,lastNotNativeInstance:lastNotNativeInstance};
}, 285, null, "InspectorUtils");
__d(/* ElementBox */function(global, require, module, exports) {










'use strict';

var React=require(78 /* React */);
var View=require(120 /* View */);
var StyleSheet=require(101 /* StyleSheet */);
var BorderBox=require(287 /* BorderBox */);
var resolveBoxStyle=require(288 /* resolveBoxStyle */);

var flattenStyle=require(25 /* flattenStyle */);var

ElementBox=function(_React$Component){babelHelpers.inherits(ElementBox,_React$Component);function ElementBox(){babelHelpers.classCallCheck(this,ElementBox);return babelHelpers.possibleConstructorReturn(this,(ElementBox.__proto__||Object.getPrototypeOf(ElementBox)).apply(this,arguments));}babelHelpers.createClass(ElementBox,[{key:'render',value:function render()
{
var style=flattenStyle(this.props.style)||{};
var margin=resolveBoxStyle('margin',style);
var padding=resolveBoxStyle('padding',style);
var frameStyle=this.props.frame;
if(margin){
frameStyle={
top:frameStyle.top-margin.top,
left:frameStyle.left-margin.left,
height:frameStyle.height+margin.top+margin.bottom,
width:frameStyle.width+margin.left+margin.right};

}
var contentStyle={
width:this.props.frame.width,
height:this.props.frame.height};

if(padding){
contentStyle={
width:contentStyle.width-padding.left-padding.right,
height:contentStyle.height-padding.top-padding.bottom};

}
return(
React.createElement(View,{style:[styles.frame,frameStyle],pointerEvents:'none'},
React.createElement(BorderBox,{box:margin,style:styles.margin},
React.createElement(BorderBox,{box:padding,style:styles.padding},
React.createElement(View,{style:[styles.content,contentStyle]})))));




}}]);return ElementBox;}(React.Component);


var styles=StyleSheet.create({
frame:{
position:'absolute'},

content:{
backgroundColor:'rgba(200, 230, 255, 0.8)'},

padding:{
borderColor:'rgba(77, 255, 0, 0.3)'},

margin:{
borderColor:'rgba(255, 132, 0, 0.3)'}});



module.exports=ElementBox;
}, 286, null, "ElementBox");
__d(/* BorderBox */function(global, require, module, exports) {










'use strict';

var React=require(78 /* React */);
var View=require(120 /* View */);var

BorderBox=function(_React$Component){babelHelpers.inherits(BorderBox,_React$Component);function BorderBox(){babelHelpers.classCallCheck(this,BorderBox);return babelHelpers.possibleConstructorReturn(this,(BorderBox.__proto__||Object.getPrototypeOf(BorderBox)).apply(this,arguments));}babelHelpers.createClass(BorderBox,[{key:'render',value:function render()
{
var box=this.props.box;
if(!box){
return this.props.children;
}
var style={
borderTopWidth:box.top,
borderBottomWidth:box.bottom,
borderLeftWidth:box.left,
borderRightWidth:box.right};

return(
React.createElement(View,{style:[style,this.props.style]},
this.props.children));


}}]);return BorderBox;}(React.Component);


module.exports=BorderBox;
}, 287, null, "BorderBox");
__d(/* resolveBoxStyle */function(global, require, module, exports) {










'use strict';










function resolveBoxStyle(prefix,style){
var res={};
var subs=['top','left','bottom','right'];
var set=false;
subs.forEach(function(sub){
res[sub]=style[prefix]||0;
});
if(style[prefix]){
set=true;
}
if(style[prefix+'Vertical']){
res.top=res.bottom=style[prefix+'Vertical'];
set=true;
}
if(style[prefix+'Horizontal']){
res.left=res.right=style[prefix+'Horizontal'];
set=true;
}
subs.forEach(function(sub){
var val=style[prefix+capFirst(sub)];
if(val){
res[sub]=val;
set=true;
}
});
if(!set){
return;
}
return res;
}

function capFirst(text){
return text[0].toUpperCase()+text.slice(1);
}

module.exports=resolveBoxStyle;
}, 288, null, "resolveBoxStyle");
__d(/* InspectorPanel */function(global, require, module, exports) {










'use strict';

var React=require(78 /* React */);
var StyleSheet=require(101 /* StyleSheet */);
var Text=require(183 /* Text */);
var View=require(120 /* View */);
var ElementProperties=require(290 /* ElementProperties */);
var PerformanceOverlay=require(298 /* PerformanceOverlay */);
var TouchableHighlight=require(293 /* TouchableHighlight */);
var NetworkOverlay=require(299 /* NetworkOverlay */);

var PropTypes=React.PropTypes;var

InspectorPanel=function(_React$Component){babelHelpers.inherits(InspectorPanel,_React$Component);function InspectorPanel(){babelHelpers.classCallCheck(this,InspectorPanel);return babelHelpers.possibleConstructorReturn(this,(InspectorPanel.__proto__||Object.getPrototypeOf(InspectorPanel)).apply(this,arguments));}babelHelpers.createClass(InspectorPanel,[{key:'renderWaiting',value:function renderWaiting()
{
if(this.props.inspecting){
return(
React.createElement(Text,{style:styles.waitingText},'Tap something to inspect it'));



}
return React.createElement(Text,{style:styles.waitingText},'Nothing is inspected');
}},{key:'render',value:function render()

{
var contents;
if(this.props.inspected){
contents=
React.createElement(ElementProperties,{
style:this.props.inspected.style,
frame:this.props.inspected.frame,
source:this.props.inspected.source,
hierarchy:this.props.hierarchy,
selection:this.props.selection,
setSelection:this.props.setSelection});


}else if(this.props.perfing){
contents=
React.createElement(PerformanceOverlay,null);

}else if(this.props.networking){
contents=
React.createElement(NetworkOverlay,null);

}else{
contents=
React.createElement(View,{style:styles.waiting},
this.renderWaiting());


}
return(
React.createElement(View,{style:styles.container},
!this.props.devtoolsIsOpen&&contents,
React.createElement(View,{style:styles.buttonRow},
React.createElement(Button,{
title:'Inspect',
pressed:this.props.inspecting,
onClick:this.props.setInspecting}),

React.createElement(Button,{title:'Perf',
pressed:this.props.perfing,
onClick:this.props.setPerfing}),

React.createElement(Button,{title:'Network',
pressed:this.props.networking,
onClick:this.props.setNetworking}),

React.createElement(Button,{title:'Touchables',
pressed:this.props.touchTargetting,
onClick:this.props.setTouchTargetting}))));




}}]);return InspectorPanel;}(React.Component);


InspectorPanel.propTypes={
devtoolsIsOpen:PropTypes.bool,
inspecting:PropTypes.bool,
setInspecting:PropTypes.func,
inspected:PropTypes.object,
perfing:PropTypes.bool,
setPerfing:PropTypes.func,
touchTargetting:PropTypes.bool,
setTouchTargetting:PropTypes.func,
networking:PropTypes.bool,
setNetworking:PropTypes.func};var


Button=function(_React$Component2){babelHelpers.inherits(Button,_React$Component2);function Button(){babelHelpers.classCallCheck(this,Button);return babelHelpers.possibleConstructorReturn(this,(Button.__proto__||Object.getPrototypeOf(Button)).apply(this,arguments));}babelHelpers.createClass(Button,[{key:'render',value:function render()
{var _this3=this;
return(
React.createElement(TouchableHighlight,{onPress:function onPress(){return _this3.props.onClick(!_this3.props.pressed);},style:[
styles.button,
this.props.pressed&&styles.buttonPressed]},

React.createElement(Text,{style:styles.buttonText},this.props.title)));


}}]);return Button;}(React.Component);


var styles=StyleSheet.create({
buttonRow:{
flexDirection:'row'},

button:{
backgroundColor:'rgba(0, 0, 0, 0.3)',
margin:2,
height:30,
justifyContent:'center',
alignItems:'center'},

buttonPressed:{
backgroundColor:'rgba(255, 255, 255, 0.3)'},

buttonText:{
textAlign:'center',
color:'white',
margin:5},

container:{
backgroundColor:'rgba(0, 0, 0, 0.7)'},

waiting:{
height:100},

waitingText:{
fontSize:20,
textAlign:'center',
marginVertical:20,
color:'white'}});



module.exports=InspectorPanel;
}, 289, null, "InspectorPanel");
__d(/* ElementProperties */function(global, require, module, exports) {










'use strict';

var BoxInspector=require(291 /* BoxInspector */);
var React=require(78 /* React */);
var StyleInspector=require(292 /* StyleInspector */);
var StyleSheet=require(101 /* StyleSheet */);
var Text=require(183 /* Text */);
var TouchableHighlight=require(293 /* TouchableHighlight */);
var TouchableWithoutFeedback=require(266 /* TouchableWithoutFeedback */);
var View=require(120 /* View */);

var flattenStyle=require(25 /* flattenStyle */);
var mapWithSeparator=require(296 /* mapWithSeparator */);
var openFileInEditor=require(297 /* openFileInEditor */);

var PropTypes=React.PropTypes;var

ElementProperties=function(_React$Component){babelHelpers.inherits(ElementProperties,_React$Component);function ElementProperties(){babelHelpers.classCallCheck(this,ElementProperties);return babelHelpers.possibleConstructorReturn(this,(ElementProperties.__proto__||Object.getPrototypeOf(ElementProperties)).apply(this,arguments));}babelHelpers.createClass(ElementProperties,[{key:'render',value:function render()






















{var _this2=this;
var style=flattenStyle(this.props.style);

var selection=this.props.selection;
var openFileButton;
var source=this.props.source;var _ref=
source||{},fileName=_ref.fileName,lineNumber=_ref.lineNumber;
if(fileName&&lineNumber){
var parts=fileName.split('/');
var fileNameShort=parts[parts.length-1];
openFileButton=
React.createElement(TouchableHighlight,{
style:styles.openButton,
onPress:openFileInEditor.bind(null,fileName,lineNumber)},
React.createElement(Text,{style:styles.openButtonTitle,numberOfLines:1},
fileNameShort,':',lineNumber));



}


return(
React.createElement(TouchableWithoutFeedback,null,
React.createElement(View,{style:styles.info},
React.createElement(View,{style:styles.breadcrumb},
mapWithSeparator(
this.props.hierarchy,
function(item,i){return(
React.createElement(TouchableHighlight,{
key:'item-'+i,
style:[styles.breadItem,i===selection&&styles.selected],

onPress:function onPress(){return _this2.props.setSelection(i);}},
React.createElement(Text,{style:styles.breadItemText},
getInstanceName(item))));},



function(i){return(
React.createElement(Text,{key:'sep-'+i,style:styles.breadSep},'\u25B8'));})),





React.createElement(View,{style:styles.row},
React.createElement(View,{style:styles.col},
React.createElement(StyleInspector,{style:style}),
openFileButton),



React.createElement(BoxInspector,{style:style,frame:this.props.frame})))));




}}]);return ElementProperties;}(React.Component);ElementProperties.propTypes={hierarchy:PropTypes.array.isRequired,style:PropTypes.oneOfType([PropTypes.object,PropTypes.array,PropTypes.number]),source:PropTypes.shape({fileName:PropTypes.string,lineNumber:PropTypes.number})};


function getInstanceName(instance){
if(instance.getName){
return instance.getName();
}
if(instance.constructor&&instance.constructor.displayName){
return instance.constructor.displayName;
}
return'Unknown';
}

var styles=StyleSheet.create({
breadSep:{
fontSize:8,
color:'white'},

breadcrumb:{
flexDirection:'row',
flexWrap:'wrap',
alignItems:'flex-start',
marginBottom:5},

selected:{
borderColor:'white',
borderRadius:5},

breadItem:{
borderWidth:1,
borderColor:'transparent',
marginHorizontal:2},

breadItemText:{
fontSize:10,
color:'white',
marginHorizontal:5},

row:{
flexDirection:'row',
alignItems:'center',
justifyContent:'space-between'},

col:{
flex:1},

info:{
padding:10},

path:{
color:'white',
fontSize:9},

openButton:{
padding:10,
backgroundColor:'#000',
marginVertical:5,
marginRight:5,
borderRadius:2},

openButtonTitle:{
color:'white',
fontSize:8}});



module.exports=ElementProperties;
}, 290, null, "ElementProperties");
__d(/* BoxInspector */function(global, require, module, exports) {










'use strict';

var React=require(78 /* React */);
var StyleSheet=require(101 /* StyleSheet */);
var Text=require(183 /* Text */);
var View=require(120 /* View */);
var resolveBoxStyle=require(288 /* resolveBoxStyle */);

var blank={
top:0,
left:0,
right:0,
bottom:0};var


BoxInspector=function(_React$Component){babelHelpers.inherits(BoxInspector,_React$Component);function BoxInspector(){babelHelpers.classCallCheck(this,BoxInspector);return babelHelpers.possibleConstructorReturn(this,(BoxInspector.__proto__||Object.getPrototypeOf(BoxInspector)).apply(this,arguments));}babelHelpers.createClass(BoxInspector,[{key:'render',value:function render()
{
var frame=this.props.frame;
var style=this.props.style;
var margin=style&&resolveBoxStyle('margin',style)||blank;
var padding=style&&resolveBoxStyle('padding',style)||blank;
return(
React.createElement(BoxContainer,{title:'margin',titleStyle:styles.marginLabel,box:margin},
React.createElement(BoxContainer,{title:'padding',box:padding},
React.createElement(View,null,
React.createElement(Text,{style:styles.innerText},'(',
frame.left,', ',frame.top,')'),

React.createElement(Text,{style:styles.innerText},
frame.width,' \xD7 ',frame.height)))));





}}]);return BoxInspector;}(React.Component);var


BoxContainer=function(_React$Component2){babelHelpers.inherits(BoxContainer,_React$Component2);function BoxContainer(){babelHelpers.classCallCheck(this,BoxContainer);return babelHelpers.possibleConstructorReturn(this,(BoxContainer.__proto__||Object.getPrototypeOf(BoxContainer)).apply(this,arguments));}babelHelpers.createClass(BoxContainer,[{key:'render',value:function render()
{
var box=this.props.box;
return(
React.createElement(View,{style:styles.box},
React.createElement(View,{style:styles.row},
React.createElement(Text,{style:[this.props.titleStyle,styles.label]},this.props.title),
React.createElement(Text,{style:styles.boxText},box.top)),

React.createElement(View,{style:styles.row},
React.createElement(Text,{style:styles.boxText},box.left),
this.props.children,
React.createElement(Text,{style:styles.boxText},box.right)),

React.createElement(Text,{style:styles.boxText},box.bottom)));


}}]);return BoxContainer;}(React.Component);


var styles=StyleSheet.create({
row:{
flexDirection:'row',
alignItems:'center',
justifyContent:'space-around'},

marginLabel:{
width:60},

label:{
fontSize:10,
color:'rgb(255,100,0)',
marginLeft:5,
flex:1,
textAlign:'left',
top:-3},

buffer:{
fontSize:10,
color:'yellow',
flex:1,
textAlign:'center'},

innerText:{
color:'yellow',
fontSize:12,
textAlign:'center',
width:70},

box:{
borderWidth:1,
borderColor:'grey'},

boxText:{
color:'white',
fontSize:12,
marginHorizontal:3,
marginVertical:2,
textAlign:'center'}});



module.exports=BoxInspector;
}, 291, null, "BoxInspector");
__d(/* StyleInspector */function(global, require, module, exports) {










'use strict';

var React=require(78 /* React */);
var StyleSheet=require(101 /* StyleSheet */);
var Text=require(183 /* Text */);
var View=require(120 /* View */);var

StyleInspector=function(_React$Component){babelHelpers.inherits(StyleInspector,_React$Component);function StyleInspector(){babelHelpers.classCallCheck(this,StyleInspector);return babelHelpers.possibleConstructorReturn(this,(StyleInspector.__proto__||Object.getPrototypeOf(StyleInspector)).apply(this,arguments));}babelHelpers.createClass(StyleInspector,[{key:'render',value:function render()
{var _this2=this;
if(!this.props.style){
return React.createElement(Text,{style:styles.noStyle},'No style');
}
var names=Object.keys(this.props.style);
return(
React.createElement(View,{style:styles.container},
React.createElement(View,null,
names.map(function(name){return React.createElement(Text,{key:name,style:styles.attr},name,':');})),


React.createElement(View,null,
names.map(function(name){
var value=typeof _this2.props.style[name]==='object'?JSON.stringify(_this2.props.style[name]):_this2.props.style[name];
return React.createElement(Text,{key:name,style:styles.value},value);
}))));



}}]);return StyleInspector;}(React.Component);


var styles=StyleSheet.create({
container:{
flexDirection:'row'},

row:{
flexDirection:'row',
alignItems:'center',
justifyContent:'space-around'},

attr:{
fontSize:10,
color:'#ccc'},

value:{
fontSize:10,
color:'white',
marginLeft:10},

noStyle:{
color:'white',
fontSize:10}});



module.exports=StyleInspector;
}, 292, null, "StyleInspector");
__d(/* TouchableHighlight */function(global, require, module, exports) {










'use strict';



var ColorPropType=require(18 /* ColorPropType */);
var NativeMethodsMixin=require(21 /* NativeMethodsMixin */);
var React=require(78 /* React */);
var ReactNativeViewAttributes=require(126 /* ReactNativeViewAttributes */);
var StyleSheet=require(101 /* StyleSheet */);
var TimerMixin=require(265 /* react-timer-mixin */);
var Touchable=require(184 /* Touchable */);
var TouchableWithoutFeedback=require(266 /* TouchableWithoutFeedback */);
var View=require(120 /* View */);

var ensureComponentIsNative=require(294 /* ensureComponentIsNative */);
var ensurePositiveDelayProps=require(267 /* ensurePositiveDelayProps */);
var keyOf=require(295 /* fbjs/lib/keyOf */);
var merge=require(123 /* merge */);



var DEFAULT_PROPS={
activeOpacity:0.85,
underlayColor:'black'};


var PRESS_RETENTION_OFFSET={top:20,left:20,right:20,bottom:30};




























var TouchableHighlight=React.createClass({displayName:'TouchableHighlight',
propTypes:babelHelpers.extends({},
TouchableWithoutFeedback.propTypes,{




activeOpacity:React.PropTypes.number,




underlayColor:ColorPropType,
style:View.propTypes.style,



onShowUnderlay:React.PropTypes.func,



onHideUnderlay:React.PropTypes.func}),


mixins:[NativeMethodsMixin,TimerMixin,Touchable.Mixin],

getDefaultProps:function getDefaultProps(){return DEFAULT_PROPS;},


_computeSyntheticState:function _computeSyntheticState(props){
return{
activeProps:{
style:{
opacity:props.activeOpacity}},


activeUnderlayProps:{
style:{
backgroundColor:props.underlayColor}},


underlayStyle:[
INACTIVE_UNDERLAY_PROPS.style,
props.style]};


},

getInitialState:function getInitialState(){
return merge(
this.touchableGetInitialState(),this._computeSyntheticState(this.props));

},

componentDidMount:function componentDidMount(){
ensurePositiveDelayProps(this.props);
ensureComponentIsNative(this.refs[CHILD_REF]);
},

componentDidUpdate:function componentDidUpdate(){
ensureComponentIsNative(this.refs[CHILD_REF]);
},

componentWillReceiveProps:function componentWillReceiveProps(nextProps){
ensurePositiveDelayProps(nextProps);
if(nextProps.activeOpacity!==this.props.activeOpacity||
nextProps.underlayColor!==this.props.underlayColor||
nextProps.style!==this.props.style){
this.setState(this._computeSyntheticState(nextProps));
}
},

viewConfig:{
uiViewClassName:'RCTView',
validAttributes:ReactNativeViewAttributes.RCTView},






touchableHandleActivePressIn:function touchableHandleActivePressIn(e){
this.clearTimeout(this._hideTimeout);
this._hideTimeout=null;
this._showUnderlay();
this.props.onPressIn&&this.props.onPressIn(e);
},

touchableHandleActivePressOut:function touchableHandleActivePressOut(e){
if(!this._hideTimeout){
this._hideUnderlay();
}
this.props.onPressOut&&this.props.onPressOut(e);
},

touchableHandlePress:function touchableHandlePress(e){
this.clearTimeout(this._hideTimeout);
this._showUnderlay();
this._hideTimeout=this.setTimeout(this._hideUnderlay,
this.props.delayPressOut||100);
this.props.onPress&&this.props.onPress(e);
},

touchableHandleLongPress:function touchableHandleLongPress(e){
this.props.onLongPress&&this.props.onLongPress(e);
},

touchableGetPressRectOffset:function touchableGetPressRectOffset(){
return this.props.pressRetentionOffset||PRESS_RETENTION_OFFSET;
},

touchableGetHitSlop:function touchableGetHitSlop(){
return this.props.hitSlop;
},

touchableGetHighlightDelayMS:function touchableGetHighlightDelayMS(){
return this.props.delayPressIn;
},

touchableGetLongPressDelayMS:function touchableGetLongPressDelayMS(){
return this.props.delayLongPress;
},

touchableGetPressOutDelayMS:function touchableGetPressOutDelayMS(){
return this.props.delayPressOut;
},

_showUnderlay:function _showUnderlay(){
if(!this.isMounted()||!this._hasPressHandler()){
return;
}

this.refs[UNDERLAY_REF].setNativeProps(this.state.activeUnderlayProps);
this.refs[CHILD_REF].setNativeProps(this.state.activeProps);
this.props.onShowUnderlay&&this.props.onShowUnderlay();
},

_hideUnderlay:function _hideUnderlay(){
this.clearTimeout(this._hideTimeout);
this._hideTimeout=null;
if(this._hasPressHandler()&&this.refs[UNDERLAY_REF]){
this.refs[CHILD_REF].setNativeProps(INACTIVE_CHILD_PROPS);
this.refs[UNDERLAY_REF].setNativeProps(babelHelpers.extends({},
INACTIVE_UNDERLAY_PROPS,{
style:this.state.underlayStyle}));

this.props.onHideUnderlay&&this.props.onHideUnderlay();
}
},

_hasPressHandler:function _hasPressHandler(){
return!!(
this.props.onPress||
this.props.onPressIn||
this.props.onPressOut||
this.props.onLongPress);

},

render:function render(){
return(
React.createElement(View,{
accessible:this.props.accessible!==false,
accessibilityLabel:this.props.accessibilityLabel,
accessibilityComponentType:this.props.accessibilityComponentType,
accessibilityTraits:this.props.accessibilityTraits,
ref:UNDERLAY_REF,
style:this.state.underlayStyle,
onLayout:this.props.onLayout,
hitSlop:this.props.hitSlop,
onStartShouldSetResponder:this.touchableHandleStartShouldSetResponder,
onResponderTerminationRequest:this.touchableHandleResponderTerminationRequest,
onResponderGrant:this.touchableHandleResponderGrant,
onResponderMove:this.touchableHandleResponderMove,
onResponderRelease:this.touchableHandleResponderRelease,
onResponderTerminate:this.touchableHandleResponderTerminate,
testID:this.props.testID},
React.cloneElement(
React.Children.only(this.props.children),
{
ref:CHILD_REF}),


Touchable.renderDebugView({color:'green',hitSlop:this.props.hitSlop})));


}});


var CHILD_REF=keyOf({childRef:null});
var UNDERLAY_REF=keyOf({underlayRef:null});
var INACTIVE_CHILD_PROPS={
style:StyleSheet.create({x:{opacity:1.0}}).x};

var INACTIVE_UNDERLAY_PROPS={
style:StyleSheet.create({x:{backgroundColor:'transparent'}}).x};


module.exports=TouchableHighlight;
}, 293, null, "TouchableHighlight");
__d(/* ensureComponentIsNative */function(global, require, module, exports) {










'use strict';

var invariant=require(26 /* fbjs/lib/invariant */);

var ensureComponentIsNative=function ensureComponentIsNative(component){
invariant(
component&&typeof component.setNativeProps==='function',
'Touchable child must either be native or forward setNativeProps to a '+
'native component');

};

module.exports=ensureComponentIsNative;
}, 294, null, "ensureComponentIsNative");
__d(/* fbjs/lib/keyOf.js */function(global, require, module, exports) {"use strict";





















var keyOf=function keyOf(oneKeyObj){
var key;
for(key in oneKeyObj){
if(!oneKeyObj.hasOwnProperty(key)){
continue;
}
return key;
}
return null;
};

module.exports=keyOf;
}, 295, null, "fbjs/lib/keyOf.js");
__d(/* mapWithSeparator */function(global, require, module, exports) {










'use strict';

function mapWithSeparator(
items,
itemRenderer,
spacerRenderer)
{
var mapped=[];
if(items.length>0){
mapped.push(itemRenderer(items[0],0,items));
for(var ii=1;ii<items.length;ii++){
mapped.push(spacerRenderer(ii-1),itemRenderer(items[ii],ii,items));
}
}
return mapped;
}

module.exports=mapWithSeparator;
}, 296, null, "mapWithSeparator");
__d(/* openFileInEditor */function(global, require, module, exports) {










'use strict';

var getDevServer=require(218 /* getDevServer */);

function openFileInEditor(file,lineNumber){
fetch(getDevServer().url+'open-stack-frame',{
method:'POST',
body:JSON.stringify({file:file,lineNumber:lineNumber})});

}

module.exports=openFileInEditor;
}, 297, null, "openFileInEditor");
__d(/* PerformanceOverlay */function(global, require, module, exports) {










'use strict';

var PerformanceLogger=require(244 /* PerformanceLogger */);
var React=require(78 /* React */);
var StyleSheet=require(101 /* StyleSheet */);
var Text=require(183 /* Text */);
var View=require(120 /* View */);var

PerformanceOverlay=function(_React$Component){babelHelpers.inherits(PerformanceOverlay,_React$Component);function PerformanceOverlay(){babelHelpers.classCallCheck(this,PerformanceOverlay);return babelHelpers.possibleConstructorReturn(this,(PerformanceOverlay.__proto__||Object.getPrototypeOf(PerformanceOverlay)).apply(this,arguments));}babelHelpers.createClass(PerformanceOverlay,[{key:'render',value:function render()
{
var perfLogs=PerformanceLogger.getTimespans();
var items=[];

for(var key in perfLogs){
if(perfLogs[key].totalTime){
var unit=key==='BundleSize'?'b':'ms';
items.push(
React.createElement(View,{style:styles.row,key:key},
React.createElement(Text,{style:[styles.text,styles.label]},key),
React.createElement(Text,{style:[styles.text,styles.totalTime]},
perfLogs[key].totalTime+unit)));



}
}

return(
React.createElement(View,{style:styles.container},
items));


}}]);return PerformanceOverlay;}(React.Component);


var styles=StyleSheet.create({
container:{
height:100,
paddingTop:10},

label:{
flex:1},

row:{
flexDirection:'row',
paddingHorizontal:10},

text:{
color:'white',
fontSize:12},

totalTime:{
paddingRight:100}});



module.exports=PerformanceOverlay;
}, 298, null, "PerformanceOverlay");
__d(/* NetworkOverlay */function(global, require, module, exports) {










'use strict';

var ListView=require(274 /* ListView */);
var React=require(78 /* React */);
var RecyclerViewBackedScrollView=require(300 /* RecyclerViewBackedScrollView */);
var ScrollView=require(211 /* ScrollView */);
var StyleSheet=require(101 /* StyleSheet */);
var Text=require(183 /* Text */);
var TouchableHighlight=require(293 /* TouchableHighlight */);
var View=require(120 /* View */);
var WebSocketInterceptor=require(301 /* WebSocketInterceptor */);
var XHRInterceptor=require(302 /* XHRInterceptor */);

var LISTVIEW_CELL_HEIGHT=15;
var SEPARATOR_THICKNESS=2;


var nextXHRId=0;var
























NetworkOverlay=function(_React$Component){babelHelpers.inherits(NetworkOverlay,_React$Component);





























function NetworkOverlay(props){babelHelpers.classCallCheck(this,NetworkOverlay);var _this=babelHelpers.possibleConstructorReturn(this,(NetworkOverlay.__proto__||Object.getPrototypeOf(NetworkOverlay)).call(this,
props));
_this._requests=[];
_this._detailViewItems=[];
_this._listViewDataSource=
new ListView.DataSource({rowHasChanged:function rowHasChanged(r1,r2){return r1!==r2;}});
_this.state={
dataSource:_this._listViewDataSource.cloneWithRows([]),
newDetailInfo:false,
detailRowID:null};

_this._listViewHighlighted=false;
_this._listViewHeight=0;
_this._captureRequestListView=_this._captureRequestListView.bind(_this);
_this._captureDetailScrollView=_this._captureDetailScrollView.bind(_this);
_this._listViewOnLayout=_this._listViewOnLayout.bind(_this);
_this._renderRow=_this._renderRow.bind(_this);
_this._renderScrollComponent=_this._renderScrollComponent.bind(_this);
_this._closeButtonClicked=_this._closeButtonClicked.bind(_this);
_this._socketIdMap={};
_this._xhrIdMap={};return _this;
}babelHelpers.createClass(NetworkOverlay,[{key:'_enableXHRInterception',value:function _enableXHRInterception()

{var _this2=this;
if(XHRInterceptor.isInterceptorEnabled()){
return;
}

XHRInterceptor.setOpenCallback(function(method,url,xhr){



xhr._index=nextXHRId++;
var xhrIndex=_this2._requests.length;
_this2._xhrIdMap[xhr._index]=xhrIndex;

var _xhr={
'type':'XMLHttpRequest',
'method':method,
'url':url};

_this2._requests.push(_xhr);
_this2._detailViewItems.push([]);
_this2._genDetailViewItem(xhrIndex);
_this2.setState(
{dataSource:_this2._listViewDataSource.cloneWithRows(_this2._requests)},
_this2._scrollToBottom());

});

XHRInterceptor.setRequestHeaderCallback(function(header,value,xhr){
var xhrIndex=_this2._getRequestIndexByXHRID(xhr._index);
if(xhrIndex===-1){
return;
}
var networkInfo=_this2._requests[xhrIndex];
if(!networkInfo.requestHeaders){
networkInfo.requestHeaders={};
}
networkInfo.requestHeaders[header]=value;
_this2._genDetailViewItem(xhrIndex);
});

XHRInterceptor.setSendCallback(function(data,xhr){
var xhrIndex=_this2._getRequestIndexByXHRID(xhr._index);
if(xhrIndex===-1){
return;
}
_this2._requests[xhrIndex].dataSent=data;
_this2._genDetailViewItem(xhrIndex);
});

XHRInterceptor.setHeaderReceivedCallback(
function(type,size,responseHeaders,xhr){
var xhrIndex=_this2._getRequestIndexByXHRID(xhr._index);
if(xhrIndex===-1){
return;
}
var networkInfo=_this2._requests[xhrIndex];
networkInfo.responseContentType=type;
networkInfo.responseSize=size;
networkInfo.responseHeaders=responseHeaders;
_this2._genDetailViewItem(xhrIndex);
});


XHRInterceptor.setResponseCallback(function(
status,
timeout,
response,
responseURL,
responseType,
xhr)
{
var xhrIndex=_this2._getRequestIndexByXHRID(xhr._index);
if(xhrIndex===-1){
return;
}
var networkInfo=_this2._requests[xhrIndex];
networkInfo.status=status;
networkInfo.timeout=timeout;
networkInfo.response=response;
networkInfo.responseURL=responseURL;
networkInfo.responseType=responseType;
_this2._genDetailViewItem(xhrIndex);
});



XHRInterceptor.enableInterception();
}},{key:'_enableWebSocketInterception',value:function _enableWebSocketInterception()

{var _this3=this;
if(WebSocketInterceptor.isInterceptorEnabled()){
return;
}

WebSocketInterceptor.setConnectCallback(
function(url,protocols,options,socketId){
var socketIndex=_this3._requests.length;
_this3._socketIdMap[socketId]=socketIndex;
var _webSocket={
'type':'WebSocket',
'url':url,
'protocols':protocols};

_this3._requests.push(_webSocket);
_this3._detailViewItems.push([]);
_this3._genDetailViewItem(socketIndex);
_this3.setState(
{dataSource:_this3._listViewDataSource.cloneWithRows(_this3._requests)},
_this3._scrollToBottom());

});


WebSocketInterceptor.setCloseCallback(
function(statusCode,closeReason,socketId){
var socketIndex=_this3._socketIdMap[socketId];
if(socketIndex===undefined){
return;
}
if(statusCode!==null&&closeReason!==null){
_this3._requests[socketIndex].status=statusCode;
_this3._requests[socketIndex].closeReason=closeReason;
}
_this3._genDetailViewItem(socketIndex);
});


WebSocketInterceptor.setSendCallback(function(data,socketId){
var socketIndex=_this3._socketIdMap[socketId];
if(socketIndex===undefined){
return;
}
if(!_this3._requests[socketIndex].messages){
_this3._requests[socketIndex].messages='';
}
_this3._requests[socketIndex].messages+=
'Sent: '+JSON.stringify(data)+'\n';
_this3._genDetailViewItem(socketIndex);
});

WebSocketInterceptor.setOnMessageCallback(function(socketId,message){
var socketIndex=_this3._socketIdMap[socketId];
if(socketIndex===undefined){
return;
}
if(!_this3._requests[socketIndex].messages){
_this3._requests[socketIndex].messages='';
}
_this3._requests[socketIndex].messages+=
'Received: '+JSON.stringify(message)+'\n';
_this3._genDetailViewItem(socketIndex);
});

WebSocketInterceptor.setOnCloseCallback(function(socketId,message){
var socketIndex=_this3._socketIdMap[socketId];
if(socketIndex===undefined){
return;
}
_this3._requests[socketIndex].serverClose=message;
_this3._genDetailViewItem(socketIndex);
});

WebSocketInterceptor.setOnErrorCallback(function(socketId,message){
var socketIndex=_this3._socketIdMap[socketId];
if(socketIndex===undefined){
return;
}
_this3._requests[socketIndex].serverError=message;
_this3._genDetailViewItem(socketIndex);
});


WebSocketInterceptor.enableInterception();
}},{key:'componentDidMount',value:function componentDidMount()

{
this._enableXHRInterception();
this._enableWebSocketInterception();
}},{key:'componentWillUnmount',value:function componentWillUnmount()

{
XHRInterceptor.disableInterception();
WebSocketInterceptor.disableInterception();
}},{key:'_renderRow',value:function _renderRow(


rowData,
sectionID,
rowID,
highlightRow)
{var _this4=this;
var urlCellViewStyle=styles.urlEvenCellView;
var methodCellViewStyle=styles.methodEvenCellView;
if(rowID%2===1){
urlCellViewStyle=styles.urlOddCellView;
methodCellViewStyle=styles.methodOddCellView;
}
return(
React.createElement(TouchableHighlight,{onPress:function onPress(){
_this4._pressRow(rowID);
highlightRow(sectionID,rowID);
}},
React.createElement(View,null,
React.createElement(View,{style:styles.tableRow},
React.createElement(View,{style:urlCellViewStyle},
React.createElement(Text,{style:styles.cellText,numberOfLines:1},
rowData.url)),


React.createElement(View,{style:methodCellViewStyle},
React.createElement(Text,{style:styles.cellText,numberOfLines:1},
this._getTypeShortName(rowData.type)))))));






}},{key:'_renderSeperator',value:function _renderSeperator(


sectionID,
rowID,
adjacentRowHighlighted){
return(
React.createElement(View,{
key:sectionID+'-'+rowID,
style:{
height:adjacentRowHighlighted?SEPARATOR_THICKNESS:0,
backgroundColor:adjacentRowHighlighted?'#3B5998':'#CCCCCC'}}));



}},{key:'_scrollToBottom',value:function _scrollToBottom()

{
if(this._listView){
var scrollResponder=this._listView.getScrollResponder();
if(scrollResponder){
var scrollY=Math.max(
this._requests.length*LISTVIEW_CELL_HEIGHT+(
this._listViewHighlighted?2*SEPARATOR_THICKNESS:0)-
this._listViewHeight,
0);

scrollResponder.scrollResponderScrollTo({
x:0,
y:scrollY,
animated:true});

}
}
}},{key:'_captureRequestListView',value:function _captureRequestListView(

listRef){
this._listView=listRef;
}},{key:'_listViewOnLayout',value:function _listViewOnLayout(

event){var
height=event.nativeEvent.layout.height;
this._listViewHeight=height;
}},{key:'_renderScrollComponent',value:function _renderScrollComponent(

props){
return(
React.createElement(RecyclerViewBackedScrollView,props));

}},{key:'_pressRow',value:function _pressRow(





rowID){
this._listViewHighlighted=true;
this.setState(
{detailRowID:rowID},
this._scrollToTop());

}},{key:'_scrollToTop',value:function _scrollToTop()

{
if(this._scrollView){
this._scrollView.scrollTo({
y:0,
animated:false});

}
}},{key:'_captureDetailScrollView',value:function _captureDetailScrollView(

scrollRef){
this._scrollView=scrollRef;
}},{key:'_closeButtonClicked',value:function _closeButtonClicked()

{
this.setState({detailRowID:null});
}},{key:'_getStringByValue',value:function _getStringByValue(

value){
if(value===undefined){
return'undefined';
}
if(typeof value==='object'){
return JSON.stringify(value);
}
if(typeof value==='string'&&value.length>500){
return String(value).substr(0,500).concat(
'\n***TRUNCATED TO 500 CHARACTERS***');
}
return value;
}},{key:'_getRequestIndexByXHRID',value:function _getRequestIndexByXHRID(

index){
if(index===undefined){
return-1;
}
var xhrIndex=this._xhrIdMap[index];
if(xhrIndex===undefined){
return-1;
}else{
return xhrIndex;
}
}},{key:'_getTypeShortName',value:function _getTypeShortName(

type){
if(type==='XMLHttpRequest'){
return'XHR';
}else if(type==='WebSocket'){
return'WS';
}

return'';
}},{key:'_genDetailViewItem',value:function _genDetailViewItem(







index){
this._detailViewItems[index]=[];
var detailViewItem=this._detailViewItems[index];
var requestItem=this._requests[index];
for(var _key in requestItem){
detailViewItem.push(
React.createElement(View,{style:styles.detailViewRow,key:_key},
React.createElement(Text,{style:[styles.detailViewText,styles.detailKeyCellView]},
_key),

React.createElement(Text,{style:[styles.detailViewText,styles.detailValueCellView]},
this._getStringByValue(requestItem[_key]))));



}

if(this.state.detailRowID!=null&&
Number(this.state.detailRowID)===index){
this.setState({newDetailInfo:true});
}
}},{key:'render',value:function render()

{
return(
React.createElement(View,{style:styles.container},
this.state.detailRowID!=null&&
React.createElement(TouchableHighlight,{
style:styles.closeButton,
onPress:this._closeButtonClicked},
React.createElement(View,null,
React.createElement(Text,{style:styles.clostButtonText},'v'))),


this.state.detailRowID!=null&&
React.createElement(ScrollView,{
style:styles.detailScrollView,
ref:this._captureDetailScrollView},
this._detailViewItems[this.state.detailRowID]),

React.createElement(View,{style:styles.listViewTitle},
this._requests.length>0&&
React.createElement(View,{style:styles.tableRow},
React.createElement(View,{style:styles.urlTitleCellView},
React.createElement(Text,{style:styles.cellText,numberOfLines:1},'URL')),

React.createElement(View,{style:styles.methodTitleCellView},
React.createElement(Text,{style:styles.cellText,numberOfLines:1},'Type')))),



React.createElement(ListView,{
style:styles.listView,
ref:this._captureRequestListView,
dataSource:this.state.dataSource,
renderRow:this._renderRow,
renderScrollComponent:this._renderScrollComponent,
enableEmptySections:true,
renderSeparator:this._renderSeperator,
onLayout:this._listViewOnLayout})));



}}]);return NetworkOverlay;}(React.Component);


var styles=StyleSheet.create({
container:{
paddingTop:10,
paddingBottom:10,
paddingLeft:5,
paddingRight:5},

listViewTitle:{
height:20},

listView:{
flex:1,
height:60},

tableRow:{
flexDirection:'row',
flex:1},

cellText:{
color:'white',
fontSize:12},

methodTitleCellView:{
height:18,
borderColor:'#DCD7CD',
borderTopWidth:1,
borderBottomWidth:1,
borderRightWidth:1,
alignItems:'center',
justifyContent:'center',
backgroundColor:'#444',
flex:1},

urlTitleCellView:{
height:18,
borderColor:'#DCD7CD',
borderTopWidth:1,
borderBottomWidth:1,
borderLeftWidth:1,
borderRightWidth:1,
justifyContent:'center',
backgroundColor:'#444',
flex:5,
paddingLeft:3},

methodOddCellView:{
height:15,
borderColor:'#DCD7CD',
borderRightWidth:1,
alignItems:'center',
justifyContent:'center',
backgroundColor:'#000',
flex:1},

urlOddCellView:{
height:15,
borderColor:'#DCD7CD',
borderLeftWidth:1,
borderRightWidth:1,
justifyContent:'center',
backgroundColor:'#000',
flex:5,
paddingLeft:3},

methodEvenCellView:{
height:15,
borderColor:'#DCD7CD',
borderRightWidth:1,
alignItems:'center',
justifyContent:'center',
backgroundColor:'#888',
flex:1},

urlEvenCellView:{
height:15,
borderColor:'#DCD7CD',
borderLeftWidth:1,
borderRightWidth:1,
justifyContent:'center',
backgroundColor:'#888',
flex:5,
paddingLeft:3},

detailScrollView:{
flex:1,
height:180,
marginTop:5,
marginBottom:5},

detailKeyCellView:{
flex:1.3},

detailValueCellView:{
flex:2},

detailViewRow:{
flexDirection:'row',
paddingHorizontal:3},

detailViewText:{
color:'white',
fontSize:11},

clostButtonText:{
color:'white',
fontSize:10},

closeButton:{
marginTop:5,
backgroundColor:'#888',
justifyContent:'center',
alignItems:'center'}});



module.exports=NetworkOverlay;
}, 299, null, "NetworkOverlay");
__d(/* RecyclerViewBackedScrollView */function(global, require, module, exports) {




'use strict';

module.exports=require(211 /* ScrollView */);
}, 300, null, "RecyclerViewBackedScrollView");
__d(/* WebSocketInterceptor */function(global, require, module, exports) {









'use strict';

var RCTWebSocketModule=require(29 /* NativeModules */).WebSocketModule;
var NativeEventEmitter=require(55 /* NativeEventEmitter */);

var base64=require(71 /* base64-js */);

var originalRCTWebSocketConnect=RCTWebSocketModule.connect;
var originalRCTWebSocketSend=RCTWebSocketModule.send;
var originalRCTWebSocketSendBinary=RCTWebSocketModule.sendBinary;
var originalRCTWebSocketClose=RCTWebSocketModule.close;

var eventEmitter=void 0;
var subscriptions=void 0;

var closeCallback=void 0;
var sendCallback=void 0;
var connectCallback=void 0;
var onOpenCallback=void 0;
var onMessageCallback=void 0;
var onErrorCallback=void 0;
var onCloseCallback=void 0;

var _isInterceptorEnabled=false;







var WebSocketInterceptor={



setCloseCallback:function setCloseCallback(callback){
closeCallback=callback;
},




setSendCallback:function setSendCallback(callback){
sendCallback=callback;
},




setConnectCallback:function setConnectCallback(callback){
connectCallback=callback;
},




setOnOpenCallback:function setOnOpenCallback(callback){
onOpenCallback=callback;
},




setOnMessageCallback:function setOnMessageCallback(callback){
onMessageCallback=callback;
},




setOnErrorCallback:function setOnErrorCallback(callback){
onErrorCallback=callback;
},




setOnCloseCallback:function setOnCloseCallback(callback){
onCloseCallback=callback;
},

isInterceptorEnabled:function isInterceptorEnabled(){
return _isInterceptorEnabled;
},

_unregisterEvents:function _unregisterEvents(){
subscriptions.forEach(function(e){return e.remove();});
subscriptions=[];
},




_registerEvents:function _registerEvents(){
subscriptions=[
eventEmitter.addListener('websocketMessage',function(ev){
if(onMessageCallback){
onMessageCallback(
ev.id,
ev.type==='binary'?
WebSocketInterceptor._arrayBufferToString(ev.data):ev.data);

}
}),
eventEmitter.addListener('websocketOpen',function(ev){
if(onOpenCallback){
onOpenCallback(ev.id);
}
}),
eventEmitter.addListener('websocketClosed',function(ev){
if(onCloseCallback){
onCloseCallback(ev.id,{code:ev.code,reason:ev.reason});
}
}),
eventEmitter.addListener('websocketFailed',function(ev){
if(onErrorCallback){
onErrorCallback(ev.id,{message:ev.message});
}
})];

},

enableInterception:function enableInterception(){
if(_isInterceptorEnabled){
return;
}
eventEmitter=new NativeEventEmitter(RCTWebSocketModule);
WebSocketInterceptor._registerEvents();




RCTWebSocketModule.connect=function(url,protocols,options,socketId){
if(connectCallback){
connectCallback(url,protocols,options,socketId);
}
originalRCTWebSocketConnect.apply(this,arguments);
};



RCTWebSocketModule.send=function(data,socketId){
if(sendCallback){
sendCallback(data,socketId);
}
originalRCTWebSocketSend.apply(this,arguments);
};



RCTWebSocketModule.sendBinary=function(data,socketId){
if(sendCallback){
sendCallback(WebSocketInterceptor._arrayBufferToString(data),socketId);
}
originalRCTWebSocketSendBinary.apply(this,arguments);
};



RCTWebSocketModule.close=function(){
if(closeCallback){
if(arguments.length===3){
closeCallback(arguments[0],arguments[1],arguments[2]);
}else{
closeCallback(null,null,arguments[0]);
}
}
originalRCTWebSocketClose.apply(this,arguments);
};

_isInterceptorEnabled=true;
},

_arrayBufferToString:function _arrayBufferToString(data){
var value=base64.toByteArray(data).buffer;
if(value===undefined||value===null){
return'(no value)';
}
if(typeof ArrayBuffer!=='undefined'&&
typeof Uint8Array!=='undefined'&&
value instanceof ArrayBuffer){
return'ArrayBuffer {'+String(Array.from(new Uint8Array(value)))+'}';
}
return value;
},


disableInterception:function disableInterception(){
if(!_isInterceptorEnabled){
return;
}
_isInterceptorEnabled=false;
RCTWebSocketModule.send=originalRCTWebSocketSend;
RCTWebSocketModule.sendBinary=originalRCTWebSocketSendBinary;
RCTWebSocketModule.close=originalRCTWebSocketClose;
RCTWebSocketModule.connect=originalRCTWebSocketConnect;

connectCallback=null;
closeCallback=null;
sendCallback=null;
onOpenCallback=null;
onMessageCallback=null;
onCloseCallback=null;
onErrorCallback=null;

WebSocketInterceptor._unregisterEvents();
}};


module.exports=WebSocketInterceptor;
}, 301, null, "WebSocketInterceptor");
__d(/* XHRInterceptor */function(global, require, module, exports) {









'use strict';

var XMLHttpRequest=require(231 /* XMLHttpRequest */);
var originalXHROpen=XMLHttpRequest.prototype.open;
var originalXHRSend=XMLHttpRequest.prototype.send;
var originalXHRSetRequestHeader=XMLHttpRequest.prototype.setRequestHeader;

var openCallback;
var sendCallback;
var requestHeaderCallback;
var headerReceivedCallback;
var responseCallback;

var _isInterceptorEnabled=false;








var XHRInterceptor={



setOpenCallback:function setOpenCallback(callback){
openCallback=callback;
},




setSendCallback:function setSendCallback(callback){
sendCallback=callback;
},




setHeaderReceivedCallback:function setHeaderReceivedCallback(callback){
headerReceivedCallback=callback;
},




setResponseCallback:function setResponseCallback(callback){
responseCallback=callback;
},




setRequestHeaderCallback:function setRequestHeaderCallback(callback){
requestHeaderCallback=callback;
},

isInterceptorEnabled:function isInterceptorEnabled(){
return _isInterceptorEnabled;
},

enableInterception:function enableInterception(){
if(_isInterceptorEnabled){
return;
}


XMLHttpRequest.prototype.open=function(method,url){
if(openCallback){
openCallback(method,url,this);
}
originalXHROpen.apply(this,arguments);
};



XMLHttpRequest.prototype.setRequestHeader=function(header,value){
if(requestHeaderCallback){
requestHeaderCallback(header,value,this);
}
originalXHRSetRequestHeader.apply(this,arguments);
};



XMLHttpRequest.prototype.send=function(data){var _this=this;
if(sendCallback){
sendCallback(data,this);
}
if(this.addEventListener){
this.addEventListener('readystatechange',function(){
if(!_isInterceptorEnabled){
return;
}
if(_this.readyState===_this.HEADERS_RECEIVED){
var contentTypeString=_this.getResponseHeader('Content-Type');
var contentLengthString=
_this.getResponseHeader('Content-Length');
var responseContentType=void 0,responseSize=void 0;
if(contentTypeString){
responseContentType=contentTypeString.split(';')[0];
}
if(contentLengthString){
responseSize=parseInt(contentLengthString,10);
}
if(headerReceivedCallback){
headerReceivedCallback(
responseContentType,
responseSize,
_this.getAllResponseHeaders(),_this);


}
}
if(_this.readyState===_this.DONE){
if(responseCallback){
responseCallback(
_this.status,
_this.timeout,
_this.response,
_this.responseURL,
_this.responseType,_this);


}
}
},false);
}
originalXHRSend.apply(this,arguments);
};
_isInterceptorEnabled=true;
},


disableInterception:function disableInterception(){
if(!_isInterceptorEnabled){
return;
}
_isInterceptorEnabled=false;
XMLHttpRequest.prototype.send=originalXHRSend;
XMLHttpRequest.prototype.open=originalXHROpen;
XMLHttpRequest.prototype.setRequestHeader=originalXHRSetRequestHeader;
responseCallback=null;
openCallback=null;
sendCallback=null;
headerReceivedCallback=null;
requestHeaderCallback=null;
}};


module.exports=XHRInterceptor;
}, 302, null, "XHRInterceptor");
__d(/* YellowBox */function(global, require, module, exports) {











'use strict';

var EventEmitter=require(56 /* EventEmitter */);
var Platform=require(28 /* Platform */);
var React=require(78 /* React */);
var StyleSheet=require(101 /* StyleSheet */);

var infoLog=require(201 /* infoLog */);
var openFileInEditor=require(297 /* openFileInEditor */);
var parseErrorStack=require(46 /* parseErrorStack */);
var symbolicateStackTrace=require(217 /* symbolicateStackTrace */);










var _warningEmitter=new EventEmitter();
var _warningMap=new Map();






















if(__DEV__){(function(){var _console=
console,error=_console.error,warn=_console.warn;
console.error=function(){
error.apply(console,arguments);

if(typeof arguments[0]==='string'&&
arguments[0].startsWith('Warning: ')){
updateWarningMap.apply(null,arguments);
}
};
console.warn=function(){
warn.apply(console,arguments);
updateWarningMap.apply(null,arguments);
};})();
}










function sprintf(format){for(var _len=arguments.length,args=Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){args[_key-1]=arguments[_key];}
var index=0;
return format.replace(/%s/g,function(match){return args[index++];});
}

function updateWarningMap(format){
if(console.disableYellowBox){
return;
}
var stringifySafe=require(50 /* stringifySafe */);

format=String(format);
var argCount=(format.match(/%s/g)||[]).length;for(var _len2=arguments.length,args=Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++){args[_key2-1]=arguments[_key2];}
var warning=[
sprintf.apply(undefined,[format].concat(babelHelpers.toConsumableArray(args.slice(0,argCount))))].concat(babelHelpers.toConsumableArray(
args.slice(argCount).map(stringifySafe))).
join(' ');

var warningInfo=_warningMap.get(warning);
if(warningInfo){
warningInfo.count+=1;
}else{
var error=new Error();
error.framesToPop=2;

_warningMap.set(warning,{
count:1,
stacktrace:parseErrorStack(error),
symbolicated:false});

}

_warningEmitter.emit('warning',_warningMap);
}

function ensureSymbolicatedWarning(warning){
var prevWarningInfo=_warningMap.get(warning);
if(!prevWarningInfo||prevWarningInfo.symbolicated){
return;
}
prevWarningInfo.symbolicated=true;

symbolicateStackTrace(prevWarningInfo.stacktrace).then(
function(stack){
var nextWarningInfo=_warningMap.get(warning);
if(nextWarningInfo){
nextWarningInfo.stacktrace=stack;
_warningEmitter.emit('warning',_warningMap);
}
},
function(error){
var nextWarningInfo=_warningMap.get(warning);
if(nextWarningInfo){
infoLog('Failed to symbolicate warning, "%s":',warning,error);
_warningEmitter.emit('warning',_warningMap);
}
});

}

function isWarningIgnored(warning){
return(
Array.isArray(console.ignoredYellowBox)&&
console.ignoredYellowBox.some(
function(ignorePrefix){return warning.startsWith(String(ignorePrefix));}));


}

var WarningRow=function WarningRow(_ref){var count=_ref.count,warning=_ref.warning,onPress=_ref.onPress;
var Text=require(183 /* Text */);
var TouchableHighlight=require(293 /* TouchableHighlight */);
var View=require(120 /* View */);

var countText=count>1?
React.createElement(Text,{style:styles.listRowCount},'('+count+') '):
null;

return(
React.createElement(View,{style:styles.listRow},
React.createElement(TouchableHighlight,{
activeOpacity:0.5,
onPress:onPress,
style:styles.listRowContent,
underlayColor:'transparent'},
React.createElement(Text,{style:styles.listRowText,numberOfLines:2},
countText,
warning))));




};


var StackRow=function StackRow(_ref2){var frame=_ref2.frame;
var Text=require(183 /* Text */);
var TouchableHighlight=require(293 /* TouchableHighlight */);var
file=frame.file,lineNumber=frame.lineNumber;
var fileParts=file.split('/');
var fileName=fileParts[fileParts.length-1];

return(
React.createElement(TouchableHighlight,{
activeOpacity:0.5,
style:styles.openInEditorButton,
underlayColor:'transparent',
onPress:openFileInEditor.bind(null,file,lineNumber)},
React.createElement(Text,{style:styles.inspectorCountText},
fileName,':',lineNumber)));



};

var WarningInspector=function WarningInspector(_ref3)







{var warningInfo=_ref3.warningInfo,warning=_ref3.warning,stacktraceVisible=_ref3.stacktraceVisible,onDismiss=_ref3.onDismiss,onDismissAll=_ref3.onDismissAll,onMinimize=_ref3.onMinimize,toggleStacktrace=_ref3.toggleStacktrace;
var ScrollView=require(211 /* ScrollView */);
var Text=require(183 /* Text */);
var TouchableHighlight=require(293 /* TouchableHighlight */);
var View=require(120 /* View */);var _ref4=
warningInfo||{},count=_ref4.count,stacktrace=_ref4.stacktrace;

var countSentence=
'Warning encountered '+count+' time'+(count-1?'s':'')+'.';

var stacktraceList=void 0;
if(stacktraceVisible&&stacktrace){
stacktraceList=
React.createElement(View,{style:styles.stacktraceList},
stacktrace.map(function(frame,ii){return React.createElement(StackRow,{frame:frame,key:ii});}));


}

return(
React.createElement(View,{style:styles.inspector},
React.createElement(View,{style:styles.inspectorCount},
React.createElement(Text,{style:styles.inspectorCountText},countSentence),
React.createElement(TouchableHighlight,{
activeOpacity:0.5,
onPress:toggleStacktrace,
style:styles.toggleStacktraceButton,
underlayColor:'transparent'},
React.createElement(Text,{style:styles.inspectorButtonText},
stacktraceVisible?'Hide':'Show',' Stacktrace'))),



React.createElement(ScrollView,{style:styles.inspectorWarning},
stacktraceList,
React.createElement(Text,{style:styles.inspectorWarningText},warning)),

React.createElement(View,{style:styles.inspectorButtons},
React.createElement(TouchableHighlight,{
activeOpacity:0.5,
onPress:onMinimize,
style:styles.inspectorButton,
underlayColor:'transparent'},
React.createElement(Text,{style:styles.inspectorButtonText},'Minimize')),



React.createElement(TouchableHighlight,{
activeOpacity:0.5,
onPress:onDismiss,
style:styles.inspectorButton,
underlayColor:'transparent'},
React.createElement(Text,{style:styles.inspectorButtonText},'Dismiss')),



React.createElement(TouchableHighlight,{
activeOpacity:0.5,
onPress:onDismissAll,
style:styles.inspectorButton,
underlayColor:'transparent'},
React.createElement(Text,{style:styles.inspectorButtonText},'Dismiss All')))));






};var

YellowBox=function(_React$Component){babelHelpers.inherits(YellowBox,_React$Component);








function YellowBox(props,context){babelHelpers.classCallCheck(this,YellowBox);var _this=babelHelpers.possibleConstructorReturn(this,(YellowBox.__proto__||Object.getPrototypeOf(YellowBox)).call(this,
props,context));
_this.state={
inspecting:null,
stacktraceVisible:false,
warningMap:_warningMap};

_this.dismissWarning=function(warning){var _this$state=
_this.state,inspecting=_this$state.inspecting,warningMap=_this$state.warningMap;
if(warning){
warningMap.delete(warning);
}else{
warningMap.clear();
}
_this.setState({
inspecting:warning&&inspecting!==warning?inspecting:null,
warningMap:warningMap});

};return _this;
}babelHelpers.createClass(YellowBox,[{key:'componentDidMount',value:function componentDidMount()

{var _this2=this;
var scheduled=null;
this._listener=_warningEmitter.addListener('warning',function(warningMap){


scheduled=scheduled||setImmediate(function(){
scheduled=null;
_this2.setState({
warningMap:warningMap});

});
});
}},{key:'componentDidUpdate',value:function componentDidUpdate()

{var
inspecting=this.state.inspecting;
if(inspecting!=null){
ensureSymbolicatedWarning(inspecting);
}
}},{key:'componentWillUnmount',value:function componentWillUnmount()

{
if(this._listener){
this._listener.remove();
}
}},{key:'render',value:function render()

{var _this3=this;
if(console.disableYellowBox||this.state.warningMap.size===0){
return null;
}
var ScrollView=require(211 /* ScrollView */);
var View=require(120 /* View */);var _state=

this.state,inspecting=_state.inspecting,stacktraceVisible=_state.stacktraceVisible;
var inspector=inspecting!==null?
React.createElement(WarningInspector,{
warningInfo:this.state.warningMap.get(inspecting),
warning:inspecting,
stacktraceVisible:stacktraceVisible,
onDismiss:function onDismiss(){return _this3.dismissWarning(inspecting);},
onDismissAll:function onDismissAll(){return _this3.dismissWarning(null);},
onMinimize:function onMinimize(){return _this3.setState({inspecting:null});},
toggleStacktrace:function toggleStacktrace(){return _this3.setState({stacktraceVisible:!stacktraceVisible});}}):

null;

var rows=[];
this.state.warningMap.forEach(function(warningInfo,warning){
if(!isWarningIgnored(warning)){
rows.push(
React.createElement(WarningRow,{
key:warning,
count:warningInfo.count,
warning:warning,
onPress:function onPress(){return _this3.setState({inspecting:warning});},
onDismiss:function onDismiss(){return _this3.dismissWarning(warning);}}));


}
});

var listStyle=[
styles.list,

{height:Math.min(rows.length,4.4)*(rowGutter+rowHeight)}];

return(
React.createElement(View,{style:inspector?styles.fullScreen:listStyle},
React.createElement(ScrollView,{style:listStyle,scrollsToTop:false},
rows),

inspector));


}}]);return YellowBox;}(React.Component);


var backgroundColor=function backgroundColor(opacity){return'rgba(250, 186, 48, '+opacity+')';};
var textColor='white';
var rowGutter=1;
var rowHeight=46;

var styles=StyleSheet.create({
fullScreen:{
backgroundColor:'transparent',
position:'absolute',
left:0,
right:0,
top:0,
bottom:0},

inspector:{
backgroundColor:backgroundColor(0.95),
flex:1,
paddingTop:5},

inspectorButtons:{
flexDirection:'row'},

inspectorButton:{
flex:1,
paddingVertical:22,
backgroundColor:backgroundColor(1)},

toggleStacktraceButton:{
flex:1,
padding:5},

stacktraceList:{
paddingBottom:5},

inspectorButtonText:{
color:textColor,
fontSize:14,
opacity:0.8,
textAlign:'center'},

openInEditorButton:{
paddingTop:5,
paddingBottom:5},

inspectorCount:{
padding:15,
paddingBottom:0},

inspectorCountText:{
color:textColor,
fontSize:14},

inspectorWarning:{
flex:1,
paddingHorizontal:15},

inspectorWarningText:{
color:textColor,
fontSize:16,
fontWeight:'600'},

list:{
backgroundColor:'transparent',
position:'absolute',
left:0,
right:0,
bottom:0},

listRow:{
position:'relative',
backgroundColor:backgroundColor(0.95),
flex:1,
height:rowHeight,
marginTop:rowGutter},

listRowContent:{
flex:1},

listRowCount:{
color:'rgba(255, 255, 255, 0.5)'},

listRowText:{
color:textColor,
position:'absolute',
left:0,
top:Platform.OS==='android'?5:7,
marginLeft:15,
marginRight:15}});



module.exports=YellowBox;
}, 303, null, "YellowBox");
__d(/* I18nManager */function(global, require, module, exports) {










'use strict';







var I18nManager=require(29 /* NativeModules */).I18nManager||{
isRTL:false,
allowRTL:function allowRTL(){},
forceRTL:function forceRTL(){}};


module.exports=I18nManager;
}, 304, null, "I18nManager");
__d(/* Navigator */function(global, require, module, exports) {































'use strict';

var AnimationsDebugModule=require(29 /* NativeModules */).AnimationsDebugModule;
var Dimensions=require(103 /* Dimensions */);
var InteractionMixin=require(306 /* InteractionMixin */);
var NavigationContext=require(307 /* NavigationContext */);
var NavigatorBreadcrumbNavigationBar=require(312 /* NavigatorBreadcrumbNavigationBar */);
var NavigatorNavigationBar=require(317 /* NavigatorNavigationBar */);
var NavigatorSceneConfigs=require(318 /* NavigatorSceneConfigs */);
var PanResponder=require(319 /* PanResponder */);
var React=require(78 /* React */);
var StyleSheet=require(101 /* StyleSheet */);
var Subscribable=require(263 /* Subscribable */);
var TimerMixin=require(265 /* react-timer-mixin */);
var View=require(120 /* View */);

var clamp=require(321 /* clamp */);
var flattenStyle=require(25 /* flattenStyle */);
var invariant=require(26 /* fbjs/lib/invariant */);
var rebound=require(322 /* rebound */);

var PropTypes=React.PropTypes;




var SCREEN_WIDTH=Dimensions.get('window').width;
var SCREEN_HEIGHT=Dimensions.get('window').height;
var SCENE_DISABLED_NATIVE_PROPS={
pointerEvents:'none',
style:{
top:SCREEN_HEIGHT,
bottom:-SCREEN_HEIGHT,
opacity:0}};



var __uid=0;
function getuid(){
return __uid++;
}

function getRouteID(route){
if(route===null||typeof route!=='object'){
return String(route);
}

var key='__navigatorRouteID';

if(!route.hasOwnProperty(key)){
Object.defineProperty(route,key,{
enumerable:false,
configurable:false,
writable:false,
value:getuid()});

}
return route[key];
}


var styles=StyleSheet.create({
container:{
flex:1,
overflow:'hidden'},

defaultSceneStyle:{
position:'absolute',
left:0,
right:0,
bottom:0,
top:0,
transform:[
{translateX:0},
{translateY:0},
{scaleX:1},
{scaleY:1},
{rotate:'0deg'},
{skewX:'0deg'},
{skewY:'0deg'}]},


baseScene:{
position:'absolute',
overflow:'hidden',
left:0,
right:0,
bottom:0,
top:0},

disabledScene:{
top:SCREEN_HEIGHT,
bottom:-SCREEN_HEIGHT},

transitioner:{
flex:1,
backgroundColor:'transparent',
overflow:'hidden'}});



var GESTURE_ACTIONS=[
'pop',
'jumpBack',
'jumpForward'];



























































































































































var Navigator=React.createClass({displayName:'Navigator',

propTypes:{





























configureScene:PropTypes.func,










renderScene:PropTypes.func.isRequired,











initialRoute:PropTypes.object,







initialRouteStack:PropTypes.arrayOf(PropTypes.object),





onWillFocus:PropTypes.func,





onDidFocus:PropTypes.func,








navigationBar:PropTypes.node,




navigator:PropTypes.object,




sceneStyle:View.propTypes.style},


statics:{
BreadcrumbNavigationBar:NavigatorBreadcrumbNavigationBar,
NavigationBar:NavigatorNavigationBar,
SceneConfigs:NavigatorSceneConfigs},


mixins:[TimerMixin,InteractionMixin,Subscribable.Mixin],

getDefaultProps:function getDefaultProps(){
return{
configureScene:function configureScene(){return NavigatorSceneConfigs.PushFromRight;},
sceneStyle:styles.defaultSceneStyle};

},

getInitialState:function getInitialState(){var _this=this;
this._navigationBarNavigator=this.props.navigationBarNavigator||this;

this._renderedSceneMap=new Map();

this._sceneRefs=[];

var routeStack=this.props.initialRouteStack||[this.props.initialRoute];
invariant(
routeStack.length>=1,
'Navigator requires props.initialRoute or props.initialRouteStack.');

var initialRouteIndex=routeStack.length-1;
if(this.props.initialRoute){
initialRouteIndex=routeStack.indexOf(this.props.initialRoute);
invariant(
initialRouteIndex!==-1,
'initialRoute is not in initialRouteStack.');

}
return{
sceneConfigStack:routeStack.map(
function(route){return _this.props.configureScene(route,routeStack);}),

routeStack:routeStack,
presentedIndex:initialRouteIndex,
transitionFromIndex:null,
activeGesture:null,
pendingGestureProgress:null,
transitionQueue:[]};

},

componentWillMount:function componentWillMount(){var _this2=this;

this.__defineGetter__('navigationContext',this._getNavigationContext);

this._subRouteFocus=[];
this.parentNavigator=this.props.navigator;
this._handlers={};
this.springSystem=new rebound.SpringSystem();
this.spring=this.springSystem.createSpring();
this.spring.setRestSpeedThreshold(0.05);
this.spring.setCurrentValue(0).setAtRest();
this.spring.addListener({
onSpringEndStateChange:function onSpringEndStateChange(){
if(!_this2._interactionHandle){
_this2._interactionHandle=_this2.createInteractionHandle();
}
},
onSpringUpdate:function onSpringUpdate(){
_this2._handleSpringUpdate();
},
onSpringAtRest:function onSpringAtRest(){
_this2._completeTransition();
}});

this.panGesture=PanResponder.create({
onMoveShouldSetPanResponder:this._handleMoveShouldSetPanResponder,
onPanResponderRelease:this._handlePanResponderRelease,
onPanResponderMove:this._handlePanResponderMove,
onPanResponderTerminate:this._handlePanResponderTerminate});

this._interactionHandle=null;
this._emitWillFocus(this.state.routeStack[this.state.presentedIndex]);
},

componentDidMount:function componentDidMount(){
this._handleSpringUpdate();
this._emitDidFocus(this.state.routeStack[this.state.presentedIndex]);
},

componentWillUnmount:function componentWillUnmount(){
if(this._navigationContext){
this._navigationContext.dispose();
this._navigationContext=null;
}

this.spring.destroy();

if(this._interactionHandle){
this.clearInteractionHandle(this._interactionHandle);
}
},









immediatelyResetRouteStack:function immediatelyResetRouteStack(nextRouteStack){var _this3=this;
var destIndex=nextRouteStack.length-1;
this._emitWillFocus(nextRouteStack[destIndex]);
this.setState({
routeStack:nextRouteStack,
sceneConfigStack:nextRouteStack.map(
function(route){return _this3.props.configureScene(route,nextRouteStack);}),

presentedIndex:destIndex,
activeGesture:null,
transitionFromIndex:null,
transitionQueue:[]},
function(){
_this3._handleSpringUpdate();
var navBar=_this3._navBar;
if(navBar&&navBar.immediatelyRefresh){
navBar.immediatelyRefresh();
}
_this3._emitDidFocus(_this3.state.routeStack[_this3.state.presentedIndex]);
});
},

_transitionTo:function _transitionTo(destIndex,velocity,jumpSpringTo,cb){
if(this.state.presentedIndex===destIndex){
cb&&cb();
return;
}

if(this.state.transitionFromIndex!==null){

this.state.transitionQueue.push({
destIndex:destIndex,
velocity:velocity,
cb:cb});

return;
}

this.state.transitionFromIndex=this.state.presentedIndex;
this.state.presentedIndex=destIndex;
this.state.transitionCb=cb;
this._onAnimationStart();
if(AnimationsDebugModule){
AnimationsDebugModule.startRecordingFps();
}
var sceneConfig=this.state.sceneConfigStack[this.state.transitionFromIndex]||
this.state.sceneConfigStack[this.state.presentedIndex];
invariant(
sceneConfig,
'Cannot configure scene at index '+this.state.transitionFromIndex);

if(jumpSpringTo!=null){
this.spring.setCurrentValue(jumpSpringTo);
}
this.spring.setOvershootClampingEnabled(true);
this.spring.getSpringConfig().friction=sceneConfig.springFriction;
this.spring.getSpringConfig().tension=sceneConfig.springTension;
this.spring.setVelocity(velocity||sceneConfig.defaultTransitionVelocity);
this.spring.setEndValue(1);
},





_handleSpringUpdate:function _handleSpringUpdate(){
if(!this.isMounted()){
return;
}

if(this.state.transitionFromIndex!=null){
this._transitionBetween(
this.state.transitionFromIndex,
this.state.presentedIndex,
this.spring.getCurrentValue());

}else if(this.state.activeGesture!=null){
var presentedToIndex=this.state.presentedIndex+this._deltaForGestureAction(this.state.activeGesture);
this._transitionBetween(
this.state.presentedIndex,
presentedToIndex,
this.spring.getCurrentValue());

}
},




_completeTransition:function _completeTransition(){
if(!this.isMounted()){
return;
}

if(this.spring.getCurrentValue()!==1&&this.spring.getCurrentValue()!==0){


if(this.state.pendingGestureProgress){
this.state.pendingGestureProgress=null;
}
return;
}
this._onAnimationEnd();
var presentedIndex=this.state.presentedIndex;
var didFocusRoute=this._subRouteFocus[presentedIndex]||this.state.routeStack[presentedIndex];

if(AnimationsDebugModule){
AnimationsDebugModule.stopRecordingFps(Date.now());
}
this.state.transitionFromIndex=null;
this.spring.setCurrentValue(0).setAtRest();
this._hideScenes();
if(this.state.transitionCb){
this.state.transitionCb();
this.state.transitionCb=null;
}

this._emitDidFocus(didFocusRoute);

if(this._interactionHandle){
this.clearInteractionHandle(this._interactionHandle);
this._interactionHandle=null;
}
if(this.state.pendingGestureProgress){


var gestureToIndex=this.state.presentedIndex+this._deltaForGestureAction(this.state.activeGesture);
this._enableScene(gestureToIndex);
this.spring.setEndValue(this.state.pendingGestureProgress);
return;
}
if(this.state.transitionQueue.length){
var queuedTransition=this.state.transitionQueue.shift();
this._enableScene(queuedTransition.destIndex);
this._emitWillFocus(this.state.routeStack[queuedTransition.destIndex]);
this._transitionTo(
queuedTransition.destIndex,
queuedTransition.velocity,
null,
queuedTransition.cb);

}
},

_emitDidFocus:function _emitDidFocus(route){
this.navigationContext.emit('didfocus',{route:route});

if(this.props.onDidFocus){
this.props.onDidFocus(route);
}
},

_emitWillFocus:function _emitWillFocus(route){
this.navigationContext.emit('willfocus',{route:route});

var navBar=this._navBar;
if(navBar&&navBar.handleWillFocus){
navBar.handleWillFocus(route);
}
if(this.props.onWillFocus){
this.props.onWillFocus(route);
}
},




_hideScenes:function _hideScenes(){
var gesturingToIndex=null;
if(this.state.activeGesture){
gesturingToIndex=this.state.presentedIndex+this._deltaForGestureAction(this.state.activeGesture);
}
for(var i=0;i<this.state.routeStack.length;i++){
if(i===this.state.presentedIndex||
i===this.state.transitionFromIndex||
i===gesturingToIndex){
continue;
}
this._disableScene(i);
}
},




_disableScene:function _disableScene(sceneIndex){
this._sceneRefs[sceneIndex]&&
this._sceneRefs[sceneIndex].setNativeProps(SCENE_DISABLED_NATIVE_PROPS);
},




_enableScene:function _enableScene(sceneIndex){

var sceneStyle=flattenStyle([styles.baseScene,this.props.sceneStyle]);

var enabledSceneNativeProps={
pointerEvents:'auto',
style:{
top:sceneStyle.top,
bottom:sceneStyle.bottom}};


if(sceneIndex!==this.state.transitionFromIndex&&
sceneIndex!==this.state.presentedIndex){


enabledSceneNativeProps.style.opacity=0;
}
this._sceneRefs[sceneIndex]&&
this._sceneRefs[sceneIndex].setNativeProps(enabledSceneNativeProps);
},

_clearTransformations:function _clearTransformations(sceneIndex){
var defaultStyle=flattenStyle([styles.defaultSceneStyle]);
this._sceneRefs[sceneIndex].setNativeProps({style:defaultStyle});
},

_onAnimationStart:function _onAnimationStart(){
var fromIndex=this.state.presentedIndex;
var toIndex=this.state.presentedIndex;
if(this.state.transitionFromIndex!=null){
fromIndex=this.state.transitionFromIndex;
}else if(this.state.activeGesture){
toIndex=this.state.presentedIndex+this._deltaForGestureAction(this.state.activeGesture);
}
this._setRenderSceneToHardwareTextureAndroid(fromIndex,true);
this._setRenderSceneToHardwareTextureAndroid(toIndex,true);
var navBar=this._navBar;
if(navBar&&navBar.onAnimationStart){
navBar.onAnimationStart(fromIndex,toIndex);
}
},

_onAnimationEnd:function _onAnimationEnd(){
var max=this.state.routeStack.length-1;
for(var index=0;index<=max;index++){
this._setRenderSceneToHardwareTextureAndroid(index,false);
}

var navBar=this._navBar;
if(navBar&&navBar.onAnimationEnd){
navBar.onAnimationEnd();
}
},

_setRenderSceneToHardwareTextureAndroid:function _setRenderSceneToHardwareTextureAndroid(sceneIndex,shouldRenderToHardwareTexture){
var viewAtIndex=this._sceneRefs[sceneIndex];
if(viewAtIndex===null||viewAtIndex===undefined){
return;
}
viewAtIndex.setNativeProps({renderToHardwareTextureAndroid:shouldRenderToHardwareTexture});
},

_handleTouchStart:function _handleTouchStart(){
this._eligibleGestures=GESTURE_ACTIONS;
},

_handleMoveShouldSetPanResponder:function _handleMoveShouldSetPanResponder(e,gestureState){
var sceneConfig=this.state.sceneConfigStack[this.state.presentedIndex];
if(!sceneConfig){
return false;
}
this._expectingGestureGrant=
this._matchGestureAction(this._eligibleGestures,sceneConfig.gestures,gestureState);
return!!this._expectingGestureGrant;
},

_doesGestureOverswipe:function _doesGestureOverswipe(gestureName){
var wouldOverswipeBack=this.state.presentedIndex<=0&&(
gestureName==='pop'||gestureName==='jumpBack');
var wouldOverswipeForward=this.state.presentedIndex>=this.state.routeStack.length-1&&
gestureName==='jumpForward';
return wouldOverswipeForward||wouldOverswipeBack;
},

_deltaForGestureAction:function _deltaForGestureAction(gestureAction){
switch(gestureAction){
case'pop':
case'jumpBack':
return-1;
case'jumpForward':
return 1;
default:
invariant(false,'Unsupported gesture action '+gestureAction);
return;}

},

_handlePanResponderRelease:function _handlePanResponderRelease(e,gestureState){var _this4=this;
var sceneConfig=this.state.sceneConfigStack[this.state.presentedIndex];
var releaseGestureAction=this.state.activeGesture;
if(!releaseGestureAction){

return;
}
var releaseGesture=sceneConfig.gestures[releaseGestureAction];
var destIndex=this.state.presentedIndex+this._deltaForGestureAction(this.state.activeGesture);
if(this.spring.getCurrentValue()===0){

this.spring.setCurrentValue(0).setAtRest();
this._completeTransition();
return;
}
var isTravelVertical=releaseGesture.direction==='top-to-bottom'||releaseGesture.direction==='bottom-to-top';
var isTravelInverted=releaseGesture.direction==='right-to-left'||releaseGesture.direction==='bottom-to-top';
var velocity,gestureDistance;
if(isTravelVertical){
velocity=isTravelInverted?-gestureState.vy:gestureState.vy;
gestureDistance=isTravelInverted?-gestureState.dy:gestureState.dy;
}else{
velocity=isTravelInverted?-gestureState.vx:gestureState.vx;
gestureDistance=isTravelInverted?-gestureState.dx:gestureState.dx;
}
var transitionVelocity=clamp(-10,velocity,10);
if(Math.abs(velocity)<releaseGesture.notMoving){

var hasGesturedEnoughToComplete=gestureDistance>releaseGesture.fullDistance*releaseGesture.stillCompletionRatio;
transitionVelocity=hasGesturedEnoughToComplete?releaseGesture.snapVelocity:-releaseGesture.snapVelocity;
}
if(transitionVelocity<0||this._doesGestureOverswipe(releaseGestureAction)){


if(this.state.transitionFromIndex==null){

var transitionBackToPresentedIndex=this.state.presentedIndex;

this.state.presentedIndex=destIndex;
this._transitionTo(
transitionBackToPresentedIndex,
-transitionVelocity,
1-this.spring.getCurrentValue());

}
}else{

this._emitWillFocus(this.state.routeStack[destIndex]);
this._transitionTo(
destIndex,
transitionVelocity,
null,
function(){
if(releaseGestureAction==='pop'){
_this4._cleanScenesPastIndex(destIndex);
}
});

}
this._detachGesture();
},

_handlePanResponderTerminate:function _handlePanResponderTerminate(e,gestureState){
if(this.state.activeGesture==null){
return;
}
var destIndex=this.state.presentedIndex+this._deltaForGestureAction(this.state.activeGesture);
this._detachGesture();
var transitionBackToPresentedIndex=this.state.presentedIndex;

this.state.presentedIndex=destIndex;
this._transitionTo(
transitionBackToPresentedIndex,
null,
1-this.spring.getCurrentValue());

},

_attachGesture:function _attachGesture(gestureId){
this.state.activeGesture=gestureId;
var gesturingToIndex=this.state.presentedIndex+this._deltaForGestureAction(this.state.activeGesture);
this._enableScene(gesturingToIndex);
},

_detachGesture:function _detachGesture(){
this.state.activeGesture=null;
this.state.pendingGestureProgress=null;
this._hideScenes();
},

_handlePanResponderMove:function _handlePanResponderMove(e,gestureState){
if(this._isMoveGestureAttached!==undefined){
invariant(
this._expectingGestureGrant,
'Responder granted unexpectedly.');

this._attachGesture(this._expectingGestureGrant);
this._onAnimationStart();
this._expectingGestureGrant=undefined;
}

var sceneConfig=this.state.sceneConfigStack[this.state.presentedIndex];
if(this.state.activeGesture){
var gesture=sceneConfig.gestures[this.state.activeGesture];
return this._moveAttachedGesture(gesture,gestureState);
}
var matchedGesture=this._matchGestureAction(GESTURE_ACTIONS,sceneConfig.gestures,gestureState);
if(matchedGesture){
this._attachGesture(matchedGesture);
}
},

_moveAttachedGesture:function _moveAttachedGesture(gesture,gestureState){
var isTravelVertical=gesture.direction==='top-to-bottom'||gesture.direction==='bottom-to-top';
var isTravelInverted=gesture.direction==='right-to-left'||gesture.direction==='bottom-to-top';
var distance=isTravelVertical?gestureState.dy:gestureState.dx;
distance=isTravelInverted?-distance:distance;
var gestureDetectMovement=gesture.gestureDetectMovement;
var nextProgress=(distance-gestureDetectMovement)/(
gesture.fullDistance-gestureDetectMovement);
if(nextProgress<0&&gesture.isDetachable){
var gesturingToIndex=this.state.presentedIndex+this._deltaForGestureAction(this.state.activeGesture);
this._transitionBetween(this.state.presentedIndex,gesturingToIndex,0);
this._detachGesture();
if(this.state.pendingGestureProgress!=null){
this.spring.setCurrentValue(0);
}
return;
}
if(gesture.overswipe&&this._doesGestureOverswipe(this.state.activeGesture)){
var frictionConstant=gesture.overswipe.frictionConstant;
var frictionByDistance=gesture.overswipe.frictionByDistance;
var frictionRatio=1/(frictionConstant+Math.abs(nextProgress)*frictionByDistance);
nextProgress*=frictionRatio;
}
nextProgress=clamp(0,nextProgress,1);
if(this.state.transitionFromIndex!=null){
this.state.pendingGestureProgress=nextProgress;
}else if(this.state.pendingGestureProgress){
this.spring.setEndValue(nextProgress);
}else{
this.spring.setCurrentValue(nextProgress);
}
},

_matchGestureAction:function _matchGestureAction(eligibleGestures,gestures,gestureState){var _this5=this;
if(!gestures||!eligibleGestures||!eligibleGestures.some){
return null;
}
var matchedGesture=null;
eligibleGestures.some(function(gestureName,gestureIndex){
var gesture=gestures[gestureName];
if(!gesture){
return;
}
if(gesture.overswipe==null&&_this5._doesGestureOverswipe(gestureName)){

return false;
}
var isTravelVertical=gesture.direction==='top-to-bottom'||gesture.direction==='bottom-to-top';
var isTravelInverted=gesture.direction==='right-to-left'||gesture.direction==='bottom-to-top';
var startedLoc=isTravelVertical?gestureState.y0:gestureState.x0;
var currentLoc=isTravelVertical?gestureState.moveY:gestureState.moveX;
var travelDist=isTravelVertical?gestureState.dy:gestureState.dx;
var oppositeAxisTravelDist=
isTravelVertical?gestureState.dx:gestureState.dy;
var edgeHitWidth=gesture.edgeHitWidth;
if(isTravelInverted){
startedLoc=-startedLoc;
currentLoc=-currentLoc;
travelDist=-travelDist;
oppositeAxisTravelDist=-oppositeAxisTravelDist;
edgeHitWidth=isTravelVertical?
-(SCREEN_HEIGHT-edgeHitWidth):
-(SCREEN_WIDTH-edgeHitWidth);
}
if(startedLoc===0){
startedLoc=currentLoc;
}
var moveStartedInRegion=gesture.edgeHitWidth==null||
startedLoc<edgeHitWidth;
if(!moveStartedInRegion){
return false;
}
var moveTravelledFarEnough=travelDist>=gesture.gestureDetectMovement;
if(!moveTravelledFarEnough){
return false;
}
var directionIsCorrect=Math.abs(travelDist)>Math.abs(oppositeAxisTravelDist)*gesture.directionRatio;
if(directionIsCorrect){
matchedGesture=gestureName;
return true;
}else{
_this5._eligibleGestures=_this5._eligibleGestures.slice().splice(gestureIndex,1);
}
});
return matchedGesture||null;
},

_transitionSceneStyle:function _transitionSceneStyle(fromIndex,toIndex,progress,index){
var viewAtIndex=this._sceneRefs[index];
if(viewAtIndex===null||viewAtIndex===undefined){
return;
}

var sceneConfigIndex=fromIndex<toIndex?toIndex:fromIndex;
var sceneConfig=this.state.sceneConfigStack[sceneConfigIndex];

if(!sceneConfig){
sceneConfig=this.state.sceneConfigStack[sceneConfigIndex-1];
}
var styleToUse={};
var useFn=index<fromIndex||index<toIndex?
sceneConfig.animationInterpolators.out:
sceneConfig.animationInterpolators.into;
var directionAdjustedProgress=fromIndex<toIndex?progress:1-progress;
var didChange=useFn(styleToUse,directionAdjustedProgress);
if(didChange){
viewAtIndex.setNativeProps({style:styleToUse});
}
},

_transitionBetween:function _transitionBetween(fromIndex,toIndex,progress){
this._transitionSceneStyle(fromIndex,toIndex,progress,fromIndex);
this._transitionSceneStyle(fromIndex,toIndex,progress,toIndex);
var navBar=this._navBar;
if(navBar&&navBar.updateProgress&&toIndex>=0&&fromIndex>=0){
navBar.updateProgress(progress,fromIndex,toIndex);
}
},

_handleResponderTerminationRequest:function _handleResponderTerminationRequest(){
return false;
},

_getDestIndexWithinBounds:function _getDestIndexWithinBounds(n){
var currentIndex=this.state.presentedIndex;
var destIndex=currentIndex+n;
invariant(
destIndex>=0,
'Cannot jump before the first route.');

var maxIndex=this.state.routeStack.length-1;
invariant(
maxIndex>=destIndex,
'Cannot jump past the last route.');

return destIndex;
},

_jumpN:function _jumpN(n){
var destIndex=this._getDestIndexWithinBounds(n);
this._enableScene(destIndex);
this._emitWillFocus(this.state.routeStack[destIndex]);
this._transitionTo(destIndex);
},






jumpTo:function jumpTo(route){
var destIndex=this.state.routeStack.indexOf(route);
invariant(
destIndex!==-1,
'Cannot jump to route that is not in the route stack');

this._jumpN(destIndex-this.state.presentedIndex);
},




jumpForward:function jumpForward(){
this._jumpN(1);
},




jumpBack:function jumpBack(){
this._jumpN(-1);
},






push:function push(route){var _this6=this;
invariant(!!route,'Must supply route to push');
var activeLength=this.state.presentedIndex+1;
var activeStack=this.state.routeStack.slice(0,activeLength);
var activeAnimationConfigStack=this.state.sceneConfigStack.slice(0,activeLength);
var nextStack=activeStack.concat([route]);
var destIndex=nextStack.length-1;
var nextSceneConfig=this.props.configureScene(route,nextStack);
var nextAnimationConfigStack=activeAnimationConfigStack.concat([nextSceneConfig]);
this._emitWillFocus(nextStack[destIndex]);
this.setState({
routeStack:nextStack,
sceneConfigStack:nextAnimationConfigStack},
function(){
_this6._enableScene(destIndex);
_this6._transitionTo(destIndex,nextSceneConfig.defaultTransitionVelocity);
});
},






popN:function popN(n){var _this7=this;
invariant(typeof n==='number','Must supply a number to popN');
n=parseInt(n,10);
if(n<=0||this.state.presentedIndex-n<0){
return;
}
var popIndex=this.state.presentedIndex-n;
var presentedRoute=this.state.routeStack[this.state.presentedIndex];
var popSceneConfig=this.props.configureScene(presentedRoute);
this._enableScene(popIndex);



this._clearTransformations(popIndex);
this._emitWillFocus(this.state.routeStack[popIndex]);
this._transitionTo(
popIndex,
popSceneConfig.defaultTransitionVelocity,
null,
function(){
_this7._cleanScenesPastIndex(popIndex);
});

},




pop:function pop(){
if(this.state.transitionQueue.length){






return;
}

this.popN(1);
},








replaceAtIndex:function replaceAtIndex(route,index,cb){var _this8=this;
invariant(!!route,'Must supply route to replace');
if(index<0){
index+=this.state.routeStack.length;
}

if(this.state.routeStack.length<=index){
return;
}

var nextRouteStack=this.state.routeStack.slice();
var nextAnimationModeStack=this.state.sceneConfigStack.slice();
nextRouteStack[index]=route;
nextAnimationModeStack[index]=this.props.configureScene(route,nextRouteStack);

if(index===this.state.presentedIndex){
this._emitWillFocus(route);
}
this.setState({
routeStack:nextRouteStack,
sceneConfigStack:nextAnimationModeStack},
function(){
if(index===_this8.state.presentedIndex){
_this8._emitDidFocus(route);
}
cb&&cb();
});
},





replace:function replace(route){
this.replaceAtIndex(route,this.state.presentedIndex);
},





replacePrevious:function replacePrevious(route){
this.replaceAtIndex(route,this.state.presentedIndex-1);
},




popToTop:function popToTop(){
this.popToRoute(this.state.routeStack[0]);
},






popToRoute:function popToRoute(route){
var indexOfRoute=this.state.routeStack.indexOf(route);
invariant(
indexOfRoute!==-1,
'Calling popToRoute for a route that doesn\'t exist!');

var numToPop=this.state.presentedIndex-indexOfRoute;
this.popN(numToPop);
},





replacePreviousAndPop:function replacePreviousAndPop(route){
if(this.state.routeStack.length<2){
return;
}
this.replacePrevious(route);
this.pop();
},





resetTo:function resetTo(route){var _this9=this;
invariant(!!route,'Must supply route to push');
this.replaceAtIndex(route,0,function(){


_this9.popN(_this9.state.presentedIndex);
});
},




getCurrentRoutes:function getCurrentRoutes(){

return this.state.routeStack.slice();
},

_cleanScenesPastIndex:function _cleanScenesPastIndex(index){
var newStackLength=index+1;

if(newStackLength<this.state.routeStack.length){
this.setState({
sceneConfigStack:this.state.sceneConfigStack.slice(0,newStackLength),
routeStack:this.state.routeStack.slice(0,newStackLength)});

}
},

_renderScene:function _renderScene(route,i){var _this10=this;
var disabledSceneStyle=null;
var disabledScenePointerEvents='auto';
if(i!==this.state.presentedIndex){
disabledSceneStyle=styles.disabledScene;
disabledScenePointerEvents='none';
}
return(
React.createElement(View,{
key:'scene_'+getRouteID(route),
ref:function ref(scene){
_this10._sceneRefs[i]=scene;
},
onStartShouldSetResponderCapture:function onStartShouldSetResponderCapture(){
return _this10.state.transitionFromIndex!=null;
},
pointerEvents:disabledScenePointerEvents,
style:[styles.baseScene,this.props.sceneStyle,disabledSceneStyle]},
this.props.renderScene(
route,
this)));



},

_renderNavigationBar:function _renderNavigationBar(){var _this11=this;var
navigationBar=this.props.navigationBar;
if(!navigationBar){
return null;
}
return React.cloneElement(navigationBar,{
ref:function ref(navBar){
_this11._navBar=navBar;
if(navigationBar&&typeof navigationBar.ref==='function'){
navigationBar.ref(navBar);
}
},
navigator:this._navigationBarNavigator,
navState:this.state});

},

render:function render(){var _this12=this;
var newRenderedSceneMap=new Map();
var scenes=this.state.routeStack.map(function(route,index){
var renderedScene;
if(_this12._renderedSceneMap.has(route)&&
index!==_this12.state.presentedIndex){
renderedScene=_this12._renderedSceneMap.get(route);
}else{
renderedScene=_this12._renderScene(route,index);
}
newRenderedSceneMap.set(route,renderedScene);
return renderedScene;
});
this._renderedSceneMap=newRenderedSceneMap;
return(
React.createElement(View,{style:[styles.container,this.props.style]},
React.createElement(View,babelHelpers.extends({
style:styles.transitioner},
this.panGesture.panHandlers,{
onTouchStart:this._handleTouchStart,
onResponderTerminationRequest:
this._handleResponderTerminationRequest}),

scenes),

this._renderNavigationBar()));


},

_getNavigationContext:function _getNavigationContext(){
if(!this._navigationContext){
this._navigationContext=new NavigationContext();
}
return this._navigationContext;
}});


module.exports=Navigator;
}, 305, null, "Navigator");
__d(/* InteractionMixin */function(global, require, module, exports) {





'use strict';

var InteractionManager=require(193 /* InteractionManager */);






var InteractionMixin={
componentWillUnmount:function componentWillUnmount(){
while(this._interactionMixinHandles.length){
InteractionManager.clearInteractionHandle(
this._interactionMixinHandles.pop());

}
},

_interactionMixinHandles:[],

createInteractionHandle:function createInteractionHandle(){
var handle=InteractionManager.createInteractionHandle();
this._interactionMixinHandles.push(handle);
return handle;
},

clearInteractionHandle:function clearInteractionHandle(clearHandle){
InteractionManager.clearInteractionHandle(clearHandle);
this._interactionMixinHandles=this._interactionMixinHandles.filter(
function(handle){return handle!==clearHandle;});

},






runAfterInteractions:function runAfterInteractions(callback){
InteractionManager.runAfterInteractions(callback);
}};


module.exports=InteractionMixin;
}, 306, null, "InteractionMixin");
__d(/* NavigationContext */function(global, require, module, exports) {


























'use strict';

var NavigationEvent=require(308 /* NavigationEvent */);
var NavigationEventEmitter=require(309 /* NavigationEventEmitter */);
var NavigationTreeNode=require(310 /* NavigationTreeNode */);

var Set=require(194 /* Set */);

var emptyFunction=require(16 /* fbjs/lib/emptyFunction */);
var invariant=require(26 /* fbjs/lib/invariant */);var




AT_TARGET=


NavigationEvent.AT_TARGET,BUBBLING_PHASE=NavigationEvent.BUBBLING_PHASE,CAPTURING_PHASE=NavigationEvent.CAPTURING_PHASE;



var LegacyEventTypes=new Set([
'willfocus',
'didfocus']);var





NavigationContext=function(){







function NavigationContext(){babelHelpers.classCallCheck(this,NavigationContext);
this._bubbleEventEmitter=new NavigationEventEmitter(this);
this._captureEventEmitter=new NavigationEventEmitter(this);
this._currentRoute=null;


this.__node=new NavigationTreeNode(this);

this._emitCounter=0;
this._emitQueue=[];

this.addListener('willfocus',this._onFocus);
this.addListener('didfocus',this._onFocus);
}babelHelpers.createClass(NavigationContext,[{key:'appendChild',value:function appendChild(























childContext){
this.__node.appendChild(childContext.__node);
}},{key:'addListener',value:function addListener(


eventType,
listener,
useCapture)
{
if(LegacyEventTypes.has(eventType)){
useCapture=false;
}

var emitter=useCapture?
this._captureEventEmitter:
this._bubbleEventEmitter;

if(emitter){
return emitter.addListener(eventType,listener,this);
}else{
return{remove:emptyFunction};
}
}},{key:'emit',value:function emit(

eventType,data,didEmitCallback){var _this=this;
if(this._emitCounter>0){


var args=Array.prototype.slice.call(arguments);
this._emitQueue.push(args);
return;
}

this._emitCounter++;

if(LegacyEventTypes.has(eventType)){

this.__emit(
eventType,
data,
null,
{
defaultPrevented:false,
eventPhase:AT_TARGET,
propagationStopped:true,
target:this});


}else{
var targets=[this];
var parentTarget=this.parent;
while(parentTarget){
targets.unshift(parentTarget);
parentTarget=parentTarget.parent;
}

var propagationStopped=false;
var defaultPrevented=false;
var callback=function callback(event){
propagationStopped=propagationStopped||event.isPropagationStopped();
defaultPrevented=defaultPrevented||event.defaultPrevented;
};


targets.some(function(currentTarget){
if(propagationStopped){
return true;
}

var extraInfo={
defaultPrevented:defaultPrevented,
eventPhase:CAPTURING_PHASE,
propagationStopped:propagationStopped,
target:_this};


currentTarget.__emit(eventType,data,callback,extraInfo);
},this);


targets.reverse().some(function(currentTarget){
if(propagationStopped){
return true;
}
var extraInfo={
defaultPrevented:defaultPrevented,
eventPhase:BUBBLING_PHASE,
propagationStopped:propagationStopped,
target:_this};

currentTarget.__emit(eventType,data,callback,extraInfo);
},this);
}

if(didEmitCallback){
var event=NavigationEvent.pool(eventType,this,data);
propagationStopped&&event.stopPropagation();
defaultPrevented&&event.preventDefault();
didEmitCallback.call(this,event);
event.dispose();
}

this._emitCounter--;
while(this._emitQueue.length){
var args=this._emitQueue.shift();
this.emit.apply(this,args);
}
}},{key:'dispose',value:function dispose()

{

this._bubbleEventEmitter&&this._bubbleEventEmitter.removeAllListeners();
this._captureEventEmitter&&this._captureEventEmitter.removeAllListeners();
this._bubbleEventEmitter=null;
this._captureEventEmitter=null;
this._currentRoute=null;
}},{key:'__emit',value:function __emit(



eventType,
data,
didEmitCallback,
extraInfo)
{
var emitter;
switch(extraInfo.eventPhase){
case CAPTURING_PHASE:
emitter=this._captureEventEmitter;
break;

case AT_TARGET:
emitter=this._bubbleEventEmitter;
break;

case BUBBLING_PHASE:
emitter=this._bubbleEventEmitter;
break;

default:
invariant(false,'invalid event phase %s',extraInfo.eventPhase);}


if(extraInfo.target===this){

extraInfo.eventPhase=AT_TARGET;
}

if(emitter){
emitter.emit(
eventType,
data,
didEmitCallback,
extraInfo);

}
}},{key:'_onFocus',value:function _onFocus(

event){
invariant(
event.data&&event.data.hasOwnProperty('route'),
'event type "%s" should provide route',
event.type);


this._currentRoute=event.data.route;
}},{key:'parent',get:function get(){var parent=this.__node.getParent();return parent?parent.getValue():null;}},{key:'top',get:function get(){var result=null;var parentNode=this.__node.getParent();while(parentNode){result=parentNode.getValue();parentNode=parentNode.getParent();}return result;}},{key:'currentRoute',get:function get(){return this._currentRoute;}}]);return NavigationContext;}();


module.exports=NavigationContext;
}, 307, null, "NavigationContext");
__d(/* NavigationEvent */function(global, require, module, exports) {


























'use strict';

var invariant=require(26 /* fbjs/lib/invariant */);var

NavigationEventPool=function(){


function NavigationEventPool(){babelHelpers.classCallCheck(this,NavigationEventPool);
this._list=[];
}babelHelpers.createClass(NavigationEventPool,[{key:'get',value:function get(

type,currentTarget,data){
var event=void 0;
if(this._list.length>0){
event=this._list.pop();
event.constructor.call(event,type,currentTarget,data);
}else{
event=new NavigationEvent(type,currentTarget,data);
}
return event;
}},{key:'put',value:function put(

event){
this._list.push(event);
}}]);return NavigationEventPool;}();


var _navigationEventPool=new NavigationEventPool();var























NavigationEvent=function(){babelHelpers.createClass(NavigationEvent,null,[{key:'pool',value:function pool(


















type,currentTarget,data){
return _navigationEventPool.get(type,currentTarget,data);
}}]);

function NavigationEvent(type,currentTarget,data){babelHelpers.classCallCheck(this,NavigationEvent);
this.target=currentTarget;
this.eventPhase=NavigationEvent.NONE;

this._type=type;
this._currentTarget=currentTarget;
this._data=data;
this._defaultPrevented=false;
this._disposed=false;
this._propagationStopped=false;
}babelHelpers.createClass(NavigationEvent,[{key:'preventDefault',value:function preventDefault()

















{
this._defaultPrevented=true;
}},{key:'stopPropagation',value:function stopPropagation()

{
this._propagationStopped=true;
}},{key:'stop',value:function stop()

{
this.preventDefault();
this.stopPropagation();
}},{key:'isPropagationStopped',value:function isPropagationStopped()

{
return this._propagationStopped;
}},{key:'dispose',value:function dispose()






{
invariant(!this._disposed,'NavigationEvent is already disposed');
this._disposed=true;


this.target=null;
this.eventPhase=NavigationEvent.NONE;
this._type='';
this._currentTarget=null;
this._data=null;
this._defaultPrevented=false;


_navigationEventPool.put(this);
}},{key:'type',get:function get(){return this._type;}},{key:'currentTarget',get:function get(){return this._currentTarget;}},{key:'data',get:function get(){return this._data;}},{key:'defaultPrevented',get:function get(){return this._defaultPrevented;}}]);return NavigationEvent;}();









NavigationEvent.NONE=0;


NavigationEvent.CAPTURING_PHASE=1;



NavigationEvent.AT_TARGET=2;





NavigationEvent.BUBBLING_PHASE=3;

module.exports=NavigationEvent;
}, 308, null, "NavigationEvent");
__d(/* NavigationEventEmitter */function(global, require, module, exports) {


























'use strict';

var EventEmitter=require(56 /* EventEmitter */);
var NavigationEvent=require(308 /* NavigationEvent */);var








NavigationEventEmitter=function(_EventEmitter){babelHelpers.inherits(NavigationEventEmitter,_EventEmitter);




function NavigationEventEmitter(target){babelHelpers.classCallCheck(this,NavigationEventEmitter);var _this=babelHelpers.possibleConstructorReturn(this,(NavigationEventEmitter.__proto__||Object.getPrototypeOf(NavigationEventEmitter)).call(this));

_this._emitting=false;
_this._emitQueue=[];
_this._target=target;return _this;
}babelHelpers.createClass(NavigationEventEmitter,[{key:'emit',value:function emit(


eventType,
data,
didEmitCallback,
extraInfo)
{
if(this._emitting){


var args=Array.prototype.slice.call(arguments);
this._emitQueue.push(args);
return;
}

this._emitting=true;

var event=NavigationEvent.pool(eventType,this._target,data);

if(extraInfo){
if(extraInfo.target){
event.target=extraInfo.target;
}

if(extraInfo.eventPhase){
event.eventPhase=extraInfo.eventPhase;
}

if(extraInfo.defaultPrevented){
event.preventDefault();
}

if(extraInfo.propagationStopped){
event.stopPropagation();
}
}



babelHelpers.get(NavigationEventEmitter.prototype.__proto__||Object.getPrototypeOf(NavigationEventEmitter.prototype),'emit',this).call(this,String(eventType),event);

if(typeof didEmitCallback==='function'){
didEmitCallback.call(this._target,event);
}
event.dispose();

this._emitting=false;

while(this._emitQueue.length){
var args=this._emitQueue.shift();
this.emit.apply(this,args);
}
}}]);return NavigationEventEmitter;}(EventEmitter);


module.exports=NavigationEventEmitter;
}, 309, null, "NavigationEventEmitter");
__d(/* NavigationTreeNode */function(global, require, module, exports) {






'use strict';

var invariant=require(26 /* fbjs/lib/invariant */);
var immutable=require(311 /* immutable */);var

List=immutable.List;var






NavigationTreeNode=function(){






function NavigationTreeNode(value){babelHelpers.classCallCheck(this,NavigationTreeNode);
this.__parent=null;
this._children=new List();
this._value=value;
}babelHelpers.createClass(NavigationTreeNode,[{key:'getValue',value:function getValue()

{
return this._value;
}},{key:'getParent',value:function getParent()

{
return this.__parent;
}},{key:'getChildrenCount',value:function getChildrenCount()

{
return this._children.size;
}},{key:'getChildAt',value:function getChildAt(

index){
return index>-1&&index<this._children.size?
this._children.get(index):
null;
}},{key:'appendChild',value:function appendChild(

child){
if(child.__parent){
child.__parent.removeChild(child);
}
child.__parent=this;
this._children=this._children.push(child);
}},{key:'removeChild',value:function removeChild(

child){
var index=this._children.indexOf(child);

invariant(
index>-1,
'The node to be removed is not a child of this node.');


child.__parent=null;

this._children=this._children.splice(index,1);
}},{key:'indexOf',value:function indexOf(

child){
return this._children.indexOf(child);
}},{key:'forEach',value:function forEach(

callback,context){
this._children.forEach(callback,context);
}},{key:'map',value:function map(

callback,context){
return this._children.map(callback,context).toJS();
}},{key:'some',value:function some(

callback,context){
return this._children.some(callback,context);
}}]);return NavigationTreeNode;}();



module.exports=NavigationTreeNode;
}, 310, null, "NavigationTreeNode");
__d(/* immutable/dist/immutable.js */function(global, require, module, exports) {








(function(global,factory){
typeof exports==='object'&&typeof module!=='undefined'?module.exports=factory():
typeof define==='function'&&define.amd?define(factory):
global.Immutable=factory();
})(this,function(){'use strict';var SLICE$0=Array.prototype.slice;

function createClass(ctor,superClass){
if(superClass){
ctor.prototype=Object.create(superClass.prototype);
}
ctor.prototype.constructor=ctor;
}

function Iterable(value){
return isIterable(value)?value:Seq(value);
}


createClass(KeyedIterable,Iterable);
function KeyedIterable(value){
return isKeyed(value)?value:KeyedSeq(value);
}


createClass(IndexedIterable,Iterable);
function IndexedIterable(value){
return isIndexed(value)?value:IndexedSeq(value);
}


createClass(SetIterable,Iterable);
function SetIterable(value){
return isIterable(value)&&!isAssociative(value)?value:SetSeq(value);
}



function isIterable(maybeIterable){
return!!(maybeIterable&&maybeIterable[IS_ITERABLE_SENTINEL]);
}

function isKeyed(maybeKeyed){
return!!(maybeKeyed&&maybeKeyed[IS_KEYED_SENTINEL]);
}

function isIndexed(maybeIndexed){
return!!(maybeIndexed&&maybeIndexed[IS_INDEXED_SENTINEL]);
}

function isAssociative(maybeAssociative){
return isKeyed(maybeAssociative)||isIndexed(maybeAssociative);
}

function isOrdered(maybeOrdered){
return!!(maybeOrdered&&maybeOrdered[IS_ORDERED_SENTINEL]);
}

Iterable.isIterable=isIterable;
Iterable.isKeyed=isKeyed;
Iterable.isIndexed=isIndexed;
Iterable.isAssociative=isAssociative;
Iterable.isOrdered=isOrdered;

Iterable.Keyed=KeyedIterable;
Iterable.Indexed=IndexedIterable;
Iterable.Set=SetIterable;


var IS_ITERABLE_SENTINEL='@@__IMMUTABLE_ITERABLE__@@';
var IS_KEYED_SENTINEL='@@__IMMUTABLE_KEYED__@@';
var IS_INDEXED_SENTINEL='@@__IMMUTABLE_INDEXED__@@';
var IS_ORDERED_SENTINEL='@@__IMMUTABLE_ORDERED__@@';


var DELETE='delete';


var SHIFT=5;
var SIZE=1<<SHIFT;
var MASK=SIZE-1;



var NOT_SET={};


var CHANGE_LENGTH={value:false};
var DID_ALTER={value:false};

function MakeRef(ref){
ref.value=false;
return ref;
}

function SetRef(ref){
ref&&(ref.value=true);
}




function OwnerID(){}


function arrCopy(arr,offset){
offset=offset||0;
var len=Math.max(0,arr.length-offset);
var newArr=new Array(len);
for(var ii=0;ii<len;ii++){
newArr[ii]=arr[ii+offset];
}
return newArr;
}

function ensureSize(iter){
if(iter.size===undefined){
iter.size=iter.__iterate(returnTrue);
}
return iter.size;
}

function wrapIndex(iter,index){







if(typeof index!=='number'){
var uint32Index=index>>>0;
if(''+uint32Index!==index||uint32Index===4294967295){
return NaN;
}
index=uint32Index;
}
return index<0?ensureSize(iter)+index:index;
}

function returnTrue(){
return true;
}

function wholeSlice(begin,end,size){
return(begin===0||size!==undefined&&begin<=-size)&&(
end===undefined||size!==undefined&&end>=size);
}

function resolveBegin(begin,size){
return resolveIndex(begin,size,0);
}

function resolveEnd(end,size){
return resolveIndex(end,size,size);
}

function resolveIndex(index,size,defaultIndex){
return index===undefined?
defaultIndex:
index<0?
Math.max(0,size+index):
size===undefined?
index:
Math.min(size,index);
}



var ITERATE_KEYS=0;
var ITERATE_VALUES=1;
var ITERATE_ENTRIES=2;

var REAL_ITERATOR_SYMBOL=typeof Symbol==='function'&&(typeof Symbol==='function'?Symbol.iterator:'@@iterator');
var FAUX_ITERATOR_SYMBOL='@@iterator';

var ITERATOR_SYMBOL=REAL_ITERATOR_SYMBOL||FAUX_ITERATOR_SYMBOL;


function Iterator(next){
this.next=next;
}

Iterator.prototype.toString=function(){
return'[Iterator]';
};


Iterator.KEYS=ITERATE_KEYS;
Iterator.VALUES=ITERATE_VALUES;
Iterator.ENTRIES=ITERATE_ENTRIES;

Iterator.prototype.inspect=
Iterator.prototype.toSource=function(){return this.toString();};
Iterator.prototype[ITERATOR_SYMBOL]=function(){
return this;
};


function iteratorValue(type,k,v,iteratorResult){
var value=type===0?k:type===1?v:[k,v];
iteratorResult?iteratorResult.value=value:iteratorResult={
value:value,done:false};

return iteratorResult;
}

function iteratorDone(){
return{value:undefined,done:true};
}

function hasIterator(maybeIterable){
return!!getIteratorFn(maybeIterable);
}

function isIterator(maybeIterator){
return maybeIterator&&typeof maybeIterator.next==='function';
}

function getIterator(iterable){
var iteratorFn=getIteratorFn(iterable);
return iteratorFn&&iteratorFn.call(iterable);
}

function getIteratorFn(iterable){
var iteratorFn=iterable&&(
REAL_ITERATOR_SYMBOL&&iterable[REAL_ITERATOR_SYMBOL]||
iterable[FAUX_ITERATOR_SYMBOL]);

if(typeof iteratorFn==='function'){
return iteratorFn;
}
}

function isArrayLike(value){
return value&&typeof value.length==='number';
}

createClass(Seq,Iterable);
function Seq(value){
return value===null||value===undefined?emptySequence():
isIterable(value)?value.toSeq():seqFromValue(value);
}

Seq.of=function(){
return Seq(arguments);
};

Seq.prototype.toSeq=function(){
return this;
};

Seq.prototype.toString=function(){
return this.__toString('Seq {','}');
};

Seq.prototype.cacheResult=function(){
if(!this._cache&&this.__iterateUncached){
this._cache=this.entrySeq().toArray();
this.size=this._cache.length;
}
return this;
};



Seq.prototype.__iterate=function(fn,reverse){
return seqIterate(this,fn,reverse,true);
};



Seq.prototype.__iterator=function(type,reverse){
return seqIterator(this,type,reverse,true);
};



createClass(KeyedSeq,Seq);
function KeyedSeq(value){
return value===null||value===undefined?
emptySequence().toKeyedSeq():
isIterable(value)?
isKeyed(value)?value.toSeq():value.fromEntrySeq():
keyedSeqFromValue(value);
}

KeyedSeq.prototype.toKeyedSeq=function(){
return this;
};



createClass(IndexedSeq,Seq);
function IndexedSeq(value){
return value===null||value===undefined?emptySequence():
!isIterable(value)?indexedSeqFromValue(value):
isKeyed(value)?value.entrySeq():value.toIndexedSeq();
}

IndexedSeq.of=function(){
return IndexedSeq(arguments);
};

IndexedSeq.prototype.toIndexedSeq=function(){
return this;
};

IndexedSeq.prototype.toString=function(){
return this.__toString('Seq [',']');
};

IndexedSeq.prototype.__iterate=function(fn,reverse){
return seqIterate(this,fn,reverse,false);
};

IndexedSeq.prototype.__iterator=function(type,reverse){
return seqIterator(this,type,reverse,false);
};



createClass(SetSeq,Seq);
function SetSeq(value){
return(
value===null||value===undefined?emptySequence():
!isIterable(value)?indexedSeqFromValue(value):
isKeyed(value)?value.entrySeq():value).
toSetSeq();
}

SetSeq.of=function(){
return SetSeq(arguments);
};

SetSeq.prototype.toSetSeq=function(){
return this;
};



Seq.isSeq=isSeq;
Seq.Keyed=KeyedSeq;
Seq.Set=SetSeq;
Seq.Indexed=IndexedSeq;

var IS_SEQ_SENTINEL='@@__IMMUTABLE_SEQ__@@';

Seq.prototype[IS_SEQ_SENTINEL]=true;



createClass(ArraySeq,IndexedSeq);
function ArraySeq(array){
this._array=array;
this.size=array.length;
}

ArraySeq.prototype.get=function(index,notSetValue){
return this.has(index)?this._array[wrapIndex(this,index)]:notSetValue;
};

ArraySeq.prototype.__iterate=function(fn,reverse){
var array=this._array;
var maxIndex=array.length-1;
for(var ii=0;ii<=maxIndex;ii++){
if(fn(array[reverse?maxIndex-ii:ii],ii,this)===false){
return ii+1;
}
}
return ii;
};

ArraySeq.prototype.__iterator=function(type,reverse){
var array=this._array;
var maxIndex=array.length-1;
var ii=0;
return new Iterator(function()
{return ii>maxIndex?
iteratorDone():
iteratorValue(type,ii,array[reverse?maxIndex-ii++:ii++]);});

};



createClass(ObjectSeq,KeyedSeq);
function ObjectSeq(object){
var keys=Object.keys(object);
this._object=object;
this._keys=keys;
this.size=keys.length;
}

ObjectSeq.prototype.get=function(key,notSetValue){
if(notSetValue!==undefined&&!this.has(key)){
return notSetValue;
}
return this._object[key];
};

ObjectSeq.prototype.has=function(key){
return this._object.hasOwnProperty(key);
};

ObjectSeq.prototype.__iterate=function(fn,reverse){
var object=this._object;
var keys=this._keys;
var maxIndex=keys.length-1;
for(var ii=0;ii<=maxIndex;ii++){
var key=keys[reverse?maxIndex-ii:ii];
if(fn(object[key],key,this)===false){
return ii+1;
}
}
return ii;
};

ObjectSeq.prototype.__iterator=function(type,reverse){
var object=this._object;
var keys=this._keys;
var maxIndex=keys.length-1;
var ii=0;
return new Iterator(function(){
var key=keys[reverse?maxIndex-ii:ii];
return ii++>maxIndex?
iteratorDone():
iteratorValue(type,key,object[key]);
});
};

ObjectSeq.prototype[IS_ORDERED_SENTINEL]=true;


createClass(IterableSeq,IndexedSeq);
function IterableSeq(iterable){
this._iterable=iterable;
this.size=iterable.length||iterable.size;
}

IterableSeq.prototype.__iterateUncached=function(fn,reverse){
if(reverse){
return this.cacheResult().__iterate(fn,reverse);
}
var iterable=this._iterable;
var iterator=getIterator(iterable);
var iterations=0;
if(isIterator(iterator)){
var step;
while(!(step=iterator.next()).done){
if(fn(step.value,iterations++,this)===false){
break;
}
}
}
return iterations;
};

IterableSeq.prototype.__iteratorUncached=function(type,reverse){
if(reverse){
return this.cacheResult().__iterator(type,reverse);
}
var iterable=this._iterable;
var iterator=getIterator(iterable);
if(!isIterator(iterator)){
return new Iterator(iteratorDone);
}
var iterations=0;
return new Iterator(function(){
var step=iterator.next();
return step.done?step:iteratorValue(type,iterations++,step.value);
});
};



createClass(IteratorSeq,IndexedSeq);
function IteratorSeq(iterator){
this._iterator=iterator;
this._iteratorCache=[];
}

IteratorSeq.prototype.__iterateUncached=function(fn,reverse){
if(reverse){
return this.cacheResult().__iterate(fn,reverse);
}
var iterator=this._iterator;
var cache=this._iteratorCache;
var iterations=0;
while(iterations<cache.length){
if(fn(cache[iterations],iterations++,this)===false){
return iterations;
}
}
var step;
while(!(step=iterator.next()).done){
var val=step.value;
cache[iterations]=val;
if(fn(val,iterations++,this)===false){
break;
}
}
return iterations;
};

IteratorSeq.prototype.__iteratorUncached=function(type,reverse){
if(reverse){
return this.cacheResult().__iterator(type,reverse);
}
var iterator=this._iterator;
var cache=this._iteratorCache;
var iterations=0;
return new Iterator(function(){
if(iterations>=cache.length){
var step=iterator.next();
if(step.done){
return step;
}
cache[iterations]=step.value;
}
return iteratorValue(type,iterations,cache[iterations++]);
});
};






function isSeq(maybeSeq){
return!!(maybeSeq&&maybeSeq[IS_SEQ_SENTINEL]);
}

var EMPTY_SEQ;

function emptySequence(){
return EMPTY_SEQ||(EMPTY_SEQ=new ArraySeq([]));
}

function keyedSeqFromValue(value){
var seq=
Array.isArray(value)?new ArraySeq(value).fromEntrySeq():
isIterator(value)?new IteratorSeq(value).fromEntrySeq():
hasIterator(value)?new IterableSeq(value).fromEntrySeq():
typeof value==='object'?new ObjectSeq(value):
undefined;
if(!seq){
throw new TypeError(
'Expected Array or iterable object of [k, v] entries, '+
'or keyed object: '+value);

}
return seq;
}

function indexedSeqFromValue(value){
var seq=maybeIndexedSeqFromValue(value);
if(!seq){
throw new TypeError(
'Expected Array or iterable object of values: '+value);

}
return seq;
}

function seqFromValue(value){
var seq=maybeIndexedSeqFromValue(value)||
typeof value==='object'&&new ObjectSeq(value);
if(!seq){
throw new TypeError(
'Expected Array or iterable object of values, or keyed object: '+value);

}
return seq;
}

function maybeIndexedSeqFromValue(value){
return(
isArrayLike(value)?new ArraySeq(value):
isIterator(value)?new IteratorSeq(value):
hasIterator(value)?new IterableSeq(value):
undefined);

}

function seqIterate(seq,fn,reverse,useKeys){
var cache=seq._cache;
if(cache){
var maxIndex=cache.length-1;
for(var ii=0;ii<=maxIndex;ii++){
var entry=cache[reverse?maxIndex-ii:ii];
if(fn(entry[1],useKeys?entry[0]:ii,seq)===false){
return ii+1;
}
}
return ii;
}
return seq.__iterateUncached(fn,reverse);
}

function seqIterator(seq,type,reverse,useKeys){
var cache=seq._cache;
if(cache){
var maxIndex=cache.length-1;
var ii=0;
return new Iterator(function(){
var entry=cache[reverse?maxIndex-ii:ii];
return ii++>maxIndex?
iteratorDone():
iteratorValue(type,useKeys?entry[0]:ii-1,entry[1]);
});
}
return seq.__iteratorUncached(type,reverse);
}

function fromJS(json,converter){
return converter?
fromJSWith(converter,json,'',{'':json}):
fromJSDefault(json);
}

function fromJSWith(converter,json,key,parentJSON){
if(Array.isArray(json)){
return converter.call(parentJSON,key,IndexedSeq(json).map(function(v,k){return fromJSWith(converter,v,k,json);}));
}
if(isPlainObj(json)){
return converter.call(parentJSON,key,KeyedSeq(json).map(function(v,k){return fromJSWith(converter,v,k,json);}));
}
return json;
}

function fromJSDefault(json){
if(Array.isArray(json)){
return IndexedSeq(json).map(fromJSDefault).toList();
}
if(isPlainObj(json)){
return KeyedSeq(json).map(fromJSDefault).toMap();
}
return json;
}

function isPlainObj(value){
return value&&(value.constructor===Object||value.constructor===undefined);
}























































function is(valueA,valueB){
if(valueA===valueB||valueA!==valueA&&valueB!==valueB){
return true;
}
if(!valueA||!valueB){
return false;
}
if(typeof valueA.valueOf==='function'&&
typeof valueB.valueOf==='function'){
valueA=valueA.valueOf();
valueB=valueB.valueOf();
if(valueA===valueB||valueA!==valueA&&valueB!==valueB){
return true;
}
if(!valueA||!valueB){
return false;
}
}
if(typeof valueA.equals==='function'&&
typeof valueB.equals==='function'&&
valueA.equals(valueB)){
return true;
}
return false;
}

function deepEqual(a,b){
if(a===b){
return true;
}

if(
!isIterable(b)||
a.size!==undefined&&b.size!==undefined&&a.size!==b.size||
a.__hash!==undefined&&b.__hash!==undefined&&a.__hash!==b.__hash||
isKeyed(a)!==isKeyed(b)||
isIndexed(a)!==isIndexed(b)||
isOrdered(a)!==isOrdered(b))
{
return false;
}

if(a.size===0&&b.size===0){
return true;
}

var notAssociative=!isAssociative(a);

if(isOrdered(a)){
var entries=a.entries();
return b.every(function(v,k){
var entry=entries.next().value;
return entry&&is(entry[1],v)&&(notAssociative||is(entry[0],k));
})&&entries.next().done;
}

var flipped=false;

if(a.size===undefined){
if(b.size===undefined){
if(typeof a.cacheResult==='function'){
a.cacheResult();
}
}else{
flipped=true;
var _=a;
a=b;
b=_;
}
}

var allEqual=true;
var bSize=b.__iterate(function(v,k){
if(notAssociative?!a.has(v):
flipped?!is(v,a.get(k,NOT_SET)):!is(a.get(k,NOT_SET),v)){
allEqual=false;
return false;
}
});

return allEqual&&a.size===bSize;
}

createClass(Repeat,IndexedSeq);

function Repeat(value,times){
if(!(this instanceof Repeat)){
return new Repeat(value,times);
}
this._value=value;
this.size=times===undefined?Infinity:Math.max(0,times);
if(this.size===0){
if(EMPTY_REPEAT){
return EMPTY_REPEAT;
}
EMPTY_REPEAT=this;
}
}

Repeat.prototype.toString=function(){
if(this.size===0){
return'Repeat []';
}
return'Repeat [ '+this._value+' '+this.size+' times ]';
};

Repeat.prototype.get=function(index,notSetValue){
return this.has(index)?this._value:notSetValue;
};

Repeat.prototype.includes=function(searchValue){
return is(this._value,searchValue);
};

Repeat.prototype.slice=function(begin,end){
var size=this.size;
return wholeSlice(begin,end,size)?this:
new Repeat(this._value,resolveEnd(end,size)-resolveBegin(begin,size));
};

Repeat.prototype.reverse=function(){
return this;
};

Repeat.prototype.indexOf=function(searchValue){
if(is(this._value,searchValue)){
return 0;
}
return-1;
};

Repeat.prototype.lastIndexOf=function(searchValue){
if(is(this._value,searchValue)){
return this.size;
}
return-1;
};

Repeat.prototype.__iterate=function(fn,reverse){
for(var ii=0;ii<this.size;ii++){
if(fn(this._value,ii,this)===false){
return ii+1;
}
}
return ii;
};

Repeat.prototype.__iterator=function(type,reverse){var this$0=this;
var ii=0;
return new Iterator(function()
{return ii<this$0.size?iteratorValue(type,ii++,this$0._value):iteratorDone();});

};

Repeat.prototype.equals=function(other){
return other instanceof Repeat?
is(this._value,other._value):
deepEqual(other);
};


var EMPTY_REPEAT;

function invariant(condition,error){
if(!condition)throw new Error(error);
}

createClass(Range,IndexedSeq);

function Range(start,end,step){
if(!(this instanceof Range)){
return new Range(start,end,step);
}
invariant(step!==0,'Cannot step a Range by 0');
start=start||0;
if(end===undefined){
end=Infinity;
}
step=step===undefined?1:Math.abs(step);
if(end<start){
step=-step;
}
this._start=start;
this._end=end;
this._step=step;
this.size=Math.max(0,Math.ceil((end-start)/step-1)+1);
if(this.size===0){
if(EMPTY_RANGE){
return EMPTY_RANGE;
}
EMPTY_RANGE=this;
}
}

Range.prototype.toString=function(){
if(this.size===0){
return'Range []';
}
return'Range [ '+
this._start+'...'+this._end+(
this._step>1?' by '+this._step:'')+
' ]';
};

Range.prototype.get=function(index,notSetValue){
return this.has(index)?
this._start+wrapIndex(this,index)*this._step:
notSetValue;
};

Range.prototype.includes=function(searchValue){
var possibleIndex=(searchValue-this._start)/this._step;
return possibleIndex>=0&&
possibleIndex<this.size&&
possibleIndex===Math.floor(possibleIndex);
};

Range.prototype.slice=function(begin,end){
if(wholeSlice(begin,end,this.size)){
return this;
}
begin=resolveBegin(begin,this.size);
end=resolveEnd(end,this.size);
if(end<=begin){
return new Range(0,0);
}
return new Range(this.get(begin,this._end),this.get(end,this._end),this._step);
};

Range.prototype.indexOf=function(searchValue){
var offsetValue=searchValue-this._start;
if(offsetValue%this._step===0){
var index=offsetValue/this._step;
if(index>=0&&index<this.size){
return index;
}
}
return-1;
};

Range.prototype.lastIndexOf=function(searchValue){
return this.indexOf(searchValue);
};

Range.prototype.__iterate=function(fn,reverse){
var maxIndex=this.size-1;
var step=this._step;
var value=reverse?this._start+maxIndex*step:this._start;
for(var ii=0;ii<=maxIndex;ii++){
if(fn(value,ii,this)===false){
return ii+1;
}
value+=reverse?-step:step;
}
return ii;
};

Range.prototype.__iterator=function(type,reverse){
var maxIndex=this.size-1;
var step=this._step;
var value=reverse?this._start+maxIndex*step:this._start;
var ii=0;
return new Iterator(function(){
var v=value;
value+=reverse?-step:step;
return ii>maxIndex?iteratorDone():iteratorValue(type,ii++,v);
});
};

Range.prototype.equals=function(other){
return other instanceof Range?
this._start===other._start&&
this._end===other._end&&
this._step===other._step:
deepEqual(this,other);
};


var EMPTY_RANGE;

createClass(Collection,Iterable);
function Collection(){
throw TypeError('Abstract');
}


createClass(KeyedCollection,Collection);function KeyedCollection(){}

createClass(IndexedCollection,Collection);function IndexedCollection(){}

createClass(SetCollection,Collection);function SetCollection(){}


Collection.Keyed=KeyedCollection;
Collection.Indexed=IndexedCollection;
Collection.Set=SetCollection;

var imul=
typeof Math.imul==='function'&&Math.imul(0xffffffff,2)===-2?
Math.imul:
function imul(a,b){
a=a|0;
b=b|0;
var c=a&0xffff;
var d=b&0xffff;

return c*d+((a>>>16)*d+c*(b>>>16)<<16>>>0)|0;
};





function smi(i32){
return i32>>>1&0x40000000|i32&0xBFFFFFFF;
}

function hash(o){
if(o===false||o===null||o===undefined){
return 0;
}
if(typeof o.valueOf==='function'){
o=o.valueOf();
if(o===false||o===null||o===undefined){
return 0;
}
}
if(o===true){
return 1;
}
var type=typeof o;
if(type==='number'){
var h=o|0;
if(h!==o){
h^=o*0xFFFFFFFF;
}
while(o>0xFFFFFFFF){
o/=0xFFFFFFFF;
h^=o;
}
return smi(h);
}
if(type==='string'){
return o.length>STRING_HASH_CACHE_MIN_STRLEN?cachedHashString(o):hashString(o);
}
if(typeof o.hashCode==='function'){
return o.hashCode();
}
if(type==='object'){
return hashJSObj(o);
}
if(typeof o.toString==='function'){
return hashString(o.toString());
}
throw new Error('Value type '+type+' cannot be hashed.');
}

function cachedHashString(string){
var hash=stringHashCache[string];
if(hash===undefined){
hash=hashString(string);
if(STRING_HASH_CACHE_SIZE===STRING_HASH_CACHE_MAX_SIZE){
STRING_HASH_CACHE_SIZE=0;
stringHashCache={};
}
STRING_HASH_CACHE_SIZE++;
stringHashCache[string]=hash;
}
return hash;
}


function hashString(string){






var hash=0;
for(var ii=0;ii<string.length;ii++){
hash=31*hash+string.charCodeAt(ii)|0;
}
return smi(hash);
}

function hashJSObj(obj){
var hash;
if(usingWeakMap){
hash=weakMap.get(obj);
if(hash!==undefined){
return hash;
}
}

hash=obj[UID_HASH_KEY];
if(hash!==undefined){
return hash;
}

if(!canDefineProperty){
hash=obj.propertyIsEnumerable&&obj.propertyIsEnumerable[UID_HASH_KEY];
if(hash!==undefined){
return hash;
}

hash=getIENodeHash(obj);
if(hash!==undefined){
return hash;
}
}

hash=++objHashUID;
if(objHashUID&0x40000000){
objHashUID=0;
}

if(usingWeakMap){
weakMap.set(obj,hash);
}else if(isExtensible!==undefined&&isExtensible(obj)===false){
throw new Error('Non-extensible objects are not allowed as keys.');
}else if(canDefineProperty){
Object.defineProperty(obj,UID_HASH_KEY,{
'enumerable':false,
'configurable':false,
'writable':false,
'value':hash});

}else if(obj.propertyIsEnumerable!==undefined&&
obj.propertyIsEnumerable===obj.constructor.prototype.propertyIsEnumerable){




obj.propertyIsEnumerable=function(){
return this.constructor.prototype.propertyIsEnumerable.apply(this,arguments);
};
obj.propertyIsEnumerable[UID_HASH_KEY]=hash;
}else if(obj.nodeType!==undefined){




obj[UID_HASH_KEY]=hash;
}else{
throw new Error('Unable to set a non-enumerable property on object.');
}

return hash;
}


var isExtensible=Object.isExtensible;


var canDefineProperty=function(){
try{
Object.defineProperty({},'@',{});
return true;
}catch(e){
return false;
}
}();



function getIENodeHash(node){
if(node&&node.nodeType>0){
switch(node.nodeType){
case 1:
return node.uniqueID;
case 9:
return node.documentElement&&node.documentElement.uniqueID;}

}
}


var usingWeakMap=typeof WeakMap==='function';
var weakMap;
if(usingWeakMap){
weakMap=new WeakMap();
}

var objHashUID=0;

var UID_HASH_KEY='__immutablehash__';
if(typeof Symbol==='function'){
UID_HASH_KEY=Symbol(UID_HASH_KEY);
}

var STRING_HASH_CACHE_MIN_STRLEN=16;
var STRING_HASH_CACHE_MAX_SIZE=255;
var STRING_HASH_CACHE_SIZE=0;
var stringHashCache={};

function assertNotInfinite(size){
invariant(
size!==Infinity,
'Cannot perform this action with an infinite size.');

}

createClass(Map,KeyedCollection);



function Map(value){
return value===null||value===undefined?emptyMap():
isMap(value)&&!isOrdered(value)?value:
emptyMap().withMutations(function(map){
var iter=KeyedIterable(value);
assertNotInfinite(iter.size);
iter.forEach(function(v,k){return map.set(k,v);});
});
}

Map.prototype.toString=function(){
return this.__toString('Map {','}');
};



Map.prototype.get=function(k,notSetValue){
return this._root?
this._root.get(0,undefined,k,notSetValue):
notSetValue;
};



Map.prototype.set=function(k,v){
return updateMap(this,k,v);
};

Map.prototype.setIn=function(keyPath,v){
return this.updateIn(keyPath,NOT_SET,function(){return v;});
};

Map.prototype.remove=function(k){
return updateMap(this,k,NOT_SET);
};

Map.prototype.deleteIn=function(keyPath){
return this.updateIn(keyPath,function(){return NOT_SET;});
};

Map.prototype.update=function(k,notSetValue,updater){
return arguments.length===1?
k(this):
this.updateIn([k],notSetValue,updater);
};

Map.prototype.updateIn=function(keyPath,notSetValue,updater){
if(!updater){
updater=notSetValue;
notSetValue=undefined;
}
var updatedValue=updateInDeepMap(
this,
forceIterator(keyPath),
notSetValue,
updater);

return updatedValue===NOT_SET?undefined:updatedValue;
};

Map.prototype.clear=function(){
if(this.size===0){
return this;
}
if(this.__ownerID){
this.size=0;
this._root=null;
this.__hash=undefined;
this.__altered=true;
return this;
}
return emptyMap();
};



Map.prototype.merge=function(){
return mergeIntoMapWith(this,undefined,arguments);
};

Map.prototype.mergeWith=function(merger){var iters=SLICE$0.call(arguments,1);
return mergeIntoMapWith(this,merger,iters);
};

Map.prototype.mergeIn=function(keyPath){var iters=SLICE$0.call(arguments,1);
return this.updateIn(
keyPath,
emptyMap(),
function(m){return typeof m.merge==='function'?
m.merge.apply(m,iters):
iters[iters.length-1];});

};

Map.prototype.mergeDeep=function(){
return mergeIntoMapWith(this,deepMerger,arguments);
};

Map.prototype.mergeDeepWith=function(merger){var iters=SLICE$0.call(arguments,1);
return mergeIntoMapWith(this,deepMergerWith(merger),iters);
};

Map.prototype.mergeDeepIn=function(keyPath){var iters=SLICE$0.call(arguments,1);
return this.updateIn(
keyPath,
emptyMap(),
function(m){return typeof m.mergeDeep==='function'?
m.mergeDeep.apply(m,iters):
iters[iters.length-1];});

};

Map.prototype.sort=function(comparator){

return OrderedMap(sortFactory(this,comparator));
};

Map.prototype.sortBy=function(mapper,comparator){

return OrderedMap(sortFactory(this,comparator,mapper));
};



Map.prototype.withMutations=function(fn){
var mutable=this.asMutable();
fn(mutable);
return mutable.wasAltered()?mutable.__ensureOwner(this.__ownerID):this;
};

Map.prototype.asMutable=function(){
return this.__ownerID?this:this.__ensureOwner(new OwnerID());
};

Map.prototype.asImmutable=function(){
return this.__ensureOwner();
};

Map.prototype.wasAltered=function(){
return this.__altered;
};

Map.prototype.__iterator=function(type,reverse){
return new MapIterator(this,type,reverse);
};

Map.prototype.__iterate=function(fn,reverse){var this$0=this;
var iterations=0;
this._root&&this._root.iterate(function(entry){
iterations++;
return fn(entry[1],entry[0],this$0);
},reverse);
return iterations;
};

Map.prototype.__ensureOwner=function(ownerID){
if(ownerID===this.__ownerID){
return this;
}
if(!ownerID){
this.__ownerID=ownerID;
this.__altered=false;
return this;
}
return makeMap(this.size,this._root,ownerID,this.__hash);
};


function isMap(maybeMap){
return!!(maybeMap&&maybeMap[IS_MAP_SENTINEL]);
}

Map.isMap=isMap;

var IS_MAP_SENTINEL='@@__IMMUTABLE_MAP__@@';

var MapPrototype=Map.prototype;
MapPrototype[IS_MAP_SENTINEL]=true;
MapPrototype[DELETE]=MapPrototype.remove;
MapPrototype.removeIn=MapPrototype.deleteIn;






function ArrayMapNode(ownerID,entries){
this.ownerID=ownerID;
this.entries=entries;
}

ArrayMapNode.prototype.get=function(shift,keyHash,key,notSetValue){
var entries=this.entries;
for(var ii=0,len=entries.length;ii<len;ii++){
if(is(key,entries[ii][0])){
return entries[ii][1];
}
}
return notSetValue;
};

ArrayMapNode.prototype.update=function(ownerID,shift,keyHash,key,value,didChangeSize,didAlter){
var removed=value===NOT_SET;

var entries=this.entries;
var idx=0;
for(var len=entries.length;idx<len;idx++){
if(is(key,entries[idx][0])){
break;
}
}
var exists=idx<len;

if(exists?entries[idx][1]===value:removed){
return this;
}

SetRef(didAlter);
(removed||!exists)&&SetRef(didChangeSize);

if(removed&&entries.length===1){
return;
}

if(!exists&&!removed&&entries.length>=MAX_ARRAY_MAP_SIZE){
return createNodes(ownerID,entries,key,value);
}

var isEditable=ownerID&&ownerID===this.ownerID;
var newEntries=isEditable?entries:arrCopy(entries);

if(exists){
if(removed){
idx===len-1?newEntries.pop():newEntries[idx]=newEntries.pop();
}else{
newEntries[idx]=[key,value];
}
}else{
newEntries.push([key,value]);
}

if(isEditable){
this.entries=newEntries;
return this;
}

return new ArrayMapNode(ownerID,newEntries);
};




function BitmapIndexedNode(ownerID,bitmap,nodes){
this.ownerID=ownerID;
this.bitmap=bitmap;
this.nodes=nodes;
}

BitmapIndexedNode.prototype.get=function(shift,keyHash,key,notSetValue){
if(keyHash===undefined){
keyHash=hash(key);
}
var bit=1<<((shift===0?keyHash:keyHash>>>shift)&MASK);
var bitmap=this.bitmap;
return(bitmap&bit)===0?notSetValue:
this.nodes[popCount(bitmap&bit-1)].get(shift+SHIFT,keyHash,key,notSetValue);
};

BitmapIndexedNode.prototype.update=function(ownerID,shift,keyHash,key,value,didChangeSize,didAlter){
if(keyHash===undefined){
keyHash=hash(key);
}
var keyHashFrag=(shift===0?keyHash:keyHash>>>shift)&MASK;
var bit=1<<keyHashFrag;
var bitmap=this.bitmap;
var exists=(bitmap&bit)!==0;

if(!exists&&value===NOT_SET){
return this;
}

var idx=popCount(bitmap&bit-1);
var nodes=this.nodes;
var node=exists?nodes[idx]:undefined;
var newNode=updateNode(node,ownerID,shift+SHIFT,keyHash,key,value,didChangeSize,didAlter);

if(newNode===node){
return this;
}

if(!exists&&newNode&&nodes.length>=MAX_BITMAP_INDEXED_SIZE){
return expandNodes(ownerID,nodes,bitmap,keyHashFrag,newNode);
}

if(exists&&!newNode&&nodes.length===2&&isLeafNode(nodes[idx^1])){
return nodes[idx^1];
}

if(exists&&newNode&&nodes.length===1&&isLeafNode(newNode)){
return newNode;
}

var isEditable=ownerID&&ownerID===this.ownerID;
var newBitmap=exists?newNode?bitmap:bitmap^bit:bitmap|bit;
var newNodes=exists?newNode?
setIn(nodes,idx,newNode,isEditable):
spliceOut(nodes,idx,isEditable):
spliceIn(nodes,idx,newNode,isEditable);

if(isEditable){
this.bitmap=newBitmap;
this.nodes=newNodes;
return this;
}

return new BitmapIndexedNode(ownerID,newBitmap,newNodes);
};




function HashArrayMapNode(ownerID,count,nodes){
this.ownerID=ownerID;
this.count=count;
this.nodes=nodes;
}

HashArrayMapNode.prototype.get=function(shift,keyHash,key,notSetValue){
if(keyHash===undefined){
keyHash=hash(key);
}
var idx=(shift===0?keyHash:keyHash>>>shift)&MASK;
var node=this.nodes[idx];
return node?node.get(shift+SHIFT,keyHash,key,notSetValue):notSetValue;
};

HashArrayMapNode.prototype.update=function(ownerID,shift,keyHash,key,value,didChangeSize,didAlter){
if(keyHash===undefined){
keyHash=hash(key);
}
var idx=(shift===0?keyHash:keyHash>>>shift)&MASK;
var removed=value===NOT_SET;
var nodes=this.nodes;
var node=nodes[idx];

if(removed&&!node){
return this;
}

var newNode=updateNode(node,ownerID,shift+SHIFT,keyHash,key,value,didChangeSize,didAlter);
if(newNode===node){
return this;
}

var newCount=this.count;
if(!node){
newCount++;
}else if(!newNode){
newCount--;
if(newCount<MIN_HASH_ARRAY_MAP_SIZE){
return packNodes(ownerID,nodes,newCount,idx);
}
}

var isEditable=ownerID&&ownerID===this.ownerID;
var newNodes=setIn(nodes,idx,newNode,isEditable);

if(isEditable){
this.count=newCount;
this.nodes=newNodes;
return this;
}

return new HashArrayMapNode(ownerID,newCount,newNodes);
};




function HashCollisionNode(ownerID,keyHash,entries){
this.ownerID=ownerID;
this.keyHash=keyHash;
this.entries=entries;
}

HashCollisionNode.prototype.get=function(shift,keyHash,key,notSetValue){
var entries=this.entries;
for(var ii=0,len=entries.length;ii<len;ii++){
if(is(key,entries[ii][0])){
return entries[ii][1];
}
}
return notSetValue;
};

HashCollisionNode.prototype.update=function(ownerID,shift,keyHash,key,value,didChangeSize,didAlter){
if(keyHash===undefined){
keyHash=hash(key);
}

var removed=value===NOT_SET;

if(keyHash!==this.keyHash){
if(removed){
return this;
}
SetRef(didAlter);
SetRef(didChangeSize);
return mergeIntoNode(this,ownerID,shift,keyHash,[key,value]);
}

var entries=this.entries;
var idx=0;
for(var len=entries.length;idx<len;idx++){
if(is(key,entries[idx][0])){
break;
}
}
var exists=idx<len;

if(exists?entries[idx][1]===value:removed){
return this;
}

SetRef(didAlter);
(removed||!exists)&&SetRef(didChangeSize);

if(removed&&len===2){
return new ValueNode(ownerID,this.keyHash,entries[idx^1]);
}

var isEditable=ownerID&&ownerID===this.ownerID;
var newEntries=isEditable?entries:arrCopy(entries);

if(exists){
if(removed){
idx===len-1?newEntries.pop():newEntries[idx]=newEntries.pop();
}else{
newEntries[idx]=[key,value];
}
}else{
newEntries.push([key,value]);
}

if(isEditable){
this.entries=newEntries;
return this;
}

return new HashCollisionNode(ownerID,this.keyHash,newEntries);
};




function ValueNode(ownerID,keyHash,entry){
this.ownerID=ownerID;
this.keyHash=keyHash;
this.entry=entry;
}

ValueNode.prototype.get=function(shift,keyHash,key,notSetValue){
return is(key,this.entry[0])?this.entry[1]:notSetValue;
};

ValueNode.prototype.update=function(ownerID,shift,keyHash,key,value,didChangeSize,didAlter){
var removed=value===NOT_SET;
var keyMatch=is(key,this.entry[0]);
if(keyMatch?value===this.entry[1]:removed){
return this;
}

SetRef(didAlter);

if(removed){
SetRef(didChangeSize);
return;
}

if(keyMatch){
if(ownerID&&ownerID===this.ownerID){
this.entry[1]=value;
return this;
}
return new ValueNode(ownerID,this.keyHash,[key,value]);
}

SetRef(didChangeSize);
return mergeIntoNode(this,ownerID,shift,hash(key),[key,value]);
};





ArrayMapNode.prototype.iterate=
HashCollisionNode.prototype.iterate=function(fn,reverse){
var entries=this.entries;
for(var ii=0,maxIndex=entries.length-1;ii<=maxIndex;ii++){
if(fn(entries[reverse?maxIndex-ii:ii])===false){
return false;
}
}
};

BitmapIndexedNode.prototype.iterate=
HashArrayMapNode.prototype.iterate=function(fn,reverse){
var nodes=this.nodes;
for(var ii=0,maxIndex=nodes.length-1;ii<=maxIndex;ii++){
var node=nodes[reverse?maxIndex-ii:ii];
if(node&&node.iterate(fn,reverse)===false){
return false;
}
}
};

ValueNode.prototype.iterate=function(fn,reverse){
return fn(this.entry);
};

createClass(MapIterator,Iterator);

function MapIterator(map,type,reverse){
this._type=type;
this._reverse=reverse;
this._stack=map._root&&mapIteratorFrame(map._root);
}

MapIterator.prototype.next=function(){
var type=this._type;
var stack=this._stack;
while(stack){
var node=stack.node;
var index=stack.index++;
var maxIndex;
if(node.entry){
if(index===0){
return mapIteratorValue(type,node.entry);
}
}else if(node.entries){
maxIndex=node.entries.length-1;
if(index<=maxIndex){
return mapIteratorValue(type,node.entries[this._reverse?maxIndex-index:index]);
}
}else{
maxIndex=node.nodes.length-1;
if(index<=maxIndex){
var subNode=node.nodes[this._reverse?maxIndex-index:index];
if(subNode){
if(subNode.entry){
return mapIteratorValue(type,subNode.entry);
}
stack=this._stack=mapIteratorFrame(subNode,stack);
}
continue;
}
}
stack=this._stack=this._stack.__prev;
}
return iteratorDone();
};


function mapIteratorValue(type,entry){
return iteratorValue(type,entry[0],entry[1]);
}

function mapIteratorFrame(node,prev){
return{
node:node,
index:0,
__prev:prev};

}

function makeMap(size,root,ownerID,hash){
var map=Object.create(MapPrototype);
map.size=size;
map._root=root;
map.__ownerID=ownerID;
map.__hash=hash;
map.__altered=false;
return map;
}

var EMPTY_MAP;
function emptyMap(){
return EMPTY_MAP||(EMPTY_MAP=makeMap(0));
}

function updateMap(map,k,v){
var newRoot;
var newSize;
if(!map._root){
if(v===NOT_SET){
return map;
}
newSize=1;
newRoot=new ArrayMapNode(map.__ownerID,[[k,v]]);
}else{
var didChangeSize=MakeRef(CHANGE_LENGTH);
var didAlter=MakeRef(DID_ALTER);
newRoot=updateNode(map._root,map.__ownerID,0,undefined,k,v,didChangeSize,didAlter);
if(!didAlter.value){
return map;
}
newSize=map.size+(didChangeSize.value?v===NOT_SET?-1:1:0);
}
if(map.__ownerID){
map.size=newSize;
map._root=newRoot;
map.__hash=undefined;
map.__altered=true;
return map;
}
return newRoot?makeMap(newSize,newRoot):emptyMap();
}

function updateNode(node,ownerID,shift,keyHash,key,value,didChangeSize,didAlter){
if(!node){
if(value===NOT_SET){
return node;
}
SetRef(didAlter);
SetRef(didChangeSize);
return new ValueNode(ownerID,keyHash,[key,value]);
}
return node.update(ownerID,shift,keyHash,key,value,didChangeSize,didAlter);
}

function isLeafNode(node){
return node.constructor===ValueNode||node.constructor===HashCollisionNode;
}

function mergeIntoNode(node,ownerID,shift,keyHash,entry){
if(node.keyHash===keyHash){
return new HashCollisionNode(ownerID,keyHash,[node.entry,entry]);
}

var idx1=(shift===0?node.keyHash:node.keyHash>>>shift)&MASK;
var idx2=(shift===0?keyHash:keyHash>>>shift)&MASK;

var newNode;
var nodes=idx1===idx2?
[mergeIntoNode(node,ownerID,shift+SHIFT,keyHash,entry)]:(
newNode=new ValueNode(ownerID,keyHash,entry),idx1<idx2?[node,newNode]:[newNode,node]);

return new BitmapIndexedNode(ownerID,1<<idx1|1<<idx2,nodes);
}

function createNodes(ownerID,entries,key,value){
if(!ownerID){
ownerID=new OwnerID();
}
var node=new ValueNode(ownerID,hash(key),[key,value]);
for(var ii=0;ii<entries.length;ii++){
var entry=entries[ii];
node=node.update(ownerID,0,undefined,entry[0],entry[1]);
}
return node;
}

function packNodes(ownerID,nodes,count,excluding){
var bitmap=0;
var packedII=0;
var packedNodes=new Array(count);
for(var ii=0,bit=1,len=nodes.length;ii<len;ii++,bit<<=1){
var node=nodes[ii];
if(node!==undefined&&ii!==excluding){
bitmap|=bit;
packedNodes[packedII++]=node;
}
}
return new BitmapIndexedNode(ownerID,bitmap,packedNodes);
}

function expandNodes(ownerID,nodes,bitmap,including,node){
var count=0;
var expandedNodes=new Array(SIZE);
for(var ii=0;bitmap!==0;ii++,bitmap>>>=1){
expandedNodes[ii]=bitmap&1?nodes[count++]:undefined;
}
expandedNodes[including]=node;
return new HashArrayMapNode(ownerID,count+1,expandedNodes);
}

function mergeIntoMapWith(map,merger,iterables){
var iters=[];
for(var ii=0;ii<iterables.length;ii++){
var value=iterables[ii];
var iter=KeyedIterable(value);
if(!isIterable(value)){
iter=iter.map(function(v){return fromJS(v);});
}
iters.push(iter);
}
return mergeIntoCollectionWith(map,merger,iters);
}

function deepMerger(existing,value,key){
return existing&&existing.mergeDeep&&isIterable(value)?
existing.mergeDeep(value):
is(existing,value)?existing:value;
}

function deepMergerWith(merger){
return function(existing,value,key){
if(existing&&existing.mergeDeepWith&&isIterable(value)){
return existing.mergeDeepWith(merger,value);
}
var nextValue=merger(existing,value,key);
return is(existing,nextValue)?existing:nextValue;
};
}

function mergeIntoCollectionWith(collection,merger,iters){
iters=iters.filter(function(x){return x.size!==0;});
if(iters.length===0){
return collection;
}
if(collection.size===0&&!collection.__ownerID&&iters.length===1){
return collection.constructor(iters[0]);
}
return collection.withMutations(function(collection){
var mergeIntoMap=merger?
function(value,key){
collection.update(key,NOT_SET,function(existing)
{return existing===NOT_SET?value:merger(existing,value,key);});

}:
function(value,key){
collection.set(key,value);
};
for(var ii=0;ii<iters.length;ii++){
iters[ii].forEach(mergeIntoMap);
}
});
}

function updateInDeepMap(existing,keyPathIter,notSetValue,updater){
var isNotSet=existing===NOT_SET;
var step=keyPathIter.next();
if(step.done){
var existingValue=isNotSet?notSetValue:existing;
var newValue=updater(existingValue);
return newValue===existingValue?existing:newValue;
}
invariant(
isNotSet||existing&&existing.set,
'invalid keyPath');

var key=step.value;
var nextExisting=isNotSet?NOT_SET:existing.get(key,NOT_SET);
var nextUpdated=updateInDeepMap(
nextExisting,
keyPathIter,
notSetValue,
updater);

return nextUpdated===nextExisting?existing:
nextUpdated===NOT_SET?existing.remove(key):
(isNotSet?emptyMap():existing).set(key,nextUpdated);
}

function popCount(x){
x=x-(x>>1&0x55555555);
x=(x&0x33333333)+(x>>2&0x33333333);
x=x+(x>>4)&0x0f0f0f0f;
x=x+(x>>8);
x=x+(x>>16);
return x&0x7f;
}

function setIn(array,idx,val,canEdit){
var newArray=canEdit?array:arrCopy(array);
newArray[idx]=val;
return newArray;
}

function spliceIn(array,idx,val,canEdit){
var newLen=array.length+1;
if(canEdit&&idx+1===newLen){
array[idx]=val;
return array;
}
var newArray=new Array(newLen);
var after=0;
for(var ii=0;ii<newLen;ii++){
if(ii===idx){
newArray[ii]=val;
after=-1;
}else{
newArray[ii]=array[ii+after];
}
}
return newArray;
}

function spliceOut(array,idx,canEdit){
var newLen=array.length-1;
if(canEdit&&idx===newLen){
array.pop();
return array;
}
var newArray=new Array(newLen);
var after=0;
for(var ii=0;ii<newLen;ii++){
if(ii===idx){
after=1;
}
newArray[ii]=array[ii+after];
}
return newArray;
}

var MAX_ARRAY_MAP_SIZE=SIZE/4;
var MAX_BITMAP_INDEXED_SIZE=SIZE/2;
var MIN_HASH_ARRAY_MAP_SIZE=SIZE/4;

createClass(List,IndexedCollection);



function List(value){
var empty=emptyList();
if(value===null||value===undefined){
return empty;
}
if(isList(value)){
return value;
}
var iter=IndexedIterable(value);
var size=iter.size;
if(size===0){
return empty;
}
assertNotInfinite(size);
if(size>0&&size<SIZE){
return makeList(0,size,SHIFT,null,new VNode(iter.toArray()));
}
return empty.withMutations(function(list){
list.setSize(size);
iter.forEach(function(v,i){return list.set(i,v);});
});
}

List.of=function(){
return this(arguments);
};

List.prototype.toString=function(){
return this.__toString('List [',']');
};



List.prototype.get=function(index,notSetValue){
index=wrapIndex(this,index);
if(index>=0&&index<this.size){
index+=this._origin;
var node=listNodeFor(this,index);
return node&&node.array[index&MASK];
}
return notSetValue;
};



List.prototype.set=function(index,value){
return updateList(this,index,value);
};

List.prototype.remove=function(index){
return!this.has(index)?this:
index===0?this.shift():
index===this.size-1?this.pop():
this.splice(index,1);
};

List.prototype.insert=function(index,value){
return this.splice(index,0,value);
};

List.prototype.clear=function(){
if(this.size===0){
return this;
}
if(this.__ownerID){
this.size=this._origin=this._capacity=0;
this._level=SHIFT;
this._root=this._tail=null;
this.__hash=undefined;
this.__altered=true;
return this;
}
return emptyList();
};

List.prototype.push=function(){
var values=arguments;
var oldSize=this.size;
return this.withMutations(function(list){
setListBounds(list,0,oldSize+values.length);
for(var ii=0;ii<values.length;ii++){
list.set(oldSize+ii,values[ii]);
}
});
};

List.prototype.pop=function(){
return setListBounds(this,0,-1);
};

List.prototype.unshift=function(){
var values=arguments;
return this.withMutations(function(list){
setListBounds(list,-values.length);
for(var ii=0;ii<values.length;ii++){
list.set(ii,values[ii]);
}
});
};

List.prototype.shift=function(){
return setListBounds(this,1);
};



List.prototype.merge=function(){
return mergeIntoListWith(this,undefined,arguments);
};

List.prototype.mergeWith=function(merger){var iters=SLICE$0.call(arguments,1);
return mergeIntoListWith(this,merger,iters);
};

List.prototype.mergeDeep=function(){
return mergeIntoListWith(this,deepMerger,arguments);
};

List.prototype.mergeDeepWith=function(merger){var iters=SLICE$0.call(arguments,1);
return mergeIntoListWith(this,deepMergerWith(merger),iters);
};

List.prototype.setSize=function(size){
return setListBounds(this,0,size);
};



List.prototype.slice=function(begin,end){
var size=this.size;
if(wholeSlice(begin,end,size)){
return this;
}
return setListBounds(
this,
resolveBegin(begin,size),
resolveEnd(end,size));

};

List.prototype.__iterator=function(type,reverse){
var index=0;
var values=iterateList(this,reverse);
return new Iterator(function(){
var value=values();
return value===DONE?
iteratorDone():
iteratorValue(type,index++,value);
});
};

List.prototype.__iterate=function(fn,reverse){
var index=0;
var values=iterateList(this,reverse);
var value;
while((value=values())!==DONE){
if(fn(value,index++,this)===false){
break;
}
}
return index;
};

List.prototype.__ensureOwner=function(ownerID){
if(ownerID===this.__ownerID){
return this;
}
if(!ownerID){
this.__ownerID=ownerID;
return this;
}
return makeList(this._origin,this._capacity,this._level,this._root,this._tail,ownerID,this.__hash);
};


function isList(maybeList){
return!!(maybeList&&maybeList[IS_LIST_SENTINEL]);
}

List.isList=isList;

var IS_LIST_SENTINEL='@@__IMMUTABLE_LIST__@@';

var ListPrototype=List.prototype;
ListPrototype[IS_LIST_SENTINEL]=true;
ListPrototype[DELETE]=ListPrototype.remove;
ListPrototype.setIn=MapPrototype.setIn;
ListPrototype.deleteIn=
ListPrototype.removeIn=MapPrototype.removeIn;
ListPrototype.update=MapPrototype.update;
ListPrototype.updateIn=MapPrototype.updateIn;
ListPrototype.mergeIn=MapPrototype.mergeIn;
ListPrototype.mergeDeepIn=MapPrototype.mergeDeepIn;
ListPrototype.withMutations=MapPrototype.withMutations;
ListPrototype.asMutable=MapPrototype.asMutable;
ListPrototype.asImmutable=MapPrototype.asImmutable;
ListPrototype.wasAltered=MapPrototype.wasAltered;



function VNode(array,ownerID){
this.array=array;
this.ownerID=ownerID;
}



VNode.prototype.removeBefore=function(ownerID,level,index){
if(index===level?1<<level:0||this.array.length===0){
return this;
}
var originIndex=index>>>level&MASK;
if(originIndex>=this.array.length){
return new VNode([],ownerID);
}
var removingFirst=originIndex===0;
var newChild;
if(level>0){
var oldChild=this.array[originIndex];
newChild=oldChild&&oldChild.removeBefore(ownerID,level-SHIFT,index);
if(newChild===oldChild&&removingFirst){
return this;
}
}
if(removingFirst&&!newChild){
return this;
}
var editable=editableVNode(this,ownerID);
if(!removingFirst){
for(var ii=0;ii<originIndex;ii++){
editable.array[ii]=undefined;
}
}
if(newChild){
editable.array[originIndex]=newChild;
}
return editable;
};

VNode.prototype.removeAfter=function(ownerID,level,index){
if(index===(level?1<<level:0)||this.array.length===0){
return this;
}
var sizeIndex=index-1>>>level&MASK;
if(sizeIndex>=this.array.length){
return this;
}

var newChild;
if(level>0){
var oldChild=this.array[sizeIndex];
newChild=oldChild&&oldChild.removeAfter(ownerID,level-SHIFT,index);
if(newChild===oldChild&&sizeIndex===this.array.length-1){
return this;
}
}

var editable=editableVNode(this,ownerID);
editable.array.splice(sizeIndex+1);
if(newChild){
editable.array[sizeIndex]=newChild;
}
return editable;
};



var DONE={};

function iterateList(list,reverse){
var left=list._origin;
var right=list._capacity;
var tailPos=getTailOffset(right);
var tail=list._tail;

return iterateNodeOrLeaf(list._root,list._level,0);

function iterateNodeOrLeaf(node,level,offset){
return level===0?
iterateLeaf(node,offset):
iterateNode(node,level,offset);
}

function iterateLeaf(node,offset){
var array=offset===tailPos?tail&&tail.array:node&&node.array;
var from=offset>left?0:left-offset;
var to=right-offset;
if(to>SIZE){
to=SIZE;
}
return function(){
if(from===to){
return DONE;
}
var idx=reverse?--to:from++;
return array&&array[idx];
};
}

function iterateNode(node,level,offset){
var values;
var array=node&&node.array;
var from=offset>left?0:left-offset>>level;
var to=(right-offset>>level)+1;
if(to>SIZE){
to=SIZE;
}
return function(){
do{
if(values){
var value=values();
if(value!==DONE){
return value;
}
values=null;
}
if(from===to){
return DONE;
}
var idx=reverse?--to:from++;
values=iterateNodeOrLeaf(
array&&array[idx],level-SHIFT,offset+(idx<<level));

}while(true);
};
}
}

function makeList(origin,capacity,level,root,tail,ownerID,hash){
var list=Object.create(ListPrototype);
list.size=capacity-origin;
list._origin=origin;
list._capacity=capacity;
list._level=level;
list._root=root;
list._tail=tail;
list.__ownerID=ownerID;
list.__hash=hash;
list.__altered=false;
return list;
}

var EMPTY_LIST;
function emptyList(){
return EMPTY_LIST||(EMPTY_LIST=makeList(0,0,SHIFT));
}

function updateList(list,index,value){
index=wrapIndex(list,index);

if(index!==index){
return list;
}

if(index>=list.size||index<0){
return list.withMutations(function(list){
index<0?
setListBounds(list,index).set(0,value):
setListBounds(list,0,index+1).set(index,value);
});
}

index+=list._origin;

var newTail=list._tail;
var newRoot=list._root;
var didAlter=MakeRef(DID_ALTER);
if(index>=getTailOffset(list._capacity)){
newTail=updateVNode(newTail,list.__ownerID,0,index,value,didAlter);
}else{
newRoot=updateVNode(newRoot,list.__ownerID,list._level,index,value,didAlter);
}

if(!didAlter.value){
return list;
}

if(list.__ownerID){
list._root=newRoot;
list._tail=newTail;
list.__hash=undefined;
list.__altered=true;
return list;
}
return makeList(list._origin,list._capacity,list._level,newRoot,newTail);
}

function updateVNode(node,ownerID,level,index,value,didAlter){
var idx=index>>>level&MASK;
var nodeHas=node&&idx<node.array.length;
if(!nodeHas&&value===undefined){
return node;
}

var newNode;

if(level>0){
var lowerNode=node&&node.array[idx];
var newLowerNode=updateVNode(lowerNode,ownerID,level-SHIFT,index,value,didAlter);
if(newLowerNode===lowerNode){
return node;
}
newNode=editableVNode(node,ownerID);
newNode.array[idx]=newLowerNode;
return newNode;
}

if(nodeHas&&node.array[idx]===value){
return node;
}

SetRef(didAlter);

newNode=editableVNode(node,ownerID);
if(value===undefined&&idx===newNode.array.length-1){
newNode.array.pop();
}else{
newNode.array[idx]=value;
}
return newNode;
}

function editableVNode(node,ownerID){
if(ownerID&&node&&ownerID===node.ownerID){
return node;
}
return new VNode(node?node.array.slice():[],ownerID);
}

function listNodeFor(list,rawIndex){
if(rawIndex>=getTailOffset(list._capacity)){
return list._tail;
}
if(rawIndex<1<<list._level+SHIFT){
var node=list._root;
var level=list._level;
while(node&&level>0){
node=node.array[rawIndex>>>level&MASK];
level-=SHIFT;
}
return node;
}
}

function setListBounds(list,begin,end){


if(begin!==undefined){
begin=begin|0;
}
if(end!==undefined){
end=end|0;
}
var owner=list.__ownerID||new OwnerID();
var oldOrigin=list._origin;
var oldCapacity=list._capacity;
var newOrigin=oldOrigin+begin;
var newCapacity=end===undefined?oldCapacity:end<0?oldCapacity+end:oldOrigin+end;
if(newOrigin===oldOrigin&&newCapacity===oldCapacity){
return list;
}


if(newOrigin>=newCapacity){
return list.clear();
}

var newLevel=list._level;
var newRoot=list._root;


var offsetShift=0;
while(newOrigin+offsetShift<0){
newRoot=new VNode(newRoot&&newRoot.array.length?[undefined,newRoot]:[],owner);
newLevel+=SHIFT;
offsetShift+=1<<newLevel;
}
if(offsetShift){
newOrigin+=offsetShift;
oldOrigin+=offsetShift;
newCapacity+=offsetShift;
oldCapacity+=offsetShift;
}

var oldTailOffset=getTailOffset(oldCapacity);
var newTailOffset=getTailOffset(newCapacity);


while(newTailOffset>=1<<newLevel+SHIFT){
newRoot=new VNode(newRoot&&newRoot.array.length?[newRoot]:[],owner);
newLevel+=SHIFT;
}


var oldTail=list._tail;
var newTail=newTailOffset<oldTailOffset?
listNodeFor(list,newCapacity-1):
newTailOffset>oldTailOffset?new VNode([],owner):oldTail;


if(oldTail&&newTailOffset>oldTailOffset&&newOrigin<oldCapacity&&oldTail.array.length){
newRoot=editableVNode(newRoot,owner);
var node=newRoot;
for(var level=newLevel;level>SHIFT;level-=SHIFT){
var idx=oldTailOffset>>>level&MASK;
node=node.array[idx]=editableVNode(node.array[idx],owner);
}
node.array[oldTailOffset>>>SHIFT&MASK]=oldTail;
}


if(newCapacity<oldCapacity){
newTail=newTail&&newTail.removeAfter(owner,0,newCapacity);
}


if(newOrigin>=newTailOffset){
newOrigin-=newTailOffset;
newCapacity-=newTailOffset;
newLevel=SHIFT;
newRoot=null;
newTail=newTail&&newTail.removeBefore(owner,0,newOrigin);


}else if(newOrigin>oldOrigin||newTailOffset<oldTailOffset){
offsetShift=0;


while(newRoot){
var beginIndex=newOrigin>>>newLevel&MASK;
if(beginIndex!==newTailOffset>>>newLevel&MASK){
break;
}
if(beginIndex){
offsetShift+=(1<<newLevel)*beginIndex;
}
newLevel-=SHIFT;
newRoot=newRoot.array[beginIndex];
}


if(newRoot&&newOrigin>oldOrigin){
newRoot=newRoot.removeBefore(owner,newLevel,newOrigin-offsetShift);
}
if(newRoot&&newTailOffset<oldTailOffset){
newRoot=newRoot.removeAfter(owner,newLevel,newTailOffset-offsetShift);
}
if(offsetShift){
newOrigin-=offsetShift;
newCapacity-=offsetShift;
}
}

if(list.__ownerID){
list.size=newCapacity-newOrigin;
list._origin=newOrigin;
list._capacity=newCapacity;
list._level=newLevel;
list._root=newRoot;
list._tail=newTail;
list.__hash=undefined;
list.__altered=true;
return list;
}
return makeList(newOrigin,newCapacity,newLevel,newRoot,newTail);
}

function mergeIntoListWith(list,merger,iterables){
var iters=[];
var maxSize=0;
for(var ii=0;ii<iterables.length;ii++){
var value=iterables[ii];
var iter=IndexedIterable(value);
if(iter.size>maxSize){
maxSize=iter.size;
}
if(!isIterable(value)){
iter=iter.map(function(v){return fromJS(v);});
}
iters.push(iter);
}
if(maxSize>list.size){
list=list.setSize(maxSize);
}
return mergeIntoCollectionWith(list,merger,iters);
}

function getTailOffset(size){
return size<SIZE?0:size-1>>>SHIFT<<SHIFT;
}

createClass(OrderedMap,Map);



function OrderedMap(value){
return value===null||value===undefined?emptyOrderedMap():
isOrderedMap(value)?value:
emptyOrderedMap().withMutations(function(map){
var iter=KeyedIterable(value);
assertNotInfinite(iter.size);
iter.forEach(function(v,k){return map.set(k,v);});
});
}

OrderedMap.of=function(){
return this(arguments);
};

OrderedMap.prototype.toString=function(){
return this.__toString('OrderedMap {','}');
};



OrderedMap.prototype.get=function(k,notSetValue){
var index=this._map.get(k);
return index!==undefined?this._list.get(index)[1]:notSetValue;
};



OrderedMap.prototype.clear=function(){
if(this.size===0){
return this;
}
if(this.__ownerID){
this.size=0;
this._map.clear();
this._list.clear();
return this;
}
return emptyOrderedMap();
};

OrderedMap.prototype.set=function(k,v){
return updateOrderedMap(this,k,v);
};

OrderedMap.prototype.remove=function(k){
return updateOrderedMap(this,k,NOT_SET);
};

OrderedMap.prototype.wasAltered=function(){
return this._map.wasAltered()||this._list.wasAltered();
};

OrderedMap.prototype.__iterate=function(fn,reverse){var this$0=this;
return this._list.__iterate(
function(entry){return entry&&fn(entry[1],entry[0],this$0);},
reverse);

};

OrderedMap.prototype.__iterator=function(type,reverse){
return this._list.fromEntrySeq().__iterator(type,reverse);
};

OrderedMap.prototype.__ensureOwner=function(ownerID){
if(ownerID===this.__ownerID){
return this;
}
var newMap=this._map.__ensureOwner(ownerID);
var newList=this._list.__ensureOwner(ownerID);
if(!ownerID){
this.__ownerID=ownerID;
this._map=newMap;
this._list=newList;
return this;
}
return makeOrderedMap(newMap,newList,ownerID,this.__hash);
};


function isOrderedMap(maybeOrderedMap){
return isMap(maybeOrderedMap)&&isOrdered(maybeOrderedMap);
}

OrderedMap.isOrderedMap=isOrderedMap;

OrderedMap.prototype[IS_ORDERED_SENTINEL]=true;
OrderedMap.prototype[DELETE]=OrderedMap.prototype.remove;



function makeOrderedMap(map,list,ownerID,hash){
var omap=Object.create(OrderedMap.prototype);
omap.size=map?map.size:0;
omap._map=map;
omap._list=list;
omap.__ownerID=ownerID;
omap.__hash=hash;
return omap;
}

var EMPTY_ORDERED_MAP;
function emptyOrderedMap(){
return EMPTY_ORDERED_MAP||(EMPTY_ORDERED_MAP=makeOrderedMap(emptyMap(),emptyList()));
}

function updateOrderedMap(omap,k,v){
var map=omap._map;
var list=omap._list;
var i=map.get(k);
var has=i!==undefined;
var newMap;
var newList;
if(v===NOT_SET){
if(!has){
return omap;
}
if(list.size>=SIZE&&list.size>=map.size*2){
newList=list.filter(function(entry,idx){return entry!==undefined&&i!==idx;});
newMap=newList.toKeyedSeq().map(function(entry){return entry[0];}).flip().toMap();
if(omap.__ownerID){
newMap.__ownerID=newList.__ownerID=omap.__ownerID;
}
}else{
newMap=map.remove(k);
newList=i===list.size-1?list.pop():list.set(i,undefined);
}
}else{
if(has){
if(v===list.get(i)[1]){
return omap;
}
newMap=map;
newList=list.set(i,[k,v]);
}else{
newMap=map.set(k,list.size);
newList=list.set(list.size,[k,v]);
}
}
if(omap.__ownerID){
omap.size=newMap.size;
omap._map=newMap;
omap._list=newList;
omap.__hash=undefined;
return omap;
}
return makeOrderedMap(newMap,newList);
}

createClass(ToKeyedSequence,KeyedSeq);
function ToKeyedSequence(indexed,useKeys){
this._iter=indexed;
this._useKeys=useKeys;
this.size=indexed.size;
}

ToKeyedSequence.prototype.get=function(key,notSetValue){
return this._iter.get(key,notSetValue);
};

ToKeyedSequence.prototype.has=function(key){
return this._iter.has(key);
};

ToKeyedSequence.prototype.valueSeq=function(){
return this._iter.valueSeq();
};

ToKeyedSequence.prototype.reverse=function(){var this$0=this;
var reversedSequence=reverseFactory(this,true);
if(!this._useKeys){
reversedSequence.valueSeq=function(){return this$0._iter.toSeq().reverse();};
}
return reversedSequence;
};

ToKeyedSequence.prototype.map=function(mapper,context){var this$0=this;
var mappedSequence=mapFactory(this,mapper,context);
if(!this._useKeys){
mappedSequence.valueSeq=function(){return this$0._iter.toSeq().map(mapper,context);};
}
return mappedSequence;
};

ToKeyedSequence.prototype.__iterate=function(fn,reverse){var this$0=this;
var ii;
return this._iter.__iterate(
this._useKeys?
function(v,k){return fn(v,k,this$0);}:(
ii=reverse?resolveSize(this):0,
function(v){return fn(v,reverse?--ii:ii++,this$0);}),
reverse);

};

ToKeyedSequence.prototype.__iterator=function(type,reverse){
if(this._useKeys){
return this._iter.__iterator(type,reverse);
}
var iterator=this._iter.__iterator(ITERATE_VALUES,reverse);
var ii=reverse?resolveSize(this):0;
return new Iterator(function(){
var step=iterator.next();
return step.done?step:
iteratorValue(type,reverse?--ii:ii++,step.value,step);
});
};

ToKeyedSequence.prototype[IS_ORDERED_SENTINEL]=true;


createClass(ToIndexedSequence,IndexedSeq);
function ToIndexedSequence(iter){
this._iter=iter;
this.size=iter.size;
}

ToIndexedSequence.prototype.includes=function(value){
return this._iter.includes(value);
};

ToIndexedSequence.prototype.__iterate=function(fn,reverse){var this$0=this;
var iterations=0;
return this._iter.__iterate(function(v){return fn(v,iterations++,this$0);},reverse);
};

ToIndexedSequence.prototype.__iterator=function(type,reverse){
var iterator=this._iter.__iterator(ITERATE_VALUES,reverse);
var iterations=0;
return new Iterator(function(){
var step=iterator.next();
return step.done?step:
iteratorValue(type,iterations++,step.value,step);
});
};



createClass(ToSetSequence,SetSeq);
function ToSetSequence(iter){
this._iter=iter;
this.size=iter.size;
}

ToSetSequence.prototype.has=function(key){
return this._iter.includes(key);
};

ToSetSequence.prototype.__iterate=function(fn,reverse){var this$0=this;
return this._iter.__iterate(function(v){return fn(v,v,this$0);},reverse);
};

ToSetSequence.prototype.__iterator=function(type,reverse){
var iterator=this._iter.__iterator(ITERATE_VALUES,reverse);
return new Iterator(function(){
var step=iterator.next();
return step.done?step:
iteratorValue(type,step.value,step.value,step);
});
};



createClass(FromEntriesSequence,KeyedSeq);
function FromEntriesSequence(entries){
this._iter=entries;
this.size=entries.size;
}

FromEntriesSequence.prototype.entrySeq=function(){
return this._iter.toSeq();
};

FromEntriesSequence.prototype.__iterate=function(fn,reverse){var this$0=this;
return this._iter.__iterate(function(entry){


if(entry){
validateEntry(entry);
var indexedIterable=isIterable(entry);
return fn(
indexedIterable?entry.get(1):entry[1],
indexedIterable?entry.get(0):entry[0],
this$0);

}
},reverse);
};

FromEntriesSequence.prototype.__iterator=function(type,reverse){
var iterator=this._iter.__iterator(ITERATE_VALUES,reverse);
return new Iterator(function(){
while(true){
var step=iterator.next();
if(step.done){
return step;
}
var entry=step.value;


if(entry){
validateEntry(entry);
var indexedIterable=isIterable(entry);
return iteratorValue(
type,
indexedIterable?entry.get(0):entry[0],
indexedIterable?entry.get(1):entry[1],
step);

}
}
});
};


ToIndexedSequence.prototype.cacheResult=
ToKeyedSequence.prototype.cacheResult=
ToSetSequence.prototype.cacheResult=
FromEntriesSequence.prototype.cacheResult=
cacheResultThrough;


function flipFactory(iterable){
var flipSequence=makeSequence(iterable);
flipSequence._iter=iterable;
flipSequence.size=iterable.size;
flipSequence.flip=function(){return iterable;};
flipSequence.reverse=function(){
var reversedSequence=iterable.reverse.apply(this);
reversedSequence.flip=function(){return iterable.reverse();};
return reversedSequence;
};
flipSequence.has=function(key){return iterable.includes(key);};
flipSequence.includes=function(key){return iterable.has(key);};
flipSequence.cacheResult=cacheResultThrough;
flipSequence.__iterateUncached=function(fn,reverse){var this$0=this;
return iterable.__iterate(function(v,k){return fn(k,v,this$0)!==false;},reverse);
};
flipSequence.__iteratorUncached=function(type,reverse){
if(type===ITERATE_ENTRIES){
var iterator=iterable.__iterator(type,reverse);
return new Iterator(function(){
var step=iterator.next();
if(!step.done){
var k=step.value[0];
step.value[0]=step.value[1];
step.value[1]=k;
}
return step;
});
}
return iterable.__iterator(
type===ITERATE_VALUES?ITERATE_KEYS:ITERATE_VALUES,
reverse);

};
return flipSequence;
}


function mapFactory(iterable,mapper,context){
var mappedSequence=makeSequence(iterable);
mappedSequence.size=iterable.size;
mappedSequence.has=function(key){return iterable.has(key);};
mappedSequence.get=function(key,notSetValue){
var v=iterable.get(key,NOT_SET);
return v===NOT_SET?
notSetValue:
mapper.call(context,v,key,iterable);
};
mappedSequence.__iterateUncached=function(fn,reverse){var this$0=this;
return iterable.__iterate(
function(v,k,c){return fn(mapper.call(context,v,k,c),k,this$0)!==false;},
reverse);

};
mappedSequence.__iteratorUncached=function(type,reverse){
var iterator=iterable.__iterator(ITERATE_ENTRIES,reverse);
return new Iterator(function(){
var step=iterator.next();
if(step.done){
return step;
}
var entry=step.value;
var key=entry[0];
return iteratorValue(
type,
key,
mapper.call(context,entry[1],key,iterable),
step);

});
};
return mappedSequence;
}


function reverseFactory(iterable,useKeys){
var reversedSequence=makeSequence(iterable);
reversedSequence._iter=iterable;
reversedSequence.size=iterable.size;
reversedSequence.reverse=function(){return iterable;};
if(iterable.flip){
reversedSequence.flip=function(){
var flipSequence=flipFactory(iterable);
flipSequence.reverse=function(){return iterable.flip();};
return flipSequence;
};
}
reversedSequence.get=function(key,notSetValue)
{return iterable.get(useKeys?key:-1-key,notSetValue);};
reversedSequence.has=function(key)
{return iterable.has(useKeys?key:-1-key);};
reversedSequence.includes=function(value){return iterable.includes(value);};
reversedSequence.cacheResult=cacheResultThrough;
reversedSequence.__iterate=function(fn,reverse){var this$0=this;
return iterable.__iterate(function(v,k){return fn(v,k,this$0);},!reverse);
};
reversedSequence.__iterator=
function(type,reverse){return iterable.__iterator(type,!reverse);};
return reversedSequence;
}


function filterFactory(iterable,predicate,context,useKeys){
var filterSequence=makeSequence(iterable);
if(useKeys){
filterSequence.has=function(key){
var v=iterable.get(key,NOT_SET);
return v!==NOT_SET&&!!predicate.call(context,v,key,iterable);
};
filterSequence.get=function(key,notSetValue){
var v=iterable.get(key,NOT_SET);
return v!==NOT_SET&&predicate.call(context,v,key,iterable)?
v:notSetValue;
};
}
filterSequence.__iterateUncached=function(fn,reverse){var this$0=this;
var iterations=0;
iterable.__iterate(function(v,k,c){
if(predicate.call(context,v,k,c)){
iterations++;
return fn(v,useKeys?k:iterations-1,this$0);
}
},reverse);
return iterations;
};
filterSequence.__iteratorUncached=function(type,reverse){
var iterator=iterable.__iterator(ITERATE_ENTRIES,reverse);
var iterations=0;
return new Iterator(function(){
while(true){
var step=iterator.next();
if(step.done){
return step;
}
var entry=step.value;
var key=entry[0];
var value=entry[1];
if(predicate.call(context,value,key,iterable)){
return iteratorValue(type,useKeys?key:iterations++,value,step);
}
}
});
};
return filterSequence;
}


function countByFactory(iterable,grouper,context){
var groups=Map().asMutable();
iterable.__iterate(function(v,k){
groups.update(
grouper.call(context,v,k,iterable),
0,
function(a){return a+1;});

});
return groups.asImmutable();
}


function groupByFactory(iterable,grouper,context){
var isKeyedIter=isKeyed(iterable);
var groups=(isOrdered(iterable)?OrderedMap():Map()).asMutable();
iterable.__iterate(function(v,k){
groups.update(
grouper.call(context,v,k,iterable),
function(a){return a=a||[],a.push(isKeyedIter?[k,v]:v),a;});

});
var coerce=iterableClass(iterable);
return groups.map(function(arr){return reify(iterable,coerce(arr));});
}


function sliceFactory(iterable,begin,end,useKeys){
var originalSize=iterable.size;



if(begin!==undefined){
begin=begin|0;
}
if(end!==undefined){
end=end|0;
}

if(wholeSlice(begin,end,originalSize)){
return iterable;
}

var resolvedBegin=resolveBegin(begin,originalSize);
var resolvedEnd=resolveEnd(end,originalSize);




if(resolvedBegin!==resolvedBegin||resolvedEnd!==resolvedEnd){
return sliceFactory(iterable.toSeq().cacheResult(),begin,end,useKeys);
}





var resolvedSize=resolvedEnd-resolvedBegin;
var sliceSize;
if(resolvedSize===resolvedSize){
sliceSize=resolvedSize<0?0:resolvedSize;
}

var sliceSeq=makeSequence(iterable);



sliceSeq.size=sliceSize===0?sliceSize:iterable.size&&sliceSize||undefined;

if(!useKeys&&isSeq(iterable)&&sliceSize>=0){
sliceSeq.get=function(index,notSetValue){
index=wrapIndex(this,index);
return index>=0&&index<sliceSize?
iterable.get(index+resolvedBegin,notSetValue):
notSetValue;
};
}

sliceSeq.__iterateUncached=function(fn,reverse){var this$0=this;
if(sliceSize===0){
return 0;
}
if(reverse){
return this.cacheResult().__iterate(fn,reverse);
}
var skipped=0;
var isSkipping=true;
var iterations=0;
iterable.__iterate(function(v,k){
if(!(isSkipping&&(isSkipping=skipped++<resolvedBegin))){
iterations++;
return fn(v,useKeys?k:iterations-1,this$0)!==false&&
iterations!==sliceSize;
}
});
return iterations;
};

sliceSeq.__iteratorUncached=function(type,reverse){
if(sliceSize!==0&&reverse){
return this.cacheResult().__iterator(type,reverse);
}

var iterator=sliceSize!==0&&iterable.__iterator(type,reverse);
var skipped=0;
var iterations=0;
return new Iterator(function(){
while(skipped++<resolvedBegin){
iterator.next();
}
if(++iterations>sliceSize){
return iteratorDone();
}
var step=iterator.next();
if(useKeys||type===ITERATE_VALUES){
return step;
}else if(type===ITERATE_KEYS){
return iteratorValue(type,iterations-1,undefined,step);
}else{
return iteratorValue(type,iterations-1,step.value[1],step);
}
});
};

return sliceSeq;
}


function takeWhileFactory(iterable,predicate,context){
var takeSequence=makeSequence(iterable);
takeSequence.__iterateUncached=function(fn,reverse){var this$0=this;
if(reverse){
return this.cacheResult().__iterate(fn,reverse);
}
var iterations=0;
iterable.__iterate(function(v,k,c)
{return predicate.call(context,v,k,c)&&++iterations&&fn(v,k,this$0);});

return iterations;
};
takeSequence.__iteratorUncached=function(type,reverse){var this$0=this;
if(reverse){
return this.cacheResult().__iterator(type,reverse);
}
var iterator=iterable.__iterator(ITERATE_ENTRIES,reverse);
var iterating=true;
return new Iterator(function(){
if(!iterating){
return iteratorDone();
}
var step=iterator.next();
if(step.done){
return step;
}
var entry=step.value;
var k=entry[0];
var v=entry[1];
if(!predicate.call(context,v,k,this$0)){
iterating=false;
return iteratorDone();
}
return type===ITERATE_ENTRIES?step:
iteratorValue(type,k,v,step);
});
};
return takeSequence;
}


function skipWhileFactory(iterable,predicate,context,useKeys){
var skipSequence=makeSequence(iterable);
skipSequence.__iterateUncached=function(fn,reverse){var this$0=this;
if(reverse){
return this.cacheResult().__iterate(fn,reverse);
}
var isSkipping=true;
var iterations=0;
iterable.__iterate(function(v,k,c){
if(!(isSkipping&&(isSkipping=predicate.call(context,v,k,c)))){
iterations++;
return fn(v,useKeys?k:iterations-1,this$0);
}
});
return iterations;
};
skipSequence.__iteratorUncached=function(type,reverse){var this$0=this;
if(reverse){
return this.cacheResult().__iterator(type,reverse);
}
var iterator=iterable.__iterator(ITERATE_ENTRIES,reverse);
var skipping=true;
var iterations=0;
return new Iterator(function(){
var step,k,v;
do{
step=iterator.next();
if(step.done){
if(useKeys||type===ITERATE_VALUES){
return step;
}else if(type===ITERATE_KEYS){
return iteratorValue(type,iterations++,undefined,step);
}else{
return iteratorValue(type,iterations++,step.value[1],step);
}
}
var entry=step.value;
k=entry[0];
v=entry[1];
skipping&&(skipping=predicate.call(context,v,k,this$0));
}while(skipping);
return type===ITERATE_ENTRIES?step:
iteratorValue(type,k,v,step);
});
};
return skipSequence;
}


function concatFactory(iterable,values){
var isKeyedIterable=isKeyed(iterable);
var iters=[iterable].concat(values).map(function(v){
if(!isIterable(v)){
v=isKeyedIterable?
keyedSeqFromValue(v):
indexedSeqFromValue(Array.isArray(v)?v:[v]);
}else if(isKeyedIterable){
v=KeyedIterable(v);
}
return v;
}).filter(function(v){return v.size!==0;});

if(iters.length===0){
return iterable;
}

if(iters.length===1){
var singleton=iters[0];
if(singleton===iterable||
isKeyedIterable&&isKeyed(singleton)||
isIndexed(iterable)&&isIndexed(singleton)){
return singleton;
}
}

var concatSeq=new ArraySeq(iters);
if(isKeyedIterable){
concatSeq=concatSeq.toKeyedSeq();
}else if(!isIndexed(iterable)){
concatSeq=concatSeq.toSetSeq();
}
concatSeq=concatSeq.flatten(true);
concatSeq.size=iters.reduce(
function(sum,seq){
if(sum!==undefined){
var size=seq.size;
if(size!==undefined){
return sum+size;
}
}
},
0);

return concatSeq;
}


function flattenFactory(iterable,depth,useKeys){
var flatSequence=makeSequence(iterable);
flatSequence.__iterateUncached=function(fn,reverse){
var iterations=0;
var stopped=false;
function flatDeep(iter,currentDepth){var this$0=this;
iter.__iterate(function(v,k){
if((!depth||currentDepth<depth)&&isIterable(v)){
flatDeep(v,currentDepth+1);
}else if(fn(v,useKeys?k:iterations++,this$0)===false){
stopped=true;
}
return!stopped;
},reverse);
}
flatDeep(iterable,0);
return iterations;
};
flatSequence.__iteratorUncached=function(type,reverse){
var iterator=iterable.__iterator(type,reverse);
var stack=[];
var iterations=0;
return new Iterator(function(){
while(iterator){
var step=iterator.next();
if(step.done!==false){
iterator=stack.pop();
continue;
}
var v=step.value;
if(type===ITERATE_ENTRIES){
v=v[1];
}
if((!depth||stack.length<depth)&&isIterable(v)){
stack.push(iterator);
iterator=v.__iterator(type,reverse);
}else{
return useKeys?step:iteratorValue(type,iterations++,v,step);
}
}
return iteratorDone();
});
};
return flatSequence;
}


function flatMapFactory(iterable,mapper,context){
var coerce=iterableClass(iterable);
return iterable.toSeq().map(
function(v,k){return coerce(mapper.call(context,v,k,iterable));}).
flatten(true);
}


function interposeFactory(iterable,separator){
var interposedSequence=makeSequence(iterable);
interposedSequence.size=iterable.size&&iterable.size*2-1;
interposedSequence.__iterateUncached=function(fn,reverse){var this$0=this;
var iterations=0;
iterable.__iterate(function(v,k)
{return(!iterations||fn(separator,iterations++,this$0)!==false)&&
fn(v,iterations++,this$0)!==false;},
reverse);

return iterations;
};
interposedSequence.__iteratorUncached=function(type,reverse){
var iterator=iterable.__iterator(ITERATE_VALUES,reverse);
var iterations=0;
var step;
return new Iterator(function(){
if(!step||iterations%2){
step=iterator.next();
if(step.done){
return step;
}
}
return iterations%2?
iteratorValue(type,iterations++,separator):
iteratorValue(type,iterations++,step.value,step);
});
};
return interposedSequence;
}


function sortFactory(iterable,comparator,mapper){
if(!comparator){
comparator=defaultComparator;
}
var isKeyedIterable=isKeyed(iterable);
var index=0;
var entries=iterable.toSeq().map(
function(v,k){return[k,v,index++,mapper?mapper(v,k,iterable):v];}).
toArray();
entries.sort(function(a,b){return comparator(a[3],b[3])||a[2]-b[2];}).forEach(
isKeyedIterable?
function(v,i){entries[i].length=2;}:
function(v,i){entries[i]=v[1];});

return isKeyedIterable?KeyedSeq(entries):
isIndexed(iterable)?IndexedSeq(entries):
SetSeq(entries);
}


function maxFactory(iterable,comparator,mapper){
if(!comparator){
comparator=defaultComparator;
}
if(mapper){
var entry=iterable.toSeq().
map(function(v,k){return[v,mapper(v,k,iterable)];}).
reduce(function(a,b){return maxCompare(comparator,a[1],b[1])?b:a;});
return entry&&entry[0];
}else{
return iterable.reduce(function(a,b){return maxCompare(comparator,a,b)?b:a;});
}
}

function maxCompare(comparator,a,b){
var comp=comparator(b,a);


return comp===0&&b!==a&&(b===undefined||b===null||b!==b)||comp>0;
}


function zipWithFactory(keyIter,zipper,iters){
var zipSequence=makeSequence(keyIter);
zipSequence.size=new ArraySeq(iters).map(function(i){return i.size;}).min();


zipSequence.__iterate=function(fn,reverse){













var iterator=this.__iterator(ITERATE_VALUES,reverse);
var step;
var iterations=0;
while(!(step=iterator.next()).done){
if(fn(step.value,iterations++,this)===false){
break;
}
}
return iterations;
};
zipSequence.__iteratorUncached=function(type,reverse){
var iterators=iters.map(function(i)
{return i=Iterable(i),getIterator(reverse?i.reverse():i);});

var iterations=0;
var isDone=false;
return new Iterator(function(){
var steps;
if(!isDone){
steps=iterators.map(function(i){return i.next();});
isDone=steps.some(function(s){return s.done;});
}
if(isDone){
return iteratorDone();
}
return iteratorValue(
type,
iterations++,
zipper.apply(null,steps.map(function(s){return s.value;})));

});
};
return zipSequence;
}




function reify(iter,seq){
return isSeq(iter)?seq:iter.constructor(seq);
}

function validateEntry(entry){
if(entry!==Object(entry)){
throw new TypeError('Expected [K, V] tuple: '+entry);
}
}

function resolveSize(iter){
assertNotInfinite(iter.size);
return ensureSize(iter);
}

function iterableClass(iterable){
return isKeyed(iterable)?KeyedIterable:
isIndexed(iterable)?IndexedIterable:
SetIterable;
}

function makeSequence(iterable){
return Object.create(
(
isKeyed(iterable)?KeyedSeq:
isIndexed(iterable)?IndexedSeq:
SetSeq).
prototype);

}

function cacheResultThrough(){
if(this._iter.cacheResult){
this._iter.cacheResult();
this.size=this._iter.size;
return this;
}else{
return Seq.prototype.cacheResult.call(this);
}
}

function defaultComparator(a,b){
return a>b?1:a<b?-1:0;
}

function forceIterator(keyPath){
var iter=getIterator(keyPath);
if(!iter){


if(!isArrayLike(keyPath)){
throw new TypeError('Expected iterable or array-like: '+keyPath);
}
iter=getIterator(Iterable(keyPath));
}
return iter;
}

createClass(Record,KeyedCollection);

function Record(defaultValues,name){
var hasInitialized;

var RecordType=function Record(values){
if(values instanceof RecordType){
return values;
}
if(!(this instanceof RecordType)){
return new RecordType(values);
}
if(!hasInitialized){
hasInitialized=true;
var keys=Object.keys(defaultValues);
setProps(RecordTypePrototype,keys);
RecordTypePrototype.size=keys.length;
RecordTypePrototype._name=name;
RecordTypePrototype._keys=keys;
RecordTypePrototype._defaultValues=defaultValues;
}
this._map=Map(values);
};

var RecordTypePrototype=RecordType.prototype=Object.create(RecordPrototype);
RecordTypePrototype.constructor=RecordType;

return RecordType;
}

Record.prototype.toString=function(){
return this.__toString(recordName(this)+' {','}');
};



Record.prototype.has=function(k){
return this._defaultValues.hasOwnProperty(k);
};

Record.prototype.get=function(k,notSetValue){
if(!this.has(k)){
return notSetValue;
}
var defaultVal=this._defaultValues[k];
return this._map?this._map.get(k,defaultVal):defaultVal;
};



Record.prototype.clear=function(){
if(this.__ownerID){
this._map&&this._map.clear();
return this;
}
var RecordType=this.constructor;
return RecordType._empty||(RecordType._empty=makeRecord(this,emptyMap()));
};

Record.prototype.set=function(k,v){
if(!this.has(k)){
throw new Error('Cannot set unknown key "'+k+'" on '+recordName(this));
}
var newMap=this._map&&this._map.set(k,v);
if(this.__ownerID||newMap===this._map){
return this;
}
return makeRecord(this,newMap);
};

Record.prototype.remove=function(k){
if(!this.has(k)){
return this;
}
var newMap=this._map&&this._map.remove(k);
if(this.__ownerID||newMap===this._map){
return this;
}
return makeRecord(this,newMap);
};

Record.prototype.wasAltered=function(){
return this._map.wasAltered();
};

Record.prototype.__iterator=function(type,reverse){var this$0=this;
return KeyedIterable(this._defaultValues).map(function(_,k){return this$0.get(k);}).__iterator(type,reverse);
};

Record.prototype.__iterate=function(fn,reverse){var this$0=this;
return KeyedIterable(this._defaultValues).map(function(_,k){return this$0.get(k);}).__iterate(fn,reverse);
};

Record.prototype.__ensureOwner=function(ownerID){
if(ownerID===this.__ownerID){
return this;
}
var newMap=this._map&&this._map.__ensureOwner(ownerID);
if(!ownerID){
this.__ownerID=ownerID;
this._map=newMap;
return this;
}
return makeRecord(this,newMap,ownerID);
};


var RecordPrototype=Record.prototype;
RecordPrototype[DELETE]=RecordPrototype.remove;
RecordPrototype.deleteIn=
RecordPrototype.removeIn=MapPrototype.removeIn;
RecordPrototype.merge=MapPrototype.merge;
RecordPrototype.mergeWith=MapPrototype.mergeWith;
RecordPrototype.mergeIn=MapPrototype.mergeIn;
RecordPrototype.mergeDeep=MapPrototype.mergeDeep;
RecordPrototype.mergeDeepWith=MapPrototype.mergeDeepWith;
RecordPrototype.mergeDeepIn=MapPrototype.mergeDeepIn;
RecordPrototype.setIn=MapPrototype.setIn;
RecordPrototype.update=MapPrototype.update;
RecordPrototype.updateIn=MapPrototype.updateIn;
RecordPrototype.withMutations=MapPrototype.withMutations;
RecordPrototype.asMutable=MapPrototype.asMutable;
RecordPrototype.asImmutable=MapPrototype.asImmutable;


function makeRecord(likeRecord,map,ownerID){
var record=Object.create(Object.getPrototypeOf(likeRecord));
record._map=map;
record.__ownerID=ownerID;
return record;
}

function recordName(record){
return record._name||record.constructor.name||'Record';
}

function setProps(prototype,names){
try{
names.forEach(setProp.bind(undefined,prototype));
}catch(error){

}
}

function setProp(prototype,name){
Object.defineProperty(prototype,name,{
get:function get(){
return this.get(name);
},
set:function set(value){
invariant(this.__ownerID,'Cannot set on an immutable record.');
this.set(name,value);
}});

}

createClass(Set,SetCollection);



function Set(value){
return value===null||value===undefined?emptySet():
isSet(value)&&!isOrdered(value)?value:
emptySet().withMutations(function(set){
var iter=SetIterable(value);
assertNotInfinite(iter.size);
iter.forEach(function(v){return set.add(v);});
});
}

Set.of=function(){
return this(arguments);
};

Set.fromKeys=function(value){
return this(KeyedIterable(value).keySeq());
};

Set.prototype.toString=function(){
return this.__toString('Set {','}');
};



Set.prototype.has=function(value){
return this._map.has(value);
};



Set.prototype.add=function(value){
return updateSet(this,this._map.set(value,true));
};

Set.prototype.remove=function(value){
return updateSet(this,this._map.remove(value));
};

Set.prototype.clear=function(){
return updateSet(this,this._map.clear());
};



Set.prototype.union=function(){var iters=SLICE$0.call(arguments,0);
iters=iters.filter(function(x){return x.size!==0;});
if(iters.length===0){
return this;
}
if(this.size===0&&!this.__ownerID&&iters.length===1){
return this.constructor(iters[0]);
}
return this.withMutations(function(set){
for(var ii=0;ii<iters.length;ii++){
SetIterable(iters[ii]).forEach(function(value){return set.add(value);});
}
});
};

Set.prototype.intersect=function(){var iters=SLICE$0.call(arguments,0);
if(iters.length===0){
return this;
}
iters=iters.map(function(iter){return SetIterable(iter);});
var originalSet=this;
return this.withMutations(function(set){
originalSet.forEach(function(value){
if(!iters.every(function(iter){return iter.includes(value);})){
set.remove(value);
}
});
});
};

Set.prototype.subtract=function(){var iters=SLICE$0.call(arguments,0);
if(iters.length===0){
return this;
}
iters=iters.map(function(iter){return SetIterable(iter);});
var originalSet=this;
return this.withMutations(function(set){
originalSet.forEach(function(value){
if(iters.some(function(iter){return iter.includes(value);})){
set.remove(value);
}
});
});
};

Set.prototype.merge=function(){
return this.union.apply(this,arguments);
};

Set.prototype.mergeWith=function(merger){var iters=SLICE$0.call(arguments,1);
return this.union.apply(this,iters);
};

Set.prototype.sort=function(comparator){

return OrderedSet(sortFactory(this,comparator));
};

Set.prototype.sortBy=function(mapper,comparator){

return OrderedSet(sortFactory(this,comparator,mapper));
};

Set.prototype.wasAltered=function(){
return this._map.wasAltered();
};

Set.prototype.__iterate=function(fn,reverse){var this$0=this;
return this._map.__iterate(function(_,k){return fn(k,k,this$0);},reverse);
};

Set.prototype.__iterator=function(type,reverse){
return this._map.map(function(_,k){return k;}).__iterator(type,reverse);
};

Set.prototype.__ensureOwner=function(ownerID){
if(ownerID===this.__ownerID){
return this;
}
var newMap=this._map.__ensureOwner(ownerID);
if(!ownerID){
this.__ownerID=ownerID;
this._map=newMap;
return this;
}
return this.__make(newMap,ownerID);
};


function isSet(maybeSet){
return!!(maybeSet&&maybeSet[IS_SET_SENTINEL]);
}

Set.isSet=isSet;

var IS_SET_SENTINEL='@@__IMMUTABLE_SET__@@';

var SetPrototype=Set.prototype;
SetPrototype[IS_SET_SENTINEL]=true;
SetPrototype[DELETE]=SetPrototype.remove;
SetPrototype.mergeDeep=SetPrototype.merge;
SetPrototype.mergeDeepWith=SetPrototype.mergeWith;
SetPrototype.withMutations=MapPrototype.withMutations;
SetPrototype.asMutable=MapPrototype.asMutable;
SetPrototype.asImmutable=MapPrototype.asImmutable;

SetPrototype.__empty=emptySet;
SetPrototype.__make=makeSet;

function updateSet(set,newMap){
if(set.__ownerID){
set.size=newMap.size;
set._map=newMap;
return set;
}
return newMap===set._map?set:
newMap.size===0?set.__empty():
set.__make(newMap);
}

function makeSet(map,ownerID){
var set=Object.create(SetPrototype);
set.size=map?map.size:0;
set._map=map;
set.__ownerID=ownerID;
return set;
}

var EMPTY_SET;
function emptySet(){
return EMPTY_SET||(EMPTY_SET=makeSet(emptyMap()));
}

createClass(OrderedSet,Set);



function OrderedSet(value){
return value===null||value===undefined?emptyOrderedSet():
isOrderedSet(value)?value:
emptyOrderedSet().withMutations(function(set){
var iter=SetIterable(value);
assertNotInfinite(iter.size);
iter.forEach(function(v){return set.add(v);});
});
}

OrderedSet.of=function(){
return this(arguments);
};

OrderedSet.fromKeys=function(value){
return this(KeyedIterable(value).keySeq());
};

OrderedSet.prototype.toString=function(){
return this.__toString('OrderedSet {','}');
};


function isOrderedSet(maybeOrderedSet){
return isSet(maybeOrderedSet)&&isOrdered(maybeOrderedSet);
}

OrderedSet.isOrderedSet=isOrderedSet;

var OrderedSetPrototype=OrderedSet.prototype;
OrderedSetPrototype[IS_ORDERED_SENTINEL]=true;

OrderedSetPrototype.__empty=emptyOrderedSet;
OrderedSetPrototype.__make=makeOrderedSet;

function makeOrderedSet(map,ownerID){
var set=Object.create(OrderedSetPrototype);
set.size=map?map.size:0;
set._map=map;
set.__ownerID=ownerID;
return set;
}

var EMPTY_ORDERED_SET;
function emptyOrderedSet(){
return EMPTY_ORDERED_SET||(EMPTY_ORDERED_SET=makeOrderedSet(emptyOrderedMap()));
}

createClass(Stack,IndexedCollection);



function Stack(value){
return value===null||value===undefined?emptyStack():
isStack(value)?value:
emptyStack().unshiftAll(value);
}

Stack.of=function(){
return this(arguments);
};

Stack.prototype.toString=function(){
return this.__toString('Stack [',']');
};



Stack.prototype.get=function(index,notSetValue){
var head=this._head;
index=wrapIndex(this,index);
while(head&&index--){
head=head.next;
}
return head?head.value:notSetValue;
};

Stack.prototype.peek=function(){
return this._head&&this._head.value;
};



Stack.prototype.push=function(){
if(arguments.length===0){
return this;
}
var newSize=this.size+arguments.length;
var head=this._head;
for(var ii=arguments.length-1;ii>=0;ii--){
head={
value:arguments[ii],
next:head};

}
if(this.__ownerID){
this.size=newSize;
this._head=head;
this.__hash=undefined;
this.__altered=true;
return this;
}
return makeStack(newSize,head);
};

Stack.prototype.pushAll=function(iter){
iter=IndexedIterable(iter);
if(iter.size===0){
return this;
}
assertNotInfinite(iter.size);
var newSize=this.size;
var head=this._head;
iter.reverse().forEach(function(value){
newSize++;
head={
value:value,
next:head};

});
if(this.__ownerID){
this.size=newSize;
this._head=head;
this.__hash=undefined;
this.__altered=true;
return this;
}
return makeStack(newSize,head);
};

Stack.prototype.pop=function(){
return this.slice(1);
};

Stack.prototype.unshift=function(){
return this.push.apply(this,arguments);
};

Stack.prototype.unshiftAll=function(iter){
return this.pushAll(iter);
};

Stack.prototype.shift=function(){
return this.pop.apply(this,arguments);
};

Stack.prototype.clear=function(){
if(this.size===0){
return this;
}
if(this.__ownerID){
this.size=0;
this._head=undefined;
this.__hash=undefined;
this.__altered=true;
return this;
}
return emptyStack();
};

Stack.prototype.slice=function(begin,end){
if(wholeSlice(begin,end,this.size)){
return this;
}
var resolvedBegin=resolveBegin(begin,this.size);
var resolvedEnd=resolveEnd(end,this.size);
if(resolvedEnd!==this.size){

return IndexedCollection.prototype.slice.call(this,begin,end);
}
var newSize=this.size-resolvedBegin;
var head=this._head;
while(resolvedBegin--){
head=head.next;
}
if(this.__ownerID){
this.size=newSize;
this._head=head;
this.__hash=undefined;
this.__altered=true;
return this;
}
return makeStack(newSize,head);
};



Stack.prototype.__ensureOwner=function(ownerID){
if(ownerID===this.__ownerID){
return this;
}
if(!ownerID){
this.__ownerID=ownerID;
this.__altered=false;
return this;
}
return makeStack(this.size,this._head,ownerID,this.__hash);
};



Stack.prototype.__iterate=function(fn,reverse){
if(reverse){
return this.reverse().__iterate(fn);
}
var iterations=0;
var node=this._head;
while(node){
if(fn(node.value,iterations++,this)===false){
break;
}
node=node.next;
}
return iterations;
};

Stack.prototype.__iterator=function(type,reverse){
if(reverse){
return this.reverse().__iterator(type);
}
var iterations=0;
var node=this._head;
return new Iterator(function(){
if(node){
var value=node.value;
node=node.next;
return iteratorValue(type,iterations++,value);
}
return iteratorDone();
});
};


function isStack(maybeStack){
return!!(maybeStack&&maybeStack[IS_STACK_SENTINEL]);
}

Stack.isStack=isStack;

var IS_STACK_SENTINEL='@@__IMMUTABLE_STACK__@@';

var StackPrototype=Stack.prototype;
StackPrototype[IS_STACK_SENTINEL]=true;
StackPrototype.withMutations=MapPrototype.withMutations;
StackPrototype.asMutable=MapPrototype.asMutable;
StackPrototype.asImmutable=MapPrototype.asImmutable;
StackPrototype.wasAltered=MapPrototype.wasAltered;


function makeStack(size,head,ownerID,hash){
var map=Object.create(StackPrototype);
map.size=size;
map._head=head;
map.__ownerID=ownerID;
map.__hash=hash;
map.__altered=false;
return map;
}

var EMPTY_STACK;
function emptyStack(){
return EMPTY_STACK||(EMPTY_STACK=makeStack(0));
}




function mixin(ctor,methods){
var keyCopier=function keyCopier(key){ctor.prototype[key]=methods[key];};
Object.keys(methods).forEach(keyCopier);
Object.getOwnPropertySymbols&&
Object.getOwnPropertySymbols(methods).forEach(keyCopier);
return ctor;
}

Iterable.Iterator=Iterator;

mixin(Iterable,{



toArray:function toArray(){
assertNotInfinite(this.size);
var array=new Array(this.size||0);
this.valueSeq().__iterate(function(v,i){array[i]=v;});
return array;
},

toIndexedSeq:function toIndexedSeq(){
return new ToIndexedSequence(this);
},

toJS:function toJS(){
return this.toSeq().map(
function(value){return value&&typeof value.toJS==='function'?value.toJS():value;}).
__toJS();
},

toJSON:function toJSON(){
return this.toSeq().map(
function(value){return value&&typeof value.toJSON==='function'?value.toJSON():value;}).
__toJS();
},

toKeyedSeq:function toKeyedSeq(){
return new ToKeyedSequence(this,true);
},

toMap:function toMap(){

return Map(this.toKeyedSeq());
},

toObject:function toObject(){
assertNotInfinite(this.size);
var object={};
this.__iterate(function(v,k){object[k]=v;});
return object;
},

toOrderedMap:function toOrderedMap(){

return OrderedMap(this.toKeyedSeq());
},

toOrderedSet:function toOrderedSet(){

return OrderedSet(isKeyed(this)?this.valueSeq():this);
},

toSet:function toSet(){

return Set(isKeyed(this)?this.valueSeq():this);
},

toSetSeq:function toSetSeq(){
return new ToSetSequence(this);
},

toSeq:function toSeq(){
return isIndexed(this)?this.toIndexedSeq():
isKeyed(this)?this.toKeyedSeq():
this.toSetSeq();
},

toStack:function toStack(){

return Stack(isKeyed(this)?this.valueSeq():this);
},

toList:function toList(){

return List(isKeyed(this)?this.valueSeq():this);
},




toString:function toString(){
return'[Iterable]';
},

__toString:function __toString(head,tail){
if(this.size===0){
return head+tail;
}
return head+' '+this.toSeq().map(this.__toStringMapper).join(', ')+' '+tail;
},




concat:function concat(){var values=SLICE$0.call(arguments,0);
return reify(this,concatFactory(this,values));
},

includes:function includes(searchValue){
return this.some(function(value){return is(value,searchValue);});
},

entries:function entries(){
return this.__iterator(ITERATE_ENTRIES);
},

every:function every(predicate,context){
assertNotInfinite(this.size);
var returnValue=true;
this.__iterate(function(v,k,c){
if(!predicate.call(context,v,k,c)){
returnValue=false;
return false;
}
});
return returnValue;
},

filter:function filter(predicate,context){
return reify(this,filterFactory(this,predicate,context,true));
},

find:function find(predicate,context,notSetValue){
var entry=this.findEntry(predicate,context);
return entry?entry[1]:notSetValue;
},

findEntry:function findEntry(predicate,context){
var found;
this.__iterate(function(v,k,c){
if(predicate.call(context,v,k,c)){
found=[k,v];
return false;
}
});
return found;
},

findLastEntry:function findLastEntry(predicate,context){
return this.toSeq().reverse().findEntry(predicate,context);
},

forEach:function forEach(sideEffect,context){
assertNotInfinite(this.size);
return this.__iterate(context?sideEffect.bind(context):sideEffect);
},

join:function join(separator){
assertNotInfinite(this.size);
separator=separator!==undefined?''+separator:',';
var joined='';
var isFirst=true;
this.__iterate(function(v){
isFirst?isFirst=false:joined+=separator;
joined+=v!==null&&v!==undefined?v.toString():'';
});
return joined;
},

keys:function keys(){
return this.__iterator(ITERATE_KEYS);
},

map:function map(mapper,context){
return reify(this,mapFactory(this,mapper,context));
},

reduce:function reduce(reducer,initialReduction,context){
assertNotInfinite(this.size);
var reduction;
var useFirst;
if(arguments.length<2){
useFirst=true;
}else{
reduction=initialReduction;
}
this.__iterate(function(v,k,c){
if(useFirst){
useFirst=false;
reduction=v;
}else{
reduction=reducer.call(context,reduction,v,k,c);
}
});
return reduction;
},

reduceRight:function reduceRight(reducer,initialReduction,context){
var reversed=this.toKeyedSeq().reverse();
return reversed.reduce.apply(reversed,arguments);
},

reverse:function reverse(){
return reify(this,reverseFactory(this,true));
},

slice:function slice(begin,end){
return reify(this,sliceFactory(this,begin,end,true));
},

some:function some(predicate,context){
return!this.every(not(predicate),context);
},

sort:function sort(comparator){
return reify(this,sortFactory(this,comparator));
},

values:function values(){
return this.__iterator(ITERATE_VALUES);
},




butLast:function butLast(){
return this.slice(0,-1);
},

isEmpty:function isEmpty(){
return this.size!==undefined?this.size===0:!this.some(function(){return true;});
},

count:function count(predicate,context){
return ensureSize(
predicate?this.toSeq().filter(predicate,context):this);

},

countBy:function countBy(grouper,context){
return countByFactory(this,grouper,context);
},

equals:function equals(other){
return deepEqual(this,other);
},

entrySeq:function entrySeq(){
var iterable=this;
if(iterable._cache){

return new ArraySeq(iterable._cache);
}
var entriesSequence=iterable.toSeq().map(entryMapper).toIndexedSeq();
entriesSequence.fromEntrySeq=function(){return iterable.toSeq();};
return entriesSequence;
},

filterNot:function filterNot(predicate,context){
return this.filter(not(predicate),context);
},

findLast:function findLast(predicate,context,notSetValue){
return this.toKeyedSeq().reverse().find(predicate,context,notSetValue);
},

first:function first(){
return this.find(returnTrue);
},

flatMap:function flatMap(mapper,context){
return reify(this,flatMapFactory(this,mapper,context));
},

flatten:function flatten(depth){
return reify(this,flattenFactory(this,depth,true));
},

fromEntrySeq:function fromEntrySeq(){
return new FromEntriesSequence(this);
},

get:function get(searchKey,notSetValue){
return this.find(function(_,key){return is(key,searchKey);},undefined,notSetValue);
},

getIn:function getIn(searchKeyPath,notSetValue){
var nested=this;


var iter=forceIterator(searchKeyPath);
var step;
while(!(step=iter.next()).done){
var key=step.value;
nested=nested&&nested.get?nested.get(key,NOT_SET):NOT_SET;
if(nested===NOT_SET){
return notSetValue;
}
}
return nested;
},

groupBy:function groupBy(grouper,context){
return groupByFactory(this,grouper,context);
},

has:function has(searchKey){
return this.get(searchKey,NOT_SET)!==NOT_SET;
},

hasIn:function hasIn(searchKeyPath){
return this.getIn(searchKeyPath,NOT_SET)!==NOT_SET;
},

isSubset:function isSubset(iter){
iter=typeof iter.includes==='function'?iter:Iterable(iter);
return this.every(function(value){return iter.includes(value);});
},

isSuperset:function isSuperset(iter){
iter=typeof iter.isSubset==='function'?iter:Iterable(iter);
return iter.isSubset(this);
},

keySeq:function keySeq(){
return this.toSeq().map(keyMapper).toIndexedSeq();
},

last:function last(){
return this.toSeq().reverse().first();
},

max:function max(comparator){
return maxFactory(this,comparator);
},

maxBy:function maxBy(mapper,comparator){
return maxFactory(this,comparator,mapper);
},

min:function min(comparator){
return maxFactory(this,comparator?neg(comparator):defaultNegComparator);
},

minBy:function minBy(mapper,comparator){
return maxFactory(this,comparator?neg(comparator):defaultNegComparator,mapper);
},

rest:function rest(){
return this.slice(1);
},

skip:function skip(amount){
return this.slice(Math.max(0,amount));
},

skipLast:function skipLast(amount){
return reify(this,this.toSeq().reverse().skip(amount).reverse());
},

skipWhile:function skipWhile(predicate,context){
return reify(this,skipWhileFactory(this,predicate,context,true));
},

skipUntil:function skipUntil(predicate,context){
return this.skipWhile(not(predicate),context);
},

sortBy:function sortBy(mapper,comparator){
return reify(this,sortFactory(this,comparator,mapper));
},

take:function take(amount){
return this.slice(0,Math.max(0,amount));
},

takeLast:function takeLast(amount){
return reify(this,this.toSeq().reverse().take(amount).reverse());
},

takeWhile:function takeWhile(predicate,context){
return reify(this,takeWhileFactory(this,predicate,context));
},

takeUntil:function takeUntil(predicate,context){
return this.takeWhile(not(predicate),context);
},

valueSeq:function valueSeq(){
return this.toIndexedSeq();
},




hashCode:function hashCode(){
return this.__hash||(this.__hash=hashIterable(this));
}});














var IterablePrototype=Iterable.prototype;
IterablePrototype[IS_ITERABLE_SENTINEL]=true;
IterablePrototype[ITERATOR_SYMBOL]=IterablePrototype.values;
IterablePrototype.__toJS=IterablePrototype.toArray;
IterablePrototype.__toStringMapper=quoteString;
IterablePrototype.inspect=
IterablePrototype.toSource=function(){return this.toString();};
IterablePrototype.chain=IterablePrototype.flatMap;
IterablePrototype.contains=IterablePrototype.includes;


(function(){
try{
Object.defineProperty(IterablePrototype,'length',{
get:function get(){
if(!Iterable.noLengthWarning){
var stack;
try{
throw new Error();
}catch(error){
stack=error.stack;
}
if(stack.indexOf('_wrapObject')===-1){
console&&console.warn&&console.warn(
'iterable.length has been deprecated, '+
'use iterable.size or iterable.count(). '+
'This warning will become a silent error in a future version. '+
stack);

return this.size;
}
}
}});

}catch(e){}
})();



mixin(KeyedIterable,{



flip:function flip(){
return reify(this,flipFactory(this));
},

findKey:function findKey(predicate,context){
var entry=this.findEntry(predicate,context);
return entry&&entry[0];
},

findLastKey:function findLastKey(predicate,context){
return this.toSeq().reverse().findKey(predicate,context);
},

keyOf:function keyOf(searchValue){
return this.findKey(function(value){return is(value,searchValue);});
},

lastKeyOf:function lastKeyOf(searchValue){
return this.findLastKey(function(value){return is(value,searchValue);});
},

mapEntries:function mapEntries(mapper,context){var this$0=this;
var iterations=0;
return reify(this,
this.toSeq().map(
function(v,k){return mapper.call(context,[k,v],iterations++,this$0);}).
fromEntrySeq());

},

mapKeys:function mapKeys(mapper,context){var this$0=this;
return reify(this,
this.toSeq().flip().map(
function(k,v){return mapper.call(context,k,v,this$0);}).
flip());

}});



var KeyedIterablePrototype=KeyedIterable.prototype;
KeyedIterablePrototype[IS_KEYED_SENTINEL]=true;
KeyedIterablePrototype[ITERATOR_SYMBOL]=IterablePrototype.entries;
KeyedIterablePrototype.__toJS=IterablePrototype.toObject;
KeyedIterablePrototype.__toStringMapper=function(v,k){return JSON.stringify(k)+': '+quoteString(v);};



mixin(IndexedIterable,{



toKeyedSeq:function toKeyedSeq(){
return new ToKeyedSequence(this,false);
},




filter:function filter(predicate,context){
return reify(this,filterFactory(this,predicate,context,false));
},

findIndex:function findIndex(predicate,context){
var entry=this.findEntry(predicate,context);
return entry?entry[0]:-1;
},

indexOf:function indexOf(searchValue){
var key=this.toKeyedSeq().keyOf(searchValue);
return key===undefined?-1:key;
},

lastIndexOf:function lastIndexOf(searchValue){
var key=this.toKeyedSeq().reverse().keyOf(searchValue);
return key===undefined?-1:key;



},

reverse:function reverse(){
return reify(this,reverseFactory(this,false));
},

slice:function slice(begin,end){
return reify(this,sliceFactory(this,begin,end,false));
},

splice:function splice(index,removeNum){
var numArgs=arguments.length;
removeNum=Math.max(removeNum|0,0);
if(numArgs===0||numArgs===2&&!removeNum){
return this;
}



index=resolveBegin(index,index<0?this.count():this.size);
var spliced=this.slice(0,index);
return reify(
this,
numArgs===1?
spliced:
spliced.concat(arrCopy(arguments,2),this.slice(index+removeNum)));

},




findLastIndex:function findLastIndex(predicate,context){
var key=this.toKeyedSeq().findLastKey(predicate,context);
return key===undefined?-1:key;
},

first:function first(){
return this.get(0);
},

flatten:function flatten(depth){
return reify(this,flattenFactory(this,depth,false));
},

get:function get(index,notSetValue){
index=wrapIndex(this,index);
return index<0||this.size===Infinity||
this.size!==undefined&&index>this.size?
notSetValue:
this.find(function(_,key){return key===index;},undefined,notSetValue);
},

has:function has(index){
index=wrapIndex(this,index);
return index>=0&&(this.size!==undefined?
this.size===Infinity||index<this.size:
this.indexOf(index)!==-1);

},

interpose:function interpose(separator){
return reify(this,interposeFactory(this,separator));
},

interleave:function interleave(){
var iterables=[this].concat(arrCopy(arguments));
var zipped=zipWithFactory(this.toSeq(),IndexedSeq.of,iterables);
var interleaved=zipped.flatten(true);
if(zipped.size){
interleaved.size=zipped.size*iterables.length;
}
return reify(this,interleaved);
},

last:function last(){
return this.get(-1);
},

skipWhile:function skipWhile(predicate,context){
return reify(this,skipWhileFactory(this,predicate,context,false));
},

zip:function zip(){
var iterables=[this].concat(arrCopy(arguments));
return reify(this,zipWithFactory(this,defaultZipper,iterables));
},

zipWith:function zipWith(zipper){
var iterables=arrCopy(arguments);
iterables[0]=this;
return reify(this,zipWithFactory(this,zipper,iterables));
}});



IndexedIterable.prototype[IS_INDEXED_SENTINEL]=true;
IndexedIterable.prototype[IS_ORDERED_SENTINEL]=true;



mixin(SetIterable,{



get:function get(value,notSetValue){
return this.has(value)?value:notSetValue;
},

includes:function includes(value){
return this.has(value);
},




keySeq:function keySeq(){
return this.valueSeq();
}});



SetIterable.prototype.has=IterablePrototype.includes;




mixin(KeyedSeq,KeyedIterable.prototype);
mixin(IndexedSeq,IndexedIterable.prototype);
mixin(SetSeq,SetIterable.prototype);

mixin(KeyedCollection,KeyedIterable.prototype);
mixin(IndexedCollection,IndexedIterable.prototype);
mixin(SetCollection,SetIterable.prototype);




function keyMapper(v,k){
return k;
}

function entryMapper(v,k){
return[k,v];
}

function not(predicate){
return function(){
return!predicate.apply(this,arguments);
};
}

function neg(predicate){
return function(){
return-predicate.apply(this,arguments);
};
}

function quoteString(value){
return typeof value==='string'?JSON.stringify(value):value;
}

function defaultZipper(){
return arrCopy(arguments);
}

function defaultNegComparator(a,b){
return a<b?1:a>b?-1:0;
}

function hashIterable(iterable){
if(iterable.size===Infinity){
return 0;
}
var ordered=isOrdered(iterable);
var keyed=isKeyed(iterable);
var h=ordered?1:0;
var size=iterable.__iterate(
keyed?
ordered?
function(v,k){h=31*h+hashMerge(hash(v),hash(k))|0;}:
function(v,k){h=h+hashMerge(hash(v),hash(k))|0;}:
ordered?
function(v){h=31*h+hash(v)|0;}:
function(v){h=h+hash(v)|0;});

return murmurHashOfSize(size,h);
}

function murmurHashOfSize(size,h){
h=imul(h,0xCC9E2D51);
h=imul(h<<15|h>>>-15,0x1B873593);
h=imul(h<<13|h>>>-13,5);
h=(h+0xE6546B64|0)^size;
h=imul(h^h>>>16,0x85EBCA6B);
h=imul(h^h>>>13,0xC2B2AE35);
h=smi(h^h>>>16);
return h;
}

function hashMerge(a,b){
return a^b+0x9E3779B9+(a<<6)+(a>>2)|0;
}

var Immutable={

Iterable:Iterable,

Seq:Seq,
Collection:Collection,
Map:Map,
OrderedMap:OrderedMap,
List:List,
Stack:Stack,
Set:Set,
OrderedSet:OrderedSet,

Record:Record,
Range:Range,
Repeat:Repeat,

is:is,
fromJS:fromJS};



return Immutable;

});
}, 311, null, "immutable/dist/immutable.js");
__d(/* NavigatorBreadcrumbNavigationBar */function(global, require, module, exports) {






























'use strict';

var NavigatorBreadcrumbNavigationBarStyles=require(313 /* NavigatorBreadcrumbNavigationBarStyles */);
var NavigatorNavigationBarStylesAndroid=require(316 /* NavigatorNavigationBarStylesAndroid */);
var NavigatorNavigationBarStylesIOS=require(314 /* NavigatorNavigationBarStylesIOS */);
var Platform=require(28 /* Platform */);
var React=require(78 /* React */);
var StyleSheet=require(101 /* StyleSheet */);
var View=require(120 /* View */);

var guid=require(197 /* guid */);
var invariant=require(26 /* fbjs/lib/invariant */);var _require=

require(311 /* immutable */),Map=_require.Map;

var Interpolators=NavigatorBreadcrumbNavigationBarStyles.Interpolators;
var NavigatorNavigationBarStyles=Platform.OS==='android'?
NavigatorNavigationBarStylesAndroid:NavigatorNavigationBarStylesIOS;
var PropTypes=React.PropTypes;




var CRUMB_PROPS=Interpolators.map(function(){return{style:{}};});
var ICON_PROPS=Interpolators.map(function(){return{style:{}};});
var SEPARATOR_PROPS=Interpolators.map(function(){return{style:{}};});
var TITLE_PROPS=Interpolators.map(function(){return{style:{}};});
var RIGHT_BUTTON_PROPS=Interpolators.map(function(){return{style:{}};});


function navStatePresentedIndex(navState){
if(navState.presentedIndex!==undefined){
return navState.presentedIndex;
}

return navState.observedTopOfStack;
}









function initStyle(index,presentedIndex){
return index===presentedIndex?NavigatorBreadcrumbNavigationBarStyles.Center[index]:
index<presentedIndex?NavigatorBreadcrumbNavigationBarStyles.Left[index]:
NavigatorBreadcrumbNavigationBarStyles.Right[index];
}var

NavigatorBreadcrumbNavigationBar=function(_React$Component){babelHelpers.inherits(NavigatorBreadcrumbNavigationBar,_React$Component);function NavigatorBreadcrumbNavigationBar(){var _ref;var _temp,_this,_ret;babelHelpers.classCallCheck(this,NavigatorBreadcrumbNavigationBar);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=babelHelpers.possibleConstructorReturn(this,(_ref=NavigatorBreadcrumbNavigationBar.__proto__||Object.getPrototypeOf(NavigatorBreadcrumbNavigationBar)).call.apply(_ref,[this].concat(args))),_this),_this.






































































































































_getBreadcrumb=function(route,index){





var pointerEvents=
_this.props.navState.routeStack.length<=1&&index===0?
'none':
'auto';

var navBarRouteMapper=_this.props.routeMapper;
var firstStyles=initStyle(index,navStatePresentedIndex(_this.props.navState));

var breadcrumbDescriptor=
React.createElement(View,{
key:'crumb_'+index,
pointerEvents:pointerEvents,
ref:'crumb_'+index,
style:firstStyles.Crumb},
React.createElement(View,{ref:'icon_'+index,style:firstStyles.Icon},
navBarRouteMapper.iconForRoute(route,_this.props.navigator)),

React.createElement(View,{ref:'separator_'+index,style:firstStyles.Separator},
navBarRouteMapper.separatorForRoute(route,_this.props.navigator)));




return breadcrumbDescriptor;
},_this.

_getTitle=function(route,index){
if(_this._descriptors.title.has(route)){
return _this._descriptors.title.get(route);
}

var titleContent=_this.props.routeMapper.titleContentForRoute(
_this.props.navState.routeStack[index],
_this.props.navigator);

var firstStyles=initStyle(index,navStatePresentedIndex(_this.props.navState));

var titleDescriptor=
React.createElement(View,{
key:'title_'+index,
ref:'title_'+index,
style:firstStyles.Title},
titleContent);


_this._descriptors.title=_this._descriptors.title.set(route,titleDescriptor);
return titleDescriptor;
},_this.

_getRightButton=function(route,index){
if(_this._descriptors.right.has(route)){
return _this._descriptors.right.get(route);
}
var rightContent=_this.props.routeMapper.rightContentForRoute(
_this.props.navState.routeStack[index],
_this.props.navigator);

if(!rightContent){
_this._descriptors.right=_this._descriptors.right.set(route,null);
return null;
}
var firstStyles=initStyle(index,navStatePresentedIndex(_this.props.navState));
var rightButtonDescriptor=
React.createElement(View,{
key:'right_'+index,
ref:'right_'+index,
style:firstStyles.RightItem},
rightContent);


_this._descriptors.right=_this._descriptors.right.set(route,rightButtonDescriptor);
return rightButtonDescriptor;
},_temp),babelHelpers.possibleConstructorReturn(_this,_ret);}babelHelpers.createClass(NavigatorBreadcrumbNavigationBar,[{key:'_updateIndexProgress',value:function _updateIndexProgress(progress,index,fromIndex,toIndex){var amount=toIndex>fromIndex?progress:1-progress;var oldDistToCenter=index-fromIndex;var newDistToCenter=index-toIndex;var interpolate;invariant(Interpolators[index],'Cannot find breadcrumb interpolators for '+index);if(oldDistToCenter>0&&newDistToCenter===0||newDistToCenter>0&&oldDistToCenter===0){interpolate=Interpolators[index].RightToCenter;}else if(oldDistToCenter<0&&newDistToCenter===0||newDistToCenter<0&&oldDistToCenter===0){interpolate=Interpolators[index].CenterToLeft;}else if(oldDistToCenter===newDistToCenter){interpolate=Interpolators[index].RightToCenter;}else{interpolate=Interpolators[index].RightToLeft;}if(interpolate.Crumb(CRUMB_PROPS[index].style,amount)){this._setPropsIfExists('crumb_'+index,CRUMB_PROPS[index]);}if(interpolate.Icon(ICON_PROPS[index].style,amount)){this._setPropsIfExists('icon_'+index,ICON_PROPS[index]);}if(interpolate.Separator(SEPARATOR_PROPS[index].style,amount)){this._setPropsIfExists('separator_'+index,SEPARATOR_PROPS[index]);}if(interpolate.Title(TITLE_PROPS[index].style,amount)){this._setPropsIfExists('title_'+index,TITLE_PROPS[index]);}var right=this.refs['right_'+index];var rightButtonStyle=RIGHT_BUTTON_PROPS[index].style;if(right&&interpolate.RightItem(rightButtonStyle,amount)){right.setNativeProps({style:rightButtonStyle,pointerEvents:rightButtonStyle.opacity===0?'none':'auto'});}}},{key:'updateProgress',value:function updateProgress(progress,fromIndex,toIndex){var max=Math.max(fromIndex,toIndex);var min=Math.min(fromIndex,toIndex);for(var index=min;index<=max;index++){this._updateIndexProgress(progress,index,fromIndex,toIndex);}}},{key:'onAnimationStart',value:function onAnimationStart(fromIndex,toIndex){var max=Math.max(fromIndex,toIndex);var min=Math.min(fromIndex,toIndex);for(var index=min;index<=max;index++){this._setRenderViewsToHardwareTextureAndroid(index,true);}}},{key:'onAnimationEnd',value:function onAnimationEnd(){var max=this.props.navState.routeStack.length-1;for(var index=0;index<=max;index++){this._setRenderViewsToHardwareTextureAndroid(index,false);}}},{key:'_setRenderViewsToHardwareTextureAndroid',value:function _setRenderViewsToHardwareTextureAndroid(index,renderToHardwareTexture){var props={renderToHardwareTextureAndroid:renderToHardwareTexture};this._setPropsIfExists('icon_'+index,props);this._setPropsIfExists('separator_'+index,props);this._setPropsIfExists('title_'+index,props);this._setPropsIfExists('right_'+index,props);}},{key:'componentWillMount',value:function componentWillMount(){this._reset();}},{key:'render',value:function render(){var navState=this.props.navState;var icons=navState&&navState.routeStack.map(this._getBreadcrumb);var titles=navState.routeStack.map(this._getTitle);var buttons=navState.routeStack.map(this._getRightButton);return React.createElement(View,{key:this._key,style:[styles.breadCrumbContainer,this.props.style]},titles,icons,buttons);}},{key:'immediatelyRefresh',value:function immediatelyRefresh(){this._reset();this.forceUpdate();}},{key:'_reset',value:function _reset(){this._key=guid();this._descriptors={title:new Map(),right:new Map()};}},{key:'_setPropsIfExists',value:function _setPropsIfExists(

ref,props){
var ref=this.refs[ref];
ref&&ref.setNativeProps(props);
}}]);return NavigatorBreadcrumbNavigationBar;}(React.Component);NavigatorBreadcrumbNavigationBar.propTypes={navigator:PropTypes.shape({push:PropTypes.func,pop:PropTypes.func,replace:PropTypes.func,popToRoute:PropTypes.func,popToTop:PropTypes.func}),routeMapper:PropTypes.shape({rightContentForRoute:PropTypes.func,titleContentForRoute:PropTypes.func,iconForRoute:PropTypes.func}),navState:React.PropTypes.shape({routeStack:React.PropTypes.arrayOf(React.PropTypes.object),presentedIndex:React.PropTypes.number}),style:View.propTypes.style};NavigatorBreadcrumbNavigationBar.Styles=NavigatorBreadcrumbNavigationBarStyles;


var styles=StyleSheet.create({
breadCrumbContainer:{
overflow:'hidden',
position:'absolute',
height:NavigatorNavigationBarStyles.General.TotalNavHeight,
top:0,
left:0,
right:0}});



module.exports=NavigatorBreadcrumbNavigationBar;
}, 312, null, "NavigatorBreadcrumbNavigationBar");
__d(/* NavigatorBreadcrumbNavigationBarStyles */function(global, require, module, exports) {

























'use strict';

var Dimensions=require(103 /* Dimensions */);
var NavigatorNavigationBarStylesIOS=require(314 /* NavigatorNavigationBarStylesIOS */);

var buildStyleInterpolator=require(315 /* buildStyleInterpolator */);
var merge=require(123 /* merge */);

var SCREEN_WIDTH=Dimensions.get('window').width;
var STATUS_BAR_HEIGHT=NavigatorNavigationBarStylesIOS.General.StatusBarHeight;
var NAV_BAR_HEIGHT=NavigatorNavigationBarStylesIOS.General.NavBarHeight;

var SPACING=4;
var ICON_WIDTH=40;
var SEPARATOR_WIDTH=9;
var CRUMB_WIDTH=ICON_WIDTH+SEPARATOR_WIDTH;

var OPACITY_RATIO=100;
var ICON_INACTIVE_OPACITY=0.6;
var MAX_BREADCRUMBS=10;

var CRUMB_BASE={
position:'absolute',
flexDirection:'row',
top:STATUS_BAR_HEIGHT,
width:CRUMB_WIDTH,
height:NAV_BAR_HEIGHT,
backgroundColor:'transparent'};


var ICON_BASE={
width:ICON_WIDTH,
height:NAV_BAR_HEIGHT};


var SEPARATOR_BASE={
width:SEPARATOR_WIDTH,
height:NAV_BAR_HEIGHT};


var TITLE_BASE={
position:'absolute',
top:STATUS_BAR_HEIGHT,
height:NAV_BAR_HEIGHT,
backgroundColor:'transparent'};



var FIRST_TITLE_BASE=merge(TITLE_BASE,{
left:0,
right:0,
alignItems:'center',
height:NAV_BAR_HEIGHT});


var RIGHT_BUTTON_BASE={
position:'absolute',
top:STATUS_BAR_HEIGHT,
right:SPACING,
overflow:'hidden',
opacity:1,
height:NAV_BAR_HEIGHT,
backgroundColor:'transparent'};






var LEFT=[];
var CENTER=[];
var RIGHT=[];
for(var i=0;i<MAX_BREADCRUMBS;i++){
var crumbLeft=CRUMB_WIDTH*i+SPACING;
LEFT[i]={
Crumb:merge(CRUMB_BASE,{left:crumbLeft}),
Icon:merge(ICON_BASE,{opacity:ICON_INACTIVE_OPACITY}),
Separator:merge(SEPARATOR_BASE,{opacity:1}),
Title:merge(TITLE_BASE,{left:crumbLeft,opacity:0}),
RightItem:merge(RIGHT_BUTTON_BASE,{opacity:0})};

CENTER[i]={
Crumb:merge(CRUMB_BASE,{left:crumbLeft}),
Icon:merge(ICON_BASE,{opacity:1}),
Separator:merge(SEPARATOR_BASE,{opacity:0}),
Title:merge(TITLE_BASE,{
left:crumbLeft+ICON_WIDTH,
opacity:1}),

RightItem:merge(RIGHT_BUTTON_BASE,{opacity:1})};

var crumbRight=SCREEN_WIDTH-100;
RIGHT[i]={
Crumb:merge(CRUMB_BASE,{left:crumbRight}),
Icon:merge(ICON_BASE,{opacity:0}),
Separator:merge(SEPARATOR_BASE,{opacity:0}),
Title:merge(TITLE_BASE,{
left:crumbRight+ICON_WIDTH,
opacity:0}),

RightItem:merge(RIGHT_BUTTON_BASE,{opacity:0})};

}


CENTER[0]={
Crumb:merge(CRUMB_BASE,{left:SCREEN_WIDTH/4}),
Icon:merge(ICON_BASE,{opacity:0}),
Separator:merge(SEPARATOR_BASE,{opacity:0}),
Title:merge(FIRST_TITLE_BASE,{opacity:1}),
RightItem:CENTER[0].RightItem};

LEFT[0].Title=merge(FIRST_TITLE_BASE,{left:-SCREEN_WIDTH/4,opacity:0});
RIGHT[0].Title=merge(FIRST_TITLE_BASE,{opacity:0});


var buildIndexSceneInterpolator=function buildIndexSceneInterpolator(startStyles,endStyles){
return{
Crumb:buildStyleInterpolator({
left:{
type:'linear',
from:startStyles.Crumb.left,
to:endStyles.Crumb.left,
min:0,
max:1,
extrapolate:true}}),


Icon:buildStyleInterpolator({
opacity:{
type:'linear',
from:startStyles.Icon.opacity,
to:endStyles.Icon.opacity,
min:0,
max:1}}),


Separator:buildStyleInterpolator({
opacity:{
type:'linear',
from:startStyles.Separator.opacity,
to:endStyles.Separator.opacity,
min:0,
max:1}}),


Title:buildStyleInterpolator({
opacity:{
type:'linear',
from:startStyles.Title.opacity,
to:endStyles.Title.opacity,
min:0,
max:1},

left:{
type:'linear',
from:startStyles.Title.left,
to:endStyles.Title.left,
min:0,
max:1,
extrapolate:true}}),


RightItem:buildStyleInterpolator({
opacity:{
type:'linear',
from:startStyles.RightItem.opacity,
to:endStyles.RightItem.opacity,
min:0,
max:1,
round:OPACITY_RATIO}})};



};

var Interpolators=CENTER.map(function(_,ii){
return{

RightToCenter:buildIndexSceneInterpolator(RIGHT[ii],CENTER[ii]),

CenterToLeft:buildIndexSceneInterpolator(CENTER[ii],LEFT[ii]),

RightToLeft:buildIndexSceneInterpolator(RIGHT[ii],LEFT[ii])};

});





module.exports={
Interpolators:Interpolators,
Left:LEFT,
Center:CENTER,
Right:RIGHT,
IconWidth:ICON_WIDTH,
IconHeight:NAV_BAR_HEIGHT,
SeparatorWidth:SEPARATOR_WIDTH,
SeparatorHeight:NAV_BAR_HEIGHT};
}, 313, null, "NavigatorBreadcrumbNavigationBarStyles");
__d(/* NavigatorNavigationBarStylesIOS */function(global, require, module, exports) {

























'use strict';

var Dimensions=require(103 /* Dimensions */);

var buildStyleInterpolator=require(315 /* buildStyleInterpolator */);
var merge=require(123 /* merge */);

var SCREEN_WIDTH=Dimensions.get('window').width;
var NAV_BAR_HEIGHT=44;
var STATUS_BAR_HEIGHT=20;
var NAV_HEIGHT=NAV_BAR_HEIGHT+STATUS_BAR_HEIGHT;

var BASE_STYLES={
Title:{
position:'absolute',
top:STATUS_BAR_HEIGHT,
left:0,
right:0,
alignItems:'center',
height:NAV_BAR_HEIGHT,
backgroundColor:'transparent'},

LeftButton:{
position:'absolute',
top:STATUS_BAR_HEIGHT,
left:0,
overflow:'hidden',
opacity:1,
height:NAV_BAR_HEIGHT,
backgroundColor:'transparent'},

RightButton:{
position:'absolute',
top:STATUS_BAR_HEIGHT,
right:0,
overflow:'hidden',
opacity:1,
alignItems:'flex-end',
height:NAV_BAR_HEIGHT,
backgroundColor:'transparent'}};










var Stages={
Left:{
Title:merge(BASE_STYLES.Title,{left:-SCREEN_WIDTH/2,opacity:0}),
LeftButton:merge(BASE_STYLES.LeftButton,{left:0,opacity:0}),
RightButton:merge(BASE_STYLES.RightButton,{opacity:0})},

Center:{
Title:merge(BASE_STYLES.Title,{left:0,opacity:1}),
LeftButton:merge(BASE_STYLES.LeftButton,{left:0,opacity:1}),
RightButton:merge(BASE_STYLES.RightButton,{opacity:1})},

Right:{
Title:merge(BASE_STYLES.Title,{left:SCREEN_WIDTH/2,opacity:0}),
LeftButton:merge(BASE_STYLES.LeftButton,{left:0,opacity:0}),
RightButton:merge(BASE_STYLES.RightButton,{opacity:0})}};




var opacityRatio=100;

function buildSceneInterpolators(startStyles,endStyles){
return{
Title:buildStyleInterpolator({
opacity:{
type:'linear',
from:startStyles.Title.opacity,
to:endStyles.Title.opacity,
min:0,
max:1},

left:{
type:'linear',
from:startStyles.Title.left,
to:endStyles.Title.left,
min:0,
max:1,
extrapolate:true}}),


LeftButton:buildStyleInterpolator({
opacity:{
type:'linear',
from:startStyles.LeftButton.opacity,
to:endStyles.LeftButton.opacity,
min:0,
max:1,
round:opacityRatio},

left:{
type:'linear',
from:startStyles.LeftButton.left,
to:endStyles.LeftButton.left,
min:0,
max:1}}),


RightButton:buildStyleInterpolator({
opacity:{
type:'linear',
from:startStyles.RightButton.opacity,
to:endStyles.RightButton.opacity,
min:0,
max:1,
round:opacityRatio},

left:{
type:'linear',
from:startStyles.RightButton.left,
to:endStyles.RightButton.left,
min:0,
max:1,
extrapolate:true}})};



}

var Interpolators={

RightToCenter:buildSceneInterpolators(Stages.Right,Stages.Center),

CenterToLeft:buildSceneInterpolators(Stages.Center,Stages.Left),

RightToLeft:buildSceneInterpolators(Stages.Right,Stages.Left)};



module.exports={
General:{
NavBarHeight:NAV_BAR_HEIGHT,
StatusBarHeight:STATUS_BAR_HEIGHT,
TotalNavHeight:NAV_HEIGHT},

Interpolators:Interpolators,
Stages:Stages};
}, 314, null, "NavigatorNavigationBarStylesIOS");
__d(/* buildStyleInterpolator */function(global, require, module, exports) {










var keyOf=require(295 /* fbjs/lib/keyOf */);

var X_DIM=keyOf({x:null});
var Y_DIM=keyOf({y:null});
var Z_DIM=keyOf({z:null});
var W_DIM=keyOf({w:null});

var TRANSFORM_ROTATE_NAME=keyOf({transformRotateRadians:null});

var ShouldAllocateReusableOperationVars={
transformRotateRadians:true,
transformScale:true,
transformTranslate:true};


var InitialOperationField={
transformRotateRadians:[0,0,0,1],
transformTranslate:[0,0,0],
transformScale:[1,1,1]};



























































var ARGUMENT_NAMES_RE=/([^\s,]+)/g;




















var inline=function inline(fnStr,replaceWithArgs){
var parameterNames=fnStr.slice(fnStr.indexOf('(')+1,fnStr.indexOf(')')).
match(ARGUMENT_NAMES_RE)||
[];
var replaceRegexStr=parameterNames.map(function(paramName){
return'\\b'+paramName+'\\b';
}).join('|');
var replaceRegex=new RegExp(replaceRegexStr,'g');
var fnBody=fnStr.substring(fnStr.indexOf('{')+1,fnStr.lastIndexOf('}'));
var newFnBody=fnBody.replace(replaceRegex,function(parameterName){
var indexInParameterNames=parameterNames.indexOf(parameterName);
var replacementName=replaceWithArgs[indexInParameterNames];
return replacementName;
});
return newFnBody.split('\n');
};




var MatrixOps={
unroll:'function(matVar, m0, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14, m15) {\n    m0 = matVar[0];\n    m1 = matVar[1];\n    m2 = matVar[2];\n    m3 = matVar[3];\n    m4 = matVar[4];\n    m5 = matVar[5];\n    m6 = matVar[6];\n    m7 = matVar[7];\n    m8 = matVar[8];\n    m9 = matVar[9];\n    m10 = matVar[10];\n    m11 = matVar[11];\n    m12 = matVar[12];\n    m13 = matVar[13];\n    m14 = matVar[14];\n    m15 = matVar[15];\n  }',


















matrixDiffers:'function(retVar, matVar, m0, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14, m15) {\n    retVar = retVar ||\n    m0 !== matVar[0] ||\n    m1 !== matVar[1] ||\n    m2 !== matVar[2] ||\n    m3 !== matVar[3] ||\n    m4 !== matVar[4] ||\n    m5 !== matVar[5] ||\n    m6 !== matVar[6] ||\n    m7 !== matVar[7] ||\n    m8 !== matVar[8] ||\n    m9 !== matVar[9] ||\n    m10 !== matVar[10] ||\n    m11 !== matVar[11] ||\n    m12 !== matVar[12] ||\n    m13 !== matVar[13] ||\n    m14 !== matVar[14] ||\n    m15 !== matVar[15];\n  }',



















transformScale:'function(matVar, opVar) {\n    // Scaling matVar by opVar\n    var x = opVar[0];\n    var y = opVar[1];\n    var z = opVar[2];\n    matVar[0] = matVar[0] * x;\n    matVar[1] = matVar[1] * x;\n    matVar[2] = matVar[2] * x;\n    matVar[3] = matVar[3] * x;\n    matVar[4] = matVar[4] * y;\n    matVar[5] = matVar[5] * y;\n    matVar[6] = matVar[6] * y;\n    matVar[7] = matVar[7] * y;\n    matVar[8] = matVar[8] * z;\n    matVar[9] = matVar[9] * z;\n    matVar[10] = matVar[10] * z;\n    matVar[11] = matVar[11] * z;\n    matVar[12] = matVar[12];\n    matVar[13] = matVar[13];\n    matVar[14] = matVar[14];\n    matVar[15] = matVar[15];\n  }',


























transformTranslate:'function(matVar, opVar) {\n    // Translating matVar by opVar\n    var x = opVar[0];\n    var y = opVar[1];\n    var z = opVar[2];\n    matVar[12] = matVar[0] * x + matVar[4] * y + matVar[8] * z + matVar[12];\n    matVar[13] = matVar[1] * x + matVar[5] * y + matVar[9] * z + matVar[13];\n    matVar[14] = matVar[2] * x + matVar[6] * y + matVar[10] * z + matVar[14];\n    matVar[15] = matVar[3] * x + matVar[7] * y + matVar[11] * z + matVar[15];\n  }',














transformRotateRadians:'function(matVar, q) {\n    // Rotating matVar by q\n    var xQuat = q[0], yQuat = q[1], zQuat = q[2], wQuat = q[3];\n    var x2Quat = xQuat + xQuat;\n    var y2Quat = yQuat + yQuat;\n    var z2Quat = zQuat + zQuat;\n    var xxQuat = xQuat * x2Quat;\n    var xyQuat = xQuat * y2Quat;\n    var xzQuat = xQuat * z2Quat;\n    var yyQuat = yQuat * y2Quat;\n    var yzQuat = yQuat * z2Quat;\n    var zzQuat = zQuat * z2Quat;\n    var wxQuat = wQuat * x2Quat;\n    var wyQuat = wQuat * y2Quat;\n    var wzQuat = wQuat * z2Quat;\n    // Step 1: Inlines the construction of a quaternion matrix (\'quatMat\')\n    var quatMat0 = 1 - (yyQuat + zzQuat);\n    var quatMat1 = xyQuat + wzQuat;\n    var quatMat2 = xzQuat - wyQuat;\n    var quatMat4 = xyQuat - wzQuat;\n    var quatMat5 = 1 - (xxQuat + zzQuat);\n    var quatMat6 = yzQuat + wxQuat;\n    var quatMat8 = xzQuat + wyQuat;\n    var quatMat9 = yzQuat - wxQuat;\n    var quatMat10 = 1 - (xxQuat + yyQuat);\n    // quatMat3/7/11/12/13/14 = 0, quatMat15 = 1\n\n    // Step 2: Inlines multiplication, takes advantage of constant quatMat cells\n    var a00 = matVar[0];\n    var a01 = matVar[1];\n    var a02 = matVar[2];\n    var a03 = matVar[3];\n    var a10 = matVar[4];\n    var a11 = matVar[5];\n    var a12 = matVar[6];\n    var a13 = matVar[7];\n    var a20 = matVar[8];\n    var a21 = matVar[9];\n    var a22 = matVar[10];\n    var a23 = matVar[11];\n\n    var b0  = quatMat0, b1 = quatMat1, b2 = quatMat2;\n    matVar[0] = b0 * a00 + b1 * a10 + b2 * a20;\n    matVar[1] = b0 * a01 + b1 * a11 + b2 * a21;\n    matVar[2] = b0 * a02 + b1 * a12 + b2 * a22;\n    matVar[3] = b0 * a03 + b1 * a13 + b2 * a23;\n    b0 = quatMat4; b1 = quatMat5; b2 = quatMat6;\n    matVar[4] = b0 * a00 + b1 * a10 + b2 * a20;\n    matVar[5] = b0 * a01 + b1 * a11 + b2 * a21;\n    matVar[6] = b0 * a02 + b1 * a12 + b2 * a22;\n    matVar[7] = b0 * a03 + b1 * a13 + b2 * a23;\n    b0 = quatMat8; b1 = quatMat9; b2 = quatMat10;\n    matVar[8] = b0 * a00 + b1 * a10 + b2 * a20;\n    matVar[9] = b0 * a01 + b1 * a11 + b2 * a21;\n    matVar[10] = b0 * a02 + b1 * a12 + b2 * a22;\n    matVar[11] = b0 * a03 + b1 * a13 + b2 * a23;\n  }'};




























































var MatrixOpsInitial={
transformScale:'function(matVar, opVar) {\n    // Scaling matVar known to be identity by opVar\n    matVar[0] = opVar[0];\n    matVar[1] = 0;\n    matVar[2] = 0;\n    matVar[3] = 0;\n    matVar[4] = 0;\n    matVar[5] = opVar[1];\n    matVar[6] = 0;\n    matVar[7] = 0;\n    matVar[8] = 0;\n    matVar[9] = 0;\n    matVar[10] = opVar[2];\n    matVar[11] = 0;\n    matVar[12] = 0;\n    matVar[13] = 0;\n    matVar[14] = 0;\n    matVar[15] = 1;\n  }',



















transformTranslate:'function(matVar, opVar) {\n    // Translating matVar known to be identity by opVar;\n    matVar[0] = 1;\n    matVar[1] = 0;\n    matVar[2] = 0;\n    matVar[3] = 0;\n    matVar[4] = 0;\n    matVar[5] = 1;\n    matVar[6] = 0;\n    matVar[7] = 0;\n    matVar[8] = 0;\n    matVar[9] = 0;\n    matVar[10] = 1;\n    matVar[11] = 0;\n    matVar[12] = opVar[0];\n    matVar[13] = opVar[1];\n    matVar[14] = opVar[2];\n    matVar[15] = 1;\n  }',
























transformRotateRadians:'function(matVar, q) {\n\n    // Rotating matVar which is known to be identity by q\n    var xQuat = q[0], yQuat = q[1], zQuat = q[2], wQuat = q[3];\n    var x2Quat = xQuat + xQuat;\n    var y2Quat = yQuat + yQuat;\n    var z2Quat = zQuat + zQuat;\n    var xxQuat = xQuat * x2Quat;\n    var xyQuat = xQuat * y2Quat;\n    var xzQuat = xQuat * z2Quat;\n    var yyQuat = yQuat * y2Quat;\n    var yzQuat = yQuat * z2Quat;\n    var zzQuat = zQuat * z2Quat;\n    var wxQuat = wQuat * x2Quat;\n    var wyQuat = wQuat * y2Quat;\n    var wzQuat = wQuat * z2Quat;\n    // Step 1: Inlines the construction of a quaternion matrix (\'quatMat\')\n    var quatMat0 = 1 - (yyQuat + zzQuat);\n    var quatMat1 = xyQuat + wzQuat;\n    var quatMat2 = xzQuat - wyQuat;\n    var quatMat4 = xyQuat - wzQuat;\n    var quatMat5 = 1 - (xxQuat + zzQuat);\n    var quatMat6 = yzQuat + wxQuat;\n    var quatMat8 = xzQuat + wyQuat;\n    var quatMat9 = yzQuat - wxQuat;\n    var quatMat10 = 1 - (xxQuat + yyQuat);\n    // quatMat3/7/11/12/13/14 = 0, quatMat15 = 1\n\n    // Step 2: Inlines the multiplication with identity matrix.\n    var b0  = quatMat0, b1 = quatMat1, b2 = quatMat2;\n    matVar[0] = b0;\n    matVar[1] = b1;\n    matVar[2] = b2;\n    matVar[3] = 0;\n    b0 = quatMat4; b1 = quatMat5; b2 = quatMat6;\n    matVar[4] = b0;\n    matVar[5] = b1;\n    matVar[6] = b2;\n    matVar[7] = 0;\n    b0 = quatMat8; b1 = quatMat9; b2 = quatMat10;\n    matVar[8] = b0;\n    matVar[9] = b1;\n    matVar[10] = b2;\n    matVar[11] = 0;\n    matVar[12] = 0;\n    matVar[13] = 0;\n    matVar[14] = 0;\n    matVar[15] = 1;\n  }'};



















































var setNextValAndDetectChange=function setNextValAndDetectChange(name,tmpVarName){
return(
'  if (!didChange) {\n'+
'    var prevVal = result.'+name+';\n'+
'    result.'+name+' = '+tmpVarName+';\n'+
'    didChange = didChange  || ('+tmpVarName+' !== prevVal);\n'+
'  } else {\n'+
'    result.'+name+' = '+tmpVarName+';\n'+
'  }\n');

};

var computeNextValLinear=function computeNextValLinear(anim,from,to,tmpVarName){
var hasRoundRatio='round'in anim;
var roundRatio=anim.round;
var fn='  ratio = (value - '+anim.min+') / '+(anim.max-anim.min)+';\n';
if(!anim.extrapolate){
fn+='  ratio = ratio > 1 ? 1 : (ratio < 0 ? 0 : ratio);\n';
}

var roundOpen=hasRoundRatio?'Math.round('+roundRatio+' * ':'';
var roundClose=hasRoundRatio?') / '+roundRatio:'';
fn+=
'  '+tmpVarName+' = '+
roundOpen+
'('+from+' * (1 - ratio) + '+to+' * ratio)'+
roundClose+';\n';
return fn;
};

var computeNextValLinearScalar=function computeNextValLinearScalar(anim){
return computeNextValLinear(anim,anim.from,anim.to,'nextScalarVal');
};

var computeNextValConstant=function computeNextValConstant(anim){
var constantExpression=JSON.stringify(anim.value);
return'  nextScalarVal = '+constantExpression+';\n';
};

var computeNextValStep=function computeNextValStep(anim){
return(
'  nextScalarVal = value >= '+(
anim.threshold+' ? '+anim.to+' : '+anim.from)+';\n');

};

var computeNextValIdentity=function computeNextValIdentity(anim){
return'  nextScalarVal = value;\n';
};

var operationVar=function operationVar(name){
return name+'ReuseOp';
};

var createReusableOperationVars=function createReusableOperationVars(anims){
var ret='';
for(var name in anims){
if(ShouldAllocateReusableOperationVars[name]){
ret+='var '+operationVar(name)+' = [];\n';
}
}
return ret;
};

var newlines=function newlines(statements){
return'\n'+statements.join('\n')+'\n';
};







var computeNextMatrixOperationField=function computeNextMatrixOperationField(anim,name,dimension,index){
var fieldAccess=operationVar(name)+'['+index+']';
if(anim.from[dimension]!==undefined&&anim.to[dimension]!==undefined){
return'  '+anim.from[dimension]!==anim.to[dimension]?
computeNextValLinear(anim,anim.from[dimension],anim.to[dimension],fieldAccess):
fieldAccess+' = '+anim.from[dimension]+';';
}else{
return'  '+fieldAccess+' = '+InitialOperationField[name][index]+';';
}
};

var unrolledVars=[];
for(var varIndex=0;varIndex<16;varIndex++){
unrolledVars.push('m'+varIndex);
}
var setNextMatrixAndDetectChange=function setNextMatrixAndDetectChange(orderedMatrixOperations){
var fn=[
'  var transform = result.transform !== undefined ? '+
'result.transform : (result.transform = [{ matrix: [] }]);'+
'  var transformMatrix = transform[0].matrix;'];

fn.push.apply(
fn,
inline(MatrixOps.unroll,['transformMatrix'].concat(unrolledVars)));

for(var i=0;i<orderedMatrixOperations.length;i++){
var opName=orderedMatrixOperations[i];
if(i===0){
fn.push.apply(
fn,
inline(MatrixOpsInitial[opName],['transformMatrix',operationVar(opName)]));

}else{
fn.push.apply(
fn,
inline(MatrixOps[opName],['transformMatrix',operationVar(opName)]));

}
}
fn.push.apply(
fn,
inline(MatrixOps.matrixDiffers,['didChange','transformMatrix'].concat(unrolledVars)));

return fn;
};

var InterpolateMatrix={
transformTranslate:true,
transformRotateRadians:true,
transformScale:true};


var createFunctionString=function createFunctionString(anims){


var orderedMatrixOperations=[];



var fn='return (function() {\n';
fn+=createReusableOperationVars(anims);
fn+='return function(result, value) {\n';
fn+='  var didChange = false;\n';
fn+='  var nextScalarVal;\n';
fn+='  var ratio;\n';

for(var name in anims){
var anim=anims[name];
if(anim.type==='linear'){
if(InterpolateMatrix[name]){
orderedMatrixOperations.push(name);
var setOperations=[
computeNextMatrixOperationField(anim,name,X_DIM,0),
computeNextMatrixOperationField(anim,name,Y_DIM,1),
computeNextMatrixOperationField(anim,name,Z_DIM,2)];

if(name===TRANSFORM_ROTATE_NAME){
setOperations.push(computeNextMatrixOperationField(anim,name,W_DIM,3));
}
fn+=newlines(setOperations);
}else{
fn+=computeNextValLinearScalar(anim,'nextScalarVal');
fn+=setNextValAndDetectChange(name,'nextScalarVal');
}
}else if(anim.type==='constant'){
fn+=computeNextValConstant(anim);
fn+=setNextValAndDetectChange(name,'nextScalarVal');
}else if(anim.type==='step'){
fn+=computeNextValStep(anim);
fn+=setNextValAndDetectChange(name,'nextScalarVal');
}else if(anim.type==='identity'){
fn+=computeNextValIdentity(anim);
fn+=setNextValAndDetectChange(name,'nextScalarVal');
}
}
if(orderedMatrixOperations.length){
fn+=newlines(setNextMatrixAndDetectChange(orderedMatrixOperations));
}
fn+='  return didChange;\n';
fn+='};\n';
fn+='})()';
return fn;
};






var buildStyleInterpolator=function buildStyleInterpolator(anims){

var interpolator=null;
function lazyStyleInterpolator(result,value){
if(interpolator===null){
interpolator=Function(createFunctionString(anims))();
}
return interpolator(result,value);
}
return lazyStyleInterpolator;
};

module.exports=buildStyleInterpolator;
}, 315, null, "buildStyleInterpolator");
__d(/* NavigatorNavigationBarStylesAndroid */function(global, require, module, exports) {

























'use strict';

var buildStyleInterpolator=require(315 /* buildStyleInterpolator */);
var merge=require(123 /* merge */);


var NAV_BAR_HEIGHT=56;
var TITLE_LEFT=72;
var BUTTON_SIZE=24;
var TOUCH_TARGT_SIZE=48;
var BUTTON_HORIZONTAL_MARGIN=16;

var BUTTON_EFFECTIVE_MARGIN=BUTTON_HORIZONTAL_MARGIN-(TOUCH_TARGT_SIZE-BUTTON_SIZE)/2;
var NAV_ELEMENT_HEIGHT=NAV_BAR_HEIGHT;

var BASE_STYLES={
Title:{
position:'absolute',
bottom:0,
left:0,
right:0,
alignItems:'flex-start',
height:NAV_ELEMENT_HEIGHT,
backgroundColor:'transparent',
marginLeft:TITLE_LEFT},

LeftButton:{
position:'absolute',
top:0,
left:BUTTON_EFFECTIVE_MARGIN,
overflow:'hidden',
height:NAV_ELEMENT_HEIGHT,
backgroundColor:'transparent'},

RightButton:{
position:'absolute',
top:0,
right:BUTTON_EFFECTIVE_MARGIN,
overflow:'hidden',
alignItems:'flex-end',
height:NAV_ELEMENT_HEIGHT,
backgroundColor:'transparent'}};










var Stages={
Left:{
Title:merge(BASE_STYLES.Title,{opacity:0}),
LeftButton:merge(BASE_STYLES.LeftButton,{opacity:0}),
RightButton:merge(BASE_STYLES.RightButton,{opacity:0})},

Center:{
Title:merge(BASE_STYLES.Title,{opacity:1}),
LeftButton:merge(BASE_STYLES.LeftButton,{opacity:1}),
RightButton:merge(BASE_STYLES.RightButton,{opacity:1})},

Right:{
Title:merge(BASE_STYLES.Title,{opacity:0}),
LeftButton:merge(BASE_STYLES.LeftButton,{opacity:0}),
RightButton:merge(BASE_STYLES.RightButton,{opacity:0})}};




var opacityRatio=100;

function buildSceneInterpolators(startStyles,endStyles){
return{
Title:buildStyleInterpolator({
opacity:{
type:'linear',
from:startStyles.Title.opacity,
to:endStyles.Title.opacity,
min:0,
max:1},

left:{
type:'linear',
from:startStyles.Title.left,
to:endStyles.Title.left,
min:0,
max:1,
extrapolate:true}}),


LeftButton:buildStyleInterpolator({
opacity:{
type:'linear',
from:startStyles.LeftButton.opacity,
to:endStyles.LeftButton.opacity,
min:0,
max:1,
round:opacityRatio},

left:{
type:'linear',
from:startStyles.LeftButton.left,
to:endStyles.LeftButton.left,
min:0,
max:1}}),


RightButton:buildStyleInterpolator({
opacity:{
type:'linear',
from:startStyles.RightButton.opacity,
to:endStyles.RightButton.opacity,
min:0,
max:1,
round:opacityRatio},

left:{
type:'linear',
from:startStyles.RightButton.left,
to:endStyles.RightButton.left,
min:0,
max:1,
extrapolate:true}})};



}

var Interpolators={

RightToCenter:buildSceneInterpolators(Stages.Right,Stages.Center),

CenterToLeft:buildSceneInterpolators(Stages.Center,Stages.Left),

RightToLeft:buildSceneInterpolators(Stages.Right,Stages.Left)};



module.exports={
General:{
NavBarHeight:NAV_BAR_HEIGHT,
StatusBarHeight:0,
TotalNavHeight:NAV_BAR_HEIGHT},

Interpolators:Interpolators,
Stages:Stages};
}, 316, null, "NavigatorNavigationBarStylesAndroid");
__d(/* NavigatorNavigationBar */function(global, require, module, exports) {

























'use strict';

var React=require(78 /* React */);
var NavigatorNavigationBarStylesAndroid=require(316 /* NavigatorNavigationBarStylesAndroid */);
var NavigatorNavigationBarStylesIOS=require(314 /* NavigatorNavigationBarStylesIOS */);
var Platform=require(28 /* Platform */);
var StyleSheet=require(101 /* StyleSheet */);
var View=require(120 /* View */);

var guid=require(197 /* guid */);var _require=

require(311 /* immutable */),Map=_require.Map;

var COMPONENT_NAMES=['Title','LeftButton','RightButton'];

var NavigatorNavigationBarStyles=Platform.OS==='android'?
NavigatorNavigationBarStylesAndroid:NavigatorNavigationBarStylesIOS;

var navStatePresentedIndex=function navStatePresentedIndex(navState){
if(navState.presentedIndex!==undefined){
return navState.presentedIndex;
}

return navState.observedTopOfStack;
};var

NavigatorNavigationBar=function(_React$Component){babelHelpers.inherits(NavigatorNavigationBar,_React$Component);function NavigatorNavigationBar(){var _ref;var _temp,_this,_ret;babelHelpers.classCallCheck(this,NavigatorNavigationBar);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=babelHelpers.possibleConstructorReturn(this,(_ref=NavigatorNavigationBar.__proto__||Object.getPrototypeOf(NavigatorNavigationBar)).call.apply(_ref,[this].concat(args))),_this),_this.































immediatelyRefresh=function(){
_this._reset();
_this.forceUpdate();
},_this.

_reset=function(){
_this._key=guid();
_this._reusableProps={};
_this._components={};
_this._descriptors={};

COMPONENT_NAMES.forEach(function(componentName){
_this._components[componentName]=new Map();
_this._descriptors[componentName]=new Map();
});
},_this.

_getReusableProps=function(componentName,index){
var propStack=_this._reusableProps[componentName];
if(!propStack){
propStack=_this._reusableProps[componentName]=[];
}
var props=propStack[index];
if(!props){
props=propStack[index]={style:{}};
}
return props;
},_this.

_updateIndexProgress=function(
progress,
index,
fromIndex,
toIndex)
{
var amount=toIndex>fromIndex?progress:1-progress;
var oldDistToCenter=index-fromIndex;
var newDistToCenter=index-toIndex;
var interpolate;
if(oldDistToCenter>0&&newDistToCenter===0||
newDistToCenter>0&&oldDistToCenter===0){
interpolate=_this.props.navigationStyles.Interpolators.RightToCenter;
}else if(oldDistToCenter<0&&newDistToCenter===0||
newDistToCenter<0&&oldDistToCenter===0){
interpolate=_this.props.navigationStyles.Interpolators.CenterToLeft;
}else if(oldDistToCenter===newDistToCenter){
interpolate=_this.props.navigationStyles.Interpolators.RightToCenter;
}else{
interpolate=_this.props.navigationStyles.Interpolators.RightToLeft;
}

COMPONENT_NAMES.forEach(function(componentName){
var component=this._components[componentName].get(this.props.navState.routeStack[index]);
var props=this._getReusableProps(componentName,index);
if(component&&interpolate[componentName](props.style,amount)){
props.pointerEvents=props.style.opacity===0?'none':'box-none';
component.setNativeProps(props);
}
},_this);
},_this.

updateProgress=function(progress,fromIndex,toIndex){
var max=Math.max(fromIndex,toIndex);
var min=Math.min(fromIndex,toIndex);
for(var index=min;index<=max;index++){
_this._updateIndexProgress(progress,index,fromIndex,toIndex);
}
},_this.





















_getComponent=function(componentName,route,index){
if(_this._descriptors[componentName].includes(route)){
return _this._descriptors[componentName].get(route);
}

var rendered=null;

var content=_this.props.routeMapper[componentName](
_this.props.navState.routeStack[index],
_this.props.navigator,
index,
_this.props.navState);

if(!content){
return null;
}

var componentIsActive=index===navStatePresentedIndex(_this.props.navState);
var initialStage=componentIsActive?
_this.props.navigationStyles.Stages.Center:
_this.props.navigationStyles.Stages.Left;
rendered=
React.createElement(View,{
ref:function ref(_ref2){
_this._components[componentName]=_this._components[componentName].set(route,_ref2);
},
pointerEvents:componentIsActive?'box-none':'none',
style:initialStage[componentName]},
content);



_this._descriptors[componentName]=_this._descriptors[componentName].set(route,rendered);
return rendered;
},_temp),babelHelpers.possibleConstructorReturn(_this,_ret);}babelHelpers.createClass(NavigatorNavigationBar,[{key:'componentWillMount',value:function componentWillMount(){this._reset();}},{key:'render',value:function render(){var _this2=this;var navBarStyle={height:this.props.navigationStyles.General.TotalNavHeight};var navState=this.props.navState;var components=navState.routeStack.map(function(route,index){return COMPONENT_NAMES.map(function(componentName){return _this2._getComponent(componentName,route,index);});});return React.createElement(View,{key:this._key,style:[styles.navBarContainer,navBarStyle,this.props.style]},components);}}]);return NavigatorNavigationBar;}(React.Component);NavigatorNavigationBar.propTypes={navigator:React.PropTypes.object,routeMapper:React.PropTypes.shape({Title:React.PropTypes.func.isRequired,LeftButton:React.PropTypes.func.isRequired,RightButton:React.PropTypes.func.isRequired}).isRequired,navState:React.PropTypes.shape({routeStack:React.PropTypes.arrayOf(React.PropTypes.object),presentedIndex:React.PropTypes.number}),navigationStyles:React.PropTypes.object,style:View.propTypes.style};NavigatorNavigationBar.Styles=NavigatorNavigationBarStyles;NavigatorNavigationBar.StylesAndroid=NavigatorNavigationBarStylesAndroid;NavigatorNavigationBar.StylesIOS=NavigatorNavigationBarStylesIOS;NavigatorNavigationBar.defaultProps={navigationStyles:NavigatorNavigationBarStyles};



var styles=StyleSheet.create({
navBarContainer:{
position:'absolute',
top:0,
left:0,
right:0,
backgroundColor:'transparent'}});



module.exports=NavigatorNavigationBar;
}, 317, null, "NavigatorNavigationBar");
__d(/* NavigatorSceneConfigs */function(global, require, module, exports) {






























'use strict';

var Dimensions=require(103 /* Dimensions */);
var PixelRatio=require(102 /* PixelRatio */);
var I18nManager=require(304 /* I18nManager */);

var buildStyleInterpolator=require(315 /* buildStyleInterpolator */);

var IS_RTL=I18nManager.isRTL;

var SCREEN_WIDTH=Dimensions.get('window').width;
var SCREEN_HEIGHT=Dimensions.get('window').height;
var PIXEL_RATIO=PixelRatio.get();

var ToTheLeftIOS={
transformTranslate:{
from:{x:0,y:0,z:0},
to:{x:-SCREEN_WIDTH*0.3,y:0,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PIXEL_RATIO},

opacity:{
value:1.0,
type:'constant'}};



var ToTheRightIOS=babelHelpers.extends({},
ToTheLeftIOS,{
transformTranslate:{
from:{x:0,y:0,z:0},
to:{x:SCREEN_WIDTH*0.3,y:0,z:0}}});



var FadeToTheLeft={


transformTranslate:{
from:{x:0,y:0,z:0},
to:{x:-Math.round(SCREEN_WIDTH*0.3),y:0,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PIXEL_RATIO},












transformScale:{
from:{x:1,y:1,z:1},
to:{x:0.95,y:0.95,z:1},
min:0,
max:1,
type:'linear',
extrapolate:true},

opacity:{
from:1,
to:0.3,
min:0,
max:1,
type:'linear',
extrapolate:false,
round:100},

translateX:{
from:0,
to:-Math.round(SCREEN_WIDTH*0.3),
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PIXEL_RATIO},

scaleX:{
from:1,
to:0.95,
min:0,
max:1,
type:'linear',
extrapolate:true},

scaleY:{
from:1,
to:0.95,
min:0,
max:1,
type:'linear',
extrapolate:true}};



var FadeToTheRight=babelHelpers.extends({},
FadeToTheLeft,{
transformTranslate:{
from:{x:0,y:0,z:0},
to:{x:Math.round(SCREEN_WIDTH*0.3),y:0,z:0}},

translateX:{
from:0,
to:Math.round(SCREEN_WIDTH*0.3)}});



var FadeIn={
opacity:{
from:0,
to:1,
min:0.5,
max:1,
type:'linear',
extrapolate:false,
round:100}};



var FadeOut={
opacity:{
from:1,
to:0,
min:0,
max:0.5,
type:'linear',
extrapolate:false,
round:100}};



var ToTheLeft={
transformTranslate:{
from:{x:0,y:0,z:0},
to:{x:-SCREEN_WIDTH,y:0,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PIXEL_RATIO},

opacity:{
value:1.0,
type:'constant'},


translateX:{
from:0,
to:-SCREEN_WIDTH,
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PIXEL_RATIO}};



var ToTheRight={
transformTranslate:{
from:{x:0,y:0,z:0},
to:{x:SCREEN_WIDTH,y:0,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PIXEL_RATIO},

opacity:{
value:1.0,
type:'constant'},


translateX:{
from:0,
to:SCREEN_WIDTH,
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PIXEL_RATIO}};



var ToTheUp={
transformTranslate:{
from:{x:0,y:0,z:0},
to:{x:0,y:-SCREEN_HEIGHT,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PIXEL_RATIO},

opacity:{
value:1.0,
type:'constant'},

translateY:{
from:0,
to:-SCREEN_HEIGHT,
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PIXEL_RATIO}};



var ToTheDown={
transformTranslate:{
from:{x:0,y:0,z:0},
to:{x:0,y:SCREEN_HEIGHT,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PIXEL_RATIO},

opacity:{
value:1.0,
type:'constant'},

translateY:{
from:0,
to:SCREEN_HEIGHT,
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PIXEL_RATIO}};



var FromTheRight={
opacity:{
value:1.0,
type:'constant'},


transformTranslate:{
from:{x:SCREEN_WIDTH,y:0,z:0},
to:{x:0,y:0,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PIXEL_RATIO},


translateX:{
from:SCREEN_WIDTH,
to:0,
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PIXEL_RATIO},


scaleX:{
value:1,
type:'constant'},

scaleY:{
value:1,
type:'constant'}};



var FromTheLeft=babelHelpers.extends({},
FromTheRight,{
transformTranslate:{
from:{x:-SCREEN_WIDTH,y:0,z:0},
to:{x:0,y:0,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PIXEL_RATIO},

translateX:{
from:-SCREEN_WIDTH,
to:0,
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PIXEL_RATIO}});



var FromTheDown=babelHelpers.extends({},
FromTheRight,{
transformTranslate:{
from:{y:SCREEN_HEIGHT,x:0,z:0},
to:{x:0,y:0,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PIXEL_RATIO},

translateY:{
from:SCREEN_HEIGHT,
to:0,
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PIXEL_RATIO}});



var FromTheTop=babelHelpers.extends({},
FromTheRight,{
transformTranslate:{
from:{y:-SCREEN_HEIGHT,x:0,z:0},
to:{x:0,y:0,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PIXEL_RATIO},

translateY:{
from:-SCREEN_HEIGHT,
to:0,
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PIXEL_RATIO}});



var ToTheBack={


transformTranslate:{
from:{x:0,y:0,z:0},
to:{x:0,y:0,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PIXEL_RATIO},

transformScale:{
from:{x:1,y:1,z:1},
to:{x:0.95,y:0.95,z:1},
min:0,
max:1,
type:'linear',
extrapolate:true},

opacity:{
from:1,
to:0.3,
min:0,
max:1,
type:'linear',
extrapolate:false,
round:100},

scaleX:{
from:1,
to:0.95,
min:0,
max:1,
type:'linear',
extrapolate:true},

scaleY:{
from:1,
to:0.95,
min:0,
max:1,
type:'linear',
extrapolate:true}};



var FromTheFront={
opacity:{
value:1.0,
type:'constant'},


transformTranslate:{
from:{x:0,y:SCREEN_HEIGHT,z:0},
to:{x:0,y:0,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PIXEL_RATIO},

translateY:{
from:SCREEN_HEIGHT,
to:0,
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PIXEL_RATIO},

scaleX:{
value:1,
type:'constant'},

scaleY:{
value:1,
type:'constant'}};



var ToTheBackAndroid={
opacity:{
value:1,
type:'constant'}};



var FromTheFrontAndroid={
opacity:{
from:0,
to:1,
min:0.5,
max:1,
type:'linear',
extrapolate:false,
round:100},

transformTranslate:{
from:{x:0,y:100,z:0},
to:{x:0,y:0,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PIXEL_RATIO},

translateY:{
from:100,
to:0,
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PIXEL_RATIO}};



var BaseOverswipeConfig={
frictionConstant:1,
frictionByDistance:1.5};


var BaseLeftToRightGesture={


isDetachable:false,


gestureDetectMovement:2,


notMoving:0.3,


directionRatio:0.66,


snapVelocity:2,


edgeHitWidth:30,


stillCompletionRatio:3/5,

fullDistance:SCREEN_WIDTH,

direction:'left-to-right'};



var BaseRightToLeftGesture=babelHelpers.extends({},
BaseLeftToRightGesture,{
direction:'right-to-left'});


var BaseDownUpGesture=babelHelpers.extends({},
BaseLeftToRightGesture,{
fullDistance:SCREEN_HEIGHT,
direction:'down-to-up'});


var BaseUpDownGesture=babelHelpers.extends({},
BaseLeftToRightGesture,{
fullDistance:SCREEN_HEIGHT,
direction:'up-to-down'});




var directionMapping={
ToTheStartIOS:ToTheLeftIOS,
ToTheEndIOS:ToTheRightIOS,
FadeToTheStart:FadeToTheLeft,
FadeToTheEnd:FadeToTheRight,
ToTheStart:ToTheLeft,
ToTheEnd:ToTheRight,
FromTheStart:FromTheLeft,
FromTheEnd:FromTheRight,
BaseStartToEndGesture:BaseLeftToRightGesture,
BaseEndToStartGesture:BaseRightToLeftGesture};


if(IS_RTL){
directionMapping={
ToTheStartIOS:ToTheRightIOS,
ToTheEndIOS:ToTheLeftIOS,
FadeToTheStart:FadeToTheRight,
FadeToTheEnd:FadeToTheLeft,
ToTheStart:ToTheRight,
ToTheEnd:ToTheLeft,
FromTheStart:FromTheRight,
FromTheEnd:FromTheLeft,
BaseStartToEndGesture:BaseRightToLeftGesture,
BaseEndToStartGesture:BaseLeftToRightGesture};

}

var BaseConfig={

gestures:{
pop:directionMapping.BaseStartToEndGesture},



springFriction:26,
springTension:200,


defaultTransitionVelocity:1.5,


animationInterpolators:{
into:buildStyleInterpolator(directionMapping.FromTheEnd),
out:buildStyleInterpolator(directionMapping.FadeToTheStart)}};



var NavigatorSceneConfigs={
PushFromRight:babelHelpers.extends({},
BaseConfig,{
animationInterpolators:{
into:buildStyleInterpolator(directionMapping.FromTheEnd),
out:buildStyleInterpolator(directionMapping.ToTheStartIOS)}}),


PushFromLeft:babelHelpers.extends({},
BaseConfig,{
animationInterpolators:{
into:buildStyleInterpolator(directionMapping.FromTheStart),
out:buildStyleInterpolator(directionMapping.ToTheEndIOS)}}),


FloatFromRight:babelHelpers.extends({},
BaseConfig),


FloatFromLeft:babelHelpers.extends({},
BaseConfig,{
gestures:{
pop:directionMapping.BaseEndToStartGesture},

animationInterpolators:{
into:buildStyleInterpolator(directionMapping.FromTheStart),
out:buildStyleInterpolator(directionMapping.FadeToTheEnd)}}),


FloatFromBottom:babelHelpers.extends({},
BaseConfig,{
gestures:{
pop:babelHelpers.extends({},
directionMapping.BaseStartToEndGesture,{
edgeHitWidth:150,
direction:'top-to-bottom',
fullDistance:SCREEN_HEIGHT})},


animationInterpolators:{
into:buildStyleInterpolator(FromTheFront),
out:buildStyleInterpolator(ToTheBack)}}),


FloatFromBottomAndroid:babelHelpers.extends({},
BaseConfig,{
gestures:null,
defaultTransitionVelocity:3,
springFriction:20,
animationInterpolators:{
into:buildStyleInterpolator(FromTheFrontAndroid),
out:buildStyleInterpolator(ToTheBackAndroid)}}),


FadeAndroid:babelHelpers.extends({},
BaseConfig,{
gestures:null,
animationInterpolators:{
into:buildStyleInterpolator(FadeIn),
out:buildStyleInterpolator(FadeOut)}}),


SwipeFromLeft:babelHelpers.extends({},
BaseConfig,{
gestures:{
jumpBack:babelHelpers.extends({},
directionMapping.BaseEndToStartGesture,{
overswipe:BaseOverswipeConfig,
edgeHitWidth:null,
isDetachable:true}),

jumpForward:babelHelpers.extends({},
directionMapping.BaseStartToEndGesture,{
overswipe:BaseOverswipeConfig,
edgeHitWidth:null,
isDetachable:true})},


animationInterpolators:{
into:buildStyleInterpolator(directionMapping.FromTheStart),
out:buildStyleInterpolator(directionMapping.ToTheEnd)}}),


HorizontalSwipeJump:babelHelpers.extends({},
BaseConfig,{
gestures:{
jumpBack:babelHelpers.extends({},
directionMapping.BaseStartToEndGesture,{
overswipe:BaseOverswipeConfig,
edgeHitWidth:null,
isDetachable:true}),

jumpForward:babelHelpers.extends({},
directionMapping.BaseEndToStartGesture,{
overswipe:BaseOverswipeConfig,
edgeHitWidth:null,
isDetachable:true})},


animationInterpolators:{
into:buildStyleInterpolator(directionMapping.FromTheEnd),
out:buildStyleInterpolator(directionMapping.ToTheStart)}}),


HorizontalSwipeJumpFromRight:babelHelpers.extends({},
BaseConfig,{
gestures:{
jumpBack:babelHelpers.extends({},
directionMapping.BaseEndToStartGesture,{
overswipe:BaseOverswipeConfig,
edgeHitWidth:null,
isDetachable:true}),

jumpForward:babelHelpers.extends({},
directionMapping.BaseStartToEndGesture,{
overswipe:BaseOverswipeConfig,
edgeHitWidth:null,
isDetachable:true}),

pop:directionMapping.BaseEndToStartGesture},

animationInterpolators:{
into:buildStyleInterpolator(directionMapping.FromTheStart),
out:buildStyleInterpolator(directionMapping.FadeToTheEnd)}}),


HorizontalSwipeJumpFromLeft:babelHelpers.extends({},
BaseConfig,{
gestures:{
jumpBack:babelHelpers.extends({},
directionMapping.BaseEndToStartGesture,{
overswipe:BaseOverswipeConfig,
edgeHitWidth:null,
isDetachable:true}),

jumpForward:babelHelpers.extends({},
directionMapping.BaseStartToEndGesture,{
overswipe:BaseOverswipeConfig,
edgeHitWidth:null,
isDetachable:true}),

pop:directionMapping.BaseEndToStartGesture},

animationInterpolators:{
into:buildStyleInterpolator(directionMapping.FromTheStart),
out:buildStyleInterpolator(directionMapping.ToTheEnd)}}),


VerticalUpSwipeJump:babelHelpers.extends({},
BaseConfig,{
gestures:{
jumpBack:babelHelpers.extends({},
BaseDownUpGesture,{
overswipe:BaseOverswipeConfig,
edgeHitWidth:null,
isDetachable:true}),

jumpForward:babelHelpers.extends({},
BaseDownUpGesture,{
overswipe:BaseOverswipeConfig,
edgeHitWidth:null,
isDetachable:true})},


animationInterpolators:{
into:buildStyleInterpolator(FromTheDown),
out:buildStyleInterpolator(ToTheUp)}}),


VerticalDownSwipeJump:babelHelpers.extends({},
BaseConfig,{
gestures:{
jumpBack:babelHelpers.extends({},
BaseUpDownGesture,{
overswipe:BaseOverswipeConfig,
edgeHitWidth:null,
isDetachable:true}),

jumpForward:babelHelpers.extends({},
BaseUpDownGesture,{
overswipe:BaseOverswipeConfig,
edgeHitWidth:null,
isDetachable:true})},


animationInterpolators:{
into:buildStyleInterpolator(FromTheTop),
out:buildStyleInterpolator(ToTheDown)}})};




module.exports=NavigatorSceneConfigs;
}, 318, null, "NavigatorSceneConfigs");
__d(/* PanResponder */function(global, require, module, exports) {










'use strict';

var InteractionManager=require(193 /* ./InteractionManager */);
var TouchHistoryMath=require(320 /* TouchHistoryMath */);

var currentCentroidXOfTouchesChangedAfter=TouchHistoryMath.currentCentroidXOfTouchesChangedAfter;
var currentCentroidYOfTouchesChangedAfter=TouchHistoryMath.currentCentroidYOfTouchesChangedAfter;
var previousCentroidXOfTouchesChangedAfter=TouchHistoryMath.previousCentroidXOfTouchesChangedAfter;
var previousCentroidYOfTouchesChangedAfter=TouchHistoryMath.previousCentroidYOfTouchesChangedAfter;
var currentCentroidX=TouchHistoryMath.currentCentroidX;
var currentCentroidY=TouchHistoryMath.currentCentroidY;



































































































var PanResponder={
































































_initializeGestureState:function _initializeGestureState(gestureState){
gestureState.moveX=0;
gestureState.moveY=0;
gestureState.x0=0;
gestureState.y0=0;
gestureState.dx=0;
gestureState.dy=0;
gestureState.vx=0;
gestureState.vy=0;
gestureState.numberActiveTouches=0;

gestureState._accountsForMovesUpTo=0;
},

























_updateGestureStateOnMove:function _updateGestureStateOnMove(gestureState,touchHistory){
gestureState.numberActiveTouches=touchHistory.numberActiveTouches;
gestureState.moveX=currentCentroidXOfTouchesChangedAfter(touchHistory,gestureState._accountsForMovesUpTo);
gestureState.moveY=currentCentroidYOfTouchesChangedAfter(touchHistory,gestureState._accountsForMovesUpTo);
var movedAfter=gestureState._accountsForMovesUpTo;
var prevX=previousCentroidXOfTouchesChangedAfter(touchHistory,movedAfter);
var x=currentCentroidXOfTouchesChangedAfter(touchHistory,movedAfter);
var prevY=previousCentroidYOfTouchesChangedAfter(touchHistory,movedAfter);
var y=currentCentroidYOfTouchesChangedAfter(touchHistory,movedAfter);
var nextDX=gestureState.dx+(x-prevX);
var nextDY=gestureState.dy+(y-prevY);


var dt=touchHistory.mostRecentTimeStamp-gestureState._accountsForMovesUpTo;
gestureState.vx=(nextDX-gestureState.dx)/dt;
gestureState.vy=(nextDY-gestureState.dy)/dt;

gestureState.dx=nextDX;
gestureState.dy=nextDY;
gestureState._accountsForMovesUpTo=touchHistory.mostRecentTimeStamp;
},

































create:function create(config){
var interactionState={
handle:null};

var gestureState={

stateID:Math.random()};

PanResponder._initializeGestureState(gestureState);
var panHandlers={
onStartShouldSetResponder:function onStartShouldSetResponder(e){
return config.onStartShouldSetPanResponder===undefined?
false:
config.onStartShouldSetPanResponder(e,gestureState);
},
onMoveShouldSetResponder:function onMoveShouldSetResponder(e){
return config.onMoveShouldSetPanResponder===undefined?
false:
config.onMoveShouldSetPanResponder(e,gestureState);
},
onStartShouldSetResponderCapture:function onStartShouldSetResponderCapture(e){


if(e.nativeEvent.touches.length===1){
PanResponder._initializeGestureState(gestureState);
}
gestureState.numberActiveTouches=e.touchHistory.numberActiveTouches;
return config.onStartShouldSetPanResponderCapture!==undefined?
config.onStartShouldSetPanResponderCapture(e,gestureState):
false;
},

onMoveShouldSetResponderCapture:function onMoveShouldSetResponderCapture(e){
var touchHistory=e.touchHistory;



if(gestureState._accountsForMovesUpTo===touchHistory.mostRecentTimeStamp){
return false;
}
PanResponder._updateGestureStateOnMove(gestureState,touchHistory);
return config.onMoveShouldSetPanResponderCapture?
config.onMoveShouldSetPanResponderCapture(e,gestureState):
false;
},

onResponderGrant:function onResponderGrant(e){
if(!interactionState.handle){
interactionState.handle=InteractionManager.createInteractionHandle();
}
gestureState.x0=currentCentroidX(e.touchHistory);
gestureState.y0=currentCentroidY(e.touchHistory);
gestureState.dx=0;
gestureState.dy=0;
if(config.onPanResponderGrant){
config.onPanResponderGrant(e,gestureState);
}

return config.onShouldBlockNativeResponder===undefined?
true:
config.onShouldBlockNativeResponder();
},

onResponderReject:function onResponderReject(e){
clearInteractionHandle(interactionState,config.onPanResponderReject,e,gestureState);
},

onResponderRelease:function onResponderRelease(e){
clearInteractionHandle(interactionState,config.onPanResponderRelease,e,gestureState);
PanResponder._initializeGestureState(gestureState);
},

onResponderStart:function onResponderStart(e){
var touchHistory=e.touchHistory;
gestureState.numberActiveTouches=touchHistory.numberActiveTouches;
if(config.onPanResponderStart){
config.onPanResponderStart(e,gestureState);
}
},

onResponderMove:function onResponderMove(e){
var touchHistory=e.touchHistory;


if(gestureState._accountsForMovesUpTo===touchHistory.mostRecentTimeStamp){
return;
}


PanResponder._updateGestureStateOnMove(gestureState,touchHistory);
if(config.onPanResponderMove){
config.onPanResponderMove(e,gestureState);
}
},

onResponderEnd:function onResponderEnd(e){
var touchHistory=e.touchHistory;
gestureState.numberActiveTouches=touchHistory.numberActiveTouches;
clearInteractionHandle(interactionState,config.onPanResponderEnd,e,gestureState);
},

onResponderTerminate:function onResponderTerminate(e){
clearInteractionHandle(interactionState,config.onPanResponderTerminate,e,gestureState);
PanResponder._initializeGestureState(gestureState);
},

onResponderTerminationRequest:function onResponderTerminationRequest(e){
return config.onPanResponderTerminationRequest===undefined?
true:
config.onPanResponderTerminationRequest(e,gestureState);
}};

return{
panHandlers:panHandlers,
getInteractionHandle:function getInteractionHandle(){
return interactionState.handle;
}};

}};


function clearInteractionHandle(
interactionState,
callback,
event,
gestureState)
{
if(interactionState.handle){
InteractionManager.clearInteractionHandle(interactionState.handle);
interactionState.handle=null;
}
if(callback){
callback(event,gestureState);
}
}

module.exports=PanResponder;
}, 319, null, "PanResponder");
__d(/* TouchHistoryMath */function(global, require, module, exports) {



'use strict';

var TouchHistoryMath={
















centroidDimension:function centroidDimension(touchHistory,touchesChangedAfter,isXAxis,ofCurrent){
var touchBank=touchHistory.touchBank;
var total=0;
var count=0;

var oneTouchData=touchHistory.numberActiveTouches===1?
touchHistory.touchBank[touchHistory.indexOfSingleActiveTouch]:null;

if(oneTouchData!==null){
if(oneTouchData.touchActive&&oneTouchData.currentTimeStamp>touchesChangedAfter){
total+=ofCurrent&&isXAxis?oneTouchData.currentPageX:
ofCurrent&&!isXAxis?oneTouchData.currentPageY:
!ofCurrent&&isXAxis?oneTouchData.previousPageX:
oneTouchData.previousPageY;
count=1;
}
}else{
for(var i=0;i<touchBank.length;i++){
var touchTrack=touchBank[i];
if(touchTrack!==null&&
touchTrack!==undefined&&
touchTrack.touchActive&&
touchTrack.currentTimeStamp>=touchesChangedAfter){
var toAdd;
if(ofCurrent&&isXAxis){
toAdd=touchTrack.currentPageX;
}else if(ofCurrent&&!isXAxis){
toAdd=touchTrack.currentPageY;
}else if(!ofCurrent&&isXAxis){
toAdd=touchTrack.previousPageX;
}else{
toAdd=touchTrack.previousPageY;
}
total+=toAdd;
count++;
}
}
}
return count>0?total/count:TouchHistoryMath.noCentroid;
},

currentCentroidXOfTouchesChangedAfter:function currentCentroidXOfTouchesChangedAfter(touchHistory,touchesChangedAfter){
return TouchHistoryMath.centroidDimension(
touchHistory,
touchesChangedAfter,
true,
true);

},

currentCentroidYOfTouchesChangedAfter:function currentCentroidYOfTouchesChangedAfter(touchHistory,touchesChangedAfter){
return TouchHistoryMath.centroidDimension(
touchHistory,
touchesChangedAfter,
false,
true);

},

previousCentroidXOfTouchesChangedAfter:function previousCentroidXOfTouchesChangedAfter(touchHistory,touchesChangedAfter){
return TouchHistoryMath.centroidDimension(
touchHistory,
touchesChangedAfter,
true,
false);

},

previousCentroidYOfTouchesChangedAfter:function previousCentroidYOfTouchesChangedAfter(touchHistory,touchesChangedAfter){
return TouchHistoryMath.centroidDimension(
touchHistory,
touchesChangedAfter,
false,
false);

},

currentCentroidX:function currentCentroidX(touchHistory){
return TouchHistoryMath.centroidDimension(
touchHistory,
0,
true,
true);

},

currentCentroidY:function currentCentroidY(touchHistory){
return TouchHistoryMath.centroidDimension(
touchHistory,
0,
false,
true);

},

noCentroid:-1};


module.exports=TouchHistoryMath;
}, 320, null, "TouchHistoryMath");
__d(/* clamp */function(global, require, module, exports) {










'use strict';







function clamp(min,value,max){
if(value<min){
return min;
}
if(value>max){
return max;
}
return value;
}

module.exports=clamp;
}, 321, null, "clamp");
__d(/* rebound/rebound.js */function(global, require, module, exports) {


























































































































(function(){
var rebound={};
var util=rebound.util={};
var concat=Array.prototype.concat;
var slice=Array.prototype.slice;


util.bind=function bind(func,context){
var args=slice.call(arguments,2);
return function(){
func.apply(context,concat.call(args,slice.call(arguments)));
};
};


util.extend=function extend(target,source){
for(var key in source){
if(source.hasOwnProperty(key)){
target[key]=source[key];
}
}
};






var SpringSystem=rebound.SpringSystem=function SpringSystem(looper){
this._springRegistry={};
this._activeSprings=[];
this.listeners=[];
this._idleSpringIndices=[];
this.looper=looper||new AnimationLooper();
this.looper.springSystem=this;
};

util.extend(SpringSystem.prototype,{

_springRegistry:null,

_isIdle:true,

_lastTimeMillis:-1,

_activeSprings:null,

listeners:null,

_idleSpringIndices:null,






setLooper:function setLooper(looper){
this.looper=looper;
looper.springSystem=this;
},





createSpring:function createSpring(tension,friction){
var springConfig;
if(tension===undefined||friction===undefined){
springConfig=SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG;
}else{
springConfig=
SpringConfig.fromOrigamiTensionAndFriction(tension,friction);
}
return this.createSpringWithConfig(springConfig);
},




createSpringWithBouncinessAndSpeed:function createSpringWithBouncinessAndSpeed(bounciness,speed){
var springConfig;
if(bounciness===undefined||speed===undefined){
springConfig=SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG;
}else{
springConfig=
SpringConfig.fromBouncinessAndSpeed(bounciness,speed);
}
return this.createSpringWithConfig(springConfig);
},


createSpringWithConfig:function createSpringWithConfig(springConfig){
var spring=new Spring(this);
this.registerSpring(spring);
spring.setSpringConfig(springConfig);
return spring;
},





getIsIdle:function getIsIdle(){
return this._isIdle;
},




getSpringById:function getSpringById(id){
return this._springRegistry[id];
},



getAllSprings:function getAllSprings(){
var vals=[];
for(var id in this._springRegistry){
if(this._springRegistry.hasOwnProperty(id)){
vals.push(this._springRegistry[id]);
}
}
return vals;
},





registerSpring:function registerSpring(spring){
this._springRegistry[spring.getId()]=spring;
},





deregisterSpring:function deregisterSpring(spring){
removeFirst(this._activeSprings,spring);
delete this._springRegistry[spring.getId()];
},

advance:function advance(time,deltaTime){
while(this._idleSpringIndices.length>0){this._idleSpringIndices.pop();}
for(var i=0,len=this._activeSprings.length;i<len;i++){
var spring=this._activeSprings[i];
if(spring.systemShouldAdvance()){
spring.advance(time/1000.0,deltaTime/1000.0);
}else{
this._idleSpringIndices.push(this._activeSprings.indexOf(spring));
}
}
while(this._idleSpringIndices.length>0){
var idx=this._idleSpringIndices.pop();
idx>=0&&this._activeSprings.splice(idx,1);
}
},














loop:function loop(currentTimeMillis){
var listener;
if(this._lastTimeMillis===-1){
this._lastTimeMillis=currentTimeMillis-1;
}
var ellapsedMillis=currentTimeMillis-this._lastTimeMillis;
this._lastTimeMillis=currentTimeMillis;

var i=0,len=this.listeners.length;
for(i=0;i<len;i++){
listener=this.listeners[i];
listener.onBeforeIntegrate&&listener.onBeforeIntegrate(this);
}

this.advance(currentTimeMillis,ellapsedMillis);
if(this._activeSprings.length===0){
this._isIdle=true;
this._lastTimeMillis=-1;
}

for(i=0;i<len;i++){
listener=this.listeners[i];
listener.onAfterIntegrate&&listener.onAfterIntegrate(this);
}

if(!this._isIdle){
this.looper.run();
}
},




activateSpring:function activateSpring(springId){
var spring=this._springRegistry[springId];
if(this._activeSprings.indexOf(spring)==-1){
this._activeSprings.push(spring);
}
if(this.getIsIdle()){
this._isIdle=false;
this.looper.run();
}
},




addListener:function addListener(listener){
this.listeners.push(listener);
},


removeListener:function removeListener(listener){
removeFirst(this.listeners,listener);
},


removeAllListeners:function removeAllListeners(){
this.listeners=[];
}});

















var Spring=rebound.Spring=function Spring(springSystem){
this._id='s'+Spring._ID++;
this._springSystem=springSystem;
this.listeners=[];
this._currentState=new PhysicsState();
this._previousState=new PhysicsState();
this._tempState=new PhysicsState();
};

util.extend(Spring,{
_ID:0,

MAX_DELTA_TIME_SEC:0.064,

SOLVER_TIMESTEP_SEC:0.001});



util.extend(Spring.prototype,{

_id:0,

_springConfig:null,

_overshootClampingEnabled:false,

_currentState:null,

_previousState:null,

_tempState:null,

_startValue:0,

_endValue:0,

_wasAtRest:true,

_restSpeedThreshold:0.001,

_displacementFromRestThreshold:0.001,

listeners:null,

_timeAccumulator:0,

_springSystem:null,


destroy:function destroy(){
this.listeners=[];
this.frames=[];
this._springSystem.deregisterSpring(this);
},



getId:function getId(){
return this._id;
},




setSpringConfig:function setSpringConfig(springConfig){
this._springConfig=springConfig;
return this;
},


getSpringConfig:function getSpringConfig(){
return this._springConfig;
},




























setCurrentValue:function setCurrentValue(currentValue,skipSetAtRest){
this._startValue=currentValue;
this._currentState.position=currentValue;
if(!skipSetAtRest){
this.setAtRest();
}
this.notifyPositionUpdated(false,false);
return this;
},




getStartValue:function getStartValue(){
return this._startValue;
},


getCurrentValue:function getCurrentValue(){
return this._currentState.position;
},



return this.getDisplacementDistanceForState(this._currentState);
},