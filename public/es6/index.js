/**
 * Created by WesternRanger on 16/2/4.
 */
import {Employee,fun_aa} from './module.js';
new Employee();
fun_aa();


//var _url = '/api/demo/commit',
//    _data = {
//        name:'chenqi',
//        talk:'i create a bug on line'
//    };
//
//getAjax(_url,_data,function(rs){
//    console.log(rs);
//});


var _url1 = '/api/demo/profile',
    _data1 = {
        name:'aa',
        talk:'333'
    };

var _url2 = '/api/demo/profile1';

getAjax(_url1,_data1,function(rs){
    console.log(rs);
});

getAjax(_url2,_data1,function(rs){
    console.log(rs);
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
