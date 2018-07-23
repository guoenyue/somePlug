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
//取qs特定项目的值
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
//取cookie特定项目的值
/*
	所用到的核心正则与GetQueryString差不多，可以说在任何有规律的字符串中选某项的值
	都可以通过修改这个正则表达式来实现目的。
	另需要注意的是这个函数中有一个cookie的坑就是document.cookie取到的值会将每个分
	号分割的项目插入一个空格，所以需要先去掉空格再去匹配，或者在匹配的时候将空格
	算到匹配项目中。这里不推荐将空格加入匹配项目，使用了在匹配之前将空格滤掉。
*/
function getCookie(cookie){
	var name=cookie;
	if(!name)return "";
	var cookies=trim(document.cookie,true);
	var reg = new RegExp("(^|;)" + name + "=([^;]*)(;|$)");
	var ret=cookies.match(reg);
	if (ret != null) return unescape(ret[2]); return null;
}
function setCookie(cookieName,cookieCont,config){
	var _config=config;
	var exp='';
	if(_config){
		exp=";";
		exp+="expires="+_config.time;
		exp+="domain="+_config.domain;
	}
	document.cookie=cookieName+"="+cookieCont+exp;
}
/*
	trim方法没什么好说，提一下第二个参数，参数含义是是否去掉所有的空格(两端及行内)
*/
function trim(str,all){
	if(!str)return '';
	var regBothEnds=/(^\s+|\s+&)/ig;
	var regAll=/\s+/ig;
	var reg=all&&regAll||regBothEnds;
	return str.replace(reg,"");
}
/* 替换双标记标签 */
function replaceTag(str,newTag,oldTag){
	var reg_all=new RegExp("<("+oldTag+"\\w*| [^"+oldTag+"]\\w*)(.*?)>(.*?)</\\1>","ig");
	str=str.replace(reg_all,"【TagStart】$2【TagEnd】$3【End】");
	return str.replace(/【TagStart】/g,"<"+newTag).replace(/【TagEnd】/g,">").replace(/【End】/g,"</"+newTag+">");
}
/* 检测数组包含 */
function contains(arr1,arr2){
	if(!isArray(arr1)||!isArray(arr2)){try{return false;}catch(e){throw new Error("两个都必须是数组")}}
	var tmp1=arr1,tmp2=arr2;
	return arr1.some(item=>arr2.indexOf(item)>-1);
}
function isArray(arr){
	return arr instanceof Array;
}
/* 归并排序 */
function mergeSort(arr){
    return mergeSortRec(arr);
}
function mergeSortRec(arr){
    var len=arr.length;
    if(len==1)return arr;
    var cen=parseInt(arr.length/2);
    var leftArr=arr.slice(0,cen);
    var rightArr=arr.slice(cen);
	return mergeArr(mergeSortRec(leftArr),mergeSortRec(rightArr));
	/* 这边的归并是递归函数不要忘记处理 */
}
function mergeArr(arr1,arr2){
	var ia=0,ib=0,result=[];
	/* 第一个while循环是核心内容 */
    while(ia<arr1.length&&ib<arr2.length){
        switch(true){
            case arr1[ia]<arr2[ib]:
                result[result.length]=arr1[ia++];
            break;
            case arr1[ia]>arr2[ib]:
            default:
                result[result.length]=arr2[ib++];
            break;
        }
    };
    while(ia<arr1.length){
		result[result.length]=arr1[ia++];
		/* 此处的指针记得递增不要忘记 */
    }
    while(ib<arr2.length){
		result[result.length]=arr2[ib++];
		/* 此处的指针记得递增不要忘记 */
    }
    return result;
}