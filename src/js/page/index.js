//引入CSS
require("../../css/lib/reset.css");
require("../../css/common/global.css");
require("../../css/page/index.css");
import Per from "./module1.js";
//
////增加事件
$('#btn').click(()=>{
	require.ensure(['../components/dialog/index.js'],function(require){
		var Dialog=require('../components/dialog/index.js');
		new Dialog(new Date()-0);
	});
});

let wayou = new Per($(".head-top"));
wayou.getEvery();