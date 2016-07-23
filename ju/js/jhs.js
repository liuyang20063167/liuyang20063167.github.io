'use strict'

window.onload=function () {
	
	var oBanner=document.getElementById('banner');
	var oUl=oBanner.getElementsByTagName('ul')[0];
	var aLi1=oUl.getElementsByTagName('li');
	var oOl=oBanner.getElementsByTagName('ol')[0];
	var aLi2=oOl.getElementsByTagName('li');
	var len  = aLi1.length;
	var w = aLi1[0].offsetWidth;


	oUl.addEventListener("touchstart",function(ev){
		oUl.style.transition = "none";
		var disX = ev.targetTouches[0].pageX - oUl.offsetLeft;
		function fnMove(ev){
			oUl.style.left = ev.targetTouches[0].pageX - disX + "px";
		}
		function fnEnd(){
			oUl.removeEventListener("touchmove",fnMove,false);
			oUl.removeEventListener("touchend",fnEnd,false);
			
			var n = Math.round(-oUl.offsetLeft/w);
			
			console.log(n);
			if(n < 0){
				n = 0;
			} else if(n >= len) {
				n = len - 1;
			}
			oUl.style.transition = "0.7s all ease";
			oUl.style.left = -n*w + "px";

			function tEnd(){
				oUl.style.transition = "none";
				oUl.removeEventListener("transitionend",tEnd,false);
				//alert("运动完成 当前的n：" + n);
				if(n == 7){
					oUl.style.left = "-320px";
				} else if(n == 0){
					oUl.style.left = -6*w + "px";
				}
			}	
			oUl.addEventListener("transitionend",tEnd,false);		
		}
		
		oUl.addEventListener("touchmove",fnMove,false);
		oUl.addEventListener("touchend",fnEnd,false);
		
		ev.preventDefault();
	},false);
}