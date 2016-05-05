(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/**
 * Created by WesternRanger on 16/2/4.
 */

!function () {
    var step = 0,
        time = 4000,
        imgArr = $(".slide-content").children(".img"),
        id,
        clearId;

    //slide
    id = setTimeout(change, time);
    function change() {
        id = setTimeout(change, time);
        step = ++step % imgArr.length;
        for (var i = 0; i < imgArr.length; i++) {
            imgArr.eq(i).hide();
        }
        imgArr.eq(step).show();
    }

    $(".next").on("click", function () {
        step = ++step % imgArr.length;
        for (var i = 0; i < imgArr.length; i++) {
            imgArr.eq(i).hide();
        }
        imgArr.eq(step).show();
    });

    $(".prev").on('click', function () {
        step = --step % imgArr.length;
        if (step < 0) {
            step = imgArr.length - 1;
        }
        for (var i = 0; i < imgArr.length; i++) {
            imgArr.eq(i).hide();
        }
        imgArr.eq(step).show();
    });
}();

$(".main-body").click(function () {
    var _url = '/api/demo/profile',
        _data = {};

    //getAjax(_url,_data,function(rs){
    //    console.log(44);
    //});

    fetch(_url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'Hubot',
            login: 'hubot'
        })
    }).then(function (response) {}).then(function (text) {}).catch(function (ex) {});
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
},{}]},{},[1])