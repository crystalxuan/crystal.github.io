function DirBox(){			
	this.dirbox=document.createElement("div");
	this.dirbox.id="upwrap";
	this.dir=document.createElement("div");
	this.dir.id="dirbox";
	this.btnbox=document.createElement("div");
	this.btnbox.id="dirbtn";
	var str="<input type='button' value='确定' /><input type='button' value='取消'/>";
	this.btnbox.innerHTML=str;
//	this.dirbox.css("display","none")
	this.dir.innerHTML=this.CreatList();
	this.dirbox.appendChild(this.dir);
	this.dirbox.appendChild(this.btnbox);
	document.body.appendChild(this.dirbox);
	this.confm=T.$("input",this.btnbox)[0];
	this.Init(this);
}	
	DirBox.prototype.Init = function(_this) {
		this.Open(_this);
		this.Cancel(_this);
//		this.CreatList(0);
//		this.Confirm(_this)
		this.Drag(_this);
	}
	DirBox.prototype.CreatList = function() {
//		var data=Pdata.files.filelist;
		var data=datas.files.filelist
		var arr=findChild(0);
//		console.log(arr);
		function childlist(arr){					
			var str="";
			for(var i=0;i<arr.length;i++){
				var mark;
				findChild(arr[i].id).length?mark="+":mark="-";
				str+='<li>'
						+'<h5 id="dir'+arr[i].id+'">'
						+'<input type="button" value="'+mark+'"/>'
						+'<img src="'+datas.files.fileimg[arr[i].type]+'"/>'
						+'<span>'+arr[i].name+'</span>'
						+'</h5>';
				if(findChild(arr[i].id).length){
					str+='<ul>'+childlist(findChild(arr[i].id))+'</ul>';
				}
				str+='</li>';
			}
			return str;
		}
		return childlist(arr);
	}
	DirBox.prototype.Open = function(_this) {
		var hs=T.$("h5",this.dirbox);
		T.each(hs,function(item){
			T.addEvent(item,"click",function(ev){
				ev.stopPropagation();
				if(ev.target.nodeName=="INPUT"){
					if(item.nextElementSibling){
						if(!ev.target.onoff){
							item.nextElementSibling.style.display="block";		
						}else{
							item.nextElementSibling.style.display="none";
						}
						ev.target.onoff=ev.target.onoff?false:true;
						console.log(ev.target.onoff);
					}else{
						alert("文件没有子级")
					}
				}else{
					T.each(hs,function(item){
						item.className="";
					})
					item.className="sellist";
				}
			})
		})
	}
/*	DirBox.prototype.Confirm = function(_this) {
		console.log(_this);
		T.addEvent(T.$("input",this.btnbox)[0],"click",function(){
			var sel=document.getElementsByClassName("sellist");
			console.log(sel)
			if(sel.length){
				var str=sel[0].id.substring(4);
				document.body.removeChild(_this.dirbox)
				return str;
			}else{
				alert("您还未选择文件路径");
			}
		})
	}*/
	DirBox.prototype.Cancel = function(_this) {
		T.addEvent(T.$("input",this.btnbox)[1],"click",function(){
			document.body.removeChild(_this.dirbox)
		})
	}
	DirBox.prototype.Drag= function(_this){
		T.addEvent(_this.dirbox,"mousedown",function(ev){
			var ev=ev||event;
			ev.preventDefault()
			ev.cancelBubble=true;
			var star={
				Left:_this.dirbox.offsetLeft,
				Top:_this.dirbox.offsetTop
			};
			var disx=ev.clientX-star.Left;
			var disy=ev.clientY-star.Top;
//			T.removeEvent(document,"mousedown",dragdown);
			T.addEvent(document,"mousemove",dragmove)
			T.addEvent(document,"mouseup",dragup)	
			function dragmove(ev){
				var ev=ev||event;	
				_this.dirbox.style.left=ev.clientX-disx+"px";
				_this.dirbox.style.top=ev.clientY-disy+"px";
			}
			function dragup(ev){
				T.removeEvent(document,"mousemove",dragmove);
				T.removeEvent(document,"mouseup",dragup);
			}
		})
	}
	
DirBox.prototype.FadIn=function(){
	this.dirbox.fadeIn(1000)
}
DirBox.prototype.FadOut=function(fn){
	this.dirbox.fadeOut(1000,fn)
}
//console.log(a.Confirm());