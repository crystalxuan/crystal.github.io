/********封装的方法************/
function datRule(arr,n){ //格式化时间。
	var s = '';
	var n = n || 0;
	var aStr = ['年月日时分秒','-- ::','// ::'];
	if(n>aStr.length-1)n=aStr.length-1;
	for(var i=0; i<arr.length; i++){
		s += arr[i] + aStr[n].charAt(i);
		if(i==2&&n==0)s += ' ';
	}
	if(s.charAt(s.length-1) == '-'||s.charAt(s.length-1) == '/'){
		s = s.substring(0,s.length-1);
	}
	return s;
}
/**获取目前最大的id**/
function getMaxId() {
//	var data=Pdata.files.filelist;
	var data=datas.files.filelist;
    var maxId = data[0].id;
    for ( var i=1; i<data.length; i++ ) {
        if (data[i].id > maxId) {
            maxId = data[i].id;
        }
    }
    return maxId;
}
/**获取当前时间 返回 数组**/
function getNow(){
	var odata=new Date();
	return [odata.getFullYear(),odata.getMonth()+1,odata.getDate()];
}
/****查找重名*****/
function findrept(name,data){
	var arr=findChild(hidbox.value);
	for(var i=0;i<arr.length;i++){
		if(arr[i].name==name){//找到
			if(arr[i]!=data){//不等于自己本身
				return true;
			}
		}
	}
	return false;
}
/***新建文件夹 名字 只在新建时执行  查找页面中是否有“新建文件夹” 有则查找“新建文件夹1”，直到没有则确定 该名字*/
function randname(str){
	var arr=findChild(hidbox.value);
	var num=0;
	var newstr=str;
	function findname(){
		for(var i=0;i<arr.length;i++){
			if(arr[i].name==str){//找到重名
				return false;
			}
		}
		return true;
	}
	while(!findname()){
		num++;
		str=newstr+num;
	}
	return str;
}
/****根据ID 查找子级*****/
function findChild(id){
//	var data=Pdata.files.filelist;
	var data=datas.files.filelist;
	var arr=[];
//	data=data||Pdata.files.filelist;
	T.each(data,function(item,i){
	 	if(item.pid==id){
	 		arr.push(item);
	 	}
	 })
	return arr;
}
/***根据ID刷新内容**********/
function refresh(value,bl){//刷新内容
	filebox.innerHTML="";
	if(bl){
		refreshType(value)
		return
	}
	var arr=findChild(value);
	T.each(arr,function(item){
		 Creatfile(item)
	})
	refreshPos();
	T.$("#fnum").innerHTML=arr.length;
}
/***刷新位置*****/
function refreshPos(){
	var lis=T.$("#filebox li");
	if(!lis.length){
		return false;
	}
	if(!T.$("#typchange").flag){
		var width=lis[0].offsetWidth+30;
		var height=lis[0].offsetHeight+20;
	}else{
		var width=lis[0].offsetWidth;
		var height=lis[0].offsetHeight;
	}
	var cells =Math.floor(T.$("#filebox").offsetWidth/width)
//		console.log(width,height,T.$("#filebox").offsetWidth);
	T.each(lis,function(item,i){
		item.style.left=i%cells*width+"px";
		item.style.top=Math.floor(i/cells)*height+"px";
	})
}
/******通过id  type  name 查找符合条件的信息组*******/
/*id  返回的只有一组数据   type name 返回的可能多组
 * 
 * */
