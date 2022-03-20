'use strict';var punycode=new function Punycode(){this.utf16={decode:function(input){var output=[],i=0,len=input.length,value,extra;while(i<len){value=input.charCodeAt(i++);if((value&0xF800)===0xD800){extra=input.charCodeAt(i++);if(((value&0xFC00)!==0xD800)||((extra&0xFC00)!==0xDC00)){throw new RangeError('UTF-16(decode): Illegal UTF-16 sequence');}
value=((value&0x3FF)<<10)+(extra&0x3FF)+0x10000;}
output.push(value);}
return output;},encode:function(input){var output=[],i=0,len=input.length,value;while(i<len){value=input[i++];if((value&0xF800)===0xD800){throw new RangeError('UTF-16(encode): Illegal UTF-16 value');}
if(value>0xFFFF){value-=0x10000;output.push(String.fromCharCode(((value>>>10)&0x3FF)|0xD800));value=0xDC00|(value&0x3FF);}
output.push(String.fromCharCode(value));}
return output.join('');},};var initialN=0x80;var initialBias=72;var delimiter='\x2D';var base=36;var damp=700;var tmin=1;var tmax=26;var skew=38;var maxint=0x7FFFFFFF;function decodeDigit(cp){return cp-48<10?cp-22:cp-65<26?cp-65:cp-97<26?cp-97:base;}
function adapt(delta,numpoints,firsttime){var k;delta=firsttime?Math.floor(delta/damp):(delta>>1);delta+=Math.floor(delta/numpoints);for(k=0;delta>(((base-tmin)*tmax)>>1);k+=base){delta=Math.floor(delta/(base-tmin));}
return Math.floor(k+(base-tmin+1)*delta/(delta+skew));}
this.decode=function(input,preserveCase){var output=[];var caseFlags=[];var inputLength=input.length;var n,out,i,bias,basic,j,ic,oldi,w,k,digit,t,len;n=initialN;i=0;bias=initialBias;basic=input.lastIndexOf(delimiter);if(basic<0){basic=0;}
for(j=0;j<basic;++j){if(preserveCase){caseFlags[output.length]=(input.charCodeAt(j)-65<26);}
if(input.charCodeAt(j)>=0x80){throw new RangeError('Illegal input >= 0x80');}
output.push(input.charCodeAt(j));}
for(ic=basic>0?basic+1:0;ic<inputLength;){for(oldi=i,w=1,k=base;;k+=base){if(ic>=inputLength){return;}
digit=decodeDigit(input.charCodeAt(ic++));if(digit>=base){return;}
if(digit>Math.floor((maxint-i)/w)){return;}
i+=digit*w;t=k<=bias?tmin:k>=bias+tmax?tmax:k-bias;if(digit<t){break;}
if(w>Math.floor(maxint/(base-t))){return;}
w*=(base-t);}
out=output.length+1;bias=adapt(i-oldi,out,oldi===0);if(Math.floor(i/out)>maxint-n){return;}
n+=Math.floor(i/out);i%=out;if(preserveCase){caseFlags.splice(i,0,input.charCodeAt(ic-1)-65<26);}
output.splice(i,0,n);i++;}
if(preserveCase){for(i=0,len=output.length;i<len;i++){if(caseFlags[i]){output[i]=(String.fromCharCode(output[i]).toUpperCase()).charCodeAt(0);}}}
return this.utf16.encode(output);};this.toUnicode=function(domain){var domainArray=domain.split('.');var out=[];for(var i=0;i<domainArray.length;++i){var s=domainArray[i];out.push(s.match(/^xn--/)?punycode.decode(s.slice(4)):s);}
return out.join('.');};}();