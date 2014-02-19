/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/*
描述：全局变量
*/

var GATE = 0; //功能简易控制器   2:固定几种布局选择（有等高列的功能）
var CTRL = CTRL_LOCK = false;  //ctrl 功能键参数
var GLOBALNODE    //全局公用节点变量
var COMMONTIMER   //公共计时参数
var LAYOUTNUM = 44
var LAYOUTBUFFER = 0;
var CURLAYERNUM;
var MAXLAYERNUM = 20;
var INTERVALTIMER;

var URL_JS = 'http://www.51edu.com/zt/';
var URL_CSS = 'http://www.51edu.com/zt/';
var URL_PARTS = 'http://www.51edu.com/zt/parts/';

var sidetoolbar //漂浮工具条
var promptpopup //底部浮出框
var Layers = [	
	{'id' : 0, 'c' : 1},
	{'id' : 1, 'c' : 1}
]
var Param_tt = [
	
]
var Param_cont = [

]

var Param_page;

var Param_css = [
	{'tag':'模板1','mcss':'http://www.51edu.com/zt/res/skin/skin_1.css','mbgi':'http://www.51edu.com/zt/res/skin/skin_1.gif'},
	{'tag':'模板2','mcss':'http://www.51edu.com/zt/res/skin/skin_2.css','mbgi':'http://www.51edu.com/zt/res/skin/skin_2.gif'}
]


var html_bar = [
	'<a class="bar bar_x" href="#" onclick="closeContainer(this);return false"></a><a class="bar bar_min" href="#"  onclick="changeVisible(this);return false"></a><a class="bar bar_set" href="#" title="设置Block样式" onclick="setContainer(event,this);return false"></a><a class="del bar bar_code" href="#" title="block块代码编辑" onclick="setCode(event,this);return false"></a>', //0
	'<div class="del ctrbar2"><a href="javascript:void(0)" onclick="clearCont(this,1);return false;">回退</a> | <a href="javascript:void(0)" onclick="clearCont(this);return false;">清空</a> | <a href="javascript:void(0)" onclick="showIBox(this);return false;">增加内容</a></div>', //1
	'<div class="del layerctr"><a class="btn_rmlayer" href="javascript:void(0)" title="删除Layer_#SN" onclick="deleteLayer(#SN);return false;" >#SN</a><a class="btn_smlayer" title="最小化/最大化" href="javascript:void(0)" onclick="pressMinAll(this,#SN);return false"></a></div>', //2
	'<DIV class="del ctrbar"><a class="btn_addblk" href="javascript:void(0)" title="点击新增block块" onclick="showBox(this,0);return false" ></a><a href="javascript:void(0)" class="btn_qkadd" title="点击快速增加代码块" onclick="showIBox(this,2);return false;"></a></DIV>', //3
	'<td class="cutline" width="8" style="background:#fff;"></td>', //4
	'<a class="bar bar_x" href="#" onclick="closeContainer(this);return false"></a><a class="bar bar_set" href="#" title="设置Block样式" onclick="setContainer(event,this);return false"></a>' //5
	]
var html_layer = ['<div id="layer_#SN" class="layer"><div class="del"><input type="button" class="l" value=" 删除layer_#SN " onclick="deleteLayer(\'#SN\')"/></div><table class="cutable" border="0" cellspacing="0" cellpadding="0"><tr><td valign="top"><div id="a#SN_tube_0" class="tube style_0_1" style="width:300px"><div class="del ctrbar"><img class="add" src="http://www.51edu.com/zt/imgs/ico_smadd.gif" title="点击新增block块" onclick="showBox(this,0)"/></div></div></td>'+html_bar[4]+'<td><div id="a#SN_tube_1" class="tube style_1_1" style="width:300px"><div class="del ctrbar"><img class="add" src="http://www.51edu.com/zt/imgs/ico_smadd.gif" title="点击新增block块" onclick="showBox(this,0)"/></div></div></td>'+html_bar[4]+'<td><div id="a#SN_tube_2" class="tube style_2_1" style="width:200px"><div class="del ctrbar"><img class="add" src="http://www.51edu.com/zt/imgs/ico_smadd.gif" title="点击新增block块" onclick="showBox(this,0)"/></div></div></td>'+html_bar[4]+'<td><div id="a#SN_tube_3" class="tube style_3_1" style="width:128px"><div class="del ctrbar"><img class="add" src="http://www.51edu.com/zt/imgs/ico_smadd.gif" title="点击新增block块" onclick="showBox(this,0)"/></div></div></td></tr></table><div class="c"></div><input id="layeradd_#SN" class="del addLayer" disabled="true" type="button" value=" 新增layer " onclick="addLayer(this)" /></div>',
'<div id="layer_#SN" class="layer">'+html_bar[2]+'<div class="del selayer"><img src="http://www.51edu.com/zt/imgs/lie1.gif" onclick="defineLayer(this,1,[952],1)"/><img src="http://www.51edu.com/zt/imgs/lie2.gif" usemap="#Map1" /><img src="http://www.51edu.com/zt/imgs/lie3.gif" usemap="#Map2" /><img src="http://www.51edu.com/zt/imgs/lie4.gif" onclick="defineLayer(this,4,[232,232,232,232],8)"/><map name="Map1" id="Map1"><area shape="rect" coords="165,36,236,107" href="javascrtip:void(0)" onclick="defineLayer(this.parentNode,2,[712,232],4);return false"/><area shape="rect" coords="87,36,158,107" href="javascrtip:void(0)" onclick="defineLayer(this.parentNode,2,[472,472],2);return false"/><area shape="rect" coords="9,36,80,107" href="javascrtip:void(0)" onclick="defineLayer(this.parentNode,2,[632,312],3);return false"/></map><map name="Map2" id="Map2"><area shape="rect" coords="165,36,236,107" href="javascrtip:void(0)" onclick="defineLayer(this.parentNode,3,[352,352,232],6);return false"/> <area shape="rect" coords="87,36,158,107" href="javascrtip:void(0)" onclick="defineLayer(this.parentNode,3,[232,472,232],7);return false"/> <area shape="rect" coords="9,36,80,107" href="javascrtip:void(0)" onclick="defineLayer(this.parentNode,3,[312,312,312],5);return false"/></map></div></div>'
]

var stdtubew = [
	[472,472], [632,312], [712,232],
	[312,312,312], [352,352,232], [232,472,232]
]

function gen_LayerHTML(n,na,f){
	var tubew = [[952],	[472,472],[312,312,312],[232,232,232,232]]
	na = na || tubew[n-1]
	var htms;
	if($('dgcol').checked){
		htms = [
		'<div class="layerC layerC7"> <div class="lineH"></div> <div id=a#SN_tube_0 class="tube col_952 nomr8">'+html_bar[3]+'</div> <div class="lineH"></div> </div>', //952
		'<div class="layerC layerC0"> <div class="lineH"></div> <div id=a#SN_tube_0 class="tube col_472">'+html_bar[3]+'</div>	<div id=a#SN_tube_1 class="tube col_472 nomr8">'+html_bar[3]+'</div> <div class="lineH"></div> </div>', //472,472
		'<div class="layerC layerC5"> <div class="lineH"></div> <div id=a#SN_tube_0 class="tube col_632">'+html_bar[3]+'</div> <div id=a#SN_tube_1 class="tube col_312 nomr8">'+html_bar[3]+'</div> <div class="lineH"></div> </div>', //632,312
		'<div class="layerC layerC3"> <div class="lineH"></div> <div id=a#SN_tube_0 class="tube col_712">'+html_bar[3]+'</div>	<div id=a#SN_tube_1 class="tube col_232 nomr8">'+html_bar[3]+'</div> <div class="lineH"></div> </div>', //712,232
		'<div class="layerC layerC6"> <div class="lineH"></div> <div id=a#SN_tube_0 class="tube col_312">'+html_bar[3]+'</div>	<div id=a#SN_tube_1 class="tube col_312">'+html_bar[3]+'</div> <div id=a#SN_tube_2 class="tube col_312 nomr8">'+html_bar[3]+'</div> <div class="lineH"></div> </div>', //312,312,312
		'<div class="layerC layerC2"> <div class="lineH"></div> <div id=a#SN_tube_0 class="tube col_352">'+html_bar[3]+'</div>	<div id=a#SN_tube_1 class="tube col_352">'+html_bar[3]+'</div>	<div id=a#SN_tube_2 class="tube col_232 nomr8">'+html_bar[3]+'</div> <div class="lineH"></div> </div>', //352,352,232
		'<div class="layerC layerC1"> <div class="lineH"></div> <div id=a#SN_tube_0 class="tube col_232">'+html_bar[3]+'</div>	<div id=a#SN_tube_1 class="tube col_472">'+html_bar[3]+'</div>	<div id=a#SN_tube_2 class="tube col_232 nomr8">'+html_bar[3]+'</div> <div class="lineH"></div> </div>', //232,472,232
		'<div class="layerC layerC4"> <div class="lineH"></div> <div id=a#SN_tube_0 class="tube col_232">'+html_bar[3]+'</div>	<div id=a#SN_tube_1 class="tube col_232">'+html_bar[3]+'</div>	<div id=a#SN_tube_2 class="tube col_232">'+html_bar[3]+'</div>	<div id=a#SN_tube_3 class="tube col_232 nomr8">'+html_bar[3]+'</div> <div class="lineH"></div> </div>' //232,232,232,232
		]
		return htms[f-1]
	}else{	
		htms = ['<table class="cutable" border="0" cellspacing="0" cellpadding="0"><tr><td valign="top"><DIV class="tube" id=a#SN_tube_0 style="width:'+na[0]+'px">'+html_bar[3]+'</DIV></td></tr></table><DIV class=c></DIV>',
		'<table class="cutable" border="0" cellspacing="0" cellpadding="0"><tr><td valign="top"><DIV class="tube" id=a#SN_tube_0 style="width:'+na[0]+'px">'+html_bar[3]+'</DIV></td>'+html_bar[4]+'<td valign="top"><DIV class="tube" id=a#SN_tube_1 style="width:'+na[1]+'px">'+html_bar[3]+'</DIV></td></tr></table><DIV class=c></DIV>',
		'<table class="cutable" border="0" cellspacing="0" cellpadding="0"><tr><td valign="top"><DIV class="tube" id=a#SN_tube_0 style="width:'+na[0]+'px">'+html_bar[3]+'</DIV></td>'+html_bar[4]+'<td valign="top"><DIV class="tube" id=a#SN_tube_1 style="width:'+na[1]+'px">'+html_bar[3]+'</DIV></td>'+html_bar[4]+'<td valign="top"><DIV class="tube" id=a#SN_tube_2 style="width:'+na[2]+'px">'+html_bar[3]+'</DIV></td></tr></table><DIV class=c></DIV>',
		'<table class="cutable" border="0" cellspacing="0" cellpadding="0"><tr><td valign="top"><DIV class="tube" id=a#SN_tube_0 style="width:'+na[0]+'px">'+html_bar[3]+'</DIV></td>'+html_bar[4]+'<td valign="top"><DIV class="tube" id=a#SN_tube_1 style="width:'+na[1]+'px">'+html_bar[3]+'</DIV></td>'+html_bar[4]+'<td valign="top"><DIV class="tube" id=a#SN_tube_2 style="width:'+na[2]+'px">'+html_bar[3]+'</DIV></td>'+html_bar[4]+'<td valign="top"><DIV class="tube" id=a#SN_tube_3 style="width:'+na[3]+'px">'+html_bar[3]+'</DIV></td></tr></table><DIV class=c></DIV>'
		];
		return htms[n-1]
		}
}



var html_block = [
	'<div id="block_#id" class="block"><div class="del hdpr r"><div class="ttpa">'+html_bar[0]+'</div></div><div id="title_#id" class="tt tt_0"><div class="ttl"></div><div class="icl" pos="0"></div><div class="ttc"><h3 class="ant_txt">title</h3></div><div class="ttr"></div><div class="icr mr" pos="0"><a href="javascript:void(0)">更多</a></div></div><div id="cont_#id" class="cont cont_0"><div id="cont_in_#id" class="cont_in">'+html_bar[1]+'</div></div></div>', //0  title cont
	'<div class="block" id="block_#id"><div class="del hdpr r"><div class="ttpa">'+html_bar[0]+'</div></div><div class="tt tt_0" id="title_#id"><div class="ttl"></div><div pos="0" class="icl"></div><div class="ttc"><h3 class="ant_txt">title</h3></div><div class="ttr"></div><div pos="0" class="icr mr"><a href="javascript:void(0)">更多</a></div></div><div class="box mttb"> <div id="cont_in_#id"><div class="l h"> <div class="cont cont_0 box_mr" id="cont_#id">'+html_bar[1]+'</div></div> <div class="r h"><div class="cont cont_0 box_ml">'+html_bar[1]+'</div></div> <div class=c></div></div></div></div>', //1  title + 2 cont 	
	'<div class="block" id="block_#id"><div class="del hdpr r"><div class="ttpa">'+html_bar[0]+'</div></div><div class="tt tt_0" id="title_#id"><div class="ttl"></div><div pos="0" class="icl"></div><div class="ttc"><h3 class="ant_txt">title</h3></div><div class="ttr"></div><div pos="0" class="icr mr"><a href="javascript:void(0)">更多</a></div></div><div class="box mttb"> <div id="cont_in_#id"><div class="l t"><div class="cont cont_0 box_mr" id=cont_0>'+html_bar[1]+'</div></div><div class="l t"><div class="cont cont_0 box_ml box_mr">'+html_bar[1]+'</div></div><div class="r t"><div class="cont cont_0 box_ml">'+html_bar[1]+'</div></div><div class=c></div><div class=c></div></div></div></div>', //2  title + 3 cont 
	'<div id="block_#id" class="block"><div class="del blkbar">'+html_bar[0]+'<div class="c"></div></div><div class="box"><div id="cont_in_#id"><div class="l h"><div class="box_mr"><div id="title_#id" class="tt tt_0"><div class="ttl"></div><div class="icl" pos="0"></div><div class="ttc"><h3 class="ant_txt">title</h3></div><div class="ttr"></div><div class="icr mr" pos="0"><a href="javascript:void(0)">更多</a></div></div><div id="cont_#id" class="cont cont_0">'+html_bar[1]+'</div></div></div><div class="r h"><div class="box_ml"><div class="tt tt_0"><div class="ttl"></div><div class="icl" pos="0"></div><div class="ttc"><h3 class="ant_txt">title</h3></div><div class="ttr"></div><div class="icr mr" pos="0"><a href="javascript:void(0)">更多</a></div></div><div class="cont cont_0">'+html_bar[1]+'</div></div></div><div class="c"></div></div></div></div>', //3   2 box title
	'<div id="block_#id" class="block"><div class="del blkbar">'+html_bar[0]+'<div class="c"></div></div><div class="box"><div id="cont_in_#id"><div class="l t"><div class="box_mr"><div id="title_#id" class="tt tt_0"><div class="ttl"></div><div class="icl" pos="0"></div><div class="ttc"><h3 class="ant_txt">title</h3></div><div class="ttr"></div><div class="icr mr" pos="0"><a href="javascript:void(0)">更多</a></div></div><div id="cont_#id" class="cont cont_0">'+html_bar[1]+'</div></div></div><div class="l t"><div class="box_mr box_ml"><div class="tt tt_0"><div class="ttl"></div><div class="icl" pos="0"></div><div class="ttc"><h3 class="ant_txt">title</h3></div><div class="ttr"></div><div class="icr mr" pos="0"><a href="javascript:void(0)">更多</a></div></div><div class="cont cont_0">'+html_bar[1]+'</div></div></div><div class="r t"><div class="box_ml"><div class="tt tt_0"><div class="ttl"></div><div class="icl" pos="0"></div><div class="ttc"><h3 class="ant_txt">title</h3></div><div class="ttr"></div><div class="icr mr" pos="0"><a href="javascript:void(0)">更多</a></div></div><div class="cont cont_0">'+html_bar[1]+'</div></div></div><div class="c"></div></div></div></div>', //4   3 box title
	'<div id="block_#id" class="block"><div class="del blkbar">'+html_bar[0]+'<div class="c"></div></div><div class="box"><div id="cont_in_#id"><div id="cont_#id" class="cont cont_0">'+html_bar[1]+'</div></div></div></div>', //5   1 box
	'<div id="block_#id" class="block"><div class="del blkbar">'+html_bar[0]+'<div class="c"></div></div><div class="box"><div id="cont_in_#id"><div class="l h"><div id="cont_#id" class="cont cont_0 box_mr">'+html_bar[1]+'</div></div><div class="r h"><div class="cont cont_0 box_ml">'+html_bar[1]+'</div></div><div class="c"></div></div></div></div>', //6  2 box
	'<div id="block_#id" class="block"><div class="del blkbar">'+html_bar[0]+'<div class="c"></div></div><div class="box"><div id="cont_in_#id"><div class="l t"><div id="cont_#id" class="cont cont_0 box_mr">'+html_bar[1]+'</div></div><div class="l t"><div class="cont cont_0 box_ml box_mr">'+html_bar[1]+'</div></div><div class="r t"><div class="cont cont_0 box_ml">'+html_bar[1]+'</div></div><div class="c"></div></div></div></div>', //7   3 box	
	'<div id="block_#id" class="block"><div class="del blkbar blkbartp"><a class="del bar bar_x" href="#" onclick="closeContainer(this);return false"></a><a class="del bar bar_min" href="#"  onclick="changeVisible(this);return false"></a><a class="del bar bar_set" href="#" title="设置Block样式" onclick="showBox(this.parentNode,4);return false"></a><div class="c"></div></div><div class="box"><div id="cont_in_#id"><div class="scrtop scrtop_#id"><h1 class="mark l pa bw h"><a class="del bar bar_set" href="#" title="设置样式" onclick="showBox(this,2);return false"></a>试试双击！按 ~ (tab键上面 数字1 左边 ESC 键下面)键可以预览~~</h1></div></div></div></div>', //8   层背景设置
	'<div id="block_#id" class="block"><div class="del blkbar"><a class="del bar bar_x" href="#" onclick="closeContainer(this);return false"></a><a class="del bar bar_min" href="#"  onclick="changeVisible(this);return false"></a><a class="del bar bar_set" href="#" title="设置导航样式" onclick="alert(\'此功能尚未开通~~\');return false;//setNav(event,this);"></a><a class="del bar bar_code" href="#" title="导航块代码编辑" onclick="setCode(event,this);return false"></a><div class="c"></div></div><div class="box"><div id="cont_in_#id"><div class="contnav"> 	<div class="ttl"></div> 	<ul id="mcontnav" class="mcontnav"> 	<li><a href="javascript:void(0)">首页</a></li> 	<li class="hov" ><a  href="javascript:void(0)">促销街</a>			<div id="fff" class="navbot"> 			<a class="cur" href="javascript:void(0)">子导航1</a> | <a href="javascript:void(0)">子导航1</a> | <a href="javascript:void(0)">子导航1</a> | <a href="javascript:void(0)">子导航1</a> | <a href="javascript:void(0)">子导航1</a> | <a href="javascript:void(0)">子导航1</a> | <a href="javascript:void(0)">子导航1</a> 		</div> 	</li> 	<li><a href="javascript:void(0)">资讯<img src="http://img.china.alibaba.com/images/cn/corp/alipay/new.gif" width="21" height="9"/></a>			<div class="navbot"> 			<a href="javascript:void(0)">子导航2</a> | <a href="javascript:void(0)">子导航2</a> | <a href="javascript:void(0)">子导航2</a> | <a href="javascript:void(0)">子导航2</a> | <a href="javascript:void(0)">子导航2</a> | <a href="javascript:void(0)">子导航2</a> | <a href="javascript:void(0)">子导航2</a> 		</div> 	</li> 	<li><a href="javascript:void(0)">海外购物</a>			<div class="navbot"> 			<a href="javascript:void(0)">子导航3</a> | <a href="javascript:void(0)">子导航3</a> | <a href="javascript:void(0)">子导航3</a> | <a href="javascript:void(0)">子导航3</a> | <a href="javascript:void(0)">子导航3</a> | <a href="javascript:void(0)">子导航3</a> | <a href="javascript:void(0)">子导航3</a> 		</div> 	</li> 	<li><a href="javascript:void(0)">论坛</a>			<div class="navbot"> 			<a href="javascript:void(0)">子导航4</a> | <a href="javascript:void(0)">子导航4</a> | <a href="javascript:void(0)">子导航4</a> | <a href="javascript:void(0)">子导航4</a> | <a href="javascript:void(0)">子导航4</a> | <a href="javascript:void(0)">子导航4</a> | <a href="javascript:void(0)">子导航4</a> 		</div> 	</li> 	<li><a href="javascript:void(0)">互帮互助</a>			<div class="navbot"> 			<a href="javascript:void(0)">子导航5</a> | <a href="javascript:void(0)">子导航5</a> | <a href="javascript:void(0)">子导航5</a> | <a href="javascript:void(0)">子导航5</a> | <a href="javascript:void(0)">子导航5</a> | <a href="javascript:void(0)">子导航5</a> | <a href="javascript:void(0)">3游戏</a> 		</div> 	</li> 	<li><a href="javascript:void(0)">网购导航</a></li> 	</ul> 	<div class="ttr"></div>	</div> </div></div></div><input id="navhid" type="hidden" value="1,1"/>', //9    顶部导航	
	'<div id="block_#id" class="block"><div class="del blkbar">'+html_bar[0]+'<div class="c"></div></div><div><div id="cont_in_#id" class="cont_in">'+html_bar[1]+'</div></div></div>',  //10    空白块
	'<div id="block_#id" class="block"><div class="del blkbar"><a class="del bar bar_x" href="#" onclick="closeContainer(this);return false"></a><a class="del bar bar_min" href="#"  onclick="changeVisible(this);return false"></a><div class="c"></div></div><div class="box"><div id="cont_in_#id"><a href="javascript:void(0)"><img src="http://www.51edu.com/zt/imgs/ban_1226471225391.jpg" width="952" height="150"/></a></div></div></div>', //11   顶部图
	'<div id="block_#id" class="block"><div class="del blkbar">'+html_bar[0]+'<div class="c"></div></div><div class="ant_nopdcont"><div id="cont_in_#id" class="cont_in"><a href="javascript:void(0)"><img src="http://www.51edu.com/zt/imgs/all.gif" width="100%" /></a></div></div></div>', //12 图片框
	'<div id="block_#id" class="block"><div class="del blkbar">'+html_bar[0]+'<div class="c"></div></div><div class="box"><div id="cont_in_#id"><div id="cont_#id" class="cont ant_nopdcont">'+html_bar[1]+'</div></div></div></div>', //13 无内边距box
	'<div id="block_#id" class="block"><div class="del hdpr r"><div class="ttpa">'+html_bar[0]+'</div></div><div id="title_#id" class="tt tt_0"><div class="ttl"></div><div class="icl" pos="0"></div><div class="ttc"><h3 class="ant_txt">title</h3></div><div class="ttr"></div><div class="icr mr" pos="0"><a href="javascript:void(0)">更多</a></div></div><div id="cont_#id" class="cont ant_nopdcont"><div id="cont_in_#id" class="cont_in">'+html_bar[1]+'</div></div></div>', //14 无内边距 title cont
	'<div id="block_#id" class="block"><div class="del hdpr r"><div class="ttpa">'+html_bar[5]+'</div></div><div id="title_#id" class="tt tt_0"><div class="ttl"></div><div class="icl" pos="0"></div><div class="ttc"><h3 class="ant_txt">title</h3></div><div class="ttr"></div><div class="icr mr" pos="0"><a href="javascript:void(0)">更多</a></div></div><div class="cont bn"><div id="cont_in_#id"></div></div></div>' //15  仅标题 
	]
