(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/**
 * Created by WesternRanger on 16/2/4.
 */
$("#swiper li").removeClass("cs_hide");
if ($("#swiper li").length > 1) {
    new Swiper('.swiper .swiper-container', {
        pagination: '.swiper .swiper-pagination',
        paginationElement: "li",
        bulletClass: "test",
        bulletActiveClass: "on",
        spaceBetween: 0,
        centeredSlides: true,
        autoplay: 3000,
        loop: true,
        autoplayDisableOnInteraction: false,
        onTransitionStart: function onTransitionStart() {
            $('#swiper li img').css({
                'transform': 'scale(1.05,1.05)',
                '-webkit-transform': 'scale(1.05,1.05)'
            });
        },
        onTransitionEnd: function onTransitionEnd() {
            $('#swiper li img').css({
                'transform': 'scale(1,1)',
                '-webkit-transform': 'scale(1,1)'
            });
        }
    });
} else {
    $("#swiper .hd").remove();
}

// 推荐文章跳转
$('.publish-list').on('click', '.new-item', function () {
    var se = $(this);
    window.location.href = se.attr('data-url');
});

var _url = '/api/pushInfo/list',
    _data = {
    //name: 'Hubot',
    //login: 'hubot',
};

// 获取推荐列表
fetchData(_url, _data, function (j) {
    var _html_intro = '',
        _html_site = '',
        _html_blog = '',
        _html_music = '';

    j.res.forEach(function (item) {
        if (item.ctype == 'intro') {
            if (item.url) {
                _html_intro += "<li>\n                <span class=\"intro-tip\">" + item.title.split('-')[0] + ":</span>\n                <a target=\"_blank\" href=\"" + item.url + "\">" + item.title.split('-')[1] + "</a>\n                </li>";
            } else {
                _html_intro += "<li>\n                <span class=\"intro-tip\">" + item.title.split('-')[0] + ":</span>\n                <span>" + item.title.split('-')[1] + "</span></li>";
            }
        }
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
    document.querySelector(".item-block#intro ul").innerHTML = _html_intro;
    document.querySelector(".item-block#site ul").innerHTML = _html_site;
    document.querySelector(".item-block#blog ul").innerHTML = _html_blog;
    document.querySelector(".item-block#music ul").innerHTML = _html_music;
});

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

var a = 14;
console.log(a);
},{}]},{},[1])