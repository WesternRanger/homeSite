import '../javascripts/common/tool.js';

$('span.submit-btn').on('click',()=>{
    var username = $('input[name="username"]').val(),
        password = $('input[name="password"]').val();

    $.ajax({
        type:'post',
        url:'/api/ucenter/checkadmin',
        data:{
            username:username,
            password:password
        }
    }).done((rs)=>{
        if(rs.code === 666){
            window.location.href = rs.redirectUrl;
        }else{
            $(`<div style="text-align: center;padding-top:30px;">${rs.msg}</div>`).dialogBox({
                title:'western-ranger.com提示您',
                width:280,
                height:180
            });
        }
    })
})
