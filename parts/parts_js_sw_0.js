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
addEvent(window,'load',function (){
try{swInitialize()}catch(e){}
})
