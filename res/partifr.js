try{
if(window.location.href.indexOf('alibaba.com') > -1){
document.domain = 'alibaba.com';
}
}catch(e){}
function $(s){
return document.getElementById(s);
}
//�����¼���
function addEvent(el,eventType,fn){
if(el.addEventListener){
el.addEventListener(eventType,fn,false);
}else if(el.attachEvent){
el.attachEvent("on" + eventType,fn);
}else{
el["on"+eventType]=fn;
}
}
function trim(inputString) {
return inputString.replace(/^[\s]+/,"").replace(/[\s]+$/,"");
}
function drawImageByStandard(im,x,y) {
y = y || 99999;
im.removeAttribute("width");
im.removeAttribute("height");
if( im.width/im.height > x/y  && im.width >x ){
im.height = im.height * (x/im.width)
im.width = x
im.parentNode.style.height = im.height * (x/im.width) + 'px'
}else if( im.width/im.height <= x/y && im.height >y){
im.width = im.width * (y/im.height)
im.height = y
im.parentNode.style.height = y + 'px'
}
im.style.visibility = 'visible'
}
//��ȡ��Ļ��ҳ��Ŀ�ߣ�����������ʽ����
function getSize() {
var xScroll, yScroll;
if (window.innerHeight && window.scrollMaxY) {
xScroll = document.body.scrollWidth;
yScroll = window.innerHeight + window.scrollMaxY;
} else if (document.body.scrollHeight > document.body.offsetHeight){      // all but Explorer Mac
xScroll = document.body.scrollWidth;
yScroll = document.body.scrollHeight;
} else {      // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
xScroll = document.body.offsetWidth;
yScroll = document.body.offsetHeight;
}
var windowWidth, windowHeight;
if (self.innerHeight) {      // all except Explorer
windowWidth = self.innerWidth;
windowHeight = self.innerHeight;
} else if (document.documentElement && document.documentElement.clientHeight) {      // Explorer 6 Strict Mode
windowWidth = document.documentElement.clientWidth;
windowHeight = document.documentElement.clientHeight;
} else if (document.body) {      // other Explorers
windowWidth = document.body.clientWidth;
windowHeight = document.body.clientHeight;
}
// for small pages with total height less then height of the viewport
if(yScroll < windowHeight){
pageHeight = windowHeight;
y = pageHeight;
} else {
pageHeight = yScroll;
y = pageHeight;
}
if(xScroll < windowWidth){
pageWidth = windowWidth;
} else {
pageWidth = xScroll;
}
arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight)
return arrayPageSize;
}
//��дinsertAdjacentHTML���� ��ʼ
if (!document.all) {
HTMLElement.prototype.insertAdjacentHTML = function (sWhere, sHTML) {
var df;
var r = this.ownerDocument.createRange();
switch (String(sWhere).toLowerCase()) {
case "beforebegin":
r.setStartBefore(this);
df = r.createContextualFragment(sHTML);
this.parentNode.insertBefore(df, this);
break;
case "afterbegin":
r.selectNodeContents(this);
r.collapse(true);
df = r.createContextualFragment(sHTML);
this.insertBefore(df, this.firstChild);
break;
case "beforeend":
r.selectNodeContents(this);
r.collapse(false);
df = r.createContextualFragment(sHTML);
this.appendChild(df);
break;
case "afterend":
r.setStartAfter(this);
df = r.createContextualFragment(sHTML);
this.parentNode.insertBefore(df, this.nextSibling);
break;
}
};
}
//��дinsertAdjacentHTML���� ����
//�¼�ð����ֹ����
function cancelBubble(e){
e = e || window.event;e.cancelBubble=true
}
//��ȡ��ǰ����ʽ����ֵ
function getCurrentStyle(obj, prop) {
if (obj.currentStyle) {
return obj.currentStyle[prop];
}
else if (window.getComputedStyle) {
prop = prop.replace (/([A-Z])/g, "-$1");
prop = prop.toLowerCase ();
return window.getComputedStyle (obj, "").getPropertyValue(prop);
}
return null;
}
//ͨ��classname��ȡ�ڵ�
function getElementsByClassName(cls,elm,pobj) {
cls = cls.replace(',','\\b.*\\b')
var arrCls =[];
var rexCls = new RegExp('\\b' + cls + '\\b','img');
var lisElm = pobj.getElementsByTagName(elm);
for (var i=0; i<lisElm.length; i++ ){
var evaCls = lisElm[i].className;
if( rexCls.test(evaCls) ){
arrCls.push(lisElm[i]);
rexCls.test(evaCls)
}
}
return arrCls;
}
/*
*��������getPreviousSibling:    ��ȡ��һ���ڵ�
*@param o:              �����ڵ㣻
*@return: �����ڵ����һ���ڵ㣬���Ϊ�շ��� null��
*/
function getPreviousSibling(o){
var r = o.previousSibling
while( r && r.nodeType !=1 ){
r = r.previousSibling
}
return r
}
/*
*��������getNextSibling:    ��ȡ��һ���ڵ�
*@param o:              �����ڵ㣻
*@return: �����ڵ����һ���ڵ㣬���Ϊ�շ��� null��
*/
function getNextSibling(o){
var r = o.nextSibling
while( r && r.nodeType !=1 ){
r = r.nextSibling
}
return r
}
/*
���ָ��className������ϲ�
*/
function getParentByClassName(classname,obj){
classname = classname.replace(',','\\b.*\\b')
var rg = new RegExp('\\b'+classname+'\\b','ig')
var pn = obj.parentNode;
while( !rg.test(pn.className) ){
var tg = pn.tagName ? pn.tagName.toLowerCase() : ''
if( tg == 'body' ||  tg == '' || pn.parentNode && !pn.parentNode.tagName ){
return null;
}
pn = pn.parentNode;
}
return pn;
}
/*
*��������getLastElementChild:    ��ȡ����Ԫ�ص����һ��element��Ԫ�أ�
*@param obj:    ����Ԫ�أ�
*@type Object
*@return: ���һ������Ϊelement����Ԫ�أ�
*/
function getLastElementChild(obj){
var objChilds /*��Ԫ�ص�������Ԫ��*/ = obj.childNodes;
for(var i=objChilds.length-1;i>=0;i--){
if(objChilds[i].nodeType == 1){
return objChilds[i];
break;
}
}
return null;
}
/*
*��������getFirstElementChild:   ��ȡ����Ԫ�صĵ�һ��element��Ԫ�أ�
*@param obj:    ����Ԫ�أ�
*@type Object
*@return: ��һ������Ϊelement����Ԫ�أ�
*/
function getFirstElementChild(obj){
var objChilds /*��Ԫ�ص�������Ԫ��*/ = obj.childNodes;
for(var i=0;i<objChilds.length;i++){
if(objChilds[i].nodeType == 1){
return objChilds[i];
break;
}
}
return null;
}
/*
���ָ��className������ϲ�
*/
function getParentByClassName(classname,obj){
classname = classname.replace(',','\\b.*\\b')
var rg = new RegExp('\\b'+classname+'\\b','ig')
var pn = obj.parentNode;
while( !rg.test(pn.className) ){
var tg = pn.tagName ? pn.tagName.toLowerCase() : ''
if( tg == 'body' ||  tg == '' || pn.parentNode && !pn.parentNode.tagName ){
return null;
}
pn = pn.parentNode;
}
return pn;
}
function swInitializeById(nm,m,psy,psx){
var ula = $(nm+'_a')
var ulb = $(nm+'_b')
var lisa = ula.getElementsByTagName('li')
var lisb = ulb.getElementsByTagName('dd')
var flag =  psy == undefined && psx == undefined ? false : true
if(flag){
ula.style.backgroundPosition = (psx ? psx : 0) +'px -'+ (psy ? psy : 0) +'px'
}
var i
ulb.setAttribute('curr_li',m)
for(i=0; i<lisb.length; i++){
if(i != m)
lisb[i].className = 'dn'
else{
lisb[i].className = ''
}
}
for(i=0; i<lisa.length; i++){
lisa[i].setAttribute('num',i)
if(i == m){
lisa[i].className += ' hov'
}else{
lisa[i].className = ''
}
lisa[i].onmouseover = function(){
var c = parseInt(ulb.getAttribute('curr_li'))
if(flag){
ula.style.backgroundPosition =  '0 -' + (this.getAttribute('num') * 40 + psy) + 'px'
}else{
lisa[c].className = lisa[c].className.replace(/\s*hov\s*/g,' ')
this.className += ' hov'
}
lisb[c].className = 'dn'
var n = this.getAttribute('num')
lisb[n].className = ''
ulb.setAttribute('curr_li',n)
}
}
}
function swInitialize(){
var ss = getElementsByClassName( 'sw','ul',document );
var i = ss.length;
while( i-- > 0 ){
var t = ss[i].id.split('_')
swInitializeById( t[0] , 0 )
}
}
addEvent(window,'load',swInitialize)
function parentCloseMe(){
var p = window.parent
p.ifrclose();
}
function parentInsertCont(){
if(!checkHValue()){return}
try{
var sb = $('insertConfirm')
if(sb.value == '��ȴ�...'){ return }
var p = window.parent
var pt = selectPart();
var hv = $('suitform').addheight.checked ? $('suitform').height.value : 0
if( hv==0 && !pt ){
return
}
p.$('heightvalue').value = hv || 0;
if( hv>0 && !pt ){
p.insertCont(p.GLOBALNODE.parentNode,null,null,null,hv,1)
}else{
var insertStr = getNextSibling(getNextSibling(pt.parentNode)).innerHTML.replace(/\[script type=[\"\']?text\/javascript[\"\']?\]/ig,'<'+'script type=text/javascript'+'>').replace(/\[\/script]/ig,'<'+'/script'+'>');
pt = pt.value.split(',');
p.$('suitclass').value = selectSuit();
p.insertCont(p.GLOBALNODE.parentNode,pt[0],pt[1],pt[2],hv,insertStr)
}
sb.value = '��ȴ�...'
sb.disabled = true
}catch(e){}
}
function parentInsertBlock(){
var sb = $('insertConfirm')
if(sb.value == '��ȴ�...'){ return }
var p = window.parent
p.$('heightvalue').value = 0;
p.$('suitclass').value = selectSuit();
var pt = selectPart();
if( !pt ){
return
}
var insertStr = getNextSibling(getNextSibling(pt.parentNode)).innerHTML.replace(/\[script type=[\"\']?text\/javascript[\"\']?\]/ig,'<'+'script type=text/javascript'+'>').replace(/\[\/script]/ig,'<'+'/script'+'>');
var num = $('suitform').addTitleOrNot.checked ?  0 : 5
if( $('isJsBlock').value == 1){
num = 10;
}
pt = pt.value.split(',');
p.insertBlock(pt[0],pt[1],pt[2],insertStr,num);
sb.value = '��ȴ�...'
sb.disabled = true
}
function autoLineHeight(o){
var t = $('suitform').lineheight;
var fs = $('partform');
if( o.value == 'f12' ){
t.value = fs.className = 'lht20';
}else if( o.value == 'f13' ){
t.value = fs.className = 'lht23 lht23s';
}else if( o.value == 'f14' ){
t.value = fs.className = 'lht23';
}else if( o.value == 'f16' ){
t.value = fs.className = 'lht25'
}
}
function autoTxtColor(o){
$('txtclr').className = o.value
}
function autoLnkColor(o){
$('lnkclr').className = o.value
}
function addTitle(o){
if( !o.checked ){
$('nott').className = 'nott'
}else{
$('nott').className = ''
}
}
function selectSuit(){
var f = $('suitform');
var r = '';
r += f.fontsize.value + ' ' + f.lineheight.value + ' ' + f.txtcolor.value + ' ' + f.lnkcolor.value
return trim(r)
}
function selectPart(){
var prs = $('partform').partradio
var i = prs.length;
while( i-- > 0 ){
if(prs[i].checked){
return prs[i]
}
}
return false;
}
function recoverConfirm(){
var sb = $('insertConfirm')
sb.value = 'ȷ��'
sb.disabled = false
}
function checkHValue(){
if($('suitform').addheight.checked){
var v = $('suitform').height.value.replace(/\s*/g,'');
if(v.match(/\D/g) || v == '' || parseInt(v) > 999 ){
$('heightwrong').style.display = 'inline';
return false;
}else{
$('heightwrong').style.display = 'none';
}
return true;
}else{
return true;
}
}
function activateH(s){
var h = $('suitform').height
if(s.checked){
h.disabled = false
}else{
h.disabled = true
$('heightwrong').style.display = 'none';
}
}
function formInitialize(){
var f = $('suitform');
f.fontsize.value = '';
f.lineheight.value = '';
f.txtcolor.value = '';
f.lnkcolor.value = '';
f.addheight.checked = false;
f.height.value = 0
f.height.disabled = true;
recoverConfirm();
var rs = $('partform').getElementsByTagName('input');
var i = rs.length;
while( i-- > 0 ){
if( rs[i].type == 'radio' && rs[i].name == 'partradio' ){
rs[i].checked = false;
}
}
}
addEvent(window,'load',formInitialize)
//ʹ��ģ����л������ޱ�ҳ��ʹ��
function showswpart(id){
var sps = ['swpart_0','swpart_1','swpart_2','swpart_js'];
var i = sps.length;
if( id == 'swpart_js' ){
$('isJsBlock').value = 1;
}else{
$('isJsBlock').value = 0;
}
while( i-- > 0 ){
if($(sps[i])){
$(sps[i]).style.display = 'none';
$(sps[i]+'_li').className = '';
}
}
$(id+'_li').className = 'hov';
$(id).style.display = 'block';
}
var firstClick = doDblClick = function (){}
