(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * Created by WesternRanger on 16/5/12.
 */
$('.col-bar').on('click', function () {
    $('.nav-bar').toggleClass('cs_hide');
});
var docHei = +$('body,html').height(),
    $footer = $('div.footer'),
    winHei = +$(window).height();

if (winHei > docHei + 138) {
    $footer.css({
        'position': 'absolute',
        'bottom': 0,
        'left': 0
    });
}
},{}]},{},[1])