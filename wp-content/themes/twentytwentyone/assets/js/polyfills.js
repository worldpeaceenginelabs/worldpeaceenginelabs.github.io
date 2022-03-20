if(!Element.prototype.matches){Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector;}
if(!Element.prototype.closest){Element.prototype.closest=function(s){var el=this;do{if(Element.prototype.matches.call(el,s)){return el;}
el=el.parentElement||el.parentNode;}while(el!==null&&el.nodeType===1);return null;};}
if(window.NodeList&&!NodeList.prototype.forEach){NodeList.prototype.forEach=function(callback,thisArg){var i;thisArg=thisArg||window;for(i=0;i<this.length;i++){callback.call(thisArg,this[i],i,this);}};}