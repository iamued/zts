function SlidePlayer(el, width, height) {
this.element = (typeof el == "string") ? document.getElementById(el) : el;
var fc = getFirstElementChild(this.element)
if(fc.className == 'ShowPage'){
this.element.removeChild(fc);
}
this.width = width || 230;
this.height = height || 320;
this.len = this.element.getElementsByTagName("li").length;
this.cnt = this.element.getElementsByTagName("ul")[0];
this.idx = 0;	//current index of li
this.showPage = [];
this.init();
}
SlidePlayer.prototype = {
init: function () {
var ul = document.createElement("ul"), li, _this = this;
ul.className = "ShowPage";
for (var i = 0; i < this.len; i ++) {
li = document.createElement("li");
li.appendChild(document.createTextNode(i + 1));
li.setAttribute("idx", i);
li.onmouseover = function () {
_this.show(parseInt(this.getAttribute("idx")));
};
ul.appendChild(li);
this.showPage.push(li);
}
this.element.insertBefore(ul, this.element.firstChild);
this.show(0);
},
show: function (i) {
clearTimeout(this.loop);
if (i > this.len - 1) i = 0;
for (var j = 0; j < this.len; j ++)
this.showPage[j].className = "";
this.showPage[i].className = "selected";
var _this = this;
this.idx = i;
if (this.height * i == this.cnt.scrollTop) {
var _show = function () {
_this.show(i + 1);
};
_this.loop = setTimeout(_show, 5000);
} else {
this.slide(i);
}
},
slide: function (i) {
var sign = this.idx <= i ? 1 : -1,
step = 0,
_this = this,
scroll = function () {
if (_this.height * _this.idx == _this.cnt.scrollTop) {
_this.show(_this.idx);
return;
}
step = Math.floor((_this.height * _this.idx - _this.cnt.scrollTop) / 10);
if (step == 0) step = sign;
_this.cnt.scrollTop += step;
_this.loop = setTimeout(scroll, 10);
};
scroll();
}
};
addEvent(window,'load',function (){
try{new SlidePlayer("SlidePlayer", 230, 320);}catch(e){}
});
