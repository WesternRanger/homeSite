/**
 * Created by WesternRanger on 16/2/15.
 */
(function() {
    $.fn.extend({
        dialogBox: function(_option) {
            var $containment, $dialogBox, $mask, option, style;
            $containment = this;
            option = $.extend({
                width: 545,
                height: 260,
                titleIcon: false,
                titleShow: true,
                contentShow: true,
                title: '',
                cancelBtn: true,
                cBtnText: '取消',
                sBtnText: '确定',
                noBtn: false,
                callback: $.noop,
                cancelCallback: $.noop,
                subCallback: $.noop,
                maskColor: null,
                close: function() {
                    $dialogBox.remove();
                    $mask.remove();
                    return $('body').css('overflow-y', 'auto');
                }
            }, _option || {});
            $dialogBox = $("<div class='dialogBox'> <div class='close icon'></div> <div class='dTitle " + (option.titleShow ? '' : 'hidden') + "'> " + option.title + " </div> <div class='dContent " + (option.contentShow ? '' : 'hide') + "'></div> <div class='dFooter clearfix " + (option.noBtn ? 'hide' : '') + "' > <div class='uiButton subBtn orange'> " + option.sBtnText + " </div> <div class='uiButton cancelBtn gray'> " + option.cBtnText + " </div> </div> </div>");
            $mask = $("<div class='mask' " + (option.maskColor !== null ? style = 'background:#{option.maskColor}' : '') + "></div>");
            $dialogBox.find('.dContent').append($containment);
            $dialogBox.css({
                width: option.width,
                height: option.height
            }).find('.cancelBtn').on('click', function() {
                option.cancelCallback.call(this, $dialogBox, option);
                return option.close();
            }).end().find('.subBtn').on('click', function() {
                option.subCallback.call(this, $dialogBox, option);
                return option.close();
            }).end().find('.close').on('mousedown', function() {
                return option.close();
            });
            $mask.on('click', function() {
                return option.close();
            });
            $dialogBox.placeholder();
            ($('body')).append($dialogBox).append($mask).css('overflow-y', 'hidden');
            option.callback.call(this, $dialogBox);
            return $containment;
        },
        placeholder: function() {
            var $self;
            $self = $(this);
            if ('placeholder' in document.createElement('input')) {
                return;
            }
            setTimeout(function() {
                return $self.find(':input[placeholder]').each(function(index, element) {
                    var $this, h, holder, pos;
                    $this = $(this);
                    if ($this.parents(".placehold").length === 0) {
                        $this.wrap($('<div class="placehold"></div>').css({
                            position: 'relative',
                            zoom: '1',
                            border: 'none',
                            background: 'none',
                            padding: 'none',
                            margin: 'none',
                            float: $this.css('float'),
                            display: $this.css('display')
                        }));
                        pos = $this.position();
                        h = $this.outerHeight(true);
                        holder = $('<span></span>').text($this.attr('placeholder')).css({
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            height: $this.height(),
                            width: $this.width(),
                            lineHeight: $this.height() + 'px',
                            paddingLeft: $this.css('padding-left'),
                            textIndent: $this.css('text-indent'),
                            paddingTop: $this.css('padding-top'),
                            marginLeft: $this.css('margin-left'),
                            fontSize: $this.css('fontSize'),
                            color: '#aaa'
                        }).appendTo($this.parent());
                        if (($(this)).val()) {
                            holder.hide();
                        }
                        $this.on('change', function() {
                            if (($(this)).val()) {
                                return holder.hide();
                            }
                        });
                        $this.focusin(function(e) {
                            return holder.hide();
                        }).focusout(function(e) {
                            if (!$this.val()) {
                                return holder.show();
                            }
                        });
                        return holder.click(function() {
                            holder.hide();
                            return $this.focus();
                        });
                    }
                });
            }, 0);
            return $self;
        },
        //分页
        pagination: function(_option) {
            var $self, fillHtml, option;
            $self = $(this).addClass('package-num');
            option = $.extend({
                totalPage: 9,
                initPage: 1,
                maxPage: 4,
                needSkip: false,
                pageCallback: $.noop
            }, _option || {});
            fillHtml = function(page) {
                var end, start;
                $self.empty();
                if (option.totalPage >= 2) {
                    $self.append('<a href="javascript:;" class="pre ' + (page > 1 ? '' : 'disabled') + '"><span class="pre1"></span><span class="pre2"></span>上一页</a>');
                    if (page !== 1 && page >= option.maxPage && option.totalPage !== option.maxPage) {
                        $self.append('<a href="javascript:;" class="num">' + 1 + '</a>');
                    }
                    if (page - 2 > 2 && page <= option.totalPage && option.totalPage > option.maxPage + 1) {
                        $self.append('<span>...</span>');
                    }
                    start = page - 2;
                    end = page + 2;
                    if ((start > 1 && page < option.maxPage) || page === 1) {
                        end++;
                    }
                    if (page > option.totalPage - option.maxPage && page >= option.totalPage) {
                        start--;
                    }
                    while (start <= end) {
                        if (start <= option.totalPage && start >= 1) {
                            $self.append('<a href="javascript:;" class="num ' + (start !== page ? '' : 'num-active') + '">' + start + '</a>');
                        }
                        start++;
                    }
                    if (page + 2 < option.totalPage - 1 && page >= 1 && option.totalPage > option.maxPage + 1) {
                        $self.append('<span>...</span>');
                    }
                    if (page !== option.totalPage && page < option.totalPage - 2 && option.totalPage !== option.maxPage) {
                        $self.append('<a href="javascript:;" class="num">' + option.totalPage + '</a>');
                    }
                    $self.append('<a href="javascript:;" class="next ' + (page < option.totalPage ? '' : 'disabled') + '"><span class="next1"></span><span class="next2"></span>下一页</a>');
                    if (option.needSkip) {
                        $self.append('<label for="">跳转到:</label><input type="text" value=' + page + '><a href="javascript:;" class="skip">GO</a>');
                    }
                    if (option.totalPage >= 100) {
                        return $(".package-num .num").css({
                            "font-size": "12px"
                        });
                    }
                }
            };
            $self.off("click").on("click", "a.num:not(.num-active)", function() {
                var current;
                current = parseInt($(this).text());
                fillHtml(current);
                return option.pageCallback(current);
            }).on("click", "a.pre:not(.disabled)", function() {
                var current;
                current = parseInt($(this).parents('.package-num').children("a.num-active").text());
                fillHtml(current - 1);
                return option.pageCallback(current - 1);
            }).on("click", "a.next:not(.disabled)", function() {
                var current;
                current = parseInt($(this).parents('.package-num').children("a.num-active").text());
                fillHtml(current + 1);
                return option.pageCallback(current + 1);
            }).on("click", 'a.skip', function() {
                var current;
                current = parseInt($self.children("input").val());
                if (current !== ~~current) {
                    $self.children("input").val(+$self.children('.num-active').text());
                    return false;
                }
                if (current <= 0) {
                    current = 1;
                }
                if (current > option.totalPage) {
                    current = option.totalPage;
                }
                fillHtml(current);
                return option.pageCallback(current);
            });
            fillHtml(option.initPage);
            return $self;
        }
    });


    $.extend({
        toast: function(_text, callback, time) {
            $(".toast").remove();
            $("body").append("<div class='toast'><p>" + _text + "</p></div>");
            return setTimeout(function() {
                $(".toast").remove();
                if (callback) {
                    return callback();
                }
            }, time || 2000);
        },
        stringToObj: function(str) {
            return eval("(" + str + ")");
        },
        objToString: function(obj) {
            return JSON.stringify(obj).replace(/"/g, '"');
        },
        getUrlParam: function(name) {
            var r, reg;
            reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            r = encodeURI(window.location.search).substr(1).match(reg);
            if (r !== null) {
                return unescape(r[2]);
            }
            return null;
        },
        splitUrlParam: function() {
            var paramArr, urlArr;
            urlArr = location.href.split("/");
            paramArr = urlArr.pop().replace(".htm", "").split("-");
            if (paramArr.length > 1) {
                return paramArr;
            }
            return null;
        },
        cutContent: function(str, len) {
            var content;
            content = $.trim(str.replace(/nbsp;/g, ""));
            if (content.length > len) {
                return content.substring(0, len) + "...";
            } else {
                return content;
            }
        },
        isMac: function() {
            return (navigator.platform === "Mac68K") || (navigator.platform === "MacPPC") || (navigator.platform === "Macintosh") || (navigator.platform === "MacIntel");
        },
        menuActive: function(num) {
            return $('#left-menu li').removeClass('active').eq(num - 1).addClass('active');
        }
    });
})();