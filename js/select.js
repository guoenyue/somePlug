function numSelect(options){
			options=options?options:{};
			var defaultNum=options.num||0;
			var that=this;
			this.num=defaultNum;
			this.desBtn=null;
			this.addBtn=null;
			this.panal=options.cont&&document.getElementById(options.cont)||document.body;
			this.wrapper=null;
			this.numcont=null;
			this.numinput=null;
			this.callback=options.callback||function(){};
			this.init();
		}
		numSelect.prototype.init=function(){
			var that=this;
			var frag=document.createDocumentFragment();
			var desBtn=document.createElement("span");
			this.desBtn=desBtn;
			this.desBtn.className="btn btn-des";
			this.desBtn.onclick=function(e){
				that.num--;
				that.num=that.num<0?0:that.num;
				that.setNum();
				that.callback.apply(that,arguments);
			};
			this.addBtn=document.createElement("span");
			this.addBtn.className="btn btn-add";
			this.addBtn.onclick=function(e){
				that.num++;
				that.setNum();
				that.callback(that.num);
			};
			this.numcont=document.createElement("span");
			this.numcont.className="num-cont";
			this.numcont.innerHTML=this.num;
			this.numcont.ondblclick=function(){
				this.style.display="none";
				that.numinput.value=parseInt(this.innerHTML);
				that.numinput.style.display="inline-block";
			}
			this.setNum=function(){
				this.numcont.innerHTML=this.num;
			}
			this.numinput=document.createElement("input");
			this.numinput.type="number";
			this.numinput.className="num-input";
			this.numinput.ondblclick=function(){
				this.style.display="none";
				that.num=parseInt(this.value);
				that.numcont.innerHTML=this.value;
				that.numcont.style.display="inline-block";
				that.callback(that.num);	
			}
			this.wrapper=document.createElement("div");
			this.wrapper.className="btn-num-item";
			this.wrapper.appendChild(this.desBtn);
			this.wrapper.appendChild(this.numcont);
			this.wrapper.appendChild(this.numinput);
			this.wrapper.appendChild(this.addBtn);
			frag.appendChild(this.wrapper);
			this.panal.appendChild(frag);
			frag=null;
			this.getNum=function(){
				return this.num;
			}
		}