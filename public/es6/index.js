/**
 * Created by WesternRanger on 16/2/4.
 */

class Index{

    constructor(){
        this.$el = null;
        this.render();
        this.slide();
    }

    render(){
        $.ajax({
            url:"/api/pushInfo/list",
            type:'post',
            dataType:'json',
            success:function(j){
                var _data = {
                    intro:[],
                    site:[],
                    blog:[],
                    music:[]
                };

                j.res.forEach(function(item){
                    switch(item.ctype){
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
                    el:'body',
                    data:_data
                });
            }
        });
        this.loaded();
    }

    loaded(){
        this.$el = $('.publish-list');
        // 推荐文章跳转
        this.$el.on('click','.new-item',function(){
            var se = $(this);
            window.location.href = se.attr('data-url');
        });
    }

    slide(){
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
    }
}

new Index();

