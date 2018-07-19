# 一些自己写的开发小工具
---
>	暂时只先写那个util工具里边的简单介绍吧，其实总共就1个需要介绍的目前为止

##  Json2HTML

>	自己看吧，前端都懂得:)
	
	1.需要说明就是`class`、`id`等属性的设置也可以通过自定义属性设置方式设置
	~~~  2.该函数只能操作双标记标签，单标记标签请选择直接在children中写字符串的方式添加  ~~~
	3.已经将第二条修复
	4.新增json格式添加属性值

```javascript

	json:{
		//标签名
		tagName:body,
		//类名
		className:"body",
		//id名
		id:"index",
		//该元素下边的子元素(children对应是子元素数组)
		children:[
			{	
				tagName:"div",
				className:"box1",
				id:"box1",
				children:[
					{	
						tagName:"p",
						className:"desc",
						id:"desc",
						//如果children是一个字符串，那么将作为该元素的唯一文本子元素
						children:"我是一个小小的石头"
					},
                    {
                        tagName:'a',
                        //自定义属性名，该值对应的是一个对象数组，对象的dataKey是自定义属性的键，dataVal对应的是自定义属性的值，也可以通过这个接口添加id，class等固定属性
                        data:[{dataKey:"href",dataVal:"http://www.baidu.com"},{dataKey:"class",dataVal:"aaa"}],
                        children:"www.baidu.com"
                    }
				]
			},
			{
				tagName:"span",
				className:"span",
				id:"span"
			},
			{
				tagName:"input",
				data:[{dataKey:"type",dataVal:"text"}],
				singleTag:true
			},
			{
				tagName:"span",
				data:{name:"dd",id:"sss",style:"color:#f00"}
			}
		]
	}


```


```html

	<body class='body' id='index'>
		<div class='box1' id='box1'>
			<p class='desc' id='desc'>我是一个小小的石头</p>
			<a class="aaa" href="http://www.baidu.com">www.baidu.com</a>
		</div>
		<span class='span' id='span'></span>
		<input type="text">
		<span name="dd" id="sss" style="color:#f00"></span>
	</body>

```
>  增加单标记标签的识别标记，通过`singleTag`,当该属性为`true`时，则该元素为单标记元素，

## 正则替换标签

```javascript

	//替换特定标签，比如a标签
	var reg=/<(a| [^a]\w*)(.*?)>(.*?)<\/\1>/ig;
	/*
		在正则表达式中，所有的括号内容项，均可以被RegExp.$[index]匹配到index为从1-9准确数值,即匹配对应索引的括号，从1开始而不是0
		在上边这种形式的正则表达式中，被转义的1可以代表正则当中第一个匹配到的括号中的内容，也就是相当于RegExp.$1,同理被转义1-9；
		(.*?)这个匹配任意存在的内容，且不存在也不影响
		在正则表达式中?!(匹配内容)为剔除匹配项
	*/

	//替换任意标签，通过传入参数
	var reg_all=new RegExp("<("+tag+"| [^"+tag+"]\\w*)(.*?)>(.*?)</\\1>","ig");
	/*
		注意使用上边这种形式的正则表达式定义的时候因为在字符串中的反斜杠也会被转义处理，所以应该二次转义
		反倒是在这种形式中的斜杠会被正则实例化的时候自动转义，所以我们在字符串中可以直接书写斜杠
		在这种定义的方式下不能使用es6的模版字符串拼接否则报错
	*/
```