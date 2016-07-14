/**
 * Created by WesternRanger on 16/2/4.
 */
var siteItems = [];//图推荐站点缓存

$("#swiper li").removeClass("cs_hide");
if($("#swiper li").length > 1){
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
        onTransitionStart: function () {
            $('#swiper li img').css({
                'transform': 'scale(1.05,1.05)',
                '-webkit-transform': 'scale(1.05,1.05)',
            });
        },
        onTransitionEnd: function () {
            $('#swiper li img').css({
                'transform': 'scale(1,1)',
                '-webkit-transform': 'scale(1,1)',
            });
        }
    });
}else{
    $("#swiper .hd").remove();
}


// 推荐文章跳转
$('.publish-list').on('click','.new-item',function(){
    var se = $(this);
    window.location.href = se.attr('data-url');
});


let _url = '/api/pushInfo/list',
    _data = {
        //name: 'Hubot',
        //login: 'hubot',
    };

// 获取推荐列表
fetchData(_url,_data,function(j){
    let _html_intro = '',
        //_html_site = '',
        _html_blog = '',
        _html_music = '';

    j.res.forEach(function(item){
        if(item.ctype == 'intro'){
            if(item.url){
                _html_intro += `<li>
                <span class="intro-tip">${item.title.split('-')[0]}:</span>
                <a target="_blank" href="${item.url}">${item.title.split('-')[1]}</a>
                </li>`;
            }else{
                _html_intro += `<li>
                <span class="intro-tip">${item.title.split('-')[0]}:</span>
                <span>${item.title.split('-')[1]}</span></li>`;
            }

        }
        if(item.ctype == 'site'){
            //_html_site += `<li><a target="_blank" href="${item.url}">${item.title}</a></li>`;
            siteItems.push(item);
        }

        if(item.ctype == 'blog'){
            _html_blog += `<li><a target="_blank" href="${item.url}">${item.title}</a></li>`;
        }
        if(item.ctype == 'music'){
            _html_music += `<li>
                          <span class="intro-tip">推荐</span>
                          <a target="_blank" href="${item.url}">${item.title}</a>
                      </li>`;
        }
    });
    debugger;
    document.querySelector(".item-block#intro ul").innerHTML = _html_intro;
    //document.querySelector(".item-block#site ul").innerHTML = _html_site;
    var site = new Vue({
        el:'#site',
        data:{
            items:[
                {title:333,url:'www'},
                {title:444,url:'http'}
            ]
        }
    });
    document.querySelector(".item-block#blog ul").innerHTML = _html_blog;
    document.querySelector(".item-block#music ul").innerHTML = _html_music;
});

function fetchData(_url,_data,func){
    $.ajax({
        url:_url,
        data:_data,
        type:'post',
        success:function(j){
            func(j);
        }
    });
}