/**
 * Created by WesternRanger on 16/2/4.
 */
function Index(){
    this.hoverTip();
}
Index.prototype.hoverTip = function(){
    $('.hover-tip').on("click",function(){
        $(".nav-bar").css({
            "position":"absolute",
            "top":"30px",
            "left":0
        }).removeClass('hidden-xs').addClass('col-xs-12');
    });
};
//new Index();
