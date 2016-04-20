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
        //alert(rs.msg);
        $(`<div>${rs.msg}</div>`).dialogBox();
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