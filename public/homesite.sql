/*
 Navicat MySQL Data Transfer

 Source Server         : WesternRanger
 Source Server Version : 50627
 Source Host           : localhost
 Source Database       : homesite

 Target Server Version : 50627
 File Encoding         : utf-8

 Date: 01/19/2016 16:05:20 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `blogs`
-- ----------------------------
DROP TABLE IF EXISTS `blogs`;
CREATE TABLE `blogs` (
  `title` varchar(30) NOT NULL,
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  PRIMARY KEY (`id`,`title`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `blogs`
-- ----------------------------
BEGIN;
INSERT INTO `blogs` VALUES (' 清除浮动的常用方法', '1', '先说不清除浮动的效果： \n这里写图片描述 \n给父元素这只边框都不会把他们包裹起来，俗称高度塌陷。\n\n然后说说几个不常用的清除浮动方法，比如：\n\n<div style=\"overflow:hidden\">\n    <div style=\"float:left;\"></div>\n    <div style=\"float:left;\"></div>\n</div>\n1\n2\n3\n4\n就是给父元素设置overflow属性的那种，具体样式就不写了； \n这个原理现在说一下。刚写这篇文章的时候并不知道给父元素设置overflow：hidden为什么可以防止高度塌陷。\n\n要说明白这个问题首先需要知道bfc是个什么鬼。具体参照BFC神奇背后的原理 \n这里的原理就是：“overflow:hidden;“ 使父元素成为了一个bfc环境，bfc元素计算高度时，浮动元素也参与计算。\n还有这种：\n\n<div style=\"\">\n    <div style=\"float:left;\"></div>\n    <div style=\"float:left;\"></div>\n    <div style=\"clear:both\"></div>\n</div>\n1\n2\n3\n4\n5\n这种的是在浮动元素最后加一个空的div然后给他清楚浮动，这个原理就是让它左右两边都不挨着浮动元素，所以他就钻到父元素的最下边了，但是还是在父元素内，所以就把父元素给撑起来了。不会塌陷。效果如下：\n正常状态\n\n还有：\n\n<div style=\"float:left;\">\n    <div style=\"float:left;\"></div>\n    <div style=\"float:left;\"></div>\n</div>\n1\n2\n3\n4\n给父元素也加浮动，这种方式是极不好的，会影响父元素的定位\n还有一种极不好的，是给设置父元素的display属性为table。这个table属性的元素布局的时候坑太多了，所以这种清除浮动的方式是极不推荐的。\n\n最后被大家所广泛采用的一种方式是：\n\n    <style>\n        .box{\n            width:400px;\n            border:red solid 1px;\n        }\n        .clearfix{\n            *zoom:1;    \n        }\n        .clearfix:after{\n            display:block;\n            content:\"\";\n            clear:both;\n        }\n        .one{\n            width:100px;\n            height:100px;\n            background-color:yellow;\n            margin:5px;\n            float:left;\n        }\n    </style>\n    <div class=\"box clearfix\">\n        <div class=\"one\">one</div>\n        <div class=\"one\">two</div>\n        <div class=\"one\">three</div>\n    </div>\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n用after伪类在box父元素内的最后添加一个子元素，每个dom元素都必须有display和content属性，所以要写上：\n.clearfix:after{\n            display:block;\n            content:\"\";\n            clear:both;\n        }\n1\n2\n3\n4\n5\n注意display属性不可以写inline，因为inline撑不起父元素。 \n然后，ie6、7不支持伪类：after，所以我们在\n    .clearfix{\n        *zoom:1;    \n    }\n1\n2\n3\n设置了zoom属性，使用来触发ie67的haslayout属性来支持：after伪类，haslayout是关于ie低版本浏览器排版的一个属性。'), ('git的基本用法', '2', '之前一直是用gitextension开发，图形化界面的好处就是简单易懂，现在可能我水平还不够，不能够说出他很多坏处，至于现在我开始放弃使用git的图形化界面完全是因为现在的公司，现在的工作开发仓库用git，所以平时也就联系一下使用git命令行呗。\n\n使用git命令好处还是有的。这练着练着就觉得git的命令行方式确实比较高端，首先看着高端，毕竟要记住好多命令嘛，装个逼。。哈哈。其次，用命令行基本不会出行卡机的现象，用过gitextension的都知道那个软件经常会卡。然后我记得第一次拉去git项目必须用命令行吧。用git extension拉取不下来。命令行的好处就体现出来了。最重要的是，如果你能把git的命令掌握的很熟练的话，操作起来肯定比用图形化界面快。\n\n经过这几天的摸索，现在总结学到的基本命令：\n\n克隆档案库： git clone 【github上的那个https或者ssh地址】;\n添加，新添加文件要提交，首先：git add --all;\n提交本地档案库，都加上之后再：git commit -a，如果没有新添加的文件，直接运行此命令;\n查看分支状态：git status，从这里可以看出那些文件没提交，哪些问价是新添加的;\n提交远程档案库，git push，这样，你就可以从另一台电脑上访问github查看你在别的电脑上提交的代码了；\n拉取代码：git pull；\n新建分支：git branch 【分支名字】;\n切换分支：git checkout [分支名字]，注意切换之前必须在本地提交代码;\n把分支加入远程端：git remote add [远程服务器端名字，随便起一个名字][github上的那个https或者ssh地址]；\n推送新分支到github上：git push [远程服务器端名字][分支名字];\n查看最近操作记录：git log;'), ('html，css容易被忽略的小知识点', '3', '呃呃呃呃'), ('关于css优先级', '4', '俄晚饭'), ('js绑定事件－（坑）', '5', '但是风格化的风格'), ('比较常用的jQuery交互效果', '6', '啊帅哥 v 说的不对'), (' 半透明的圆角矩形实现IE浏览器兼容', '7', '啊奉公守法的关怀');
COMMIT;

-- ----------------------------
--  Table structure for `test`
-- ----------------------------
DROP TABLE IF EXISTS `test`;
CREATE TABLE `test` (
  `author` varchar(30) DEFAULT NULL,
  `text` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `test`
-- ----------------------------
BEGIN;
INSERT INTO `test` VALUES ('1', '哈哈哈'), ('qi.chen5', '最近闲的蛋疼啊'), ('qi.chen6', '想想晚上吃啥'), ('1', 'ety');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
