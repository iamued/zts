/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/*
������ȫ�ֱ���
*/

var GATE = 0; //���ܼ��׿�����   2:�̶����ֲ���ѡ���еȸ��еĹ��ܣ�
var CTRL = CTRL_LOCK = false;  //ctrl ���ܼ�����
var GLOBALNODE    //ȫ�ֹ��ýڵ����
var COMMONTIMER   //������ʱ����
var LAYOUTNUM = 44
var LAYOUTBUFFER = 0;
var CURLAYERNUM;
var MAXLAYERNUM = 20;
var INTERVALTIMER;

var URL_JS = 'http://www.51edu.com/zt/';
var URL_CSS = 'http://www.51edu.com/zt/';
var URL_PARTS = 'http://www.51edu.com/zt/parts/';

var sidetoolbar //Ư��������
var promptpopup //�ײ�������
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
	{'tag':'ģ��1','mcss':'http://www.51edu.com/zt/res/skin/skin_1.css','mbgi':'http://www.51edu.com/zt/res/skin/skin_1.gif'},
	{'tag':'ģ��2','mcss':'http://www.51edu.com/zt/res/skin/skin_2.css','mbgi':'http://www.51edu.com/zt/res/skin/skin_2.gif'}
]


var html_bar = [
	'<a class="bar bar_x" href="#" onclick="closeContainer(this);return false"></a><a class="bar bar_min" href="#"  onclick="changeVisible(this);return false"></a><a class="bar bar_set" href="#" title="����Block��ʽ" onclick="setContainer(event,this);return false"></a><a class="del bar bar_code" href="#" title="block�����༭" onclick="setCode(event,this);return false"></a>', //0
	'<div class="del ctrbar2"><a href="javascript:void(0)" onclick="clearCont(this,1);return false;">����</a> | <a href="javascript:void(0)" onclick="clearCont(this);return false;">���</a> | <a href="javascript:void(0)" onclick="showIBox(this);return false;">��������</a></div>', //1
	'<div class="del layerctr"><a class="btn_rmlayer" href="javascript:void(0)" title="ɾ��Layer_#SN" onclick="deleteLayer(#SN);return false;" >#SN</a><a class="btn_smlayer" title="��С��/���" href="javascript:void(0)" onclick="pressMinAll(this,#SN);return false"></a></div>', //2
	'<DIV class="del ctrbar"><a class="btn_addblk" href="javascript:void(0)" title="�������block��" onclick="showBox(this,0);return false" ></a><a href="javascript:void(0)" class="btn_qkadd" title="����������Ӵ����" onclick="showIBox(this,2);return false;"></a></DIV>', //3
	'<td class="cutline" width="8" style="background:#fff;"></td>', //4
	'<a class="bar bar_x" href="#" onclick="closeContainer(this);return false"></a><a class="bar bar_set" href="#" title="����Block��ʽ" onclick="setContainer(event,this);return false"></a>' //5
	]
var html_layer = ['<div id="layer_#SN" class="layer"><div class="del"><input type="button" class="l" value=" ɾ��layer_#SN " onclick="deleteLayer(\'#SN\')"/></div><table class="cutable" border="0" cellspacing="0" cellpadding="0"><tr><td valign="top"><div id="a#SN_tube_0" class="tube style_0_1" style="width:300px"><div class="del ctrbar"><img class="add" src="http://www.51edu.com/zt/imgs/ico_smadd.gif" title="�������block��" onclick="showBox(this,0)"/></div></div></td>'+html_bar[4]+'<td><div id="a#SN_tube_1" class="tube style_1_1" style="width:300px"><div class="del ctrbar"><img class="add" src="http://www.51edu.com/zt/imgs/ico_smadd.gif" title="�������block��" onclick="showBox(this,0)"/></div></div></td>'+html_bar[4]+'<td><div id="a#SN_tube_2" class="tube style_2_1" style="width:200px"><div class="del ctrbar"><img class="add" src="http://www.51edu.com/zt/imgs/ico_smadd.gif" title="�������block��" onclick="showBox(this,0)"/></div></div></td>'+html_bar[4]+'<td><div id="a#SN_tube_3" class="tube style_3_1" style="width:128px"><div class="del ctrbar"><img class="add" src="http://www.51edu.com/zt/imgs/ico_smadd.gif" title="�������block��" onclick="showBox(this,0)"/></div></div></td></tr></table><div class="c"></div><input id="layeradd_#SN" class="del addLayer" disabled="true" type="button" value=" ����layer " onclick="addLayer(this)" /></div>',
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
	'<div id="block_#id" class="block"><div class="del hdpr r"><div class="ttpa">'+html_bar[0]+'</div></div><div id="title_#id" class="tt tt_0"><div class="ttl"></div><div class="icl" pos="0"></div><div class="ttc"><h3 class="ant_txt">title</h3></div><div class="ttr"></div><div class="icr mr" pos="0"><a href="javascript:void(0)">����</a></div></div><div id="cont_#id" class="cont cont_0"><div id="cont_in_#id" class="cont_in">'+html_bar[1]+'</div></div></div>', //0  title cont
	'<div class="block" id="block_#id"><div class="del hdpr r"><div class="ttpa">'+html_bar[0]+'</div></div><div class="tt tt_0" id="title_#id"><div class="ttl"></div><div pos="0" class="icl"></div><div class="ttc"><h3 class="ant_txt">title</h3></div><div class="ttr"></div><div pos="0" class="icr mr"><a href="javascript:void(0)">����</a></div></div><div class="box mttb"> <div id="cont_in_#id"><div class="l h"> <div class="cont cont_0 box_mr" id="cont_#id">'+html_bar[1]+'</div></div> <div class="r h"><div class="cont cont_0 box_ml">'+html_bar[1]+'</div></div> <div class=c></div></div></div></div>', //1  title + 2 cont 	
	'<div class="block" id="block_#id"><div class="del hdpr r"><div class="ttpa">'+html_bar[0]+'</div></div><div class="tt tt_0" id="title_#id"><div class="ttl"></div><div pos="0" class="icl"></div><div class="ttc"><h3 class="ant_txt">title</h3></div><div class="ttr"></div><div pos="0" class="icr mr"><a href="javascript:void(0)">����</a></div></div><div class="box mttb"> <div id="cont_in_#id"><div class="l t"><div class="cont cont_0 box_mr" id=cont_0>'+html_bar[1]+'</div></div><div class="l t"><div class="cont cont_0 box_ml box_mr">'+html_bar[1]+'</div></div><div class="r t"><div class="cont cont_0 box_ml">'+html_bar[1]+'</div></div><div class=c></div><div class=c></div></div></div></div>', //2  title + 3 cont 
	'<div id="block_#id" class="block"><div class="del blkbar">'+html_bar[0]+'<div class="c"></div></div><div class="box"><div id="cont_in_#id"><div class="l h"><div class="box_mr"><div id="title_#id" class="tt tt_0"><div class="ttl"></div><div class="icl" pos="0"></div><div class="ttc"><h3 class="ant_txt">title</h3></div><div class="ttr"></div><div class="icr mr" pos="0"><a href="javascript:void(0)">����</a></div></div><div id="cont_#id" class="cont cont_0">'+html_bar[1]+'</div></div></div><div class="r h"><div class="box_ml"><div class="tt tt_0"><div class="ttl"></div><div class="icl" pos="0"></div><div class="ttc"><h3 class="ant_txt">title</h3></div><div class="ttr"></div><div class="icr mr" pos="0"><a href="javascript:void(0)">����</a></div></div><div class="cont cont_0">'+html_bar[1]+'</div></div></div><div class="c"></div></div></div></div>', //3   2 box title
	'<div id="block_#id" class="block"><div class="del blkbar">'+html_bar[0]+'<div class="c"></div></div><div class="box"><div id="cont_in_#id"><div class="l t"><div class="box_mr"><div id="title_#id" class="tt tt_0"><div class="ttl"></div><div class="icl" pos="0"></div><div class="ttc"><h3 class="ant_txt">title</h3></div><div class="ttr"></div><div class="icr mr" pos="0"><a href="javascript:void(0)">����</a></div></div><div id="cont_#id" class="cont cont_0">'+html_bar[1]+'</div></div></div><div class="l t"><div class="box_mr box_ml"><div class="tt tt_0"><div class="ttl"></div><div class="icl" pos="0"></div><div class="ttc"><h3 class="ant_txt">title</h3></div><div class="ttr"></div><div class="icr mr" pos="0"><a href="javascript:void(0)">����</a></div></div><div class="cont cont_0">'+html_bar[1]+'</div></div></div><div class="r t"><div class="box_ml"><div class="tt tt_0"><div class="ttl"></div><div class="icl" pos="0"></div><div class="ttc"><h3 class="ant_txt">title</h3></div><div class="ttr"></div><div class="icr mr" pos="0"><a href="javascript:void(0)">����</a></div></div><div class="cont cont_0">'+html_bar[1]+'</div></div></div><div class="c"></div></div></div></div>', //4   3 box title
	'<div id="block_#id" class="block"><div class="del blkbar">'+html_bar[0]+'<div class="c"></div></div><div class="box"><div id="cont_in_#id"><div id="cont_#id" class="cont cont_0">'+html_bar[1]+'</div></div></div></div>', //5   1 box
	'<div id="block_#id" class="block"><div class="del blkbar">'+html_bar[0]+'<div class="c"></div></div><div class="box"><div id="cont_in_#id"><div class="l h"><div id="cont_#id" class="cont cont_0 box_mr">'+html_bar[1]+'</div></div><div class="r h"><div class="cont cont_0 box_ml">'+html_bar[1]+'</div></div><div class="c"></div></div></div></div>', //6  2 box
	'<div id="block_#id" class="block"><div class="del blkbar">'+html_bar[0]+'<div class="c"></div></div><div class="box"><div id="cont_in_#id"><div class="l t"><div id="cont_#id" class="cont cont_0 box_mr">'+html_bar[1]+'</div></div><div class="l t"><div class="cont cont_0 box_ml box_mr">'+html_bar[1]+'</div></div><div class="r t"><div class="cont cont_0 box_ml">'+html_bar[1]+'</div></div><div class="c"></div></div></div></div>', //7   3 box	
	'<div id="block_#id" class="block"><div class="del blkbar blkbartp"><a class="del bar bar_x" href="#" onclick="closeContainer(this);return false"></a><a class="del bar bar_min" href="#"  onclick="changeVisible(this);return false"></a><a class="del bar bar_set" href="#" title="����Block��ʽ" onclick="showBox(this.parentNode,4);return false"></a><div class="c"></div></div><div class="box"><div id="cont_in_#id"><div class="scrtop scrtop_#id"><h1 class="mark l pa bw h"><a class="del bar bar_set" href="#" title="������ʽ" onclick="showBox(this,2);return false"></a>����˫������ ~ (tab������ ����1 ��� ESC ������)������Ԥ��~~</h1></div></div></div></div>', //8   �㱳������
	'<div id="block_#id" class="block"><div class="del blkbar"><a class="del bar bar_x" href="#" onclick="closeContainer(this);return false"></a><a class="del bar bar_min" href="#"  onclick="changeVisible(this);return false"></a><a class="del bar bar_set" href="#" title="���õ�����ʽ" onclick="alert(\'�˹�����δ��ͨ~~\');return false;//setNav(event,this);"></a><a class="del bar bar_code" href="#" title="���������༭" onclick="setCode(event,this);return false"></a><div class="c"></div></div><div class="box"><div id="cont_in_#id"><div class="contnav"> 	<div class="ttl"></div> 	<ul id="mcontnav" class="mcontnav"> 	<li><a href="javascript:void(0)">��ҳ</a></li> 	<li class="hov" ><a  href="javascript:void(0)">������</a>			<div id="fff" class="navbot"> 			<a class="cur" href="javascript:void(0)">�ӵ���1</a> | <a href="javascript:void(0)">�ӵ���1</a> | <a href="javascript:void(0)">�ӵ���1</a> | <a href="javascript:void(0)">�ӵ���1</a> | <a href="javascript:void(0)">�ӵ���1</a> | <a href="javascript:void(0)">�ӵ���1</a> | <a href="javascript:void(0)">�ӵ���1</a> 		</div> 	</li> 	<li><a href="javascript:void(0)">��Ѷ<img src="http://img.china.alibaba.com/images/cn/corp/alipay/new.gif" width="21" height="9"/></a>			<div class="navbot"> 			<a href="javascript:void(0)">�ӵ���2</a> | <a href="javascript:void(0)">�ӵ���2</a> | <a href="javascript:void(0)">�ӵ���2</a> | <a href="javascript:void(0)">�ӵ���2</a> | <a href="javascript:void(0)">�ӵ���2</a> | <a href="javascript:void(0)">�ӵ���2</a> | <a href="javascript:void(0)">�ӵ���2</a> 		</div> 	</li> 	<li><a href="javascript:void(0)">���⹺��</a>			<div class="navbot"> 			<a href="javascript:void(0)">�ӵ���3</a> | <a href="javascript:void(0)">�ӵ���3</a> | <a href="javascript:void(0)">�ӵ���3</a> | <a href="javascript:void(0)">�ӵ���3</a> | <a href="javascript:void(0)">�ӵ���3</a> | <a href="javascript:void(0)">�ӵ���3</a> | <a href="javascript:void(0)">�ӵ���3</a> 		</div> 	</li> 	<li><a href="javascript:void(0)">��̳</a>			<div class="navbot"> 			<a href="javascript:void(0)">�ӵ���4</a> | <a href="javascript:void(0)">�ӵ���4</a> | <a href="javascript:void(0)">�ӵ���4</a> | <a href="javascript:void(0)">�ӵ���4</a> | <a href="javascript:void(0)">�ӵ���4</a> | <a href="javascript:void(0)">�ӵ���4</a> | <a href="javascript:void(0)">�ӵ���4</a> 		</div> 	</li> 	<li><a href="javascript:void(0)">���ﻥ��</a>			<div class="navbot"> 			<a href="javascript:void(0)">�ӵ���5</a> | <a href="javascript:void(0)">�ӵ���5</a> | <a href="javascript:void(0)">�ӵ���5</a> | <a href="javascript:void(0)">�ӵ���5</a> | <a href="javascript:void(0)">�ӵ���5</a> | <a href="javascript:void(0)">�ӵ���5</a> | <a href="javascript:void(0)">3��Ϸ</a> 		</div> 	</li> 	<li><a href="javascript:void(0)">��������</a></li> 	</ul> 	<div class="ttr"></div>	</div> </div></div></div><input id="navhid" type="hidden" value="1,1"/>', //9    ��������	
	'<div id="block_#id" class="block"><div class="del blkbar">'+html_bar[0]+'<div class="c"></div></div><div><div id="cont_in_#id" class="cont_in">'+html_bar[1]+'</div></div></div>',  //10    �հ׿�
	'<div id="block_#id" class="block"><div class="del blkbar"><a class="del bar bar_x" href="#" onclick="closeContainer(this);return false"></a><a class="del bar bar_min" href="#"  onclick="changeVisible(this);return false"></a><div class="c"></div></div><div class="box"><div id="cont_in_#id"><a href="javascript:void(0)"><img src="http://www.51edu.com/zt/imgs/ban_1226471225391.jpg" width="952" height="150"/></a></div></div></div>', //11   ����ͼ
	'<div id="block_#id" class="block"><div class="del blkbar">'+html_bar[0]+'<div class="c"></div></div><div class="ant_nopdcont"><div id="cont_in_#id" class="cont_in"><a href="javascript:void(0)"><img src="http://www.51edu.com/zt/imgs/all.gif" width="100%" /></a></div></div></div>', //12 ͼƬ��
	'<div id="block_#id" class="block"><div class="del blkbar">'+html_bar[0]+'<div class="c"></div></div><div class="box"><div id="cont_in_#id"><div id="cont_#id" class="cont ant_nopdcont">'+html_bar[1]+'</div></div></div></div>', //13 ���ڱ߾�box
	'<div id="block_#id" class="block"><div class="del hdpr r"><div class="ttpa">'+html_bar[0]+'</div></div><div id="title_#id" class="tt tt_0"><div class="ttl"></div><div class="icl" pos="0"></div><div class="ttc"><h3 class="ant_txt">title</h3></div><div class="ttr"></div><div class="icr mr" pos="0"><a href="javascript:void(0)">����</a></div></div><div id="cont_#id" class="cont ant_nopdcont"><div id="cont_in_#id" class="cont_in">'+html_bar[1]+'</div></div></div>', //14 ���ڱ߾� title cont
	'<div id="block_#id" class="block"><div class="del hdpr r"><div class="ttpa">'+html_bar[5]+'</div></div><div id="title_#id" class="tt tt_0"><div class="ttl"></div><div class="icl" pos="0"></div><div class="ttc"><h3 class="ant_txt">title</h3></div><div class="ttr"></div><div class="icr mr" pos="0"><a href="javascript:void(0)">����</a></div></div><div class="cont bn"><div id="cont_in_#id"></div></div></div>' //15  ������ 
	]
