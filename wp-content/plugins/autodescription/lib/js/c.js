'use strict';window.tsfC=function(){const l10n='undefined'!==typeof tsfCL10n&&tsfCL10n;let counterType=+(l10n.counterType||0);const getCounterType=()=>counterType;const counterClasses={0:'tsf-counter-zero',1:'tsf-counter-one',2:'tsf-counter-two',3:'tsf-counter-three',};const updateCharacterCounter=test=>{let el=test.e,text=tsf.decodeEntities(test.text),guidelines=l10n.guidelines[test.field][test.type].chars;let testLength=tsf.getStringLength(text),newClass='',exclaimer='';let classes={bad:'tsf-count-bad',okay:'tsf-count-okay',good:'tsf-count-good',unknown:'tsf-count-unknown',};if(!testLength){newClass=classes.unknown;exclaimer=l10n.i18n.guidelines.short.empty;}else if(testLength<guidelines.lower){newClass=classes.bad;exclaimer=l10n.i18n.guidelines.short.farTooShort;}else if(testLength<guidelines.goodLower){newClass=classes.okay;exclaimer=l10n.i18n.guidelines.short.tooShort;}else if(testLength>guidelines.upper){newClass=classes.bad;exclaimer=l10n.i18n.guidelines.short.farTooLong;}else if(testLength>guidelines.goodUpper){newClass=classes.okay;exclaimer=l10n.i18n.guidelines.short.tooLong;}else{newClass=classes.good;exclaimer=l10n.i18n.guidelines.short.good;}
switch(counterType){case 3:exclaimer=testLength.toString()+' - '+exclaimer;break;case 2:break;case 1:default:exclaimer=testLength.toString();break;}
el.innerHTML=exclaimer;for(let _c in classes)
el.classList.remove(classes[_c]);for(let _c in counterClasses)
el.classList.remove(counterClasses[_c]);el.classList.add(newClass);el.classList.add(counterClasses[counterType]);}
const updatePixelCounter=test=>{let el=test.e,text=tsf.decodeEntities(test.text),guidelines=l10n.guidelines[test.field][test.type].pixels;let wrap=el.parentElement;if(!wrap)
return;let bar=wrap.querySelector('.tsf-pixel-counter-bar'),shadow=wrap.querySelector('.tsf-pixel-counter-shadow');if(!bar||!shadow)
return;shadow.innerHTML=tsf.escapeString(text);let testWidth=shadow.offsetWidth,newClass='',newWidth='',guidelineHelper='';let classes={bad:'tsf-pixel-counter-bad',okay:'tsf-pixel-counter-okay',good:'tsf-pixel-counter-good',unknown:'tsf-pixel-counter-unknown',};newWidth=(testWidth/guidelines.goodUpper*100)+'%';if(!testWidth){newClass=classes.unknown;newWidth='100%';guidelineHelper=l10n.i18n.guidelines.long.empty;}else if(testWidth<guidelines.lower){newClass=classes.bad;guidelineHelper=l10n.i18n.guidelines.long.farTooShort;}else if(testWidth<guidelines.goodLower){newClass=classes.okay;guidelineHelper=l10n.i18n.guidelines.long.tooShort;}else if(testWidth>guidelines.upper){newWidth=(guidelines.upper/(testWidth+((testWidth-guidelines.upper)*2/3))*100)+'%';newClass=classes.bad;guidelineHelper=l10n.i18n.guidelines.long.farTooLong;}else if(testWidth>guidelines.goodUpper){newClass=classes.okay;guidelineHelper=l10n.i18n.guidelines.long.tooLong;newWidth='100%';}else{newClass=classes.good;guidelineHelper=l10n.i18n.guidelines.long.good;}
let sub=bar.querySelector('.tsf-pixel-counter-fluid'),label;label=l10n.i18n.pixelsUsed.replace(/%1\$d/g,testWidth);label=label.replace(/%2\$d/g,guidelines.goodUpper);label+='<br>'+guidelineHelper;bar.classList.remove(...Object.values(classes));bar.classList.add(newClass);sub.style.width=newWidth;bar.dataset.desc=label;bar.setAttribute('aria-label',tsf.escapeString(label.replace(/(<([^>]+)?>?)/ig,' ')));tsfTT.triggerUpdate(bar);}
const triggerCounterUpdate=()=>{window.dispatchEvent(new CustomEvent('tsf-counter-updated'));}
const updateCounterClasses=countUp=>{if(countUp)++counterType;if(counterType>3)
counterType=0;triggerCounterUpdate();}
const _counterUpdate=()=>{updateCounterClasses(true);let target='.tsf-counter-wrap .tsf-ajax',status=0;tsf.resetAjaxLoader(target);tsf.setAjaxLoader(target);wp.ajax.post('tsf_update_counter',{nonce:tsf.l10n.nonces.edit_posts,val:counterType,}).done(response=>{response=tsf.convertJSONResponse(response);if('success'===response.type)
status=1;switch(status){case 0:tsf.unsetAjaxLoader(target,false);break;case 1:tsf.unsetAjaxLoader(target,true);break;default:tsf.resetAjaxLoader(target);break;}}).fail(()=>{tsf.unsetAjaxLoader(target,false);});}
const resetCounterListener=()=>document.querySelectorAll('.tsf-counter').forEach(el=>el.addEventListener('click',_counterUpdate));const _initCounters=()=>{resetCounterListener();}
return Object.assign({load:()=>{document.body.addEventListener('tsf-onload',_initCounters);}},{updatePixelCounter,updateCharacterCounter,triggerCounterUpdate,resetCounterListener,getCounterType,},{counterClasses,l10n,});}();window.tsfC.load();