function rkswInitializeById(nm,m){
var ula = $(nm)
var lisa = ula.getElementsByTagName('li')
ula.setAttribute('curr_li',m)
var i = lisa.length
while( i-- > 0 ){
lisa[i].setAttribute('num',i)
if(i != m)
lisa[i].className = ''
else{
lisa[i].className = 'hov'
}
lisa[i].onmouseover = function(){
var c = parseInt(ula.getAttribute('curr_li'))
lisa[c].className = lisa[c].className.replace(/\s*hov\s*/g,' ')
this.className += ' hov'
var n = this.getAttribute('num')
ula.setAttribute('curr_li',n)
}
}
}
function rkswInitialize(){
var ss = getElementsByClassName( 'swrank','ul',document );
var i = ss.length;
while( i-- > 0 ){
rkswInitializeById( ss[i].id , 0 )
}
}
addEvent(window,'load',function (){
try{rkswInitialize()}catch(e){}
})