function getInfo(id){
	var data=datas.files.filelist;
//	var data=Pdata.files.filelist;
	for(var i=0;i<data.length;i++){
		if(data[i].id==id){
			return data[i]
		}
	}
}
function refreshType(type){
	var arr=[];
//	var data=Pdata.files.filelist;
	var data=datas.files.filelist;
	T.each(data,function(item,i){
	 	if(item.type==type){
//		 		arr.push(item);
			Creatfile(item)
	 	}
	 })
//		return arr;
}
/****根据ID查找父级 每个文件有且只有一个父级******/
//	function getRoot(id){
//		var data=Pdata.files.filelist;
//		
//	}
/*获取文件路径信息  返回的是信息组*/
function getroot(id){
	var obj=getInfo(id);//找到文件信息
	var arr=[];
	arr.push(obj)
	while(obj.pid){//父级pid不为零
//			id=obj.pid;
		obj=getInfo(obj.pid);
		arr.push(obj);
	}
	return arr;
}
function renderNav(id){
		var arr=[];
		if(id!=0){
			arr=getroot(id);
			arr.reverse()
		}else{
			arr.length=0;
		}
//		console.log(arr)
		var str="";
		if(arr.length){
			var ID;
			if(arr.length>=2){
				ID=arr[arr.length-2].id;
			}else{
				ID=0;
			}
			str='<a href="pan.index.html#id='+ID+'">返回上一级</a><a href="pan.index.html#id=0">全部文件></a>'
			for(var i=0;i<arr.length-1;i++){
				str+='<a href="pan.index.html#id='+arr[i].id+'">'+arr[i].name+'></a>';
			}
			str+='<span>'+arr[arr.length-1].name+'</span>';
		}else{
			str='<span>全部文件</span>';
		}
		T.$("#pathlist").innerHTML=str;
	}

