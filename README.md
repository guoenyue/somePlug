# 一些自己写的开发小工具
---
>	暂时只先写那个util工具里边的简单介绍吧，其实总共就1个需要介绍的目前为止

##  Json2HTML

>	自己看吧，前端都懂得:)
	
	1.需要说明就是`class`、`id`等属性的设置也可以通过自定义属性设置方式设置
	2.~~~该函数只能操作双标记标签，单标记标签请选择直接在children中写字符串的方式添加~~~
	3.已经将第二条修复

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
	</body>

```
>  增加单标记标签的识别标记，通过`singleTag`,当该属性为`true`时，则该元素为单标记元素，

