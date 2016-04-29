/**
 * Created by WesternRanger on 16/2/4.
 */

var countTime = 1;
$("ul.intro").click(function(){
    var user = $("input[name='title']").val(),
        pass = $("textarea[name='content']").val(),
        _url = '/api/demo/profile',
        _data = {

        };

    getAjax(_url,_data,function(rs){
        console.log(44);
        if(countTime < 10){
            countTime++;
            setTimeout(function(){
                $("ul.intro").click();
            },1000);

        }
    });
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