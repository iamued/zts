(function (){
opaSlide = {
obj : null,
ims : [],
tnm : 0,
cnm : 0,
spd : .3,
loop : null,
lptime : 4000,
ini : function (){
this.obj = document.getElementById('opaslide')
this.ims = this.obj.getElementsByTagName('img')
this.tnm = this.ims.length;
this.cnm = this.tnm - 1;
var t1 = this.ims[this.cnm];
this.obj.style.height = this.ims[this.cnm].height + 'px';
t1.style.zIndex = '1';
var i = this.ims.length;
while(i-->0){
this.ims[i].onmouseover = function (){
window.clearTimeout(this.loop);
}
if(this.cnm !=i){this.ims[i].style.position = 'absolute'}
}
this.oSlide();
},
nextNm : function (){
return (this.cnm - 1 + this.tnm) % this.tnm;
},
oReset : function (o){
if(document.documentElement.filters){
o.filters.item(0).opacity = 100;
}else{
o.style.opacity = 1;
}
},
oSlide : function (){
var t2 =  this.ims[this.cnm];
//ff opacity
var ffo = t2.style.opacity;
if(ffo == ''){
ffo = 1;
}
//***
var opc = ffo ? ffo * 100 : t2.filters.item(0).opacity;
var cdt = (opc <= 0);
var pct = this.spd * (100 - opc);
pct = pct < 1 ? 1 : pct;
pct = -pct;
var _this = this;
var _oSlide = function (){
_this.oSlide();
}
if(cdt){
t2.style.zIndex = '0';
t2.style.position = 'absolute'
this.cnm = this.nextNm();
var t3 = this.ims[this.cnm];
t3.style.zIndex = '2';
t3.style.position = 'relative'
var t4 = this.ims[this.nextNm()];
t4.style.zIndex = '1';
this.oReset(t2);
this.loop = window.setTimeout(_oSlide,this.lptime);
return;
}
if(document.documentElement.filters){
t2.filters.item(0).opacity = opc + pct;
}else{
t2.style.opacity = (opc + pct)/100;
}
window.setTimeout(_oSlide,50)
}
}
})()
addEvent(window,'load',function (){
try{opaSlide.ini()}catch(e){}
});