/*创建文件*/
	function Creatfile(options){
		var newli=document.createElement("li");
		if(options){//有值传入 
			newli.status=false;
		}else{
			newli.status=true;//编辑状态
		}
		var options = options || {};
		options = {
			name:options.name||randname("新建文件夹"),
			id:options.id || getMaxId()+1,//新建随机id;
			pid:options.id||hidbox.value,
			type:options.type||0,//默认type为0，文件类型为文件
			dat:options.dat||getNow()
		};
//		var data=datas.files.filelist;
	//				var NAME="新建文件夹";
		var str='<div class="fileimg">'
					+'<div class="filesel">'
						+'<input type="checkbox" class="checkbtn"/>'
					+'</div>'
					+'<img src="'+datas.files.fileimg[options.type]+'"class="fimg"/>'
				+'</div>'
				+'<div class="textname">'
					+'<strong class="showname">'+options.name+'</strong>'
					+'<div class="inputname">'
						+'<input type="text" class="inptext" value="'+options.name+'"/>'
						+'<span class="bg fconcel"></span>'
						+'<span class="bg fconfirm"></span>'
					+'</div>'
				+'</div>'
				+'<div class="filedate">'
					+'<span>'+datRule(options.dat)+'</span>'
				+'</div>';
		newli.innerHTML=str;
		!T.$("#typchange").flag?newli.className="bfile":newli.className="sfile";
		newli.id=options.id;
		T.$("#filebox").appendChild(newli);
		Newhandle(newli,options)
		if(newli.status){
			T.$(".inputname",newli)[0].style.display="block";
			T.$(".showname",newli)[0].style.display="none";	
		}else{
			T.$(".inputname",newli)[0].style.display="none";
			T.$(".showname",newli)[0].style.display="block";	
		}
		refreshPos();
	}
	/*****添加事件监听  选中  确定  取消   双击打开   拖动***************/
	function Newhandle(li,options){//添加事件监听
		var checkbtn=T.$(".checkbtn",li)[0];
		var fconfirm=T.$(".fconfirm",li)[0];
		var fconcel=T.$(".fconcel",li)[0];			
		var inptext=T.$(".inptext",li)[0];
		inptext.focus();
		function confirm(li,options){
			/*查找是否重名，不重名则：1.确认名字， showname 出现      inputname隐藏
			 * 2.将数据保存到本地
			 * 重名提示：文件夹已存在，请重新命名
			 * */	
			 if(!li.status){//非新建编辑状态 
//			 	var data=Pdata.files.filelist;
				var data=datas.files.filelist;
			 	for(var i=0;i<data.length;i++){
			 		if(data[i].pid==hidbox.value){
			 			if(data[i].id!=li.id){
			 				if(data[i].name==inptext.value){
			 					alert("文件已存在")
			 					return
			 				}
			 			}
			 		}
			 	}
			 		T.$(".inputname",li)[0].style.display="none";
					T.$(".showname",li)[0].style.display="block";
					T.$(".showname",li)[0].innerHTML=inptext.value;
					getInfo(li.id).name=inptext.value;
					li.status=false;
					createbtn.onoff=true;
			 }else{
			 	if(findrept(inptext.value,options)){
					alert("文件名已存在")
				}else{
					T.$(".inputname",li)[0].style.display="none";
					T.$(".showname",li)[0].style.display="block";
					T.$(".showname",li)[0].innerHTML=inptext.value;
					options.name=inptext.value;
					if(li.status){
//						Pdata.files.filelist.push(options)
						datas.files.filelist.push(options)
					}
					li.status=false;
					createbtn.onoff=true;
				}
			 }
			T.store("baidu",datas)
			console.log(T.store("baidu"),datas);
		}
		function singleSel(li,target){
			if(target.checked){
				li.style.border="1px solid #2e80dc";
				target.style.display="block";
			}
			checksel()
		}
		T.addEvent(li,"click",singleclick)
		function singleclick(ev){
			if(ev.target==fconfirm){
				confirm(li,options)
			}else if(ev.target==fconcel){
				T.$("#filebox").removeChild(li);
				createbtn.onoff=true;
			}else if(ev.target==checkbtn){
				singleSel(li,ev.target)
			}
//			else if(ev.target==inptext){
//				return false;
//			}
//			else{
//				hidbox.value=options.id;
//				refresh(options.id);
//			}
		}
		T.addEvent(li,"dblclick",doubclick)
		function doubclick(){
			T.removeEvent(this,"click",singleclick);
			hidbox.value=options.id;
			window.location.hash="#id="+options.id;
		}
		T.addEvent(li,"mouseover",function(ev){
			if(!ev.target.nodeName=="input"){
				li.style.border="1px solid #2e80dc";
				checkbtn.style.display="block";
			}

		})
		T.addEvent(li,"mouseleave",function(){
			if(!checkbtn.checked){
				li.style.border="1px solid #fff";
				checkbtn.style.display="none";	
			}
		})	
		dragfile(li)
	}
	/**********li拖拽*************/
	/***
	 * 1.给每个LI添加拖拽
	 * 2.碰撞检测：
	 * 	--在一定范围内，碰撞的元素互换位置
	 * 	--在一定范围内，被拖拽的元素移入碰撞的元素内
	 * 	--添加动画效果
	 * *******/
	function dragfile(obj){
		T.addEvent(obj,"mousedown",function(ev){
			var ev=ev||event;
			ev.stopPropagation;
			ev.preventDefault;
			obj.style.zIndex=10;
			var star={
				Left:obj.offsetLeft,
				Top:obj.offsetTop
			};
			var disx=ev.clientX-star.Left;
			var disy=ev.clientY-star.Top;
			T.addEvent(document,"mousemove",dragmove)
			T.addEvent(document,"mouseup",dragup)		

			function dragmove(ev){
				var ev=ev||event;
				var left,top;
				ev.clientX-disx>0?left=ev.clientX-disx:left=0;
				ev.clientY-disy>0?top=ev.clientY-disy:top=0;
				ev.clientX-disx>filebox.offsetWidth-100?left=filebox.offsetWidth-100:left=ev.clientX-disx;
//				console.log(left,top);	
				obj.style.left=left+"px";
				obj.style.top=top+"px";
				var lis=T.$("li",filebox);
				T.each(lis,function(item,i){
					if(item!=obj){
						var flag=crashstat(item,20,50);
						if(flag==1){
							item.style.border="2px solid #2e80dc";
						}else if(flag==2){
							item.style.border="1px solid #2e80dc";
							
						}else{
							item.style.border="1px solid #fff";
						}
					}
				})
			}
			function dragup(){
				var lis=T.$("li",filebox);
				T.each(lis,function(item,i){
					if(item!=obj){
						var flag=crashstat(item,20,50);
						if(flag==1){
							item.style.border="2px solid #2e80dc";
							movefile(item);
						}else if(flag==2){
							item.style.border="1px solid #2e80dc";
							exchange(item);
						}else{
							item.style.border="1px solid #fff";
						}
					}
				})
				T.removeEvent(document,"mousemove",dragmove);
				T.removeEvent(document,"mouseup",dragup);
				obj.style.zIndex=1;
			}
			/*交换文件位置*/
		function exchange(obj1){
			var pos={
				l:obj1.offsetLeft,
				t:obj1.offsetTop
			}
			obj.style.left=pos.l+"px";
			obj.style.top=pos.t+"px";
			obj1.style.left=star.Left+"px";
			obj1.style.top=star.Top+"px";
			console.log(pos,obj.offsetLeft);
			
		}
		/*把obj移入obj1中*/
		function movefile(obj1){
			var id=obj.id;
			var id1=obj1.id;
			getInfo(id).pid=id1;
			 T.store("baidu",datas)
			refresh(hidbox.value)
		}
		})
		function crashstat(obj2,value1,value2){
			var pos1={
				l:obj.offsetLeft,
				t:obj.offsetTop
			}
			var pos2={
				l:obj2.offsetLeft,
				t:obj2.offsetTop
			}
			var Left=Math.abs(pos1.l-pos2.l);
			var Top=Math.abs(pos1.t-pos2.t);
			if(Left<value1&&Top<value2){
				return 1;
			}else if(Left<value2&&Top<value2){
				return 2;
			}
			return false;
		}
	}
	/************拖拽生成选框 碰撞选中文件**********/
	T.addEvent(document,"mousedown",function(ev){
	var disx=ev.clientX;
	var disy=ev.clientY;
	var lis=T.$("li",filebox);
	ev.preventDefault();
	for(var i=0;i<lis.length;i++){
		var pos=T.getEleRect(lis[i]);
		if(disx>pos.left&&disx<pos.right&&disy>pos.top&&disy<pos.bottom){
			return false;
		}
	}

	var dragbox=document.createElement("div");
	document.body.appendChild(dragbox);
	dragbox.className="dragbox";			
	T.addEvent(document,"mousemove",DmoveEvent)
	T.addEvent(document,"mouseup",DupEvent)			
	function DmoveEvent(ev){
		var w=disx-ev.clientX;//位置差 宽度
		var h=disy-ev.clientY;//位置差 高度
		if(Math.abs(w)>20||Math.abs(h)){//限定移动范围大于20px则判定为移动
			var Left,Top;
		var lis=T.$("li",filebox);
		dragbox.style.width=Math.abs(w)+"px";
		dragbox.style.height=Math.abs(h)+"px";
		w>0?Left=ev.clientX:Left=disx;
		h>0?Top=ev.clientY:Top=disy;
		dragbox.style.top=Top+"px";
		dragbox.style.left=Left+"px";
		T.each(lis,function(item,i){
			if(T.collisionRect(dragbox,item)){
				T.$(".checkbtn",item)[0].checked=true;
				item.style.border="1px solid #2e80dc";
				T.$(".checkbtn",item)[0].style.display="block";
			}else{
				T.$(".checkbtn",item)[0].checked=false;
			}
		})
		checksel()
	}	
	}
	function DupEvent(){
		T.removeEvent(document,"mousemove",DmoveEvent);
		T.removeEvent(document,"mouseup",DupEvent);
		document.body.removeChild(dragbox)
	}

})

	/*****根据checkbox的选中情况处理相关参数*******/
	function checksel(){
		var check=T.$(".checkbtn",filebox);
		var checknum=0;
		T.each(check,function(item,i){
			if(item.checked){
				checknum++;
			}
		})
		checknum==check.length?T.$("#selAll").checked=true:T.$("#selAll").checked=false;//判断全选
		T.$("#filenum").innerHTML=checknum;
}
function showcontmenu(ev,data){
//	console.dir(data)
	var contmenu=T.$("#contmenu");
	if(!T.$("#contmenu")){
		var contmenu=document.createElement("ul");
		contmenu.id="contmenu";
	}
//	var str="";
	contmenu.innerHTML="";
	contmenu.style.left=ev.clientX+"px";
	contmenu.style.top=ev.clientY+"px";
	T.each(data,function(item){
		var li=document.createElement("li");
		li.innerHTML=item.name;
		T.addEvent(li,"click",item.exe)
		console.log(item.exe);
		contmenu.appendChild(li);
	})
	document.body.appendChild(contmenu);
}
function removecontmenu(){
	var contmenu=T.$("#contmenu");
	if(contmenu){
		document.body.removeChild(contmenu)
	}
}
function moveTo(arr){
	var a=new DirBox();
	a.Confirm=function(arr){
		T.addEvent(a.confm,"click",function(){
			var sel=a.dir.getElementsByClassName("sellist");
			if(sel.length){
				var id=sel[0].id.substring(3);
				T.each(arr,function(item){
					if(item.id==id){
						alert("移动错误")
					}else{
						item.pid=id;	
					}
				})
				refresh(hidbox.value)
				 T.store("baidu",datas)
				document.body.removeChild(a.dirbox)
			}else{
				alert("您还未选择文件路径");
			}
		})
	}
	a.Confirm(arr);
}
function copyTo(arr){
	var b=new DirBox();
	console.log(arr)
	b.Confirm=function(arr){
		T.addEvent(b.confm,"click",function(){
			var sel=b.dir.getElementsByClassName("sellist");
			if(sel.length){
				var id=sel[0].id.substring(3);
				var newarr=T.extend(arr,true)
				console.log(newarr);
				copy(id,newarr)
				 pushData(newarr);
				 T.store("baidu",datas)
				refresh(hidbox.value)
				document.body.removeChild(b.dirbox)
			}else{
				alert("您还未选择文件路径");
			}
		})
	}
	b.Confirm(arr);
}
/*******信息复制*******/
/*1.复制选中文件及其所有子级（深度）
 *2.修改ID PID（这里取个巧，由于push信息的时候 最后一位为选中信息，
 * 则统一个信息组给ID PID 后 改选中信息的pid即可）  这里采用给id pid统一加一个目前最大ID
 *3.push到数据
 * 4.刷新
 * */
