(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _module = require('./module.js');

new _module.Employee(); /**
                         * Created by WesternRanger on 16/2/4.
                         */

(0, _module.fun_aa)();

//var _url = '/api/demo/commit',
//    _data = {
//        name:'chenqi',
//        talk:'i create a bug on line'
//    };
//
//getAjax(_url,_data,function(rs){
//    console.log(rs);
//});

var _url1 = '/api/demo/profile',
    _data1 = {
    name: 'aa',
    talk: '333'
};

var _url2 = '/api/demo/profile1';

getAjax(_url1, _data1, function (rs) {
    console.log(rs);
});

getAjax(_url2, _data1, function (rs) {
    console.log(rs);
});

function getAjax(_url, _data, d) {
    $.ajax({
        url: _url,
        type: 'post',
        data: _data,
        success: function success(rs) {
            d(rs);
        }
    });
}
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