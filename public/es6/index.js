/**
 * Created by WesternRanger on 16/2/4.
 */

// 轮播图
!function(){
    var step = 0,
        time = 4000,
        imgArr = $(".slide-content").children(".img"),
        id,
        clearId;

    //slide
    id = setTimeout(change,time);
    function change(){
        id=setTimeout(change,time);
        step = (++step)%imgArr.length;
        for(var i = 0;i<imgArr.length;i++){
            imgArr.eq(i).hide();
        }
        imgArr.eq(step).show();
    }

    $(".next").on("click",function(){
        step = (++step)%imgArr.length;
        for(var i = 0;i<imgArr.length;i++){
            imgArr.eq(i).hide();
        }
        imgArr.eq(step).show();
    })

    $(".prev").on('click',function(){
        step = (--step)%imgArr.length;
        if(step<0){
            step = imgArr.length - 1;
        }
        for(var i = 0;i<imgArr.length;i++){
            imgArr.eq(i).hide();
        }
        imgArr.eq(step).show();
    });


}();


// 推荐文章跳转
$(".publish-list").on("click",".new-item",function(){
    window.location.href = $(this).data('url');
});

$(function(){
    var _url = '/api/pushInfo/list',
        _data = {

        };

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
            //name: 'Hubot',
            //login: 'hubot',
        })
    }).then(function(response) {
        return response.json();
    }).then(function(j) {
        let _html_site = '',
            _html_blog = '',
            _html_music = '';

        j.res.forEach(function(item,index){
            if(item.ctype == 'site'){
                _html_site += `<li><a target="_blank" href="${item.url}">${item.title}</a></li>`;
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
        $(".item-block#site ul").empty().html(_html_site);
        $(".item-block#blog ul").empty().html(_html_blog);
        $(".item-block#music ul").empty().html(_html_music);

    }).catch(function(ex) {

    })
});

function getAjax(_url,_data,d){
    $.ajax({
        url:_url,
        type:'post',
        data:_data,
        success:function(rs){
            d(rs);
        }
    });
}