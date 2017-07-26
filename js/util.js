/*
``````````````````
利用原生js封装自己Dom库，因为用了es5所以不考虑ie8以下的浏览器版本，
使用时候请注意这一点。用法就是直接函数调用，当然不会像jq那么强大，但
比jq精简，虽然现在已经不流行操作dom了，但是用来练手还是可以的。
``````````````````
*/



function g(id){
			return document.getElementById(id);
};

function addClass(obj,className){
	obj.className+=(hasClass(obj,className)?'':(" "+className));
	return obj;
};

function removeClass(obj,className){
	var reg="\\b"+className+"\\b";
	obj.className=obj.className.replace(new RegExp(reg,"ig"),'').trim();
	return obj;
};

function hasClass(obj,className){
	var reg="\\b"+className+"\\b";
	obj.className=obj.className.trim();
	return new RegExp(reg,"ig").test(obj.className);
};

function toggleClass(obj,className){
	return hasClass(obj,className)?removeClass(obj,className):addClass(obj,className);
};


function siblings(obj,nodeName){
	var context=null;
	var ret=[];
	if(obj.parentNode){
		context=obj.parentNode;
		var sibs=context.children||context.childNodes;
		for(var i=0,cur;cur=sibs[i++];){
			if(cur.nodeType==1&&cur!==obj){
				nodeName?((cur.nodeName.toLowerCase()==nodeName.toLowerCase())?ret[ret.length]=cur:undefined):ret[ret.length]=cur;
			}
		}
		sibs=cur=i=context=null;
	}
	return ret;
};


function each(obj,cb){
	if(obj instanceof Array){
		for(var i=0,cur;cur=obj[i++];){
			cb.call(null,cur,i-1,obj);
		}
	}else if(isJSON(obj)){
		for(var k in obj){
			cb.call(null,k,obj[k],obj);
		}
	}
}

function myRandom(min,max){
	return Math.round(Math.random()*Math.abs(max-min))+(max>min?min:max);
};


function Json2Arr(json,keyName,valName){
	keyName=keyName||"key";
	valName=valName||"val";
	var ret=[];
	for(var k in json){
		var tmp={};
		tmp[keyName]=k;
		tmp[valName]=json[k];
		ret[ret.length]=tmp;
		tmp=null;
	}
	return ret;
}

function ajax(options){
	options=options||{};
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if(xhr.readystate==4&&/[23]\d{2}/.test(xhr.status)){
			var response=xhr.responseText;
			if(options.dataType&&options.dataType.toLowerCase()=="json"){
				response=JSON.parse(response);
			}
			options.callback&&options.callback.call(xhr,response);
		}else{
			options.fail&&options.fail.call(xhr);
		}
	}
	/*get方式，请求数据处理*/
	var url=options.data&&(options.type&&options.type.toLowerCase()=="get")?options.url+"?"+options.data:options.url;

	xhr.open(options.type||"get",url,options.async||true);

	xhr.send((options.type&&options.type.toLowerCase()=="post")?options.data:undefined);
}

function isJSON(obj){
	return typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
}

/*
	json:{
			tagName:body,
			className:"body",
			id:"index",
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
							children:"我是一个小小的石头"
						}
					]
				},
				{
					tagName:"span",
					className:"span",
					id:"span"
				}
			]
		}

	==>

	<body class='body' id='index'>
		<div class='box1' id='box1'>
			<p class='desc' id='desc'>我是一个小小的石头</p>
		</div>
		<span class='span' id='span'></span>
	</body>

*/

function Json2HTML(json){
	json=json||{singleTag:false};
	var domStr='';
	var subChildStr='';
	var _data='';

	//遍历回调添加新属性
	if(json.data&&json.data instanceof Array&&json.data.length>0){
		for(var i=0,cur;cur=json.data[i++];){
			//console.log(cur);
			_data+=' '+cur["dataKey"]+'="'+cur["dataVal"]+'"';
		}
	}else if(isJSON(json.data)){
		for(var k in json.data){
			_data+=' '+k+'="'+json.data[k]+'"';
		}
	}
	//遍历回调添加子元素
	if(json.children&&json.children instanceof Array&&json.children.length>0){
		for(var i=0,cur;cur=json.children[i++];){
			subChildStr+=Json2HTML(cur);
		}
	}else if(typeof json.children=="string"){
		subChildStr=json.children;
	}

	domStr+='<'+json.tagName+(json.className?(' class="'+json.className+'"'):'')+(json.id?(' id="'+json.id+'"'):'')+_data+(json.singleTag?'/>':('>'+subChildStr+'</'+json.tagName+'>'));
	return domStr;
}


