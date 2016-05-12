-- MySQL dump 10.13  Distrib 5.6.27, for osx10.8 (x86_64)
--
-- Host: localhost    Database: homesite
-- ------------------------------------------------------
-- Server version	5.6.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `blogs`
--

DROP TABLE IF EXISTS `blogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blogs` (
  `title` varchar(30) NOT NULL,
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `content` longtext NOT NULL,
  `type` varchar(30) NOT NULL,
  `date` varchar(200) NOT NULL,
  PRIMARY KEY (`id`,`title`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogs`
--

LOCK TABLES `blogs` WRITE;
/*!40000 ALTER TABLE `blogs` DISABLE KEYS */;
INSERT INTO `blogs` VALUES ('数组最大和次大元素交换位置',2,'看着这个题目，我们可能觉得很low，这么个破题，还用的着写篇博客么！我一开始也觉得不值当。直到今天我知道了这种实现方式。\n\n如题：\n\n```\nvar arr1 = [1,2,4,6,9,3];\n```\n交换以后就是这样：\n\n```\nvar arr2 = [1,2,4,9,6,3];\n```\n不要告诉我你的思路是用for循环挨个遍历，找到最大的和次大的交换位置。我们不讨论这种方式。如果是这样就没有必要写一篇博客了。\n\n切入正题，你知道Math.max()这个Math对象的原生方法吗？不知道的自行百度。这个方法可以取得一组数字的最大值。\n\n```\nMath.max(1,2,4,9,6,3)// =>结果是9，你造吗！！！\n```\n但是：\n\n```\nvar arr2 = [1,2,4,9,6,3];\nMath.max(arr2)// =>结果是NaN，你造吗！！！\n```\nMath.max()函数的参数是n个参数列表,而不接收一个数组的形式（[param1[,param2[,…[,paramN]]]]）,可以通过apply的方式巧妙地解决这个问题!  \n\n```\nvar arr2 = [1,2,4,9,6,3];\nMath.max.apply(null,arr2)// =>结果是9，达到预期效果\n```\n我们从一些资料上得知apply的第一个参数为传入的作用域，null表示当前作用域，第二个参数为arguments类型。但不是数组类型。可以理解为类数组。关于arguments的类型一会儿再做讨论。\n\n我们先解决数组最大值和次大值交换。说到这里了。直接上代码吧。\n\n	var change = \'\',// 存储最大值\n		arr = [1,3,5,7,9],\n		max1 = Math.max.apply(null,arr),// 查找最大\n		max1_index = arr.indexOf(max1);// 查找最大元素索引\n		change = arr[max1_index];// 存储最大值\n	arr[max1_index] = 0;// 把最大值置零，再次筛选最大值\n	console.log(arr);// 此时的数组是[1,3,5,7,0]\n\n	var max2 = Math.max.apply(null,arr),\n		max2_index = arr.indexOf(max2);\n	arr[max1_index] = arr[max2_index];// 次大赋值给最大\n	arr[max2_index] = change;// 把刚才得到的最大赋值给次大\n	console.log(arr);// 此时的数组是[1,3,5,9,7]\n\n这个问题搞定了。我们看看刚才遗留的那个关于arguments和数组的问题。\n\nJavascript函数中的参数arguments是个对象，而不是数组。但它可以类似数组那样通过数字下表访问其中的元素，而且它也有length属性标识它的元素的个数。\n我们可以用\n\n```\nArray.prototype.slice.call();\n```\n来进行arguments＝》数组的转化\n\n```\n(function() {\n	  var args = arguments;//获取arguments\n	  console.log(args, Object.prototype.toString.call(args)); // [1, 2, 3] \"[object Arguments]\" \n	  var argsArr = Array.prototype.slice.call(args);\n	  console.log(argsArr, Object.prototype.toString.call(argsArr)); // [1, 2, 3] \"[object Array]\" \n	}(1,2,3))\n```\n\n这里需要说明一下，我们使用\n\n```\nObject.prototype.toString.call();\n```\n来判断一个位置结构的类型\n\n说到这里，我们知道使用Array.prototype.slice.call()可以将函数的arguments对象转化为数组。\n\n那么我们接着扩展 ***Array.prototype.slice*** 的用法\n\n+ 字符串转化为数组\n\n```\nconsole.log(Array.prototype.slice.call(\'string\')); // => [\"s\", \"t\", \"r\", \"i\", \"n\", \"g\"]\n```\n\n+ 如果参数类型为number、boolean、object的话，则会得到空数组。\n\n```\nconsole.log(Array.prototype.slice.call({1:\'44\',3:\'66\'})); // => []\n\nconsole.log(Array.prototype.slice.call(true)); // => []\n\nconsole.log(Array.prototype.slice.call(22)); // => []\n```\n\n+ 结构体要想转化为数组，要加上一个length属性\n\n```\nconsole.log(Array.prototype.slice.call({0: \'zero\', 1: \'one\', 2: \'obj\', length: 3}));  // =>[\"zero\", \"one\", \'obj\'] \n```\n\n+ clone 数组\n\n```\nvar oriArr = [1,2,3],\n	newArr = srcArr.slice(0);\nconsole.log(oriArr, newArr);// =>[1,2,3] [1,2,3]\nconsole.log(oriArr == newArr);// =>false\n```\n\n写了这么多，主要因apply这个方法而起。\n本文涉及到的知识点：\n\n* Math.max(1,2,4,9,6,3)\n* Math.max.apply(null,arr)\n* Object.prototype.toString.call()\n* Array.prototype.slice.call()\n* arr.slice())','it','2016-02-29 23:22'),('数组去重',7,'如题,这算是一个比较经典的面试题了吧.在日常开发中也会经常遇到.研究一下还是很有价值的,让我们剖析一下.\n\n随意定义一个数组,比如\n\n    var arr = [1,2,2,3,4];\narr[1]和arr[2]都为2，我们只保留一个。\n在解决这个问题之前我们了解一下一种结构叫做\"哈希表\"，类似这种：\n\n		var hash_example = {\n    		\"百度\"    :\"http://www.baidu.com/\",\n    		\"Google\"  :\"http://www.google.com/\",\n    		\"微软\"    :\"http://www.microsoft.com/\"\n		};\n怎么样，并不陌生吧，我们最熟悉的键值对形式。\n刚才那个arr数组有五个元素，我们可以给他对应的做一个五个元素的hash表，让他的每个元素作为hash表的“键”，这样：\n\n		var hash_example = {\n    		1 : \" \",\n    		2 : \" \",\n    		2 : \" \",\n    		3 : \" \",\n    		4 : \" \"\n		};\n在hash_example中有两个重复的项。我们如果把每个键的值用true和false表示，第一次粗现就标记为true，第二次就标记为false，我们只需要去掉键值为false的项，然后把存下来的键放到数组里就ok了。\n\n		var hash_example = {\n    		1 : true,\n    		2 : true,\n    		2 : false,\n    		3 : true,\n    		4 : true\n		};\n		\n利用这个原理，我们首先定义一个空数组来存放去重之后的结果\n	\n	var newArr = [];\n	\n然后定义一个hash表结构\n\n	var hash = {};\n	\n遍历数组，构建哈希表，并得出新数组\n\n		for(var i=0;i<arr.length;i++){\n    		if(!hash[arr[i]]){\n    			newArr.push(arr[i]);\n    			hash[arr[i]] = true;		\n    		};\n    	};\n\n    \n大功告成。\n        \n        \n        \n        \n        \n        \n        ','it','2016-02-20'),('解决高度塌陷',17,'\n![](http://7xp7rf.com1.z0.glb.clouddn.com/highBroken.png)\n\n如上图，给父元素设置边框不能把两个浮动的子元素包裹起来，俗称高度塌陷。解决高度塌陷最常用的方式就是－*清除浮动*\n使用清除浮动解决高度塌陷有这么几种方案：\n\n+ 我们可以在box2后面再加一个box3，并把box3的clear属性设置为both;代码如下：\n\n		<div>\n    		<div style=\"float:left;\"></div>\n    		<div style=\"float:left;\"></div>\n    		<div style=\"clear:both;\"></div> /*  box3  */\n		</div>\n	这种方式多加了一个div。我们也可以另一种方式去更优雅的实现它。\n+ 使用伪类：\n	\n		<style>\n			.clearfix{\n				*zoom:1;\n			}\n			.clearfix:after{\n				content:\"\";\n				display:block;\n				clear:both;\n			}\n		</style>\n		<div class=\"clearfix\">\n    		<div style=\"float:left;\"></div>\n    		<div style=\"float:left;\"></div>\n		</div>\n	跟第一种方式原理一样，只不过是巧妙的利用了伪类。\n\n	需要注意的是：伪类里的display属性不可以写inline，因为inline撑不起父元素。\n	然后，ie6、7不支持伪类：after，所以我们设置 \"*zoom 为1\" 来触发 ie6、7 的 haslayout 属性来支持	after伪类。（haslayout是关于ie低版本浏览器排版的一个属性）\n	\n我们还可以使用另一种神秘的方式去解决高度塌陷。总结了一下，分为四小类：\n\n+ 设置父元素float不为none;\n\n		<div style=\"float:left;\">\n    		<div style=\"float:left;\"></div>\n    		<div style=\"float:left;\"></div>\n		</div>\n+ 设置父元素position为fixed或absolute；\n		\n		<div style=\"position:fixed;\">\n    		<div style=\"float:left;\"></div>\n    		<div style=\"float:left;\"></div>\n		</div>\n+ display为inline-block, table-cell, table-caption, flex, inline-flex;\n	\n		<div style=\"display:inline-block;\">\n    		<div style=\"float:left;\"></div>\n    		<div style=\"float:left;\"></div>\n		</div>\n+ overflow不为visible;\n	\n		<div style=\"overflow:hidden;\">\n    		<div style=\"float:left;\"></div>\n    		<div style=\"float:left;\"></div>\n		</div>\n	其实自由最后一类对父元素的设置还算无毒无害，应用场景最多。\n\n	但是说了这么多，你知道为什么这四种方式可以解决父元素的高度塌陷吗？知道最好，如果不知道说明你已定不了	解BFC的概念，BFC（Block formatting context)直译为\"块级格式化上下文\"。它是一个只有Block-level 	box参与独立的渲染区域。\n	\n	BFC一个很重要的特性就是：**计算BFC的高度时，浮动元素也参与计算。** 利用这条特性，我们只要将父元素触发为	BFC就可以了。触发条件当然就是上述四条。\n	\n\n        ','it','2016-02-21'),('数组元素铺平',18,'首先解释一下“铺平”，比如一个数组：[1,[7,3],4]，他的第二个元素还是一个数组，我们需要把它提取出来，最后应该是这样[1,7,3,4]，这就是铺平。\n\n思路很简单，遍历数组，每个元素判断是否为数组元素，不是的话就push到一个新数组，是的话就遍历当前数组元素，不是数组元素的继续push... 这样周而复始的递归调用。听糊涂了吧。直接上代码吧。\n一个待铺平的数组\n\n	var arr = [1,[[2,3],3],4];\n定义一个空数组存放处理结果：\n	\n	var newArr = [];\n判断是否为数组的jQueryAPI ：isArray，然后写一个处理数组的function：\n	\n	<script>\n		var dealArr = function(arr){\n    		for (var i = 0;i<arr.length;i++){\n        		$.isArray(arr[i]) ? dealArr(arr[i]) : newArr.push(arr[i]);\n       		}\n       		return newArr;\n    	};\n    </script>\n    \n这样一个处理数组铺平的函数就写好了。其实我们还可以拓展一下。我们发现自己没做多少工作，很多工作都是让jQuery的那个api－isArray给帮忙做了。我们知道js的六大数据类型：\n\n+ number\n+ string\n+ boolean\n+ null\n+ undefined\n+ object\n\n这之中并没有array类型，想想就知道jQuery肯定是在isArray判断了数组类型，那么它到底怎么判断的，我们需要探究一下，jQuery源码，如果不想读源码，就直接百度或者google。网上一堆结果。你会发现这样一句话：\n	\n	Object.prototype.toString.call(obj)\n没错，这就是原生js判断数据类型的方法：可以参考 [如何判断js中的数据类型](http://blog.sina.com.cn/s/blog_51048da70101grz6.html)\n\n我们给数组对象添加一个铺平数组的api：panelArr\n		\n	<script>\n		Array.prototype.panelArr = function(){\n        	var newArr = [];\n        	var isArray = function(obj) {\n            	return Object.prototype.toString.call(obj) === \'[object Array]\';\n        	};\n        	var dealArr = function(arr){\n            	for (var i = 0;i<arr.length;i++){\n                	isArray(arr[i]) ? dealArr(arr[i]) : newArr.push(arr[i]);\n            	}\n        	};\n        	dealArr(this);\n        	return newArr;\n    	};\n    </script>\n可以验证一下，比如执行 **[1,[[2,3],3],4].panelArr()** 的结果就是 [1,2,3,3,4]。\n\n西泊浪人&copy;blog.western-ranger.com\n    \n	','it','2016-02-20'),('vim基本命令',19,'>今天看了一下vim，命令好多。暂时记下一些比较常用的。\n\n**编辑**\n\n1.在光标位置编辑：\n	\n	i\n	\n2.在光标后编辑：\n\n	a\n\n3.在光标当前行最后编辑：\n\n	A\n\n4.在光标行的下一行编辑：\n\n	o\n\n5.在光标的上一行编辑：\n\n	O\n	\n**字符串查找**\n\n1.当前行定位到字符位置：\n\n	f+(字符)\n	\n2.将光标定位到字符左边：\n	\n	t+(字符)\n	\n3.将光标定位到字符右边：\n\n	T或者F\n	\n**补全**\n\n1.自动补全已有变量\n\n	ctrl ＋ c／p\n	\n**翻屏**\n\n1.向上翻半屏\n\n	ctrl＋u\n	\n2.向下翻半屏\n\n	ctrl＋d\n	\n	\n	\n	\n        \n        ','it','2016-03-20'),('毕业一周年有感',20,'            \n>去年的今天，也就是`2015年的4月28日`。我们毕业答辩结束了。虽然还没有到发毕业证的日子（毕业证6月26号发的）。但是我们都懂，这一刻意味着大学四年生涯彻底结束。当时的我没有现在这么多愁善感、怀念过去。满心里对未来充满期待。我在人人网实习了4个月，也即将拿到转正offer，想到月薪即将超过五位数，我开心还来不及。换个地方继续人生的奋斗路程罢了。我来不及伤感。我回家呆了没多久就匆匆忙忙的回去上班了。我太热爱我的工作了。跟大牛同学比不了，我觉得人人网的前端开发工程师已经很给我长脸了，所以我放弃了毕业狂欢，把所有精力都扑在了工作上。因为我知道我这份工作来之不易。\n\n- 我2013年第二学期，也就是大三上学期。遇到了我恩师，他叫**王华杰**，教我们j2ee实战。主修jsp，servlet，struts，hibernite，spring。不得不说大一大二玩了两年，java基础没有打好。王老师在我们上的第一堂课就给出了个小题，用java循环输出一个数组，我马马虎虎写了出来，毕竟很基础。王老师正好走到我跟前，看到我写的程序，说了句，是抄的吗？我很诚恳的告诉他不是。然后他就问了我的名字，从那以后，每节课上他都会提问我，我好像就跟上节奏了,学习一直很积极。\n	\n- 就这样王老师一直到第二学期也教我们。这期间，王老师不断的给我们讲我们上一届学长有哪位入职了百度、金山、等等牛逼互联网公司去做前端开发。又有那位学长的offer月薪过万了。都是做前端的。实话实说，我很羡慕。我已然成为我们班王老师最得意的弟子。我当然要以那几位学长为奋斗目标。一个重要的转变发生在`2014年的5月13号`，在王老师的举荐下，我加入了一位学长的创业公司。去做前端，虽然在旁人看来就是打杂的。我仍然满心欢喜。毕竟我可以接触到这个行业来学习更多的东西。\n	\n- 在这个公司认识了好多大牛同学。都是王老师的得意门生，比起来我当然不是最好的。在这里就是互相学习，更多的还是向别人学习，了解开发流程，偶尔承担一些开发工作。主要还是学习，为此每天都会到很晚很晚，晚上12点回宿舍敲舍管大爷的门进去是家常便饭。正是因为有了这一段时间的经历，并打下一部分基础，我才能在`2014年12月17号`通过了人人网的电话面试。\n	\n- 面试官是**金锴锋**,我将来的主管，导师。对我职业生涯起重要作用的第二人，18号加我qq通知我通过了面试。我高兴的快要跳起来。然而我没有高兴太久。随后跟hr的沟通让我知道了我去北京实习一天工资只有120块钱。毕竟跟老师口中的那些学长一天170块钱的薪水差距不小。我百般纠结问了好多人要不要去。最后还是听了恩师一句话，“毕竟大公司，好好混，争取留下。”\n	\n	\n	\n>为了毕业能留在人人网，我使出了浑身力气。\n	\n- `2015年1月4号`正式入职人人网，别提了。肯定是加倍努力，正式员工10上班7点下班，我8点半到公司，晚上10以后回去。金锴锋主管交给我的任务哪怕通宵我也要完成，因为我要好好提高技术，争取留下来。正是他教会了我独立解决问题的能力。在我回学校后，我们老大已经跟我谈了转正offer，月薪五位数以上，我难掩心中的喜悦，等我回到了公司，一切都变了。我回去呆了一个月多的时间，很多合作过的同事都离职了。包括我的主管金锴锋，黯然神伤了一会儿，我也就释然了。\n\n- 我主管换成了**李国锐**,这个大我两届的同事，他做了我的主管，我很服，毕竟他的技术整个人人前端团队都有目共睹。不得不提她的对象**张杨雪**,我们喊他杨雪姐，两个技术牛人。对我产生了莫大的帮助，拓宽了我的视野，教会我去阅读别人的代码才是学习的最快途径。我深以为然，直到今天。\n	\n- 后来的后来，也就是大约15年的10月份。国锐和杨雪也一起离开了人人网。我一度心情很失落，为什么我们氛围那么融洽的一个团队在半年之间就走了一多半人呢？我怀念的只是同事之间的这种感情。很融洽，很不舍。从那时起我就酝酿着换工作了，主管走了以后，我被安排跟另一个同事一起做一个项目，这个同事叫**金维纲**,这哥们大我一届。比我大一岁，技术挺好，在技术上有追求的上进技术男。受他的影响，我开始广泛涉猎前端相关技术，耳濡目染，跟他学习了很多东西。然后再后来我们的team leader也离开了。他的离开直接造成了人人网前端团队土崩瓦解。\n\n>我曾经那么热爱的人人公司，尽全力留下了下来，到头来还是要离开。\n\n- 另我们都没有想到，我并肩作战的同事金维纲，我俩几乎同时离职。我离职很快，1月11号我妈妈过生日那天投的简历，1月12号上午360的hr打电话给我，预约了13号面试，然后14号复试，然后`15号`给的offer。360的hr发offer前问过我，如果给我offer我就入职吗。我眼都没眨一下，直接告诉她肯定的，你发我就去。我就是这么爽快，可能也是在这里呆的够够的了，这里发生了太多的事。已经让我很难找到曾经的感觉了。\n\n- 人人的同事们教会了我太多的技能，在人人网呆了一整年，学会了太多东西，从一个菜鸟到一个初级前端开发工程师。像某位同事说过，人人网是我们踏入社会的第一家公司，也将是我们最怀念的公司。嗯。\n\n\n>如今我换到360互联网金融，一份令自己很满意的工作，同事超赞，每天都能学到新技术新知识，跟基友在公司附近租了一套两居室，步行上班8分钟，日子过的也算有滋有味。现在已经是半夜1点多了，写这篇文章只是因为看到qq空间有同学晒去年的毕业照。心生感慨，感慨我这两年的技术道路，感恩我遇到的每一位恩师！保持一颗谦卑的心，让自己迅速成长起来，不辜负对我好的人。\n\n\n\n        ','lif','2016-04-28'),('关于css优先级',21,'\n>css的优先级从低到高依次是：\n\n- !important;\n- 内部样式表的优先级为（1，0，0，0），\n- id选择器优先级为（0，1，0，0），\n- class选择器为（0，0，1，0），\n- tag标签为（0，0，0，1）。\n\n\n>下面从三个层面剖析：\n\n- 情形一：div.test1 .span a 优先级 （0，0，2，2）；\n- 情形二：span#xxx .songs li 优先级（0，1，1，2）；\n- 情形三：#xxx li 优先级 100 +1 （0，1，0，1）；\n\n\n	    <style>  \n        	div .aa{color:orange;}/*（0，0，1，1）*/  \n        	.bn .aa{color:red;}/*（0，0，2，0）*/  \n        	#bb .aa{color:yellow;}/*（0，1，1，0）*/  \n        	#bb a{color:blue;}/*（0，1，0，1）*/  \n        </style>  \n        <div id=\"bb\" class=\"bn\">  \n        	<a style=\"color:gray;\" href=\"#\" class=\"aa\">link</a>  \n    	<div>  \n    	\n    	\n>代码执行后，link字体的颜色为gray，因为内部样式表的优先级最高，为（1，0，0，0）。\n但是如果，给div .aa{color:orange!important;}这样一个属性，那么link字体的颜色就是orange了。','it','2016-05-01'),('朱元璋身世',22,'>`朱元璋`出生于1328年（天历元年）在家里排行第四，家族兄弟排行第八。所以叫朱重八，后改名朱元璋。朱元璋这一朱姓宗族，出自金陵之句容，家住朱家巷，地属通德乡，其地在今江苏省句容，朱元璋以上几代人都以农业为生。他的父亲和祖父以及曾祖父等数辈人都是拖欠税款者，在淮河流域到处躲债，想找一个地方做佃户，以便在这里能过仅能糊口的生活。他在兄妹中是大难不死的最小的孩子，除了最大的孩子外，其余孩子都因无力抚养而送人或嫁出。\n\n- 朱元璋幼时贫穷，曾为地主放牛。1344年（元至正四年），入皇觉寺，25岁时参加郭子兴领导的红巾军反抗元朝， 1356年（至正十六年）被部下诸将奉为吴国公。同年，攻占集庆路，将其改为应天府。1368年（至正二十八年）朱元璋击破各路农民起义军后，在应天府称帝，国号大明， 年号洪武。后结束了蒙元在中原的统治，平定四川、广西、甘肃、云南等地，最终统一中国。\n\n- 朱元璋在位期间，下令农民归耕，奖励垦荒；大搞移民屯田和军屯；组织各地农民兴修水利；大力提倡种植桑、麻、棉等经济作物和果木作物、他还徒富民，抑豪强；下令解放奴婢；减免税负，严惩贪官；派人到全国各地丈量土地，清查户口等等。经过洪武时期的努力，社会生产逐渐恢复和发展了，史称洪武之治。 1380年（洪武十三年），朱元璋废丞相，设承宣布政使司、提刑按察使司、都指挥使司三司分掌权力，进一步的加强了中央集权。\n\n- 1398年（洪武三十一年），朱元璋病逝于应天，享年71岁，庙号太祖，谥号开天行道肇纪立极大圣至神仁文义武俊德成功高皇帝。葬南京明孝陵。\n\n>朱元璋聪明而有远见，神威英武，收揽英雄，平定四海，求贤若渴，重农桑，兴礼乐，褒节义，崇教化，制定的各种法规都很相宜。自古以来，前所未有。但是他的性格暴戾，偏好诛杀，使得一代开国元勋很少有善终的，这就是朱元璋的缺点。','his','2016-05-07'),('怀念旧友有感',23,'- 想起一年之前的毕业季,不禁感叹.那时天天酩酊大醉,互相道别,各奔东西.而今已然进入职场一年有余,兄弟们这一年过的可好?\n- 是否还能时常在脑海里浮现一块去食堂打饭,一起逃课出去喝酒,结伴上课迟到的场景?\n- 我夜里想起来还是会辗转反侧,不思量自难忘。\n\n\n>**再别康桥**\n\n>轻轻的我走了，\n正如我轻轻的来；\n我轻轻的招手，\n作别西天的云彩。\n - - -\n那河畔的金柳，\n是夕阳中的新娘；\n波光里的艳影，\n在我的心头荡漾。\n - - -\n软泥上的青荇，\n油油的在水底招摇；\n在康河的柔波里，\n甘心做一条水草！\n - - -\n那榆荫下的一潭，\n不是清泉，是天上虹；\n揉碎在浮藻间，\n沉淀着彩虹似的梦。\n - - -\n寻梦？撑一支长篙，\n向青草更青处漫溯；\n满载一船星辉，\n在星辉斑斓里放歌。\n - - -\n但我不能放歌，\n悄悄是别离的笙箫；\n夏虫也为我沉默，\n沉默是今晚的康桥！\n - - - \n悄悄的我走了，\n正如我悄悄的来；\n我挥一挥衣袖，\n不带走一片云彩。','lif','2016-05-08'),('mysql常用命令',24,'>因为装逼需要，自己搭建了个人网站（听起来高大上的样子）。需要经常鼓捣服务器，所以使用linux命令形式操作mysql变得非常有必要。简直装B100分，哈哈。\n\n** 数据库内部操作 **\n\n- 首先进入数据库：\n	- `mysql -uroot -p`\n	> 需要说明，u后面跟的root是你的用户名，p后面是密码，输入这个命令就会提示你输入密码了。\n	\n- 然后需要查看所有数据库：\n    - `show databases;`\n    \n- 使用数据库:\n	- `use databasename;`\n	> databasename 是你数据库的名字。\n	\n- 查看该数据库下所有表:\n	- `show tables;`\n	\n- 查看某个表结构:\n	-  `desc tablename;`\n	>tablename 为表名。\n	\n- 从本地导入数据库表结构及数据：\n	- `source ./databasename.sql `\n	> source 后面跟sql文件的绝对路径。\n	\n>以上都是进入数据库之后的操作。包括查看结构以及到处数据等。select 、updata等sql语句就不在这里介绍了。\n\n  - - - \n  \n ** 导出数据库 **\n \n- 把数据库 ***databasename*** 表结构及数据导出到本地某个路径。比如 导出到 ***/Users/WesternRanger/WebstormProjects/*** 里,并把导出文件命名为 ***dump.sql***：\n\n	- `mysqldump -uroot -p databasename > /Users/WesternRanger/WebstormProjects/dump.sql;`\n	\n>对sql了解很少，目前只了解到这些自己玩的时候常用的命令。后续再补上。','it','2016-05-09'),('关于a标签嵌套问题',25,'一直以来大家都提倡inline元素不嵌套block元素。这个倡议是对的。但是具体问题具体分析。\n如果类似这样：\n\n ![](http://7xp7rf.com1.z0.glb.clouddn.com/4BBCFA93-1C72-47B8-BF31-97BA1CD6CC69.png)\n \n 红色框起来的区域可以点击。明显红框内部需要很多个`div`｜｜`span`等等。 你当然可以用`div`,js来辅助实现跳转，如：\n \n       el.addEventListener(\'click\',function(){\n           window.location.href = this.getAttribute(\'data-url\');\n       },false);\n		\n个人感觉还是用`a`标签，设置`display:block;`优势很明显，\n\n- 利于seo优化；\n- 代码更加简介，易读；\n- 更好更优雅。（不喜勿喷）。\n\n问题就出在我选择了一种优雅的方式，还是上面那张图，红框我用`a`标签来实现，里面的那个蓝色标签 －技术积累，也是需要跳转的。我也用 `a`标签来实现，问题就来了。duang！！！～～～\n\n![](http://7xp7rf.com1.z0.glb.clouddn.com/9700464C-90A9-4D39-A97B-E36CD566DB6C.png)\n\n感觉世界都塌了。百思不得其解啊。\n\n再看代码：\n\n![](http://7xp7rf.com1.z0.glb.clouddn.com/8C45C40B-B647-416A-9318-4A9709E8985A.png)\n\n整个人都抓狂了。what‘s the fuck？\n\n好。让我们百度一下。\n\n![](http://7xp7rf.com1.z0.glb.clouddn.com/AB45F756-E84B-4DC0-9AC7-E83DF89A5F62.png)\n\n呵呵。我写这边文章其实就是提倡大家：***放弃百度，珍爱生命，拥护谷歌，共产党万岁！***\n\n最后，我们需要知道 ***`a`标签不能嵌套`a`标签，这样写直接违反了标准，会造成未知问题。*** 正确的改进代码就是我上面写过的那段js控制跳转的代码。\n\n        \n        \n        ','it','2016-05-11 23:57');
/*!40000 ALTER TABLE `blogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pushInfo`
--

DROP TABLE IF EXISTS `pushInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pushInfo` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `url` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `ctype` varchar(20) NOT NULL,
  `typename` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pushInfo`
--

LOCK TABLES `pushInfo` WRITE;
/*!40000 ALTER TABLE `pushInfo` DISABLE KEYS */;
INSERT INTO `pushInfo` VALUES (1,'鑫空间鑫生活','http://www.zhangxinxu.com/','site','知名博客'),(2,'大前端','http://www.daqianduan.com/','site','知名博客'),(3,'轩风阁','http://www.xuanfengge.com/','site','知名博客'),(4,'75team','http://www.75team.com/','site','知名博客'),(5,'淘宝前端团队','http://taobaofed.org/','site','知名博客'),(6,'百度fex','http://fex.baidu.com/','site','知名博客'),(7,'alloyteam','http://www.alloyteam.com/','site','知名博客'),(8,'函数式编程离我们有多远','http://www.75team.com/post/functional-how-far.html','blog','精华博客推荐'),(9,'去除inline-block元素间间距的N种方法','http://www.zhangxinxu.com/wordpress/2012/04/inline-block-space-remove-%E5%8E%BB%E9%99%A4%E9%97%B4%E8%B7%9D/','blog','精华博客推荐'),(10,'Tell Me ','http://play.baidu.com/?__m=mboxCtrl.playSong&__a=241187&__o=song/241187||playBtn&fr=-1%7C%7C-1||play.baidu.com#','music','今日音乐'),(11,'海外孤忠（你不知道的中国遗民）','https://www.douban.com/group/topic/44422470/','blog','精华博客推荐');
/*!40000 ALTER TABLE `pushInfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slide`
--

DROP TABLE IF EXISTS `slide`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `slide` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `src` varchar(200) NOT NULL,
  `url` varchar(200) NOT NULL,
  `title` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slide`
--

LOCK TABLES `slide` WRITE;
/*!40000 ALTER TABLE `slide` DISABLE KEYS */;
INSERT INTO `slide` VALUES (1,'http://7xp7rf.com1.z0.glb.clouddn.com/hs-job.jpg','/page/recruit','互联网招聘'),(2,'http://7xp7rf.com1.z0.glb.clouddn.com/hs-xiu.jpg','/page/recruit','布局'),(3,'http://7xp7rf.com1.z0.glb.clouddn.com/hs-nav.jpg','/page/recruit','前端圈子'),(4,'','','');
/*!40000 ALTER TABLE `slide` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test` (
  `author` varchar(30) DEFAULT NULL,
  `text` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test`
--

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
INSERT INTO `test` VALUES ('1','哈哈哈'),('qi.chen5','最近闲的蛋疼啊'),('qi.chen6','想想晚上吃啥'),('1','ety'),('4','sdf');
/*!40000 ALTER TABLE `test` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-05-12 18:13:37
