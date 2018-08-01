function Cart(wrapper,config,data){
    var selectAllStatus=false;
    var that=this;
    this.wrapper=$(wrapper);
    this.products=[];
    initCart(data);
    function initCart(_data){
        for(var i=0;i<_data.length;i++){
            that.products[i]=new Product(_data[i],that);
        }
    };
    this.getSelectAllStatus=function(){
        for(var i=0,curPort;curPort=this.products[i];){
            i=curPort.select&&(i++,selectAllStatus=true,i)||(selectAllStatus=false,this.products.length);
        }
        return selectAllStatus;
    }
    this.getSelectStatus=function(){
        return selectAllStatus;
    }
}

Cart.prototype={
    constructor:Cart,
    addProduct:function(item){
        console.log(item);
    },
    removeProduct:function(item){
        console.log(item);
    },
    calcTotalVal:function(){
        var totalVal=0;
        for(var i=0,curPort;curPort=this.products[i++];){
            totalVal+=curPort.calcProductsCost();
        }
        return totalVal;
    },
    toggleSelectAll:function(){
        var selectStatus=this.getSelectStatus();
        for(var i=0,curPort;curPort=this.products[i++];){
            curPort[selectStatus&&"cancelSelect"||"ensureSelect"]();
        }
    },
    changeSelectStatus:function(){

    },
    showAllPro:function(){
        console.log(this.products);
    },
    renderAll:function(){
        for(var i=0,curPort;curPort=this.products[i++];){
            curPort.render();
        }
    }
};

function Product(data,cart){
    var that=this;
    var defaultOpt={value:0,count:0,min:0,discount:null,select:false};
    var dataOpt=myCopy(defaultOpt,data,true)
    cart=isObject(cart)&&cart||{};
    this.cart=cart;
    this.container=$("<li class='cart-item'></li>");
    this.value=dataOpt.value;
    this.count=dataOpt.count;
    function init(){
        that.render(dataOpt);
    }
}

Product.prototype={
    constructor:Product,
    render:function(){
        typeof this.cart.addProduct=="function"&&this.cart.addProduct(this);
    },
    calcProductsCost:function(){
        return this.value*this.count;
    },
    selectToggle:function(){
        this.select=!this.select;
        this.cart.toggleSelectAll();
    },
    cancelSelect:function(){
        this.select=false;
    },
    ensureSelect:function(){
        this.select=true;
    },
    edit:function(){

    },
    freshDom:function(){

    },
    delete:function(){
        typeof this.cart.removeProduct=="function"&&this.cart.removeProduct(this);
    },
};

var myCart=new Cart('',null,[{value:2,count:2},{value:3,count:3},{value:2,count:4}]);

function isObject(o){
    return typeof o=="object";
}
function isArray(arr){
    if(typeof Array.isArray!=="undefined"){
        isArray=function(arr){
            return Array.isArray(arr);
        }
    }else{
        isArray=function(arr){
            return isObject(arr)&&Object.prototype.toString.call(arr)==="[object Array]";
        }
    }
    return isArray(arr);
}

function myExtend(obj){
    return classFactory(obj);
}

function myCopy(tar,cur,deeply){
    for(var i in cur){
        if(cur.hasOwnProperty(i)){
            if(isObject(cur[i])&&deeply){
                var tmp=isArray(cur[i])&&[]||{};
                tar[i]=myCopy(tmp,cur[i],true);
            }else{
                tar[i]=cur[i];
            }
        }
    }
    return tar;
}

function classFactory(o){
    function F(){};
    F.prototype=o;
    F.prototype.constructor=F;
    F.uber=o;
    return F;
}

