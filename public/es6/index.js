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

$(".main-body").click(function(){
    var _url = '/api/demo/profile',
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
            name: 'Hubot',
            login: 'hubot',
        })
    }).then(function(response) {

    }).then(function(text) {

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