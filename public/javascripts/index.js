(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/**
 * Created by WesternRanger on 16/2/4.
 */

// 轮播图
!function () {
    var step = 0,
        time = 2000,
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
}();

// 推荐文章跳转
//let $list = document.querySelector('.publish-list');
//let $item = document.querySelector('.new-item');
//$list.addEventListener('click',function(e){
//    debugger;
//    let target = e.target&&e.target.parentElement;
//    if(target.className == 'new-item'){
//        window.location.href = this.getAttribute('data-url');
//    }
//},false);

$('.publish-list').on('click', '.new-item', function () {
    //debugger;
    var se = $(this);
    console.log(se.data('url'));
    window.location.href = se.attr('data-url');
});

var _url = '/api/pushInfo/list',
    _data = {
    //name: 'Hubot',
    //login: 'hubot',
};

// 获取推荐列表
fetchData(_url, _data, function (j) {
    var _html_site = '',
        _html_blog = '',
        _html_music = '';

    j.res.forEach(function (item, index) {
        if (item.ctype == 'site') {
            _html_site += "<li><a target=\"_blank\" href=\"" + item.url + "\">" + item.title + "</a></li>";
        }
        if (item.ctype == 'blog') {
            _html_blog += "<li><a target=\"_blank\" href=\"" + item.url + "\">" + item.title + "</a></li>";
        }
        if (item.ctype == 'music') {
            _html_music += "<li>\n                          <span class=\"intro-tip\">推荐</span>\n                          <a target=\"_blank\" href=\"" + item.url + "\">" + item.title + "</a>\n                      </li>";
        }
    });
    document.querySelector(".item-block#site ul").innerHTML = _html_site;
    document.querySelector(".item-block#blog ul").innerHTML = _html_blog;
    document.querySelector(".item-block#music ul").innerHTML = _html_music;
});

function fetchData1(_url, _data, func) {
    fetch(_url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_data)

    }).then(function (response) {
        return response.json();
    }).then(function (j) {
        func(j);
    }).catch(function (ex) {});
}

function fetchData(_url, _data, func) {
    $.ajax({
        url: _url,
        data: _data,
        type: 'post',
        success: function success(j) {
            func(j);
        }
    });
}
},{}]},{},[1])