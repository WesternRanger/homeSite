(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by WesternRanger on 16/2/4.
 */

var Index = function () {
    function Index() {
        _classCallCheck(this, Index);

        this.$el = null;
        this.render();
        this.slide();
    }

    _createClass(Index, [{
        key: 'render',
        value: function render() {
            $.ajax({
                url: "/api/pushInfo/list",
                type: 'post',
                dataType: 'json',
                success: function success(j) {
                    var _data = {
                        intro: [],
                        site: [],
                        blog: [],
                        music: []
                    };

                    j.res.forEach(function (item) {
                        switch (item.ctype) {
                            case 'intro':
                                _data.intro.push(item);
                                break;
                            case 'site':
                                _data.site.push(item);
                                break;
                            case 'blog':
                                _data.blog.push(item);
                                break;
                            case 'music':
                                _data.music.push(item);
                                break;
                        }
                    });
                    debugger;
                    new Vue({
                        el: 'body',
                        data: _data
                    });
                }
            });
            this.loaded();
        }
    }, {
        key: 'loaded',
        value: function loaded() {
            this.$el = $('.publish-list');
            // 推荐文章跳转
            this.$el.on('click', '.new-item', function () {
                var se = $(this);
                window.location.href = se.attr('data-url');
            });
        }
    }, {
        key: 'slide',
        value: function slide() {
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
        }
    }]);

    return Index;
}();

new Index();
},{}]},{},[1])