var html_oper = [
	'<div class="del prbox prbox_3" onmousedown="cancelBubble(event)"><div class="pa" ondblclick="closeBox(this);"><a onclick="closeBox(this);return false" href="javascript:void(0)" class="clsb"></a><div class="c"></div><div class="tut" >��������</div><a class="tuse tuse_1" href="javascript:void(0)" onclick="newIBlock(event,this,0);return false"></a><a class="tuse tuse_2" href="javascript:void(0)" onclick="newIBlock(event,this,1);return false"></a><a class="tuse tuse_3" href="javascript:void(0)" onclick="newIBlock(event,this,2);return false"></a><div class="c"></div><div class="tut tut_m">�������</div><a class="tuse tuse_4" href="javascript:void(0)" onclick="newIBlock(event,this,3);return false"></a><a class="tuse tuse_5" href="javascript:void(0)" onclick="newIBlock(event,this,4);return false"></a><div class="c"></div><div class="tut">�����ݿ�</div><a class="tuse tuse_6" href="javascript:void(0)" onclick="newIBlock(event,this,5);return false"></a><a class="tuse tuse_7" href="javascript:void(0)" onclick="newIBlock(event,this,6);return false"></a><a class="tuse tuse_8" href="javascript:void(0)" onclick="newIBlock(event,this,7);return false"></a><div class="c"></div><div class="tut">ͼ Ƭ ��</div><a class="tuse tuse_10" href="javascript:void(0)" onclick="newIBlock(event,this,12);return false"></a><div class="c"></div><div class="tut">�� �� ��</div><a class="tuse tuse_9" href="javascript:void(0)" onclick="newIBlock(event,this,10);return false"></a><div class="c"></div><div class="tut">�� �� ��</div><a class="tuse tuse_11" href="javascript:void(0)" onclick="newIBlock(event,this,15);return false"></a></div></div>',//0
	'<div class="del prbox prbox_0" onmousedown="cancelBubble(event)"><div class="pa"><a class="clsb" href="javascript:void(0)" onclick="closeBox(this);return false"></a><br /><br /><a href="javascript:void(0)" onclick="insertCont(this,\'ul_0\');closeBox(this);return false;" onmouseover="snapshot(event,\'ul_0\')">��ͨ����</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'ul_1\');closeBox(this);return false;" onmouseover="snapshot(event,\'ul_1\')">��������</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'ul_2\');closeBox(this);return false;" onmouseover="snapshot(event,\'ul_2\')">��������</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'ul_3\');closeBox(this);return false;" onmouseover="snapshot(event,\'ul_3\')">��������</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'ul_4\');closeBox(this);return false;" onmouseover="snapshot(event,\'ul_4\')">���ɸ���</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'pl_0\');closeBox(this);return false;" onmouseover="snapshot(event,\'pl_0\')">ͼƬ��00</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'pl_0_1\');closeBox(this);return false;" onmouseover="snapshot(event,\'pl_0_1\')">ͼƬ��01</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'pl_1\');closeBox(this);return false;" onmouseover="snapshot(event,\'pl_1\')">ͼƬ��10</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'pl_1_1\');closeBox(this);return false;" onmouseover="snapshot(event,\'pl_1_1\')">ͼƬ��11</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'pl_2\');closeBox(this);return false;" onmouseover="snapshot(event,\'pl_2\')">ͼ����20</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'pl_2_1\');closeBox(this);return false;" onmouseover="snapshot(event,\'pl_2_1\')">ͼ����21</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'hp_0\');closeBox(this);return false;" onmouseover="snapshot(event,\'hp_0\')">ͷ����00</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'hp_0_1\');closeBox(this);return false;" onmouseover="snapshot(event,\'hp_0_1\')">ͷ����01</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'hp_0_2\');closeBox(this);return false;" onmouseover="snapshot(event,\'hp_0_2\')">ͷ����02</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'hp_0_3\');closeBox(this);return false;" onmouseover="snapshot(event,\'hp_0_3\')">ͷ����03</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'hp_1\');closeBox(this);return false;" onmouseover="snapshot(event,\'hp_1\')">ͷ����10</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'lcl_0\');closeBox(this);return false;" onmouseover="snapshot(event,\'lcl_0\')">��Ԫ��00</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'lcl_1\');closeBox(this);return false;" onmouseover="snapshot(event,\'lcl_1\')">��Ԫ��10</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'rk_0\',0,\'rk_0\');closeBox(this);return false;" onmouseover="snapshot(event,\'rk_0\')">������00</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'fpic\',\'fpic\',\'fpic\');closeBox(this);return false;" onmouseover="//snapshot(event,\'fpic\')">����ͷͼ</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'sp_0\');closeBox(this);return false;" onmouseover="snapshot(event,\'sp_0\')">�ָ���00</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'sp_1\');closeBox(this);return false;" onmouseover="snapshot(event,\'sp_1\')">�ָ���01</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'pc_0\');closeBox(this);return false;" onmouseover="snapshot(event,\'pc_0\')">��ͼƬ��</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'qqlst\',\'qqlst\',\'qqlst\');closeBox(this);return false;" onmouseover="//snapshot(event,\'qqlst\')">��qq�˵�</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'picrun\',\'picrun\',\'picrun\');closeBox(this);return false;" onmouseover="//snapshot(event,\'picrun\')">����ͼ01</a>|<a href="javascript:void(0)" onclick="insertCont(this,\'sw\',\'sw\',\'sw\');closeBox(this);return false;" onmouseover="//snapshot(event,\'sw\')">�����л�</a>|</div></div>',//1
	'<div class="del prbox" onmousedown="cancelBubble(event)" ondblclick="cancelBubble(event)" onclick="cancelBubble(event)"><div class="pa"><a class="clsb" href="javascript:void(0)" onclick="closeBox(this);return false"></a><br/><form>����ɫ��<input name="ftcolor" type="text" value="" size="10"/><br />���壺<select name="ftfm"><option selected="selected" value="">ѡ������</option><option value="Verdana">Verdana</option><option value="����">����</option><option value="����">����</option></select><br />�����С��<select name="ftsz"><option selected="selected" value="">ѡ�������С</option><option value="14px">14px</option><option value="16px">16px</option><option value="18px">18px</option><option value="20px">20px</option><option value="25px">25px</option><option value="28px">28px</option><option value="30px">30px</option><option value="34px">34px</option></select><br />���룺<select name="ftal"><option selected="selected" value="">ѡ����뷽ʽ</option><option value="left">�����</option><option value="right">�Ҷ���</option><option value="center">����</option></select><br /><input type="button" value="ȷ��" onclick="setTopWordsStyle(this);closeBox(this.parentNode)"/></form></div></div>',//2
	'<div class="del prbox prbox_1" onmousedown="cancelBubble(event)" onclick="cancelBubble(event);"><div class="pa"><a class="clsb" href="javascript:void(0)" onclick="closeBox(this,1);return false"></a><div class="c"></div><div class="ttsel"><div class="tt tt_0" onclick="titleClass(this,0)"><div class="ttl"></div><div class="icl"></div><div class="ttc"><h3 class="ant_txt">title</h3></div><div class="ttr"></div><div class="icr mr"><a href="javascript:void(0)" target="_self">����</a></div></div>	<div class="c"></div><div class="tt tt_1" onclick="titleClass(this,1)"><div class="ttl"></div><div class="icl"></div><div class="ttc"><h3 class="ant_txt">title</h3></div><div class="ttr"></div><div class="icr mr"><a href="javascript:void(0)" target="_self">����</a></div></div><div class="c"></div><div class="tt tt_2" onclick="titleClass(this,2)"><div class="ttl"></div><div class="icl"></div><div class="ttc"><h3 class="ant_txt">title</h3></div><div class="ttr"></div><div class="icr mr"><a href="javascript:void(0)" target="_self">����</a></div></div><div class="c"></div><div class="tt tt_3" onclick="titleClass(this,3)"><div class="ttl"></div><div class="icl"></div><div class="ttc"><h3 class="ant_txt">title</h3></div><div class="ttr"></div><div class="icr mr"><a href="javascript:void(0)" target="_self">����</a></div></div></div><div class="bt_2 mt7 mr5 ml5 pt7"><div class="arr-downhid" style="height:20px"> <a href="javascript:void(0)" class="arr-down"  onclick="var ps=this.parentNode.style;if(this.className==\'arr-down\'){ps.height=\'auto\';this.className=\'arr-up\'}else{ps.height=\'20px\';this.className=\'arr-down\'}expandTileClass(this);return false;">���������ʽ</a> <div class="arr-downhidCont"></div> </div></div><div class="ttpre"></div></div></div>',//3
	'<div class="del prbox" onmousedown="cancelBubble(event)"><div class="pa"><a class="clsb" href="javascript:void(0)" onclick="closeBox(this);return false"></a><br/><form>����ͼƬ��ַ��<input type="text" name="bgpic"/><br />����ͼƬλ�ã�<input type="text" name="bgpos" /><br />����ͼƬƽ�̣�<select name="bgrpt"><option value="" selected="true">��ѡ��</option><option value="no-repeat">��ƽ��</option><option value="repeat">˫��ƽ��</option><option value="repeat-x">ˮƽƽ��</option><option value="repeat-y">��ֱƽ��</option></select><br />����ɫ��<input type="text" name="bgcolor" size="10"/><br />��߶ȣ�<input type="text" name="bglayh" size="10"/><input type="button" value="ȷ��" onclick="setTopLayer(this);closeBox(this.parentNode)"/></form></div></div>',//4
	'<div class="del prbox prbox_0" onmousedown="cancelBubble(event)"><div class="pa"><a class="clsb" href="javascript:void(0)" onclick="closeBox(this);return false"></a><br/><br/><a href="javascript:void(0)" onclick="newBlock(this.parentNode.parentNode.parentNode,11);closeBox(this);return false">����ͼ</a><br /><a href="javascript:void(0)" onclick="newBlock(this.parentNode.parentNode.parentNode,8);closeBox(this);return false">���ñ�����</a><br /><a href="javascript:void(0)" onclick="addNavBlock(this.parentNode.parentNode.parentNode,9);closeBox(this);return false">��������</a></div></div>', //5
	'<div class="del prbox prbox_2" onclick="cancelBubble(event)" onmousedown="cancelBubble(event)"><span><a class="clsb" href="javascript:void(0)" onclick="closeBox(this,1);return false"></a></span><form><input class="fm_blockid" type="text" name="blockid" value="" readonly/><br/><textarea name="codearea" onmousedown="cancelBubble(event)"></textarea><input class="fm_codespe" type="text" readonly name="codespe" value=""/><input name="editcode" type="button" value="ȷ��" onmousedown="cancelBubble(event)" /> <input type=button value=�ر� onclick="closeBox(this,1);" /></form></div>', //6
	'<div class="del prbox prbox_1" onmousedown="cancelBubble(event)" onclick="cancelBubble(event);"><div class="pa"><a class="clsb" href="javascript:void(0)" onclick="closeBox(this,1);return false"></a><br/><br/><form class="form_set">����ɫ��<input type="text" name="ctlkcolor" size="7"/> ��ɫ��<input type="text" name="ctwdcolor" size="7"/><br/>��߶ȣ�<input type="text" name="ctbglayh" size="6"/> ���иߣ�<input type="text" name="ctlineht" size="6" /><br/>�ڼ�϶��<input type="text" name="ctpadding" size="4" />px ���ֺţ�<input type="text" name="ctftsize" size="4" />px<div class="bt_2 mt7 h23">�������� &nbsp;&nbsp;&nbsp;&nbsp;ƽ�̣�<select name="ctbgrpt" style="width:40px"><option value="no-repeat" selected="selected">��</option><option value="repeat">˫��</option><option value="repeat-x">ˮƽ</option><option value="repeat-y">��ֱ</option></select></div>--ͼƬ��<input type="text" name="ctbgpic" onfocus="this.select()"/><br />--λ�ã�<input type="text" name="ctbgpos" size="7"/> ��ɫ��<input type="text" name="ctbgcolor" size="7"/><br /><div class="bt_2 mt7 h23">�߿�����</div>--��ȣ�<select name="ctbdwidth"><option value="0" selected>0</option><option value="1">1</option><option value="2">2</option></select>px ��̬��<select name="ctbdtype"><option value="solid" selected>ʵ��</option><option value="dashed">����</option><option value="dotted">����</option></select><br/>--��ɫ��<input type="text" name="ctbdcolor" size="7"/> <input type="button" value="Ԥ��" onclick="setCont(this,3)"/><input type="button" value="ȷ��" onclick="if(setCont(this,4)) closeBox(this.parentNode,1)"/><div class="bt_2 mt7 pt7"></div>����������<input type="text" name="ctclass" onfocus="this.select()" size="5"/> <input type="button" value="Ԥ��" onclick="setCont(this,1)"/><input type="button" value="ȷ��" onclick="if(setCont(this,2)) closeBox(this.parentNode,1)"/></form><div class="bt_2 mt7 pt7"></div><div class="ctpre"></div></div></div>', //7
	'<div class="prbox prbox_global" onclick="cancelBubble(event);" onmousedown="cancelBubble(event)"><div class=pa><a class="clsb" href="javascript:void(0)" onclick="closeBox(this);return false"></a><div class="c"></div><form id="globalFormSet" class="form_set"><div class="l lf b_1"><span class="bg_3">ҳ�汳�����ã�</span><br/>����ͼƬ��ַ��<input onfocus=this.select() value="" name=body_bgpic><br>����ͼƬλ�ã�<input name=body_bgpos><br>����ͼƬƽ�̣�<select name=body_bgrpt><option value="">��ѡ��</option><option value=no-repeat>��ƽ��</option><option value=repeat>˫��ƽ��</option><option value=repeat-x>ˮƽƽ��</option><option value=repeat-y>��ֱƽ��</option></select><br>����ɫ��<input size=7 name=body_bgcolor> ��ɫ��<input size=7 name=body_wdcolor><div class="bt_2"></div><input type="button" value="ȷ��" onclick="globalSet(1)"/></div><div class="b_1 r rg mr21"><span class="bg_3">������ɫ���ã�</span><div class="mt3">�� ��  link / visited / active ��</div> --��ɫ��<input name=alcolor size=7> --�»��ߣ�<select name=alline><option value="underline">��</option><option value="none" selected>��</option></select><div class="h23">�� �� hover�� <input type="checkbox" name="aljump"/>��Ծ</div> --��ɫ��<input name=ahcolor size=7> --�»��ߣ�<select name=ahline><option value="underline">��</option><option value="none">��</option></select><div class="bt_2"></div><input type="button" value="ȷ��" onclick="globalSet(2)"/></div><div class="c"></div><div class="b_1 r rg mr21"><span class="bg_3">ȫ��cont���ã�</span><br/>����ɫ��<input type="text" name="ctlkcolor" size="7"/> ��ɫ��<input type="text" name="ctwdcolor" size="7"/><br/>��߶ȣ�<input type="text" name="ctbglayh" size="6"/> ���иߣ�<input type="text" name="ctlineht" size="6" /><br/>�ڼ�϶��<input type="text" name="ctpadding" size="4" />px ���ֺţ�<input type="text" name="ctftsize" size="4" />px<div class="bt_2 mt7 h23">�������� &nbsp;&nbsp;&nbsp;&nbsp;ƽ�̣�<select name="ctbgrpt" style="width:40px"><option value="no-repeat" selected="selected">��</option><option value="repeat">˫��</option><option value="repeat-x">ˮƽ</option><option value="repeat-y">��ֱ</option></select></div>--ͼƬ��<input type="text" name="ctbgpic" onfocus="this.select()"/><br />--λ�ã�<input type="text" name="ctbgpos" size="7"/> ��ɫ��<input type="text" name="ctbgcolor" size="7"/><br /><div class="bt_2 mt7 h23">�߿����� &nbsp;&nbsp;&nbsp;&nbsp;<select name="ctbdistry"><option value="">-���ñ߿�-</option><option value="0">�����ı�</option><option value="1">ȱ�Ͽ�</option><option value="2">ȱ�¿�</option><option value="3">ȱ���¿�</option><option value="4">�����</option><option value="5">�����</option><option value="6">�������</option></select></div>--��ȣ�<select name="ctbdwidth"><option value="0" selected>0</option><option value="1">1</option><option value="2">2</option></select>px ��̬��<select name="ctbdtype"><option value="solid" selected>ʵ��</option><option value="dashed">����</option><option value="dotted">����</option></select><br/>--��ɫ��<input type="text" name="ctbdcolor" size="7"/> <input type="button" value="Ԥ��" onclick="setCont(this,3,1)"/><input type="button" value="ȷ��" onclick="globalSet(5);"/><div class="bt_2 mt7 pt7"></div>����������<input type="text" name="ctclass" onfocus="this.select()" value="0" size="5"/> <input type="button" value="Ԥ��" onclick="setCont(this,1,1)"/><input type="button" value="ȷ��" onclick="globalSet(6)"/><div class="bt_2 mt7 pt7"></div><div class="ctpre"><div class="cont cont_0">cont</div></div></div><div class="l lf b_1"><span class="bg_3">ȫ��title���ã�</span><br/>����ͼ��<input type="text" name="ttbgpic" onfocus="this.select()" size="18"/> <a href="javascript:void(0)">˵��</a><br />����ߣ�<input type="text" name="ttheight" size="4" />px Բ�ǿ�<input type="text" name="ttwidth" size="4" />px<br />���ֺţ�<input type="text" name="ttcftsize" size="4"/>px ����룺<input type="text" name="ttcmgleft" size="4"/>px<br />��ͼ��<input type="text" name="iclwidth" size="4" />px ��ͼ�㼶��<select name="iclpos"><option value="0" selected="selected">0</option><option value="-120">1</option><option value="-160">2</option><option value="-200">3</option></select><br />��ͼ��<input type="text" name="icrwidth" size="4" />px ��ͼ�㼶��<select name="icrpos"><option value="0" selected="selected">0</option><option value="-120">1</option><option value="-160">2</option><option value="-200">3</option></select><br />����ɫ��<input type="text" name="ttcolor" size="7" /><br/>����ɫ��<input type="text" name="thcolor" size="7" /> <input type="button" value="Ԥ��" onclick="setTitle(this,3,1)"/><input type="button" value="ȷ��" onclick="globalSet(3)"/><div class="bt_2 mt7 pt7"></div>����������<input type="text" name="ttclass" onfocus="this.select()" value="0" size="5"/> <input type="button" value="Ԥ��" onclick="setTitle(this,1,1)"/><input type="button" value="ȷ��" onclick="globalSet(4)"/><div class="bt_2 mt7 pt7"></div><div class="ttpre"><div class="tt tt_0"><div class="ttl"></div><div class="icl"></div><div class="ttc"><h3 class="ant_txt">title</h3></div><div class="ttr"></div><div class="icr mr"><a href="javascript:void(0)">����</a></div></div></div></div><div class="l lf b_1" style="clear:left">��򱳾�ɫ��<input type="text" name="laybg" size="7" /> <input type="checkbox" name="laybd"/>��� <br/>ȫ�ֿ��ࣺ<input name=glblockmg size=2>px <input type="checkbox" name="pagecenter" />��ҳ����<div class="bt_2"><input type="button" value="ȷ��" onclick="globalSet(7);"/></div></div><div class="c"></div><input type=button value=ȫ���ύ onclick="if(globalSet(0)) closeBox(this.parentNode);"> <input type=button value=�ر� onclick="closeBox(this.parentNode);"></form></div></div>', //8
	'<div class="prbox prbox_global" onclick="cancelBubble(event);" onmousedown="cancelBubble(event)"><div class=pa><a class="clsb" href="javascript:void(0)" onclick="closeBox(this);return false"></a><form id="globalFormSet" class="form_set"><textarea id="pagestyle" style="color:#666" rows="20" cols="70" readonly></textarea><input type=button value=��ȡ���� onclick="getPageStyle();closeBox(this.parentNode);" /> <input type=button value=�ر� onclick="closeBox(this.parentNode);" /></form></div></div>' //9
	]


