/**
 * Created by WesternRanger on 16/4/20.
 */
import '../javascripts/common/tool.js'
$("input[type='button']").click(function(){
    var user = $("input[name='title']").val(),
        pass = $("textarea[name='content']").val(),
        _url = '/api/publish/blog',
        _data = {
            title:user,
            content:pass
        };

    getAjax(_url,_data,function(rs){
        $(`<div style="text-align: center;padding-top:30px;">${rs.msg}</div>`).dialogBox({
            title:'western-ranger.com提示您',
            width:280,
            height:180
        });
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