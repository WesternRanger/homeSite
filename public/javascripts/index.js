/**
 * Created by WesternRanger on 16/2/4.
 */
define('index',[,'jquery','tool'],function($,Tool){
    var Index = {
        init:function(){
            Index.slide()
        },
        slide:function(){
            var step = 0,
                time = 4000,
                imgArr = $(".slide-content").children(".img"),
                id,
                clearId;

            //slide
            id=setTimeout(change,time);
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
        }
    }
    return{
        init:Index.init
    }
})
