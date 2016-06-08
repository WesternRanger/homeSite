/**
 * Created by WesternRanger on 16/2/4.
 */

//幻灯片播放
var slides = document.querySelectorAll('.slide-content .img'),
    currentSlide = 0,// 当前位置
    time_interval = 4000,
    $dot_check = document.querySelectorAll('a.dot-item'),// 焦点
////暂停播放按钮
//    playing = true,
//    pauseButton = document.getElementById('pause'),
////上下翻页
//    next = document.getElementById('next'),
//    previous = document.getElementById('previous'),
//自动切换
    slideInterval = setInterval(nextSlide,time_interval);

//手动切换
for(let i=0;i<$dot_check.length;i++){
    $dot_check[i].addEventListener('click',function(){
        clearInterval(slideInterval);
        goToSlide(i);
        slideInterval = setInterval(nextSlide,time_interval);
    },false);
}

//定义下翻
function nextSlide() {
    goToSlide(currentSlide+1);
}
////定义上翻
//function previousSlide() {
//    goToSlide(currentSlide-1);
//}
//切换
function goToSlide(n) {
    slides[currentSlide].className = 'img ws-hide';
    currentSlide = (n+slides.length)%slides.length;
    slides[currentSlide].className = 'img ws-show';
}
////暂停按钮
//function pauseSlideshow() {
//    pauseButton.innerHTML = 'Play';
//    playing = false;
//    clearInterval(slideInterval);
//}
////开始播放
//function playSlideshow() {
//    pauseButton.innerHTML = 'Pause';
//    playing = true;
//    slideInterval = setInterval(nextSlide,time_interval);
//}
//控制开关
//pauseButton.onclick = function() {
//    if(playing) {
//        pauseSlideshow();
//    } else {
//        playSlideshow();
//    }
//};
//// 手动下翻
//next.onclick = function() {
//    pauseSlideshow();
//    nextSlide();
//};
//// 手动上翻
//previous.onclick = function() {
//    pauseSlideshow();
//    previousSlide();
//};

// 推荐文章跳转
$('.publish-list').on('click','.new-item',function(){
    var se = $(this);
    window.location.href = se.attr('data-url');
})


let _url = '/api/pushInfo/list',
    _data = {
        //name: 'Hubot',
        //login: 'hubot',
    };

// 获取推荐列表
fetchData(_url,_data,function(j){
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
    document.querySelector(".item-block#site ul").innerHTML = _html_site;
    document.querySelector(".item-block#blog ul").innerHTML = _html_blog;
    document.querySelector(".item-block#music ul").innerHTML = _html_music;
});

function fetchData1(_url,_data,func){
    fetch(_url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_data)

    }).then(function(response) {
        return response.json();
    }).then(function(j) {
        func(j);
    }).catch(function(ex) {

    });
}

function fetchData(_url,_data,func){
    $.ajax({
        url:_url,
        data:_data,
        type:'post',
        success:function(j){
            func(j)
        }
    });
}