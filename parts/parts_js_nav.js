//导航初始化函数
//参数 n: 取值(0- ) 对应当前一级导航的下标
//参数 m: 取值(0- ) 对应当前二级导航的下标
function mcontnav_ini(){
var nm = document.getElementById('navhid').value;
var n = nm.split(',')
n = n[0];
var m = n[1];
var ul = document.getElementById('mcontnav');
var ls = ul.getElementsByTagName('li');
var i = ls.length;
while( i-->0 ){
ls[i].className = i==n ? 'hov' : '';
var ds = ls[i].getElementsByTagName('div');
try{
var as = ds[0].getElementsByTagName('a');
var j = as.length;
while( j-->0 ){
as[j].className = j==m ? 'cur' : '';
}
}catch(e){}
if(i==ls.length-1){
ls[i].className += ' bgn'
}
}
}
addEvent(window,'load',function (){
try{mcontnav_ini()}catch(e){}
})
