(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _module = require('./module.js');

//var a = require('./module.js');
//new a.Employee();
//a.fun_aa();
new _module.Employee(); /**
                         * Created by WesternRanger on 16/2/4.
                         */

(0, _module.fun_aa)();
},{"./module.js":2}],2:[function(require,module,exports){
/**
 * Created by WesternRanger on 16/4/14.
 */
class Employee{
    constructor(){
        this.id = '111';
        this.getAge();
    }
    getAge(){
        console.log(this.id);
    }
}
function fun_aa(){
    console.log('export fss success');
}
module.exports = {
    Employee,
    fun_aa
};
},{}]},{},[1])