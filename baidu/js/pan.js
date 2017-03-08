(function(){
	objCss();
	window.onresize=function(){
		objCsobjCsss();
	}
	var user=sessionStorage.lixuan;
	if(user==null){
		alert("请先登陆")
		setTimeout(function(){
			window.location.href="yunload.html";
		},500)
	}
	user=JSON.parse(user);
	
	T.$("#user").innerHTML="亲爱的用户："+user.name.substring(0,2)+"***"+user.name.substring(user.name.length-1,user.name.length);
	window.datas=T.store("baidu");
	console.log(datas);
	if(datas&& !datas.files){//没有数据则存储数据
		T.store("baidu",Pdata)
		datas=Pdata;
	}
//	console.log(T.store("baidu"));
	console.log(datas);
//	console.log(window.datas);
	var filebox=T.$("#filebox");
	window.createbtn=T.$("#createF");
	var hidbox=T.$("#hidbox");
	var clicknum=0;
	var clicktimer=null;
	var selAll=T.$("#selAll");
	var lis=T.$("li",filebox)
	window.pasteArr=[];
//	var navarr=[]
	createbtn.onoff=true;
	objCss();
	/******根据hash值刷新页面********/
	window.onhashchange=refreshash;
	
	window.onresize=function(){
		objCss();
	}
	T.each(T.$(".panleft .bg"),function(item,i){//修改左侧list图标
		item.style.backgroundPositionY=-21*i+"px";
	})
	function objCss(){//设置尺寸
		var w=document.documentElement.clientWidth;
		var h=document.documentElement.clientHeight;
		T.$("#pan").style.height=h+"px";
		T.$("#cont").style.height=h-50+"px";
		T.$("#panCont").style.width=w-250+"px"//设置右侧内容区域的宽度
		T.$("#filebox").style.height=h-200+"px";
	}
	/******全选按钮**********/
	T.addEvent(selAll,"click",function(){
		var check=T.$(".checkbtn",filebox);
		var _this=this;
		T.each(check,function(item){
			item.checked=_this.checked;
			item.style.display="block";
			T.parents(item,"li").style.border="1px solid #2e80dc";
//			console.log(T.parents(item,"li"))
		})
		this.checked?T.$("#filenum").innerHTML=check.length:T.$("#filenum").innerHTML=0;
	})
	T.addEvent(createbtn,"click",CreatF)
	/*******切换查看模式*********/
	T.addEvent(T.$("#typchange"),"click",typchange)
	
	
	/****删除文件
	 * 1.是否有选中的文件
	 * 2.是否删除---进入回收站
	 * 这里只是做了简单处理 把删除的文件的PID 改为回收站的ID ，实际考虑给文件信息mark状态 且给文件的子级每个文件都标志废弃
	 * **********/
	T.addEvent(T.$("#delbtn"),"click",function(){
		var arr=selinfo();
		console.log(arr);
		if(!arr.length){
			alert("请选择要删除的文件")
			return
		}else{
			T.each(arr,function(item){
				item.pid=1;
			})
		}
		 refresh(hidbox.value)
	})
	
	
	/******/
	
	refresh(0);
	T.$("#moveTo").onclick=function(){
		var arr=selinfo();
		if(arr.length){
			moveTo(arr);
		}else{
			alert("请选择要移动的文件")
		}
	}
	T.$("#copyTo").onclick=function(){
		var arr=selinfo();
		var newarr=selinfoAll(arr);
		console.dir(newarr)
		if(arr.length){
			copyTo(newarr);
		}else{
			alert("请选择要复制的文件")
		}
	}
//	document.oncontextmenu
	T.addEvent(filebox,"contextmenu",function(ev){
		ev.preventDefault();
//		if(ev.target)
//		console.log(ev.target);
		if(ev.target.id=="filebox"){
//			showcontmenu(ev,Pdata.contmenu.common)
			showcontmenu(ev,Contmenu.common)
		}else{
//			showcontmenu(ev,Pdata.contmenu.fil)
			showcontmenu(ev,Contmenu.fil)
		}
	})
	T.addEvent(document,"click",function(ev){
		removecontmenu(ev)
	})
})()
