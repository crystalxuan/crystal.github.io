T.addEvent(document,"mousedown",dragdown)
function dragdown(ev){

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
	}
