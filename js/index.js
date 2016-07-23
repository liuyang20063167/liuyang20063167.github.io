'use strict'

window.onload=function (){
	var oBox=document.getElementById('works-content')
	var oPrev=document.getElementById('prev');
	var oNext=document.getElementById('next');
	var oList=document.getElementById('list');
	var aLi=oList.children;
	var oTab=document.getElementById('tab');
	var aBtn=oTab.children;
	var timer2=null;
	var oTxt=document.getElementById('txt-box');
	var oP=oTxt.children[0];
	var arr=[
		'爱奇艺首页',
		'聚划算移动端rem布局',
		'美团网首页',
		'美团网--美食页',
		'京东首页',
		'美丽说首页',
		'小米网首页',
		'京东触屏版',
		'爱淘宝触屏版'
	]

	//复制一份 	
	oList.innerHTML+=oList.innerHTML;
	//算宽度
	oList.style.width=oList.children[0].offsetWidth*aLi.length+'px';
	//宽度一半
	var w=oList.offsetWidth/2;
	//this.index值修改
	var iNow=0;
	
	for(var i=0; i<aBtn.length; i++){
		aBtn[i].index=i;
		aBtn[i].onclick=function (){
			iNow=this.index;
			tab();

		};
	}
	function tab(){
		for(var i=0; i<aBtn.length; i++){
			aBtn[i].className='';

		}
		if(iNow>0){
			aBtn[iNow%aBtn.length].className='on';
			oP.innerHTML=''+arr[iNow%9]+'';
		}else if(iNow%9==0){
			aBtn[iNow%aBtn.length].className='on';
			oP.innerHTML=''+arr[iNow%9]+'';
		}
		else{
			aBtn[(iNow%aBtn.length+aBtn.length)%aBtn.length].className='on';
			oP.innerHTML=''+arr[iNow%9+9]+''	
		}		
		startMove(oList,-iNow*aLi[0].offsetWidth)

	}
	oNext.onclick=function (){
		iNow++;
		tab();
	};
	oPrev.onclick=function (){
		iNow--;
		tab();
	};
	
	var left=0;
	
	function startMove(obj,iTarget){
		var count=Math.floor(500/30);
		var start=left;
		var dis=iTarget-start;
		var n=0;
		
		clearInterval(obj.timer);
		obj.timer=setInterval(function (){
			n++;
			
			var a=1-n/count;
			left=start+dis*(1-Math.pow(a,3));
			
			if(left<0){
				//534 1068 1602 2136 2670  %2670
				//534 1068 1602 2136 0
				obj.style.left=left%w+'px';
			}else{
				//-2670 + 534 1068 1602 2136 2670  %2670
				//-2670 + 534 1068 1602 2136 0
				obj.style.left=-w+left%w+'px';
			}
			if(n==count){
				clearInterval(obj.timer);
			}
		},30);
	}

	timer2=setInterval(function(){
		iNow++;
		tab();
	},3000)

	oBox.onmouseover=function (){
		clearInterval(timer2);
	};
	oBox.onmouseout=function (){
		timer2=setInterval(function (){
			iNow++;
			tab();
		},3000);
	};

};