/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/*
������layout ���ú���
*/
/*
*fetchIdByClass: ��ȡ�����idֵ
*@param obj: �¼��������� ��
*@param cls: �¼�������������Ĳ�ClassName �� block / layer ��
*@return: idֵ��
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
*��������getPicUrl:    ��ȡ���� url(http://xxxx) �ַ����е�url��ַ��һ����ͼƬ��ַ
*@param obj:    ����Ԫ�أ�
*@type Object
*@return: ���һ������Ϊelement����Ԫ�أ�
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
*��������getXY:  ��ȡԪ������Ļ�ڵľ���λ�ü��߶ȺͿ�ȣ�
*@param obj:    Ҫ����Ԫ�أ�
*@type array; 
*@return: a[0]:����λ�á�a[1]:���λ�á�a[2]:��ȡ�a[3]:�߶ȣ�
*/
function getXY(obj){
    var a /*���ض���*/ = new Array();
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
���Ư���ࡣӦ���ڹ�������
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
�������Զ�λ���ڲ㣬���ര�ڲ�����Ϊpop���ڣ�����������htmlģ�顣pop����������id����
������	id   pop���ڵ�����id
		t	 pop���ڵĶ��ࣨ�����ҳ����
		l	 pop���ڵ���ࣨ�����ҳ����
		wds	 ��pop�����ڵ��İ�
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
�رյ����ľ��Զ�λ���ڲ㣬���ര�ڲ�����Ϊpop���ڣ�����������htmlģ��
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
�����������и��ʼ������
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
�����������и����
*/
var ISCUTTING = 0;
var ANCHOR_WIDTH = [152,192,232,272,312,352,392,432,472,512,552,592,632,672,712], ANCHOR_TOLERANCE = 20;
function startCut(e){	
	e = e || window.event;
	var o /*�¼�����-�и���*/ = e.srcElement || e.target;
	ISCUTTING = 1;
	
	
	var lfdiv /*�и������ tube div*/ = getElementsByClassName('tube','div',getPreviousSibling(o))[0];
	var rgdiv /*�и����Ҳ� tube div*/ = getElementsByClassName('tube','div',getNextSibling(o))[0];
	var preX /*������³�ʼxλ��*/= e.clientX;
    var preY /*������³�ʼyλ��*/= e.clientY;
	var lfdivhtml = lfdiv.innerHTML;
	var rgdivhtml = rgdiv.innerHTML;
	lfdiv.style.height = Math.max(lfdiv.offsetHeight,rgdiv.offsetHeight) + 'px'	

	//���ie �¸ò������ٶ�������
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

	if(document.addEventListener){                  //DOMģ��������mousemove��mouseup�ļ���������
        document.addEventListener("mousemove",handleCutMove,true);
        document.addEventListener("mouseup",handleCutMouseUp,true);
    }else if(document.attachEvent){                 //IE������mousemove��mouseup�ļ���������
        o.setCapture();
        o.attachEvent("onmousemove",handleCutMove);
        o.attachEvent("onmouseup",handleCutMouseUp);
        o.attachEvent("onlosecapture",handleCutMouseUp);
    }else{}                                          //IE5���°汾�Ĳ�����
	
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
	
	//�и������� move 
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

	//�и������� up 
	function handleCutMouseUp(){
		if(document.removeEventListener){           //DOMģ����ɾ��mousemove��mouseup�ļ���������
            document.removeEventListener("mouseup",handleCutMouseUp,true);
            document.removeEventListener("mousemove",handleCutMove,true);
        }else if(document.detachEvent){             //IEģ����ɾ��mousemove��mouseup�ļ���������
            o.detachEvent("onlosecapture",handleCutMouseUp);
            o.detachEvent("onmouseup",handleCutMouseUp)
            o.detachEvent("onmousemove",handleCutMove);
            o.releaseCapture();
        }else{}                                      //IE5���°汾��ɾ��mousemove��mouseup�ļ���������               
		
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

		//���ie �¸ò������ٶ�������
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
*toolBarClick: �߲ม���������������
*@param o: �¼��������� ��
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
*addLayer: ���� layer �� 
*@param o: �¼��������� ��
*@return: none��
*/
function addLayer(o){
	o.onclick = new Function ('return false');
	var ct = 0	//���û���ʱ�� 3 ��
	resumeBtnAddLayer(ct)   //ִ�л��嵹��ʱ����
	if(Layers.length>=MAXLAYERNUM){alert('layer��̫���ˣ����'+MAXLAYERNUM+'����'); return}	
		
	var sid = generateID(Layers,MAXLAYERNUM)
	var str = html_layer[1].replace(/\#SN/g,sid)
	if($('layer_'+CURLAYERNUM)){
		$('layer_'+CURLAYERNUM).insertAdjacentHTML('afterend',str);
	}else{
		$('sidetoolbar').insertAdjacentHTML('beforebegin',str);
	}
	Layers.push({'id' : sid,'c' : 1})
	bindLayer(sid)
	popUpPrompt('���Ӳ�ɹ���')	
}
/*
*defineLayer: ���� layer ���� 
*@param o: �¼��������� ��
*@return: none��
*/
function defineLayer(o,n,na,f){	
	if(LAYOUTBUFFER>0) return;
	LAYOUTBUFFER = 1	//���û���ʱ�� 3 ��
	resumeBtnDefineLayer()   //ִ�л��嵹��ʱ����
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
	//if(n==0){alert('Ĭ��layer����ɾ����'); return}	
	if(confirm('ȷ��ɾ��Layer_'+n+'��')){
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
	la.title = '������...'
	if(n<=0){
		la.onclick = new Function ('addLayer(this);return false;')
		la.innerHTML = ''
		la.title = '����Layer'
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
[����]����ק����
*/
function startMoveLayer(e){
	var e /*��Ӧ�¼�*/= e || window.event
	var obj /*�¼�����*/ = e.srcElement || e.target;        //��ô����¼��Ķ���
	if(ISDRAGGING == 1 || Block.closingFlag == 1 || Block.foldingFlag == 1 || obj.tagName.toLowerCase() == 'a' || obj.className.indexOf('ant_txt') > -1){        //��������ƶ���������ֹͣ�ƶ���
        return;
    }

	ISDRAGGING = 1;

	obj = getParentByClassName('layer',obj)                //���Ҫ��ק�Ĳ㣻
	
	var absoultDiv /*����Ϊ���Զ�λ�Ĳ�*/ = new modifyDiv (obj,'relative');	
	var tempDiv /*��ʱ�Ĵ��߿��ռλ��*/ =  new createTempDiv(obj,1);
	
	absoultDiv.style.position = 'absolute';

	obj.parentNode.insertBefore(tempDiv ,obj);
	absoultDiv.style.opacity = 0.6;	    
    absoultDiv.style.filter = "alpha(opacity=60)";  //��Ҫ��ק�Ĳ���Ϊ��͸����
	
	var diffX /*���λ�úͲ㿪ͷ֮��X��ļ��*/= e.clientX - absoultDiv.offsetLeft;
    var diffY /*���λ�úͲ㿪ͷ֮��Y��ļ��*/= e.clientY - absoultDiv.offsetTop;
	
	if(document.addEventListener){                  //DOMģ��������mousemove��mouseup�ļ���������
        document.addEventListener("mousemove",handleMove,true);
        document.addEventListener("mouseup",handleMouseUp,true);
    }else if(document.attachEvent){                 //IE������mousemove��mouseup�ļ���������
        absoultDiv.setCapture();
        absoultDiv.attachEvent("onmousemove",handleMove);
        absoultDiv.attachEvent("onmouseup",handleMouseUp);
        absoultDiv.attachEvent("onlosecapture",handleMouseUp);
    }else{                                          //IE5���°汾�Ĳ�����
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
    *replaceTemp����ʱ�㴦������
    */
	function handleTempDiv(){
		var returndiv = null		
		var tmpdiv = $('tempContentDiv');						
		returndiv = tmpdiv			
		return returndiv
	}
	/*
    *handleMove����꿪ʼ�ƶ�ʱ�Ĳ�����
    */
    function handleMove(e){
        absoultDiv.style.top = e.clientY - diffY + "px";
        absoultDiv.style.left = e.clientX - diffX + "px";       //����������--ʵ����ק��
        var pointDirection; //Ŀ����ָ��; 
        var clDiv  //MAXLAYERNUM = 20 var Layers
		if(!clDiv) clDiv = handleTempDiv();
		//$('bbb').innerHTML = clDiv + ' / ' + $('tempContentDiv') + ' / ' + $('tempContentRep')
        for(var i=0;i<Layers.length;i++){           
			var curLayer = $("layer_" + Layers[i].id)
            if (curLayer == null) { //�Ѿ��رյĲ㲻�ٱ���;
                continue;
            }
            if(curLayer == absoultDiv){    //�Ǳ���������    
                continue;
            }           
            pointDirection = innerPosition(curLayer,e);      //��ȡĿ���ָ��            
            if(pointDirection == 0){    //������������ķ�Χ���������һ��ѭ��
                continue;
            }else if(clDiv){          //�����������·�Χ�ڣ�����Ŀ����л���								
				if(pointDirection == 2){       
					curLayer.parentNode.insertBefore(clDiv,curLayer.nextSibling);        //�����Ŀ��Ԫ�����棻
				}else{                                                                          //�����Ŀ��Ԫ�����棻      
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
    *handleMove�����ſ���Ĳ�����
    */
    function handleMouseUp(e){          
        if(document.removeEventListener){           //DOMģ����ɾ��mousemove��mouseup�ļ���������
            document.removeEventListener("mouseup",handleMouseUp,true);
            document.removeEventListener("mousemove",handleMove,true);
        }else if(document.detachEvent){             //IEģ����ɾ��mousemove��mouseup�ļ���������
            absoultDiv.detachEvent("onlosecapture",handleMouseUp);
            absoultDiv.detachEvent("onmouseup",handleMouseUp)
            absoultDiv.detachEvent("onmousemove",handleMove);
            absoultDiv.releaseCapture();
        }else{                                      //IE5���°汾��ɾ��mousemove��mouseup�ļ���������
            document.onmouseup = oldUpHandler;
            document.onmousemove = oldMoveHandler;
        }       
        
        var newDiv = absoultDiv;    //������ק��;
        //newDiv.className = 'block'
        newDiv.style.position = "";         
        newDiv.style.opacity = 1;
        newDiv.style.filter = "alpha(opacity=100)";
        newDiv.style.width = "";
        newDiv.style.height = "";           //�������л�ԭ���ԭʼ���ԣ�
		newDiv.style.marginTop = 'auto'        
		newDiv.style.marginLeft = 'auto'					
		//newDiv.style.marginBottom = getCurrentStyle(newDiv,'marginBottom')
		
        absoultDiv.parentNode.removeChild(absoultDiv);      //ɾ��ԭ������ק�㣻
		if($("tempContentDiv")){
			$("tempContentDiv").parentNode.insertBefore(newDiv,$("tempContentDiv"));    //����ק�Ĳ���뵽ָ��λ�ã�
			$("tempContentDiv").parentNode.removeChild($("tempContentDiv"));        //ɾ��ԭ������ʱռλ�㣻			
		}
		
        if(e.stopPropagation){
            e.stopPropagation();
        }else{
            e.cancelBubble = true;
        }
		
        ISDRAGGING = 0;         //�����ק��������      
    }   

}

function doStartMoveLayer(){} 
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/*
��������ʽ����
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
			while(i<document.styleSheets.length && document.styleSheets[i].id != 'style_'+id){  //ֻ����ie
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
��������̬������ͨ��id��ȡStyleSheet����
������id ΪStyleSheet�����Ψһ��־
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
��������̬������ͨ��idɾ��StyleSheet����
������id ΪStyleSheet�����Ψһ��־
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
������������ʽrule���ɹ�����index�����򷵻�-1
������selector Ϊrule����
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
������ɾ����ʽrule
������n Ϊrule���ƻ�����
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
���������rule
*/
StyleSheet.prototype.removeAllRule = function(){
	while(this.rules.length){
		this.removeRule(0)			
	}    
}
/*
�������������ʽrule
������selector Ϊrule����
      styles   Ϊrule��style
      n        Ϊλ��
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
������������ʽrule��ĳ����
������selector    Ϊrule����
      attribute   Ϊrule��������
      _value      ΪҪ���õ�ֵ
*/
StyleSheet.prototype.setRuleStyle = function(selector,attribute,_value){   
    var i = this.indexOf(selector);	
	if(i>-1)
		this.rules[i].style[attribute] = _value;
}
/*
��������ȡ��ʽrule��ĳ����
������selector    Ϊrule����
      attribute   Ϊrule��������
���أ�rule��Ӧ���Ե�ֵ
*/
StyleSheet.prototype.getRuleStyle = function(selector,attribute){   
    var i = this.indexOf(selector);
    return this.rules[i].style[attribute];
}

/*
�������ɿ������ʽrule
������piece    Ϊ�ɿ�rule�ַ���
      n        Ϊ��ӵ�λ��
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
���ܣ���ȡ��Ҫ���õ�<a>�ڵ����<img>�ڵ�
��ȡ ����ڵ�ĵ�һ���Զ���ڵ㣬�����ظýڵ㣬�Զ���ڵ�����ı��ڵ��Ӧ type:'text' �� ͼƬ�ڵ��Ӧ type:'img'
����������getNextSibling()
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
�������ӵ���������
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
		var imgStr = 'ͼƬ��<input id="alk_img" type="text" value="'+simgnode.src+'" onfocus="this.select()" /><br />ͼ��<input id="alk_imgw" type="text" size="3" value="'+ imgw +'" /> ͼ�ߣ�<input id="alk_imgh" type="text" size="3" value="'+ imgh +'" /><br/>';
	}
	if(stxtnode) var txtStr = '���֣�<textarea id="alk_text" onfocus="this.select()" />'+stxtnode.nodeValue+'</textarea><br/>'
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
		var linkstr_1 = '���ӣ�<input id="alk_href" type="text" value="'+GLOBALNODE.href+'" onfocus="this.select()" />'
		var linkstr_2 = '<input class="r" type="button" value="ȥ����" onclick="doSetALink(2);$(\'alk_href\').value=\'\'" /><div class="c mt14"></div>���ٲ�����<input id="alk_trlog" type="text" value="'+trlog+'"/>'
	}
	//GLOBALNODE.setAttribute('onmousedown',"return aliclick(this,'?tracelog="+$('alk_trlog').value+"')")		
	e.cancelBubble=true
	var t = (e.clientY < 0 ? (e.clientY + 30) : e.clientY)  + document.documentElement.scrollTop + 'px'
	var l = ((e.clientX - 260) < 0 ? (e.clientX - 20) : (e.clientX - 200)) + document.documentElement.scrollLeft + 'px'	
	createPopDiv('popbox',t,l)
	$('popbox').className = 'popbox_a';
	$('popbox').innerHTML = imgStr + txtStr + linkstr_1 + '<div class="c"></div><input class="l" type="button" value="ȷ��" onclick="doSetALink()" /><input class="r" type="button" value="ɾ��" onclick="doSetALink(1)" />' + linkstr_2;
	document.documentElement.scrollLeft = 10000;
	return false;
}
/*
���ڹ���aOnClick�������˺�����������  �����ָ�js���� ��Ӧ Ԥ��״̬�ͱ༭״̬
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
ȷ������������ز��� 
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
��������ק���ܰ󶨣�������setInnerALink�����������ӵ��
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

/* ��� ff �� dblclick �ظ����� */
function newIBlock(e,b,n){
	if(e.detail && e.detail == 2) return;
	newBlock(b.parentNode.parentNode.parentNode,n)
}

/*
��������������block��
*/
function addNavBlock(t,n){
	var linkscript = new LinkScript()
	var urlpre = URL_PARTS;
	linkscript.checkLoad(urlpre + 'parts_js_nav' + '.css','css')
	linkscript.checkLoad(urlpre + 'parts_js_nav' + '.js?t=233','js')	
	newBlock(t,n)
}

/*
����������block��
*/
function newBlock(t,n){   
	//var id = Block.getStoreId() 
	if(Block.Registry.length>=Block.maxNum){alert('block��̫���ˣ����'+Block.maxNum+'����'); return}
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

		//����Ϊ�����ݱ�������¸���currentStyle �Զ���� Param_cont ����
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

		//����Ϊ�����ݱ�������¸���currentStyle �Զ���� Param_tt ����
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
Block.prototype.setTtPm = function(id){ //p Ϊtt ��������
	this.ttPm = id
}
Block.prototype.setContPm = function(id){ //p Ϊtt ��������
	this.contPm = id
}

Block.prototype.subtractHeight = function(){
	if(!this.isFolduping){
		Block.foldingFlag = 1
		this.isFolduping = 1
		this.container_height = this.container.offsetHeight;			
		this.amount = parseInt(this.container_height / Block.foldSpeed ) || 7  
	}
	var nowHeight /*�ݼ������ļ�ʱ���*/ = this.container.offsetHeight - this.amount; 
	
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
        var pHeight /*������ʱ�߶�*/ = this.container.offsetHeight + this.amount;            
       
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
    var showNumber /*Ҫ�رյĲ�*/ = nShowNumber - parseInt(100 / Block.disappearStep) - 1;
    if(showNumber > 0){ //���͸���Ȳ�Ϊ0���𽥼�����͸����ʹ��Ϊ0
        b.style.opacity = showNumber / 100;
        b.style.filter = "alpha(opacity=" + showNumber + ")";
        setTimeout( this.gRef + ".disappear("+showNumber+")",Block.disappearTime);
    }else{  //���͸�����Ѿ�Ϊ0��ɾ���Ѿ��Զ�λ�Ĳ㲢�𲽼���ռλ��ĸ߶�
		
		if(isLastElement(b)){
			var preblock  = getPreviousSibling(getPreviousSibling(b));			
			if( preblock ){				
				delSpace(preblock)
			}
		}
        b.parentNode.removeChild(b);
		
        Block.removeBlockById(this.id)		
        subtractHeight(this.blockfull_height,'tempContentDiv_' + this.id,this.blockfull_height / Block.foldSpeed);  //����subtractHeight�������𲽼���ռλ��ĸ߶ȣ�
		Block.closingFlag = 0
    }
}
Block.prototype.createTempDiv = function (hasBorder){   
    var objHeight /*��ȡԭ�Ȳ�ĸ߶�*/ = this.container.parentNode.parentNode.offsetHeight;     
    var containerTempObject /*��ԭλ���ϴ������²�*/ = document.createElement("div");
    containerTempObject.id = 'tempContentDiv_' + this.id;
	containerTempObject.style.overflow = 'hidden'
    //containerTempObject.style.position = "static";
    if(hasBorder == 1){     //���ɴ����߱߿�Ĳ㣻
        containerTempObject.style.height = objHeight -2 + 'px';
        if(Browser.isIE)
            containerTempObject.style.marginBottom = '-3px'		
        containerTempObject.className = $('block_'+this.id).className + ' tmpbd'
    }else{      //���ɲ������߱߿�ռλ�㣻
        containerTempObject.style.height = objHeight + 'px';
        containerTempObject.className = $('block_'+this.id).className ;
    }
    return containerTempObject;
}
/*
*createTempDiv����ԭ���λ�ô���һ����ʱ�㣬��Ϊԭ����ʧ��Ĳ����
*@param formerObject: ԭʼ��div��
*@param hasBorder: �����Ĳ��Ƿ������߱߿�,0:�������߱߿�1�������߱߿�
*@type Object
*@return: containerTempObject ����������ʱ�㣻
*/
function createTempDiv(formerObject,hasBorder){ 
    var objHeight /*��ȡԭ�Ȳ�ĸ߶�*/ = formerObject.offsetHeight;     
    var containerTempObject /*��ԭλ���ϴ������²�*/ = document.createElement("div");   

    containerTempObject.id = "tempContentDiv";
    //containerTempObject.style.position = "static";
    var mgb = parseInt(getCurrentStyle(formerObject,'marginBottom')) || 0

    if(hasBorder == 1){     //���ɴ����߱߿�Ĳ㣻
        containerTempObject.style.height = objHeight -2 +"px";
        if(Browser.isIE){            
			containerTempObject.style.marginBottom = mgb - 3 + 'px'; 
		}
		else{
			containerTempObject.style.marginBottom = mgb + 'px';
		}
		containerTempObject.className = 'tmpbd'
    }else{      //���ɲ������߱߿�ռλ�㣻
        
        containerTempObject.style.height = objHeight +"px";
        containerTempObject.style.marginBottom = mgb + 'px';
    }

    return containerTempObject;
}

/*
*modifyDiv ����ԭʼ�Ĳ���Ϊ���Զ�λ��
*@param formerObject: ԭʼ��div
*@param p: ��������ԭʼ��div��position���Խ�ȡ��ֵ
*@type Object
*@return: formerObject ����Ϊ���Զ�λ�Ĳ㣻
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
*��������subtractHeight:    �ݼ������߶�
*@param nHeight:        ������ʱ�߶ȣ�
*@param objId:          Ҫ���߶ȵ�������id��
*@param iscreateDiv:    ���߶Ⱥ��Ƿ񴴽������������ֹ�����رպ�Ĵ�λ 1��������0����������
*/
function subtractHeight(nHeight,objId,amount){  
    var nowHeight /*�ݼ������ļ�ʱ���*/ = nHeight - amount;
    var subtractDivId /*�ݼ�������ID*/ = objId;
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
*��������minAll:   ��С/���Layer
*@param       a:   Layer ID
*@param       f:   ��С/����ж�
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
			if (Block.Registry[i].isFolden == 0 && f == 1) { //�����ǰΪչ��״̬������۵�������        
				Block.Registry[i].container.style.position = 'relative'
				Block.Registry[i].container.style.overflow = 'hidden'
				Block.Registry[i].subtractHeight();				
				//obj.className = oClassName.replace("bar_min", "bar_arror");   //�л���������״̬��
			}else if(Block.Registry[i].isFolden ==1 && f != 1 ){     //�����ǰΪ�۵�״̬�����չ��������        
				Block.Registry[i].addHeight();  				
				//obj.className = oClassName.replace("bar_arror", "bar_min");   //�л���������״̬��
			}
		}
        i++
    } 	
}

function changeVisible(obj){
	var bobj = Block.getBlockById(fetchIdByClass(obj))
    if(bobj.isClosing == 1 || bobj.isFolduping == 1 || ISDRAGGING == 1){   //����Ѿ����л����������˳��ú�������ִ���κβ�����		
        return;
    } 
	
    var oClassName /*��������class��*/ = obj.className;		
    if (bobj.container.style.height == '' && !bobj.isFolden ) {   //�����ǰΪչ��״̬������۵������� 
		bobj.container.style.position = 'relative'
		bobj.container.style.overflow = 'hidden'
        bobj.subtractHeight();              
        obj.className = oClassName.replace("bar_min", "bar_arror"); //�л���������״̬��
    }else if(bobj.isFolden){     //�����ǰΪ�۵�״̬�����չ��������        
        bobj.addHeight();           
        obj.className = oClassName.replace("bar_arror", "bar_min"); //�л���������״̬��
    }
}
/*
*hiddenContainer: �رղ�ĺ�����
*@param obj��Ҫ�رյĲ㣻
*/
function closeContainer(o){
	var bobj = Block.getBlockById(fetchIdByClass(o))
    if(bobj.isClosing == 1 || ISDRAGGING == 1){        //�ж��Ƿ������������������򲻽��йرղ���
        return false;
    }       
    var disappearDiv = bobj.container.parentNode.parentNode
    try{            		
        var absoultDiv /*����Ϊ���Զ�λ�Ĳ�*/ = modifyDiv (disappearDiv,'relative');               		
        var tempDiv /*��ʱ��ռλ��*/ = bobj.createTempDiv(0);  	
		tempDiv.style.marginBottom = bobj.getBlockMargin() + 'px'
		absoultDiv.style.position = 'absolute'
        disappearDiv.parentNode.insertBefore(tempDiv ,disappearDiv);            
        bobj.disappear(100);    
    }catch(e){      //�緢��������ȡ����ʱЧ��ֱ�ӹرգ�
    }
}

/*
*��������innerPosition:  �����קĿ����ָ��
*@param obj:    ���ڼ���Ԫ�أ�
*@param e:  ����¼���
*@type number; 
*@return: 0������������ָ��Χ�ڣ�1����������Ϸ���2����������·���
*/
function innerPosition(obj,e){
    var e /*����¼�*/=e?e:(window.event?window.event:null);
    var a /*��קԪ�ص�λ�ü���*/ = getXY(obj);
	var eX = e.clientX + document.documentElement.scrollLeft
	var eY = e.clientY + document.documentElement.scrollTop
    if (eX>a[1] && eX<=(a[1]+a[2]) && eY>a[0] && eY <=(a[0]+a[3])){ //��������Ԫ�ط�Χ�ڣ�
        if(eY<(a[0]+a[3]/2)){
            return 1;   //����;
        }else{
            return 2;   //����;
        }
    }else{  //��������Ԫ�ط�Χ��ͬʱ������ֻ��һ��Ԫ�أ�
        return 0;       
    }
}

/*
*��������hasContainerChild:  ����������Ƿ���idΪcontent��ͷ����Ԫ�أ�
*@param obj:    Ҫ����������
*@param content:    Ҫƥ������ݣ�
*@type number; 
*@return: childNum��������������
*/
function hasContainerChild(obj,content){
    var childNum /*�Ƿ���������*/= 0;
	
    for(var i=0;i<obj.childNodes.length;i++){
        if((obj.childNodes[i].id) && obj.childNodes[i].id.indexOf(content)==0){
            childNum += 1;
        }
    }
    return childNum;
}

/*
addSpace: ���block�㣬���ӿ�϶��
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
delSpace: ���block�㣬ȥ����϶��
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
*��������startMove:  ��ʼ�ƶ���
*@param e:  �¼���
*/
var ISDRAGGING = 0
function startMove(e){
    var e /*��Ӧ�¼�*/= e || window.event       
    var obj /*�¼�����*/ = e.srcElement || e.target;        //��ô����¼��Ķ���
    if(ISDRAGGING == 1 || Block.closingFlag == 1 || Block.foldingFlag == 1 || obj.tagName.toLowerCase() == 'a' || obj.className.indexOf('ant_txt') > -1){        //��������ƶ���������ֹͣ�ƶ���
        return;
    }   
	CTRL_LOCK = true;
    ISDRAGGING = 1;

    obj = getParentByClassName('block',obj)                //���Ҫ��ק�Ĳ㣻   
	var topobj = null;
	if(isLastElement(obj)){
		topobj = getPreviousSibling(obj);
	}
	var temp 
	temp = obj.id.split("_")
	var blkid = temp[1]

	if(CTRL){		
		var clone_obj = obj.cloneNode('true')
		var absoultDiv /*����Ϊ���Զ�λ�Ĳ�*/ = new modifyDiv (obj,'relative');		
		var tempDiv /*��ʱ�Ĳ����߿��ռλ��*/ =  new createTempDiv(obj);
		var newblkid = generateID(Block.Registry,Block.maxNum)
		tempDiv.innerHTML = clone_obj.innerHTML.replace(/id\s*=\s*[\"\']?title_\d+[\"\']?/g,'id="title_'+newblkid+'"').replace(/id\s*=\s*[\"\']?cont_\d+[\"\']?/g,'id="cont_'+newblkid+'"').replace(/id\s*=\s*[\"\']?cont_in_\d+[\"\']?/g,'id="cont_in_'+newblkid+'"')		
	}else{
		var absoultDiv /*����Ϊ���Զ�λ�Ĳ�*/ = new modifyDiv (obj,'relative');			
		var tempDiv /*��ʱ�Ĵ��߿��ռλ��*/ =  new createTempDiv(obj,1);
	}	

	absoultDiv.style.position = 'absolute'	
	//absoultDiv.className = 'block nopr'
	
	obj.parentNode.insertBefore(tempDiv ,obj);
    absoultDiv.style.opacity = 0.6;	    
    absoultDiv.style.filter = "alpha(opacity=60)";  //��Ҫ��ק�Ĳ���Ϊ��͸����		
	
    var diffX /*���λ�úͲ㿪ͷ֮��X��ļ��*/= e.clientX - absoultDiv.offsetLeft;
    var diffY /*���λ�úͲ㿪ͷ֮��Y��ļ��*/= e.clientY - absoultDiv.offsetTop;	

    if(document.addEventListener){                  //DOMģ��������mousemove��mouseup�ļ���������
        document.addEventListener("mousemove",handleMove,true);
        document.addEventListener("mouseup",handleMouseUp,true);
    }else if(document.attachEvent){                 //IE������mousemove��mouseup�ļ���������
        absoultDiv.setCapture();
        absoultDiv.attachEvent("onmousemove",handleMove);
        absoultDiv.attachEvent("onmouseup",handleMouseUp);
        absoultDiv.attachEvent("onlosecapture",handleMouseUp);
    }else{                                          //IE5���°汾�Ĳ�����
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
    *replaceTemp����ʱ�㴦������
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
    *handleMove����꿪ʼ�ƶ�ʱ�Ĳ�����
    */
    function handleMove(e){         
		
        absoultDiv.style.top = e.clientY - diffY + "px";
        absoultDiv.style.left = e.clientX - diffX + "px";       //����������--ʵ����ק��
        var pointDirection; //Ŀ����ָ��; 
        var clDiv
		if(!clDiv) clDiv = handleTempDiv();
		//$('bbb').innerHTML = clDiv + ' / ' + $('tempContentDiv') + ' / ' + $('tempContentRep')
        for(var i=0;i<Block.Registry.length;i++){           
			var curBlock = $("block_" + Block.Registry[i].id)
            if (curBlock == null) { //�Ѿ��رյĲ㲻�ٱ���;
                continue;
            }
            if(curBlock == absoultDiv){    //�Ǳ���������    
                continue;
            }           
            pointDirection = innerPosition(curBlock,e);      //��ȡĿ���ָ��            
            if(pointDirection == 0){    //������������ķ�Χ���������һ��ѭ��
                continue;
            }else if(clDiv){          //�����������·�Χ�ڣ�����Ŀ����л���				
				if(pointDirection == 2){										
					curBlock.parentNode.insertBefore(clDiv,curBlock.nextSibling);        //�����Ŀ��Ԫ�����棻
				
				}else{                                                                          //�����Ŀ��Ԫ�����棻      
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
			for(var k=0;k<Layers.length;k++){   //���û��һ�������ڵĻ���������������				
				if( temp = $('a'+ Layers[k].id +'_tube_'+j) ){
					if( hasContainerChild(temp,"block")>0 && absoultDiv.parentNode != temp ){ //�������Ŀ��������������������һ��ѭ����
						continue;
					}else if( absoultDiv.parentNode == temp && hasContainerChild(temp,"tempContentDiv")!=0){
						continue
					}
				
					var o = getXY(temp);
					pointDirection = innerPosition(temp,e);
					
					if(pointDirection>0){  //�������ڸ������ķ�Χ����ֱ���л�Ŀ��㣻
						if( absoultDiv.parentNode == temp && hasContainerChild(temp,"tempContentDiv")==0 ){
							if( Browser.isIE ){ //����ռλ������ҳ����ʾbug���������
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
    *handleMove�����ſ���Ĳ�����
    */
    function handleMouseUp(e){          
        if(document.removeEventListener){           //DOMģ����ɾ��mousemove��mouseup�ļ���������
            document.removeEventListener("mouseup",handleMouseUp,true);
            document.removeEventListener("mousemove",handleMove,true);
        }else if(document.detachEvent){             //IEģ����ɾ��mousemove��mouseup�ļ���������
            absoultDiv.detachEvent("onlosecapture",handleMouseUp);
            absoultDiv.detachEvent("onmouseup",handleMouseUp)
            absoultDiv.detachEvent("onmousemove",handleMove);
            absoultDiv.releaseCapture();
        }else{                                      //IE5���°汾��ɾ��mousemove��mouseup�ļ���������
            document.onmouseup = oldUpHandler;
            document.onmousemove = oldMoveHandler;
        }       
        
        var newDiv = absoultDiv;    //������ק��;
        //newDiv.className = 'block'
        newDiv.style.position = "";         
        newDiv.style.opacity = 1;
        newDiv.style.filter = "alpha(opacity=100)";
        newDiv.style.width = "";
        newDiv.style.height = "";           //�������л�ԭ���ԭʼ���ԣ�
		newDiv.style.marginTop = '0px'        
		newDiv.style.marginLeft = '0px'					
		//newDiv.style.marginBottom = getCurrentStyle(newDiv,'marginBottom')
        absoultDiv.parentNode.removeChild(absoultDiv);      //ɾ��ԭ������ק�㣻
		
		
		
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
			
			delSpace(topobj);//Ԥ��ɾ��ԭλ���Ϸ�block���space��ǰ����tube�����һ��block��			
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
			
			tcd.parentNode.insertBefore(newDiv,$("tempContentDiv"));    //����ק�Ĳ���뵽ָ��λ�ã�			
			tcd.parentNode.removeChild($("tempContentDiv"));        //ɾ��ԭ������ʱռλ�㣻			
		}
        if(e.stopPropagation){
            e.stopPropagation();
        }else{
            e.cancelBubble = true;
        }
		
		CTRL_LOCK = false;
        ISDRAGGING = 0;         //�����ק��������      
    }	
}
function doStartMove(){} 
/**&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&**/



//html��Ǳ�Сд
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



//���ƴ��뵽������
function copyToClipboard(txt) {        
     if(window.clipboardData) {        
             window.clipboardData.clearData();        
             window.clipboardData.setData("Text", txt);        
     } else if(navigator.userAgent.indexOf("Opera") != -1) {        
			alert('�������֧�֣�')         
     } else if (window.netscape) {        
          try {        
               netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");        
          } catch (e) {        
               alert("��������ܾ���\n�����������ַ������'about:config'���س�\nȻ��'signed.applets.codebase_principal_support'����Ϊ'true'");        
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
          alert("���Ƴɹ���")        
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

/* ����ѡ�񴰿���غ��� ��ʼ */
function closeBox(o,f){
	var t = getParentByClassName('prbox',o);	
	if(f){			
		t.parentNode.removeChild(t)
	}else{
		t.className += ' dn'
	}
}

/*
���������ֵĿ򣬲�����
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
�ر�iframe ��������
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
����id ��������
*/
function showID(id){
	var p = $(id);
	if(p){
		p.style.display = 'block';
	}
}

/*
�ر� ����
*/
function closeP(o,c){
	var p = getParentByClassName(c,o);
	if(p){
		p.style.display = 'none';
	}	
}

/*
����Ƥ��ѡ���
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
	popUpPrompt('Ƥ�����óɹ���')	
}
function cssSetIni(){	
	var se = $('mod_1');
	var i = Param_css.length;
	while( i-- > 0 ){		
		var op = document.createElement('option');
		op.innerHTML = Param_css[i].tag;
		op.value =  Param_css[i].mcss + '__��c��__' +Param_css[i].mbgi;
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
				var dv = m.value.split('__��c��__');
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
		$('mod_1').value = $('csspath').value + '__��c��__' + $('imgpath').value;
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
			fm.codespe.value = '�鿴��ȡ����'
			fm.blockid.value = 'Block ID: '+bid
			fm.codearea.value = str;	
			fm.codearea.readOnly = true;
			fm.codearea.style.color = '#666'			
			fm.editcode.value = '��ȡ����'
			fm.editcode.onclick = function(){
				var nd = this;
				return function(){
					copyToClipboard(str)
					popUpPrompt('�����ѿ�����')	
					//closeBox(this,1)  //��ȡ�����رյ�����
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
			fm.codespe.value = '�������ݴ���'
			fm.blockid.value = 'Block ID: '+bid
			fm.codearea.value = str
			fm.codearea.style.color = '#000'
			fm.editcode.value = 'ȷ��'

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
					popUpPrompt('���óɹ���')
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
		popUpPrompt('��ӿհ�ռλ�гɹ���');
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

	popUpPrompt('���������ɹ���')				
	window.setTimeout("frames['popout_iframe1'].recoverConfirm()",2000);				

}
/* ����ѡ�񴰿���غ��� ���� */




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
	var sreg2 = new RegExp('style=[\'\"][^\'\"]*[\'\"]([^>]*id="?(layer|block|cont_in)_\\d+"?)',"ig") //ȥ��layer block ��cont �������style <DIV class=cont_in id=cont_in_0 style="VISIBILITY: visible"> 
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
	
	//�������õ���ʽ��
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

    strHTML2 = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n<html xmlns="http://www.w3.org/1999/xhtml"> <head><TITLE>ר�����</TITLE> <META http-equiv=Content-Type content="text/html; charset=gb2312"> <META content=editplus name=generator> <META content=balibell name=author> <META content="ר��ؼ���" name=keywords> <META content="ר������" name=description><!--Create By 51edu ZTDIY Tool Author:Richieliu QQ:76373 Website:http://www.iamued.com --><STYLE type=text/css>\n@import url( http://www.51edu.com/zt/res/alicn_bb_v0.3.css );\n@import url(http://www.51edu.com/zt/res/antcom.css);\n</STYLE><script src="http://www.51edu.com/zt/js/base.js?t=233" type=text/javascript></script><base target=_blank /></head>\n<body>\n<div id="top">\n<span class="login"><iframe src="http://passport.51edu.com/?m=user&a=logininiframe" allowtransparency="true" width="460" height="25" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="No"></iframe></span>\n	<span class="home"><a target="_blank" href=" http://www.51edu.com">��ҳ</a> <a target="_blank" href=" http://www.sooker.com">�ѿ���</a><em class="homeHot"></em> <a target="_blank" href=" http://exam.51edu.com">����ģ��</a> <a target="_blank" href=" http://search.51edu.com">����</a> <a target="_blank" href=" http://www.51edu.com/sitemap.html">��վ��ͼ</a></span>\n</div>\n<div id="nav">\n	<h1><a target="_blank" href="http://www.51edu.com"><img src="http://www.51edu.com/images/logo.jpg" width="148" height="46" border="0" /></a></h1>\n	<div id="nav51edu">\n		<div class="nav51eduA">\n<h2></h2>\n<ul>\n<li><a href="http://www.51edu.com/xiaoshengchu/">С����</a></li>\n<li><a href="http://www.51edu.com/chuzhong/">����</a></li>\n<li><a href="http://www.51edu.com/gaozhong/">����</a></li>\n<li><a href="http://www.51edu.com/daxue/">��ѧ</a></li>\n<li><a href="http://www.51edu.com/zhongkao/">�п�</a></li>\n<li><a href="http://www.51edu.com/bjky/">����</a></li>\n</ul>\n<ul>\n<li class="a1"><a href="http://www.51edu.com/zuowen/">����</a></li>\n<li><a href="http://www.51edu.com/gaokao/">�߿�</a></li>\n<li><a href="http://www.51edu.com/chengkao/">�ɿ�</a></li>\n<li><a href="http://www.51edu.com/zikao/">�Կ�</a></li>\n<li><a href="http://www.51edu.com/lunwen/">����</a></li>\n<li><a href="http://www.51edu.com/guanli/">��ѧ</a></li>\n</ul>\n</div>\n<div class="nav51eduB">\n<h2></h2>\n<ul>\n<li><a href="http://www.51edu.com/zhiye/">ְҵ�ʸ�</a></li>\n<li><a href="http://www.51edu.com/cpa/">ע����ʦ</a></li>\n<li><a href="http://www.51edu.com/sifa/">˾������</a></li>\n</ul>\n<ul>\n<li><a href="http://www.51edu.com/zhiye/yiyao/">ҽѧ����</a></li>\n<li><a href="http://www.51edu.com/gongwuyuan/">����Ա����</a></li>\n<li><a href="http://www.51edu.com/it/">IT����</a></li>\n</ul>\n</div>\n<div class="nav51eduC">\n<h2></h2>\n<ul>\n<li><a href="http://www.51edu.com/kaoshi/">Ӣ�￼֤</a></li>\n<li><a href="http://www.51edu.com/study/">Ӣ��ѧϰ</a></li>\n<li><a href="http://www.51edu.com/xiaoyuzhong/">С����</a></li>\n</ul>\n<ul>\n<li><a href="http://www.51edu.com/lxks/">��ѧ����</a></li>\n<li><a href="http://www.51edu.com/chuguo/">������ѧ</a></li>\n<li><a href="http://www.51edu.com/chuguo/italy/">�����</a></li>\n</ul>\n</div>\n</div>\n</div>\n<div class="blank_8"></div>\n'+ strHTML +'\n<span style="display:none"><script src="http://s13.cnzz.com/stat.php?id=2496704&web_id=2496704" language="JavaScript"></script><!--ȫվͳ��--><script src="http://s23.cnzz.com/stat.php?id=1409421&web_id=1409421" language="JavaScript" charset="gb2312"></script></span>\n<div id="footer">\n	<div class="about51edu">\n<ul>\n<li><a href="http://www.51edu.com/aboutus/" target="_blank">��������</a>\n|&nbsp;<a href="http://www.51edu.com/link/" target="_blank">��������</a>\n|&nbsp;<a href="http://www.51edu.com/aboutus/joinus.html" target="_blank">��ƸӢ��</a>\n|&nbsp;<a href="http://www.51edu.com/aboutus/contectus-bj.html" target="_blank">&nbsp;��ϵ����</a>\n|&nbsp;<a href="http://www.51edu.com/aboutus/baojia.html" target="_blank">&nbsp;�������</a>\n|&nbsp;<a href="http://www.51edu.com/sitemap.html" target="_blank">&nbsp;վ���ͼ</a>\n|&nbsp;<a href="http://www.51edu.com/zhuanti/join/know_intro.html" target="_blank">&nbsp;��������</a></li>\n</ul>\n	</div>\n<p class="copyRight">\n		2001-2010 ��Ʒѧϰ������Ӯ��ذ�Ȩ���� ��ICP֤040590<br />\n		δ��51edu.com��Ȩ������ת�ر�վ������ѧУ�γ���Ϣ<br />\n		CopyRight 2001-2010. 51edu.com All Rights Reserved\n</p>\n</div></body>\n</html>'
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
//%%%%%%%%%%%%%%%%	 ���϶�����غ���										%%%%%%%%%%%%%%%%
//%%%%%%%%%%%%%%%%   ���ܣ�ģ��windows����									%%%%%%%%%%%%%%%%
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
/*
��þ��Բ������ϲ���Բ�
*/
function prOfPa(pa){
    var pr = pa.parentNode;
    while( getCurrentStyle(pr,'position') != 'relative' && pr.tagName.toLowerCase() != 'body' ){
        pr = pr.parentNode;
    }
    return pr
}
 

/*
�޶��������ק���ܾ���ʵ�ֺ���
*/
function startMove_2(e){
    e = e || window.event
    var obj /*�¼�����*/ = e.srcElement || e.target;
    if(ISDRAGGING == 1 || obj.tagName.toLowerCase() == 'a' || obj.className.indexOf('ant_txt') > -1 || obj.tagName.toLowerCase() == 'img' || obj.tagName.toLowerCase() == 'input' ){        //��������ƶ���������ֹͣ�ƶ���
        return;
    }  
    ISDRAGGING = 1;
    
    //obj = obj.parentNode                //���Ҫ��ק�Ĳ㣻
    while(obj.parentNode && getCurrentStyle(obj,'position') != 'absolute' ){
        obj = obj.parentNode
    }    
    
    var po = prOfPa(obj) //��ȡ���Բ�������Բ�
    var zp = getCurrentStyle(po,'zIndex') //��ȡ����Բ��z-index
	if(po.tagName.toLowerCase() == 'body'){
		obj.style.zIndex = po.style.zIndex = zp =='auto' || zp == 0 ? 11001 : parseInt(zp) + 2
	}else{
		obj.style.zIndex = po.style.zIndex = zp =='auto' || zp == 0 ? 11000 : parseInt(zp) + 2   //���������϶��㼰���ϲ���Բ�� z-index
	}
    //var range = [po.offsetLeft,po.offsetLeft]
    var range = [po.offsetWidth-obj.offsetWidth,po.offsetHeight-obj.offsetHeight]
	//alert(po.tagName+ '//' + po.offsetWidth +','+ obj.offsetWidth +','+ po.offsetHeight +','+ obj.offsetHeight)
    var absoultDiv = obj //ת��obj ������ absoultDiv
    var diffX /*���λ�úͲ㿪ͷ֮��X��ļ��*/= e.clientX - absoultDiv.offsetLeft;
    var diffY /*���λ�úͲ㿪ͷ֮��Y��ļ��*/= e.clientY - absoultDiv.offsetTop;
    

    if(document.addEventListener){                  //DOMģ��������mousemove��mouseup�ļ���������
        document.addEventListener("mousemove",handleMove,true);
        document.addEventListener("mouseup",handleMouseUp,true);
    }else if(document.attachEvent){                 //IE������mousemove��mouseup�ļ���������
        absoultDiv.setCapture();
        absoultDiv.attachEvent("onmousemove",handleMove);
        absoultDiv.attachEvent("onmouseup",handleMouseUp);
        absoultDiv.attachEvent("onlosecapture",handleMouseUp);
    }else{                                          //IE5���°汾�Ĳ�����
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
        absoultDiv.style.left = ( x < 0 ? 0 : x > range[0] ? range[0] : x ) + "px";       //����������--ʵ����ק��
		//$('bb').innerHTML =  absoultDiv.style.top + '/' + absoultDiv.style.left
        if(e.stopPropagation){
            e.stopPropagation();
        }else{
            e.cancelBubble = true;
        }
    }
    
    /*
    *handleMove�����ſ���Ĳ�����
    */
    function handleMouseUp(e){          
        if(document.removeEventListener){           //DOMģ����ɾ��mousemove��mouseup�ļ���������
            document.removeEventListener("mouseup",handleMouseUp,true);
            document.removeEventListener("mousemove",handleMove,true);
        }else if(document.detachEvent){             //IEģ����ɾ��mousemove��mouseup�ļ���������
            absoultDiv.detachEvent("onlosecapture",handleMouseUp);
            absoultDiv.detachEvent("onmouseup",handleMouseUp)
            absoultDiv.detachEvent("onmousemove",handleMove);
            absoultDiv.releaseCapture();
        }else{                                      //IE5���°汾��ɾ��mousemove��mouseup�ļ���������
            document.onmouseup = oldUpHandler;
            document.onmousemove = oldMoveHandler;
        }                       
        ISDRAGGING = 0;         //�����ק��������      
    }   
}

/*
��ȡ�¼�����������relative���xyֵ���������޶��������ק����
*/
function getXY_p(e,obj){
    e = e || window.event
    var a /*���ض���*/ = []   
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
����ҳ����Ŀ�����İ�
*/
function setTopWords(e){    
    var e = event || window.event
	GLOBALNODE = e.srcElement || e.target 
	var stxtnode1 = getFirstTypeNode(GLOBALNODE,'text',1)
	var stxtnode = getFirstTypeNode(GLOBALNODE,'text')
		
	var txtStr = '���֣�<textarea id="alk_text" onfocus="this.select()"/>'+(stxtnode1 ? stxtnode1.nodeValue + '<br/>' + stxtnode.nodeValue : stxtnode.nodeValue)+'</textarea><br/>'                 
	var t = (e.clientY < 0 ? (e.clientY + 60) : e.clientY + 30)  + document.documentElement.scrollTop + 'px'
	var l = ((e.clientX - 260) < 0 ? (e.clientX - 20) : (e.clientX - 200)) + document.documentElement.scrollLeft + 'px'	
	createPopDiv('popbox',t,l)
	$('popbox').innerHTML = txtStr
	var but = document.createElement('input')
	but.type = 'button'
	but.value = ' ȷ�� '
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
����ҳ����Ŀ������ʽ
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
	}catch(e){popUpPrompt('�������ֵ�������鲢�������룡')}
}
/*
���ö����������
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
�ж��Ƿ���ڴ���֤��class��
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
ȷ������block���title����
*/	
//function setTitle(o,f,g){
//	var fm = getParentByClassName('form_set',o)
//	if(!g){
//		var bl = getParentByClassName('block',o)
//		var bid = bl.id.split('_')
//		bid = bid[1]	//block id
//		var tt = getElementsByClassName('tt','div',bl)	   
//	
//		var ptt = null; //Ԥ��title����
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
//	var pmid = fm.ttclass.value  //Ԥ�� classsname
//	var p = [fm.ttbgpic.value,fm.ttheight.value,fm.ttwidth.value,fm.iclwidth.value,fm.iclpos.value,fm.icrwidth.value,fm.icrpos.value,fm.ttcolor.value,fm.ttcftsize.value,fm.ttcmgleft.value,fm.thcolor.value]
//
//	//��Ԥ���ر�
//	if(StyleSheet.getSheetById('ttpre')){
//		StyleSheet.getSheetById('ttpre').sheet.disabled = true
//	}
//
//	if(f==1 || f==2){ 			
//		if( !existSpecialClass('tt',pmid) ){
//			if(f==1){				
//				var prmpstr = 'Ԥ��ʧ�ܣ������ڷ��� "tt_'+pmid+'" <br/>���������룡'
//			}else if(f==2){
//				var prmpstr = 'ȷ��ʧ�ܣ������ڷ��� "tt_'+pmid+'" <br/>ȷ��ǰ����Ԥ����'
//			}			
//			popUpPrompt(prmpstr)				
//			return false;
//		}else if(f==1){
//			//����Ԥ��							
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
//		if(f==4 && !g){ //�ֶ�����ȷ��	
//			//����css�������
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
//			//����css������� Ԥ��ר��
//			var ttpresht
//			if(ttpresht = StyleSheet.getSheetById('ttpre')){
//				ttpresht.sheet.disabled = false;
//				ttpresht.removeAllRule()
//			}else{
//				ttpresht = new StyleSheet('ttpre')
//			}
//		}
//		//cssƬ
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
//		if(f==4 && !g){ //�ֶ�����ȷ��			
//			//loading cssƬ
//			try{			
//				ttsht.addRulePiece(cssp.replace(/\.prbox /g,''))
//			}catch(e){alert(e);popUpPrompt('�������ֵ�������鲢�������룡');return false;}
//			j = 0
//			while(j<tt.length){
//				tt[j].className = 'tt tt_'+pmid;
//				getElementsByClassName('icl','div',tt[j])[0].setAttribute('pos',p[4])  //����backgroundPostion����
//				getElementsByClassName('icr','div',tt[j])[0].setAttribute('pos',p[6])  //����backgroundPostion����
//				j++
//			}
//
//			//����css����		
//			if(arrIndexOf(Param_tt,pmid) !=null ){
//				arrDelete(Param_tt,pmid)
//			}
//			Param_tt.push({'id':pmid,'p':p})
//			
//		}else if(f==3){ //�ֶ�����Ԥ��			
//			//loading cssƬ
//			try{				
//				ttpresht.addRulePiece(cssp)
//			}catch(e){alert(cssp);popUpPrompt('�������ֵ�������鲢�������룡');return false;}
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
ȷ������block���cont����
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
//		var pct = null; //Ԥ��title����
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
//	var pmid = fm.ctclass.value  //Ԥ�� classsname
//	var p = [fm.ctbgpic.value,fm.ctbgpos.value,fm.ctbgrpt.value,fm.ctbgcolor.value,fm.ctbdwidth.value,fm.ctbdtype.value,fm.ctbdcolor.value,fm.ctbglayh.value,fm.ctlineht.value,fm.ctwdcolor.value,fm.ctlkcolor.value,0,fm.ctpadding.value,fm.ctftsize.value]
//
//	//��Ԥ���ر�
//	if(StyleSheet.getSheetById('ctpre')){
//		StyleSheet.getSheetById('ctpre').sheet.disabled = true
//	}
//
//	if(f==1 || f==2){ //����Ԥ��		
//		if( !existSpecialClass('cont',pmid) ){
//			if(f==1){
//				var prmpstr = 'Ԥ��ʧ�ܣ������ڷ��� "cont_'+pmid+'" <br/>���������룡'
//			}else if(f==2){
//				var prmpstr = 'ȷ��ʧ�ܣ������ڷ��� "cont_'+pmid+'" <br/>ȷ��ǰ����Ԥ����'
//			}
//			popUpPrompt(prmpstr)				
//			return false;
//		}else if(f==1){
//			//����Ԥ��							
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
//			//����css�������
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
//			//����css������� Ԥ��ר��
//			var ctpresht
//			if(ctpresht = StyleSheet.getSheetById('ctpre')){
//				ctpresht.sheet.disabled = false;
//				ctpresht.removeAllRule()
//			}else{
//				ctpresht = new StyleSheet('ctpre')
//			}
//		}
//		//cssƬ = 'border:'+p[4]+'px '+p[5]+' '+ p[6]
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
//		if(f==4 && !g){ //�ֶ�����ȷ��			
//			//loading cssƬ				
//			try{				
//				//ctsht.addRulePiece('.ddd{border:1px solid red}')			
//				//$('ssd').value = cssp.replace(/\.prbox /g,'')
//				ctsht.addRulePiece(cssp.replace(/\.prbox /g,''))			
//			}catch(e){popUpPrompt('�������ֵ�������鲢�������룡');return false;}
//			j = 0
//			while(j<ct.length){
//				ct[j].className = ct[j].className.replace(/cont_\d*/g,'cont_'+pmid)
//				j++
//			}
//
//			//����css����		
//			if(arrIndexOf(Param_cont,pmid) != null ){
//				arrDelete(Param_cont,pmid)
//			}
//			Param_cont.push({'id':pmid,'p':p})			
//		}else if(f==3){ //�ֶ�����Ԥ��			
//			//loading cssƬ
//			try{				
//				ctpresht.addRulePiece(cssp)
//			}catch(e){popUpPrompt('�������ֵ�������鲢�������룡');return false;}
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
ȷ������ȫ����ʽ����
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
//				promptstr = '^.^ ȫ���޸ĳɹ�'
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
//				promptstr = '^.^ body�����޸ĳɹ�'
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
//				promptstr = '^.^ ҳ������ɫ�޸ĳɹ�'
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
//				promptstr = '^.^ Ĭ�ϱ�����޸ĳɹ�'
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
//				promptstr = '^.^ Ĭ�ϱ�����޸ĳɹ�������������'
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
//				promptstr = '^.^ Ĭ�����ݿ��޸ĳɹ�'
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
//				promptstr = '^.^ Ĭ�����ݿ��޸ĳɹ�������������'
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
//				promptstr = '^.^ ���������޸ĳɹ�'
//			}		
//			popUpPrompt(promptstr)			
//		}
//		return true;
//	}catch(e){popUpPrompt('�������ֵ�������鲢�������룡');return false;}
//}

/*
ѡ��title��ʽ��
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
			var tstr = '<div class="tt tt_'+i+'" onclick="titleClass(this,'+i+')"> <div class="ttl"></div> <div class="icl"></div> <div class="ttc"><h3 class="ant_txt">title</h3></div> <div class="ttr"></div> <div class="icr mr"><a href="javascript:void(0)" target="_self">����</a></div> </div>'
			
			c.insertAdjacentHTML('afterbegin',tstr);
		}
	}
}

/*
block�����ʽ���ù�����������
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
		//���cont����			
	}
	if(blk.title){
		//���title����
		str += '<a class="mr7" href="javascript:void(0)" onclick="popClose();showBox_2(GLOBALNODE,3,'+bid+');return false;">����title��</a>'
	}
	if(!blk.title){
		str += '�����ݿ����ã�'
	}
	str += '<a class="ml7" href="" onclick="popClose();setBlockMargin('+bid+');return false;">ȡ��/�ָ����ࣿ</a></div>'
	$('popbox').innerHTML = str	
	//showBox(o.parentNode.parentNode,1)
}

/*
ȡ����ָ�block���marginbottom
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
block��Ĵ���༭������������
*/
function setCode(e,o){
	e = e || window.event
	e.cancelBubble=true	
	var t = (e.clientY < 0 ? (e.clientY + 30) : e.clientY)  + document.documentElement.scrollTop + 'px'
	var l = ((e.clientX - 260) < 0 ? (e.clientX - 20) : (e.clientX - 200)) + document.documentElement.scrollLeft + 'px'	
	GLOBALNODE = getParentByClassName('del',o)
	createPopDiv('popbox',t,l)
	var bid = fetchIdByClass(o)
	$('popbox').innerHTML = '<!--a class="ml7" href="javascript:void(0)" onclick="popClose();showCodeBox(GLOBALNODE,\'6a\','+bid+');return false;">�鿴��ȡblock���룿</a--><a class="ml7" href="javascript:void(0)" onclick="popClose();showCodeBox(GLOBALNODE,\'6b\','+bid+');return false;">�Զ������ݣ�</a>'	
}	
/*
���Ԥ��״̬�µ�js����
*/
function clearJs(){
	doAOnClick = function(){return true}
	doStartMove = function(){}
	doCutOver = function (){}
	doCutOut = function (){}
	doStartCut = function (){}	
}
/*
�ָ�Ԥ��״̬�µ�js����
*/
function restoreJs(){
	doAOnClick = aOnClick
	doStartMove = startMove
	doCutOver = cutOver;
	doCutOut = cutOut;
	doStartCut = startCut;
}

/*
����ǰҳ��block���� block_0
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
debug ��ʾ
*/
var g_info_ln = 0;
function info(s) {
	try{
		var inf = document.getElementById("ant_info");
		inf.innerHTML += "] " + (++ g_info_ln) + " > " + s + "<br />";
		inf.scrollTop += 20;
	}catch(e){}
}