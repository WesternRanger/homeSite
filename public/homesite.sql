/*
 Navicat MySQL Data Transfer

 Source Server         : WesternRanger
 Source Server Version : 50627
 Source Host           : localhost
 Source Database       : homesite

 Target Server Version : 50627
 File Encoding         : utf-8

 Date: 03/12/2016 22:57:33 PM
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
  `content` longtext NOT NULL,
  PRIMARY KEY (`id`,`title`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `blogs`
-- ----------------------------
BEGIN;
INSERT INTO `blogs` VALUES ('数组最大和次大元素交换位置', '2', '看着这个题目，我们可能觉得很low，这么个破题，还用的着写篇博客么！我一开始也觉得不值当。直到今天我知道了这种实现方式。\n\n如题：\n\n```\nvar arr1 = [1,2,4,6,9,3];\n```\n交换以后就是这样：\n\n```\nvar arr2 = [1,2,4,9,6,3];\n```\n不要告诉我你的思路是用for循环挨个遍历，找到最大的和次大的交换位置。我们不讨论这种方式。如果是这样就没有必要写一篇博客了。\n\n切入正题，你知道Math.max()这个Math对象的原生方法吗？不知道的自行百度。这个方法可以取得一组数字的最大值。\n\n```\nMath.max(1,2,4,9,6,3)// =>结果是9，你造吗！！！\n```\n但是：\n\n```\nvar arr2 = [1,2,4,9,6,3];\nMath.max(arr2)// =>结果是NaN，你造吗！！！\n```\nMath.max()函数的参数是n个参数列表,而不接收一个数组的形式（[param1[,param2[,…[,paramN]]]]）,可以通过apply的方式巧妙地解决这个问题!  \n\n```\nvar arr2 = [1,2,4,9,6,3];\nMath.max.apply(null,arr2)// =>结果是9，达到预期效果\n```\n我们从一些资料上得知apply的第一个参数为传入的作用域，null表示当前作用域，第二个参数为arguments类型。但不是数组类型。可以理解为类数组。关于arguments的类型一会儿再做讨论。\n\n我们先解决数组最大值和次大值交换。说到这里了。直接上代码吧。\n\n	var change = \'\',// 存储最大值\n		arr = [1,3,5,7,9],\n		max1 = Math.max.apply(null,arr),// 查找最大\n		max1_index = arr.indexOf(max1);// 查找最大元素索引\n		change = arr[max1_index];// 存储最大值\n	arr[max1_index] = 0;// 把最大值置零，再次筛选最大值\n	console.log(arr);// 此时的数组是[1,3,5,7,0]\n\n	var max2 = Math.max.apply(null,arr),\n		max2_index = arr.indexOf(max2);\n	arr[max1_index] = arr[max2_index];// 次大赋值给最大\n	arr[max2_index] = change;// 把刚才得到的最大赋值给次大\n	console.log(arr);// 此时的数组是[1,3,5,9,7]\n\n这个问题搞定了。我们看看刚才遗留的那个关于arguments和数组的问题。\n\nJavascript函数中的参数arguments是个对象，而不是数组。但它可以类似数组那样通过数字下表访问其中的元素，而且它也有length属性标识它的元素的个数。\n我们可以用\n\n```\nArray.prototype.slice.call();\n```\n来进行arguments＝》数组的转化\n\n```\n(function() {\n	  var args = arguments;//获取arguments\n	  console.log(args, Object.prototype.toString.call(args)); // [1, 2, 3] \"[object Arguments]\" \n	  var argsArr = Array.prototype.slice.call(args);\n	  console.log(argsArr, Object.prototype.toString.call(argsArr)); // [1, 2, 3] \"[object Array]\" \n	}(1,2,3))\n```\n\n这里需要说明一下，我们使用\n\n```\nObject.prototype.toString.call();\n```\n来判断一个位置结构的类型\n\n说到这里，我们知道使用Array.prototype.slice.call()可以将函数的arguments对象转化为数组。\n\n那么我们接着扩展 ***Array.prototype.slice*** 的用法\n\n+ 字符串转化为数组\n\n```\nconsole.log(Array.prototype.slice.call(\'string\')); // => [\"s\", \"t\", \"r\", \"i\", \"n\", \"g\"]\n```\n\n+ 如果参数类型为number、boolean、object的话，则会得到空数组。\n\n```\nconsole.log(Array.prototype.slice.call({1:\'44\',3:\'66\'})); // => []\n\nconsole.log(Array.prototype.slice.call(true)); // => []\n\nconsole.log(Array.prototype.slice.call(22)); // => []\n```\n\n+ 结构体要想转化为数组，要加上一个length属性\n\n```\nconsole.log(Array.prototype.slice.call({0: \'zero\', 1: \'one\', 2: \'obj\', length: 3}));  // =>[\"zero\", \"one\", \'obj\'] \n```\n\n+ clone 数组\n\n```\nvar oriArr = [1,2,3],\n	newArr = srcArr.slice(0);\nconsole.log(oriArr, newArr);// =>[1,2,3] [1,2,3]\nconsole.log(oriArr == newArr);// =>false\n```\n\n写了这么多，主要因apply这个方法而起。\n本文涉及到的知识点：\n\n* Math.max(1,2,4,9,6,3)\n* Math.max.apply(null,arr)\n* Object.prototype.toString.call()\n* Array.prototype.slice.call()\n* arr.slice())'), ('数组去重', '7', '如题,这算是一个比较经典的面试题了吧.在日常开发中也会经常遇到.研究一下还是很有价值的,让我们剖析一下.\n\n随意定义一个数组,比如\n\n    var arr = [1,2,2,3,4];\narr[1]和arr[2]都为2，我们只保留一个。\n在解决这个问题之前我们了解一下一种结构叫做\"哈希表\"，类似这种：\n\n		var hash_example = {\n    		\"百度\"    :\"http://www.baidu.com/\",\n    		\"Google\"  :\"http://www.google.com/\",\n    		\"微软\"    :\"http://www.microsoft.com/\"\n		};\n怎么样，并不陌生吧，我们最熟悉的键值对形式。\n刚才那个arr数组有五个元素，我们可以给他对应的做一个五个元素的hash表，让他的每个元素作为hash表的“键”，这样：\n\n		var hash_example = {\n    		1 : \" \",\n    		2 : \" \",\n    		2 : \" \",\n    		3 : \" \",\n    		4 : \" \"\n		};\n在hash_example中有两个重复的项。我们如果把每个键的值用true和false表示，第一次粗现就标记为true，第二次就标记为false，我们只需要去掉键值为false的项，然后把存下来的键放到数组里就ok了。\n\n		var hash_example = {\n    		1 : true,\n    		2 : true,\n    		2 : false,\n    		3 : true,\n    		4 : true\n		};\n		\n利用这个原理，我们首先定义一个空数组来存放去重之后的结果\n	\n	var newArr = [];\n	\n然后定义一个hash表结构\n\n	var hash = {};\n	\n遍历数组，构建哈希表，并得出新数组\n\n	<script>\n		for(var i=0;i<arr.length;i++){\n    		if(!hash[arr[i]]){\n    			newArr.push(arr[i]);\n    			hash[arr[i]] = true;		\n    		};\n    	};\n	</script>\n    \n大功告成。'), ('解决高度塌陷', '17', '##解决高度塌陷\n\n![](http://7xp7rf.com1.z0.glb.clouddn.com/highBroken.png)\n\n如上图，给父元素设置边框不能把两个浮动的子元素包裹起来，俗称高度塌陷。解决高度塌陷最常用的方式就是－*清除浮动*\n使用清除浮动解决高度塌陷有这么几种方案：\n\n+ 我们可以在box2后面再加一个box3，并把box3的clear属性设置为both;代码如下：\n\n		<div>\n    		<div style=\"float:left;\"></div>\n    		<div style=\"float:left;\"></div>\n    		<div style=\"clear:both;\"></div> /*  box3  */\n		</div>\n	这种方式多加了一个div。我们也可以另一种方式去更优雅的实现它。\n+ 使用伪类：\n	\n		<style>\n			.clearfix{\n				*zoom:1;\n			}\n			.clearfix:after{\n				content:\"\";\n				display:block;\n				clear:both;\n			}\n		</style>\n		<div class=\"clearfix\">\n    		<div style=\"float:left;\"></div>\n    		<div style=\"float:left;\"></div>\n		</div>\n	跟第一种方式原理一样，只不过是巧妙的利用了伪类。\n\n	需要注意的是：伪类里的display属性不可以写inline，因为inline撑不起父元素。\n	然后，ie6、7不支持伪类：after，所以我们设置 \"*zoom 为1\" 来触发 ie6、7 的 haslayout 属性来支持	after伪类。（haslayout是关于ie低版本浏览器排版的一个属性）\n	\n我们还可以使用另一种神秘的方式去解决高度塌陷。总结了一下，分为四小类：\n\n+ 设置父元素float不为none;\n\n		<div style=\"float:left;\">\n    		<div style=\"float:left;\"></div>\n    		<div style=\"float:left;\"></div>\n		</div>\n+ 设置父元素position为fixed或absolute；\n		\n		<div style=\"position:fixed;\">\n    		<div style=\"float:left;\"></div>\n    		<div style=\"float:left;\"></div>\n		</div>\n+ display为inline-block, table-cell, table-caption, flex, inline-flex;\n	\n		<div style=\"display:inline-block;\">\n    		<div style=\"float:left;\"></div>\n    		<div style=\"float:left;\"></div>\n		</div>\n+ overflow不为visible;\n	\n		<div style=\"overflow:hidden;\">\n    		<div style=\"float:left;\"></div>\n    		<div style=\"float:left;\"></div>\n		</div>\n	其实自由最后一类对父元素的设置还算无毒无害，应用场景最多。\n\n	但是说了这么多，你知道为什么这四种方式可以解决父元素的高度塌陷吗？知道最好，如果不知道说明你已定不了	解BFC的概念，BFC（Block formatting context)直译为\"块级格式化上下文\"。它是一个只有Block-level 	box参与独立的渲染区域。\n	\n	BFC一个很重要的特性就是：**计算BFC的高度时，浮动元素也参与计算。** 利用这条特性，我们只要将父元素触发为	BFC就可以了。触发条件当然就是上述四条。\n	\n'), ('数组元素铺平', '18', '首先解释一下“铺平”，比如一个数组：[1,[7,3],4]，他的第二个元素还是一个数组，我们需要把它提取出来，最后应该是这样[1,7,3,4]，这就是铺平。\n\n思路很简单，遍历数组，每个元素判断是否为数组元素，不是的话就push到一个新数组，是的话就遍历当前数组元素，不是数组元素的继续push... 这样周而复始的递归调用。听糊涂了吧。直接上代码吧。\n一个待铺平的数组\n\n	var arr = [1,[[2,3],3],4];\n定义一个空数组存放处理结果：\n	\n	var newArr = [];\n判断是否为数组的jQueryAPI ：isArray，然后写一个处理数组的function：\n	\n	<script>\n		var dealArr = function(arr){\n    		for (var i = 0;i<arr.length;i++){\n        		$.isArray(arr[i]) ? dealArr(arr[i]) : newArr.push(arr[i]);\n       		}\n       		return newArr;\n    	};\n    </script>\n    \n这样一个处理数组铺平的函数就写好了。其实我们还可以拓展一下。我们发现自己没做多少工作，很多工作都是让jQuery的那个api－isArray给帮忙做了。我们知道js的六大数据类型：\n\n+ number\n+ string\n+ boolean\n+ null\n+ undefined\n+ object\n\n这之中并没有array类型，想想就知道jQuery肯定是在isArray判断了数组类型，那么它到底怎么判断的，我们需要探究一下，jQuery源码，如果不想读源码，就直接百度或者google。网上一堆结果。你会发现这样一句话：\n	\n	Object.prototype.toString.call(obj)\n没错，这就是原生js判断数据类型的方法：可以参考 [如何判断js中的数据类型](http://blog.sina.com.cn/s/blog_51048da70101grz6.html)\n\n我们给数组对象添加一个铺平数组的api：panelArr\n		\n	<script>\n		Array.prototype.panelArr = function(){\n        	var newArr = [];\n        	var isArray = function(obj) {\n            	return Object.prototype.toString.call(obj) === \'[object Array]\';\n        	};\n        	var dealArr = function(arr){\n            	for (var i = 0;i<arr.length;i++){\n                	isArray(arr[i]) ? dealArr(arr[i]) : newArr.push(arr[i]);\n            	}\n        	};\n        	dealArr(this);\n        	return newArr;\n    	};\n    </script>\n可以验证一下，比如执行 **[1,[[2,3],3],4].panelArr()** 的结果就是 [1,2,3,3,4]。\n\n西泊浪人&copy;blog.western-ranger.com\n    \n	'), ('vim基本命令', '19', '今天看了一下vim，命令好多。暂时记下一些比较常用的。\n###编辑\n1.在光标位置编辑：\n	\n	i\n	\n2.在光标后编辑：\n\n	a\n\n3.在光标当前行最后编辑：\n\n	A\n\n4.在光标行的下一行编辑：\n\n	o\n\n5.在光标的上一行编辑：\n\n	O\n	\n###字符串查找\n1.当前行定位到字符位置：\n\n	f+(字符)\n	\n2.将光标定位到字符左边：\n	\n	t+(字符)\n	\n3.将光标定位到字符右边：\n\n	T或者F\n	\n###补全\n1.自动补全已有变量\n\n	ctrl ＋ c／p\n	\n### 翻屏\n1.向上翻半屏\n\n	ctrl＋u\n	\n2.向下翻半屏\n\n	ctrl＋d\n	\n	\n	\n	');
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
INSERT INTO `test` VALUES ('1', '哈哈哈'), ('qi.chen5', '最近闲的蛋疼啊'), ('qi.chen6', '想想晚上吃啥'), ('1', 'ety'), ('4', 'sdf');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