function copy(id,arr){
	var pid=arr[arr.length-1].id;
	var max=getMaxId();
	for(var i=0;i<arr.length;i++){
		arr[i].id=arr[i].id+max;
		arr[i].pid=arr[i].pid+max;
	}
	arr[arr.length-1].pid=id;
}
/******将一组展开的信息复制到ID组********/
/*function Copy(id,arr){
	function findOrig(a){
		for(var j=0;j<arr.length;j++){
			if(arr[i].pid==arr[j].id){//有父级
				return false;
			}
		}
		return true;
	}
	var parent;
	for(var i=0;i<arr.length;i++){
		if(findOrig(arr[i])){
			parent=arr[i];
			break;
		}
	}
	console.log(parent);
	function findC(id,arr){
		var arr=[];
		T.each(arr,function(item){
			if(item.pid==id){
				arr.push(item)
			}
		})
		return arr;
	}
	changeID(parent)
	parent.pid=id;
	function changeID(p,num){
		num=num||1;
		var newid=getMaxId()+num;
		if(findC(p.id).length){
			T.each(findC(p.id),function(item){
				item.pid=newid;
				num++;
				changeID(item,num)
//				item.id=newid;
			})
		}
		p.id=newid;
	}

}*/
/**把一组树形信息复制到id组***/
//function Copy(id,arr,num){
//	num=num||1;
//	T.each(arr,function(item){
//		var newid=getMaxId()+(num++);
//		if(item.child){
//			Copy(newid,item.child,num)
//		}	
//		item.self.id=newid;
//		item.self.pid=id;
//	})
//}
/*function Copy(id,arr){
	T.each(arr,function(item){
		var newid=getMaxId()+1;
//		if(item.child){
//			Copy(newid,item.child)
//		}	
		for(var i=0;i<arr.length;i++){
			
		}
		item.id=newid;
		item.pid=id;
	})
}*/
/******选中文件深度查找********/
function selinfoAll(arr){
	var newarr=[];
	T.each(arr,function(item){
		console.log(findChild(item.id));
		if(findChild(item.id).length){
			newarr=newarr.concat(selinfoAll(findChild(item.id)))
		}	
		newarr.push(item)
	})
	return newarr;
}


