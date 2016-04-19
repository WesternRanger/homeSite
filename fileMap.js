/**
 * Created by WesternRanger on 16/4/19.
 */
var fs = require('fs');
var path = require('path');
var ignore = [];
var readdir = './routes';
var fileMap = {};

function doRead(dir){
    var files = fs.readdirSync(dir); // 读取内部文件

    files.forEach(function(file){
        var curDir = path.join(dir, file) // 连接根目录与内部文件
        var stat = fs.lstatSync(curDir); //  当前文件属性
        var extname = path.extname(curDir) // 扩展名
        var entry = path.relative(readdir, curDir); // 获取相对路径

        //脚本排除
        if(~['common'].indexOf(file)){
            return ;
        }


        if(stat.isFile()){ // 判断是否文件,如果是文件夹,则跳出
            extname == '.js' && (fileMap[entry.split('.')[0]] = require('./' + curDir));
        }else{
            doRead(curDir)
        }
    })
}
doRead(readdir)
module.exports = fileMap