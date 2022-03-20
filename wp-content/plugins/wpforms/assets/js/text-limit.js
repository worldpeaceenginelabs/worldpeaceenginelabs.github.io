'use strict';(function(){function renderHint(hintText,count,limit){return hintText.replace('{count}',count).replace('{limit}',limit).replace('{remaining}',limit-count);}
function createHint(formId,fieldId,text){var hint=document.createElement('div');hint.classList.add('wpforms-field-limit-text');hint.id='wpforms-field-limit-text-'+formId+'-'+fieldId;hint.textContent=text;return hint;}
function checkCharacters(hint,limit){return function(e){hint.textContent=renderHint(window.wpforms_settings.val_limit_characters,this.value.length,limit);};}
function countWords(string){if(typeof string!=='string'){return 0;}
if(!string.length){return 0;}
[/([A-Z]+),([A-Z]+)/gi,/([0-9]+),([A-Z]+)/gi,/([A-Z]+),([0-9]+)/gi,].forEach(function(pattern){string=string.replace(pattern,'$1, $2');});return string.split(/\s+/).length;}
function checkWords(hint,limit){return function(e){var value=this.value.trim(),words=countWords(value);hint.textContent=renderHint(window.wpforms_settings.val_limit_words,words,limit);if([13,32,188].indexOf(e.keyCode)>-1&&words>=limit){e.preventDefault();}};}
function getPastedText(e){if(window.clipboardData&&window.clipboardData.getData){return window.clipboardData.getData('Text');}else if(e.clipboardData&&e.clipboardData.getData){return e.clipboardData.getData('text/plain');}}
function pasteText(limit){return function(e){e.preventDefault();var pastedText=getPastedText(e),newPosition=this.selectionStart+pastedText.length,newText=this.value.substring(0,this.selectionStart)+pastedText+this.value.substring(this.selectionStart);this.value=newText.substring(0,limit);this.setSelectionRange(newPosition,newPosition);};}
function limitWords(text,limit){var separators,newTextArray,result='';var regEx=/\s+/g;separators=text.trim().match(regEx)||[];newTextArray=text.split(regEx);newTextArray.splice(limit,newTextArray.length);for(var i=0;i<newTextArray.length;i++){result+=newTextArray[i]+(separators[i]||'');}
return result.trim();}
function pasteWords(limit){return function(e){e.preventDefault();var pastedText=getPastedText(e),newPosition=this.selectionStart+pastedText.length,newText=this.value.substring(0,this.selectionStart)+pastedText+this.value.substring(this.selectionStart);this.value=limitWords(newText,limit);this.setSelectionRange(newPosition,newPosition);};}
function arrFrom(el){return[].slice.call(el);}
function ready(){arrFrom(document.querySelectorAll('.wpforms-limit-characters-enabled')).map(function(e){var limit=parseInt(e.dataset.textLimit,10)||0;e.value=e.value.slice(0,limit);var hint=createHint(e.dataset.formId,e.dataset.fieldId,renderHint(window.wpforms_settings.val_limit_characters,e.value.length,limit));var fn=checkCharacters(hint,limit);e.parentNode.appendChild(hint);e.addEventListener('keydown',fn);e.addEventListener('keyup',fn);e.addEventListener('paste',pasteText(limit));});arrFrom(document.querySelectorAll('.wpforms-limit-words-enabled')).map(function(e){var limit=parseInt(e.dataset.textLimit,10)||0;e.value=limitWords(e.value,limit);var hint=createHint(e.dataset.formId,e.dataset.fieldId,renderHint(window.wpforms_settings.val_limit_words,countWords(e.value.trim()),limit));var fn=checkWords(hint,limit);e.parentNode.appendChild(hint);e.addEventListener('keydown',fn);e.addEventListener('keyup',fn);e.addEventListener('paste',pasteWords(limit));});}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',ready);}else{ready();}}());