/*****选中文件树形查找*****/
//function selinfoAll(arr){
//	var newarr=[];
//	T.each(arr,function(item){
//		console.log(findChild(item.id));
//		var obj={};
//		if(findChild(item.id).length){
////			newarr=newarr.concat(selinfoAll(findChild(item.id)))
//			obj.child=selinfoAll(findChild(item.id));
//		}	
//		obj.self=item;
//		newarr.push(obj)
//	})
//	return newarr;
//}
//function pushData(arr){
//	for(var i=0;i<arr.length;i++){
//		Pdata.files.filelist.push(arr[i].self);
//		if(arr[i].child)
//	}
//}
//function pushData(arr){
//	for(var i=0;i<arr.length;i++){
//		Pdata.files.filelist.push(arr[i].self);
//		if(arr[i].child){
//			pushData(arr[i].child)
//		}
//	}
//}
function pushData(arr){
	for(var i=0;i<arr.length;i++){
//		Pdata.files.filelist.push(arr[i]);
		datas.files.filelist.push(arr[i]);
	}
}
/****查看*******/
function typchange(){
		var TC=T.$("#typchange");
		var span=T.$("span",TC)
//		console.log(span);
		if(!TC.flag){
			span[0].style.backgroundPositionY="-131px";
			span[1].style.backgroundPositionY="-131px";
		}else{
			span[0].style.backgroundPositionY="-102px";
			span[1].style.backgroundPositionY="-102px";
		}
		TC.flag?TC.flag=!TC.flag:TC.flag=true;
		refresh(hidbox.value)
	}
