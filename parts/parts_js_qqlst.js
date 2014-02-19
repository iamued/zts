//QQ菜单开始--------------------------------------------------------------------------------
var myStep=0,stepNum=10,contHeight=290,ttHeight=28,tmer,onNum,toNum
function qqInitialize(n){
var o = document.getElementById('myqq')
var ls = o.getElementsByTagName('li')
var t,m=0
o.style.height = ls.length * ttHeight + contHeight + 'px'
onNum=toNum=n
for( var i=0; i<ls.length; i++ ){
t = ls[i].getElementsByTagName('div')[0]
c = ls[i].getElementsByTagName('div')[1]
ls[i].id = 'myqq_'+i
ls[i].style.top = '-' + m * contHeight + 'px'
if(i!=n) m++;
t.style.height = ttHeight + 'px'
c.style.height = contHeight + 'px'
t.onclick = function(){
var w = this
var j = i
return function(){
if(myStep==0){
curNum = j
qqMove(j)
}
}
}.call(t)
}
}
function qqMove(num){
onNum=num
if(onNum<toNum)	moveDown(); else moveUp();
myStep++
if(myStep>=stepNum){
toNum=onNum
myStep = 0
window.clearTimeout(tmer)
}else{
tmer = setTimeout("qqMove(onNum)",10)
}
}
function moveDown(){
for(var i=onNum+1;i<=toNum;i++){
document.getElementById("myqq_"+i).style.top=parseInt(document.getElementById("myqq_"+i).style.top)+contHeight/stepNum+'px'
}
}
function moveUp(){
//alert("up"+myStep+" "+onNum+" "+toNum)
for(var i=onNum;i>toNum;i--){
document.getElementById("myqq_"+i).style.top=parseInt(document.getElementById("myqq_"+i).style.top)-contHeight/stepNum+'px'
}
}
//QQ菜单结束--------------------------------------------------------------------------------
addEvent(window,'load',function (){
try{qqInitialize(0)}catch(e){}
})
