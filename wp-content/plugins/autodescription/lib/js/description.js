'use strict';window.tsfDescription=function(){const descriptionInputInstances=new Map();const states={};const setInputElement=(element)=>{descriptionInputInstances.set(element.id,element);states[element.id]={allowReferenceChange:true,defaultDescription:'',useDefaultDescription:true,};_loadDescriptionActions(element);return getInputElement(element.id);}
const getInputElement=id=>descriptionInputInstances.get(id);const getStateOf=(id,part)=>part?states[id]?.[part]:states[id];const updateStateOf=(id,part,value)=>{if(states[id][part]===value)return;states[id][part]=value;switch(part){case 'allowReferenceChange':case 'defaultDescription':case 'useDefaultDescription':default:enqueueTriggerInput(id);break;}}
const updateStateAll=(part,value,except)=>{except=Array.isArray(except)?except:[except];descriptionInputInstances.forEach(element=>{if(except.includes(element.id))return;updateStateOf(element.id,part,value);});}
const _getDescriptionReferences=id=>{let references=[document.getElementById(`tsf-description-reference_${id}`)];if(getStateOf(id,'hasLegacy')){let legacy=document.getElementById('tsf-description-reference');legacy&&references.unshift(legacy);}
return references;}
const _setReferenceDescription=event=>{const references=_getDescriptionReferences(event.target.id);if(!references[0])return;const allowReferenceChange=getStateOf(event.target.id,'allowReferenceChange'),useDefaultDescription=allowReferenceChange?getStateOf(event.target.id,'useDefaultDescription'):true;let text=(allowReferenceChange&&event.target.value.trim())||(useDefaultDescription&&getStateOf(event.target.id,'defaultDescription'))||'';const referenceValue=tsf.escapeString(tsf.decodeEntities(tsf.sDoubleSpace(tsf.sTabs(tsf.sSingleLine(text).trim()))));const changeEvent=new Event('change');references.forEach(reference=>{reference.innerHTML=referenceValue;setTimeout(()=>{reference.dispatchEvent(changeEvent)},0);});}
const _updatePlaceholder=event=>{event.target.placeholder=_getDescriptionReferences(event.target.id)[0].textContent;}
const _updateCounter=event=>{const counter=document.getElementById(`${event.target.id}_chars`),reference=_getDescriptionReferences(event.target.id)[0];if(!counter)return;tsfC?.updateCharacterCounter({e:counter,text:reference.innerHTML,field:'description',type:'search',});}
const _updatePixels=event=>{const pixels=document.getElementById(`${event.target.id}_pixels`),reference=_getDescriptionReferences(event.target.id)[0];if(!pixels)return;tsfC?.updatePixelCounter({e:pixels,text:reference.innerHTML,field:'description',type:'search',});}
const triggerInput=id=>{if(id){getInputElement(id)?.dispatchEvent(new Event('input'));}else{descriptionInputInstances.forEach(element=>element.id&&triggerInput(element.id));}}
const triggerCounter=id=>{if(id){getInputElement(id)?.dispatchEvent(new CustomEvent('tsf-update-description-counter'));}else{descriptionInputInstances.forEach(element=>element.id&&triggerCounter(element.id));}}
const _onUpdateDescriptionsTrigger=event=>{_setReferenceDescription(event);_updatePlaceholder(event);_onUpdateCounterTrigger(event);}
const _onUpdateCounterTrigger=event=>{_updateCounter(event);_updatePixels(event);}
let _enqueueTriggerInputBuffer={};const enqueueTriggerInput=id=>{(id in _enqueueTriggerInputBuffer)&&clearTimeout(_enqueueTriggerInputBuffer[id]);_enqueueTriggerInputBuffer[id]=setTimeout(()=>triggerInput(id),1000/60);}
const triggerUnregisteredInput=id=>{if('tsfAys'in window){let wereSettingsChanged=tsfAys.areSettingsChanged();triggerInput(id);if(!wereSettingsChanged&&tsfAys.areSettingsChanged())
tsfAys.reset();}else{triggerInput(id);}}
let _unregisteredTriggerBuffer={};const enqueueUnregisteredInputTrigger=id=>{(id in _unregisteredTriggerBuffer)&&clearTimeout(_unregisteredTriggerBuffer[id]);_unregisteredTriggerBuffer[id]=setTimeout(()=>triggerUnregisteredInput(id),1000/60);}
let prevWidth=window.innerWidth;const _doResize=()=>{const width=window.innerWidth;if(prevWidth<width){if(prevWidth<=782&&width>=782){triggerUnregisteredInput();}}else{if(prevWidth>=782&&width<=782){triggerUnregisteredInput();}}
prevWidth=width;}
const _loadDescriptionActions=descriptionInput=>{if(!descriptionInput instanceof Element)return;descriptionInput.addEventListener('input',_onUpdateDescriptionsTrigger);descriptionInput.addEventListener('tsf-update-description-counter',_onUpdateCounterTrigger);enqueueUnregisteredInputTrigger(descriptionInput.id);}
const _initAllDescriptionActions=()=>{window.addEventListener('tsf-resize',_doResize);window.addEventListener('tsf-counter-updated',()=>enqueueUnregisteredInputTrigger());}
return Object.assign({load:()=>{document.body.addEventListener('tsf-onload',_initAllDescriptionActions);}},{setInputElement,getInputElement,getStateOf,updateStateOf,updateStateAll,triggerCounter,triggerInput,enqueueTriggerInput,triggerUnregisteredInput,enqueueUnregisteredInputTrigger,});}();window.tsfDescription.load();