/*****刷新******/
function refreshash(){
	var hash=window.location.hash;
	if(hash==""){
		hash="#id=0";
	}
	hash=hash.substring(1);
	console.log(hash);
	var arr=hash.split("=");
	if(arr[0]=="t"){//根据type加载文件
		refresh(arr[1],true)
	}else{
		refresh(arr[1])
		hidbox.value=arr[1];
		if(arr[1]){
			renderNav(arr[1]);
		}
	}
}
/*****新建*******/
function CreatF(){
	if(createbtn.onoff){
		Creatfile()
		createbtn.onoff=false;
	}else{
		alert("请先完成编辑")
	}
}
/******右击获取对象*******/
function getTarget(){//右键获取文件对象
	var ID;	
	var pos1=T.getEleRect(T.$("#contmenu"));
	var lis=T.$("li",filebox)
	T.each(lis,function(item){
		var pos2=T.getEleRect(item)
		if(pos1.left>pos2.left&&pos1.left<pos2.right&&pos1.top>pos2.top&&pos1.top<pos2.bottom){
			ID=item.id;
		}
	})
	console.log(ID)
	return ID;
}

function selinfo(){
	var arr=[];
	var lis=T.$("li",filebox)
	T.each(lis,function(item){
		if(T.$(".checkbtn",item)[0].checked){
			arr.push(getInfo(item.id))
		}
	})
	console.log(arr)
	return arr;
}
function rename(id){
	console.log(id);
	var lis=T.$("li",filebox);
	var ele;
	for(var i=0;i<lis.length;i++){
		if(lis[i].id==id){
			ele=lis[i];
		}
	}
//	console.log(ele);
	var name=T.$(".showname",ele)[0];
	T.$(".inputname",ele)[0].style.display="block";
	T.$(".showname",ele)[0].style.display="none";
	T.$(".inputname",ele)[0].value=name;
	T.$(".inputname .inptext",ele)[0].focus();
	console.log(T.$(".inputname .inptext",ele)[0]);
	ele.status=false;
	createbtn.onoff=false;
}