var html_oper = [
	'<div class="del prbox prbox_3" onmousedown="cancelBubble(event)"><div class="pa" ondblclick="closeBox(this);"><a onclick="closeBox(this);return false" href="javascript:void(0)" class="clsb"></a><div class="c"></div><div class="tut" >单个分栏</div><a class="tuse tuse_1" href="javascript:void(0)" onclick="newIBlock(event,this,0);return false"></a><a class="tuse tuse_2" href="javascript:void(0)" onclick="newIBlock(event,this,1);return false"></a><a class="tuse tuse_3" href="javascript:void(0)" onclick="newIBlock(event,this,2);return false"></a><div class="c"></div><div class="tut tut_m">多个分栏</div><a class="tuse tuse_4" href="javascript:void(0)" onclick="newIBlock(event,this,3);return false"></a><a class="tuse tuse_5" href="javascript:void(0)" onclick="newIBlock(event,this,4);return false"></a><div class="c"></div><div class="tut">仅内容框</div><a class="tuse tuse_6" href="javascript:void(0)" onclick="newIBlock(event,this,5);return false"></a><a class="tuse tuse_7" href="javascript:void(0)" onclick="newIBlock(event,this,6);return false"></a><a class="tuse tuse_8" href="javascript:void(0)" onclick="newIBlock(event,this,7);return false"></a><div class="c"></div><div class="tut">图 片 块</div><a class="tuse tuse_10" href="javascript:void(0)" onclick="newIBlock(event,this,12);return false"></a><div class="c"></div><div class="tut">空 白 块</div><a class="tuse tuse_9" href="javascript:void(0)" onclick="newIBlock(event,this,10);return false"></a><div class="c"></div><div class="tut">仅 标 题</div><a class="tuse tuse_11" href="javascript:void(0)" onclick="newIBlock(event,this,15);return false"></a></div></div>',//0
	'<div class="del prbox prbox_0" onmousedown="cancelBubble(event)"><div class="pa"><a class="clsb" href="javascript:void(0)" onclick="closeBox(this);return false"></a><br /><br /><a href="javascript:void(0)" onclick="insertCont(this,\'ul_0\');closeBox(this);return false;" onmouseover="snapshot(event,\'ul_0\')">普通链接</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'ul_1\');closeBox(this);return false;" onmouseover="snapshot(event,\'ul_1\')">浮动组链</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'ul_2\');closeBox(this);return false;" onmouseover="snapshot(event,\'ul_2\')">左右两链</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'ul_3\');closeBox(this);return false;" onmouseover="snapshot(event,\'ul_3\')">富内容列</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'ul_4\');closeBox(this);return false;" onmouseover="snapshot(event,\'ul_4\')">自由跟链</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'pl_0\');closeBox(this);return false;" onmouseover="snapshot(event,\'pl_0\')">图片链00</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'pl_0_1\');closeBox(this);return false;" onmouseover="snapshot(event,\'pl_0_1\')">图片链01</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'pl_1\');closeBox(this);return false;" onmouseover="snapshot(event,\'pl_1\')">图片链10</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'pl_1_1\');closeBox(this);return false;" onmouseover="snapshot(event,\'pl_1_1\')">图片链11</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'pl_2\');closeBox(this);return false;" onmouseover="snapshot(event,\'pl_2\')">图文链20</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'pl_2_1\');closeBox(this);return false;" onmouseover="snapshot(event,\'pl_2_1\')">图文链21</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'hp_0\');closeBox(this);return false;" onmouseover="snapshot(event,\'hp_0\')">头文链00</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'hp_0_1\');closeBox(this);return false;" onmouseover="snapshot(event,\'hp_0_1\')">头文链01</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'hp_0_2\');closeBox(this);return false;" onmouseover="snapshot(event,\'hp_0_2\')">头文链02</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'hp_0_3\');closeBox(this);return false;" onmouseover="snapshot(event,\'hp_0_3\')">头文链03</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'hp_1\');closeBox(this);return false;" onmouseover="snapshot(event,\'hp_1\')">头文链10</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'lcl_0\');closeBox(this);return false;" onmouseover="snapshot(event,\'lcl_0\')">单元格00</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'lcl_1\');closeBox(this);return false;" onmouseover="snapshot(event,\'lcl_1\')">单元格10</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'rk_0\',0,\'rk_0\');closeBox(this);return false;" onmouseover="snapshot(event,\'rk_0\')">排名榜00</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'fpic\',\'fpic\',\'fpic\');closeBox(this);return false;" onmouseover="//snapshot(event,\'fpic\')">焦点头图</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'sp_0\');closeBox(this);return false;" onmouseover="snapshot(event,\'sp_0\')">分隔线00</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'sp_1\');closeBox(this);return false;" onmouseover="snapshot(event,\'sp_1\')">分隔线01</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'pc_0\');closeBox(this);return false;" onmouseover="snapshot(event,\'pc_0\')">仅图片链</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'qqlst\',\'qqlst\',\'qqlst\');closeBox(this);return false;" onmouseover="//snapshot(event,\'qqlst\')">仿qq菜单</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'picrun\',\'picrun\',\'picrun\');closeBox(this);return false;" onmouseover="//snapshot(event,\'picrun\')">滚动图01</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'sw\',\'sw\',\'sw\');closeBox(this);return false;" onmouseover="//snapshot(event,\'sw\')">左右切换</a>|</div></div>',//1
	'<div class="del prbox" onmousedown="cancelBubble(event)" ondblclick="cancelBubble(event)" onclick="cancelBubble(event)"><div class="pa"><a class="clsb" href="javascript:void(0)" onclick="closeBox(this);return false"></a><br/><form>字颜色：<input name="ftcolor" type="text" value="" size="10"/><br />字体：<select name="ftfm"><option selected="selected" value="">选择字体</option><option value="Verdana">Verdana</option><option value="黑体">黑体</option><option value="宋体">宋体</option></select><br />字体大小：<select name="ftsz"><option selected="selected" value="">选择字体大小</option><option value="14px">14px</option><option value="16px">16px</option><option value="18px">18px</option><option value="20px">20px</option><option value="25px">25px</option><option value="28px">28px</option><option value="30px">30px</option><option value="34px">34px</option></select><br />对齐：<select name="ftal"><option selected="selected" value="">选择对齐方式</option><option value="left">左对齐</option><option value="right">右对齐</option><option value="center">居中</option></select><br /><input type="button" value="确定" onclick="setTopWordsStyle(this);closeBox(this.parentNode)"/></form></div></div>',//2
	'<div class="del prbox prbox_1" onmousedown="cancelBubble(event)" onclick="cancelBubble(event);"><div class="pa"><a class="clsb" href="javascript:void(0)" onclick="closeBox(this,1);return false"></a><div class="c"></div><div class="ttsel"><div class="tt tt_0" onclick="titleClass(this,0)"><div class="ttl"></div><div class="icl"></div><div class="ttc"><h3 class="ant_txt">title</h3></div><div class="ttr"></div><div class="icr mr"><a href="javascript:void(0)" target="_self">更多</a></div></div>	<div class="c"></div><div class="tt tt_1" onclick="titleClass(this,1)"><div class="ttl"></div><div class="icl"></div><div class="ttc"><h3 class="ant_txt">title</h3></div><div class="ttr"></div><div class="icr mr"><a href="javascript:void(0)" target="_self">更多</a></div></div><div class="c"></div><div class="tt tt_2" onclick="titleClass(this,2)"><div class="ttl"></div><div class="icl"></div><div class="ttc"><h3 class="ant_txt">title</h3></div><div class="ttr"></div><div class="icr mr"><a href="javascript:void(0)" target="_self">更多</a></div></div><div class="c"></div><div class="tt tt_3" onclick="titleClass(this,3)"><div class="ttl"></div><div class="icl"></div><div class="ttc"><h3 class="ant_txt">title</h3></div><div class="ttr"></div><div class="icr mr"><a href="javascript:void(0)" target="_self">更多</a></div></div></div><div class="bt_2 mt7 mr5 ml5 pt7"><div class="arr-downhid" style="height:20px"> <a href="javascript:void(0)" class="arr-down"  onclick="var ps=this.parentNode.style;if(this.className==\'arr-down\'){ps.height=\'auto\';this.className=\'arr-up\'}else{ps.height=\'20px\';this.className=\'arr-down\'}expandTileClass(this);return false;">更多标题样式</a> <div class="arr-downhidCont"></div> </div></div><div class="ttpre"></div></div></div>',//3
	'<div class="del prbox" onmousedown="cancelBubble(event)"><div class="pa"><a class="clsb" href="javascript:void(0)" onclick="closeBox(this);return false"></a><br/><form>背景图片地址：<input type="text" name="bgpic"/><br />背景图片位置：<input type="text" name="bgpos" /><br />背景图片平铺：<select name="bgrpt"><option value="" selected="true">请选择</option><option value="no-repeat">无平铺</option><option value="repeat">双向平铺</option><option value="repeat-x">水平平铺</option><option value="repeat-y">垂直平铺</option></select><br />背景色：<input type="text" name="bgcolor" size="10"/><br />层高度：<input type="text" name="bglayh" size="10"/><input type="button" value="确定" onclick="setTopLayer(this);closeBox(this.parentNode)"/></form></div></div>',//4
	'<div class="del prbox prbox_0" onmousedown="cancelBubble(event)"><div class="pa"><a class="clsb" href="javascript:void(0)" onclick="closeBox(this);return false"></a><br/><br/><a href="javascript:void(0)" onclick="newBlock(this.parentNode.parentNode.parentNode,11);closeBox(this);return false">顶部图</a><br /><a href="javascript:void(0)" onclick="newBlock(this.parentNode.parentNode.parentNode,8);closeBox(this);return false">设置背景层</a><br /><a href="javascript:void(0)" onclick="addNavBlock(this.parentNode.parentNode.parentNode,9);closeBox(this);return false">顶部导航</a></div></div>', //5
	'<div class="del prbox prbox_2" onclick="cancelBubble(event)" onmousedown="cancelBubble(event)"><span><a class="clsb" href="javascript:void(0)" onclick="closeBox(this,1);return false"></a></span><form><input class="fm_blockid" type="text" name="blockid" value="" readonly/><br/><textarea name="codearea" onmousedown="cancelBubble(event)"></textarea><input class="fm_codespe" type="text" readonly name="codespe" value=""/><input name="editcode" type="button" value="确定" onmousedown="cancelBubble(event)" /> <input type=button value=关闭 onclick="closeBox(this,1);" /></form></div>', //6
	'<div class="del prbox prbox_1" onmousedown="cancelBubble(event)" onclick="cancelBubble(event);"><div class="pa"><a class="clsb" href="javascript:void(0)" onclick="closeBox(this,1);return false"></a><br/><br/><form class="form_set">主题色：<input type="text" name="ctlkcolor" size="7"/> 字色：<input type="text" name="ctwdcolor" size="7"/><br/>层高度：<input type="text" name="ctbglayh" size="6"/> 字行高：<input type="text" name="ctlineht" size="6" /><br/>内间隙：<input type="text" name="ctpadding" size="4" />px 文字号：<input type="text" name="ctftsize" size="4" />px<div class="bt_2 mt7 h23">背景设置 &nbsp;&nbsp;&nbsp;&nbsp;平铺：<select name="ctbgrpt" style="width:40px"><option value="no-repeat" selected="selected">无</option><option value="repeat">双向</option><option value="repeat-x">水平</option><option value="repeat-y">垂直</option></select></div>--图片：<input type="text" name="ctbgpic" onfocus="this.select()"/><br />--位置：<input type="text" name="ctbgpos" size="7"/> 颜色：<input type="text" name="ctbgcolor" size="7"/><br /><div class="bt_2 mt7 h23">边框设置</div>--宽度：<select name="ctbdwidth"><option value="0" selected>0</option><option value="1">1</option><option value="2">2</option></select>px 形态：<select name="ctbdtype"><option value="solid" selected>实线</option><option value="dashed">虚线</option><option value="dotted">点线</option></select><br/>--颜色：<input type="text" name="ctbdcolor" size="7"/> <input type="button" value="预览" onclick="setCont(this,3)"/><input type="button" value="确定" onclick="if(setCont(this,4)) closeBox(this.parentNode,1)"/><div class="bt_2 mt7 pt7"></div>方案拷贝：<input type="text" name="ctclass" onfocus="this.select()" size="5"/> <input type="button" value="预览" onclick="setCont(this,1)"/><input type="button" value="确定" onclick="if(setCont(this,2)) closeBox(this.parentNode,1)"/></form><div class="bt_2 mt7 pt7"></div><div class="ctpre"></div></div></div>', //7
	'<div class="prbox prbox_global" onclick="cancelBubble(event);" onmousedown="cancelBubble(event)"><div class=pa><a class="clsb" href="javascript:void(0)" onclick="closeBox(this);return false"></a><div class="c"></div><form id="globalFormSet" class="form_set"><div class="l lf b_1"><span class="bg_3">页面背景设置：</span><br/>背景图片地址：<input onfocus=this.select() value="" name=body_bgpic><br>背景图片位置：<input name=body_bgpos><br>背景图片平铺：<select name=body_bgrpt><option value="">请选择</option><option value=no-repeat>无平铺</option><option value=repeat>双向平铺</option><option value=repeat-x>水平平铺</option><option value=repeat-y>垂直平铺</option></select><br>背景色：<input size=7 name=body_bgcolor> 字色：<input size=7 name=body_wdcolor><div class="bt_2"></div><input type="button" value="确定" onclick="globalSet(1)"/></div><div class="b_1 r rg mr21"><span class="bg_3">链接颜色设置：</span><div class="mt3">链 接  link / visited / active ：</div> --颜色：<input name=alcolor size=7> --下划线：<select name=alline><option value="underline">有</option><option value="none" selected>无</option></select><div class="h23">链 接 hover： <input type="checkbox" name="aljump"/>跳跃</div> --颜色：<input name=ahcolor size=7> --下划线：<select name=ahline><option value="underline">有</option><option value="none">无</option></select><div class="bt_2"></div><input type="button" value="确定" onclick="globalSet(2)"/></div><div class="c"></div><div class="b_1 r rg mr21"><span class="bg_3">全局cont设置：</span><br/>主题色：<input type="text" name="ctlkcolor" size="7"/> 字色：<input type="text" name="ctwdcolor" size="7"/><br/>层高度：<input type="text" name="ctbglayh" size="6"/> 字行高：<input type="text" name="ctlineht" size="6" /><br/>内间隙：<input type="text" name="ctpadding" size="4" />px 文字号：<input type="text" name="ctftsize" size="4" />px<div class="bt_2 mt7 h23">背景设置 &nbsp;&nbsp;&nbsp;&nbsp;平铺：<select name="ctbgrpt" style="width:40px"><option value="no-repeat" selected="selected">无</option><option value="repeat">双向</option><option value="repeat-x">水平</option><option value="repeat-y">垂直</option></select></div>--图片：<input type="text" name="ctbgpic" onfocus="this.select()"/><br />--位置：<input type="text" name="ctbgpos" size="7"/> 颜色：<input type="text" name="ctbgcolor" size="7"/><br /><div class="bt_2 mt7 h23">边框设置 &nbsp;&nbsp;&nbsp;&nbsp;<select name="ctbdistry"><option value="">-设置边框-</option><option value="0">正常四边</option><option value="1">缺上框</option><option value="2">缺下框</option><option value="3">缺上下框</option><option value="4">上虚框</option><option value="5">下虚框</option><option value="6">上下虚框</option></select></div>--宽度：<select name="ctbdwidth"><option value="0" selected>0</option><option value="1">1</option><option value="2">2</option></select>px 形态：<select name="ctbdtype"><option value="solid" selected>实线</option><option value="dashed">虚线</option><option value="dotted">点线</option></select><br/>--颜色：<input type="text" name="ctbdcolor" size="7"/> <input type="button" value="预览" onclick="setCont(this,3,1)"/><input type="button" value="确定" onclick="globalSet(5);"/><div class="bt_2 mt7 pt7"></div>方案拷贝：<input type="text" name="ctclass" onfocus="this.select()" value="0" size="5"/> <input type="button" value="预览" onclick="setCont(this,1,1)"/><input type="button" value="确定" onclick="globalSet(6)"/><div class="bt_2 mt7 pt7"></div><div class="ctpre"><div class="cont cont_0">cont</div></div></div><div class="l lf b_1"><span class="bg_3">全局title设置：</span><br/>背景图：<input type="text" name="ttbgpic" onfocus="this.select()" size="18"/> <a href="javascript:void(0)">说明</a><br />标题高：<input type="text" name="ttheight" size="4" />px 圆角宽：<input type="text" name="ttwidth" size="4" />px<br />标字号：<input type="text" name="ttcftsize" size="4"/>px 左距离：<input type="text" name="ttcmgleft" size="4"/>px<br />左图宽：<input type="text" name="iclwidth" size="4" />px 左图层级：<select name="iclpos"><option value="0" selected="selected">0</option><option value="-120">1</option><option value="-160">2</option><option value="-200">3</option></select><br />右图宽：<input type="text" name="icrwidth" size="4" />px 右图层级：<select name="icrpos"><option value="0" selected="selected">0</option><option value="-120">1</option><option value="-160">2</option><option value="-200">3</option></select><br />文字色：<input type="text" name="ttcolor" size="7" /><br/>标题色：<input type="text" name="thcolor" size="7" /> <input type="button" value="预览" onclick="setTitle(this,3,1)"/><input type="button" value="确定" onclick="globalSet(3)"/><div class="bt_2 mt7 pt7"></div>方案拷贝：<input type="text" name="ttclass" onfocus="this.select()" value="0" size="5"/> <input type="button" value="预览" onclick="setTitle(this,1,1)"/><input type="button" value="确定" onclick="globalSet(4)"/><div class="bt_2 mt7 pt7"></div><div class="ttpre"><div class="tt tt_0"><div class="ttl"></div><div class="icl"></div><div class="ttc"><h3 class="ant_txt">title</h3></div><div class="ttr"></div><div class="icr mr"><a href="javascript:void(0)">更多</a></div></div></div></div><div class="l lf b_1" style="clear:left">外框背景色：<input type="text" name="laybg" size="7" /> <input type="checkbox" name="laybd"/>外框 <br/>全局块间距：<input name=glblockmg size=2>px <input type="checkbox" name="pagecenter" />整页居中<div class="bt_2"><input type="button" value="确定" onclick="globalSet(7);"/></div></div><div class="c"></div><input type=button value=全部提交 onclick="if(globalSet(0)) closeBox(this.parentNode);"> <input type=button value=关闭 onclick="closeBox(this.parentNode);"></form></div></div>', //8
	'<div class="prbox prbox_global" onclick="cancelBubble(event);" onmousedown="cancelBubble(event)"><div class=pa><a class="clsb" href="javascript:void(0)" onclick="closeBox(this);return false"></a><form id="globalFormSet" class="form_set"><textarea id="pagestyle" style="color:#666" rows="20" cols="70" readonly></textarea><input type=button value=获取代码 onclick="getPageStyle();closeBox(this.parentNode);" /> <input type=button value=关闭 onclick="closeBox(this.parentNode);" /></form></div></div>' //9
	]


