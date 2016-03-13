/**
 * Created by WesternRanger on 16/2/4.
 */
define('index',['jquery'],function($){
    function DOM(){
        this.wrap = $(".content");
    }
    $.extend(DOM.prototype,{
        init:function(){
            this.getEvery();
        },
        getEvery:function(){
            this.wrap.on("click","li",function(){
                console.log($(this).html());
            })
        }
    })
    new DOM().init()//dom操作
})
