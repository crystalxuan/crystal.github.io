var Pdata={
	files:{
			/*每个文件有唯一id，
			 * id=0 根目录  id=1 为回收目录
			 *pid表示文件父级的id
			 * type表示文件类型：0 ：文件    1：文档   2：img  3：music 4.视频
			 * dat文件创建修改日期
			 * 
			 * */
		filelist:[{
				id:2,
				pid:0,
				name:"我的收藏",
				type:0,
				dat:[2016,5]
			},{
				id:3,
				pid:0,
				name:"学习",
				type:1,
				dat:[2016,5,01]
			},{
				id:4,
				pid:6,
				name:"娱乐",
				type:2,
				dat:[2016,5,02]
			},{
				id:5,
				pid:6,
				name:"软件",
				type:3,
				dat:[2016,5]
			},{	id:6,
				pid:0,
				name:"资料",
				type:4,
				dat:[2016,5]
			},
		],
		fileimg:["img/fileimg/1.png","img/fileimg/2.png","img/fileimg/3.PNG","img/fileimg/4.PNG","img/fileimg/5.PNG"],
		filereduce:[]
	}
//	,
//	contmenu:{
//		common:[{
//				name:"查看",
//				exe:function(){
//					typchange();
//			}},{	
//				name:"刷新",
//				exe:function(){
//					filebox.innerHTML="";
//					setTimeout(function(){
//						refreshash()
//					},100)
//			}},{
//				name:"粘贴",
//				exe:function(){
//					if(pasteArr.length){
//						var arr=selinfoAll(pasteArr);
//						if(arr[0].pid!=hidbox.value){
//							var newarr=T.extend(arr,true);
//							copy(hidbox.value,newarr)
//							 pushData(newarr);
//							refresh(hidbox.value)
//							pasteArr.length=0;
//						}else{
//							alert("文件已存在")
//						}
//					}else{
//						alert("粘贴板为空")
//					}
//				}
//			},{
//				name:"新建文件夹",
//				exe:function(){
//					CreatF()
//				}
//			}],
//		fil:[{
//				name:"打开",
//				exe:function(ev){
//					var id=getTarget()
//					window.location.hash="#id="+id;
//			}},{
//				name:"重命名",
//				exe:function(ev){
//					var id=getTarget()
//					console.log(id);
//					rename(id)
//			}},{
//				name:"查看",
//				exe:function(){
////					alert(1)
//					typchange();
//				}
//			},{
//				name:"复制",
//				exe:function(){
//					var id=getTarget()
//					pasteArr.push(getInfo(id))
//					pasteflag=true;
//				}
//			},{
//				name:"粘贴",
//				exe:function(){
//					var id=getTarget();
//					if(pasteArr.length){
//						var arr=selinfoAll(pasteArr);
//						var newarr=T.extend(arr,true);
//						copy(id,newarr)
//						 pushData(newarr);
//						refresh(hidbox.value)
//						pasteArr.length=0;
//					}else{
//						alert("粘贴板为空")
//					}
//				}
//			},{
//				name:"复制到",
//				exe:function(){
//					var arr=selinfo();
//					var newarr=selinfoAll(arr);
//					console.dir(newarr)
//					if(arr.length){
//						copyTo(newarr);
//					}else{
////						alert("请选择要复制的文件")
//						id=getTarget()
//						copyTo([getInfo(id)])
//					}
//			}},{
//				name:"移动到",
//				exe:function(){
//					var arr=selinfo();
//					if(arr.length){
//						moveTo(arr);
//					}else{
//						id=getTarget()
//						moveTo([getInfo(id)])
//					}
//				}}]
//	}
	
}
var Contmenu={
		common:[{
				name:"查看",
				exe:function(){
					typchange();
			}},{	
				name:"刷新",
				exe:function(){
					filebox.innerHTML="";
					setTimeout(function(){
						refreshash()
					},100)
			}},{
				name:"粘贴",
				exe:function(){
					if(pasteArr.length){
						var arr=selinfoAll(pasteArr);
						if(arr[0].pid!=hidbox.value){
							var newarr=T.extend(arr,true);
							copy(hidbox.value,newarr)
							 pushData(newarr);
							refresh(hidbox.value)
							pasteArr.length=0;
						}else{
							alert("文件已存在")
						}
					}else{
						alert("粘贴板为空")
					}
				}
			},{
				name:"新建文件夹",
				exe:function(){
					CreatF()
				}
			}],
		fil:[{
				name:"打开",
				exe:function(ev){
					var id=getTarget()
					window.location.hash="#id="+id;
			}},{
				name:"重命名",
				exe:function(ev){
					var id=getTarget()
					console.log(id);
					rename(id)
			}},{
				name:"查看",
				exe:function(){
//					alert(1)
					typchange();
				}
			},{
				name:"复制",
				exe:function(){
					var id=getTarget()
					pasteArr.push(getInfo(id))
					pasteflag=true;
				}
			},{
				name:"粘贴",
				exe:function(){
					var id=getTarget();
					if(pasteArr.length){
						var arr=selinfoAll(pasteArr);
						var newarr=T.extend(arr,true);
						copy(id,newarr)
						 pushData(newarr);
						refresh(hidbox.value)
						pasteArr.length=0;
					}else{
						alert("粘贴板为空")
					}
				}
			},{
				name:"复制到",
				exe:function(){
					var arr=selinfo();
					var newarr=selinfoAll(arr);
					console.dir(newarr)
					if(arr.length){
						copyTo(newarr);
					}else{
//						alert("请选择要复制的文件")
						id=getTarget()
						copyTo([getInfo(id)])
					}
			}},{
				name:"移动到",
				exe:function(){
					var arr=selinfo();
					if(arr.length){
						moveTo(arr);
					}else{
						id=getTarget()
						moveTo([getInfo(id)])
					}
				}}]
	}