/**
 * Created by WesternRanger on 16/4/20.
 */
import '../javascripts/common/tool.js'
import showdown from '../javascripts/common/showdown.js' // markdown 实时转化

//编译markdown
$('textarea#content').on('keyup',_compile);

function _compile(){
    var text = document.getElementById("content").value;
    var converter = new showdown.Converter();
    var html = converter.makeHtml(text);
    document.getElementById("result").innerHTML = html;
}

// 发布博客
$("input[type='button']").click(function(){
    var user = $("input[name='title']").val(),
        pass = $("textarea[name='content']").val(),
        type = $("input[name='type']:checked").val(),
        _url = '/api/publish/blog',
        _data = {
            title:user,
            content:pass,
            type:type
        };

    getAjax(_url,_data,function(rs){
        $(`<div style="text-align: center;padding-top:30px;">${rs.msg}</div>`).dialogBox({
            title:'western-ranger.com提示您',
            width:280,
            height:180
        });
    });
});

//修改博客
$("#fixBlog").click(function(){
    var user = $("input[name='title']").val(),
        pass = $("textarea[name='content']").val(),
        type = $("input[name='type']:checked").val(),
        _url = '/api/publish/fixBlog',
        _data = {
            title:user,
            content:pass,
            type:type,
            id:$.getSearch('id')
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