var currPicId = 0, chgPicTimer;
function autoSwitch(nm,m){
try{
if(document.getElementById(nm+'_a')){
var ls = document.getElementById(nm+'_a').getElementsByTagName('li');
ls[m].onmouseover();
currPicId = m;
var nxtId = (m+1) % ls.length;
chgPicTimer = window.setTimeout("autoSwitch('"+nm+"',"+nxtId+")",5000);
}
}catch(e){}
}
function clrPicTimer(m){
currPicId = m;
chgPicTimer = window.clearTimeout(chgPicTimer);
}
function fpicInitialize(nm,m){
try{
var ula = document.getElementById(nm+'_a');
var ulb = document.getElementById(nm+'_b');
var lisa = ula.getElementsByTagName('li');
var lisb = ulb.getElementsByTagName('dd');
var i;
ulb.setAttribute('curr_li',m);
for(i=0; i<lisb.length; i++){
if(i != m)
lisb[i].className = 'dn';
else{
lisb[i].className = '';
}
}
for(i=0; i<lisa.length; i++){
lisa[i].setAttribute('num',i);
if(i == m){
lisa[i].className = trim(lisa[i].className) + ' hov';
}else{
lisa[i].className = ''
}
lisa[i].onmouseover = function(){
var c = parseInt(ulb.getAttribute('curr_li'));
lisa[c].className = lisa[c].className.replace(/\s*hov\s*/g,' ');
lisb[c].className = 'dn';
var n = this.getAttribute('num');
currPicId = n;
clrPicTimer(currPicId);
this.className = trim(this.className) + ' hov';
lisb[n].className = '';
ulb.setAttribute('curr_li',n);
}
lisa[i].onmouseout = function(){
autoSwitch('autosw',currPicId);
}
}
for(i=0; i<lisb.length; i++){
var da = lisb[i].getElementsByTagName('a')[0]
da.onmouseover = function(){
clrPicTimer(currPicId);
}
da.onmouseout = function(){
autoSwitch('autosw',currPicId);
}
}
}catch(e){}
}
addEvent(window,'load',new Function("fpicInitialize('autosw',0);autoSwitch('autosw',0);"))
