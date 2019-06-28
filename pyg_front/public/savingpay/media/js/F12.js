	//屏蔽右键菜单
	document.oncontextmenu = function (event){
		if(window.event){
		event = window.event;
		}try{
		var the = event.srcElement;
		if (!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")){
		return false;
		}
		return true;
		}catch (e){
		return false;
		}
		}
	/*F12被禁用;*/
	document.onkeydown = function(){

	    if(window.event && window.event.keyCode == 123) {
	       /* alert("F12被禁用");*/
	        event.keyCode=0;
	        event.returnValue=false;
	    }
	    /*if(window.event && window.event.keyCode == 13) {
	        window.event.keyCode = 505;
	    }
	    if(window.event && window.event.keyCode == 8) {
//	      alert(str+"\n请使用Del键进行字符的删除操作！");
	        window.event.returnValue=false;
	    }*/

	}