/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/*
描述：layout 常用函数
*/
/*
*fetchIdByClass: 获取对象的id值
*@param obj: 事件触发对象 ；
*@param cls: 事件触发对象从属的层ClassName 如 block / layer ；
*@return: id值；
*/
function fetchIdByClass(obj,cls){
	cls = cls || 'block'
	var blk; 
	if(obj.className.indexOf(cls) >-1 ){
		blk = obj
	}else{
		blk = getParentByClassName(cls,obj);
	}
	var rt = null;
	
	if(blk.id.indexOf('_')>-1){
		rt = blk.id.split('_');
		rt = rt[1]
	}
	return rt;
}
/*
*函数名：getPicUrl:    获取形如 url(http://xxxx) 字符串中的url地址，一般是图片地址
*@param obj:    父级元素；
*@type Object
*@return: 最后一个类型为element的子元素；
*/
function getPicUrl(str){
	if( str == 'none' ){
		str = ''
	}else{
		str = str.replace(/\"/g,'').replace(/\)/g,'');
		str = str.split('(')
		str = str[1]
	} 
	return str
}
/*
*函数名：getXY:  获取元素在屏幕内的绝对位置及高度和宽度；
*@param obj:    要检测的元素；
*@type array; 
*@return: a[0]:顶部位置、a[1]:左边位置、a[2]:宽度、a[3]:高度；
*/
function getXY(obj){
    var a /*返回对象*/ = new Array();
    var t = obj.offsetTop;
    var l = obj.offsetLeft;
    var w = obj.offsetWidth;
    var h = obj.offsetHeight;
    while(obj=obj.offsetParent){
        t+=obj.offsetTop;
        l+=obj.offsetLeft;
    }
    a[0] = t;
    a[1] = l;
    a[2] = w;
    a[3] = h;
    return a;
}

function arrIndexOf(arr,id){
	for(var e in arr){
		if(id == arr[e].id ) return e
	}
	return null
}
function arrDelete(arr,n){
	var i = 0
	while(i<arr.length){
		if(arr[i].id==n){
			var t = arr[i]
			arr[i] = arr[arr.length-1]
			arr.length--
			return
		}
		i++
	}
}
function generateID(arr,max,min,prefix){
	prefix = prefix || '';
	max = max || 100;
	min = min || 0;
	for(var gid = min; arrIndexOf(arr,prefix+''+gid) != null; gid = parseInt((max-min)*Math.random()+min)){}
	return gid
}
function delNodeByClassName(c,o){
	var ns = getElementsByClassName(c,'*',o);
	var i = 0;
	while(i<ns.length){
		ns[i].parentNode.removeChild(ns[i])
		i++;
	}		
}

function getPageStyle(){	
	copyToClipboard($('pagestyle').value);
}

/*
广告漂浮类。应用在工具栏上
*/
function floatObjTool(a,b,c,d){		
	this.obj = typeof(a) == 'object' ? a : document.getElementById(a);
	this.f = b || 0;
	this.firstScroll = this.lastScroll = -c || 0;
	this.itvl = null;
	this.speed = d || .2
	
	if (document.documentElement && document.documentElement.scrollTop)
		this.diffY = document.documentElement.scrollTop;
	else if (document.body)
		this.diffY = document.body.scrollTop
	else
		{/*Netscape stuff*/}
	if(this.f == 2){
		this.lastScroll = this.obj.offsetHeight - getSize()[3] - this.diffY
		this.firstScroll += this.lastScroll
	}
	
	this.originTop = this.obj.offsetTop;
	this.sideFloat = function(){		
		var diffY;
		if (document.documentElement && document.documentElement.scrollTop)
			diffY = document.documentElement.scrollTop;
		else if (document.body)
			diffY = document.body.scrollTop
		else
			{/*Netscape stuff*/}
		if(this.f == 1){			
			var tmpsp = this.speed*(diffY - this.originTop - this.lastScroll)
			var percent= diffY - this.originTop > 0 ? tmpsp : this.obj.offsetTop > this.originTop ?  tmpsp  : 0;
		}else if(this.f == 2){
			var percent=this.speed*(- this.lastScroll  + this.firstScroll + getSize()[3] + diffY - this.obj.offsetHeight); 
		}else{
			var percent=this.speed*(diffY - this.lastScroll); 
		}
		
		percent = percent>0 ? Math.ceil(percent) : percent=Math.floor(percent)		
		this.obj.style.top = this.obj.style.top == "" ? "0px" : this.obj.style.top

		this.obj.style.top = parseInt(this.obj.style.top) + percent + "px"

		if(this.f==1){
			this.obj.style.top = parseInt(this.obj.style.top) < 0 ? 0 : this.obj.style.top			
		}
		this.lastScroll += percent;	
	};
	this.close = function () {
		clearInterval(this.itvl);
		this.obj.style.display = "none";
	};
}


/*
创建绝对定位窗口层，该类窗口层命名为pop窗口，独立于其他html模块。pop窗口类型由id区别
参数：	id   pop窗口的类型id
		t	 pop窗口的顶距（相对于页顶）
		l	 pop窗口的左距（相对于页面左）
		wds	 简单pop窗口内的文案
*/
function createPopDiv(id,t,l,wds){
	if($(id)){
		document.body.removeChild($(id))
	}
	var sn = document.createElement('div')
	sn.onclick = function(event){var e = event || window.event;e.cancelBubble = true;}
	sn.id = id
	document.body.appendChild(sn)	
	sn.style.top = t 
	sn.style.left = l		
	if(wds){
		sn.innerHTML = wds
	}
}
function floatPrompt(){
	var ad;
	if( ad = document.getElementById('prompt') ){		
		ad.style.top = document.documentElement.scrollTop + 'px'
	}
}
function popUpPrompt(promptstr){
	createPopDiv('promptpopup',0,'auto',promptstr)
	promptpopup = new floatObjTool('promptpopup',2)
	INTERVALTIMER = window.setInterval("promptpopup.sideFloat()",1);
	if(COMMONTIMER){
		window.clearTimeout(COMMONTIMER)
	}
	COMMONTIMER = window.setTimeout('popClose(1)',2000)
}
/*
关闭弹出的绝对定位窗口层，该类窗口层命名为pop窗口，独立于其他html模块
*/
function popClose(n){
	var pop = ['snap','popbox','promptpopup']
	if(n == 1){
		pop = ['promptpopup']
	}
	var i = 0;
	while(i<pop.length){		
		if($(pop[i])){
			try{
				window.clearInterval(INTERVALTIMER);
				removeEvent(window,'scroll',floatPrompt)
			}catch(e){}
			document.body.removeChild($(pop[i]))
		}
		i++;
	}	
}

/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/*
描述：布局切割初始化函数
*/
function cutLineInitialize(o){
	if( GATE > 1 ){
		return;
	}
	o = o || document
	var cls = getElementsByClassName('cutline','td',document);
	var i = cls.length;
	while( i-- > 0 ){
		cls[i].onmouseover = function (){
			var s = this;
			return function (){				
				doCutOver(s);
			}
		}.call(cls[i])
		cls[i].onmouseout = function (){
			var s = this;
			return function (){				
				doCutOut(s);
			}
		}.call(cls[i])
		cls[i].onmousedown = function (){			
			return function (event){
				e = event || window.event;
				doStartCut(e);
			}
		}.call(cls[i])
	}
}
function doCutOver(){}
function doCutOut(){}
function doStartCut(){}

function cutOver(o){
	o.style.backgroundColor = '#00fffc'
}
function cutOut(o){
	o.style.backgroundColor = '#ccc'
}
/*
描述：布局切割控制
*/
var ISCUTTING = 0;
var ANCHOR_WIDTH = [152,192,232,272,312,352,392,432,472,512,552,592,632,672,712], ANCHOR_TOLERANCE = 20;
function startCut(e){	
	e = e || window.event;
	var o /*事件对象-切割线*/ = e.srcElement || e.target;
	ISCUTTING = 1;
	
	
	var lfdiv /*切割线左侧 tube div*/ = getElementsByClassName('tube','div',getPreviousSibling(o))[0];
	var rgdiv /*切割线右侧 tube div*/ = getElementsByClassName('tube','div',getNextSibling(o))[0];
	var preX /*鼠标落下初始x位置*/= e.clientX;
    var preY /*鼠标落下初始y位置*/= e.clientY;
	var lfdivhtml = lfdiv.innerHTML;
	var rgdivhtml = rgdiv.innerHTML;
	lfdiv.style.height = Math.max(lfdiv.offsetHeight,rgdiv.offsetHeight) + 'px'	

	//针对ie 下该操作的速度慢问题
	if(Browser.isIE){		
		var lfi = lfdiv.childNodes.length;
		var balf = $('tempblockacceptlf');
		while( lfi-- > 0 ){
			balf.appendChild(lfdiv.childNodes[lfi]);
		}
		var rgi = rgdiv.childNodes.length;
		var barg = $('tempblockacceptrg');
		while( rgi-- > 0 ){
			barg.appendChild(rgdiv.childNodes[rgi]);
		}
	}
	
	//Block.removeBlockById

	if(document.addEventListener){                  //DOM模型下增加mousemove和mouseup的监听函数；
        document.addEventListener("mousemove",handleCutMove,true);
        document.addEventListener("mouseup",handleCutMouseUp,true);
    }else if(document.attachEvent){                 //IE下增加mousemove和mouseup的监听函数；
        o.setCapture();
        o.attachEvent("onmousemove",handleCutMove);
        o.attachEvent("onmouseup",handleCutMouseUp);
        o.attachEvent("onlosecapture",handleCutMouseUp);
    }else{}                                          //IE5以下版本的操作；
	
    if(e.stopPropagation){
        e.stopPropagation();
    }else{
        e.cancelBubble = true;
    }
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
	
	//切割过程鼠标 move 
	function handleCutMove(e){
		try{
			var lfw = parseInt(lfdiv.style.width) + ( e.clientX - preX )
			var rgw = parseInt(rgdiv.style.width) - ( e.clientX - preX )
			if(lfw >=ANCHOR_WIDTH[0] && rgw >=ANCHOR_WIDTH[0] ){
				lfdiv.style.width = parseInt(lfdiv.style.width) + ( e.clientX - preX ) + 'px'
				rgdiv.style.width = parseInt(rgdiv.style.width) - ( e.clientX - preX ) + 'px'
				preX = e.clientX;
				preY = e.clientY;
			}
		}catch(e){}
		
		if(e.stopPropagation){
            e.stopPropagation();
        }else{
            e.cancelBubble = true;
        }
	}

	//切割过程鼠标 up 
	function handleCutMouseUp(){
		if(document.removeEventListener){           //DOM模型下删除mousemove和mouseup的监听函数；
            document.removeEventListener("mouseup",handleCutMouseUp,true);
            document.removeEventListener("mousemove",handleCutMove,true);
        }else if(document.detachEvent){             //IE模型下删除mousemove和mouseup的监听函数；
            o.detachEvent("onlosecapture",handleCutMouseUp);
            o.detachEvent("onmouseup",handleCutMouseUp)
            o.detachEvent("onmousemove",handleCutMove);
            o.releaseCapture();
        }else{}                                      //IE5以下版本下删除mousemove和mouseup的监听函数；               
		
		var i = ANCHOR_WIDTH.length;
		while( i-- > 0 ){
			var int_lfw = parseInt(lfdiv.style.width);
			var int_rgw = parseInt(rgdiv.style.width);
			if( Math.abs(int_lfw - ANCHOR_WIDTH[i]) < ANCHOR_TOLERANCE + 0.1 ){
				lfdiv.style.width = ANCHOR_WIDTH[i] + 'px';
				info('leftpart width: // ' + ANCHOR_WIDTH[i] )
				rgdiv.style.width = int_rgw - (ANCHOR_WIDTH[i] - int_lfw ) + 'px'
				break;
			}
			if( Math.abs(int_rgw - ANCHOR_WIDTH[i]) < ANCHOR_TOLERANCE + 0.1 ){
				rgdiv.style.width = ANCHOR_WIDTH[i] + 'px';
				info('rightpart width: // ' + ANCHOR_WIDTH[i] )
				lfdiv.style.width = int_lfw - (ANCHOR_WIDTH[i] - int_rgw ) + 'px'
				break;
			}
		}
		lfdiv.style.height = rgdiv.style.height = 'auto'

		//针对ie 下该操作的速度慢问题
		if(Browser.isIE){
			var lfb = balf.childNodes.length;		
			while( lfb -- > 0 ){
				lfdiv.appendChild(balf.childNodes[lfb]);
			}
			var rgb = barg.childNodes.length;		
			while( rgb-- > 0 ){
				rgdiv.appendChild(barg.childNodes[rgb]);
			}
		}
		

		ISCUTTING = 0;
		if(e.stopPropagation){
            e.stopPropagation();
        }else{
            e.cancelBubble = true;
        }
	}
}
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/*
*toolBarClick: 边侧浮动工具条点击控制
*@param o: 事件触发对象 ；
*/
function toolBarClick(o){
	var tb = $('sidetoolbar');
	var bd = $('toolbarbody');
	if(tb.offsetLeft == 0){
		tb.style.left = "-62px";
		bd.style.display = 'none';
		o.className = 'baropen';
		o.onmouseover = function(){
			var a = this;
			return function(){
				toolBarClick(a);
			}			
		}.call(o)
	}else{
		tb.style.left = "0px";
		bd.style.display = '';
		o.className = 'barclos';
		o.onmouseover = null;
	}
}


/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/*
*addLayer: 新增 layer 层 
*@param o: 事件触发对象 ；
*@return: none；
*/
function addLayer(o){
	o.onclick = new Function ('return false');
	var ct = 0	//设置缓冲时间 3 秒
	resumeBtnAddLayer(ct)   //执行缓冲倒计时函数
	if(Layers.length>=MAXLAYERNUM){alert('layer层太多了！最多'+MAXLAYERNUM+'个。'); return}	
		
	var sid = generateID(Layers,MAXLAYERNUM)
	var str = html_layer[1].replace(/\#SN/g,sid)
	if($('layer_'+CURLAYERNUM)){
		$('layer_'+CURLAYERNUM).insertAdjacentHTML('afterend',str);
	}else{
		$('sidetoolbar').insertAdjacentHTML('beforebegin',str);
	}
	Layers.push({'id' : sid,'c' : 1})
	bindLayer(sid)
	popUpPrompt('增加层成功！')	
}
/*
*defineLayer: 设置 layer 布局 
*@param o: 事件触发对象 ；
*@return: none；
*/
function defineLayer(o,n,na,f){	
	if(LAYOUTBUFFER>0) return;
	LAYOUTBUFFER = 1	//设置缓冲时间 3 秒
	resumeBtnDefineLayer()   //执行缓冲倒计时函数
	var lay = o.parentNode.parentNode
	var sid = fetchIdByClass(lay,'layer')
	o.parentNode.insertAdjacentHTML('beforebegin',gen_LayerHTML(n,na,f).replace(/\#SN/g,sid))
	lay.removeChild(o.parentNode)
	if(!$('dgcol').checked){cutLineInitialize($('layer_'+sid))}
}

function deleteLayerContent(n){	
	var i = 0
	while(i<Block.Registry.length){
		var t = Block.Registry[i].container.parentNode		
		while( !t.id || t.id.indexOf('layer')==-1){
			t = t.parentNode
		}		
		if( t.id == 'layer_'+n ){			
			Block.Registry[i] = Block.Registry[Block.Registry.length-1]
			Block.Registry.length--
		}else{
			i++
		}
	}	
}
function deleteLayer(n){
	//if(n==0){alert('默认layer不能删除！'); return}	
	if(confirm('确认删除Layer_'+n+'？')){
		if( n == 0 ){
			var tblks = getElementsByClassName('block','div',$('a0_tube_0'));
			var i = tblks.length;
			while(i-->0){
				var blkid = fetchIdByClass(tblks[i],'block')
				tblks[i].parentNode.removeChild(tblks[i])
				Block.removeBlockById(blkid)
			}
			var tmpstr = ''
			$('reborn').style.display = 'block'
			$('layer_0').style.display = 'none';
		}else{	
			deleteLayerContent(n)
			var p = $('layer_'+n).parentNode
			p.removeChild($('layer_'+n))	
			arrDelete(Layers,n)
		}
	}
}

function resumeBtnDefineLayer(){
	LAYOUTBUFFER--;
	if(LAYOUTBUFFER<=0){		
		return
	}		
	setTimeout('resumeBtnDefineLayer()',1000)
}

function resumeBtnAddLayer(n){
	var la = $('btn_addlayer');
	la.innerHTML = n
	la.title = '缓冲中...'
	if(n<=0){
		la.onclick = new Function ('addLayer(this);return false;')
		la.innerHTML = ''
		la.title = '新增Layer'
		return
	}		
	setTimeout('resumeBtnAddLayer('+ --n +')',1000)
}

function bindLayer(id){		
	var drg = getElementsByClassName( 'layerctr','div',$('layer_'+id) )[0];	
	drg.onmousedown = function(){
		return function(event){
			var e = event || window.event
			doStartMoveLayer(e)
		}
	}.call(drg)
	
	lay = drg.parentNode;
	lay.onmousedown = function (){
		var s = this;		
		return function(){
			if('layer_'+CURLAYERNUM == s.id){return}
			var tmp = s.id.split('layer_');
			var sc = getElementsByClassName('layerctr','div',s)[0];
			var layc;			
			if(layc = $('layer_'+CURLAYERNUM)){
				layc.style.border = "1px solid #ccc"
				layc.style.borderTop = "none"
				getElementsByClassName('layerctr','div',layc)[0].style.borderTop = '8px solid #ccc'
			}
			s.style.border = "1px solid #00fffc";
			s.style.borderTop = "none";
			sc.style.borderTop = '8px solid #00fffc';
			
			var laid = tmp[1];
			CURLAYERNUM = laid;
		}		
	}.call(lay)
}
/*
[新增]层拖拽功能
*/
function startMoveLayer(e){
	var e /*对应事件*/= e || window.event
	var obj /*事件对象*/ = e.srcElement || e.target;        //获得触发事件的对象；
	if(ISDRAGGING == 1 || Block.closingFlag == 1 || Block.foldingFlag == 1 || obj.tagName.toLowerCase() == 'a' || obj.className.indexOf('ant_txt') > -1){        //如果正在移动过程中则停止移动；
        return;
    }

	ISDRAGGING = 1;

	obj = getParentByClassName('layer',obj)                //获得要拖拽的层；
	
	var absoultDiv /*已设为绝对定位的层*/ = new modifyDiv (obj,'relative');	
	var tempDiv /*临时的带边框的占位层*/ =  new createTempDiv(obj,1);
	
	absoultDiv.style.position = 'absolute';

	obj.parentNode.insertBefore(tempDiv ,obj);
	absoultDiv.style.opacity = 0.6;	    
    absoultDiv.style.filter = "alpha(opacity=60)";  //将要拖拽的层设为半透明；
	
	var diffX /*鼠标位置和层开头之间X轴的间距*/= e.clientX - absoultDiv.offsetLeft;
    var diffY /*鼠标位置和层开头之间Y轴的间距*/= e.clientY - absoultDiv.offsetTop;
	
	if(document.addEventListener){                  //DOM模型下增加mousemove和mouseup的监听函数；
        document.addEventListener("mousemove",handleMove,true);
        document.addEventListener("mouseup",handleMouseUp,true);
    }else if(document.attachEvent){                 //IE下增加mousemove和mouseup的监听函数；
        absoultDiv.setCapture();
        absoultDiv.attachEvent("onmousemove",handleMove);
        absoultDiv.attachEvent("onmouseup",handleMouseUp);
        absoultDiv.attachEvent("onlosecapture",handleMouseUp);
    }else{                                          //IE5以下版本的操作；
        var oldMoveHandler = document.onmousemove;
        var oldUpHandler = document.onmouseup;
        document.onmousemove = handleMove;
        document.onmouseup = handleMouseUp;
    }
    if(e.stopPropagation){
        e.stopPropagation();
    }else{
        e.cancelBubble = true;
    }
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
	
	/*
    *replaceTemp：临时层处理函数；
    */
	function handleTempDiv(){
		var returndiv = null		
		var tmpdiv = $('tempContentDiv');						
		returndiv = tmpdiv			
		return returndiv
	}
	/*
    *handleMove：鼠标开始移动时的操作；
    */
    function handleMove(e){
        absoultDiv.style.top = e.clientY - diffY + "px";
        absoultDiv.style.left = e.clientX - diffX + "px";       //层跟这鼠标走--实现拖拽；
        var pointDirection; //目标层的指向; 
        var clDiv  //MAXLAYERNUM = 20 var Layers
		if(!clDiv) clDiv = handleTempDiv();
		//$('bbb').innerHTML = clDiv + ' / ' + $('tempContentDiv') + ' / ' + $('tempContentRep')
        for(var i=0;i<Layers.length;i++){           
			var curLayer = $("layer_" + Layers[i].id)
            if (curLayer == null) { //已经关闭的层不再遍历;
                continue;
            }
            if(curLayer == absoultDiv){    //是本身不遍历；    
                continue;
            }           
            pointDirection = innerPosition(curLayer,e);      //获取目标层指向            
            if(pointDirection == 0){    //如果不在这个层的范围内则继续下一次循环
                continue;
            }else if(clDiv){          //在这个层的上下范围内，进行目标层切换；								
				if(pointDirection == 2){       
					curLayer.parentNode.insertBefore(clDiv,curLayer.nextSibling);        //如果在目标元素下面；
				}else{                                                                          //如果在目标元素上面；      
					try{
					curLayer.parentNode.insertBefore(clDiv,curLayer);    
					}catch(e){
						//$('bbb').innerHTML=clDiv
					}
				}   
                return; 
            }
        }
        
        if(e.stopPropagation){
            e.stopPropagation();
        }else{
            e.cancelBubble = true;
        }
    }    
    /*
    *handleMove：鼠标放开后的操作；
    */
    function handleMouseUp(e){          
        if(document.removeEventListener){           //DOM模型下删除mousemove和mouseup的监听函数；
            document.removeEventListener("mouseup",handleMouseUp,true);
            document.removeEventListener("mousemove",handleMove,true);
        }else if(document.detachEvent){             //IE模型下删除mousemove和mouseup的监听函数；
            absoultDiv.detachEvent("onlosecapture",handleMouseUp);
            absoultDiv.detachEvent("onmouseup",handleMouseUp)
            absoultDiv.detachEvent("onmousemove",handleMove);
            absoultDiv.releaseCapture();
        }else{                                      //IE5以下版本下删除mousemove和mouseup的监听函数；
            document.onmouseup = oldUpHandler;
            document.onmousemove = oldMoveHandler;
        }       
        
        var newDiv = absoultDiv;    //复制拖拽层;
        //newDiv.className = 'block'
        newDiv.style.position = "";         
        newDiv.style.opacity = 1;
        newDiv.style.filter = "alpha(opacity=100)";
        newDiv.style.width = "";
        newDiv.style.height = "";           //以上四行还原层的原始属性；
		newDiv.style.marginTop = 'auto'        
		newDiv.style.marginLeft = 'auto'					
		//newDiv.style.marginBottom = getCurrentStyle(newDiv,'marginBottom')
		
        absoultDiv.parentNode.removeChild(absoultDiv);      //删除原来的拖拽层；
		if($("tempContentDiv")){
			$("tempContentDiv").parentNode.insertBefore(newDiv,$("tempContentDiv"));    //将拖拽的层插入到指定位置；
			$("tempContentDiv").parentNode.removeChild($("tempContentDiv"));        //删除原来的临时占位层；			
		}
		
        if(e.stopPropagation){
            e.stopPropagation();
        }else{
            e.cancelBubble = true;
        }
		
        ISDRAGGING = 0;         //解除拖拽的锁定；      
    }   

}

function doStartMoveLayer(){} 
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/*
描述：样式控制
*/
StyleSheet.Registry = [];
function StyleSheet(id){	
    this.id = id;
	if(id==0){
		this.stylenode = $('ant_linkscript').getElementsByTagName("style")[0];
		this.sheet = document.styleSheets[1];
	}else{		
		if(StyleSheet.getSheetById(id) != null){
			return
		}else if($('style_'+id)){			
			this.stylenode = $('style_'+id);
			var i = 0;			
			while(i<document.styleSheets.length && document.styleSheets[i].id != 'style_'+id){  //只兼容ie
				i++
			}
			this.sheet = document.styleSheets[i];
		}else{
			
			this.stylenode = document.createElement("style");    
			this.stylenode.type = 'text/css';
			this.stylenode.id = 'style_'+id
			if($('ant_linkscript')){
				$('ant_linkscript').appendChild(this.stylenode);		
			}
			this.sheet = document.styleSheets[document.styleSheets.length-1];	
		}		
	}	
	this.rules = this.sheet.rules ? this.sheet.rules : this.sheet.cssRules;
    //this.gRef = 'StyleSheet_' + this.id;
    //eval(this.gRef+'=this');
    StyleSheet.Registry[StyleSheet.Registry.length] = this;
} 
/*
描述：静态方法，通过id获取StyleSheet对象
参数：id 为StyleSheet对象的唯一标志
*/
StyleSheet.getSheetById = function(id){
    var i = 0
    while(i<StyleSheet.Registry.length){
        if(StyleSheet.Registry[i].id == id){			
            return StyleSheet.Registry[i]
        }
        i++
    }	
    return null
} 

/*
描述：静态方法，通过id删除StyleSheet对象
参数：id 为StyleSheet对象的唯一标志
*/
StyleSheet.removeSheetById = function(id){    
    var i = 0
    while(i<StyleSheet.Registry.length){
        if(StyleSheet.Registry[i].id == id){
            var t = StyleSheet.Registry[i]
			t.stylenode.parentNode.removeChild(t.stylenode)

            t = StyleSheet.Registry[StyleSheet.Registry.length-1]
            StyleSheet.Registry.length --				
        }
        i++
    }
    return null
}

/*
描述：查找样式rule，成功返回index，否则返回-1
参数：selector 为rule名称
*/
StyleSheet.prototype.indexOf = function(selector){
    for(var i=0; i<this.rules.length; i++){
        if(this.rules[i].selectorText == selector){
            return i;
        }
    }
    return -1;
}
/*
描述：删除样式rule
参数：n 为rule名称或索引
*/
StyleSheet.prototype.removeRule = function(n){	
    if(typeof(n)=='number'){
        if(n<this.rules.length && n>=0){
            this.sheet.deleteRule ? this.sheet.deleteRule(n) : this.sheet.removeRule(n);
        }
    }else{
        var i = this.indexOf(n)
        this.sheet.deleteRule ? this.sheet.deleteRule(i) : this.sheet.removeRule(i);
    }
}
/*
描述：清空rule
*/
StyleSheet.prototype.removeAllRule = function(){
	while(this.rules.length){
		this.removeRule(0)			
	}    
}
/*
描述：添加新样式rule
参数：selector 为rule名称
      styles   为rule的style
      n        为位置
*/
StyleSheet.prototype.addRule = function(selector,styles,n){   
    if(typeof(n)=='undefined'){
        n = this.rules.length;
    }
    if(typeof(n)=='number' && n<=this.rules.length && n>=0){ 
        this.sheet.insertRule ? this.sheet.insertRule(selector + '{'+ styles +'}',n) : this.sheet.addRule(selector,styles,n);
    }
}
/*
描述：设置样式rule的某属性
参数：selector    为rule名称
      attribute   为rule的属性名
      _value      为要设置的值
*/
StyleSheet.prototype.setRuleStyle = function(selector,attribute,_value){   
    var i = this.indexOf(selector);	
	if(i>-1)
		this.rules[i].style[attribute] = _value;
}
/*
描述：获取样式rule的某属性
参数：selector    为rule名称
      attribute   为rule的属性名
返回：rule相应属性的值
*/
StyleSheet.prototype.getRuleStyle = function(selector,attribute){   
    var i = this.indexOf(selector);
    return this.rules[i].style[attribute];
}

/*
描述：成块添加样式rule
参数：piece    为成块rule字符串
      n        为添加的位置
*/
StyleSheet.prototype.addRulePiece = function(piece,n){   
    var cssrules = piece.split('}');
    for(var i = 0; i < cssrules.length-1; i++){
        var a = cssrules[i].split('{');
        var selector = a[0];
        var styles = a[1]
        this.addRule(selector,styles,n)
    }		
}


/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/


/*
功能：获取需要设置的<a>节点或者<img>节点
获取 对象节点的第一个自定义节点，并返回该节点，自定义节点包含文本节点对应 type:'text' 和 图片节点对应 type:'img'
依赖函数：getNextSibling()
*/	
function getFirstTypeNode(oNode,type,fir){
	var rNode = null;
	for (var i = 0; i < oNode.childNodes.length; i++) {
		if( oNode.childNodes[i].nodeType == 1 && oNode.childNodes[i].className.indexOf('del') > -1 ){
			continue;
		}
		if( type.toLowerCase() != 'text' && oNode.childNodes[i].nodeType == 1 && oNode.childNodes[i].tagName.toLowerCase() == type){
			rNode = oNode.childNodes[i];
			break;
		}else if (oNode.childNodes[i].hasChildNodes()) {			
			rNode = getFirstTypeNode(oNode.childNodes[i],type)
			if(rNode) break;
		}else if( type.toLowerCase() == 'text' && fir == 1 && oNode.childNodes[i].nodeType == 3 && getNextSibling(oNode.childNodes[i]) && getNextSibling(oNode.childNodes[i]).tagName=='BR' ){
			rNode = oNode.childNodes[i];
			break;
		}else if( type.toLowerCase() == 'text' && fir!= 1 && oNode.childNodes[i].nodeType == 3 && !getNextSibling(oNode.childNodes[i]) ) {
			rNode = oNode.childNodes[i];
			break;		
		}
	}	
	return rNode;
}	

/*
设置链接的引导函数
*/	
function aOnClick(e){	
	GLOBALNODE = e.srcElement || e.target 
	var imgStr = '', txtStr = '', linkstr_1 = '', linkstr_2 = ''
	while(GLOBALNODE.tagName.toLowerCase() != 'a' && GLOBALNODE.className.indexOf('ant_txt') == -1 ){                   
		GLOBALNODE = GLOBALNODE.parentNode
	}
	var simgnode = getFirstTypeNode(GLOBALNODE,'img')
	var stxtnode = getFirstTypeNode(GLOBALNODE,'text')  
	
	if(simgnode){
		var imgw = Browser.isIE ? simgnode.width - parseInt(getCurrentStyle(simgnode,'paddingLeft')) - parseInt(getCurrentStyle(simgnode,'paddingRight')) : simgnode.width;
		var imgh = Browser.isIE ? simgnode.height - parseInt(getCurrentStyle(simgnode,'paddingTop')) - parseInt(getCurrentStyle(simgnode,'paddingBottom')) : simgnode.height;
		var imgStr = '图片：<input id="alk_img" type="text" value="'+simgnode.src+'" onfocus="this.select()" /><br />图宽：<input id="alk_imgw" type="text" size="3" value="'+ imgw +'" /> 图高：<input id="alk_imgh" type="text" size="3" value="'+ imgh +'" /><br/>';
	}
	if(stxtnode) var txtStr = '文字：<textarea id="alk_text" onfocus="this.select()" />'+stxtnode.nodeValue+'</textarea><br/>'
	var trlog
	if(trlog = GLOBALNODE.getAttribute('onmousedown')){
		trlog = trlog.split('tracelog=')
		trlog = trlog[1].split('\'')
		trlog = trlog[0]
	}else{
		trlog = ''
	}
	if(GLOBALNODE.tagName.toLowerCase() == 'a'){
		if(GLOBALNODE.href.indexOf('file:///')==0){GLOBALNODE.href=''}
		var linkstr_1 = '链接：<input id="alk_href" type="text" value="'+GLOBALNODE.href+'" onfocus="this.select()" />'
		var linkstr_2 = '<input class="r" type="button" value="去链接" onclick="doSetALink(2);$(\'alk_href\').value=\'\'" /><div class="c mt14"></div>跟踪参数：<input id="alk_trlog" type="text" value="'+trlog+'"/>'
	}
	//GLOBALNODE.setAttribute('onmousedown',"return aliclick(this,'?tracelog="+$('alk_trlog').value+"')")		
	e.cancelBubble=true
	var t = (e.clientY < 0 ? (e.clientY + 30) : e.clientY)  + document.documentElement.scrollTop + 'px'
	var l = ((e.clientX - 260) < 0 ? (e.clientX - 20) : (e.clientX - 200)) + document.documentElement.scrollLeft + 'px'	
	createPopDiv('popbox',t,l)
	$('popbox').className = 'popbox_a';
	$('popbox').innerHTML = imgStr + txtStr + linkstr_1 + '<div class="c"></div><input class="l" type="button" value="确定" onclick="doSetALink()" /><input class="r" type="button" value="删除" onclick="doSetALink(1)" />' + linkstr_2;
	document.documentElement.scrollLeft = 10000;
	return false;
}
/*
用于关联aOnClick函数，此函数作用在于  清除或恢复js功能 对应 预览状态和编辑状态
*/	
function doAOnClick(){}

function setInnerALink(o){	
	var as = []
    var bs = o.getElementsByTagName('a');
	var cs = getElementsByClassName('ant_txt','*',o);
	var i = 0;	
	while(i<bs.length){			
		as.push(bs[i])
		i++;
	}
	i = 0;
	while(i<cs.length){			
		as.push(cs[i])
		i++;
	}
	if(o.tagName.toLowerCase() == 'a' && as.length == 0 || o.className.indexOf('ant_txt') > -1 && as.length == 0){
		as = [o]
	}
	
    i=0;	
	
    while( i < as.length ){	
		
			if( getParentByClassName('del',as[i]) == null && as[i].className.search(/\bnoset\b/g) == -1 ) {
				var rg = /\bdel\b/g			
				if(!rg.test(as[i].className)){
					//as[i].setAttribute('__del__onclick','aOnClick(event);return false;')
					//as[i].setAttribute('__del__ondblclick','doSetALink(1);')
					as[i].onclick = function(){ 
						return function(event){
							var e = event || window.event						
							return doAOnClick(e)						
						}
					}.call(as[i])
					//as[i].ondblclick = function(){doSetALink(1);}	
				}	
			}
		
        i++;		
    }
}
/*
确认设置链接相关参数 
*/	
function doSetALink(c){
    if(GLOBALNODE){
        if(c==1){
			var g = GLOBALNODE;
			if( g.className.indexOf('base') > -1 ){
				var nxg = getNextSibling(g);
				if(nxg && nxg.className.indexOf('ext') > -1){
					nxg.parentNode.removeChild(nxg);
				}else if(nxg){
					nxg.className += ' base';
				}
			}
			g = g.parentNode;
			g.removeChild(GLOBALNODE);
			
			while( g && trim(g.innerHTML) == '' ){				
				if( g.className.indexOf('base') > -1 ){
					var nx = getNextSibling(g);
					if( nx && nx.className.indexOf('ext') > -1 ){
						nx.parentNode.removeChild(nx);
					}else if(nx){
						nx.className += ' base';
					}
				}
				var t = g;
				g = t.parentNode;
				g.removeChild(t);
			}

			
			popClose()
        }else if(c==2){
			GLOBALNODE.removeAttribute('href')	
		}else{
			if($('alk_img')){
				if( $('alk_img').value){
					getFirstTypeNode(GLOBALNODE,'img').src = $('alk_img').value 
				}
				if($('alk_imgw')){
					var simgnode = getFirstTypeNode(GLOBALNODE,'img')
					if(simgnode){
						
						var bl = getCurrentStyle(simgnode,'borderLeftStyle')=='none' ? 0 : parseInt(getCurrentStyle(simgnode,'borderLeftWidth'))							
						var br = getCurrentStyle(simgnode,'borderRightStyle')=='none' ? 0 : parseInt(getCurrentStyle(simgnode,'borderRightWidth'))
						var ml = parseInt(getCurrentStyle(simgnode,'marginLeft'))
						var mr = parseInt(getCurrentStyle(simgnode,'marginRight'))
						var pl = parseInt(getCurrentStyle(simgnode,'paddingLeft'))
						var pr = parseInt(getCurrentStyle(simgnode,'paddingRight'))
						ml = ml ? ml : 0
						mr = mr ? mr : 0
						GLOBALNODE.style.width =  bl + br + ml + mr + pl + pr +  parseInt($('alk_imgw').value)  + 'px'
						simgnode.width =  $('alk_imgw').value;	
					}					
				}
				if($('alk_imgh')){
					getFirstTypeNode(GLOBALNODE,'img').height = $('alk_imgh').value; 
				}
            }            
            if( $('alk_text') && $('alk_text').value ){
                getFirstTypeNode(GLOBALNODE,'text').nodeValue = $('alk_text').value
				GLOBALNODE.title = $('alk_text').value
				if($('alk_img')){
					getFirstTypeNode(GLOBALNODE,'img').alt =  $('alk_text').value
				}
            }
			if($('alk_href')){
                GLOBALNODE.setAttribute( 'href', $('alk_href').value )              
            }
			if($('alk_trlog') && $('alk_trlog').value ){
				GLOBALNODE.setAttribute('onmousedown',"return aliclick(this,'?tracelog="+trim($('alk_trlog').value)+"')")	
            }
			popClose()
        }
       
    }
}
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/*
描述：拖拽功能绑定，并调用setInnerALink函数设置链接点击
*/
function bindBlock(id){
	var nw = new Block(id)		
	var drg = nw.isBox ? getElementsByClassName('blkbar','div',$('block_'+id))[0] : getElementsByClassName('tt','div',$('block_'+id))[0];
	
	drg.onmousedown = function(){
		return function(event){
			var e = event || window.event
			doStartMove(e)
		}
	}.call(drg)

	var mks = getElementsByClassName('mark','*',$('block_'+id))
	var j = 0;
	while(j<mks.length){		
		mks[j].onmousedown = function(){
			return function(event){				
				startMove_2(event);
			}
		}.call(mks[j])
					
		mks[j].ondblclick = function(){
			return function(event){				
				setTopWords(event)					
		}
		}.call(mks[j])
		
		j++;
	}
	setInnerALink($('block_'+id))
}

function insertBlock(p0,p1,p2,insertStr,n){	
	var bid = newBlock(GLOBALNODE.parentNode,n);
	var bar = getElementsByClassName('ctrbar2','div',$('block_'+bid))[0];
	insertCont(bar,p0,p1,p2,0,insertStr);
	window.setTimeout("frames['popout_iframe2'].recoverConfirm()",2000);
}

/* 解决 ff 下 dblclick 重复问题 */
function newIBlock(e,b,n){
	if(e.detail && e.detail == 2) return;
	newBlock(b.parentNode.parentNode.parentNode,n)
}

/*
描述：新增导航block块
*/
function addNavBlock(t,n){
	var linkscript = new LinkScript()
	var urlpre = URL_PARTS;
	linkscript.checkLoad(urlpre + 'parts_js_nav' + '.css','css')
	linkscript.checkLoad(urlpre + 'parts_js_nav' + '.js?t=233','js')	
	newBlock(t,n)
}

/*
描述：新增block块
*/
function newBlock(t,n){   
	//var id = Block.getStoreId() 
	if(Block.Registry.length>=Block.maxNum){alert('block块太多了！最多'+Block.maxNum+'个。'); return}
	var id = generateID(Block.Registry,Block.maxNum)
	if(t){
		t.insertAdjacentHTML("afterend",html_block[n].replace(/\#id/g,id)) 	
		bindBlock(id)		
		var rb = $("block_"+id);
		if(!isLastElement(rb)){
			addSpace(rb);
		}else{
			delSpace(rb);
		}		
	}
	return id;		
}

Block.Registry = [];
//Block.IdStore = [];
Block.maxNum = 100
Block.foldSpeed = 5;
Block.disappearStep = 5;
Block.disappearTime = 100;
Block.foldingFlag = 0
Block.closingFlag = 0
Block.minCPUResolution = 10;

function Block(id){
    if(Block.getBlockById(id) != null) return
    this.id = id;	
	this.isFolduping = 0
	this.isFolden = 0
	this.isDragging = 0;
	this.isClosing = 0;
	this.isBox = 0
	this.title = null;
	this.ttPm = null; 
	this.cont = null
	this.contPm = null;	
	
	if($('cont_'+id)){
		this.cont = $('cont_'+id);

		//以下为无数据保存情况下根据currentStyle 自动填充 Param_cont 数据
		//var tmpct = this.cont.className.split('cont_');
		//tmpct = tmpct[1].split(' ')
		//this.contPm = tmpct[0];
		//pushParamCont(this.cont,this.contPm)
		////////////////////////////////////////////////
	}
	
	if($('title_'+id)){	
		this.title = $('title_'+id)
		//this.titleLeft = $('title_'+id).getElementsByTagName('div')[0]
		//this.titleLeft.style.backgroundPosition = '0px 0px'

		//以下为无数据保存情况下根据currentStyle 自动填充 Param_tt 数据
		//var tmptt = this.title.className.split('tt_');
		//tmptt = tmptt[1].split(' ')
		//this.ttPm = tmptt[0];
		//pushParamTt(this.title,this.ttPm)
		////////////////////////////////////////////////

		//alert(Param_tt[0].p.join())
//		var p = Param_tt[arrIndexOf(Param_tt,this.ttPm)].p
//		var ds = this.title.getElementsByTagName('div');
//		ds[1].style.backgroundPostion = '0px -' + p[4] + 'px';
//		ds[ds.length-2].style.backgroundPostion = '0px -' + p[6] + 'px';
		if( this.title.parentNode.className.indexOf('block')==-1 )
			this.isBox = 1
	}else{
		this.isBox = 1
	}
    this.container = $('cont_in_'+id)      
	this.container_height = 0;
	this.blockfull_height = 0;
	this.amount = 0

    this.gRef = "Block_"+this.id
    eval(this.gRef+"=this")
    Block.Registry[Block.Registry.length] = this
}
/*
Block.getStoreId = function(){
    if(Block.IdStore.length>1){
        return Block.IdStore.pop()
    }else if(Block.IdStore.length == 1){
        var t = Block.IdStore.pop()
        Block.IdStore.push(Block.Registry.length + 1)
        return t
    }else{
        return Block.Registry.length 
    }
}
*/

Block.getBlockById = function(id){          
    var i = 0
    while(i<Block.Registry.length){
        if(Block.Registry[i].id == id){
            return Block.Registry[i]
        }
        i++
    }
    return null
}

Block.removeBlockById = function(id){
    //if( id < Block.Registry.length - 1 ) Block.IdStore.push(id);
    var i = 0
    while(i<Block.Registry.length){
        if(Block.Registry[i].id == id){
            var t = Block.Registry[i]
            Block.Registry[i] = Block.Registry[Block.Registry.length-1]
            Block.Registry.length --
            return t
        }
        i++
    }
    return null
}

Block.prototype.getBlockMargin = function(){
	return parseInt(getCurrentStyle($('block_'+this.id),'marginBottom'));	
}
Block.prototype.setTtPm = function(id){ //p 为tt 参数数组
	this.ttPm = id
}
Block.prototype.setContPm = function(id){ //p 为tt 参数数组
	this.contPm = id
}

Block.prototype.subtractHeight = function(){
	if(!this.isFolduping){
		Block.foldingFlag = 1
		this.isFolduping = 1
		this.container_height = this.container.offsetHeight;			
		this.amount = parseInt(this.container_height / Block.foldSpeed ) || 7  
	}
	var nowHeight /*递减容器的即时宽度*/ = this.container.offsetHeight - this.amount; 
	
	this.container.style.height = nowHeight >=0 ? nowHeight + 'px' : '7px'           
	if( nowHeight > this.amount ){
		window.setTimeout( this.gRef + '.subtractHeight()',10)
	}else if( this.container.style.visibility != 'hidden' && !this.isBox ){	
			this.container.style.height = 2 * this.getBlockMargin() + 'px' 
			this.container.className = ''
			this.container.style.visibility = 'hidden'			
			window.setTimeout( this.gRef + '.subtractHeight()',10)
	}else{
		this.container.style.height = '7px'
		this.isFolden = 1
		this.isFolduping = 0
		Block.foldingFlag = 0
	}			
    
}
Block.prototype.addHeight = function(){	
	if(!this.isFolduping){
		this.isFolduping = 1
		Block.foldingFlag = 1
	}
    try{
		//this.container.parentNode.parentNode.className = 'block nopr'
        //if(!this.isFolduping) this.className = this.className.replace(' min','')       
        var pHeight /*容器即时高度*/ = this.container.offsetHeight + this.amount;            
       
		if( pHeight >= 2 * this.getBlockMargin() && this.container.style.visibility != 'visible' && !this.isBox){
			pHeight = pHeight - 2 * this.getBlockMargin()			
			this.container.className = 'cont_in'
			this.container.style.visibility = 'visible'			
		}

		this.container.style.height = pHeight + 'px'
        if( pHeight < this.container_height - this.amount ){
            window.setTimeout( this.gRef + '.addHeight()',Block.minCPUResolution)
        }else if( pHeight <= this.container_height ){			
            this.container.style.height = '';       
			this.container.style.position = ''			
			this.container.style.overflow = ''
			this.isFolden =0
			this.isFolduping = 0
			Block.foldingFlag = 0
        }
    }catch(e){ return }
}

Block.prototype.disappear = function(nShowNumber){
	//if(this.isBox) return
    var b = this.container.parentNode.parentNode
    if( this.isClosing == 0 ){
        this.blockfull_height = b.offsetHeight
    }
    Block.closingFlag = this.isClosing = 1  
    var showNumber /*要关闭的层*/ = nShowNumber - parseInt(100 / Block.disappearStep) - 1;
    if(showNumber > 0){ //如果透明度不为0则逐渐减少其透明度使其为0
        b.style.opacity = showNumber / 100;
        b.style.filter = "alpha(opacity=" + showNumber + ")";
        setTimeout( this.gRef + ".disappear("+showNumber+")",Block.disappearTime);
    }else{  //如果透明度已经为0则删除已绝对定位的层并逐步减少占位层的高度
		
		if(isLastElement(b)){
			var preblock  = getPreviousSibling(getPreviousSibling(b));			
			if( preblock ){				
				delSpace(preblock)
			}
		}
        b.parentNode.removeChild(b);
		
        Block.removeBlockById(this.id)		
        subtractHeight(this.blockfull_height,'tempContentDiv_' + this.id,this.blockfull_height / Block.foldSpeed);  //调用subtractHeight函数，逐步减少占位层的高度；
		Block.closingFlag = 0
    }
}
Block.prototype.createTempDiv = function (hasBorder){   
    var objHeight /*获取原先层的高度*/ = this.container.parentNode.parentNode.offsetHeight;     
    var containerTempObject /*在原位置上创建的新层*/ = document.createElement("div");
    containerTempObject.id = 'tempContentDiv_' + this.id;
	containerTempObject.style.overflow = 'hidden'
    //containerTempObject.style.position = "static";
    if(hasBorder == 1){     //生成带虚线边框的层；
        containerTempObject.style.height = objHeight -2 + 'px';
        if(Browser.isIE)
            containerTempObject.style.marginBottom = '-3px'		
        containerTempObject.className = $('block_'+this.id).className + ' tmpbd'
    }else{      //生成不带虚线边框占位层；
        containerTempObject.style.height = objHeight + 'px';
        containerTempObject.className = $('block_'+this.id).className ;
    }
    return containerTempObject;
}
/*
*createTempDiv：在原层的位置创建一个临时层，作为原层消失后的参照物；
*@param formerObject: 原始的div；
*@param hasBorder: 创建的层是否有虚线边框,0:不带虚线边框；1：带虚线边框；
*@type Object
*@return: containerTempObject 所创建的临时层；
*/
function createTempDiv(formerObject,hasBorder){ 
    var objHeight /*获取原先层的高度*/ = formerObject.offsetHeight;     
    var containerTempObject /*在原位置上创建的新层*/ = document.createElement("div");   

    containerTempObject.id = "tempContentDiv";
    //containerTempObject.style.position = "static";
    var mgb = parseInt(getCurrentStyle(formerObject,'marginBottom')) || 0

    if(hasBorder == 1){     //生成带虚线边框的层；
        containerTempObject.style.height = objHeight -2 +"px";
        if(Browser.isIE){            
			containerTempObject.style.marginBottom = mgb - 3 + 'px'; 
		}
		else{
			containerTempObject.style.marginBottom = mgb + 'px';
		}
		containerTempObject.className = 'tmpbd'
    }else{      //生成不带虚线边框占位层；
        
        containerTempObject.style.height = objHeight +"px";
        containerTempObject.style.marginBottom = mgb + 'px';
    }

    return containerTempObject;
}

/*
*modifyDiv ：将原始的层设为绝对定位；
*@param formerObject: 原始的div
*@param p: 参数决定原始的div的position属性将取的值
*@type Object
*@return: formerObject 已设为绝对定位的层；
*/
function modifyDiv(formerObject,p){
    var referenceO = getXY(formerObject)	
    formerObject.style.position = p;	
    if(Browser.isIE){
        formerObject.style.marginTop = '1px'
        formerObject.style.marginLeft = '1px'
    }else{
        formerObject.style.marginTop = '0px'
		formerObject.style.marginLeft = '0px'
    }
    formerObject.style.zIndex = 1000;
    formerObject.style.width = referenceO[2] + 'px';
    formerObject.style.height = referenceO[3] + 'px';
    formerObject.style.top = referenceO[0] + 'px';
    formerObject.style.left = referenceO[1] + 'px';		
    return formerObject;
}
/*
*函数名：subtractHeight:    递减容器高度
*@param nHeight:        容器即时高度；
*@param objId:          要减高度的容器的id；
*@param iscreateDiv:    减高度后是否创建替代容器，防止整栏关闭后的错位 1：创建、0：不创建；
*/
function subtractHeight(nHeight,objId,amount){  
    var nowHeight /*递减容器的即时宽度*/ = nHeight - amount;
    var subtractDivId /*递减容器的ID*/ = objId;
    $(subtractDivId).style.height = nowHeight >= 0 ? nowHeight + 'px' : '0px';   
    if(nowHeight > amount){     
        window.setTimeout("subtractHeight("+nowHeight+",'"+subtractDivId+"',"+amount+")",Block.minCPUResolution);
    }else{
        $(subtractDivId).parentNode.removeChild($(subtractDivId))   
    }
}

function layerMin(o){
	var f;
	
	if(o.title=='0'){
		f=1;o.title='1'
	}else{
		f=0;o.title='0'
	}
	
	minAll(fetchIdByClass(o,'layer'),f);
}

function pressMinAll(o,id){
	var f;
	if(o.className == 'btn_smlayer'){
		f=1;
		o.className = 'btn_lglayer'
	}else{
		f=0;
		o.className = 'btn_smlayer'
	};
	minAll(id,f);	
}
/*
*函数名：minAll:   最小/最大化Layer
*@param       a:   Layer ID
*@param       f:   最小/最大化判断
*/
function minAll(a,f){
    var i = 0  
	var as = $('layer_'+a).getElementsByTagName('a')
   
    while(i<as.length){
        if(as[i].className.indexOf('bar_min')>-1 && f==1)
            as[i].className = as[i].className.replace('bar_min','bar_arror')
        else if(as[i].className.indexOf('bar_arror')>-1 && f!=1 )
            as[i].className = as[i].className.replace('bar_arror','bar_min')
        i++
    }		
	i = 0  	
    while(i < Block.Registry.length){	
		if( getParentByClassName('tube',Block.Registry[i].container).id.indexOf( 'a' + a + '_' ) > -1){				
			if (Block.Registry[i].isFolden == 0 && f == 1) { //如果当前为展开状态则进行折叠操作；        
				Block.Registry[i].container.style.position = 'relative'
				Block.Registry[i].container.style.overflow = 'hidden'
				Block.Registry[i].subtractHeight();				
				//obj.className = oClassName.replace("bar_min", "bar_arror");   //切换触发器的状态；
			}else if(Block.Registry[i].isFolden ==1 && f != 1 ){     //如果当前为折叠状态则进行展开操作；        
				Block.Registry[i].addHeight();  				
				//obj.className = oClassName.replace("bar_arror", "bar_min");   //切换触发器的状态；
			}
		}
        i++
    } 	
}

function changeVisible(obj){
	var bobj = Block.getBlockById(fetchIdByClass(obj))
    if(bobj.isClosing == 1 || bobj.isFolduping == 1 || ISDRAGGING == 1){   //如果已经在切换过程中则退出该函数，不执行任何操作；		
        return;
    } 
	
    var oClassName /*触发器的class名*/ = obj.className;		
    if (bobj.container.style.height == '' && !bobj.isFolden ) {   //如果当前为展开状态则进行折叠操作； 
		bobj.container.style.position = 'relative'
		bobj.container.style.overflow = 'hidden'
        bobj.subtractHeight();              
        obj.className = oClassName.replace("bar_min", "bar_arror"); //切换触发器的状态；
    }else if(bobj.isFolden){     //如果当前为折叠状态则进行展开操作；        
        bobj.addHeight();           
        obj.className = oClassName.replace("bar_arror", "bar_min"); //切换触发器的状态；
    }
}
/*
*hiddenContainer: 关闭层的函数；
*@param obj：要关闭的层；
*/
function closeContainer(o){
	var bobj = Block.getBlockById(fetchIdByClass(o))
    if(bobj.isClosing == 1 || ISDRAGGING == 1){        //判断是否已锁定，如已锁定则不进行关闭操作
        return false;
    }       
    var disappearDiv = bobj.container.parentNode.parentNode
    try{            		
        var absoultDiv /*已设为绝对定位的层*/ = modifyDiv (disappearDiv,'relative');               		
        var tempDiv /*临时的占位层*/ = bobj.createTempDiv(0);  	
		tempDiv.style.marginBottom = bobj.getBlockMargin() + 'px'
		absoultDiv.style.position = 'absolute'
        disappearDiv.parentNode.insertBefore(tempDiv ,disappearDiv);            
        bobj.disappear(100);    
    }catch(e){      //如发生错误则取消延时效果直接关闭；
    }
}

/*
*函数名：innerPosition:  获得拖拽目标层的指向；
*@param obj:    正在检查的元素；
*@param e:  鼠标事件；
*@type number; 
*@return: 0：不在这个层的指向范围内；1：在这个层上方；2：在这个层下方；
*/
function innerPosition(obj,e){
    var e /*鼠标事件*/=e?e:(window.event?window.event:null);
    var a /*拖拽元素的位置集合*/ = getXY(obj);
	var eX = e.clientX + document.documentElement.scrollLeft
	var eY = e.clientY + document.documentElement.scrollTop
    if (eX>a[1] && eX<=(a[1]+a[2]) && eY>a[0] && eY <=(a[0]+a[3])){ //如果鼠标在元素范围内；
        if(eY<(a[0]+a[3]/2)){
            return 1;   //向上;
        }else{
            return 2;   //向下;
        }
    }else{  //如果鼠标在元素范围外同时该竖栏只有一个元素；
        return 0;       
    }
}

/*
*函数名：hasContainerChild:  检查容器内是否含有id为content开头的子元素；
*@param obj:    要检查的容器；
*@param content:    要匹配的内容；
*@type number; 
*@return: childNum：子容器个数；
*/
function hasContainerChild(obj,content){
    var childNum /*是否有子容器*/= 0;
	
    for(var i=0;i<obj.childNodes.length;i++){
        if((obj.childNodes[i].id) && obj.childNodes[i].id.indexOf(content)==0){
            childNum += 1;
        }
    }
    return childNum;
}

/*
addSpace: 针对block层，增加空隙层
*/
function addSpace(o){
	
	try{
		if(o.className.indexOf("block") > -1){
			var l = getLastElementChild(o);
			if( l && l.className && l.className != 'bdspace' || !l ){
				var bs = document.createElement('div');
				bs.className = 'bdspace';
				o.appendChild(bs);				
			}
		}
	}catch(e){}
}
/*
delSpace: 针对block层，去除空隙层
*/
function delSpace(o){
	try{
		var l = getLastElementChild(o)		
		if( l && l.className && l.className =='bdspace' ){			
			o.removeChild(l);						
		}
	}catch(e){}
}

/*
*函数名：startMove:  开始移动；
*@param e:  事件；
*/
var ISDRAGGING = 0
function startMove(e){
    var e /*对应事件*/= e || window.event       
    var obj /*事件对象*/ = e.srcElement || e.target;        //获得触发事件的对象；
    if(ISDRAGGING == 1 || Block.closingFlag == 1 || Block.foldingFlag == 1 || obj.tagName.toLowerCase() == 'a' || obj.className.indexOf('ant_txt') > -1){        //如果正在移动过程中则停止移动；
        return;
    }   
	CTRL_LOCK = true;
    ISDRAGGING = 1;

    obj = getParentByClassName('block',obj)                //获得要拖拽的层；   
	var topobj = null;
	if(isLastElement(obj)){
		topobj = getPreviousSibling(obj);
	}
	var temp 
	temp = obj.id.split("_")
	var blkid = temp[1]

	if(CTRL){		
		var clone_obj = obj.cloneNode('true')
		var absoultDiv /*已设为绝对定位的层*/ = new modifyDiv (obj,'relative');		
		var tempDiv /*临时的不带边框的占位层*/ =  new createTempDiv(obj);
		var newblkid = generateID(Block.Registry,Block.maxNum)
		tempDiv.innerHTML = clone_obj.innerHTML.replace(/id\s*=\s*[\"\']?title_\d+[\"\']?/g,'id="title_'+newblkid+'"').replace(/id\s*=\s*[\"\']?cont_\d+[\"\']?/g,'id="cont_'+newblkid+'"').replace(/id\s*=\s*[\"\']?cont_in_\d+[\"\']?/g,'id="cont_in_'+newblkid+'"')		
	}else{
		var absoultDiv /*已设为绝对定位的层*/ = new modifyDiv (obj,'relative');			
		var tempDiv /*临时的带边框的占位层*/ =  new createTempDiv(obj,1);
	}	

	absoultDiv.style.position = 'absolute'	
	//absoultDiv.className = 'block nopr'
	
	obj.parentNode.insertBefore(tempDiv ,obj);
    absoultDiv.style.opacity = 0.6;	    
    absoultDiv.style.filter = "alpha(opacity=60)";  //将要拖拽的层设为半透明；		
	
    var diffX /*鼠标位置和层开头之间X轴的间距*/= e.clientX - absoultDiv.offsetLeft;
    var diffY /*鼠标位置和层开头之间Y轴的间距*/= e.clientY - absoultDiv.offsetTop;	

    if(document.addEventListener){                  //DOM模型下增加mousemove和mouseup的监听函数；
        document.addEventListener("mousemove",handleMove,true);
        document.addEventListener("mouseup",handleMouseUp,true);
    }else if(document.attachEvent){                 //IE下增加mousemove和mouseup的监听函数；
        absoultDiv.setCapture();
        absoultDiv.attachEvent("onmousemove",handleMove);
        absoultDiv.attachEvent("onmouseup",handleMouseUp);
        absoultDiv.attachEvent("onlosecapture",handleMouseUp);
    }else{                                          //IE5以下版本的操作；
        var oldMoveHandler = document.onmousemove;
        var oldUpHandler = document.onmouseup;
        document.onmousemove = handleMove;
        document.onmouseup = handleMouseUp;
    }
    if(e.stopPropagation){
        e.stopPropagation();
    }else{
        e.cancelBubble = true;
    }
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
	
	/*
    *replaceTemp：临时层处理函数；
    */
	function handleTempDiv(){
		var returndiv = null		
		var tmpdiv = $('tempContentDiv');
		if(CTRL && tmpdiv && !$('tempContentRep')){		
			returndiv = tmpdiv.cloneNode(true)
			tmpdiv.id = 'tempContentRep'
			returndiv.style.filter = "alpha(opacity=60)"
		}else if(!CTRL && $('tempContentRep') && tmpdiv){					
			$('tempContentRep').parentNode.removeChild($('tempContentRep'))
			returndiv = tmpdiv	
		}else if($('tempContentRep') && !tmpdiv){
			$('tempContentRep').id = 'tempContentDiv'
		}else{					
			returndiv = tmpdiv
		}	
		return returndiv
	}
    /*
    *handleMove：鼠标开始移动时的操作；
    */
    function handleMove(e){         
		
        absoultDiv.style.top = e.clientY - diffY + "px";
        absoultDiv.style.left = e.clientX - diffX + "px";       //层跟这鼠标走--实现拖拽；
        var pointDirection; //目标层的指向; 
        var clDiv
		if(!clDiv) clDiv = handleTempDiv();
		//$('bbb').innerHTML = clDiv + ' / ' + $('tempContentDiv') + ' / ' + $('tempContentRep')
        for(var i=0;i<Block.Registry.length;i++){           
			var curBlock = $("block_" + Block.Registry[i].id)
            if (curBlock == null) { //已经关闭的层不再遍历;
                continue;
            }
            if(curBlock == absoultDiv){    //是本身不遍历；    
                continue;
            }           
            pointDirection = innerPosition(curBlock,e);      //获取目标层指向            
            if(pointDirection == 0){    //如果不在这个层的范围内则继续下一次循环
                continue;
            }else if(clDiv){          //在这个层的上下范围内，进行目标层切换；				
				if(pointDirection == 2){										
					curBlock.parentNode.insertBefore(clDiv,curBlock.nextSibling);        //如果在目标元素下面；
				
				}else{                                                                          //如果在目标元素上面；      
					try{					
					curBlock.parentNode.insertBefore(clDiv,curBlock);    
					}catch(e){
						//$('bbb').innerHTML=clDiv
					}
				}   

                return; 
            }
        }
        
        for(var j=0;j<4;j++){
			for(var k=0;k<Layers.length;k++){   //如果没有一个层在内的话则检查所有竖栏；				
				if( temp = $('a'+ Layers[k].id +'_tube_'+j) ){
					if( hasContainerChild(temp,"block")>0 && absoultDiv.parentNode != temp ){ //如果该栏目有子容器则跳过进行下一次循环；
						continue;
					}else if( absoultDiv.parentNode == temp && hasContainerChild(temp,"tempContentDiv")!=0){
						continue
					}
				
					var o = getXY(temp);
					pointDirection = innerPosition(temp,e);
					
					if(pointDirection>0){  //如果鼠标在该竖栏的范围内则直接切换目标层；
						if( absoultDiv.parentNode == temp && hasContainerChild(temp,"tempContentDiv")==0 ){
							if( Browser.isIE ){ //插入占位层消除页面显示bug或兼容问题
								if($('tempSpaceDiv')) $('tempSpaceDiv').parentNode.removeChild($('tempSpaceDiv'))
								var tempSpaceDiv = document.createElement('div')
								tempSpaceDiv.id = 'tempSpaceDiv'												
								temp.appendChild(tempSpaceDiv);
							}							
						}
						if(clDiv){
							temp.appendChild(clDiv); 							
						}
						//$('bb').innerHTML = 'tube:'+'a'+ Layers[k].id +'_tube_'+j+'  ['+o[0]+'] ['+o[1]+'] ['+o[2]+'] ['+o[3]+']'
					}
				}
			}
		}
        if(e.stopPropagation){
            e.stopPropagation();
        }else{
            e.cancelBubble = true;
        }
    }    
    /*
    *handleMove：鼠标放开后的操作；
    */
    function handleMouseUp(e){          
        if(document.removeEventListener){           //DOM模型下删除mousemove和mouseup的监听函数；
            document.removeEventListener("mouseup",handleMouseUp,true);
            document.removeEventListener("mousemove",handleMove,true);
        }else if(document.detachEvent){             //IE模型下删除mousemove和mouseup的监听函数；
            absoultDiv.detachEvent("onlosecapture",handleMouseUp);
            absoultDiv.detachEvent("onmouseup",handleMouseUp)
            absoultDiv.detachEvent("onmousemove",handleMove);
            absoultDiv.releaseCapture();
        }else{                                      //IE5以下版本下删除mousemove和mouseup的监听函数；
            document.onmouseup = oldUpHandler;
            document.onmousemove = oldMoveHandler;
        }       
        
        var newDiv = absoultDiv;    //复制拖拽层;
        //newDiv.className = 'block'
        newDiv.style.position = "";         
        newDiv.style.opacity = 1;
        newDiv.style.filter = "alpha(opacity=100)";
        newDiv.style.width = "";
        newDiv.style.height = "";           //以上四行还原层的原始属性；
		newDiv.style.marginTop = '0px'        
		newDiv.style.marginLeft = '0px'					
		//newDiv.style.marginBottom = getCurrentStyle(newDiv,'marginBottom')
        absoultDiv.parentNode.removeChild(absoultDiv);      //删除原来的拖拽层；
		
		
		
		var temprep
		if(temprep = $('tempContentRep')){			
			if(isLastElement(temprep)){	
				var prblk = getPreviousSibling(temprep)
				if(prblk.className != 'block'){
					prblk = getPreviousSibling(prblk)
				}
				addSpace(prblk);
				delSpace(temprep);
			}else{				
				addSpace(temprep)
			}
			temprep.className = 'block'
			temprep.style.filter = "alpha(opacity=100)";			
			temprep.id = 'block_'+newblkid
			temprep.style.height = 'auto'
			bindBlock(newblkid)
			var newblk = Block.getBlockById(newblkid)
			var trgblk = Block.getBlockById(blkid)
			newblk.isFolden = trgblk.isFolden
			newblk.container_height = trgblk.container_height		
			newblk.amount = trgblk.amount		
		}else {
			
			delSpace(topobj);//预先删除原位置上方block块的space（前提是tube的最后一个block）			
		}
		if($("tempContentDiv")){
			var tcd = $("tempContentDiv");
			if(isLastElement(tcd)){	
				var prblk = getPreviousSibling(tcd)
				if(prblk.className != 'block'){
					prblk = getPreviousSibling(prblk)
				}
				addSpace(prblk);				
				delSpace(newDiv);				
			}else{
				addSpace(newDiv);
			}
			
			tcd.parentNode.insertBefore(newDiv,$("tempContentDiv"));    //将拖拽的层插入到指定位置；			
			tcd.parentNode.removeChild($("tempContentDiv"));        //删除原来的临时占位层；			
		}
        if(e.stopPropagation){
            e.stopPropagation();
        }else{
            e.cancelBubble = true;
        }
		
		CTRL_LOCK = false;
        ISDRAGGING = 0;         //解除拖拽的锁定；      
    }	
}
function doStartMove(){} 
/**&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&**/



//html标记变小写
function tagsToLowerCase(html)
{
    html = html.replace(/([a-z])s*(=)s*('|')/gi, '$1$2$3');
    if (parts = html.match(/(<\/?[a-z][a-z0-9]*|[a-z]+=)/gi))
    {
        for (var i = 0; i < parts.length; i++)
        {
            var part = parts[i];
            html = html.replace(new RegExp(part, 'g'), part.toLowerCase());
        };
    };
    return html;
}



//复制代码到剪贴板
function copyToClipboard(txt) {        
     if(window.clipboardData) {        
             window.clipboardData.clearData();        
             window.clipboardData.setData("Text", txt);        
     } else if(navigator.userAgent.indexOf("Opera") != -1) {        
			alert('浏览器不支持！')         
     } else if (window.netscape) {        
          try {        
               netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");        
          } catch (e) {        
               alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");        
          }        
          var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);        
          if (!clip)        
               return;        
          var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);        
          if (!trans)        
               return;        
          trans.addDataFlavor('text/unicode');        
          var str = new Object();        
          var len = new Object();        
          var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);        
          var copytext = txt;        
          str.data = copytext;        
          trans.setTransferData("text/unicode",str,copytext.length*2);        
          var clipid = Components.interfaces.nsIClipboard;        
          if (!clip)        
               return false;        
          clip.setData(trans,null,clipid.kGlobalClipboard);        
          alert("复制成功！")        
     }        
}






//function jmpLayout(a,m){
//	var t
//	var curLay = Layers[arrIndexOf(Layers,a)]		
//	if(m=='+'){
//		t = (parseInt(curLay.c) + 1) % LAYOUTNUM
//	}else if(m=='-'){
//		t = (parseInt(curLay.c) - 1 + LAYOUTNUM) % LAYOUTNUM
//	}else{
//		t = parseInt(m) 
//	}
//    if(0<=t && t< LAYOUTNUM ){  
//		curLay.c = t
//		$('a'+a+'_laynum').value = t
//        $('a'+ a +'_tube_1').className = 'tube style_1_' + t
//        $('a'+ a +'_tube_0').className = 'tube style_0_' + t
//        $('a'+ a +'_tube_2').className = 'tube style_2_' + t
//        $('a'+ a +'_tube_3').className = 'tube style_3_' + t
//    }
//    return false 
//}

/* 内容选择窗口相关函数 开始 */
function closeBox(o,f){
	var t = getParentByClassName('prbox',o);	
	if(f){			
		t.parentNode.removeChild(t)
	}else{
		t.className += ' dn'
	}
}

/*
弹出带遮罩的框，并居中
*/
function popOutCenter(id){
	var p = $(id);	
	var dv = p.getElementsByTagName('iframe')[0];
	var a = getSize();	
	p.style.display = 'block';
	var scr = document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop
	p.style.width = dv.offsetWidth + 'px'
	p.style.left = parseInt((a[0] - dv.offsetWidth)/2) + 'px'	
	p.style.top = (a[3] - dv.offsetHeight)/2 + scr + 'px'
	
}
function jumpOutMask(){
	var a = getSize()
	var o = $('mask')
	var ob = $('mask_bg')
	if(Browser.isFirefox){
		a[0] -= 17		
	}
	o.style.width = a[0] + 'px'
	ob.style.height = a[1] + 'px'
	o.style.display = 'block'
}

/*
关闭iframe 弹出窗口
*/
function ifrclose(){
	document.getElementById('mask').style.display = 'none';
	var ifs = document.getElementById('popout_1').getElementsByTagName('iframe');
	var i = ifs.length;
	while(i-->0){
		ifs[i].style.visibility = 'hidden';
	}
}

/*
根据id 弹出窗口
*/
function showID(id){
	var p = $(id);
	if(p){
		p.style.display = 'block';
	}
}

/*
关闭 窗口
*/
function closeP(o,c){
	var p = getParentByClassName(c,o);
	if(p){
		p.style.display = 'none';
	}	
}

/*
弹出皮肤选择框
*/
function topToolSw(n){
	var u = $('leftset');
	var ls = u.getElementsByTagName('li');
	if(n>=0){		
		try{ls[u.getAttribute('cur')].className = '';}catch(e){}
		u.setAttribute('cur',n)
		ls[n].className = 'cur';		
	}else{
		try{ls[u.getAttribute('cur')].className = '';}catch(e){}
		u.setAttribute('cur','')		
	}	
}

function doChangeBgImg(f){
	var ns = new StyleSheet(0);
	var imu = $('imgpath').value.replace(/i[0-9]{2}.c.aliimg.com/g,'img.china.alibaba.com');	
	if(f){
		try{
			ns.removeRule('DIV .tt')
			ns.removeRule('DIV .tt .ttl')	
			ns.removeRule('DIV .tt .ttr')	
			ns.removeRule('DIV .tt .icl')	
			ns.removeRule('DIV .tt .icr')
		}catch(e){}
		ns.addRulePiece('div .tt{background-image:url('+imu+')}div .tt .ttl{background-image:url('+imu+')}div .tt .ttr{background-image:url('+imu+')}div .tt .icl{background-image:url('+imu+')}div .tt .icr{background-image:url('+imu+')}');
	}else{
		try{
			ns.removeRule('.pagesnapshot .tt')
			ns.removeRule('.pagesnapshot .tt .ttl')	
			ns.removeRule('.pagesnapshot .tt .ttr')	
			ns.removeRule('.pagesnapshot .tt .icl')	
			ns.removeRule('.pagesnapshot .tt .icr')
		}catch(e){}
		ns.addRulePiece('.pagesnapshot .tt{background-image:url('+imu+')}.pagesnapshot .tt .ttl{background-image:url('+imu+')}.pagesnapshot .tt .ttr{background-image:url('+imu+')}.pagesnapshot .tt .icl{background-image:url('+imu+')}.pagesnapshot .tt .icr{background-image:url('+imu+')}');		
	}

}
function skinSet(){	
	$('skincss').href = $('csspath').value;
	$('skincss').setAttribute('name',$('imgpath').value.replace(/i[0-9]{2}.c.aliimg.com/g,'img.china.alibaba.com'));
	doChangeBgImg(1);
	popUpPrompt('皮肤设置成功！')	
}
function cssSetIni(){	
	var se = $('mod_1');
	var i = Param_css.length;
	while( i-- > 0 ){		
		var op = document.createElement('option');
		op.innerHTML = Param_css[i].tag;
		op.value =  Param_css[i].mcss + '__［c］__' +Param_css[i].mbgi;
		se.appendChild(op);
	}
	var hf = $('skincss').href;
	var nm = $('skincss').getAttribute('name');
	$('csspath').value = hf;
	$('imgpath').value = nm;
	$('nullop').value = '';
	se.onclick = function (){
		var m = this;
		return function (){
			if(m.value !=$('nullop').value){
				var dv = m.value.split('__［c］__');
				$('csspath').value  = dv[0];
				$('imgpath').value  = dv[1];								
				var tmp =  dv[0].split('.css');
				$('snapcss').href= tmp[0] +'_pre.css';
			}
		}
	}.call(se)	
	snapcss=document.createElement("link") 
	snapcss.setAttribute("id", "snapcss") 
	snapcss.setAttribute("rel", "stylesheet") 
	snapcss.setAttribute("type", "text/css")  
	snapcss.setAttribute("href", "") 	
	$('pagesnapshotcss').appendChild(snapcss);
	cssSetIni = function (){				
		$('csspath').value = $('skincss').href;		
		$('imgpath').value = $('skincss').getAttribute('name');	
		$('mod_1').value = $('csspath').value + '__［c］__' + $('imgpath').value;
		try{	
			var ns = new StyleSheet(0);
			ns.removeRule('.pagesnapshot .tt')
			ns.removeRule('.pagesnapshot .tt .ttl')	
			ns.removeRule('.pagesnapshot .tt .ttr')	
			ns.removeRule('.pagesnapshot .tt .icl')	
			ns.removeRule('.pagesnapshot .tt .icr')		
		}catch(e){}			
	}
}


function showIBox(o,n,param){
	n = n || 1;
	GLOBALNODE = o;
	var tw = getParentByClassName('tube',o).offsetWidth;
	var tmp_param
	if(tw<232){
		tmp_param = '0to232';
	}else if(tw>=232 && tw<312){
		tmp_param = '232to312'
	}else if(tw>=312 && tw<352){
		tmp_param = '312to352'
	}else if(tw>=352 && tw<472){
		tmp_param = '352to472'
	}else if(tw>=472 && tw<632){
		tmp_param = '472to632'
	}else if(tw>=632 && tw<712){
		tmp_param = '632to712'
	}else if(tw>=712 && tw<952){
		tmp_param = '712to952'
	}else{
		tmp_param = '952'
	}
	param = param || tmp_param
	jumpOutMask();
	popOutCenter('popout_1');
	var fr = frames['popout_iframe'+n]
	var ifr_urlpre = '';
	if(window.location.href.indexOf('alibaba.com') > -1){
		ifr_urlpre = 'http://www.51edu.com/zt/'
	}
	if(n==2 && $('popout_iframe2').src.indexOf('&param') == -1){		
		//$('popout_iframe'+n).src = 'html_module.html?iframe_delete=true&param='+param
		$('popout_iframe'+n).src = ifr_urlpre + 'html_module_'+param+'.html?iframe_delete=true'
	}
	$('popout_iframe'+n).style.visibility = 'visible';
	try{fr.formInitialize()}catch(e){}
}

function showBox(b,n){
    var t = getNextSibling(b)
    if(!t || t.className.indexOf('prbox')==-1) b.insertAdjacentHTML("afterend",html_oper[n]); else t.className = t.className.replace(/\s*dn\s*/g,' ');
	document.documentElement.scrollLeft = 10000
}

function showCodeBox(b,n,bid){
	showBox(b,parseInt(n));
	var t = getNextSibling(b);
	if(t && t.className.indexOf('prbox')>-1){
		var fm = t.getElementsByTagName('form')[0];
		t.style.top = 100*Math.random() + document.documentElement.scrollTop + 'px'
		t.style.left = 100*Math.random() + 300 + document.documentElement.scrollLeft + 'px'
		t.onmousedown = function(){
			return function(event){
				var e = event || window.event;
				e.cancelBubble=true;
				startMove_2(e);
			}
		}.call(t)			
		var str = ''
		if(n=='6a'){
			var cl = $('block_'+bid).cloneNode(true)			
			delNodeByClassName('del',cl)
			str += '<!--[if !IE]> block start <![endif]-->\n<div id="block_'+bid+'" class="block">\n'
			str += cl.innerHTML
			str += '\n</div>\n<!--[if !IE]> block end <![endif]-->'
			str.replace(/<[^>]*?class[^>]*?\bdel\b[^>]*?>/img,'')
			getParentByClassName('prbox',fm).className = 'del prbox prbox_2 prbox_2b'
			fm.codespe.value = '查看获取代码'
			fm.blockid.value = 'Block ID: '+bid
			fm.codearea.value = str;	
			fm.codearea.readOnly = true;
			fm.codearea.style.color = '#666'			
			fm.editcode.value = '获取代码'
			fm.editcode.onclick = function(){
				var nd = this;
				return function(){
					copyToClipboard(str)
					popUpPrompt('代码已拷贝！')	
					//closeBox(this,1)  //获取代码后关闭弹出层
				}
			}.call(fm.editcode)
			cl = null;
		}else if(n=='6b'){
			var cl = $('cont_in_'+bid).cloneNode(true)			
			delNodeByClassName('del',cl)
			var cts = getElementsByClassName('cont','div',cl)
			if(cts.length == 1){
				str = cts[0].innerHTML
			}else{
				str = cl.innerHTML
			}
			fm.codespe.value = '设置内容代码'
			fm.blockid.value = 'Block ID: '+bid
			fm.codearea.value = str
			fm.codearea.style.color = '#000'
			fm.editcode.value = '确认'

			fm.editcode.onclick = function(){
				var nd = this;
				return function(){
					var instr = fm.codearea.value + ''+html_bar[1]+''
					if(cts.length == 1){
						$('cont_'+bid).innerHTML = instr
					}else{
						$('cont_in_'+bid).innerHTML = instr
					}
					setInnerALink($('cont_in_'+bid))
					popUpPrompt('设置成功！')
					//closeBox(this,1)
				}
			}.call(fm.editcode)
			cl = null;
		}
	}
}


function clearCont(o,n){
	var f = o.parentNode
	if(n==1){
		var p = getPreviousSibling(f)
		if( p && p.className=='c'){			
			var pn = getPreviousSibling(p)
			if(pn) pn.parentNode.removeChild(pn)	
		}
		if(p) p.parentNode.removeChild(p)	
	}else{
		var tmpstr = f.innerHTML
		f.parentNode.innerHTML = '<div class="del ctrbar">' + tmpstr + '</div>'
	}	
	//c.innerHTML = getLastElementChild(c)	
}



function insertCont(o,nm,css,js,hv,f){
	var linkscript = new LinkScript()
	js = js == 0 ? null : js;
	css = css == 0 ? null : css;	
	var urlpre =  URL_PARTS;

	if( parseInt(hv) > 0 && f==1 ){
		o.insertAdjacentHTML('beforebegin','<div class="oh" style="height:'+ hv +'px;"></div>');
		popUpPrompt('添加空白占位行成功！');
		window.setTimeout("frames['popout_iframe1'].recoverConfirm()",2000);
		return;
	}
	
	if(css || js){
		LinkScript.prototype.onsuccess = function(){			
			
		}
		if(css){
			linkscript.checkLoad(urlpre + css + '.css','css')		
		}
		if(js){			
			linkscript.checkLoad(urlpre + js + '.js?t=233','js')	
		}
		
	}	

	hv = hv || 0;
	var hstr = (hv && hv > 0) ? '<div class="oh" style="height:'+ hv +'px;"></div>' : '';
	var html = $('suitclass').value == '' ? '<div class="l20">' + hstr + f + '</div>': '<div class="'+ $('suitclass').value +'">' + hstr + f + '</div>';
	o.insertAdjacentHTML('beforebegin',html)	
	var re = /<script.*?>[\s\S]*?<\/script>/img
	var sre = []
	var ms , sb = []
	try{
		if(ms = html.match(re)){
			for (var i = 0; i < ms.length; i++){
				sre[i] = /<script.*?>([\s\S]*?)<\/script>/img				
				sb[i] = sre[i].exec(ms[i])			
				eval(sb[i][1].toString())				
			}
		}
	}catch(e){}
	
	
	try{setInnerALink(getPreviousSibling(o))}catch(e){}

	popUpPrompt('添加子组件成功！')				
	window.setTimeout("frames['popout_iframe1'].recoverConfirm()",2000);				

}
/* 内容选择窗口相关函数 结束 */




function pushParamTtDefault(){
	var pagesht
	if(pagesht = StyleSheet.getSheetById('page')){
		var p = []
		p[0] = getPicUrl(pagesht.getRuleStyle('.tt_0','backgroundImage'))
		p[1] = parseInt(pagesht.getRuleStyle('.tt_0','height'))
		p[2] = parseInt(pagesht.getRuleStyle('.tt_0 .ttl','width'))
		p[8] = parseInt(pagesht.getRuleStyle('.tt_0 .ttc','fontSize'))
		p[9] = parseInt(pagesht.getRuleStyle('.tt_0 .ttc','marginLeft'))
		
		p[3] = parseInt(pagesht.getRuleStyle('.tt_0 .icl','width'))
		p[4] = parseInt(pagesht.getRuleStyle('.tt_0 .icl','backgroundPositionY'))
		p[5] = parseInt(pagesht.getRuleStyle('.tt_0 .icr','width'))
		p[6] = parseInt(pagesht.getRuleStyle('.tt_0 .icr','backgroundPositionY'))
		p[7] = pagesht.getRuleStyle('.tt_0','color')

		p[10] = pagesht.getRuleStyle('.tt_0 .ttc','color')
		
		var e;
		if( e = arrIndexOf(Param_tt,0)){
			Param_tt[e].p = p
		}else{
			Param_tt.push({'id' : 0,'p' : p});
		}	
	}
}

function pushParamContDefault(){
	var pagesht
	if(pagesht = StyleSheet.getSheetById('page')){		
		var p = []
		p[10] = pagesht.getRuleStyle('.cont_0 H3 A:link','color')
		p[9] = pagesht.getRuleStyle('.cont_0','color')
		p[7] = parseInt(pagesht.getRuleStyle('.cont_0 .cont_in','height')) ? pagesht.getRuleStyle('.cont_0 .cont_in','height') : 'auto'
		p[8] = parseInt(pagesht.getRuleStyle('.cont_0','lineHeight')) ? pagesht.getRuleStyle('.cont_0','lineHeight') : 'auto'
		p[12] = parseInt(pagesht.getRuleStyle('.cont_0 .cont_in','margin'))

		p[2] = pagesht.getRuleStyle('.cont_0','backgroundRepeat')
		p[0] = getPicUrl(pagesht.getRuleStyle('.cont_0','backgroundImage'))
		p[1] = pagesht.getRuleStyle('.cont_0','backgroundPositionX') + ' ' + pagesht.getRuleStyle('.cont_0','backgroundPositionY')
		p[3] = pagesht.getRuleStyle('.cont_0','backgroundColor')

		var ba = [parseInt(pagesht.getRuleStyle('.cont_0','borderTopWidth')),pagesht.getRuleStyle('.cont_0','borderTopStyle'),parseInt(pagesht.getRuleStyle('.cont_0','borderBottomWidth')),pagesht.getRuleStyle('.cont_0','borderBottomStyle')]
		
		if( ba[0] == 0 && ba[2] == 0){
			p[11] = 3
		}else if( ba[0] == 0 && ba[3] == 'solid'){
			p[11] = 1
		}else if( ba[0] != 0 && ba[1] == 'solid' && ba[2] == 0 ){
			p[11] = 2
		}else if( ba[0] !=0 && ba[1] != 'solid' && ba[2] == 1 && ba[3] == 'solid'){
			p[11] = 4
		}else if( ba[0] !=0 && ba[1] == 'solid' && ba[2] == 1 && ba[3] != 'solid'){
			p[11] = 5
		}else if( ba[0] !=0 && ba[1] != 'solid' && ba[2] == 1 && ba[3] != 'solid'){
			p[11] = 6
		}else{
			p[11] = 0
		}
		p[4] = parseInt(pagesht.getRuleStyle('.cont_0','borderLeftWidth'))				
		p[5] = pagesht.getRuleStyle('.cont_0','borderStyle')
		p[6] = pagesht.getRuleStyle('.cont_0','borderColor')
		p[13] = parseInt(pagesht.getRuleStyle('.cont_0','fontSize'))
		
		var e;
		if(e = arrIndexOf(Param_cont,0)){
			Param_cont[e].p = p
		}else{
			Param_cont.push({'id' : 0,'p' : p});
		}
	}
}

function pushParamTt(obj,pmid){
	if(arrIndexOf(Param_tt,pmid) == null ){
		if( parseInt(pmid) == 0 ){
			pushParamTtDefault()
		}else{
			Param_tt.push({'id' : pmid,'p' : []});
			var curp = Param_tt[Param_tt.length-1];			
			curp.p = [];			
			var bgpic = getCurrentStyle(obj,'backgroundImage')
			if( bgpic == 'none' ){
				bgpic = ''
			}else{
				bgpic = bgpic.replace(/\"/g,'').replace(/\)/g,'');
				bgpic = bgpic.split('(')
				bgpic = bgpic[1]
			}
			curp.p.push(bgpic);
			curp.p.push( parseInt( getCurrentStyle(obj,'height') ) )
			var ttl = getFirstElementChild(obj)
			curp.p.push( parseInt( getCurrentStyle(ttl,'width') ) );
			var icl = getNextSibling(ttl);
			curp.p.push( parseInt( getCurrentStyle(icl,'width') ) );
			if(Browser.isIE){
				curp.p.push( parseInt(getCurrentStyle(icl,'backgroundPositionY')) );
			}else{
				curp.p.push( icl.getAttribute('pos') );
			}
			var icr = getLastElementChild(obj);
			
			var icrwidth = parseInt( getCurrentStyle(icr,'width') ) ? parseInt( getCurrentStyle(icr,'width') ) : 0
			curp.p.push(icrwidth );
			if(Browser.isIE){
				curp.p.push( parseInt(getCurrentStyle(icr,'backgroundPositionY')) );
			}else{
				curp.p.push( icr.getAttribute('pos') );
			}
			
			curp.p.push( getCurrentStyle(obj,'color') );

			var ttc = getNextSibling(icl);
			curp.p.push( parseInt( getCurrentStyle(ttc,'fontSize') ) );
			curp.p.push( parseInt( getCurrentStyle(ttc,'marginLeft') ) );

			try{
				var a = getElementsByClassName('ttc','div',obj)[0].getElementsByTagName('a')[0]
				curp.p.push( getCurrentStyle(a,'color') )
			}catch(e){
				curp.p.push( '' )
			}			
		}
	}
}

function pushParamCont(obj,pmid){
	if(arrIndexOf(Param_cont,pmid) == null ){		
		if( parseInt(pmid) == 0 ){
			pushParamContDefault()				
		}else{		
			Param_cont.push({'id' : pmid,'p' : []});
			var curp = Param_cont[Param_cont.length-1];
			curp.p = [];
	//		//{'id' : 0,'p' : ['','','','#F4F4F4',1,'solid','#ccc','','','']}[fm.bgpic.value,fm.bgpos.value,fm.bgrpt.value,fm.bgcolor.value,fm.bdwidth.value,fm.bdtype.value,fm.bdcolor.value,fm.bglayh.value,fm.lineht.value,fm.wdcolor.value]
			var bgpic = getCurrentStyle(obj,'backgroundImage')
			bgpic = getPicUrl(bgpic)			
			curp.p.push(bgpic);
			curp.p.push( getCurrentStyle(obj,'backgroundPositionX') + ' ' + getCurrentStyle(obj,'backgroundPositionY') )
			curp.p.push( getCurrentStyle(obj,'backgroundRepeat') )
			curp.p.push( getCurrentStyle(obj,'backgroundColor') )
			curp.p.push( parseInt(getCurrentStyle(obj,'borderWidth')) )
			curp.p.push( getCurrentStyle(obj,'borderStyle') )
			curp.p.push( getCurrentStyle(obj,'borderColor') )
			curp.p.push( getCurrentStyle(obj,'height') )
			curp.p.push( parseInt(getCurrentStyle(obj,'lineHeight')) )
			curp.p.push( getCurrentStyle(obj,'color') )
			if( getFirstTypeNode(obj,'h3') && getFirstTypeNode(obj,'h3').getElementsByTagName('a').length > 0 ){		
				curp.p.push( getCurrentStyle(getFirstTypeNode(obj,'h3').getElementsByTagName('a')[0],'color') )
			}else{
				curp.p.push( '' )
			}
				//alert(getCurrentStyle(obj,'borderTopWidth'))
			var bdis = obj.className.match(/bdis_\d/)
			if(bdis){
				bdis = bdis[0].split('bdis_')
				bdis = parseInt(bdis[1])
				curp.p.push(bdis)
			}else{
				curp.p.push(0)
			}		
			
			var tempd = getFirstElementChild(obj)
			var innerpd = tempd.className.indexOf("cont_in")>-1 ? parseInt(getCurrentStyle(tempd,'margin')) : parseInt(getCurrentStyle(obj,'padding'))
			curp.p.push( innerpd )
			curp.p.push( parseInt(getCurrentStyle(obj,'fontSize')) )
		}
	}
}


/*
function setLayIcon(obj){
	var im = new Image()
	im.src = getCurrentStyle(obj,'backgroundImage').replace(/url\([\"]?(.*?)[\"]?\)/g,'$1')	
	var yp
	if(Browser.isFirefox){		
		var t = obj.style.backgroundPosition.split(' ')
		yp = parseInt(t[1])
	}else if(Browser.isIE){
		var t = getCurrentStyle(obj,'backgroundPositionY')
		yp = parseInt(t)
	}else{
		var t = getCurrentStyle(obj,'backgroundPosition').split(' ')		
		yp = parseInt(t[1])
	}	
	//alert(im.height + ' ' +(parseInt(obj.offsetHeight) - yp) % im.height)
	obj.style.backgroundPosition = '0px -'+ (parseInt(obj.offsetHeight) - yp) % im.height  +'px'	
	//alert(obj.style.backgroundPosition + ' ' + im.height)
}
*/





function showNowState(){
	$('state').innerHTML = '/Blocks:' + Block.Registry.length
	$('state').innerHTML += '/Layers:' + Layers.length
}

function outputHTML(u){	
	u = u || null
	if($('totalHTML'))
		$('totalHTML').parentNode.removeChild($('totalHTML'));
	var i = 0  			
	while(i < Block.Registry.length){	
		var blk = Block.Registry[i]
		if(blk.isFolden ==1){
			blk.container.style.height = '';       
			blk.container.style.position = ''			
			blk.container.style.overflow = ''
			blk.container.style.visibility = 'visible'
			blk.container.className = 'cont_in'
		}	
		i++
	} 
	
	delPreView()
	var whatiwant = $('whatiwant').cloneNode(true);
	if(u){		
		delNodeByClassName('del',whatiwant)
		delNodeByClassName('udel',whatiwant)
	}

	var sreg1 = new RegExp('(<div[^>]*id="?(layer|block|cont_in)_\\d+"?[^>]*(?=style=))style=[\'\"][^\'\"]*[\'\"]',"ig")
	var sreg2 = new RegExp('style=[\'\"][^\'\"]*[\'\"]([^>]*id="?(layer|block|cont_in)_\\d+"?)',"ig") //去除layer block 和cont 上冗余的style <DIV class=cont_in id=cont_in_0 style="VISIBILITY: visible"> 
	var strwhatiwant = u ? '<div id="whatiwant">\n'+ whatiwant.innerHTML.replace(sreg1,'$1').replace(sreg2,'$1')+'\n</div>' : '<div id="whatiwant">\n'+whatiwant.innerHTML +'\n</div>'
	var strhead = '<div id="ant_linkscript">\n' + $('ant_linkscript').innerHTML.replace(/<style\s*type\s*=\s*[\'\"]?text\/css[\'\"]?\s*>\s*<\/style>/img,'') + '\n</div>'
    //alert(strwhatiwant);
	var r1=new RegExp("<td .+cutline.+[^>]+><\\/td>","ig");
	var strwhatiwant=strwhatiwant.replace(r1,'<td class=cutline width=8></td>');
	//strwhatiwant=strwhatiwang.replace(/<td class=cutline[^>]*><\/td>/ig,'<td class=cutline width=8></td>');
	//alert(strwhatiwant);
	
	strhead = strhead.replace(/href=\"[^>]*parts\//g,'href="'+URL_PARTS).replace(/src=\"[^>]*parts\//g,'src="'+URL_PARTS).replace(/url\([\s]*css\//g,'url('+URL_CSS).replace(/src=\"[\s]*js\//g,'src="'+URL_JS)
	

	if(u){
		strhead = strhead.replace(/<script[^<]*\/antku\.js[^<]*<\/script>/ig,'').replace(/<link[^<]*tube_v0.3.css[^>]*>/ig,'')	
	}	
	
	//消除无用的样式块
	i = 0
	while(i<StyleSheet.Registry.length){
		if(getElementsByClassName(''+StyleSheet.Registry[i].id,'div',whatiwant).length == 0 && StyleSheet.Registry[i].id != 'page'){			
			var reg = new RegExp("<style[^>]*style_"+StyleSheet.Registry[i].id+"[^>]*>[^<]*<\/style>","ig");
			strhead = strhead.replace(reg,'')
		}
		i++;
	}

	var analysis ='';
	//'<script type="text/javascript"> var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src=\'" + gaJsHost + "google-analytics.com/ga.js\' type=\'text/javascript\'%3E%3C/script%3E")); </script> <script type="text/javascript"> try { var pageTracker = _gat._getTracker("UA-7440714-2"); pageTracker._trackPageview(); } catch(err) {}</script>'
	
	var strHTML = strhead + strwhatiwant + analysis;	

	strHTML = strHTML.replace(/i[0-9]{2}\.c\.aliimg\.com/img,'img.china.alibaba.com').replace(/<textarea[\s\S]*<\/textarea>/img,'').replace(/href=[\'\"]{2}/img,'');
	
	if(u){
		//strHTML = strHTML.replace(/__del__/g,'');		
		strHTML = strHTML.replace(/<script[^>]*antku_ini.js[^>]*><\/script>/img,'')
	}

    strHTML2 = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n<html xmlns="http://www.w3.org/1999/xhtml"> <head><TITLE>专题标题</TITLE> <META http-equiv=Content-Type content="text/html; charset=gb2312"> <META content=editplus name=generator> <META content=balibell name=author> <META content="专题关键词" name=keywords> <META content="专题描述" name=description><!--Create By 51edu ZTDIY Tool Author:Richieliu QQ:76373 Website:http://www.iamued.com --><STYLE type=text/css>\n@import url( http://www.51edu.com/zt/res/alicn_bb_v0.3.css );\n@import url(http://www.51edu.com/zt/res/antcom.css);\n</STYLE><script src="http://www.51edu.com/zt/js/base.js?t=233" type=text/javascript></script><base target=_blank /></head>\n<body>\n<div id="top">\n<span class="login"><iframe src="http://passport.51edu.com/?m=user&a=logininiframe" allowtransparency="true" width="460" height="25" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="No"></iframe></span>\n	<span class="home"><a target="_blank" href=" http://www.51edu.com">首页</a> <a target="_blank" href=" http://www.sooker.com">搜课网</a><em class="homeHot"></em> <a target="_blank" href=" http://exam.51edu.com">在线模考</a> <a target="_blank" href=" http://search.51edu.com">搜索</a> <a target="_blank" href=" http://www.51edu.com/sitemap.html">网站地图</a></span>\n</div>\n<div id="nav">\n	<h1><a target="_blank" href="http://www.51edu.com"><img src="http://www.51edu.com/images/logo.jpg" width="148" height="46" border="0" /></a></h1>\n	<div id="nav51edu">\n		<div class="nav51eduA">\n<h2></h2>\n<ul>\n<li><a href="http://www.51edu.com/xiaoshengchu/">小升初</a></li>\n<li><a href="http://www.51edu.com/chuzhong/">初中</a></li>\n<li><a href="http://www.51edu.com/gaozhong/">高中</a></li>\n<li><a href="http://www.51edu.com/daxue/">大学</a></li>\n<li><a href="http://www.51edu.com/zhongkao/">中考</a></li>\n<li><a href="http://www.51edu.com/bjky/">考研</a></li>\n</ul>\n<ul>\n<li class="a1"><a href="http://www.51edu.com/zuowen/">作文</a></li>\n<li><a href="http://www.51edu.com/gaokao/">高考</a></li>\n<li><a href="http://www.51edu.com/chengkao/">成考</a></li>\n<li><a href="http://www.51edu.com/zikao/">自考</a></li>\n<li><a href="http://www.51edu.com/lunwen/">论文</a></li>\n<li><a href="http://www.51edu.com/guanli/">商学</a></li>\n</ul>\n</div>\n<div class="nav51eduB">\n<h2></h2>\n<ul>\n<li><a href="http://www.51edu.com/zhiye/">职业资格</a></li>\n<li><a href="http://www.51edu.com/cpa/">注册会计师</a></li>\n<li><a href="http://www.51edu.com/sifa/">司法考试</a></li>\n</ul>\n<ul>\n<li><a href="http://www.51edu.com/zhiye/yiyao/">医学考试</a></li>\n<li><a href="http://www.51edu.com/gongwuyuan/">公务员考试</a></li>\n<li><a href="http://www.51edu.com/it/">IT教育</a></li>\n</ul>\n</div>\n<div class="nav51eduC">\n<h2></h2>\n<ul>\n<li><a href="http://www.51edu.com/kaoshi/">英语考证</a></li>\n<li><a href="http://www.51edu.com/study/">英语学习</a></li>\n<li><a href="http://www.51edu.com/xiaoyuzhong/">小语种</a></li>\n</ul>\n<ul>\n<li><a href="http://www.51edu.com/lxks/">留学考试</a></li>\n<li><a href="http://www.51edu.com/chuguo/">出国留学</a></li>\n<li><a href="http://www.51edu.com/chuguo/italy/">意大利</a></li>\n</ul>\n</div>\n</div>\n</div>\n<div class="blank_8"></div>\n'+ strHTML +'\n<span style="display:none"><script src="http://s13.cnzz.com/stat.php?id=2496704&web_id=2496704" language="JavaScript"></script><!--全站统计--><script src="http://s23.cnzz.com/stat.php?id=1409421&web_id=1409421" language="JavaScript" charset="gb2312"></script></span>\n<div id="footer">\n	<div class="about51edu">\n<ul>\n<li><a href="http://www.51edu.com/aboutus/" target="_blank">关于我们</a>\n|&nbsp;<a href="http://www.51edu.com/link/" target="_blank">友情链接</a>\n|&nbsp;<a href="http://www.51edu.com/aboutus/joinus.html" target="_blank">诚聘英才</a>\n|&nbsp;<a href="http://www.51edu.com/aboutus/contectus-bj.html" target="_blank">&nbsp;联系我们</a>\n|&nbsp;<a href="http://www.51edu.com/aboutus/baojia.html" target="_blank">&nbsp;商务合作</a>\n|&nbsp;<a href="http://www.51edu.com/sitemap.html" target="_blank">&nbsp;站点地图</a>\n|&nbsp;<a href="http://www.51edu.com/zhuanti/join/know_intro.html" target="_blank">&nbsp;合作加盟</a></li>\n</ul>\n	</div>\n<p class="copyRight">\n		2001-2010 精品学习网，网赢天地版权所有 京ICP证040590<br />\n		未经51edu.com授权，不得转载本站内所有学校课程信息<br />\n		CopyRight 2001-2010. 51edu.com All Rights Reserved\n</p>\n</div></body>\n</html>'
	//strHTML = tagsToLowerCase(strHTML)
	
	//strHTML = strHTML.replace(/style[\s]*=[\s]*(\"|\')[^\"]*(\"|\')/img,'').replace(/class=(\"|\')\s*(\"|\')/img,'');	
	if($('ant_forinfo_strHTML')){$('ant_forinfo_strHTML').value = strHTML}
	intoTextarea(strHTML2)
	whatiwant = null;
}

var intoTextarea = function (strHTML){document.body.insertAdjacentHTML('beforeend','<textarea id="totalHTML" rows="30" cols="80" readonly>'+strHTML+'</textarea>')}


function addPreView(){
	var ns = new StyleSheet(0)
	ns.addRulePiece('.ext{display:none !important}.del{display:none !important}.block .tt{cursor:auto}.layer{border:none !important}.cutline{background:none !important;cursor:auto !important}')		
}

function delPreView(){
	try{
		var ns = new StyleSheet(0)
		ns.removeRule('.ext')
		ns.removeRule('.del')
		ns.removeRule('.block .tt')	
		ns.removeRule('.layer')	
		ns.removeRule('.cutline')
	}catch(e){}
}




//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//%%%%%%%%%%%%%%%%	 可拖动层相关函数										%%%%%%%%%%%%%%%%
//%%%%%%%%%%%%%%%%   功能：模拟windows窗口									%%%%%%%%%%%%%%%%
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
/*
获得绝对层的最近上层相对层
*/
function prOfPa(pa){
    var pr = pa.parentNode;
    while( getCurrentStyle(pr,'position') != 'relative' && pr.tagName.toLowerCase() != 'body' ){
        pr = pr.parentNode;
    }
    return pr
}
 

/*
限定区域的拖拽功能具体实现函数
*/
function startMove_2(e){
    e = e || window.event
    var obj /*事件对象*/ = e.srcElement || e.target;
    if(ISDRAGGING == 1 || obj.tagName.toLowerCase() == 'a' || obj.className.indexOf('ant_txt') > -1 || obj.tagName.toLowerCase() == 'img' || obj.tagName.toLowerCase() == 'input' ){        //如果正在移动过程中则停止移动；
        return;
    }  
    ISDRAGGING = 1;
    
    //obj = obj.parentNode                //获得要拖拽的层；
    while(obj.parentNode && getCurrentStyle(obj,'position') != 'absolute' ){
        obj = obj.parentNode
    }    
    
    var po = prOfPa(obj) //获取绝对层的最近相对层
    var zp = getCurrentStyle(po,'zIndex') //获取该相对层的z-index
	if(po.tagName.toLowerCase() == 'body'){
		obj.style.zIndex = po.style.zIndex = zp =='auto' || zp == 0 ? 11001 : parseInt(zp) + 2
	}else{
		obj.style.zIndex = po.style.zIndex = zp =='auto' || zp == 0 ? 11000 : parseInt(zp) + 2   //重新设置拖动层及其上层相对层的 z-index
	}
    //var range = [po.offsetLeft,po.offsetLeft]
    var range = [po.offsetWidth-obj.offsetWidth,po.offsetHeight-obj.offsetHeight]
	//alert(po.tagName+ '//' + po.offsetWidth +','+ obj.offsetWidth +','+ po.offsetHeight +','+ obj.offsetHeight)
    var absoultDiv = obj //转移obj 到变量 absoultDiv
    var diffX /*鼠标位置和层开头之间X轴的间距*/= e.clientX - absoultDiv.offsetLeft;
    var diffY /*鼠标位置和层开头之间Y轴的间距*/= e.clientY - absoultDiv.offsetTop;
    

    if(document.addEventListener){                  //DOM模型下增加mousemove和mouseup的监听函数；
        document.addEventListener("mousemove",handleMove,true);
        document.addEventListener("mouseup",handleMouseUp,true);
    }else if(document.attachEvent){                 //IE下增加mousemove和mouseup的监听函数；
        absoultDiv.setCapture();
        absoultDiv.attachEvent("onmousemove",handleMove);
        absoultDiv.attachEvent("onmouseup",handleMouseUp);
        absoultDiv.attachEvent("onlosecapture",handleMouseUp);
    }else{                                          //IE5以下版本的操作；
        var oldMoveHandler = document.onmousemove;
        var oldUpHandler = document.onmouseup;
        document.onmousemove = handleMove;
        document.onmouseup = handleMouseUp;
    }
    if(e.stopPropagation){
        e.stopPropagation();
    }else{
        e.cancelBubble = true;
    }
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }

    function handleMove(e){ 
        var x = e.clientX - diffX        
        var y = e.clientY - diffY        
        absoultDiv.style.top = ( y < 0 ? 0 : y > range[1] ? range[1] : y ) + "px";
        absoultDiv.style.left = ( x < 0 ? 0 : x > range[0] ? range[0] : x ) + "px";       //层跟这鼠标走--实现拖拽；
		//$('bb').innerHTML =  absoultDiv.style.top + '/' + absoultDiv.style.left
        if(e.stopPropagation){
            e.stopPropagation();
        }else{
            e.cancelBubble = true;
        }
    }
    
    /*
    *handleMove：鼠标放开后的操作；
    */
    function handleMouseUp(e){          
        if(document.removeEventListener){           //DOM模型下删除mousemove和mouseup的监听函数；
            document.removeEventListener("mouseup",handleMouseUp,true);
            document.removeEventListener("mousemove",handleMove,true);
        }else if(document.detachEvent){             //IE模型下删除mousemove和mouseup的监听函数；
            absoultDiv.detachEvent("onlosecapture",handleMouseUp);
            absoultDiv.detachEvent("onmouseup",handleMouseUp)
            absoultDiv.detachEvent("onmousemove",handleMove);
            absoultDiv.releaseCapture();
        }else{                                      //IE5以下版本下删除mousemove和mouseup的监听函数；
            document.onmouseup = oldUpHandler;
            document.onmousemove = oldMoveHandler;
        }                       
        ISDRAGGING = 0;         //解除拖拽的锁定；      
    }   
}

/*
获取事件点相对于最近relative层的xy值，被用于限定区域的拖拽功能
*/
function getXY_p(e,obj){
    e = e || window.event
    var a /*返回对象*/ = []   
    if(Browser.isFirefox){
        a[0]=obj.offsetLeft + e.layerX   
        a[1]=obj.offsetTop + e.layerY         
        while( obj.offsetParent && getCurrentStyle(obj.parentNode,'position') != 'relative' ){
            obj=obj.offsetParent            
            a[0]+=obj.offsetLeft  
            a[1]+=obj.offsetTop          
        }
    }else{
        a[0] = e.x
        a[1] = e.y
    }
    return a
}
/*
设置页顶醒目文字文案
*/
function setTopWords(e){    
    var e = event || window.event
	GLOBALNODE = e.srcElement || e.target 
	var stxtnode1 = getFirstTypeNode(GLOBALNODE,'text',1)
	var stxtnode = getFirstTypeNode(GLOBALNODE,'text')
		
	var txtStr = '文字：<textarea id="alk_text" onfocus="this.select()"/>'+(stxtnode1 ? stxtnode1.nodeValue + '<br/>' + stxtnode.nodeValue : stxtnode.nodeValue)+'</textarea><br/>'                 
	var t = (e.clientY < 0 ? (e.clientY + 60) : e.clientY + 30)  + document.documentElement.scrollTop + 'px'
	var l = ((e.clientX - 260) < 0 ? (e.clientX - 20) : (e.clientX - 200)) + document.documentElement.scrollLeft + 'px'	
	createPopDiv('popbox',t,l)
	$('popbox').innerHTML = txtStr
	var but = document.createElement('input')
	but.type = 'button'
	but.value = ' 确定 '
	but.onclick = function (){
		var temp = $('alk_text').value
		var spl
		if(spl=temp.match(/<br\s*\/?>/g)){
			if(stxtnode1){
				stxtnode.parentNode.removeChild(stxtnode1)
				stxtnode.parentNode.removeChild(getPreviousSibling(stxtnode))
			}
			temp = temp.split(spl)
			var newtxtnode = document.createTextNode(temp[0])
			stxtnode.parentNode.insertBefore(newtxtnode,stxtnode)
			var br = document.createElement('br')
			stxtnode.parentNode.insertBefore(br,stxtnode)
			stxtnode.nodeValue = temp[1]
		}else{		
			if(stxtnode1){
				stxtnode.parentNode.removeChild(stxtnode1)
				stxtnode.parentNode.removeChild(getPreviousSibling(stxtnode))
			}
			stxtnode.nodeValue= temp
					
		}
	}
	$('popbox').appendChild(but)			
 
}
/*
设置页顶醒目文字样式
*/
function setTopWordsStyle(obj){ 
    var f = obj.parentNode
    var h = f.parentNode.parentNode.parentNode
	var topwordsht;
	try{
		if(topwordsht = StyleSheet.getSheetById('topword')){
			
		}else{		
			topwordsht = new StyleSheet('topword');
			topwordsht.addRule('.scrtop .mark','color:'+getCurrentStyle(h,'color')+';font-size:'+getCurrentStyle(h,'fontSize')+';font-family:'+getCurrentStyle(h,'fontFamily')+';text-align:'+getCurrentStyle(h,'textAlign')+';')			
		}
		if(f.ftcolor.value){		
			topwordsht.setRuleStyle('.scrtop .mark','color',f.ftcolor.value)		
		}
		if(f.ftsz.value){		
			topwordsht.setRuleStyle('.scrtop .mark','fontSize',f.ftsz.value)
		}
		if(f.ftfm.value)
			topwordsht.setRuleStyle('.scrtop .mark','fontFamily',f.ftfm.value)
		if(f.ftal.value)
			topwordsht.setRuleStyle('.scrtop .mark','textAlign',f.ftal.value)	
	}catch(e){popUpPrompt('您输入的值有误，请检查并重新输入！')}
}
/*
设置顶层相关属性
*/
function setTopLayer(obj){
	var bid = fetchIdByClass(obj)
	var f = obj.parentNode
	var t = getElementsByClassName('scrtop','div',$('block_'+bid))[0]
	t.className = 'scrtop scrtop_'+bid
	var scrtopsht;
	if(scrtopsht = StyleSheet.getSheetById('scrtop_'+bid)){		
	}else{		
		scrtopsht = new StyleSheet('scrtop_'+bid);		
		scrtopsht.addRule('.scrtop_'+bid,'background:'+getCurrentStyle(t,'backgroundColor')+' '+getCurrentStyle(t,'backgroundImage')+' '+getCurrentStyle(t,'backgroundPosition')+' '+getCurrentStyle(t,'backgroundRepeat')+';height:'+getCurrentStyle(t,'height'))			
	}
	if(f.bgpic.value){
		scrtopsht.setRuleStyle('.scrtop_'+bid,'backgroundImage','url('+f.bgpic.value+')')
	}
	if(f.bgpos.value)
		scrtopsht.setRuleStyle('.scrtop_'+bid,'backgroundPosition',f.bgpos.value)
	if(f.bgrpt.value)
		scrtopsht.setRuleStyle('.scrtop_'+bid,'backgroundRepeat',f.bgrpt.value)
	if(f.bgcolor.value)
		scrtopsht.setRuleStyle('.scrtop_'+bid,'backgroundColor',f.bgcolor.value)
	if(f.bglayh.value)
		scrtopsht.setRuleStyle('.scrtop_'+bid,'height',f.bglayh.value)
}



/*
判断是否存在待验证的class名
*/
function existSpecialClass(sp,pmid){
	var ex = false;
	if(sp == 'tt' && ( arrIndexOf(Param_tt,pmid) || pmid < 99 ) ){
		ex = true
	}else if(sp == 'cont' && ( arrIndexOf(Param_cont,pmid) || pmid < 99 ) )(
		ex = true
	)
	return ex;
}

/*
确认设置block块的title部分
*/	
//function setTitle(o,f,g){
//	var fm = getParentByClassName('form_set',o)
//	if(!g){
//		var bl = getParentByClassName('block',o)
//		var bid = bl.id.split('_')
//		bid = bid[1]	//block id
//		var tt = getElementsByClassName('tt','div',bl)	   
//	
//		var ptt = null; //预览title对象
//		var j = 0;		
//		while(j<tt.length){
//			if(tt[j].parentNode.className == 'ttpre'){
//				ptt = tt[j]
//			}
//			j++
//		}			
//	}else{
//		var ptt = getElementsByClassName('tt','div',fm)[0]		
//	}		
//	
//	var pmid = fm.ttclass.value  //预设 classsname
//	var p = [fm.ttbgpic.value,fm.ttheight.value,fm.ttwidth.value,fm.iclwidth.value,fm.iclpos.value,fm.icrwidth.value,fm.icrpos.value,fm.ttcolor.value,fm.ttcftsize.value,fm.ttcmgleft.value,fm.thcolor.value]
//
//	//将预览关闭
//	if(StyleSheet.getSheetById('ttpre')){
//		StyleSheet.getSheetById('ttpre').sheet.disabled = true
//	}
//
//	if(f==1 || f==2){ 			
//		if( !existSpecialClass('tt',pmid) ){
//			if(f==1){				
//				var prmpstr = '预览失败！不存在方案 "tt_'+pmid+'" <br/>请重新输入！'
//			}else if(f==2){
//				var prmpstr = '确认失败！不存在方案 "tt_'+pmid+'" <br/>确认前请先预览！'
//			}			
//			popUpPrompt(prmpstr)				
//			return false;
//		}else if(f==1){
//			//方案预览							
//			ptt.className = 'tt tt_'+pmid	  
//		}else if(f==2 && !g){
//			j = 0;
//			while(j<tt.length){
//				tt[j].className = 'tt tt_'+pmid
//				j++
//			}
//		}		  
//	}else{ 		
//		if(g){
//			pmid = 0
//		}else{
//			pmid = tt[0].className.split('tt_');
//			pmid = pmid[1].split(' ');
//			pmid = pmid[0]
//		}		
//		if(f==4 && !g){ //手动调整确认	
//			//建立css处理对象
//			var tmp = ptt.className.split("_")
//			var ttsht
//			if(tmp[1]>99 && tmp[1]<200){				
//				pmid = parseInt(tmp[1])
//				ttsht = StyleSheet.getSheetById('tt_'+pmid)			
//				ttsht.removeAllRule()
//			}else{
//				pmid = generateID(StyleSheet.Registry,200,100,'tt_')
//				ttsht = new StyleSheet('tt_'+pmid)
//			}
//		}else if(f==3){			
//			//建立css处理对象 预览专用
//			var ttpresht
//			if(ttpresht = StyleSheet.getSheetById('ttpre')){
//				ttpresht.sheet.disabled = false;
//				ttpresht.removeAllRule()
//			}else{
//				ttpresht = new StyleSheet('ttpre')
//			}
//		}
//		//css片
//		var bstr = 'background:url('+p[0]+')'
//		var hv = parseInt(p[1])
//		var cssp = '.prbox div.tt_'+pmid+'{color:'+p[7]+';height:'+hv+'px;'+bstr+' 0px 0px repeat-x;}'
//		cssp    += '.prbox .tt_'+pmid+' .ttl{width:'+p[2]+'px;'+bstr+' #fff 0px -40px no-repeat}'
//		cssp    += '.prbox .tt_'+pmid+' .ttr{width:'+p[2]+'px;'+bstr+' #fff 0px -80px no-repeat}'
//		cssp += '.prbox .tt_'+pmid+' .icl{width:'+p[3]+'px;'+bstr+' 0px '+p[4]+'px no-repeat}'
//		cssp += '.prbox .tt_'+pmid+' .icr{width:'+p[5]+'px;line-height:'+(hv+5)+'px;'+bstr+' 0px '+p[6]+'px no-repeat}'
//		cssp += '.prbox .tt_'+pmid+' .ttc{line-height:'+(hv+5)+'px;margin-left:'+p[9]+'px;font-size:'+p[8]+'px;color:'+p[10]+';}'
//        cssp += '.prbox .tt_'+pmid+' .ttc a:link{color:'+p[7]+';}.prbox .tt_'+pmid+' .ttc a:visited{color:'+p[7]+';}.prbox .tt_'+pmid+' .ttc a:hover{color:#ff7300;}'
//
//		if(pagesht = StyleSheet.getSheetById('page')){
//			var hc = pagesht.getRuleStyle('A:hover','color')
//		}
//		if(parseInt(p[5])>0){
//			cssp += '.prbox .tt_'+pmid+' .mr a:link{color:'+p[7]+';}.prbox .tt_'+pmid+' .mr a:visited{color:'+p[7]+';}.prbox .tt_'+pmid+' .mr a:hover{color:'+hc+';}'
//		}
//		cssp += '.prbox .tt_'+pmid+' .ttc a:link{color:'+p[10]+';}.prbox .tt_'+pmid+' .ttc a:visited{color:'+p[10]+';}.prbox .tt_'+pmid+' .ttc a:hover{color:'+hc+';}'
//
//		if(f==4 && !g){ //手动调整确认			
//			//loading css片
//			try{			
//				ttsht.addRulePiece(cssp.replace(/\.prbox /g,''))
//			}catch(e){alert(e);popUpPrompt('您输入的值有误，请检查并重新输入！');return false;}
//			j = 0
//			while(j<tt.length){
//				tt[j].className = 'tt tt_'+pmid;
//				getElementsByClassName('icl','div',tt[j])[0].setAttribute('pos',p[4])  //保存backgroundPostion参数
//				getElementsByClassName('icr','div',tt[j])[0].setAttribute('pos',p[6])  //保存backgroundPostion参数
//				j++
//			}
//
//			//保存css参数		
//			if(arrIndexOf(Param_tt,pmid) !=null ){
//				arrDelete(Param_tt,pmid)
//			}
//			Param_tt.push({'id':pmid,'p':p})
//			
//		}else if(f==3){ //手动调整预览			
//			//loading css片
//			try{				
//				ttpresht.addRulePiece(cssp)
//			}catch(e){alert(cssp);popUpPrompt('您输入的值有误，请检查并重新输入！');return false;}
//			ptt.className = 'tt tt_'+pmid
//		}
//	}
//	if(f==2 || f==4){
//		if(f == 2 && !arrIndexOf(Param_tt,pmid) ){
//			pushParamTt(ptt,pmid)			
//		}
//		//getFirstTypeNode(tt,'text').nodeValue = fm.ttword.value						
//		Block.getBlockById(bid).setTtPm(pmid)
//	}
//	return true
//}
/*
确认设置block块的cont部分
*/	
//function setCont(o,f,g){
//	var fm = getParentByClassName('form_set',o)	
//	if(!g){
//		var bl = getParentByClassName('block',o)
//		var bid = bl.id.split('_')
//		bid = bid[1]	//block id
//		
//		
//		var ct = getElementsByClassName('cont','div',bl)				
//		var pct = null; //预览title对象
//		var j = 0;
//		while(j<ct.length){
//			if(ct[j].parentNode.className == 'ctpre'){
//				pct = ct[j]
//			}
//			j++
//		}
//	}else{
//		var pct = getElementsByClassName('cont','div',fm)[0]
//	}
//	
//	var pmid = fm.ctclass.value  //预设 classsname
//	var p = [fm.ctbgpic.value,fm.ctbgpos.value,fm.ctbgrpt.value,fm.ctbgcolor.value,fm.ctbdwidth.value,fm.ctbdtype.value,fm.ctbdcolor.value,fm.ctbglayh.value,fm.ctlineht.value,fm.ctwdcolor.value,fm.ctlkcolor.value,0,fm.ctpadding.value,fm.ctftsize.value]
//
//	//将预览关闭
//	if(StyleSheet.getSheetById('ctpre')){
//		StyleSheet.getSheetById('ctpre').sheet.disabled = true
//	}
//
//	if(f==1 || f==2){ //方案预览		
//		if( !existSpecialClass('cont',pmid) ){
//			if(f==1){
//				var prmpstr = '预览失败！不存在方案 "cont_'+pmid+'" <br/>请重新输入！'
//			}else if(f==2){
//				var prmpstr = '确认失败！不存在方案 "cont_'+pmid+'" <br/>确认前请先预览！'
//			}
//			popUpPrompt(prmpstr)				
//			return false;
//		}else if(f==1){
//			//方案预览							
//			pct.className = 'cont cont_'+pmid	  
//		}else if(f==2 && !g){
//			j = 0;
//			while(j<ct.length){
//				ct[j].className = 'cont cont_'+pmid
//				j++
//			}
//		}		  
//	}else{ 	
//		if(g){
//			pmid = 0
//		}else{
//			pmid = ct[0].className.split('cont_');
//			pmid = pmid[1].split(' ');
//			pmid = pmid[0]
//		}	
//		if(f==4 && !g){			
//			//建立css处理对象
//			var tmp = pct.className.split("_")
//			var ctsht
//			if(tmp[1]>99 && tmp[1]<200){				
//				pmid = parseInt(tmp[1])
//				ctsht = StyleSheet.getSheetById('cont_'+pmid)			
//				ctsht.removeAllRule()
//			}else{
//				pmid = generateID(StyleSheet.Registry,200,100,'cont_')
//				ctsht = new StyleSheet('cont_'+pmid)
//			}
//		}else if(f==3){
//			//建立css处理对象 预览专用
//			var ctpresht
//			if(ctpresht = StyleSheet.getSheetById('ctpre')){
//				ctpresht.sheet.disabled = false;
//				ctpresht.removeAllRule()
//			}else{
//				ctpresht = new StyleSheet('ctpre')
//			}
//		}
//		//css片 = 'border:'+p[4]+'px '+p[5]+' '+ p[6]
//		var bstr = p[3]+' url('+p[0]+') '+p[1]+' '+p[2]
//		var bdtop = p[4]
//
//		var hv = p[7] ==  parseInt(p[7]) ? parseInt(p[7])+'px' : 'auto'
//
//		var cssp =	'.prbox .box .cont_'+pmid+'{padding:'+p[12]+'px;}'
//					+ '.prbox .cont_'+pmid+' .cont_in{margin:'+p[12]+'px;height:'+hv+';}'
//					+ '.prbox .box .cont_'+pmid+'{height:'+hv+';border-top-width:'+bdtop+'px}'
//					+ '.prbox .cont_'+pmid+' {font-size:'+p[13]+'px;border-left-width:'+p[4]+'px;border-right-width:'+p[4]+'px;border-bottom-width:'+p[4]+'px;border-top-width:'+bdtop+'px;'
//					+ 'border-style:'+p[5]+';border-color:'+ p[6] +';line-height:'+parseInt(p[8])+'px;color:'+p[9]+';background:'+bstr+';}'
//
//					
//		
//		if(pagesht = StyleSheet.getSheetById('page')){
//			var hc = pagesht.getRuleStyle('A:hover','color')
//		}
//		if( p[10] != ''){
//			cssp += '.prbox .cont_'+pmid+' h3 a:link{color: '+p[10]+'}.prbox .cont_'+pmid+' h3 a:visited{color: '+p[10]+'}.prbox .cont_'+pmid+' h3 a:hover{color:'+hc+'}'	
//		}
//		if(f==4 && !g){ //手动调整确认			
//			//loading css片				
//			try{				
//				//ctsht.addRulePiece('.ddd{border:1px solid red}')			
//				//$('ssd').value = cssp.replace(/\.prbox /g,'')
//				ctsht.addRulePiece(cssp.replace(/\.prbox /g,''))			
//			}catch(e){popUpPrompt('您输入的值有误，请检查并重新输入！');return false;}
//			j = 0
//			while(j<ct.length){
//				ct[j].className = ct[j].className.replace(/cont_\d*/g,'cont_'+pmid)
//				j++
//			}
//
//			//保存css参数		
//			if(arrIndexOf(Param_cont,pmid) != null ){
//				arrDelete(Param_cont,pmid)
//			}
//			Param_cont.push({'id':pmid,'p':p})			
//		}else if(f==3){ //手动调整预览			
//			//loading css片
//			try{				
//				ctpresht.addRulePiece(cssp)
//			}catch(e){popUpPrompt('您输入的值有误，请检查并重新输入！');return false;}
//			pct.className = 'cont cont_'+pmid			
//		}
//	}
//	if(f==2 || f==4){
//		if(f == 2 && !arrIndexOf(Param_cont,pmid) ){
//			pushParamCont(pct,pmid)			
//		}
//		//getFirstTypeNode(tt,'text').nodeValue = fm.ttword.value						
//		Block.getBlockById(bid).setContPm(pmid)
//	}	
//	return true
//}
/*
确认设置全局样式设置
//*/	
//function globalSet(n){
//	var pagesht,promptstr;
//	try{
//		if(n==3 || n==4 ){
//			var tt_p = Param_tt[arrIndexOf(Param_tt,0)].p				
//		}else if( n==5 || n==6 ){
//			var cont_p = Param_cont[arrIndexOf(Param_cont,0)].p
//		}
//		if(pagesht = StyleSheet.getSheetById('page')){		
//			var fm = $('globalFormSet')
//			if(n==0){
//				while(++n<8){
//					globalSet(n)
//				}
//				promptstr = '^.^ 全部修改成功'
//			}else if(n==1){			
//				pagesht.setRuleStyle('BODY','backgroundImage','url('+fm.body_bgpic.value+')')
//				Param_page[0] = fm.body_bgpic.value
//				if(fm.body_bgpos.value){
//					var tmarr = trim(fm.body_bgpos.value).split(' ')
//					pagesht.setRuleStyle('BODY','backgroundPositionX',tmarr[0])
//					pagesht.setRuleStyle('BODY','backgroundPositionY',tmarr[1])
//					Param_page[1] = fm.body_bgpos.value
//				}
//				if(fm.body_bgrpt.value){
//					pagesht.setRuleStyle('BODY','backgroundRepeat',fm.body_bgrpt.value)
//					Param_page[2] = fm.body_bgrpt.value
//				}
//				if(fm.body_bgcolor.value){
//					pagesht.setRuleStyle('BODY','backgroundColor',fm.body_bgcolor.value)
//					Param_page[3] = fm.body_bgcolor.value
//				}
//				if(fm.body_wdcolor.value){
//					pagesht.setRuleStyle('BODY','color',fm.body_wdcolor.value)
//					Param_page[4] = fm.body_wdcolor.value
//				}			
//				promptstr = '^.^ body背景修改成功'
//			}else if(n==2){			
//				if(fm.alcolor.value){
//					pagesht.setRuleStyle('A:link','color',fm.alcolor.value)
//					pagesht.setRuleStyle('A:visited','color',fm.alcolor.value)		
//					Param_page[5] = fm.alcolor.value
//				}
//				if(fm.alline.value){
//					pagesht.setRuleStyle('A:link','textDecoration',fm.alline.value)
//					pagesht.setRuleStyle('A:visited','textDecoration',fm.alline.value)
//					Param_page[6] = fm.alline.value
//				}
//				if(fm.ahcolor.value){
//					pagesht.setRuleStyle('A:hover','color',fm.ahcolor.value)
//					pagesht.setRuleStyle('.tt_0 A:hover','color',fm.ahcolor.value)
//					pagesht.setRuleStyle('.cont_0 H3 A:hover','color',fm.ahcolor.value)
//					pagesht.setRuleStyle('UL.pl_0_1 A:hover','borderColor',fm.ahcolor.value)
//					Param_page[7] = fm.ahcolor.value
//				}
//				if(fm.ahline.value){
//					pagesht.setRuleStyle('A:hover','textDecoration',fm.ahline.value)
//					Param_page[8] = fm.ahline.value
//				}				
//				if(fm.aljump.checked){				
//					pagesht.setRuleStyle('A:hover','position','relative')
//					pagesht.setRuleStyle('A:hover','top','-2px')
//					Param_page[9] = true
//				}else{
//					pagesht.setRuleStyle('A:hover','position','static')
//					pagesht.setRuleStyle('A:hover','top','0')
//					Param_page[9] = false
//				}
//				promptstr = '^.^ 页面链接色修改成功'
//			}else if(n==3){			
//				pagesht.setRuleStyle('.tt_0','backgroundImage','url('+fm.ttbgpic.value+')')									
//				pagesht.setRuleStyle('.tt_0 .ttl','backgroundImage','url('+fm.ttbgpic.value+')')
//				pagesht.setRuleStyle('.tt_0 .ttr','backgroundImage','url('+fm.ttbgpic.value+')')
//				pagesht.setRuleStyle('.tt_0 .icl','backgroundImage','url('+fm.ttbgpic.value+')')
//				pagesht.setRuleStyle('.tt_0 .icr','backgroundImage','url('+fm.ttbgpic.value+')')
//				tt_p[0] = fm.ttbgpic.value
//				if(fm.ttheight.value){
//					pagesht.setRuleStyle('.tt_0','height',fm.ttheight.value + 'px')				
//					pagesht.setRuleStyle('.tt_0 .ttc','lineHeight',(parseInt(fm.ttheight.value)+5)+ 'px')		
//					pagesht.setRuleStyle('.tt_0 .icr','lineHeight',(parseInt(fm.ttheight.value)+5)+ 'px')	
//					tt_p[1] = fm.ttheight.value
//				}
//				if(fm.ttwidth.value){
//					pagesht.setRuleStyle('.tt_0 .ttl','width',fm.ttwidth.value + 'px')
//					pagesht.setRuleStyle('.tt_0 .ttr','width',fm.ttwidth.value + 'px')	
//					tt_p[2] = fm.ttwidth.value
//				}
//				if(fm.ttcftsize.value){
//					pagesht.setRuleStyle('.tt_0 .ttc','fontSize',fm.ttcftsize.value + 'px')					
//					tt_p[8] = fm.ttcftsize.value
//				}
//				if(fm.ttcmgleft.value){
//					pagesht.setRuleStyle('.tt_0 .ttc','marginLeft',fm.ttcmgleft.value + 'px')					
//					tt_p[9] = fm.ttcmgleft.value
//				}
//				if(fm.iclwidth.value){
//					pagesht.setRuleStyle('.tt_0 .icl','width',fm.iclwidth.value + 'px')					
//					tt_p[3] = fm.iclwidth.value
//				}
//				if(fm.iclpos.value){
//					pagesht.setRuleStyle('.tt_0 .icl','backgroundPositionY',fm.iclpos.value + 'px')					
//					tt_p[4] = fm.iclpos.value
//				}
//				if(fm.icrwidth.value){
//					pagesht.setRuleStyle('.tt_0 .icr','width',fm.icrwidth.value + 'px')					
//					tt_p[5] = fm.icrwidth.value
//				}
//				if(fm.icrpos.value){
//					pagesht.setRuleStyle('.tt_0 .icr','backgroundPositionY',fm.icrpos.value + 'px')					
//					tt_p[6] = fm.icrpos.value
//				}
//				if(fm.ttcolor.value){
//					pagesht.setRuleStyle('.tt_0','color',fm.ttcolor.value)
//					pagesht.setRuleStyle('.tt_0 A:link','color',fm.ttcolor.value)
//					pagesht.setRuleStyle('.tt_0 A:visited','color',fm.ttcolor.value)				
//					tt_p[7] = fm.ttcolor.value
//				}
//				if(fm.thcolor.value){
//					pagesht.setRuleStyle('.tt_0 .ttc','color',fm.thcolor.value)
//					pagesht.setRuleStyle('.tt_0 .ttc A:link','color',fm.thcolor.value)
//					pagesht.setRuleStyle('.tt_0 .ttc A:visited','color',fm.thcolor.value)	
//					tt_p[10] = fm.thcolor.value
//				}
//				promptstr = '^.^ 默认标题块修改成功'
//			}else if(n==4){
//				var ix 
//				if(ix = arrIndexOf(Param_tt,fm.ttclass.value)){
//					pagesht.setRuleStyle('.tt_0','backgroundImage','url('+Param_tt[ix].p[0]+')')
//					pagesht.setRuleStyle('.tt_0 .ttl','backgroundImage','url('+Param_tt[ix].p[0]+')')
//					pagesht.setRuleStyle('.tt_0 .ttr','backgroundImage','url('+Param_tt[ix].p[0]+')')
//					pagesht.setRuleStyle('.tt_0 .icl','backgroundImage','url('+Param_tt[ix].p[0]+')')
//					pagesht.setRuleStyle('.tt_0 .icr','backgroundImage','url('+Param_tt[ix].p[0]+')')
//					tt_p[0] = Param_tt[ix].p[0]
//
//					
//					pagesht.setRuleStyle('.tt_0','height',Param_tt[ix].p[1] + 'px')					
//					pagesht.setRuleStyle('.tt_0 .ttc','lineHeight',(parseInt(Param_tt[ix].p[1])+5)+ 'px')		
//					pagesht.setRuleStyle('.tt_0 .icr','lineHeight',(parseInt(Param_tt[ix].p[1])+5)+ 'px')	
//					tt_p[1] = Param_tt[ix].p[1]				
//
//					pagesht.setRuleStyle('.tt_0 .ttl','width',Param_tt[ix].p[2] + 'px')
//					pagesht.setRuleStyle('.tt_0 .ttr','width',Param_tt[ix].p[2] + 'px')		
//					tt_p[2] = Param_tt[ix].p[2]
//
//					pagesht.setRuleStyle('.tt_0 .ttc','fontSize',Param_tt[ix].p[8] + 'px')					
//					tt_p[8] = Param_tt[ix].p[8]
//
//					pagesht.setRuleStyle('.tt_0 .ttc','marginLeft',Param_tt[ix].p[9] + 'px')					
//					tt_p[9] = Param_tt[ix].p[9]
//
//					pagesht.setRuleStyle('.tt_0 .icl','width',Param_tt[ix].p[3] + 'px')					
//					tt_p[3]= Param_tt[ix].p[3]
//
//					pagesht.setRuleStyle('.tt_0 .icl','backgroundPositionY',Param_tt[ix].p[4] + 'px')					
//					tt_p[4] = Param_tt[ix].p[4]
//
//					pagesht.setRuleStyle('.tt_0 .icr','width',Param_tt[ix].p[5] + 'px')					
//					tt_p[5] = Param_tt[ix].p[5]
//
//					pagesht.setRuleStyle('.tt_0 .icr','backgroundPositionY',Param_tt[ix].p[6] + 'px')					
//					tt_p[6] = Param_tt[ix].p[6]
//
//					pagesht.setRuleStyle('.tt_0','color',Param_tt[ix].p[7])
//					pagesht.setRuleStyle('.tt_0 A:link','color',Param_tt[ix].p[7])
//					pagesht.setRuleStyle('.tt_0 A:visited','color',Param_tt[ix].p[7])
//					tt_p[7] = Param_tt[ix].p[7]	
//					
//					pagesht.setRuleStyle('.tt_0 .ttc','color',Param_tt[ix].p[10])
//					pagesht.setRuleStyle('.tt_0 .ttc A:link','color',Param_tt[ix].p[10])
//					pagesht.setRuleStyle('.tt_0 .ttc A:visited','color',Param_tt[ix].p[10])
//					tt_p[10] = Param_tt[ix].p[10]		
//				}
//				promptstr = '^.^ 默认标题块修改成功（方案拷贝）'
//			}else if(n==5){			
//				pagesht.setRuleStyle('.cont_0 H3 A:link','color',fm.ctlkcolor.value)
//				pagesht.setRuleStyle('.cont_0 H3 A:visited','color',fm.ctlkcolor.value)				
//				cont_p[10] = fm.ctlkcolor.value			
//
//				pagesht.setRuleStyle('.cont_0','color',fm.ctwdcolor.value)
//				cont_p[9] = fm.ctwdcolor.value
//
//				cont_p[7] = parseInt(fm.ctbglayh.value) ? parseInt(fm.ctbglayh.value) + 'px' : 'auto'
//				pagesht.setRuleStyle('.cont_0 .cont_in','height',cont_p[7])
//				pagesht.setRuleStyle('.box .cont_0','height',cont_p[7])		
//
//				cont_p[8] = parseInt(fm.ctlineht.value) ? parseInt(fm.ctlineht.value) + 'px' : 'normal'
//				pagesht.setRuleStyle('.cont_0','lineHeight',cont_p[8])
//				
//				cont_p[12] = parseInt(fm.ctpadding.value) ? parseInt(fm.ctpadding.value) : 0
//				pagesht.setRuleStyle('.box .cont_0','padding',cont_p[12])
//				pagesht.setRuleStyle('.cont_0 .cont_in','margin',cont_p[12])			
//				
//				pagesht.setRuleStyle('.cont_0','backgroundRepeat',fm.ctbgrpt.value)					
//				cont_p[2] = fm.ctbgrpt.value
//
//				pagesht.setRuleStyle('.cont_0','backgroundImage','url('+fm.ctbgpic.value+')')					
//				cont_p[0] = fm.ctbgpic.value
//
//				var tmpctarr = trim(fm.ctbgpos.value).split(' ')
//				pagesht.setRuleStyle('.cont_0','backgroundPositionX',tmpctarr[0])					
//				pagesht.setRuleStyle('.cont_0','backgroundPositionY',tmpctarr[1])
//				cont_p[1] = trim(fm.ctbgpos.value)
//
//				pagesht.setRuleStyle('.cont_0','backgroundColor',fm.ctbgcolor.value)					
//				cont_p[3] = fm.ctbgcolor.value
//				
//								
//				pagesht.setRuleStyle('.cont_0','borderStyle',fm.ctbdtype.value)					
//				cont_p[5] = fm.ctbdtype.value
//				
//				cont_p[11] = fm.ctbdistry.value
//				if(cont_p[11] == 1){
//					pagesht.setRuleStyle('.cont_0','borderTopWidth',0)
//				}else if(cont_p[11] == 2){
//					pagesht.setRuleStyle('.cont_0','borderBottomWidth',0)
//				}else if(cont_p[11] == 3){
//					pagesht.setRuleStyle('.cont_0','borderTopWidth',0)
//					pagesht.setRuleStyle('.cont_0','borderBottomWidth',0)
//				}else if(cont_p[11] == 4){
//					pagesht.setRuleStyle('.cont_0','borderTopWidth',fm.ctbdwidth.value + 'px')
//					pagesht.setRuleStyle('.cont_0','borderTopStyle','dashed')
//				}else if(cont_p[11] == 5){
//					pagesht.setRuleStyle('.cont_0','borderBottomWidth',fm.ctbdwidth.value + 'px')
//					pagesht.setRuleStyle('.cont_0','borderBottomStyle','dashed')
//				}else if(cont_p[11] == 6){
//					pagesht.setRuleStyle('.cont_0','borderTopWidth',fm.ctbdwidth.value + 'px')
//					pagesht.setRuleStyle('.cont_0','borderBottomWidth',fm.ctbdwidth.value + 'px')
//					pagesht.setRuleStyle('.cont_0','borderTopStyle','dashed')
//					pagesht.setRuleStyle('.cont_0','borderBottomStyle','dashed')
//				}else{
//					pagesht.setRuleStyle('.cont_0','borderTopWidth',fm.ctbdwidth.value + 'px')
//					pagesht.setRuleStyle('.cont_0','borderTopStyle',fm.ctbdtype.value)
//					pagesht.setRuleStyle('.cont_0','borderBottomWidth',fm.ctbdwidth.value + 'px')
//					pagesht.setRuleStyle('.cont_0','borderBottomStyle',fm.ctbdtype.value)
//				}	
//				
//				pagesht.setRuleStyle('.cont_0','borderLeftWidth',fm.ctbdwidth.value + 'px')					
//				pagesht.setRuleStyle('.cont_0','borderRightWidth',fm.ctbdwidth.value + 'px')		
//			
//				cont_p[4] = fm.ctbdwidth.value				
//				
//				pagesht.setRuleStyle('.cont_0','borderColor',fm.ctbdcolor.value)					
//				cont_p[6] = fm.ctbdcolor.value
//
//				pagesht.setRuleStyle('.cont_0','fontSize',fm.ctftsize.value + 'px')	
//				cont_p[13] = parseInt(fm.ctftsize.value)
//				promptstr = '^.^ 默认内容块修改成功'
//			}else if(n==6){
//				var ix 
//				if(ix = arrIndexOf(Param_cont,fm.ctclass.value)){
//					pagesht.setRuleStyle('.cont_0 h3 a:link','color',Param_cont[ix].p[10])
//					pagesht.setRuleStyle('.cont_0 h3 a:visited','color',Param_cont[ix].p[10])				
//					cont_p[10] = Param_cont[ix].p[10]		
//					
//					cont_p[7] = parseInt(Param_cont[ix].p[7]) ? parseInt(Param_cont[ix].p[7]) + 'px' : 'auto'
//					pagesht.setRuleStyle('.cont_0 .cont_in','height',cont_p[7])
//					pagesht.setRuleStyle('.box .cont_0','height',cont_p[7])		
//				
//					cont_p[8] = parseInt(Param_cont[ix].p[8]) ? parseInt(Param_cont[ix].p[8]) + 'px' : 'normal'
//					pagesht.setRuleStyle('.cont_0','lineHeight',cont_p[8])
//					
//					cont_p[12] = parseInt(Param_cont[ix].p[12]) ? parseInt(Param_cont[ix].p[12]) : 0
//					pagesht.setRuleStyle('.box .cont_0','padding',cont_p[12])
//					pagesht.setRuleStyle('.cont_0 .cont_in','margin',cont_p[12])			
//					
//					pagesht.setRuleStyle('.cont_0','backgroundRepeat',Param_cont[ix].p[2])					
//					cont_p[2] = Param_cont[ix].p[2]
//
//					pagesht.setRuleStyle('.cont_0','backgroundImage','url('+Param_cont[ix].p[0]+')')					
//					cont_p[0] = Param_cont[ix].p[0]
//
//					var tmpctarr = trim(Param_cont[ix].p[1]).split(' ')
//					pagesht.setRuleStyle('.cont_0','backgroundPositionX',tmpctarr[0])					
//					pagesht.setRuleStyle('.cont_0','backgroundPositionY',tmpctarr[1])
//					cont_p[1] = Param_cont[ix].p[1]
//
//					pagesht.setRuleStyle('.cont_0','backgroundColor',Param_cont[ix].p[3])					
//					cont_p[3] = Param_cont[ix].p[3]
//
//					cont_p[11] = 0						
//					
//					pagesht.setRuleStyle('.cont_0','borderWidth',Param_cont[ix].p[4] + 'px')					
//					cont_p[4] = Param_cont[ix].p[4]			
//						
//					pagesht.setRuleStyle('.cont_0','borderStyle',Param_cont[ix].p[5])					
//					cont_p[5] = Param_cont[ix].p[5]
//					
//					pagesht.setRuleStyle('.cont_0','borderColor',Param_cont[ix].p[6])					
//					cont_p[6] = Param_cont[ix].p[6]
//					
//					pagesht.setRuleStyle('.cont_0','fontSize',Param_cont[ix].p[13])
//					cont_p[13] = Param_cont[ix].p[13]
//				}
//				promptstr = '^.^ 默认内容块修改成功（方案拷贝）'
//			}else if(n==7){
//				pagesht.setRuleStyle('.block','marginBottom',fm.glblockmg.value)
//				//pagesht.setRuleStyle('.layer','marginTop',fm.glblockmg.value)
//				Param_page[10] = fm.glblockmg.value
//
//				if(fm.pagecenter.checked){
//					pagesht.setRuleStyle('.layer','marginLeft','auto')
//					pagesht.setRuleStyle('.layer','marginRight','auto')
//					Param_page[11] = true
//				}else{
//					pagesht.setRuleStyle('.layer','marginLeft','0')
//					Param_page[11] = false
//				}
//
//				pagesht.setRuleStyle('.layer','backgroundColor',fm.laybg.value)
//				Param_page[12] = fm.laybg.value
//
//				if(fm.laybd.checked){
//					//pagesht.setRuleStyle('.layer','border','1px solid #ccc')
//					pagesht.setRuleStyle('.layer','borderWidth','1px')
//					pagesht.setRuleStyle('.layer','borderStyle','solid')
//					pagesht.setRuleStyle('.layer','borderColor','#ccc')
//					Param_page[13] = true
//				}else{
//					pagesht.setRuleStyle('.layer','borderWidth','0')
//					Param_page[13] = false
//				}			
//				promptstr = '^.^ 其他设置修改成功'
//			}		
//			popUpPrompt(promptstr)			
//		}
//		return true;
//	}catch(e){popUpPrompt('您输入的值有误，请检查并重新输入！');return false;}
//}

/*
选择title样式类
*/
function titleClass(o,n){
	var bl = getParentByClassName('block',o);
	var bid = bl.id.split('_');
	bid = bid[1];
	var tt = getElementsByClassName('tt','div',bl);
	var j = tt.length;		
	while( j-- > 0 ){		
		if(tt[j].parentNode.className != 'ttsel' && tt[j].parentNode.className != 'arr-downhidCont'){
			tt[j].className = 'tt tt_'+n
		}		
	}			
}

function showBox_2(b,n,bid){       
    showBox(b,parseInt(n))            		
    var t = getNextSibling(b)	
    if(t && t.className.indexOf('prbox')>-1){        
        if(n==3){	
			var pmid = Block.getBlockById(bid).ttPm
		}		
    }    
}

function expandTileClass(o){	
	var n = 21;
	var c = getNextSibling(o);
	if( c.innerHTML == "" ){
		var i = n;
		while( i-- > 10){
			var tstr = '<div class="tt tt_'+i+'" onclick="titleClass(this,'+i+')"> <div class="ttl"></div> <div class="icl"></div> <div class="ttc"><h3 class="ant_txt">title</h3></div> <div class="ttr"></div> <div class="icr mr"><a href="javascript:void(0)" target="_self">更多</a></div> </div>'
			
			c.insertAdjacentHTML('afterbegin',tstr);
		}
	}
}

/*
block块的样式设置功能引导函数
*/
function setContainer(e,o){     
	e = e || window.event;
	e.cancelBubble=true
	var t = (e.clientY < 0 ? (e.clientY + 30) : e.clientY)  + document.documentElement.scrollTop + 'px'
	var l = ((e.clientX - 260) < 0 ? (e.clientX - 20) : (e.clientX - 200)) + document.documentElement.scrollLeft + 'px'	
	GLOBALNODE = getParentByClassName('del',o)	
	createPopDiv('popbox',t,l)	
	var bid = fetchIdByClass(o)
	var blk = Block.getBlockById(bid)
	var str = '<div class="ant_ttctset">'	
	
	if(blk.cont){
		//针对cont区块			
	}
	if(blk.title){
		//针对title区块
		str += '<a class="mr7" href="javascript:void(0)" onclick="popClose();showBox_2(GLOBALNODE,3,'+bid+');return false;">设置title？</a>'
	}
	if(!blk.title){
		str += '无内容可设置！'
	}
	str += '<a class="ml7" href="" onclick="popClose();setBlockMargin('+bid+');return false;">取消/恢复块间距？</a></div>'
	$('popbox').innerHTML = str	
	//showBox(o.parentNode.parentNode,1)
}

/*
取消或恢复block块的marginbottom
*/	
function setBlockMargin(bid){
	var t =  $('block_'+bid)
	if( t.className.indexOf('block_nomargin') > -1 ){		
		t.className = t.className.replace(/\s*block_nomargin\s*/ig,' ')
		t.style.marginBottom = ''		
	}else{
		t.className += ' block_nomargin'
		t.style.marginBottom = '0'		
	}
	var l = getLastElementChild(t)		
	if( l && l.className && l.className =='bdspace' ){			
		delSpace(t)				
	}else{
		addSpace(t)		
	}
}
/*
block块的代码编辑功能引导函数
*/
function setCode(e,o){
	e = e || window.event
	e.cancelBubble=true	
	var t = (e.clientY < 0 ? (e.clientY + 30) : e.clientY)  + document.documentElement.scrollTop + 'px'
	var l = ((e.clientX - 260) < 0 ? (e.clientX - 20) : (e.clientX - 200)) + document.documentElement.scrollLeft + 'px'	
	GLOBALNODE = getParentByClassName('del',o)
	createPopDiv('popbox',t,l)
	var bid = fetchIdByClass(o)
	$('popbox').innerHTML = '<!--a class="ml7" href="javascript:void(0)" onclick="popClose();showCodeBox(GLOBALNODE,\'6a\','+bid+');return false;">查看获取block代码？</a--><a class="ml7" href="javascript:void(0)" onclick="popClose();showCodeBox(GLOBALNODE,\'6b\','+bid+');return false;">自定义内容？</a>'	
}	
/*
清除预览状态下的js动作
*/
function clearJs(){
	doAOnClick = function(){return true}
	doStartMove = function(){}
	doCutOver = function (){}
	doCutOut = function (){}
	doStartCut = function (){}	
}
/*
恢复预览状态下的js动作
*/
function restoreJs(){
	doAOnClick = aOnClick
	doStartMove = startMove
	doCutOver = cutOver;
	doCutOut = cutOut;
	doStartCut = startCut;
}

/*
清理当前页面block除了 block_0
*/
function cleanPage(){
	var i = 0;
	while(Block.Registry.length>0){	
		var d = Block.Registry[i].id		
		var b = Block.Registry[i].container.parentNode.parentNode
		b.parentNode.removeChild(b);
		Block.removeBlockById(d)
	}
}

/*
debug 提示
*/
var g_info_ln = 0;
function info(s) {
	try{
		var inf = document.getElementById("ant_info");
		inf.innerHTML += "] " + (++ g_info_ln) + " > " + s + "<br />";
		inf.scrollTop += 20;
	}catch(e){}
}