
(function antku_ini(){
	var blks = getElementsByClassName('block','div',document);	
	var i
	
	i = 0
	while(i<blks.length){		
		var bid = blks[i].id.split('_');
		bid = bid[1];		
		bindBlock(bid);
		i++;
	}

	var lays = getElementsByClassName('layer','div',document);
	i = 0
	while(i<lays.length){
		var lid = lays[i].id.split('_');
		lid = lid[1];
		bindLayer(lid);
		i++;
	}

	var lays = getElementsByClassName('layer','div',document);
	i = 0;

	while(i<lays.length){
		if(lays[i].id.indexOf('layer_')>-1){
			var tmp = lays[i].id.split('layer_');
			var laid = tmp[1];
			if(arrIndexOf(Layers,laid) == null){
				Layers.push({'id' : laid,'c' : 1})
			}else{				
				if($('a'+laid+'_laynum')){					
					Layers[arrIndexOf(Layers,laid)].c = $('a'+laid+'_laynum').value					
				}				
			}
		}
		i++;
	}
/*
���ܣ�doClick��doDblClick��firstClick  3�����ʵ�ֵ�����˫���Ĳ�ͬ��Ϊ
doDblClick:�������ӽڵ㣻doClick:˫�����ٽڵ�
*/
doClick = function (o){	
	o.setAttribute('dbl',0)
	var bl = document.createTextNode(' ')
	var pr = getPreviousSibling(o)
	var cl = pr.cloneNode(true)			

	cl.className = cl.className.replace(/[\s]*base[\s]*/g,' ')
	setInnerALink(cl)
	//o.parentNode.insertBefore(bl,o)
	o.parentNode.insertBefore(cl,o)
	dblClickTm = 0
}
/*
���ܣ�doClick��doDblClick��firstClick  3�����ʵ�ֵ�����˫���Ĳ�ͬ��Ϊ
doDblClick:�������ӽڵ㣻doClick:˫�����ٽڵ�
*/
doDblClick = function(o){
	window.clearTimeout(dblClickTm)
	o.setAttribute('dbl',0)
	var pr = getPreviousSibling(o)
	//alert(pr.className)
	if(pr.className.indexOf('base')==-1){		
		pr.parentNode.removeChild(pr)
	}
}
/*
���ܣ�doDblClick��doClick��ǰ�ú�����3�����ʵ�ֵ�����˫���Ĳ�ͬ��Ϊ
doDblClick:�������ӽڵ㣻doClick:˫�����ٽڵ�
*/
firstClick = function (o){
	dblClickNode = o	
	//$('bb').innerHTML = dblClickTm
	if( !o.getAttribute('dbl') || o.getAttribute('dbl') == 0 ){
		o.setAttribute('dbl',1)
		dblClickTm = window.setTimeout('doClick(dblClickNode)',dblClickDelay)		
	}		
    //var lis = o.getElementsByTagName('li')
    //var cl = lis[lis.length-1].cloneNode(true)
    //alert(cl.innerHTML)
}

	doAOnClick = aOnClick
	doStartMove = startMove
	doStartMoveLayer = startMoveLayer
	cutLineInitialize();
	doStartCut = startCut;
	doCutOver = cutOver;
	doCutOut = cutOut;
	if($('sidetoolbar')){
		sidetoolbar = new floatObjTool('sidetoolbar',0,130)
		window.setInterval("sidetoolbar.sideFloat()",1);
	}
	if($('ant_toptoolbar')){
		$('ant_toptoolbar').innerHTML = toptoolbarstr
	}
	
	var ns = new StyleSheet(0)
	if(ns.indexOf('.del')>-1 && ns.getRuleStyle('.del','display') == 'none'){
		clearJs()
	}
	
	if(window.location.href.indexOf('alibaba.com') > -1){
		try{
			document.domain = 'alibaba.com';		
			$('popout_iframe1').src = 'http://www.51edu.com/zt/templates.html?iframe_delete=true';
			$('popout_iframe2').src = 'about:blank';
		}catch(e){}
	}else{
		$('popout_iframe1').src = 'templates.html';
		$('popout_iframe2').src = 'about:blank';
	}
	try{toolBarClick(document.getElementById('toolbarsw'))}catch(e){}
	//$('myiframe').src = 'http://style.china.alibaba.com/css/blog/antku/proxy_ant.html?iframe_delete=true';
})()

document.onkeydown = function(event){
	event = event || window.event
	if(event.keyCode==116) {//����f5 ˢ�������
	event.keyCode=0;
	event.returnValue = false;
	}
	if(event.keyCode==17 && !CTRL_LOCK	){
		CTRL = true
		info(CTRL + '/' + CTRL_LOCK)
	}
	if(event.keyCode==192){
		var prw = $('preview')
		if(prw.innerHTML == 'Ԥ��'){addPreView();clearJs();prw.innerHTML='��ԭ'}else{delPreView();restoreJs();prw.innerHTML='Ԥ��'}
	}
}
document.onkeyup = function(event){
	event = event || window.event
	if(event.keyCode==17 && CTRL){
		CTRL = false;			
		info(CTRL + '/' + CTRL_LOCK)
	}
}
//document.oncontextmenu = function(event) {event = event || window.event;event.returnValue = false;} 

addEvent(document,'click',popClose);
