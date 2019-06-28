$(function(){
	/*function IEVersion() {*/
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
        var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
        var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
        if(isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if(fIEVersion == 7) {
            	layer.alert("您的浏览器版本过低，建议使用Chrome浏览器",{
           		 yes:function(){
           			 window.location.href = "helpCh.html"
           		 }
           	 });
            } else if(fIEVersion == 8) {
            	layer.alert("您的浏览器版本过低，建议使用Chrome浏览器",{
           		 yes:function(){
           			 window.location.href = "helpCh.html"
           		 }
           	 });
            } else if(fIEVersion == 9) {
            	layer.alert("您的浏览器版本过低，建议使用Chrome浏览器",{
           		 yes:function(){
           			 window.location.href = "helpCh.html"
           		 }
           	 });
            } else if(fIEVersion == 10) {
            	layer.alert("您的浏览器版本过低，建议使用Chrome浏览器",{
           		 yes:function(){
           			 window.location.href = "helpCh.html"
           		 }
           	 });
            } else {
                //IE版本<=7
            	layer.alert("您的浏览器版本过低，建议使用Chrome浏览器",{
           		 yes:function(){
           			 window.location.href = "helpCh.html"
           		 }
           	 });
            }   
        } else if(isEdge) {
             //edge
        /*	layer.alert("您的浏览器版本过低，建议使用Chrome浏览器",{
       		 yes:function(){
       			 window.location.href = "helpCh.html"
       		 }
       	 });*/
            
        } else if(isIE11) {
        	 //IE11  
        	 layer.alert("您的浏览器版本过低，建议使用Chrome浏览器",{
        		 yes:function(){
        			 window.location.href = "helpCh.html"
        		 }
        	 });
        	
        }else{
        	//不是ie浏览器
        	
        	 
        	 
        }
  /*  }*/
})
